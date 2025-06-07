import React, { useEffect, useState } from 'react'
import {
    getNotificationByServiceId,
    getUnreadNotification,
    getUnreadNotificationCount,
    updateNotificationAsRead
} from '../function';
import NotifLoc from '../assets/images/notif-loc.svg';
import { useNavigate } from "react-router-dom";

const TopNotification = ({ crmRole, segment }) => {
    const [getAreaLists, setGetAreaLists] = useState();
    const [getServiceList, setGetServiceList] = useState();
    const [getFinalMergedArray, setFinalMergedArray] = useState();
    const [getMergedNotification, setMergedNotification] = useState();
    const [notificationCount, setUnreadNotificationCount] = useState();
    const [itemsVisibility, setItemsVisibility] = useState([]);
    const [activeButtons, setActiveButtons] = useState([]);

    const locationID = localStorage.getItem('crm_location_id');
    const groupID = localStorage.getItem('crm_group_id');
    const companyID = localStorage.getItem('crm_company_id');
    const crm_role = localStorage.getItem('crm_role');
    const segmentName = localStorage.getItem('segment');
    const serviceID = localStorage.getItem('credentialKey');
    const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
    const navigate = useNavigate();
    // console.log(crmRole, segment);
    // const canID = '9079003';

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

    // useEffect(async() => {
    //     if (crm_role === "L2" && segmentName !== "OBB") {
    //         try{

    //         } catch (error){
    //             console.error(error);
    //         }

    //     }else if(crm_role === "L3" || (crm_role === "L2" && segmentName === "OBB")){
    //         try{
    //             const notificationCount = await getUnreadNotificationCount(serviceID);
    //             console.log(notificationCount);
    //         } catch (error){
    //             console.error(error);
    //         }
    //     }
    // }, [crm_role, segmentName]);

    useEffect(() => {
        async function areaListsMerge() {
            // -----AreaList Api----
            const url = process.env.REACT_APP_API_URL + '/getAreaLists';
            // const data = { groupID: groupID, companyID: companyID, locationID: locationID };
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
                    setUnreadNotificationCount(totalNotificationArrayLength);

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
                    // console.log("notificationByServiceId", notificationByServiceId);
                    // -------Filter Last Month Notification--------
                    const currentDate = new Date();
                    const oneMonthAgo = new Date();
                    oneMonthAgo.setMonth(currentDate.getMonth() - 3);

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
                    setUnreadNotificationCount(totalNotificationArrayLength);

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

        areaListsMerge();
    }, [crm_role, segmentName]);

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

    //   const replaceText = (text) => {
    //     const regex = /Login to my\.spectra\.co/;
    //     const parts = text.split(regex);
    //     console.log(parts);
    //     return (
    //         <>
    //         {parts[0]}
    //         {parts.length > 1 && (
    //           <span onClick={navigateBilling} style={{ color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>
    //             Click here
    //           </span>
    //         )}
    //         {parts.length > 1 && parts[1]}
    //       </>
    //     );
    //   };

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

    if (crm_role === "L2") {
        return (
            <>
                {/* <div style={{ display: "none" }}>
                {getMergedArray && <HeaderNotification getMergedArray1={getMergedArray} />}
            </div> */}
                <div class="dashboard-box notif-main-box d-md-block d-none">
                    <div class="dashboard-box-top-bar">
                        <div class="dashboard-box-heading">
                            All Notifications
                            {getFinalMergedArray?.length > 0 ?
                                <span>{notificationCount && (notificationCount < 10 ? `0${notificationCount}` : notificationCount)}
                                </span> : <span>00</span>}
                        </div>
                    </div>

                    <div class="notif-box-wrapper wrapper-box-scroll custom-scrollbar">
                        {getFinalMergedArray ? getFinalMergedArray.length > 0 ? (getFinalMergedArray.map((item, index) => (
                            <div
                                key={index}
                                className="notif-box"
                                style={{ backgroundColor: "rgba(71, 168, 197, 0.0545)" }}
                            > <div style={{ marginBottom: "0%" }}>
                                    <sup style={{ paddingLeft: "80%", color: "rgba(0, 0, 0, 0.5)" }}>{periodFun(item.created_spectra)}</sup>
                                    <sup className="notif-time">
                                        {(item.is_read !== 1) ? (
                                            <></>
                                            // <span className="notif-time-span"></span>
                                        ) : null}
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
                                    </div>

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
            </>
        )
    }

    if (crm_role === "L3") {
        return (
            <>
                {/* <div style={{ display: "none" }}>
                                        {getMergedArray && <HeaderNotification getMergedArray1={getMergedArray} />}
                                    </div> */}
                <div class="dashboard-box notif-main-box d-md-block d-none">
                    <div class="dashboard-box-top-bar">
                        <div class="dashboard-box-heading">
                            All Notifications
                            {getFinalMergedArray?.length > 0 ?
                                <span>{notificationCount && (notificationCount < 10 ? `0${notificationCount}` : notificationCount)}
                                </span> : <span>00</span>}
                        </div>
                    </div>

                    <div class="notif-box-wrapper wrapper-box-scroll custom-scrollbar">
                        {getFinalMergedArray ? (getFinalMergedArray.length > 0 && getFinalMergedArray[0]?.notification?.length > 0 ? (getFinalMergedArray.map((item, index) => (
                            <div
                                key={index}
                                className="notif-box"
                                style={{ backgroundColor: "rgba(71, 168, 197, 0.0545)" }}
                            > <div style={{ marginBottom: "0%" }}>
                                    <sup style={{ paddingLeft: "80%", color: "rgba(0, 0, 0, 0.5)" }}>{periodFun(item.created_spectra)}</sup>
                                    <sup className="notif-time">
                                        {(item.is_read !== 1) ? (
                                            <></>
                                            // <span className="notif-time-span"></span>
                                        ) : null}
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
                                    </div>

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


                                <div className="notif-content">
                                    {replaceText(item.sort_des)
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
                                                    </div>

                                                    <div>
                                                        <div key={index2} class="notif-content mt-3">
                                                            {replaceText(item2.sort_des)
                                                            // .replace("Login to my.spectra.co", `Go to ${<nav onClick={navigateBilling}>Billing Details</nav>}`)
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
                        ))) : (<div className='empty-notif-content mt-3 mb-3'>No Notifications Available</div>)) :
                            (<div className='empty-notif-content mt-3 mb-3'>Loading...</div>)}


                    </div>

                </div>
            </>
        )
    }
}

export default TopNotification