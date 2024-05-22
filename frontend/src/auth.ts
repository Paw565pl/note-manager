import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import keycloak from "next-auth/providers/keycloak";

const providers: Provider[] = [
  keycloak({
    clientId: process.env.KEYCLOAK_ID || "",
    clientSecret: process.env.KEYCLOAK_SECRET || "",
    issuer: process.env.KEYCLOAK_ISSUER,
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/",
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
