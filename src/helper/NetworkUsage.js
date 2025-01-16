import React, { useState, useRef, useEffect } from 'react';
import graph1 from "../assets/images/graph1.png"
import download from "../assets/images/download.svg"
import pin from "../assets/images/pin.svg"
import html2canvas from 'html2canvas';


const NetworkUsage = ({ networkParms }) => {
  const [getMRTGgraph, setMRTGgraph] = useState();
  const [getPinnedMRTGraph, setPinnedMRTGraph] = useState(null);
  const [estimatedSizeBytes, setEstimatedSizeBytes] = useState()
  const [getBandWidth, setBandWidth] = useState();
  const [getDatalimit, setDatalimit] = useState();
  const [showUtilization, setShowUtilization] = useState();
  const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
  const locationID = localStorage.getItem('crm_location_id');
  const pinnedNetwork = networkParms[0];
  const networkParm = networkParms[1];
  //  console.log("networkParmssssss", networkParms[1]);
  //  console.log("pinnedNetworksssss", pinnedNetwork);




  async function allSolutionList(service_id) {
    const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
    const data = {
      "groupID": localStorage.getItem("crm_group_id"),
      "companyID": (segmentCheckHBB == "HBB") ? "CIndividual" : "",
      "locationID": (segmentCheckHBB == "HBB") ? locationID : ""
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
    // console.log("Current Sgment after", filteredData[0].Bandwidth);
    setBandWidth(filteredData[0].Bandwidth)
    setDatalimit(filteredData[0].Datalimit)
    getMRTGBandwidthUtilization(service_id, filteredData[0].SegmentName, filteredData[0].Bandwidth);
    // setSegmnt(filteredData[0].SegmentName)
  }

  async function getMRTGBandwidthUtilization(serviceID, segment_name, band_width) {
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
    } else {
      greaterUtilization = utilizationOut
    }
    // console.log("greaterUtilization",greaterUtilization);
    let utilization = greaterUtilization / band_width;
    let utilization_perc = utilization * 100;
    // console.log(utilization_perc);
    setShowUtilization(utilization_perc)
    // setSegmnt(filteredData[0].SegmentName)


  }

  useEffect(() => {
    async function getMRTGraph(serviceID, productSegment, dateType) {
      var url = process.env.REACT_APP_API_URL + '/mrtgGraph';
      var data = {
        "Authkey": "AdgT68HnjC8U5S3TkehEqlkd4",
        "Action": "getMRTGbycanidv2",
        "canID": serviceID,
        "ProductSegment": productSegment,
        "dateType": dateType
      };
      // console.log("getMRTGraph: ",data);
      
      var response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      var result = await response.json();
      var filteredData = result.data.response;
      const estimatedSizeBytes = (filteredData.length * 3) / 4;
      setEstimatedSizeBytes(estimatedSizeBytes)
      // console.log('Estimated size (bytes):', estimatedSizeBytes);
      // console.log('MRTG_DATA',filteredData);
      setMRTGgraph(filteredData);
      allSolutionList(serviceID);

      if (estimatedSizeBytes > 100) {
        // console.log("MRTG Graph Avoilable")
      }
      else if (productSegment == "BIA" && productSegment == "MBIA" && estimatedSizeBytes > 100) {
        const apiFailureDetails = {
          API_Name: "getMRTGbycanidv2", // Name of the API where failure occurred
          Request: {
            "Authkey": "AdgT68HnjC8U5S3TkehEqlkd4",
            "Action": "getMRTGbycanidv2",
            "canID": serviceID,
            "ProductSegment": productSegment,
            "dateType": dateType
          },
          Date: new Date().toISOString(),
          Message: "MRTG Graph Not Avoilable",
          response: result.data
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
              subject: "Network Usage"
            })
          });
          const data = await response.json();
          // console.log("Mail sent successfully:", data);
        } catch (mailError) {
          console.error("Failed to send mail:", mailError);
        }
      }
      else {
        // console.log(`MRTG Graph Not Avoilable Product is ${productSegment}`)
      }

    }

    getMRTGraph(networkParm.service_id, networkParm.segmentName, networkParm.period);
  }, [networkParm?.service_id, networkParm?.segmentName, networkParm?.period]);

  async function pinnedMRTGraph(serviceID, productSegment, dateType) {
    var url = process.env.REACT_APP_API_URL + '/mrtgGraph';
    var data = {
      "Authkey": "AdgT68HnjC8U5S3TkehEqlkd4",
      "Action": "getMRTGbycanidv2",
      "canID": serviceID,
      "ProductSegment": productSegment,
      "dateType": dateType
    };
    // console.log("pinnedMRTGraph", data);
    
    var response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    var result = await response.json();
    var filteredData = result.data.response;
    const estimatedSizeBytes = (filteredData.length * 3) / 4;
    setEstimatedSizeBytes(estimatedSizeBytes)
    // console.log('Estimated size (bytes):', estimatedSizeBytes);
    // console.log('MRTG_DATA Pinned',filteredData);
    setPinnedMRTGraph(filteredData);

    if (estimatedSizeBytes > 100) {
      // console.log("MRTG Graph Avoilable")
    }
    else if (productSegment == "BIA" && productSegment == "MBIA" && estimatedSizeBytes > 100) {
      const apiFailureDetails = {
        API_Name: "getMRTGbycanidv2", // Name of the API where failure occurred
        Request: {
          "Authkey": "AdgT68HnjC8U5S3TkehEqlkd4",
          "Action": "getMRTGbycanidv2",
          "canID": serviceID,
          "ProductSegment": productSegment,
          "dateType": dateType
        },
        Date: new Date().toISOString(),
        Message: "MRTG Graph Not Avoilable",
        response: result.data
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
            text: emailBody,// Send the structured email body
            subject: "Network Usage"
          })
        });
        const data = await response.json();
        // console.log("Mail sent successfully:", data);
      } catch (mailError) {
        console.error("Failed to send mail:", mailError);
      }
    }
    else {
      // console.log(`MRTG Graph Not Avoilable Product is ${productSegment}`)
    }
  }


  useEffect(() => {
    pinnedNetwork && pinnedMRTGraph(pinnedNetwork.service_id, pinnedNetwork.segmentName, pinnedNetwork.period);
    pinnedNetwork && allSolutionList(pinnedNetwork.service_id);
  }, [
    pinnedNetwork && pinnedNetwork.service_id,
    pinnedNetwork && pinnedNetwork.segmentName,
    pinnedNetwork && pinnedNetwork.period
  ]);
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = "data:image/jpeg;base64," + getMRTGgraph;
    link.download = 'Network Usage (MRTG).jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div class="dashboard-box">
      <div class="dashboard-box-top-bar">

        <div class="dashboard-box-heading">
          {/* Network Usage (MRTG)  */}
          <p class="p-0 m-0" className='networkHeader'>Network Usage (MRTG)</p>
        </div>
        <div class="dashboard-box-options">
          <div class="dashboard-box-option">
            <img src={download} alt="" onClick={handleDownload} />
          </div>
          <div class="dashboard-box-option">
            {/* <img src={pin} alt="" /> */}
          </div>
        </div>
      </div>
      <div class="dashboard-inner-box">
        <div className="chartjs-container">
          {getPinnedMRTGraph == null && (estimatedSizeBytes > 100 ?
            <p className='data-exeed-msg' style={{ marginLeft: "15px"}}>
              <span style={{ backgroundColor: "red" }}>
                {getDatalimit !== "Unlimited" && showUtilization > 80 ? "Your bandwidth utilization has exceeded 80% which might lead to connectivity issues please address promptly" : ""}
              </span>
            </p> : "")
          }
          {getPinnedMRTGraph !== null && (showUtilization != NaN ?
            <p> {getDatalimit !== "Unlimited" && showUtilization > 80 ? "Your bandwidth utilization has exceeded 80% which might lead to connectivity issues please address promptly" : ""}</p> : "")

          }
          <div class="network-graph-frame2" style={{ textAlign: "center" }} id="mrtg-img">
            {getPinnedMRTGraph == null && (estimatedSizeBytes > 100 ?
              <img src={"data:image/jpeg;base64," + getMRTGgraph} /> : <div className='empty-notif-content'>MRTG Graph Not Available</div>)
            }
            {/* {getPinnedMRTGraph == null ? "Graph not available":"Graph not available"
           
        } */}
            {getPinnedMRTGraph !== null && (estimatedSizeBytes > 100 ?
              <img src={"data:image/jpeg;base64," + getPinnedMRTGraph} /> : <div className='empty-notif-content'>MRTG Graph Not Available</div>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkUsage
