import React, { useCallback, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import { Button, Input } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { css } from '@emotion/css';
import { HashLink } from 'react-router-hash-link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';

import { getProfile, logout } from '../apirequests/authRequests';
import DrawerButton from './DrawerButton';

const MenuProps = {
  PaperProps: {
    style: {
      width: 150
    }
  }
};

const drawerButtons = [
  { label: 'Home', link: '/#hero' },
  { label: 'About', link: '/#about' },
  { label: 'Price Plans', link: '/#price-plans' },
  { label: 'Contact', link: '/#contact_section' }
];

const options = ['Account', 'Log out'];

/**
 * Renders the layout of the website; Sidebar, nav bar and footer.
 * @param {object} param0
 * @returns jsx
 */
const Layout = ({ profile, setProfile }) => {
  const [toggle, setToggle] = useState(false);
  const steelworksBlue = '#3b82f6 !important';
  const navigate = useNavigate();

  /**
   * Accepts a boolean and sets the toggle state variable
   * to open or close the menu drawer.
   * @param {boolean} option
   */
  const openCloseDrawer = (option) => () => {
    setToggle(option);
  };

  /**
   * Uses react router to navigate to the user account page.
   */
  const handleNavigateAccount = useCallback(
    () => navigate('/user-account', { replace: true }),
    [navigate]
  );

  /**
   * Uses react router to navigate to the login-register page.
   */
  const handleNavigateLogin = useCallback(
    () => navigate('/login-register', { replace: true }),
    [navigate]
  );

  /**
   * Logs out the user, gets and sets the profile and
   * navigates to the login-register page.
   */
  const handleLogout = async () => {
    await logout()
      .then(() => getProfile())
      .then((res) => setProfile(res))
      .then(handleNavigateLogin());
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          className={css`
            background: black !important;
            z-index: 12010 !important;
          `}
          position='fixed'
        >
          <Toolbar
            className={`${css`
              display: flex !important;
              flex-direction: row !important;
              justify-content: space-between !important;
            `}`}
          >
            <div className='flex items-center'>
              <IconButton
                onClick={openCloseDrawer(!toggle)}
                size='large'
                edge='start'
                aria-label='menu'
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
                variant='h1'
              >
                <Button
                  onClick={openCloseDrawer(false)}
                  component={HashLink}
                  smooth
                  to='/#hero'
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
            <div className='flex'>
              <Button
                onClick={openCloseDrawer(false)}
                component={HashLink}
                smooth
                title={
                  profile?.username
                    ? `${profile.username}'s Account`
                    : 'Login or register'
                }
                to={profile?.username ? '/user-account' : '/login-register'}
                className={css`
                  color: ${steelworksBlue};
                  padding: 0 !important;
                  @media (max-width: 491px) {
                    font-size: 0.8rem !important;
                  }
                  @media (max-width: 444px) {
                    font-size: 0.65rem !important;
                    margin-top: 0.25rem !important;
                  }
                `}
              >
                {profile?.username ? profile.username : 'Login / Register'}
              </Button>

              <FormControl sx={{ mb: 1, width: 40, mt: 3, pb: 2 }}>
                <Select
                  displayEmpty
                  value={''}
                  onClick={() => {
                    if (profile?.username === '') {
                      handleNavigateLogin();
                    }
                  }}
                  input={
                    <Input
                      disabled={profile?.username === ''}
                      disableUnderline={true}
                    />
                  }
                  IconComponent={() => <span></span>}
                  renderValue={() => {
                    return (
                      <AccountCircleIcon
                        className={`ml-2 ${css`
                          color: ${steelworksBlue};
                        `}`}
                      />
                    );
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ 'aria-label': 'Without label' }}
                  className={` ${css`
                    height: 30px;
                    font-size: 13px !important;
                    font-weight: 600 !important;
                    padding: 0 !important;
                  `}`}
                >
                  <MenuItem disabled value=''>
                    <em className='text-blue-500 p-2'></em>
                  </MenuItem>
                  {options.map((option) => (
                    <MenuItem
                      key={option}
                      value={option}
                      className={` ${css`
                        color: ${steelworksBlue};
                      `}`}
                      onClick={
                        option === 'Account'
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
        onClose={openCloseDrawer(false)}
        className={css`
          & > .MuiPaper-root {
            width: 20rem;
            border: 2px solid ${steelworksBlue};
            border-width: 0 2px 0 0 !important;
            padding-top: 5rem;
          }
        `}
      >
        {drawerButtons.map((drawer, idx) => (
          <DrawerButton
            key={`drawer-button-${idx}`}
            label={drawer.label}
            link={drawer.link}
            toggleDrawer={openCloseDrawer}
            HashLink={HashLink}
          />
        ))}
      </Drawer>
      <footer className='h-24 w-full bg-black flex flex-col justify-center items-center'>
        <p className='text-white'>Copyright &#169; Steelworks 2022</p>
        <a
          href='https://www.facebook.com/people/Steelworks-Fitness/100088910285306/'
          target='_blank'
          className={`text-white flex mt-4 ${css`
            z-index: 9000000000000;
          `}`} rel="noreferrer"
        >
          <FacebookIcon className='mr-2 text-blue-500' />
          Follow us on Facebook!
        </a>
      </footer>
    </>
  );
};

export default Layout;
