import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SlickSlider() {
  const settings = {
    dots: false,
    autoplay: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    errow: 4
  };
  return (
    <div style={{ height: '34rem' }} className="container">
      <div className='title-box'>
        <h3>New Articles</h3>
        <p style={{ borderBottom: "3px solid #6EBF8B", width: "21%", textAlign: "center", margin: "10px auto 15px" }}></p>

        {/* <p className='under-line'></p> */}
      </div>
      <Slider {...settings}>
        <div className='open-model'><img src='https://baselgovernance.org/sites/default/files/2020-08/200819%20Claudia%20paper.jpg' alt="Credit to Joshua Earle on Unsplash" /></div>

        <div className='open-model'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4wz6JiMibMDlSreB2GV_cSm_EBGWKKVUmqg&usqp=CAU' alt="Credit to Alisa Anton on Unsplash" /></div>

        <div className='open-model'><img src='https://img.pikbest.com/01/55/02/30apIkbEsT6jG.jpg-0.jpg!bw340' alt="Credit to Igor Ovsyannykov on Unsplash" /></div>

        <div className='open-model'><img src='https://img.wattpad.com/cover/141384284-352-k94402.jpg' alt="Credit to Pierre Châtel-Innocenti on Unsplash" /></div>

        <div className='open-model'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPlQ_Lqmedb9svgjcXHDN_vPXX4PL6AHBPcw&usqp=CAU' alt="Credit to Richard Nolan on Unsplash" /></div>

        <div className='open-model'><img src='https://ziclife.com/wp-content/uploads/2020/07/it-image-9.jpg' alt="Credit to Cristina Gottardi on Unsplash" /></div>
      </Slider>
    </div>
  );
}

export default SlickSlider;