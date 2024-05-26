import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import PostForm from "./PostForm";
import Navbar from "./Navbar";

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
  user_id: number;
  caption: string;
  content: string;
  image?: string;
  user: UserType;
  votes: number;
  Comment: CommentType[];
}

const NewsFeed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<PostType[]>(
          "http://localhost:3000/posts/"
        );
        console.log("Fetched posts:", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostCreated = (newPost: PostType) => {
    setPosts([newPost, ...posts]);
    setShowCreateForm(false);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-stone-800">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-stone-800">
        <div className="w-full max-w-3xl">
          {showCreateForm && (
            <PostForm
              onPostCreated={handlePostCreated}
              onClose={handleCloseForm}
            />
          )}
          <button
            className="w-full px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => setShowCreateForm(true)}
          >
            Create New Post
          </button>
          <div className="h-[600px] overflow-y-auto">
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => <Post key={post.post_id} post={post} />)
            ) : (
              <p className="text-center">No posts available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
