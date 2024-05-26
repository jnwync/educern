import { PrismaClient } from "@prisma/client";
import * as imageDAO from "../dao/imageDAO";

const prisma = new PrismaClient();

export const getAllPostsService = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
  });
  const postsWithImages = await Promise.all(
    posts.map(async (post) => {
      const images = await imageDAO.getFilesByPostId(post.post_id);
      return { ...post, images };
    })
  );
  return postsWithImages;
};

export const getPostByIdService = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: { post_id: id },
    include: {
      user: true,
      File: true,
    },
  });
  if (post) {
    const images = await imageDAO.getFilesByPostId(post.post_id);
    return { ...post, images };
  }
  return null;
};

export const createPostService = async (
  caption: string,
  content: string,
  user_id: number,
  images: imageDAO.File[]
) => {
  const newPost = await prisma.post.create({
    data: {
      caption,
      content,
      user_id,
      File: {
        create: images.map((file) => ({
          originalname: file.originalname,
          filename: file.filename,
          user_id: file.user_id,
          post_id: file.post_id,
        })),
      },
      votes: 0,
    },
    include: {
      user: true,
      File: true,
    },
  });
  return newPost;
};

export const updatePostService = async (id: number, data: any) => {
  const updatedPost = await prisma.post.update({
    where: { post_id: id },
    data,
    include: {
      user: true,
      File: true,
    },
  });
  return updatedPost;
};

export const deletePostService = async (id: number) => {
  const deletedPost = await prisma.post.delete({
    where: { post_id: id },
  });
  return deletedPost;
};

export const upvotePostService = async (id: number) => {
  return prisma.post.update({
    where: { post_id: id },
    data: {
      votes: {
        increment: 1,
      },
    },
  });
};

export default prisma;
