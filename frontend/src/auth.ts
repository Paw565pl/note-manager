import axios from "axios";
import NextAuth, { Session } from "next-auth";
import { Provider } from "next-auth/providers";
import keycloak from "next-auth/providers/keycloak";
import TokenRefresh from "./entites/tokenRefresh";

const providers: Provider[] = [
  keycloak({
    clientId: process.env.KEYCLOAK_ID || "",
    clientSecret: process.env.KEYCLOAK_SECRET || "",
    issuer: process.env.KEYCLOAK_ISSUER,
    authorization: process.env.KEYCLOAK_AUTH_URL,
    token: process.env.KEYCLOAK_TOKEN_URL,
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/",
  },
  callbacks: {
    jwt: async ({ token, account, profile }) => {
      if (account && profile) {
        // Save the access token and refresh token in the JWT on the initial login, as well as the user details
        return {
          ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          access_token_expires_at: account.expires_at,
          username: profile.preferred_username || undefined,
          roles: profile.realm_access?.roles,
        };
      } else if (
        token.access_token_expires_at &&
        Date.now() < token.access_token_expires_at * 1000
      ) {
        // If the access token has not expired yet, return it
        return token;
      } else {
        // If the access token has expired, try to refresh it
        try {
          const { data: newTokens } = await axios.post<TokenRefresh>(
            `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
            {
              client_id: process.env.KEYCLOAK_ID,
              client_secret: process.env.KEYCLOAK_SECRET,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token,
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          return {
            ...token, // Keep the previous token properties
            access_token: newTokens.access_token,
            access_token_expires_at: Math.floor(
              Date.now() / 1000 + newTokens.expires_in
            ),
            // Fall back to old refresh token
            refresh_token: newTokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          // Refresh token expired
          return null;
        }
      }
    },
    session: ({ session, token }) => {
      return {
        ...session,
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        access_token_expires_at: token.access_token_expires_at,
        user: {
          ...session.user,
          username: token.username,
          id: token.sub,
          roles: token.roles,
        },
      };
    },
  },
});

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const checkIsAdmin = (session: Session) => {
  return session.user.roles?.includes("admin") || false;
};
