import ImageDAO from "../dao/ImageDAO";

interface File {
  id: number;
  originalname: string;
  filename: string;
  user_id: number;
}

class ImageService {
  async uploadFile(
    originalname: string,
    filename: string,
    buffer: Buffer
  ): Promise<File> {
    const user_id = 1;

    const file = await ImageDAO.uploadFile(originalname, filename, user_id);

    return file;
  }

  async getFileById(file_id: number): Promise<File | undefined> {
    const file = await ImageDAO.getFileById(file_id);
    return file ?? undefined;
  }

  async deleteFile(file_id: number): Promise<File[]> {
    const deletedFile = await ImageDAO.deleteFile(file_id);
    return deletedFile;
  }
}

export default new ImageService();
