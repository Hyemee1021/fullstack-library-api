import burrowSchema from "./BurrowSchema.js";

//create

export const creatBurrow = (burrowObj) => {
  return burrowSchema(burrowObj).save();
};

//read filter must be an obj

export const getABurrow = (filter) => {
  return burrowSchema.findOne(filter);
};

export const getManyBurrow = (filter) => {
  return burrowSchema.find(filter);
};

export const updateBurrow = (filter, update) => {
  return burrowSchema.findOneAndUpdate(filter, update);
};

//deletes access token is in burrow token
//filter has token: ~~~
export const deleteBurrow = (filter) => {
  return burrowSchema.findOneAndDelete(filter);
};
