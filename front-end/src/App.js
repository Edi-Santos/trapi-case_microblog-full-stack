import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from './pages/login/Login';

import './App.css';
import Feed from './pages/feed/Feed';

function App() {
  return (
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/feed" element={ <Feed /> } />
      <Route path="/" element={ <Navigate replace to="/login" /> } />
    </Routes>
  );
}

export default App;
