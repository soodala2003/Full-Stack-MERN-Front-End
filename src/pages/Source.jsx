import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useSourceStore } from "../store/source";
import axios from 'axios';
import '../assets/styles/Sources.css';

function Source() {
    const { id } = useParams();
    const [source, setSource] = useState("");
    const [updatedSource, setUpdatedSource] = useState(source);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const getSource = async () => {
        try {
          const response = await axios.get(`https://full-stack-mern-back-end.onrender.com/api/sources/${id}`);
          const result = response.data.data;
          setSource(result);
        } catch (error) {
          console.error(`Error fetching source`, error);
        } finally {
          setLoading(false);
        }
      };
      getSource();
    }, [id]);

    const { deleteSource, updateSource} = useSourceStore();

    const handleDeleteSource = async (sourceId) => {
      const {success, message} = await deleteSource(sourceId);
      const showAlert = () => {
        alert(message);
      }

      if (!success) return showAlert;
      
      console.log("Success: ", success);
      console.log("Message: ", message);
    };

    const handleUpdateSource = async (sourceId, updatedSource) => {
      const {success, message} = await updateSource(sourceId, updatedSource);
      
      const showAlert = () => {
        alert(message);
      }
      
      if (!success) return showAlert;
      
      console.log("Success: ", success);
      console.log("Message: ", message); 
      console.log('Name:', updatedSource.title);
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
      <div className="main">
        <div className="source-title">
          <h2>{source.title}</h2>  
          <Link className="link" to={`/api/sources`} > Back</Link>   
          
        </div>

        <section className="article">
          <div className="articles-box">
            <div>
              <img src={source.urlToImage} alt={source.title} className="source-img" />
            </div>

            <div className="list-box">
              <li><b>Author: </b>{source.author}</li>
              <li><b>ID: </b>{source._id}</li>
              <li><b>Description: </b>{source.description}</li>
              <li><b>URL: </b> 
                <Link to={source.url} target="_blank">{source.url}</Link></li>
              <li><b>Published: </b>{source.publishedAt}</li>
            
              
              <button className="btn-delete" onClick={() => handleDeleteSource(source._id)}>
                <Link to={`/api/sources`} className="btn-delete">Delete</Link>
              </button>
            </div>
            
          </div>

          <div className="articles-heading">
            <h2>Update BBC News</h2>
            <li><b>Author</b></li>
            <input
              type="text"
              placeholder=' Author'
              value={updatedSource.author}
              onChange={(e) => setUpdatedSource({ ...updatedSource, author: e.target.value })}
            /><br></br>

            <li><b>Title</b></li>
            <input
              type="text"
              placeholder=' Title'
              value={updatedSource.title}
              onChange={(e) => setUpdatedSource({ ...updatedSource, title: e.target.value })}
            /><br></br>

            <li><b>Description</b></li>
            <textarea
              id="text"
              placeholder='Enter description'
              rows="2" 
              cols="100"
              value={updatedSource.description}
              onChange={(e) => setUpdatedSource({ ...updatedSource, description: e.target.value })}>
            </textarea><br></br>

            <li><b>URL</b></li>
            <input
              type="text"
              placeholder=' URL'
              value={updatedSource.url}
              onChange={(e) => setUpdatedSource({ ...updatedSource, url: e.target.value })}
            /><br></br>

            <li><b>URL to Image</b></li>
            <input 
              type="text"
              placeholder=' URL to Image'
              value={updatedSource.urlToImage}
              onChange={(e) => setUpdatedSource({ ...updatedSource, urlToImage: e.target.value })}
            /><br></br>

            <button className="btn-update" onClick={() => handleUpdateSource(source._id, updatedSource)}>
              <Link to={`/api/sources`} className="btn-update">Update</Link>
            </button>
          </div>
        </section>
      </div>
    );
};

export default Source;