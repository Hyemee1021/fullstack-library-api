import express from "express";
import { getAllBooks, creatBook } from "../models/book/BookModel.js";
const router = express.Router();
import { userAuth } from "../middlewares/authMiddleware.js";
import { newBookValidation } from "../middlewares/joiValidation.js";
router.get("/", async (req, res, next) => {
  try {
    const books = await getAllBooks();

    res.json({
      status: "succcess",
      message: "here is all the books",
      books,
    });
  } catch (error) {
    next(error);
  }
});

//=============private

router.post("/", userAuth, newBookValidation, async (req, res, next) => {
  try {
    if (req.userInfo.role !== "admin") {
      throw new error("You do not have permission");
    }
    const book = await creatBook(req.body);

    book?._id
      ? res.json({
          status: "succcess",
          message: "Book has been added",
        })
      : res.json({
          status: "error",
          message: "Unsuccessful adding book",
        });

    const books = creatBook(req.body);
  } catch (error) {
    next(error);
  }
});

export default router;
