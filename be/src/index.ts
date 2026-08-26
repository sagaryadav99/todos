import express from "express";
const app = express();
import { userRouter } from "./routes/userrouter";
import { postrouter } from "./routes/postrouter";
app.use(express.json());
app.use("/user", userRouter);
app.use("/post", postrouter);
app.listen(3000, () => {
  console.log("server running on 3000");
});
