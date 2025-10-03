import { React, useState, useEffect } from "react";
import SideBar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import accordionarrowdown from "../assets/images/accordion-arrow-down.svg";
import arrowout from "../assets/images/arrow-out.svg";
import iconadminmail from "../assets/images/icon-admin-mail.svg";
import iconadminphone from "../assets/images/icon-admin-phone.svg";
import iconadminrole from "../assets/images/icon-admin-role.svg";
import productIcon from "../assets/images/product-icon.svg";
import distance from "../assets/images/distance.svg";
import adminRoleIcon from "../assets/images/icon-admin-role.svg";
import adminPhoneIcon from "../assets/images/icon-admin-phone.svg";
import adminMailIcon from "../assets/images/icon-admin-mail.svg";
import HeaderHbb from './HeaderHbb'



export default function Support() {
  const groupID = localStorage.getItem('crm_group_id');
  const serviceID = localStorage.getItem('credentialKey');
  const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
  const locationID = localStorage.getItem('crm_location_id');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orgNu, setOrgNu] = useState('');
  const [contactIdu, setContactIdu] = useState('');

  const [getUniqueLocation, SetUniqueLocation] = useState();
  const [getMergedAreaProd, setMergedAreaProd] = useState();
  const [getUniqueAreaList, setUniqueAreaList] = useState();
  const [getSelectedCity, setSelectedCity] = useState();
  const [getSelectedArea, setSelectedArea] = useState();
  const [getSelectedProduct, setSelectedProduct] = useState();
  const [getUniqueProductList, setUniqueProductList] = useState();
  const [getSelectedAccManager, setSelectedAccManager] = useState();
  const [getAccManager, setAccManager] = useState();
  const [getSelectedServiceId, setSelectedServiceId] = useState();
  const [getLoginProduct, setLoginProduct] = useState();
  const [getPinnedContactDetails, setPinnedContactDetails] = useState();
  const [getPinnedSessionContact, setPinnedSessionContact] = useState();
  const [getPinnedFlag, setPinnedFlag] = useState(false);
  const [getLogInSegment, setLogInSegment] = useState();
  const [getLogInLocation, setLogInLocation] = useState();
  const [getLogInArea, setLogInArea] = useState();
  const [getLogInCanId, setLogInCanId] = useState();
  const [allCityFlag, setAllCityFlag] = useState(false);
  const [getLoginAreaSol, setLoginAreaSol] = useState(false);
  const [getHeadingText, setHeadingText] = useState('All FAQs');
  const crmRole = localStorage.getItem('crm_role');
  const segment = localStorage.getItem('segment');
  const companyID = localStorage.getItem('crm_company_id');
  const crm_role = localStorage.getItem('crm_role');
  const [activeFilter, setActiveFilter] = useState('all');



  const pinnedFetchData = async () => {
    // console.log("fromDate", selectedfromDate);
    // let defaultFromDate = new Date(new Date().getFullYear(), new Date().getMonth() - 3, new Date().getDate());
    try {
      const pinnedClickedData = JSON.parse(sessionStorage.getItem('pinnedClicked'));
      // console.log("pinnedClickedData", pinnedClickedData);
      setPinnedSessionContact(pinnedClickedData[0]);

      if (pinnedClickedData && !allCityFlag) {
        // if (pinnedClickedData.SegmentName !== "OBB" && pinnedClickedData.SegmentName !== "HBB") {
        //Pinned data fetch from Contact Api 
        let pinnedContact = await selectedAccManagerDetails(pinnedClickedData[0].CanId);
        // console.log("pinnedContact", pinnedContact);
        pinnedContact.meta.Status ? setPinnedContactDetails(pinnedContact.data) : alert("Something went wrong");
        // }
      } else {
        setPinnedContactDetails(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    pinnedFetchData();
  }, []);




  // 1st API - Fetch customer account detail and extract orgNo
  useEffect(() => {
    async function fetchCustomerAccountDetail() {
      try {
        const url = process.env.REACT_APP_API_URL + '/getCustomerAccountDetail';
        const data = {
          serviceGroupId: localStorage.getItem('credentialKey')
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        // console.log('getCustomerAccountDetail', result.data);
        setOrgNu(result.data.orgId); // Extract orgNo from the response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchCustomerAccountDetail();
  }, []);

  // 2nd API - Get contacts by organisation ID and extract contactId
  useEffect(() => {
    if (orgNu) {
      async function getContactsByOrganisationId() {
        try {
          const url = process.env.REACT_APP_API_URL + '/getContactsByOrganisationId';
          const data = {
            orgNo: orgNu // Pass orgNo from the previous API
          };

          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();
          // console.log('getContactsByOrganisationId', result.data);
          setName(result.data)
          setContactIdu(result.data.contactNo); // Extract contactId from the response
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      getContactsByOrganisationId();
    }
  }, [orgNu]);

  // 3rd API - Get contact communication medium
  useEffect(() => {
    if (contactIdu) {
      async function getContactCommMedium() {
        try {
          const url = process.env.REACT_APP_API_URL + '/getContactCommMedium';
          const data = {
            contactId: contactIdu // Pass contactId from the previous API
          };

          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();
          // console.log('getContactCommMedium', result.data);
          setEmail(result.data);
          // Further processing of the result data can be done here
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      getContactCommMedium();
    }
  }, [contactIdu]);





  async function selectedAccManagerDetails(CanId) {
    // console.log("CanId", CanId);
    if (CanId) {
      const url2 = process.env.REACT_APP_API_URL + '/getAccManagerDetails';
      const data2 = { cANID: CanId }

      const response2 = await fetch(url2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data2)
      });
      const result2 = await response2.json();
      // console.log("getAccManagerDetails:", result2.data);
      return result2;
    }
  }

  async function dropdownSelection(dropdownValue, selectedDropdown) {
    // console.log("selectedDropdown:", selectedDropdown, "DropdownValue:", dropdownValue); 
    if (selectedDropdown === "city") {
      // sessionStorage.removeItem('pinnedClicked');
      setLoginProduct(false);
      setLogInCanId(false);
      setLogInArea(false);
      setPinnedContactDetails(false);
      setAllCityFlag(true);
      setPinnedFlag(true);
      const filteredAreaList = getMergedAreaProd.filter(item => item.LocationName === dropdownValue);
      const uniqueAreaList = Array.from(new Set(filteredAreaList.map((area) => area.AreaName)));
      // console.log(dropdownValue);

      setSelectedArea(false);
      setSelectedProduct(false);
      setSelectedCity(dropdownValue);
      setUniqueAreaList(uniqueAreaList);
    } else if (selectedDropdown === "area") {
      const filteredProductList = getMergedAreaProd.filter(item => item.AreaName === dropdownValue);
      // console.log(dropdownValue);
      setSelectedProduct(false);
      setLoginProduct(false);
      setLogInCanId(false);
      setSelectedArea(dropdownValue);
      setUniqueProductList(filteredProductList);
      // pinnedFetchData();
    } else if (selectedDropdown === "segment") {
      setSelectedProduct(dropdownValue);
      // console.log(dropdownValue);
      if (getSelectedCity && getSelectedArea && dropdownValue) {
        try {
          let matches = dropdownValue.match(/\((\d+)\)/);
          let selectedServiceID = matches[1];
          setSelectedServiceId(selectedServiceID);
          // console.log("SelectedServiceID", selectedServiceID);
          let selectedManagerDetails = await selectedAccManagerDetails(selectedServiceID);
          // console.log("selectedAccManagerDetails", selectedManagerDetails.data);
          setSelectedAccManager(selectedManagerDetails.data);

        } catch (error) {
          console.error(error);
        }
      }
    }
  }

  useEffect(() => {
    async function areaSolution() {
      // -----AreaList Api----
      const urlAreaList = process.env.REACT_APP_API_URL + '/getAreaLists';
      // const data = { groupID: groupID, companyID: companyID, locationID: locationID };
      const dataAreaSol = {
        "groupID": groupID,
        "companyID": (crm_role == "L3") ? companyID : "",
        "locationID": (crm_role == "L3") ? locationID : ""
      }
      const responseAreaList = await fetch(urlAreaList, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataAreaSol)
      });
      const resultAreaList = await responseAreaList.json();
      const matchingCanIdArea = resultAreaList.data.find((el) => el.CanId === localStorage.getItem('credentialKey'));
      setLogInLocation(matchingCanIdArea.LocationName);
      setLogInArea(matchingCanIdArea.AreaName);
      // console.log("getAreaLists", resultAreaList.data);
      const canILocation = resultAreaList.data.filter((el) => el.LocationName === matchingCanIdArea.LocationName);
      // console.log(canILocation);
      const uniqueArea = Array.from(new Set(canILocation.map((area) => area.AreaName)));
      // console.log(uniqueArea);
      setUniqueAreaList(uniqueArea);



      // -----SolutionList Api----
      const urlSolutionLists = process.env.REACT_APP_API_URL + '/getSolutionLists';
      // const data2 = {groupID: groupID, companyID: companyID, locationID: locationID}; //, fromDate: "2022-01-01", toDate: "2023-01-20"

      const responseSolutionLists = await fetch(urlSolutionLists, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataAreaSol)
      });
      const resultSolutionLists = await responseSolutionLists.json();
      const matchingCanId = resultSolutionLists.data.find((el) => el.CanId === localStorage.getItem('credentialKey'));
      setLoginAreaSol(matchingCanId);
      setLogInCanId(matchingCanId.CanId);
      setLogInSegment(matchingCanId.SegmentName);

      setLoginProduct(matchingCanId.SegmentName);
      // console.log("getSolutionLists", matchingCanId.SegmentName);

      //----------Merge AreaList And SolutionList---------
      let mergedAreaSol;
      mergedAreaSol = resultAreaList.data.map((item) => {
        const matchingItem = resultSolutionLists.data.find((el) => el.CanId === item.CanId);
        if (matchingItem) {
          return {
            ...item,
            SegmentName: matchingItem.SegmentName,
            PlanName: matchingItem.PlanName
          };
        }
        return null;
      })
        .filter((item) => item !== null); // Remove null entries from the array
      // console.log("mergedAreaSol:", mergedAreaSol);

      const filteredData = mergedAreaSol.map(item => ({
        ...item,
        AreaName: item.AreaName !== "" ? item.AreaName : item.LocationName
      }));
      setMergedAreaProd(filteredData);
      const uniqueLocation = Array.from(new Set(filteredData.map((area) => area.LocationName)));
      SetUniqueLocation(uniqueLocation);
      // console.log(uniqueLocation);
    }
    areaSolution();
  }, []);

  useEffect(() => {
    async function accManagerDetails() {
      // -----AreaList Api----
      const urlAreaList = process.env.REACT_APP_API_URL + '/getAccManagerDetails';
      // const data = { groupID: groupID, companyID: companyID, locationID: locationID };
      const dataAreaSol = { cANID: localStorage.getItem('credentialKey') }
      const responseAreaList = await fetch(urlAreaList, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataAreaSol)
      });
      const resultAreaList = await responseAreaList.json();
      // console.log("accManagerDetails", resultAreaList.data);
      setAccManager(resultAreaList.data);

    }
    accManagerDetails();
  }, []);




  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);

    if (filterId === 'all') {
      //All
      setHeadingText("All FAQs");
    } else if (filterId === 'billing') {
      //Billing
      setHeadingText("Billing & Payments FAQs");
    } else if (filterId === 'plans') {
      //plans
      setHeadingText("Plans & Usage FAQs");
    } else if (filterId === 'connectivity') {
      //Connection
      setHeadingText("Connectivity & Troubleshooting FAQs");
    } else if (filterId === 'serviceRequests') {
      //Service Requests
      setHeadingText("Service Requests & Support FAQs");
    }

  };


  return (
    <>
      <section className="section-dashboard">
        <div className="">
          <div className="d-flex justify-content-end">
            {/* SIDE NAVBAR  */}
            <SideBar />
            {/* top header */}
            <HeaderHbb />
            {/* {segment != "HBB" && <Header />}
              {segment == "HBB" && <HeaderHbb />} */}
            {/* My ACCOUNTS  */}
            <div className="dashboard-main">
              <div className="dashboard-content">
                {/* Navigation tabs: FAQs and Contact Details */}
                <div className="faq-banner">
                  <ul
                    className="nav nav-pills account-tab-list"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link account-tab-btn active"
                        id="pills-faq-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-faq"
                        type="button"
                        role="tab"
                        aria-controls="pills-faq"
                        aria-selected="true"
                      >
                        FAQs
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link account-tab-btn"
                        id="pills-contact-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-contact"
                        type="button"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected="false"
                      >
                        Contact Details
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="tab-content" id="pills-tabContent">
                  {/* ****************** FAQ TAB ************* */}
                  <div
                    className="tab-pane faq-tab-pane fade show active"
                    id="pills-faq"
                    role="tabpanel"
                    aria-labelledby="pills-faq-tab"
                  >
                    {/* Help section  */}
                    <div className="faq-banner-wrapper d-flex flex-column align-items-center justify-content-center pb-5">
                      <div className="faq-banner-heading mb-3">Help Center</div>
                      {/* <div className="help-search-bar d-flex align-items-center justify-content-center">
                          <input
                            className="help-search-input"
                            type="text"
                            placeholder="Search"
                            name="search"
                          />
                          <button className="help-search-btn" type="submit">
                            Search
                          </button>
                        </div> */}
                    </div>
                    <div className="faq-innerContent-wrapper">

                      {/* FAQ Section  */}
                      <div className="faq-main-wrapper ">
                        <div className="faq-main-wrapper ">
                          <div className="faq-main-wrapper ">
                            <div className="faq-headings mb-5">
                              <div className="account-tab-heading">
                                Frequently asked questions
                              </div>
                              {/* <div className="faq-sub-heading">Here goes description</div> */}
                            </div>

                            <div>
                              <div className="faq-filter-btns d-flex align-items-center gap-3 flex-wrap">
                                <div
                                  id="all"
                                  className={`faq-filter-btn ${activeFilter === 'all' ? 'activeFilter' : ''}`}
                                  onClick={() => handleFilterClick('all')}
                                >
                                  All
                                </div>
                                <div
                                  id="billing"
                                  className={`faq-filter-btn ${activeFilter === 'billing' ? 'activeFilter' : ''}`}
                                  onClick={() => handleFilterClick('billing')}
                                >
                                  Billing & Payments
                                </div>

                                <div
                                  id="plans"
                                  className={`faq-filter-btn ${activeFilter === 'plans' ? 'activeFilter' : ''}`}
                                  onClick={() => handleFilterClick('plans')}
                                >
                                  Plans & Usage
                                </div>
                                <div
                                  id="connectivity"
                                  className={`faq-filter-btn ${activeFilter === 'connectivity' ? 'activeFilter' : ''}`}
                                  onClick={() => handleFilterClick('connectivity')}
                                >
                                  Connectivity & Troubleshooting
                                </div>

                                <div
                                  id="serviceRequests"
                                  className={`faq-filter-btn ${activeFilter === 'serviceRequests' ? 'activeFilter' : ''}`}
                                  onClick={() => handleFilterClick('serviceRequests')}
                                >
                                  Service Requests & Support
                                </div>

                              </div>
                            </div>
                            {/* end */}
                            {/* FAQs All Box  */}

                            <div
                              className="faq-box-wrapper mt-5"
                              id="faq-billing"
                              style={{ display: "block" }}
                            >
                              <div className="faq-box-header">
                                <div className="heading"> {getHeadingText} </div>
                                <div className="sub-heading">
                                  {/* Here name relatable topics of below questions */}
                                </div>
                              </div>
                              <div className="faq-box-content">
                                <div className="accordion" id="accordionExample">

                                  {(activeFilter === 'billing' || activeFilter === 'all') && (
                                    <div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#billingFaq1"
                                            aria-expanded="true"
                                            aria-controls="billingFaq1"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I check my bills and outstanding amount?
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="billingFaq1"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li> <a href="/accountdetails?pid=bill">Click here</a> to check your bills and outstanding amount.</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>	Click on <strong>Bill Desk</strong> from the top right of the dashboard.</li></ul>
                                              <ul><li>	You can filter the details based on duration and location and You can view, download, share, and pay the desired bill from this window. </li></ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#billingFaq2"
                                            aria-expanded="true"
                                            aria-controls="billingFaq2"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I get a clear explanation of my bill amount?
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="billingFaq2"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul>Refer to the second page of your invoice for the description of the charges levied.</ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                    </div>
                                  )}

                                  {(activeFilter === 'plans' || activeFilter === 'all') && (
                                    <div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#planFaq1"
                                            aria-expanded="true"
                                            aria-controls="planFaq1"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I change my current plan?
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="planFaq1"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul>You can email us at <a style={{ textDecoration: 'none' }} href="mailto:support@spectra.co"> support@spectra.co</a> or call us at <a style={{ textDecoration: 'none' }} href="tel:1800 121 5678">1800 121 5678</a> to change your plan. </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#planFaq2"
                                            aria-expanded="true"
                                            aria-controls="planFaq2"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Can I change my plan in the middle of my billing cycle?
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="planFaq2"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul>Yes you can, however, a new invoice will be generated on a pro-rata basis for the remaining days of your cycle.</ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#planFaq3"
                                            aria-expanded="true"
                                            aria-controls="planFaq3"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I check my data usage?
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="planFaq3"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li> <a href="/dashboard">Click here</a> to check your data usage.</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>Click on <strong>Dashboard.</strong> You can see all your services on the dashboard.  Scroll down to find the data usage details. You can filter the view and download the usage graph from here. </li></ul>                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#planFaq4"
                                            aria-expanded="true"
                                            aria-controls="planFaq4"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Where do I check my uptime reports?
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="planFaq4"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li> <a href="/dashboard">Click here</a> to check the uptime for your connection.</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>Click on <strong>Dashboard.</strong> and then scroll down to the bottom of the page to check your day-wise availability for the current month. </li></ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#planFaq5"
                                            aria-expanded="true"
                                            aria-controls="planFaq5"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Is there a capping on my data or is it unlimited? (Only for Home Broadband)
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="planFaq5"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul>As per DOT guidelines, unlimited plans are now capped at 3300 GB for home broadband connections.</ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#planFaq6"
                                            aria-expanded="true"
                                            aria-controls="planFaq6"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                What is the benefit of a 1 Gbps connection?
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="planFaq6"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul>A 1Gbps connection supports multiple devices at once with ultra-fast speed, allowing:</ul>
                                              <ul>- Buffer-free streaming and downloads</ul>
                                              <ul>- Smooth online gaming</ul>
                                              <ul>- Efficient work-from-home experience</ul>
                                              <ul>- Quick uploads of heavy files to the cloud</ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {(activeFilter === 'connectivity' || activeFilter === 'all') && (
                                    <div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#connectivityFaq1"
                                            aria-expanded="true"
                                            aria-controls="connectivityFaq1"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Why is my internet not working?
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="connectivityFaq1"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul>Your internet connection may be affected due to various reasons like inactive account, barred services due to non-payment of dues, connection on hold, mass outage, or technical issues.</ul>
                                              <ul>You can quickly troubleshoot the network or raise a support request for any technical issues that are affecting your connection through Spectra One portal or app available on App Store and Google Play. </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#connectivityFaq2"
                                            aria-expanded="true"
                                            aria-controls="connectivityFaq2"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I test my internet speed?
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="connectivityFaq2"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul> <a href="http://spectraspeed.speedtestcustom.com/" target="_blank" rel="noopener noreferrer">Click here</a> test the speed of your network.</ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#connectivityFaq3"
                                            aria-expanded="true"
                                            aria-controls="connectivityFaq3"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                I have a 1 Gbps plan but I am not getting 1Gbps speed.
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="connectivityFaq3"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul> Speed can be affected by device type, router limits, distance, interference, or browser add-ons. For best results:</ul>
                                              <ul> - Use a LAN cable (faster than Wi-Fi)</ul>
                                              <ul> - Place the router centrally, 6 ft high, away from electrical devices</ul>
                                              <ul> - Use a dual-band (2.4/5 GHz) 802.11AC router</ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {(activeFilter === 'serviceRequests' || activeFilter === 'all') && (
                                    <div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#serviceRequestsFaq1"
                                            aria-expanded="true"
                                            aria-controls="serviceRequestsFaq1"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I check the status of my service request?
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="serviceRequestsFaq1"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul> <li><a href="/servicerequests">Click here</a> to check the status of your service requests.</li> </ul>
                                              <ul>Or</ul>
                                              <ul><li>Go to <strong>Service Requests</strong>. You will be able to check your service requests history in the ‘SR Status’ section.</li> </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#serviceRequestsFaq2"
                                            aria-expanded="true"
                                            aria-controls="serviceRequestsFaq2"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I raise a service request?
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="serviceRequestsFaq2"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul> <li><a href="/servicerequests">Click here</a> to raise your request.</li></ul>
                                              <ul>Or</ul>
                                              <ul> <li>Go to <strong>{'Service Requests -> Raise a SR'}</strong> </li></ul>
                                              <ul> <li>Select the issue, add relevant details of your concern in the description, provide your alternate contact number and submit. </li></ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#serviceRequestsFaq3"
                                            aria-expanded="true"
                                            aria-controls="serviceRequestsFaq3"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I get in touch with your customer support?
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="serviceRequestsFaq3"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul> Contact our 24x7 customer support at <a style={{ textDecoration: 'none' }} href="tel:1800 121 5678">1800 121 5678</a> or mail us at <a style={{ textDecoration: 'none' }} href="mailto:support@spectra.co"> support@spectra.co</a> for any queries. </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>


                                    </div>
                                  )}

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end */}

                      {/* FAQs footer content  */}
                      <div className="faq-main-wrapper pb-5">
                        <div className="faq-footer">
                          <div>
                            Can’t find the answers you’re looking for? We’re here to
                            help you.
                          </div>
                          <div>Email us on:<a href="mailto:support@spectra.co"> support@spectra.co</a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ****************** CONTACT DETAILS TAB PANE ************* */}
                  {crmRole === "L3" && <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <div class="faq-tab-wrapper">
                      <div class="account-tab-heading mt-3 mb-4">Contact Details</div>
                      <div class="admin-panel-wrapper account-tab-container">
                        <div class="admin-panel-header d-flex justify-content-between flex-wrap align-items-center gap-3">

                          <div class="heading">Details</div>
                          {/* <span className="span-support">Service ID: {getSelectedServiceId? getSelectedServiceId : serviceID}</span> */}
                          {getLoginProduct !== "HBB" &&
                            <div class="d-flex flex-row align-items-center gap-3 flex-wrap ">
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {
                                      <span class="textValue">{getSelectedCity ? getSelectedCity : getPinnedSessionContact ? getPinnedSessionContact.LocationName : getLogInLocation && getLogInLocation}</span>}

                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") && <span class="textValue">{getLogInLocation}</span>} */}
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  {getUniqueLocation ? getUniqueLocation.map((city, index) => (
                                    <li key={index} class="dropdown-item" data-value={city} onClick={() => dropdownSelection(city, "city")}>
                                      {city}
                                    </li>
                                  )) : ""}
                                  {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                      <li class="dropdown-item">
                                        {getLogInLocation}
                                      </li>
                                    } */}
                                  {/* <li class="dropdown-item" data-value="Delhi">Delhi1</li>
                              <li class="dropdown-item" data-value="Gurgaon">Gurgaon</li>
                              <li class="dropdown-item" data-value="Mumbai">Mumbai</li> */}
                                </ul>
                              </div>

                              {/* <!-- Address selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {
                                      <span class="textValue">{getSelectedArea ? getSelectedArea : getPinnedSessionContact ? getPinnedFlag ? "Select Area" : getPinnedSessionContact.AreaName : getLogInArea ? getLogInArea : "Seclect Area"}</span>}

                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") && <span class="textValue">{getLogInArea}</span>} */}
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  {getUniqueAreaList ? getUniqueAreaList.map((area, index) => (
                                    <li key={index} class="dropdown-item" data-value={area} onClick={() => dropdownSelection(area, "area")}>
                                      {area}
                                    </li>
                                  )) : ""}
                                  {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                      <li class="dropdown-item">
                                        {getLogInArea}
                                      </li>
                                    } */}

                                </ul>
                              </div>

                              {/* <!-- Product selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={productIcon} alt="" />
                                    {
                                      <span class="textValue">
                                        {getSelectedProduct ? getSelectedProduct : getPinnedSessionContact ? getPinnedFlag ? "Select Product" : getPinnedSessionContact.SegmentName + " (" + getPinnedSessionContact.CanId + ")" : (getLogInSegment && getLogInCanId) ? getLogInSegment + " (" + getLogInCanId + ")" : "Select Product"}
                                      </span>}
                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") && <span class="textValue">{getLogInSegment + " (" + getLogInCanId + ")"}</span>} */}
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  {getUniqueProductList ? getUniqueProductList.map((item, index) => (
                                    <li key={index} class="dropdown-item" data-value={item.SegmentName + " (" + item.CanId + ")"} onClick={() => dropdownSelection(item.SegmentName + " (" + item.CanId + ")", "segment")}>
                                      {item.SegmentName + " (" + item.CanId + ")"}
                                    </li>
                                  )) : ""}
                                  {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                      <li class="dropdown-item">
                                        {getLogInSegment + " (" + getLogInCanId + ")"}
                                      </li>
                                    } */}

                                </ul>
                              </div>
                            </div>
                          }

                        </div>
                        {getLoginProduct !== "HBB" &&
                          (!getSelectedAccManager && getPinnedContactDetails ?
                            <div>
                              <div class="admin-panel-data contact-details-row">
                                <div class="dashboard-box-heading mt-2 mb-3">Account Manager Details</div>
                                <div class="row">
                                  {/* <!-- Name  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminRoleIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Name</div>
                                        <div class="info-content">
                                          {getPinnedContactDetails.AccountManagerName ? getPinnedContactDetails.AccountManagerName : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Phone no  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminPhoneIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Mobile Number</div>
                                        <div class="info-content">
                                          {getPinnedContactDetails.AccountManagermobile ? getPinnedContactDetails.AccountManagermobile : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Mail  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminMailIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Email ID</div>
                                        <div class="info-content">
                                          {getPinnedContactDetails.AccountManageremailId ? getPinnedContactDetails.AccountManageremailId : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div><div class="admin-panel-data contact-details-row">
                                <div class="dashboard-box-heading mt-2 mb-3">Service Manager Details</div>
                                <div class="row">
                                  {/* <!-- Name  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminRoleIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Name</div>
                                        <div class="info-content">
                                          {getPinnedContactDetails.serviceManagerName ? getPinnedContactDetails.serviceManagerName : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Phone no  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminPhoneIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Mobile Number</div>
                                        <div class="info-content">
                                          {getPinnedContactDetails.serviceManagermobile ? getPinnedContactDetails.serviceManagermobile : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Mail  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminMailIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Email ID</div>
                                        <div class="info-content">
                                          {getPinnedContactDetails.serviceManageremailId ? getPinnedContactDetails.serviceManageremailId : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> :

                            <div>
                              <div class="admin-panel-data contact-details-row">
                                <div class="dashboard-box-heading mt-2 mb-3">Account Manager Details</div>
                                <div class="row">
                                  {/* <!-- Name  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminRoleIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Name</div>
                                        <div class="info-content">
                                          {getSelectedAccManager ? getSelectedAccManager.AccountManagerName ? getSelectedAccManager.AccountManagerName : "N/A" : getAccManager && getAccManager.AccountManagerName ? getAccManager.AccountManagerName : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Phone no  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminPhoneIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Mobile Number</div>
                                        <div class="info-content">
                                          {getSelectedAccManager ? getSelectedAccManager.AccountManagermobile ? getSelectedAccManager.AccountManagermobile : "N/A" : getAccManager && getAccManager.AccountManagermobile ? getAccManager.AccountManagermobile : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Mail  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminMailIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Email ID</div>
                                        <div class="info-content">
                                          {getSelectedAccManager ? getSelectedAccManager.AccountManageremailId ? getSelectedAccManager.AccountManageremailId : "N/A" : getAccManager && getAccManager.AccountManageremailId ? getAccManager.AccountManageremailId : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div><div class="admin-panel-data contact-details-row">
                                <div class="dashboard-box-heading mt-2 mb-3">Service Manager Details</div>
                                <div class="row">
                                  {/* <!-- Name  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminRoleIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Name</div>
                                        <div class="info-content">
                                          {getSelectedAccManager ? getSelectedAccManager.serviceManagerName ? getSelectedAccManager.serviceManagerName : "N/A" : getAccManager && getAccManager.serviceManagerName ? getAccManager.serviceManagerName : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Phone no  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminPhoneIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Mobile Number</div>
                                        <div class="info-content">
                                          {getSelectedAccManager ? getSelectedAccManager.serviceManagermobile ? getSelectedAccManager.serviceManagermobile : "N/A" : getAccManager && getAccManager.serviceManagermobile ? getAccManager.serviceManagermobile : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Mail  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminMailIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Email ID</div>
                                        <div class="info-content">
                                          {getSelectedAccManager ? getSelectedAccManager.serviceManageremailId ? getSelectedAccManager.serviceManageremailId : "N/A" : getAccManager && getAccManager.serviceManageremailId ? getAccManager.serviceManageremailId : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>)
                        }
                        <div class="admin-panel-data contact-details-lastRow">
                          <div class="dashboard-box-heading mt-2 mb-3">Customer Care</div>
                          <div class="row">
                            {/* <!-- Phone no  --> */}
                            <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                              <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                <div class="info-icon"><img src={adminPhoneIcon} alt="" /></div>
                                <div class="px-3 py-1">
                                  <div class="info-name pb-1">Mobile Number</div>
                                  <div class="info-content">
                                    <a style={{ textDecoration: 'none', color: 'black' }} href="tel:1800 121 5678">
                                      1800 121 5678
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <!-- Mail  --> */}
                            <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                              <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                <div class="info-icon"><img src={adminMailIcon} alt="" /></div>
                                <div class="px-3 py-1">
                                  <div class="info-name pb-1">Email ID</div>
                                  <div class="info-content">
                                    <a style={{ textDecoration: 'none' }} href="mailto:support@spectra.co">
                                      support@spectra.co
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}

                  {crmRole === "L2" && <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <div class="faq-tab-wrapper">
                      <div class="account-tab-heading mt-3 mb-4">Contact Details</div>
                      <div class="admin-panel-wrapper account-tab-container">
                        <div class="admin-panel-header d-flex justify-content-between flex-wrap align-items-center gap-3">

                          <div class="heading">Details</div>
                          {/* <span className="span-support">Service ID: {getSelectedServiceId? getSelectedServiceId : serviceID}</span> */}
                          {getLoginProduct !== "HBB" &&
                            <div class="d-flex flex-row align-items-center gap-3 flex-wrap ">
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {
                                      <span class="textValue">{getSelectedCity ? getSelectedCity : getPinnedSessionContact ? getPinnedSessionContact.LocationName : getLogInLocation && getLogInLocation}</span>}

                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") && <span class="textValue">{getLogInLocation}</span>} */}
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  {getUniqueLocation ? getUniqueLocation.map((city, index) => (
                                    <li key={index} class="dropdown-item" data-value={city} onClick={() => dropdownSelection(city, "city")}>
                                      {city}
                                    </li>
                                  )) : ""}
                                  {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                      <li class="dropdown-item">
                                        {getLogInLocation}
                                      </li>
                                    } */}
                                  {/* <li class="dropdown-item" data-value="Delhi">Delhi1</li>
                              <li class="dropdown-item" data-value="Gurgaon">Gurgaon</li>
                              <li class="dropdown-item" data-value="Mumbai">Mumbai</li> */}
                                </ul>
                              </div>

                              {/* <!-- Address selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {
                                      <span class="textValue">{getSelectedArea ? getSelectedArea : getPinnedSessionContact ? getPinnedFlag ? "Select Area" : getPinnedSessionContact.AreaName : getLogInArea ? getLogInArea : "Seclect Area"}</span>}

                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") && <span class="textValue">{getLogInArea}</span>} */}
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  {getUniqueAreaList ? getUniqueAreaList.map((area, index) => (
                                    <li key={index} class="dropdown-item" data-value={area} onClick={() => dropdownSelection(area, "area")}>
                                      {area}
                                    </li>
                                  )) : ""}
                                  {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                      <li class="dropdown-item">
                                        {getLogInArea}
                                      </li>
                                    } */}

                                </ul>
                              </div>

                              {/* <!-- Product selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={productIcon} alt="" />
                                    {
                                      <span class="textValue">
                                        {getSelectedProduct ? getSelectedProduct : getPinnedSessionContact ? getPinnedFlag ? "Select Product" : getPinnedSessionContact.SegmentName + " (" + getPinnedSessionContact.CanId + ")" : (getLogInSegment && getLogInCanId) ? getLogInSegment + " (" + getLogInCanId + ")" : "Select Product"}
                                      </span>}
                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") && <span class="textValue">{getLogInSegment + " (" + getLogInCanId + ")"}</span>} */}
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  {getUniqueProductList ? getUniqueProductList.map((item, index) => (
                                    <li key={index} class="dropdown-item" data-value={item.SegmentName + " (" + item.CanId + ")"} onClick={() => dropdownSelection(item.SegmentName + " (" + item.CanId + ")", "segment")}>
                                      {item.SegmentName + " (" + item.CanId + ")"}
                                    </li>
                                  )) : ""}
                                  {/* {(crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) &&
                                      <li class="dropdown-item">
                                        {getLogInSegment + " (" + getLogInCanId + ")"}
                                      </li>
                                    } */}

                                </ul>
                              </div>
                            </div>
                          }

                        </div>
                        {getLoginProduct && getLoginProduct !== "HBB" && getLoginProduct !== "Office" && getLoginProduct !== "PG" && getLoginProduct !== "Hotel" &&
                          (!getSelectedAccManager && getPinnedContactDetails ?
                            <div>
                              <div class="admin-panel-data contact-details-row">
                                <div class="dashboard-box-heading mt-2 mb-3">Account Manager Details</div>
                                <div class="row">
                                  {/* <!-- Name  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminRoleIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Name</div>
                                        <div class="info-content">
                                          {getPinnedContactDetails.AccountManagerName ? getPinnedContactDetails.AccountManagerName : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Phone no  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminPhoneIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Mobile Number</div>
                                        <div class="info-content">
                                          {getPinnedContactDetails.AccountManagermobile ? getPinnedContactDetails.AccountManagermobile : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Mail  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminMailIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Email ID</div>
                                        <div class="info-content">
                                          {getPinnedContactDetails.AccountManageremailId ? getPinnedContactDetails.AccountManageremailId : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div><div class="admin-panel-data contact-details-row">
                                <div class="dashboard-box-heading mt-2 mb-3">Service Manager Details</div>
                                <div class="row">
                                  {/* <!-- Name  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminRoleIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Name</div>
                                        <div class="info-content">
                                          {getPinnedContactDetails.serviceManagerName ? getPinnedContactDetails.serviceManagerName : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Phone no  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminPhoneIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Mobile Number</div>
                                        <div class="info-content">
                                          {getPinnedContactDetails.serviceManagermobile ? getPinnedContactDetails.serviceManagermobile : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Mail  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminMailIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Email ID</div>
                                        <div class="info-content">
                                          {getPinnedContactDetails.serviceManageremailId ? getPinnedContactDetails.serviceManageremailId : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> :

                            <div>
                              <div class="admin-panel-data contact-details-row">
                                <div class="dashboard-box-heading mt-2 mb-3">Account Manager Details</div>
                                <div class="row">
                                  {/* <!-- Name  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminRoleIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Name</div>
                                        <div class="info-content">
                                          {getSelectedAccManager ? getSelectedAccManager.AccountManagerName ? getSelectedAccManager.AccountManagerName : "N/A" : getAccManager && getAccManager.AccountManagerName ? getAccManager.AccountManagerName : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Phone no  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminPhoneIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Mobile Number</div>
                                        <div class="info-content">
                                          {getSelectedAccManager ? getSelectedAccManager.AccountManagermobile ? getSelectedAccManager.AccountManagermobile : "N/A" : getAccManager && getAccManager.AccountManagermobile ? getAccManager.AccountManagermobile : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Mail  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminMailIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Email ID</div>
                                        <div class="info-content">
                                          {getSelectedAccManager ? getSelectedAccManager.AccountManageremailId ? getSelectedAccManager.AccountManageremailId : "N/A" : getAccManager && getAccManager.AccountManageremailId ? getAccManager.AccountManageremailId : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div><div class="admin-panel-data contact-details-row">
                                <div class="dashboard-box-heading mt-2 mb-3">Service Manager Details</div>
                                <div class="row">
                                  {/* <!-- Name  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminRoleIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Name</div>
                                        <div class="info-content">
                                          {getSelectedAccManager ? getSelectedAccManager.serviceManagerName ? getSelectedAccManager.serviceManagerName : "N/A" : getAccManager && getAccManager.serviceManagerName ? getAccManager.serviceManagerName : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Phone no  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminPhoneIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Mobile Number</div>
                                        <div class="info-content">
                                          {getSelectedAccManager ? getSelectedAccManager.serviceManagermobile ? getSelectedAccManager.serviceManagermobile : "N/A" : getAccManager && getAccManager.serviceManagermobile ? getAccManager.serviceManagermobile : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <!-- Mail  --> */}
                                  <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                                    <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                      <div class="info-icon"><img src={adminMailIcon} alt="" /></div>
                                      <div class="px-3 py-1">
                                        <div class="info-name pb-1">Email ID</div>
                                        <div class="info-content">
                                          {getSelectedAccManager ? getSelectedAccManager.serviceManageremailId ? getSelectedAccManager.serviceManageremailId : "N/A" : getAccManager && getAccManager.serviceManageremailId ? getAccManager.serviceManageremailId : "N/A"}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>)
                        }
                        <div class="admin-panel-data contact-details-lastRow">
                          <div class="dashboard-box-heading mt-2 mb-3">Customer Care</div>
                          <div class="row">
                            {/* <!-- Phone no  --> */}
                            <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                              <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                <div class="info-icon"><img src={adminPhoneIcon} alt="" /></div>
                                <div class="px-3 py-1">
                                  <div class="info-name pb-1">Mobile Number</div>
                                  <div class="info-content">
                                    <a style={{ textDecoration: 'none', color: 'black' }} href="tel:1800 121 5678">
                                      1800 121 5678
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <!-- Mail  --> */}
                            <div class="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                              <div class="d-flex align-items-start justify-content-start account-billing-detail-box">
                                <div class="info-icon"><img src={adminMailIcon} alt="" /></div>
                                <div class="px-3 py-1">
                                  <div class="info-name pb-1">Email ID</div>
                                  <div class="info-content">
                                    <a style={{ textDecoration: 'none' }} href="mailto:support@spectra.co">
                                      support@spectra.co
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>}

                  {/* FOOTER START  */}
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  )

}