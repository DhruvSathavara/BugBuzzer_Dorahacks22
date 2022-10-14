import React, { useContext, useEffect, useState } from "react";
import Avatar from 'react-avatar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chip from "@material-ui/core/Chip";
import { useMoralis } from "react-moralis";
import { BookContext } from '../../Context/BookContext'
import axios from "axios";
import BasicTabs from "./ProfileNFTTab";
function Profile() {
    const storyContext = React.useContext(BookContext);
    const { storyD } = storyContext;
    console.log('data==', storyD);
    useEffect(() => {
        const bList = JSON.parse(JSON.stringify(storyD));
        if (bList) {
            ListStoryData(bList)
        }
        console.log(bList);
    }, [storyD])
    const [storyData, setstoryData] = useState([]);
    async function ListStoryData(bList) {
        var array = [];
        if (bList) {
            for (let index = 0; index < bList.length; index++) {
                const element = bList[index];
                if (element.CID) {
                    console.log('element.CID', element.CID);
                    await axios.get(`https://${element.CID}.ipfs.dweb.link/story.json`).then((response) => {
                        console.log(response, 'response');
                        const id = element.objectId;
                        var newData = { ...response.data, id };
                        array.push(newData);
                        console.log('newData', newData);
                    });
                }
            }
        }
        setstoryData(array);
    }
    console.log('storyData', storyData);
    const { user } = useMoralis()
    console.log(user, 'user in profile');
    function truncate(str, max, sep) {
        max = max || 15; var len = str.length; if (len > max) { sep = sep || "..."; var seplen = sep.length; if (seplen > max) { return str.substr(len - max) } var n = -0.5 * (max - len - seplen); var center = len / 2; return str.substr(0, center - n) + sep + str.substr(len - center + n); } return str;
    }
    return (
        <div className="app-container footer-top">
            <div className="profile-layout">
                <header className="background background-lg" style={{ backgroundColor: "#4b2caa" }}>
                    <div className="avatar avatar-profile center-block">
                        <Avatar name="Foo Bar" round={true} />
                    </div>
                    <div className="badges">
                        <h1 className="profile-name h3">{
                            user ? (truncate(user.attributes.ethAddress)) : (localStorage.getItem("domain"))
                        }
                            {/* {user && truncate(user.attributes.ethAddress)} */}
                        </h1>
                    </div>
                </header>
            </div>
            <div className="footer-top">
                <BasicTabs />
            </div>
        </div>
    )
}
export default Profile;