import React, { useState } from "react";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import { useMoralis } from "react-moralis";
import { BookContext } from "../Context/BookContext";
import { v4 as uuidv4 } from "uuid";
import ImageUploading from "react-images-uploading";
import html2canvas from "html2canvas";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { draftToHtml } from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import RichTextEditor from 'react-rte';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import EpnsSDK from "@epnsproject/backend-sdk-staging"
import * as EpnsAPI from "@epnsproject/sdk-restapi"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { ethers } from 'ethers'
function UploadForm() {
    const notify = () => toast("Tutorial is Published!");
    const bookContext = React.useContext(BookContext);
    const { addData, storeFiles, storeFile, Image } = bookContext;
    const API_Token = process.env.REACT_APP_WEB3STORAGE_TOKEN;
    const { Moralis, account, user, isAuthenticated } = useMoralis();
    // notification...
    // const notificationContext = React.useContext(NotificationContext);
    // const { sendNotifications } = notificationContext;
    // 
    const [AuthorName, setAuthorName] = useState('')
    const [name, setName] = useState('');
    const [ammount, setAmmount] = useState('');
    const [category, setCategory] = useState("Fanfiction");
    const [provide, setProvide] = useState("Free");
    const [coverPic, setCoverPic] = useState(null);
    const [checkbox, setCheckbox] = useState();
    const [NFTHolder, setNFTHolder] = useState("");
    const [NonNFTHolder, setNonNFTHolder] = useState("");
    const [chargeble, setChargeble] = useState(undefined);
    const [discount, setDiscount] = useState(undefined);
    const [Token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    // notification---EPNS-------
    const CHANNEL_PK = process.env.REACT_APP_EPNS_PRIVATE_KEY
    console.log(CHANNEL_PK);
    const signer = new ethers.Wallet(CHANNEL_PK);
    const Pkey = `0x${CHANNEL_PK}`;
    const epnsSdk = new EpnsSDK(Pkey);
    console.log(epnsSdk, '---epnsSdk');
    // notification-----EPNS-----
    // async function SendtoEPNS() {
    //     // const response = await EpnsAPI.payloads.sendNotification({
    //     //     signer,
    //     //     type: 3, // target
    //     //     identityType: 2, // direct payload
    //     //     notification: {
    //     //         title: `${AuthorName} Publish Story!`,
    //     //         body: `Published ${name} - Story successfully...!!`,
    //     //     },
    //     //     payload: {
    //     //         title: `${AuthorName} Publish Story!`,
    //     //         body: `Published ${name} -  Story successfully...!!`,
    //     //         cta: '',
    //     //         img: ''
    //     //     },
    //     //     recipients: `eip155:80001: ${Curruntuser}`,
    //     //     // recipient address
    //     //     channel: 'eip155:80001:0x0630ba2dE07892EA340e9b9Bc07a35Ef3c4F5F9B', // your channel address
    //     //     env: 'staging'
    //     // });
    //     // console.log({
    //     //     response,
    //     //     message: "Your notification has been sucesfully sent"
    //     // });
    // }
    // notification-----EPNS-----
    const [description, setDescription] = useState(
        () => EditorState.createEmpty(),
    );
    const [content, setContent] = useState(
        () => EditorState.createEmpty(),
    );
    const [data, setData] = useState()
    const AuthornameEvent = (e) => {
        setAuthorName(e.target.value)
    }
    const nameEvent = (e) => {
        setName(e.target.value)
    }
    const descriptionEvent = (e) => {
        setDescription(e.target.value)
    }
    const contentEvent = (e) => {
        setContent(e.target.value)
    }
    async function coverEvent(e) {
        const file = e.target.files[0];
        var url = await storeFile(file);
        setCoverPic(url);
    }
    const wallet = () => {
        if (isAuthenticated) {
            let ua = user.get("ethAddress")
            console.log(ua, 'ua ----');
        }
    }
    wallet()
    const checkboxEvent = (e) => {
        setCheckbox(e.target.checked)
    }
    let Item = {
        authorName: AuthorName,
        name: name,
        ammount: ammount,
        category: category,
        coverPicture: coverPic,
        description: description,
        content: content,
        provide: provide,
        checkbox: checkbox,
        chargeble: chargeble,
        discount: discount,
        token: Token,
        walletAddress: localStorage.getItem("currentUserAddress")
    }
    console.log(Item);
    async function onFormSubmit(e) {
        e.preventDefault()
        setLoading(true)
        await storeFiles(Item)
        // notification-----EPNS-----
        // const response = await EpnsAPI.payloads.sendNotification({
        //     signer,
        //     type: 3, // target
        //     identityType: 2, // direct payload
        //     notification: {
        //         title: `${AuthorName} Publish Story!`,
        //         body: `Published ${name} - Story successfully...!!`,
        //     },
        //     payload: {
        //         title: `${AuthorName} Publish Story!`,
        //         body: `Published ${name} -  Story successfully...!!`,
        //         cta: '',
        //         img: ''
        //     },
        //     recipients: `eip155:80001:${user && user?.attributes?.ethAddress}`,
        //     // recipient address
        //     channel: 'eip155:80001:0x99108131C65474a526D441531707CaDbD3cB2D9f', // your channel address
        //     env: 'staging'
        // });
        // console.log({
        //     response,
        //     message: "Your notification has been sucesfully sent"
        // });
        // notification-----EPNS-----
        setAuthorName('');
        setName('');
        setCategory('');
        setCoverPic(null);
        setProvide('');
        setContent('');
        setDescription('');
        setCheckbox(null);
        setAmmount('')
        setChargeble(null);
        setDiscount(null);
        setToken('')
        setNFTHolder('')
        setNonNFTHolder('')
        setLoading(false)
    }
    return (
        <div style={{ backgroundColor: "aliceblue", marginTop: "77px" }} className="col">
            <div className="form-style-2 offset-4 row-8">
                <div className="form-style-2-heading-title" style={{marginLeft:"115px"}}>Share Your Valuable Knowledge</div>
                <form action="" method="" onSubmit={onFormSubmit}>
                    <label for="field1"><span>Author Name  <span className="required">*</span></span><input value={AuthorName} onChange={AuthornameEvent} placeholder="File name" type="text" class="input-field" name="field1" /></label>
                    <label for="field1"><span> Title <span className="required">*</span></span><input value={name} onChange={nameEvent} placeholder="File name" type="text" class="input-field" name="field1" /></label>
                    <label for="field4"><span>Category <span className="required">*</span></span><select value={category} name="field4" onChange={(e) => setCategory(e.target.value)} className="select-field">
                        <option>Choose Category </option>
                        <option defaultChecked defaultValue="Fanfiction" value="smartcontract">Smart Contract</option>
                        <option value="vulnerabilities">Security Vulnerabilities</option>
                        <option value="uiux">UI/UX</option>
                        <option value="cryptoscam">Crypto Scams</option>
                        <option value="iot">Hardware And IOT</option>
                        <option value="functionissue">Function Issues</option>

                    </select></label>
                    <label for="field6"><span>Add Image <span className="required">*</span></span></label>
                    <div className="mt-2 mb-2" style={{ border: '1px solid grey', borderRadius: '6px', width: "30.5vw", marginLeft: "11.5vw" }}>
                        <input

                            type="file"
                            name="file"
                            id="file"
                            value={undefined}
                            onChange={coverEvent}
                            className="input-file d-none" />
                        <label
                            htmlFor="file"
                            style={{ width: '100%', cursor: 'pointer' }}
                            className="rounded-3 text-center    js-labelFile p-2 my-2 w-20  "
                        >
                            <CloudUploadIcon />
                            <p className="js-fileName">
                                Upload Profile(PNG, JPG, GIF)
                            </p>
                        </label>
                    </div>
                    {/* <div style={{ marginBottom: "50px" }}>
                        <label for="field6"><span>Add Image <span className="required">*</span></span><input className="file-input" value={undefined} onChange={coverEvent} type="file"></input></label>
                    </div> */}
                    <label for="field5" style={{ display: "inline-flex" }}><span style={{}}>Description <span
                        className="required">*</span></span>
                        <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            placeholder="Write here...."
                            onChange={(value) => setDescription(value.blocks[0].text)}
                        />
                    </label>
                    {/* -------- */}
                    <label for="field5" style={{ display: "inline-flex" }}><span style={{}}>Full Tutorial  <span
                        className="required">*</span></span>
                        <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            placeholder="Write full tutorial here...."
                            onChange={(value) => setContent(value.blocks[0].text)}
                        />
                    </label>
                    <label for="field4"><span>For non NFT Holder <span className="required">*</span></span><select value={NonNFTHolder} name="field4" onChange={(e) => setNonNFTHolder(e.target.value)} className="select-field">
                        <option>Choose an option</option>
                        <option value="Free">Free</option>
                        <option value="Chargeble">Chargeble</option>
                    </select>
                        {
                            NonNFTHolder == "Chargeble" ? (
                                <input
                                    style={{ marginTop: "10px" }}
                                    value={chargeble}
                                    onChange={(e) => setChargeble(e.target.value)}
                                    placeholder="Enter price "
                                    type="number"
                                    class="input-field1"
                                    name="field1"
                                />
                            ) : ""
                        }
                    </label>
                    <label for="field4"><span>For NFT Holder <span className="required">*</span></span> <select value={NFTHolder} name="field4" onChange={(e) => setNFTHolder(e.target.value)} className="select-field">
                        <option>Choose an option</option>
                        <option value="Free">Free</option>
                        <option value="Discount">Discount price</option>
                    </select>
                        {
                            NFTHolder == "Discount" ? (
                                <input
                                    style={{ marginTop: "10px" }}
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    placeholder="Enter price  "
                                    type="number"
                                    class="input-field1"
                                    name="field1"
                                />
                            ) : ""
                        }
                    </label>
                    {
                        NonNFTHolder == "Chargeble" || NFTHolder == "Discount" ? (
                            <label for="field4"><span>Select Token <span className="required">*</span></span> <select name="field4"
                                value={Token}
                                onChange={(e) => setToken(e.target.value)}
                                className="select-field">
                                <option>Choose a Token</option>
                                <option value="KLAY">KLAY</option>
                            </select>
                            </label>
                        ) : "  "
                    }
                    <label><input className="terms-checkbox" value={checkbox} onChange={checkboxEvent} type="checkbox"></input>I agree to terms and conditions.</label>
                    <button className="btn" type="submit" style={{
                        background: "#6EBF8B", color: '#151D3B',
                        fontWeight: '30px', borderRadius: '7%', marginLeft: "137px", padding: "auto"
                    }} onClick={notify} disabled={loading}>
                        {loading ? "Loading...." : "Publish"}
                        <ToastContainer />
                    </button>
                </form>
                {/* <button value={notification} onClick={NotificationEvent}> noteeeeeee</button> */}
            </div>
        </div>
    )
}
export default UploadForm;