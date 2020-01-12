import passport from "passport";

import keys from "../config/index.js";

import FacebookStrategy from "passport-facebook";
import GoogleStrategy from "passport-google-oauth20";
import InstagramStrategy from "passport-instagram";
import AmazonStrategy from "passport-amazon";
import chalk from "chalk";
import User from "./models/users.js";

export let UserDetails = {};

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  User.findById(id)
    .then(user => {
      cb(null, user);
    })
    .catch(() => {
      console.log("unexpected");
    });
});

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.FACEBOOK.clientID,
      clientSecret: keys.FACEBOOK.clientSecret,
      callbackURL: "/auth/facebook/callback"
    },
    (acessToken, refresh, profile, cb) => {
      //console.log(profile);
      console.log(chalk.blue(JSON.stringify(profile.displayName)));
      User.findOne({
        emailId: profile.emails[0].value
      }).then(currentUser => {
        if (currentUser) {
          console.log("User Exits");
          done(null, currentUser);
        } else {
          new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            bmi: "20",
            city: "unknown",
            photoUrl: profile.photos[0].value
          })
            .save()
            .then(newUser => {
              cb(null, newUser);
              console.log("new user created" + newUser);
              
            });
        }
      });
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
      console.log(chalk.blue(JSON.stringify(profile.displayName)));
      User.findOne({
        emailId: profile.emails[0].value
      }).then(currentUser => {
        if (currentUser) {
          console.log("User Exits");
          cb(null, currentUser);
        } else {
          new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            bmi: "20",
            city: "unknown",
            photoUrl: profile.photos[0].value
          })
            .save()
            .then(newUser => {
              cb(null, newUser);
              console.log("new user created" + newUser);
            });
        }
      });
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
      console.log(chalk.blue(JSON.stringify(profile.displayName)));
      User.findOne({
        email: profile.emails[0].value
      }).then(currentUser => {
        if (currentUser) {
          console.log("User Exits");
          UserDetails = currentUser;
          //console.log(UserDetails);
          cb(null, currentUser);
        } else {
          new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            bmi: "20",
            city: "unknown",
            photoUrl: profile.photos[0].value
          })
            .save()
            .then(newUser => {
              cb(null, newUser);
              console.log("new user created");
              UserDetails = newUser;
            });
        }
      });
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
      console.log(chalk.blue(JSON.stringify(profile.displayName)));
      User.findOne({
        emailId: profile.emails[0].value
      }).then(currentUser => {
        if (currentUser) {
          console.log("User Exits");
          newUser = currentUser;
          console.log(newUser);
          done(null, currentUser);
        } else {
          new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            bmi: "20",
            city: "unknown",
            photoUrl: profile.photos[0].value
          })
            .save()
            .then(newUser => {
              cb(null, newUser);
              console.log("new user created" + newUser);
            });
        }
      });
    }
  )
);


export default {
  FacebookStrategy,
  GoogleStrategy,
  AmazonStrategy,
  InstagramStrategy
};
