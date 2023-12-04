import sessionSchema from "./SessionSchema.js";

//create

export const creatSession = (sessionbj) => {
  return sessionSchema(sessionbj).save();
};

//read filter must be an obj

export const getSession = (filter) => {
  return sessionSchema.findOne(filter);
};

//delete

export const deleteSession = (filter) => {
  return  sessionSchema.findOneAndDelete(filter);
};
