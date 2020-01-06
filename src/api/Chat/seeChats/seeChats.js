import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeChats: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            return prisma.chats({
                where: {
                    participants_some: {
                        id: user.id
                    }
                }
            });
        }
    }
}