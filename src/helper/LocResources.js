import React, { useEffect, useRef } from 'react';
import frame from "../assets/images/frame-1.png"
import arrowout from "../assets/images/arrow-out.svg"
import nextarrow from "../assets/images/next-arrow.svg";
import "../assets/css/dashboard.css";
import Swiper from "swiper";
// import "swiper/swiper.min.css";
// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/pagination/pagination.min.css";
// import "swiper/components/scrollbar/scrollbar.min.css";


export default function LocResources(){

  const swiperRefResource = useRef(null);
 

  useEffect(() => {

    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 2.1,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

      swiperRefResource.current = swiper;
      return () => {
        // Clean up the Swiper instance when the component unmounts
        if (swiperRefResource.current) {
          swiperRefResource.current.destroy();
        }
      };        
  }, []);

  const handleNext = () => {
    if (swiperRefResource.current) {
      swiperRefResource.current.slideNext();
    }
  };
  const handlePrevClick = () => {
    if (swiperRefResource.current) {
      swiperRefResource.current.slidePrev();
    }
  };


    return(
        <><div class="dashboard-box">
        <div class="dashboard-box-top-bar">
          <div class="dashboard-box-heading">
            Resources <span>06</span>
          </div>
          <div class="dashboard-box-options">
            <div class="traffic-btn">
              View details <img src={arrowout} alt="" />
            </div>
          </div>
        </div>
        <div class="swiper mySwiper">
          <div class="swiper-wrapper feature-container">
            <div class="swiper-slide">
              <div class="feature-box">
                <div class="feature-img">
                  <img class="frame-img" src={frame} alt="" />
                </div>
                <div class="feature-content">
                  <div>
                    <div class="feature-name">Topic</div>
                    <div class="feature-subname mt-1">
                      Context line
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="feature-box">
                <div class="feature-img">
                  <img class="frame-img" src={frame} alt="" />
                </div>
                <div class="feature-content">
                  <div>
                    <div class="feature-name">Topic</div>
                    <div class="feature-subname mt-1">
                      Context line
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="feature-box">
                <div class="feature-img">
                  <img class="frame-img" src={frame} alt="" />
                </div>
                <div class="feature-content">
                  <div>
                    <div class="feature-name">Topic</div>
                    <div class="feature-subname mt-1">
                      Context line
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="feature-box">
                <div class="feature-img">
                  <img class="frame-img" src={frame} alt="" />
                </div>
                <div class="feature-content">
                  <div>
                    <div class="feature-name">Topic</div>
                    <div class="feature-subname mt-1">
                      Context line
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-next" onClick={handleNext}>
            <img src={nextarrow} alt="" />
          </div>
          <div class="swiper-button-prev" onClick={handlePrevClick }>
            <img src={nextarrow} alt="" />
          </div>
        </div>
      </div></>
    )
}