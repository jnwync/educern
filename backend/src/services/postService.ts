import { PrismaClient, File } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPostsService = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      File: true,
      Comment: true,
    },
  });

  return posts;
};

export const getPostByIdService = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: { post_id: id },
    include: {
      user: true,
      File: true,
      Comment: true,
    },
  });

  return post;
};

export const createPostService = async (
  caption: string,
  content: string,
  user_id: number
) => {
  const newPost = await prisma.post.create({
    data: {
      caption,
      content,
      user_id,
      votes: 0,
    },
    include: {
      user: true,
      File: true,
      Comment: true,
    },
  });

  return newPost;
};

export const updatePostService = async (id: number, data: any) => {
  const { File, ...postData } = data;

  // Basic validation for File data
  if (Array.isArray(File)) {
    File.forEach((file: any) => {
      if (
        !file.originalname ||
        !file.filename ||
        !file.user_id ||
        !file.post_id
      ) {
        throw new Error("Missing required fields in File data");
      }
    });
  } else if (
    File &&
    (!File.originalname || !File.filename || !File.user_id || !File.post_id)
  ) {
    throw new Error("Missing required fields in File data");
  }

  let updatedPost;

  if (File) {
    const filesToCreate = Array.isArray(File)
      ? File.map((file: any) => ({
          originalname: file.originalname,
          filename: file.filename,
          user_id: file.user_id,
          post_id: file.post_id,
        }))
      : [
          {
            originalname: File.originalname,
            filename: File.filename,
            user_id: File.user_id,
            post_id: File.post_id,
          },
        ];

    updatedPost = await prisma.post.update({
      where: { post_id: id },
      data: {
        ...postData,
        File: {
          create: filesToCreate,
        },
      },
      include: {
        user: true,
        File: true,
        Comment: true,
      },
    });
  } else {
    updatedPost = await prisma.post.update({
      where: { post_id: id },
      data: postData,
      include: {
        user: true,
        File: true,
        Comment: true,
      },
    });
  }

  return updatedPost;
};

export const deletePostService = async (id: number) => {
  const deletedPost = await prisma.post.delete({
    where: { post_id: id },
  });

  return deletedPost;
};

export const getFilesByPostId = async (post_id: number) => {
  const files = await prisma.file.findMany({
    where: { post_id },
  });

  return files;
};

export const upvotePostService = async (id: number) => {
  const updatedPost = await prisma.post.update({
    where: { post_id: id },
    data: {
      votes: {
        increment: 1,
      },
    },
  });
  return updatedPost;
};

export default prisma;
