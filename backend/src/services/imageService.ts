import ImageDAO from "../dao/imageDAO";

export const uploadFile = async (
  originalname: string,
  filename: string,
  buffer: Buffer,
  user_id: number,
  post_id: number
) => {
  try {
    const savedFile = await ImageDAO.uploadFile(
      originalname,
      filename,
      user_id,
      post_id
    );

    return savedFile;
  } catch (error) {
    throw new Error("Failed to upload file");
  }
};

export const getFilesByPostId = async (post_id: number) => {
  try {
    const files = await ImageDAO.getFilesByPostId(post_id);
    return files;
  } catch (error) {
    throw new Error("Failed to fetch images by post_id");
  }
};
