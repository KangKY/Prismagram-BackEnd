import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    toggleCommentLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { commentId } = args;
      const { user } = request;
      const filter = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            comment: {
              id: commentId
            }
          }
        ]
      };

      try {
        const existingLike = await prisma.$exists.like(filter);
        if (existingLike) {
          await prisma.deleteManyLikes(filter);
        } else {
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            comment: {
              connect: {
                id: commentId
              }
            }
          });
        }
        return true;
      } catch {
        return false;
      }
    }
  }
};
