import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UsersList from './pages/UsersList';
import User from './pages/User';
import UserCreate from './pages/UserCreate';
import SourcesList from './pages/SourcesList';
import Source from './pages/Source';
import SourceCreate from './pages/SourceCreate';
import TechCreate from './pages/TechCreate';


function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/api/users" element={<UsersList />} />
        <Route exact path="/api/users/:id" element={<User />} />
        <Route exact path="/api/users/create" element={<UserCreate />} />
        <Route exact path="/api/sources/" element={<SourcesList />} />
        <Route exact path="/api/sources/:id" element={<Source />} />
        <Route exact path="/api/sources/create" element={<SourceCreate />} />
        <Route exact path="/api/technologies/create" element={<TechCreate />} />



      </Routes>
    </Router>
      
    
  )
}

export default App
