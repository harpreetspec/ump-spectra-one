import React, { useEffect, useRef } from 'react';
// import help from "../assets/images/help.png" 
import help from "../assets/images/Group 1000001619.png"
import play from "../assets/images/play.png";
import arrowRight from "../assets/images/arrow-right.png"
import arrowOut from "../assets/images/arrow-out.svg"
import nextArrow from "../assets/images/next-arrow.svg"
import Swiper from "swiper";
import "../assets/css/dashboard.css";



const GetHelp = () => {
    const swiperRef = useRef(null);
 

    // useEffect(() => {

    //   var swiper = new Swiper(".getHelpSwiper", {
    //     slidesPerView: 2.1,
    //     spaceBetween: 10,
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },
    //   });

    //     swiperRef.current = swiper;
    //     return () => {
    //       // Clean up the Swiper instance when the component unmounts
    //       if (swiperRef.current) {
    //         swiperRef.current.destroy();
    //       }
    //     };        
    // }, []);

    const handleNext = () => {
        if (swiperRef.current) {
          swiperRef.current.slideNext();
        }
      };
      const handlePrevClick = () => {
        if (swiperRef.current) {
          swiperRef.current.slidePrev();
        }
      };
  return (
    <div class="dashboard-box">
    {/* <div class="dashboard-box-top-bar">
      <div class="dashboard-box-heading">Get help</div>
      <div class="dashboard-box-options">
        <div class="traffic-btn">
          View FAQ <img src={arrowOut} alt="" />
        </div>
      </div>
    </div> */}
    <div class="help-row">
      <div class="">
        
            <div class="">
              <div className="getHelp">
                <div class="help-img">
                <a href="/support">
                  <img src={help} alt="" />
                  </a>
                </div>
                <div class="play">
                  {/* <img src={play} alt="" /> */}
                </div>
                {/* <div class="help-content p-2">
                  <div class="help-name">Facing Issues ?</div>
                  <div
                    class="help-base mt-1 mb-2 d-flex align-items-center justify-content-between"
                  >
                    <div class="help-line-name">
                      Secondary line
                    </div>
                    <div class="help-line-logo">
                      <img
                        src={arrowRight}
                        alt=""
                      />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            
      </div>
    </div>
  </div>  )
}

export default GetHelp