import { Request, Response } from "express";
import * as postService from "../services/postService";
import * as userService from "../services/userService";

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
    const postId = Number(req.params.id);
    const updatedPost = await postService.upvotePostService(postId);
  } catch (error) {
    console.error(`Error upvoting post with ID ${req.params.id}`, error)
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.id);
    await postService.deletePostService(postId);
    res.status(204).send();
  } catch (error: any) {
    console.error(`Error deleting post with ID ${req.params.id}:`, error);
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { caption, content } = req.body;
  const images = req.files
    ? (req.files as Express.Multer.File[]).map((file) => file.path)
    : [];
  const user_id = req.body.user_id ? Number(req.body.user_id) : undefined;

  try {
    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    const newPost = await postService.createPostService(
      caption,
      content,
      user_id,
      images
    );
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

export const createNewPost = async (req: Request, res: Response) => {
  try {
    const { caption, content, user_id } = req.body;

    if (!req.files || !("images" in req.files)) {
      return res.status(400).json({ error: "No images uploaded." });
    }

    const images = (req.files["images"] as Express.Multer.File[]).map(
      (image: any) => image.path
    );

    const newPost = await postService.createPostService(
      caption,
      content,
      Number(user_id),
      images
    );

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

export const getUserByIdAndPostIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const post = await postService.getPostByIdService(Number(id));

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const user = await userService.getUserByIdService(post.user_id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      post_id: post.post_id,
      caption: post.caption,
      content: post.content,
      images: post.images,
      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      votes: post.votes,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
