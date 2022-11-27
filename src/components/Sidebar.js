import React, { useCallback, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Button, Input } from "@mui/material";
import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { css } from "@emotion/css";
import { HashLink } from "react-router-hash-link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { getProfile, logout } from "../apirequests/authRequests";

const MenuProps = {
  PaperProps: {
    style: {
      width: 150,
    },
  },
};

const options = ["Account", "Log out"];

function Sidebar({ profile, setProfile }) {
  const [toggle, setToggle] = useState(false);
  const steelworksBlue = "rgb(0, 89, 255) !important";
  const navigate = useNavigate();

  const toggleDrawer = (option) => (event) => {
    setToggle(option);
  };

  const handleNavigateAccount = useCallback(
    () => navigate("/user-account", { replace: true }),
    [navigate]
  );

  const handleNavigateLogin = useCallback(
    () => navigate("/login-register", { replace: true }),
    [navigate]
  );

  async function handleLogout() {
    await logout()
      .then(() => getProfile())
      .then((res) => setProfile(res));
  }

  function DrawerButton({ label, link }) {
    return (
      <Button
        onClick={toggleDrawer(false)}
        component={HashLink}
        smooth
        to={link}
        className={css`
          justify-content: start !important;
          font-size: 20px !important;
        `}
      >
        {label}
      </Button>
    );
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          className={css`
            background: black !important;
            z-index: 12010 !important;
          `}
          position="fixed"
        >
          <Toolbar
            className={`${css`
              display: flex !important;
              flex-direction: row !important;
              justify-content: space-between !important;
            `}`}
          >
            <div className="flex items-center">
              <IconButton
                onClick={toggleDrawer(!toggle)}
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ mr: 2 }}
                className={css`
                  color: ${steelworksBlue};
                  height: 48px;
                  width: 48px;
                  &:hover {
                    background: rgb(41, 40, 40) !important;
                  }
                  @media (max-width: 470px) {
                    margin-right: 0 !important;
                    height: 32px;
                    width: 32px;
                  }
                `}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                className={css`
                  padding-bottom: 0.25rem;
                  @media (max-width: 444px) {
                    padding-bottom: 0;
                  }
                `}
                variant="h1"
              >
                <Button
                  onClick={toggleDrawer(false)}
                  component={HashLink}
                  smooth
                  to="/#hero"
                  className={css`
                    color: ${steelworksBlue};
                    font-size: 24px !important;
                    justify-content: start !important;
                    display: flex !important;
                    text-transform: capitalize !important;
                    @media (max-width: 491px) {
                      font-size: 20px !important;
                    }
                    @media (max-width: 444px) {
                      font-size: 16px !important;
                    }
                    @media (max-width: 358px) {
                      font-size: 12px !important;
                    }
                  `}
                >
                  Steelworks Fitness
                </Button>
              </Typography>
            </div>
            <div className="flex">
              <Button
                onClick={toggleDrawer(false)}
                component={HashLink}
                smooth
                title={
                  profile?.username
                    ? `${profile.username}'s Account`
                    : "Login or register"
                }
                to={profile?.username ? "/user-account" : "/login-register"}
                className={css`
                  color: ${steelworksBlue};
                  @media (max-width: 491px) {
                    font-size: 0.8rem !important;
                  }
                  @media (max-width: 444px) {
                    font-size: 0.65rem !important;
                    margin-top: 0.25rem !important;
                  }
                `}
              >
                {profile?.username ? profile.username : "Login / Register"}
              </Button>

              <FormControl sx={{ m: 1, width: 40, mt: 3, pb: 2 }}>
                <Select
                  displayEmpty
                  value={""}
                  onClick={() => {
                    if (profile?.username === "") {
                      handleNavigateLogin();
                    }
                  }}
                  input={
                    <Input
                      disabled={profile?.username === ""}
                      disableUnderline={true}
                    />
                  }
                  renderValue={() => {
                    return (
                      <AccountCircleIcon
                        className={`ml-2 ${css`
                          color: rgb(0, 89, 255);
                        `}`}
                      />
                    );
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                  className={` ${css`
                    height: 30px;
                    font-size: 13px !important;
                    font-weight: 600 !important;
                    padding: 0 !important;
                  `}`}
                >
                  <MenuItem disabled value="">
                    <em className="text-blue-500 p-2"></em>
                  </MenuItem>
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      className={` ${css`
                        color: ${steelworksBlue};
                      `}`}
                      onClick={
                        option === "Account"
                          ? handleNavigateAccount
                          : handleLogout
                      }
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        open={toggle}
        onClose={toggleDrawer(false)}
        className={css`
          & > .MuiPaper-root {
            width: 20rem;
            border: 2px solid ${steelworksBlue};
            border-width: 0 2px 0 0 !important;
            padding-top: 5rem;
          }
        `}
      >
        <DrawerButton label="Home" link="/#hero" />
        <DrawerButton label="About" link="/#about" />
        <DrawerButton label="Price Plans" link="/#price-plans" />
        <DrawerButton label="Contact" link="/#contact_section" />
      </Drawer>
      <footer className="h-24 w-full bg-black flex flex-col justify-center items-center">
        <p className="text-white">Copyright &#169; Steelworks 2022</p>
      </footer>
    </>
  );
}

export default Sidebar;
