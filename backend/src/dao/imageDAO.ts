import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface File {
  id?: number;
  originalname: string;
  filename: string;
  user_id: number;
  post_id: number;
}

class ImageDAO {
  async uploadFile(
    originalname: string,
    filename: string,
    user_id: number,
    post_id: number
  ): Promise<File> {
    const file = await prisma.file.create({
      data: {
        originalname,
        filename,
        user_id,
        post_id,
      },
    });

    return file;
  }

  async getFilesByPostId(postId: number): Promise<File[]> {
    const files = await prisma.file.findMany({
      where: { post_id: postId },
    });

    return files;
  }

  async deleteFile(file_id: number): Promise<File | null> {
    const deletedFile = await prisma.file.delete({
      where: {
        id: file_id,
      },
    });

    return deletedFile;
  }
}

export default new ImageDAO();


