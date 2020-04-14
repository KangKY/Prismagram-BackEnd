import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { chatId, message, toId } = args;
            const { user } = request;
            let chat;

            if (chatId === undefined) {
                // 기존 채팅방이 없을 경우
                // chatId x, toId o
                if (user.id !== toId) {
                    chat = await prisma.createChat({
                        participants: {
                            connect: [
                                { id: toId }, 
                                { id: user.id }
                            ]
                        }
                    });
                }
            } else {
                // 기존 채팅방이 있을 경우
                // chatId o, toId x
                chat = await prisma.chat({ id: chatId });
            }
            console.log(chat);

            if (!chat) {
                console.log(chatId);
                throw Error("Chat not found");
            } 

            console.log(chat.participants);

            const getTo = chat.participants.filter(
                participant => participant.id !== user.id
            )[0];
            
            return prisma.createMessage({
                text: message,
                from: {
                    connect: { id: user.id }
                },
                to: {
                    connect: { id: chatId ? getTo.id : toId }
                },
                chat: {
                    connect: { id: chat.id }
                }
            });
        }
    }
}