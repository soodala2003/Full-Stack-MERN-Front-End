import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../assets/styles/Users.css';

function SourcesList() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSources = async () => {
      try {
        const response = await axios.get(`https://full-stack-mern-back-end.onrender.com/api/sources`);
        //console.log(response.data.data);
        const results = response.data.data;
        setSources(results);
      } catch (error) {
        console.error('Error fetching sources', error);
      } finally {
        setLoading(false);
      }
    };
    getSources();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="main">
      <div className="user-title">
        <h2>BBC News Title</h2>
        <Link to={`/api/sources/create`} >+ Post BBC News</Link> 
      </div>
      <ul className="user-lists">
        {sources.map((source) => (
          <li key={source._id}>
            <Link to={`/api/sources/${source._id}`} className="link">{source.title}</Link>
                
            <div className="user-lists-controls">
              <Link to={`/api/sources/${source._id}`} className="btn">View</Link>
            </div>
          </li> 
        ))}
      </ul>
    </div>
  );
};

export default SourcesList;