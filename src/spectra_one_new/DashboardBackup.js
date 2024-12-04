import React, { useState ,useRef } from 'react';
import { useEffect } from 'react';
import Notification from '../Notification';
import {deviceDetect,mobileModel} from "react-device-detect"
import "../assets/css/dashboard.css"
import SideBar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import topSearch from "../assets/images/top-search.svg"
import topBell from "../assets/images/top-bell.svg"
import topProfile from "../assets/images/top-user-img.svg"
import arrowOutward from "../assets/images/arrow-outward.svg"
import arrowOut from "../assets/images/arrow-out.svg"
import distance from "../assets/images/distance.svg"
import frame1 from "../assets/images/frame-1.png"
import nextArrow from "../assets/images/next-arrow.svg"
import help from "../assets/images/help.png"
import play from "../assets/images/play.png";
import arrowRight from "../assets/images/arrow-right.png"
// import $ from "../assets/jquery/jquery.min.js"
import { Helmet } from "react-helmet";
import $ from "jquery";
import Swiper from "swiper";
import 'select2';
import graph1 from "../assets/images/graph1.png"
import "../assets/css/dashboard.css"

// import { Chart } from 'chart.js/auto';

import { Chart } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

import "swiper/swiper-bundle.min.css";
import graph2 from "../assets/images/graph1.png";


async function getUserName(serviceGroupId) {
    return fetch('https://oneml.spectra.co/getCustomerAccountDetail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serviceGroupId)
    })
      .then(data => data.json())
  }

export default function Dashboard() {
    const [canId,setCanId] = useState();
    const [accName,setAccName] = useState();
    const swiperRef = useRef(null);
    
   
    const canvasRef = useRef(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://oneml.spectra.co/getupTimeGraph');
          const data = await response.json();
  
          const jsonarray = data.data.row;
  
          const getParameters = {};
          jsonarray.forEach((value1) => {
            const date = getMyDate(value1.t);
            const pl = convertExactNumber(value1.v[1]);
  
            if (!getParameters[date]) {
              getParameters[date] = [];
            }
  
            getParameters[date].push(pl);
          });
  
          const labels = Object.keys(getParameters);
          const datasets = labels.map((date) => {
            const values = getParameters[date];
            const sum = values.reduce((acc, val) => acc + val, 0);
            const average = sum / values.length;
            const down = parseFloat(average.toFixed(2));
            const up = 100 - down;
  
            return { date, up, down };
          });
  
          const chartData = {
            labels: labels,
            datasets: [
              {
                label: 'Device UP %',
                backgroundColor: '#119634',
                data: datasets.map((data) => data.up),
              },
              {
                label: 'Device Down %',
                backgroundColor: '#F36F69',
                data: datasets.map((data) => data.down),
              },
            ],
          };
  
          setChartData(chartData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    function convertExactNumber(v) {
      return parseFloat(v).toFixed(2);
    }
  
    function getMyDate(v) {
      const date = new Date(v * 1000);
      return date.toDateString();
    }
    // useEffect(() => {
    //   console.log("devicedata deviceDetect", deviceDetect().osName ? deviceDetect().osName : deviceDetect().os) // gives object shown in image below
    //   console.log("devicedata mobileModel", mobileModel) // gives "iphone"
    //  },[])
    useEffect(() => {
   
      let user_device_os = deviceDetect().osName ? deviceDetect().osName : deviceDetect().os
      let credentialKeyLogin= localStorage.getItem('credentialKey');
      let width = localStorage.getItem('width');
      let height = localStorage.getItem('height');
      let gmcToken = localStorage.getItem('gmcToken');
  
      async function postData() {
        const url = 'https://oneml.spectra.co/gmcData';
        const data = { gmcToken: gmcToken, canID: credentialKeyLogin, screen_width : width,screen_height:  height,user_device_os:user_device_os};
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result);
      }
  
      postData();
    }, []);
    // useEffect( (e) => { 
    //     //e.preventDefault();
    //     let credentialKeyLogin= localStorage.getItem('credentialKey');
    //     setCanId(credentialKeyLogin);
        
    //       const fetchData = async () =>{
    //         const data = await fetch('https://oneml.spectra.co/getCustomerAccountDetail', {
    //             method: 'POST',
    //             headers: {
    //               'Content-Type': 'application/json'
    //             },
    //             body:JSON.stringify({"serviceGroupId": credentialKeyLogin})
    //           })
    //             .then(data => data.json())
    //             console.log(data);
                
    //       }
         
          
    //    },[]);

    useEffect(() => {
      $(document).ready(function () {
        $(".select2-custom").select2({
          minimumResultsForSearch: -1,
        });
        $(".select2-custom-pinned")
          .select2({
            minimumResultsForSearch: -1,
          })
          .on("select2:open", function () {
            var container = $(".select2-container").last();
            container.css("transform", "translateX(-122px)");
            container.css("z-index", "999");
          });
  
        var swiper = new Swiper(".mySwiper", {
          breakpoints: {
            0: {
              slidesPerView: 1,
            },
            480: {
              slidesPerView: 1.5,
            },
            648: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2.5,
            },
            992: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2.2,
            },
            1230: {
              slidesPerView: 2.5,
            },
          },
          spaceBetween: 10,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
        swiperRef.current = swiper;
      return () => {
        // Clean up the Swiper instance when the component unmounts
        if (swiperRef.current) {
          swiperRef.current.destroy();
        }
      };
        var swiperGetHelp = new Swiper(".getHelpSwiper", {
          slidesPerView: 2.1,
          spaceBetween: 10,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
      
    }, []);
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
    return(
        <>
        < Notification />
        
        <section class="section-dashboard">
      <div class="">
        <div class="d-flex justify-content-end">
          {/* SIDE NAVBAR  */}
          <SideBar />
        

          {/* top header */}
         <Header />

           {/* DASHBOARD  */}
          <div class="dashboard-main">
            <div class="dashboard-main-top">
              <div class="row">
                <div class="dashboard-banner">
                  <div>
                    <div class="dashboard-banner-heading py-2 px-3">
                      TATA Power
                    </div>
                    <div class="dashboard-banner-info">
                      <div class="dashboard-info">
                        <div class="dashboard-info-name py-2 px-3">
                          Locations
                        </div>
                        <div class="dashboard-info-count px-3">08</div>
                      </div>
                      <div class="dashboard-info">
                        <div class="dashboard-info-name py-2 px-3">
                          Solutions
                        </div>
                        <div class="dashboard-info-count px-3">90</div>
                      </div>
                    </div>
                  </div>
                  <div class="dashboard-cards">
                    <div class="card-box">
                      <div class="card-head">Service Desk</div>
                      <div class="card-info pt-2">
                        <div class="card-count">
                          56 <img src={arrowOutward} alt="" />
                        </div>
                        <div class="card-option">
                          <div class="card-options pb-3">
                            Open <span class="span-positive">20</span>
                          </div>
                          <div class="card-options">
                            Closed <span class="span-negative">36</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="card-box card-box-2">
                      <div class="card-head card-head2">Bill Desk</div>
                      <div class="card-info pt-2">
                        <div class="card-count">
                          75 <img src={arrowOutward} alt="" />
                        </div>
                        <div class="card-option">
                          <div class="card-options pb-3">
                            Open <span class="span-positive">20</span>
                          </div>
                          <div class="card-options">
                            Closed <span class="span-negative">36</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="dashboard-content row">
              <div class="col-xl-8 col-lg-7 col-sm-12 col-12">
                {/* WISHLIST Features SECTION  */}
                <div class="dashboard-box">
                  <div class="dashboard-box-top-bar" id="pinnedTopBar">
                    <div class="dashboard-box-heading">
                      Pinned Features <span>06</span>
                    </div>
                    <div class="dashboard-box-options">
                      <div
                        class="dashboard-box-option d-flex align-items-center justify-content-center"
                      >
                        <img src={distance} alt="" />

                        <select class="select2-custom-pinned">
                          <option value="0" selected>All Cities</option>
                          <option value="1">Bangalore</option>
                          <option value="2">Delhi</option>
                          <option value="3">Gurgaon</option>
                          <option value="4">Mumbai</option>
                        </select>

                        {/* <img src="./images/dropdown.svg" alt="" /> */}
                      </div>
                    </div>
                  </div>
                  <div class="swiper mySwiper">
                    <div class="swiper-wrapper feature-container">
                      <div class="swiper-slide">
                        <div class="feature-box">
                          <div class="feature-img">
                            <img
                              class="frame-img"
                              src={frame1}
                              alt=""
                            />
                            <span
                              class="span1 d-flex flex-row align-items-center justify-content-around"
                              ><img src="./images/loc.svg" alt="" /> Delhi |
                              Mukharji Nagar</span
                            >
                            <span class="span2 d-none">
                              <img src="./images/unpin.svg" alt="" />
                            </span>
                          </div>
                          <div class="feature-content">
                            <div>
                              <div class="feature-name">MBB</div>
                              <div class="feature-subname mt-1">
                                Data Consumption
                              </div>
                            </div>
                            <div>
                              <div class="feature-service">
                                Service ID: 19382
                              </div>
                              <div class="feature-subname mt-1">
                                21/08/22, 11:30 AM
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="swiper-slide">
                        <div class="feature-box">
                          <div class="feature-img">
                            {/* <img
                              class="frame-img"
                              src={frame1}
                              alt=""
                            /> */}
                             <iframe src="https://falcon.spectra.co/llmrtg1/llmrtg.cgi?cp_id=9075875" frameborder="0" class="frame-img"></iframe>
                            <span
                              class="span1 d-flex flex-row align-items-center justify-content-around"
                              ><img src="./images/loc.svg" alt="" /> Delhi |
                              Mukharji Nagar</span
                            >
                            <span class="span2 d-none">
                              <img src="./images/unpin.svg" alt="" />
                            </span>
                          </div>
                          <div class="feature-content">
                            <div>
                              <div class="feature-name">MBB</div>
                              <div class="feature-subname mt-1">
                                Data Consumption
                              </div>
                            </div>
                            <div>
                              <div class="feature-service">
                                Service ID: 19382
                              </div>
                              <div class="feature-subname mt-1">
                                21/08/22, 11:30 AM
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="swiper-slide">
                        <div class="feature-box">
                          <div class="feature-img">
                            <img
                              class="frame-img"
                              src={frame1}
                              alt=""
                            />
                            <span
                              class="span1 d-flex flex-row align-items-center justify-content-around"
                              ><img src="./images/loc.svg" alt="" /> Delhi |
                              Mukharji Nagar</span
                            >
                            <span class="span2 d-none">
                              <img src="./images/unpin.svg" alt="" />
                            </span>
                          </div>
                          <div class="feature-content">
                            <div>
                              <div class="feature-name">MBB</div>
                              <div class="feature-subname mt-1">
                                Data Consumption
                              </div>
                            </div>
                            <div>
                              <div class="feature-service">
                                Service ID: 19382
                              </div>
                              <div class="feature-subname mt-1">
                                21/08/22, 11:30 AM
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="swiper-slide">
                        <div class="feature-box">
                          <div class="feature-img">
                            <img
                              class="frame-img"
                              src={frame1}
                              alt=""
                            />
                            <span
                              class="span1 d-flex flex-row align-items-center justify-content-around"
                              ><img src="./images/loc.svg" alt="" /> Delhi |
                              Mukharji Nagar</span
                            >
                            <span class="span2 d-none">
                              <img src="./images/unpin.svg" alt="" />
                            </span>
                          </div>
                          <div class="feature-content">
                            <div>
                              <div class="feature-name">MBB</div>
                              <div class="feature-subname mt-1">
                                Data Consumption
                              </div>
                            </div>
                            <div>
                              <div class="feature-service">
                                Service ID: 19382
                              </div>
                              <div class="feature-subname mt-1">
                                21/08/22, 11:30 AM
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="swiper-button-next" onClick={handleNext}>
                      <img src={nextArrow} alt="" />
                    </div>
                    <div class="swiper-button-prev" onClick={handlePrevClick }>
                      <img src={nextArrow} alt="" />
                    </div>
                  </div>
                </div>

                {/* FILTER BOX  */}
                <div class="dashboard-box">
                  <div
                    class="filter-head d-flex justify-content-between align-items-center"
                  >
                    <p class="p-0 m-0">Service ID: 12345</p>
                    <button class="filter-apply-btn px-3 py-2">Apply</button>
                  </div>
                  <div class="filter-box">
                    <div
                      class="row justify-content-between justify-content-sm-start"
                    >
                      <div
                        class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset"
                      >
                        <div class="filter-inner-box">
                          <div class="dashboard-box-option">City</div>
                          <div class="filter-row mt-2">
                            <select class="select2-custom w-100">
                              <option value="1" selected>Bangalore</option>
                              <option value="2">Delhi</option>
                              <option value="3">Gurgaon</option>
                              <option value="4">Mumbai</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
                      >
                        <div class="filter-inner-box">
                          <div class="dashboard-box-option">Location</div>
                          <div class="filter-row mt-2">
                            <select
                              id="filterCity"
                              class="select2-custom w-100"
                            >
                              <option value="0">HSR Layout</option>
                              <option value="1">Indranagar</option>
                              <option value="2">MG Road</option>
                              <option value="3">Gandhi Nagar</option>
                              <option value="4">HSR Layout</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
                      >
                        <div class="filter-inner-box">
                          <div class="dashboard-box-option">Period</div>
                          <div class="filter-row mt-2">
                            <div
                              class="custom-select date-range"
                              id="reportrange"
                            >
                              <span>Today</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
                      >
                        <div class="filter-inner-box">
                          <div class="dashboard-box-option">
                            Product/Solution
                          </div>
                          <div class="filter-row mt-2">
                            <select class="select2-custom w-100">
                              <option value="0">MBIA</option>
                              <option value="1">MBIA</option>
                              <option value="2">BIA</option>
                              <option value="3">OBB</option>
                              <option value="4">BBB</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div
                        class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
                      >
                        <div class="filter-inner-box">
                          <div class="dashboard-box-option mb-1">Bandwidth</div>
                          <div class="filter-row mt-2">
                            <div class="filter-value">10 Mbps</div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
                      >
                        <div class="filter-inner-box">
                          <div class="dashboard-box-option mb-1">
                            Data Limit
                          </div>
                          <div class="filter-row mt-2">
                            <div class="filter-value">Unlimited</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NETWORK USAGE SECTION */}
                <div class="dashboard-box">
                  <div class="dashboard-box-top-bar">
                    <div class="dashboard-box-heading">
                      Network Usage (MRTG)
                    </div>
                    <div class="dashboard-box-options">
                      <div class="dashboard-box-option">
                        <img src="./images/download.svg" alt="" />
                      </div>
                      <div class="dashboard-box-option">
                        <img src="./images/pin.svg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="dashboard-inner-box">
                    <div class="traffics mb-3">
                      <div class="traffic-list">
                        <div>
                          <span
                            class="circle"
                            style={{background: "#3484f0"}}
                          ></span
                          ><span style={{opacity:" 0.5"}}>Max In Traffic</span>
                        </div>
                        <div>
                          <span
                            class="circle"
                            style={{background: "#0030fd"}}
                          ></span
                          ><span style={{opacity: "0.5"}}>Max Out Traffic</span>
                        </div>
                        <div>
                          <span
                            class="circle"
                            style={{background: "#00c9c2"}}
                          ></span
                          ><span style={{opacity: "0.5"}}>In Traffic</span>
                        </div>
                        <div>
                          <span
                            class="circle"
                            style={{background: "#fc8906"}}
                          ></span
                          ><span style={{opacity: "0.5"}}>Out Traffic</span>
                        </div>
                      </div>
                    </div>
                    <div class="network-graph-frame">
                      {/* <img src="https://falcon.spectra.co/llmrtg1/llmrtg.cgi?cp_id=9075875" alt="" /> */}
                      <iframe src="https://falcon.spectra.co/llmrtg1/llmrtg.cgi?cp_id=9075875" width='100%' height='400' frameborder="0"></iframe>
                      <div class="graph-indicator g-vertical">
                        Traffic in Kb/s
                      </div>
                      <div class="graph-indicator text-center mt-3">
                        Hours (Usage)
                      </div>
                    </div>

                    <div class="network-info-row mt-2">
                      <div class="network-info-box">
                        <div>
                          <div class="network-info">
                            <span class="network-info-name">Maximal In:</span>
                            <span class="network-info-value">35.2 M</span>
                          </div>
                          <div class="network-info">
                            <span class="network-info-name">Average In:</span>
                            <span class="network-info-value">1.94 M</span>
                          </div>
                          <div class="network-info">
                            <span class="network-info-name">Current In:</span>
                            <span class="network-info-value">2.58 M</span>
                          </div>
                        </div>
                      </div>
                      <div class="network-info-box">
                        <div>
                          <div class="network-info">
                            <span class="network-info-name">Maximal Out:</span>
                            <span class="network-info-value">6.66 M</span>
                          </div>
                          <div class="network-info">
                            <span class="network-info-name">Average Out:</span>
                            <span class="network-info-value">576.8 M</span>
                          </div>
                          <div class="network-info">
                            <span class="network-info-name">Current Out:</span>
                            <span class="network-info-value">1.33 M</span>
                          </div>
                        </div>
                      </div>
                      <div class="network-info-box">
                        <div>
                          <div class="network-info">
                            <span class="network-info-name">Range Start:</span>
                            <span class="network-info-value"
                              >2022-8-25 / 10:50:21</span
                            >
                          </div>
                          <div class="network-info">
                            <span class="network-info-name">Range End:</span>
                            <span class="network-info-value"
                              >2022-8-26 / 10:50:21</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Availability SECTION  */}
                <div class="dashboard-box">
                <div class="dashboard-box-top-bar">
                  <div class="dashboard-box-heading">
                    Availability (Uptime)
                  </div>
                  <div class="dashboard-box-options">
                    <div class="dashboard-box-option">
                      <img src="./images/download.svg" alt="" />
                    </div>
                    <div class="dashboard-box-option">
                      <img src="./images/pin.svg" alt="" />
                    </div>
                  </div>
                </div>
                <div class="dashboard-inner-box">
                  <div class="chartjs-container">
                    {/* <canvas id="myChart"></canvas> */}
                    {/* <canvas ref={canvasRef} id="myChart" /> */}
                    <div>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  color: '#D7D7DA69',
                },
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                grid: {
                  color: '#D7D7DA69',
                },
                title: {
                  display: true,
                  text: 'Percentage',
                },
                ticks: {
                  beginAtZero: true,
                  max: 100,
                },
              },
            },
          }}
        />
      ) : (
        <div>Error loading graph</div>
      )}
    </div>
                   
                    
                  </div>
                  <div class="network-info-row">
                    <div class="network-info-box">
                      <div class="d-flex flex-row gap-2 gap-md-5 flex-wrap">
                        <div class="network-info">
                          <span class="network-info-name">Network Uptime:</span>
                          <span class="network-info-value">100%</span>
                        </div>
                        <div class="network-info">
                          <span class="network-info-name">Average Readability:</span>
                          <span class="network-info-value">38.32ms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>

              <div class="col-xl-4 col-lg-5 col-sm-12 col-12">
                {/* Top Notifications Section  */}
                <div class="dashboard-box notif-main-box d-none d-md-block">
                  <div class="dashboard-box-top-bar">
                    <div class="dashboard-box-heading">
                      Top Notifications <span>04</span>
                    </div>
                  </div>
                  <div
                    class="notif-box-wrapper wrapper-box-scroll custom-scrollbar"
                  >
                    <div
                      class="notif-box"
                      style={{backgroundColor: "rgba(71, 168, 197, 0.0545)"}}
                    >
                      <div class="notif-inner-bar">
                        <div class="notif-point">
                          <div class="d-flex flex-row align-items-center gap-2">
                            <img src="./images/notif-loc.svg" alt="" />
                            Bangalore
                          </div>
                          <div>HSR Layout</div>
                          <div>MBB</div>
                        </div>
                        <div class="notif-time">
                          2h ago <span class="notif-time-span"></span>
                        </div>
                      </div>
                      <div class="notif-content mt-3">
                        Lorem ipsum dolor sit amet consectetur. Tristique nec
                        biinjk viverra donec
                        <span style={{color: "#f36f69"}}>utilisation</span> integer
                        id.
                      </div>
                    </div>
                    <div class="notif-box">
                      <div class="notif-inner-bar">
                        <div class="notif-point">
                          <div class="d-flex flex-row align-items-center gap-2">
                            <img src="./images/notif-loc.svg" alt="" /> Delhi
                          </div>
                          <div>Indiranagar</div>
                          <div>MBB</div>
                        </div>
                        <div class="notif-time">3h</div>
                      </div>
                      <div class="notif-content mt-3">
                        Lorem ipsum dolor sit amet consectetur. Tristique nec
                        biinjk viverra donec
                        <span style={{color: "#f36f69"}}>utilisation</span> integer
                        id.
                      </div>
                    </div>
                    <div
                      class="notif-box"
                      style={{backgroundColor: "rgba(71, 168, 197, 0.0545)"}}
                    >
                      <div class="notif-inner-bar">
                        <div class="notif-point">
                          <div class="d-flex flex-row align-items-center gap-2">
                            <img src="./images/notif-loc.svg" alt="" />
                            Bangalore
                          </div>
                          <div>Gandhinagar</div>
                          <div>MBB</div>
                        </div>
                        <div class="notif-time">
                          6h ago <span class="notif-time-span"> </span>
                        </div>
                      </div>
                      <div class="notif-content mt-3">
                        Lorem ipsum dolor sit amet consectetur. Tristique nec
                        biinjk viverra donec
                        <span style={{color: "#f36f69"}}>utilisation</span> integer
                        id.
                      </div>
                    </div>
                    <div class="notif-box">
                      <div class="notif-inner-bar">
                        <div class="notif-point">
                          <div class="d-flex flex-row align-items-center gap-2">
                            <img src="./images/notif-loc.svg" alt="" />
                            Bangalore
                          </div>
                          <div>JP Nagar</div>
                          <div>MBB</div>
                        </div>
                        <div class="notif-time">10h ago</div>
                      </div>
                      <div class="notif-content mt-3">
                        Lorem ipsum dolor sit amet consectetur. Tristique nec
                        biinjk viverra donec
                        <span style={{color: "#f36f69"}}>utilisation</span> integer
                        id.
                      </div>
                    </div>
                    <div class="notif-box">
                      <div class="notif-inner-bar">
                        <div class="notif-point">
                          <div class="d-flex flex-row align-items-center gap-2">
                            <img src="./images/notif-loc.svg" alt="" />
                            Bangalore
                          </div>
                          <div>JP Nagar</div>
                          <div>MBB</div>
                        </div>
                        <div class="notif-time">10h ago</div>
                      </div>
                      <div class="notif-content mt-3">
                        Lorem ipsum dolor sit amet consectetur. Tristique nec
                        biinjk viverra donec
                        <span style={{color: "#f36f69"}}>utilisation</span> integer
                        id.
                      </div>
                    </div>
                    <div class="notif-box">
                      <div class="notif-inner-bar">
                        <div class="notif-point">
                          <div class="d-flex flex-row align-items-center gap-2">
                            <img src="./images/notif-loc.svg" alt="" />
                            Bangalore
                          </div>
                          <div>JP Nagar</div>
                          <div>MBB</div>
                        </div>
                        <div class="notif-time">10h ago</div>
                      </div>
                      <div class="notif-content mt-3">
                        Lorem ipsum dolor sit amet consectetur. Tristique nec
                        biinjk viverra donec
                        <span style={{color: "#f36f69"}}>utilisation</span> integer
                        id.
                      </div>
                    </div>
                    <div class="notif-box">
                      <div class="notif-inner-bar">
                        <div class="notif-point">
                          <div class="d-flex flex-row align-items-center gap-2">
                            <img src="./images/notif-loc.svg" alt="" />
                            Bangalore
                          </div>
                          <div>JP Nagar</div>
                          <div>MBB</div>
                        </div>
                        <div class="notif-time">10h ago</div>
                      </div>
                      <div class="notif-content mt-3">
                        Lorem ipsum dolor sit amet consectetur. Tristique nec
                        biinjk viverra donec
                        <span style={{color: "#f36f69"}}>utilisation</span> integer
                        id.
                      </div>
                    </div>
                    <div class="notif-box">
                      <div class="notif-inner-bar">
                        <div class="notif-point">
                          <div class="d-flex flex-row align-items-center gap-2">
                            <img src="./images/notif-loc.svg" alt="" />
                            Bangalore
                          </div>
                          <div>JP Nagar</div>
                          <div>MBB</div>
                        </div>
                        <div class="notif-time">10h ago</div>
                      </div>
                      <div class="notif-content mt-3">
                        Lorem ipsum dolor sit amet consectetur. Tristique nec
                        biinjk viverra donec
                        <span style={{color: "#f36f69"}}>utilisation</span> integer
                        id.
                      </div>
                    </div>

                    <div class="notif-box">
                      <div class="notif-inner-bar">
                        <div class="notif-point">
                          <div class="d-flex flex-row align-items-center gap-2">
                            <img src="./images/notif-loc.svg" alt="" />
                            Bangalore
                          </div>
                          <div>JP Nagar</div>
                          <div>MBB</div>
                        </div>
                        <div class="notif-time">10h ago</div>
                      </div>
                      <div class="notif-content mt-3">
                        Lorem ipsum dolor sit amet consectetur. Tristique nec
                        biinjk viverra donec
                        <span style={{color: "#f36f69"}}>utilisation</span> integer
                        id.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Consumption Section */}
                <div class="dashboard-box pb-2 mt-0 mt-md-2">
                  <div class="dashboard-box-top-bar">
                    <div class="dashboard-box-heading">Data Consumption</div>
                  </div>
                  <div class="data-cons-table">
                    <div class="data-table">
                      <div
                        class="table-head d-flex align-items-center justify-content-between p-3"
                      >
                        <div>Date</div>
                        <div class="px-4">Usage</div>
                      </div>
                      <div
                        class="data-box-wrapper wrapper-box-scroll custom-scrollbar"
                      >
                        <div
                          class="table-content d-flex align-items-center justify-content-between p-3"
                        >
                          <div>12 May 2023</div>
                          <div class="px-4">1.39 GB</div>
                        </div>
                        <div
                          class="table-content d-flex align-items-center justify-content-between p-3"
                        >
                          <div>12 May 2023</div>
                          <div class="px-4">1.39 GB</div>
                        </div>
                        <div
                          class="table-content d-flex align-items-center justify-content-between p-3"
                        >
                          <div>12 May 2023</div>
                          <div class="px-4">1.39 GB</div>
                        </div>
                        <div
                          class="table-content d-flex align-items-center justify-content-between p-3"
                        >
                          <div>12 May 2023</div>
                          <div class="px-4">1.39 GB</div>
                        </div>
                        <div
                          class="table-content d-flex align-items-center justify-content-between p-3"
                        >
                          <div>12 May 2023</div>
                          <div class="px-4">1.39 GB</div>
                        </div>
                        <div
                          class="table-content d-flex align-items-center justify-content-between p-3"
                        >
                          <div>12 May 2023</div>
                          <div class="px-4">1.39 GB</div>
                        </div>
                        <div
                          class="table-content d-flex align-items-center justify-content-between p-3"
                        >
                          <div>12 May 2023</div>
                          <div class="px-4">1.39 GB</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Get Help Section */}
                <div class="dashboard-box">
                  <div class="dashboard-box-top-bar">
                    <div class="dashboard-box-heading">Get help</div>
                    <div class="dashboard-box-options">
                      <div class="traffic-btn">
                        View details <img src={arrowOut} alt="" />
                      </div>
                    </div>
                  </div>
                  <div class="help-row">
                    <div class="swiper-box">
                      <div class="swiper getHelpSwiper">
                        <div class="swiper-wrapper feature-container">
                          <div class="swiper-slide">
                            <div class="help-box">
                              <div class="help-img">
                                <img src={help} alt="" />
                              </div>
                              <div class="play">
                                <img src={play} alt="" />
                              </div>
                              <div class="help-content p-2">
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
                              </div>
                            </div>
                          </div>
                          <div class="swiper-slide">
                            <div class="help-box">
                              <div class="help-img">
                                <img src={help} alt="" />
                              </div>
                              <div class="play">
                                <img src={play} alt="" />
                              </div>
                              <div class="help-content p-2">
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
                              </div>
                            </div>
                          </div>
                          <div class="swiper-slide">
                            <div class="help-box">
                              <div class="help-img">
                                <img src={help} alt="" />
                              </div>
                              <div class="play">
                                <img src={play} alt="" />
                              </div>
                              <div class="help-content p-2">
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
                              </div>
                            </div>
                          </div>
                          <div class="swiper-slide">
                            <div class="help-box">
                              <div class="help-img">
                                <img src={help} alt="" />
                              </div>
                              <div class="play">
                                <img src={play} alt="" />
                              </div>
                              <div class="help-content p-2">
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
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="swiper-button-next">
                          <img src={nextArrow} alt="" />
                        </div>
                        <div class="swiper-button-prev">
                          <img src={nextArrow} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER START */}
            <Footer />
          </div>
        </div>
      </div>
    </section>
        </>
    )
}