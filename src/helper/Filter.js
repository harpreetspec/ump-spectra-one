import React, { useState, useRef, useEffect } from 'react';
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.min.css';


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
  }, []);
};

const Filter = ({ filterData }) => {
  const selectedLocationRef = useRef(null);
  // const [filteredAreas, setFilteredAreas] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [solutionName, setSolutionName] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState('All Cities');
  const [locations, setLocations] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [selectedCanId, setSelectedCanId] = useState();
  const [segmentDropdown, setSegmentDropdown] = useState();
  const [getBandwidth, setBandwidth] = useState();
  const [appyButton, setAppybutton] = useState(false);
  const [getSelectedSegment, setSelectedSegment] = useState();
  const locationID = localStorage.getItem('crm_location_id');
  const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
 
  const cityRef = useRef(null);
  const locationRef = useRef(null);
  const productRef = useRef(null);

  console.log("filterData", filterData)


  useEffect(() => {
    async function SegmentName() {



    }
    SegmentName();

  }, []);

  useEffect(() => {
    async function FilterAreaLists() {
      const url = process.env.REACT_APP_API_URL + '/getAreaLists';
      // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
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
      console.log("getAreaLists", result.data);
      // setAreaOptions(result.data);
      Array.isArray(result.data) ? setAreaOptions(result.data) : setAreaOptions([]);
    }
    FilterAreaLists();

  }, []);



  useEffect(() => {

    async function filterCity() {
      const url = process.env.REACT_APP_API_URL + '/getLocationLists';
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
      console.log(result);
      setLocations(result.data);
    }

    filterCity();
  }, []);


  const handleCityChange = (event) => {
    const selectedCity = cityRef.current.value;;
    console.log(locations);
    setSelectedCity(selectedCity);
    setSelectedLocation('All Cities');
  };


  const handleLocationChange = async (event) => {
    console.log("locationRef",event);
    const selectedLocation = event;
    console.log(selectedLocation);

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
    console.log("getSolutionLists", result.data);
    setSolutionName(result.data);

    setSelectedLocation(selectedLocation);
    // setSolutionName(event.target.value)
    const url1 = process.env.REACT_APP_API_URL + '/getAreaLists';
      // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
      const data1 = {
        "groupID": localStorage.getItem("crm_group_id"),
        "companyID": (segmentCheckHBB == "HBB") ? "CIndividual":"",
      "locationID":  (segmentCheckHBB == "HBB") ? locationID:""
      };
      const response1 = await fetch(url1, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result1 = await response1.json();
      console.log("getAreaLists", result1.data);
    console.log("areaOptions",areaOptions);
    const filteredData = result1.data.filter(item => item.AreaName === selectedLocation);
    const canIds = filteredData.map(item => item.CanId);
    console.log("canIds",canIds);
    setSelectedCanId(canIds);
    const filteredData2 = result.data.filter(item => canIds.includes(String(item.CanId)));
    console.log("filteredData2", filteredData2);
    setSegmentDropdown(filteredData2);
  };

  const handleValueChange = async (event) => {
    const segmentName = event;
    console.log("segmentName", segmentName);
    setSelectedValue(segmentName);
    console.log("segmentName", segmentName);
    const start = segmentName.indexOf("(") + 1;
    const end = segmentName.indexOf(")");
    const SegmentName = segmentName.substring(0, start - 2).trim();
    setSelectedSegment(SegmentName);
    console.log("SegmentName",SegmentName);
    console.log("start",start,"end",end);
    // Extract the CanId (193715)
    const CanId = segmentName.substring(start, end);
    setSelectedCanId(CanId);
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
    console.log("getSolutionLists", result.data);
    const filteredData3 = result.data.filter(item => item.SegmentName === SegmentName && item.CanId === CanId);
    console.log(filteredData3);
    setBandwidth(filteredData3);
    // setSolutionName(event.target.value)
  };


  const filteredAreaOptions = areaOptions.filter(
    (area) => selectedCity === 'All Cities' || area.LocationName === selectedCity
  );

  const uniqueAreaNames = Array.from(new Set(filteredAreaOptions.map((area) => area.AreaName)));
  useSelect2(cityRef, handleCityChange);
  useSelect2(locationRef, handleLocationChange);
  useSelect2(productRef, handleValueChange);
  const applyFilter = async (event) => {    

    console.log(event.target.value);

    setAppybutton(true);

  }

  return (
    <div class="dashboard-box">
      <div
        class="filter-head d-flex justify-content-between align-items-center"
      >
              <p class="p-0 m-0">Service ID:{appyButton? selectedCanId : filterData.serviceID}</p>

<button onClick={applyFilter} value={selectedCanId} class="filter-apply-btn px-3 py-2">Apply</button>
      </div>
      <div class="filter-box">
        <div
          class="row justify-content-between justify-content-sm-start"
        >
          <div
            class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset"
          >
            <div class="filter-inner-box">
              <div class="dashboard-box-option">City</div>
              <div className="filter-row mt-2">
                <select
                  className="select2-custom w-100"
                  value={selectedCity}
                  onChange={handleCityChange}
                  ref={cityRef}
                >
                  <option value="All Cities">Select City</option>
                  {locations.map((location) => (
                    <option key={location.LocationName} value={location.LocationName}>
                      {location.LocationName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div
            class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
          >
            <div class="filter-inner-box">
              <div class="dashboard-box-option">Location</div>
              <div className="filter-row mt-2">

                <select
                  id="filterCity"
                  className="select2-custom w-100"
                  value={selectedLocation}
                  onChange={handleLocationChange}
                  ref={locationRef}
                >
                  <option value="All Locations">All Locations</option>
                  {uniqueAreaNames.map((areaName) => (
                    <option key={areaName} value={areaName}>
                      {areaName}
                    </option>
                  ))}
                </select>

              </div>
            </div>


          </div>
          <div
            class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
          >
            <div class="filter-inner-box">
              <div class="dashboard-box-option">Period</div>
              <div class="filter-row mt-2">
                <div
                  class="custom-select date-range"
                  id="reportrange"
                >
                  <span>Today</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
          >
            <div class="filter-inner-box">
              <div class="dashboard-box-option">
                Product/Solution
              </div>
              <div class="filter-row mt-2">

                <select
                 className="select2-custom w-100"
                  value={selectedValue}
                  onChange={handleValueChange}
                  ref={productRef}
                >
                  <option value="">Select an option</option>
                  {segmentDropdown?.map((item, index) => (
                    <option key={index} value={item.SegmentName + " (" + item.CanId + ")"}>
                      {item.SegmentName + " (" + item.CanId + ")"}
                    </option>
                  ))}
                </select>
                {/* <select
                  className="select2-custom w-100"
                  value={selectedValue}
                  onChange={handleValueChange}
                >
                  <option value="">Select an option</option>
                  {solutionName
                    .filter((solution) => solution.CanId === selectedLocation)
                    .map((solution) => (
                      <option key={solution.SegmentName} value={solution.SegmentName}>
                        {solution.SegmentName}
                      </option>
                    ))}
                </select> */}


              </div>
            </div>



          </div>

          <div
            class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
          >
            <div class="filter-inner-box">
              <div class="dashboard-box-option mb-1">Bandwidth</div>
              <div class="filter-row mt-2">
              {getBandwidth?.map((item, index) => (
                <div key ={index} class="filter-value">{item.Bandwidth}</div>
                ))}

              </div>
            </div>
          </div>
          <div
            class="col-xl-2 col-md-3 col-sm-4 col-5 mb-3 mb-sm-0 filter-padding-reset filter-divider"
          >
            <div class="filter-inner-box">
              <div class="dashboard-box-option mb-1">
                Data Limit
              </div>
              <div class="filter-row mt-2">
              {getBandwidth?.map((item, index) => (
                <div key ={index} class="filter-value">{item.Datalimit}</div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}


export default Filter