import React, { useEffect, useState } from 'react'
import Post from '../Components/Post/Post'

function PostPage() {
  const [posts,setPosts]=useState()
  useEffect(()=>{
    fetch('http://localhost:4000/post').then(response=>{
      response.json().then(posts=>{
      setPosts(posts)
      })
    })
  },[])
  return (
    <div  className='flex flex-col gap-y-12'>
      <Post {...posts} />
    </div>
  )
}

export default PostPage
