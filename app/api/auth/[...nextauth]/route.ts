export const dynamic = 'force-dynamic';

import connectToDB from "@/backend/config/db.Connect";
import User, { IUser } from "@/backend/models/user";
import { NextApiResponse } from "next";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

interface Creds {
  email: string;
  password: string;
}

async function auth(request: any, response: NextApiResponse) {
  return await NextAuth(request, response, {
    providers: [
      CredentialsProvider({
        // @ts-ignore
        async authorize(credentials: Creds) {
          connectToDB();
          const { email, password } = credentials;
          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("Invalid Email or Password!");
          }
          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordMatched) {
            throw new Error("Invalid Email or Password!");
          }

          return user;
        },
      }),
    ],
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      jwt: async ({ token, user }) => {
        const jwtToken: any = token;
        if (user) {
          token.user = user;
        }

        // TODO : Update session when user is updated.
        if (request.url?.includes("/api/auth/session?update")) {
          const updatedUser = await User.findById(jwtToken.user._id);
          token.user = updatedUser;
        }
        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user as IUser;

        return session;
      },
    },
  });
}

export { auth as GET, auth as POST };

// This signIn property specifies the URL where NextAuth should redirect users when they need to sign in.
// In this example, it's set to '/login', indicating that users should be redirected to the /login page for sign-in.

// We need to export this function with HTTP method name.
// We need to export this function with HTTP method name.
// So nextjs automatically sends those request. So we don't need to send any request to next auth.
// When user enters creds and clicks on login, authorize function get called.
