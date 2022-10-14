import React from "react";
import LandingPage from "./LandingPage/LandingPage";
import HomeCategory from "./LandingPage/HomeCategory";
import Sliders from "./Sliders/Sliders";
import QandAdetail from "./Q and A/Q&Adetail";
function Home (){
    return(
<>
        <LandingPage></LandingPage>
        <HomeCategory></HomeCategory>
        <QandAdetail></QandAdetail>
        <Sliders></Sliders>
        </>
    )
 }
 export default Home;