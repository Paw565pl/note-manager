import NextAuth from "next-auth";
import keycloak from "next-auth/providers/keycloak";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    keycloak({
      clientId: process.env.KEYCLOAK_ID || "",
      clientSecret: process.env.KEYCLOAK_SECRET || "",
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
});
