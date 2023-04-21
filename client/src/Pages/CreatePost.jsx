import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import modules from "../Models/Modul";
import formats from "../Models/Format";
import { Navigate } from "react-router";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/create', {
      method: 'POST',
      body: data,
      credentials:'include'
    });
    if(response.ok){
     setRedirect(true)
    }
  }
  if(redirect){
    return <Navigate to='/'/>
  }
  return (
    <form
      className="flex flex-col justify-center items-center gap-y-5"
      onSubmit={createNewPost}
    >
      <input
        type="title"
        className="w-1/2"
        placeholder={"Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        className="w-1/2"
        placeholder={"Summary"}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input 
         type="file" 
         className="w-1/2"
         onChange={e=>setFiles(e.target.files)}
         />
      <ReactQuill
        className="w-1/2"
        value={content}
        onChange={(newValue) => setContent(newValue)}
        modules={modules}
        formats={formats}
      />
      <button
        type="submit"
        className="bg-zinc-900 hover:bg-orange-700 text-white font-bold  w-1/2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create New Post
      </button>
    </form>
  );
}

export default CreatePost;
