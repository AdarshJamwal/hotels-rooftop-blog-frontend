import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://hotel-rooftop-blog-backend.vercel.app/api/',
        credentials: 'include', // Ensure your server is set up to handle this
    }),
    tagTypes: ['Blogs'],
    endpoints: (builder) => ({
        fetchBlogs: builder.query({
            query: ({ search = '', category = '', location = '' }) => 
                `/blogs?search=${search}&category=${category}&location=${location}`,
            providesTags: ['Blogs'],
        }),
        fetchBlogById: builder.query({
            query: (id) => `/blogs/${id}`,
        }),
        fetchRelatedBlogs: builder.query({
            query: (id) => `/blogs/related/${id}`,
        }),
        postBlog: builder.mutation({
            query: (newBlog) => ({
                url: `/blogs/create-post`,
                method: "POST",
                body: newBlog,
                credentials: "include",
            }),
            invalidatesTags: ['Blogs'],
        }),
        updateBlog: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/blogs/update-post/${id}`,
                method: "PATCH",
                body: rest,
                credentials: "include",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Blogs', id }],
        }),
        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Blogs', id }],
        }),
    }),
});

export const {
    useFetchBlogsQuery,
    useFetchBlogByIdQuery,
    useFetchRelatedBlogsQuery,
    usePostBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogApi;
