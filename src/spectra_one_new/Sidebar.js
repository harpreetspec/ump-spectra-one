import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import navHome from "../assets/images/nav-home.svg"
// import headSpectra from "../assets/images/head-spectra.svg"
// import headSpectra from "../assets/images/spectra_logo.png"
import headSpectra from "../assets/images/SPECTRA One.png"
import navUser from "../assets/images/nav-user.svg"
import navService from "../assets/images/nav-service.svg"
import supportIcon from "../assets/images/support-icon.svg";
import navSetting from "../assets/images/nav-setting.svg"
import "../assets/css/dashboard.css"

export default function SideBar() {
  const location = useLocation(); // Get the current location
  const [activeItem, setActiveItem] = useState("dashboard"); // Default active item is 'dashboard'
  const tp = sessionStorage.getItem('tp');
  useEffect(() => {
    // Extract the first part of the pathname to match the active item
    const firstPartOfPath = location.pathname.split('/')[1];

    // Update the active item based on the current URL
    switch (firstPartOfPath) {
      case "dashboard":
        setActiveItem("dashboard");
        break;
      case "accountdetails":
        setActiveItem("myAccount");
        break;
      case "servicerequests":
        setActiveItem("serviceRequests");
        break;
        case "support":

        setActiveItem("support");

        break;

         case "privacyPolicy":

          setActiveItem("support");

          break;

          case "termsandcondition":
            setActiveItem("support");
            break;
      default:

        setActiveItem("dashboard"); // Set default to dashboard if the URL doesn't match any item

        break;
    }
  }, [location.pathname]);

  return (
    <>
      <nav className="side-nav">
      
        <div className="side-nav-logo d-md-flex justify-content-center d-none">
          <img src={headSpectra} alt="" className="my-auto" />
        </div>
        <ul className="nav-list">
          <li className={`side-item ${activeItem === "dashboard" ? "active" : ""}`}>
            <Link className="side-link" to="/dashboard">
              <div className="nav-logo">
                <img src={navHome} alt="" />
              </div>
              <div className="nav-name mt-2">Dashboard</div>
            </Link>
          </li>
          <li className={`side-item ${activeItem === "myAccount" ? "active" : ""}`}>
            <Link className="side-link" to="/accountdetails">
              <div className="nav-logo">
                <img src={navUser} alt="" />
              </div>
              <div className="nav-name mt-2">My Account</div>
            </Link>
          </li>
          <li className={`side-item ${activeItem === "serviceRequests" ? "active" : ""}`}>
            <Link className="side-link" to="/servicerequests">
              <div className="nav-logo">
                <img src={navService} alt="" />
              </div>
              <div className="nav-name mt-2">Service Requests</div>
            </Link>
          </li>

          {(tp !== "AIVIS") &&
            <li className={`side-item ${activeItem === "support" ? "active" : ""}`}>
              <Link className="side-link" to="/support">
                <div className="nav-logo">
                  <img src={supportIcon} alt="" />
                </div>
                <div className="nav-name mt-2">Support</div>
              </Link>
            </li>
          }

        </ul>
      </nav>
    </>
  );
}
