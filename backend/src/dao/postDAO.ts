import prisma from "../prismaClient";

interface Post {
  post_id: number;
  caption: string;
  content: string;
  images: string[];
  user_id: number;
}

export const getAllPosts = async () => {
  return prisma.post.findMany();
};

export const getPostById = async (id: number) => {
  return prisma.post.findUnique({
    where: { post_id: id },
  });
};

export const createPost = async ({
  caption,
  content,
  user_id,
  images,
  votes,
}: {
  caption: string;
  content: string;
  user_id: number;
  images: string[];
  votes: number;
}) => {
  return prisma.post.create({
    data: {
      caption,
      content,
      user_id,
      images,
      votes,
    },
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
