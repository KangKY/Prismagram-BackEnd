import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeChat: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { id } = args;

            const canSee = await prisma.$exists.chat({
                AND:[
                    {
                        participants_some: {
                            id:user.id
                        }
                    },
                    {
                        id
                    }
                ]
            });
            console.log("canSee:",canSee);
            if(canSee) {
                return prisma.chat({id});
            } else {
                throw Error("you can't see this");
            }
        }
    }
}