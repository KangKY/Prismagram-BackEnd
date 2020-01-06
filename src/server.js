import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middleware";

//sendSecretMail("ruddlf4933@trizcorp.com", "123");

const PORT = process.env.PORT || 4000;

//const server = new GraphQLServer({ schema, context: (req)=>{ console.log(req) } }); // context : resolver 사이에서 정보 공유
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
}); // context : resolver 사이에서 정보 공유

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
//server.express.post(server.options.endpoint, myMiddleware())

server.start({ port: PORT }, () =>
  console.log(`Server running on port ${PORT}`)
);
