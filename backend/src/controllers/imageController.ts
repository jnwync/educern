import { Request, Response } from "express";
import imageDAO from "../dao/imageDAO";
import * as imageService from "../services/imageService";
import { generateUniqueFilename } from "../utils/filename";
import * as postService from "../services/postService";
import { File } from "../dao/imageDAO";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const uploadFile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { caption, content, user_id } = req.body;

  try {
    // Validate user_id
    const parsedUserId = Number(user_id);
    if (!parsedUserId || isNaN(parsedUserId)) {
      res.status(400).json({ error: "user_id must be a valid number" });
      return;
    }

    // Create the post first to get the post_id
    const newPost = await postService.createPostService(
      caption,
      content,
      parsedUserId
    );

    if (req.files) {
      const files = req.files as Express.Multer.File[];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uniqueFilename = generateUniqueFilename(
          newPost.post_id,
          file.originalname
        );
        await imageService.uploadFile(
          file.originalname,
          uniqueFilename,
          file.buffer,
          parsedUserId,
          newPost.post_id
        );
      }
    }

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
};

export const getFileById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const fileId = Number(req.params.id);
    if (isNaN(fileId)) {
      res.status(400).json({ error: "Invalid file ID" });
      return;
    }

    const file = await imageService.getFileById(fileId);
    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    res.json(file);
  } catch (error) {
    console.error("Error fetching file by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
