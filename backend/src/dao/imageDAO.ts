import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface File {
  originalname: string;
  filename: string;
  user_id: number;
  post_id: number;
}

export const uploadFile = async (
  originalname: string,
  filename: string,
  user_id: number,
  post_id: number
): Promise<File> => {
  const file = await prisma.file.create({
    data: {
      originalname,
      filename,
      user_id,
      post_id,
    },
  });

  return file;
};

export const getFilesByPostId = async (post_id: number): Promise<File[]> => {
  const files = await prisma.file.findMany({
    where: {
      post_id,
    },
  });

  return files;
};

export const deleteFile = async (file_id: number): Promise<File> => {
  const deletedFile = await prisma.file.delete({
    where: {
      id: file_id,
    },
  });

  return deletedFile;
};
