import express from 'express';

import user from '../models/users.js';

const router = express.Router();

router.post("/", (req, res) => {
    const userInfo = req.body;
    user
      .findOne({
        userEmail: userInfo.email
      })
      .then(currId => {
        if (currId) {
            console.log("user exits");
            res.sendStatus(200);
        }
        else {
          new users({
            name: userInfo.name,
            email: userInfo.email,
            bmi: userInfo.bmi,
            city: userInfo.city
          })
            .save()
            .then(newData => {
              res.sendStatus(200);
              console.log("Data Saved");
            })
            .catch(() => {
              console.log("Error Occured");
            });
        }
      });
  });

  export default router;