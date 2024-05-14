import * as commentDao from "../dao/commentDAO";

export const getAllCommentsService = async () => {
  return commentDao.getAllComments();
};

export const getCommentByIdService = async (id: number) => {
  return commentDao.getCommentById(id);
};

export const createCommentService = async (data: any) => {
  return commentDao.createComment(data);
};

export const updateCommentService = async (id: number, data: any) => {
  return commentDao.updateComment(id, data);
};

export const deleteCommentService = async (id: number) => {
  return commentDao.deleteComment(id);
};
