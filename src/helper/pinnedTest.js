import React, { useEffect, useRef, useState } from 'react';
import frame1 from "../assets/images/frame-1.png";
import nextArrow from "../assets/images/next-arrow.svg";
import distance from "../assets/images/distance.svg"
import Swiper from "swiper";
import Location from "../assets/images/loc.svg";
import unpin from "../assets/images/unpin.svg";
import Tooltip from 'react-tooltip-lite';
import "../assets/css/dashboard.css";
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.min.css';

const Pinnedfeature = ({ allcitydrop }) => {
  const swiperRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [getAreaLists, setGetAreaLists] = useState();
  const [segmentName, setSegmentName] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('All Cities');
  const selectRef = useRef(null);

  useEffect(() => {
    $(selectRef.current).select2({
      minimumResultsForSearch: -1,
    });

    $(selectRef.current).on('change', function (e) {
      const selectedValue = e.target.value;
      setSelectedLocation(e.target.value);
      console.log('Selected value:', selectedValue);
    });

    return () => {
      $(selectRef.current).select2('destroy');
    };
  }, []);

  useEffect(() => {
    async function SegmentName() {
      const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
      const data = {
        groupID: localStorage.getItem("crm_group_id"),
        companyID: "",
        locationID: ""
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log("getSolutionLists", result.data);
      setSegmentName(result.data);
      setCount(result.data.length);
    }
    SegmentName();
  }, []);

  useEffect(() => {
    async function areaListsMerge() {
      const url = process.env.REACT_APP_API_URL + '/getAreaLists';
      const data = {
        groupID: localStorage.getItem("crm_group_id"),
        companyID: "",
        locationID: ""
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log("getAreaLists", result.data);
      setGetAreaLists(result.data);
    }
    areaListsMerge();
  }, []);

  useEffect(() => {
    async function allCity() {
      const url = process.env.REACT_APP_API_URL + '/getLocationLists';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(allcitydrop)
      });
      const result = await response.json();
      console.log(result);
      setLocations(result.data);
    }
    allCity();
  }, []);

  useEffect(() => {
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
         1024: {
          slidesPerView: 3,
        }
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    swiperRef.current = swiper;
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 text-center mt-3">
          <div className="row">
            <div className="col-md-4 text-left mt-1">
              <span className="pinnded-label">Pinned</span>
              <div className="float-left">
                <select ref={selectRef} className="dropdown dashboard-all-cities">
                  <option value="All Cities">All Cities ({count})</option>
                  {locations.map((item, index) => (
                    <option key={index} value={item.LocationName}>
                      {item.LocationName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="swiper-container mySwiper">
            <div className="swiper-wrapper">
              {Array.isArray(segmentName) && typeof segmentName.find === "function" ? (
                selectedLocation === "All Cities" ? (
                  getAreaLists.map((item, index) => {
                    const segment = segmentName.find(
                      (seg) => seg.CanId === item.CanId && (seg.SegmentName === "BIA" || seg.SegmentName === "MBIA" || seg.SegmentName === "BBB")
                    );

                    if (!segment) {
                      return null; // Skip rendering if segment is not found
                    }

                    return (
                      <div key={index} className="swiper-slide">
                        <div className="myitem">
                          <img src={frame1} alt="frame" className="img-fluid" />
                          <div className="right-section">
                            <div className="h1title">
                              <h5 className="dash-tittle">Segment - <span>{segment.SegmentName}</span></h5>
                              <div className="tooltips-pinned-feature">
                                <Tooltip content={segment.SegmentName} arrow={false}>
                                  <img src={unpin} alt="unpin" className="img-fluid" />
                                </Tooltip>
                              </div>
                            </div>
                            <div className="disimg">
                              <div className="row">
                                <div className="col-md-8 col-8">
                                  <div className="cityname">
                                    <h6>{item.AreaName}</h6>
                                  </div>
                                </div>
                                <div className="col-md-4 col-4">
                                  <div className="float-right mt-3">
                                    <img src={distance} alt="distance" className="img-fluid" />
                                    <span>{item.AvgDistance}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="cityname1">
                              <h6>{item.AreaName}</h6>
                              <div className="wrapcity" data-tip={item.LocationName} data-for={item.CanId}>
                                <img src={Location} alt="location" className="img-fluid" />
                              </div>
                            </div>
                            <div className="tooltips" id={item.CanId}>
                              {item.LocationName}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  getAreaLists
                    .filter((item) => item.LocationName === selectedLocation)
                    .map((item, index) => {
                      const segment = segmentName.find(
                        (seg) => seg.CanId === item.CanId && (seg.SegmentName === "BIA" || seg.SegmentName === "MBIA" || seg.SegmentName === "BBB")
                      );

                      if (!segment) {
                        return null; // Skip rendering if segment is not found
                      }

                      return (
                        <div key={index} className="swiper-slide">
                          <div className="myitem">
                            <img src={frame1} alt="frame" className="img-fluid" />
                            <div className="right-section">
                              <div className="h1title">
                                <h5 className="dash-tittle">Segment - <span>{segment.SegmentName}</span></h5>
                                <div className="tooltips-pinned-feature">
                                  <Tooltip content={segment.SegmentName} arrow={false}>
                                    <img src={unpin} alt="unpin" className="img-fluid" />
                                  </Tooltip>
                                </div>
                              </div>
                              <div className="disimg">
                                <div className="row">
                                  <div className="col-md-8 col-8">
                                    <div className="cityname">
                                      <h6>{item.AreaName}</h6>
                                    </div>
                                  </div>
                                  <div className="col-md-4 col-4">
                                    <div className="float-right mt-3">
                                      <img src={distance} alt="distance" className="img-fluid" />
                                      <span>{item.AvgDistance}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="cityname1">
                                <h6>{item.AreaName}</h6>
                                <div className="wrapcity" data-tip={item.LocationName} data-for={item.CanId}>
                                  <img src={Location} alt="location" className="img-fluid" />
                                </div>
                              </div>
                              <div className="tooltips" id={item.CanId}>
                                {item.LocationName}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                )
              ) : (
                <div>No segments found</div>
              )}
            </div>
            <div className="swiper-button-next">
              <img src={nextArrow} alt="next-arrow" className="img-fluid" />
            </div>
            <div className="swiper-button-prev">
              <img src={nextArrow} alt="prev-arrow" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pinnedfeature;
