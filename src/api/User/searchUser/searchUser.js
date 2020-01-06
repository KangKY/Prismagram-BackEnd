import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (_, args) => {
      const { term } = args;
      return await prisma.users({
        where: {
          OR: [
            { username_contains: term },
            { firstName_contains: term },
            { lastName_contains: term }
          ]
        }
      });
      // $fragment 무한한 depth로 인해 prisma가 먹통이 되지 않도록 보호.
      // 검색할 필드를 지정, 불필요한 큰 필드(ex> blob, 큰 문자열)를 제외할 때 사용.
    }
  }
};
