import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMoralis } from "react-moralis";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import { useParams } from 'react-router-dom';
import { ethers } from "ethers";
import ChildContractAbi from "../../abi/mintContract.json"
import web3 from "web3";
import EpnsSDK from "@epnsproject/backend-sdk-staging"
import * as EpnsAPI from "@epnsproject/sdk-restapi"
// import { ethers } from 'ethers'


const Caver = require('caver-js');	
const caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651'));	


export default function ModalContribute(props) {

  const { Moralis, account, user, isAuthenticated } = useMoralis();
  console.log(props.e, 'e in Modal')
  const params = useParams();
  const API_Token = process.env.REACT_APP_WEB3STORAGE_TOKEN;
  const client = new Web3Storage({ token: API_Token })
  const [buyTitle, setBuyTitle] = useState("");
  const reviews = Moralis.Object.extend("Reviews");
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(false);
  function PriceSet(result) {
    console.log(result, '-------function result');
    if (result > 0) {
      setPrice(props.e.element.holder_price);
      setBuyTitle("Your Discounted Price !!")
    } else {
      setPrice(props.e.element.Nonholder_price);
      setBuyTitle("Your Offered Price !!")
    }
  }
  console.log(props.e.tokAdd, 'token------');
  // console.log(props.e.walletAddress,'wallet add----');
  console.log(localStorage.getItem("currentUserAddress"), 'current user');
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (result) => {
    // PriceSet(result);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // notification---EPNS-------
  const CHANNEL_PK = process.env.REACT_APP_EPNS_PRIVATE_KEY
  console.log(CHANNEL_PK);
  const signer = new ethers.Wallet(CHANNEL_PK);
  const Pkey = `0x${CHANNEL_PK}`;
  const epnsSdk = new EpnsSDK(Pkey);
  console.log(epnsSdk, '---epnsSdk');
  let cUser = user && user?.attributes?.ethAddress;
  console.log('cUser------', cUser);
  async function onAddClick(e) {
    e.preventDefault();
    setLoading(true)

    let transaction = await TransferEth();
    if (transaction) {
      setLoading(false);
      setOpen(false)
      props.setReadFullStory(true);
      var buyBTN = document.getElementById("buy-story-detailPage")
      buyBTN.style.display = "none"
    }

    // await SendtoEPNS()
    const response = await EpnsAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `2 Buy Story!`,
        body: `Purchased  Story successfully...!!`,
      },
      payload: {
        title: `2 Buy Story!`,
        body: `Purchased  Story successfully...!!`,
        cta: '',
        img: ''
      },
      recipients: `eip155:80001:${user && user?.attributes?.ethAddress}`,
      // recipient address
      channel: 'eip155:80001:0x0630ba2dE07892EA340e9b9Bc07a35Ef3c4F5F9B', // your channel address
      env: 'staging'
    });
    console.log({
      response,
      message: "Your notification has been sucesfully sent"
    });
  }





// async function ValueTransfer (){
//   Caver.transaction.ValueTransfer.create({
//     from : localStorage.getItem("currentUserAddress"),
//     to :props.e.walletAddress, 
//     value : Caver.utils.toPeb(price,'KLAY'),
//     gas : 25000,
//   })
// }










  const TransferEth = async () => {
    await Moralis.enableWeb3();
    const options = {
      type: "native",
      amount: Moralis.Units.ETH(price, "18"),
      receiver: props.e.walletAddress,
      contractAddress: "0x0000000000000000000000000000000000001010",
    }
    let result = await Moralis.transfer(options);
    console.log(result, '----result in TransferEth ');
    let tx = result.wait();
    console.log(tx, 'tx -----');
    return tx;
  }
  // getTokenBalance---------------------------------
  const Web3 = require('web3');
  const web3 = new Web3(new Web3.providers.HttpProvider('https://polygon-mumbai.g.alchemy.com/v2/Z73LIdldZrZCX8ikHvp9zS0T2Vbx73MR'));
  // Define the ERC-20 token contract
  const contract = new web3.eth.Contract(ChildContractAbi.abi, props.e.tokAdd)
  async function getTokenBalance() {
    // Execute balanceOf() to retrieve the token balance
    const result = await contract.methods.balanceOf(localStorage.getItem("currentUserAddress")).call(); // 29803630997051883414242659
    console.log(result, 'result----');
    PriceSet(result);
  }
  return (
    <div style={{ display: "contents" }}>
      <button type="button" id='buy-story-detailPage' onClick={async () => {
        await getTokenBalance();
        handleClickOpen();
      }}
        class="btn btn-outline-danger buy-story-btn">Buy Story</button>
      <Dialog style={{ widht: "400px" }} open={open} onClose={handleClose}>
        <DialogTitle>Buy Story</DialogTitle>
        <div className='dialogUnderline'></div>
        <DialogContent>
          <h3>
            {buyTitle}
          </h3>
          <TextField
            autoFocus
            disabled
            value={price}
            margin="dense"
            className="ETH-amount"
            label="KLAY"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={onAddClick} disabled={loading}> {loading ? "Loading...." : "Pay"} </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}