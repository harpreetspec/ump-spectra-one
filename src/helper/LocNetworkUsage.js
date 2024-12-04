import React, { useState, useRef,useEffect } from 'react';
import graph1 from "../assets/images/graph1.png"
import download from "../assets/images/download.svg"
import pin from "../assets/images/pin.svg"
import $ from "jquery";

const useSelect2 = (ref, onChangeCallback) => {
  useEffect(() => {
    const selectElement = $(ref.current);

    selectElement.select2({
      minimumResultsForSearch: -1,
    });

    selectElement.on('change', function (e) {
      const selectedValue = e.target.value || '';
      onChangeCallback(selectedValue);
    });

    return () => {
      selectElement.off('change'); // Remove the change event listener
      selectElement.select2('destroy');
    };
  }, [ref, onChangeCallback]);
};


export default function LocNetworkUsage({locNetworkParms}) {
  const [getMRTGgraph, setMRTGgraph] = useState();
  const [selectedPeriod, setSelectedPeriod] = useState("")
  const periodRef = useRef(null)
  const [flagCheck, setFlagCheck] = useState(false);
  const [estimatedSizeBytes, setEstimatedSizeBytes] = useState()
  const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
  const locationID = localStorage.getItem('crm_location_id');
  const [getBandWidth, setBandWidth] = useState();
  const [solutionLists, setSolutionLists] = useState();
  const[showUtilization,setShowUtilization] = useState();

  // console.log("locNetworkParms",locNetworkParms);

  async function allSolutionList(service_id) {
    const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
    const data = {
      "groupID": localStorage.getItem("crm_group_id"),
      "companyID": (segmentCheckHBB == "HBB") ? "CIndividual":"",
      "locationID":  (segmentCheckHBB == "HBB") ? locationID:""
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log(result);
    const filteredData = result.data.filter((item) => item.CanId == service_id);
    // console.log("Current Sgment", filteredData[0]);
    if (filteredData.length > 0 && filteredData[0].Bandwidth) {
      filteredData[0].Bandwidth = filteredData[0].Bandwidth.replace(' Mbps', '');
    }
    // console.log("Current Sgment after", filteredData);

    setSolutionLists(filteredData);
    setBandWidth(filteredData[0].Bandwidth)
    getMRTGBandwidthUtilization(service_id,filteredData[0].SegmentName,filteredData[0].Bandwidth);
    // setSegmnt(filteredData[0].SegmentName)
  }

  async function getMRTGBandwidthUtilization(serviceID,segment_name,band_width) {
    const url = process.env.REACT_APP_API_URL + '/getMRTGBandwidthUtilization';
    const data = {    
        "Authkey": "AdgT68HnjC8U5S3TkehEqlkd4",
        "Action": "getMRTGBandwidthUtilization",
        "canID": serviceID,
        "ProductSegment": segment_name    
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    // console.log("getMRTGBandwidthUtilization",result.data.response,serviceID,segment_name,band_width);
    const { utilization_95in, utilization_95out } = result.data.response;
    const utilizationIn = parseFloat(utilization_95in);
    const utilizationOut = parseFloat(utilization_95out);
    let greaterUtilization;
    if (utilizationIn > utilizationOut) {
      greaterUtilization = utilizationIn;
    }else{
      greaterUtilization = utilizationOut
    }
    // console.log("greaterUtilization",greaterUtilization, band_width);
    let utilization = greaterUtilization/ band_width;
    let utilization_perc = utilization * 100;
    // console.log(utilization_perc);
    setShowUtilization(utilization_perc)
    
    // setSegmnt(filteredData[0].SegmentName)


  }




  useEffect(() => {
// console.log("locNetworkParms",locNetworkParms);
    async function getMRTGraph(serviceID,productSegment,dateType) {
      var url = process.env.REACT_APP_API_URL + '/mrtgGraph';
      var data = {
        "Authkey":"AdgT68HnjC8U5S3TkehEqlkd4",
        "Action":"getMRTGbycanidv2",
        "canID": serviceID,
        "ProductSegment":productSegment ,
        "dateType":dateType
      };
      var response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      var result = await response.json();
      var filteredData = result.data.response;
      //console.log('MRTG_DATA',filteredData);
      const estimatedSizeBytes = (filteredData.length * 3) / 4;
      setEstimatedSizeBytes(estimatedSizeBytes)
      setMRTGgraph(filteredData);
      allSolutionList(serviceID);

      if (estimatedSizeBytes > 100){
        // console.log("MRTG Graph Avoilable")
        }
        else if (productSegment=="BIA" && productSegment=="MBIA" && estimatedSizeBytes > 100){
          const apiFailureDetails = {
        API_Name: "getMRTGbycanidv2", // Name of the API where failure occurred
        Request: {
          "Authkey":"AdgT68HnjC8U5S3TkehEqlkd4",
          "Action":"getMRTGbycanidv2",
          "canID": serviceID,
          "ProductSegment":productSegment ,
          "dateType":dateType
        },
        Date: new Date().toISOString(),
        Message: "MRTG Graph Not Avoilable",
        response : result.data
      };
      const emailBody = `
  API Failure Report
  --------------------
  API Name: ${apiFailureDetails.API_Name} (LocNetworkUsage.js) 
  Request:
  ${JSON.stringify(apiFailureDetails.Request, null, 2)}
  Response : ${JSON.stringify(apiFailureDetails.response)}     
  Message : ${apiFailureDetails.Message}  
  Date: ${apiFailureDetails.Date}`;
      try {
        const response = await fetch('https://oneml.spectra.co/sendMailS1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: emailBody, // Send the structured email body
            subject: "MRTG"
          })
        });
        const data = await response.json();
        // console.log("Mail sent successfully:", data);
      } catch (mailError) {
        console.error("Failed to send mail:", mailError);
      }
        }
        else{
          // console.log(`MRTG Graph Not Avoilable Product is ${productSegment}`)
        }
    }

    getMRTGraph(localStorage.getItem("credentialKey"),localStorage.getItem("segment"),1);
  }, []);


  async function onchangeGetMRTGraph(serviceID,productSegment,dateType) {
    var url = process.env.REACT_APP_API_URL + '/mrtgGraph';
    var data = {
      "Authkey":"AdgT68HnjC8U5S3TkehEqlkd4",
      "Action":"getMRTGbycanidv2",
      "canID": serviceID,
      "ProductSegment":productSegment ,
      "dateType":dateType
    };
    var response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    var result = await response.json();
    var filteredData = result.data.response;
          //console.log('MRTG_DATA',filteredData);
          const estimatedSizeBytes = (filteredData.length * 3) / 4;
      setEstimatedSizeBytes(estimatedSizeBytes)
    setMRTGgraph(filteredData);

    if (estimatedSizeBytes > 100){
      // console.log("MRTG Graph Avoilable")
      }
      else if (productSegment=="BIA" && productSegment=="MBIA" && estimatedSizeBytes > 100){
        const apiFailureDetails = {
      API_Name: "getMRTGbycanidv2", // Name of the API where failure occurred
      Request: {
        "Authkey":"AdgT68HnjC8U5S3TkehEqlkd4",
        "Action":"getMRTGbycanidv2",
        "canID": serviceID,
        "ProductSegment":productSegment ,
        "dateType":dateType
      },
      Date: new Date().toISOString(),
      Message: "MRTG Graph Not Avoilable",
      response : result.data
    };
    const emailBody = `
API Failure Report
--------------------
API Name: ${apiFailureDetails.API_Name} (LocNetworkUsage.js) 
Request:
${JSON.stringify(apiFailureDetails.Request, null, 2)}
Response : ${JSON.stringify(apiFailureDetails.response)}     
Message : ${apiFailureDetails.Message}  
Date: ${apiFailureDetails.Date}`;
    try {
      const response = await fetch('https://oneml.spectra.co/sendMailS1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: emailBody, // Send the structured email body
          subject: "MRTG"
        })
      });
      const data = await response.json();
      // console.log("Mail sent successfully:", data);
    } catch (mailError) {
      console.error("Failed to send mail:", mailError);
    }
      }
      else{
        // console.log(`MRTG Graph Not Avoilable Product is ${productSegment}`)
      }
  }

  const handlePeriodChange = (event) => {
    // console.log("event",event);
    setSelectedPeriod(event)
    onchangeGetMRTGraph(localStorage.getItem("credentialKey"),localStorage.getItem("segment"),event)
    setFlagCheck(true)
  }
  useSelect2(periodRef, handlePeriodChange);
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = "data:image/jpeg;base64," + getMRTGgraph;
    link.download = 'Network Usage (MRTG).jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <> <div class="dashboard-box">
      <div class="dashboard-box-top-bar">
        <div class="dashboard-box-heading">
          {/* Network Usage (MRTG) */}
          <p class="p-0 m-0" className='networkHeader'>Network Usage (MRTG)</p>
        </div>
        <div class="dashboard-box-options">
          {/* <!-- HTML change: added pr-4 class to custom select. changes img src. Added download button --> */}
          <div class="dashboard-box-option d-flex align-items-center justify-content-center">
            {/* <img src="./images/calendar-icon.svg" alt="" class="" /> */}

            {/* <div class="custom-select date-range pr-4" id="reportrangeNetwork">
                <span>Today</span>
              </div> */}
            <div class="filter-row mt-2">

              <select
                className="select2-custom w-100"
                 value={selectedPeriod}
                 onChange={handlePeriodChange}
                 ref={periodRef}
              >
                {/* <option value="">Select an option</option> */}
                <option value="1">24 Hours</option>
                <option value="2">Today</option>
                <option value="3">Yesterday</option>
                <option value="4">Last 7 Days</option>
                <option value="5">This Week</option>
                <option value="6">Last Week</option>
                <option value="7">Last 30 Days</option>
                <option value="8">This Month</option>
                <option value="9">Last Month</option>
              </select>



            </div>
          </div>
          <div class="dashboard-box-option">
            <img src={download} alt="" onClick={handleDownload}/>
          </div>
        </div>
      </div>
      <div class="dashboard-inner-box">
      {!flagCheck && (estimatedSizeBytes >100 ?
           <p style={{marginLeft:"15px"}}><span style={{backgroundColor:"red"}}>{showUtilization > 80 && solutionLists[0].Datalimit !== "Unlimited" && solutionLists[0].Datalimit !== "NA" && solutionLists[0].Datalimit !== "" ? "Your utiliation is going above 80%" : ""}</span></p> : "")
        }
        {flagCheck && (estimatedSizeBytes >100 ?
           <p style={{marginLeft:"15px"}}><span style={{backgroundColor:"red"}}>{showUtilization > 80 && solutionLists[0].Datalimit !== "Unlimited" && solutionLists[0].Datalimit !== "NA" && solutionLists[0].Datalimit !== "" ? "Your utiliation is going above 80%" : ""}</span></p> : "")
        }
        {/* <!-- HTML Change: Remove div.traffics --> */}
        {/* <div class="traffics mb-3">
          <div class="traffic-list">
            <div>
              <span class="circle" style={{ background: "#3484f0" }}></span><span style={{ opacity: "0.5" }}>Max In
                Traffic</span>
            </div>
            <div>
              <span class="circle" style={{ background: "#0030fd" }}></span><span style={{ opacity: "0.5" }}>Max Out
                Traffic</span>
            </div>
            <div>
              <span class="circle" style={{ background: "#00c9c2" }}></span><span style={{ opacity: "0.5" }}>In
                Traffic</span>
            </div>
            <div>
              <span class="circle" style={{ background: "#fc8906" }}></span><span style={{ opacity: "0.5" }}>Out
                Traffic</span>
            </div>
          </div>
        </div> */}
        <div class="network-graph-frame">
         {!flagCheck && (estimatedSizeBytes >100 ? <img src={"data:image/jpeg;base64," + getMRTGgraph} alt="" /> : <div className='empty-networkusage p-5'>MRTG Graph not available</div>)}
         {flagCheck && (estimatedSizeBytes >100 ? <img src={"data:image/jpeg;base64," + getMRTGgraph} alt="" /> : <div className='empty-networkusage p-5'>MRTG Graph not available</div>)}
          {/* <!-- HTML CHANGE: Remove below divs --> */}
          {/* <!-- <div class="graph-indicator g-vertical">
                Traffic in Kb/s
              </div>
              <div class="graph-indicator text-center mt-3">
                Hours (Usage)
              </div> --> */}
        </div>

        {/* <div class="network-info-row mt-2">
          <div class="network-info-box">
            <div>
              <div class="network-info">
                <span class="network-info-name">Maximal In:</span>
                <span class="network-info-value">35.2 M</span>
              </div>
              <div class="network-info">
                <span class="network-info-name">Average In:</span>
                <span class="network-info-value">1.94 M</span>
              </div>
              <div class="network-info">
                <span class="network-info-name">Current In:</span>
                <span class="network-info-value">2.58 M</span>
              </div>
            </div>
          </div>
          <div class="network-info-box">
            <div>
              <div class="network-info">
                <span class="network-info-name">Maximal Out:</span>
                <span class="network-info-value">6.66 M</span>
              </div>
              <div class="network-info">
                <span class="network-info-name">Average Out:</span>
                <span class="network-info-value">576.8 M</span>
              </div>
              <div class="network-info">
                <span class="network-info-name">Current Out:</span>
                <span class="network-info-value">1.33 M</span>
              </div>
            </div>
          </div>
          <div class="network-info-box">
            <div>
              <div class="network-info">
                <span class="network-info-name">Range Start:</span>
                <span class="network-info-value">2022-8-25 / 10:50:21</span>
              </div>
              <div class="network-info">
                <span class="network-info-name">Range End:</span>
                <span class="network-info-value">2022-8-26 / 10:50:21</span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div></>
  )
}