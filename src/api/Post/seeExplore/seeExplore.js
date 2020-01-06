import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeExplore: (_, args) => {
      const { category } = args;
      console.log("category==");
      console.log(category);

      return prisma.posts({
        orderBy: "createdAt_DESC"
      });
    }
  }
};
