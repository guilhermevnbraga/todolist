import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    pages: {
        signIn: "/login",
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
                try {
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
                        console.log(data.message);
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: data.user.nome,
                        };
                    }

                    return null;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
    ],
});

export { handler as GET, handler as POST };
