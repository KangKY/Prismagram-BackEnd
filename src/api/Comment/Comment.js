import { prisma } from "../../../generated/prisma-client";

export default {
  Comment: {
    user: ({ id }) => prisma.comment({ id }).user(),
    post: ({ id }) => prisma.comment({ id }).post(),
    parent: ({ id }) => prisma.comment({ id }).parent(),
    recomments: ({ id }) => prisma.comments({ where: { parent: { id } } }),
    likes: ({ id }) => prisma.comment({ id }).likes(),
    isLiked: (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            comment: {
              id
            }
          }
        ]
      });
    },
    likeCount: parent =>
      prisma
        .likesConnection({
          where: { comment: { id: parent.id } }
        })
        .aggregate()
        .count(),
    recommentCount: parent =>
      prisma
        .commentsConnection({
          where: { parent: { id: parent.id } }
        })
        .aggregate()
        .count()
  }
};
