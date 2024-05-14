import * as postDao from "../dao/postDAO";

export const getAllPostsService = async () => {
  return postDao.getAllPosts();
};

export const getPostByIdService = async (id: number) => {
  return postDao.getPostById(id);
};

export const createPostService = async (data: any) => {
  return postDao.createPost(data);
};

export const updatePostService = async (id: number, data: any) => {
  return postDao.updatePost(id, data);
};

export const deletePostService = async (id: number) => {
  return postDao.deletePost(id);
};
