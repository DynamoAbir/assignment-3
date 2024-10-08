import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import mongoose from "mongoose";

const app: Application = express();

app.use(express.json());
app.use(cors());
mongoose.set("strictPopulate", false);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Rockland");
});

app.use("/api", router);

export default app;
