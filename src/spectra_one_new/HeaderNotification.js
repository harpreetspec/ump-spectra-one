import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import filter from "../assets/images/filter.svg";
import close from "../assets/images/close.svg";
import notifLoc from "../assets/images/notif-loc.svg"
import NotifLoc from '../assets/images/notif-loc.svg';
import "../assets/css/dashboard.css";
// import "../assets/css/style.css";
import {
  getNotificationByServiceId,
  getUnreadNotification,
  getUnreadNotificationCount,
  updateNotificationAsRead
} from '../function';




export default function HeaderNotification() {


  const [getAreaLists, setGetAreaLists] = useState();
  const [getServiceList, setGetServiceList] = useState();
  const [getMergedNotification, setMergedNotification] = useState();
  const [notificationCount, setUnreadNotificationCount] = useState();
  const [itemsVisibility, setItemsVisibility] = useState([]);
  const [activeButtons, setActiveButtons] = useState([]);
  const [getMergedArray, setMergedArray] = useState();

  const locationID = localStorage.getItem('crm_location_id');
  const groupID = localStorage.getItem('crm_group_id');
  const companyID = localStorage.getItem('crm_company_id');
  const crm_role = localStorage.getItem('crm_role');
  const segmentName = localStorage.getItem('segment');
  const serviceID = localStorage.getItem('credentialKey');
  const segmentCheckHBB = localStorage.getItem('segmentCheckHBB');
  const [getFinalMergedArray, setFinalMergedArray] = useState([]);
  const navigate = useNavigate();


  function periodFun(created_at) {
    let timePeriod;
    const timePeriodSec = Math.round((new Date() - new Date(created_at)) / 1000);
    if (timePeriodSec >= 86400) {
      timePeriod = Math.round(timePeriodSec / 86400) + "d ago";
    } else if (timePeriodSec >= 3600) {
      timePeriod = Math.round(timePeriodSec / 3600) + "h ago";
    } else if (timePeriodSec >= 60) {
      timePeriod = Math.round(timePeriodSec / 60) + "m ago";
    } else if (timePeriodSec < 60 && timePeriodSec >= 0) {
      timePeriod = Math.round(timePeriodSec) + "s ago";
    }
    return timePeriod;
  }

  useEffect(() => {
    async function areaListsMerge() {
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
      setGetAreaLists(result.data);

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

      if (crm_role === "L2") {
        try {
          let notificationData = [];
          // let mergedAreaSol = [
          //   { CanId: 9075875, LocationName: "Gurgaon", AreaName: "Jangpura", SegmentName: "BIA"},
          //   { CanId: 194155, LocationName: "Gurgaon", AreaName: "Sector 31", SegmentName: "HBB" }
          // ];
          const mergeArray1 = await Promise.all(mergedAreaSol.map(async (item) => {
            // console.log("filterAreaSol", item.CanId);
            const CanID = item.CanId;
            // console.log("CanID", CanID);
            try {
              let notificationByServiceId = await getUnreadNotification(CanID);
              // console.log("notificationByServiceId", notificationByServiceId);

              if (notificationByServiceId.data.length > 0) {

                // -------Filter Last Month Notification--------
                // const currentDate = new Date();
                // const oneMonthAgo = new Date();
                // oneMonthAgo.setMonth(currentDate.getMonth() - 1);

                // const filteredNotification = notificationByServiceId.data.filter(dateObj => {
                //   const date = new Date(dateObj.created_spectra);
                //   return date >= oneMonthAgo && date <= currentDate;
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
                // return result;
                // }, []);


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
          // console.log("finalDataComALl", notificationData);
          setMergedArray(notificationData);
          // sessionStorage.setItem("Notify", JSON.stringify(mergeArray));

          const totalNotificationArrayLength = notificationData.reduce((count, array) => {
            return count + array.notification.length;
          }, 0);

          // console.log("unreadNotificationCount", totalNotificationArrayLength);
          setUnreadNotificationCount(totalNotificationArrayLength);

          // Access the resolved data from each promise
          // mergeArray.forEach((promise, index) => {
          //     promise.then(resolvedData => {
          //         console.log(`Resolved Data for index ${index}:`, resolvedData);
          //     }).catch(error => {
          //         console.log(`Error for index ${index}:`, error);
          //     });
          // });

          mergedAreaSol.map(async (item) => {
            const CanID = item.CanId;
            await updateNotificationAsRead(CanID);
          })
        } catch (error) {
          console.error("Error:", error);
        }

      } else if (crm_role === "L3") {
        try {
          let filterAreaSol = mergedAreaSol.filter(item => item.CanId === localStorage.getItem("credentialKey"));
          const CanID = filterAreaSol[0].CanId;
          // console.log("CanID", CanID);

          let notificationByServiceId = await getUnreadNotification(CanID);
          // console.log(notificationByServiceId);
          // -------Filter Last Month Notification--------
          const currentDate = new Date();
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(currentDate.getMonth() - 1);

          const filteredNotification = notificationByServiceId.data.filter(dateObj => {
            const date = new Date(dateObj.created_spectra);
            return date >= oneMonthAgo && date <= currentDate;
          });
          // console.log("1MonthNotofication:", filteredNotification);

          // if(filteredNotification.length > 0){
          let mergedAreaSolNotifi = mergedAreaSol.reduce((result, item) => {

            const notification = filteredNotification.filter(obj => obj.service_id === String(item.CanId));
            // console.log(notification);
            notification.sort((a, b) => new Date(b.created_spectra) - new Date(a.created_spectra));


            // if (notification) {
            // let timePeriod;
            // const timePeriodSec = Math.round((new Date() - new Date(notification.created_at)) / 1000);
            // if (timePeriodSec >= 86400) {
            //     timePeriod = Math.round(timePeriodSec / 86400) + "d ago";
            // } else if (timePeriodSec >= 3600) {
            //     timePeriod = Math.round(timePeriodSec / 3600) + "h ago";
            // } else if (timePeriodSec >= 60) {
            //     timePeriod = Math.round(timePeriodSec / 60) + "m ago";
            // } else if (timePeriodSec < 60 && timePeriodSec >= 0) {
            //     timePeriod = Math.round(timePeriodSec) + "s ago";
            // }

            // const notificationInfo = notification.notification_info.find(info => info.can_id === String(item.CanId));

            result = {
              ...item,
              created_spectra: notification.length > 0 && notification[0].created_spectra,
              is_read: notification.length > 0 && notification[0].is_read,
              sort_des: notification.length > 0 && notification[0].sort_des,
              notification
            };
            // }

            return result;
          }, []);

          // console.log("mergedAll:", [mergedAreaSolNotifi]);
          setMergedArray([mergedAreaSolNotifi]);
          // sessionStorage.setItem("Notify", JSON.stringify([mergedAreaSolNotifi]));
          // mergeArray.push(mergedAreaSolNotifi)
          let mergedAreaSolNotifi2 = [mergedAreaSolNotifi];
          const totalNotificationArrayLength = mergedAreaSolNotifi2.reduce((count, array) => {
            return count + array.notification.length;
          }, 0);

      // console.log("unreadNotificationCount", totalNotificationArrayLength);
      setUnreadNotificationCount(totalNotificationArrayLength);
          await updateNotificationAsRead(serviceID)
        } catch (error) {
          console.error(error);
        }
      }
    }

    areaListsMerge();
  }, [crm_role, segmentName]);

  // useEffect(async () => {
    // const getMergedArray1 = await getUnreadNotificationCount(serviceID)
    // setMergedArray(getMergedArray1);

    // let count = 0;
    // for (const key in getMergedArray1) {
    //   if (getMergedArray1.hasOwnProperty(key) && getMergedArray1[key].is_read === false) {
    //     count++;
    //   }
    // }
    // setUnreadNotificationCount(getMergedArray1);
  // }, []);

  //----Handle Notification Filter-----
  function handleNotificationFilter() {
    const notificationFilter = document.getElementById(
      "notification-filter-popup"
    );
    const notificationContent = document.getElementById(
      "notification-content-popup"
    );
    if (notificationFilter.classList.contains("d-none")) {
      notificationFilter.classList.remove("d-none");
      notificationContent.classList.add("d-none");
    }
  }
  function closeNotificationPopover() {
    const notificationFilter = document.getElementById(
      "notification-filter-popup"
    );
    notificationFilter.classList.add("d-none");
  }


  async function areaListsMerge() {
    // -----AreaList Api----
    const url = process.env.REACT_APP_API_URL + '/getAreaLists';
    // const data = { groupID: groupID, companyID: companyID, locationID: locationID };
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
    // console.log("getAreaLists", result.data);
    setGetAreaLists(result.data);

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

    if (crm_role === "L2") {
      try {
        let notificationData = [];
        // const mergedAreaSol = [
        //     { CanId: 9075875, LocationName: "Gurgaon", AreaName: "Jangpura", SegmentName: "BIA"},
        //     { CanId: 194155, LocationName: "Gurgaon", AreaName: "Sector 31", SegmentName: "HBB" }
        //   ];
        const mergeArray1 = await Promise.all(mergedAreaSol.map(async (item) => {
          // console.log("filterAreaSol", item.CanId);
          const CanID = item.CanId;
          try {
            let notificationByServiceId = await getNotificationByServiceId(CanID);
            // console.log("notificationByServiceId", notificationByServiceId);

            if (notificationByServiceId.data.length > 0) {

              // -------Filter Last Month Notification--------
              const currentDate = new Date();
              const oneMonthAgo = new Date();
              oneMonthAgo.setMonth(currentDate.getMonth() - 1);

              const filteredNotification = notificationByServiceId.data.filter(dateObj => {
                const date = new Date(dateObj.created_spectra);
                return date >= oneMonthAgo && date <= currentDate;
              });
              // console.log("1MonthNotofication:", filteredNotification);

              // if (filteredNotification.length > 0) {
              // let mergedAreaSolNotifi = mergedAreaSol.reduce((result, item2) => {
              const notification = filteredNotification.filter(obj => obj.service_id === String(item.CanId));
              notification.sort((a, b) => new Date(b.created_spectra) - new Date(a.created_spectra));
              // console.log(notification);

              const result = {
                ...item,
                created_spectra: notification[0].created_spectra,
                is_read: notification[0].is_read,
                sort_des: notification[0].sort_des,
                notification
              };
              // }
              // console.log("mergedNotify Single:", result);
              // return result;
              // }, []);


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
        notificationData.sort((a, b) => new Date(b.created_spectra) - new Date(a.created_spectra));
        // console.log("finalDataComALl", notificationData);
        setFinalMergedArray(notificationData);
        // sessionStorage.setItem("Notify", JSON.stringify(mergeArray));


        // Calculate the total notification array length
        const totalNotificationArrayLength = notificationData.reduce((count, array) => {
          return count + array.notification.length;
        }, 0);

        // console.log("unreadNotificationCount", totalNotificationArrayLength);
        // setUnreadNotificationCount(totalNotificationArrayLength);

        // Access the resolved data from each promise
        // mergeArray.forEach((promise, index) => {
        //     promise.then(resolvedData => {
        //         console.log(`Resolved Data for index ${index}:`, resolvedData);
        //     }).catch(error => {
        //         console.log(`Error for index ${index}:`, error);
        //     });
        // });
      } catch (error) {
        console.error("Error:", error);
      }

    } else if (crm_role === "L3") {
      try {
        let filterAreaSol = mergedAreaSol.filter(item => item.CanId === localStorage.getItem("credentialKey"));
        const CanID = filterAreaSol[0].CanId;
        // console.log("CanID", CanID);

        let notificationByServiceId = await getNotificationByServiceId(CanID);
        // console.log(notificationByServiceId);
        // -------Filter Last Month Notification--------
        const currentDate = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(currentDate.getMonth() - 1);

        const filteredNotification = notificationByServiceId.data.filter(dateObj => {
          const date = new Date(dateObj.created_spectra);
          return date >= oneMonthAgo && date <= currentDate;
        });
        // console.log("1MonthNotofication:", filteredNotification);

        // if(filteredNotification.length > 0){
        let mergedAreaSolNotifi = mergedAreaSol.reduce((result, item) => {

          const notification = filteredNotification.filter(obj => obj.service_id === String(item.CanId));
          // console.log(notification);
          notification.sort((a, b) => new Date(b.created_spectra) - new Date(a.created_spectra));

          result = {
            ...item,
            created_spectra: notification.length > 0 && notification[0].created_spectra,
            is_read: notification.length > 0 && notification[0].is_read,
            sort_des: notification.length > 0 && notification[0].sort_des,
            notification
          };
          // }

          return result;
        }, []);

        // console.log("mergedAll:", [mergedAreaSolNotifi]);
        setFinalMergedArray([mergedAreaSolNotifi]);
        sessionStorage.setItem("Notify", JSON.stringify([mergedAreaSolNotifi]));
        // mergeArray.push(mergedAreaSolNotifi)
        let mergedAreaSolNotifi2 = [mergedAreaSolNotifi];
        const totalNotificationArrayLength = mergedAreaSolNotifi2.reduce((count, array) => {
          return count + array.notification.length;
        }, 0);

        // console.log("unreadNotificationCount", totalNotificationArrayLength);
        // setUnreadNotificationCount(totalNotificationArrayLength);

      } catch (error) {
        console.error(error);
      }
    }
    // let filterAreaSol;
    // if (crm_role === "L2" && segmentName !== "OBB") {
    //     try {
    //         const mergeArray1 = await Promise.all(mergedAreaSol.map(async (item) => {
    //             // console.log("filterAreaSol", item.CanId);
    //             const CanID = item.CanId;
    //             const url3 = process.env.REACT_APP_API_URL + '/getAllAppNotification/' + CanID;
    //             try {
    //                 const response3 = await fetch(url3, {
    //                     method: 'GET',
    //                     headers: {
    //                         'Content-Type': 'application/json'
    //                     },
    //                 });
    //                 const result3 = await response3.json();
    //                 // console.log("API Response for CanId " + item.CanId + ":" ,result3.data);

    //                 if (result3.data.length > 0) {

    //                     // -------Filter Last Month Notification--------
    //                     const currentDate = new Date();
    //                     const oneMonthAgo = new Date();
    //                     oneMonthAgo.setMonth(currentDate.getMonth() - 6);

    //                     const filteredNotification = result3.data.filter(dateObj => {
    //                         const date = new Date(dateObj.created_at);
    //                         return date >= oneMonthAgo && date <= currentDate;
    //                     });
    //                     // console.log("1MonthNotofication:", filteredNotification);

    //                     if (filteredNotification.length > 0) {
    //                         const mergedAreaSolNotifi = mergedAreaSol.reduce((result, item) => {
    //                             let timePeriod;
    //                             const notification = filteredNotification.find(obj => obj.notification_info.some(info => info.can_id === String(item.CanId)));
    //                             // console.log(notification);


    //                             if (notification) {
    //                                 const timePeriodSec = Math.round((new Date() - new Date(notification.created_at)) / 1000);
    //                                 if (timePeriodSec >= 86400) {
    //                                     timePeriod = Math.round(timePeriodSec / 86400) + "d ago";
    //                                 } else if (timePeriodSec >= 3600) {
    //                                     timePeriod = Math.round(timePeriodSec / 3600) + "h ago";
    //                                 } else if (timePeriodSec >= 60) {
    //                                     timePeriod = Math.round(timePeriodSec / 60) + "m ago";
    //                                 } else if (timePeriodSec < 60 && timePeriodSec >= 0) {
    //                                     timePeriod = Math.round(timePeriodSec) + "s ago";
    //                                 }

    //                                 const notificationInfo = notification.notification_info.find(info => info.can_id === String(item.CanId));

    //                                 result = {
    //                                     ...item,
    //                                     notification,
    //                                     sort_description: notificationInfo.data.order_info.sort_description,
    //                                     title: notificationInfo.data.order_info.title,
    //                                     is_read: notificationInfo.is_read,
    //                                     time_period: timePeriod
    //                                 };
    //                             }
    //                             // console.log("",result);
    //                             return result;
    //                         }, []);

    //                         console.log("mergedNotify Single:", mergedAreaSolNotifi);
    //                         // mergeArray.push(mergedAreaSolNotifi)
    //                         return mergedAreaSolNotifi;
    //                     }
    //                 }
    //                 //   console.log("CanID Solved: ",item.CanId); 
    //                 return null;
    //             } catch (error) {
    //                 console.error("Error:", error);
    //                 return null;
    //             }
    //         })); //Loop end i
    //         const mergeArray = mergeArray1.filter(item => item !== null);
    //         // console.log("finalDataComALl",mergeArray);
    //         setFinalMergedArray(mergeArray);
    //         sessionStorage.setItem("Notify", JSON.stringify(mergeArray));

    //         let count = 0;
    //         for (const key in mergeArray) {
    //             if (mergeArray.hasOwnProperty(key) && mergeArray[key].is_read === false) {
    //                 count++;
    //             }
    //         }
    //         console.log("unreadNotificationCount", count);
    //         setUnreadNotificationCount(count);

    //         // Access the resolved data from each promise
    //         mergeArray.forEach((promise, index) => {
    //             promise.then(resolvedData => {
    //                 console.log(`Resolved Data for index ${index}:`, resolvedData);
    //             }).catch(error => {
    //                 console.log(`Error for index ${index}:`, error);
    //             });
    //         });
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }

    // } else if (crm_role === "L3" || (crm_role === "L2" && segmentName === "OBB")) {
    //     // console.log(crmRole, "result.data:", result.data , "result2.data:", result2.data);
    //     // const mergedAreaSolAll = result.data.map((item) => {
    //     //     const matchingItem = result2.data.find((el) => el.CanId == item.CanId);

    //     //     if (matchingItem) {
    //     //         return { ...item, SegmentName: matchingItem.SegmentName };
    //     //     }
    //     //     return null;
    //     // })
    //     // .filter((item) => item !== null); // Remove null entries from the array
    //     let filterAreaSol = mergedAreaSol.filter(item => item.CanId === localStorage.getItem("credentialKey"));
    //     // console.log("filterAreaSol:", filterAreaSol);

    //     // ==========Notification Api========

    //     // console.log(mergedAreaSol);
    //     const CanID = filterAreaSol[0].CanId;
    //     console.log("CanID", CanID);
    //     const url3 = process.env.REACT_APP_API_URL + '/getAllAppNotification/' + CanID;
    //     const response3 = await fetch(url3, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //     });
    //     const result3 = await response3.json();
    //     // console.log(result3.data);

    //     // if (result3.data.length > 0) {

    //     // -------Filter Last Month Notification--------
    //     const currentDate = new Date();
    //     const oneMonthAgo = new Date();
    //     oneMonthAgo.setMonth(currentDate.getMonth() - 6);

    //     const filteredNotification = result3.data.filter(dateObj => {
    //         const date = new Date(dateObj.created_at);
    //         return date >= oneMonthAgo && date <= currentDate;
    //     });
    //     console.log("1MonthNotofication:", filteredNotification);

    //     // if(filteredNotification.length > 0){
    //     let mergedAreaSolNotifi = mergedAreaSol.reduce((result, item) => {
    //         let timePeriod;
    //         const notification = filteredNotification.find(obj => obj.notification_info.some(info => info.can_id === String(item.CanId)));
    //         // console.log(notification);


    //         if (notification) {
    //             const timePeriodSec = Math.round((new Date() - new Date(notification.created_at)) / 1000);
    //             if (timePeriodSec >= 86400) {
    //                 timePeriod = Math.round(timePeriodSec / 86400) + "d ago";
    //             } else if (timePeriodSec >= 3600) {
    //                 timePeriod = Math.round(timePeriodSec / 3600) + "h ago";
    //             } else if (timePeriodSec >= 60) {
    //                 timePeriod = Math.round(timePeriodSec / 60) + "m ago";
    //             } else if (timePeriodSec < 60 && timePeriodSec >= 0) {
    //                 timePeriod = Math.round(timePeriodSec) + "s ago";
    //             }

    //             const notificationInfo = notification.notification_info.find(info => info.can_id === String(item.CanId));

    //             result = {
    //                 ...item,
    //                 notification,
    //                 sort_description: notificationInfo.data.order_info.sort_description,
    //                 title: notificationInfo.data.order_info.title,
    //                 is_read: notificationInfo.is_read,
    //                 time_period: timePeriod
    //             };
    //         }

    //         return result;
    //     }, []);

    //     console.log("mergedAll:", mergedAreaSolNotifi);
    //     setFinalMergedArray(mergedAreaSolNotifi);
    //     sessionStorage.setItem("Notify", JSON.stringify([mergedAreaSolNotifi]));
    //     // mergeArray.push(mergedAreaSolNotifi)
    //     let mergedAreaSolNotifi2 = [mergedAreaSolNotifi];
    //     let count = 0;
    //     for (const key in mergedAreaSolNotifi2) {
    //         if (mergedAreaSolNotifi2.hasOwnProperty(key) && mergedAreaSolNotifi2[key].is_read === false) {
    //             count++;
    //         }
    //     }
    //     // console.log("unreadNotificationCount", count);
    //     setUnreadNotificationCount(count);
    //     // }
    //     // }
    //     //   console.log("CanID: ",i+1);              

    //     // } else
    //     //     if (crmRole == 'L2' && segment === "OBB") {
    //     //         mergedAreaSol = result.data.map((item) => {
    //     //             const matchingItem = result2.data.find((el) => el.CanId === localStorage.getItem("credentialKey"));
    //     //             if (matchingItem) {
    //     //                 return { ...item, SegmentName: matchingItem.SegmentName };
    //     //             }
    //     //             return null;
    //     //         })
    //     //             .filter((item) => item !== null); // Remove null entries from the array
    //     //         console.log("mergedAreaSolObb:", mergedAreaSol);
    //     //     } else
    //     //         if (crmRole == 'L3' && segment === "OBB") {
    //     //             mergedAreaSol = result.data.map((item) => {
    //     //                 const matchingItem = result2.data.find((el) => el.CanId === localStorage.getItem("credentialKey") && el.SegmentName === "OBB");
    //     //                 if (matchingItem) {
    //     //                     return { ...item, SegmentName: matchingItem.SegmentName };
    //     //                 }
    //     //                 return null;
    //     //             })
    //     //                 .filter((item) => item !== null); // Remove null entries from the array
    //     //             // console.log("mergedAreaSolObb:", mergedAreaSol);
    //     //         }else
    //     //         if (crmRole == 'L3' && segment === "HBB") {
    //     // mergedAreaSol = result.data.map((item) => {
    //     //     const matchingItem = result2.data.find((el) => el.CanId === localStorage.getItem("credentialKey") && el.SegmentName == "HBB");
    //     //     if (matchingItem) {
    //     //         return { ...item, SegmentName: matchingItem.SegmentName };
    //     //     }
    //     //     return null;
    //     // })
    //     //     .filter((item) => item !== null); // Remove null entries from the array
    //     // console.log("mergedAreaSolObb:", mergedAreaSol);
    // }
  }  //function areaListsMerge end

  useEffect(() => {
    areaListsMerge();
  }, [crm_role, segmentName]);

useEffect(() => {
  // Add an event listener to handle clicks outside the notification
  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    // Remove the event listener when the component unmounts
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

const handleClickOutside = (event) => {
  // alert("rtyui")
  areaListsMerge()
  // if (notificationRef.current && !notificationRef.current.contains(event.target)) {
  //   // Clicked outside the notification, so close it
  //   setPopoverVisible(false);
  // }
};

  const notifiClick = (index) => {
    // console.log("index",index);

    const updatedVisibility = [...itemsVisibility];
    updatedVisibility[index] = !updatedVisibility[index];
    setItemsVisibility(updatedVisibility);

    setActiveButtons((prevActiveButtons) => {
        const updatedActiveButtons = [...prevActiveButtons];
        const buttonIndex = updatedActiveButtons.indexOf(index);
        if (buttonIndex === -1) {
            updatedActiveButtons.push(index);
        } else {
            updatedActiveButtons.splice(buttonIndex, 1);
        }
        return updatedActiveButtons;
    });

};

function areaStringUpdate(str) {
  return str.toLowerCase().replace(/^\w/, (match) => match.toUpperCase());
}

const navigateBilling = () => {
  navigate('/accountdetails?pid=bill');
};

const replaceText = (text) => {
  const target = "Login to my.spectra.co";
  return text.includes(target) ? (
    <>
      {text.split(target)[0]}
      <span onClick={navigateBilling} style={{ color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>
        Click here
      </span>
      {text.split(target)[1]}
    </>
  ) : (
    text
  );
};


  return (
    <>
      {/* <!-- Notification Popover --> */}
      <div id="notification-content-popup" class="dashboard-box notif-main-box">
        <div class="dashboard-box-top-bar">
          <div class="dashboard-box-heading">Recent Notifications
            <span>{notificationCount? (notificationCount < 10 ? `0${notificationCount}` : notificationCount) : "00"}
            </span>
          </div>
          <div class="dashboard-box-options px-3">
            {/* <div class="dashboard-box-option">
        <button class="wrapper-button" onClick={handleNotificationFilter}>
          <img src={filter} alt="" />
        </button>
        <span class="notification-badge">3</span>
      </div> */}
          </div>
        </div>
        <div
          class=" d-flex align-items-center justify-content-between"
        >
          {/* <div
      class="d-flex flex-row align-items-center justify-content-start flex-wrap gap-1"
    >
      <div class="filters-applied">
        MBB <img src={close} alt="" />
      </div>
      <div class="filters-applied">
        Mumbai <img src={close} alt="" />
      </div>
      <div class="filters-applied">
        Banglore <img src={close} alt="" />
      </div>
    </div>
    <div class="filter-clear-btn">Clear All</div> */}
        </div>

        {/* New notification view for web */}
        <div className='desktop-view'>
        <div class="notif-box-wrapper wrapper-box-scroll custom-scrollbar ">

          {getMergedArray && getMergedArray[0]?.notification.length > 0 ? getMergedArray?.map((item, index) => (
            <div
              key={index}
              className="notif-box"
              style={{ backgroundColor: "rgba(71, 168, 197, 0.0545)" }}
            >
              <div className="notif-inner-bar">
                <div className="notif-point">
                  <div className="d-flex flex-row align-items-center gap-2">
                    {/* <img src={notifLoc} alt="" /> */}
                    {item.LocationName}
                  </div>
                  <div>{item.AreaName}</div>
                  <div>{item.SegmentName}</div>
                </div>
                <div className="notif-time">
                  {periodFun(item.created_spectra)}
                  {(item.is_read !== 1) ? (
                    <span className="notif-time-span"></span>
                  ) : null}


                </div>
                {/* <div class="">
                                <button  // style={{transform: "rotate(-180deg)"}}
                                    style={{
                                        transform: activeButtons.includes(index) ? 'none' : 'rotate(-180deg)',
                                    }}
                                    onClick={() => notifiClick(index)}
                                    className={`accordion-button ${activeButtons.includes(index) ? 'active' : ''}`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                >
                                </button>
                            </div> */}
              </div>

              {/* {getMergedArray && getMergedArray[0].notification?.map((item2, index2) => ( */}
              <div  className="notif-content mt-3">
                {replaceText(item.sort_des)
                // .replace("my.spectra.co", "one.spectra.co")
                // .replace("My Spectra App", "Spectra One App")
                } <br/>
                <span style={{ color: "#f36f69" }}></span>
              </div><hr />
              {/* ))} */}

              {getMergedArray[0].notification?.slice(1).map((item2, index2) => (
                                        <div>
                                        <div class="notif-inner-bar">
                                            <div class="notif-point">

                                                <div>{item2.title}</div>
                                            </div>
                                            <div class="notif-time">{periodFun(item2.created_spectra)}</div>
                                        </div>
                                        
                                            <div>
                                                <div key={index2} class="notif-content mt-3">
                                                    {replaceText(item2.sort_des)
                                                    // .replace("my.spectra.co", "one.spectra.co")
                                                    // .replace("My Spectra App", "Spectra One App")
                                                    }
                                                    <span style={{ color: "#f36f69" }}></span>
                                                </div><hr />
                                            </div>
                                            </div>
                                        ))}

              {itemsVisibility[index] &&
                <div
                  id="collapseOne"
                  class="accordion-collapse collapse show"
                // aria-labelledby="headingOne"
                // data-bs-parent="#accordionExample"
                ><hr />

                </div>
              }
            </div>
          )) : <span className='empty-notif-header'>No New Notifications</span>}

        </div>
        </div>

        {/* New notification view for Mobile */}
        <div className='mobile-view'>
        {crm_role === "L2" && (
            <div class="dashboard-box-mobile notif-main-box d-md-block mt-0">
              <div class="notif-box-wrapper wrapper-box-scroll custom-scrollbar">
                {getFinalMergedArray ? getFinalMergedArray.length > 0 ? (getFinalMergedArray.map((item, index) => (
                  <div
                    key={index}
                    className="notif-box"
                    style={{ backgroundColor: "rgba(71, 168, 197, 0.0545)" }}
                  > <div style={{ marginBottom: "0%" }}>
                      <sup style={{ paddingLeft: "80%", color: "rgba(0, 0, 0, 0.5)" }}>{periodFun(item.created_spectra)}</sup>
                      <sup className="notif-time">
                        {item.is_read !== "1" && (
                          <span className="notif-time-span"></span>
                        )}
                      </sup>
                    </div>

                    <div className="notif-inner-bar">
                      <div className="notif-point">

                        <div className="d-flex flex-row align-items-center gap-2">
                          <img src={NotifLoc} alt="" />
                          {areaStringUpdate(item.LocationName)}
                        </div>
                        <div>{areaStringUpdate(item.AreaName)}</div>
                        <div>{item.SegmentName}</div>
                      {/* </div> */}

                      <div class="">
                        <button  // style={{transform: "rotate(-180deg)"}}
                          style={{
                            transform: activeButtons.includes(index) ? 'none' : 'rotate(-180deg)',
                            paddingRight: "30px"
                          }}
                          onClick={() => notifiClick(index)}
                          className={`accordion-button ${activeButtons.includes(index) ? 'active' : ''}`}
                          type="button"
                          data-bs-toggle="collapse"
                        >
                        </button>
                      </div>
                      </div>
                    </div>


                    <div className="notif-content">
                      {replaceText(item.sort_des)
                      // .replace("my.spectra.co", "one.spectra.co")
                      // .replace("My Spectra App", "Spectra One App")
                      }
                      <span style={{ color: "#f36f69" }}></span>
                    </div>


                    {itemsVisibility[index] &&
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse show"
                      // aria-labelledby="headingOne"
                      // data-bs-parent="#accordionExample"
                      ><hr />


                        <div class="notif-box">
                          {item.notification?.slice(1).map((item2, index2) => (
                            <div>
                              <div class="notif-inner-bar">
                                <div class="notif-point">

                                  <div>{item2.title}</div>
                                </div>
                                <div class="notif-time">{periodFun(item2.created_spectra)}</div>
                                {item2.is_read !== "1" && (
                                  <span className="notif-time-span"></span>
                                )}
                              </div>

                              <div>
                                <div key={index2} class="notif-content mt-3">
                                  {replaceText(item2.sort_des)
                                  // .replace("my.spectra.co", "one.spectra.co")
                                  // .replace("My Spectra App", "Spectra One App")
                                  }
                                  <span style={{ color: "#f36f69" }}></span>
                                </div>
                                {index2 < item.notification.length - 2 && <hr />}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    }
                  </div>
                ))) : (<div className='empty-notif-content mt-3 mb-3'>No Notifications Available</div>) :
                  (<div className='empty-notif-content mt-3 mb-3'>Loading...</div>)}


              </div>
            </div>
        )}

        {crm_role === "L3" && (
            <div class="dashboard-box-mobile notif-main-box d-md-block mt-0">
              <div class="notif-box-wrapper wrapper-box-scroll custom-scrollbar">
                {getFinalMergedArray ? (getFinalMergedArray.length > 0 && getFinalMergedArray[0]?.notification?.length > 0 ? (getFinalMergedArray.map((item, index) => (
                  <div
                    key={index}
                    className="notif-box"
                    style={{ backgroundColor: "rgba(71, 168, 197, 0.0545)" }}
                  > <div style={{ marginBottom: "0%" }}>
                      <sup style={{ paddingLeft: "80%", color: "rgba(0, 0, 0, 0.5)" }}>{periodFun(item.created_spectra)}</sup>
                      <sup className="notif-time">
                        {item.is_read !== "1" && (
                          <span className="notif-time-span"></span>
                        )}
                      </sup>
                    </div>

                    <div className="notif-inner-bar">
                      <div className="notif-point">

                        <div className="d-flex flex-row align-items-center gap-2">
                          <img src={NotifLoc} alt="" />
                          {areaStringUpdate(item.LocationName)}
                        </div>
                        <div>{areaStringUpdate(item.AreaName)}</div>
                        <div>{item.SegmentName}</div>
                      {/* </div> */}

                      <div class="">
                        <button  // style={{transform: "rotate(-180deg)"}}
                          style={{
                            transform: activeButtons.includes(index) ? 'none' : 'rotate(-180deg)',
                          }}
                          onClick={() => notifiClick(index)}
                          className={`accordion-button ${activeButtons.includes(index) ? 'active' : ''}`}
                          type="button"
                          data-bs-toggle="collapse"
                        >
                        </button>
                      </div>
                      </div>
                    </div>


                    <div className="notif-content">
                      {replaceText(item.sort_des)}
                      <span style={{ color: "#f36f69" }}></span>
                    </div>


                    {itemsVisibility[index] &&
                      <div
                        id="collapseOne"
                        class="accordion-collapse collapse show"
                      // aria-labelledby="headingOne"
                      // data-bs-parent="#accordionExample"
                      ><hr />


                        <div class="notif-box">
                          {item.notification?.slice(1).map((item2, index2) => (
                            <div>
                              <div class="notif-inner-bar">
                                <div class="notif-point">

                                  <div>{item2.title}</div>
                                </div>
                                <div class="notif-time">{periodFun(item2.created_spectra)}</div>
                                {item.is_read !== "1" && (
                                  <span className="notif-time-span"></span>
                                )}
                              </div>

                              <div>
                                <div key={index2} class="notif-content mt-3">
                                  {replaceText(item2.sort_des)}
                                  <span style={{ color: "#f36f69" }}></span>
                                </div>
                                {index2 < item.notification.length - 2 && <hr />}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    }
                  </div>
                ))) : (<div className='empty-notif-content mt-3 mb-3'>No Notifications Available</div>)) :
                  (<div className='empty-notif-content mt-3 mb-3'>Loading...</div>)}


              </div>
            </div>
        )}
        </div>
      </div>
      {/* <!-- Notificatoin Filter --> */}
      <div class="notification-filter-wrapper d-none" id="notification-filter-popup">
        <div class="top-filter-row d-flex align-items-center justify-content-between">
          <div class="top-filter-heading">Filter</div>
          <div class="d-flex align-items-center justify-content-between gap-3">
            <div class="filter-clear-btn">Clear All</div>
            <button
              class=" filter-apply-btn"
              onClick={closeNotificationPopover}
            >
              APPLY
            </button>
          </div>
        </div>

        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <div class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                City
              </button>
            </div>

            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping"><img src="./images/filter-search.svg" alt="" /></span>
                  <input
                    type="text"
                    className="searchInput input-focus form-control"
                    placeholder="Search"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                  />
                </div>
                <div class="d-flex align-items-center gap-5 py-4 px-4">
                  <div>
                    <div class="py-2">
                      <label for="checkbox1" class="spectra-checkbox-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox1"
                        />
                        <span class="checkmark"></span>
                        <p>Bangalore</p>
                      </label>
                    </div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox2"
                          checked
                        />
                        <span class="checkmark"></span>
                        <p>Gurgaon</p>
                      </label>
                    </div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox3"
                          checked
                        />
                        <span class="checkmark"></span>
                        <p>Jaipur</p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox4">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox4"
                        />
                        <span class="checkmark"></span>
                        <p>Delhi</p>
                      </label>
                    </div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox5">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox5"
                          checked
                        />
                        <span class="checkmark"></span>
                        <p>Hyderabad</p>
                      </label>
                    </div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox6">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox6"
                          checked
                        />
                        <span class="checkmark"></span>
                        <p>Mumbai</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header" id="headingTwo">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Location
              </button>
            </div>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping"
                  ><img src="./images/filter-search.svg" alt=""
                    /></span>
                  <input
                    type="text"
                    className="search-color form-control"
                    placeholder="Search"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"

                  />
                </div>
                <div class="d-flex align-items-center gap-5 py-4 px-4">
                  <div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox7">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox7"
                        />
                        <span class="checkmark"></span>
                        <p>Bangalore</p>
                      </label>
                    </div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox8">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox8"
                          checked
                        />
                        <span class="checkmark"></span>
                        <p>Gurgaon</p>
                      </label>
                    </div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox9">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox9"
                          checked
                        />
                        <span class="checkmark"></span>
                        <p>Jaipur</p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox10">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox10"
                        />
                        <span class="checkmark"></span>
                        <p>Delhi</p>
                      </label>
                    </div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox11">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox11"
                          checked
                        />
                        <span class="checkmark"></span>
                        <p>Hyderabad</p>
                      </label>
                    </div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox12">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox12"
                          checked
                        />
                        <span class="checkmark"></span>
                        <p>Mumbai</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header" id="headingThree">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Solution/Product
              </button>
            </div>
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div class="input-group flex-nowrap">
                  <span class="input-group-text" id="addon-wrapping"
                  ><img src="./images/filter-search.svg" alt=""
                    /></span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                  />
                </div>
                <div class="d-flex align-items-center gap-5 py-4 px-4">
                  <div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox7">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox7"
                        />
                        <span class="checkmark"></span>
                        <p>Bangalore</p>
                      </label>
                    </div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox8">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox8"
                          checked
                        />
                        <span class="checkmark"></span>
                        <p>Gurgaon</p>
                      </label>
                    </div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox9">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox9"
                          checked
                        />
                        <span class="checkmark"></span>
                        <p>Jaipur</p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox10">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox10"
                        />
                        <span class="checkmark"></span>
                        <p>Delhi</p>
                      </label>
                    </div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox11">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox11"
                          checked
                        />
                        <span class="checkmark"></span>
                        <p>Hyderabad</p>
                      </label>
                    </div>
                    <div class="py-2">
                      <label class="spectra-checkbox-2" for="checkbox12">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="checkbox12"
                          checked
                        />
                        <span class="checkmark"></span>
                        <p>Mumbai</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}