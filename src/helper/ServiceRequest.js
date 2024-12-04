import React from "react";


export default function ServiceRequest(){
    return(
        <div class="dashboard-box pb-2 mt-0 mt-md-2">
        <div class="dashboard-box-top-bar">
          <div class="dashboard-box-heading">Data Consumption</div>
          <div class="dashboard-box-options">
            {/* <!-- HTML change: added pr-4 class to custom select. changes img src. Added download button --> */}
            <div class="dashboard-box-option d-flex align-items-center justify-content-center">
              
              <img src="./images/calendar-icon.svg" alt="" />
              <div class="custom-select date-range pr-4" id="reportrangeDataConsumption">
                <span>Today</span>
              </div>
            </div>
            <div class="dashboard-box-option">
	    {/* <img src="./images/download.svg" alt="" />*/}
            </div>
          </div>
        </div>
        <div class="data-cons-table">
          <div class="data-table">
            <div class="table-head d-flex align-items-center justify-content-between p-3">
              <div>Date</div>
              <div class="px-4">Usage</div>
            </div>
            <div class="data-box-wrapper wrapper-box-scroll custom-scrollbar">
              <div class="table-content d-flex align-items-center justify-content-between p-3">
                <div>12 May 2023</div>
                <div class="px-4">1.39 GB</div>
              </div>
              <div class="table-content d-flex align-items-center justify-content-between p-3">
                <div>12 May 2023</div>
                <div class="px-4">1.39 GB</div>
              </div>
              <div class="table-content d-flex align-items-center justify-content-between p-3">
                <div>12 May 2023</div>
                <div class="px-4">1.39 GB</div>
              </div>
              <div class="table-content d-flex align-items-center justify-content-between p-3">
                <div>12 May 2023</div>
                <div class="px-4">1.39 GB</div>
              </div>
              <div class="table-content d-flex align-items-center justify-content-between p-3">
                <div>12 May 2023</div>
                <div class="px-4">1.39 GB</div>
              </div>
              <div class="table-content d-flex align-items-center justify-content-between p-3">
                <div>12 May 2023</div>
                <div class="px-4">1.39 GB</div>
              </div>
              <div class="table-content d-flex align-items-center justify-content-between p-3">
                <div>12 May 2023</div>
                <div class="px-4">1.39 GB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
