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
            background: rgba(0, 0, 0, 0.432) !important;
          `}
          position="static"
        >
          <Toolbar>
            <IconButton
              onClick={toggleDrawer}
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
              className={css`
                color: blue !important;
              `}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={css`
                color: blue !important;
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
                color: blue !important;
              `}
            >
              Login / Register
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={toggle} onClose={toggleDrawer}>
        <div>Hello</div>
      </Drawer>
    </>
  );
}

export default Sidebar;
