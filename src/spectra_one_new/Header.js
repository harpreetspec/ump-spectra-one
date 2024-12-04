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

// blank-profile-picture-973460
import {
  getNotificationByServiceId,
  getUnreadNotification,
  getUnreadNotificationCount,
  updateNotificationAsRead
} from '../function';

export default function Header() {

  const [popoverVisible, setPopoverVisible] = useState(false);
  const [getCount, setCount] = useState(false);
  const notificationRef = useRef(null);
  const navigate = useNavigate();
  const companyName = localStorage.getItem('company_name');
  const serviceID = localStorage.getItem('credentialKey');
  const groupID = localStorage.getItem('crm_group_id')
  const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
  const locationID = localStorage.getItem('crm_location_id');
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
  
  async function countData() {
    // -----AreaList Api----
    const url = process.env.REACT_APP_API_URL + '/getAreaLists';
    // const data = { groupID: groupID, companyID: companyID, locationID: locationID };
    const data = {
        "groupID": groupID,
        "companyID": (segmentCheckHBB == "HBB") ? "CIndividual":"",
        "locationID":  (segmentCheckHBB == "HBB") ? locationID:""
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("getAreaLists", result.data);
    // setGetAreaLists(result.data);

    // -----SolutionList Api----
    const url2 = process.env.REACT_APP_API_URL + '/getSolutionLists';
    // const data2 = {groupID: groupID, companyID: companyID, locationID: locationID}; //, fromDate: "2022-01-01", toDate: "2023-01-20"

    const response2 = await fetch(url2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result2 = await response2.json();
    // console.log("getSolutionLists", result2.data);

    //----------Merge AreaList And SolutionList---------
    const mergedAreaSol = result.data.map((item) => {
        const matchingItem = result2.data.find((el) => el.CanId === item.CanId);
        if (matchingItem) {
            return {
                ...item,
                SegmentName: matchingItem.SegmentName,
                PlanName: matchingItem.PlanName
            };
        }
        return null;
    })
        .filter((item) => item !== null && item.AreaName !== "" && item.SegmentName !== ""); // Remove null entries from the array
    // console.log("mergedAreaSol:", mergedAreaSol);

        try {   
            let notificationData = [];  
          // const mergedAreaSol = [
          //   { CanId: 9075875, LocationName: "Gurgaon", AreaName: "Jangpura", SegmentName: "BIA" },
          //   { CanId: 194155, LocationName: "Gurgaon", AreaName: "Sector 31", SegmentName: "HBB" }
          // ];
            const mergeArray1 = await Promise.all(mergedAreaSol.map(async (item) => {
                // console.log("filterAreaSol", item.CanId);
                const CanID = item.CanId;
                try {    
                    let notificationByServiceId = await getUnreadNotification(CanID);
                    // console.log("notificationByServiceId", notificationByServiceId);                            

                    if (notificationByServiceId.data.length > 0) {

                        // -------Filter Last Month Notification--------
                        // const currentDate = new Date();
                        // const oneMonthAgo = new Date();
                        // oneMonthAgo.setMonth(currentDate.getMonth() - 1);

                        // const filteredNotification = notificationByServiceId.data.filter(dateObj => {
                        //     const date = new Date(dateObj.created_spectra);
                        //     return date >= oneMonthAgo && date <= currentDate;
                        // });
                        // console.log("1MonthNotofication:", filteredNotification);

                        // if (filteredNotification.length > 0) {
                            // let mergedAreaSolNotifi = mergedAreaSol.reduce((result, item2) => {
                                const notification = notificationByServiceId.data.filter(obj => obj.service_id === String(item.CanId));                                            
                                notification.sort((a, b) => new Date(b.created_spectra) - new Date(a.created_spectra));
                                // console.log(notification);                     

                                 const result = {
                                        ...item,
                                        created_spectra: notification[0]?.created_spectra,                      
                                        is_read: notification[0]?.is_read,                      
                                        sort_des: notification[0]?.sort_des,                            
                                        notification                            
                                    };
                                // }
                                // console.log("mergedNotify Single:", result);
                            
                            notificationData.push(result)
                            // return mergedAreaSolNotifi;
                        // }
                        // return null;
                    }
                    //   console.log("CanID Solved: ",item.CanId); 
                    return null;
                } catch (error) {
                    console.error("Error:", error);
                    return null;
                }
            })); //Loop end i
            const mergeArray = mergeArray1.filter(item => item !== null);
            // console.log("finalDataComALl",notificationData);
            // setFinalMergedArray(notificationData);
            // sessionStorage.setItem("Notify", JSON.stringify(mergeArray));

            
                // Calculate the total notification array length
                const totalNotificationArrayLength = notificationData.reduce((count, array) => {
                  return count + array.notification.length;
                }, 0);

            // console.log("unreadNotificationCount", totalNotificationArrayLength);
            setCount(totalNotificationArrayLength);
        } catch (error) {
            console.error("Error:", error);
        }
} 


  async function postDeviceTokenLogout() {
    let canIDs;
    const url = process.env.REACT_APP_API_URL + '/getAreaLists';

      const data = {
        "groupID": groupID,
        "companyID": "",
        "locationID": ""
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

    const url2 = 'https://custappmw.spectra.co/index.php';
    for (const canId of canIDs) {
    const data2 = {
      "Action": "deviceSignOut",
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
        ]
      }
    }

    const response2 = await fetch(url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data2)
    });
    const result2 = await response2.json();
  }

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
    sessionStorage.removeItem('pinnedClicked');
    sessionStorage.removeItem("segment")
    localStorage.clear();
    sessionStorage.clear();
    postDeviceTokenLogout();

    // Redirect the user to the login page

    navigate('/');

  };

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
    countData();
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

 
    // const countData = async () => {
    //   try {
    //     const count = await getUnreadNotificationCount(serviceID);
    //     console.log(count);
    //     setCount(count.data);
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };
  useEffect(() => {
    countData(); // Call the async function to fetch data
  }, []);
  const handleNotificationClick = async () => {
    countData();
    // try{
    //   await updateNotificationAsRead(serviceID)
    // }catch (error){
    //   console.error(error);
    // }
    setPopoverVisible(!popoverVisible);
  };
  const handleChangePassword = () => {
    navigate('/passwordmanagement')
  }


  

  return (
    <>
      <header className="top-bar py-2 px-2">
        <div className="top-bar-heading px-3">
          {companyName}
        </div>
        <div className="top-bar-list">
          {/* <div className="header-search">
                <input
                  type="text"
                  placeholder="Search"
                  name="query"
                  className="custom-input"
                  id="headerSearchInput"
                />
                <button
                  className="wrapper-button"
                  id="headerSearchIcon"
                  onclick="handleSearchClick()"
                >
                  <img src={topSearch} alt="" />
                </button>
              </div> */}
          {/* new change */}

          {/* <div className="header-search">
            <input type="text" placeholder="Search" name="query" className="custom-input" id="headerSearchInput" />
          
            <button className="wrapper-button" id="headerSearchIcon" onClick={(e) => handleSearchClick(e.currentTarget)}>
              <img src={topSearch} alt="" />
            </button>
          </div> */}




          <div className="header-notification">
            <button className="wrapper-button" onClick={handleNotificationClick}>
              <img src={topBell} alt="" />
              {getCount > 0 &&
              <span className="notification-badge">{String(getCount)}</span>
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