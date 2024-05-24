import React, { useState, useEffect } from "react";
import axios from "axios";

export interface UserType {
  user_id: number;
  first_name: string;
  last_name: string;
  profile: string;
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
  numberOfLikes: number;
  Comment: CommentType[];
}

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [userPosts, setUserPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:3000/users");
        setUser(userResponse.data);
        const postResponse = await axios.get("http://localhost:3000/posts");
        setUserPosts(postResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 mb-4 bg-stone-900 border-stone-950 rounded-lg shadow-md text-white">
      {user && (
        <div className="flex items-center">
          <img src={user.profile} alt="Profile Image" className="w-12 h-12 rounded-full outline" />
          <h2 className="text-2xl font-bold p-3">
            {user.first_name} {user.last_name}
          </h2>
        </div>
      )}
      {userPosts.map((post) => (
        <div key={post.post_id} className="p-4 mb-4 bg-stone-900 border-stone-950 rounded-lg shadow-md text-white">
          <h2 className="text-2xl font-bold p-3">{post.caption}</h2>
          <p>{post.content}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {post.image && <img src={post.image} alt="Post" className="w-full mt-2 rounded-md" />}
            {post.image && <img src={post.image} alt="Post" className="w-full mt-2 rounded-md" />}
            {post.image && <img src={post.image} alt="Post" className="w-full mt-2 rounded-md" />}
          </div>
          <div className="flex justify p-4">
            <div className="flex items-center w-full grow">
              <button className="px-4 py-2 border border-b-0 border-gray-400 rounded-tl-md rounded-bl-md bg-stone-900 focus:outline-none">
                Likes
              </button>
              <div className="w-0.5 h-8 bg-gray-400"></div>
              <input
                type="text"
                className="px-4 py-2 w-full border border-b-0 border-gray-400 rounded-tr-md rounded-br-md bg-stone-900 focus:outline-none"
                placeholder="Type here to comment..."
              />
            </div>
          </div>
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
      ))}
    </div>
  );
};

export default Post;
