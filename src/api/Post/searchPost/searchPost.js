import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) => {
      const { term } = args;
      return await prisma.posts({
        where: {
          OR: [
            { location_contains : term },
            { caption_contains : term },
            { location_contains : term.toLowerCase() },
            { caption_contains : term.toLowerCase() },
          ]
        }
      });
    }
  }
};
