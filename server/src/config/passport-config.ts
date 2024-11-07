import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { db } from "../models";

dotenv.config();

const serviceUrl =
  process.env.NODE_ENV !== "production"
    ? process.env.SERVICE_DEV_URL
    : process.env.SERVICE_PROD_URL;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${serviceUrl}/auth/google/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      try {
        let user = await db.users.findFirst({
          where: {
            googleId: profile.id,
          },
        });

        if (!user) {
          user = await db.users.findFirst({
            where: {
              email: profile.emails[0].value,
            },
          });

          if (!user) {
            const username = profile.emails[0].value.split("@")[0];
            user = await db.users.create({
              data: {
                googleId: profile.id,
                email: profile.emails[0].value,
                hasPassword: false,
                role: "student",
                username,
                password: null,
              },
            });
          } else {
            user = await db.users.update({
              where: { id: user.id },
              data: { googleId: profile.id },
            });
          }
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user: any, done) => {
  try {
    const authUser = await db.users.findFirst({
      where: {
        id: user.id as string,
      },
    });
    done(null, authUser);
  } catch (error) {
    done(error, null);
  }
});


export default passport