import prisma from "../prismaClient";

export const getAllComments = async () => {
  return prisma.comment.findMany();
};

export const getCommentById = async (id: number) => {
  return prisma.comment.findUnique({
    where: { comment_id: id },
  });
};

export const createComment = async (data: any) => {
  return prisma.comment.create({
    data,
  });
};

export const updateComment = async (id: number, data: any) => {
  return prisma.comment.update({
    where: { comment_id: id },
    data,
  });
};

export const deleteComment = async (id: number) => {
  return prisma.comment.delete({
    where: { comment_id: id },
  });
};
