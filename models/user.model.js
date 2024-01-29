import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "crypto";
import authService from "../services/auth.js";
const userSchema = Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default.png",
      required: false,
    },
    role: {
      type: String,
      enm: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

//Before saving password to DB first hash that password
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashdPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashdPassword;
  next();
});

//Matching the Hashed password for Signin with Generated Token
userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not Found");

    const salt = user.salt;
    const hashdPassword = user.password;
    const useProvideHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashdPassword !== useProvideHash) throw new Error("Incorrect Password");
    const token = authService.createTokenForUser(user);
    return token;
  }
);

const User = model("User", userSchema);

export default User;
