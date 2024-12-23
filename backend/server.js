import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js";
import { mongoConnection } from "./config/dbConnection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(PORT, () => {
  mongoConnection();
  console.log("Server started at ", PORT);
});
