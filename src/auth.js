import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                // try {
                //     const user = getUserByEmail(credentials?.email);
                //     if (user) {
                //         const isPasswordMatch = user.password === credentials.password;
                //         if (isPasswordMatch) {
                //             return user
                //         }
                //         else {
                //             throw new Error("Wrong password")
                //         }
                //     }
                //     else {
                //         throw new Error("User not found")
                //     }
                // } catch (error) {
                //     throw new Error(error)
                // }

                const { email, password } = credentials;
                try {
                    const res = await fetch('http://localhost:5000/api/v1/employee/login', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    })
                    const data = await res.json();
                    // console.log("login api response: ", data);
                    if (data?.status == "Success") {
                        // return data.data.employee;
                        console.log("db employee: ", data?.data?.employee);
                        const employee = data?.data?.employee;
                        return employee;
                    }
                    else {
                        return null;
                    }

                } catch (error) {
                    console.log("login api error is: ", error);
                    return error;
                }
            }
        })
    ],
    secret: process.env.AUTH_SECRET,
    // pages: {
    //     signIn: "/login",
    // },
    callbacks: {
        jwt: async ({ token, user }) => {
            // console.log("inside jwt user: ", user);
            // console.log("inside jwt token: ", token);
            if (user) {
                token.role = user.userRole;
                token._id = user._id;
                token.department = user.department
                token.accessToken = user.accessToken
            }
            return token;
        },
        session: async ({ session, token }) => {
            // console.log("user is: ", session?.user);
            // console.log("token is: ", token);
            if (session?.user) {
                session.user.role = token.role;
                session.user._id = token._id;
                session.user.department = token.department
                session.user.accessToken = token.accessToken
            }
            // console.log("session is: ", session);
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 8 * 60 * 60, // 8 hours
    }
})