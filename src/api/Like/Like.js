import { prisma } from "../../../generated/prisma-client";

export default {
    Like: {
        post:({ id }) => prisma.like({ id }).post(),
        user:({ id }) => prisma.like({ id }).user(),
        comment:({ id }) => prisma.like({ id }).comment() 
    }
}