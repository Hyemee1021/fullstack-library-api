import jwt from "jsonwebtoken";
import { creatSession } from "../models/session/SessionModel.js";
import { updateRefreshJWT } from "../models/user/UserModel.js";
//access jwt :session table
//obj ??
export const signAccessJWT = (obj) => {
  //must 1.obj-email

  //2. SECRET KEY
  //3. expiredin argument in sign()
  const token = jwt.sign(obj, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  creatSession({ token }); //to data

  return token;
};

//refresh jwt:user table
//refreshkey is for creating access JWT
//getting email by string and change to obj

//verify-decode
export const accessJWTDecode = (accessJWT) => {
  return jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRET);
};

//generate refresh JWT
export const signRefreshJWT = (email) => {
  try {
    const token = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    //store in userDatabase so user can generate new access token again
    //email is unique so i can find user by email
    //here token is refresh token
    updateRefreshJWT(email, token);

    return token;
  } catch (error) {
    console.log(error);
  }
};

//verify-decode
export const refreshJWTDecode = (refreshJWT) => {
  return jwt.verify(refreshJWT, process.env.JWT_REFRESH_SECRET);
};

//creating both funstion

export const signJWTs = (email) => {
  return {
    //access jwt is on session data
    accessJWT: signAccessJWT({ email }),
    // refresh jwt is in user database
    refreshJWT: signRefreshJWT(email),
  };
};
