import NextAuth from "next-auth/next";
import { CredentialsProvider } from "next-auth/providers/credentials";

export const {
    handlers: { GET, POST }, // API route
    auth, // 정보
    signIn, // 로그인
} = NextAuth({});
