import { getSession } from "../models/session/SessionModel.js";
import { getUserByEmail } from "../models/user/UserModel.js";
import { accessJWTDecode } from "../utils/jwtHelper.js";

export const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    //validate accessJWT
    const decoded = accessJWTDecode(authorization);
    console.log(decoded); //there is email

    if (decoded?.email) {
      //check the token in talbe
      const tokenExist = await getSession({ token: authorization });
      //there is a user with the authorization
      //then tokenExist had _id
      if (tokenExist?._id) {
        //lets look if there is email for user
        const user = await getUserByEmaIil(decoded.email);
        //user has all the infor about user so
        //I sen everything but password
        if (user?._id) {
          user.password = undefined;
          req.userInfo = user; //send to userRouter

          return next();
        }
      }
    }
    throw new error(" Invalid token, unauthorized");
  } catch (error) {
    error.errorCode = 401; //try to send wrong token
    if (error.message.includes("jwt expired")) {
      error.errorCode = 403;
    }
    console.log(error);
  }
};
