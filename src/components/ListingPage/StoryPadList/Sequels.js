import React, { useContext, useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from "axios";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { ethers } from "ethers";

import { BookContext } from '../../../Context/BookContext'
import ModalContribute from "../../Contribute/Contribute";

 function Sequels() {
  const { Moralis, user, account, isInitialized } = useMoralis();
  const [userAccount, setUserAccount] = useState([]);
  const storyContext = React.useContext(BookContext);

  const { storyD } = storyContext;

  useEffect(() => {
    const bList = JSON.parse(JSON.stringify(storyD));

    if (bList ) {
      ListStoryData(bList)
    }
  }, [storyD, isInitialized])


  const [storyData, setstoryData] = useState([]);

  async function ListStoryData(bList) {

    var array = [];
    if (bList) {
      for (let index = 0; index < bList.length; index++) {
        const element = bList[index];
        if (element.CID) {

          await axios.get(`https://${element.CID}.ipfs.dweb.link/story.json`).then(async (response) => {
            if (response.data.walletAddress) {
              const id = element.objectId
              var newData = {...response.data,id,element}
             array.push(newData)
            }
          });
        }
      }
    }
    setstoryData(array);
  }
  console.log(storyData, 'storydata horror');


  return (
    <>
      <div style={{ marginTop: "100px" }} className="container footer-top">
        <div className="text-center">
        </div>
        <div className="container">
          <div className="card-columns">

            {storyData !== undefined &&
              storyData.map((e) => {
                if (e !== undefined && e.category == "Sequels") {
                  return (
                    <div className="card carding">
                      <a href="#">
                        <img className="card-img-top" src={e.coverPicture} alt="Card image cap" />
                        <div className="card-body">
                          <h5 className="story-card-title">{e.name}</h5>
                          <p className="card-text">
                            {e.description}
                          </p>

                          <p class="card-text"><small className="text-muted">Last updated {new Date().toLocaleString()}</small></p>

                          {
                            (e.element.nftholder_access && e.element.general_access == 2) ?
                            <Link
                                to={`/sequels-detail/${e.id}`}>
                              <Button disabled={false} variant="outline-info btn-outline-danger buy-story-btn">Read Full Story</Button>
                              </Link>

                              :
                              <Link
                                to={`/sequels-detail/${e.id}`}>
                                <Button variant="outline-info btn-outline-danger buy-story-btn" disabled={false} >Read Full Story</Button>
                              </Link>
                          }
                        </div>
                      </a>
                    </div>
                  )
                }
              }
              )
            }
          </div>
        </div>
      </div>
    </>

  )
}
export default Sequels;