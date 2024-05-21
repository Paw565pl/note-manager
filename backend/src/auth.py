from os import getenv
from typing import Annotated, Any

from dotenv import load_dotenv
from fastapi import Depends, HTTPException, Request, status
from jose import JWTError
from keycloak import KeycloakOpenID

load_dotenv()

keycloak_openid = KeycloakOpenID(
    server_url=getenv("KEYCLOAK_URL"),
    client_id=getenv("KEYCLOAK_CLIENT_ID"),
    realm_name=getenv("KEYCLOAK_REALM"),
    client_secret_key=getenv("KEYCLOAK_CLIENT_SECRET"),
)
KEYCLOAK_PUBLIC_KEY = (
    "-----BEGIN PUBLIC KEY-----\n"
    + keycloak_openid.public_key()
    + "\n-----END PUBLIC KEY-----"
)


async def validate_token(request: Request) -> dict[str, Any]:
    auth_header = request.headers.get("Authorization")
    if auth_header is None:
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED, "No Authorization header provided."
        )

    try:
        token = auth_header.replace("Bearer ", "")
        options = {"verify_signature": True, "verify_aud": False, "verify_exp": True}
        token_info = keycloak_openid.decode_token(
            token, key=KEYCLOAK_PUBLIC_KEY, options=options
        )
        return token_info
    except JWTError as e:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, e.__str__())


AuthTokenDependency = Annotated[dict, Depends(validate_token)]


async def check_admin_role(token_info: AuthTokenDependency) -> dict[str, Any]:
    admin_role = "admin"

    roles: list[str] | None = token_info.get("realm_access").get("roles")
    if roles is None:
        raise HTTPException(
            status.HTTP_401_UNAUTHORIZED, "No roles found in the token."
        )

    if admin_role not in roles:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Admin role is required.")

    return token_info


AdminRoleDependency = Annotated[dict, Depends(check_admin_role)]
