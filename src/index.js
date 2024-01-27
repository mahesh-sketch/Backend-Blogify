import express from "express";
import path from "path";
import dbConnection from "../db/dbconnection.js";
import userRouter from "../routes/user.js";

const app = express();

dbConnection("mongodb://127.0.0.1:27017/Blogify");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/users", userRouter);

app.listen(process.env.PORT || 8000, (req, res) => {
  console.log("Server is running..");
});
