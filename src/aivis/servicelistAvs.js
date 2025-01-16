import React, { useState, useEffect } from 'react'
import distance from "../assets/images/distance.svg";
import productIcon from "../assets/images/product-icon.svg";
import moment from 'moment';
import iconcalendar from "../assets/images/icon-calendar.svg";
import 'bootstrap-daterangepicker/daterangepicker.css';
import { DateRangePicker } from 'react-bootstrap-daterangepicker';
import "../assets/css/daterangepicker.css"

const ServicelistAvs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [caseName, setCaseName] = useState([]);
  const [caseTyValue, setCaseTyValue] = useState('');
  const [showSpecification, setShowSpecification] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [getServiceList, setServiceList] = useState(
    [
      {
          "CreateDate": "13/09/2023 14:44:54",
          "RequestType": "Billing",
          "Location": "Gurgaon",
          "status": "Resolved - Contacted",
          "Complainttype": "Complaint",
          "CanId": "194155",
          "SRNumber": "SR23094057083",
          "Category": "Billing",
          "SubCategory": "Rental charges",
          "Source": "Customer App",
          "LastUpdateDate": "13/09/2023 15:07:10",
          "SLA_ETR": "9/15/2023 2:44:54 PM"
      },
      {
          "CreateDate": "11/09/2023 16:30:10",
          "RequestType": "Billing",
          "Location": "Gurgaon",
          "status": "In Progress",
          "Complainttype": "Complaint",
          "CanId": "194155",
          "SRNumber": "SR23094054348",
          "Category": "Billing",
          "SubCategory": "Rental charges",
          "Source": "Customer App",
          "LastUpdateDate": "11/09/2023 16:34:02",
          "SLA_ETR": "9/13/2023 4:30:10 PM"
      }
  ]
  );


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
      console.log("sr", result.data);
      setCaseName(result.data);
    }

    newSR();
  }, []);

  const handleRadioChange = (event) => {
    // For remove ChatBox
    const chatBox = document.querySelector(".help-box")
    chatBox.classList.add("d-none");

    const { id, checked } = event.target;
    console.log("clicked", event.target.value)
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      // await createSR();
      // Optionally, perform any additional actions after creating the service request
    } catch (error) {
      // Handle the error if the service request creation fails
    } finally {
      setIsLoading(false); // Set isLoading to false after the API call is completed (success or error)
    }
  };

  const pid = new URLSearchParams(window.location.search);
  var pageid = pid.get('pid') ? pid.get('pid') : '';
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

  return (
    <section className="section-dashboard">
      {/* Service Request  */}
      <div className="dashboard-content">
        {/* Navigation tabs: Account details, Billing details, User management */}
        <ul className="nav nav-pills mb-3 account-tab-list" id="pills-tab" role="tablist">
          {/* <li className="nav-item" role="presentation">
          <button className="nav-link account-tab-btn"></button>
      </li> */}
          <li className="nav-item" role="presentation" >
            <button className={actTabAcc} id="pills-srStatus-tab" data-bs-toggle="pill" data-bs-target="#pills-srStatus" type="button" role="tab" aria-controls="pills-srStatus" aria-selected="true">SR Status</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={actTabBill} id="pills-raiseNewSR-tab" data-bs-toggle="pill" data-bs-target="#pills-raiseNewSR" type="button" role="tab" aria-controls="pills-raiseNewSR" aria-selected="false">Raise SR</button>
          </li>
        </ul>
        <div className="tab-content row" id="pills-tabContent">
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
                    <div className="table-name flex-grow-1 table-name-span d-flex align-items-center">
                      <p className="m-0">Requests</p>
                      <span>Service ID: 1234567
                        {/* {getPinnedClickedData ? getPinnedClickedData.CanId : selectedcanidToFilter ? selectedcanidToFilter : localStorage.getItem("credentialKey")} */}
                      </span>
                    </div>
                    <div className="d-flex align-items-center gap-3 flex-wrap">

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
                            <span className="textValue">{"dropdown"}</span>
                          </div>
                        </div>
                        <ul className="dropdown-menu">
                          {/* {uniqueAreaList ? uniqueAreaList.map((area, index) => ( */}
                          <li
                            // key={index}
                            className="dropdown-item"
                            // data-value={"area.AreaName"}
                            onClick={"handleAreaNameChange"}
                            style={{ fontSize: "14px" }}
                          >
                            {"Item-1"}
                          </li>
                          {/* )) : ""} */}

                          {/* {uniqueAreaListDeafault && !uniqueAreaList && uniqueAreaListDeafault.map((area, index) => ( */}
                          <li
                            // key={index}
                            className="dropdown-item"
                            data-value={"area"}
                            onClick={"handleAreaNameChange"}
                            style={{ fontSize: "14px" }}
                          >
                            {"item-2"}
                          </li>
                          {/* ))} */}

                          {/* <li className="dropdown-item" style={{ fontSize: "14px" }}>
                            {"item-3"}
                          </li> */}
                        </ul>
                      </div>

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
                              onApply={"handleDateRangeChange"}
                            >
                              <span
                                type="text"
                                className=""
                                value={"selectedRange"}
                              >{"selectedRange"}</span>
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

                        {/* for Default */}
                        {getServiceList && getServiceList.length > 0 ? (getServiceList.map((row, index) => (

                        <tr
                          // key={index} 
                          className="table-row">
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
                                    // const statusText =
                                    //   row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                    //     ? "Open"
                                    //     : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                    //       ? "Closed"
                                    //       : row.status;
                                    return <div className="status-active-btn">{"statusText"}</div>;
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
                            ) : (getServiceList && getServiceList.length === 0) ? (
                        <tr className="table-row">
                          <td className="table-row-data" colSpan={6} style={{ textAlign: "center" }}>No Service Requests</td>
                        </tr>
                        ) : null}
                      </tbody></table>

                  </div>

                  {/* Display data as cards on small screens */}
                  <div className="d-block d-md-none">

                    {/* for Default */}
                    {/* {!getPinnedSRLists && (srList && srList.length > 0 && !flagCheck) ? (srList.map((row, index) => ( */}
                    <div
                      // key={index} 
                      className="table-content">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="table-row-data resp-name">{"row.SRNumber"}</div>
                        <div className="table-row-data dueAmount">
                          {/* <div className="status-active-btn">{row.status}</div> */}
                          {/* {(() => {
                                    const statusText =
                                      row.status === "In Progress" || row.status === "On Hold - SLA clock Stop" || row.status == "Waiting for Information"
                                        ? "Open"
                                        : row.status === "Resolved - Not Contacted" || row.status === "Resolved - Contacted" || row.status === "Duplicate Merged"
                                          ? "Closed"
                                          : row.status;
                                    const statusClassName =
                                      statusText === "Open" ? "status-red" : "status-green";
                                    return <div className={`status-active-btn ${statusClassName}`}>{statusText}</div>;
                                  })()} */}
                        </div>
                      </div>
                      <div className="table-row-data email">
                        <div className="italic">Last Updated:
                          {/* {(() => {
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
                                  })()} */}
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <div className="table-row-data">
                          <div className="resp-innerHeading">Category</div>
                          <div className="resp-contact">{"row.Category"}</div>
                        </div>
                        <div className="table-row-data">
                          <div className="resp-innerHeading">Sub Category</div>
                          <div className="resp-contact">{"row.SubCategory"}</div>
                        </div>
                        <div className="table-row-data">
                          <div className="resp-innerHeading">Source</div>
                          <div className="resp-contact">{"row.Source"}</div>
                        </div>
                      </div>
                    </div>
                    {/* ))
                          ) : (srList && srList.length == 0 && !flagCheck) ? ( */}
                    <tr>
                      <td colSpan={6}>No Service Requests</td>
                    </tr>
                    {/* ) : null} */}

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
                      <span>Service ID: {"12345678"}</span>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-3 flex-wrap ">
                    <div className="dropdown spectra-dropdown select-dropdown">
                      <div
                        className="select-custom dropdown-toggle select4-custom rounded-0"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        role="button"
                      >selectedLocCreateSr
                        {/* {selectedLocCreateSr ? selectedLocCreateSr : getPinnedClickedData ? getPinnedClickedData.LocationName : getLogInLocation ? getLogInLocation : "Select City"} */}
                        {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) && getLogInLocation} */}
                      </div>
                      <ul className="dropdown-menu">

                        {/* {(crmRole === "L2") ? locationList && locationList.map((loc, index) => (
                          <li
                            key={index}
                            className="dropdown-item"
                            data-value={loc.LocationName}
                            onClick={handleCresteSRLocationChange}
                            style={{ fontSize: "14px" }}
                          >
                            {loc.LocationName}
                          </li>
                        )) : */}
                          <li
                            // key={index}
                            className="dropdown-item"
                            data-value={"loc.LocationName"}
                            // onClick={handleCresteSRLocationChange}
                            style={{ fontSize: "14px" }}
                          >
                            {"getLogInLocation"}
                          </li>
                          {/* } */}
                      </ul>
                    </div>
                    <div className="dropdown spectra-dropdown select-dropdown">
                      <div
                        className="select-custom dropdown-toggle select4-custom rounded-0"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        role="button"
                      >
                        <span className="textValue">selectAreaNameSr
                          {/* {selectAreaNameSr ? selectAreaNameSr : getPinnedClickedData && getLogInFlagC ? getPinnedClickedData.AreaName : getLogInFlagC ? getLogInArea : "Select Location"} */}
                          {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) && getLogInArea} */}
                        </span>
                      </div>
                      <ul className="dropdown-menu">
                        {/* <li className="dropdown-item" data-value="HSR Layout">
                                HSR Layout
                              </li> */}
                        {/* {(crmRole === "L2") ? uniqueAreaListcreateSr && uniqueAreaListcreateSr.map((area, index) => (

                          <li
                            key={index}
                            className="dropdown-item"
                            data-value={area.AreaName}
                            onClick={handleAreaNameChangeCreateSr}
                            style={{ fontSize: "14px" }}
                          >
                            {area.AreaName}
                          </li>
                        )) : */}
                          <li
                            // key={index}
                            className="dropdown-item"
                            data-value={"loc.LocationName"}
                            // onClick={handleCresteSRLocationChange}
                            style={{ fontSize: "14px" }}
                          >
                            {"getLogInArea"}
                          </li>
                          {/* } */}
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
                          <span className="textValue">selectedSegmentcreateSr
                            {/* {selectedSegmentcreateSr ? selectedSegmentcreateSr : getPinnedClickedData && getLogInFlagC ? getPinnedClickedData.SegmentName + " (" + getPinnedClickedData.CanId + ")" : getLogInFlagC ? getLogInSegment + " (" + getLogInCanId + ")" : "Product name"} */}
                            {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) && getLogInSegment} */}
                          </span>
                        </div>
                      </div>
                      <ul className="dropdown-menu">
                        {/* <li className="dropdown-item" data-value="MBIA">
                                MBIA
                              </li> */}
                        {/* {(crmRole === "L2") ? segmentDropDownValuecreateSr && segmentDropDownValuecreateSr.map((product, index) => (
                          <li
                            key={index}
                            className="dropdown-item"
                            data-value={product.CanId}
                            onClick={handleSegmentCreateSrChange}
                            style={{ fontSize: "14px" }}
                          >
                            {product.SegmentName} ({product.CanId})
                          </li>
                        )) : */}
                          <li
                            // key={index}
                            className="dropdown-item"
                            // data-value={loc.LocationName}
                            // onClick={handleCresteSRLocationChange}
                            style={{ fontSize: "14px" }}
                          >
                            {"getLogInSegment" + " (" + "getLogInCanId" + ")"}
                          </li>
                          {/* } */}
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
                              onClick={"chatBoxClick"}
                              name="issues" required="" id="issue1" />
                            <p className="caption">{"Dashboard Issue"}</p>
                            <span className="dotmark-outer">
                              <span className="dotmark-inner" />
                            </span>
                          </label>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                          <label className="request-issue" htmlFor="issue2">
                            <input type="radio" value={caseName.length > 0 ? caseName[4].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="issue2" />
                            <p className="caption">{"Mobile App Issue"}</p>
                            <span className="dotmark-outer">
                              <span className="dotmark-inner" />
                            </span>
                          </label>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                          <label className="request-issue" htmlFor="issue3">
                            <input type="radio" value={caseName.length > 0 ? caseName[6].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="issue3" />
                            <p className="caption">{"Use Case & Alerts Issue"}</p>
                            <span className="dotmark-outer">
                              <span className="dotmark-inner" />
                            </span>
                          </label>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">


                          <label className="request-issue" htmlFor="issue5">
                            <input type="radio" value={caseName.length > 0 ? caseName[2].case_type : ""}
                              // onChange={handleRadioChange} 
                              // onClick={chatBoxClick}
                              name="issues" required="" id="issue5" />
                            <p className="caption">{"Analytics Box Issues"}</p>
                            <span className="dotmark-outer">
                              <span className="dotmark-inner" />
                            </span>
                          </label>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                          <label className="request-issue" htmlFor="issue7">
                            <input type="radio" value={caseName.length > 0 ? caseName[5].case_type : ""} onChange={handleRadioChange} name="issues" required="" id="issue7" />
                            <p className="caption">{"API related Issue"}</p>
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
                            <p className="caption">{"Technical - Others"}</p>
                            <span className="dotmark-outer">
                              <span className="dotmark-inner" />
                            </span>
                          </label>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 px-0 my-2">
                          <label className="request-issue" htmlFor="issue4">
                            <input type="radio" value={caseName.length > 0 ? caseName[1].case_type : ""}
                              // onChange={handleRadioChange} 
                              // onClick={chatBoxClick}
                              name="issues" required="" id="issue4" />
                            <p className="caption">{"Data Deletion Request"}</p>
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
                            <p className="caption">{"New Requirement"}</p>
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
                              onChange={"handleTextValue"}
                            />
                          </div>
                            <div class="" id="contactDetails" >
                              <div class="request-issue heading pb-3 pt-4">Please share your alternate contact details</div>
                              <textarea id="req-textarea2" class="req-textarea" name="req-textarea" rows={3} cols={25}
                                placeholder="Type here" defaultValue={""}
                                onChange={"handleContactValue"}></textarea>
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

            

          </div>

        </div>
        {/* FOOTER START  */}
        {/* <Footer /> */}
      </div>

    </section>
  )
}

export default ServicelistAvs