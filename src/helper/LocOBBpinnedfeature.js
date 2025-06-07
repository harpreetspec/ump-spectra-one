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
import gr from "../assets/images/gr.png";
import Bangalore from "../assets/images/Bangalore.png";
import Chennai from "../assets/images/Chennai.png";
import Gurgaon from "../assets/images/Gurgaon.png";
import Hosur from "../assets/images/Hosur.png";
import Jamshedpur from "../assets/images/Jamshedpur.png";
import Jodhpur from "../assets/images/Jodhpur.png";
import Mumbai from "../assets/images/Mumbai.png";
import NewDelhi from "../assets/images/New Delhi.png";
import Noida from "../assets/images/Noida.png";
import Pune from "../assets/images/Pune.png";
import Delhi from "../assets/images/Delhi.png";
import Spare from "../assets/images/Spare.png";




const LocOBBpinnedfeature = ({ allcitydropLoc }) => {
  // console.log(allcitydropLoc);
  
  const swiperRef = useRef(null);
  // const [showFullAreaName, setShowFullAreaName] = useState(false);
  const [locations, setLocations] = useState([]);
  const [getAreaLists, setGetAreaLists] = useState();
  const [segmentName, setSegmentName] = useState();
  const [count, setCount] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('All Cities');
  const [getUtilization, setGetUtilization] = useState();
  const [utilizationMap, setUtilizationMap] = useState({});
  const [filterLocations, setfilterLocations] = useState([])
  const [loginCanId,setLoginCanId] = useState("")
  const selectRef = useRef(null);
  const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
  const companyID = localStorage.getItem('crm_company_id');
  const locationID = localStorage.getItem('crm_location_id');
  const crm_role = localStorage.getItem('crm_role');


  useEffect(() => {
    $(selectRef.current).select2({
      minimumResultsForSearch: -1,
    });

    // Event listener for the change event
    $(selectRef.current).on('change', function (e) {
      const selectedValue = e.target.value;
      setSelectedLocation(e.target.value)
      // console.log('Selected value:', selectedValue);
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
        "companyID": (crm_role == "L3") ? companyID:"",
        "locationID":  (crm_role == "L3") ? locationID:""
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      // console.log("getSolutionLists", result.data);
      setLoginCanId(localStorage.getItem("credentialKey"))
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
        groupID: localStorage.getItem("crm_group_id"),
        companyID: localStorage.getItem("crm_company_id"),
        locationID: localStorage.getItem("crm_location_id")
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      // console.log("getAreaLists", result.data);
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
        body: JSON.stringify(allcitydropLoc)
      });
      const result = await response.json();
      // console.log(result);
      setLocations(result.data);
      const filteredResponse = result.data.filter(item => item.LocationId == localStorage.getItem("crm_location_id"));
      // console.log("filteredResponse",filteredResponse);
      setfilterLocations(filteredResponse)
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
//old code satyam
// const utiliztion = async (segmentName, type, serviceID) => {
//   const url = process.env.REACT_APP_API_URL + '/utilization';
//   const data = {
//     UtilizationType: type,
//     ProductSegment: segmentName,
//     canId: serviceID,
//   };
//   const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   });
//   // console.log(segmentName, type, serviceID);

//   const result = await response.json();
//   // console.log(result.data.response.max_utilization);
//   return result; // Return the result object
// };


// const convertBytesToMbps = bytes => {
//   const megabytes = bytes / (1024 * 1024);
//   return megabytes.toFixed(2); // Rounded to 2 decimal places
// };
// useEffect(() => {
//   if (segmentName && segmentName.length > 0) {
//     const selectedSegments = segmentName.filter(
//       (seg) => seg.SegmentName == 'BIA' || seg.SegmentName === 'MBIA' || seg.SegmentName === 'BBB' 
//     );
//     if (selectedSegments.length > 0) {
//       let currentDate = new Date().toISOString().substring(0, 10); // Current date
//       let fromDate = new Date();
//       fromDate.setDate(fromDate.getDate() - 7); // Subtract 7 days
//       let sevenDaysAgo = fromDate.toISOString().substring(0, 10);
//       const type = 'weekly'; // Example value, replace with the desired value

//       Promise.all(
//         selectedSegments.map((segment) => {
//           const serviceID = segment.CanId; // Assuming CanId is the desired service ID
//           return utiliztion(segment.SegmentName, type, serviceID )
//           .then((response) => response?.data?.response?.max_utilization || '')
//           .catch((error) => {
//             // Handle error
//             return '';
//           });
//         })
//       ).then((utilizationValues) => {
//         const utilizationMap = {};
//         selectedSegments.forEach((segment, index) => {
//           const serviceID = segment.CanId;
//           utilizationMap[serviceID] = utilizationValues[index];
//         });
//         console.log("utilizationMap",utilizationMap);
//         setUtilizationMap(utilizationMap);
//       });
//     }
//   }
// }, [segmentName]);
//new code
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
      (seg) => seg.SegmentName === 'HBB'
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
        // console.log("utilizationMap", utilizationMap);
        setUtilizationMap(utilizationMap);
      });
    }
  }
}, [segmentName]);


return (
  <div className="dashboard-box">
    <div className="dashboard-box-top-bar" id="pinnedTopBar">
      <div className="dashboard-box-heading">
        Pinned Services <span>{selectedLocation === "All Cities" ? "1" : "1"}</span>
      </div>
      <div className="dashboard-box-options">
        <div className="dashboard-box-option d-flex align-items-center justify-content-center">
          {/* <img src={distance} alt="" />
          <select
            id="mySelect"
            ref={selectRef}
            className="select2-custom-pinned"
          >
            <option value="All Cities">{filterLocations[0].LocationName ? filterLocations[0].LocationName : ""}</option>
            <option value="All Cities">All Cities</option>
            {filterLocations.map((location) => (
              <option key={location.LocationName} value={location.LocationName}>
                {location.LocationName}
              </option>
            ))}
          </select> */}
          <div className="dropdown spectra-dropdown select-dropdown">
            <div
              className="select-custom dropdown-toggle rounded-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              role="button"
            >
              <div className="d-flex align-items-center gap-2">
                {/* <img src={productIcon} alt="" /> */}
                <span className="textValue"> {filterLocations.length > 0 && filterLocations[0].LocationName}</span>
              </div>
            </div>
            <ul className="dropdown-menu">
              {filterLocations ? filterLocations.map((location, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  data-value={location.LocationName}
                //  onClick={handleCalenderChange}
                style={{fontSize:"14px"}}
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
              if (item.CanId === localStorage.getItem("credentialKey")) {
                const segment = segmentName.find((seg) => seg.CanId === localStorage.getItem("credentialKey"));
                if (!segment) {
                
                  return null;
                }
              return (
                <div key={index} className="swiper-slide">
                  <div className="feature-box">
                    <div className="feature-img">
                      {/* <img className="frame-img" src={gr} alt="" /> */}
                      {item.LocationName.toLowerCase().toLowerCase() == "bangalore" &&
                      <img className="frame-img" src={Bangalore} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "chennai" &&
                      <img className="frame-img" src={Chennai} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "delhi" &&
                      <img className="frame-img" src={Delhi} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "gurgaon" &&
                      <img className="frame-img" src={Gurgaon} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "hosur" &&
                      <img className="frame-img" src={Hosur} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "jamshedpur" &&
                      <img className="frame-img" src={Jamshedpur} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "jodhpur" &&
                      <img className="frame-img" src={Jodhpur} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "mumbai" &&
                      <img className="frame-img" src={Mumbai} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "new delhi" &&
                      <img className="frame-img" src={NewDelhi} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "noida" &&
                      <img className="frame-img" src={Noida} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "pune" &&
                      <img className="frame-img" src={Pune} alt="" />
                    }
                    {
                      item.LocationName.toLowerCase() !== "bangalore" &&
                      item.LocationName.toLowerCase() !== "chennai" &&
                      item.LocationName.toLowerCase() !== "delhi" &&
                      item.LocationName.toLowerCase() !== "gurgaon" &&
                      item.LocationName.toLowerCase() !== "hosur" &&
                      item.LocationName.toLowerCase() !== "jamshedpur" &&
                      item.LocationName.toLowerCase() !== "jodhpur" &&
                      item.LocationName.toLowerCase() !== "mumbai" &&
                      item.LocationName.toLowerCase() !== "new delhi" &&
                      item.LocationName.toLowerCase() !== "noida" &&
                      item.LocationName.toLowerCase() !== "pune" &&
                      
                      <img className="frame-img" src={Spare} alt="" />
                    }

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
              )}
            })
          ) : (
            getAreaLists && getAreaLists
              .filter((item) => item.LocationName === selectedLocation)
              .map((item, index) => {
                // const segment = segmentName.find((seg) => seg.CanId == loginCanId);
                if (item.CanId === localStorage.getItem("credentialKey")) {
                  const segment = segmentName.find((seg) => seg.CanId === localStorage.getItem("credentialKey"));
                  if (!segment) {
                
                    return null;
                  }
                return (
                  <div key={index} className="swiper-slide">
                    <div className="feature-box">
                      <div className="feature-img">
                        {/* <img className="frame-img" src={gr} alt="" /> */}
                        {item.LocationName.toLowerCase().toLowerCase() == "bangalore" &&
                      <img className="frame-img" src={Bangalore} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "chennai" &&
                      <img className="frame-img" src={Chennai} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "delhi" &&
                      <img className="frame-img" src={Delhi} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "gurgaon" &&
                      <img className="frame-img" src={Gurgaon} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "hosur" &&
                      <img className="frame-img" src={Hosur} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "jamshedpur" &&
                      <img className="frame-img" src={Jamshedpur} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "jodhpur" &&
                      <img className="frame-img" src={Jodhpur} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "mumbai" &&
                      <img className="frame-img" src={Mumbai} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "new delhi" &&
                      <img className="frame-img" src={NewDelhi} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "noida" &&
                      <img className="frame-img" src={Noida} alt="" />
                    }
                    {item.LocationName.toLowerCase() == "pune" &&
                      <img className="frame-img" src={Pune} alt="" />
                    }
                    {
                      item.LocationName.toLowerCase() !== "bangalore" &&
                      item.LocationName.toLowerCase() !== "chennai" &&
                      item.LocationName.toLowerCase() !== "delhi" &&
                      item.LocationName.toLowerCase() !== "gurgaon" &&
                      item.LocationName.toLowerCase() !== "hosur" &&
                      item.LocationName.toLowerCase() !== "jamshedpur" &&
                      item.LocationName.toLowerCase() !== "jodhpur" &&
                      item.LocationName.toLowerCase() !== "mumbai" &&
                      item.LocationName.toLowerCase() !== "new delhi" &&
                      item.LocationName.toLowerCase() !== "noida" &&
                      item.LocationName.toLowerCase() !== "pune" &&
                      
                      <img className="frame-img" src={Spare} alt="" />
                    }
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
                )}
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

export default LocOBBpinnedfeature