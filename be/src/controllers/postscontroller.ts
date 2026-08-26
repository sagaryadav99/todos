import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
export async function getallposts(req: Request, res: Response) {
  const userid = req.userid;
  try {
    const posts = await prisma.post.findMany({
      where: { AND: [{ authorId: userid }, { isDeleted: false }] },
    });
    return res.json(posts);
  } catch (e) {
    console.log(e);
    res.json({ message: "some error occured" });
  }
}
export async function createPost(req: Request, res: Response) {
  const userid = req.userid;
  const { title, description } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        description: description,
        completed: false,
        isDeleted: false,
        authorId: userid,
      },
    });
    return res.json({ post });
  } catch (e) {
    console.log(e);
    return res.json({ message: "some error occured" });
  }
}
export async function updatePost(req: Request, res: Response) {
  const { postid } = req.params;
  const userid = req.userid;
  const { title, description, completed } = req.body;
  try {
    if (!postid) {
      throw new Error("postid required");
    }
    const post = await prisma.post.upsert({
      where: {
        id: postid as string,
      },
      update: {
        title: title,
        description: description,
        completed: completed,
      },
      create: {
        title,
        description,
        completed,
        isDeleted: false,
        authorId: userid,
      },
    });
    return res.json(post);
  } catch (e) {
    console.log(e);
    return res.json({ message: "update not completed" });
  }
}
export async function toggleStatus(req: Request, res: Response) {
  const { postid } = req.params;
  const { flag } = req.query;
  if (!flag) {
    return res.json({ message: "done" });
  }
  const completed = flag === "true" ? true : false;
  try {
    const post = await prisma.post.update({
      where: {
        id: postid as string,
      },
      data: {
        completed,
      },
    });
    res.json(post);
  } catch (e) {
    console.log(e);
    res.json({ message: "some error occured" });
  }
}
export async function deletePost(req: Request, res: Response) {
  const { postid } = req.params;
  try {
    await prisma.post.update({
      where: {
        id: postid as string,
      },
      data: {
        isDeleted: true,
      },
    });
    res.json({ message: "deleted successfully" });
  } catch (e) {
    console.log(e);
    res.json({ message: "some error occured" });
  }
}
