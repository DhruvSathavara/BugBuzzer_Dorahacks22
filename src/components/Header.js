import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Stack, Box } from "@mui/material";
import { BookContext } from "../Context/BookContext";
import Avatar from 'react-avatar';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { api, utils } from "@epnsproject/frontend-sdk-staging";
import BellIcon from 'react-bell-icon';
import UAuth from '@uauth/js'
// import { WorldIDWidget, WidgetProps } from "@worldcoin/id";
import { WorldIDWidget, WidgetProps } from "@worldcoin/id";
import Dropdown from 'react-bootstrap/Dropdown';
// import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarB from "./Navbar";


function Header() {
  const notify = () => toast("You are logged in!");
  const [loading, setLoading] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [value, setValue] = useState();

  // const [notificationItems, setNotificationItems] = useState([]);
  const bookContext = React.useContext(BookContext);

  const { login } = bookContext;


  const { Moralis, isAuthenticated, user } = useMoralis();
  // console.log(user, 'user');



  // 

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;




  //-------------- Unstoable Domain ----------------------------

  const unClient = new UAuth({
    clientID: "19ab2131-2b54-4e4e-b4d5-761715826c39",
    redirectUri: "http://localhost:3000",
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

      console.log(error);

    }

  }
  async function out() {
    await unClient.logout();
    console.log('Logged out with Unstoppable');
  }

  const refresh = () => {
    // re-renders the component
    setValue({});
  }


  //-------------- Unstoable Domain ----------------------------


  // ----Fetch notification from EPNS ------ 
  const [notificationItems, setNotificationItems] = useState([]);


  async function fetchNotifications() {
    if (localStorage.getItem("currentUserAddress")) {
      // define the variables required to make a request
      const walletAddress = localStorage.getItem("currentUserAddress");
      const pageNumber = 1;
      const itemsPerPage = 20;

      // fetch the notifications

      const { count, results } = await api.fetchNotifications(walletAddress, itemsPerPage, pageNumber)
      // console.log('fetchedNotifications-----', { results });


      // parse all the fetched notifications
      const parsedResponse = utils.parseApiResponse(results);
      console.log('parsedResponse----', parsedResponse);
      setNotificationItems(parsedResponse);

    }

  }




  useEffect(() => {
    // EPNS
    fetchNotifications();
  }, []);

  // ----Fetch notification from EPNS ------



  return (


    <AppBar color="inherit" position="fixed" sx={{ height: "70px" }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography  >
          <Link to="/">
            <img src="/BugBuzzer-Logo.png" alt="logo" />
          </Link>
        </Typography>

        <div style={{ display: 'flex', justifyContent: 'end', marginTop: "8px" }}>
          <Link to="upload-form">
            <label className="addtute" style={{
              color: "#151D3B", fontFamily: "inherit", marginTop: "20px", marginRight: "41px"
            }} >Add Tutorial</label>
          </Link>














          {/* ----------- NFT CLUB------------ */}


          <Navbar>
            <Navbar.Toggle aria-controls="" />
            <Navbar.Collapse id="">
              <Nav>
                <NavDropdown
                  style={{ marginRight: "25px" }}
                  // id="dark"
                  title="NFT Club"
                // menuVariant="dark"
                // color="dark"
                >
                  <NavDropdown.Item href="/nft-upload"> Add NFT Learner club</NavDropdown.Item>
                  <NavDropdown.Item href="readership-nft">
                    NFT Learner club
                  </NavDropdown.Item>


                </NavDropdown>
              </Nav>
            </Navbar.Collapse>

          </Navbar>

          {/*---------------------------- LOG IN------------------------------- */}

          <NavbarB />


          {/*---------------------------- PROFILE ------------------------------- */}

          <Dropdown>
            <Dropdown.Toggle style={{ border: "none", borderColor: "white", color: "black", background: "white", marginTop: "9px", marginRight: "14px" }}  >
              <PersonIcon style={{ fontSize: '35px' }}></PersonIcon>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ marginRight: "22px" }} className="min-width-min">


              <Dropdown.Item >           <Link to="profile" style={{ marginLeft: "18px" }}><span><small style={{ color: "black", float: "left" }}>Profile</small></span>  <PersonIcon style={{ float: "right" }}></PersonIcon></Link></Dropdown.Item>


              <Dropdown.Item style={{ width: "95%" }} ><div >
                <Button aria-describedby={id} onClick={handleClick}>
                  <span><small style={{ color: "black", float: "left", marginLeft: "-9px" }}>Notification</small></span><NotificationsActiveIcon style={{ float: "right", marginRight: "-7px", marginLeft: "7px" }}></NotificationsActiveIcon>
                </Button>
                <Popover
                  id={id}
                  open={open}
                  className="notification-box"
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                >
                  <Typography sx={{ p: 2 }}>

                    <div >
                      {notificationItems.map((notific) => {
                        return (
                          <div>
                            {/* {notific.icon} */}
                            <p style={{ backgroundColor: "#E0E0E0" }}>
                              <img src={notific.icon} alt="imagee" style={{ height: "50px", width: "50px", marginRight: "15px" }}></img>
                              <b> {notific.app}</b>
                            </p>
                            <p >
                              {/* style={{ backgroundColor: "#F8F8F8" }} */}
                              <p><b>{notific.title}</b></p>
                              <p>{notific.message}</p>

                            </p>

                            {/* <div style={{ border: "1px solid #bbb" }}></div> */}

                          </div>
                        )
                      })
                      }
                    </div>
                  </Typography>
                </Popover>
              </div></Dropdown.Item>


              <Dropdown.Item >
                <Link to="chatbox" style={{ marginLeft: "18px" }}>

                  <span><small style={{ color: "black", float: "left" }}>Chat</small></span> <ChatIcon style={{ float: "right" }}></ChatIcon>

                </Link>
              </Dropdown.Item>

              <Dropdown.Item >
                <Link to="livepeer">
                  <div style={{ marginRight: "10px", padding: "auto" }}>
                    <span><small style={{ color: "black", float: "left" }}>Start Live</small></span>
                    <VideoCallIcon style={{ marginLeft: "40px" }}></VideoCallIcon>
                  </div>
                </Link>
              </Dropdown.Item>



            </Dropdown.Menu>

          </Dropdown>

        </div>



      </Toolbar>
    </AppBar >

  )
}

export default Header;