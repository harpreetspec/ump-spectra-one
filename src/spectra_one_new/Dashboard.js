import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import Notification from '../Notification';
import { deviceDetect, mobileModel } from "react-device-detect"
import "../assets/css/dashboard.css"
import SideBar from './Sidebar';
import Header from './Header';
import HeaderHbb from './HeaderHbb'
import Footer from './Footer';
import topSearch from "../assets/images/top-search.svg"
import topBell from "../assets/images/top-bell.svg"
import topProfile from "../assets/images/top-user-img.svg"
import arrowOutward from "../assets/images/arrow-outward.svg"
import distance from "../assets/images/distance.svg"
import {
  getNotificationByServiceId,
  getUnreadNotification,
  getUnreadNotificationCount,
  updateNotificationAsRead,

} from '../function';

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
import ComOBBDataConsumption from '../helper/ComOBBDataConsumption';
import LocNetworkUsage from "../helper/LocNetworkUsage";
import LocTopNotification from "../helper/LocTopNotifications"
import LocAvilability from "../helper/LocAvilability";
import LocResources from "../helper/LocResources"
import LocDataConsumption from "../helper/LocDataConsumption";
import LocOBBDataConsumption from "../helper/LocOBBDataConsumption";
import LocOBBTopNotifications from "../helper/LocOBBTopNotifications"
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from 'react-router-dom';

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



export default function Dashboard() {

  const [canId, setCanId] = useState();
  const [accName, setAccName] = useState();
  const swiperRef = useRef(null);
  const [crmRole, setCrmRole] = useState();
  const [segment, setSegment] = useState();
  const [getLocationCount, setGetLocationCount] = useState();
  const [getServiceCount, setGetServiceCount] = useState();
  const [getSolutionCount, setGetSolutionCount] = useState();
  const [getServiceListCount, setGetServiceListCount] = useState();
  const [getServiceListCount1, setGetServiceListCount1] = useState();
  const [loginCanid, setLoginCanid] = useState()
  const [getGetServiceListResolved, setGetServiceListResolved] = useState();

  const [getGetServiceListNotResolved, setGetServiceListNotResolved] = useState();
  const [getGetServiceListResolved1, setGetServiceListResolved1] = useState();

  const [getGetServiceListNotResolved1, setGetServiceListNotResolved1] = useState();
  const [invoiceCanId, setInvoiceCanId] = useState();
  const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
  const localcanid = localStorage.getItem("credentialKey")
  const locationID = localStorage.getItem('crm_location_id');

  const groupID = localStorage.getItem('crm_group_id');

  const companyID = localStorage.getItem('crm_company_id');
  const crm_role = localStorage.getItem('crm_role');

  const companyName = localStorage.getItem('company_name');
  const [getInvoiceCount, setGetInvoiceCount] = useState();
  const [getGetInvoiceAmount, setGetInvoiceAmount] = useState();
  const [getGetInvoiceDueAmount, setGetInvoiceDueAmount] = useState();
  const [getInvoiceCount1, setGetInvoiceCount1] = useState();
  const [getGetInvoiceAmount1, setGetInvoiceAmount1] = useState();
  const [getGetInvoiceDueAmount1, setGetInvoiceDueAmount1] = useState();

  const allcitydrop = {

    "groupID": localStorage.getItem('crm_group_id'),

    "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : localStorage.getItem('crm_company_id'),

  }


  const allcitydropLoc = {

    "groupID": localStorage.getItem('crm_group_id'),

    "companyID": (crm_role == "L3") ? companyID : "",
    // "locationID": localStorage.getItem("crm_location_id")
    "locationID": (crm_role == "L3") ? locationID : ""
  }

  // console.log(allcitydropLoc);


  const filterData = {

    "groupID": localStorage.getItem('crm_group_id'),
    "serviceID": localStorage.getItem('credentialKey')
  }



  const selectedLocationRef = useRef(null);
  // const [filteredAreas, setFilteredAreas] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("4")
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
  const [getSolutionList, setSolutionList] = useState()
  const [getChangeArea, setChangeArea] = useState(false);
  const [getCanIdDetails1, setCanIdDetails1] = useState(false);
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
        "companyID": (crm_role == "L3") ? companyID : "",
        "locationID": (crm_role == "L3") ? locationID : ""
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
      setAreaOptions(result.data);
    }
    FilterAreaLists();

  }, []);



  useEffect(() => {

    async function filterCity() {
      const url = process.env.REACT_APP_API_URL + '/getLocationLists';
      const data = {
        "groupID": localStorage.getItem("crm_group_id"),
        "companyID": (crm_role == "L3") ? companyID : "",
        "locationID": (crm_role == "L3") ? locationID : ""
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

  const handleApplyClick = () => {
    // console.log("getBandwidth", getBandwidth, "period", selectedPeriod);
    if (getBandwidth) {
      const { CanId } = getBandwidth[0];
      // console.log("CanId", CanId); // Log the value of CanId
    }

    // const updatedNetworkParms = {
    //   service_id: getBandwidth[0].CanId,
    //   period: selectedPeriod ? selectedPeriod : selectedPeriod.target.value,
    //   segmentName: getBandwidth[0].SegmentName
    // };
    const updatedNetworkParms = {

      service_id: getCanIdDetails ? getCanIdDetails.serviceID : getBandwidth[0].CanId,

      period: selectedPeriod,

      segmentName: getCanIdDetails ? getCanIdDetails.segmentName : getBandwidth[0].SegmentName

    };
    const updatedAvailabilityParms = {

      service_id: getBandwidth ? getBandwidth[0].CanId : "",

      period: selectedPeriod,

      segmentName: getBandwidth ? getBandwidth[0].SegmentName : ""

    };
    // console.log("updatedNetworkParms",updatedNetworkParms);
    setNetworkParms(updatedNetworkParms);
    setAvailabilityParmsParms(updatedAvailabilityParms)
    setFlagCheck(true)
    // setFlagCheck((prevFlag) => !prevFlag);
    //console.log("inside function flagCheck", flagCheck);
  }


  const handleCityChange = (event) => {
    setChangeArea(true);
    const selectedCity = cityRef.current.value;;
    // console.log(locations);
    setSelectedCity(selectedCity);
    setSelectedLocation('All Cities');
  };


  const handleLocationChange = async (event) => {
    //console.log("locationRef", event.target.value);
    const selectedLocation = event;
    // console.log(selectedLocation);

    const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
    const data = {
      groupID: localStorage.getItem("crm_group_id"),
      "companyID": (crm_role == "L3") ? companyID : "",
      "locationID": (crm_role == "L3") ? locationID : ""
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
      "companyID": (crm_role == "L3") ? companyID : "",
      "locationID": (crm_role == "L3") ? locationID : ""
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
    setCanIdDetails1(true);
    const segmentName = event;
    // console.log("segmentName", segmentName);
    setSelectedValue(segmentName);
    // console.log("segmentName", segmentName);
    const start = segmentName.indexOf("(") + 1;
    const end = segmentName.indexOf(")");
    const SegmentName = segmentName.substring(0, start - 2).trim();
    // console.log("SegmentName", SegmentName);
    // console.log("start", start, "end", end);
    // Extract the CanId (193715)
    const CanId = segmentName.substring(start, end);

    const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
    const data = {
      "groupID": localStorage.getItem("crm_group_id"),
      "companyID": (crm_role == "L3") ? companyID : "",
      "locationID": (crm_role == "L3") ? locationID : ""
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
    // console.log(filteredData3);
    setBandwidth(filteredData3);
    // setSolutionName(event.target.value)
  };

  const handlePeriodChange = async (event) => {
    const selectPeriod = event;
    // console.log("selectPeriod", selectPeriod);
    setSelectedPeriod(selectPeriod)
  }

  // const filteredAreaOptions = areaOptions.filter(
  //   (area) => selectedCity === 'All Cities' || area.LocationName === selectedCity
  // );
  const filteredAreaOptions = Array.isArray(areaOptions)
    ? areaOptions.filter((area) => selectedCity === 'All Cities' || area.LocationName === selectedCity)
    : [];


  const uniqueAreaNames = Array.from(new Set(filteredAreaOptions.map((area) => area.AreaName)));
  useSelect2(cityRef, handleCityChange);
  useSelect2(locationRef, handleLocationChange);
  useSelect2(productRef, handleValueChange);
  useSelect2(periodRef, handlePeriodChange);
  //useeffect for rajat sir company name
  const [individualCompany, setIndividualCompany] = useState()
  useEffect(() => {
    async function individualCompanyName() {
      const url = process.env.REACT_APP_API_URL + '/getCustomerAccountDetail';
      // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
      const data = {
        "serviceGroupId": localStorage.getItem("credentialKey")
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
      setIndividualCompany(result.data);
    }
    individualCompanyName();

  }, []);

  //----Location Count----

  useEffect(() => {

    async function locationCount() {

      const url = process.env.REACT_APP_API_URL + '/getLocationCount';

      // const data = {groupID: groupID, companyID: companyID, locationID: locationID};

      const data = {

        "groupID": groupID,
        "companyID": (crm_role == "L3") ? companyID : "",
        "locationID": (crm_role == "L3") ? locationID : ""

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

        "companyID": (crm_role == "L3") ? companyID : "",

        "locationID": (crm_role == "L3") ? locationID : ""

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
  const DateParsing = (dateString) => {
    // const dateString = '18/01/2023 11:26:41';

    // Split the date string into its components
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes, seconds] = timePart.split(':');

    // Create a new Date object with the parsed components
    const parsedDate = new Date(year, month - 1, day);
    // console.log(parsedDate);
    return parsedDate;
  }
  useEffect(() => {

    async function serviceList() {
      let fromDate = new Date();
      fromDate.setMonth(fromDate.getMonth() - 24)
      let toDate = new Date();

      const url = process.env.REACT_APP_API_URL + '/getServiceLists';

      // const data = {groupID: groupID, companyID: companyID, locationID: locationID}; //, fromDate: "2022-01-01", toDate: "2023-01-20"

      const data = {

        "groupID": groupID,

        "companyID": (crm_role == "L3") ? companyID : "",
        "locationID": (crm_role == "L3") ? locationID : "",
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
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      const endDate = new Date();
      //  console.log(startDate , "---", endDate);
      // const filteredData = result.data.filter(item => {2023-07-11 2023-08-31
      //   const createDate = new Date(item.LastUpdateDate);
      //   return createDate >= startDate && createDate <= endDate;
      // });


      if (result.data.StatusCode && result.data.StatusCode == "404") {

        setGetServiceListCount(0);

        setGetServiceListResolved(0);

        setGetServiceListNotResolved(0);

      } else {

        const filteredData = result.data.filter(item => {

          const createDate = new Date(DateParsing(item.LastUpdateDate));
          return createDate >= startDate && createDate <= endDate;
        });
        // console.log("filteredData[0].LastUpdateDate)",result.data);
        setGetServiceListCount(filteredData.length);

        setGetServiceListResolved(filteredData.filter(item => item.status.startsWith("Resolved") || item.status == "Duplicate Merged").length);

        setGetServiceListNotResolved(filteredData.filter(item => !item.status.startsWith("Resolved") && item.status !== "Duplicate Merged").length);
        // setGetServiceListNotResolved(
        //   filteredData.filter(
        //     item => !item.status.startsWith("Resolved") || item.status !== "Duplicate Merged"
        //   ).length
        // );

      }

    }



    serviceList();

  }, []);


  useEffect(() => {

    async function serviceListSingle() {
      let fromDate = new Date();
      fromDate.setMonth(fromDate.getMonth() - 24)
      let toDate = new Date();

      const url = process.env.REACT_APP_API_URL + '/getServiceLists';

      // const data = {groupID: groupID, companyID: companyID, locationID: locationID}; //, fromDate: "2022-01-01", toDate: "2023-01-20"

      const data = {

        "groupID": groupID,

        "companyID": companyID,
        "locationID": locationID,
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
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      const endDate = new Date();
      //  console.log(startDate , "---", endDate);
      // const filteredData = result.data.filter(item => {2023-07-11 2023-08-31
      //   const createDate = new Date(item.LastUpdateDate);
      //   return createDate >= startDate && createDate <= endDate;
      // });


      if (result.data.StatusCode && result.data.StatusCode == "404") {

        setGetServiceListCount1(0);

        setGetServiceListResolved1(0);

        setGetServiceListNotResolved1(0);

      } else {

        const filteredData = result.data.filter(item => {

          const createDate = new Date(DateParsing(item.LastUpdateDate));
          return createDate >= startDate && createDate <= endDate;
        });
        // console.log("filteredData[0].LastUpdateDate)",result.data);
        setGetServiceListCount1(filteredData.length);

        setGetServiceListResolved1(filteredData.filter(item => item.status.startsWith("Resolved") || item.status == "Duplicate Merged").length);

        setGetServiceListNotResolved1(filteredData.filter(item => !item.status.startsWith("Resolved") && item.status !== "Duplicate Merged").length);
        // setGetServiceListNotResolved(
        //   filteredData.filter(
        //     item => !item.status.startsWith("Resolved") || item.status !== "Duplicate Merged"
        //   ).length
        // );

      }

    }



    serviceListSingle();

  }, [crmRole == 'L3' && segment != "HBB"]);



  useEffect(() => {
    let canIdsString;
    async function areaList() {
      const url = process.env.REACT_APP_API_URL + '/getAreaLists';
      const data = {
        "groupID": groupID,
        "companyID": (crm_role == "L3") ? companyID : "",
        "locationID": (crm_role == "L3") ? locationID : ""
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
      // console.log("canIds",canIds);
      canIdsString = canIds.join(',');
      setInvoiceCanId(canIdsString);
    }

    async function fetchInvoiceCount() {
      //      console.log("invoiceCanId", invoiceCanId); // Debugging purposes
      const url = process.env.REACT_APP_API_URL + '/getInvoicesCount';
      let currentDate = new Date();
      let currentDate2 = new Date();
      let date3Monthsbefore = new Date(currentDate2.setMonth(currentDate2.getMonth() - 2));

      // console.log(date3Monthsbefore);

      var mm = date3Monthsbefore.getMonth() + 1;
      var c_m = currentDate.getMonth() + 1;
      // console.log(mm, c_m);

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
      var yyl = date3Monthsbefore.getFullYear();
      var lastMonth = yyl + '-' + i_m + mm + '-' + dd;
      var currentMonth = yy + '-' + j_m + c_m + '-' + dd;

      // console.log("lastMonth: ", lastMonth, currentMonth);

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
      setGetInvoiceCount(result.data.invoiceCount);
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

  useEffect(() => {
    let canIDs;
    async function areaListLogin() {
      const url = process.env.REACT_APP_API_URL + '/getAreaLists';
      const data = {
        "groupID": groupID,
        "companyID": (crm_role == "L3") ? companyID : "",
        "locationID": (crm_role == "L3") ? locationID : ""
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
      canIDs = result.data.map(item => item.CanId);
      // console.log("canIds",canIDs);

    }
    async function postDeviceTokenLogin(canIDs) {
      // console.log("indide fun ",canIDs);
      const url = 'https://custappmw.spectra.co/index.php';
      for (const canId of canIDs) {
        const data = {
          "Action": "deviceSignIn",
          "Authkey": "AdgT68HnjC8U5S3TkehEqlkd4",
          "deviceData": {
            "canId": [
              canId
            ],
            "deviceToken": [
              localStorage.getItem('gmcToken')
            ],
            "deviceType": [
              "Android"
            ],
            "portalType": [
              "spectraone"
            ]
          }
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        // console.log("postDeviceTokenLogin",result);
      }
    }
    async function fetchDataLogin() {
      await areaListLogin();
      await postDeviceTokenLogin(canIDs);
    }
    fetchDataLogin();
  }, []);



  // getSolutionLists
  useEffect(() => {

    async function allSolutionList() {
      const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
      const data = {
        "groupID": localStorage.getItem("crm_group_id"),
        "companyID": (crm_role == "L3") ? companyID : "",
        "locationID": (crm_role == "L3") ? locationID : ""
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
      localStorage.setItem('segment', filteredData[0].SegmentName);
      setlocBandwith(filteredData[0].Bandwidth);
      setlocDataLimit(filteredData[0].Datalimit)
      setSolutionList(filteredData[0])
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
        "companyID": (crm_role == "L3") ? companyID : "",
        "locationID": (crm_role == "L3") ? locationID : ""
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
      setLoginCanid(canIds)
      // console.log(canIds);
      canIdsString = canIds.join(',');
      setInvoiceCanId(canIdsString);
    }

    async function fetchInvoiceCount() {
      //console.log("invoiceCanId", invoiceCanId); // Debugging purposes
      let url = process.env.REACT_APP_API_URL + '/getInvoicesCount';
      let currentDate = new Date();
      let currentDate2 = new Date();
      let date3Monthsbefore = new Date(currentDate2.setMonth(currentDate2.getMonth() - 2));

      var mm = date3Monthsbefore.getMonth() + 1;
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
      var yyl = date3Monthsbefore.getFullYear();
      var lastMonth = yyl + '-' + i_m + mm + '-' + dd;
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

      // console.log('InvoiceCount', result);
      setGetInvoiceCount(result.data.invoiceCount);
      setGetInvoiceAmount(inrRupee.format(Math.round(result.data.invoiceAmount ? result.data.invoiceAmount : 0)).replace('.00', ''));
      setGetInvoiceDueAmount(inrRupee.format(Math.round((result.data.invoiceAmount ? result.data.invoiceAmount : 0) - (result.data.paidAmount ? result.data.paidAmount : 0))).replace('.00', ''));
      // console.log("result.data.invoiceAmount",result.data.invoiceAmount);
    }

    async function fetchData() {
      await areaList();
      await fetchInvoiceCount();
    }

    fetchData();

  }, [invoiceCanId]);



  useEffect(() => {

    async function singleBillDesk() {
      //console.log("invoiceCanId", invoiceCanId); // Debugging purposes
      let url = process.env.REACT_APP_API_URL + '/getInvoicesCount';
      let currentDate = new Date();
      let currentDate2 = new Date();
      let date3Monthsbefore = new Date(currentDate2.setMonth(currentDate2.getMonth() - 2));

      var mm = date3Monthsbefore.getMonth() + 1;
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
      var yyl = date3Monthsbefore.getFullYear();
      var lastMonth = yyl + '-' + i_m + mm + '-' + dd;
      var currentMonth = yy + '-' + j_m + c_m + '-' + dd;
      // console.log('LastMonth=',lastMonth);
      // console.log('InvCurrentDate',currentMonth);
      let data = {
        "canIds": localStorage.getItem("credentialKey"),
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
      setGetInvoiceCount1(result.data.invoiceCount);
      setGetInvoiceAmount1(inrRupee.format(Math.round(result.data.invoiceAmount ? result.data.invoiceAmount : 0)).replace('.00', ''));
      setGetInvoiceDueAmount1(inrRupee.format(Math.round((result.data.invoiceAmount ? result.data.invoiceAmount : 0) - (result.data.paidAmount ? result.data.paidAmount : 0))).replace('.00', ''));
      // console.log("result.data.invoiceAmount",result.data);
    }

    singleBillDesk();
  }, [crmRole == 'L3' && segment != "HBB"]);


  const defaultNetworkUsage = {
    service_id: localStorage.getItem("credentialKey"),
    period: 4,
    segmentName: segment
  }

  // useEffect(() => {

  //   async function funGraph() {
  //     const url = process.env.REACT_APP_API_URL + '/getupTimeGraph';

  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },

  //     });
  //     const result = await response.json();
  //     // console.log("uptimegraph", result);
  //   }

  //   funGraph();
  // }, []);


  useEffect(() => {

    async function canIdDetails() {

      try {

        const url = process.env.REACT_APP_API_URL + '/getAreaLists';

        const data = {

          "groupID": localStorage.getItem("crm_group_id"),

          "companyID": (crm_role == "L3") ? companyID : "",
          "locationID": (crm_role == "L3") ? locationID : ""

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
        //  console.log(returnDetails);

        setCanIdDetails(returnDetails);

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

  const handleRedirectSrPage = () => {
    // console.log('clicked card box')
    navigate('/servicerequests');
  };

  const handleRedirectBillPage = () => {
    // console.log('clicked card box')
    navigate('/accountdetails?pid=bill');
  };
  const isAuthenticated = localStorage.getItem('credentialKey');

  if (!isAuthenticated) {
    // Redirect to login page or handle unauthorized access
    navigate("/")
  }

  return (
    <>
      <Notification />

      <section class="section-dashboard">
        <div class="">
          <div class="d-flex justify-content-end">
            {/* SIDE NAVBAR  */}
            <SideBar />


            {/* top header */}
            {crm_role == "L2" && <Header />}
            {crm_role == "L3" && <HeaderHbb />}
            {/* DASHBOARD  */}
            <div class="dashboard-main dashboard-main2">
              {/* company top details */}
              {crmRole == 'L2' && <div class="dashboard-main-top">
                <div class="row">
                  <div class="dashboard-banner">
                    <div>
                      <div class="dashboard-banner-heading py-2 px-3">
                        {companyName}
                      </div>
                      <div class="dashboard-banner-info">
                        <div class="dashboard-info">
                          <div class="dashboard-info-name py-2 px-3">
                            Locations
                          </div>
                          <div class="dashboard-info-count px-3">{getLocationCount < 10 ? `0${getLocationCount}` : getLocationCount}</div>
                        </div>
                        <div class="dashboard-info">
                          <div class="dashboard-info-name py-2 px-3">
                            Solutions
                          </div>
                          <div class="dashboard-info-count px-3">{getSolutionCount < 10 ? `0${getSolutionCount}` : getSolutionCount}</div>
                        </div>
                      </div>
                    </div>
                    <div class="dashboard-cards">
                      {/* <Link className="side-link" to="/servicerequests"> */}
                      <div class="card-box" onClick={handleRedirectSrPage}>
                        <div class="card-head">Service Desk <span className='small-text'>(Last 1 Month)</span></div>
                        <div class="card-info pt-2">
                          <div class="card-count">

                            {getServiceListCount < 10 ? `0${getServiceListCount}` : getServiceListCount} <img src={arrowOutward} alt="" />
                          </div>

                          <div class="card-option">
                            <div class="card-options pb-3">
                              Open <span class="span-positive">

                                {getGetServiceListNotResolved < 10 ? `0${getGetServiceListNotResolved}` : getGetServiceListNotResolved}
                              </span>
                            </div>
                            <div class="card-options">
                              Closed <span class="span-negative">

                                {getGetServiceListResolved < 10 ? `0${getGetServiceListResolved}` : getGetServiceListResolved}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <span style={{ fontSize: '0.6em' }}>(1 month)</span> */}
                      </div>
                      {/* </Link> */}
                      {/* <Link className="side-link" to="/accountdetails?pid=bill"> */}
                      <div class="card-box card-box-2" onClick={handleRedirectBillPage}>
                        <div class="card-head card-head2">Bill Desk <span className='small-text'>(Last 3 Months)</span></div>
                        <div class="card-info pt-2">
                          <div class="card-count">

                            {getInvoiceCount}
                            <img src={arrowOutward} alt="" />
                          </div>
                          <div class="card-option">
                            <div class="card-options pb-3">
                              Total <span class="span-positive">

                                {getGetInvoiceAmount}
                              </span>
                            </div>
                            <div class="card-options">
                              Due <span class="span-negative">

                                {getGetInvoiceDueAmount}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* <span style={{ fontSize: '0.6em' }}>(3 month)</span> */}
                      </div>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>}

              {/* location top details */}
              {/* {(crmRole == 'L3' && segment != "HBB") && <div class="dashboard-main-top">
                <div class="row">
                  <div class="dashboard-banner">
                    <div>
                      <div class="dashboard-banner-heading py-2 px-3">
                        {companyName}
                      </div>
                      <div class="dashboard-banner-info">
                        <div class="dashboard-info">
                          <div class="dashboard-info-name py-2 px-3">
                            Locations
                          </div>
                          <div class="dashboard-info-count px-3">{"1"}</div>
                        </div>
                        <div class="dashboard-info">
                          <div class="dashboard-info-name py-2 px-3">
                            Solutions
                          </div>
                          <div class="dashboard-info-count px-3">{"1"}</div>
                        </div>
                      </div>
                    </div>
                    <div class="dashboard-cards">
                      <div class="card-box" onClick={handleRedirectSrPage}>
                        <div class="card-head">Service Desk <span className='small-text'>(Last 1 Month)</span></div>
                        <div class="card-info pt-2">
                          <div class="card-count">
                            {(localcanid == 9098697) && <>00</> }
                            {(localcanid != 9098697) && (getServiceListCount1 < 10 ? `0${getServiceListCount1}` : getServiceListCount1)} <img src={arrowOutward} alt="" />
                          </div>
                          <div class="card-option">
                            <div class="card-options pb-3">
                              Open <span class="span-positive">
                                
                                {getGetServiceListNotResolved1 < 10 ? `0${getGetServiceListNotResolved1}` : getGetServiceListNotResolved1}
                                </span>
                            </div>
                            <div class="card-options">
                              Closed <span class="span-negative">
                              {(localcanid == 9098697) && <>00</> }
                                {(localcanid != 9098697) && (getGetServiceListResolved1 < 10 ? `0${getGetServiceListResolved1}` : getGetServiceListResolved1)}
                                </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="card-box card-box-2" onClick={handleRedirectBillPage}>
                        <div class="card-head card-head2">Bill Desk <span className='small-text'>(Last 3 Months)</span></div>
                        <div class="card-info pt-2">
                          <div class="card-count">
                          {getInvoiceCount1 < 10 ? `0${getInvoiceCount1}` : getInvoiceCount1} <img src={arrowOutward} alt="" />
                          </div>
                          <div class="card-option">
                            <div class="card-options pb-3">
                              Total <span class="span-positive">{getGetInvoiceAmount1 ? getGetInvoiceAmount1 : "0" }</span>
                            </div>
                            <div class="card-options">
                              Due <span class="span-negative">{getGetInvoiceDueAmount1 ? getGetInvoiceDueAmount1 : "0"}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              } */}

              {(crmRole == 'L3') && <div class="dashboard-main-top">
                <div class="row">
                  <div class="dashboard-banner">
                    <div>
                      <div class="dashboard-banner-heading py-2 px-3">
                        {individualCompany ? individualCompany.accountName : ""}
                      </div>
                      <div class="dashboard-banner-info">
                        <div class="dashboard-info">
                          <div class="dashboard-info-name py-2 px-3">
                            Locations
                          </div>
                          <div class="dashboard-info-count px-3">{"1"}</div>
                        </div>
                        <div class="dashboard-info">
                          <div class="dashboard-info-name py-2 px-3">
                            Solutions
                          </div>
                          <div class="dashboard-info-count px-3">{"1"}</div>
                        </div>
                      </div>
                    </div>
                    <div class="dashboard-cards">
                      {/* <Link className="side-link" to="/servicerequests"> */}

                      <div class="card-box" onClick={handleRedirectSrPage}>
                        <div class="card-head">Service Desk <span className='small-text'>(Last 1 Month)</span></div>
                        <div class="card-info pt-2">
                          <div class="card-count">
                            {/* 14 <img src="./images/arrow-outward.svg" alt="" /> */}
                            {getServiceListCount < 10 ? `0${getServiceListCount}` : getServiceListCount} <img src={arrowOutward} alt="" />
                          </div>
                          <div class="card-option">
                            <div class="card-options pb-3">
                              Open <span class="span-positive">{getGetServiceListNotResolved < 10 ? `0${getGetServiceListNotResolved}` : getGetServiceListNotResolved}</span>
                            </div>
                            <div class="card-options">
                              Closed <span class="span-negative">{getGetServiceListResolved < 10 ? `0${getGetServiceListResolved}` : getGetServiceListResolved}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* </Link> */}
                      {/* <Link className="side-link" to="/accountdetails?pid=bill"> */}
                      <div class="card-box card-box-2" onClick={handleRedirectBillPage}>
                        <div class="card-head card-head2">Bill Desk <span className='small-text'>(Last 3 Months)</span></div>
                        <div class="card-info pt-2">
                          <div class="card-count">
                            {getInvoiceCount} <img src={arrowOutward} alt="" />
                          </div>
                          <div class="card-option">
                            <div class="card-options pb-3">
                              Total <span class="span-positive">{getGetInvoiceAmount}</span>
                            </div>
                            <div class="card-options">
                              Due <span class="span-negative">{getGetInvoiceDueAmount}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>

              }


              {(crmRole == 'L3' && segment != "OBB" && segment != "HBB" && segment != "BBB") &&
                <div class="dashboard-content row">
                  <div class="col-xl-8 col-lg-7 col-sm-12 col-12">
                    <LocOBBpinnedfeature allcitydropLoc={allcitydropLoc} />

                    {segment != "Hotel" && segment != "PG" && segment != "Office" &&
                      <div>
                        <div class="dashboard-box-top-bar">
                          <div class="dashboard-box-heading">
                            <p>Network Usage & Availability (Uptime)</p>
                          </div>
                        </div>
                        < LocNetworkUsage locNetworkParms={locNetworkParms} />

                        {/* LocOBBDataConsumption added temp for a customer 9057356 (1513-1514) */}
                        {/* { getSolutionList?.PlanName != "ENT_BIA50_F505" && < LocNetworkUsage locNetworkParms={locNetworkParms} />} */}
                        {!flagCheck && (getSolutionList?.PlanName == "ENT_BIA50_F505") && <LocOBBDataConsumption networkParms={defaultNetworkUsage} />}
                        {flagCheck && (getSolutionList?.PlanName == "ENT_BIA50_F505") && <LocOBBDataConsumption networkParms={networkParms} />}

                        {/* < LocAvilability /> */}
                        {!flagCheck && <AvailabilityTest networkParms={[null, defaultNetworkUsage]} />}
                        {flagCheck && <AvailabilityTest networkParms={availabilityParms} />}
                        {/* <LocResources /> */}
                      </div>}
                  </div>
                  <div class="col-xl-4 col-lg-5 col-sm-12 col-12">
                    <TopNotification crmRole={crmRole} segment={segment} />

                    {/* <LocDataConsumption /> */}
                    <GetHelp />
                  </div>
                </div>
              }

              {(crmRole == 'L3' && segment == "OBB") &&
                <div class="dashboard-content row">
                  <div class="col-xl-8 col-lg-7 col-sm-12 col-12">
                    <LocOBBpinnedfeature allcitydropLoc={allcitydropLoc} />
                    {/* FILTER BOX  */}
                    <div class="dashboard-box">
                      <div
                        class="filter-head d-flex justify-content-between align-items-center"
                      >
                        <p class="p-0 m-0">Service ID:{flagCheck ? (!getBandwidth ? getCanIdDetails.serviceID : getBandwidth[0]?.CanId) : filterData.serviceID}
                        </p>

                        <button class="filter-apply-btn px-3 py-2" onClick={handleApplyClick}>Apply</button>

                      </div>
                      <div class="filter-box">
                        <div
                          class="row justify-content-between justify-content-sm-start"
                        >
                          <div
                            class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset"
                          >
                            <div class="filter-inner-box removeCSS">
                              <div class="dashboard-box-option">City</div>
                              <div className="filter-row mt-2">
                                <select
                                  className="select2-custom w-100"
                                  value={selectedCity}
                                  onChange={handleCityChange}
                                  ref={cityRef}
                                >
                                  {/* <option value="All Cities">Select City</option> */}
                                  <option value="All Cities" selected style={{ display: "none" }}>{getCanIdDetails ? getCanIdDetails.locationName : ""}</option>
                                  {/* {locations.map((location) => (
                                  <option key={location.LocationName} value={location.LocationName}>
                                    {location.LocationName}
                                  </option>
                                ))} */}
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
                                  value={selectedLocation}
                                  onChange={handleLocationChange}
                                  ref={locationRef}
                                >
                                  {/* <option value="All Locations">All Locations</option> */}
                                  <option value="All Locations" selected style={{ display: "none" }}>{getCanIdDetails ? getCanIdDetails.areaName : ""}</option>
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
                            <div class="filter-inner-box removeCSSMobile">
                              <div class="dashboard-box-option">
                                Product/Solution
                              </div>
                              <div class="filter-row mt-2">

                                <select
                                  className="select2-custom w-100"
                                  value={selectedValue}
                                  onChange={handleValueChange}
                                  ref={productRef}
                                >
                                  {/* <option value="">Select an option</option> */}
                                  <option value="" selected style={{ display: "none" }}>{getCanIdDetails ? getCanIdDetails.segmentName + " (" + getCanIdDetails.serviceID + ")" : ""}</option>
                                  {segmentDropdown?.map((item, index) => (
                                    <option key={index} value={item.SegmentName + " (" + item.CanId + ")"}>
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
                                  <option value="">Select an option</option>
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


                          <div
                            class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
                          >
                            <div class="filter-inner-box">
                              <div class="dashboard-box-option mb-1">Bandwidth</div>
                              <div class="filter-row mt-2">
                                {/* {getBandwidth?.map((item, index) => (
                              <div key={index} class="filter-value">{item.Bandwidth}</div>
                            ))} */}
                                <div class="filter-value"> {getCanIdDetails ? getCanIdDetails.bandwidth : ""}</div>

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
                                {/* {getBandwidth?.map((item, index) => (
                              <div key={index} class="filter-value">{item.Datalimit}</div>
                            ))} */}
                                <div class="filter-value"> {getCanIdDetails ? getCanIdDetails.datalimit : ""}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!flagCheck && <LocOBBDataConsumption networkParms={defaultNetworkUsage} />}
                    {flagCheck && <LocOBBDataConsumption networkParms={networkParms} />}

                    {/* <LocResources /> */}
                  </div>
                  <div class="col-xl-4 col-lg-5 col-sm-12 col-12">
                    <TopNotification crmRole={crmRole} segment={segment} />
                    {/* <DataConsumption /> */}
                    {!flagCheck && <DataConsumption networkParms={defaultNetworkUsage} />}
                    {flagCheck && <DataConsumption networkParms={networkParms} />}
                    <GetHelp />
                  </div>
                </div>

              }

              {(crmRole == 'L3' && segment == "HBB") &&
                <div class="dashboard-content row">
                  <div class="col-xl-8 col-lg-7 col-sm-12 col-12">
                    <LocOBBpinnedfeature allcitydropLoc={allcitydropLoc} />
                    {/* FILTER BOX  */}
                    <div class="dashboard-box">
                      <div
                        class="filter-head d-flex justify-content-between align-items-center"
                      >
                        <p class="p-0 m-0">Service ID:{flagCheck ? (!getBandwidth ? getCanIdDetails.serviceID : getBandwidth[0]?.CanId) : filterData.serviceID}
                        </p>

                        <button class="filter-apply-btn px-3 py-2" onClick={handleApplyClick}>Apply</button>

                      </div>
                      <div class="filter-box">
                        <div
                          class="row justify-content-between justify-content-sm-start"
                        >
                          <div
                            class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset"
                          >
                            <div class="filter-inner-box removeCSS">
                              <div class="dashboard-box-option">City</div>
                              <div className="filter-row mt-2">
                                <select
                                  className="select2-custom w-100"
                                  value={selectedCity}
                                  onChange={handleCityChange}
                                  ref={cityRef}
                                >
                                  {/* <option value="All Cities">Select City</option> */}
                                  <option value="All Cities" selected style={{ display: "none" }}>{getCanIdDetails ? getCanIdDetails.locationName : ""}</option>
                                  {/* {locations.map((location) => (
                                    <option key={location.LocationName} value={location.LocationName}>
                                      {location.LocationName}
                                    </option>
                                  ))} */}
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
                                  value={selectedLocation}
                                  onChange={handleLocationChange}
                                  ref={locationRef}
                                >
                                  {/* <option value="All Locations">All Locations</option> */}
                                  <option value="All Locations" selected style={{ display: "none" }}>{getCanIdDetails ? getCanIdDetails.areaName : ""}</option>
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
                            <div class="filter-inner-box removeCSSMobile">
                              <div class="dashboard-box-option">
                                Product/Solution
                              </div>
                              <div class="filter-row mt-2">

                                <select
                                  className="select2-custom w-100"
                                  value={selectedValue}
                                  onChange={handleValueChange}
                                  ref={productRef}
                                >
                                  {/* <option value="">Select an option</option> */}
                                  <option value="" selected style={{ display: "none" }}>{getCanIdDetails ? getCanIdDetails.segmentName + " (" + getCanIdDetails.serviceID + ")" : ""}</option>
                                  {segmentDropdown?.map((item, index) => (
                                    <option key={index} value={item.SegmentName + " (" + item.CanId + ")"}>
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
                                  <option value="">Select an option</option>
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


                          <div
                            class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
                          >
                            <div class="filter-inner-box">
                              <div class="dashboard-box-option mb-1">Bandwidth</div>
                              <div class="filter-row mt-2">
                                {/* {getBandwidth?.map((item, index) => (
                                <div key={index} class="filter-value">{item.Bandwidth}</div>
                              ))} */}
                                <div class="filter-value"> {getCanIdDetails ? getCanIdDetails.bandwidth : ""}</div>

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
                                {/* {getBandwidth?.map((item, index) => (
                                <div key={index} class="filter-value">{item.Datalimit}</div>
                              ))} */}
                                <div class="filter-value"> {getCanIdDetails ? getCanIdDetails.datalimit : ""}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!flagCheck && <LocOBBDataConsumption networkParms={defaultNetworkUsage} />}
                    {flagCheck && <LocOBBDataConsumption networkParms={networkParms} />}

                    {/* <LocResources /> */}
                  </div>
                  <div class="col-xl-4 col-lg-5 col-sm-12 col-12">
                    <TopNotification crmRole={crmRole} segment={segment} />
                    {/* <DataConsumption /> */}
                    {!flagCheck && <DataConsumption networkParms={defaultNetworkUsage} />}
                    {flagCheck && <DataConsumption networkParms={networkParms} />}
                    <GetHelp />
                  </div>
                </div>

              }
              {(crmRole == 'L3' && segment == "BBB") &&
                <div class="dashboard-content row">
                  <div class="col-xl-8 col-lg-7 col-sm-12 col-12">
                    <LocOBBpinnedfeature allcitydropLoc={allcitydropLoc} />
                    {/* FILTER BOX  */}
                    <div class="dashboard-box">
                      <div
                        class="filter-head d-flex justify-content-between align-items-center"
                      >
                        <p class="p-0 m-0">Service ID:{flagCheck ? (!getBandwidth ? getCanIdDetails.serviceID : getBandwidth[0]?.CanId) : filterData.serviceID}
                        </p>

                        <button class="filter-apply-btn px-3 py-2" onClick={handleApplyClick}>Apply</button>

                      </div>
                      <div class="filter-box">
                        <div
                          class="row justify-content-between justify-content-sm-start"
                        >
                          <div
                            class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset"
                          >
                            <div class="filter-inner-box removeCSS">
                              <div class="dashboard-box-option">City</div>
                              <div className="filter-row mt-2">
                                <select
                                  className="select2-custom w-100"
                                  value={selectedCity}
                                  onChange={handleCityChange}
                                  ref={cityRef}
                                >
                                  {/* <option value="All Cities">Select City</option> */}
                                  <option value="All Cities" selected style={{ display: "none" }}>{getCanIdDetails ? getCanIdDetails.locationName : ""}</option>
                                  {/* {locations.map((location) => (
                                    <option key={location.LocationName} value={location.LocationName}>
                                      {location.LocationName}
                                    </option>
                                  ))} */}
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
                                  value={selectedLocation}
                                  onChange={handleLocationChange}
                                  ref={locationRef}
                                >
                                  {/* <option value="All Locations">All Locations</option> */}
                                  <option value="All Locations" selected style={{ display: "none" }}>{getCanIdDetails ? getCanIdDetails.areaName : ""}</option>
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
                            <div class="filter-inner-box removeCSSMobile">
                              <div class="dashboard-box-option">
                                Product/Solution
                              </div>
                              <div class="filter-row mt-2">

                                <select
                                  className="select2-custom w-100"
                                  value={selectedValue}
                                  onChange={handleValueChange}
                                  ref={productRef}
                                >
                                  {/* <option value="">Select an option</option> */}
                                  <option value="" selected style={{ display: "none" }}>{getCanIdDetails ? getCanIdDetails.segmentName + " (" + getCanIdDetails.serviceID + ")" : ""}</option>
                                  {segmentDropdown?.map((item, index) => (
                                    <option key={index} value={item.SegmentName + " (" + item.CanId + ")"}>
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
                                  <option value="">Select an option</option>
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


                          <div
                            class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
                          >
                            <div class="filter-inner-box">
                              <div class="dashboard-box-option mb-1">Bandwidth</div>
                              <div class="filter-row mt-2">
                                {/* {getBandwidth?.map((item, index) => (
                                <div key={index} class="filter-value">{item.Bandwidth}</div>
                              ))} */}
                                <div class="filter-value"> {getCanIdDetails ? getCanIdDetails.bandwidth : ""}</div>

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
                                {/* {getBandwidth?.map((item, index) => (
                                <div key={index} class="filter-value">{item.Datalimit}</div>
                              ))} */}
                                <div class="filter-value"> {getCanIdDetails ? getCanIdDetails.datalimit : ""}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {!flagCheck && <LocOBBDataConsumption networkParms={defaultNetworkUsage} />}
                    {flagCheck && <LocOBBDataConsumption networkParms={networkParms} />}

                    {/* <LocResources /> */}
                  </div>
                  <div class="col-xl-4 col-lg-5 col-sm-12 col-12">
                    <TopNotification crmRole={crmRole} segment={segment} />
                    {/* <DataConsumption /> */}
                    {!flagCheck && <DataConsumption networkParms={defaultNetworkUsage} />}
                    {flagCheck && <DataConsumption networkParms={networkParms} />}
                    <GetHelp />
                  </div>
                </div>

              }

              {(crmRole == 'L2') &&
                <div class="dashboard-content row">
                  {/* <div class="col-xl-8 col-lg-7 col-sm-12 col-12"> */}


                  {/* WISHLIST Features SECTION  */}
                  <Pinnedfeature allcitydrop={allcitydrop} />

                  {/* FILTER BOX  */}
                  {/* <Filter filterData={filterData} /> */}


                  {/* NETWORK USAGE SECTION */}


                  {/* Availability SECTION  */}
                  {/* <Availability sampleData={sampleData}/> */}

                  {/* </div> */}

                  {/* <div class="col-xl-4 col-lg-5 col-sm-12 col-12">
               
                  <TopNotification crmRole={crmRole} segment={segment} />
               
                  <GetHelp />
                </div> */}
                </div>}
              {/* comapny OBB after top section */}

              {/* FOOTER START */}
              <Footer />
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

