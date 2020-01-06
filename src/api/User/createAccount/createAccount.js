import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { username, email, firstName = "", lastName = "", bio = "" } = args;
            const existUsername = await prisma.$exists.user({ username });
            const existEmail = await prisma.$exists.user({ email });
            if(existUsername) {
                throw Error("This username is already taken.");
            }
            if(existEmail) {
                throw Error("This email is already taken.");
            }

            try {
                await prisma.createUser({
                    username,
                    email,
                    firstName,
                    lastName,
                    bio
                  });
                return true;
            } catch {
                return false;
            }
            
        }
    }
}