import React, { useState } from 'react';
import { useUserStore } from "../store/user";
import { Link } from "react-router-dom";
import '../assets/styles/CreatePage.css';

const UserCreate = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });

  const { createUser } = useUserStore();

  const handleAddUser = async () => {
    const {success, message} = await createUser(newUser);
    console.log("Success: ", success);
    console.log("Message: ", message);
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Create New User</h1>
        <input 
          type="text"
          placeholder=' Name'
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        /><br></br>

        <input
          type="email"
          placeholder=' Email'
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        /><br></br>
        <button onClick={handleAddUser}>
          <Link className="btn-add" to={`/api/users`}><b>Add User</b></Link>
        </button>
      </div>
    </div>
  )
};

export default UserCreate;