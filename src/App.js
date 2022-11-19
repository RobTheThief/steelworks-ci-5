import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';
import Sidebar from './components/Sidebar';
import LoginRegister from './pages/LoginRegister';

function App(props) {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login-register" element={<LoginRegister />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
