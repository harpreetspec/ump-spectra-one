import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import download from "../assets/images/download.svg"
import pin from "../assets/images/pin.svg"
import "../assets/css/dashboard.css"
import html2canvas from 'html2canvas';
import moment from 'moment';

const YourComponent = ({ networkParms }) => {
  // console.log("networkParms",networkParms);
  const [chartData, setChartData] = useState(null);
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [avgF, setAvg] = useState(null);
  const currentYear = new Date().getFullYear();
  const [networkTextFlag, setNetworkTextFlag] = useState(false);
  const [currentMonthName, setCurrentMonthName] = useState()


  const currentMonth = new Date().getMonth() + 1;
  const maxDate = new Date(currentYear, currentMonth - 1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState();

  const getCurrentMonth = () => {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    // console.log("month: ", month);

    return month;
  };

  const getLastThreeMonths = () => {
    const now = new Date();
    const lastThreeMonths = [];
    // const lastThreeMonths = ['July', 'June', 'May']
    for (let i = 0; i < 3; i++) {
      now.setMonth(now.getMonth() - 1);
      lastThreeMonths.push(now.toLocaleString('default', { month: 'long' }));
    }
    // console.log("lastThreeMonths",lastThreeMonths);
    return lastThreeMonths;
  };

  const months = [...new Set([getCurrentMonth(), ...getLastThreeMonths()])];
  // const months = getLastThreeMonths();
  // console.log("months", months);


  const handleCalenderChange = (e) => {
    setChartData("");
    setAvg("")
    // console.log("e",e.target.innerText)
    setSelectedMonth(e.target.innerText)
    const monthName = e.target.innerText
    const dateObject = new Date(`${monthName} 1, 2023`);
    const monthNumber = dateObject.getMonth() + 1;
    // console.log("monthNumber",monthNumber);
    let pinnedsegment = JSON.parse(sessionStorage.getItem("pinnedClicked"))
    // if(localStorage.getItem('segment') != "MS Wi-Fi"){
    fetchDataforMonth(monthNumber, 2023);
    // }
  };

  const pinnedAvailability = networkParms[0];
  const networkParm = networkParms[1];
  // console.log("networkParmsavail", networkParm);
  // console.log("pinnedAvailability", pinnedAvailability);

  useEffect(() => {
    let pinnedsegment = JSON.parse(sessionStorage.getItem("pinnedClicked"))
    if (localStorage.getItem('segment') != "MS Wi-Fi") {
      if (pinnedAvailability && networkParm) {
        fetchData(networkParm ? networkParm.service_id : "");

      }
      else if (networkParm && pinnedAvailability == undefined) {

        fetchData(networkParm ? networkParm.service_id : "");
      }
      else if (pinnedAvailability === null) {
        fetchData(networkParm ? networkParm.service_id : "");

      } else if (pinnedAvailability !== null) {

        fetchData(pinnedAvailability ? pinnedAvailability.service_id : "");
      }
    }
  }, [pinnedAvailability, networkParm]);

  const fetchData = async (service_id) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/getupTimeGraph';
      const reqBody = {
        "service_id": service_id
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      });
      const data = await response.json();



      // console.log("data: ", data);

      const { meta, data: chartDataArray } = data.data;
      const currentMonthName = moment().format('MMMM');
      // console.log("currentMonthName",currentMonthName);
      setCurrentMonthName(currentMonthName)
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const previousMonth = (currentMonth - 1 + 12) % 12;
      const currentDay = currentDate.getDate() - 1;
      const currentMonthDayMinusOne = new Date(2023, currentMonth - 1, currentDay).getDate();
      // console.log("previousMonth",previousMonth);
      const currentDateMoment = moment();
      const previousMonthEndDate = moment(currentDate).subtract(1, 'months').endOf('month');
      const dayOfPreviousMonthEnd = previousMonthEndDate.format('DD');
      // console.log("dayOfPreviousMonthEnd",dayOfPreviousMonthEnd);

      const lastSevenDays = getLastSevenDays(currentMonth, 2023);

      const getParameters = {};

      chartDataArray.row.forEach((row) => {
        const date = getMyDate(row.t);
        const pl = convertExtactNumber(row.v[1]);

        if (lastSevenDays.includes(date)) {
          if (!getParameters[date]) {
            getParameters[date] = [];
          }
          getParameters[date].push(pl);
        }
      });

      const getParameters2 = {};

      for (const key in getParameters) {
        const num = getParameters[key].length;
        const down = getParameters[key].reduce((sum, value) => sum + value, 0) / num;
        const up = 100 - down;

        getParameters2[key] = {
          down: round(down, 2),
          up: round(up, 2),
        };
      }

      const networkUpTime = {};

      for (const key in getParameters) {

        const num1 = getParameters[key].length;

        const down1 = getParameters[key].reduce((sum, value) => sum + value, 0) / num1;

        const up1 = 100 - down1;

        networkUpTime[key] = {

          up1: round(up1, 2),

        };

      }
      const sum = Object.values(networkUpTime).reduce((acc, obj) => acc + obj.up1, 0);

      const roundedSum = Number(sum.toFixed(2));

      //        console.log("Sum of up1 values rounded 2:", roundedSum);

      const avg = (sum / currentMonthDayMinusOne).toFixed(2);
      //    console.log('totavg',avg);
      setAvg(avg);

      const labels = lastSevenDays;
      // console.log("labels: ", labels);
      // console.log("getParameters2: ", getParameters2);
      const upPercentages = labels.map((label) => getParameters2[label]?.up || 0);
      const downPercentages = labels.map((label) => getParameters2[label]?.down || 0);
      // console.log("upPercentages: ", upPercentages);
      // console.log("downPercentages: ", downPercentages);

      const chartData = {
        labels,
        datasets: [
          {
            label: 'Device Up %',
            data: upPercentages,
            barThickness: 15,
            backgroundColor: '#47A8C5',
          },
          {
            label: 'Device Down %',
            data: downPercentages,
            barThickness: 15,
            backgroundColor: '#f36f69',
          },
        ],
      };
      // console.log("chartData: ", chartData);

      setChartData(chartData);
      setNetworkTextFlag(true)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchDataforMonth = async (month, year) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/getupTimeGraph';

      const reqBody = {
        "service_id": pinnedAvailability ? pinnedAvailability.service_id : networkParm.service_id
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      });
      const data = await response.json();




      const { meta, data: chartDataArray } = data.data;
      let lastSevenDays;
      // console.log("month",month);
      setCurrentMonthName("")
      let currentMonthNumber = new Date();
      let currentMonthNumberfinal = currentMonthNumber.getMonth() + 1;
      // console.log('Current month number:', currentMonthNumberfinal);
      if (month == currentMonthNumberfinal) {
        lastSevenDays = getLastSevenDays(month, year);
        setNetworkTextFlag(true)
      }
      else {
        lastSevenDays = getDateforPreviousMonth(month, 2023)
        setNetworkTextFlag(false)
      }
      // console.log("month",month);

      const monthNumber = month;

      const endDateOfMonth = moment().month(monthNumber - 1).endOf('month').date();
      // console.log("endDateOfMonth",endDateOfMonth);

      const getParameters = {};

      chartDataArray.row.forEach((row) => {
        const date = getMyDate(row.t);
        const pl = convertExtactNumber(row.v[1]);

        if (lastSevenDays.includes(date)) {
          if (!getParameters[date]) {
            getParameters[date] = [];
          }
          getParameters[date].push(pl);
        }
      });

      // const getParameters2 = {};

      // for (const key in getParameters) {

      //   const num = getParameters[key].length;
      //   const down = getParameters[key].reduce((sum, value) => sum + value, 0) / num;
      //   const up = 100 - down;

      //   getParameters2[key] = {
      //     down: round(down, 2),
      //     up: round(up, 2),
      //   };
      // }
      const getParameters2 = {};

      for (const key in getParameters) {
        const num = getParameters[key].length;
        const down = getParameters[key].reduce((sum, value) => sum + value, 0) / num;
        const up = 100 - down;

        getParameters2[key] = {
          down: round(down, 2),
          up: round(up, 2),
        };
      }

      const networkUpTime = {};

      // for (const key in getParameters) {
      //   console.log("getParameters",getParameters[key]);
      //   const num1 = getParameters[key].length;

      //   const down1 = getParameters[key].reduce((sum, value) => sum + value, 0) / num1;

      //   const up1 = 100 - down1;

      //   networkUpTime[key] = {

      //     up1: round(up1, 2),

      //   };

      // }
      // const sum = Object.values(networkUpTime).reduce((acc, obj) => acc + obj.up1, 0);

      // const roundedSum = Number(sum.toFixed(2));
      for (const key in getParameters) {
        // console.log("getParameters", getParameters[key]);
        const num1 = getParameters[key].length;

        // Use filter to remove NaN values from the array
        const filteredValues = getParameters[key].filter(value => !isNaN(value));

        // Calculate down1 based on the filtered values
        const down1 = filteredValues.length > 0
          ? filteredValues.reduce((sum, value) => sum + value, 0) / num1
          : 0; // Set down1 to 0 if all values are NaN

        const up1 = 100 - down1;

        networkUpTime[key] = {
          up1: round(up1, 2),
        };
      }

      const sum = Object.values(networkUpTime).reduce((acc, obj) => acc + obj.up1, 0);

      const roundedSum = Number(sum.toFixed(2));


      //        console.log("Sum of up1 values rounded 2:", roundedSum);

      const avg = (sum / endDateOfMonth).toFixed(2);
      //    console.log('totavg',avg);
      if (data.meta.Status) {
        //  alert("indie if")
        setAvg(avg);
      }

      // const labels = lastSevenDays;
      // const upPercentages = labels.map((label) => getParameters2[label]?.up || 0);
      // const downPercentages = labels.map((label) => getParameters2[label]?.down || 0);
      const labels = lastSevenDays;
      const upPercentages = labels.map((label) => {
        const percentage = getParameters2[label]?.up;
        return !isNaN(percentage) ? percentage : 0;
      });
      const downPercentages = labels.map((label) => {
        const percentage = getParameters2[label]?.down;
        return !isNaN(percentage) ? percentage : 0;
      });
      const chartData = {
        labels,
        datasets: [
          {
            label: 'Device Up %',
            data: upPercentages,
            barThickness: 15,
            backgroundColor: '#47A8C5',
          },
          {
            label: 'Device Down %',
            data: downPercentages,
            barThickness: 15,
            backgroundColor: '#f36f69',
          },
        ],
      };

      setChartData(chartData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  useEffect(() => {
    if (chartData) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartContainerRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          indexAxis: 'x',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              backgroundColor: '#000000BF',
              titleColor: '#fff',
              usePointStyle: true,
            },
            legend: {
              align: 'start',
              display: true,
              position: 'top',
              onClick: null,
              labels: {
                boxWidth: 5,
                boxHeight: 5,
                usePointStyle: true,
              },
            },
            title: {
              display: false,
              text: 'Availability (Uptime)',
            },
          },
          scales: {
            x: {
              grid: {
                color: '#D7D7DA69',
              },
              title: {
                display: true,
                text: 'Date(s)',
              },
              stacked: true,
              beginAtZero: true,
            },
            y: {
              grid: {
                color: '#D7D7DA69',
              },
              title: {
                display: true,
                text: 'Uptime %',
              },
              stacked: true,
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartData]);

  // const getLastSevenDays = () => {
  //   const today = new Date();
  //   today.setDate(today.getDate() - 1);
  //   const lastSevenDays = [];

  //   for (let i = 14; i >= 0; i--) {
  //     const date = new Date(today);
  //     date.setDate(today.getDate() - i);
  //     const day = date.getDate();
  //     const month = date.toLocaleString('default', { month: 'long' });
  //     lastSevenDays.push(`${day} ${month}`);
  //   }

  //   return lastSevenDays;
  // };

  const getLastSevenDays = (month, year) => {
    const today = new Date();
    const currentDay = today.getDate() - 1;
    const startDate = new Date(year, month - 1, 1);
    // const endDate = new Date(year, month, 0).getDate();
    const endDate = new Date(year, month - 1, currentDay).getDate();
    // console.log("endDate",endDate);
    const lastSevenDays = [];

    for (let i = endDate; i >= 1; i--) {
      const date = new Date(year, month - 1, i);
      const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
      lastSevenDays.push(formattedDate);
    }
    // console.log("lastSevenDays",lastSevenDays);
    return lastSevenDays.reverse();
  };

  const getDateforPreviousMonth = (month, year) => {
    const today = new Date();
    const currentDay = today.getDate() - 1;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0).getDate();
    // const endDate = new Date(year, month - 1, currentDay).getDate();
    // console.log("endDate",endDate);
    const lastSevenDays = [];
    // let i = 1; i <= endDate; i++ from 1 to more
    for (let i = endDate; i >= 1; i--) {
      const date = new Date(year, month - 1, i);
      const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
      lastSevenDays.push(formattedDate);
    }
    // console.log("lastSevenDays",lastSevenDays);
    return lastSevenDays.reverse();
  };

  const getMyDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    // console.log(timestamp, ": ", `${day} ${month}`);    
    return `${day} ${month}`;
  };

  const convertExtactNumber = (value) => {
    return Math.abs(parseFloat(value));
  };

  const round = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  };
  const handleDownload = () => {
    const chartContainer = document.getElementById('availability-img');

    // Use html2canvas to capture the chart container as an image
    html2canvas(chartContainer).then(canvas => {
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL('image/png');

      // Create a temporary link element
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'Availability.png';

      // Trigger the download
      link.click();
    });
  };

  return (
    <div className="dashboard-box">
      <div className="dashboard-box-top-bar">
        <div className="dashboard-box-heading">
          {/* Availability (Uptime) */}
          <p class="p-0 m-0" className='networkHeader'>Availability (Uptime)</p>
        </div>
        <div className="dashboard-box-options">
          <div className="dashboard-box-option">
            <img src={download} alt="" onClick={handleDownload} />
          </div>
          <div className="dropdown spectra-dropdown select-dropdown">
            <div
              className="select-custom dropdown-toggle rounded-0"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              role="button"
            >
              <div className="d-flex align-items-center gap-2">
                {/* <img src={productIcon} alt="" /> */}
                <span className="textValue"> {currentMonthName ? currentMonthName : selectedMonth}</span>
              </div>
            </div>
            <ul className="dropdown-menu">
              {months ? months.map((month, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  data-value={month}
                  onClick={handleCalenderChange}
                  style={{ fontSize: "14px" }}
                >
                  {month}
                </li>
              )) : ""}
            </ul>



          </div>
          {/* <div className="dashboard-box-option">
            <img src={pin} alt="" />
          </div> */}
        </div>
      </div>
      <div className="dashboard-inner-box">
        {/* <div className="chartjs-container" style={{ marginRight: 78, marginTop: 2, marginLeft: 15 }}> */}
        <div className="chartjs-container" id="availability-img" style={{ textAlign: "center" }}>
          {chartData ? <canvas ref={chartContainerRef} id="myChart" /> : <div className='empty-notif-content'>Data Not Available</div>}
        </div>


        {/* <div className="network-info-row" style={{ marginLeft: 50 }}>
          <div className="network-info-box">
            <div className="d-flex flex-row gap-2 gap-md-5 flex-wrap">
            {chartData !== null?
              <div className="network-info">              
                {!networkTextFlag && <><span className="network-info-name">Network Uptime:</span>
               
                {avgF !== "" && <span className="network-info-value">{avgF + "%"}</span>}
                </>
                }            
              </div>: ""}
              <div className="network-info">
                
                <span className="network-info-name">Average Readability:</span>
                <span className="network-info-value">38.32ms</span>
            
              </div>
            </div>
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default YourComponent;
