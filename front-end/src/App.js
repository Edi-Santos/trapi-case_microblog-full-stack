import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/" element={ <Navigate replace to="/login" /> } />
    </Routes>
  );
}

export default App;
