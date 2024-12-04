import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import HeaderNotification from "../spectra_one_new/HeaderNotification";
import topSearch from "../assets/images/top-search.svg";
import topBell from "../assets/images/top-bell.svg";
import topUserImg from "../assets/images/top-user-img.svg";
import "../assets/css/dashboard.css"
// import userImage from "../assets/images/user-icon (2).png"
import userImage from "../assets/images/gg_profile.png"
// blank-profile-picture-973jpg
import {
  getNotificationByServiceId,
  getUnreadNotification,
  getUnreadNotificationCount,
  updateNotificationAsRead
} from '../function';



export default function HeaderHbb() {
  
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [getCount, setCount] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const companyName = localStorage.getItem('company_name');
  const serviceID = localStorage.getItem('credentialKey');

  const handleSearchClick = (element) => {
    const searchBox = document.getElementById("headerSearchInput");

    if (element && element.children && element.children.length > 0) {
      const searchIcon = element.children[0];
      searchBox.classList.toggle("show");
      searchBox.focus();
      searchIcon.classList.toggle("d-none");

      // add blur event listener to search box
      searchBox.addEventListener("blur", () => {
        searchBox.classList.remove("show");
        searchIcon.classList.remove("d-none");
      });
    }
  };
  const handleChangePassword = () => {
    navigate('/passwordmanagement')
  }
  const handleLogout = () => {

    // Remove stored items from localStorage

    localStorage.removeItem('credentialKey');

    localStorage.removeItem('crm_group_id');

    localStorage.removeItem('crm_company_id');

    localStorage.removeItem('crm_location_id');

    localStorage.removeItem('crm_role');

    localStorage.removeItem('company_name');

    localStorage.removeItem('username');

    localStorage.removeItem('password');

    localStorage.removeItem('isLoggedIn');
    localStorage.clear();
    sessionStorage.clear();

    // Redirect the user to the login page

    navigate('/');

  };
  const countData = async () => {
    try {
      const count = await getUnreadNotificationCount(serviceID);
      // console.log(count);
      setCount(count.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    countData(); // Call the async function to fetch data
  }, []);
  // useEffect(() => {

  //   const profileWrapper = document.getElementById('profile-wrapper');

  //   const profileMenu = document.querySelector('.profile-menu');




  //   const handleClick = () => {

  //     profileMenu.classList.toggle('show');

  //   };




  //   if (profileWrapper) {

  //     profileWrapper.addEventListener('click', handleClick);

  //   }




  //   return () => {

  //     if (profileWrapper) {

  //       profileWrapper.removeEventListener('click', handleClick);

  //     }

  //   };

  // }, []); // Empty dependency array to ensure the effect runs only once

  const handleClickOutside = (event) => {
    countData()
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      // Clicked outside the notification, so close it
      setPopoverVisible(false);
    }
  };

  useEffect(() => {
    // Add an event listener to handle clicks outside the notification
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const profileWrapper = document.getElementById('profile-wrapper');
    const profileMenu = document.querySelector('.profile-menu');
  
    const handleClick = () => {
      profileMenu.classList.toggle('show');
    };
  
    const handleDocumentClick = (event) => {
      // Check if the click is outside the profile menu and profileWrapper
      if (
        profileMenu &&
        !profileMenu.contains(event.target) &&
        profileWrapper &&
        !profileWrapper.contains(event.target)
      ) {
        profileMenu.classList.remove('show');
      }
    };
  
    if (profileWrapper) {
      profileWrapper.addEventListener('click', handleClick);
      // Add a click event listener to the document to handle clicks outside the menu
      document.addEventListener('click', handleDocumentClick);
    }
  
    return () => {
      if (profileWrapper) {
        profileWrapper.removeEventListener('click', handleClick);
        // Remove the document click event listener when the component unmounts
        document.removeEventListener('click', handleDocumentClick);
      }
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  //   function handleNotificationClick() {
  //     console.log('Notification button clicked');
  //     $("#notificationPopover").load("./notifications.html");
  //     $("#notificationPopover").toggleClass("d-none");
  //   }
  const handleNotificationClick = () => {
    countData();
    setPopoverVisible(!popoverVisible);
  };
//useeffect for rajat sir company name
const [individualCompany , setIndividualCompany] = useState()
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

  return (
    <>
      <header class="top-bar py-2 px-2">
        <div class="top-bar-heading px-3">
        {individualCompany ? individualCompany.accountName : ""}
        </div>
        <div class="top-bar-list">
          {/* <div class="header-search">
                <input
                  type="text"
                  placeholder="Search"
                  name="query"
                  class="custom-input"
                  id="headerSearchInput"
                />
                <button
                  class="wrapper-button"
                  id="headerSearchIcon"
                  onclick="handleSearchClick()"
                >
                  <img src={topSearch} alt="" />
                </button>
              </div> */}
          {/* new change */}

          {/* <div class="header-search">
            <input type="text" placeholder="Search" name="query" class="custom-input" id="headerSearchInput" />
          
            <button class="wrapper-button" id="headerSearchIcon" onClick={(e) => handleSearchClick(e.currentTarget)}>
              <img src={topSearch} alt="" />
            </button>
          </div> */}




          <div class="header-notification">
            <button class="wrapper-button" onClick={handleNotificationClick}>
              <img src={topBell} alt="" />
              {getCount&& getCount > "0" &&
              <span class="notification-badge">{String(getCount)}</span>
              }
            </button>
            {/* notification.html */}
            <div id="notificationPopover" ref={notificationRef}> {popoverVisible && (<HeaderNotification />)}</div>

          </div>
          <div

            id="profile-wrapper"

            className="d-flex align-items-center"

            style={{ cursor: 'pointer' }}



          >

            <img className="" src={userImage} alt="" />

            <div className="profile-menu">

            <ul>
<li>
      <a onClick={handleChangePassword}>Change Password</a>
    </li>
    <li>
      <a onClick={handleLogout}>Logout</a>
    </li>
</ul>

            </div>

          </div>
        </div>
      </header>



    </>
  )
}