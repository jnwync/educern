import React, { useState } from "react";
import axios from "axios";

interface PostFormProps {
  onPostCreated: (newPost: any) => void;
  onClose: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated, onClose }) => {
  const [caption, setCaption] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("content", content);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    const userId = localStorage.getItem("user_id");
    if (userId) {
      formData.append("user_id", userId);
    } else {
      console.error("User ID not found in local storage");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/posts/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onPostCreated(response.data);
      setCaption("");
      setContent("");
      setImages([]);
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-8 text-white rounded-lg shadow-md bg-stone-900">
        <button
          onClick={onClose}
          className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="mb-4 text-xl font-semibold text-white">
          Create a New Post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full p-3 bg-transparent border rounded"
              maxLength={20}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              className="w-full p-3 bg-transparent border rounded"
              placeholder="Write your post..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={300}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImages(Array.from(e.target.files || []))}
              className="w-full p-3 border rounded"
              multiple
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
