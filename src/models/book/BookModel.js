import bookSchema from "./BookSchema.js";

//create

export const creatBook = (bookObj) => {
  return bookSchema(bookObj).save();
};

//read filter must be an obj

export const getAllBooks = () => {
  return bookSchema.find();
};
//read filter must be an obj

export const getABook = (filter) => {
  return bookSchema.findOne(filter);
};

//delete

export const deleteBook = (filter) => {
  return bookSchema.findOneAndDelete(filter);
};
