import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Sidebar from "./components/Sidebar";
import LoginRegister from "./pages/LoginRegister";
import { HelmetProvider } from "react-helmet-async";
import { getProfile } from "./apirequests/authRequests";
import UserAccount from "./pages/UserAccount";

function App() {
  const [profile, setProfile] = useState();

  async function checkForProfile() {
    const profile = await getProfile();
    setProfile(profile);
    console.log(profile);
  }

  useEffect(() => {
    checkForProfile();
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <HelmetProvider>
          <Sidebar profile={profile} setProfile={setProfile}/>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/login-register"
              element={
                <LoginRegister profile={profile} setProfile={setProfile} />
              }
            />
            <Route
              exact
              path="/user-account"
              element={
                <UserAccount profile={profile} />
              }
            />
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
