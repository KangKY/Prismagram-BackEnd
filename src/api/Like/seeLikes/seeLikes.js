import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeLikes: async (_, args) => {
      const {postId, commentId} = args;
      if(postId) {
        return prisma.likes({ where: { post: { id: postId } } });
      } else if(commentId) {
        return prisma.likes({ where: { comment: { id: commentId } } });
      } else {
        throw Error("need info");
      }
      
      //return await prisma.user({ id });
    }
  }
};
