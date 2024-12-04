import React from "react";


export default function LocAvilabiltiy(){
    return(
        <>  <div class="dashboard-box">
        <div class="dashboard-box-top-bar">
          <div class="dashboard-box-heading">
            Availability (Uptime)
          </div>
          <div class="dashboard-box-options">
            {/* <!-- HTML change: added pr-4 class to custom select. changes img src. Added download button --> */}
            <div class="dashboard-box-option d-flex align-items-center 
            justify-content-center">
              <img src="./images/calendar-icon.svg" alt="" />
              
              <div class="custom-select date-range pr-4" id="reportrangeAvailability">
                <span>Today</span>
              </div>
            </div>
            <div class="dashboard-box-option">
              <img src="./images/download.svg" alt="" />
            </div>
          </div>
        </div>
        {/* <!-- HTML CHANGE: change chartjs chart. Remove div.network-graph-frame block--> */}
        <div class="dashboard-inner-box">
          <div class="chartjs-container">
            <canvas id="myChart"></canvas>
          </div>
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
      </div></>
    )
}