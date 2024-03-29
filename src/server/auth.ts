import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import { env } from "~/env.mjs";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  interface User {
    // ...other properties
    // role: UserRole;
    username: string,
    password: string
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    }
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        
        const salt = env.SALT
        const pass = await bcrypt.hash(password, salt)

        if (env.ADMIN_ID !== username || pass !== env.ADMIN_PS) {
          throw new Error("invalid credentials");
        }
        // if everything is fine

        const user = {
          id: "1",
          username: username,
          password: password
        }
        return user;
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
