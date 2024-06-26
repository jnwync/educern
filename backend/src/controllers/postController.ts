import express, { Request, Response } from "express";
import * as postService from "../services/postService";
import * as imageService from "../services/imageService";
import { File } from "../dao/imageDAO";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

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
    const postId = Number(req.params.id);
    const post = await postService.getPostByIdService(postId);
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

export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.id);
    const updatedPost = await postService.updatePostService(postId, req.body);
    res.json(updatedPost);
  } catch (error: any) {
    console.error(`Error updating post with ID ${req.params.id}:`, error);
    res.status(500).json({ error: error.message });
  }
};

export const upvotePost = async (req: Request, res: Response) => {
  try {
    const post_id = req.params.postId;
    const user_id = req.params.postId;
    if (isNaN(Number(post_id)) || isNaN(Number(user_id))) {
      return res.status(400).json({ error: "Invalid postId or userId" });
    }
    await postService.upvotePostService(Number(post_id), Number(user_id));
    res.status(200).send("Post upvoted successfully");
  } catch (error) {
    console.error(`Error upvoting post with ID ${req.params.id}`, error);
    res.status(500).json({ error: "Error upvoting post" });
  }
};

export const getVotes = async (req: Request, res: Response) => {
  try {
    const post = req.body.id
    await postService.fetchVotes(post)
    res.status(200).send()
  } catch (error: any) {
    console.error(error)
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.id);
    await postService.deletePostService(postId);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting post with ID ${req.params.id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { caption, content, user_id } = req.body;

  try {
    // Validate user_id
    const parsedUserId = Number(user_id);
    if (!parsedUserId || isNaN(parsedUserId)) {
      return res.status(400).json({ error: "user_id must be a valid number" });
    }

    // Create the post first to get the post_id
    const newPost = await postService.createPostService(
      caption,
      content,
      parsedUserId
    );

    let images: Partial<File>[] = [];

    if (req.files) {
      const files = req.files as Express.Multer.File[];
      images = files.map((file) => ({
        originalname: file.originalname,
        filename: imageService.generateUniqueFilename(file.originalname),
        user_id: parsedUserId,
        post_id: newPost.post_id, // Use the newly created post's ID
      }));

      // Upload files associated with the new post
      for (const file of files) {
        await imageService.uploadFile(
          file.originalname,
          imageService.generateUniqueFilename(file.originalname),
          file.buffer,
          parsedUserId,
          newPost.post_id // Use the newly created post's ID
        );
      }
    }

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};
