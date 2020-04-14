import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middleware";
import cors from "cors";
import {
  uploadAvatar,
  uploadPost,
  uploadController
} from "./upload";
import { cronJob } from "./cronjob";

//sendSecretMail("ruddlf4933@trizcorp.com", "123");

const PORT = process.env.PORT || 4000;
const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};

//const server = new GraphQLServer({ schema, context: (req)=>{ console.log(req) } }); // context : resolver 사이에서 정보 공유
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
}); // context : resolver 사이에서 정보 공유

server.express.use(logger("dev"));
server.express.use(cors(corsOption));
server.express.use(authenticateJwt);

server.express.post("/api/user/upload", uploadAvatar, uploadController);
server.express.post("/api/post/upload", uploadPost, uploadController);

//cronJob();
//console.log(generatePW, generateSalt);

server.start({ port: PORT }, () =>
  console.log(`Server running on port ${PORT}`)
);
