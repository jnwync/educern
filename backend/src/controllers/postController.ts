import { Request, Response } from "express";
import * as postService from "../services/postService";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPostsService();
    res.json(posts);
  } catch (error: any) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await postService.getPostByIdService(Number(req.params.id));
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error: any) {
    console.error(`Error fetching post with ID ${req.params.id}:`, error);
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const postData = {
      ...req.body,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null, 
    };

    const newPost = await postService.createPostService(postData);
    res.status(201).json(newPost);
  } catch (error: any) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const updatedPost = await postService.updatePostService(
      Number(req.params.id),
      req.body
    );
    res.json(updatedPost);
  } catch (error: any) {
    console.error(`Error updating post with ID ${req.params.id}:`, error);
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    await postService.deletePostService(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    console.error(`Error deleting post with ID ${req.params.id}:`, error);
    res.status(500).json({ error: error.message });
  }
};
