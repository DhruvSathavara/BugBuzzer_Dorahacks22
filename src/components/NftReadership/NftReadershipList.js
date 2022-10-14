import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMoralis, useMoralisQuery } from "react-moralis";

function NftReadership() {
  const { Moralis } = useMoralis();
  const query = new Moralis.Query("nftMetadata");
  const { data } = useMoralisQuery("nftMetadata");

  console.log(data, 'data in NFT REDERSHIP');

  return (

    <div style={{ marginTop: "120px", listStyle: "none" }} className="container footer-top">
      <h1 className="form-style-2-heading">Explore collections</h1>


      <div className="row">
        {data.map((obj) => {
          return (
            <div className="col-md-3 col-sm-6">
              <li key={obj.attributes.imageArr[0].tokenId}>
                <Link to={`/readership-nft-detail/${obj?.attributes.tokenContractAddress}`}>
                  <div className="card-readership card-block">
                    <h4 className="card-title-readership text-right"></h4>
                    <img
                      className="Nft-img"
                      src={obj.attributes.imageArr[0].imageUrl}
                      alt="NFT Image"
                    />
                    <h1 className="card-title-readership "> {obj.attributes.authorName}'s collection </h1>
                  </div>
                </Link>
              </li>
            </div>
          )
        })}
      </div>
    </div>
  );
}
export default NftReadership;