import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";
import { NextApiHandler } from "next";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

let Handle: NextApiHandler = (req, res) => {
  return NextAuth(req, res, {
    providers: [
      Providers.Facebook({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      Providers.Email({
        server: {
          host: String(process.env.EMAIL_SERVER),
          port: Number(process.env.EMAIL_PORT),
          auth: {
            user: String(process.env.EMAIL_USERNAME),
            pass: String(process.env.EMAIL_PASSWORD),
          },
        },
        from: process.env.EMAIL_FROM,
      }),
    ],
    pages: {
      signIn: "/signin",
      verifyRequest: "/verifyRequest",
    },
    secret: "qwertyuiop;lkjhgfdxcbn",
    adapter: Adapters.Prisma.Adapter({ prisma }),
  });
};

export default Handle;
