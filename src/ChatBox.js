import { Send } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    Divider,
    Fab,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";

import UserList from "./components/ChatboxXMTP/UserList";
import { Client } from '@xmtp/xmtp-js'
import { ChatBoxContext } from "./Context/ChatBoxContext";
import Blockies from 'react-blockies'
import MailBoxModal from "./components/ChatboxXMTP/MailBoxModal";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: "100%",
        height: "75vh",
        backgroundColor: '#fff',
        boxShadow: "0 1px 2px 0 rgb(145 158 171 / 24%)",
        borderRight: "1px solid #e0e0e0",
        borderLeft: "1px solid #e0e0e0",
        borderBottom: "1px solid #e0e0e0",
        borderRadius: "16px",
    },
    headBG: {
        backgroundColor: "#e0e0e0",
    },
    borderRight500: {
        borderRight: "1px solid #e0e0e0",
    },
    messageArea: {
        height: "70vh",
        overflowY: "auto",
    },
    senderMsgBox: {
        borderRadius: "0px 15px 15px 20px",
        background: "#eee",
        padding: "10px",
        width: '50%',
        float: 'left',
        height: 'auto',
        textAlign: 'left',
    },
    recieveMsgBox: {
        borderRadius: "20px 15px 0 15px",
        background: "aliceblue",
        padding: "10px",
        width: '50%',
        float: 'right',
        height: 'auto',
        textAlign: 'left',
    },
});

function ChatBox() {
    const chatboxContext = React.useContext(ChatBoxContext);
    const {
        userList,
        messageList, currentUser, setPeerAddress, handleSend,
        loading, setUserList, updateMessage } = chatboxContext;

    const classes = useStyles();
    const [message, setMessage] = useState("");
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("");

    const [userId, setUserId] = useState("");

    const [open, setOpen] = React.useState(false);
    const [userAddress, setUserAddress] = useState("");
    const [isSelected, setIsSelected] = useState("")
    const [search, setSearch] = useState("")


    const messagesEndRef = useRef(null)

    const scrollToMessagesEndRef = useCallback(() => {
        (messagesEndRef.current)?.scrollIntoView({ behavior: 'smooth' })
    }, [messagesEndRef])


    const hasMessages = messageList.length > 0

    useEffect(() => {
        if (!hasMessages) return
        const initScroll = () => {
            scrollToMessagesEndRef()
        }
        initScroll()
    }, [hasMessages, scrollToMessagesEndRef, updateMessage])


    const handleSearch = (value) => {
        setSearch(value);
        // if (value.length > 0) { 
        //     const dd = userList.filter(usr => { return (usr.peerAddress.includes(search)) });
        //     console.log(dd,"dd");
        //     setUserList(dd)
        // }
        // else {
        //     setSearch(null); 
        // }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddUser = () => {
        if (isSelected == "") {
            setPeerAddress(to);
        }
        // setOpen(false);
    }

    const chatUser = (e) => {
        setPeerAddress(e)
        setUserId(e);
        setTo(e);
        setOpen(true);
        setIsSelected(e);
    }

    const handleChangeTo = (e) => {
        setPeerAddress(e);
        setTo(e);
    }

    const sendMessage = () => {
        if (isSelected != "") {
            setPeerAddress(to)
        }
        handleSend(message);
        setMessage("");
        setTo("");
        setSubject("");

        if (updateMessage) {
            scrollToMessagesEndRef()

        }
        setOpen(false);
    }


    const formatDate = (date) =>
        date?.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    const shortAddress = (addr) =>
        addr.length > 10 && addr.startsWith('0x')
            ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
            : addr

    return (
        <Container maxWidth="xl" className='footer-top' style={{ marginTop: "150px" }}>



            <Box sx={{ pb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4" component="h2">Messages</Typography>
                <MailBoxModal
                    to={to}
                    sub={subject}
                    message={message}
                    setTo={handleChangeTo}
                    setMessage={setMessage}
                    setSub={setSubject}
                    handleClose={handleClose}
                    handleClickOpen={handleClickOpen}
                    open={open}
                    send={sendMessage}
                    add={handleAddUser}
                    isSelected={isSelected}
                />
            </Box>
            <Grid container className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List >
                        <ListItem button key="RemySharp" >
                            <ListItemIcon>
                                <Blockies seed={currentUser} size={10} className="rounded-full" style={{ borderRadius: '50%' }} />
                            </ListItemIcon>
                            <ListItemText
                                style={{ border: '1px solid #eee', padding: '3px 15px', borderRadius: '20px', fontWeight: 'bolder' }}
                                primary={shortAddress(currentUser)}
                            ></ListItemText>
                        </ListItem>

                    </List>
                    <Divider />
                    <Typography variant="h4" component="h2">Contacts</Typography>
                    <Divider />
                    <UserList isSelected={isSelected} list={userList && userList} chatUser={chatUser} load={loading} currentUser={currentUser}/>
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        {
                            updateMessage && <div className='text-center'><CircularProgress /></div>
                        }
                        {
                            messageList && messageList.map((msg) => {
                                return (
                                    <ListItem key={msg.id} >
                                        <Grid container>
                                            <Grid item xs={12} style={{ marginBottom: '5px' }}>

                                                <div className={currentUser == msg.recipientAddress || userId == msg.senderAddress
                                                    ? "d-flex justify-content-start"
                                                    : "d-flex justify-content-end"}>
                                                    <Blockies seed={currentUser == msg.recipientAddress || userId == msg.senderAddress ? userId : currentUser} size={10} className="rounded-full" style={{ borderRadius: '50%' }} />
                                                    <p style={{ border: '1px solid #eee', padding: '3px 15px', borderRadius: '20px', fontWeight: 'bolder' }}>
                                                        {shortAddress(currentUser == msg.recipientAddress || userId == msg.senderAddress ? userId : currentUser)}
                                                    </p>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText
                                                    className={currentUser == msg.recipientAddress || userId == msg.senderAddress
                                                        ? classes.senderMsgBox
                                                        : classes.recieveMsgBox
                                                    }
                                                    align={
                                                        currentUser == msg.recipientAddress ||
                                                            userId == msg.senderAddress
                                                            ? "left"
                                                            : "right"
                                                    }
                                                    primary={msg.content}
                                                ></ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText
                                                    align={
                                                        currentUser == msg.recipientAddress ||
                                                            userId == msg.senderAddress
                                                            ? "left"
                                                            : "right"
                                                    }
                                                    secondary={formatDate(msg.sent)}
                                                ></ListItemText>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                )
                            })

                        }
                        <div ref={messagesEndRef} />
                    </List >
                </Grid>
            </Grid>
        </Container>
        // </Page>
    );
}

export default ChatBox;
