import React, { useState } from 'react';
import { useSourceStore } from "../store/source";
import { Link } from "react-router-dom";
import '../assets/styles/CreatePage.css';

const SourceCreatePage = () => {
  const [newSource, setNewSource] = useState({
    author: "",
    title: "",
    description: "",
    url: "",
    urlToImage: "",
    content: "",
  });

  const { createSource } = useSourceStore();

  const handlePostSource = async () => {
    const {success, message} = await createSource(newSource);
    console.log("Success: ", success);
    console.log("Message: ", message);
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Post BBC News</h1>
        <input 
          type="text"
          placeholder=' Author'
          value={newSource.author}
          onChange={(e) => setNewSource({ ...newSource, author: e.target.value })}
        /><br></br>
    
        <input
          type="text"
          placeholder=' Title'
          value={newSource.title}
          onChange={(e) => setNewSource({ ...newSource, title: e.target.value })}
        /><br></br>

        <textarea
          id="text"
          placeholder='Enter description'
          name="description"
          rows="3" 
          cols="50"
          value={newSource.description}
          onChange={(e) => setNewSource({ ...newSource, description: e.target.value })}>
        </textarea><br></br>

        <input
          type="text"
          placeholder=' URL'
          value={newSource.url}
          onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
        /><br></br>

        <input 
          type="text"
          placeholder=' URL to Image (optional)'
          value={newSource.urlToImage}
          onChange={(e) => setNewSource({ ...newSource, urlToImage: e.target.value })}
        /><br></br>
        
        <button onClick={handlePostSource}>
          <Link className="btn-add" to={`/api/sources`}><b>Post</b></Link>
        </button>
      </div>
    </div>
  );
};

export default SourceCreatePage;