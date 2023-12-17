import bookSchema from "./BookSchema.js";

//create

export const creatBook = (bookObj) => {
  return bookSchema(bookObj).save();
};

//read filter must be an obj

export const getAllBooks = (filter) => {
  return bookSchema.find(filter);
};
//read filter must be an obj

export const getBookById = (_id) => {
  return bookSchema.findById(_id);
};
export const getABook = (filter) => {
  return bookSchema.findOne(filter);
};

//update book
export const updateBookById = ({ _id, ...rest }) => {
  return bookSchema.findByIdAndUpdate(_id, rest);
};

//delete

export const deleteBook = (_id) => {
  return bookSchema.findOneAndDelete(_id);
};
