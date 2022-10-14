import { Typography, Button, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import { useMoralisQuery } from "react-moralis";


const QandAdetail = () => {

    // const { data, fetch } = useMoralisQuery("QuestionModal");
    // const [questionList, setQuestionList] = useState([]);
    // console.log(data, 'q data');

    // useEffect(() => {
    //     const Qlist = JSON.parse(JSON.stringify(data));
    //     if (Qlist) {
    //         ListQuestions(Qlist)
    //     }
    // }, [data])

    // async function ListQuestions(Qlist) {
    //     var array = [];
    //     if (Qlist) {
    //         console.log('q list is here');
    //         for (let index = 0; index < Qlist.length; index++) {
    //             const element = Qlist[index];
    //             console.log(element,'q ele');
    //             if (element.CID) {

    //                 await axios.get(`https://${element.CID}.ipfs.dweb.link/story.json`).then(async (response) => {
    //                     const id = element.objectId;
    //                     var newData = { ...response.data, id, element }
    //                     array.push(newData)
    //                 })
    //             }
    //         }
    //     }
    //     setQuestionList(array);
    // }

    // console.log(questionList, 'question list');

    function truncate(str, max, sep) {
        max = max || 15; var len = str.length; if (len > max) { sep = sep || "..."; var seplen = sep.length; if (seplen > max) { return str.substr(len - max) } var n = -0.5 * (max - len - seplen); var center = len / 2; return str.substr(0, center - n) + sep + str.substr(len - center + n); } return str;
    }

    return (
        <>
            <Container>
                {/* <Typography className="form-style-2-heading" style={{marginTop:"55px"}}  fontWeight="bold" variant="h4" mt={20} mb={-4}>
                    Recently asked questions
                </Typography> */}
                <div>
                    <h2 className="browse-storiesC "> Recently asked questions</h2>
                    <p style={{ borderBottom: "3px solid #6EBF8B", width: "26%", textAlign: "center", margin: "10px auto 15px" }}></p>

                    {/* <p className='under-line'></p> */}

                </div>

                {/* {questionList && questionList.map((qList) => {
                    return ( */}
                <div>
                    <Box mt={10}>
                        <Box
                            sx={{ borderBottom: 1, width: 1150, color: "#E5E5E5" }}
                            mb={4}
                            ml={-2}
                        >
                                <Typography color="black" style={{ textAlign: "start", border: "1px solid #0000001c", padding: "20px" }}>
                                    <span style={{ fontWeight: "bold" }}>
                                        {" "}
                                        {'submit doesnt trigger required error on untouched custom form control element'}
                                        {" "}
                                    </span>{" "}

                                    <br></br>
                                    <span style={{ float: "left", color: "blue" }}> 
                                            <small>{'#tag #error #js'}</small>
                                     </span>
                                    <span style={{ float: "right" }}>
                                        <small>12 Sept 2022 by :<strong style={{ color: "gray" }}>{(truncate('0xE9B4b5985fa998516A58D9449Fe53048f0Dd33aB'))}</strong>
                                        </small>
                                    </span>
                                    <br />
                                </Typography>
                        </Box>



                        <Box
                            sx={{ borderBottom: 1, width: 1150, color: "#E5E5E5" }}
                            mb={4}
                            ml={-2}
                        >
                                <Typography color="black" style={{ textAlign: "start", border: "1px solid #0000001c", padding: "20px" }}>
                                    <span style={{ fontWeight: "bold" }}>
                                        {" "}
                                        {'Do I get my gas back from a failed transaction?'}
                                        {" "}
                                    </span>{" "}

                                    <br></br>
                                    <span style={{ float: "left", color: "blue" }}> 
                                            <small>{'#transaction #ether #js'}</small>
                                     </span>
                                    <span style={{ float: "right" }}>
                                        <small>12 Sept 2022 by :<strong style={{ color: "gray" }}>{(truncate('0x80980101952Ba45879A567dc6A885D23fA8D116c'))}</strong>
                                        </small>
                                    </span>
                                    <br />
                                </Typography>
                        </Box>


                        <Box
                            sx={{ borderBottom: 1, width: 1150, color: "#E5E5E5" }}
                            mb={4}
                            ml={-2}
                        >
                                <Typography color="black" style={{ textAlign: "start", border: "1px solid #0000001c", padding: "20px" }}>
                                    <span style={{ fontWeight: "bold" }}>
                                        {" "}
                                        {'Facing error in writing smart contracts and integrating in Hardhat'}
                                        {" "}
                                    </span>{" "}

                                    <br></br>
                                    <span style={{ float: "left", color: "blue" }}> 
                                            <small>{'#smartContract #hardhat #web3'}</small>
                                     </span>
                                    <span style={{ float: "right" }}>
                                        <small>12 Sept 2022 by :<strong style={{ color: "gray" }}>{(truncate('0x80980101952Ba45879A567dc6A885D23fA8D116c'))}</strong>
                                        </small>
                                    </span>
                                    <br />
                                </Typography>
                        </Box>
                    </Box>

                </div>




            </Container>
        </>
    );
};

export default QandAdetail;
