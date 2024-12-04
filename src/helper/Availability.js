import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import "../assets/css/dashboard.css";
import download from "../assets/images/download.svg"
import pin from "../assets/images/pin.svg"

  const Availability = ({sampleData}) => {
    const canvasRef = useRef(null);

    console.log("sampleData:",sampleData);

    useEffect(() => {
      const ctx = canvasRef.current.getContext('2d');
    
      // Create the chart
      new Chart(ctx, {
        type: "bar",
        data: sampleData,
        options: {
          indexAxis: "x", // Change the indexAxis to 'x' for horizontal chart
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
              grid: {
                color: "#D7D7DA69",
              },
              title: {
                display: true,
                text: "Period 2023",
              },
              stacked: true,
              beginAtZero: true,
            },
            y: {
              grid: {
                color: "#D7D7DA69",
              },
              ticks: {
                min: 0,
                max: 100,
              },
              title: {
                display: true,
                text: "Title for values",
              },
              stacked: true,
              beginAtZero: true,
            },
          },
        },
      });
    }, []);
    // useEffect(() => {
    //   const ctx = canvasRef.current.getContext('2d');
  
    //   // Create the chart
    //   new Chart(ctx, {
    //     type: "bar",
    //     data: sampleData,
    //     options: {
    //       indexAxis: "y",
    //       responsive: true,
    //       maintainAspectRatio: false,
    //       plugins: {
    //         tooltip: {
    //           backgroundColor: "#000000BF",
    //           titleColor: "#fff",
    //           usePointStyle: true,
    //         },
    //         legend: {
    //           align: "start",
    //           display: true,
    //           position: "top",
    //           labels: {
    //             boxWidth: 5,
    //             boxHeight: 5,
    //             usePointStyle: true,
    //           },
    //         },
    //         title: {
    //           display: false,
    //           text: "Availability (Uptime)",
    //         },
    //       },
    //       scales: {
    //         x: {
    //           grid: {
    //             color: "#D7D7DA69",
    //           },
    //           ticks: {
    //             min: 0,
    //             max: 100,
    //           },
    //           title: {
    //             display: true,
    //             text: "Title for values",
    //           },
    //           stacked: true,
    //           beginAtZero: true,
    //         },
    //         y: {
    //           grid: {
    //             color: "#D7D7DA69",
    //           },
    //           title: {
    //             display: true,
    //             text: "Period 2023",
    //           },
    //           stacked: true,
    //           beginAtZero: true,
    //         },
    //       },
    //     },
    //   });
    // }, []);


  return (
    <div class="dashboard-box">
    <div class="dashboard-box-top-bar">
      <div class="dashboard-box-heading">
        Availability (Uptime)
      </div>
      <div class="dashboard-box-options">
        <div class="dashboard-box-option">
          <img src={download} alt="" />
        </div>
        <div class="dashboard-box-option">
          <img src={pin} alt="" />
        </div>
      </div>
    </div>
    <div class="dashboard-inner-box">
      <div class="chartjs-container">
        {/* <canvas id="myChart"></canvas> */}
        <canvas ref={canvasRef} id="myChart" />
        
      </div>
      <div class="network-info-row">
        <div class="network-info-box">
          <div class="d-flex flex-row gap-2 gap-md-5 flex-wrap">
            <div class="network-info">
              <span class="network-info-name">Network Uptime:</span>
              <span class="network-info-value">100%</span>
            </div>
            <div class="network-info">
              <span class="network-info-name">Average Readability:</span>
              <span class="network-info-value">38.32ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Availability;