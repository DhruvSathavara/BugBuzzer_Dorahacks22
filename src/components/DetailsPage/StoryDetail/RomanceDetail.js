import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMoralis, useMoralisQuery } from "react-moralis";
import ReactDOM from "react-dom";
import axios from 'axios'
import ModalContribute from "../../Contribute/Contribute";

function RomanceDetail() {
    const [readFullStory, setReadFullStory] = useState(false);

    const { data, fetch } = useMoralisQuery("nftMetadata");
    console.log(data, 'data nft');

    const [storyDetails, setStoryDetails] = useState({})
    const [Content, setContent] = useState();
    const params = useParams();
    console.log('params', params);
    const { Moralis, isAuthenticated, isInitialized } = useMoralis()



    useEffect(() => {
        const b = JSON.parse(JSON.stringify(data));
        console.log((b, 'token'));

        if (b) {
            console.log(b, 'bbbbbbbbbbb');
            getStoryDetails(params, b)
        }
    }, [data, isInitialized, isAuthenticated])

    async function getStoryDetails(params, b) {
        if (isAuthenticated) {
            const archives = Moralis.Object.extend("StoryPadBuildit");
            const query = new Moralis.Query(archives);
            query.equalTo("objectId", (params.id).toString());
            const object = await query.first();
            const element = object.attributes;
            const general_access = element.general_access;
            const nftholder_access = element.nftholder_access;
            const holder_price = element.holder_price;
            const Nonholder_price = element.Nonholder_price;
            const token = element.token

            axios.get(`https://dweb.link/ipfs/${object.attributes.CID}/story.json`)
                .then(function (response) {
                    console.log(response, 'res');
                    if (response.data.walletAddress) {
                        let wall = response.data.walletAddress;

                        b.map((e) => {
                            let tokAdd = e.tokenContractAddress;
                            if (wall == e.CurrentUser) {
                                var newData = { ...response.data, element, tokAdd, general_access, nftholder_access, holder_price, Nonholder_price, token }
                                console.log(newData, 'new data');
                                setStoryDetails(newData)
                                console.log(setStoryDetails(newData), '-----newww');

                            }
                        })
                    }
                    console.log(storyDetails, '------story');

                })
        }
    }
    console.log(storyDetails, '------story');

    // function readfull() {
    // setReadFullStory(true);
    // }


    return (
        // <div></div>


        <div style={{ marginTop: "22px" }} className="container storyDetailContainer">
            <h2 className="storyDetailTitle">{storyDetails.name}</h2><br></br>
            <h5 className="text-muted">By :  {storyDetails.authorName}</h5><br></br>
            <img className="story-detail-img" src={storyDetails.coverPicture}></img><br></br>
            <small className="text-muted">Last updated {new Date().toLocaleString()}</small>

            <h6 className="story-content">

                <p>{storyDetails.description}</p>

                {
                    storyDetails.general_access && storyDetails.nftholder_access == 2 ? (
                        <ModalContribute
                            setReadFullStory={setReadFullStory}
                            e={storyDetails}
                        >
                        </ModalContribute>
                    ) : <p>{storyDetails.content}</p>

                }


                <p>{readFullStory ? storyDetails.content : ""}</p>

            </h6>
        </div>

    );
};

export default RomanceDetail;