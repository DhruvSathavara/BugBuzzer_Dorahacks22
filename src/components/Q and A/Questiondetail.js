import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Avatar, Button, Stack } from "@mui/material";
import ArrowUpwardTwoToneIcon from "@mui/icons-material/ArrowUpwardTwoTone";
import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function Questiondetail() {


    const { Moralis, user } = useMoralis();

    const API_Token = process.env.REACT_APP_WEB3STORAGE_TOKEN;
    const client = new Web3Storage({ token: API_Token })
    const Storypad = Moralis.Object.extend("AnswerDetail");
    const AnswerClass = new Storypad();

    const [questionDetail, setQuestionDetail] = useState({})
    const { isAuthenticated, isInitialized } = useMoralis()

    const params = useParams();
    // console.log(params.id, 'id');

    useEffect(() => {
        getQuestionDetails(params)
    }, [])


    const { data, fetch } = useMoralisQuery("AnswerDetail");
    const [answerList, setAnswerList] = useState([]);
    console.log(data, 'ans data');

    useEffect(() => {
        const Alist = JSON.parse(JSON.stringify(data));
        if (Alist) {
            ListAnswer(Alist)
        }
    }, [data])

    async function ListAnswer(Alist) {
        var array = [];
        if (Alist) {
            console.log(Alist, 'Alist');
            for (let index = 0; index < Alist.length; index++) {
                const element = Alist[index];
                if (element.CID) {

                    await axios.get(`https://${element.CID}.ipfs.dweb.link/story.json`).then(async (response) => {
                        const id = element.objectId;
                        var newData = { ...response.data, id, element }
                        array.push(newData)
                    })
                }

            }
        }
        setAnswerList(array)
    }

    console.log(answerList, 'answer list');


    async function getQuestionDetails(params) {
        if (isAuthenticated) {
            console.log("Authenticated..");
            const archives = Moralis.Object.extend("QuestionModal");
            const query = new Moralis.Query(archives);
            query.equalTo("objectId", (params.id).toString());
            const object = await query.first();
            const id = params.id;
            // const element = object.attributes;

            axios.get(`https://dweb.link/ipfs/${object.attributes.CID}/story.json`).then(async (response) => {
                var newData = { ...response.data, id }
                setQuestionDetail(newData)
            })
        }
    }
    console.log(questionDetail, 'q detail');


    const [open, setOpen] = React.useState(false);
    const [answer, setAnswer] = React.useState();
    // const [votes, setVotes] = React.useState("0")setVotes0;
    let votes = 0;
console.log(votes);
    console.log(answer, 'answer');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let answerDetail = {
        answer: answer,
        votes: votes,
        walletAddress: localStorage.getItem("currentUserAddress"),
        queId: params.id
    }

    function addData(answerDetail) {
        const blob = new Blob(
            [
                JSON.stringify(answerDetail),
            ],
            { type: "application/json" }
        );
        const files = [
            new File([blob], "story.json"),
        ];
        console.log('files==>', files);
        return files;

    }


    async function storeAnswer(answerDetail) {
        AnswerClass.set('Current_user', user);
        AnswerClass.set('QueID', answerDetail.queId);
        AnswerClass.set('answer', answerDetail.answer);
        AnswerClass.set('votes', answerDetail.votes);
        AnswerClass.set('wallet', answerDetail.walletAddress);

        let files = addData(answerDetail);
        const cid = await client.put(files);
        AnswerClass.set("CID", cid);
        AnswerClass.save();
        console.log("files with cid ==>", ` https://dweb.link/ipfs/${cid}/story.json`);
        return cid;
    }

    async function AnswerSubmit(e) {
        e.preventDefault()
        storeAnswer(answerDetail)
    }

    function IncreaseVote(){
        votes = votes+1;
    }



    // function truncate(str, max, sep) {
    //     max = max || 15; var len = str.length; if (len > max) { sep = sep || "..."; var seplen = sep.length; if (seplen > max) { return str.substr(len - max) } var n = -0.5 * (max - len - seplen); var center = len / 2; return str.substr(0, center - n) + sep + str.substr(len - center + n); } return str;
    // }

    return (
        <>
            <Grid align="center" mt={20}>
                <Box
                    sx={{
                        height: "50%",
                        width: "50%",
                        border: "2px solid black",
                    }}
                >
                    <Box
                        sx={{
                            height: "94px",
                            width: "97px",
                            border: "2px solid #ffffff",
                            borderRadius: "50%",
                            background: "#C4C4C4",
                            marginRight: "500px",
                            mt: 2,
                            p: 2,
                        }}
                    >
                        {" "}
                        <span style={{ marginLeft: "150px" }}>{
                            // truncate
                            (questionDetail.walletAddress)}</span>
                    </Box>


                    <Typography color="black" mt={2}>
                        <span style={{ fontWeight: "bold" }}>
                            {" "}
                            {questionDetail.que}
                        </span>{" "}
                        <br />
                    </Typography>
                </Box>


                <Button
                    variant="outlined"
                    size="small"
                    style={{
                         background: "#6EBF8B", color: '#151D3B',
                        textTransform: "capitalize",
                        // border: "2px solid #D82148",
                        marginTop: "10px",
                        fontWeight: "bold",
                    }}
                    sx={{ borderRadius: 2 }}
                    onClick={handleOpen}
                >
                    Write answer
                </Button>


                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Grid align="center">
                        <Box sx={style}>
                            <TextareaAutosize
                                onChange={(e) => setAnswer(e.target.value)}
                                required
                                aria-label="minimum height"
                                fullwidth
                                minRows={6}
                                placeholder="Write your answer here!"
                                style={{
                                    width: 350,
                                    marginTop: "60px",
                                }}
                            />
                            <br />{" "}



                            <Button
                                onClick={AnswerSubmit}
                                variant="contained"
                                size="small"
                                style={{
                                    background: "#6EBF8B", color: '#151D3B',
                                    textTransform: "capitalize",
                                    fontWeight: "bold",
                                }}
                                sx={{ borderRadius: 2, mt: 5 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </Modal>


                {answerList && answerList.map((a) => {
if(a.queId == params.id){

                    return (
                        <Box
                            sx={{
                                height: "50%",
                                width: "48%",
                                border: "2px solid black",
                                mt: 2,
                                p: 2,
                            }}
                        >
                             <Typography style={{marginBottom:"2px"}}>
{a.answer}
                                </Typography>


                            <Stack direction="row" spacing={2}>
                                <Avatar style={{  background: "#6EBF8B", color: '#151D3B' }}>
                                  <ArrowUpwardTwoToneIcon ></ArrowUpwardTwoToneIcon>
                                </Avatar>
                                <span className="vote-counter">{a.votes}</span>
                                <Avatar style={{ background: "#6EBF8B", color: '#151D3B'}}>
                                    <ArrowDownwardTwoToneIcon > </ArrowDownwardTwoToneIcon>
                                </Avatar>


                                {/* <Avatar style={{ background: "#D82148" }}>
                {" "}
                <ModeCommentOutlinedIcon />
            </Avatar> */}
                                {/* <Button
                variant="outlined"
                size="small"
                style={{
                    backgroundColor: "#D82148",
                    color: "white",
                    textTransform: "capitalize",
                    border: "2px solid #D82148",
                    fontWeight: "bold",
                    marginLeft: "420px",
                }}
                sx={{ borderRadius: 2 }}
            >
                Support
            </Button> */}


                            </Stack>
                        </Box>
                    )
                   
                    
                }else{
                    console.log("not similar");
                }

                })}



            </Grid>
        </>
    );
};

export default Questiondetail;
