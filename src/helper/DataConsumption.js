import React, { useEffect, useRef, useState } from 'react';
import "../assets/css/dashboard.css"

const DataConsumption = ({networkParms}) => {

  const [data, setData] = useState([]);
  const [apistatus, setApiStatus] = useState()
  useEffect(() => {
    // Fetch the API data and set it to the 'data' state
    fetchData();
  }, [networkParms.period]);

  const fetchData = async () => {
    try {
      const payload = {
        canID: localStorage.getItem("credentialKey"),
        // period : "4"
        period : `${networkParms.period}`
      
      };

      const response = await fetch('https://oneml.spectra.co/dataConsumptionGraph', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      const responseData = json.data.response;
    if(networkParms.period == "3"){
      if(Array.isArray(responseData)){
      setData(responseData)
      }else{
        setData([responseData]);
      }
    }
    else{
      setData(responseData);
    }
    setApiStatus(json.data.status)
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


  // console.log("data", data);
  // Array.isArray(data)     ?
  const groupedData = Array.isArray(data)     ? data.reduce((result, item) => {
    var formattedDate;
if(apistatus=="success"){
     formattedDate = item.startDt.substring(0, 10);
}
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
//   let sortedGroupedData
//   console.log("groupedData", groupedData);
//   if(JSON.stringify(groupedData) === '{}'){
//    sortedGroupedData = Object.values(groupedData).sort(
//     (a, b) => new Date(b.date) - new Date(a.date)
//   );
// }
  // const labels = data.map(item => item.startDt.substring(0, 10));
  // const totalData = data.map(item => convertBytesToMbps(parseFloat(item.total)));
  // const sortedData = data.sort((a, b) => new Date(b.startDt) - new Date(a.startDt));
  return (
    <div class="dashboard-box pb-2 mt-0 mt-md-2">
    <div class="dashboard-box-top-bar">
      <div class="dashboard-box-heading">Data Consumption</div>
    </div>
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
          
           {sortedGroupedData.map(item => (
              <div key={item.startDt} className="table-content d-flex align-items-center justify-content-between p-3">
                <div>{item.date ? formatDate(item.date) : ""}</div>
                <div className="px-4">{item.total ? `${convertBytesToMbps(parseFloat(item.total))} GB` : ""}</div>
              </div>
            ))}
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

export default DataConsumption