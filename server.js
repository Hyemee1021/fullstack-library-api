import "dotenv/config";

import express from "express";
const app = express();

const PORT = process.env.PORT || 8000;

import cors from "cors";
import morgan from "morgan";

//db connect

import { connectDB } from "./src/config/dbConfig.js";
import { userAuth } from "./src/middlewares/authMiddleware.js";
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//api
import userRouter from "./src/routers/userRouter.js";
app.use("/api/v1/users", userRouter);

import bookRouter from "./src/routers/bookRouter.js";
app.use("/api/v1/books", bookRouter);

import burrowRouter from "./src/routers/burrowRouter.js";
app.use("/api/v1/burrows", userAuth, burrowRouter);

//root
app.get("/", (req, res) => {
  res.json({
    ststus: "success",
    message: "server running well",
  });
});

app.use("*", (req, res, next) => {
  const error = {
    message: "404 page not found",
    errorCode: 404,
  };
  next(error);
});

//error handler

app.use((error, req, res, next) => {
  const errorCode = error.errorCode || 500;
  console.log(error);
  res.status(errorCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`server is running at http://localhost:${PORT}`);
});
