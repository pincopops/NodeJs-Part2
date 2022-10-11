import passport from "passport";
import passportGitHub2 from "passport-github2";
import config from "../../../config";

const githubStrategy = new passportGitHub2.Strategy(
    {
        clientID: "GITHUB_CLIENT_ID",
        clientSecret: "GITHUB_CLIENT_SECRET",
        callbackURL: "GITHUB_CALLBACK_URL",
    },
    function (
        accessToken: string,
        refreshToken: string,
        profile: { [key: string]: string; },
        done: (error: null, user: Express.User) => void
    ) {
        const user: Express.User = {
            username: profile.username,
        };

        done(null, user)
    }
);

passport.use(githubStrategy);

passport.serializeUser<Express.User>((user, done) => done(null, user));

passport.deserializeUser<Express.User>((user, done) => done(null, user));

export { passport };