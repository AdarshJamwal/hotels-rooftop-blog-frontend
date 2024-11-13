import React, { useEffect, useRef, useState } from 'react';
import { useFetchBlogByIdQuery, useUpdateBlogMutation } from '../../../redux/features/blogs/blogsApi';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditorJS from '@editorjs/editorjs';
import List from "@editorjs/list";
import Header from "@editorjs/header";

const UpdatePost = () => {

    const { id } = useParams();
    const editorRef = useRef(null);
    const [title, setTitle] = useState("");
    const [coverImg, setCoverImg] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");

    const [updateBlog] = useUpdateBlogMutation();
    const { data: blog = {}, error, isLoading, refetch } = useFetchBlogByIdQuery(id);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        let editor;
        if (blog.post) {
            editor = new EditorJS({
                holder: 'editorjs',
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
                data: blog.post.content
            });
        }
        return () => {
            if (editor) {
                editor.isReady
                    .then(() => {
                        editor.destroy();
                    })
                    .catch((error) => console.error("Editor cleanup failed.", error));
                editorRef.current = null;
            }
        };
    }, [blog.post]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const content = await editorRef.current.save();
            const updatedPost = {
                title: title || blog.post.title,
                coverImg: coverImg || blog.post.coverImg,
                content,
                description: metaDescription || blog.post.description,
                author: user?._id,
                rating: rating || blog.post.rating
            };

            const response = await updateBlog({ id, ...updatedPost }).unwrap();
            console.log(response);
            alert("Blog is Updated Successfully");
            refetch();
            navigate("/dashboard");

        } catch (error) {
            console.log("Failed to Submit the post", error);
            setMessage("Failed to submit the post");
        }
    };

    return (
        <div className='bg-white md:p-8 p-2'>
            <h2 className='text-2xl font-semibold'>Edit or Update a post</h2>
            <form onSubmit={handleSubmit} className='space-y-5 pt-8'>
                <div className='space-y-4'>
                    <label className='font-semibold text-xl'>Blog Title:</label>
                    <input type="text"
                        defaultValue={blog?.post?.title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                        placeholder='Ex Travel to Beautiful Country Italy' required />
                </div>
                {/* Blog Details */}
                <div className='flex flex-col md:flex-row justify-between items-start gap-4'>
                    {/* left side */}
                    <div className='md:w-2/3 w-full'>
                        <p className='font-semibold text-xl mb-5'>Content Section</p>
                        <p className='text-xs italic'>Write your post below here...</p>
                        <div id='editorjs'></div>
                    </div>

                    {/* right side */}
                    <div className='md:w-1/3 w-full border p-5 space-y-5'>
                        <p className='text-xl font-semibold'>Choose Blog Format</p>
                        {/* images */}
                        <div className='space-y-4'>
                            <label className='font-semibold'>Blog Cover:</label>
                            <input type="text"
                                defaultValue={blog?.post?.coverImg}
                                onChange={(e) => setCoverImg(e.target.value)}
                                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                                placeholder='http://unsplash.com/image/cover-photo-of-blog1.png...' required />
                        </div>
                        <div className='space-y-4'>
                            <label className='font-semibold'>Category:</label>
                            <input type="text"
                                defaultValue={blog?.post?.category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                                placeholder='Rooftop /Travel/nature' required />
                        </div>
                        <div className='space-y-4'>
                            <label className='font-semibold'>Meta Description:</label>
                            <textarea
                                type="text"
                                cols={4}
                                rows={4}
                                defaultValue={blog?.post?.description}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                                placeholder='Write your Blog Meta Description' required />
                        </div>
                        {/* rating */}
                        <div className='space-y-4'>
                            <label className='font-semibold'>Rating:</label>
                            <input
                                type="number"
                                defaultValue={blog?.post?.rating}
                                onChange={(e) => setRating(e.target.value)}
                                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                            />
                        </div>
                        <div className='space-y-4'>
                            <label className='font-semibold'>Author:</label>
                            <input
                                type="text"
                                value={user.username}
                                className='w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3'
                                placeholder={`{user.username} (not editable)`}
                                disabled
                            />
                        </div>
                    </div>
                </div>
                {message && <p className='text-red-500'>{message}</p>}
                <button type='submit'
                    disabled={isLoading}
                    className='w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md'>
                    Update a Blog
                </button>
            </form>
        </div>
    );
};

export default UpdatePost;
 