import ImageDAO from "../dao/imageDAO";

const uploadFile = async (
  originalname: string,
  filename: string,
  buffer: Buffer
) => {
  try {
    const savedFile = await ImageDAO.uploadFile(originalname, filename, 1);

    return savedFile;
  } catch (error) {
    throw new Error("Failed to upload file");
  }
};

export default {
  uploadFile,
};
