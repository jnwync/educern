import * as commentDao from "../dao/commentDAO";

export const getAllCommentsService = async () => {
  return commentDao.getAllComments();
};

export const getCommentByIdService = async (id: number) => {
  try {
    return commentDao.getComments(id);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createCommentService = async (content: string, user_id: number, post_id: number) => {
  const comment = await commentDao.createComment({
    content,
    user_id,
    post_id
  });
  return comment
};

export const updateCommentService = async (id: number, data: any) => {
  return commentDao.updateComment(id, data);
};

export const deleteCommentService = async (id: number) => {
  return commentDao.deleteComment(id);
};
