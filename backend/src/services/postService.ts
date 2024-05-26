import * as postDao from "../dao/postDAO";

export const getAllPostsService = async () => {
  return postDao.getAllPosts();
};

export const getPostByIdService = async (id: number) => {
  return postDao.getPostById(id);
};

export const createPostService = async (
  caption: string,
  content: string,
  user_id: number,
  images: string[] = []
) => {
  const post = await postDao.createPost({
    caption,
    content,
    user_id,
    images,
    votes: 0,
  });
  return post;
};

export const updatePostService = async (id: number, data: any) => {
  return postDao.updatePost(id, data);
};

export const deletePostService = async (id: number) => {
  return postDao.deletePost(id);
};
