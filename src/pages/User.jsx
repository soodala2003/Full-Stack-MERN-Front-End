import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useUserStore } from "../store/user";
import axios from 'axios';
import '../assets/styles/Users.css';
//import { useToast } from "@chakra-ui/react";

function UserPage() {
    const { id } = useParams();
    const [user, setUser] = useState("");
    //const [name, setName] = useState("");
    const [updatedUser, setUpdatedUser] = useState(user);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const getUser = async () => {
        try {
          const response = await axios.get(`https://full-stack-mern-back-end.onrender.com/api/users/${id}`);
          const result = response.data.data;
          setUser(result);
        } catch (error) {
          console.error(`Error fetching users`, error);
        } finally {
          setLoading(false);
        }
      };
      getUser();
    }, [id]);
  
    const { deleteUser, updateUser} = useUserStore();
    //const toast = useToast();

    const handleDeleteUser = async (userId) => {
      const {success, message} = await deleteUser(userId);
      //console.log("Success: ", success);
      console.log("Message: ", message);
      /* if (!success) {
        toast({
          title: 'Error',
          description: message,
          status: 'error',
          duration:3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Success',
          description: message,
          status: 'success',
          duration:3000,
          isClosable: true,
        });
      } */
    };

    const handleUpdateUser = async (userId, updatedUser) => {
      const {success, message} = await updateUser(userId, updatedUser);
      console.log("Success: ", success);
      console.log("Message: ", message);
      console.log('Name:', updatedUser.name);
      /* if (!success) {
        toast({
          title: 'Error',
          description: message,
          status: 'error',
          duration:3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Success',
          description: "User updated successfully",
          status: 'success',
          duration:3000,
          isClosable: true,
        });
      } */
    };

    if (loading) return <div className="loading">Loading...</div>;
  
    return (
      <div className="main">
        <div className="user-title">
          {/* <h2>Delete / Update User</h2> */}
          <Link to={`/api/users`} > Back</Link> 
        </div>
        <section>
          <div className="articles-heading">
            <h2 >Delete User</h2>
            <li><b>Name: </b>{user.name}</li>
            <li><b>Email: </b>{user.email}</li>
            <li><b>ID: </b>{user._id}</li>

            <button className="btn-delete" onClick={() => handleDeleteUser(user._id)}>
              <Link to={`/api/users`} className="btn-delete">Delete</Link>
            </button>
          </div>

          <div className="articles-heading">
            <h2>Update User</h2>
            <li><b>Name: </b></li>
            <input
              type="text"
              placeholder="User Name"
              value={updatedUser.name}
              onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
            /><br></br>

            <li><b>Email: </b></li>
            <input
              type="email"
              placeholder="User Email"
              value={updatedUser.email}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
            /><br></br>
            <button className="btn-update" onClick={() => handleUpdateUser(user._id, updatedUser)}>
              <Link to={`/api/users`} className="btn-update">Update</Link>
            </button>
          </div>
        </section>
      </div>
    );
  };
  
  export default UserPage;
  

