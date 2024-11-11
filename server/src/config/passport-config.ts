import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "../models";
import environment from "../constants/environment";


passport.use(
  new GoogleStrategy(
    {
      clientID: environment.googleClientId as string,
      clientSecret: environment.googleClientSecret as string,
      callbackURL: `${environment.serviceUrl}/auth/google/callback`,
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