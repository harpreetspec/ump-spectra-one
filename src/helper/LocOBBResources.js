import React, { useEffect, useRef, useState } from 'react';


export default function LocOBBResources(){
    return(
        <>
            <div class="dashboard-box">
                <div class="dashboard-box-top-bar">
                  <div class="dashboard-box-heading">
                    Resources <span>06</span>
                  </div>
                  {/* <!-- <div class="dashboard-box-options">
                                        <div class="traffic-btn">View details <img src="./images/arrow-out.svg" alt=""></div>
                                    </div> --> */}
                </div>
                <div class="swiper mySwiper">
                  <div class="swiper-wrapper feature-container wrapper-box-scroll custom-scrollbar">
                    <div class="swiper-slide">
                      <div class="feature-box">
                        <div class="feature-img">
                          <img class="frame-img" src="./images/frame-1.png" alt="" />
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
                          <img class="frame-img" src="./images/frame-1.png" alt="" />
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
                          <img class="frame-img" src="./images/frame-1.png" alt="" />
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
                          <img class="frame-img" src="./images/frame-1.png" alt="" />
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
                  <div class="swiper-button-next">
                    <img src="./images/next-arrow.svg" alt="" />
                  </div>
                  <div class="swiper-button-prev">
                    <img src="./images/next-arrow.svg" alt="" />
                  </div>
                </div>
              </div></>
    )
}