import React from 'react'
import { formatDate } from '../../../utils/formatDate';
import EditorJSHTML from 'editorjs-html'

const editorJSHTML = EditorJSHTML()
const SingleBlogCard = ({blog}) => {
    const {title, description, content, author, coverImg, category, rating, createdAt} = blog || {};
    const htmlContent = editorJSHTML.parse(content).join('')
   
  return (
    <div>
        <>
        <div className='bg-white p-8'>
            {/* Blog Header */}
            <div>
                <h1 className='md:text-4xl text-2xl font-medium mb-4'>{title}</h1>
                {/* Need to change the author */}
                <p>{formatDate(createdAt)} by <span className='text-blue-400 cursor-pointer'>Admin 1</span></p>
            </div>
            <div>
                <img src={coverImg} alt="cover Image" className='w-full md:h-[400px] bg-cover' />
            </div>
            {/* Blog Details */}
            <div className='mt-8 space-y-4'>
                <div dangerouslySetInnerHTML={{__html:htmlContent}} className='space-y-3 editorjsdiv' />
                <div>
                    <span className='text-lg font-medium'>Rating:</span>
                    <span>{rating}(based on 2,370 reviews)</span>
                </div>                
            </div>
        </div>
        </>
    </div>
  )
}

export default SingleBlogCard