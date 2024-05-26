  import { PrismaClient } from "@prisma/client";
  import { File } from "../dao/imageDAO";

  const prisma = new PrismaClient();

  export const getAllPostsService = async () => {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        File: true,
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
      },
    });

    return post;
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
    const { File, ...postData } = data;

    const updatedPost = await prisma.post.update({
      where: { post_id: id },
      data: {
        ...postData,
        File: {
          create: Array.isArray(File)
            ? File.map((file: any) => ({
                originalname: file.originalname,
                filename: file.filename,
                user_id: file.user_id,
              }))
            : [],
        },
      },
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

  export const getFilesByPostId = async (post_id: number) => {
    const files = await prisma.file.findMany({
      where: { post_id },
    });

    return files;
  };

  export default prisma;
