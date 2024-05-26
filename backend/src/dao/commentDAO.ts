import prisma from "../prismaClient";

interface CreateCommentData {
  content: string;
  user_id: number;
  post_id: number;
}

export const getAllComments = async () => {
  return prisma.comment.findMany();
};

export const getCommentById = async (id: number) => {
  return prisma.comment.findUnique({
    where: { comment_id: id },
  });
};

export const getComments = async (id: number) => {
  const sample = await prisma.comment.findMany({
    where: { post_id: id },
    include: { user: true },
  });
  return sample;
};

export const createComment = async ({ content, user_id, post_id }: CreateCommentData) => {
  return prisma.comment.create({
    data: {
      content,
      user: {
        connect: { user_id }
      },
      post: {
        connect: { post_id }
      }
    },
    include: {
      user: true,
      post: true
    },
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
