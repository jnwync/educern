import React, { useEffect, useState } from "react";
import axios from "axios";
import Post, { PostType } from "./Post";
import PostForm from "./PostForm";

const NewsFeed = () => {
  const [posts, setPosts] = useState<PostType[]>([
    {
      post_id: 1,
      caption: "Dead Puss",
      content: "There has been a foul smell of a dead cat near engineering department building.",
      image: "https://via.placeholder.com/150",
      user: {
        user_id: 1,
        first_name: "John",
        last_name: "Doe",
      },
      Comment: [
        {
          comment_id: 1,
          content: "Nice post!",
          user: {
            user_id: 2,
            first_name: "Jane",
            last_name: "Smith",
          },
        },
      ],
    },
    {
      post_id: 2,
      caption: "Broken lock on door",
      content: "I'm worried that the faulty lock on the door in 2nd floor engineering building might cause to trap someone.",
      image: "https://via.placeholder.com/150",
      user: {
        user_id: 3,
        first_name: "Alice",
        last_name: "Johnson",
      },
      Comment: [],
    },
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get<PostType[]>("/api/posts");
  //       setPosts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching posts", error);
  //     }
  //   };

  //   fetchPosts();
  // }, []);

  const handlePostCreated = (newPost: PostType) => {
    setPosts([newPost, ...posts]);
    setShowCreateForm(false);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-800">
      <div className="w-full max-w-3xl">
        {showCreateForm && (
          <PostForm onPostCreated={handlePostCreated} onClose={handleCloseForm} />
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
  );
};

export default NewsFeed;
