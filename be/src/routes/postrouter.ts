import Router from "express";
import { authmiddleware } from "../middlewares/authmiddleware";
import {
  createPost,
  deletePost,
  getallposts,
  toggleStatus,
  updatePost,
} from "../controllers/postscontroller";
export const postrouter = Router();

postrouter.get("/", authmiddleware, getallposts);
postrouter.post("/", authmiddleware, createPost);
postrouter.put("/:postid", authmiddleware, updatePost);
postrouter.patch("/:postid", authmiddleware, toggleStatus);
postrouter.delete("/:postid", authmiddleware, deletePost);
