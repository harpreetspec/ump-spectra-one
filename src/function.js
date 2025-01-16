export const getAreaLists = async (groupID, companyID, locationID) => {
    const url = process.env.REACT_APP_API_URL + '/getAreaLists';
    const data = {
        "groupID": groupID,
        "companyID": companyID,
        "locationID": locationID
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("getAreaLists", result.meta.Message);
    return result;
}

export const getSolutionLists = async (groupID, companyID, locationID) => {
    const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
    const data = {
        "groupID": groupID,
        "companyID": companyID,
        "locationID": locationID
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("getSolutionLists", result.meta.Message);
    return result;
}

export const getCustomerAccountDetail = async (CanId) => {
    const url = process.env.REACT_APP_API_URL + '/getCustomerAccountDetail';
    const data = { serviceGroupId: CanId }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("getCustomerAccountDetail", result.meta.Message);
    return result;
}

export const getInvoiceByOrgNo = async (orgno) => {
    const url = process.env.REACT_APP_API_URL + '/getInvoiceByOrgNo';
    const data = { orgno: orgno }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("getInvoiceByOrgNo", result.meta.Message);
    return result;
}

export const getTransactionHistoryListByOrgNo = async (orgNo, fromDate, toDate) => {
    const url = process.env.REACT_APP_API_URL + '/getTransactionHistoryListByOrgNo';
    const data = {
        organisationNo: orgNo,
        fromDate: fromDate,
        toDate: toDate
      }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("getTransactionHistoryListByOrgNo", result.meta.Message);
    return result;
}

export const getNotificationByServiceId = async (serviceID) => {
    // // console.log("serviceID:",serviceID);
    const url = process.env.REACT_APP_API_URL + '/getNotificationByServiceId';
    // const url = 'http://localhost:4001/getNotificationByServiceId';
    const data = {
        serviceID: serviceID,
      };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("getNotificationByServiceId", result.meta.Message);
    return result;
}

export const getUnreadNotification = async (serviceID) => {
    // // console.log("serviceID:",serviceID);
    const url = process.env.REACT_APP_API_URL + '/getUnreadNotification';
    // const url = 'http://localhost:4001/getUnreadNotification';
    const data = {
        serviceID: serviceID,
      };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("getUnreadNotification", result.meta.Message);
    return result;
}

export const getUnreadNotificationCount = async (serviceID) => {
    // // console.log("serviceID:",serviceID);
    const url = process.env.REACT_APP_API_URL + '/getUnreadNotificationCount';
    // const url = 'http://localhost:4001/getUnreadNotificationCount';
    const data = {
        serviceID: serviceID,
      };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("getUnreadNotificationCount", result.meta.Message);
    return result;
}

export const updateNotificationAsRead = async (serviceID) => {
    // // console.log("serviceID:",serviceID);
    const url = process.env.REACT_APP_API_URL + '/updateNotificationAsRead';
    // const url = 'http://localhost:4001/updateNotificationAsRead';
    const data = {
        serviceID: serviceID,
      };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("updateNotificationAsRead", result.meta.Message);
    return result;
}


export const getUserAvailiblity = async (userName) => {
    // // console.log("userName:",userName);
    const url = process.env.REACT_APP_API_URL + '/getUserAvailiblity';
    // const url = 'http://localhost:4001/getUserAvailiblity';
    const data = {
        userName: userName,
      };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("getUserAvailiblity", result.meta.Message);
    return result;
}

export const forgetPasswordServiceID = async (service_id) => {
    // // console.log("service_id:",service_id);
    const url = process.env.REACT_APP_API_URL + '/forgetPasswordServiceID';
    // const url = 'http://localhost:4001/forgetPasswordServiceID';
    const data = {
        service_id: service_id,
      };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("forgetPasswordServiceID", result.meta.Message);
    return result;
}

export const getServiceLists = async (groupID, companyID, locationID, fromDate, toDate) => {
    // console.log("getServiceLists:",groupID, companyID, locationID, fromDate, toDate);
    const url = process.env.REACT_APP_API_URL + '/getServiceLists';
    const data = {
        groupID: groupID,
        companyID:  companyID,
        locationID:  locationID,
        fromDate: fromDate,
        toDate: toDate
      };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("getServiceLists", result.meta.Message);
    return result;
}

export const getServiceListsTemp = async (groupID, companyID, locationID, fromDate, toDate) => {
    // console.log("getServiceLists:",groupID, companyID, locationID, fromDate, toDate);
      const url = "https://oneml.spectra.co/getServiceListsUat";
      const data = {
          groupID: "G602988",         // groupID
          companyID: "C602988",       // companyID,
          locationID: "10602988",     // locationID,
          fromDate: fromDate,
          toDate: toDate
        };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("getServiceLists", result.meta.Message);
    return result;
}

export const createSRAivis = async (payload) => {
    // console.log("payload:",payload);
    const url = process.env.REACT_APP_API_URL + '/createSRAivis';
    const data = {
        "Type": payload.TypeId,
        "SubType": payload.SubTypeId,
        "SubSubType": payload.SubSubTypeId,
        "CaseSource": "45",
        "CaseCategory": payload.CaseCategoryId,
        "ComplaintDesc": payload.ComplaintDesc,
        "AccountID": payload.canId,   // payload.canId   // "602988"
        "Owner": payload.Owner
    };
    // console.log("data", data); return;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("createSRAivis", result);
    return result;
}

export const getMacAddress = async () => {
    // console.log("payload:",payload.ComplaintDesc); 
    // const url = process.env.REACT_APP_API_URL + '/getMacAddress';
    const url = "http://localhost:4001/getMacAddress";

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("createSRAivis", result.meta.Message);
    return result;
}
export const getDeviceMacAddress = async () => {
    // console.log("payload:",payload.ComplaintDesc); 
    // const url = process.env.REACT_APP_API_URL + '/getMacAddress';
    const url = "http://localhost:4001/getDeviceMacAddress";

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("createSRAivis", result.meta.Message);
    return result;
}

export const sendMailS1 = async (text) => {
    // console.log("payload:",payload.ComplaintDesc); 
    const url = process.env.REACT_APP_API_URL + '/sendMailS1';
    // const url = "http://localhost:4001/sendMailS1";
    const data = {
        "text": text
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("createSRAivis", result.meta.Message);
    return result;
}


export const getEntityCredentials = async (userName) => {
    // console.log("userName:",userName); 
    const url = process.env.REACT_APP_API_URL + '/getEntityCredentials';
    const data = {
        "userName": userName
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("createSRAivis", result.meta.Message);
    return result;
}


export const insertNewUserFromBw = async (payload) => {
    // console.log("CanId:",userName); 
    const url = process.env.REACT_APP_API_URL + '/newUserforS1';
    const data = {
        "service_id": payload.username,
        "password": payload.password
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("createSRAivis", result.meta.Message);
    return result;
}


export const getAccountDetailsByMobileNumber = async (mobile) => {
    // console.log("CanId:",userName); 
    const url = process.env.REACT_APP_API_URL + '/getAccountDetailsByMobileNumber';
    const data = {
        "mobileNo": mobile
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("createSRAivis", result.meta.Message);
    return result;
}


export const updatePasswordByServiceId = async (payload) => {
    // console.log("CanId:",userName); 
    const url = process.env.REACT_APP_API_URL + '/updatePasswordByServiceId';
    const data = {
        "service_id": payload.service_id,
        "password": payload.password
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("createSRAivis", result.meta.Message);
    return result;
}

export const updateMobileByServiceId = async (userMobile) => {
    // console.log("CanId:",userName); 
    const url = process.env.REACT_APP_API_URL + '/updateMobileByServiceId';
    const data = {
        "userMobile": userMobile
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("createSRAivis", result.meta.Message);
    return result;
}

export const getUserByCanId = async (payload) => {
    // console.log("payload: ", payload); 
    const url = process.env.REACT_APP_API_URL + '/getUserByCanId';
    const data = {
        "userName": payload.userName,
        "ip": payload.ip,
        "user_device_os": payload.user_device_os
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("createSRAivis", result.meta.Message);
    return result;
}


export const logger = async (log_data) => {
    // console.log("log_data: ", log_data); 
    const url = process.env.REACT_APP_API_URL + '/logger';
    // const url = 'http://localhost:4001/logger';
    const data = {
        "log_data": log_data
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("createSRAivis", result.meta.Message);
    return result;
}
