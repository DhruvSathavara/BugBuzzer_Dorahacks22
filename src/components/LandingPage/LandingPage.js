import React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function LandingPage() {

  return (
    <div className="container-fluid landigpage-contain">
      <div className="landing-img" >


        <img className="landing-page-img" style={{ marginTop: "71px", width: "100vw", height: "100vh" }} src="https://trackjs.com/assets/images/illustrations/protected_script.svg"></img>
        {/* <Link to="/question">
          <Button className="headers-btns" style={{
            color: "#151D3B",
            bottom: "30rem",
            right: "22rem",
            height: "42px",
            background: "#6EBF8B"
          }}>Ask Question</Button>
        </Link> */}
      </div>

    </div>
  )
}

export default LandingPage;
