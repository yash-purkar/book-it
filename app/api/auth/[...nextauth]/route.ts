import connectToDB from "@/backend/config/db.Connect";
import User, { IUser } from "@/backend/models/user";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

interface Creds {
  email: string;
password: string;
}

const auth = async (request: NextApiRequest, response: NextApiResponse) => {
  return await NextAuth({
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        // @ts-ignore
        async authorize(credentials: Creds) {
          connectToDB();

          const { email, password } = credentials;

          const user = await User.findOne({ email });

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
    callbacks : {
        jwt: async({token,user}) => {
            if(user) {
                token.user = user;
            }

            // TODO : Update session when user is updated.
            return token;
        },
        session: async({session,token}) => {
            session.user = token.user as IUser;

            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
  });

};


export {auth as GET, auth as POST};