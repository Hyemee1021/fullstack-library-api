import userSchema from "./UserSchema.js";

//create

export const createUser = (userObj) => {
  return userSchema(userObj).save();
};
//read

export const getUserByEmail = (email1) => {
  return userSchema.findOne({ email: email1 });
};

//read
//filter has refresh token and email
export const getOneAdmin = (filter) => {
  return userSchema.findOne(filter);
};

//update

//delete

//add refreshJWT to user Table,
export const updateRefreshJWT = async (email, refreshJWT) => {
  return await userSchema.findOneAndUpdate({ email }, { refreshJWT });
};
