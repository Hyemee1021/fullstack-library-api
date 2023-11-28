import userSchema from "./UserSchema.js";

//create

export const createUser = (userObj) => {
  return userSchema(userObj).save();
};
//read

export const getUserByEmail = (email1) => {
  return userSchema.findOne({ email: email1 });
};

//update

//delete
