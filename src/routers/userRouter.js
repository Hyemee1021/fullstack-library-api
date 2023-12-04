import express from "express";
import { createUser, getUserByEmail } from "../models/user/UserModel.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import {
  newUserValidation,
  loginValidation,
} from "../middlewares/joiValidation.js";
import { userAuth } from "../middlewares/authMiddleware.js";
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
        //I want email in payload- access token session table
        //email- will fond an user inb user table, and token will be stored
        const jwts = signJWTs(user.email);

        return res.json({
          status: "success",
          message: "logged in successfully ",
          jwts,
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

//getting user info
router.get("/", userAuth, (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "get user",
      user: req.userInfo, // from auth
    });
  } catch (error) {
    next(error);
  }
});
export default router;
