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

function Sidebar() {
  const [toggle, setToggle] = useState(false);

  const toggleDrawer = (event) => {
    setToggle(!toggle);
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
          <Toolbar>
            <IconButton
              onClick={toggleDrawer}
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
              className={css`
                color: rgb(0, 89, 255) !important;
                &:hover {
                  background: rgb(41, 40, 40) !important;
                }
              `}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={css`
                color: rgb(0, 89, 255) !important;
                font-size: 24px !important;
                padding-bottom: 0.25rem;
              `}
              variant="h1"
              sx={{ flexGrow: 1 }}
            >
              Steelworks Fitness
            </Typography>
            <Button
              component={HashLink}
              smooth
              to="/login-register"
              className={css`
                color: rgb(0, 89, 255) !important;
              `}
            >
              Login / Register
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        open={toggle}
        onClose={toggleDrawer}
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
          component={HashLink}
          smooth
          to="#contact_section"
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
