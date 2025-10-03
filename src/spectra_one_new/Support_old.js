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
  const crmRole = localStorage.getItem('crm_role');
  const segment = localStorage.getItem('segment');
  const companyID = localStorage.getItem('crm_company_id');
  const crm_role = localStorage.getItem('crm_role');

  //Naveen
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


  const [activeFilter, setActiveFilter] = useState('faq-filter-btn1');

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    // You can also handle other logic here, e.g., changing the display of elements.
    // Remember to use React state and props for rendering changes.
  };


  const showBillingAndOpenAccordion = () => {
    // Simulate a click event on the "Billing" button
    handleFilterClick("faq-filter-btn2");

    window.scrollTo(0, 0);
  };

  const showTechnicalAndOpenAccordion = () => {
    // Simulate a click event on the "Billing" button
    handleFilterClick("faq-filter-btn3");


    window.scrollTo(0, 0);

  };


  const showConnectionAndOpenAccordion = () => {
    // Simulate a click event on the "Billing" button
    handleFilterClick("faq-filter-btn4");
    window.scrollTo(0, 0);


  };










  if (crmRole === "L2") {
    return (
      <>
        <section className="section-dashboard">
          <div className="">
            <div className="d-flex justify-content-end">
              {/* SIDE NAVBAR  */}
              <SideBar />
              {/* top header */}
              {/* <Header /> */}
              {segment != "HBB" && <Header />}
              {segment == "HBB" && <HeaderHbb />}
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
                              {/* FAQs filte btns  */}
                              {/* <div className="faq-filter-btns d-flex align-items-center gap-3 flex-wrap">
                            <div
                              id="faq-filter-btn1"
                              className="faq-filter-btn activeFilter"
                            >
                              All
                            </div>
                            <div
                              id="faq-filter-btn2"
                              className="faq-filter-btn"
                              onClick={showBilling}
                            >
                              Billing
                            </div>
                            <div id="faq-filter-btn3" className="faq-filter-btn">
                              Connection
                            </div>
                            <div id="faq-filter-btn4" className="faq-filter-btn">
                              Internet Speed
                            </div>
                            <div id="faq-filter-btn5" className="faq-filter-btn">
                              1 Gbps Connection
                            </div>
                            <div id="faq-filter-btn6" className="faq-filter-btn">
                              Technical
                            </div>
                          </div> */}

                              {/* ishan */}
                              <div>
                                <div className="faq-filter-btns d-flex align-items-center gap-3 flex-wrap">
                                  <div
                                    id="faq-filter-btn1"
                                    className={`faq-filter-btn ${activeFilter === 'faq-filter-btn1' ? 'activeFilter' : ''}`}
                                    onClick={() => handleFilterClick('faq-filter-btn1')}
                                  >
                                    All
                                  </div>
                                  <div
                                    id="faq-filter-btn2"
                                    className={`faq-filter-btn ${activeFilter === 'faq-filter-btn2' ? 'activeFilter' : ''}`}
                                    onClick={() => handleFilterClick('faq-filter-btn2')}
                                  >
                                    Billing
                                  </div>

                                  <div
                                    id="faq-filter-btn3"
                                    className={`faq-filter-btn ${activeFilter === 'faq-filter-btn3' ? 'activeFilter' : ''}`}
                                    onClick={() => handleFilterClick('faq-filter-btn3')}
                                  >
                                    Technical
                                  </div>
                                  <div
                                    id="faq-filter-btn4"
                                    className={`faq-filter-btn ${activeFilter === 'faq-filter-btn4' ? 'activeFilter' : ''}`}
                                    onClick={() => handleFilterClick('faq-filter-btn4')}
                                  >
                                    Connection
                                  </div>
                                </div>
                              </div>
                              {/* end */}
                              {/* FAQs Box  */}
                              {activeFilter === 'faq-filter-btn1' && (
                                <div
                                  className="faq-box-wrapper mt-5"
                                  id="faq-billing"
                                  style={{ display: "block" }}
                                >
                                  <div className="faq-box-header">
                                    <div className="heading">Recently Viewed</div>
                                    <div className="sub-heading">
                                      Here name relatable topics of below questions
                                    </div>
                                  </div>
                                  <div className="faq-box-content">
                                    <div className="accordion" id="accordionExample">


                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How do i check my bill?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseOne"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li> <a href="/accountdetails?pid=bill">Click here</a> to check your bill.</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>	Click on the "Billing Details" option on the top right of the dashboard.</li></ul>
                                              <ul><li>	Select the duration for which you wish to check the bills. </li></ul>
                                              <ul><li>		You can download or share the required invoice."</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I check my outstanding amount?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseTwo"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTwo"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li> <a href="/accountdetails">Click here</a> to check your outstanding amount</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>	Click on the "Billing Details" option on the top right of the dashboard.</li></ul>
                                              <ul><li>		You can see your Unpaid amount in there</li></ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I change my current plan?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseThree"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingThree"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul> <li>    You can download the My Spectra App where you will get the Menu option and will be taken to the page where you can change your plan.</li></ul>
                                              <ul> <li> Alternatively, you may writing to us at <a href="mailto:support@spectra.co"> support@spectra.co</a> or call us at 011-4003 3100 to change your plan.</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfour">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsefour"
                                            aria-expanded="false"
                                            aria-controls="collapsefour"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How to check my data usage?

                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapsefour"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingfour"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              <ul><li>    <a href="/dashboard">Click here</a>  You can click here to check your data usage.</li></ul>
                                              <ul>Or</ul>
                                              <ul> <li>	Click on the Dashboard and then scroll down on the page to find the data usage details.</li></ul>
                                              <ul> <li>	You may set the filter of the view as per your requirement. </li></ul>
                                              <ul> <li>You can also download the image of the data usage graph.</li></ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfive">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsefive"
                                            aria-expanded="false"
                                            aria-controls="collapsefive"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Where can I find the bills for all my locations?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapsefive"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingfive"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li>    <a href="/accountdetails?pid=bill">Click here</a>  to view all your bills and change the filter to view the bills for your required location</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>    	Go to My Account </li></ul>
                                              <ul><li> 	Select Billing Details</li></ul>
                                              <ul><li> 	Change the filter to view the bills as per your required location</li> </ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSIX"
                                            aria-expanded="false"
                                            aria-controls="collapseSIX"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I get a clear explanation of my bill amount?

                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseSIX"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingSIX"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              To know about the charges levied on your invoice please refer to the second page of the invoice for the description of charges.

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSEVEN"
                                            aria-expanded="false"
                                            aria-controls="collapseSEVEN"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                I have seen a new plan which meets my requirement, but my bill cycle is not over, can I change the plan in between?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseSEVEN"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingSEVEN"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              Yes, you can change the plan in the mid-bill cycle, and the new invoice will be generated on a pro-rata basis for the remaining days in your bill cycle, however, we would recommend you to change your plan as per your bill cycle to avoid pro-rata charges.

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* ppp */}
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseEight"
                                            aria-expanded="true"
                                            aria-controls="collapseEight"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Why is my internet not working?
                                              </div>
                                              {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseEight"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingEight"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              Your internet connection may be affected due to multiple reasons

                                              Inactive account: Your account may be deactivated either due to non-payment or your request for deactivation

                                              <ul> <li>	Barred Services: Services for your account could be suspended due to non-payment</li></ul>
                                              <ul> <li>	Safe Custody: When you place your connection on hold the internet is also closed</li></ul>
                                              <ul> <li>Mass Outage: Multiple connections are affected due to the same reason, you will receive an SMS with the ETR for the service restoration </li></ul>
                                              <ul> <li>	Fiber/Technical Issue: There could be an issue with the connectivity you can raise a complaint for this concern</li></ul>

                                              You can quickly troubleshoot the network from the My Spectra App which is available for download through the App store and Play store.
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseEIGHT"
                                            aria-expanded="false"
                                            aria-controls="collapseEIGHT"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I test the Internet speed that I'm getting at my home?
                                              </div>
                                              {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseEIGHT"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingEIGHT"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul>
                                                <li><a href="http://spectraspeed.speedtestcustom.com/" target="_blank" rel="noopener noreferrer">Click here</a> for speed test of your network</li>
                                              </ul>



                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseNINE"
                                            aria-expanded="false"
                                            aria-controls="collapseNINE"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Is there a capping on the data or is it Unlimited? (Only for HBB SCP)
                                              </div>
                                              {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseNINE"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingNINE"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              As per DOT guidelines, Unlimited plans are now capped at 3300 GB for home broadband connections.
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfour">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTEN"
                                            aria-expanded="false"
                                            aria-controls="collapseTEN"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Why am I not getting 1 Gbps Speed? / Why am I getting only 100 Mbps when my neighbor is getting 900 Mbps, while we both are subscribed to 1 Gbps Package?
                                              </div>
                                              {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseTEN"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTEN"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              "For the best performance from your 1 Gbps connection, we recommend a direct ethernet (LAN) cable connection. Internet speeds over a wired connection (Cat 6 ethernet cable) are faster compared to wireless speeds.
                                              There are many factors that adversely impact your home Wi-Fi performance, these are:
                                              <ul><li>	Types of wireless devices, processors, and operating system: older phones and laptops that have older Wi-Fi protocols 802.11g, n will give you lower speed and even worse slow down the output from the router.</li></ul>
                                              <ul><li>	Invest in a dual band 802.11AC router. With dual band technology, you can set-up 2 SSID's, one on the 2.4 GHz band for slower connection but longer range. And the less occupied 5GHz frequency band for higher speeds at a shorter distance. </li></ul>
                                              <ul><li>	Number of devices in use: the more the devices, the more the load on the router and the lesser the speed.</li></ul>
                                              <ul><li>	Distance from the router: the 2.4 GHz channel gives you range but lower speeds, while the 5 GHz channel is less crowded, gives you higher speed but for shorter distances.</li></ul>
                                              <ul><li>	Network interference in your home. In high-rise buildings, with multiple flats on the same floor, signal interference from your neighbors’ router impacts the reach and speed of your router.</li></ul>
                                              <ul><li>Your internet browser: Plug-ins and add-ins affect browser performance and therefore the results of your speed test.</li></ul>
                                              <ul><li>	Building materials and in-home obstructions affect signal strength.</li></ul>
                                              <ul><li>	Location of your Wi-Fi router and its height: do place your router in a central, elevated spot. In perhaps your living room at an ideal height of 6 Ft (like the top of a shelf of your book rack) so that furniture and other obstacles do not block its signal. Your router should also be away from sources of electrical interference such as microwaves, cordless phones, and TVs."</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* hhh */}

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseELN"
                                            aria-expanded="true"
                                            aria-controls="collapseELN"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I check the status of my complaint/request?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseELN"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingELN"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              <ul><li> <a href="/servicerequests">Click here</a> to check the status of any open requests.</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>To check the status of any open complaint select the Service Requests option </li></ul>
                                              <ul><li>	Under the SR status tab you will be able to check active and resolved SRs"</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTWL"
                                            aria-expanded="false"
                                            aria-controls="collapseTWL"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I raise a service request?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseTWL"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTWL"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              {/* Click here (hyperlink to Raise an SR) to raise an SR. */}
                                              <ul><li> <a href="/servicerequests?pid=raiseNewSR">Click here</a> to raise your request.</li></ul>
                                              <ul>Or</ul>
                                              <ul><li> Select Service Requests</li></ul>
                                              <ul><li>	Click on ‘Raise an SR’ at the top of the page. </li></ul>
                                              <ul><li>	Now select the issue, add any details of your concern in the description, mention your alternate contact number and submit. </li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTHT"
                                            aria-expanded="false"
                                            aria-controls="collapseTHT"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I get in touch with your customer support?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseTHT"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTHT"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              You can contact our 24x7 customer support at 1800 121 5678 or   <a style={{ textDecoration: 'none' }} href="mailto:support@spectra.co">
                                                support@spectra.co
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfour">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFOURT"
                                            aria-expanded="false"
                                            aria-controls="collapseFOURT"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I change the registered contact details?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseFOURT"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingFOURT"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              <ul><li> <a href="/accountdetails">Click here</a>  for editing or changing your registered details</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>Click on "My Account", and you will be able to see your account details and change you registered email ID as required.</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfive">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFIFT"
                                            aria-expanded="false"
                                            aria-controls="collapseFIFT"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Where do I check my uptime reports?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseFIFT"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingFIFT"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              <ul><li> <a href="/dashboard">Click here</a> to  Availability (Uptime) to check the uptime for your connection.</li></ul>
                                              <ul>Or</ul>
                                              <ul> <li>	Click on the Dashboard and then scroll down to the bottom of the page to find Availability (uptime) .</li></ul>
                                              <ul> <li>		You can check the daywise uptime information for the ongoing month . </li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingSix">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSIXT"
                                            aria-expanded="false"
                                            aria-controls="collapseSIXT"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I get a new connection?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseSIXT"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingSIXT"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              For more details regarding a new connection you may contact us at: 1860 266 0099
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfive">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSVT"
                                            aria-expanded="false"
                                            aria-controls="collapseSVT"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                What is the benefit of a 1 Gbps connection?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseSVT"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingSVT"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              "Having a high-speed 1 Gbps connection means that multiple devices can deliver great experiences simultaneously.

                                              With Spectra 1 Gbps, you can:
                                              <ul><li>	Use multiple devices simultaneously without sacrificing speed or compromising on experience</li></ul>
                                              <ul><li>		Stream movies, download videos and upload photos with virtually no buffering or wait time</li></ul>
                                              <ul><li>		Play games online knowing you have the fastest Internet speed available</li></ul>
                                              <ul><li>		Work from home with the greatest efficiency and reliability you can get from a home Internet connection</li></ul>
                                              <ul><li>		Upload heavy files such as photographs, videos and work documents to the cloud in seconds"</li></ul>


                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* END */}
                                      {/* <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfour">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsefour"
                                            aria-expanded="false"
                                            aria-controls="collapsefour"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How do i check my bill?
                                              </div>
                                              <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapsefour"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingfour"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              Lorem ipsum dolor sit amet consectetur,
                                              adipisicing elit. Voluptates nemo voluptatibus
                                              commodi. Quam totam assumenda quibusdam
                                              consequuntur aliquam, id magnam iure nobis!
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfive">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsefive"
                                            aria-expanded="false"
                                            aria-controls="collapsefive"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How do i check my bill?
                                              </div>
                                              <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapsefive"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingfive"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              Lorem ipsum dolor sit amet consectetur,
                                              adipisicing elit. Voluptates nemo voluptatibus
                                              commodi. Quam totam assumenda quibusdam
                                              consequuntur aliquam, id magnam iure nobis!
                                            </div>
                                          </div>
                                        </div>
                                      </div> */}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* FAQ for billing tab DEMo only */}
                              {activeFilter === 'faq-filter-btn2' && (
                                <div
                                  className="faq-box-wrapper mt-5"
                                  id="faq-billing"
                                  style={{ display: "block" }}
                                >
                                  <div className="faq-box-header ">
                                    <div className="heading">Billing</div>
                                    <div className="sub-heading">
                                      Here name relatable topics of below questions
                                    </div>
                                  </div>
                                  <div className="faq-box-content">
                                    <div className="accordion" id="accordionExample">
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How do i check my bill?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseOne"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li> <a href="/accountdetails?pid=bill">Click here</a> to check your bill.</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>	Click on the "Billing Details" option on the top right of the dashboard.</li></ul>
                                              <ul><li>	Select the duration for which you wish to check the bills. </li></ul>
                                              <ul><li>		You can download or share the required invoice."</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I check my outstanding amount?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseTwo"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTwo"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li> <a href="/accountdetails">Click here</a> to check your outstanding amount</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>	Click on the "Billing Details" option on the top right of the dashboard.</li></ul>
                                              <ul><li>		You can see your Unpaid amount in there</li></ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I change my current plan?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseThree"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingThree"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul> <li>    You can download the My Spectra App where you will get the Menu option and will be taken to the page where you can change your plan.</li></ul>
                                              <ul> <li> Alternatively, you may writing to us at <a href="mailto:support@spectra.co"> support@spectra.co</a> or call us at 011-4003 3100 to change your plan.</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfour">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsefour"
                                            aria-expanded="false"
                                            aria-controls="collapsefour"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How to check my data usage?

                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapsefour"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingfour"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              <ul><li>    <a href="/dashboard">Click here</a>  You can click here to check your data usage.</li></ul>
                                              <ul>Or</ul>
                                              <ul> <li>	Click on the Dashboard and then scroll down on the page to find the data usage details.</li></ul>
                                              <ul> <li>	You may set the filter of the view as per your requirement. </li></ul>
                                              <ul> <li>You can also download the image of the data usage graph.</li></ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfive">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsefive"
                                            aria-expanded="false"
                                            aria-controls="collapsefive"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Where can I find the bills for all my locations?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapsefive"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingfive"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li>    <a href="/accountdetails?pid=bill">Click here</a>  to view all your bills and change the filter to view the bills for your required location</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>    	Go to My Account </li></ul>
                                              <ul><li> 	Select Billing Details</li></ul>
                                              <ul><li> 	Change the filter to view the bills as per your required location</li> </ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I get a clear explanation of my bill amount?

                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseTwo"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTwo"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              To know about the charges levied on your invoice please refer to the second page of the invoice for the description of charges.

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSix"
                                            aria-expanded="false"
                                            aria-controls="collapseSix"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                I have seen a new plan which meets my requirement, but my bill cycle is not over, can I change the plan in between?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseSix"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingSIX"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              Yes, you can change the plan in the mid-bill cycle, and the new invoice will be generated on a pro-rata basis for the remaining days in your bill cycle, however, we would recommend you to change your plan as per your bill cycle to avoid pro-rata charges.

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Faq for Technical  */}
                            {activeFilter === 'faq-filter-btn3' && (
                              <div
                                className="faq-box-wrapper mt-5"
                                id="faq-technical"
                                style={{ display: "block" }}
                              >
                                <div className="faq-box-header ">
                                  <div className="heading">Technical</div>
                                  <div className="sub-heading">
                                    Here name relatable topics of below questions
                                  </div>
                                </div>
                                <div className="faq-box-content">
                                  <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                      <h2 className="accordion-header" id="headingOne">
                                        <button
                                          className="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseOne"
                                          aria-expanded="true"
                                          aria-controls="collapseOne"
                                        >
                                          <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                            <div className="heading mb-3">
                                              Why is my internet not working?
                                            </div>
                                            {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                          </div>
                                        </button>
                                      </h2>
                                      <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body">
                                          <div className="faq-accordion-content">

                                            Your internet connection may be affected due to multiple reasons

                                            Inactive account: Your account may be deactivated either due to non-payment or your request for deactivation

                                            <ul> <li>	Barred Services: Services for your account could be suspended due to non-payment</li></ul>
                                            <ul> <li>	Safe Custody: When you place your connection on hold the internet is also closed</li></ul>
                                            <ul> <li>Mass Outage: Multiple connections are affected due to the same reason, you will receive an SMS with the ETR for the service restoration </li></ul>
                                            <ul> <li>	Fiber/Technical Issue: There could be an issue with the connectivity you can raise a complaint for this concern</li></ul>

                                            You can quickly troubleshoot the network from the My Spectra App which is available for download through the App store and Play store.
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="accordion-item">
                                      <h2 className="accordion-header" id="headingTwo">
                                        <button
                                          className="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseTwo"
                                          aria-expanded="false"
                                          aria-controls="collapseTwo"
                                        >
                                          <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                            <div className="heading mb-3">
                                              How can I test the Internet speed that I'm getting at my home?
                                            </div>
                                            {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                          </div>
                                        </button>
                                      </h2>
                                      <div
                                        id="collapseTwo"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingTwo"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body">
                                          <div className="faq-accordion-content">
                                            <ul>
                                              <li><a href="http://spectraspeed.speedtestcustom.com/" target="_blank" rel="noopener noreferrer">Click here</a> for speed test of your network</li>
                                            </ul>



                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="accordion-item">
                                      <h2 className="accordion-header" id="headingThree">
                                        <button
                                          className="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseThree"
                                          aria-expanded="false"
                                          aria-controls="collapseThree"
                                        >
                                          <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                            <div className="heading mb-3">
                                              Is there a capping on the data or is it Unlimited? (Only for HBB SCP)
                                            </div>
                                            {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                          </div>
                                        </button>
                                      </h2>
                                      <div
                                        id="collapseThree"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingThree"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body">
                                          <div className="faq-accordion-content">
                                            As per DOT guidelines, Unlimited plans are now capped at 3300 GB for home broadband connections.
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="accordion-item">
                                      <h2 className="accordion-header" id="headingfour">
                                        <button
                                          className="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapsefour"
                                          aria-expanded="false"
                                          aria-controls="collapsefour"
                                        >
                                          <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                            <div className="heading mb-3">
                                              Why am I not getting 1 Gbps Speed? / Why am I getting only 100 Mbps when my neighbor is getting 900 Mbps, while we both are subscribed to 1 Gbps Package?
                                            </div>
                                            {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                          </div>
                                        </button>
                                      </h2>
                                      <div
                                        id="collapsefour"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingfour"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body">
                                          <div className="faq-accordion-content">
                                            "For the best performance from your 1 Gbps connection, we recommend a direct ethernet (LAN) cable connection. Internet speeds over a wired connection (Cat 6 ethernet cable) are faster compared to wireless speeds.
                                            There are many factors that adversely impact your home Wi-Fi performance, these are:
                                            <ul><li>	Types of wireless devices, processors, and operating system: older phones and laptops that have older Wi-Fi protocols 802.11g, n will give you lower speed and even worse slow down the output from the router.</li></ul>
                                            <ul><li>	Invest in a dual band 802.11AC router. With dual band technology, you can set-up 2 SSID's, one on the 2.4 GHz band for slower connection but longer range. And the less occupied 5GHz frequency band for higher speeds at a shorter distance. </li></ul>
                                            <ul><li>	Number of devices in use: the more the devices, the more the load on the router and the lesser the speed.</li></ul>
                                            <ul><li>	Distance from the router: the 2.4 GHz channel gives you range but lower speeds, while the 5 GHz channel is less crowded, gives you higher speed but for shorter distances.</li></ul>
                                            <ul><li>	Network interference in your home. In high-rise buildings, with multiple flats on the same floor, signal interference from your neighbors’ router impacts the reach and speed of your router.</li></ul>
                                            <ul><li>Your internet browser: Plug-ins and add-ins affect browser performance and therefore the results of your speed test.</li></ul>
                                            <ul><li>	Building materials and in-home obstructions affect signal strength.</li></ul>
                                            <ul><li>	Location of your Wi-Fi router and its height: do place your router in a central, elevated spot. In perhaps your living room at an ideal height of 6 Ft (like the top of a shelf of your book rack) so that furniture and other obstacles do not block its signal. Your router should also be away from sources of electrical interference such as microwaves, cordless phones, and TVs."</li></ul>

                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* <div className="accordion-item">
                                  <h2 className="accordion-header" id="headingfive">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapsefive"
                                      aria-expanded="false"
                                      aria-controls="collapsefive"
                                    >
                                      <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                        <div className="heading mb-3">
                                          How do i check my bill?
                                        </div>
                                        <div className="sub-heading">
                                          Unable to check invoice, unable to check
                                          transaction.
                                        </div>
                                      </div>
                                    </button>
                                  </h2>
                                  <div
                                    id="collapsefive"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingfive"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="accordion-body">
                                      <div className="faq-accordion-content">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Voluptates nemo voluptatibus
                                        commodi. Quam totam assumenda quibusdam
                                        consequuntur aliquam, id magnam iure nobis!
                                      </div>
                                    </div>
                                  </div>
                                </div> */}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          {/* end */}
                          {/* Faq for Connection  */}
                          {activeFilter === 'faq-filter-btn4' && (
                            <div
                              className="faq-box-wrapper mt-5"
                              id="faq-connection"
                              style={{ display: "block" }}
                            >
                              <div className="faq-box-header">
                                <div className="heading">Connection</div>
                                <div className="sub-heading">
                                  Here name relatable topics of below questions
                                </div>
                              </div>
                              <div className="faq-box-content">
                                <div className="accordion" id="accordionExample">
                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            How can I check the status of my complaint/request?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapseOne"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingOne"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">

                                          <ul><li> <a href="/servicerequests">Click here</a> to check the status of any open requests.</li></ul>
                                          <ul>Or</ul>
                                          <ul><li>To check the status of any open complaint select the Service Requests option </li></ul>
                                          <ul><li>	Under the SR status tab you will be able to check active and resolved SRs"</li></ul>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            How can I raise a service request?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapseTwo"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingTwo"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">
                                          {/* Click here (hyperlink to Raise an SR) to raise an SR. */}
                                          <ul><li> <a href="/servicerequests?pid=raiseNewSR">Click here</a> to raise your request.</li></ul>
                                          <ul>Or</ul>
                                          <ul><li> Select Service Requests</li></ul>
                                          <ul><li>	Click on ‘Raise an SR’ at the top of the page. </li></ul>
                                          <ul><li>	Now select the issue, add any details of your concern in the description, mention your alternate contact number and submit. </li></ul>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="false"
                                        aria-controls="collapseThree"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            How can I get in touch with your customer support?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapseThree"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingThree"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">
                                          You can contact our 24x7 customer support at 1800 121 5678 or   <a style={{ textDecoration: 'none' }} href="mailto:support@spectra.co">
                                            support@spectra.co
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingfour">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapsefour"
                                        aria-expanded="false"
                                        aria-controls="collapsefour"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            How can I change the registered contact details?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapsefour"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingfour"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">

                                          <ul><li> <a href="/accountdetails">Click here</a>  for editing or changing your registered details</li></ul>
                                          <ul>Or</ul>
                                          <ul><li>Click on "My Account", and you will be able to see your account details and change you registered email ID as required.</li></ul>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingfive">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapsefive"
                                        aria-expanded="false"
                                        aria-controls="collapsefive"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            Where do I check my uptime reports?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapsefive"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingfive"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">

                                          <ul><li> <a href="/dashboard">Click here</a> to  Availability (Uptime) to check the uptime for your connection.</li></ul>
                                          <ul>Or</ul>
                                          <ul> <li>	Click on the Dashboard and then scroll down to the bottom of the page to find Availability (uptime) .</li></ul>
                                          <ul> <li>		You can check the daywise uptime information for the ongoing month . </li></ul>

                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingSix">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseSix"
                                        aria-expanded="false"
                                        aria-controls="collapseSix"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            How can I get a new connection?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapseSix"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingSix"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">
                                          For more details regarding a new connection you may contact us at: 1860 266 0099
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingfive">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseSeven"
                                        aria-expanded="false"
                                        aria-controls="collapseSeven"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            What is the benefit of a 1 Gbps connection?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapseSeven"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingSeven"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">
                                          "Having a high-speed 1 Gbps connection means that multiple devices can deliver great experiences simultaneously.

                                          With Spectra 1 Gbps, you can:
                                          <ul><li>	Use multiple devices simultaneously without sacrificing speed or compromising on experience</li></ul>
                                          <ul><li>		Stream movies, download videos and upload photos with virtually no buffering or wait time</li></ul>
                                          <ul><li>		Play games online knowing you have the fastest Internet speed available</li></ul>
                                          <ul><li>		Work from home with the greatest efficiency and reliability you can get from a home Internet connection</li></ul>
                                          <ul><li>		Upload heavy files such as photographs, videos and work documents to the cloud in seconds"</li></ul>


                                        </div>
                                      </div>
                                    </div>
                                  </div>





                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* end */}
                        {/* Support Guide Section  */}
                        {/* <div className="faq-main-wrapper" id="support-guide">
                          <div className="faq-headings mb-2">
                            <div className="account-tab-heading">Support Guide</div>
                            <div className="faq-sub-heading">Here goes description</div>
                          </div> */}
                        {/* <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 faq-inner-col"> */}
                        {/* Billing Box  */}
                        {/* <div className="faq-box-wrapper mb-4">
                                <div className="faq-box-header inner-faq-box">
                                  <div className="heading mb-4">Billing</div>
                                  <div className="sub-heading">
                                    Here name relatable topics of below questions
                                  </div>
                                </div>
                                <div
                                  onClick={showBillingAndOpenAccordion}
                                  className="faq-innerBox-content"
                                >
                                How do I check my bill?
                                  <span>
                                    <img
                                      src={accordionarrowdown}
                                      
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div
                                   onClick={showBillingAndOpenAccordion}
                                  className="faq-innerBox-content"
                                >
                                How can I change my current plan?
                                  <span>
                                    <img
                                      src={accordionarrowdown}
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="faq-innerBox-content">
                                  <div className="view-detail-btn d-flex align-items-center gap-2">
                                    View Details
                                    <img src={arrowout} alt="" />

                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 faq-inner-col"> */}
                        {/* Technical Box  */}
                        {/* <div className="faq-box-wrapper mb-4">
                                <div className="faq-box-header inner-faq-box">
                                  <div className="heading mb-4">Technical</div>
                                  <div className="sub-heading">
                                    Here name relatable topics of below questions
                                  </div>
                                </div>
                                <div className="faq-innerBox-content"
                                onClick= {showTechnicalAndOpenAccordion}>
                                Why is my internet not working?

                                  <span>
                                    <img
                                      src={accordionarrowdown}
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="faq-innerBox-content"
                                 onClick= {showTechnicalAndOpenAccordion}
                                 >
                                How can I test the Internet speed that I'm getting at my home?

                                  <span>
                                    <img
                                      src={accordionarrowdown}
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="faq-innerBox-content">
                                  <div className="view-detail-btn d-flex align-items-center gap-2">
                                    View Details
                                    <img src={arrowout} alt="" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 faq-inner-col"> */}
                        {/*  Connection Box  */}
                        {/* <div className="faq-box-wrapper mb-4">
                                <div className="faq-box-header inner-faq-box">
                                  <div className="heading mb-4">Connection</div>
                                  <div className="sub-heading">
                                    Here name relatable topics of below questions
                                  </div>
                                </div>
                                <div className="faq-innerBox-content"
                                onClick = {showConnectionAndOpenAccordion}>
                                Where do I check my uptime reports?
                                  <span>
                                    <img
                                      src={accordionarrowdown}
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="faq-innerBox-content"
                                onClick = {showConnectionAndOpenAccordion}>
                                How can I get a new connection?

                                  <span>
                                    <img
                                      src={accordionarrowdown}
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="faq-innerBox-content">
                                  <div className="view-detail-btn d-flex align-items-center gap-2">
                                    View Details
                                    <img src={arrowout} alt="" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          
                          </div>
                        </div> */}
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
                    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
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
                    </div>
                    {/* FOOTER START  */}
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



      </>
    )
  }

  if (crmRole === "L3") {
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
                              {/* FAQs filte btns  */}
                              {/* <div className="faq-filter-btns d-flex align-items-center gap-3 flex-wrap">
                            <div
                              id="faq-filter-btn1"
                              className="faq-filter-btn activeFilter"
                            >
                              All
                            </div>
                            <div
                              id="faq-filter-btn2"
                              className="faq-filter-btn"
                              onClick={showBilling}
                            >
                              Billing
                            </div>
                            <div id="faq-filter-btn3" className="faq-filter-btn">
                              Connection
                            </div>
                            <div id="faq-filter-btn4" className="faq-filter-btn">
                              Internet Speed
                            </div>
                            <div id="faq-filter-btn5" className="faq-filter-btn">
                              1 Gbps Connection
                            </div>
                            <div id="faq-filter-btn6" className="faq-filter-btn">
                              Technical
                            </div>
                          </div> */}

                              {/* ishan */}
                              <div>
                                <div className="faq-filter-btns d-flex align-items-center gap-3 flex-wrap">
                                  <div
                                    id="faq-filter-btn1"
                                    className={`faq-filter-btn ${activeFilter === 'faq-filter-btn1' ? 'activeFilter' : ''}`}
                                    onClick={() => handleFilterClick('faq-filter-btn1')}
                                  >
                                    All
                                  </div>
                                  <div
                                    id="faq-filter-btn2"
                                    className={`faq-filter-btn ${activeFilter === 'faq-filter-btn2' ? 'activeFilter' : ''}`}
                                    onClick={() => handleFilterClick('faq-filter-btn2')}
                                  >
                                    Billing
                                  </div>

                                  <div
                                    id="faq-filter-btn3"
                                    className={`faq-filter-btn ${activeFilter === 'faq-filter-btn3' ? 'activeFilter' : ''}`}
                                    onClick={() => handleFilterClick('faq-filter-btn3')}
                                  >
                                    Technical
                                  </div>
                                  <div
                                    id="faq-filter-btn4"
                                    className={`faq-filter-btn ${activeFilter === 'faq-filter-btn4' ? 'activeFilter' : ''}`}
                                    onClick={() => handleFilterClick('faq-filter-btn4')}
                                  >
                                    Connection
                                  </div>
                                </div>
                              </div>
                              {/* end */}
                              {/* FAQs Box  */}
                              {activeFilter === 'faq-filter-btn1' && (
                                <div
                                  className="faq-box-wrapper mt-5"
                                  id="faq-billing"
                                  style={{ display: "block" }}
                                >
                                  <div className="faq-box-header">
                                    <div className="heading">Recently Viewed</div>
                                    <div className="sub-heading">
                                      Here name relatable topics of below questions
                                    </div>
                                  </div>
                                  <div className="faq-box-content">
                                    <div className="accordion" id="accordionExample">


                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How do i check my bill?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseOne"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li> <a href="/accountdetails?pid=bill">Click here</a> to check your bill.</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>	Click on the "Billing Details" option on the top right of the dashboard.</li></ul>
                                              <ul><li>	Select the duration for which you wish to check the bills. </li></ul>
                                              <ul><li>		You can download or share the required invoice."</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I check my outstanding amount?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseTwo"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTwo"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li> <a href="/accountdetails">Click here</a> to check your outstanding amount</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>	Click on the "Billing Details" option on the top right of the dashboard.</li></ul>
                                              <ul><li>		You can see your Unpaid amount in there</li></ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I change my current plan?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseThree"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingThree"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul> <li>    You can download the My Spectra App where you will get the Menu option and will be taken to the page where you can change your plan.</li></ul>
                                              <ul> <li> Alternatively, you may writing to us at <a href="mailto:support@spectra.co"> support@spectra.co</a> or call us at 011-4003 3100 to change your plan.</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfour">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsefour"
                                            aria-expanded="false"
                                            aria-controls="collapsefour"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How to check my data usage?

                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapsefour"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingfour"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              <ul><li>    <a href="/dashboard">Click here</a>  You can click here to check your data usage.</li></ul>
                                              <ul>Or</ul>
                                              <ul> <li>	Click on the Dashboard and then scroll down on the page to find the data usage details.</li></ul>
                                              <ul> <li>	You may set the filter of the view as per your requirement. </li></ul>
                                              <ul> <li>You can also download the image of the data usage graph.</li></ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfive">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsefive"
                                            aria-expanded="false"
                                            aria-controls="collapsefive"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Where can I find the bills for all my locations?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapsefive"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingfive"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li>    <a href="/accountdetails?pid=bill">Click here</a>  to view all your bills and change the filter to view the bills for your required location</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>    	Go to My Account </li></ul>
                                              <ul><li> 	Select Billing Details</li></ul>
                                              <ul><li> 	Change the filter to view the bills as per your required location</li> </ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSIX"
                                            aria-expanded="false"
                                            aria-controls="collapseSIX"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I get a clear explanation of my bill amount?

                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseSIX"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingSIX"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              To know about the charges levied on your invoice please refer to the second page of the invoice for the description of charges.

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSEVEN"
                                            aria-expanded="false"
                                            aria-controls="collapseSEVEN"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                I have seen a new plan which meets my requirement, but my bill cycle is not over, can I change the plan in between?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseSEVEN"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingSEVEN"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              Yes, you can change the plan in the mid-bill cycle, and the new invoice will be generated on a pro-rata basis for the remaining days in your bill cycle, however, we would recommend you to change your plan as per your bill cycle to avoid pro-rata charges.

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* ppp */}
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseEight"
                                            aria-expanded="true"
                                            aria-controls="collapseEight"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Why is my internet not working?
                                              </div>
                                              {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseEight"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingEight"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              Your internet connection may be affected due to multiple reasons

                                              Inactive account: Your account may be deactivated either due to non-payment or your request for deactivation

                                              <ul> <li>	Barred Services: Services for your account could be suspended due to non-payment</li></ul>
                                              <ul> <li>	Safe Custody: When you place your connection on hold the internet is also closed</li></ul>
                                              <ul> <li>Mass Outage: Multiple connections are affected due to the same reason, you will receive an SMS with the ETR for the service restoration </li></ul>
                                              <ul> <li>	Fiber/Technical Issue: There could be an issue with the connectivity you can raise a complaint for this concern</li></ul>

                                              You can quickly troubleshoot the network from the My Spectra App which is available for download through the App store and Play store.
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseEIGHT"
                                            aria-expanded="false"
                                            aria-controls="collapseEIGHT"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I test the Internet speed that I'm getting at my home?
                                              </div>
                                              {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseEIGHT"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingEIGHT"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul>
                                                <li><a href="http://spectraspeed.speedtestcustom.com/" target="_blank" rel="noopener noreferrer">Click here</a> for speed test of your network</li>
                                              </ul>



                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseNINE"
                                            aria-expanded="false"
                                            aria-controls="collapseNINE"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Is there a capping on the data or is it Unlimited? (Only for HBB SCP)
                                              </div>
                                              {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseNINE"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingNINE"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              As per DOT guidelines, Unlimited plans are now capped at 3300 GB for home broadband connections.
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfour">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTEN"
                                            aria-expanded="false"
                                            aria-controls="collapseTEN"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Why am I not getting 1 Gbps Speed? / Why am I getting only 100 Mbps when my neighbor is getting 900 Mbps, while we both are subscribed to 1 Gbps Package?
                                              </div>
                                              {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseTEN"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTEN"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              "For the best performance from your 1 Gbps connection, we recommend a direct ethernet (LAN) cable connection. Internet speeds over a wired connection (Cat 6 ethernet cable) are faster compared to wireless speeds.
                                              There are many factors that adversely impact your home Wi-Fi performance, these are:
                                              <ul><li>	Types of wireless devices, processors, and operating system: older phones and laptops that have older Wi-Fi protocols 802.11g, n will give you lower speed and even worse slow down the output from the router.</li></ul>
                                              <ul><li>	Invest in a dual band 802.11AC router. With dual band technology, you can set-up 2 SSID's, one on the 2.4 GHz band for slower connection but longer range. And the less occupied 5GHz frequency band for higher speeds at a shorter distance. </li></ul>
                                              <ul><li>	Number of devices in use: the more the devices, the more the load on the router and the lesser the speed.</li></ul>
                                              <ul><li>	Distance from the router: the 2.4 GHz channel gives you range but lower speeds, while the 5 GHz channel is less crowded, gives you higher speed but for shorter distances.</li></ul>
                                              <ul><li>	Network interference in your home. In high-rise buildings, with multiple flats on the same floor, signal interference from your neighbors’ router impacts the reach and speed of your router.</li></ul>
                                              <ul><li>Your internet browser: Plug-ins and add-ins affect browser performance and therefore the results of your speed test.</li></ul>
                                              <ul><li>	Building materials and in-home obstructions affect signal strength.</li></ul>
                                              <ul><li>	Location of your Wi-Fi router and its height: do place your router in a central, elevated spot. In perhaps your living room at an ideal height of 6 Ft (like the top of a shelf of your book rack) so that furniture and other obstacles do not block its signal. Your router should also be away from sources of electrical interference such as microwaves, cordless phones, and TVs."</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* hhh */}

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseELN"
                                            aria-expanded="true"
                                            aria-controls="collapseELN"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I check the status of my complaint/request?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseELN"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingELN"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              <ul><li> <a href="/servicerequests">Click here</a> to check the status of any open requests.</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>To check the status of any open complaint select the Service Requests option </li></ul>
                                              <ul><li>	Under the SR status tab you will be able to check active and resolved SRs"</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTWL"
                                            aria-expanded="false"
                                            aria-controls="collapseTWL"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I raise a service request?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseTWL"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTWL"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              {/* Click here (hyperlink to Raise an SR) to raise an SR. */}
                                              <ul><li> <a href="/servicerequests?pid=raiseNewSR">Click here</a> to raise your request.</li></ul>
                                              <ul>Or</ul>
                                              <ul><li> Select Service Requests</li></ul>
                                              <ul><li>	Click on ‘Raise an SR’ at the top of the page. </li></ul>
                                              <ul><li>	Now select the issue, add any details of your concern in the description, mention your alternate contact number and submit. </li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTHT"
                                            aria-expanded="false"
                                            aria-controls="collapseTHT"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I get in touch with your customer support?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseTHT"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTHT"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              You can contact our 24x7 customer support at 1800 121 5678 or   <a style={{ textDecoration: 'none' }} href="mailto:support@spectra.co">
                                                support@spectra.co
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfour">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFOURT"
                                            aria-expanded="false"
                                            aria-controls="collapseFOURT"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I change the registered contact details?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseFOURT"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingFOURT"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              <ul><li> <a href="/accountdetails">Click here</a>  for editing or changing your registered details</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>Click on "My Account", and you will be able to see your account details and change you registered email ID as required.</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfive">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFIFT"
                                            aria-expanded="false"
                                            aria-controls="collapseFIFT"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Where do I check my uptime reports?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseFIFT"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingFIFT"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              <ul><li> <a href="/dashboard">Click here</a> to  Availability (Uptime) to check the uptime for your connection.</li></ul>
                                              <ul>Or</ul>
                                              <ul> <li>	Click on the Dashboard and then scroll down to the bottom of the page to find Availability (uptime) .</li></ul>
                                              <ul> <li>		You can check the daywise uptime information for the ongoing month . </li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingSix">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSIXT"
                                            aria-expanded="false"
                                            aria-controls="collapseSIXT"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I get a new connection?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseSIXT"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingSIXT"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              For more details regarding a new connection you may contact us at: 1860 266 0099
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfive">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSVT"
                                            aria-expanded="false"
                                            aria-controls="collapseSVT"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                What is the benefit of a 1 Gbps connection?
                                              </div>
                                              {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseSVT"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingSVT"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              "Having a high-speed 1 Gbps connection means that multiple devices can deliver great experiences simultaneously.

                                              With Spectra 1 Gbps, you can:
                                              <ul><li>	Use multiple devices simultaneously without sacrificing speed or compromising on experience</li></ul>
                                              <ul><li>		Stream movies, download videos and upload photos with virtually no buffering or wait time</li></ul>
                                              <ul><li>		Play games online knowing you have the fastest Internet speed available</li></ul>
                                              <ul><li>		Work from home with the greatest efficiency and reliability you can get from a home Internet connection</li></ul>
                                              <ul><li>		Upload heavy files such as photographs, videos and work documents to the cloud in seconds"</li></ul>


                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* END */}
                                      {/* <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfour">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsefour"
                                            aria-expanded="false"
                                            aria-controls="collapsefour"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How do i check my bill?
                                              </div>
                                              <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapsefour"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingfour"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              Lorem ipsum dolor sit amet consectetur,
                                              adipisicing elit. Voluptates nemo voluptatibus
                                              commodi. Quam totam assumenda quibusdam
                                              consequuntur aliquam, id magnam iure nobis!
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfive">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsefive"
                                            aria-expanded="false"
                                            aria-controls="collapsefive"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How do i check my bill?
                                              </div>
                                              <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div>
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapsefive"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingfive"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              Lorem ipsum dolor sit amet consectetur,
                                              adipisicing elit. Voluptates nemo voluptatibus
                                              commodi. Quam totam assumenda quibusdam
                                              consequuntur aliquam, id magnam iure nobis!
                                            </div>
                                          </div>
                                        </div>
                                      </div> */}
                                    </div>
                                  </div>
                                </div>
                              )}
                              {/* FAQ for billing tab DEMo only */}
                              {activeFilter === 'faq-filter-btn2' && (
                                <div
                                  className="faq-box-wrapper mt-5"
                                  id="faq-billing"
                                  style={{ display: "block" }}
                                >
                                  <div className="faq-box-header ">
                                    <div className="heading">Billing</div>
                                    <div className="sub-heading">
                                      Here name relatable topics of below questions
                                    </div>
                                  </div>
                                  <div className="faq-box-content">
                                    <div className="accordion" id="accordionExample">
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How do i check my bill?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseOne"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li> <a href="/accountdetails?pid=bill">Click here</a> to check your bill.</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>	Click on the "Billing Details" option on the top right of the dashboard.</li></ul>
                                              <ul><li>	Select the duration for which you wish to check the bills. </li></ul>
                                              <ul><li>		You can download or share the required invoice."</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I check my outstanding amount?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseTwo"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTwo"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li> <a href="/accountdetails">Click here</a> to check your outstanding amount</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>	Click on the "Billing Details" option on the top right of the dashboard.</li></ul>
                                              <ul><li>		You can see your Unpaid amount in there</li></ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I change my current plan?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseThree"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingThree"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul> <li>    You can download the My Spectra App where you will get the Menu option and will be taken to the page where you can change your plan.</li></ul>
                                              <ul> <li> Alternatively, you may writing to us at <a href="mailto:support@spectra.co"> support@spectra.co</a> or call us at 011-4003 3100 to change your plan.</li></ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfour">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsefour"
                                            aria-expanded="false"
                                            aria-controls="collapsefour"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How to check my data usage?

                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapsefour"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingfour"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              <ul><li>    <a href="/dashboard">Click here</a>  You can click here to check your data usage.</li></ul>
                                              <ul>Or</ul>
                                              <ul> <li>	Click on the Dashboard and then scroll down on the page to find the data usage details.</li></ul>
                                              <ul> <li>	You may set the filter of the view as per your requirement. </li></ul>
                                              <ul> <li>You can also download the image of the data usage graph.</li></ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingfive">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsefive"
                                            aria-expanded="false"
                                            aria-controls="collapsefive"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                Where can I find the bills for all my locations?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapsefive"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingfive"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              <ul><li>    <a href="/accountdetails?pid=bill">Click here</a>  to view all your bills and change the filter to view the bills for your required location</li></ul>
                                              <ul>Or</ul>
                                              <ul><li>    	Go to My Account </li></ul>
                                              <ul><li> 	Select Billing Details</li></ul>
                                              <ul><li> 	Change the filter to view the bills as per your required location</li> </ul>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                How can I get a clear explanation of my bill amount?

                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseTwo"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingTwo"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">

                                              To know about the charges levied on your invoice please refer to the second page of the invoice for the description of charges.

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                          <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSix"
                                            aria-expanded="false"
                                            aria-controls="collapseSix"
                                          >
                                            <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                              <div className="heading mb-3">
                                                I have seen a new plan which meets my requirement, but my bill cycle is not over, can I change the plan in between?
                                              </div>
                                              {/* <div className="sub-heading">
                                                Unable to check invoice, unable to check
                                                transaction.
                                              </div> */}
                                            </div>
                                          </button>
                                        </h2>
                                        <div
                                          id="collapseSix"
                                          className="accordion-collapse collapse"
                                          aria-labelledby="headingSIX"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="accordion-body">
                                            <div className="faq-accordion-content">
                                              Yes, you can change the plan in the mid-bill cycle, and the new invoice will be generated on a pro-rata basis for the remaining days in your bill cycle, however, we would recommend you to change your plan as per your bill cycle to avoid pro-rata charges.

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            {/* Faq for Technical  */}
                            {activeFilter === 'faq-filter-btn3' && (
                              <div
                                className="faq-box-wrapper mt-5"
                                id="faq-technical"
                                style={{ display: "block" }}
                              >
                                <div className="faq-box-header ">
                                  <div className="heading">Technical</div>
                                  <div className="sub-heading">
                                    Here name relatable topics of below questions
                                  </div>
                                </div>
                                <div className="faq-box-content">
                                  <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                      <h2 className="accordion-header" id="headingOne">
                                        <button
                                          className="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseOne"
                                          aria-expanded="true"
                                          aria-controls="collapseOne"
                                        >
                                          <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                            <div className="heading mb-3">
                                              Why is my internet not working?
                                            </div>
                                            {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                          </div>
                                        </button>
                                      </h2>
                                      <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingOne"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body">
                                          <div className="faq-accordion-content">

                                            Your internet connection may be affected due to multiple reasons

                                            Inactive account: Your account may be deactivated either due to non-payment or your request for deactivation

                                            <ul> <li>	Barred Services: Services for your account could be suspended due to non-payment</li></ul>
                                            <ul> <li>	Safe Custody: When you place your connection on hold the internet is also closed</li></ul>
                                            <ul> <li>Mass Outage: Multiple connections are affected due to the same reason, you will receive an SMS with the ETR for the service restoration </li></ul>
                                            <ul> <li>	Fiber/Technical Issue: There could be an issue with the connectivity you can raise a complaint for this concern</li></ul>

                                            You can quickly troubleshoot the network from the My Spectra App which is available for download through the App store and Play store.
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="accordion-item">
                                      <h2 className="accordion-header" id="headingTwo">
                                        <button
                                          className="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseTwo"
                                          aria-expanded="false"
                                          aria-controls="collapseTwo"
                                        >
                                          <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                            <div className="heading mb-3">
                                              How can I test the Internet speed that I'm getting at my home?
                                            </div>
                                            {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                          </div>
                                        </button>
                                      </h2>
                                      <div
                                        id="collapseTwo"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingTwo"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body">
                                          <div className="faq-accordion-content">
                                            <ul>
                                              <li><a href="http://spectraspeed.speedtestcustom.com/" target="_blank" rel="noopener noreferrer">Click here</a> for speed test of your network</li>
                                            </ul>



                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="accordion-item">
                                      <h2 className="accordion-header" id="headingThree">
                                        <button
                                          className="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapseThree"
                                          aria-expanded="false"
                                          aria-controls="collapseThree"
                                        >
                                          <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                            <div className="heading mb-3">
                                              Is there a capping on the data or is it Unlimited? (Only for HBB SCP)
                                            </div>
                                            {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                          </div>
                                        </button>
                                      </h2>
                                      <div
                                        id="collapseThree"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingThree"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body">
                                          <div className="faq-accordion-content">
                                            As per DOT guidelines, Unlimited plans are now capped at 3300 GB for home broadband connections.
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="accordion-item">
                                      <h2 className="accordion-header" id="headingfour">
                                        <button
                                          className="accordion-button collapsed"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target="#collapsefour"
                                          aria-expanded="false"
                                          aria-controls="collapsefour"
                                        >
                                          <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                            <div className="heading mb-3">
                                              Why am I not getting 1 Gbps Speed? / Why am I getting only 100 Mbps when my neighbor is getting 900 Mbps, while we both are subscribed to 1 Gbps Package?
                                            </div>
                                            {/* <div className="sub-heading">
                                              Unable to check invoice, unable to check
                                              transaction.
                                            </div> */}
                                          </div>
                                        </button>
                                      </h2>
                                      <div
                                        id="collapsefour"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingfour"
                                        data-bs-parent="#accordionExample"
                                      >
                                        <div className="accordion-body">
                                          <div className="faq-accordion-content">
                                            "For the best performance from your 1 Gbps connection, we recommend a direct ethernet (LAN) cable connection. Internet speeds over a wired connection (Cat 6 ethernet cable) are faster compared to wireless speeds.
                                            There are many factors that adversely impact your home Wi-Fi performance, these are:
                                            <ul><li>	Types of wireless devices, processors, and operating system: older phones and laptops that have older Wi-Fi protocols 802.11g, n will give you lower speed and even worse slow down the output from the router.</li></ul>
                                            <ul><li>	Invest in a dual band 802.11AC router. With dual band technology, you can set-up 2 SSID's, one on the 2.4 GHz band for slower connection but longer range. And the less occupied 5GHz frequency band for higher speeds at a shorter distance. </li></ul>
                                            <ul><li>	Number of devices in use: the more the devices, the more the load on the router and the lesser the speed.</li></ul>
                                            <ul><li>	Distance from the router: the 2.4 GHz channel gives you range but lower speeds, while the 5 GHz channel is less crowded, gives you higher speed but for shorter distances.</li></ul>
                                            <ul><li>	Network interference in your home. In high-rise buildings, with multiple flats on the same floor, signal interference from your neighbors’ router impacts the reach and speed of your router.</li></ul>
                                            <ul><li>Your internet browser: Plug-ins and add-ins affect browser performance and therefore the results of your speed test.</li></ul>
                                            <ul><li>	Building materials and in-home obstructions affect signal strength.</li></ul>
                                            <ul><li>	Location of your Wi-Fi router and its height: do place your router in a central, elevated spot. In perhaps your living room at an ideal height of 6 Ft (like the top of a shelf of your book rack) so that furniture and other obstacles do not block its signal. Your router should also be away from sources of electrical interference such as microwaves, cordless phones, and TVs."</li></ul>

                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* <div className="accordion-item">
                                  <h2 className="accordion-header" id="headingfive">
                                    <button
                                      className="accordion-button collapsed"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#collapsefive"
                                      aria-expanded="false"
                                      aria-controls="collapsefive"
                                    >
                                      <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                        <div className="heading mb-3">
                                          How do i check my bill?
                                        </div>
                                        <div className="sub-heading">
                                          Unable to check invoice, unable to check
                                          transaction.
                                        </div>
                                      </div>
                                    </button>
                                  </h2>
                                  <div
                                    id="collapsefive"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingfive"
                                    data-bs-parent="#accordionExample"
                                  >
                                    <div className="accordion-body">
                                      <div className="faq-accordion-content">
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Voluptates nemo voluptatibus
                                        commodi. Quam totam assumenda quibusdam
                                        consequuntur aliquam, id magnam iure nobis!
                                      </div>
                                    </div>
                                  </div>
                                </div> */}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          {/* end */}
                          {/* Faq for Connection  */}
                          {activeFilter === 'faq-filter-btn4' && (
                            <div
                              className="faq-box-wrapper mt-5"
                              id="faq-connection"
                              style={{ display: "block" }}
                            >
                              <div className="faq-box-header">
                                <div className="heading">Connection</div>
                                <div className="sub-heading">
                                  Here name relatable topics of below questions
                                </div>
                              </div>
                              <div className="faq-box-content">
                                <div className="accordion" id="accordionExample">
                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            How can I check the status of my complaint/request?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapseOne"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingOne"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">

                                          <ul><li> <a href="/servicerequests">Click here</a> to check the status of any open requests.</li></ul>
                                          <ul>Or</ul>
                                          <ul><li>To check the status of any open complaint select the Service Requests option </li></ul>
                                          <ul><li>	Under the SR status tab you will be able to check active and resolved SRs"</li></ul>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            How can I raise a service request?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapseTwo"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingTwo"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">
                                          {/* Click here (hyperlink to Raise an SR) to raise an SR. */}
                                          <ul><li> <a href="/servicerequests?pid=raiseNewSR">Click here</a> to raise your request.</li></ul>
                                          <ul>Or</ul>
                                          <ul><li> Select Service Requests</li></ul>
                                          <ul><li>	Click on ‘Raise an SR’ at the top of the page. </li></ul>
                                          <ul><li>	Now select the issue, add any details of your concern in the description, mention your alternate contact number and submit. </li></ul>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="false"
                                        aria-controls="collapseThree"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            How can I get in touch with your customer support?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapseThree"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingThree"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">
                                          You can contact our 24x7 customer support at 1800 121 5678 or   <a style={{ textDecoration: 'none' }} href="mailto:support@spectra.co">
                                            support@spectra.co
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingfour">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapsefour"
                                        aria-expanded="false"
                                        aria-controls="collapsefour"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            How can I change the registered contact details?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapsefour"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingfour"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">

                                          <ul><li> <a href="/accountdetails">Click here</a>  for editing or changing your registered details</li></ul>
                                          <ul>Or</ul>
                                          <ul><li>Click on "My Account", and you will be able to see your account details and change you registered email ID as required.</li></ul>

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingfive">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapsefive"
                                        aria-expanded="false"
                                        aria-controls="collapsefive"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            Where do I check my uptime reports?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapsefive"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingfive"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">

                                          <ul><li> <a href="/dashboard">Click here</a> to  Availability (Uptime) to check the uptime for your connection.</li></ul>
                                          <ul>Or</ul>
                                          <ul> <li>	Click on the Dashboard and then scroll down to the bottom of the page to find Availability (uptime) .</li></ul>
                                          <ul> <li>		You can check the daywise uptime information for the ongoing month . </li></ul>

                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingSix">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseSix"
                                        aria-expanded="false"
                                        aria-controls="collapseSix"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            How can I get a new connection?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapseSix"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingSix"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">
                                          For more details regarding a new connection you may contact us at: 1860 266 0099
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingfive">
                                      <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseSeven"
                                        aria-expanded="false"
                                        aria-controls="collapseSeven"
                                      >
                                        <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                          <div className="heading mb-3">
                                            What is the benefit of a 1 Gbps connection?
                                          </div>
                                          {/* <div className="sub-heading">
                                            Unable to check invoice, unable to check
                                            transaction.
                                          </div> */}
                                        </div>
                                      </button>
                                    </h2>
                                    <div
                                      id="collapseSeven"
                                      className="accordion-collapse collapse"
                                      aria-labelledby="headingSeven"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="accordion-body">
                                        <div className="faq-accordion-content">
                                          "Having a high-speed 1 Gbps connection means that multiple devices can deliver great experiences simultaneously.

                                          With Spectra 1 Gbps, you can:
                                          <ul><li>	Use multiple devices simultaneously without sacrificing speed or compromising on experience</li></ul>
                                          <ul><li>		Stream movies, download videos and upload photos with virtually no buffering or wait time</li></ul>
                                          <ul><li>		Play games online knowing you have the fastest Internet speed available</li></ul>
                                          <ul><li>		Work from home with the greatest efficiency and reliability you can get from a home Internet connection</li></ul>
                                          <ul><li>		Upload heavy files such as photographs, videos and work documents to the cloud in seconds"</li></ul>


                                        </div>
                                      </div>
                                    </div>
                                  </div>





                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        {/* end */}
                        {/* Support Guide Section  */}
                        {/* <div className="faq-main-wrapper" id="support-guide">
                          <div className="faq-headings mb-2">
                            <div className="account-tab-heading">Support Guide</div>
                            <div className="faq-sub-heading">Here goes description</div>
                          </div> */}
                        {/* <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 faq-inner-col"> */}
                        {/* Billing Box  */}
                        {/* <div className="faq-box-wrapper mb-4">
                                <div className="faq-box-header inner-faq-box">
                                  <div className="heading mb-4">Billing</div>
                                  <div className="sub-heading">
                                    Here name relatable topics of below questions
                                  </div>
                                </div>
                                <div
                                  onClick={showBillingAndOpenAccordion}
                                  className="faq-innerBox-content"
                                >
                                How do I check my bill?
                                  <span>
                                    <img
                                      src={accordionarrowdown}
                                      
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div
                                   onClick={showBillingAndOpenAccordion}
                                  className="faq-innerBox-content"
                                >
                                How can I change my current plan?
                                  <span>
                                    <img
                                      src={accordionarrowdown}
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="faq-innerBox-content">
                                  <div className="view-detail-btn d-flex align-items-center gap-2">
                                    View Details
                                    <img src={arrowout} alt="" />

                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 faq-inner-col"> */}
                        {/* Technical Box  */}
                        {/* <div className="faq-box-wrapper mb-4">
                                <div className="faq-box-header inner-faq-box">
                                  <div className="heading mb-4">Technical</div>
                                  <div className="sub-heading">
                                    Here name relatable topics of below questions
                                  </div>
                                </div>
                                <div className="faq-innerBox-content"
                                onClick= {showTechnicalAndOpenAccordion}>
                                Why is my internet not working?

                                  <span>
                                    <img
                                      src={accordionarrowdown}
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="faq-innerBox-content"
                                 onClick= {showTechnicalAndOpenAccordion}
                                 >
                                How can I test the Internet speed that I'm getting at my home?

                                  <span>
                                    <img
                                      src={accordionarrowdown}
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="faq-innerBox-content">
                                  <div className="view-detail-btn d-flex align-items-center gap-2">
                                    View Details
                                    <img src={arrowout} alt="" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 faq-inner-col"> */}
                        {/*  Connection Box  */}
                        {/* <div className="faq-box-wrapper mb-4">
                                <div className="faq-box-header inner-faq-box">
                                  <div className="heading mb-4">Connection</div>
                                  <div className="sub-heading">
                                    Here name relatable topics of below questions
                                  </div>
                                </div>
                                <div className="faq-innerBox-content"
                                onClick = {showConnectionAndOpenAccordion}>
                                Where do I check my uptime reports?
                                  <span>
                                    <img
                                      src={accordionarrowdown}
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="faq-innerBox-content"
                                onClick = {showConnectionAndOpenAccordion}>
                                How can I get a new connection?

                                  <span>
                                    <img
                                      src={accordionarrowdown}
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="faq-innerBox-content">
                                  <div className="view-detail-btn d-flex align-items-center gap-2">
                                    View Details
                                    <img src={arrowout} alt="" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          
                          </div>
                        </div> */}
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
                    <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
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
                    </div>
                    {/* FOOTER START  */}
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



      </>
    )
  }
}