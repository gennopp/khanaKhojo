//import './env.js';
import express from "express";
import cors from "cors";
import passport from "passport";
import AuthSetup from "./authSetup.js";
import {UserDetails} from "./authSetup.js";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from "dotenv";

dotenv.config();

const app = express();

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
      res.redirect("/restaurant");
    }
  );

  // instagram
  app.get("/auth/instagram", passport.authenticate("instagram"));
  app.get(
    "/auth/instagram/callback",
    passport.authenticate("instagram"),
    (req, res) => {
      console.log(UserDetails);
      res.redirect("/profile");
    }
  );

app.get("/user", (req, res) => {
  console.log("User data.....");
  res.send(UserDetails);
});

app.get("/auth/logout", (req, res) => {
  console.log("logging out ...");
  UserDetails = {};
  res.redirect("/");
});


// db connection

app.use(bodyParser.json({ limit: '5mb' }));

// Support encoded bodies
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const db = mongoose.connection;
db.on('error', error => console.log("Failed to start server"));
db.once('open', () => {
  app.listen(process.env.SERVER_PORT);
  console.log('server running on port:', process.env.SERVER_PORT);
});

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  { useNewUrlParser: true }
);

// filterData

let resData = [];
const headers = {
  Accept: "application/json",
  user_key: "2c4d995eabc482566d498485156aefbc"
};
var requestOptions = {
  method: "GET",
  headers: headers,
  redirect: "follow"
};



const cityName = "delhi ncr";
const LocationUrl =
  "https://developers.zomato.com/api/v2.1/locations?query=" + cityName;
let resNameUrl = "https://developers.zomato.com/api/v2.1/geocode?";

app.get('/getResturant',(req,res) => {

  fetch(LocationUrl, requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result.location_suggestions);
    let data = {
      lan: result.location_suggestions[0].latitude,
      log: result.location_suggestions[0].longitude
    };
    console.log(data);
    resNameUrl += "lat=" + data.lan + "&lon=" + "data.log";
    fetch(resNameUrl, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.popularity.nearby_res);
        let id = result.popularity.nearby_res;
        for (let i = 0; i < id.length; i++) {
          console.log(id[i]);
          let resUrl =
            "https://developers.zomato.com/api/v2.1/restaurant?res_id=" +
            id[i];
          fetch(resUrl, requestOptions)
            .then(response => response.json())
            .then(result => {
              let tempData = {
                name: result.name,
                location: result.location,
                rating: result.user_rating.aggregate_rating,
                averageCost: result.average_cost_for_two,
                photoUrl: result.photos_url
              };
              resData.push(tempData);
            
            });
        }
      });
  })
  .catch(error => console.log("error", error));
  console.log(resData);
  res.send(resData);
});

