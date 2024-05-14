import prisma from "../prismaClient";

export const getAllPosts = async () => {
  return prisma.post.findMany();
};

export const getPostById = async (id: number) => {
  return prisma.post.findUnique({
    where: { post_id: id },
  });
};

export const createPost = async (data: any) => {
  return prisma.post.create({
    data,
  });
};

export const updatePost = async (id: number, data: any) => {
  return prisma.post.update({
    where: { post_id: id },
    data,
  });
};

export const deletePost = async (id: number) => {
  return prisma.post.delete({
    where: { post_id: id },
  });
};
