import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { Button, Chip } from "@mui/material";
import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { css } from "@emotion/css";
import { Link } from "react-router-dom";

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
          component={Link}
          className={css`
            justify-content: start !important;
          `}
        >
          <Link to="/" className="w-full">
            Home
          </Link>
        </Button>

        <Button
          component={Link}
          className={css`
            justify-content: start !important;
          `}
        >
          <Link to="/about" className="w-full">
            About
          </Link>
        </Button>

        <Button
          className={css`
            justify-content: start !important;
          `}
        >
          Price Plans
        </Button>

        <Button
          className={css`
            justify-content: start !important;
          `}
        >
          Contact
        </Button>
      </Drawer>
    </>
  );
}

export default Sidebar;
