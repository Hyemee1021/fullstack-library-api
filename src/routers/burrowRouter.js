import express from "express";
import { getManyBurrow, creatBurrow } from "../models/burrow/BurrowModel.js";
import { newBurrowValidation } from "../middlewares/joiValidation.js";
import { updateBookById } from "../models/book/BookModel.js";

const router = express.Router();

router.post("/", newBurrowValidation, async (req, res, next) => {
  try {
    const numberOfDayToReturn = 15;

    const dueDate = new Date();

    dueDate.setDate(dueDate.getDate() + numberOfDayToReturn);

    //if admin makes request , return all burrow history

    // if a user login, I only retrun thier burrow history by thier ids
    const result = await creatBurrow({ ...req.body, dueDate });

    if (result?._id) {
      //update book is inactive ,ake impossible to burrow

      await updateBookById({
        _id: req.body.bookId,
        isAvailable: false,
        dueDate,
      });
      return res.json({
        status: "success",
        message:
          "You have burrowed the book, you ccan check it in your burrow history. ",
      });
    }
    res.json({
      status: "error",
      message: "unable to burrowed the book",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { role, _id } = req.userInfo;
    //if admin makes a request return all the burrow,
    //if an user request, only returns their burrow based on their id on burrow table
    const burrows =
      role === "admin" ? await getManyBurrow() : getManyBurrow({ userId: _id });

    burrows?.length
      ? res.json({
          status: "success",
          message: "here is burrow list",
          burrows,
        })
      : res.json({
          status: "error",
          message: "unable to get the burrow book list",
        });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
export default router;
