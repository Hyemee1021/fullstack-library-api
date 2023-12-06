import { getSession } from "../models/session/SessionModel.js";
import { getOneAdmin, getUserByEmail } from "../models/user/UserModel.js";
import { accessJWTDecode, signAccessJWT } from "../utils/jwtHelper.js";

//middleware always receives req, res, next
export const userAuth = async (req, res, next) => {
  try {
    //1. get token - authorization
    console.log(req.headers);
    //getting from front session storage
    const { authorization } = req.headers;

    //2. verify the token
    //validate accessJWT-user info
    const decoded = accessJWTDecode(authorization);
    console.log(decoded); //there is email amd other user info

    if (decoded?.email) {
      //check the token in talbe-session model
      //in database- it will find key name "token": authorizaiotn value
      const tokenExist = await getSession({ token: authorization });
      //I found the ringht person with the token
      if (tokenExist?._id) {
        //lets look if there is email for user
        const user = await getUserByEmail(decoded.email);
        //user has all the infor about user so
        //I sen everything but password
        if (user?._id) {
          //I found the user with email
          //set userinfo and send it to next middleware
          user.password = undefined;
          //set req.userinfo-infor coming from I need to check
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

//getting refreshAuth
export const refreshAuth = async (req, res, next) => {
  try {
    //1. get token - authorization- we send refresh token in autorization
    console.log(req.headers);

    //getting from front session storage-axios
    const { authorization } = req.headers;

    //2. verify the token
    //validate refresh token-user info
    const decoded = refreshJWTDecode(authorization);
    console.log(decoded); //there is email amd other user info

    if (decoded?.email) {
      //now we check user data with email so I can find a user

      //user database - look for user by email and refresh token
      const user = await getOneAdmin({
        email: decoded.email,
        refreshJWT: authorization,
      });

      //I found the ringht person with the token
      if (user?._id) {
        //if there is a user in user tablr
        // create new accessJWT and return
        const accessJWT = await signAccessJWT({ email: user.email });

        return res.json({
          status: "success",
          accessJWT,
        });
      }
    }
    throw new error(" Invalid token, unauthorized");
  } catch (error) {
    error.errorCode = 401; //try to send wrong token
    if (error.message.includes("jwt expired")) {
      error.errorCode = 403;
    }
    console.log(error);
    next(error);
  }
};
