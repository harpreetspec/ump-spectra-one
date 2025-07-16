import React, { useState, useEffect, useRef } from 'react';
import * as api from '../function';
import {
  getServiceLists
} from '../function';
import { Link } from 'react-router-dom';
import SideBar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import iconcalendar from "../assets/images/icon-calendar.svg";
import distance from "../assets/images/distance.svg";
import adminbackarrow from "../assets/images/admin-back-arrow.svg";
import productIcon from "../assets/images/product-icon.svg";
import { useNavigate } from 'react-router-dom';

import Swiper from 'swiper';
import "swiper/swiper-bundle.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2';
import moment from 'moment';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { DateRangePicker } from 'react-bootstrap-daterangepicker';
import $ from 'jquery';
import HeaderHbb from './HeaderHbb'
import "../assets/css/daterangepicker.css"
import chatcircle from "../assets/images/ChatCircle.svg"
// import chatcircle2 from "../assets/images/ChatCircle2.svg"

export default function AccountDetails() {
  const navigate = useNavigate();
  const [srList, setSrList] = useState([])
  const [payNowClick, setPayNowClick] = useState(false);
  const [fullDetails, setFullDetails] = useState(false);
  const invoiceTableRef = useRef(null);
  const transactionTableRef = useRef(null);
  const toggleCheckboxRef = useRef(null);
  const [showBillingDetailTable, setShowBillingDetailTable] = useState(true);
  const [showBillingDetailAdmin, setShowBillingDetailAdmin] = useState(false);
  const [showAdminLevel, setShowAdminLevel] = useState(true);
  const [showAdminDetail, setShowAdminDetail] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Bangalore');
  const options = ['Bangalore', 'Delhi', 'Gurgaon', 'Mumbai'];
  const [showSpecification, setShowSpecification] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [caseTyValue, setCaseTyValue] = useState('');
  const [caseName, setCaseName] = useState([]);
  const [textcomment, setTextComment] = useState();
  const [contactDetails, setcontactDetails] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [locationList, setLocationList] = useState()
  const [getAreaLists, setGetAreaLists] = useState()
  const [location, setLocation] = useState("");
  const [selectedLocCreateSr, setSelectedLocCreateSr] = useState("")
  const [uniqueAreaList, setUniqueAreaList] = useState();
  const [uniqueAreaListDeafault, setUniqueAreaListDefault] = useState();
  const [uniqueAreaListcreateSr, setUniqueAreaListCreateSr] = useState()
  const [selectedAreaName, setSelectedAreaName] = useState("")
  const [selectAreaNameSr, setSelectedAreaNameSr] = useState("")
  const [segmentDropDownValue, setSegmentDropdownValue] = useState()
  const [segmentDropDownValuecreateSr, setSegmentDropdownValuecreateSr] = useState()
  const [selectedSegment, setSelectedSegment] = useState("")
  const [selectedSegmentcreateSr, setSelectedSegmentcreateSr] = useState("")
  const [flagCheck, setFlagCheck] = useState(false)
  const [filterSrData, setFilterSrData] = useState()
  const [selectedfinalcanid, setselectedfinalcanid] = useState("")
  const [flagcanid, setFlagcanid] = useState(false)
  const [selectedcanidToFilter, setSelectedcanidToFilter] = useState("")
  const [selectedDate, setSelectedDate] = useState('');
  const [getPinnedClickedData, setPinnedClickedData] = useState();
  const [getPinnedSRLists, setPinnedSRLists] = useState();
  const [getPinnedFlag, setPinnedFlag] = useState(false);
  const [getLogInSegment, setLogInSegment] = useState();
  const [getLogInLocation, setLogInLocation] = useState();
  const [getLogInArea, setLogInArea] = useState();
  const [getLogInCanId, setLogInCanId] = useState();
  const [getLogInFlag, setLogInFlag] = useState(true);
  const [getLogInFlagC, setLogInFlagC] = useState(true);
  const serviceID = localStorage.getItem('credentialKey');
  const [allCityFlag, setAllCityFlag] = useState(false);
  const crmRole = localStorage.getItem('crm_role');
  const segment = localStorage.getItem('segment');
  const [selectedRange, setSelectedRange] = useState("Current Month");
  const searchParams = new URLSearchParams(location.search);
  const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
  const locationID = localStorage.getItem('crm_location_id');
  const companyID = localStorage.getItem('crm_company_id');
  const crm_role = localStorage.getItem('crm_role');



  const DateParsing = (dateString) => {
    // const dateString = '18/01/2023 11:26:41';

    // Split the date string into its components
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes, seconds] = timePart.split(':');

    // Create a new Date object with the parsed components
    const parsedDate = new Date(year, month - 1, day, hours, minutes, seconds);
    // console.log(parsedDate);
    return parsedDate;
  }

  const handleDateRangeChange = async (event, picker) => {
    // console.log(picker);
    let startDate;
    let endDate;
    if (picker.chosenLabel !== "Custom Range") {
      setSelectedRange(picker.chosenLabel);
      startDate = picker.startDate._d;
      endDate = picker.endDate._d;
      // pinnedFetchData(startDate);
      // console.log("Start Date",picker.startDate._d);
      // console.log("End Date",picker.endDate._d);
    } else {

      const oneYearLater = new Date(picker.startDate._d);
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
      // alert(oneYearLater)
      if (new Date(picker.endDate._d) < oneYearLater) {
        startDate = picker.startDate._d;
        endDate = picker.endDate._d;
        // console.log("Start Date",  new Date(startDate));
        // console.log("End Date",picker.endDate._d);
        // alert(moment(picker.startDate._d).format('DD MMM\'YY') + "-" + moment(picker.endDate._d).format('DD MMM\'YY'))
        // pinnedFetchData(startDate);
        setSelectedRange(moment(picker.startDate._d).format('DD MMM\'YY') + "-" + moment(picker.endDate._d).format('DD MMM\'YY'))
        // setSelectedPeriod(false);
        // setSelectedRange({
        //     startDate: picker.startDate,
        //     endDate: picker.endDate,
        // });
      } else {
        // swal("Date range should not be more than one year")
        Swal.fire({
          //  text: "TDS slab value cannot be more than 2%",
          html: '<div style="font-size: 15px;">Date range should not be more than one year</div>', // Adjust text size as needed
          //  icon: 'error',
          //  iconHtml: '<div style="font-size: 28px; color: red; box-sizing: border-box ;">&#10006;</div>', // Adjust icon size and style as needed
          width: '29%',
          confirmButtonText: 'OK',
          imageHeight: '100%',
          imageWidth: '20%',
          iconColor: 'red',
          iconHeight: '100%',
          //  customClass: {
          //   icon : 'custom-icon'
          //  }
        });
      }
    }
    // console.log(startDate, endDate);   

    let groupID = localStorage.getItem('crm_group_id');
    let companyID = "";
    let locationID = localStorage.getItem('crm_location_id');
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 24)        //new Date().setMonth(new Date().getMonth() - 3);
    let toDate = new Date();
    // alert("qwerty")
    // console.log(groupID, companyID, locationID, fromDate, toDate);
    let srList = await getServiceLists(groupID, (crm_role == "L3") ? companyID : "", (crm_role == "L3") ? locationID : "", fromDate.toISOString().slice(0, 10), toDate.toISOString().slice(0, 10));
    // console.log("FilteredSR", srList);
    // alert("12345")
    // console.log("FilteredSR", selectedcanidToFilter);
    // console.log(new Date(startDate));
    // const FilteredDefaultSR = srList.data.filter((item) => item.CanId === selectedcanidToFilter && new Date(item.LastUpdateDate) > startDate && new Date(item.LastUpdateDate) < endDate);
    if (selectedcanidToFilter) {
      // console.log(new Date(DateParsing(srList[0].LastUpdateDate)));
      const FilteredDefaultSR = srList.data.filter((item) => item.CanId === selectedcanidToFilter && new Date(DateParsing(item.LastUpdateDate)) > new Date(startDate) && new Date(DateParsing(item.LastUpdateDate)) < new Date(endDate));
      // console.log("FilteredSR", FilteredDefaultSR);
      setFilterSrData(FilteredDefaultSR);
      setFlagCheck(true);
    } else if (getPinnedClickedData?.CanId) {
      // alert(getPinnedClickedData?.CanId)
      // console.log(new Date(DateParsing(srList[0].LastUpdateDate)));
      const FilteredDefaultSR = srList.data.filter((item) => item.CanId === getPinnedClickedData?.CanId && new Date(DateParsing(item.LastUpdateDate)) > new Date(startDate) && new Date(DateParsing(item.LastUpdateDate)) < new Date(endDate));
      // console.log("FilteredSR", FilteredDefaultSR);
      setFilterSrData(FilteredDefaultSR);
      setFlagCheck(true);
    }
    else {
      // console.log(serviceID);
      // alert(serviceID)
      // console.log("FilteredSR", srList);
      let FilteredDefaultSR;
      if (crmRole == "L3") {
        FilteredDefaultSR = srList.data.filter((item) => item.CanId === serviceID && new Date(DateParsing(item.LastUpdateDate)) > new Date(startDate) && new Date(DateParsing(item.LastUpdateDate)) < new Date(endDate));
      } else {
        FilteredDefaultSR = srList.data.filter((item) => new Date(DateParsing(item.LastUpdateDate)) > new Date(startDate) && new Date(DateParsing(item.LastUpdateDate)) < new Date(endDate));
      }
      // console.log("FilteredSR", FilteredDefaultSR);
      setFilterSrData(FilteredDefaultSR);
      setFlagCheck(true);
    }
  };

  // useEffect(() => {
  //   initDateRangePicker('reportrange');
  // }, []);

  // function initDateRangePicker(id) {
  //   var start = moment();
  //   var end = moment();

  //   function cb(start, end) {
  //     const formattedStartDate = start.format("MMM D");
  //     const formattedEndDate = end.format("MMM D");
  //     const today = moment().format("MMM D");
  //     const yesterday = moment().subtract(1, "days").format("MMM D");
  //     if (!start.isValid()) {
  //       $(`#${id} span`).html("All");
  //     } else if (
  //       formattedStartDate === formattedEndDate &&
  //       formattedStartDate === today
  //     ) {
  //       $(`#${id} span`).html("Today");
  //     } else if (
  //       formattedStartDate === formattedEndDate &&
  //       formattedStartDate === yesterday
  //     ) {
  //       $(`#${id} span`).html("Yesterday");
  //     } else {
  //       $(`#${id} span`).html(formattedStartDate + " - " + formattedEndDate);
  //     }
  //   }

  //   $(`#${id}`).daterangepicker(
  //     {
  //       startDate: start,
  //       endDate: end,
  //       ranges: {
  //         All: ["", "all"],
  //         Today: [moment(), moment()],
  //         Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
  //         "Current Month": [moment().startOf("month"), moment().endOf("month")],
  //       },
  //     },
  //     cb
  //   );

  //   cb(start, end);
  // }

  const pinnedFetchData = async () => {
    // console.log("fromDate", selectedfromDate);
    // let defaultFromDate = new Date(new Date().getFullYear(), new Date().getMonth() - 3, new Date().getDate());
    if (crmRole == "L2") {
      try {
        const pinnedClickedData = JSON.parse(sessionStorage.getItem('pinnedClicked'));

        let groupID = localStorage.getItem('crm_group_id');
        let companyID = "";
        let locationID = "";
        let fromDate = new Date();        //new Date().setMonth(new Date().getMonth() - 3);
        fromDate.setMonth(fromDate.getMonth() - 24)
        let toDate = new Date();      //new Date();

        // let fromDate2 = new Date();
        // fromDate2.setMonth(fromDate2.getMonth() - 3);
        // console.log(fromDate2);
        // alert("pinnedFetchData")
        const pinnedSR = await getServiceLists(groupID, (crm_role == "L3") ? companyID : "", (crm_role == "L3") ? locationID : "", fromDate.toISOString().slice(0, 10), toDate.toISOString().slice(0, 10));

        if (pinnedClickedData && !allCityFlag) {
          // if (pinnedClickedData.SegmentName !== "HBB") {
          if (crm_role == "L2") {
            let currentDate = new Date();
            let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            setPinnedClickedData(pinnedClickedData[0]);
            // console.log("pinnedClickedData", pinnedClickedData[0].CanId);
            //Pinned data fetch from Contact Api 
            // let pinnedSR = await getServiceLists(groupID, companyID, locationID, new Date(fromDate.setMonth(fromDate.getMonth() - 3)).toISOString().slice(0, 10), toDate.toISOString().slice(0, 10));
            const FilteredPinnedSR = pinnedSR.data.filter((item) => item.CanId === pinnedClickedData[0].CanId && new Date(DateParsing(item.LastUpdateDate)) > startDate);
            // console.log("FilteredPinnedSR", FilteredPinnedSR);
            setPinnedSRLists(FilteredPinnedSR); //: alert("Something went wrong");
          }
        } else {
          // setPinnedSRLists(null);  
          let currentDate = new Date();
          let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          // console.log(groupID, companyID, locationID, fromDate, toDate);
          // let srList = await getServiceLists(groupID, companyID, locationID, fromDate.toISOString().slice(0, 10), toDate.toISOString().slice(0, 10));
          // console.log("FilteredDefaultSR", srList);

          const FilteredDefaultSR = pinnedSR.data.filter((item) => item.CanId === serviceID && new Date(DateParsing(item.LastUpdateDate)) > startDate);
          // console.log("FilteredSR", FilteredDefaultSR);
          setPinnedSRLists(FilteredDefaultSR);
        }
      } catch (error) {
        console.error(error);

        // Construct the email message
        const apiFailureDetails = {
          API_Name: "pinnedFetchData", // Name of the API where failure occurred
          Request: {
            groupID: localStorage.getItem('crm_group_id'),
            companyID: "",
            locationID: "",
            fromDate: new Date().toISOString(),
            toDate: new Date().toISOString(),
          },
          Date: new Date().toISOString(),
          Message: error.message

        };
        const emailBody = `
API Failure Report
--------------------
API Name: ${apiFailureDetails.API_Name} (ServiceRequest.js) 
Request:
${JSON.stringify(apiFailureDetails.Request, null, 2)}   
Message : ${apiFailureDetails.Message}  
Date: ${apiFailureDetails.Date}`;
        try {
          const response = await fetch(process.env.REACT_APP_API_URL + '/sendMailS1', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              text: emailBody, // Send the structured email body
              subject: "Service Request"
            })
          });
          const data = await response.json();
          // console.log("Mail sent successfully:", data);
        } catch (mailError) {
          console.error("Failed to send mail:", mailError);
        }
      }
    }
  };

  const selectedSrData = async (canId) => {
    // console.log("fromDate", selectedfromDate);
    // let defaultFromDate = new Date(new Date().getFullYear(), new Date().getMonth() - 3, new Date().getDate());
    try {
      let groupID = localStorage.getItem('crm_group_id');
      let companyID = "";
      let locationID = "";
      let fromDate = new Date();        //new Date().setMonth(new Date().getMonth() - 3);
      let toDate = new Date();      //new Date();

      // let fromDate2 = new Date();
      // fromDate2.setMonth(fromDate2.getMonth() - 3);
      // console.log(fromDate2);
      if (canId) {
        // console.log(groupID, companyID, locationID, fromDate, toDate);
        let srList = await getServiceLists(groupID, (crm_role == "L3") ? companyID : "", (crm_role == "L3") ? locationID : "", new Date(fromDate.setMonth(fromDate.getMonth() - 3)), toDate);
        // console.log("FilteredDefaultSR", srList);
        const FilteredDefaultSR = srList.data.filter((item) => item.CanId === canId && new Date(item.LastUpdateDate) > new Date(fromDate.setMonth(fromDate.getMonth() - 3)));
        // console.log("FilteredDefaultSR", FilteredDefaultSR);
        return FilteredDefaultSR;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getSolutionLists = async () => {
    const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
    // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
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
    return result;
  }

  const areaListsFunction = async () => {
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
    return result;
  }

  useEffect(() => {
    pinnedFetchData();
  }, []);

  useEffect(() => {
    getSolutionLists()
      .then((solutionListsRes) => {
        // console.log(solutionListsRes);
        const filter = solutionListsRes.data.find((item) => item.CanId === serviceID);
        setLogInCanId(filter.CanId);
        setLogInSegment(filter.SegmentName);
        // Here you can process the data as needed
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    areaListsFunction()
      .then((areaListsFunction) => {
        // console.log(areaListsFunction);
        const filter = areaListsFunction.data.find((item) => item.CanId === serviceID);
        setLogInLocation(filter.LocationName);
        setLogInArea(filter.AreaName);
        const canILocation = areaListsFunction.data.filter((el) => el.LocationName === filter.LocationName);
        // console.log(canILocation);
        const uniqueArea = Array.from(new Set(canILocation.map((area) => area.AreaName)));
        // console.log(uniqueArea);
        setUniqueAreaListDefault(uniqueArea);
        // Here you can process the data as needed
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // async function getServiceLists(groupID, companyID, locationID, fromDate, toDate) {
  //   const url = process.env.REACT_APP_API_URL + '/getServiceLists';
  //   // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
  //   const data = {
  //     groupID: groupID,  //localStorage.getItem("crm_group_id"),
  //     companyID: companyID,
  //     locationID: locationID,
  //     fromDate: fromDate,  //"2023-04-01",
  //     toDate: toDate  //"2023-07-18"
  //   };
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   });
  //   const result = await response.json();
  //   // console.log("getServiceLists", result.data);
  //   return result;
  // }


  const handleRadioChange = (event) => {

    // For remove ChatBox
    const chatBox = document.querySelector(".help-box")
    chatBox.classList.add("d-none");

    const { id, checked } = event.target;
    // console.log("clicked", event.target.value)
    setCaseTyValue(event.target.value)

    if (id == 'other-issue' && checked) {
      setShowSpecification(true);
    }
    else if (id == "other-issue1") {
      setShowSpecification(true);
    }
    else if (id == "issue1") {
      setShowSpecification(true);
    }
    else if (id == "issue2") {
      setShowSpecification(true);
    }
    else if (id == "issue3") {
      setShowSpecification(true);
    }
    else if (id == "issue4") {
      setShowSpecification(true);
    }
    else if (id == "issue5") {
      setShowSpecification(true);
    }
    else if (id == "issue7") {
      setShowSpecification(true);
    }
    else if (id == "issue8") {
      setShowSpecification(true);
    }
    else {
      setShowSpecification(false);
    }

    setIsSubmitDisabled(false);
  };

  const handleTextValue = (event) => {
    // console.log("23213", event.target.value)
    setTextComment(event.target.value);
  }

  const handleContactValue = (event) => {
    setcontactDetails(event.target.value);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await createSR();
      // Optionally, perform any additional actions after creating the service request
    } catch (error) {
      // Handle the error if the service request creation fails
    } finally {
      setIsLoading(false); // Set isLoading to false after the API call is completed (success or error)
    }
  };

  async function createSR() {

    try {
      const url = process.env.REACT_APP_API_URL + '/createSR';
      const data = {
        "Action": "createSR",

        "canID": localStorage.getItem('credentialKey'),

        "caseType": caseTyValue,

        "comment": textcomment,

        "Authkey": "AdgT68HnjkehEqlkd4",
        "ContactDetails": contactDetails

      };
      const data1 = {
        "Action": "createSR",

        "canID": selectedfinalcanid,

        "caseType": caseTyValue,

        "comment": textcomment,

        "Authkey": "AdgT68HnjkehEqlkd4",
        "ContactDetails": contactDetails
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: (!flagcanid ? JSON.stringify(data) : JSON.stringify(data1))
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log('createSR', result.data);
      if (result.data.status == "success") {
        setMessage(`${result.data.message} : ${result.data.response}`);
        setShowModal(true);
        toast.success(`${result.data.message} : ${result.data.response}`)
        Swal.fire({

          text: `${result.data.message} : ${result.data.response}`,
          icon: result.data.status == "success" ? 'success' : 'error',
          confirmButtonText: 'OK',
        });
      } else {
        toast.error(`${result.data.response}`)
        setMessage(`${result.data.response}`);
        Swal.fire({

          text: `${result.data.response}`,
          // icon: result.data.status== "success" ? 'success' : 'error',
          confirmButtonText: 'OK',
        });
        setShowModal(true);
      }


      // Further processing of the result data can be done here
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
  };

  const goBackToTransactions = () => {
    setShowBillingDetailTable(true);
    setShowBillingDetailAdmin(false);
  };

  const goBackToUserManagement = () => {
    // console.log("button clicked");
    setShowBillingDetailTable(true);
    setShowBillingDetailAdmin(false);
    setShowAdminDetail(false); // Set showAdminDetail to false to go back to the previous state
    setFullDetails(false); // Set fullDetails to false to go back to the previous state
  }

  useEffect(() => {

    async function newSR() {
      const url = process.env.REACT_APP_API_URL + '/getSRcaseType';

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },

      });
      const result = await response.json();
      // console.log("sr", result.data);
      setCaseName(result.data);

    }

    newSR();
  }, []);

  useEffect(() => {
    const swiper = new Swiper('.tableSwiper', {
      slidesPerView: 'auto',
      freeMode: true,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    return () => {
      // Cleanup Swiper instance when the component unmounts
      // swiper.destroy();
    };
  }, []);

  useEffect(() => {
    const handleToggleChange = () => {
      const invoiceTable = invoiceTableRef.current;
      const transactionTable = transactionTableRef.current;

      if (toggleCheckboxRef.current.checked) {
        invoiceTable.style.display = 'none';
        transactionTable.style.display = 'block';
      } else {
        invoiceTable.style.display = 'block';
        transactionTable.style.display = 'none';
      }
    };

    const toggleCheckbox = toggleCheckboxRef.current;
    if (toggleCheckbox) {
      toggleCheckbox.addEventListener('change', handleToggleChange);
    }

    return () => {
      if (toggleCheckbox) {
        toggleCheckbox.removeEventListener('change', handleToggleChange);
      }
    };
  }, []);

  useEffect(() => {
    async function srList() {
      let fromDate1 = new Date();
      fromDate1.setMonth(fromDate1.getMonth() - 24)
      let toDate = new Date();
      // alert("asdfgh")
      const url = process.env.REACT_APP_API_URL + '/getServiceLists';
      // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
      const data = {
        groupID: localStorage.getItem("crm_group_id"),
        "companyID": (crm_role == "L3") ? companyID : "",
        "locationID": (crm_role == "L3") ? locationID : "",
        fromDate: fromDate1.toISOString().slice(0, 10),
        toDate: toDate.toISOString().slice(0, 10)
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      // console.log("getServiceLists", result.data);
      let currentDate = new Date();
      let fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);


      const FilteredDefaultSR = result.data.filter((item) => item.CanId === serviceID && new Date(DateParsing(item.LastUpdateDate)) > fromDate);
      // console.log("FilteredSR", FilteredDefaultSR);
      setSrList(FilteredDefaultSR);
    }
    srList();

  }, []);

  useEffect(() => {
    async function getLocationLists() {
      const url = process.env.REACT_APP_API_URL + '/getLocationLists';
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
      // console.log("setLocationList", result.data);
      setLocationList(result.data);
      //area list api call
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
        body: JSON.stringify(data1)
      });
      const result1 = await response1.json();
      // console.log("setGetAreaLists", result1.data);
      setGetAreaLists(result1.data);
      // const filteredData = result1.data.filter(item => item.AreaName !== "" && item.SegmentName !== "");


      const filteredData = result1.data.map(item => ({
        ...item,
        AreaName: item.AreaName !== "" ? item.AreaName : item.LocationName
      }));
      // console.log(filteredData);
      setGetAreaLists(filteredData);

      const uniqueLocationNames = {};
      const filteredData2 = filteredData.filter(item => {
        if (!uniqueLocationNames[item.LocationName]) {
          uniqueLocationNames[item.LocationName] = true;
          return true;
        }
        return false;
      });
      // const uniqueLocation = Array.from(new Set(filteredData.map((area) => area.LocationName)));
      // console.log(filteredData2);
      setLocationList(filteredData2);

    }
    getLocationLists();

  }, []);


  const handleLocationChange = (event) => {
    setSelectedRange("Select Period");
    // console.log(event.target.getAttribute('data-value'));
    let allValue = event.target.getAttribute('data-value');
    // sessionStorage.removeItem('pinnedClicked');

    setPinnedFlag(true);
    if (allValue === "All City") {
      setPinnedClickedData(false);
      setSelectedcanidToFilter(false);
      setSelectedAreaName(false);
      setSelectedSegment(false);
      setLogInFlag(false);
      // setLogInArea(false);
      // setLogInLocation(false);
      // setLogInSegment(false);
      setPinnedSRLists(false);
      setAllCityFlag(true);
      setFlagCheck(false);
      setLocation(allValue);
      // setSegmentDropdownValue(false);
    } else {
      setSelectedSegment(false);
      setLogInFlag(false);
      // setLogInArea(false);
      // setLogInLocation(false);
      // setLogInSegment(false);
      setAllCityFlag(true);
      setSelectedAreaName("")
      // console.log("event", event);
      const selectedLocation = event.target.getAttribute('data-value');
      setLocation(selectedLocation);
      // console.log("getAreaLists",getAreaLists);
      //  let uniqueAreaList = getAreaLists.filter(item => item.LocationName == selectedLocation)
      const uniqueAreaList = getAreaLists.reduce((uniqueAreas, item) => {
        if (item.LocationName === selectedLocation && !uniqueAreas.find(area => area.AreaName === item.AreaName)) {
          uniqueAreas.push(item);
        }
        return uniqueAreas;
      }, []);
      // console.log("uniqueAreaList", uniqueAreaList);
      setUniqueAreaList(uniqueAreaList);
    }
  }

  const handleCresteSRLocationChange = (event) => {
    setLogInFlagC(false);
    // setUniqueAreaListCreateSr(false);
    // setSegmentDropdownValuecreateSr(false);
    setSelectedAreaNameSr("")
    setSelectedSegmentcreateSr("")
    // console.log("event", event);
    const selectedLocation = event.target.getAttribute('data-value');
    setSelectedLocCreateSr(selectedLocation);
    // console.log("getAreaLists",getAreaLists);
    //  let uniqueAreaList = getAreaLists.filter(item => item.LocationName == selectedLocation)
    const uniqueAreaList = getAreaLists.reduce((uniqueAreas, item) => {
      if (item.LocationName === selectedLocation && !uniqueAreas.find(area => area.AreaName === item.AreaName)) {
        uniqueAreas.push(item);
      }
      return uniqueAreas;
    }, []);
    // console.log("uniqueAreaList", uniqueAreaList);
    setUniqueAreaListCreateSr(uniqueAreaList)



  }
  const handleAreaNameChange = async (event) => {
    setSelectedRange("Select Period");
    setSelectedSegment("")
    const selectedArea = event.target.getAttribute('data-value');
    // console.log("selectedArea", selectedArea);
    setSelectedAreaName(selectedArea)


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
    let segmentDropdown = getAreaLists.filter(item => item.AreaName === selectedArea)

      .map(item => item.CanId);
    // console.log("segmentDropdown", segmentDropdown);
    const segmentAndCanIds = segmentDropdown.map(canId => {
      const solution = result.data.find(item => item.CanId == canId);
      return solution ? { CanId: solution.CanId, SegmentName: solution.SegmentName } : null;
    }).filter(Boolean);
    // console.log("segmentAndCanIds",segmentAndCanIds);
    setSegmentDropdownValue(segmentAndCanIds);
  }

  const handleAreaNameChangeCreateSr = async (event) => {
    setSelectedSegmentcreateSr("")
    const selectedArea = event.target.getAttribute('data-value');
    // console.log("selectedArea", selectedArea);
    setSelectedAreaNameSr(selectedArea)


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
    let segmentDropdown = getAreaLists.filter(item => item.AreaName === selectedArea)
      .map(item => item.CanId);
    // console.log("segmentDropdown", segmentDropdown);
    const segmentAndCanIds = segmentDropdown.map(canId => {
      const solution = result.data.find(item => item.CanId == canId);
      return solution ? { CanId: solution.CanId, SegmentName: solution.SegmentName } : null;
    }).filter(Boolean);
    // console.log("segmentAndCanIds",segmentAndCanIds);
    setSegmentDropdownValuecreateSr(segmentAndCanIds);
  }

  const handleSegmentChange = async (event) => {
    setSelectedRange("Select Period");
    try {
      // console.log(event);
      const selectedCanid = event.target.getAttribute('data-value');
      const selectedSegment = event.target.innerText;
      setSelectedSegment(selectedSegment);

      setSelectedcanidToFilter(selectedCanid);
      setPinnedClickedData(false);
      // console.log("filterSrData",selectedSegment, "selectedCanid:", selectedCanid);
      // let match = selectedSegment.match(/\d+/)
      // let canId = match[0]; 
      // console.log(canId);

    } catch (error) {
      console.error(error);
    }
  }

  const handleSegmentCreateSrChange = (event) => {
    // console.log(event);
    const selectedCanid = event.target.getAttribute('data-value');
    // alert(selectedCanid)
    const selectedSegment = event.target.innerText;
    setSelectedSegmentcreateSr(selectedSegment)
    setFlagcanid(true)
    setselectedfinalcanid(selectedCanid)
    // let filterSrData = srList.filter(item => item.CanId == selectedCanid)
    // setFilterSrData(filterSrData)
    // console.log("filterSrData",filterSrData);
  }
  const datePickerRef = useRef(null);
  const [selectedDateRange, setSelectedDateRange] = useState('');

  // useEffect(() => {
  //   const initDateRangePicker = () => {
  //     const start = moment();
  //     const end = moment();

  //     function cb(start, end) {
  //       const formattedStartDate = start.format('YYYY-MM-DD');
  //       const formattedEndDate = end.format('YYYY-MM-DD');
  //       const today = moment().format('YYYY-MM-DD');
  //       const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
  //       if (!start.isValid()) {
  //         $(`#${datePickerRef.current.id} span`).html('All');
  //       } else if (
  //         formattedStartDate === formattedEndDate &&
  //         formattedStartDate === today
  //       ) {
  //         $(`#${datePickerRef.current.id} span`).html('Today');

  //       } else if (
  //         formattedStartDate === formattedEndDate &&
  //         formattedStartDate === yesterday
  //       ) {
  //         $(`#${datePickerRef.current.id} span`).html('Yesterday');

  //       } else {
  //         $(`#${datePickerRef.current.id} span`).html(
  //           formattedStartDate + ' - ' + formattedEndDate
  //         );
  //       }

  //       setSelectedDateRange(formattedStartDate + ' - ' + formattedEndDate);
  //     }

  //     $(`#${datePickerRef.current.id}`).daterangepicker(
  //       {
  //         startDate: start,
  //         endDate: end,
  //         ranges: {
  //           All: ['', 'all'],
  //           Today: [moment(), moment()],
  //           Yesterday: [
  //             moment().subtract(1, 'days'),
  //             moment().subtract(1, 'days'),
  //           ],
  //           'Current Month': [
  //             moment().startOf('month'),
  //             moment().endOf('month'),
  //           ],
  //         },
  //       },
  //       cb
  //     );

  //     cb(start, end);
  //   };

  //   initDateRangePicker();
  // }, []);


  const handleDropdownChange = (event) => {

    // console.log("event", selectedDateRange);
    const selectedValue = $(`#${datePickerRef.current.id} span`).html();
    // console.log("selectedValue", selectedValue);
    // setSelectedDateRange(selectedValue);

    let startDate;
    let endDate;
    if (selectedValue == "Today") {
      startDate = moment().startOf('day').toDate();
      endDate = moment().endOf('day').toDate();
    }
    else if (selectedValue == "Yesterday") {
      startDate = moment().subtract(1, 'day').startOf('day').toDate();
      endDate = moment().subtract(1, 'day').endOf('day').toDate();
    }
    else {
      let splitDate = selectedValue.split(" - ")
      startDate = moment(splitDate[0], 'YYYY-MM-DD').startOf('day').toDate();
      endDate = moment(splitDate[1], 'YYYY-MM-DD').endOf('day').toDate();
    }
    let filteredSrData = srList.filter(item => {
      const createDateParts = item.CreateDate.split(' ');
      const dateParts = createDateParts[0].split('/');
      const timeParts = createDateParts[1].split(':');
      // console.log("$$$$$",startDate,endDate);
      const createDate = new Date(
        `${dateParts[2]}-${dateParts[1]}-${dateParts[0]} ${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`
      );

      return (
        item.CanId === selectedcanidToFilter &&
        createDate >= startDate &&
        createDate <= endDate
      );
    });
    // console.log("filteredSrData", filteredSrData);
    setFilterSrData(filteredSrData);
    setFlagCheck(true)
  };

  function chatBoxClick(event) {
    setIsSubmitDisabled(true);
    const chatBox = document.querySelector(".help-box")
    chatBox.classList.remove("d-none");

    const { id, checked } = event.target;
    // console.log("clicked", event.target.value)
    setCaseTyValue(event.target.value)

    if (id == "issue1" || id == "issue4" || id == "issue5") {
      setShowSpecification(false);
    }
  }

  useEffect(() => {
    // Add an event listener to handle clicks outside the notification
    document.addEventListener('mousedown', SRclickOutside);

    // return () => {
    //   // Remove the event listener when the component unmounts
    //   document.removeEventListener('mousedown', handleClickOutside);
    // };
  }, []);

  const SRclickOutside = (event) => {
    const chatBox = document.querySelector(".help-box")
    // console.log("chatBox", chatBox);
    chatBox?.classList.add("d-none");
  };

  const pid = new URLSearchParams(window.location.search);

  var pageid = pid.get('pid') ? pid.get('pid') : '';

  // console.log('AccountPageParam=', pageid);

  if (pageid == 'raiseNewSR') {

    var actTabAcc = 'nav-link account-tab-btn';

    var actTabBill = 'nav-link account-tab-btn active';

    var actBill = 'tab-pane fade show active';

    var actAcc = 'tab-pane tab-pane-spacing fade';

  } else {

    var actTabAcc = 'nav-link account-tab-btn active';

    var actTabBill = 'nav-link account-tab-btn';

    var actAcc = 'tab-pane fade active show';

    var actBill = 'tab-pane tab-pane-spacing fade';

  }


  if (crmRole === "L2") {
    return (
      <section className="section-dashboard">
        <div className>
          {/* <ToastContainer /> */}
          {/* <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-title"
        className='modal-style'
      >
       <Box className='modal-content'>
          <IconButton
            aria-label="close"
            onClick={() => setShowModal(false)}
            size="small"
            className="close-button"
          >
            <CloseIcon />
          </IconButton >
          <Typography variant="body1">{message}</Typography>
        </Box>
      </Modal> */}
          <div className="d-flex justify-content-end">
            {/* SIDE NAVBAR  */}
            <SideBar />
            {/* top header */}
            {/* <Header /> */}
            {segment != "HBB" && <Header />}
            {segment == "HBB" && <HeaderHbb />}
            {/* Service Request  */}
            <div className="dashboard-main">
              <div className="dashboard-content">
                {/* Navigation tabs: Account details, Billing details, User management */}
                <ul className="nav nav-pills mb-3 account-tab-list" id="pills-tab" role="tablist">
                  {/* <li class="nav-item" role="presentation">
              <button class="nav-link account-tab-btn"></button>
          </li> */}
                  <li className="nav-item" role="presentation" >
                    <button className={actTabAcc} id="pills-srStatus-tab" data-bs-toggle="pill" data-bs-target="#pills-srStatus" type="button" role="tab" aria-controls="pills-srStatus" aria-selected="true">SR Status</button>
                  </li>
                  {segment != "Hotel" && segment != "PG" && segment != "Office" &&
                    <li className="nav-item" role="presentation">
                      <button className={actTabBill} id="pills-raiseNewSR-tab" data-bs-toggle="pill" data-bs-target="#pills-raiseNewSR" type="button" role="tab" aria-controls="pills-raiseNewSR" aria-selected="false">Raise SR</button>
                    </li>
                  }
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  {/* ****************** SR STATUS TAB ************* */}
                  <div className={actAcc} id="pills-srStatus" role="tabpanel" aria-labelledby="pills-srStatus-tab">
                    <div id="billing-detail-table">
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="account-tab-heading">SR Status</div>
                      </div>
                      <div className="">
                        {/* SR Status Table  */}
                        <div id="invoice-table" className="account-table-container">
                          {/* top banner with company name and fitlers */}
                          <div className="table-top-bar d-flex align-items-center justify-content-between flex-wrap gap-3">
                            {/* <div className="table-name flex-grow-1 table-name-span">Requests <span>CAN ID: {localStorage.getItem("credentialKey")}</span></div> */}
                            <div class="table-name flex-grow-1 table-name-span d-flex align-items-center">
                              <p class="m-0">Requests</p>
                              <span>Service ID:
                                {getPinnedClickedData ? getPinnedClickedData.CanId : selectedcanidToFilter ? selectedcanidToFilter : localStorage.getItem("credentialKey")}
                              </span>
                            </div>
                            <div className="d-flex align-items-center gap-3 flex-wrap">
                              {/* Location selection dropdown */}
                              <div className="dropdown spectra-dropdown select-dropdown">
                                <div
                                  className="select-custom dropdown-toggle rounded-0"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  role="button"
                                >
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {
                                      (<span className="textValue">{location ? location : getPinnedClickedData && !allCityFlag ? getPinnedClickedData.LocationName : getLogInFlag ? getLogInLocation : 'Select City'}
                                      </span>)}

                                    {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                      (<span className="textValue">{getLogInLocation}</span>)} */}
                                  </div>
                                </div>
                                <ul className="dropdown-menu">
                                  {<li
                                    className="dropdown-item"
                                    data-value="All City"
                                    onClick={handleLocationChange}
                                    style={{ fontSize: "14px" }}
                                  >
                                    All City
                                  </li>}
                                  {locationList && locationList.map((loc, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      data-value={loc.LocationName}
                                      onClick={handleLocationChange}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {loc.LocationName}
                                    </li>
                                  ))}
                                  {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                    <li className="dropdown-item" style={{ fontSize: "14px" }}>
                                      {getLogInLocation}
                                    </li>
                                  } */}

                                </ul>
                              </div>
                              {/* Address selection dropdown */}
                              <div className="dropdown spectra-dropdown select-dropdown">
                                <div
                                  className="select-custom dropdown-toggle rounded-0"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  role="button"
                                >
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {
                                      <span className="textValue">{selectedAreaName ? selectedAreaName : getPinnedClickedData ? getPinnedFlag ? "Select Area" : getPinnedClickedData.AreaName : getLogInFlag ? getLogInArea : "Select Area"}</span>}

                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") &&
                                      (<span className="textValue">{getLogInArea}</span>)} */}
                                  </div>
                                </div>
                                <ul className="dropdown-menu">
                                  {uniqueAreaList ? uniqueAreaList.map((area, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      data-value={area.AreaName}
                                      onClick={handleAreaNameChange}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {area.AreaName}
                                    </li>
                                  )) : ""}

                                  {uniqueAreaListDeafault && !uniqueAreaList && uniqueAreaListDeafault.map((area, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      data-value={area}
                                      onClick={handleAreaNameChange}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {area}
                                    </li>
                                  ))}
                                  {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                    <li className="dropdown-item" style={{ fontSize: "14px" }}>
                                      {getLogInArea}
                                    </li>
                                  } */}


                                </ul>
                              </div>
                              {/* Product selection dropdown */}
                              <div className="dropdown spectra-dropdown select-dropdown">
                                <div
                                  className="select-custom dropdown-toggle rounded-0"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  role="button"
                                >
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={productIcon} alt="" />
                                    {
                                      <span className="textValue">{selectedSegment ? selectedSegment : getPinnedClickedData ? getPinnedFlag ? "Select Product" : getPinnedClickedData.SegmentName + " (" + getPinnedClickedData.CanId + ")" : getLogInFlag ? getLogInSegment + " (" + getLogInCanId + ")" : "Select Product"}</span>}
                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") &&
                                      (<span className="textValue">{getLogInSegment + " (" + getLogInCanId + ")"}</span>)} */}
                                  </div>
                                </div>
                                <ul className="dropdown-menu">
                                  {segmentDropDownValue && segmentDropDownValue.map((product, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      data-value={product.CanId}
                                      onClick={handleSegmentChange}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {product.SegmentName} ({product.CanId})
                                    </li>
                                  ))}
                                  {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                    <li className="dropdown-item" style={{ fontSize: "14px" }}>
                                      {getLogInSegment + " (" + getLogInCanId + ")"}
                                    </li>
                                  } */}
                                </ul>
                              </div>
                              {/* Date range picker */}
                              {/* <div className="spectra-dropdown">
                              <div className="select-custom dropdown-toggle rounded-0" id="reportrange">
                                <div className="d-flex align-items-center gap-2">
                    
                                  <img src={iconcalendar} alt="" />
                                  <span>Today </span>
                                </div>
         

                              </div>
                            </div> */}
                              {/* <div className="spectra-dropdown">
                                <div
                                  className="select-custom dropdown-toggle rounded-0"
                                // id="reportrange"
                                // ref={datePickerRef}
                                // onClick={handleDropdownChange}
                                >
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={iconcalendar} alt="" /> */}
                              {/* <span>Today </span> */}

                              <DateRangePicker
                                initialSettings={{
                                  // startDate: selectedRange.startDate,
                                  // endDate: selectedRange.endDate,
                                  ranges: {
                                    All: [moment().subtract(100, 'years'), moment()],
                                    Today: [moment(), moment()],
                                    Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                                    'Current Month': [moment().startOf('month'), moment().endOf('month')]
                                  },
                                  maxDate: new Date()
                                }}
                                onApply={handleDateRangeChange}
                              >
                                <div className="spectra-dropdown">
                                  <div
                                    className="select-custom dropdown-toggle rounded-0"
                                  // id="reportrange"
                                  // ref={datePickerRef}
                                  // onClick={handleDropdownChange}
                                  >
                                    <div className="d-flex align-items-center gap-2">
                                      <img src={iconcalendar} alt="" />
                                      <span
                                        type="text"
                                        className=""
                                        value={selectedRange}
                                      >{selectedRange}</span>
                                    </div>
                                  </div>
                                </div>
                              </DateRangePicker>
                              {/* </div>
                                </div> */}
                              {/* <div>Selected Date Range: {selectedDateRange}</div> */}


                              {/* </div> */}
                            </div>

                          </div>
                          {/* Display data as table on large screen devices */}
                          <div className="horizontal-scroll-container d-md-block d-none">

                            <table className="account-table">
                              <tbody><tr className="table-header">
                                {/* <th className="table-header-data">service ID</th> */}
                                <th className="table-header-data">SR Number</th>
                                <th className="table-header-data">Category</th>
                                <th className="table-header-data">Sub Category</th>
                                <th className="table-header-data">Source</th>
                                <th className="table-header-data">Last Update Date</th>
                                <th className="table-header-data">SLA/ETR</th>
                                <th className="table-header-data">Status</th>

                              </tr>

                                {/* for Pinned Feature Click */}
                                {(getPinnedSRLists && !filterSrData && getPinnedSRLists.length > 0) ? (getPinnedSRLists.map((row, index) => (

                                  <tr key={index} className="table-row">
                                    {/* <td className="table-row-data">{row.CanId}</td> */}
                                    <td className="table-row-data">{row.SRNumber}</td>
                                    <td className="table-row-data">{row.Category}</td>
                                    <td className="table-row-data">{row.SubCategory}</td>
                                    <td className="table-row-data">{row.Source}</td>
                                    <td className="table-row-data">
                                      {(() => {
                                        const lastUpdateDateParts = row.LastUpdateDate.split(/\/|\s|:/);
                                        const day = parseInt(lastUpdateDateParts[0]);
                                        const month = parseInt(lastUpdateDateParts[1]) - 1; // Months are zero-indexed
                                        const year = parseInt(lastUpdateDateParts[2]);
                                        const hour = parseInt(lastUpdateDateParts[3]);
                                        const minute = parseInt(lastUpdateDateParts[4]);
                                        const date = new Date(year, month, day, hour, minute);

                                        const formattedMonth = date.toLocaleString('default', { month: 'short' });
                                        const formattedYear = date.toLocaleString('default', { year: '2-digit' });

                                        return `${day} ${formattedMonth}'${formattedYear}`;
                                      })()}
                                    </td>
                                    {/* <td className="table-row-data">
                                    
                                      {(() => {
                                        const statusText =
                                          row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                            ? "Open"
                                            : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                              ? "Closed"
                                              : row.status;
                                        return <div className="status-active-btn">{statusText}</div>;
                                      })()}
                                    </td> */}
                                    <td className="table-row-data">
                                      {(() => {
                                        if (row.SLA_ETR) {
                                          const slaEtrParts = row.SLA_ETR.split(/\/|\s|:/);
                                          const daySla = parseInt(slaEtrParts[1]);
                                          const monthSla = parseInt(slaEtrParts[0]) - 1; // Months are zero-indexed
                                          const yearSla = parseInt(slaEtrParts[2].substring(2)); // Extract last two digits of the year
                                          const hourSla = parseInt(slaEtrParts[3]);
                                          const minuteSla = parseInt(slaEtrParts[4]);

                                          const dateSla = new Date(yearSla, monthSla, daySla, hourSla, minuteSla);

                                          const formattedMonthSla = dateSla.toLocaleString('default', { month: 'short' });
                                          const formattedYearSla = dateSla.toLocaleString('default', { year: '2-digit' });
                                          const formattedTimeSla = dateSla.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

                                          return `${daySla} ${formattedMonthSla}'${formattedYearSla} ${formattedTimeSla}`;
                                        } else {
                                          return "N/A";
                                        }
                                      })()}
                                    </td>
                                    <td className="table-row-data">
                                      {(() => {
                                        const statusText =
                                          row.status === "In Progress" ||
                                            row.status === "On Hold - SLA clock Stop" ||
                                            row.status === "Waiting for Information"
                                            ? "Open"
                                            : row.status === "Resolved - Not Contacted" ||
                                              row.status === "Resolved - Contacted" ||
                                              row.status === "Duplicate Merged"
                                              ? "Closed"
                                              : row.status;

                                        const statusClassName =
                                          statusText === "Open" ? "status-red" : "status-green";

                                        return <div className={`status-active-btn ${statusClassName}`}>{statusText}</div>;
                                      })()}
                                    </td>

                                  </tr>

                                ))
                                ) : (!srList && getPinnedSRLists && !flagCheck && (getPinnedSRLists.length === 0) ? (
                                  <tr className="table-row">
                                    <td className="table-row-data" colSpan={6} style={{ textAlign: "center" }}>No Service Requests</td>
                                  </tr>
                                ) : null)}

                                {/* for Default */}
                                {!getPinnedSRLists && (srList && srList.length > 0 && !flagCheck) ? (srList.map((row, index) => (

                                  <tr key={index} className="table-row">
                                    {/* <td className="table-row-data">{row.CanId}</td> */}
                                    <td className="table-row-data">{row.SRNumber}</td>
                                    <td className="table-row-data">{row.Category}</td>
                                    <td className="table-row-data">{row.SubCategory}</td>
                                    <td className="table-row-data">{row.Source}</td>
                                    <td className="table-row-data">
                                      {(() => {
                                        const lastUpdateDateParts = row.LastUpdateDate.split(/\/|\s|:/);
                                        const day = parseInt(lastUpdateDateParts[0]);
                                        const month = parseInt(lastUpdateDateParts[1]) - 1; // Months are zero-indexed
                                        const year = parseInt(lastUpdateDateParts[2]);
                                        const hour = parseInt(lastUpdateDateParts[3]);
                                        const minute = parseInt(lastUpdateDateParts[4]);
                                        const date = new Date(year, month, day, hour, minute);

                                        const formattedMonth = date.toLocaleString('default', { month: 'short' });
                                        const formattedYear = date.toLocaleString('default', { year: '2-digit' });
                                        return `${day} ${formattedMonth}'${formattedYear}`;
                                      })()}
                                    </td>
                                    {/* <td className="table-row-data">
                                     
                                      {(() => {
                                        const statusText =
                                          row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                            ? "Open"
                                            : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                              ? "Closed"
                                              : row.status;
                                        return <div className="status-active-btn">{statusText}</div>;
                                      })()}
                                    </td> */}
                                    <td className="table-row-data">
                                      {(() => {
                                        if (row.SLA_ETR) {
                                          const slaEtrParts = row.SLA_ETR.split(/\/|\s|:/);
                                          const daySla = parseInt(slaEtrParts[1]);
                                          const monthSla = parseInt(slaEtrParts[0]) - 1; // Months are zero-indexed
                                          const yearSla = parseInt(slaEtrParts[2].substring(2)); // Extract last two digits of the year
                                          const hourSla = parseInt(slaEtrParts[3]);
                                          const minuteSla = parseInt(slaEtrParts[4]);

                                          const dateSla = new Date(yearSla, monthSla, daySla, hourSla, minuteSla);

                                          const formattedMonthSla = dateSla.toLocaleString('default', { month: 'short' });
                                          const formattedYearSla = dateSla.toLocaleString('default', { year: '2-digit' });
                                          const formattedTimeSla = dateSla.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

                                          return `${daySla} ${formattedMonthSla}'${formattedYearSla} ${formattedTimeSla}`;
                                        } else {
                                          return "N/A";
                                        }
                                      })()}
                                    </td>
                                    <td className="table-row-data">
                                      {(() => {
                                        const statusText =
                                          row.status === "In Progress" ||
                                            row.status === "On Hold - SLA clock Stop" ||
                                            row.status === "Waiting for Information"
                                            ? "Open"
                                            : row.status === "Resolved - Not Contacted" ||
                                              row.status === "Resolved - Contacted" ||
                                              row.status === "Duplicate Merged"
                                              ? "Closed"
                                              : row.status;

                                        const statusClassName =
                                          statusText === "Open" ? "status-red" : "status-green";

                                        return <div className={`status-active-btn ${statusClassName}`}>{statusText}</div>;
                                      })()}
                                    </td>

                                  </tr>

                                ))
                                ) : (srList && srList.length === 0 && !flagCheck) ? (
                                  <tr className="table-row">
                                    <td className="table-row-data" colSpan={6} style={{ textAlign: "center" }}>No Service Requests</td>
                                  </tr>
                                ) : null}

                                {/* for Dropdown Selection */}
                                {flagCheck && (filterSrData && filterSrData.length > 0) ? (filterSrData.map((row, index) => (
                                  <tr key={index} className="table-row">
                                    {/* <td className="table-row-data">{row.CanId}</td> */}
                                    <td className="table-row-data">{row.SRNumber}</td>
                                    <td className="table-row-data">{row.Category}</td>
                                    <td className="table-row-data">{row.SubCategory}</td>
                                    <td className="table-row-data">{row.Source}</td>
                                    <td className="table-row-data">
                                      {(() => {
                                        const lastUpdateDateParts = row.LastUpdateDate.split(/\/|\s|:/);
                                        const day = parseInt(lastUpdateDateParts[0]);
                                        const month = parseInt(lastUpdateDateParts[1]) - 1; // Months are zero-indexed
                                        const year = parseInt(lastUpdateDateParts[2]);
                                        const hour = parseInt(lastUpdateDateParts[3]);
                                        const minute = parseInt(lastUpdateDateParts[4]);
                                        const date = new Date(year, month, day, hour, minute);

                                        const formattedMonth = date.toLocaleString('default', { month: 'short' });
                                        const formattedYear = date.toLocaleString('default', { year: '2-digit' });

                                        return `${day} ${formattedMonth}'${formattedYear}`;
                                      })()}
                                    </td>
                                    {/* <td className="table-row-data">
                                      
                                      {(() => {
                                        const statusText =
                                          row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                            ? "Open"
                                            : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                              ? "Closed"
                                              : row.status;
                                        return <div className="status-active-btn">{statusText}</div>;
                                      })()}
                                    </td> */}
                                    <td className="table-row-data">
                                      {(() => {
                                        if (row.SLA_ETR) {
                                          const slaEtrParts = row.SLA_ETR.split(/\/|\s|:/);
                                          const daySla = parseInt(slaEtrParts[1]);
                                          const monthSla = parseInt(slaEtrParts[0]) - 1; // Months are zero-indexed
                                          const yearSla = parseInt(slaEtrParts[2].substring(2)); // Extract last two digits of the year
                                          const hourSla = parseInt(slaEtrParts[3]);
                                          const minuteSla = parseInt(slaEtrParts[4]);

                                          const dateSla = new Date(yearSla, monthSla, daySla, hourSla, minuteSla);

                                          const formattedMonthSla = dateSla.toLocaleString('default', { month: 'short' });
                                          const formattedYearSla = dateSla.toLocaleString('default', { year: '2-digit' });
                                          const formattedTimeSla = dateSla.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

                                          return `${daySla} ${formattedMonthSla}'${formattedYearSla} ${formattedTimeSla}`;
                                        } else {
                                          return "N/A";
                                        }
                                      })()}
                                    </td>
                                    <td className="table-row-data">
                                      {(() => {
                                        const statusText =
                                          row.status === "In Progress" ||
                                            row.status === "On Hold - SLA clock Stop" ||
                                            row.status === "Waiting for Information"
                                            ? "Open"
                                            : row.status === "Resolved - Not Contacted" ||
                                              row.status === "Resolved - Contacted" ||
                                              row.status === "Duplicate Merged"
                                              ? "Closed"
                                              : row.status;

                                        const statusClassName =
                                          statusText === "Open" ? "status-red" : "status-green";

                                        return <div className={`status-active-btn ${statusClassName}`}>{statusText}</div>;
                                      })()}
                                    </td>
                                    {/* <td className="table-row-data">{row.SLA_ETR}</td> */}
                                  </tr>

                                ))
                                ) : (filterSrData && filterSrData.length === 0 && flagCheck) ? (
                                  <tr className="table-row">
                                    <td className="table-row-data" colSpan={6} style={{ textAlign: "center" }}>No Service Requests</td>
                                  </tr>
                                ) : null}
                              </tbody></table>

                          </div>

                          {/* Display data as cards on small screens */}

                          <div className="d-block d-md-none">
                            {/* for Pinned Feature Click */}
                            {(getPinnedSRLists && !filterSrData && getPinnedSRLists.length > 0) ? (getPinnedSRLists.map((row, index) => (
                              <div key={index} className="table-content">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="table-row-data resp-name">{row.SRNumber}</div>
                                  <div className="table-row-data dueAmount">
                                    {/* <div className="status-active-btn">{row.status}</div> */}
                                    {(() => {
                                      const statusText =
                                        row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                          ? "Open"
                                          : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                            ? "Closed"
                                            : row.status;
                                      const statusClassName =
                                        statusText === "Open" ? "status-red" : "status-green";
                                      return <div className={`status-active-btn ${statusClassName}`}>{statusText}</div>;
                                    })()}
                                  </div>
                                </div>
                                <div className="table-row-data email">
                                  <div className="italic">Last Updated:
                                    {(() => {
                                      const lastUpdateDateParts = row.LastUpdateDate.split(/\/|\s|:/);
                                      const day = parseInt(lastUpdateDateParts[0]);
                                      const month = parseInt(lastUpdateDateParts[1]) - 1; // Months are zero-indexed
                                      const year = parseInt(lastUpdateDateParts[2]);
                                      const hour = parseInt(lastUpdateDateParts[3]);
                                      const minute = parseInt(lastUpdateDateParts[4]);
                                      const date = new Date(year, month, day, hour, minute);

                                      const formattedMonth = date.toLocaleString('default', { month: 'short' });
                                      const formattedYear = date.toLocaleString('default', { year: '2-digit' });

                                      return `${day} ${formattedMonth}'${formattedYear}`;
                                    })()}
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Category</div>
                                    <div className="resp-contact">{row.Category}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Sub Category</div>
                                    <div className="resp-contact">{row.SubCategory}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Source</div>
                                    <div className="resp-contact">{row.Source}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Source</div>
                                    <div className="resp-contact">{row.Source}</div>
                                  </div>
                                </div>
                              </div>
                            ))
                            ) : (!srList && getPinnedSRLists && !flagCheck && (getPinnedSRLists.length === 0)) ? (
                              <tr>
                                <td colSpan={6}>No Service Requests</td>
                              </tr>
                            ) : null}

                            {/* for Default */}
                            {!getPinnedSRLists && (srList && srList.length > 0 && !flagCheck) ? (srList.map((row, index) => (
                              <div key={index} className="table-content">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="table-row-data resp-name">{row.SRNumber}</div>
                                  <div className="table-row-data dueAmount">
                                    {/* <div className="status-active-btn">{row.status}</div> */}
                                    {(() => {
                                      const statusText =
                                        row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                          ? "Open"
                                          : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                            ? "Closed"
                                            : row.status;
                                      const statusClassName =
                                        statusText === "Open" ? "status-red" : "status-green";
                                      return <div className={`status-active-btn ${statusClassName}`}>{statusText}</div>;
                                    })()}
                                  </div>
                                </div>
                                <div className="table-row-data email">
                                  <div className="italic">Last Updated:
                                    {(() => {
                                      const lastUpdateDateParts = row.LastUpdateDate.split(/\/|\s|:/);
                                      const day = parseInt(lastUpdateDateParts[0]);
                                      const month = parseInt(lastUpdateDateParts[1]) - 1; // Months are zero-indexed
                                      const year = parseInt(lastUpdateDateParts[2]);
                                      const hour = parseInt(lastUpdateDateParts[3]);
                                      const minute = parseInt(lastUpdateDateParts[4]);
                                      const date = new Date(year, month, day, hour, minute);

                                      const formattedMonth = date.toLocaleString('default', { month: 'short' });
                                      const formattedYear = date.toLocaleString('default', { year: '2-digit' });

                                      return `${day} ${formattedMonth}'${formattedYear}`;
                                    })()}
                                  </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Category</div>
                                    <div className="resp-contact">{row.Category}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Sub Category</div>
                                    <div className="resp-contact">{row.SubCategory}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Source</div>
                                    <div className="resp-contact">{row.Source}</div>
                                  </div>

                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">SLA ETR</div>
                                    <div className="resp-contact">
                                      {(() => {
                                        if (row.SLA_ETR) {
                                          const slaEtrParts = row.SLA_ETR.split(/\/|\s|:/);
                                          const daySla = parseInt(slaEtrParts[1]);
                                          const monthSla = parseInt(slaEtrParts[0]) - 1; // Months are zero-indexed
                                          const yearSla = parseInt(slaEtrParts[2].substring(2)); // Extract last two digits of the year
                                          const hourSla = parseInt(slaEtrParts[3]);
                                          const minuteSla = parseInt(slaEtrParts[4]);

                                          const dateSla = new Date(yearSla, monthSla, daySla, hourSla, minuteSla);

                                          const formattedMonthSla = dateSla.toLocaleString('default', { month: 'short' });
                                          const formattedYearSla = dateSla.toLocaleString('default', { year: '2-digit' });
                                          const formattedTimeSla = dateSla.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

                                          return `${daySla} ${formattedMonthSla}'${formattedYearSla} ${formattedTimeSla}`;
                                        } else {
                                          return "No SLA_ETR available";
                                        }
                                      })()}
                                    </div>
                                  </div>

                                </div>
                              </div>
                            ))
                            ) : (srList && srList.length == 0 && !flagCheck) ? (
                              <tr>
                                <td colSpan={6}>No Service Requests</td>
                              </tr>
                            ) : null}

                            {/* for Dropdown Selection */}
                            {flagCheck && (filterSrData && filterSrData.length > 0) ? (filterSrData.map((row, index) => (
                              <div key={index} className="table-content">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="table-row-data resp-name">{row.SRNumber}</div>
                                  <div className="table-row-data dueAmount">
                                    {/* <div className="status-active-btn">{row.status}</div> */}
                                    {(() => {
                                      const statusText =
                                        row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                          ? "Open"
                                          : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                            ? "Closed"
                                            : row.status;
                                      const statusClassName =
                                        statusText === "Open" ? "status-red" : "status-green";
                                      return <div className={`status-active-btn ${statusClassName}`}>{statusText}</div>;
                                    })()}
                                  </div>
                                </div>
                                <div className="table-row-data email">
                                  <div className="italic">Last Updated:
                                    {(() => {
                                      const lastUpdateDateParts = row.LastUpdateDate.split(/\/|\s|:/);
                                      const day = parseInt(lastUpdateDateParts[0]);
                                      const month = parseInt(lastUpdateDateParts[1]) - 1; // Months are zero-indexed
                                      const year = parseInt(lastUpdateDateParts[2]);
                                      const hour = parseInt(lastUpdateDateParts[3]);
                                      const minute = parseInt(lastUpdateDateParts[4]);
                                      const date = new Date(year, month, day, hour, minute);

                                      const formattedMonth = date.toLocaleString('default', { month: 'short' });
                                      const formattedYear = date.toLocaleString('default', { year: '2-digit' });

                                      return `${day} ${formattedMonth}'${formattedYear}`;
                                    })()}
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Category</div>
                                    <div className="resp-contact">{row.Category}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Sub Category</div>
                                    <div className="resp-contact">{row.SubCategory}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Source</div>
                                    <div className="resp-contact">{row.Source}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Source</div>
                                    <div className="resp-contact">{row.Source}</div>
                                  </div>
                                </div>
                              </div>
                            ))
                            ) : (filterSrData && filterSrData.length == 0 && flagCheck) ? (
                              <tr>
                                <td colSpan={6}>No Service Requests</td>
                              </tr>
                            ) : null}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ****************** RASE NEW SR TAB ************* */}

                  <div
                    className={actBill}
                    id="pills-raiseNewSR"
                    role="tabpanel"
                    aria-labelledby="pills-raiseNewSR-tab"
                  >

                    <div id="billing-detail-admin">
                      <div className="account-tab-heading mb-3">Raise a new SR</div>
                      <div className="admin-panel-wrapper account-tab-container">
                        {/* <div className="admin-panel-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
                        <div className="heading account-detail-banner-heading d-flex align-items-center">
                          <p className="m-0">New Service Request</p>
                          {!flagcanid && (
                            <span>CAN ID: {localStorage.getItem('credentialKey')}</span>
                          )}
                          {flagcanid && (
                            <span>CAN ID: {selectedfinalcanid}</span>
                          )}

                        </div>

                      </div> */}

                        {/* <div className="admin-panel-data selector-row">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-4">
                          <div className="newSR-selector">
                          
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom newSR-select-custom dropdown-toggle rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <span className="textValue" id="city">
                                    {selectedLocCreateSr ? selectedLocCreateSr : "City"}
                                  </span>
                                </div>
                              </div>
                              <ul className="dropdown-menu">
                                {locationList ? locationList.map((loc, index) => (
                                  <li
                                    key={index}
                                    className="dropdown-item"
                                    data-value={loc.LocationName}
                                    onClick={handleCresteSRLocationChange}
                                  >
                                    {loc.LocationName}
                                  </li>
                                )) : ""}
                              </ul>
                            </div>
                          </div>
                          <div className="newSR-selector">
                          
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom newSR-select-custom dropdown-toggle rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <span className="textValue" id="location">
                                    {selectAreaNameSr ? selectAreaNameSr : "Location"}
                                  </span>
                                </div>
                              </div>
                              <ul className="dropdown-menu">
                                {uniqueAreaListcreateSr ? uniqueAreaListcreateSr.map((area, index) => (

                                  <li
                                    key={index}
                                    className="dropdown-item"
                                    data-value={area.AreaName}
                                    onClick={handleAreaNameChangeCreateSr}
                                  >
                                    {area.AreaName}
                                  </li>
                                )) : ""}
                              </ul>
                            </div>
                          </div>
                          <div className="newSR-selector">
                        
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom newSR-select-custom dropdown-toggle rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <span className="textValue disabled filter-value" id="productName">
                                    {selectedSegmentcreateSr ? selectedSegmentcreateSr : "Product name"}
                                  </span>
                                </div>
                              </div>
                              <ul className="dropdown-menu">

                                {segmentDropDownValuecreateSr ? segmentDropDownValuecreateSr.map((product, index) => (
                                  <li
                                    key={index}
                                    className="dropdown-item"
                                    data-value={product.CanId}
                                    onClick={handleSegmentCreateSrChange}
                                  >
                                    {product.SegmentName} ({product.CanId})
                                  </li>
                                )) : ""}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div> */}
                        <div className="admin-panel-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
                          <div className="heading account-detail-banner-heading d-flex align-items-center">
                            <p className="m-0">New Service Request</p>
                            {/* <span>CAN ID: 12345</span> */}
                            {!flagcanid && (
                              <span>Service ID: {getPinnedClickedData ? getPinnedClickedData.CanId : localStorage.getItem('credentialKey')}</span>
                            )}
                            {flagcanid && (
                              <span>Service ID: {selectedfinalcanid}</span>
                            )}
                          </div>
                          <div className="d-flex flex-row align-items-center gap-3 flex-wrap ">
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom dropdown-toggle select4-custom rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                {selectedLocCreateSr ? selectedLocCreateSr : getPinnedClickedData ? getPinnedClickedData.LocationName : getLogInLocation ? getLogInLocation : "Select City"}
                                {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) && getLogInLocation} */}
                              </div>
                              <ul className="dropdown-menu">

                                {(crmRole === "L2") ? locationList && locationList.map((loc, index) => (
                                  <li
                                    key={index}
                                    className="dropdown-item"
                                    data-value={loc.LocationName}
                                    onClick={handleCresteSRLocationChange}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {loc.LocationName}
                                  </li>
                                )) :
                                  <li
                                    // key={index}
                                    className="dropdown-item"
                                    // data-value={loc.LocationName}
                                    // onClick={handleCresteSRLocationChange}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {getLogInLocation}
                                  </li>}
                              </ul>
                            </div>
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom dropdown-toggle select4-custom rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <span className="textValue">
                                  {selectAreaNameSr ? selectAreaNameSr : getPinnedClickedData && getLogInFlagC ? getPinnedClickedData.AreaName : getLogInFlagC ? getLogInArea : "Select Location"}
                                  {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) && getLogInArea} */}
                                </span>
                              </div>
                              <ul className="dropdown-menu">
                                {/* <li className="dropdown-item" data-value="HSR Layout">
                                HSR Layout
                              </li> */}
                                {(crmRole === "L2") ? uniqueAreaListcreateSr && uniqueAreaListcreateSr.map((area, index) => (

                                  <li
                                    key={index}
                                    className="dropdown-item"
                                    data-value={area.AreaName}
                                    onClick={handleAreaNameChangeCreateSr}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {area.AreaName}
                                  </li>
                                )) :
                                  <li
                                    // key={index}
                                    className="dropdown-item"
                                    // data-value={loc.LocationName}
                                    // onClick={handleCresteSRLocationChange}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {getLogInArea}
                                  </li>}
                              </ul>
                            </div>
                            {/* Product selection dropdown */}
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom dropdown-toggle rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  {/* <img src="./images/product-icon.svg" alt="" /> */}
                                  <span className="textValue">
                                    {selectedSegmentcreateSr ? selectedSegmentcreateSr : getPinnedClickedData && getLogInFlagC ? getPinnedClickedData.SegmentName + " (" + getPinnedClickedData.CanId + ")" : getLogInFlagC ? getLogInSegment + " (" + getLogInCanId + ")" : "Product name"}
                                    {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) && getLogInSegment} */}
                                  </span>
                                </div>
                              </div>
                              <ul className="dropdown-menu">
                                {/* <li className="dropdown-item" data-value="MBIA">
                                MBIA
                              </li> */}
                                {(crmRole === "L2") ? segmentDropDownValuecreateSr && segmentDropDownValuecreateSr.map((product, index) => (
                                  <li
                                    key={index}
                                    className="dropdown-item"
                                    data-value={product.CanId}
                                    onClick={handleSegmentCreateSrChange}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {product.SegmentName} ({product.CanId})
                                  </li>
                                )) :
                                  <li
                                    // key={index}
                                    className="dropdown-item"
                                    // data-value={loc.LocationName}
                                    // onClick={handleCresteSRLocationChange}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {getLogInSegment + " (" + getLogInCanId + ")"}
                                  </li>}
                              </ul>
                            </div>
                          </div>
                        </div>


                        <div className="admin-panel-data pb-5">
                          {!isLoading ? (
                            <>
                              <div className="request-issue heading pb-4 pt-2">
                                Please select the issue:
                              </div>

                              <div className="row option_container custom-multiline option-inline form-mb">

                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                                  {/* <label class="request-issue" for="issue1">
                            <input type="radio" id="issue1" name="issues">
                            Internet not working
                          </label> */}
                                  <label className="request-issue" htmlFor="issue1">
                                    <input type="radio" value={caseName.length > 0 ? caseName[0].case_type : ""}
                                      // onChange={handleRadioChange} 
                                      onClick={chatBoxClick}
                                      name="issues" required="" id="issue1" />
                                    <p className="caption">{caseName.length > 0 ? caseName[0].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                                  <label className="request-issue" htmlFor="issue2">
                                    <input type="radio" value={caseName.length > 0 ? caseName[4].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="issue2" />
                                    <p className="caption">{caseName.length > 0 ? caseName[4].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                                  <label className="request-issue" htmlFor="issue3">
                                    <input type="radio" value={caseName.length > 0 ? caseName[6].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="issue3" />
                                    <p className="caption">{caseName.length > 0 ? caseName[6].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">


                                  <label className="request-issue" htmlFor="issue5">
                                    <input type="radio" value={caseName.length > 0 ? caseName[2].case_type : ""}
                                      // onChange={handleRadioChange} 
                                      onClick={chatBoxClick}
                                      name="issues" required="" id="issue5" />
                                    <p className="caption">{caseName.length > 0 ? caseName[2].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                                  <label className="request-issue" htmlFor="issue7">
                                    <input type="radio" value={caseName.length > 0 ? caseName[5].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="issue7" />
                                    <p className="caption">{caseName.length > 0 ? caseName[5].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                  {/* <label className="request-issue" htmlFor="issue5">
                                    <input type="radio" value={caseName.length > 0 ? caseName[2].case_type : ""} 
                                    // onChange={handleRadioChange} 
                                    onClick={chatBoxClick}
                                    name="issues" required="" id="issue5" />
                                    <p className="caption">{caseName.length > 0 ? caseName[2].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label> */}
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2 order-1 order-lg-0">
                                  {/* <label class="request-issue" for="other-issue" id="other">
                            <input type="radio" id="other-issue" name="issues">
                            Other
                          </label> */}
                                  <label className="request-issue" htmlFor="other-issue" id="other">
                                    <input type="radio" value={caseName.length > 0 ? caseName[7].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="other-issue" />
                                    <p className="caption">{caseName.length > 0 ? caseName[7].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                                  <label className="request-issue" htmlFor="issue4">
                                    <input type="radio" value={caseName.length > 0 ? caseName[1].case_type : ""}
                                      // onChange={handleRadioChange} 
                                      onClick={chatBoxClick}
                                      name="issues" required="" id="issue4" />
                                    <p className="caption">{caseName.length > 0 ? caseName[1].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                  {/* <label className="request-issue" htmlFor="issue7">
                                    <input type="radio" value={caseName.length > 0 ? caseName[5].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="issue7" />
                                    <p className="caption">{caseName.length > 0 ? caseName[5].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label> */}
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                                  <label className="request-issue" htmlFor="issue8">
                                    <input type="radio" value={caseName.length > 0 ? caseName[3].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="issue8" />
                                    <p className="caption">{caseName.length > 0 ? caseName[3].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>

                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2 order-1 order-lg-0">
                                  {/* <label class="request-issue" for="other-issue" id="other">
                            <input type="radio" id="other-issue" name="issues">
                            Other
                          </label> */}
                                  <label className="request-issue" htmlFor="other-issue1" id="other1">
                                    <input type="radio" value={caseName.length > 0 ? caseName[7].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="other-issue1" />
                                    <p className="caption">{caseName.length > 0 ? caseName[8].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>


                                {showSpecification &&
                                  <><div className="" id="specification" >
                                    <div className="request-issue heading pb-3 pt-4">
                                      Description
                                    </div>
                                    <textarea
                                      id="req-textarea"
                                      className="req-textarea"
                                      name="req-textarea"
                                      rows={3}
                                      cols={50}
                                      placeholder="Type here"
                                      defaultValue={""}
                                      onChange={handleTextValue}
                                    />
                                  </div>
                                    <div class="" id="contactDetails" >
                                      <div class="request-issue heading pb-3 pt-4">Please share your alternate contact details</div>
                                      <textarea id="req-textarea2" class="req-textarea" name="req-textarea" rows={3} cols={25}
                                        placeholder="Type here" defaultValue={""}
                                        onChange={handleContactValue}></textarea>
                                    </div>
                                  </>
                                }

                              </div>
                            </>
                          ) : (
                            <div className="text-center">
                              <div className="spinner">Loading, Please wait</div>
                            </div>
                          )}
                        </div>

                        <div className="newSR-request-footer d-flex align-items-center justify-content-between">
                          {/* <div class="admin-back-btn d-flex align-items-center justify-content-center gap-2">
                    <img src="./images/admin-back-arrow.svg" alt="">Back
                  </div> */}
                          <div />
                          {!isLoading && <button className="newSR-request-btn" onClick={handleSubmit} id="req-submitBtn" disabled={isSubmitDisabled}>
                            submit
                          </button>}
                        </div>
                      </div>


                    </div>

                    <div class="sr-bot">
                      <div class="help-box d-none">
                        <iframe
                          class="help-box"
                          style={{ backgroundColor: 'white' }}
                          src={`https://web.powerva.microsoft.com/environments/0dd3532b-98c0-e41f-8b03-270bee4632d1/bots/crd2f_spectraQuerySolutions/webchat?CAN_ID=${selectedfinalcanid ? selectedfinalcanid : serviceID}&CAN_ID_SS=${selectedfinalcanid ? selectedfinalcanid : serviceID}&CAN_ID_FF=${selectedfinalcanid ? selectedfinalcanid : serviceID}`}
                          frameborder="0"
                          width="500"
                          height="445"
                        >
                        </iframe>
                        {/* <h3>Welcome to My Spectra! 👋</h3>
                    <p>How can we help?</p>
                    <button type="button">Chat with a Human</button>
                    <button type="button">Contact Sales</button>
                    <button type="button">FAQs</button> */}
                      </div>
                      <button id="chat-btn" class=""
                        // onClick={handleChatBox}
                        onClick={chatBoxClick}
                      >
                        {/* > */}
                        {/* <img src={chatcircle2} alt="" /> */}
                      </button>
                    </div>

                  </div>
                </div>
                {/* FOOTER START  */}
                <Footer />
              </div>
            </div>
          </div>
        </div>

      </section>

    )
  }


  if (crmRole === "L3") {
    return (
      <section className="section-dashboard">
        <div className>
          {/* <ToastContainer /> */}
          {/* <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-title"
        className='modal-style'
      >
       <Box className='modal-content'>
          <IconButton
            aria-label="close"
            onClick={() => setShowModal(false)}
            size="small"
            className="close-button"
          >
            <CloseIcon />
          </IconButton >
          <Typography variant="body1">{message}</Typography>
        </Box>
      </Modal> */}
          <div className="d-flex justify-content-end">
            {/* SIDE NAVBAR  */}
            <SideBar />
            {/* top header */}
            <HeaderHbb />
            {/* {segment != "HBB" && <Header />}
            {segment == "HBB" && <HeaderHbb />} */}
            {/* Service Request  */}
            <div className="dashboard-main">
              <div className="dashboard-content">
                {/* Navigation tabs: Account details, Billing details, User management */}
                <ul className="nav nav-pills mb-3 account-tab-list" id="pills-tab" role="tablist">
                  {/* <li class="nav-item" role="presentation">
              <button class="nav-link account-tab-btn"></button>
          </li> */}
                  <li className="nav-item" role="presentation" >
                    <button className={actTabAcc} id="pills-srStatus-tab" data-bs-toggle="pill" data-bs-target="#pills-srStatus" type="button" role="tab" aria-controls="pills-srStatus" aria-selected="true">SR Status</button>
                  </li>
                  {segment != "Hotel" && segment != "PG" && segment != "Office" &&
                    <li className="nav-item" role="presentation">
                      <button className={actTabBill} id="pills-raiseNewSR-tab" data-bs-toggle="pill" data-bs-target="#pills-raiseNewSR" type="button" role="tab" aria-controls="pills-raiseNewSR" aria-selected="false">Raise SR</button>
                    </li>
                  }
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  {/* ****************** SR STATUS TAB ************* */}
                  <div className={actAcc} id="pills-srStatus" role="tabpanel" aria-labelledby="pills-srStatus-tab">
                    <div id="billing-detail-table">
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="account-tab-heading">SR Status</div>
                      </div>
                      <div className="">
                        {/* SR Status Table  */}
                        <div id="invoice-table" className="account-table-container">
                          {/* top banner with company name and fitlers */}
                          <div className="table-top-bar d-flex align-items-center justify-content-between flex-wrap gap-3">
                            {/* <div className="table-name flex-grow-1 table-name-span">Requests <span>CAN ID: {localStorage.getItem("credentialKey")}</span></div> */}
                            <div class="table-name flex-grow-1 table-name-span d-flex align-items-center">
                              <p class="m-0">Requests</p>
                              <span>Service ID:
                                {getPinnedClickedData ? getPinnedClickedData.CanId : selectedcanidToFilter ? selectedcanidToFilter : localStorage.getItem("credentialKey")}
                              </span>
                            </div>
                            <div className="d-flex align-items-center gap-3 flex-wrap">
                              {/* Location selection dropdown */}
                              <div className="dropdown spectra-dropdown select-dropdown">
                                <div
                                  className="select-custom dropdown-toggle rounded-0"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  role="button"
                                >
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {(crmRole === "L2" && segment !== "OBB") &&
                                      (<span className="textValue">{location ? location : getPinnedClickedData && !allCityFlag ? getPinnedClickedData.LocationName : getLogInFlag ? getLogInLocation : 'Select City'}
                                      </span>)}

                                    {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                      (<span className="textValue">{getLogInLocation}</span>)}
                                  </div>
                                </div>
                                <ul className="dropdown-menu">
                                  {(crmRole === "L2" && segment !== "OBB") && <li
                                    className="dropdown-item"
                                    data-value="All City"
                                    onClick={handleLocationChange}
                                    style={{ fontSize: "14px" }}
                                  >
                                    All City
                                  </li>}
                                  {(crmRole === "L2" && segment !== "OBB") && locationList && locationList.map((loc, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      data-value={loc.LocationName}
                                      onClick={handleLocationChange}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {loc.LocationName}
                                    </li>
                                  ))}
                                  {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                    <li className="dropdown-item" style={{ fontSize: "14px" }}>
                                      {getLogInLocation}
                                    </li>
                                  }

                                </ul>
                              </div>
                              {/* Address selection dropdown */}
                              <div className="dropdown spectra-dropdown select-dropdown">
                                <div
                                  className="select-custom dropdown-toggle rounded-0"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  role="button"
                                >
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {(getLogInSegment !== "OBB" && getLogInSegment !== "HBB") &&
                                      <span className="textValue">{selectedAreaName ? selectedAreaName : getPinnedClickedData ? getPinnedFlag ? "Select Area" : getPinnedClickedData.AreaName : getLogInFlag ? getLogInArea : "Select Area"}</span>}

                                    {(getLogInSegment === "OBB" || getLogInSegment === "HBB") &&
                                      (<span className="textValue">{getLogInArea}</span>)}
                                  </div>
                                </div>
                                <ul className="dropdown-menu">
                                  {(crmRole === "L2" && segment !== "OBB") && uniqueAreaList ? uniqueAreaList.map((area, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      data-value={area.AreaName}
                                      onClick={handleAreaNameChange}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {area.AreaName}
                                    </li>
                                  )) : ""}

                                  {(crmRole === "L2" && segment !== "OBB") && uniqueAreaListDeafault && !uniqueAreaList && uniqueAreaListDeafault.map((area, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      data-value={area}
                                      onClick={handleAreaNameChange}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {area}
                                    </li>
                                  ))}
                                  {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                    <li className="dropdown-item" style={{ fontSize: "14px" }}>
                                      {getLogInArea}
                                    </li>
                                  }


                                </ul>
                              </div>
                              {/* Product selection dropdown */}
                              <div className="dropdown spectra-dropdown select-dropdown">
                                <div
                                  className="select-custom dropdown-toggle rounded-0"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  role="button"
                                >
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={productIcon} alt="" />
                                    {(getLogInSegment !== "OBB" && getLogInSegment !== "HBB") &&
                                      <span className="textValue">{selectedSegment ? selectedSegment : getPinnedClickedData ? getPinnedFlag ? "Select Product" : getPinnedClickedData.SegmentName + " (" + getPinnedClickedData.CanId + ")" : getLogInFlag ? getLogInSegment + " (" + getLogInCanId + ")" : "Select Product"}</span>}
                                    {(getLogInSegment === "OBB" || getLogInSegment === "HBB") &&
                                      (<span className="textValue">{getLogInSegment + " (" + getLogInCanId + ")"}</span>)}
                                  </div>
                                </div>
                                <ul className="dropdown-menu">
                                  {(crmRole === "L2" && segment !== "OBB") && segmentDropDownValue && segmentDropDownValue.map((product, index) => (
                                    <li
                                      key={index}
                                      className="dropdown-item"
                                      data-value={product.CanId}
                                      onClick={handleSegmentChange}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {product.SegmentName} ({product.CanId})
                                    </li>
                                  ))}
                                  {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                    <li className="dropdown-item" style={{ fontSize: "14px" }}>
                                      {getLogInSegment + " (" + getLogInCanId + ")"}
                                    </li>
                                  }
                                </ul>
                              </div>
                              {/* Date range picker */}
                              {/* <div className="spectra-dropdown">
                              <div className="select-custom dropdown-toggle rounded-0" id="reportrange">
                                <div className="d-flex align-items-center gap-2">
                    
                                  <img src={iconcalendar} alt="" />
                                  <span>Today </span>
                                </div>
         

                              </div>
                            </div> */}
                              <div className="spectra-dropdown">
                                <div
                                  className="select-custom dropdown-toggle rounded-0"
                                // id="reportrange"
                                // ref={datePickerRef}
                                // onClick={handleDropdownChange}
                                >
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={iconcalendar} alt="" />
                                    {/* <span>Today </span> */}

                                    <DateRangePicker
                                      initialSettings={{
                                        // startDate: selectedRange.startDate,
                                        // endDate: selectedRange.endDate,
                                        ranges: {
                                          All: [moment().subtract(100, 'years'), moment()],
                                          Today: [moment(), moment()],
                                          Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                                          'Current Month': [moment().startOf('month'), moment().endOf('month')]
                                        },
                                        maxDate: new Date()
                                      }}
                                      onApply={handleDateRangeChange}
                                    >
                                      <span
                                        type="text"
                                        className=""
                                        value={selectedRange}
                                      >{selectedRange}</span>
                                    </DateRangePicker>
                                  </div>
                                </div>
                                {/* <div>Selected Date Range: {selectedDateRange}</div> */}


                              </div>
                            </div>

                          </div>
                          {/* Display data as table on large screen devices */}
                          <div className="horizontal-scroll-container d-md-block d-none">

                            <table className="account-table">
                              <tbody><tr className="table-header">
                                {/* <th className="table-header-data">service ID</th> */}
                                <th className="table-header-data">SR Number</th>
                                <th className="table-header-data">Category</th>
                                <th className="table-header-data">Sub Category</th>
                                <th className="table-header-data">Source</th>
                                <th className="table-header-data">Last Update Date</th>
                                <th className="table-header-data">Status</th>
                              </tr>

                                {/* for Pinned Feature Click */}
                                {(getPinnedSRLists && !filterSrData && getPinnedSRLists.length > 0) ? (getPinnedSRLists.map((row, index) => (

                                  <tr key={index} className="table-row">
                                    {/* <td className="table-row-data">{row.CanId}</td> */}
                                    <td className="table-row-data">{row.SRNumber}</td>
                                    <td className="table-row-data">{row.Category}</td>
                                    <td className="table-row-data">{row.SubCategory}</td>
                                    <td className="table-row-data">{row.Source}</td>
                                    <td className="table-row-data">
                                      {(() => {
                                        const lastUpdateDateParts = row.LastUpdateDate.split(/\/|\s|:/);
                                        const day = parseInt(lastUpdateDateParts[0]);
                                        const month = parseInt(lastUpdateDateParts[1]) - 1; // Months are zero-indexed
                                        const year = parseInt(lastUpdateDateParts[2]);
                                        const hour = parseInt(lastUpdateDateParts[3]);
                                        const minute = parseInt(lastUpdateDateParts[4]);
                                        const date = new Date(year, month, day, hour, minute);

                                        const formattedMonth = date.toLocaleString('default', { month: 'short' });
                                        const formattedYear = date.toLocaleString('default', { year: '2-digit' });

                                        return `${day} ${formattedMonth}'${formattedYear}`;
                                      })()}
                                    </td>
                                    {/* <td className="table-row-data">
                                      
                                      {(() => {
                                        const statusText =
                                          row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                            ? "Open"
                                            : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                              ? "Closed"
                                              : row.status;
                                        return <div className="status-active-btn">{statusText}</div>;
                                      })()}
                                    </td> */}
                                    <td className="table-row-data">
                                      {(() => {
                                        const statusText =
                                          row.status === "In Progress" ||
                                            row.status === "On Hold - SLA clock Stop" ||
                                            row.status === "Waiting for Information"
                                            ? "Open"
                                            : row.status === "Resolved - Not Contacted" ||
                                              row.status === "Resolved - Contacted" ||
                                              row.status === "Duplicate Merged"
                                              ? "Closed"
                                              : row.status;

                                        const statusClassName =
                                          statusText === "Open" ? "status-red" : "status-green";

                                        return <div className={`status-active-btn ${statusClassName}`}>{statusText}</div>;
                                      })()}
                                    </td>
                                  </tr>

                                ))
                                ) : (!srList && getPinnedSRLists && !flagCheck && (getPinnedSRLists.length === 0) ? (
                                  <tr className="table-row">
                                    <td className="table-row-data" colSpan={6} style={{ textAlign: "center" }}>No Service Requests</td>
                                  </tr>
                                ) : null)}

                                {/* for Default */}
                                {!getPinnedSRLists && (srList && srList.length > 0 && !flagCheck) ? (srList.map((row, index) => (

                                  <tr key={index} className="table-row">
                                    {/* <td className="table-row-data">{row.CanId}</td> */}
                                    <td className="table-row-data">{row.SRNumber}</td>
                                    <td className="table-row-data">{row.Category}</td>
                                    <td className="table-row-data">{row.SubCategory}</td>
                                    <td className="table-row-data">{row.Source}</td>
                                    <td className="table-row-data">
                                      {(() => {
                                        const lastUpdateDateParts = row.LastUpdateDate.split(/\/|\s|:/);
                                        const day = parseInt(lastUpdateDateParts[0]);
                                        const month = parseInt(lastUpdateDateParts[1]) - 1; // Months are zero-indexed
                                        const year = parseInt(lastUpdateDateParts[2]);
                                        const hour = parseInt(lastUpdateDateParts[3]);
                                        const minute = parseInt(lastUpdateDateParts[4]);
                                        const date = new Date(year, month, day, hour, minute);

                                        const formattedMonth = date.toLocaleString('default', { month: 'short' });
                                        const formattedYear = date.toLocaleString('default', { year: '2-digit' });
                                        return `${day} ${formattedMonth}'${formattedYear}`;
                                      })()}
                                    </td>
                                    {/* <td className="table-row-data">
                                     
                                      {(() => {
                                        const statusText =
                                          row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                            ? "Open"
                                            : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                              ? "Closed"
                                              : row.status;
                                        return <div className="status-active-btn">{statusText}</div>;
                                      })()}
                                    </td> */}
                                    <td className="table-row-data">
                                      {(() => {
                                        const statusText =
                                          row.status === "In Progress" ||
                                            row.status === "On Hold - SLA clock Stop" ||
                                            row.status === "Waiting for Information"
                                            ? "Open"
                                            : row.status === "Resolved - Not Contacted" ||
                                              row.status === "Resolved - Contacted" ||
                                              row.status === "Duplicate Merged"
                                              ? "Closed"
                                              : row.status;

                                        const statusClassName =
                                          statusText === "Open" ? "status-red" : "status-green";

                                        return <div className={`status-active-btn ${statusClassName}`}>{statusText}</div>;
                                      })()}
                                    </td>
                                  </tr>

                                ))
                                ) : (srList && srList.length === 0 && !flagCheck) ? (
                                  <tr className="table-row">
                                    <td className="table-row-data" colSpan={6} style={{ textAlign: "center" }}>No Service Requests</td>
                                  </tr>
                                ) : null}

                                {/* for Dropdown Selection */}
                                {flagCheck && (filterSrData && filterSrData.length > 0) ? (filterSrData.map((row, index) => (
                                  <tr key={index} className="table-row">
                                    {/* <td className="table-row-data">{row.CanId}</td> */}
                                    <td className="table-row-data">{row.SRNumber}</td>
                                    <td className="table-row-data">{row.Category}</td>
                                    <td className="table-row-data">{row.SubCategory}</td>
                                    <td className="table-row-data">{row.Source}</td>
                                    <td className="table-row-data">
                                      {(() => {
                                        const lastUpdateDateParts = row.LastUpdateDate.split(/\/|\s|:/);
                                        const day = parseInt(lastUpdateDateParts[0]);
                                        const month = parseInt(lastUpdateDateParts[1]) - 1; // Months are zero-indexed
                                        const year = parseInt(lastUpdateDateParts[2]);
                                        const hour = parseInt(lastUpdateDateParts[3]);
                                        const minute = parseInt(lastUpdateDateParts[4]);
                                        const date = new Date(year, month, day, hour, minute);

                                        const formattedMonth = date.toLocaleString('default', { month: 'short' });
                                        const formattedYear = date.toLocaleString('default', { year: '2-digit' });

                                        return `${day} ${formattedMonth}'${formattedYear}`;
                                      })()}
                                    </td>
                                    {/* <td className="table-row-data">
                                    
                                      {(() => {
                                        const statusText =
                                          row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                            ? "Open"
                                            : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                              ? "Closed"
                                              : row.status;
                                        return <div className="status-active-btn">{statusText}</div>;
                                      })()}
                                    </td> */}
                                    <td className="table-row-data">
                                      {(() => {
                                        const statusText =
                                          row.status === "In Progress" ||
                                            row.status === "On Hold - SLA clock Stop" ||
                                            row.status === "Waiting for Information"
                                            ? "Open"
                                            : row.status === "Resolved - Not Contacted" ||
                                              row.status === "Resolved - Contacted" ||
                                              row.status === "Duplicate Merged"
                                              ? "Closed"
                                              : row.status;

                                        const statusClassName =
                                          statusText === "Open" ? "status-red" : "status-green";

                                        return <div className={`status-active-btn ${statusClassName}`}>{statusText}</div>;
                                      })()}
                                    </td>
                                  </tr>

                                ))
                                ) : (filterSrData && filterSrData.length === 0 && flagCheck) ? (
                                  <tr className="table-row">
                                    <td className="table-row-data" colSpan={6} style={{ textAlign: "center" }}>No Service Requests</td>
                                  </tr>
                                ) : null}
                              </tbody></table>

                          </div>

                          {/* Display data as cards on small screens */}

                          <div className="d-block d-md-none">
                            {/* for Pinned Feature Click */}
                            {(getPinnedSRLists && !filterSrData && getPinnedSRLists.length > 0) ? (getPinnedSRLists.map((row, index) => (
                              <div key={index} className="table-content">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="table-row-data resp-name">{row.SRNumber}</div>
                                  <div className="table-row-data dueAmount">
                                    {/* <div className="status-active-btn">{row.status}</div> */}
                                    {(() => {
                                      const statusText =
                                        row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                          ? "Open"
                                          : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                            ? "Closed"
                                            : row.status;
                                      const statusClassName =
                                        statusText === "Open" ? "status-red" : "status-green";
                                      return <div className={`status-active-btn ${statusClassName}`}>{statusText}</div>;
                                    })()}
                                  </div>
                                </div>
                                <div className="table-row-data email">
                                  <div className="italic">Last Updated:
                                    {(() => {
                                      const lastUpdateDateParts = row.LastUpdateDate.split(/\/|\s|:/);
                                      const day = parseInt(lastUpdateDateParts[0]);
                                      const month = parseInt(lastUpdateDateParts[1]) - 1; // Months are zero-indexed
                                      const year = parseInt(lastUpdateDateParts[2]);
                                      const hour = parseInt(lastUpdateDateParts[3]);
                                      const minute = parseInt(lastUpdateDateParts[4]);
                                      const date = new Date(year, month, day, hour, minute);

                                      const formattedMonth = date.toLocaleString('default', { month: 'short' });
                                      const formattedYear = date.toLocaleString('default', { year: '2-digit' });

                                      return `${day} ${formattedMonth}'${formattedYear}`;
                                    })()}
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Category</div>
                                    <div className="resp-contact">{row.Category}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Sub Category</div>
                                    <div className="resp-contact">{row.SubCategory}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Source</div>
                                    <div className="resp-contact">{row.Source}</div>
                                  </div>
                                </div>
                              </div>
                            ))
                            ) : (!srList && getPinnedSRLists && !flagCheck && (getPinnedSRLists.length === 0)) ? (
                              <tr>
                                <td colSpan={6}>No Service Requests</td>
                              </tr>
                            ) : null}

                            {/* for Default */}
                            {!getPinnedSRLists && (srList && srList.length > 0 && !flagCheck) ? (srList.map((row, index) => (
                              <div key={index} className="table-content">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="table-row-data resp-name">{row.SRNumber}</div>
                                  <div className="table-row-data dueAmount">
                                    {/* <div className="status-active-btn">{row.status}</div> */}
                                    {(() => {
                                      const statusText =
                                        row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                          ? "Open"
                                          : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                            ? "Closed"
                                            : row.status;
                                      const statusClassName =
                                        statusText === "Open" ? "status-red" : "status-green";
                                      return <div className={`status-active-btn ${statusClassName}`}>{statusText}</div>;
                                    })()}
                                  </div>
                                </div>
                                <div className="table-row-data email">
                                  <div className="italic">Last Updated:
                                    {(() => {
                                      const lastUpdateDateParts = row.LastUpdateDate.split(/\/|\s|:/);
                                      const day = parseInt(lastUpdateDateParts[0]);
                                      const month = parseInt(lastUpdateDateParts[1]) - 1; // Months are zero-indexed
                                      const year = parseInt(lastUpdateDateParts[2]);
                                      const hour = parseInt(lastUpdateDateParts[3]);
                                      const minute = parseInt(lastUpdateDateParts[4]);
                                      const date = new Date(year, month, day, hour, minute);

                                      const formattedMonth = date.toLocaleString('default', { month: 'short' });
                                      const formattedYear = date.toLocaleString('default', { year: '2-digit' });

                                      return `${day} ${formattedMonth}'${formattedYear}`;
                                    })()}
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Category</div>
                                    <div className="resp-contact">{row.Category}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Sub Category</div>
                                    <div className="resp-contact">{row.SubCategory}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Source</div>
                                    <div className="resp-contact">{row.Source}</div>
                                  </div>
                                </div>
                              </div>
                            ))
                            ) : (srList && srList.length == 0 && !flagCheck) ? (
                              <tr>
                                <td colSpan={6}>No Service Requests</td>
                              </tr>
                            ) : null}

                            {/* for Dropdown Selection */}
                            {flagCheck && (filterSrData && filterSrData.length > 0) ? (filterSrData.map((row, index) => (
                              <div key={index} className="table-content">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="table-row-data resp-name">{row.SRNumber}</div>
                                  <div className="table-row-data dueAmount">
                                    {/* <div className="status-active-btn">{row.status}</div> */}
                                    {(() => {
                                      const statusText =
                                        row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                          ? "Open"
                                          : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                            ? "Closed"
                                            : row.status;
                                      const statusClassName =
                                        statusText === "Open" ? "status-red" : "status-green";
                                      return <div className={`status-active-btn ${statusClassName}`}>{statusText}</div>;
                                    })()}
                                  </div>
                                </div>
                                <div className="table-row-data email">
                                  <div className="italic">Last Updated:
                                    {(() => {
                                      const lastUpdateDateParts = row.LastUpdateDate.split(/\/|\s|:/);
                                      const day = parseInt(lastUpdateDateParts[0]);
                                      const month = parseInt(lastUpdateDateParts[1]) - 1; // Months are zero-indexed
                                      const year = parseInt(lastUpdateDateParts[2]);
                                      const hour = parseInt(lastUpdateDateParts[3]);
                                      const minute = parseInt(lastUpdateDateParts[4]);
                                      const date = new Date(year, month, day, hour, minute);

                                      const formattedMonth = date.toLocaleString('default', { month: 'short' });
                                      const formattedYear = date.toLocaleString('default', { year: '2-digit' });

                                      return `${day} ${formattedMonth}'${formattedYear}`;
                                    })()}
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Category</div>
                                    <div className="resp-contact">{row.Category}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Sub Category</div>
                                    <div className="resp-contact">{row.SubCategory}</div>
                                  </div>
                                  <div className="table-row-data">
                                    <div className="resp-innerHeading">Source</div>
                                    <div className="resp-contact">{row.Source}</div>
                                  </div>
                                </div>
                              </div>
                            ))
                            ) : (filterSrData && filterSrData.length == 0 && flagCheck) ? (
                              <tr>
                                <td colSpan={6}>No Service Requests</td>
                              </tr>
                            ) : null}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ****************** RASE NEW SR TAB ************* */}

                  <div
                    className={actBill}
                    id="pills-raiseNewSR"
                    role="tabpanel"
                    aria-labelledby="pills-raiseNewSR-tab"
                  >

                    <div id="billing-detail-admin">
                      <div className="account-tab-heading mb-3">Raise a new SR</div>
                      <div className="admin-panel-wrapper account-tab-container">
                        {/* <div className="admin-panel-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
                        <div className="heading account-detail-banner-heading d-flex align-items-center">
                          <p className="m-0">New Service Request</p>
                          {!flagcanid && (
                            <span>CAN ID: {localStorage.getItem('credentialKey')}</span>
                          )}
                          {flagcanid && (
                            <span>CAN ID: {selectedfinalcanid}</span>
                          )}

                        </div>

                      </div> */}

                        {/* <div className="admin-panel-data selector-row">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-4">
                          <div className="newSR-selector">
                          
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom newSR-select-custom dropdown-toggle rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <span className="textValue" id="city">
                                    {selectedLocCreateSr ? selectedLocCreateSr : "City"}
                                  </span>
                                </div>
                              </div>
                              <ul className="dropdown-menu">
                                {locationList ? locationList.map((loc, index) => (
                                  <li
                                    key={index}
                                    className="dropdown-item"
                                    data-value={loc.LocationName}
                                    onClick={handleCresteSRLocationChange}
                                  >
                                    {loc.LocationName}
                                  </li>
                                )) : ""}
                              </ul>
                            </div>
                          </div>
                          <div className="newSR-selector">
                          
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom newSR-select-custom dropdown-toggle rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <span className="textValue" id="location">
                                    {selectAreaNameSr ? selectAreaNameSr : "Location"}
                                  </span>
                                </div>
                              </div>
                              <ul className="dropdown-menu">
                                {uniqueAreaListcreateSr ? uniqueAreaListcreateSr.map((area, index) => (

                                  <li
                                    key={index}
                                    className="dropdown-item"
                                    data-value={area.AreaName}
                                    onClick={handleAreaNameChangeCreateSr}
                                  >
                                    {area.AreaName}
                                  </li>
                                )) : ""}
                              </ul>
                            </div>
                          </div>
                          <div className="newSR-selector">
                        
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom newSR-select-custom dropdown-toggle rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <span className="textValue disabled filter-value" id="productName">
                                    {selectedSegmentcreateSr ? selectedSegmentcreateSr : "Product name"}
                                  </span>
                                </div>
                              </div>
                              <ul className="dropdown-menu">

                                {segmentDropDownValuecreateSr ? segmentDropDownValuecreateSr.map((product, index) => (
                                  <li
                                    key={index}
                                    className="dropdown-item"
                                    data-value={product.CanId}
                                    onClick={handleSegmentCreateSrChange}
                                  >
                                    {product.SegmentName} ({product.CanId})
                                  </li>
                                )) : ""}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div> */}
                        <div className="admin-panel-header d-flex justify-content-between align-items-center gap-3 flex-wrap">
                          <div className="heading account-detail-banner-heading d-flex align-items-center">
                            <p className="m-0">New Service Request</p>
                            {/* <span>CAN ID: 12345</span> */}
                            {!flagcanid && (
                              <span>Service ID: {getPinnedClickedData ? getPinnedClickedData.CanId : localStorage.getItem('credentialKey')}</span>
                            )}
                            {flagcanid && (
                              <span>Service ID: {selectedfinalcanid}</span>
                            )}
                          </div>
                          <div className="d-flex flex-row align-items-center gap-3 flex-wrap ">
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom dropdown-toggle select4-custom rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                {(crmRole === "L2" && segment !== "OBB") && selectedLocCreateSr ? selectedLocCreateSr : getPinnedClickedData ? getPinnedClickedData.LocationName : getLogInLocation ? getLogInLocation : "Select City"}
                                {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) && getLogInLocation} */}
                              </div>
                              <ul className="dropdown-menu">

                                {(crmRole === "L2" && segment !== "OBB") ? locationList && locationList.map((loc, index) => (
                                  <li
                                    key={index}
                                    className="dropdown-item"
                                    data-value={loc.LocationName}
                                    onClick={handleCresteSRLocationChange}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {loc.LocationName}
                                  </li>
                                )) :
                                  <li
                                    // key={index}
                                    className="dropdown-item"
                                    // data-value={loc.LocationName}
                                    // onClick={handleCresteSRLocationChange}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {getLogInLocation}
                                  </li>}
                              </ul>
                            </div>
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom dropdown-toggle select4-custom rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <span className="textValue">
                                  {(crmRole === "L2" && segment !== "OBB") && selectAreaNameSr ? selectAreaNameSr : getPinnedClickedData && getLogInFlagC ? getPinnedClickedData.AreaName : getLogInFlagC ? getLogInArea : "Select Location"}
                                  {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) && getLogInArea} */}
                                </span>
                              </div>
                              <ul className="dropdown-menu">
                                {/* <li className="dropdown-item" data-value="HSR Layout">
                                HSR Layout
                              </li> */}
                                {(crmRole === "L2" && segment !== "OBB") ? uniqueAreaListcreateSr && uniqueAreaListcreateSr.map((area, index) => (

                                  <li
                                    key={index}
                                    className="dropdown-item"
                                    data-value={area.AreaName}
                                    onClick={handleAreaNameChangeCreateSr}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {area.AreaName}
                                  </li>
                                )) :
                                  <li
                                    // key={index}
                                    className="dropdown-item"
                                    // data-value={loc.LocationName}
                                    // onClick={handleCresteSRLocationChange}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {getLogInArea}
                                  </li>}
                              </ul>
                            </div>
                            {/* Product selection dropdown */}
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom dropdown-toggle rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  {/* <img src="./images/product-icon.svg" alt="" /> */}
                                  <span className="textValue">
                                    {(crmRole === "L2" && segment !== "OBB") && selectedSegmentcreateSr ? selectedSegmentcreateSr : getPinnedClickedData && getLogInFlagC ? getPinnedClickedData.SegmentName + " (" + getPinnedClickedData.CanId + ")" : getLogInFlagC ? getLogInSegment + " (" + getLogInCanId + ")" : "Product name"}
                                    {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) && getLogInSegment} */}
                                  </span>
                                </div>
                              </div>
                              <ul className="dropdown-menu">
                                {/* <li className="dropdown-item" data-value="MBIA">
                                MBIA
                              </li> */}
                                {(crmRole === "L2" && segment !== "OBB") ? segmentDropDownValuecreateSr && segmentDropDownValuecreateSr.map((product, index) => (
                                  <li
                                    key={index}
                                    className="dropdown-item"
                                    data-value={product.CanId}
                                    onClick={handleSegmentCreateSrChange}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {product.SegmentName} ({product.CanId})
                                  </li>
                                )) :
                                  <li
                                    // key={index}
                                    className="dropdown-item"
                                    // data-value={loc.LocationName}
                                    // onClick={handleCresteSRLocationChange}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {getLogInSegment + " (" + getLogInCanId + ")"}
                                  </li>}
                              </ul>
                            </div>
                          </div>
                        </div>


                        <div className="admin-panel-data pb-5">
                          {!isLoading ? (
                            <>
                              <div className="request-issue heading pb-4 pt-2">
                                Please select the issue:
                              </div>

                              <div className="row option_container custom-multiline option-inline form-mb">

                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                                  {/* <label class="request-issue" for="issue1">
                            <input type="radio" id="issue1" name="issues">
                            Internet not working
                          </label> */}
                                  <label className="request-issue" htmlFor="issue1">
                                    <input type="radio" value={caseName.length > 0 ? caseName[0].case_type : ""}
                                      //  onChange={handleRadioChange}
                                      onClick={chatBoxClick}

                                      name="issues" required="" id="issue1" />
                                    <p className="caption">{caseName.length > 0 ? caseName[0].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                                  <label className="request-issue" htmlFor="issue2">
                                    <input type="radio" value={caseName.length > 0 ? caseName[4].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="issue2" />
                                    <p className="caption">{caseName.length > 0 ? caseName[4].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                                  <label className="request-issue" htmlFor="issue3">
                                    <input type="radio" value={caseName.length > 0 ? caseName[6].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="issue3" />
                                    <p className="caption">{caseName.length > 0 ? caseName[6].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                                  {/* <label className="request-issue" htmlFor="issue4">
                                    <input type="radio" value={caseName.length > 0 ? caseName[1].case_type : ""} 
                                    // onChange={handleRadioChange}
                                    onClick={chatBoxClick}
                                     name="issues" required="" id="issue4" />
                                    <p className="caption">{caseName.length > 0 ? caseName[1].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label> */}
                                  <label className="request-issue" htmlFor="issue5">
                                    <input type="radio" value={caseName.length > 0 ? caseName[2].case_type : ""}
                                      // onChange={handleRadioChange} 
                                      onClick={chatBoxClick}
                                      name="issues" required="" id="issue5" />
                                    <p className="caption">{caseName.length > 0 ? caseName[2].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                                  {/* <label className="request-issue" htmlFor="issue5">
                                    <input type="radio" value={caseName.length > 0 ? caseName[2].case_type : ""} 
                                    // onChange={handleRadioChange} 
                                    onClick={chatBoxClick}
                                    name="issues" required="" id="issue5" />
                                    <p className="caption">{caseName.length > 0 ? caseName[2].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label> */}
                                  <label className="request-issue" htmlFor="issue7">
                                    <input type="radio" value={caseName.length > 0 ? caseName[5].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="issue7" />
                                    <p className="caption">{caseName.length > 0 ? caseName[5].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2 order-1 order-lg-0">
                                  {/* <label class="request-issue" for="other-issue" id="other">
                            <input type="radio" id="other-issue" name="issues">
                            Other
                          </label> */}
                                  <label className="request-issue" htmlFor="other-issue" id="other">
                                    <input type="radio" value={caseName.length > 0 ? caseName[7].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="other-issue" />
                                    <p className="caption">{caseName.length > 0 ? caseName[7].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                                  <label className="request-issue" htmlFor="issue4">
                                    <input type="radio" value={caseName.length > 0 ? caseName[1].case_type : ""}
                                      // onChange={handleRadioChange} 
                                      onClick={chatBoxClick}
                                      name="issues" required="" id="issue4" />
                                    <p className="caption">{caseName.length > 0 ? caseName[1].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                  {/* <label className="request-issue" htmlFor="issue7">
                                    <input type="radio" value={caseName.length > 0 ? caseName[5].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="issue7" />
                                    <p className="caption">{caseName.length > 0 ? caseName[5].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label> */}
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                                  <label className="request-issue" htmlFor="issue8">
                                    <input type="radio" value={caseName.length > 0 ? caseName[3].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="issue8" />
                                    <p className="caption">{caseName.length > 0 ? caseName[3].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2 order-1 order-lg-0">
                                  {/* <label class="request-issue" for="other-issue" id="other">
                            <input type="radio" id="other-issue" name="issues">
                            Other
                          </label> */}
                                  <label className="request-issue" htmlFor="other-issue1" id="other1">
                                    <input type="radio" value={caseName.length > 0 ? caseName[7].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="other-issue1" />
                                    <p className="caption">{caseName.length > 0 ? caseName[8].service_request_name : ""}</p>
                                    <span className="dotmark-outer">
                                      <span className="dotmark-inner" />
                                    </span>
                                  </label>
                                </div>

                                {showSpecification &&
                                  <><div className="" id="specification" >
                                    <div className="request-issue heading pb-3 pt-4">
                                      Description
                                    </div>
                                    <textarea
                                      id="req-textarea"
                                      className="req-textarea"
                                      name="req-textarea"
                                      rows={3}
                                      cols={50}
                                      placeholder="Type here"
                                      defaultValue={""}
                                      onChange={handleTextValue}
                                    />
                                  </div>
                                    <div class="" id="contactDetails" >
                                      <div class="request-issue heading pb-3 pt-4">Please share your alternate contact details</div>
                                      <textarea id="req-textarea2" class="req-textarea" name="req-textarea" rows={3} cols={25}
                                        placeholder="Type here" defaultValue={""}
                                        onChange={handleContactValue}></textarea>
                                    </div>
                                  </>
                                }

                              </div>
                            </>
                          ) : (
                            <div className="text-center">
                              <div className="spinner">Loading, Please wait</div>
                            </div>
                          )}
                        </div>

                        <div className="newSR-request-footer d-flex align-items-center justify-content-between">
                          {/* <div class="admin-back-btn d-flex align-items-center justify-content-center gap-2">
                    <img src="./images/admin-back-arrow.svg" alt="">Back
                  </div> */}
                          <div />
                          {!isLoading && <button className="newSR-request-btn" onClick={handleSubmit} id="req-submitBtn" disabled={isSubmitDisabled}>
                            submit
                          </button>}
                        </div>

                      </div>
                    </div>

                    <div class="sr-bot">
                      <div class="help-box d-none">
                        <iframe
                          class="help-box"
                          style={{ backgroundColor: 'white' }}
                          src={`https://web.powerva.microsoft.com/environments/0dd3532b-98c0-e41f-8b03-270bee4632d1/bots/crd2f_spectraQuerySolutions/webchat?CAN_ID=${selectedfinalcanid ? selectedfinalcanid : serviceID}&CAN_ID_SS=${selectedfinalcanid ? selectedfinalcanid : serviceID}&CAN_ID_FF=${selectedfinalcanid ? selectedfinalcanid : serviceID}`}
                          frameborder="0"
                          width="500"
                          height="445"
                        >
                        </iframe>
                        {/* <h3>Welcome to My Spectra! 👋</h3>
                    <p>How can we help?</p>
                    <button type="button">Chat with a Human</button>
                    <button type="button">Contact Sales</button>
                    <button type="button">FAQs</button> */}
                      </div>
                      <button id="chat-btn" class=""
                        // onClick={handleChatBox}
                        onClick={chatBoxClick}
                      >
                        {/* > */}
                        {/* <img src={chatcircle2} alt="" /> */}
                      </button>
                    </div>
                  </div>
                </div>
                {/* FOOTER START  */}
                <Footer />
              </div>
            </div>
          </div>
        </div>

      </section>

    )
  }

}