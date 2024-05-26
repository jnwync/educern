import { Request, Response } from "express";
import * as commentService from "../services/commentService";

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await commentService.getAllCommentsService();
    res.json(comments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const comment = await commentService.getCommentByIdService(
      Number(req.params.id)
    );
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCommentController = async (req: Request, res: Response) => {
  const { content, user_id, post_id } = req.body;

  if (!content || !user_id || !post_id) {
    return res.status(400).json({ error: "Content, user_id, and post_id are required" });
  }

  try {
    const comment = await commentService.createCommentService(content, user_id, post_id);
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const updatedComment = await commentService.updateCommentService(
      Number(req.params.id),
      req.body
    );
    res.json(updatedComment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    await commentService.deleteCommentService(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
