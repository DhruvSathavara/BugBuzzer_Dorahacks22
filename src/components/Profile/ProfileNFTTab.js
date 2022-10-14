import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMoralis } from "react-moralis";
import { BookContext } from '../../Context/BookContext'
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import MyNft from './MyNFT';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function BasicTabs() {
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
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ width: '100%', justifyContent: 'center', display: "inline" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "inline" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor='secondary' style={{ display: "inline !important", float: "inline-start" }}>
                    <Tab label="My Tutorial" {...a11yProps(0)} style={{ display: "inline !important" }} />
                    <Tab label="My NFT" {...a11yProps(1)} style={{ display: "inline !important" }} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {
                    storyData && storyData.map((sData) => {
                        if ((sData.walletAddress) === localStorage.getItem('currentUserAddress')) {
                            return (
                                <div className="card mb-3 offset-4 cardSec" style={{ maxWidth: "540px", marginTop: "55px", marginBottom: "5rem" }}>
                                    <div className="row no-gutters">
                                        <div className="col-md-12 mt-2 mb-2 panel-title">
                                            <div className="">Story by : {sData.authorName}</div>
                                        </div>
                                        <div className="col-md-4 works-image">
                                            <div className='col-10 offset-1'>
                                                <img style={{ width: "170px", marginTop: "10px" }} className="card-img" src={sData.coverPicture}></img>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: "20px" }} className="col-md-8">
                                            <div className="card-body">
                                                <p className="card-heading">{sData.name}</p>
                                                <div className="offset-4 col-4"><Chip label={sData.category} component="a" href="#chip" /></div>
                                            </div>
                                        </div>
                                        <div className='col-10 offset-1'>
                                            <p className="card-text mt-3">{sData.description}</p>
                                            <p class="card-text"><small className="text-muted">Last updated {new Date().toLocaleString()}</small></p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                <MyNft />
            </TabPanel>
        </Box>
    );
}