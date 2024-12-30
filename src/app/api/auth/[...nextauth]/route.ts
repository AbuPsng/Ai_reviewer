import NextAuth from "next-auth";
import { authOptions } from "./options";

const hanlder = NextAuth(authOptions);

export { hanlder as GET, hanlder as POST };
