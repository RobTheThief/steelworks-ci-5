import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import { getProfile } from "./apirequests/authRequests";
import Favicon from "react-favicon";
import favicon from "./favicon.png";
import Sidebar from "./components/Sidebar";
import LoginRegister from "./pages/LoginRegister";
import UserAccount from "./pages/UserAccount";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";

function App() {
  const [profile, setProfile] = useState();

  async function checkForProfile() {
    const profile = await getProfile();
    setProfile(profile);
  }

  useEffect(() => {
    checkForProfile();
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <HelmetProvider>
          <Favicon url={favicon}></Favicon>
          <Sidebar profile={profile} setProfile={setProfile} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/login-register"
              element={<LoginRegister setProfile={setProfile} />}
            />
            <Route
              exact
              path="/user-account"
              element={<UserAccount profile={profile} />}
            />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
