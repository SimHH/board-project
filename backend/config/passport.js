const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value, provider: "google" });
          if (!user) {
            user = await new User({
              username: profile.displayName,
              email: profile.emails[0].value,
              provider: "google",
            }).save();
          }
  
          const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
          return done(null, { user, token });
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: "http://localhost:5000/auth/kakao/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const kakaoAccount = profile._json.kakao_account;
          let email = kakaoAccount?.email || `kakao_${profile.id}@kakao.com`;
          const username = (!profile.displayName || profile.displayName === "미연동 계정") ? `kakao_${profile.id}` : profile.displayName;
          let user = await User.findOne({ email, provider: "kakao" });
  
          if (!user) {
            user = await new User({
              username,
              email,
              provider: "kakao"
            }).save();
          }
          const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
  
          return done(null, { user, token });
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/git/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email =
            profile.emails?.[0]?.value || `github_${profile.id}@github.com`;
  
          const rawName = profile.username;
          const username = (!rawName || rawName === "undefined")
            ? `github_${profile.id}`
            : rawName;
  
          let user = await User.findOne({ email, provider: "github" });
  
          if (!user) {
            user = await new User({
              username,
              email,
              provider: "github",
            }).save();
          }
  
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
  
          return done(null, { user, token });
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
};