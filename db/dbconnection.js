import mongoose from "mongoose";

async function dbConnection(path) {
  try {
    await mongoose.connect(path);
    console.log("Db is Connected");
  } catch (error) {
    console.log("Error is:", error);
  }
}

export default dbConnection;
