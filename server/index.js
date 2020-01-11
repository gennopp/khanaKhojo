import express from "express";
const app = express();
export default app;
import cors from "cors";
import passport from "passport";
import AuthSetup from "./authSetup.js";
import {user} from "./authSetup.js";


app.use(cors());
app.use(passport.initialize());

app.get("/auth/facebook", passport.authenticate("facebook"));
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    (req, res) => {
      res.redirect("/profile");
    }
  );

  // amazon
  app.get(
    "/auth/amazon",
    passport.authenticate("amazon", {
      scope: ["profile"]
    })
  );
  app.get(
    "/auth/amazon/callback",
    passport.authenticate("amazon"),
    (req, res) => {
      res.redirect("/profile");
    }
  );

  // google
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/profile");
    }
  );

  // instagram
  app.get("/auth/instagram", passport.authenticate("instagram"));
  app.get(
    "/auth/instagram/callback",
    passport.authenticate("instagram"),
    (req, res) => {
      res.redirect("/profile");
    }
  );

app.get("/user", (req, res) => {
  console.log("User data.....");
  res.send(user);
});

app.get("/auth/logout", (req, res) => {
  console.log("logging out ...");
  //user = {};
  res.redirect("/");
});

const PORT = 5001;
app.listen(PORT);

