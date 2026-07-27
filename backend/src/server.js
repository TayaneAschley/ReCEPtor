import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { router } from "./routes/router.js";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
