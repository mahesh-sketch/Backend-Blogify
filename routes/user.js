import express from "express";
import handleSignin from "../controllers/signin.controller.js";
import multer from "multer";
import User from "../models/user.model.js";
import path from "path";
const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/profiles/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const uploads = multer({ storage: storage });

userRouter.get("/signin", (req, res) => {
  return res.render("signin");
});

userRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

userRouter.post("/signin", handleSignin);

userRouter.post("/signup", uploads.single("profileImage"), async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  await User.create({
    fullName,
    email,
    password,
    profileImageURL: `/profiles/${req.file.filename}`,
  });
  return res.redirect("/");
});

userRouter.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});

export default userRouter;
