import React from 'react'

const SearchBlog = ({search, handleSearchChange, handleSearch}) => {
    const handleKeyPress = (event)=>{
        if(event.key === "Enter"){
            handleSearch()
        }
    }
  return (
    <div className='w-full flex'>
        <input 
        type="text" 
        value = {search}
        onChange = {handleSearchChange}
        onKeyDown={handleKeyPress}
        placeholder='Hotels with RooTop near me... '
        className='py-2 px-4 mr-5 mt-5 w-full bg-[#f7f8f9] rounded-md border focus:outline-none focus:border'
        />
        <button 
        onClick={handleSearch}
        className='bg-[#1a73ba] px-4 py-2 mt-5 rounded-md  text-white ' >Search</button>
    </div>
  )
}

export default SearchBlog;









