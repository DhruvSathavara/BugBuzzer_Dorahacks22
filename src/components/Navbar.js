
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Button, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { BookContext } from '../Context/BookContext';

import { useMoralis } from "react-moralis";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Popover from '@mui/material/Popover';
import { api, utils } from "@epnsproject/frontend-sdk-staging";
import UAuth from '@uauth/js'
import { WorldIDWidget, WidgetProps } from "@worldcoin/id";
// import NotificationsPopover from './NotificationsPopover';


export default function NavbarB() {
  const [value, setValue] = React.useState();


    const bookContext = React.useContext(BookContext);
    const { login, disconnect } = bookContext;
    const { Moralis, isAuthenticated, user } = useMoralis();

    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const [anchorLogin, setAnchorLogin] = React.useState(null);
    const [openLogin, setOpenLogin] = React.useState(false);

    const theme = useTheme();

    const drawerWidth = 240;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenLoginMenu = (event) => {
        setAnchorLogin(event.currentTarget);
    };

    const handleCloseLoginMenu = () => {
        setAnchorLogin(null);
    };




    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));


    const navigateToHome = () => {
        navigate('/');
    }

    const handleClickNavigate = (path) => {
        navigate(`/${path}`);
    }


    const refresh = () => {
        // re-renders the component
        setValue({});
    }


    //-------------- Unstoable Domain ----------------------------



    const unClient = new UAuth({
        clientID: "b2e25ace-e779-4092-8b68-aaf3b45e8031",
        redirectUri: "http://localhost:3000/",
        scope: "openid wallet"
      })
    async function inlog() {

        try {
            const authorization = await unClient.loginWithPopup();
            console.log(authorization);
            await localStorage.setItem("domain", authorization.idToken.sub)
            console.log(localStorage.getItem("domain"));
            const walletAddress = authorization.idToken.wallet_address;
            localStorage.setItem("currentUserAddress", walletAddress)
            refresh();
        } catch (error) {

            console.log(error,'-----error');

        }

    }
    async function out() {
        await unClient.logout();
        console.log('Logged out with Unstoppable');
    }




    // ----Fetch notification from EPNS ------ 




    const shortAddress = (addr) =>
        addr.length > 10 && addr.startsWith('0x')
            ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
            : addr

    return (
        <div>
            <Box sx={{ flexGrow: 1 }} >

                <Toolbar>

                    <Drawer
                        sx={{
                            width: open && drawerWidth,
                            flexShrink: 0,
                            '& .MuiDrawer-paper': {
                                width: drawerWidth,
                                boxSizing: 'border-box',
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >

                        <Divider />

                        <Divider />
                        {
                            !user && <Box sx={{ flexGrow: 0 }}>
                                <Button onClick={handleOpenLoginMenu} className='m-2' style={{ background: '#488E72', color: 'white', textTransform: 'capitalize' }} >
                                    Login
                                </Button>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorLogin}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorLogin)}
                                    onClose={handleCloseLoginMenu}
                                >
                                    <MenuItem onClick={() => login()} className='m-2'  > Web3Auth </MenuItem>
                                    {/* <MenuItem className='m-2'  >{localStorage.getItem("domain") !== null ? (
                                        <small className="log-title">{localStorage.getItem("domain")}</small>
                                    ) : "Unstoppable"} </MenuItem> */}
                                    <MenuItem className='m-2'  >
                                        <WorldIDWidget
                                            actionId="wid_staging_76474f51ceeaf9c0730fae2c659f637b" // obtain this  
                                            signal="user-id-1"
                                            enableTelemetry='false'
                                            appName="candyApp"
                                            signalDescription="Receive initial airdrop April 2022"
                                            theme="light"
                                            debug='true' // DO NOT SET TO `true` IN PRODUCTION
                                            onSuccess={(result) => console.log(result)}
                                            onError={({ code, detail }) => console.log({ code, detail })}
                                            onInitSuccess={() => console.log("Init successful")}
                                            onInitError={(error) => console.log("Error while initialization World ID", error)} />
                                    </MenuItem>

                                </Menu>
                            </Box>
                        }

                    </Drawer>



                    <Box sx={{ flexGrow: 1 }} />

                    {/* <NotificationsPopover /> */}

                    {
                        user && <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <div onClick={handleOpenUserMenu} style={{ cursor: 'pointer' }} className="d-flex">
                                    {/* <Avatar alt="" src="https://www.pinpng.com/pngs/m/615-6154495_avatar-png-icon-business-woman-icon-vector-transparent.png" /> */}

                                    <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                                        <p className="m-0 text-secondary" style={{ marginLeft: '5px', border: '1px solid #eee', padding: '7px 15px', borderRadius: '20px', fontWeight: 'bolder', width: 'fit-content' }}>
                                            {user?.attributes?.ethAddress && shortAddress(user?.attributes?.ethAddress)}
                                        </p>
                                    </Box>
                                </div>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* <MenuItem className='m-2'  > Profile </MenuItem> */}
                                <MenuItem className='m-2' onClick={disconnect} > Disconnect </MenuItem>
                            </Menu>
                        </Box>
                    }
                    {
                        !user && <Box sx={{ flexGrow: 0 }}>


                            {

                                localStorage.getItem("domain") == null ? (
                                    <>

                                        <Button onClick={handleOpenLoginMenu} className='m-2' style={{ background: '#488E72', color: 'white', textTransform: 'capitalize' }} >
                                            Login
                                        </Button>

                                        {/* <Button onClick={inlog} className='m-2' style={{ background: '#488E72', color: 'white', textTransform: 'capitalize' }} >
                                            Login with UD
                                        </Button> */}
                                    </>

                                )

                                    : (localStorage.getItem("domain"))

                            }


                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorLogin}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorLogin)}
                                onClose={handleCloseLoginMenu}
                            >
                                <MenuItem onClick={() => login()} className='m-2'  > Web3Auth </MenuItem>
                                {/* <MenuItem className='m-2'  >{localStorage.getItem("domain") !== null ? (
                                    <small className="log-title">{localStorage.getItem("domain")}</small>
                                ) : "Unstoppable"} </MenuItem> */}
                                <MenuItem className='m-2'  >
                                    <WorldIDWidget
                                        actionId="wid_staging_76474f51ceeaf9c0730fae2c659f637b" // obtain this  
                                        signal="user-id-1"
                                        enableTelemetry='false'
                                        appName="candyApp"
                                        signalDescription="Receive initial airdrop April 2022"
                                        theme="light"
                                        debug='true' // DO NOT SET TO `true` IN PRODUCTION
                                        onSuccess={(result) => console.log(result)}
                                        onError={({ code, detail }) => console.log({ code, detail })}
                                        onInitSuccess={() => console.log("Init successful")}
                                        onInitError={(error) => console.log("Error while initialization World ID", error)} />
                                </MenuItem>

                            </Menu>
                        </Box>
                    }



                </Toolbar>
            </Box>
        </div >
    );

}