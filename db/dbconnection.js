import mongoose from "mongoose";

async function dbConnection(paths) {
  try {
    await mongoose.connect(paths);
    console.log("Db is Connected");
  } catch (error) {
    console.log("Error is:", error);
  }
}

export default dbConnection;
