import React, { useEffect, useRef, useState } from 'react';


export default function ComOBBFilter(){
    return(
        <><div class="dashboard-box">
        <div class="filter-head d-flex justify-content-between align-items-center">
          <p class="p-0 m-0">Service ID: 12345</p>
          <button class="filter-apply-btn px-3 py-2">Apply</button>
        </div>
        <div class="filter-box">
          <div class="row justify-content-between justify-content-sm-start">
            <div class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset">
              <div class="filter-inner-box removeCSS">
                <div class="dashboard-box-option">City</div>
                <div class="filter-row mt-2">
                  <select class="select2-custom w-100">
                    <option value="1" selected>Bangalore</option>
                    <option value="2">Delhi</option>
                    <option value="3">Gurgaon</option>
                    <option value="4">Mumbai</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider">
              <div class="filter-inner-box">
                <div class="dashboard-box-option">Location</div>
                <div class="filter-row mt-2">
                  <select id="filterCity" class="select2-custom w-100">
                    <option value="0">HSR Layout</option>
                    <option value="1">Indranagar</option>
                    <option value="2">MG Road</option>
                    <option value="3">Gandhi Nagar</option>
                    <option value="4">HSR Layout</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider">
              <div class="filter-inner-box">
                <div class="dashboard-box-option">Period</div>
                <div class="filter-row mt-2">
                  <div class="custom-select date-range" id="reportrange">
                    <span>Today</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider">
              <div class="filter-inner-box removeCSSMobile">
                <div class="dashboard-box-option">
                  Product/Solution
                </div>
                <div class="filter-row mt-2">
                  {/* <!-- HTML CHANGE: option changed --> */}
                  <select class="select2-custom w-100">
                    <option value="0">MBIA</option>
                    <option value="1">BIA</option>
                    <option value="2">OBB</option>
                    <option value="3">BBB</option>
                    <option value="4">MBB</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider">
              <div class="filter-inner-box">
                <div class="dashboard-box-option mb-1">Bandwidth</div>
                <div class="filter-row mt-2">
                  <div class="filter-value">10 Mbps</div>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider">
              <div class="filter-inner-box">
                <div class="dashboard-box-option mb-1">Data Limit</div>
                <div class="filter-row mt-2">
                  <div class="filter-value">Unlimited</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></>
    )
}