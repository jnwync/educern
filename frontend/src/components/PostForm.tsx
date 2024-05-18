import React, { useState } from "react";
import axios from "axios";
import { PostType } from "./Post";

interface PostFormProps {
  onPostCreated: (newPost: PostType) => void;
  onClose: () => void; 
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated, onClose }) => {
  const [caption, setCaption] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 20) {
      setCaption(e.target.value);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 300) {
      setContent(e.target.value);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onPostCreated(response.data);
      setCaption("");
      setContent("");
      setImage(null);
      onClose();
    } catch (error) {
      console.error("Error creating post", error);
    }
  };

  const handleCancel = () => {
    onClose(); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <button
          onClick={handleCancel}
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
        <h2 className="mb-4 text-xl font-semibold">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Caption"
              value={caption}
              onChange={handleCaptionChange}
              className="w-full p-3 border rounded"
              maxLength={20}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              className="w-full p-3 border rounded"
              placeholder="Write your post..."
              value={content}
              onChange={handleContentChange}
              maxLength={300}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border rounded"
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
