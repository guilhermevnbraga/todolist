import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    pages: {
        signIn: "/",
    },
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/membro/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            senha: credentials?.password,
                        }),
                        credentials: "include",
                    }
                );

                const data = await response.json();
                if (response.status == 200) {
                    return {
                        id: data.user.id,
                        email: data.user.email,
                        name: data.user.nome,
                    };
                }

                return data.message;
            },
        }),
    ],
});

export { handler as GET, handler as POST };
