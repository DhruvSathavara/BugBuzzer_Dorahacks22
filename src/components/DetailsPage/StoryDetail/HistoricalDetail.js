import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMoralis, useMoralisQuery } from "react-moralis";
import ReactDOM from "react-dom";
import axios from 'axios'
import ModalContribute from "../../Contribute/Contribute";

function HistoricalDetail() {
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
            console.log(element, 'ele');
            axios.get(`https://dweb.link/ipfs/${object.attributes.CID}/story.json`)
                .then(function (response) {
                    if (response.data.walletAddress) {
                        let wall = response.data.walletAddress;

                        b.map((e) => {
                            let tokAdd = e.tokenContractAddress;
                            if (wall == e.CurrentUser) {
                                var newData = { ...response.data, element, tokAdd }
                                console.log(newData, 'new data');
                                setStoryDetails(newData)
                            }
                        })
                    }
                })
        }
    }


    console.log(storyDetails, 'story');
    return (
        // <div></div>


        <div style={{ marginTop: "22px" }} className="container storyDetailContainer">
            <h2 className="storyDetailTitle">{storyDetails.name}</h2><br></br>
            <h5 className="text-muted">By :  {storyDetails.authorName}</h5><br></br>
            <img className="story-detail-img" src={storyDetails.coverPicture}></img><br></br>
            <small className="text-muted">Last updated {new Date().toLocaleString()}</small>

            <h6 className="story-content">

                <p>{storyDetails.description}</p>
                <ModalContribute
                    setReadFullStory={setReadFullStory}
                    e={storyDetails}
                >

                </ModalContribute>

                <p>{readFullStory ? storyDetails.content : ""}</p>

            </h6>
        </div>

    );
};

export default HistoricalDetail;