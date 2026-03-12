import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const adminUser = process.env.ADMIN_USER;
                const adminPass = process.env.ADMIN_PASS;

                if (
                    adminUser &&
                    adminPass &&
                    credentials.username === adminUser &&
                    credentials.password === adminPass
                ) {
                    return { id: "1", name: "Administrador", email: "admin@looserfit.com" };
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
