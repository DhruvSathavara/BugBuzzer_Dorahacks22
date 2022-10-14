import React, { useState, useEffect } from "react";
import { Web3Storage } from "web3.storage/dist/bundle.esm.min";

import {
  Stack,
  TextField,
  FormControl,
  Box,
  Container,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";

import { useMoralis, useMoralisCloudFunction, useMoralisQuery } from "react-moralis";
// import "./Style.css";


export default function AskQuestion() {

  const { Moralis, user } = useMoralis();

  const [loading, setLoading] = useState(false);
  const [que, setQue] = useState();

  const [askQue, setAskQue] = useState();
  const paperStyle = { height: "67vh", width: 500, marginTop: "127px" };
  let tagInput;
  const [tags, setTags] = React.useState(["Tags", "Input"]);

  const API_Token = process.env.REACT_APP_WEB3STORAGE_TOKEN;
  const client = new Web3Storage({ token: API_Token })
  const Storypad = Moralis.Object.extend("QuestionModal");
  const QuestionClass = new Storypad();



  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);

    setTags(newTags);
  };

  let QuestionItems = {
    que: que,
    tags: tags,
    walletAddress: localStorage.getItem("currentUserAddress")
  }
  console.log(QuestionItems, 'Q items');
  const inputKeyDown = (e) => {
    const val = e.target.value;
    console.log(val, 'val in keydown');
    console.log(e.key, 'keyyy');
    if (e.key === "Shift" && val) {
      if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val]);
      tagInput.value = null;
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    }
  };


  function addData(QuestionItems) {
    const blob = new Blob(
      [
        JSON.stringify(QuestionItems),
      ],
      { type: "application/json" }
    );
    const files = [
      new File([blob], "story.json"),
    ];
    console.log('files==>', files);
    return files;

  }


  async function storeFiles(QuestionItems) {
    QuestionClass.set('Current_user', user);
    QuestionClass.set('question', QuestionItems.que);
    QuestionClass.set('tags', QuestionItems.tags);
    QuestionClass.set('wallet', QuestionItems.walletAddress);


    let files = addData(QuestionItems);
    const cid = await client.put(files);
    QuestionClass.set("CID", cid);
    QuestionClass.save();
    console.log("files with cid ==>", ` https://dweb.link/ipfs/${cid}/story.json`);
    return cid;
  }



  async function onFormSubmit(e) {
    e.preventDefault()
    setLoading(true)
    storeFiles(QuestionItems)
    setQue(null);
    setTags([]);
    setLoading(false)
  }

  return (
    <>
      <Container>
        <Typography
          className="form-style-2-heading"
          variant="h5"
          sx={{
            pt: 16,
            fontWeight: "bolder",
            color: " #151D3B",
            TextDecoder: "none",
            border: "none",
            textAlign: "center",
          }}
        >
          Ask A Question
        </Typography>
        <form
          onSubmit={onFormSubmit}
          style={{
            justifyContent: "center",
            marginLeft: "12vw",
            marginRight: "12vw",
            // marginTop: "110px",
          }}
        >
          <Stack spacing={3}>
            <TextareaAutosize
              onChange={(e) => setQue(e.target.value)}
              fullWidth
              required
              name="description"
              aria-label="minimum height"
              minRows={5}
              // mt={10}
              placeholder="Ask your Question here !"
              style={{
                width: "auto",
                borderColor: "rgb(196 196 196)",
                borderRadius: "5px",
                marginTop: "60px",
                padding: "12px"
              }}
            // {...formik.getFieldProps("question")}
            ></TextareaAutosize>


            <div
              className="input-tag"
              style={{
                width: "auto",
              }}
            >
              <ul className="input-tag__tags">
                {tags.map((tag, i) => (
                  <li key={tag}>
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        removeTag(i);
                      }}
                    >
                      {/* {console.log(tags,'tagg')} */}+
                    </button>
                  </li>
                ))}
                <li className="input-tag__tags__input">
                  <input

                    name="tags"
                    type="text"
                    onKeyDown={inputKeyDown}
                    ref={(c) => {
                      tagInput = c;
                    }}
                  />
                  {/* })} */}
                </li>
              </ul>
            </div>


            {/* ----------------------------------------------- */}
          </Stack>
          <DialogActions>
            <Grid container justifyContent="center">
              <Button
                variant="contained"
                type="submit"
                size="midium"
                style={{
                  backgroundColor: "#6EBF8B",
                  color: "#151D3B",
                  textTransform: "capitalize",
                  border: "2px solid #6EBF8B",
                  marginRight: "18px",
                  fontWeight: "bold",
                }}
                sx={{ borderRadius: 2, mt: 5 }}
              >
                {loading ? "Loading...." : "Submit"}
              </Button>
            </Grid>
          </DialogActions>
        </form>
      </Container>
    </>
  );
}
