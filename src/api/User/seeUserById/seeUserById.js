import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeUserById: async (_, args) => {
      const { id } = args;
      return prisma.user({ id });
      //return await prisma.user({ id });
    }
  }
};
