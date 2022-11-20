import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { css } from "@emotion/css";
import { HashLink } from "react-router-hash-link";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Sidebar() {
  const [toggle, setToggle] = useState(false);

  const toggleDrawer = (option) => (event) => {
    setToggle(option);
  };

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
                  color: rgb(0, 89, 255) !important;
                  height: 48px;
                  width: 48px;
                  &:hover {
                    background: rgb(41, 40, 40) !important;
                  }
                  @media (max-width: 470px) {
                    margin-right: 10px !important;
                  }
                  @media (max-width: 410px) {
                    margin-right: 3px !important;
                  }
                `}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                className={css`
                  padding-bottom: 0.25rem;
                `}
                variant="h1"
                /* sx={{ flexGrow: 1 }} */
              >
                <Button
                  onClick={toggleDrawer(false)}
                  component={HashLink}
                  smooth
                  to="/#hero"
                  className={css`
                    color: rgb(0, 89, 255) !important;
                    font-size: 24px !important;
                    justify-content: start !important;
                    display: flex !important;
                    text-transform: capitalize !important;
                    @media (max-width: 470px) {
                      font-size: 20px !important;
                    }
                    @media (max-width: 410px) {
                      font-size: 16px !important;
                    }
                  `}
                >
                  Steelworks Fitness
                </Button>
              </Typography>
            </div>
            <Button
              onClick={toggleDrawer(false)}
              component={HashLink}
              smooth
              to="/login-register"
              className={css`
                color: rgb(0, 89, 255) !important;
                @media (max-width: 470px) {
                  font-size: 0.8rem !important;
                }
                @media (max-width: 410px) {
                  font-size: 0.65rem !important;
                }
              `}
            >
              Login / Register
              <AccountCircleIcon
                className={`ml-2 ${css`
                  color: rgb(0, 89, 255);
                `}`}
              />
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        open={toggle}
        onClose={toggleDrawer(false)}
        className={css`
          & > .MuiPaper-root {
            width: 20rem;
            border: 2px solid rgb(0, 89, 255) !important;
            border-width: 0 2px 0 0 !important;
            padding-top: 5rem;
          }
        `}
      >
        <Button
          onClick={toggleDrawer(false)}
          component={HashLink}
          smooth
          to="/#hero"
          className={css`
            justify-content: start !important;
          `}
        >
          Home
        </Button>

        <Button
          onClick={toggleDrawer(false)}
          component={HashLink}
          smooth
          to="/#about"
          className={css`
            justify-content: start !important;
          `}
        >
          About
        </Button>

        <Button
          onClick={toggleDrawer(false)}
          component={HashLink}
          smooth
          to="/#price-plans"
          className={css`
            justify-content: start !important;
          `}
        >
          Price Plans
        </Button>

        <Button
          onClick={toggleDrawer(false)}
          component={HashLink}
          smooth
          to="/#contact_section"
          className={css`
            justify-content: start !important;
          `}
        >
          Contact
        </Button>
      </Drawer>
      <footer className="h-24 w-full bg-black flex flex-col justify-center items-center">
        <p className="text-white">Copyright &#169; Steelworks 2022</p>
      </footer>
    </>
  );
}

export default Sidebar;
