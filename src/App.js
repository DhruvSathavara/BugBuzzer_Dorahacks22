import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import UploadForm from './components/UploadForm';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Profile/Profile';

import UploadFormNft from './components/UploadFormNft';
//Listing
import Fantasy from './components/ListingPage/StoryPadList/Fantasy';
import Historical from './components/ListingPage/StoryPadList/Historical'
import Horror from './components/ListingPage/StoryPadList/Horror'
import Mystery from './components/ListingPage/StoryPadList/Mystery'
import NewAdult from './components/ListingPage/StoryPadList/New adult'
import Paranormal from './components/ListingPage/StoryPadList/Paranormal'
import Romance from './components/ListingPage/StoryPadList/Romance'
import ScienceFiction from './components/ListingPage/StoryPadList/Science fiction'
import Sequels from './components/ListingPage/StoryPadList/Sequels'
import WildCard from './components/ListingPage/StoryPadList/Wild card'
import YoungAdult from './components/ListingPage/StoryPadList/Young adult'
import Fanfiction from './components/ListingPage/StoryPadList/Fanfiction'
// Detail Page
import HorrorDetail from './components/DetailsPage/StoryDetail/HorrorDetail';
import FantasyDetail from './components/DetailsPage/StoryDetail/FantasyDetail';
import HistoricalDetail from './components/DetailsPage/StoryDetail/HistoricalDetail';
import MysteryDetail from './components/DetailsPage/StoryDetail/MysteryDetail';
import NewAdultDetail from './components/DetailsPage/StoryDetail/NewAdultDetail';
import ParanormalDetail from './components/DetailsPage/StoryDetail/ParanormalDetail';
import RomanceDetail from './components/DetailsPage/StoryDetail/RomanceDetail';
import ScienceFictionDetail from './components/DetailsPage/StoryDetail/ScienceFictionDetail';
import SequelsDetail from './components/DetailsPage/StoryDetail/SequelsDetail';
import WildCardDetail from './components/DetailsPage/StoryDetail/WildCardDetail';
import YoungAdultDetail from './components/DetailsPage/StoryDetail/YoungAdultDetail';
import FanfictionDetail from './components/DetailsPage/StoryDetail/FanfictionDetail';

import NftReadership from './components/NftReadership/NftReadershipList'
import NftReadershipDetail from './components/NftReadershipDetail/NftReadershipDetail'
import ChatBox from './ChatBox';
import Livepeer from './components/Livepeer/Livepeer';

// Question Answer

import Questiondetail from './components/Q and A/Questiondetail';
import AskQuestion from './components/Q and A/AskQuestion';
import QandAdetail from './components/Q and A/Q&Adetail';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <Header />
      {/* <Navbar/> */}

      {/* <ChatBox /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-form" element={<UploadForm />} />
       
        <Route path="/nft-upload" element={<UploadFormNft />} />

        {/* Storypad List */}
        <Route path="/fantasy" element={<Fantasy />} />
        <Route path="/historical" element={<Historical />} />
        <Route path="/smartcontract" element={<Horror />} />
        <Route path="/mystery" element={<Mystery />} />
        <Route path="/newadult" element={<NewAdult />} />
        <Route path="/paranomal" element={<Paranormal />} />
        <Route path="/romance" element={<Romance />} />
        <Route path="/sciencefiction" element={<ScienceFiction />} />
        <Route path="/sequels" element={<Sequels />} />
        <Route path="/wildcard" element={<WildCard />} />
        <Route path="/youngadult" element={<YoungAdult />} />
        <Route path="/fanfiction" element={<Fanfiction />} />


        {/* Storypad Detail */}

        <Route path="/fantasy-detail/:id" element={<HorrorDetail />} />
        <Route path="/historical-detail/:id" element={<HistoricalDetail />} />
        <Route path="/smartcontract-detail/:id" element={<HorrorDetail />} />
        <Route path="/mystery-detail/:id" element={<MysteryDetail />} />
        <Route path="/newadult-detail/:id" element={<NewAdultDetail />} />
        <Route path="/paranomal-detail/:id" element={<ParanormalDetail />} />
        <Route path="/romance-detail/:id" element={<RomanceDetail />} />
        <Route path="/sciencefiction-detail/:id" element={<ScienceFictionDetail />} />
        <Route path="/sequels-detail/:id" element={<SequelsDetail />} />
        <Route path="/wildcard-detail/:id" element={<WildCardDetail />} />
        <Route path="/youngadult-detail/:id" element={<YoungAdultDetail />} />
        <Route path="/fanfiction-detail/:id" element={<FanfictionDetail />} />

        <Route path="/readership-nft" element={<NftReadership />} />
        <Route path="/readership-nft-detail/:address" element={<NftReadershipDetail />} />

        {/* Question detail */}
        <Route path="/askQue" element={<AskQuestion />} />
        <Route path="/question-detail/:id" element={<Questiondetail />} />


        {/*   LIVE PEER  */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/chatbox" element={<ChatBox />} />
        <Route path="/livepeer" element={<Livepeer />} />


      </Routes>

      <Footer />
    </div>
  );
}

export default App;