import { PrismaClient } from "@prisma/client";
import { File } from "./imageDAO";

const prisma = new PrismaClient();

export const getAllPostsService = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
    },
  });
  const postsWithImages = await Promise.all(
    posts.map(async (post) => {
      const images = await getFilesByPostId(post.post_id);
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
    const images = await getFilesByPostId(post.post_id);
    return { ...post, images };
  }
  return null;
};

export const getVotesByIdService = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: { post_id: id },
    include: {
      Upvote: true,
    },
  });

  if (post) {
    const votesCount = post.Upvote.length;
    return { ...post, votesCount };
  }
  return null;
};

export const createPostService = async (
  caption: string,
  content: string,
  user_id: number,
  images: File[]
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

export const deletePost = async (id: number) => {

  await prisma.comment.deleteMany({
    where: { post_id: id },
  })

  await prisma.file.deleteMany({
    where: { post_id: id },
  })

  return prisma.post.delete({
    where: { post_id: id },
  });
};

export const getFilesByPostId = async (post_id: number) => {
  return prisma.file.findMany({
    where: {
      post_id,
    },
  });
};

export const upvotePost = async (user_id: number, post_id: number) => {
  const existingUpvote = await prisma.upvote.findUnique({
    where: {
      user_id_post_id: {
        user_id,
        post_id,
      },
    },
  });

  if (existingUpvote) {
    return "User has upvoted this post already.";
  } else {
    await prisma.upvote.create({
      data: {
        user_id,
        post_id,
      },
    });
  }
  await prisma.post.update({
    where: { post_id },
    data: {
      votes: { increment: 1 },
    },
  });
  return "Upvote successful.";
};

export default prisma;

