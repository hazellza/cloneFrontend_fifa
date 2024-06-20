import React from 'react';
import { useEffect, useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './layout/Login/Login';
import Register from './layout/Register/Register';
import Select from './layout/Select/Select';
import Setting from './layout/Setti/Setting';
import History from './layout/Histo/History';

//test add comment
export default function App() {
  const [logincheck, setLoginCheck] = useState(false);

  useEffect(() => {
    const check = localStorage.getItem("customer");
    setLoginCheck(!!check);
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/select' element={<Select/>}/>
        <Route path='/setting' element={<Setting/>}/>
        <Route path='/history' element={<History/>}/>
      </Routes>
    </Router>
  );
}

