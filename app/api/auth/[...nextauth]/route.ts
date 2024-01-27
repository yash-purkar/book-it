import connectToDB from "@/backend/config/db.Connect";
import User, { IUser } from "@/backend/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";

interface Creds {
  email: string;
  password: string;
}

const login = async (creds: Creds) => {
  const { email, password } = creds;
  try {
    connectToDB();
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new Error("Wrong Creds!");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new Error("Wrong Creds!");
    }
    return user;
  } catch (error:any) {
    throw new Error(error.message);
  }
};

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      // @ts-ignore
      async authorize(credentials: Creds, req: NextApiRequest) {
        const user = await login(credentials);
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }

      // TODO : Update session when user is updated.
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as IUser;
      // @ts-ignore
      delete session?.user?.password;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// This signIn property specifies the URL where NextAuth should redirect users when they need to sign in.
// In this example, it's set to '/login', indicating that users should be redirected to the /login page for sign-in.

// We need to export this function with HTTP method name.
// We need to export this function with HTTP method name.
// So nextjs automatically sends those request. So we don't need to send any request to next auth.
// When user enters creds and clicks on login, authorize function get called.
