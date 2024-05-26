import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserType, CommentType, PostType } from "./NewsFeed";

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const [votes, setVotes] = useState<number>(0);

  useEffect(() => {
    console.log("Post user_id:", post.user_id);
    console.log("Post post_id:", post.post_id);

    const fetchUser = async () => {
      if (post.user && post.user_id) {
        try {
          const response = await axios.get<UserType>(
            `http://localhost:3000/users/${post.user_id}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user", error);
        }
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get<CommentType[]>(
          `http://localhost:3000/posts/${post.post_id}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };

    const fetchVotes = async () => {
      try {
        const response = await axios.get<number>(
          `http://localhost:3000/posts/${post.post_id}/votes`
        );
        setVotes(response.data);
      } catch (error) {
        console.error("Error fetching votes", error);
      }
    };

    fetchUser();
    fetchComments();
    fetchVotes();
  }, [post.post_id, post.user]);

  const handleLikeClick = async () => {
    try {
      await axios.post(`http://localhost:3000/posts/${post.post_id}/vote`);
      setVotes((prevVotes) => prevVotes + 1);
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("images", file);
    formData.append("user_id", String(post.user_id));
    formData.append("post_id", String(post.post_id));

    try {
      const response = await axios.post(
        "http://localhost:3000/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div className="p-4 mb-4 text-white rounded-lg shadow-md bg-stone-900 border-stone-950">
      {user && (
        <div className="flex items-center">
          <img
            src={user.profile}
            alt="Profile Image"
            className="w-12 h-12 rounded-full outline"
          />
          <h2 className="p-3 text-2xl font-bold">
            {user.first_name} {user.last_name}
          </h2>
        </div>
      )}
      <h2 className="p-3 text-2xl font-bold">{post.caption}</h2>
      <p>{post.content}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {post.image && (
          <img src={post.image} alt="Post" className="w-full mt-2 rounded-md" />
        )}
      </div>
      <div className="flex items-center p-4">
        <button
          onClick={handleLikeClick}
          className="flex items-center px-4 py-2 border border-b-0 border-gray-400 rounded-tl-md rounded-bl-md bg-stone-900 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 mr-1 rotate-180"
          >
            <path
              fillRule="evenodd"
              d="M10 2a.75.75 0 0 1 .75.75v10.809l1.97-1.97a.75.75 0 0 1 1.06 1.06l-3.5 3.5a.75.75 0 0 1-1.06 0l-3.5-3.5a.75.75 0 0 1 1.06-1.06l1.97 1.97V2.75A.75.75 0 0 1 10 2z"
            />
          </svg>
          <span>{votes}</span>
        </button>
        <div className="w-0.5 h-8 bg-gray-400"></div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 border border-b-0 border-gray-400 rounded-tr-md rounded-br-md bg-stone-900 focus:outline-none"
        />
      </div>
      <div className="mt-4">
        {comments.map((comment) => (
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
