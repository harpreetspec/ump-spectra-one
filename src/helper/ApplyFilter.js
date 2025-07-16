import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Notification from '../Notification';
import { deviceDetect, mobileModel } from "react-device-detect"
import "../assets/css/dashboard.css"
// import SideBar from './Sidebar';
// import Header from './Header';
// import Footer from './Footer';
import topSearch from "../assets/images/top-search.svg"
import topBell from "../assets/images/top-bell.svg"
import topProfile from "../assets/images/top-user-img.svg"
import arrowOutward from "../assets/images/arrow-outward.svg"
import distance from "../assets/images/distance.svg"

// import $ from "../assets/jquery/jquery.min.js"
import Swiper from "swiper";
import download from "../assets/images/download.svg";
import pin from "../assets/images/pin.svg";
import graph1 from "../assets/images/graph1.png"
import "swiper/swiper-bundle.min.css";
import graph2 from "../assets/images/graph1.png";
// import AvailabilityUptime from '../helper/availabilityUptime';
import Availability from '../helper/Availability';
import { Chart } from 'chart.js/auto';
import $ from "jquery";
import 'select2';
import 'select2/dist/css/select2.min.css';
import Pinnedfeature from '../helper/pinnedfeature';
import TopNotification from '../helper/TopNotification';
import DataConsumption from '../helper/DataConsumption';
import NetworkUsage from '../helper/NetworkUsage';
import GetHelp from '../helper/GetHelp';
import Filter from '../helper/Filter';
import AvailabilityTest from "../helper/AvailabilityTest"
import CompanyOBB_pinnedf from '../helper/ComOBBpinnedfeature';
import LocOBBpinnedfeature from '../helper/LocOBBpinnedfeature';
import L2OBBDataConsumption from '../helper/L2OBBDataConsumption';
import PinnedL2OBBDataConsumption from '../helper/PinnedL2OBBDataConsumption';
import LocNetworkUsage from "../helper/LocNetworkUsage";
import LocTopNotification from "../helper/LocTopNotifications"
import LocAvilability from "../helper/LocAvilability";
import LocResources from "../helper/LocResources"
import LocDataConsumption from "../helper/LocDataConsumption";
import LocOBBDataConsumption from "../helper/LocOBBDataConsumption";
import LocOBBTopNotifications from "../helper/LocOBBTopNotifications";
import L2OBBDataConsumptionTable from "../helper/L2OBBDataConsumptionTable";
import { useNavigate } from "react-router-dom";
import { useHistory, useLocation } from 'react-router-dom';



async function getUserName(serviceGroupId) {
  return fetch(process.env.REACT_APP_API_URL + '/getCustomerAccountDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(serviceGroupId)
  })
    .then(data => data.json())
}

const useSelect2 = (ref, onChangeCallback) => {
  useEffect(() => {
    const selectElement = $(ref.current);

    selectElement.select2({
      minimumResultsForSearch: -1,
    });

    selectElement.on('change', function (e) {
      const selectedValue = e.target.value || '';
      onChangeCallback(selectedValue);
    });

    return () => {
      selectElement.off('change'); // Remove the change event listener
      selectElement.select2('destroy');
    };
  }, [ref, onChangeCallback]);
};



export default function ApplyFilter(getPinnedClicked) {

  const [canId, setCanId] = useState();
  const [accName, setAccName] = useState();
  const swiperRef = useRef(null);
  const [crmRole, setCrmRole] = useState();
  const [segment, setSegment] = useState();
  const [getLocationCount, setGetLocationCount] = useState();
  const [getServiceCount, setGetServiceCount] = useState();
  const [getSolutionCount, setGetSolutionCount] = useState();
  const [getServiceListCount, setGetServiceListCount] = useState();

  const [getGetServiceListResolved, setGetServiceListResolved] = useState();

  const [getGetServiceListNotResolved, setGetServiceListNotResolved] = useState();
  const [invoiceCanId, setInvoiceCanId] = useState();

  const locationID = localStorage.getItem('crm_location_id');

  const groupID = localStorage.getItem('crm_group_id');

  const companyID = localStorage.getItem('crm_company_id');


  const companyName = localStorage.getItem('company_name');
  const segment2 = localStorage.getItem('segment');
  const [getInvoiceCount, setGetInvoiceCount] = useState();
  const [getGetInvoiceAmount, setGetInvoiceAmount] = useState();
  const [getGetInvoiceDueAmount, setGetInvoiceDueAmount] = useState();
  const [getSelectedSegment, setSelectedSegment] = useState();
  const [dataConsumptionParms, setDataConsumptionParms] = useState();
  const [getSelectedCan, setSelectedCan] = useState();
  const [getDCFlag, setDCFlag] = useState(false);
  const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
  // const history = useHistory(); 
  const location = useLocation();

  const allcitydrop = {

    "groupID": localStorage.getItem('crm_group_id'),

    "companyID": localStorage.getItem('crm_company_id'),

  }

  const allcitydropLoc = {

    "groupID": localStorage.getItem('crm_group_id'),

    "companyID": localStorage.getItem('crm_company_id'),
    // "locationID": localStorage.getItem("crm_location_id")
  }

  const filterData = {

    "groupID": localStorage.getItem('crm_group_id'),
    "serviceID": localStorage.getItem('credentialKey')
  }



  const selectedLocationRef = useRef(null);
  // const [filteredAreas, setFilteredAreas] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("4");
  const [solutionName, setSolutionName] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState('All Cities');
  const [locations, setLocations] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [selectedCanId, setSelectedCanId] = useState();
  const [segmentDropdown, setSegmentDropdown] = useState();
  const [getBandwidth, setBandwidth] = useState();
  const [getCanIdDetails, setCanIdDetails] = useState();
  const cityRef = useRef(null);
  const locationRef = useRef(null);
  const productRef = useRef(null);
  const periodRef = useRef(null)
  const [flagCheck, setFlagCheck] = useState(false);
  const [flagCheck2, setFlagCheck2] = useState(false);
  const [networkParms, setNetworkParms] = useState({
    service_id: '',
    period: '',
    segmentName: '',
  });
  const [availabilityParms, setAvailabilityParmsParms] = useState({
    service_id: '',
    period: '',
    segmentName: '',
  });
  const [locBandwith, setlocBandwith] = useState();
  const [locDataLimit, setlocDataLimit] = useState()
  const [getChangeArea, setChangeArea] = useState(false);
  const [getCanIdDetails1, setCanIdDetails1] = useState(false);
  const [updatedPinnedNetworkUsage, setUpdatedPinnedNetworkUsage] = useState();
  const [bandwidthFlag, setBandwidthFlag] = useState(false);
  const [pinnedFlag, setPinnedFlag] = useState(true);
  const [pinnedClickedData, setPinnedClickedData] = useState({
    AreaName: "",
    Bandwidth: "",
    CanId: "",
    Datalimit: "",
    LocationId: "",
    LocationName: "",
    SegmentName: ""
  });
  const [abcFlag, setAbcFlag] = useState(false);
  const [defaultNetworkUsage2, setDefaultNetworkUsage2] = useState(
    {
      canID: localStorage.getItem("credentialKey"),
      period: "4",
      segmentName: localStorage.getItem("segment"),
    }
  );

  //   const pinnedClickedData = JSON.parse(sessionStorage.getItem('pinnedClicked'));

  // console.log("pinnedClickedData$$$$$", getPinnedClicked.getPinnedClicked);  
  // let pinnedClickedData;
  // pinnedClickedData && setSelectedCity(pinnedClickedData.LocationName);
  // console.log("pinnedClickedData$$$$$", pinnedClickedData);

  let pinnedSession = JSON.parse(sessionStorage.getItem('pinnedClicked'));
  // console.log(pinnedSession);




  let pinnedSegment;
  let pinnedData

  // if(abcFlag){
  //   pinnedData = getPinnedClicked ? getPinnedClicked.getPinnedClicked : "";
  //   pinnedSegment = pinnedData ? pinnedData.SegmentName : "";
  //   // pinnedData && console.log("pinnedData", pinnedData.SegmentName);
  // }

  useEffect(() => {
    if (pinnedSession && pinnedSession.length > 0) {
      //  alert("pinnedSession")
      pinnedData = getPinnedClicked ? getPinnedClicked.getPinnedClicked : "";
      pinnedSegment = pinnedData ? pinnedData.SegmentName : "";
      setAbcFlag(true);
    }
  }, [pinnedSession]);

  const DCParms = pinnedData && {
    canID: pinnedData.CanId && pinnedData.CanId,
    period: selectedPeriod ? selectedPeriod : "4"
  };
  // setDataConsumptionParms(DCParms);


  const defaultNetworkUsage = {
    service_id: localStorage.getItem("credentialKey"),
    period: 4,
    segmentName: localStorage.getItem("segment"),
  }

  // const defaultNetworkUsage2 = {
  //   canID: localStorage.getItem("credentialKey"),
  //   period: "4",
  //   segmentName: localStorage.getItem("segment"),
  // }
  useEffect(() => {
    // console.log("Inside" , pinnedFlag);

    if (pinnedFlag && abcFlag && (getPinnedClicked && getPinnedClicked.getPinnedClicked)) {
      // alert("if useeffect")
      setPinnedClickedData(getPinnedClicked.getPinnedClicked);
      // pinnedClickedData = getPinnedClicked.getPinnedClicked;
      // console.log("getPinnedClicked", getPinnedClicked);
      // alert("getPinnedClicked", getPinnedClicked.getPinnedClicked);
    } else if (pinnedFlag && !flagCheck2) {
      // alert("else if useeffect ")
      setPinnedClickedData("");
    }
  }, [pinnedFlag, getPinnedClicked, abcFlag]);

  const pinnedNetworkUsage = pinnedClickedData && pinnedClickedData.CanId && pinnedClickedData.SegmentName ? {
    service_id: pinnedClickedData.CanId,
    period: 4,
    segmentName: pinnedClickedData.SegmentName
  } : null

  const pinnedApplyClick = () => {
    //  alert("pinnedApplyClick");
    // setPinnedClickedData("");    

    if (getSelectedSegment === "OBB" || getSelectedSegment === "BBB") {
      setFlagCheck(true);
      // alert(" ifgetSelectedSegment === OBB pinnedapply")
      pinnedSegment = "";
      setDCFlag(true);

      const DCParms = {
        canID: getSelectedCan,
        period: selectedPeriod ? selectedPeriod : "4"
      };
      setDataConsumptionParms(DCParms);

      const searchParams = new URLSearchParams(location.search);
      searchParams.set('parms', JSON.stringify(DCParms));
      // searchParams.set('paramName2', getSelectedCan); 

      // Construct the new search string with the updated parameter 
      const newSearch = searchParams.toString();
      // Update the URL without navigating away
      navigate({ search: newSearch });

    } else if (pinnedSegment && (pinnedSegment === "OBB" || pinnedSegment === "BBB")) {
      setFlagCheck(true);

      // alert("else if pinnedData.SegmentName === OBB pinnedapply")
      setSelectedSegment("");
      setDCFlag(true);
      const DCParms = {
        canID: pinnedData.CanId,
        period: selectedPeriod ? selectedPeriod : "4"
      };
      setDataConsumptionParms(DCParms);
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('parms', JSON.stringify(DCParms));
      // searchParams.set('paramName2', getSelectedCan); 

      // Construct the new search string with the updated parameter 
      const newSearch = searchParams.toString();
      // Update the URL without navigating away
      navigate({ search: newSearch });

    } else {
      // alert("else pinnedapply")
      setFlagCheck2(true);
      setSelectedSegment("");
      pinnedSegment = "";
      setDCFlag(false);

      const searchParams = new URLSearchParams(location.search);
      searchParams.delete("parms");
      // Construct the new search string after removing the parameter
      const newSearch = searchParams.toString();
      // Update the URL without navigating away
      navigate({ search: newSearch });

      //   const searchParams = new URLSearchParams(location.search); 
      // searchParams.set('parms', "");
      // // searchParams.set('paramName2', getSelectedCan); 

      // // Construct the new search string with the updated parameter 
      // const newSearch = searchParams.toString(); 
      // // Update the URL without navigating away
      //  navigate({ search: newSearch });
      // //  setFlagCheck((flagCheck) => !flagCheck);
    }

    const updatedPinnedNetwork = {
      service_id: pinnedClickedData && pinnedClickedData.CanId,
      period: selectedPeriod,
      segmentName: pinnedClickedData && pinnedClickedData.SegmentName
    }
    setUpdatedPinnedNetworkUsage(updatedPinnedNetwork);
    // setFlagCheck(true);
    // alert(flagCheck)
    // setFlagCheck((flagCheck) => !flagCheck);
  }

  const handleApplyClick = () => {
    let updatedNetworkParms;
    //  alert("handleApplyClick");
    setUpdatedPinnedNetworkUsage("");
    setPinnedClickedData("");
    setAbcFlag(false);

    sessionStorage.removeItem('pinnedClicked');
    // setPinnedFlag(false);
    setDataConsumptionParms("")
    let updatedParam = {
      canID: getSelectedCan ? getSelectedCan : localStorage.getItem("credentialKey"),
      period: selectedPeriod,
      segmentName: localStorage.getItem("segment"),
    }
    setDefaultNetworkUsage2(updatedParam);
    sessionStorage.setItem("dup", JSON.stringify(updatedParam));

    if (getSelectedSegment === "OBB" || getSelectedSegment === "BBB") {
      //  alert("getSelectedSegment === OBB")
      pinnedSegment = "";
      setDCFlag(true);

      const DCParms = {
        canID: getSelectedCan,
        period: selectedPeriod ? selectedPeriod : "4"
      };
      setDataConsumptionParms(DCParms);

      const searchParams = new URLSearchParams(location.search);
      searchParams.set('parms', JSON.stringify(DCParms));
      // searchParams.set('paramName2', getSelectedCan); 

      // Construct the new search string with the updated parameter 
      const newSearch = searchParams.toString();
      // Update the URL without navigating away
      navigate({ search: newSearch });

    } else if (pinnedSegment && (pinnedSegment === "OBB" || pinnedSegment === "BBB")) {
      //  alert("pinnedData.SegmentName === OBB")
      setSelectedSegment("");
      setDCFlag(true);
      const DCParms = {
        canID: pinnedData.CanId,
        period: selectedPeriod ? selectedPeriod : "4"
      };
      setDataConsumptionParms(DCParms);
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('parms', JSON.stringify(DCParms));
      // searchParams.set('paramName2', getSelectedCan); 

      // Construct the new search string with the updated parameter 
      const newSearch = searchParams.toString();
      // Update the URL without navigating away
      navigate({ search: newSearch });

    } else {
      //  alert("else")
      setSelectedSegment("");
      pinnedSegment = "";
      setDCFlag(false);

      const searchParams = new URLSearchParams(location.search);
      searchParams.delete("parms");
      // Construct the new search string after removing the parameter
      const newSearch = searchParams.toString();
      // Update the URL without navigating away
      navigate({ search: newSearch });

      //   const searchParams = new URLSearchParams(location.search); 
      // searchParams.set('parms', "");
      // // searchParams.set('paramName2', getSelectedCan); 

      // // Construct the new search string with the updated parameter 
      // const newSearch = searchParams.toString(); 
      // // Update the URL without navigating away
      //  navigate({ search: newSearch });
    }


    // console.log("getBandwidth", getBandwidth, "period", selectedPeriod);
    if (getBandwidth) {
      const { CanId } = getBandwidth[0];
      // console.log("CanId", CanId); // Log the value of CanId
    }
    if (getBandwidth && getBandwidth[0]?.CanId) {
      updatedNetworkParms = {
        service_id: getBandwidth[0].CanId,
        period: selectedPeriod,
        segmentName: getBandwidth[0].SegmentName
      }
    } else {
      updatedNetworkParms = {
        service_id: getCanIdDetails ? getCanIdDetails.serviceID : getBandwidth[0].CanId,
        period: selectedPeriod,
        segmentName: getCanIdDetails ? getCanIdDetails.segmentName : getBandwidth[0].SegmentName
      }
    }

    const updatedAvailabilityParms = {
      // service_id: getCanIdDetails ? getCanIdDetails.serviceID : getBandwidth[0].CanId,
      service_id: getBandwidth ? getBandwidth[0].CanId : getCanIdDetails.serviceID,
      period: selectedPeriod,
      // segmentName: getCanIdDetails ? getCanIdDetails.segmentName : getBandwidth[0].SegmentName
      segmentName: getBandwidth ? getBandwidth[0].SegmentName : getCanIdDetails.segmentName
    };
    // console.log("updatedNetworkParms", updatedAvailabilityParms);
    setNetworkParms(updatedNetworkParms);
    setAvailabilityParmsParms(updatedAvailabilityParms)

    setFlagCheck(true)
    // setFlagCheck((prevFlag) => !prevFlag);
    //console.log("inside function flagCheck", flagCheck);
  }

  let locNetworkParms = {}
  // filter box
  useEffect(() => {
    async function SegmentName() {



    }
    SegmentName();

  }, []);

  useEffect(() => {
    async function FilterAreaLists() {
      const url = process.env.REACT_APP_API_URL + '/getAreaLists';
      // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
      const data = {
        "groupID": localStorage.getItem("crm_group_id"),
        "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : "",
        "locationID": (segmentCheckHBB == "HBB") ? locationID : ""
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      //      console.log("getAreaLists", result.data);
      // setAreaOptions(result.data);
      Array.isArray(result.data) ? setAreaOptions(result.data) : setAreaOptions([]);
    }
    FilterAreaLists();

  }, []);



  useEffect(() => {

    async function filterCity() {
      const url = process.env.REACT_APP_API_URL + '/getLocationLists';
      const data = {
        "groupID": localStorage.getItem("crm_group_id"),
        "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : "",
        "locationID": (segmentCheckHBB == "HBB") ? locationID : ""
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      // console.log(result);
      setLocations(result.data);
    }

    filterCity();
  }, []);

  // console.log("out function flagCheck", flagCheck);




  const handleCityChange = (event) => {
    setSelectedValue("Select Segment");
    setPinnedClickedData("");
    pinnedSegment = "";
    sessionStorage.removeItem('pinnedClicked');
    setAbcFlag(false);
    // setDCFlag(false);
    // console.log(pinnedClickedData);
    // console.log("pinnedClickedData", pinnedClickedData);
    // setPinnedFlag(false);
    // setPinnedFlag((prevFlag) => !prevFlag);

    // console.log("pinnedClickedData", pinnedClickedData);
    setBandwidthFlag(true);
    setChangeArea(true);
    const selectedCity = cityRef.current.value;;
    // console.log(locations);
    setSelectedCity(selectedCity);
    setSelectedLocation('All Cities');
  };


  const handleLocationChange = async (event) => {
    setSelectedValue("Select Segment");
    setChangeArea(true);
    // setDCFlag(false);
    // setCanIdDetails(false)
    //console.log("locationRef", event.target.value);
    const selectedLocation = event;
    // console.log(selectedLocation);

    const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
    const data = {
      "groupID": localStorage.getItem("crm_group_id"),
      "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : "",
      "locationID": (segmentCheckHBB == "HBB") ? locationID : ""
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
    setSolutionName(result.data);

    setSelectedLocation(selectedLocation);
    // setSolutionName(event.target.value)
    const url1 = process.env.REACT_APP_API_URL + '/getAreaLists';
    // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
    const data1 = {
      "groupID": localStorage.getItem("crm_group_id"),
      "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : "",
      "locationID": (segmentCheckHBB == "HBB") ? locationID : ""
    };
    const response1 = await fetch(url1, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result1 = await response1.json();
    // console.log("getAreaLists", result1.data);
    // console.log("areaOptions", areaOptions);
    const filteredData = result1.data.filter(item => item.AreaName === selectedLocation);
    const canIds = filteredData.map(item => item.CanId);
    // console.log("canIds", canIds);
    setSelectedCanId(canIds);
    const filteredData2 = result.data.filter(item => canIds.includes(String(item.CanId)));
    // console.log("filteredData2", filteredData2);
    setSegmentDropdown(filteredData2);
  };

  const handleValueChange = async (event) => {
    try {
      setCanIdDetails1(true);
      // setDCFlag(false);
      const segmentName = event;
      // console.log("segmentName", segmentName);
      setSelectedValue(segmentName);
      // console.log("segmentName", segmentName);
      const start = segmentName.indexOf("(") + 1;
      const end = segmentName.indexOf(")");
      const SegmentName = segmentName.substring(0, start - 2).trim();
      // console.log("SegmentName", SegmentName);
      setSelectedSegment(SegmentName);
      // console.log("start", start, "end", end);
      // Extract the CanId (193715)
      const matches = segmentName.match(/\((\d+)\)/);
      if (matches && matches.length === 2) {
        const CanId = matches[1]; // Extracted CanId  
        // Use the extracted CanId as needed
        // console.log("Selected CanId:", CanId);
        setSelectedCan(CanId);

        // const CanId = segmentName.substring(start, end);
        const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
        const data = {
          "groupID": localStorage.getItem("crm_group_id"),
          "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : "",
          "locationID": (segmentCheckHBB == "HBB") ? locationID : ""
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
        const filteredData3 = result.data.filter(item => item.SegmentName === SegmentName && item.CanId === CanId);
        // console.log("setBandwidth", filteredData3);
        setBandwidth(filteredData3);
        // setSolutionName(event.target.value)
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePeriodChange = async (event) => {
    // setDCFlag(false);
    const selectPeriod = event;
    // console.log("selectPeriod", selectPeriod);
    setSelectedPeriod(selectPeriod);
  }



  let filteredAreaOptions;
  if (selectedCity) {
    // console.log(selectedCity);
    filteredAreaOptions = areaOptions.filter(
      (area) => selectedCity === 'All Cities' || area.LocationName === selectedCity
    );
  } else {
    // console.log("No selectedCity");
    filteredAreaOptions = areaOptions.filter(
      (area) => area.LocationId === localStorage.getItem('crm_location_id')
    );
  }

  // const filteredAreaOptions = areaOptions.filter((area) => selectedCity === 'All Cities' || area.LocationName === selectedCity || area.LocationId === localStorage.getItem('crm_location_id')
  // );



  // console.log("areaOptions", areaOptions);
  // console.log("selectedCity", selectedCity);
  // console.log("filteredAreaOptions", filteredAreaOptions);

  const uniqueAreaNames = Array.from(new Set(filteredAreaOptions.map((area) => area.AreaName)));
  useSelect2(cityRef, handleCityChange);
  useSelect2(locationRef, handleLocationChange);
  useSelect2(productRef, handleValueChange);
  useSelect2(periodRef, handlePeriodChange);


  //----Location Count----

  useEffect(() => {

    async function locationCount() {

      const url = process.env.REACT_APP_API_URL + '/getLocationCount';

      // const data = {groupID: groupID, companyID: companyID, locationID: locationID};

      const data = {

        "groupID": groupID,

        "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : "",
        "locationID": (segmentCheckHBB == "HBB") ? locationID : ""

      }

      const response = await fetch(url, {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json'

        },

        body: JSON.stringify(data)

      });

      const result = await response.json();

      // console.log("getLocationCount",result.data.LocationCount);

      if (result.data.StatusCode === 404) {

        setGetLocationCount(0);

      } else {

        setGetLocationCount(result.data.LocationCount);

      }

    }



    locationCount();

  }, []);



  //----Solution Count----

  useEffect(() => {

    async function solutionCount() {

      const url = process.env.REACT_APP_API_URL + '/getSolutionCount';

      // const data = {groupID: groupID, companyID: companyID, locationID: locationID};

      const data = {

        "groupID": groupID,

        "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : "",

        "locationID": (segmentCheckHBB == "HBB") ? locationID : ""

      }

      const response = await fetch(url, {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json'

        },

        body: JSON.stringify(data)

      });

      const result = await response.json();

      // console.log("getSolutionCount",result.data.SolutionCount);

      if (result.data.StatusCode === 404) {

        setGetSolutionCount(0);

      } else {

        setGetSolutionCount(result.data.SolutionCount);

      }

    }



    solutionCount();

  }, []);




  //----Service List-----

  useEffect(() => {

    async function serviceList() {

      let fromDate = new Date();
      fromDate.setMonth(fromDate.getMonth() - 24)
      let toDate = new Date();
      const url = process.env.REACT_APP_API_URL + '/getServiceLists';

      // const data = {groupID: groupID, companyID: companyID, locationID: locationID}; //, fromDate: "2022-01-01", toDate: "2023-01-20"

      const data = {

        "groupID": groupID,

        "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : "",
        "locationID": (segmentCheckHBB == "HBB") ? locationID : "",
        "fromDate": fromDate.toISOString().slice(0, 10),
        "toDate": toDate.toISOString().slice(0, 10)

      }

      const response = await fetch(url, {

        method: 'POST',

        headers: {

          'Content-Type': 'application/json'

        },

        body: JSON.stringify(data)

      });

      const result = await response.json();


      if (result.data.StatusCode === 404) {

        setGetServiceListCount(0);

        setGetServiceListResolved(0);

        setGetServiceListNotResolved(0);

      } else {

        setGetServiceListCount(result.data.length);

        setGetServiceListResolved(result.data.filter(item => item.status.startsWith("Resolved")).length);

        setGetServiceListNotResolved(result.data.filter(item => !item.status.startsWith("Resolved")).length);

      }

    }



    serviceList();

  }, []);
  useEffect(() => {
    let canIdsString
    async function areaList() {
      const url = process.env.REACT_APP_API_URL + '/getAreaLists';
      const data = {
        "groupID": groupID,
        "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : "",
        "locationID": (segmentCheckHBB == "HBB") ? locationID : ""
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      //      console.log("areaList", result.data);
      const canIds = result.data.map(item => item.CanId);
      canIdsString = canIds.join(',');
      setInvoiceCanId(canIdsString);
    }

    async function fetchInvoiceCount() {
      //      console.log("invoiceCanId", invoiceCanId); // Debugging purposes
      const url = process.env.REACT_APP_API_URL + '/getInvoicesCount';
      let currentDate = new Date();
      // console.log("DDDDDDDDDDDDDDDDDDd", currentDate.getDate());
      var mm = currentDate.getMonth() - 2;
      var c_m = currentDate.getMonth() + 1;
      var i_m = ''; var j_m = '';
      if (mm < 10) {
        i_m = 0;
      }
      if (c_m < 10) {
        j_m = 0;
      }
      var dayOfMonth = currentDate.getDate()
      //var dd = currentDate.getDate();
      var dd = dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth
      var yy = currentDate.getFullYear();
      var lastMonth = yy + '-' + i_m + mm + '-' + dd;
      var currentMonth = yy + '-' + j_m + c_m + '-' + dd;
      const data = {
        "canIds": `${canIdsString}`,
        "fromDate": lastMonth + 'T00:00:00',
        "toDate": currentMonth + 'T00:00:00',
        "group_id": localStorage.getItem("credentialKey")
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      // console.log('InvoiceCount', result);
      setGetInvoiceCount(result.data.length);
    }

    async function fetchData() {
      await areaList();
      await fetchInvoiceCount();
    }

    fetchData();

  }, [invoiceCanId]);

  useEffect(() => {
    let crmrole = localStorage.getItem("crm_role")
    setCrmRole(crmrole);
  }, []);

  useEffect(() => {

    let user_device_os = deviceDetect().osName ? deviceDetect().osName : deviceDetect().os
    let credentialKeyLogin = localStorage.getItem('credentialKey');
    let width = localStorage.getItem('width');
    let height = localStorage.getItem('height');
    let gmcToken = localStorage.getItem('gmcToken');

    async function postData() {
      const url = process.env.REACT_APP_API_URL + '/gmcData';
      const data = { gmcToken: gmcToken, canID: credentialKeyLogin, screen_width: width, screen_height: height, user_device_os: user_device_os };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      // console.log(result);
    }

    postData();
  }, []);

  // getSolutionLists
  useEffect(() => {

    async function allSolutionList() {
      const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
      const data = {
        "groupID": localStorage.getItem("crm_group_id"),
        "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : "",
        "locationID": (segmentCheckHBB == "HBB") ? locationID : ""
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      // console.log(result);
      const filteredData = result.data.filter((item) => item.CanId == localStorage.getItem("credentialKey"));

      // console.log("filteredData", filteredData[0].SegmentName);
      setSegment(filteredData[0].SegmentName)
      setlocBandwith(filteredData[0].Bandwidth);
      setlocDataLimit(filteredData[0].Datalimit)
      locNetworkParms = {
        service_id: localStorage.getItem("credentialKey"),
        segmentName: filteredData[0].SegmentName

      }
    }

    allSolutionList();
  }, []);

  /*Get Invloice Count HP 20 Jun invoiceCanId*/
  useEffect(() => {
    let canIdsString;
    async function areaList() {
      const url = process.env.REACT_APP_API_URL + '/getAreaLists';


      const data = {
        "groupID": groupID,
        "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : "",
        "locationID": (segmentCheckHBB == "HBB") ? locationID : ""
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      //console.log("areaList", result.data);
      const canIds = result.data.map(item => item.CanId);
      canIdsString = canIds.join(',');
      setInvoiceCanId(canIdsString);
    }

    async function fetchInvoiceCount() {
      //console.log("invoiceCanId", invoiceCanId); // Debugging purposes
      let url = process.env.REACT_APP_API_URL + '/getInvoicesCount';
      let currentDate = new Date();
      var mm = currentDate.getMonth() - 2;
      var c_m = currentDate.getMonth() + 1;
      var i_m = ''; var j_m = '';
      if (mm < 10) {
        i_m = 0;
      }
      if (c_m < 10) {
        j_m = 0;
      }

      var dayOfMonth = currentDate.getDate()
      //var dd = currentDate.getDate();
      var dd = dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth
      var yy = currentDate.getFullYear();
      var lastMonth = yy + '-' + i_m + mm + '-' + dd;
      var currentMonth = yy + '-' + j_m + c_m + '-' + dd;
      // console.log('LastMonth=',lastMonth);
      // console.log('InvCurrentDate',currentMonth);
      let data = {
        "canIds": `${canIdsString}`,
        "fromDate": lastMonth + 'T00:00:00',
        "toDate": currentMonth + 'T00:00:00',
        "group_id": localStorage.getItem("credentialKey")
      };
      //console.log('InvoiceRequest=',data);
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      let result = await response.json();
      let inrRupee = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
      });

      //console.log('InvoiceCount', result);
      setGetInvoiceCount(result.data.invoiceCount);
      setGetInvoiceAmount(inrRupee.format(Math.round(result.data.invoiceAmount)).replace('.00', ''));
      setGetInvoiceDueAmount(inrRupee.format(Math.round(result.data.dueAmount)).replace('.00', ''));
    }

    async function fetchData() {
      await areaList();
      await fetchInvoiceCount();
    }

    fetchData();

  }, [invoiceCanId]);






  useEffect(() => {

    async function funGraph() {
      const url = process.env.REACT_APP_API_URL + '/getupTimeGraph';

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },

      });
      const result = await response.json();
      // console.log("uptimegraph", result);
    }

    funGraph();
  }, []);
  useEffect(() => {

    async function canIdDetails() {

      try {

        const url = process.env.REACT_APP_API_URL + '/getAreaLists';

        const data = {

          "groupID": localStorage.getItem("crm_group_id"),

          "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : "",
          "locationID": (segmentCheckHBB == "HBB") ? locationID : ""

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



        const url2 = process.env.REACT_APP_API_URL + '/getSolutionLists';

        const response2 = await fetch(url2, {

          method: 'POST',

          headers: {

            'Content-Type': 'application/json'

          },

          body: JSON.stringify(data)

        });

        const result2 = await response2.json();

        // console.log("getSolutionLists",result2);



        const serviceID = localStorage.getItem("credentialKey");

        let areaName, locationName, segmentName, datalimit, bandwidth, planName;



        // Find details in result.data

        const areaListData = result.data.find((item) => item.CanId === serviceID);

        // console.log(areaListData);




        if (areaListData) {

          locationName = areaListData.LocationName;

          areaName = areaListData.AreaName;

        }
        // Find details in result2.data

        const segmentData = result2.data.find((item) => item.CanId === serviceID);

        // console.log(segmentData);

        if (segmentData) {

          segmentName = segmentData.SegmentName;

          datalimit = segmentData.Datalimit;

          bandwidth = segmentData.Bandwidth;

          planName = segmentData.PlanName;

        }



        const returnDetails = {

          serviceID,

          areaName,

          locationName,

          segmentName,

          datalimit,

          bandwidth,

          planName

        };
        // console.log("setCanIdDetails", returnDetails);

        setCanIdDetails(returnDetails);
        setSelectedCity(returnDetails.locationName);

      } catch (error) {

        throw new Error('Failed to retrieve area and location details.');

      }

    }

    // Usage  

    canIdDetails();

  }, []);

  const selectRef = useRef(null);

  useEffect(() => {
    $(selectRef.current).select2({
      minimumResultsForSearch: -1,
    });

    $(selectRef.current).on('select2:open', () => {
      const container = $('.select2-container').last();
      container.css('transform', 'translateX(-60px)');
      container.css('z-index', '999');
    });

    return () => {
      $(selectRef.current).select2('destroy');
    };
  }, []);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('credentialKey');

  if (!isAuthenticated) {
    // Redirect to login page or handle unauthorized access
    navigate("/")
  }

  return (
    <>
      {/* FILTER BOX  */}
      {/* <Filter filterData={filterData} /> */}

      {segment != "Hotel" && segment != "PG" && segment != "Office" &&
        <div class="dashboard-box-top-bar">
          <div class="dashboard-box-heading">
            {(getDCFlag || (pinnedSegment && pinnedSegment == "OBB" || segment2 === "OBB")) ? "Data Consumption" : "Network Usage & Availability (Uptime)"}
          </div>
        </div>}




      <div class="dashboard-box">
        <div
          class="filter-head d-flex justify-content-between align-items-center"
        >
          {(!pinnedClickedData && !flagCheck2) &&
            <>
              <p class="p-0 m-0">Service ID:{flagCheck ? getBandwidth && getBandwidth[0]?.CanId : filterData.serviceID}</p>
              {segment != "Hotel" && segment != "PG" && segment != "Office" &&
                <button class="filter-apply-btn px-3 py-2" onClick={handleApplyClick}>Apply</button>
              }
            </>
          }

          {(pinnedClickedData || flagCheck2) &&
            <>
              <p class="p-0 m-0">Service ID:{pinnedClickedData?.CanId}
                {/* {flagCheck ? getCanIdDetails ? getCanIdDetails.serviceID : getBandwidth[0]?.CanId : filterData.serviceID} */}
              </p>
              {segment != "Hotel" && segment != "PG" && segment != "Office" &&
                <button class="filter-apply-btn px-3 py-2" onClick={pinnedApplyClick}>Apply</button>
              }
            </>
          }

        </div>
        <div class="filter-box">
          <div
            class="row justify-content-between justify-content-sm-start"
          >
            <div
              class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset"
            >
              <div class="filter-inner-box">
                {/* <p>Mycity :{pinnedClickedData && pinnedClickedData.LocationName}</p> */}
                <div class="dashboard-box-option">City</div>
                <div className="filter-row mt-2">
                  {/* <option style={{ display: "none" }}>NAvee</option>                                      */}
                  <select
                    className="select2-custom w-100"
                    value={pinnedClickedData ? pinnedClickedData.LocationName : selectedCity}
                    onChange={handleCityChange}
                    ref={cityRef}
                  >
                    {/* <option value="All Cities">Select City</option> */}
                    {/* {!pinnedClickedData &&
                                          <option value="" selected style={{ display: "none" }}>{getCanIdDetails ? getCanIdDetails.locationName : ""}</option>
                                          } */}
                    {pinnedClickedData &&
                      <option selected style={{ display: "none" }}>{pinnedClickedData.LocationName}</option>
                    }
                    {/* {locations.map((location) => (
                      <option key={location.LocationName} value={location.LocationName}>
                        {location.LocationName}
                      </option>
                    ))} */}

                    {locations.length > 0 && [...new Set(locations.map(location => location.LocationName))].map((ulocation) => (
                      <option key={ulocation} value={ulocation}>
                        {ulocation}
                      </option>
                    ))}


                  </select>




                </div>
              </div>
            </div>
            <div
              class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
            >
              <div class="filter-inner-box">
                <div class="dashboard-box-option">Location</div>
                <div className="filter-row mt-2">


                  <select
                    id="filterCity"
                    className="select2-custom w-100"
                    value={pinnedClickedData ? pinnedClickedData.AreaName : selectedLocation}
                    onChange={handleLocationChange}
                    ref={locationRef}
                  >
                    {/* <option value="All Locations">All Locations</option> */}
                    {!pinnedClickedData &&
                      <option value="All Locations" selected style={{ display: "none" }}>{getChangeArea ? "Select Location" : (getCanIdDetails ? getCanIdDetails.areaName : "")}</option>
                    }

                    {pinnedClickedData &&
                      <option selected>{pinnedClickedData.AreaName ? pinnedClickedData.AreaName : "N/A"}</option>
                    }
                    {uniqueAreaNames.map((areaName) => (
                      <option key={areaName} value={areaName}>
                        {areaName}
                      </option>
                    ))}
                  </select>




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

                  <select
                    className="select2-custom w-100"
                    value={pinnedClickedData ? pinnedClickedData.SegmentName : selectedValue}
                    onChange={handleValueChange}
                    ref={productRef}
                  >
                    {/* <option value="">Select an option</option> */}
                    {!pinnedClickedData &&
                      <option value="">{getChangeArea ? "Select Segment" : (getCanIdDetails ? getCanIdDetails.segmentName + " (" + getCanIdDetails.serviceID + ")" : "")}</option>
                    }
                    {pinnedClickedData &&
                      <option value="">{pinnedClickedData.SegmentName + " (" + pinnedClickedData.CanId + ")"}</option>
                    }
                    {segmentDropdown?.map((item, index) => (
                      <option key={index} data-value={item.CanId} value={item.SegmentName + " (" + item.CanId + ")"}>
                        {item.SegmentName + " (" + item.CanId + ")"}
                      </option>
                    ))}
                  </select>



                </div>
              </div>
            </div>

            <div
              class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
            >
              <div class="filter-inner-box">
                <div class="dashboard-box-option">Period</div>
                {/* <div class="filter-row mt-2">
                              <div
                                class="custom-select date-range"
                                id="reportrange"
                              >
                                <span>Today</span>
                              </div>
                            </div> */}
                <div class="filter-row mt-2">

                  <select
                    className="select2-custom w-100"
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                    ref={periodRef}
                  >
                    {/* <option value="">Select an option</option> */}
                    <option value="1">24 Hours</option>
                    <option value="2">Today</option>
                    <option value="3">Yesterday</option>
                    <option value="4">Last 7 Days</option>
                    <option value="5">This Week</option>
                    <option value="6">Last Week</option>
                    <option value="7">Last 30 Days</option>
                    <option value="8">This Month</option>
                    <option value="9">Last Month</option>
                  </select>



                </div>
              </div>
            </div>


            <>
              <div class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider">
                <div class="filter-inner-box">
                  <div class="dashboard-box-option mb-1">Bandwidth</div>
                  <div class="filter-row mt-2">
                    <div class="filter-value">{getBandwidth ? getBandwidth[0].Bandwidth ? getBandwidth[0].Bandwidth : "N/A" :
                      pinnedClickedData ? pinnedClickedData.Bandwidth ? pinnedClickedData.Bandwidth : "N/A" :
                        getCanIdDetails ? getCanIdDetails.bandwidth ? getCanIdDetails.bandwidth : "N/A" : "N/A"}</div>
                  </div>
                </div>
              </div>

              <div class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider">
                <div class="filter-inner-box">
                  <div class="dashboard-box-option mb-1">Data Limit</div>
                  <div class="filter-row mt-2">
                    <div class="filter-value">{getBandwidth ? getBandwidth[0].Datalimit ? getBandwidth[0].Datalimit : "N/A" :
                      pinnedClickedData ? pinnedClickedData.Datalimit ? pinnedClickedData.Datalimit : "N/A" :
                        getCanIdDetails ? getCanIdDetails.datalimit ? getCanIdDetails.datalimit : "N/A" : "N/A"}</div>
                  </div>
                </div>
              </div>
            </>


          </div>
        </div>
      </div>

      {segment2 === "OBB" || segment2 === "BBB" ?

        (!dataConsumptionParms && <L2OBBDataConsumption parms={defaultNetworkUsage2 && defaultNetworkUsage2} />) :
        <>
          {(pinnedSegment !== "OBB" || pinnedSegment !== "BBB" || segment2 !== "OBB") &&
            (segment2 != "Hotel" && segment2 != "PG" && segment2 != "Office") &&
            <>
              {!flagCheck && <NetworkUsage networkParms={[pinnedNetworkUsage, defaultNetworkUsage]} />}
              {!flagCheck && <AvailabilityTest networkParms={[pinnedNetworkUsage, defaultNetworkUsage]} />}
            </>
          }

          {flagCheck && (!getDCFlag && ((getSelectedSegment !== "OBB" || getSelectedSegment !== "BBB" || segment2 !== "OBB") &&
            <>
              {flagCheck && <NetworkUsage networkParms={[updatedPinnedNetworkUsage, networkParms]} />}
              {flagCheck && <AvailabilityTest networkParms={[updatedPinnedNetworkUsage, availabilityParms]} />}
            </>
          ))}
        </>
      }

      {getDCFlag &&
        <>
          <L2OBBDataConsumption parms={DCParms ? DCParms : dataConsumptionParms} />
        </>
      }

      {/* {!getDCFlag &&(pinnedData && pinnedData.SegmentName === "OBB" &&
        <>
          <L2OBBDataConsumption parms={DCParms && DCParms} />
        </>
      )} */}
    </>

  )
}

