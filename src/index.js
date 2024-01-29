import express from "express";
import path from "path";
import dbConnection from "../db/dbconnection.js";
import userRouter from "../routes/user.js";
import cookieParser from "cookie-parser";
import checkForAuthCokkie from "../middlewares/auth.js";
import blogRouter from "../routes/blog.js";
import Blog from "../models/blog.model.js";

const app = express();

dbConnection("mongodb://127.0.0.1:27017/Blogify");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCokkie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allBlog = await Blog.find({});

  res.render("home", {
    user: req.user,
    blogs: allBlog,
  });
});

app.use("/users", userRouter);
app.use("/blog", blogRouter);

app.listen(process.env.PORT || 8000, (req, res) => {
  console.log("Server is running..");
});