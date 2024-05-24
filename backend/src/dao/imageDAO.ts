import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface File {
  id: number;
  originalname: string;
  filename: string;
  user_id: number;
}

class ImageDAO {
  async uploadFile(
    originalname: string,
    filename: string,
    user_id: number
  ): Promise<File> {
    const file = await prisma.file.create({
      data: {
        originalname,
        filename,
        user_id,
      },
    });

    return file;
  }

  async getFileById(file_id: number): Promise<File | null> {
    const file = await prisma.file.findUnique({
      where: {
        id: file_id,
      },
    });

    return file;
  }

  async deleteFile(file_id: number): Promise<File[]> {
    const deletedFile = await prisma.file.delete({
      where: {
        id: file_id,
      },
    });

    return [deletedFile];
  }
}

export default new ImageDAO();
