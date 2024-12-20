import React from 'react';
import { Link } from "react-router-dom";
import '../assets/styles/Home.css';


const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-box">
        <Link className="create" to={`/api/users/create`}><h1>Create New User</h1></Link>
        <Link className="create" to={`/api/sources/create`}><h1>Post BBC News</h1></Link>
        <Link className="create" to={`/api/technologies/create`}><h1>Post Technology News</h1></Link>
      </div>
    </div>
  )
};

export default HomePage;