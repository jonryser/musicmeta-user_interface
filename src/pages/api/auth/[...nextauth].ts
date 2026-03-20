import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const ALLOWED_EMAIL = 'jon.ryser@genui.com';

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async signIn({ user }) {
            return user.email === ALLOWED_EMAIL;
        },
        async jwt({ token, account }) {
            if (account?.access_token) {
                // Exchange Google token for musicmeta-api JWT
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            query: `mutation SignIn($token: String!) { signIn(token: $token) { jwt } }`,
                            variables: { token: account.access_token },
                        }),
                    });
                    if (response.ok) {
                        const { data } = await response.json();
                        token.apiToken = data?.signIn?.jwt;
                    }
                } catch {
                    // API unavailable — token will be populated when API is running
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.apiToken = token.apiToken as string | undefined;
            return session;
        },
    },
};

export default NextAuth(authOptions);
