'use client'
import React from 'react'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
// import Prompt from '@models/prompt'

const PromptCardList = ({ data, handleTagClick }) => {

  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick} />
      ))

      }
      {console.log(data)}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  // const [searchedfor, setSearchedFor] = useState('')
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      // console.log(response);
      const data = await response.json();
      // console.log('hey');

      setPosts(data)
    }
    fetchPosts();
  }, [])

  useEffect(() => {
    // Filter the prompts based on search text
    if (searchText !== '') {
      const filtered = posts.filter((p) => {
        const loweredSearchText = searchText.toLowerCase();
        return (
          p.creator.username.toLowerCase().includes(loweredSearchText) ||
          p.tag.toLowerCase().includes(loweredSearchText) ||
          p.prompt.toLowerCase().includes(loweredSearchText)
        );
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts([]); // Clear filtered posts when search text is empty
    }
  }, [searchText, posts]);

  const handleTagClick = (p)=>{
    setSearchText(p)
  }


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer' />
      </form>
      <PromptCardList
        data={filteredPosts.length > 0 ? filteredPosts : posts}
        handleTagClick={handleTagClick}
      />



      {/* {console.log('inside')} */}
      {/* <PromptCard/> */}
    </section>
  )
}

export default Feed