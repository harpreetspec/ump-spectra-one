import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import filter from "../assets/images/filter.svg";
import close from "../assets/images/close.svg";
import notifLoc from "../assets/images/notif-loc.svg"
import "../assets/css/dashboard.css"

export default function Notification(){


    // handle notification filter
function handleNotificationFilter() {
    const notificationFilter = document.getElementById(
      "notification-filter-popup"
    );
    const notificationContent = document.getElementById(
      "notification-content-popup"
    );
    if (notificationFilter.classList.contains("d-none")) {
      notificationFilter.classList.remove("d-none");
      notificationContent.classList.add("d-none");
    }
  }
  function closeNotificationPopover() {
    const notificationFilter = document.getElementById(
      "notification-filter-popup"
    );
    notificationFilter.classList.add("d-none");
  }







    return(
        <>
        {/* <!-- Notification Popover --> */}
<div id="notification-content-popup" class="dashboard-box notif-main-box">
  <div class="dashboard-box-top-bar">
    <div class="dashboard-box-heading">Notifications <span>04</span></div>
    <div class="dashboard-box-options px-3">
      <div class="dashboard-box-option">
        <button class="wrapper-button" onClick={handleNotificationFilter}>
          <img src={filter} alt="" />
        </button>
        <span class="notification-badge">3</span>
      </div>
    </div>
  </div>
  <div
    class="filter-selection d-flex align-items-center justify-content-between"
  >
    <div
      class="d-flex flex-row align-items-center justify-content-start flex-wrap gap-1"
    >
      <div class="filters-applied">
        MBB <img src={close} alt="" />
      </div>
      <div class="filters-applied">
        Mumbai <img src={close} alt="" />
      </div>
      <div class="filters-applied">
        Banglore <img src={close} alt="" />
      </div>
    </div>
    <div class="filter-clear-btn">Clear All</div>
  </div>
  <div class="notif-box-wrapper wrapper-box-scroll custom-scrollbar">
    <div class="notif-box" style={{ backgroundColor: 'rgba(71, 168, 197, 0.0545)' }}>
      <div class="notif-inner-bar">
        <div class="notif-point">
          <div class="d-flex flex-row align-items-center gap-2">
            <img src={notifLoc} alt="" />
            Bangalore
          </div>
          <div>HSR Layout</div>
          <div>MBB</div>
        </div>
        <div class="notif-time">
          2h ago <span class="notif-time-span"></span>
        </div>
      </div>
      <div class="notif-content mt-3">
        Lorem ipsum dolor sit amet consectetur. Tristique nec biinjk viverra
        donec
        <span style={{ color: '#f36f69' }}>utilisation</span> integer id.
      </div>
    </div>
    <div class="notif-box">
      <div class="notif-inner-bar">
        <div class="notif-point">
          <div class="d-flex flex-row align-items-center gap-2">
            <img src={notifLoc} alt="" /> Delhi
          </div>
          <div>Indiranagar</div>
          <div>MBB</div>
        </div>
        <div class="notif-time">3h</div>
      </div>
      <div class="notif-content mt-3">
        Lorem ipsum dolor sit amet consectetur. Tristique nec biinjk viverra
        donec
        <span style={{color: 'f36f69'}}>utilisation</span> integer id.
      </div>
    </div>
    <div class="notif-box" style={{ backgroundColor: 'rgba(71, 168, 197, 0.0545)' }}>
      <div class="notif-inner-bar">
        <div class="notif-point">
          <div class="d-flex flex-row align-items-center gap-2">
            <img src={notifLoc} alt="" />
            Bangalore
          </div>
          <div>Gandhinagar</div>
          <div>MBB</div>
        </div>
        <div class="notif-time">
          6h ago <span class="notif-time-span"> </span>
        </div>
      </div>
      <div class="notif-content mt-3">
        Lorem ipsum dolor sit amet consectetur. Tristique nec biinjk viverra
        donec
        <span style={{color: 'f36f69'}}>utilisation</span> integer id.
      </div>
    </div>
    <div class="notif-box">
      <div class="notif-inner-bar">
        <div class="notif-point">
          <div class="d-flex flex-row align-items-center gap-2">
            <img src={notifLoc} alt="" />
            Bangalore
          </div>
          <div>JP Nagar</div>
          <div>MBB</div>
        </div>
        <div class="notif-time">10h ago</div>
      </div>
      <div class="notif-content mt-3">
        Lorem ipsum dolor sit amet consectetur. Tristique nec biinjk viverra
        donec
        <span style={{color: 'f36f69'}}>utilisation</span> integer id.
      </div>
    </div>
    <div class="notif-box">
      <div class="notif-inner-bar">
        <div class="notif-point">
          <div class="d-flex flex-row align-items-center gap-2">
            <img src={notifLoc} alt="" />
            Bangalore
          </div>
          <div>JP Nagar</div>
          <div>MBB</div>
        </div>
        <div class="notif-time">10h ago</div>
      </div>
      <div class="notif-content mt-3">
        Lorem ipsum dolor sit amet consectetur. Tristique nec biinjk viverra
        donec
        <span style={{color: 'f36f69'}}>utilisation</span> integer id.
      </div>
    </div>
    <div class="notif-box">
      <div class="notif-inner-bar">
        <div class="notif-point">
          <div class="d-flex flex-row align-items-center gap-2">
            <img src={notifLoc} alt="" />
            Bangalore
          </div>
          <div>JP Nagar</div>
          <div>MBB</div>
        </div>
        <div class="notif-time">10h ago</div>
      </div>
      <div class="notif-content mt-3">
        Lorem ipsum dolor sit amet consectetur. Tristique nec biinjk viverra
        donec
        <span style={{color: 'f36f69'}}>utilisation</span> integer id.
      </div>
    </div>
    <div class="notif-box">
      <div class="notif-inner-bar">
        <div class="notif-point">
          <div class="d-flex flex-row align-items-center gap-2">
            <img src={notifLoc} alt="" />
            Bangalore
          </div>
          <div>JP Nagar</div>
          <div>MBB</div>
        </div>
        <div class="notif-time">10h ago</div>
      </div>
      <div class="notif-content mt-3">
        Lorem ipsum dolor sit amet consectetur. Tristique nec biinjk viverra
        donec   
        <span style={{color: 'f36f69'}}>utilisation</span> integer id.
      </div>
    </div>
    <div class="notif-box">
      <div class="notif-inner-bar">
        <div class="notif-point">
          <div class="d-flex flex-row align-items-center gap-2">
            <img src={notifLoc} alt="" />
            Bangalore
          </div>
          <div>JP Nagar</div>
          <div>MBB</div>
        </div>
        <div class="notif-time">10h ago</div>
      </div>
      <div class="notif-content mt-3">
        Lorem ipsum dolor sit amet consectetur. Tristique nec biinjk viverra
        donec
        <span style={{color: 'f36f69'}}>utilisation</span> integer id.
      </div>
    </div>

    <div class="notif-box">
      <div class="notif-inner-bar">
        <div class="notif-point">
          <div class="d-flex flex-row align-items-center gap-2">
            <img src={notifLoc}s alt="" />
            Bangalore
          </div>
          <div>JP Nagar</div>
          <div>MBB</div>
        </div>
        <div class="notif-time">10h ago</div>
      </div>
      <div class="notif-content mt-3">
        Lorem ipsum dolor sit amet consectetur. Tristique nec biinjk viverra
        donec
        <span style={{color: 'f36f69'}}>utilisation</span> integer id.
      </div>
    </div>
  </div>
</div>
{/* <!-- Notificatoin Filter --> */}
<div class="notification-filter-wrapper d-none" id="notification-filter-popup">
  <div class="top-filter-row d-flex align-items-center justify-content-between">
    <div class="top-filter-heading">Filter</div>
    <div class="d-flex align-items-center justify-content-between gap-3">
      <div class="filter-clear-btn">Clear All</div>
      <button
        class="spectra-btn filter-apply-btn"
        onClick={closeNotificationPopover}
      >
        APPLY
      </button>
    </div>
  </div>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <div class="accordion-header" id="headingOne">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          City
        </button>
      </div>
      <div
        id="collapseOne"
        class="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping"
              ><img src="./images/filter-search.svg" alt=""
            /></span>
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div>
          <div class="d-flex align-items-center gap-5 py-4 px-4">
            <div>
              <div class="py-2">
                <label for="checkbox1" class="spectra-checkbox-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox1"
                  />
                  <span class="checkmark"></span>
                  <p>Bangalore</p>
                </label>
              </div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox2"
                    checked
                  />
                  <span class="checkmark"></span>
                  <p>Gurgaon</p>
                </label>
              </div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox3">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox3"
                    checked
                  />
                  <span class="checkmark"></span>
                  <p>Jaipur</p>
                </label>
              </div>
            </div>

            <div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox4"
                  />
                  <span class="checkmark"></span>
                  <p>Delhi</p>
                </label>
              </div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox5">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox5"
                    checked
                  />
                  <span class="checkmark"></span>
                  <p>Hyderabad</p>
                </label>
              </div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox6">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox6"
                    checked
                  />
                  <span class="checkmark"></span>
                  <p>Mumbai</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <div class="accordion-header" id="headingTwo">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          Location
        </button>
      </div>
      <div
        id="collapseTwo"
        class="accordion-collapse collapse"
        aria-labelledby="headingTwo"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping"
              ><img src="./images/filter-search.svg" alt=""
            /></span>
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div>
          <div class="d-flex align-items-center gap-5 py-4 px-4">
            <div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox7">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox7"
                  />
                  <span class="checkmark"></span>
                  <p>Bangalore</p>
                </label>
              </div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox8">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox8"
                    checked
                  />
                  <span class="checkmark"></span>
                  <p>Gurgaon</p>
                </label>
              </div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox9">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox9"
                    checked
                  />
                  <span class="checkmark"></span>
                  <p>Jaipur</p>
                </label>
              </div>
            </div>

            <div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox10">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox10"
                  />
                  <span class="checkmark"></span>
                  <p>Delhi</p>
                </label>
              </div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox11">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox11"
                    checked
                  />
                  <span class="checkmark"></span>
                  <p>Hyderabad</p>
                </label>
              </div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox12">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox12"
                    checked
                  />
                  <span class="checkmark"></span>
                  <p>Mumbai</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <div class="accordion-header" id="headingThree">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >
          Solution/Product
        </button>
      </div>
      <div
        id="collapseThree"
        class="accordion-collapse collapse"
        aria-labelledby="headingThree"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <div class="input-group flex-nowrap">
            <span class="input-group-text" id="addon-wrapping"
              ><img src="./images/filter-search.svg" alt=""
            /></span>
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            />
          </div>
          <div class="d-flex align-items-center gap-5 py-4 px-4">
            <div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox7">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox7"
                  />
                  <span class="checkmark"></span>
                  <p>Bangalore</p>
                </label>
              </div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox8">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox8"
                    checked
                  />
                  <span class="checkmark"></span>
                  <p>Gurgaon</p>
                </label>
              </div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox9">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox9"
                    checked
                  />
                  <span class="checkmark"></span>
                  <p>Jaipur</p>
                </label>
              </div>
            </div>

            <div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox10">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox10"
                  />
                  <span class="checkmark"></span>
                  <p>Delhi</p>
                </label>
              </div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox11">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox11"
                    checked
                  />
                  <span class="checkmark"></span>
                  <p>Hyderabad</p>
                </label>
              </div>
              <div class="py-2">
                <label class="spectra-checkbox-2" for="checkbox12">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkbox12"
                    checked
                  />
                  <span class="checkmark"></span>
                  <p>Mumbai</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}