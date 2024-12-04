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




const CompanyOBB_pinnedf = ({ allcitydrop }) => {
  const swiperRef = useRef(null);
  // const [showFullAreaName, setShowFullAreaName] = useState(false);
  const [locations, setLocations] = useState([]);
  const [getAreaLists, setGetAreaLists] = useState();
  const [segmentName, setSegmentName] = useState();
  const [count, setCount] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('All Cities');
  const [getUtilization, setGetUtilization] = useState();
  const [utilizationMap, setUtilizationMap] = useState({});
  const selectRef = useRef(null);
  const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
  const locationID = localStorage.getItem('crm_location_id');

  useEffect(() => {
    $(selectRef.current).select2({
      minimumResultsForSearch: -1,
    });

    // Event listener for the change event
    $(selectRef.current).on('change', function (e) {
      const selectedValue = e.target.value;
      setSelectedLocation(e.target.value)
      console.log('Selected value:', selectedValue);
    });

    return () => {
      // Destroy the select2 instance when the component unmounts
      $(selectRef.current).select2('destroy');
    };
  }, []);


  useEffect(() => {
    async function SegmentName() {
      const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
      const data = {
        "groupID": localStorage.getItem("crm_group_id"),
        "companyID": (segmentCheckHBB == "HBB") ? "CIndividual":"",
        "locationID":  (segmentCheckHBB == "HBB") ? locationID:""
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
      setCount(result.data.length); // Set the count value
    }
    SegmentName();

  }, []);


  useEffect(() => {
    async function areaListsMerge() {
      const url = process.env.REACT_APP_API_URL + '/getAreaLists';
      // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
      const data = {
        "groupID": localStorage.getItem("crm_group_id"),
        "companyID": (segmentCheckHBB == "HBB") ? "CIndividual":"",
      "locationID":  (segmentCheckHBB == "HBB") ? locationID:""
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
      console.log("Locations array:", result.data);
console.log("LocationName value:", result.data.length > 0 && result.data[0].LocationName);

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
      ;
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
  // utilization
  //   //useEffect(() => {
  //     async function utiliztion(segment,type,serviceID) {
  //       var url = process.env.REACT_APP_API_URL + '/utilization';
  //       // const data = {groupID: groupID, companyID: companyID, locationID: locationID}; //, fromDate: "2022-01-01", toDat$  
  //           var data = {
  //         "ProductSegment": segment,
  //         "UtilizationType":type,
  //         "canId": serviceID,
  //       }
  //             console.log('utilizationRequest=',data);
  //       var response = await fetch(url, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(data)
  //       });

  //       var result = await response.json();
  //             //console.log('UtilizationData=',result);
  //         setgetUtilization(result.data)
  //       //setGetServiceListResolved(result.data.filter(item => item.status.startsWith("Resolved")).length)
  //       //setGetServiceListNotResolved(result.data.filter(item => !item.status.startsWith("Resolved")).length)
  //     }
  //    // utiliztion('MBIA','weekly','9017780');

  //  // }, []);
  //  end


  // useEffect(() => {
  //   if (segmentName && segmentName.length > 0) {
  //     const selectedSegments = segmentName.filter(seg => seg.SegmentName === 'BIA' || seg.SegmentName === 'MBIA');
  //     if (selectedSegments.length > 0) {
  //       const segment = selectedSegments[0]; // Assuming only one matching segment
  //       const type = 'weekly'; // Example value, replace with the desired value
  //       const serviceID = segment.CanId; // Assuming CanId is the desired service ID
  //       utiliztion(segment.SegmentName, type, serviceID);
  //     }
  //   }
  // }, [segmentName]);

  // const utiliztion = async (segment, type, serviceId) => {
  //   const url = process.env.REACT_APP_API_URL + '/utilization';
  //   const data = {
  //     UtilizationType: type,
  //     ProductSegment: segment,
  //     canId: serviceId,
  //   };

  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   });

  //   const result = await response.json();
  //   console.log("getUtilization", result.data.response.max_utilization);
  //   setGetUtilization(result.data.response.max_utilization);
  // }
  const utiliztion = async (serviceId, period) => {
    const url = process.env.REACT_APP_API_URL + '/dataConsumptionGraph';
    const data = {
      canID: serviceId,
      period: period
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    // console.log(segmentName, type, serviceID);

    const result = await response.json();
    // console.log(result.data.response.max_utilization);
    return result; // Return the result object
  };


  const convertBytesToMbps = bytes => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2); // Rounded to 2 decimal places
  };
  useEffect(() => {
    if (segmentName && segmentName.length > 0) {
      const selectedSegments = segmentName.filter(
        (seg) => seg.SegmentName === 'OBB'
      );
      if (selectedSegments.length > 0) {
        let currentDate = new Date().toISOString().substring(0, 10); // Current date
        let fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 7); // Subtract 7 days
        let sevenDaysAgo = fromDate.toISOString().substring(0, 10);
        const type = 'weekly'; // Example value, replace with the desired value

        Promise.all(
          selectedSegments.map((segment) => {
            const serviceID = segment.CanId; // Assuming CanId is the desired service ID
            return utiliztion(serviceID, "4")
              .then((response) => {
                let totalBytes = response.data.response.reduce(
                  (total, item) => total + parseInt(item.total),
                  0
                );
                totalBytes = convertBytesToMbps(totalBytes)
                return { serviceID, totalBytes }; // Include CanId and totalBytes in the return object
              })
              .catch((error) => {
                // Handle error
                return { serviceID, totalBytes: '' }; // or handle the error case appropriately
              });
          })
        ).then((utilizationValues) => {
          const utilizationMap = {};
          utilizationValues.forEach((utilization) => {
            const { serviceID, totalBytes } = utilization;
            utilizationMap[serviceID] = totalBytes;
          });
          console.log("utilizationMap", utilizationMap);
          setUtilizationMap(utilizationMap);
        });
      }
    }
  }, [segmentName]);



  return (
    <div className="dashboard-box">
      <div className="dashboard-box-top-bar" id="pinnedTopBar">
        <div className="dashboard-box-heading">
          Pinned Services <span>{selectedLocation === "All Cities" ? count : getAreaLists.filter(item => item.LocationName === selectedLocation).length}</span>
        </div>
        <div className="dashboard-box-options">
          <div className="dashboard-box-option d-flex align-items-center justify-content-center">
          <div className="dropdown spectra-dropdown select-dropdown">
            <div
              className="select-custom dropdown-toggle rounded-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              role="button"
            >
              <div className="d-flex align-items-center gap-2">
                {/* <img src={productIcon} alt="" /> */}
                <span className="textValue"> {locations.length > 0 && locations[0].LocationName}</span>
              </div>
            </div>
            <ul className="dropdown-menu">
              {locations ? locations.map((location, index) => (
                <li
                  key={index}
                  className="dropdown-item single_allCity"
                  data-value={location.LocationName}
                //  onClick={handleCalenderChange}
                >
                  {location.LocationName}
                </li>
              )) : ""}
            </ul>



          </div>
          </div>
        </div>
      </div>

      <div className="swiper mySwiper">
        <div className="swiper-wrapper feature-container">
          {Array.isArray(segmentName) && typeof segmentName.find === "function" ? (
            selectedLocation === "All Cities" ? ( // Check if selectedLocation is "All Cities"
            getAreaLists && getAreaLists.map((item, index) => {
                const segment = segmentName.find((seg) => seg.CanId === item.CanId);
                if (!segment) {

                  return null;
                }
                return (
                  <div key={index} className="swiper-slide">
                    <div className="feature-box">
                      <div className="feature-img">
                        <img className="frame-img" src={frame1} alt="" />

                        <span className="span1 d-flex flex-row align-items-center justify-content-around">
                          <img src={Location} alt="" />
                          {item.LocationName} |&nbsp; {' '}
                          <Tooltip className="tooltip-custom" content={item.AreaName}>
                            <span>{item.AreaName.substring(0, 10)}...</span>
                          </Tooltip>
                        </span>

                        <span className="span2 d-none">
                          <img src={unpin} alt="" />
                        </span>
                      </div>
                      <div className="feature-content">
                        <div>
                          <div className="feature-name">{segment ? segment.SegmentName : ""}</div>
                          <div className="feature-subname mt-1">Bandwidth:</div>
                        </div>
                        <div>
                          <div className="feature-service">Service ID : {item.CanId}</div>
                          <div className="feature-subname mt-1">
                            {/* {utilizationMap[item.CanId] ? (
                            utilizationMap[item.CanId] >= 1024 ? 
                              `${(utilizationMap[item.CanId] / 1024).toFixed(2)} GB` : 
                              `${utilizationMap[item.CanId]} MB` 
                          ) :
                            'N/A'} */}
                            {segment.Bandwidth}
                            </div>
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
                  const segment = segmentName.find((seg) => seg.CanId === item.CanId);
                  if (!segment) {

                    return null;
                  }
                  return (
                    <div key={index} className="swiper-slide">
                      <div className="feature-box">
                        <div className="feature-img">
                          <img className="frame-img" src={frame1} alt="" />
                          <span className="span1 d-flex flex-row align-items-center justify-content-around">
                            <img src={Location} alt="" />
                            {item.LocationName} |&nbsp; {' '}
                            <Tooltip className="tooltip-custom" content={item.AreaName}>
                              <span>{item.AreaName.substring(0, 10)}...</span>
                            </Tooltip>
                          </span>
                          <span className="span2 d-none">
                            <img src={unpin} alt="" />
                          </span>
                        </div>
                        <div className="feature-content">
                          <div>
                            <div className="feature-name">{segment ? segment.SegmentName : ""}</div>
                            <div className="feature-subname mt-1">Bandwidth:</div>
                          </div>
                          <div>
                            <div className="feature-service">Service ID : {item.CanId}</div>
                            <div className="feature-subname mt-1">
                              {/* {utilizationMap[item.CanId] !== null ? `${utilizationMap[item.CanId]} MB` : 'N/A'} */}
                              {segment.Bandwidth}
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            )
          ) : (
            <div>No segment data available.</div>
          )}
        </div>
        <div className="swiper-button-next" onClick={handleNext}>
          <img src={nextArrow} alt="" />
        </div>
        <div className="swiper-button-prev" onClick={handlePrevClick}>
          <img src={nextArrow} alt="" />
        </div>
      </div>
    </div>
  );


}

export default CompanyOBB_pinnedf