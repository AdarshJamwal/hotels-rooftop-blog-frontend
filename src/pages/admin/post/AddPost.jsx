import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import { usePostBlogMutation } from "../../../redux/features/blogs/blogsApi";

const AddPost = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const [postBlog, { isLoading }] = usePostBlogMutation();
  const { user, token } = useSelector((state) => state.auth); // Access token here

  const navigate = useNavigate();

  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        editorRef.current = editor;
      },
      autofocus: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
      },
    });

    // Cleanup editor on component unmount
    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editorRef.current) {
      setMessage("Editor is not ready.");
      return;
    }

    try {
      const content = await editorRef.current.save();

      if (!title || !coverImg || !category || !metaDescription || rating <= 0) {
        setMessage("Please fill in all fields.");
        return;
      }

      const newPost = {
        title,
        coverImg,
        content,
        category,
        description: metaDescription,
        author: user?._id,
        rating,
      };

      const response = await postBlog(newPost, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token here
        },
      }).unwrap();

      if (response) {
        alert("Blog posted successfully!");
        navigate("/"); // Navigate to the home page on success
      } else {
        setMessage("Authentication required.");
      }
    } catch (error) {
      console.error("Failed to submit the post", error);
      setMessage("Failed to submit the post.");
    }
  };

  return (
    <div className="bg-white md:p-8 p-2">
      <h2 className="text-2xl font-semibold text-gray-900">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5 pt-8">
        <div className="space-y-4">
          <label htmlFor="title" className="font-semibold text-xl text-gray-800">Blog Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-100 text-gray-900 focus:outline-none px-5 py-3 border border-gray-300"
            placeholder="Ex: Travel to Beautiful Country Italy"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="md:w-2/3 w-full">
            <p className="font-semibold text-xl mb-5 text-gray-800">Content Section</p>
            <p className="text-xs italic text-gray-700">Write your post below here...</p>
            <div id="editorjs"></div>
          </div>

          <div className="md:w-1/3 w-full border p-5 space-y-5 bg-gray-100">
            <p className="text-xl font-semibold text-gray-800">Choose Blog Format</p>
            <div className="space-y-4">
              <label htmlFor="coverImg" className="font-semibold text-gray-800">Blog Cover:</label>
              <input
                id="coverImg"
                type="text"
                value={coverImg}
                onChange={(e) => setCoverImg(e.target.value)}
                className="w-full bg-gray-100 text-gray-900 focus:outline-none px-5 py-3 border border-gray-300"
                placeholder="http://unsplash.com/image/cover-photo-of-blog1.png"
                required
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="category" className="font-semibold text-gray-800">Category:</label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-100 text-gray-900 focus:outline-none px-5 py-3 border border-gray-300"
                placeholder="Rooftop / Travel / Nature"
                required
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="metaDescription" className="font-semibold text-gray-800">Meta Description:</label>
              <textarea
                id="metaDescription"
                cols={4}
                rows={4}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full bg-gray-100 text-gray-900 focus:outline-none px-5 py-3 border border-gray-300"
                placeholder="Write your Blog Meta Description"
                required
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="rating" className="font-semibold text-gray-800">Rating:</label>
              <input
                id="rating"
                type="number"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full bg-gray-100 text-gray-900 focus:outline-none px-5 py-3 border border-gray-300"
                min="1"
                max="5"
                required
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="author" className="font-semibold text-gray-800">Author:</label>
              <input
                id="author"
                type="text"
                value={user?.username || "Guest"}
                className="w-full bg-gray-100 text-gray-900 focus:outline-none px-5 py-3 border border-gray-300"
                placeholder="Author (not editable)"
                disabled
              />
            </div>
          </div>
        </div>
        {message && <p className="text-red-500">{message}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
        >
          {isLoading ? "Submitting..." : "Add New Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
