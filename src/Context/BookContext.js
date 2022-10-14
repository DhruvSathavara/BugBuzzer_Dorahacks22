
import React, { useState, createContext, useEffect } from "react";
import axios from 'axios'
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min";
//--------- MAHIMA
import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const BookContext = createContext();
export const BookContextProvider = (props) => {
    const [Image, setImage] = useState();
    const [pdf, setPdf] = useState('');
    const [accounts, setAccount] = useState('');
    const [address, setAddress] = useState('');


    // const [loading, setLoading] = useState(false);


    const { Moralis, user, account, authenticate, isAuthenticated, isInitialized, logout } = useMoralis();
    const { data, fetch } = useMoralisQuery("StoryPadBuildit");
    const storyD = data;
    // console.log(data, ' ====');
    const [NewData, setData] = useState([]);
    // const [storyDetails, setStoryDetails] = useState({})
    const API_Token = process.env.REACT_APP_WEB3STORAGE_TOKEN;
    const client = new Web3Storage({ token: API_Token })
    const Storypad = Moralis.Object.extend("StoryPadBuildit");
    const StoryPad = new Storypad();






    useEffect(() => {
        if (isAuthenticated) {
            setAccount(account);
        }
        // checkIfWalletIsConnected();
    }, [isAuthenticated, account]);




    function addData(Item) {
        const blob = new Blob(
            [
                JSON.stringify(Item),
            ],
            { type: "application/json" }
        );
        const files = [
            new File([blob], "story.json"),
        ];
        console.log('files==>', files);
        return files;

    }



    async function storeFiles(Item) {
        if (Item.discount !== undefined) {
            // console.log('ENTER IN DICOUNT');
            await StoryPad.set('nftholder_access', 2);
        } else {
            await StoryPad.set('nftholder_access', 1);
        }
        if (Item.chargeble !== undefined) {
            // console.log('ENTER IN CHARGABLE');
            await StoryPad.set('general_access', 2);
        } else {
            await StoryPad.set('general_access', 1);
        }
        StoryPad.set('Currunt_user', user);
        StoryPad.set('holder_price', Item.discount);
        StoryPad.set('Nonholder_price', Item.chargeble);
        StoryPad.set('token', Item.token);
        let files = addData(Item);
        const cid = await client.put(files);
        StoryPad.set("CID", cid);
        StoryPad.save();
        console.log("files with cid ==>", ` https://dweb.link/ipfs/${cid}/story.json`);
        return cid;
    }


    const notify = () => toast("You are logged in!");


    const disconnect = async () => {
        if (isAuthenticated) {
            await logout();
            window.localStorage.removeItem("accessToken");
            window.localStorage.removeItem("refreshToken");
            window.localStorage.removeItem("profileId");
        }
    }

    const login = async () => {
        if (!isAuthenticated) {
            await authenticate({
                provider: "web3Auth",
                chainId: Moralis.Chains.POLYGON_MUMBAI,
                clientId: "BHQlt53J8Q_CprFI9tgx5aRB7pE9Ei0ccchzXQBNIYAI4RwdZ84Y2sVGoezEZ3S_kwwt3MuZ2eZIGoTYET--4I0",

            })
                .then(function (user) {
                    let address = user.get("ethAddress")
                    // console.log(address, 'address in context');
                    localStorage.setItem("currentUserAddress", address)
                })

                .catch(function (error) {
                });
        }
    }

    // async function getStoryDetails(params) {
    //     // console.log("params----------", params);

    //     if (isAuthenticated) {
    //         const archives = Moralis.Object.extend("StoryPadBuildit");
    //         const query = new Moralis.Query(archives);
    //         query.equalTo("objectId", (params.id).toString());
    //         const object = await query.first();
    //         console.log(object,'obj in context---');
    //         axios.get(`https://dweb.link/ipfs/${object.attributes.CID}/story.json`)
    //             .then(function (response) {
    //                 setStoryDetails(response.data)  
    //             })
    //             .catch(function (error) {

    //             })
    //     }
    // }


    // ------------MAHIMA'CODE

    async function storeFile(file) {
        const ext = file.name.split('.').pop();

        const fileName = `${uuidv4()}.${ext}`;
        const newFile = new File([file], fileName, { type: file.type });
        const cid = await client.put([newFile], {
            name: fileName,
        });
        const imageURI = `https://${cid}.ipfs.dweb.link/${fileName}`;
        setImage(imageURI);

        return imageURI;
    }



    return (
        <BookContext.Provider
            value={{
                addData,
                storeFiles,
                // getStoryDetails,
                storyD,
                // storyDetails,
                login,
                storeFile,
                Image,
                fetch,
                disconnect, 
            }}
        >
            {props.children}
        </BookContext.Provider>
    );
}