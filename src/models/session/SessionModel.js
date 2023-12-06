import sessionSchema from "./SessionSchema.js";

//create

export const creatSession = (sessionObj) => {
  return sessionSchema(sessionObj).save();
};

//read filter must be an obj

export const getSession = (filter) => {
  return sessionSchema.findOne(filter);
};

//deletes access token is in session token
//filter has token: ~~~
export const deleteSession = (filter) => {
  return sessionSchema.findOneAndDelete(filter);
};
