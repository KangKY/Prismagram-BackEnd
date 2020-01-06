import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addReply: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { text, postId, commentId } = args;
      const { user } = request;

      const seq = await prisma
        .commentsConnection({
          where: { parent: { id: commentId } }
        })
        .aggregate()
        .count();

      const comment = await prisma.createComment({
        text,
        user: {
          connect: {
            id: user.id
          }
        },
        post: {
          connect: {
            id: postId
          }
        },
        parent: {
          connect: {
            id: commentId
          }
        },
        seq: seq + 1
      });
      return comment;
    }
  }
};
