import passport from "passport";

import keys from "../config/index.js";

import FacebookStrategy from "passport-facebook";
import GoogleStrategy from "passport-google-oauth20";
import InstagramStrategy from "passport-instagram";
import AmazonStrategy from "passport-amazon";
import chalk from 'chalk';

// Facebook Strategy
export let user = {};

passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });



passport.use(
    new FacebookStrategy(
      {
        clientID: keys.FACEBOOK.clientID,
        clientSecret: keys.FACEBOOK.clientSecret,
        callbackURL: "/auth/facebook/callback"
      },
      (acessToken, refresh, profile, cb) => {
        console.log(profile);
        user = { ...profile };
        return cb(null, profile);
      }
    )
  );
  
  // Amazon Strategy
  passport.use(
    new AmazonStrategy(
      {
        clientID: keys.AMAZON.clientID,
        clientSecret: keys.AMAZON.clientSecret,
        callbackURL: "/auth/amazon/callback"
      },
      (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
      }
    )
  );
  
  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.GOOGLE.clientID,
        clientSecret: keys.GOOGLE.clientSecret,
        callbackURL: "/auth/google/callback"
      },
      (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
      }
    )
  );
  
  // Instagram Strategy
  passport.use(
    new InstagramStrategy(
      {
        clientID: keys.INSTAGRAM.clientID,
        clientSecret: keys.INSTAGRAM.clientSecret,
        callbackURL: "/auth/instagram/callback"
      },
      (accessToken, refreshToken, profile, cb) => {
        console.log(chalk.blue(JSON.stringify(profile)));
        user = { ...profile };
        return cb(null, profile);
      }
    )
  );
  
  export default {
      FacebookStrategy,
      GoogleStrategy,
      AmazonStrategy,
      InstagramStrategy
  };