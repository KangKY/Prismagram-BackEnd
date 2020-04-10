import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { username, id } = args;
      if(id) {
        return await prisma.user({ id });
      } else if(username) {
        return prisma.user({ username });
      } else {
        throw Error("need info");
      }
      
      //return await prisma.user({ id });
    }
  }
};
