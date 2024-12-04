import React, { useEffect, useRef, useState } from 'react';
import companyOBB  from '../assets/images/companyOBB-graph.png';


export default function ComOBBDataConsumption(){
    return(
        <><div class="dashboard-box pb-5">
        <div class="dashboard-box-top-bar">
          <div class="dashboard-box-heading">Data Consumption</div>
          <div class="dashboard-box-options">
            <div class="dashboard-box-option">
              <img src="./images/download.svg" alt="" />
            </div>
            <div class="dashboard-box-option">
              <img src="./images/pin.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="data-inner-box">
          <div class="traffics mb-3">
            <div class="traffic-list">
              <div>
                <span class="circle" style={{background: "#00c9c2"}}></span><span style={{opacity:"0.5"}}> Usage</span>
              </div>
            </div>
          </div>
          <div class="network-graph-frame">
            <img src={companyOBB} alt="" />
            <div class="graph-indicator g-vertical">Usage in GB</div>
            <div class="graph-indicator text-center mt-3">
              Date/Hours
            </div>
          </div>
        </div>
      </div></>
    )
}