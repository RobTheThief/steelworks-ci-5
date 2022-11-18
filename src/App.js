import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import './App.css';
import Sidebar from './components/Sidebar';

function App(props) {
  return (
    <React.StrictMode>
      <Sidebar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
