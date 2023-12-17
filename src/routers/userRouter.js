import express from "express";

import {
  createUser,
  getUserByEmail,
  updateRefreshJWT,
} from "../models/user/UserModel.js";
import { deleteSession } from "../models/session/SessionModel.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import {
  newUserValidation,
  loginValidation,
} from "../middlewares/joiValidation.js";
import { userAuth, refreshAuth } from "../middlewares/authMiddleware.js";
import { signJWTs, signAccessJWT } from "../utils/jwtHelper.js";
import SessionSchema from "../models/session/SessionSchema.js";

const router = express.Router();

//"/api/v1/users"

router.post("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "create a user",
    });
  } catch (error) {
    next(error);
  }
});

//login admin

router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //get user by email
    const user = await getUserByEmail(email);
    console.log(user);
    //all data abt user returned

    if (user?._id) {
      //check if the password from db and plain password matched

      const isMatched = comparePassword(password, user.password);

      if (isMatched) {
        //jwt- emai; is string
        //I want email in payload- it doesnt matter who it will create once for access token to session table
        //email- will fond an user in user table, and refresh token will be stored
        const jwts = signJWTs(user.email); //generating jwts

        return res.json({
          status: "success",
          message: "logged in successfully ",
          jwts,
          //send them to front so I can put them in local storage

          //everytime i log in i get new access token
        });
      }
    }

    res.json({
      status: "error",
      message: "unsuccessful login ",
    });
  } catch (error) {
    next(error);
  }
});

//logout
router.post("/logout", async (req, res, next) => {
  try {
    const { accessJWT, email } = req.body; //from action

    //remmove
    accessJWT && (await deleteSession({ token: accessJWT }));

    // update refresJWT to "" in user table
    // I need email to find user and I will update refresh token empty
    //remmove
    email && (await updateRefreshJWT(email, ""));

    res.json({
      status: "success",
      message: "logged out successfully ",

      //send them to front so I can put them in local storage

      //everytime i log in i get new access token
    });
  } catch (error) {
    next(error);
  }
});
//below is private
//create admin
router.post("/admin-user", newUserValidation, async (req, res, next) => {
  try {
    //this point req.body is safe through joi
    req.body.password = hashPassword(req.body.password);
    console.log(req.body);

    // im making new propoty of object
    req.body.role = "admin";

    const user = await createUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "create a admin user successfully",
        })
      : res.json({
          status: "error",
          message:
            "Unable to create an account now, Pelase contact admin for support",
        });
  } catch (error) {
    if (error.message.includes("E11000 duplicate")) {
      error.message = "There is already user exist";
      error.errorCode = 200;
    }
    next(error);
  }
});

//checking authorization then get user info
//getting user info
router.get("/", userAuth, (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "get user successful",
      user: req.userInfo, // from auth
    });
  } catch (error) {
    next(error);
  }
});

//from  refreshAuth  im gettingn access toekn
router.get("/get-accessjwt", refreshAuth);
export default router;
