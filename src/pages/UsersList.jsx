import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../assets/styles/Users.css';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`https://full-stack-mern-back-end.onrender.com/api/users`);
        //console.log(response.data.data);
        const results = response.data.data;
        setUsers(results);
      } catch (error) {
        console.error(`Error fetching users`, error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="main">
      <div className="user-title">
        <h2>Users</h2>
        <Link to={`/api/users/create`} >+ Add New User</Link> 
      </div>
      <ul className="user-lists">
        {users.map((user) => (
          <li key={user._id}>
              <Link to={`/api/users/${user._id}`} className="link">{user.name}</Link>
            
              <div className="user-lists-controls">
                <Link to={`/api/users/${user._id}`} className="btn">View</Link>
              </div>
          </li> 
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
