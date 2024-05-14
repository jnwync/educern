import { Request, Response } from "express";
import * as commentService from "../services/commentService";

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const comments = await commentService.getAllCommentsService();
    res.json(comments);
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const newComment = await commentService.createCommentService(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const updatedComment = await commentService.updateCommentService(
      Number(req.params.id),
      req.body
    );
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    await commentService.deleteCommentService(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
