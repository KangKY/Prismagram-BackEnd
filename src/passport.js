import passport from "passport";
import { Strategy, ExtractJwt} from "passport-jwt";
import { prisma } from "../generated/prisma-client";
// 토큰에서 정보를 가져와 해독한 후 express의 request에 붙여줌.

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 jwt를 찾는 역할
    secretOrKey : process.env.JWT_SECRET
}

const verifyUser = async (payload, done) => {
    try {
      console.log("=========payload=========");
      console.log(payload);
        const user = await prisma.user({id:payload.id});
        if (user !== null) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch(error) {
        return done(error, false);
    }
}
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next); // Fn(req, res, next) 과 같음.

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize()
/*
jwtOptions.secretOrKey = 'secret';
jwtOptions.issuer = 'accounts.examplesoft.com';
jwtOptions.audience = 'yoursite.net';*/