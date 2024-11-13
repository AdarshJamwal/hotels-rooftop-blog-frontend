import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { usePostCommentMutation } from '../../../redux/features/comments/commentApi';
import { useFetchBlogByIdQuery } from '../../../redux/features/blogs/blogsApi';

const PostComment = () => {
    const {id} = useParams();
    const [comment, setComment] = useState('')


    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate()

    const [postComment] = usePostCommentMutation();
    const {refetch} = useFetchBlogByIdQuery(id, {skip:!id})

    const handleSubmit = async(e)=>{
      e.preventDefault();

      if(!user){
        alert("Please login to comment to this post");
        navigate('/login')
        return;
      }
      const newComment={
        comment: comment, 
        user: user ? user.id : undefined,
        postId:id
      
      }
     

      try {
        const response = await postComment(newComment).unwrap()
        console.log(response);
        alert('Comment posted Successfully')
        setComment('')
        refetch()
        
      } catch (error) {
        alert("An error will occured while posting a comment ")
      } 
    }
    
    
  return (
    <div className='mt-8'>
        <h3 className='text-lg font-medium mb-8'>Leave a comment</h3>
        <form  onSubmit={handleSubmit} >
            <textarea name="text"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            cols="30"
            rows="10"
            placeholder='Share your opinion about the post'
            className='w-full bg-bgPrimary focus:outine-none p-5'
            />
            <button type='submit' className='w-full bg-primary hover:bg-indigo-500
             text-white font-medium py-3 rounded-md'>Submit</button>
        </form>
    </div>
  )
}

export default PostComment; 


