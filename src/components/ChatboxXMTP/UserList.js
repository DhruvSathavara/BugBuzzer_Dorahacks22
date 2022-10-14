import { Avatar, CircularProgress, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React,{useState} from 'react'
import Blockies from 'react-blockies'

function UserList(props) {
 

  const shortAddress = (addr ) =>
  addr.length > 10 && addr.startsWith('0x')
    ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
    : addr

  return ( 
    <List style={{overflow:'auto',height:'55vh'}}>
      {
        props.load && <div className='text-center'><CircularProgress /></div>
      }
   {
     props.list ? props.list.map((e)=>{ 
       if(props.currentUser !== e.peerAddress){
        return (
          <div key={e.peerAddress} >
          <ListItem button   selected={props.isSelected === e.peerAddress}   onClick={() => props.chatUser(e.peerAddress)}  >
          <ListItemIcon> 
            <Blockies seed={e.peerAddress} size={10} className="rounded-full" style={{borderRadius:'50%'}} />
          </ListItemIcon>
          <ListItemText primary={shortAddress(e.peerAddress)} style={{border:'1px solid #eee', padding:'3px 15px', borderRadius:'20px', fontWeight:'bolder'}}> 
          </ListItemText> 
          </ListItem>
         <Divider />
          </div>
         )
       }
      
     }) : <div>No Chats Available</div>
   }
    </List> 
  )
}

export default UserList