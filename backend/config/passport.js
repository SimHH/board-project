const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const User = require("../models/User");
require("dotenv").config();


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,  
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('Google profile:', profile);
  
    let user = await User.findOne({ provider: 'google', providerId: profile.id });
  
    if (!user) {
      user = await User.create({
        provider: 'google',
        providerId: profile.id,
        username: profile.displayName,
        email: profile.emails?.[0]?.value,
        profileImage: profile.photos?.[0]?.value
      });
    }
    return done(null, user);
  }));

  passport.use(new KakaoStrategy({
    clientID: '카카오_REST_API_KEY',
    callbackURL: '/auth/kakao/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('Kakao profile:', profile);
  
    let user = await User.findOne({ provider: 'kakao', providerId: profile.id });
  
    if (!user) {
      user = await User.create({
        provider: 'kakao',
        providerId: profile.id,
        username: profile.displayName,
        email: profile._json.kakao_account?.email,
        profileImage: profile._json.properties?.profile_image
      });
    }
  
    return done(null, user);
  }));
  

  passport.use(new GithubStrategy({
    clientID: '깃허브_CLIENT_ID',
    clientSecret: '깃허브_CLIENT_SECRET',
    callbackURL: '/auth/github/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('Github profile:', profile);
  
    let user = await User.findOne({ provider: 'github', providerId: profile.id });
  
    if (!user) {
      user = await User.create({
        provider: 'github',
        providerId: profile.id,
        username: profile.username,
        email: profile.emails?.[0]?.value,
        profileImage: profile.photos?.[0]?.value
      });
    }
  
    return done(null, user);
  }));

module.exports = passport;