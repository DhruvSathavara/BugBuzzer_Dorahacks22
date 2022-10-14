import Avatar from 'react-avatar';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMoralis, useMoralisQuery } from "react-moralis";


function MyNft() {
    const { Moralis, isAuthenticated, isInitialized } = useMoralis()
    const [detail, setDetail] = useState({})
    const [myNft, setMyNft] = useState({})
    const { data, fetch } = useMoralisQuery("soldItems");

    // useEffect(() => {
    //     getMyNft()
    // }, [isAuthenticated])


    useEffect(() => {
        const bList = JSON.parse(JSON.stringify(data));

        if (bList) {
            ListStoryData(bList)
        }
    }, [data, isInitialized])
    const [storyData, setstoryData] = useState([]);

    async function ListStoryData(bList) {

        var array = [];
        if (bList) {
            for (let index = 0; index < bList.length; index++) {
                const element = bList[index];
                // console.log(element);
                if (element.Buyer && element.Buyer == localStorage.getItem("currentUserAddress")) {
                    const tokenAddress = element.tokenAddress;
                    const author = element.authorNAME;
                    const tokenId = element.tokenId;

                    const archives = Moralis.Object.extend("nftMetadata");
                    const query = new Moralis.Query(archives);
                    query.equalTo("tokenContractAddress", tokenAddress);
                    console.log('tokenContractAddress matched');
                    const object = await query.first();
                    console.log(object, 'obj');
                    const obj = object?.attributes;

                    if(obj?.imageArr){
                        obj.imageArr.map((arr)=>{
                            if(arr.tokenId == tokenId){
                                const imgUrl = arr.imageUrl;
                                const symbol = obj.symbol;
                                const tokenPrice = obj.tokenPrice;
                                var newData = { element, tokenAddress, author, tokenId, imgUrl,symbol,tokenPrice }
                    array.push(newData)

                            }
                        })
                    }
                    // var newData = { element, tokenAddress, author, tokenId, obj }

                    // array.push(newData)
                }
            }
        }
        setstoryData(array);
    }
    console.log(storyData, 'storydata nft');

    return (
        <>

        
         


          <div style={{ marginTop: "62px" }} className="container">
            <div className="row">
              {storyData && storyData.map((nft) => {
                return (
                  <div className="col-md-3 col-sm-6">
                    <div className="card-readership-detail card-block">
                      <h4 className="card-title-readership text-right"></h4>
                      <img className="Nft-img" src={nft.imgUrl} alt="Photo of sunset" />
                      <h5 className="card-title-readership mt-3 mb-3"> {nft.tokenId} {nft.symbol}</h5>
                        <button
                          type="button"
                          class="btn btn-outline-success"
                           
                        >
                         Request a call
                        </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )                      
}

export default MyNft;