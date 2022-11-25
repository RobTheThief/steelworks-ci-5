import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Sidebar from "./components/Sidebar";
import LoginRegister from "./pages/LoginRegister";
import { HelmetProvider } from "react-helmet-async";

function App(props) {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <HelmetProvider>
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login-register" element={<LoginRegister />} />
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
