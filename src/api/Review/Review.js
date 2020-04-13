import { prisma } from "../../../generated/prisma-client";

export default {
  Review: {
    post:({ id }) => prisma.review({ id }).post(),
    user:({ id }) => prisma.review({ id }).user()
  }
}