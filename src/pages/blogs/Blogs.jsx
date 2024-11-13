import React, { useState } from 'react'
import SearchBlog from './SearchBlog'
import { useFetchBlogsQuery } from '../../redux/features/blogs/blogsApi'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const [search, setsearch] = useState('')
  const [category, setCategory] = useState('')
  const [query, setQuery] = useState({search: "", category: ""});

  // get data using redux 

  const { data: blogs = [], error, isLoading} = useFetchBlogsQuery(query) 
  // we can rename the data by blogs and use empty array if some cases the data is undefined or not fetched
 
  

  const handleSearchChange = (e)=>{
    setsearch(e.target.value);
  }

  const handleSearch = ()=>setQuery({search, category})
  return (
    <div className='mt-15 container mx-auto'>
        <SearchBlog 
        search={search}
        handleSearch={handleSearch} 
        handleSearchChange={handleSearchChange}
        />

        {isLoading && <div>Loading....</div>}
        {error && <div>{error.toString()}</div>}


        <div className='mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
          {
            blogs.map(blog=>(             
              <Link
              to={`/blogs/${blog._id}`}
              key={blog._id} className='shadow-md' >
                <img src={blog?.coverImg} alt="" className='h-70 w-full'  />
                <h2 className='text-xl p-4'>{blog.title}</h2>
              </Link>
            ))
          }
        </div>
    </div>
  )
}

export default Blogs;

// {How search functionality  will work 
// useFetchBlogsQuery(query)  this query will get the data from the backend 
// after that whatever the value we put in search (const handleSearch = ()=>setQuery({search, category}))
// const handleSearchChange will work and the result will comes up }
