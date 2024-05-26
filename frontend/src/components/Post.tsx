import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserType, CommentType, PostType } from "./NewsFeed";

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const token = localStorage.getItem("Token");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [user, setUser] = useState<UserType | null>(null);
  const [votes, setVotes] = useState<number>(0);
  const [newComment, setNewComment] = useState<string>("")

  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("Fetching comments for post_id: ", post.post_id);
        const response = await axios.get<CommentType[]>(
          `http://localhost:3000/comments/${post.post_id}`
        );
        setComments(response.data);
        console.log("Array of comments", comments);
        console.log("Fetched comments: ", response.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
    console.log("array of comments", comments);
  }, [post]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }

      if (post.user && post.user.user_id) {
        try {
          const response = await axios.get<UserType>(
            `http://localhost:3000/users/${post.user.user_id}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user", error);
        }
      }
    };

    const fetchVotes = async () => {
      try {
        const response = await axios.get<number>(
          `http://localhost:3000/votes/${post.post_id}`
        );
        setVotes(response.data);
      } catch (error) {
        console.error("Error fetching votes", error);
      }
    };

    fetchUser();
    fetchVotes();
  }, [post.post_id, post.user]);

  const handleLikeClick = async () => {
    try {
      await axios.put(`http://localhost:3000/posts/${post.post_id}/upvote`);
      setVotes((prevVotes) => prevVotes + 1);
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };
  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post<CommentType>(
        `http://localhost:3000/comments`,
        { content: newComment, post_id: post.post_id, user_id: user?.user_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };


  useEffect(() => {
    handleCommentSubmit()
  }, [])

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
          type="text"
          className="w-full px-4 py-2 border border-b-0 border-gray-400 rounded-tr-md rounded-br-md bg-stone-900 focus:outline-none"
          placeholder="Type here to comment..."
          value={newComment}
          onChange={handleCommentChange}
        />
      </div>
      <button
      onClick={handleCommentSubmit}
      >Send Comment</button>
      <div className="mt-4">
        {
          comments.map((comment) => (
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
