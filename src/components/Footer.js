import React from "react";
import { BsDiscord, BsTwitter,AiFillFacebook } from "react-icons/all";

export default function Footer() {
    return (
        <div className="footer-fix">
        <footer id="footer">
            <div style={{alignSelf:'center'}}  >
                Made with ❤️ for the community
            </div>

            <div className="connect-footer"  >
                <div className="d-flex" >
                    <a href="/" target="_blank" style={{ fontSize: "30px", color: "blueviolet",marginInline:"20px" }}>
                        { <BsTwitter /> }
                    </a>
                    <a href="/" target="_blank" style={{ fontSize: "30px", color: "blueviolet",marginInline:"20px" }}>
                        {<AiFillFacebook/> }
                    </a>
                    <a href="/" target="_blank" style={{ fontSize: "30px", color: "blueviolet",marginInline:"20px" }}>
                        {<BsDiscord/> }
                    </a>
                </div>
            </div>
        </footer>
        </div>
    );
}