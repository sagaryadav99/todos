import express from "express";
const PORT = process.env.PORT || 3000;
const app = express();
import cors from "cors";
import { userRouter } from "./routes/userrouter";
import { postrouter } from "./routes/postrouter";
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use("/user", userRouter);
app.use("/post", postrouter);
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
