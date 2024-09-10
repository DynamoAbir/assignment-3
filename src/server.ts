import mongoose from "mongoose";
import app from "./app";
const port = 5020;

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/rockland" as string);
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
