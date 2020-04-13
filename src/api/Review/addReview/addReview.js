import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
      addReview: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { text, rating, postId } = args;
            const { user } = request;
            const review = await prisma.createReview({
                text,
                rating,
                user: {
                    connect: {  
                        id:user.id
                    }
                },
                post : {
                    connect : {
                        id:postId
                    }
                }
            });
            return review;
        }
    }
}