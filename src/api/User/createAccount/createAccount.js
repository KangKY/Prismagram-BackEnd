import { prisma } from "../../../../generated/prisma-client";
import { upgradeBase64crypto } from "../../../utils";

export default {
	Mutation: {
		createAccount: async (_, args) => {
			const {
				username,
				email,
				password,
				firstName = "",
				lastName = "",
				bio = ""
			} = args;
			const existUsername = await prisma.$exists.user({ username });
			const existEmail = await prisma.$exists.user({ email });
			if (existUsername) {
				throw Error("This username is already taken.");
			}
			if (existEmail) {
				throw Error("This email is already taken.");
			}

			let {generatePW, generateSalt} = upgradeBase64crypto(password);

			try {
				await prisma.createUser({
					username,
					email,
					firstName,
					lastName,
                    password: generatePW,
                    salt: generateSalt,
					bio
				});
				return true;
			} catch {
				return false;
			}
		}
	}
};
