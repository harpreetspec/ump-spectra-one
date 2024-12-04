import React, { useEffect, useRef, useState } from 'react';
import companyOBB  from '../assets/images/companyOBB-graph.png';
import Chart from 'chart.js/auto';
import download from '../assets/images/download.svg'
import html2canvas from 'html2canvas';

export default function ComOBBDataConsumption({networkParms}){
  console.log("$$$$$$$",networkParms.period);

  const [data, setData] = useState([]);
  const [apistatus, setApiStatus] = useState()
  const chartRef = useRef(null);
  let getSelectedPeriod;
  if(networkParms.period === "1"){
    getSelectedPeriod = "24 Hours";
  }else if(networkParms.period === "2"){
    getSelectedPeriod = "Today";
  }else if(networkParms.period === "3"){
    getSelectedPeriod ="Yesterday";
  }else if(networkParms.period === "4"){
    getSelectedPeriod = "Last 7 Days";
  }else if(networkParms.period === "5"){
    getSelectedPeriod = "This Week";
  }else if(networkParms.period === "6"){
    getSelectedPeriod = "Last Week";
  }else if(networkParms.period === "7"){
    getSelectedPeriod = "Last 30 days";
  }
  else if(networkParms.period === "8"){
    getSelectedPeriod = "This Month";
  }else if(networkParms.period === "9"){
    getSelectedPeriod = "Last Month";
  }


  useEffect(() => {
    console.log("networkParms.period",networkParms.period);
    // Fetch the API data and set it to the 'data' state
    fetchData();
  }, [networkParms.period]);

  const fetchData = async () => {
    try {
   
      const payload = {
        canID: networkParms.service_id,
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
        setData([responseData]);
      }
      else{
        setData(responseData);
      }
      // setData(responseData);
      setApiStatus(json.data.status)
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  const handleDownload = () => {
    const chartContainer = document.getElementById('chartContainer');
  
    // Use html2canvas to capture the chart container as an image
    html2canvas(chartContainer).then(canvas => {
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL('image/png');
  
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'Data Consumption.png';
  
      // Trigger the download
      link.click();
    });
  };
  
  const convertBytesToMbps = bytes => {
    const megabytes = bytes / (1024 * 1024 * 1024);
    return megabytes.toFixed(2); // Rounded to 2 decimal places
  };
 
  const createChart = () => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    // const labels = data.map(item => {
    //   const date = new Date(item.startDt);
    //   const day = date.getDate();
    //   const month = months[date.getMonth()];
    //   const year = date.getFullYear().toString().slice(-2);
    //   return `${day} ${month}'${year}`;
    // });
    const sortedData = data.sort((a, b) => new Date(a.startDt) - new Date(b.startDt));
    const labels = sortedData.map(item => {
      const date = new Date(item.startDt);
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear().toString().slice(-2);
      return `${day} ${month}`;
    });
    const totalData = sortedData.map(item => convertBytesToMbps(parseFloat(item.total)));

  //   const labels = data
  // .map(item => {
  //   const date = new Date(item.startDt);
  //   const day = date.getDate();
  //   const month = months[date.getMonth()];
  //   const year = date.getFullYear().toString().slice(-2);
  //   return `${day} ${month}`;
  // })
  // .sort((a, b) => {
  //   // Convert the date strings to Date objects for comparison
  //   const dateA = new Date(a);
  //   const dateB = new Date(b);
  //   return dateB - dateA; // Sort in ascending order (oldest to newest)
  //   // To sort in descending order, use: return dateB - dateA;
  // });

  
    // Extract the total and start dates from the API response
   // const labels = data.map(item => item.startDt.substring(0, 10));
    // const totalData = data.map(item => convertBytesToMbps(parseFloat(item.total)));

    // Create the chart context
    var chartContext
    if(apistatus == "success"){
      chartContext = document.getElementById('myChart').getContext('2d');
    }
    if(chartContext){
    var gradient = chartContext.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(66, 192, 187, 0.5)');
    gradient.addColorStop(0.7, 'rgba(66, 192, 187, 0)');
    }
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    // Create the chart
    chartRef.current = new Chart(chartContext, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total (GB)',
            data: totalData,
            // backgroundColor: 'rgba(75, 192, 192, 0.5)',
            // borderColor: 'rgba(75, 192, 192, 1)',
            // borderWidth: 1,
            // pointRadius: 0,
            // fill: 'origin', // Fill the area under the line
            fill: true,
          borderColor: '#42C0bb', // Add custom color border (Line)
          backgroundColor: gradient, // Add custom color background (Points and Fill)
          borderWidth: 1 // Specify bar border width    
          },
        ],
      },
      options: {
        tension: 0.2,
        indexAxis: "x",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            backgroundColor: "#000000BF",
            titleColor: "#fff",
            usePointStyle: true,
          },
          legend: {
            align: "start",
            display: true,
            position: "top",
            labels: {
              boxWidth: 5,
              boxHeight: 5,
              usePointStyle: true,
            },
          },
          title: {
            display: false,
            text: "Availability (Uptime)",
          },
        },
        scales: {
          x: {
            maxRotation: 0, // Disable label rotation
            autoSkip: true, // Automatically skip labels to fit the container
            maxTicksLimit: 10, // Limit the maximum number of visible ticks
            grid: {
              color: "#D7D7DA69",
            },
            title: {
              display: true,
              text: "Date(s)",
            },
          },
          y: {
            beginAtZero: true,
            suggestedMax: Math.max(...totalData) , // Set the maximum value of the y-axis
            stepSize: 10000,
            ticks: {
              max: 25000,
              min: 0,
              // stepSize: 5000,
              beginAtZero: true,
              padding: 20,
              
              },
              grid: {
                color: "#D7D7DA69",
              },
              title: {
                display: true,
                text: "Usage in GB",
              },
          },
        },
      },
    });
  };

  useEffect(() => {
    if (data.length > 0) {
      createChart();
    }
  }, [data]);
    return(

      <div class="dashboard-box pb-5">
                <div class="dashboard-box-top-bar">
                  <div class="dashboard-box-heading">Data Consumption</div>
                  <div class="dashboard-box-options">
                    {/* <!-- HTML change: added pr-4 class to custom select. changes img src. Added download button --> */}
                    <div class="dashboard-box-option d-flex align-items-center justify-content-center gap-2">
                      <img src="./images/calendar-icon.svg" alt="" />
                      <div class="custom-selectobb date-range pr-4" id="reportrange">
                        <span>{getSelectedPeriod? getSelectedPeriod : "Last 7 Days"}</span>
                      </div>
                    </div>
                    <div class="dashboard-box-option d-flex align-items-center justify-content-center">
                      <img src={download} alt="" onClick={handleDownload}/>
                    </div>
                  </div>
                </div>
                <div class="data-inner-box">
                  <div class="chartjs-container" id="chartContainer">
                    {apistatus=="success" ? <canvas id="myChart"></canvas>  : "No Data Available"}
                  </div>
                </div>
              </div>
      //   <><div class="dashboard-box pb-5">
      //   <div class="dashboard-box-top-bar">
      //     <div class="dashboard-box-heading">Data Consumption</div>
      //     <div class="dashboard-box-options">
      //       <div class="dashboard-box-option">
      //         <img src="./images/download.svg" alt="" />
      //       </div>
      //       <div class="dashboard-box-option">
      //         <img src="./images/pin.svg" alt="" />
      //       </div>
      //     </div>
      //   </div>
      //   <div class="data-inner-box">
      //     <div class="traffics mb-3">
      //       <div class="traffic-list">
      //         <div>
      //           <span class="circle" style={{background: "#00c9c2"}}></span><span style={{opacity:"0.5"}}> Usage</span>
      //         </div>
      //       </div>
      //     </div>
      //     <div class="network-graph-frame" >
      //       {/* <img src={companyOBB} alt="" /> */}
      //       <canvas id="myChart" style={{ paddingLeft: "35px", display: "block", width: "100%", objectFit:"cover",position:"relative"}}/>
      //       <div class="graph-indicator g-vertical">Usage in GB</div>
      //       <div class="graph-indicator text-center mt-3">
      //         Date/Hours
      //       </div>
      //     </div>
      //   </div>
      // </div></>
    )
}