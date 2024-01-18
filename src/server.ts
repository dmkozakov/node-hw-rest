import mongoose from 'mongoose';
import app from "./app";

const { DB_HOST } = process.env;

if (typeof DB_HOST === "string") {
  mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })
}