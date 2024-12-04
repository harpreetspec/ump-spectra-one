import React, { useEffect, useRef, useState } from 'react';
import frame1 from "../assets/images/frame-1.png";
import gr from "../assets/images/gr.png";
import or from "../assets/images/or.png";
import bl from "../assets/images/bl.png";
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
import nextArrow from "../assets/images/next-arrow.svg";
import distance from "../assets/images/distance.svg"
import Swiper from "swiper";
import Location from "../assets/images/loc.svg";
import unpin from "../assets/images/unpin.svg";
import pin from "../assets/images/pin.svg"
import Tooltip from 'react-tooltip-lite';
import "../assets/css/dashboard.css";
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.min.css';
import ApplyFilter from '../helper/ApplyFilter';
import TopNotification from '../helper/TopNotification';
import GetHelp from '../helper/GetHelp';
import L2OBBDataConsumptionTable from "../helper/L2OBBDataConsumptionTable";
import { useLocation } from 'react-router-dom';



const Pinnedfeature = ({ allcitydrop }) => {
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
  const [pinnedFeatures, setPinnedFeatures] = useState([]);
  const [getPinnedClicked, setPinnedClicked] = useState(null);
  const [isNextDisabled, setIsNextDisabled] = useState();
  const [maxSlideCount, setMaxSlideCount] = useState()
  const [getDataConsumptionParms, setDataConsumptionParms] = useState()
  const [pinFlag, setPinFlag] = useState(false);
  const crmRole = localStorage.getItem('crm_role');
  const segment = localStorage.getItem('segment');
  const location = useLocation();
  const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
  const locationID = localStorage.getItem('crm_location_id');
  
  const paramValue = new URLSearchParams(location.search);
  var parms = paramValue.get("parms")?  paramValue.get("parms") : null;
  const DCParms = parms && JSON.parse(parms);
  console.log("abc", DCParms);

  const frameImages = [or, bl, gr];

  useEffect(() => {
     !DCParms && setPinnedClicked("");
  }, [DCParms]);

  useEffect(() => {
    console.log(DCParms);
    setDataConsumptionParms(DCParms)
 }, [DCParms?.period, DCParms?.canID]);

  // const DCParms = {
  //   canID: 207648,
  //   period : "4" 
  // };
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
   let dup = JSON.parse(sessionStorage.getItem("dup"));
   console.log(dup);
  const defaultNetworkUsage = {
    canID: dup ? dup.canID : localStorage.getItem("credentialKey"),
    period: dup ? dup.period : "4",
    segmentName: localStorage.getItem("segment"),
  }
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
      slidesPerView: maxSlideCount,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    
   swiperRef.current = swiper;
   //
   
   //
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
  }, [maxSlideCount]);
  const handleDivClick = (selectedCanDetail) => {
    selectedCanDetail.item.SegmentName = selectedCanDetail.SegmentName
    selectedCanDetail.item.Bandwidth = selectedCanDetail.Bandwidth
    selectedCanDetail.item.Datalimit = selectedCanDetail.Datalimit
    console.log("selectedCanDetail",selectedCanDetail.item);
  
    setPinnedClicked(selectedCanDetail.item);
    setPinFlag(true);

    if(selectedCanDetail.item.SegmentName === "OBB" || selectedCanDetail.item.SegmentName === "BBB"){
      const DCParms = {
        canID: selectedCanDetail.item.CanId,
        period: "4"
      };
      setDataConsumptionParms(DCParms);
    }else{
      setDataConsumptionParms("");
    }

    let dumpArray = [];
    dumpArray.push(selectedCanDetail.item)
    let pinnedClicked = JSON.stringify(dumpArray)
    sessionStorage.setItem('pinnedClicked', pinnedClicked);
  }

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
  useEffect(() => {

    // Check if the Swiper instance is available

    if (swiperRef.current) {
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&",selectedLocation === "All Cities" ? count : getAreaLists.filter(item => item.LocationName === selectedLocation).length);
     let maxNextSlide = selectedLocation === "All Cities" ? count : getAreaLists.filter(item => item.LocationName === selectedLocation).length
      // Reset the carousel position to the first slide

      swiperRef.current.slideTo(0, 0, false);
      setMaxSlideCount(maxNextSlide)
    }

  }, [selectedLocation]);
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
const utiliztion = async (segmentName, type, serviceID) => {
  const url = process.env.REACT_APP_API_URL + '/utilization';
  const data = {
    UtilizationType: type,
    ProductSegment: segmentName,
    canId: serviceID,
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

useEffect(() => {
  if (segmentName && segmentName.length > 0) {
    const selectedSegments = segmentName.filter(
      (seg) => seg.SegmentName === 'BIA' || seg.SegmentName === 'MBIA' || seg.SegmentName === 'BBB' 
    );
    if (selectedSegments.length > 0) {
      const type = 'weekly'; // Example value, replace with the desired value
      Promise.all(
        selectedSegments.map((segment) => {
          const serviceID = segment.CanId; // Assuming CanId is the desired service ID
          return utiliztion(segment.SegmentName, type, serviceID)
            .then((response) => response?.data?.response?.max_utilization || '')
            .catch((error) => {
              // Handle error
              return '';
            });
        })
      ).then((utilizationValues) => {
        const utilizationMap = {};
        selectedSegments.forEach((segment, index) => {
          const serviceID = segment.CanId;
          utilizationMap[serviceID] = utilizationValues[index];
        });
        setUtilizationMap(utilizationMap);
      });
    }
  }
}, [segmentName]);

const handlePinUnpin = (canId) => {
  // alert("jhdjh")
  if (pinnedFeatures.includes(canId)) {
    // If the feature is already pinned, remove it
    setPinnedFeatures(pinnedFeatures.filter((id) => id !== canId));
  } else {
    // If the feature is not pinned, add it
    setPinnedFeatures([...pinnedFeatures, canId]);
  }
};
useEffect(() => {
  const pinnedFeaturesString = localStorage.getItem('pinnedFeatures');
  if (pinnedFeaturesString) {
    setPinnedFeatures(JSON.parse(pinnedFeaturesString));
  }
}, []);

// Save pinned features to localStorage when the pinnedFeatures state changes
useEffect(() => {
  localStorage.setItem('pinnedFeatures', JSON.stringify(pinnedFeatures));
}, [pinnedFeatures]);

const sortAreaLists = (areaLists, pinnedFeatures) => {
  if (!Array.isArray(areaLists)) {
    console.error('Error: areaLists is not a valid array.');
    return []; // or return areaLists; depending on your use case
  }
  const pinnedItems = [];
  const unpinnedItems = [];

  areaLists.forEach((item) => {
    if (pinnedFeatures.includes(item.CanId)) {
      pinnedItems.push(item);
    } else {
      unpinnedItems.push(item);
    }
  });

  return [...pinnedItems, ...unpinnedItems];
};

return (
  <>
  <div class="col-xl-8 col-lg-7 col-sm-12 col-12">
  <div className="dashboard-box">
    <div className="dashboard-box-top-bar" id="pinnedTopBar">
      <div className="dashboard-box-heading">
        Pinned Services <span>{selectedLocation === "All Cities" ? count : getAreaLists.filter(item => item.LocationName === selectedLocation).length}</span>
      </div>
      <div className="dashboard-box-options">
        <div className="dashboard-box-option d-flex align-items-center justify-content-center">
          <img src={distance} alt="" />
          <select
            id="mySelect"
            ref={selectRef}
            className="select2-custom-pinned"
          >
            <option value="All Cities">All Cities</option>
            {locations.length > 0 && [...new Set(locations.map(location => location.LocationName))].map((ulocation) => (
              <option key={ulocation} value={ulocation}>
                {ulocation}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>

    <div className="swiper mySwiper">
      <div className="swiper-wrapper feature-container">
        {Array.isArray(segmentName) && typeof segmentName.find === "function" ? (
          selectedLocation === "All Cities" ? ( // Check if selectedLocation is "All Cities"
          sortAreaLists(getAreaLists, pinnedFeatures).sort((a, b) => {
            // First, sort by LocationName
            const locationComparison = a.LocationName.localeCompare(b.LocationName);
        
            // If LocationName is the same, then sort by AreaName
            return locationComparison === 0 ? a.AreaName.localeCompare(b.AreaName) : locationComparison;
          }).map((item, index) => {
            const segment = segmentName.find((seg) => seg.CanId === item.CanId);
            const isPinned = pinnedFeatures.includes(item.CanId);
            // Skip the item if no matching segment is found
            if (!segment) {
              return null;
            }
          
            // Define an array of image sources
            
          
            return (
              <div key={index} className="swiper-slide">
                <div className="feature-box" onClick={() => handleDivClick({item, SegmentName: segment.SegmentName, Bandwidth: segment.Bandwidth, Datalimit: segment.Datalimit})}>
                  <div className="feature-img">
                    {/* Use the index to select the appropriate image source */}
                    {/* <img className="frame-img" src={frameImages[index % frameImages.length]} alt="" /> */}

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
                      <span className="span2pin card-options">{isPinned ? "Unpin" : "Pin" }</span>  
                      <img
                        src={isPinned ? unpin : pin}
                        alt=""
                        onClick={() => handlePinUnpin(item.CanId)}
                      />
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
                        {segment.Bandwidth}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          
          ) : (
            // getAreaLists
            //   .filter((item) => item.LocationName === selectedLocation)
            //   .map((item, index) => {
              sortAreaLists(getAreaLists.filter((item) => item.LocationName === selectedLocation), pinnedFeatures).sort((a, b) => a.AreaName.localeCompare(b.AreaName)).map((item, index) => {
                const segment = segmentName.find((seg) => seg.CanId === item.CanId);
                const isPinned = pinnedFeatures.includes(item.CanId);
                // Skip the item if no matching segment is found
              if (!segment) {
                
                return null;
              }
                return (
                  <div key={index} className="swiper-slide">
                    <div className="feature-box" onClick={() => handleDivClick({item, SegmentName: segment.SegmentName, Bandwidth: segment.Bandwidth, Datalimit: segment.Datalimit})}>
                      <div className="feature-img">
                        {/* <img className="frame-img" src={frame1} alt="" /> */}
                        {/* <img className="frame-img" src={frameImages[index % frameImages.length]} alt="" /> */}

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
                          {/* <img src={unpin} alt="" /> */}
                          <img
                  src={isPinned ? unpin : pin} // Display pin or unpin image based on the pinned state
                  alt=""
                  onClick={() => handlePinUnpin(item.CanId)} // Call the handlePinUnpin function when clicked
                />
                        </span>
                      </div>
                      <div className="feature-content">
                        <div>
                          <div className="feature-name">{segment ? segment.SegmentName : ""}</div>
                          <div className="feature-subname mt-1">Bandwidth:</div>
                        </div>
                        <div>
                          <div className="feature-service">Service ID : {item.CanId}</div>
                          <div className="feature-subname mt-1"> {segment.Bandwidth}</div>
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
      {/* <ApplyFilter getPinnedClicked={getPinnedClicked} pinFlag={pinFlag} /> */}
    </div>

    <div class="col-xl-4 col-lg-5 col-sm-12 col-12">
      {/* Top Notifications Section  */}

      {/* <TopNotification /> */}
      <TopNotification crmRole={crmRole} segment={segment} />
      {/* Data Consumption Section */}
      {/* <DataConsumption /> */}
      {/* {(DCParms &&
      (<L2OBBDataConsumptionTable parms={DCParms}/>))
      } */}
      
     
    </div>
  </>
);


}

export default Pinnedfeature