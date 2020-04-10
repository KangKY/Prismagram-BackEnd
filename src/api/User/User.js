import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    posts: ({ id }) => prisma.user({ id }).posts({orderBy:"createdAt_DESC"}),
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    chats: ({ id }) => prisma.user({ id }).chats(),
    followingCount: ({ id }) =>
      prisma
        .usersConnection({ where: { followers_some: { id } } })
        .aggregate()
        .count(),
    followersCount: ({ id }) =>
      prisma
        .usersConnection({ where: { following_some: { id } } })
        .aggregate()
        .count(),
    postsCount: ({ id }) =>
      prisma
        .postsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName} `;
    },
    isFollowing: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;

      return prisma.$exists.user({
        AND: [
          {
            id: parentId
          },
          {
            followers_some: {
              id: user.id
            }
          }
        ]
      });
    },
    itsMe: (parent, _, { request }) => {
      if (parent.id === request.user.id) return true;
      return false;
    }
  }
};
