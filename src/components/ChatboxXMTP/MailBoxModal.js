import { DriveEtaTwoTone, Send } from '@mui/icons-material';
import { Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, InputAdornment } from '@mui/material'

import React, { useState } from 'react'

function MailBoxModal({to,sub,setTo,setMessage,setSub,handleClickOpen,handleClose,open,send,isSelected,add}) {  
 
    return (
        <div>

            <Dialog open={open}
                onClose={handleClose}
                fullWidth="fullWidth"
                maxWidth="sm" style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <DialogTitle>Send Mail</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <TextField
                        id="outlined-start-adornment"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">To:</InputAdornment>,
                        }}
                        variant="outlined"
                        autoFocus
                        margin="dense"
                        label="Address"
                        type="text"
                        value={to}
                        fullWidth
                        onChange={(e) => setTo(e.target.value)} 
                         />
                    <TextField
                        id="outlined-start-adornment"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Subject:</InputAdornment>,
                        }}
                        variant="outlined"
                        autoFocus
                        margin="dense"
                        label="Subject"
                        type="text"
                        value={sub}
                        fullWidth
                        onChange={(e) => setSub(e.target.value)}

                    />
                    <div className="form-group">
                        <label for="exampleFormControlTextarea1">Message</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" onChange={(e) => { setMessage(e.target.value) }}></textarea>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained"  style={{backgroundColor:'#6DBF8B',color:'#fff'}}>Cancel</Button>
                    <Button onClick={send } variant="contained" style={{backgroundColor:'#6DBF8B',color:'#fff'}}>{isSelected != "" ? "Send" : "Add New User"}<Send /></Button>
                </DialogActions>
            </Dialog>

            <Button onClick={handleClickOpen} variant="contained"  style={{backgroundColor:'#6DBF8B',color:'#fff'}}>Add New Chat</Button>

        </div>
    )
}

export default MailBoxModal