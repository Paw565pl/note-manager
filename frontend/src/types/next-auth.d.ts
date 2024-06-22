import "next-auth";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token?: string;
    access_token_expires_at?: number;
    refresh_token?: string;
    id_token?: string;
    user: {
      username?: string;
      roles?: string[];
    } & DefaultSession["user"];
  }

  interface Profile {
    realm_access?: {
      roles?: string[];
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    access_token?: string;
    access_token_expires_at?: number;
    refresh_token?: string;
    id_token?: string;
    username?: string;
    roles?: string[];
  }
}
