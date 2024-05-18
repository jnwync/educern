import React from "react";

export interface UserType {
  user_id: number;
  first_name: string;
  last_name: string;
}

export interface CommentType {
  comment_id: number;
  content: string;
  user: UserType;
}

export interface PostType {
  post_id: number;
  caption: string;
  content: string;
  image?: string;
  user: UserType;
  Comment: CommentType[];
}

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="p-4 mb-4 bg-stone-900 border-stone-950 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-bold">
        {post.user.first_name} {post.user.last_name}
      </h2>
      <p className="font-semibold text-large">{post.caption}</p>
      <p>{post.content}</p>
      {post.image && <img src={post.image} alt="Post" className="w-full mt-2 rounded-md" />}
      <div className="mt-4">
        {post.Comment.map((comment) => (
          <div key={comment.comment_id} className="p-2 mt-2 border-t">
            <p className="font-semibold">
              {comment.user.first_name} {comment.user.last_name}
            </p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
