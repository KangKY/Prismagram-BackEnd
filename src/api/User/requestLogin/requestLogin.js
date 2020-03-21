import { generateSecret, sendSecretMail, checkBase64crypto } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    requestLogin: async (_, args) => {
      const { email, password } = args;
      //const loginSecret = generateSecret();
      console.log(email);
      try {
        const existEmail = await prisma.$exists.user({email});
        if(existEmail) {
          const user = await prisma.user({ email });

          if(user.password === checkBase64crypto(user.salt, password)) {
            return generateToken(user.id);
          } else {
            throw Error("wrong");
          }
        } else {
          throw Error("email not exist");
        }
      } catch (e) {
        console.log(e);
        throw Error(500);
      }
    }
  }
};
