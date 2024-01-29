import User from "../models/user.model.js";

async function handleSignin(req, res) {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("signin", {
      error: "Incorrect Email and Password",
    });
  }
}
export default handleSignin;
