import React, { useState } from "react";

function Post({ title, summary, cover, content,author }) {
  return (
    <div className="flex flex-col justify-center items-center gap-y-5 md:flex-row  md:items-center md:justify-around">
      <div className="w-96">
        <img src={'http://localhost:4000/'+cover} alt="" srcset="" />
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-slate-400">
          <a>Asim</a>
        </p>
        <p>{summary}</p>
      </div>
    </div>
  );
}

export default Post;
