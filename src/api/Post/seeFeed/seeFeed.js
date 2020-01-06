import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFeed: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const following = await prisma.user({ id: user.id }).following();
            const seachUser = following.map(user => user.id);
            seachUser.push(user.id);
            return prisma.posts({
                where: {
                    user: {
                        id_in: seachUser
                    }
                },
                orderBy: "createdAt_DESC"
            });

        }
    }
}