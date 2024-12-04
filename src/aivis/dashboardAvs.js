import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import HeaderNotification from "../spectra_one_new/HeaderNotification";
import topSearch from "../assets/images/top-search.svg";
import topBell from "../assets/images/top-bell.svg";
import topUserImg from "../assets/images/top-user-img.svg";
import "../assets/css/dashboard.css"
// import userImage from "../assets/images/top-user-img.svg"
// import userImage from "../assets/images/user-icon (2).png" 
import userImage from "../assets/images/gg_profile.png"
import SideBar from './SidebarAvs';
import Header from './headerAvs';
import Footer from '../spectra_one_new/Footer';
import ServiceList from './servicelistAvs';
import ServiceRequestAvs from './ServiceRequestAvs';
import arrowOutward from "../assets/images/arrow-outward.svg"
// blank-profile-picture-973460
import {
  getNotificationByServiceId,
  getUnreadNotification,
  getUnreadNotificationCount,
  updateNotificationAsRead
} from '../function';

export default function HeaderAvs() {
  const [getInvoiceCount, setGetInvoiceCount] = useState();
  const [getGetInvoiceAmount, setGetInvoiceAmount] = useState();
  const [getGetInvoiceDueAmount, setGetInvoiceDueAmount] = useState();
  const [getGetServiceListNotResolved, setGetServiceListNotResolved] = useState();
  const [getGetServiceListResolved, setGetServiceListResolved] = useState();
  const [getServiceListCount, setGetServiceListCount] = useState();
  const [invoiceCanId, setInvoiceCanId] = useState();
  const [loginCanid, setLoginCanid] = useState()

 const navigate = useNavigate();
 const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
 const localcanid = localStorage.getItem("credentialKey")
 const locationID = localStorage.getItem('crm_location_id');
 const groupID = localStorage.getItem('crm_group_id');
 const companyID = localStorage.getItem('crm_company_id');
 const companyName = localStorage.getItem('company_name');

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

  /*Get Invloice Count HP 20 Jun invoiceCanId*/
  useEffect(() => {
    let  canIdsString;
    async function areaList() {
      const url = process.env.REACT_APP_API_URL + '/getAreaLists';


      const data = {
        "groupID": groupID,
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
      var dd =dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth
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

      // console.log('InvoiceCount', result);
      setGetInvoiceCount(result.data.invoiceCount);
      setGetInvoiceAmount(inrRupee.format(Math.round(result.data.invoiceAmount ? result.data.invoiceAmount : 0)).replace('.00', ''));
      setGetInvoiceDueAmount(inrRupee.format(Math.round((result.data.invoiceAmount? result.data.invoiceAmount : 0) - result.data.paidAmount)).replace('.00', ''));
      // console.log("result.data.invoiceAmount",result.data.invoiceAmount);
    }

    async function fetchData() {
      await areaList();
      await fetchInvoiceCount();
    }

    fetchData();

  }, [invoiceCanId]);

 useEffect(() => {
  async function serviceList() {
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 24)
    let toDate = new Date();

    const url = process.env.REACT_APP_API_URL + '/getServiceLists';

    // const data = {groupID: groupID, companyID: companyID, locationID: locationID}; //, fromDate: "2022-01-01", toDate: "2023-01-20"

    const data = {
      "groupID": groupID,
      "companyID": (segmentCheckHBB == "HBB") ? "CIndividual":"",
      "locationID":  (segmentCheckHBB == "HBB") ? locationID:"",
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

  // const handleRedirectSrPage = () => {
  //   console.log('clicked card box')
  //   navigate('/servicerequests');
  // };
  
  const handleRedirectBillPage = () => {
    // console.log('clicked card box')
    navigate('/accountdetails?pid=bill');
  };

  return (
    <>
      {/* <Notification /> */}
      <section class="section-dashboard">
        <div class="">
          <div class="d-flex justify-content-end">
            {/* SIDE NAVBAR  */}
            <SideBar />
            <Header />
            {/* DASHBOARD  */}
            <div class="dashboard-main">
              {/* location top details */}
              <div class="dashboard-main-top">
                <div class="row">
                  <div class="dashboard-banner">
                    <div>
                      <div class="dashboard-banner-heading py-2 px-3">
                        {companyName}
                      </div>
                      {/* <div class="dashboard-banner-info">
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
                      </div> */}
                    </div>
                    <div class="dashboard-cards">
                      {/* <Link className="side-link" to="/servicerequests"> */}

                      <div class="card-box">
                        <div class="card-head">Service Desk <span className='small-text'>(Last 1 Month)</span></div>
                        <div class="card-info pt-2">
                          <div class="card-count">
                            {/* 14 <img src="./images/arrow-outward.svg" alt="" /> */}
                            {getServiceListCount < 10 ? `0${getServiceListCount}` : getServiceListCount} <img src={arrowOutward} alt="" />
                          </div>
                          <div class="card-option">
                            <div class="card-options pb-3">
                              Open 
                              {/* <span class="span-positive">01</span> */}
                              <span class="span-positive">{getGetServiceListNotResolved < 10 ? `0${getGetServiceListNotResolved}` : getGetServiceListNotResolved}</span>
                            </div>
                            <div class="card-options">
                              Closed 
                              {/* <span class="span-negative">10</span> */}
                              <span class="span-negative">{getGetServiceListResolved < 10 ? `0${getGetServiceListResolved}` : getGetServiceListResolved}</span>
                            </div>
                          </div>
                        </div>
                      </div>

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
                      {/* <Link className="side-link" to="/accountdetails?pid=bill"> */}
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* <ServiceList /> */}
              <ServiceRequestAvs />

              <Footer />
            </div>
          </div>
        </div>
      </section>
    </>

  )
}