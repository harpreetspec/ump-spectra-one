import React, { useEffect, useRef, useState } from 'react';
import "../assets/css/dashboard.css"

const L2OBBDataConsumptionTable = (DCParms) => {
    // console.log("DCParms", DCParms);
    // console.log("DCParms", DCParms.parms.canID);
    let period = DCParms&& DCParms.parms.period;
    let CanId = DCParms&& DCParms.parms.canID;

  const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch the API data and set it to the 'data' state
    DCParms && fetchData();
  }, [period, DCParms, CanId]);

  const fetchData = async () => {
    try {
      const payload = {
        canID: CanId,
        period : period      
      };

  //   const payload = {
  //   canID: 207648,
  //   period : "4" 
  // };
      const response = await fetch(process.env.REACT_APP_API_URL + '/dataConsumptionGraph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      const responseData = json.data.response;
      // console.log("json", json);
    if(period == "3"){
      if(Array.isArray(responseData)){
        setData(responseData)
        }else{
          setData([responseData]);
        }
          }
    else{
      setData(responseData);
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const convertBytesToMbps = bytes => {
    const megabytes = bytes / (1024 * 1024 * 1024);
    return megabytes.toFixed(2); // Rounded to 2 decimal places
  };
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    return `${day} ${month}`;
  };

 
 //Array.isArray(data)  ?

  const groupedData =  Array.isArray(data)  ? data.reduce((result, item) => {
    const formattedDate = item.startDt.substring(0, 10);
    if (!result[formattedDate]) {
      result[formattedDate] = {
        date: formattedDate,
        total: 0
      };
    }
    result[formattedDate].total += parseFloat(item.total);
    return result;
  }, {})
  : {};

  const sortedGroupedData = Object.values(groupedData).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  // const labels = data.map(item => item.startDt.substring(0, 10));
  // const totalData = data.map(item => convertBytesToMbps(parseFloat(item.total)));
  // const sortedData = data.sort((a, b) => new Date(b.startDt) - new Date(a.startDt));
  return (
    <div class="dashboard-box pb-2 mt-0 mt-md-2">
    {/* <div class="dashboard-box-top-bar">
      <div class="dashboard-box-heading">
      Data Consumption
      </div>
    </div> */}
    <div class="data-cons-table">
      <div class="data-table">
        <div
          class="table-head d-flex align-items-center justify-content-between p-3"
        >
          <div>Date</div>
          <div class="px-4">Usage</div>
        </div>
        <div
          class="data-box-wrapper wrapper-box-scroll custom-scrollbar"
        >

           {sortedGroupedData.length > 0 ? sortedGroupedData.map(item => (
              <div key={item.startDt} className="table-content d-flex align-items-center justify-content-between p-3">
                <div>{formatDate(item.date)}</div>
                <div className="px-4">{convertBytesToMbps(parseFloat(item.total))} GB</div>
              </div>
            )):
            <div className="empty-networkusage d-flex align-items-center justify-content-between p-3">
                No Data Usage Available
              </div>
            }
          {/* <div
            class="table-content d-flex align-items-center justify-content-between p-3"
          >
            <div>12 May 2023</div>
            <div class="px-4">1.39 GB</div>
          </div> */}
          {/* <div
            class="table-content d-flex align-items-center justify-content-between p-3"
          >
            <div>12 May 2023</div>
            <div class="px-4">1.39 GB</div>
          </div>
          <div
            class="table-content d-flex align-items-center justify-content-between p-3"
          >
            <div>12 May 2023</div>
            <div class="px-4">1.39 GB</div>
          </div>
          <div
            class="table-content d-flex align-items-center justify-content-between p-3"
          >
            <div>12 May 2023</div>
            <div class="px-4">1.39 GB</div>
          </div>
          <div
            class="table-content d-flex align-items-center justify-content-between p-3"
          >
            <div>12 May 2023</div>
            <div class="px-4">1.39 GB</div>
          </div>
          <div
            class="table-content d-flex align-items-center justify-content-between p-3"
          >
            <div>12 May 2023</div>
            <div class="px-4">1.39 GB</div>
          </div>
          <div
            class="table-content d-flex align-items-center justify-content-between p-3"
          >
            <div>12 May 2023</div>
            <div class="px-4">1.39 GB</div>
          </div> */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default L2OBBDataConsumptionTable