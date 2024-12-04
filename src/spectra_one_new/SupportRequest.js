import React, { useState,useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SideBar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import iconcalendar from "../assets/images/icon-calendar.svg";

import adminbackarrow from "../assets/images/admin-back-arrow.svg";
 
import { useNavigate } from 'react-router-dom';

import Swiper from 'swiper';
import "swiper/swiper-bundle.min.css";





export default function AccountDetails(){
    const navigate = useNavigate();
    const [payNowClick,setPayNowClick] =useState(false);
    const [fullDetails, setFullDetails] = useState(false);
    const invoiceTableRef = useRef(null);
    const transactionTableRef = useRef(null);
    const toggleCheckboxRef = useRef(null);
    const [showBillingDetailTable, setShowBillingDetailTable] = useState(true);
    const [showBillingDetailAdmin, setShowBillingDetailAdmin] = useState(false);
    const [showAdminLevel, setShowAdminLevel] = useState(true);
    const [showAdminDetail, setShowAdminDetail] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('Bangalore');
    const options = ['Bangalore', 'Delhi', 'Gurgaon', 'Mumbai'];
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
      setSelectedValue(option);
      setIsOpen(false);
    };

    const goBackToTransactions = () => {
      setShowBillingDetailTable(true);
      setShowBillingDetailAdmin(false);
    };

    const goBackToUserManagement = () => {
      console.log("button clicked");
      setShowBillingDetailTable(true);
      setShowBillingDetailAdmin(false);
      setShowAdminDetail(false); // Set showAdminDetail to false to go back to the previous state
      setFullDetails(false); // Set fullDetails to false to go back to the previous state
    }
  
   

    useEffect(() => {
      const swiper = new Swiper('.tableSwiper', {
        slidesPerView: 'auto',
        freeMode: true,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
  
      return () => {
        // Cleanup Swiper instance when the component unmounts
        // swiper.destroy();
      };
    }, []);
  
    useEffect(() => {
      const handleToggleChange = () => {
        const invoiceTable = invoiceTableRef.current;
        const transactionTable = transactionTableRef.current;
  
        if (toggleCheckboxRef.current.checked) {
          invoiceTable.style.display = 'none';
          transactionTable.style.display = 'block';
        } else {
          invoiceTable.style.display = 'block';
          transactionTable.style.display = 'none';
        }
      };
  
      const toggleCheckbox = toggleCheckboxRef.current;
      if (toggleCheckbox) {
        toggleCheckbox.addEventListener('change', handleToggleChange);
      }
  
      return () => {
        if (toggleCheckbox) {
          toggleCheckbox.removeEventListener('change', handleToggleChange);
        }
      };
    }, []);





return(
    <section className="section-dashboard">
        <div className>
          <div className="d-flex justify-content-end">
              {/* SIDE NAVBAR  */}
     <SideBar/>
      {/* top header */}
   <Header/>
           
            {/* Support  */}
            <div className="dashboard-main">
              <div className="dashboard-content">
                {/* Navigation tabs: FAQs and Contact Details */}
                <div className="faq-banner">
                  <ul className="nav nav-pills account-tab-list" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link account-tab-btn active" id="pills-faq-tab" data-bs-toggle="pill" data-bs-target="#pills-faq" type="button" role="tab" aria-controls="pills-faq" aria-selected="true">FAQs</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link account-tab-btn" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact Details</button>
                    </li>
                  </ul>
                </div>
                <div className="tab-content" id="pills-tabContent">
                  {/* ****************** FAQ TAB ************* */}
                  <div className="tab-pane faq-tab-pane fade show active" id="pills-faq" role="tabpanel" aria-labelledby="pills-faq-tab">
                    {/* Help section  */}
                    <div className="faq-banner-wrapper d-flex flex-column align-items-center justify-content-center pb-5">
                      <div className="faq-banner-heading mb-3">Help Center</div>
                      <div className="help-search-bar d-flex align-items-center justify-content-center">
                        <input className="help-search-input" type="text" placeholder="Search" name="search" />
                        <button className="help-search-btn" type="submit">Search</button>
                      </div>
                    </div>
                    <div className="faq-innerContent-wrapper">
                      {/* FAQ Section  */}
                      <div className="faq-main-wrapper pb-2">
                        <div className="faq-headings mb-5">
                          <div className="account-tab-heading">Frequently asked questions</div>
                          <div className="faq-sub-heading">Here goes description</div>
                        </div>
                        {/* FAQs filte btns  */}
                        <div className="faq-filter-btns d-flex align-items-center gap-3 flex-wrap">
                          <div id="faq-filter-btn1" className="faq-filter-btn activeFilter">All</div>
                          <div id="faq-filter-btn2" className="faq-filter-btn" onclick="showBilling()">Billing</div>
                          <div id="faq-filter-btn3" className="faq-filter-btn">Connection</div>
                          <div id="faq-filter-btn4" className="faq-filter-btn">Internet Speed</div>
                          <div id="faq-filter-btn5" className="faq-filter-btn">1 Gbps Connection</div>
                          <div id="faq-filter-btn6" className="faq-filter-btn">Technical</div>
                        </div>
                        {/* FAQs Box  */}
                        <div className="faq-box-wrapper mt-5" id="faq-all" style={{display: 'block'}}>
                          <div className="faq-box-header">
                            <div className="heading">Recently Viewed</div>
                            <div className="sub-heading">Here name relatable topics of below questions</div>
                          </div>
                          <div className="faq-box-content">
                            <div className="accordion" id="accordionExample">
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                      <div className="heading mb-3">How do i check my bill?</div>
                                      <div className="sub-heading">Unable to check invoice, unable to check transaction.</div>
                                    </div>
                                  </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="faq-accordion-content">Lorem ipsum dolor sit amet consectetur, adipisicing
                                      elit. Voluptates nemo voluptatibus commodi. Quam totam assumenda quibusdam
                                      consequuntur aliquam, id magnam iure nobis!</div>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                      <div className="heading mb-3">How do i check my bill?</div>
                                      <div className="sub-heading">Unable to check invoice, unable to check transaction.</div>
                                    </div>
                                  </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="faq-accordion-content">Lorem ipsum dolor sit amet consectetur, adipisicing
                                      elit. Voluptates nemo voluptatibus commodi. Quam totam assumenda quibusdam
                                      consequuntur aliquam, id magnam iure nobis!</div>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                      <div className="heading mb-3">How do i check my bill?</div>
                                      <div className="sub-heading">Unable to check invoice, unable to check transaction.</div>
                                    </div>
                                  </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="faq-accordion-content">Lorem ipsum dolor sit amet consectetur, adipisicing
                                      elit. Voluptates nemo voluptatibus commodi. Quam totam assumenda quibusdam
                                      consequuntur aliquam, id magnam iure nobis!</div>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingfour">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                                    <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                      <div className="heading mb-3">How do i check my bill?</div>
                                      <div className="sub-heading">Unable to check invoice, unable to check transaction.</div>
                                    </div>
                                  </button>
                                </h2>
                                <div id="collapsefour" className="accordion-collapse collapse" aria-labelledby="headingfour" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="faq-accordion-content">Lorem ipsum dolor sit amet consectetur, adipisicing
                                      elit. Voluptates nemo voluptatibus commodi. Quam totam assumenda quibusdam
                                      consequuntur aliquam, id magnam iure nobis!</div>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingfive">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">
                                    <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                      <div className="heading mb-3">How do i check my bill?</div>
                                      <div className="sub-heading">Unable to check invoice, unable to check transaction.</div>
                                    </div>
                                  </button>
                                </h2>
                                <div id="collapsefive" className="accordion-collapse collapse" aria-labelledby="headingfive" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="faq-accordion-content">Lorem ipsum dolor sit amet consectetur, adipisicing
                                      elit. Voluptates nemo voluptatibus commodi. Quam totam assumenda quibusdam
                                      consequuntur aliquam, id magnam iure nobis!</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* FAQ for billing tab DEMo only */}
                        <div className="faq-box-wrapper mt-5" id="faq-billing" style={{display: 'none'}}>
                          <div className="faq-box-header">
                            <div className="heading">Billing</div>
                            <div className="sub-heading">Here name relatable topics of below questions</div>
                          </div>
                          <div className="faq-box-content">
                            <div className="accordion" id="accordionExample">
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                      <div className="heading mb-3">How do i check my bill?</div>
                                      <div className="sub-heading">Unable to check invoice, unable to check transaction.</div>
                                    </div>
                                  </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="faq-accordion-content">Lorem ipsum dolor sit amet consectetur, adipisicing
                                      elit. Voluptates nemo voluptatibus commodi. Quam totam assumenda quibusdam
                                      consequuntur aliquam, id magnam iure nobis!</div>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                      <div className="heading mb-3">How do i check my bill?</div>
                                      <div className="sub-heading">Unable to check invoice, unable to check transaction.</div>
                                    </div>
                                  </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="faq-accordion-content">Lorem ipsum dolor sit amet consectetur, adipisicing
                                      elit. Voluptates nemo voluptatibus commodi. Quam totam assumenda quibusdam
                                      consequuntur aliquam, id magnam iure nobis!</div>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                      <div className="heading mb-3">How do i check my bill?</div>
                                      <div className="sub-heading">Unable to check invoice, unable to check transaction.</div>
                                    </div>
                                  </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="faq-accordion-content">Lorem ipsum dolor sit amet consectetur, adipisicing
                                      elit. Voluptates nemo voluptatibus commodi. Quam totam assumenda quibusdam
                                      consequuntur aliquam, id magnam iure nobis!</div>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingfour">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                                    <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                      <div className="heading mb-3">How do i check my bill?</div>
                                      <div className="sub-heading">Unable to check invoice, unable to check transaction.</div>
                                    </div>
                                  </button>
                                </h2>
                                <div id="collapsefour" className="accordion-collapse collapse" aria-labelledby="headingfour" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="faq-accordion-content">Lorem ipsum dolor sit amet consectetur, adipisicing
                                      elit. Voluptates nemo voluptatibus commodi. Quam totam assumenda quibusdam
                                      consequuntur aliquam, id magnam iure nobis!</div>
                                  </div>
                                </div>
                              </div>
                              <div className="accordion-item">
                                <h2 className="accordion-header" id="headingfive">
                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">
                                    <div className="faq-accordion-btn py-2 d-flex flex-column align-items-start">
                                      <div className="heading mb-3">How do i check my bill?</div>
                                      <div className="sub-heading">Unable to check invoice, unable to check transaction.</div>
                                    </div>
                                  </button>
                                </h2>
                                <div id="collapsefive" className="accordion-collapse collapse" aria-labelledby="headingfive" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="faq-accordion-content">Lorem ipsum dolor sit amet consectetur, adipisicing
                                      elit. Voluptates nemo voluptatibus commodi. Quam totam assumenda quibusdam
                                      consequuntur aliquam, id magnam iure nobis!</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Support Guide Section  */}
                      <div className="faq-main-wrapper" id="support-guide">
                        <div className="faq-headings mb-2">
                          <div className="account-tab-heading">Support Guide</div>
                          <div className="faq-sub-heading">Here goes description</div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12 faq-inner-col">
                            {/* Billing Box  */}
                            <div className="faq-box-wrapper mb-4">
                              <div className="faq-box-header inner-faq-box">
                                <div className="heading mb-4">Billing</div>
                                <div className="sub-heading">Here name relatable topics of below questions</div>
                              </div>
                              <div onclick="showBilling()" className="faq-innerBox-content">Yet to receive the content?
                                <span><img src="./images/accordion-arrow-down.svg" alt="" /></span>
                              </div>
                              <div onclick="showBilling()" className="faq-innerBox-content">Yet to receive the content?
                                <span><img src="./images/accordion-arrow-down.svg" alt="" /></span>
                              </div>
                              <div className="faq-innerBox-content">
                                <div className="view-detail-btn d-flex align-items-center gap-2">
                                  View Details
                                  <img src="./images/arrow-out.svg" alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 faq-inner-col">
                            {/* Connection Box  */}
                            <div className="faq-box-wrapper mb-4">
                              <div className="faq-box-header inner-faq-box">
                                <div className="heading mb-4">Connection</div>
                                <div className="sub-heading">Here name relatable topics of below questions</div>
                              </div>
                              <div className="faq-innerBox-content">Yet to receive the content? <span><img src="./images/accordion-arrow-down.svg" alt="" /></span></div>
                              <div className="faq-innerBox-content">Yet to receive the content? <span><img src="./images/accordion-arrow-down.svg" alt="" /></span></div>
                              <div className="faq-innerBox-content">
                                <div className="view-detail-btn d-flex align-items-center gap-2">
                                  View Details
                                  <img src="./images/arrow-out.svg" alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 faq-inner-col">
                            {/* Internet Speed Box  */}
                            <div className="faq-box-wrapper mb-4">
                              <div className="faq-box-header inner-faq-box">
                                <div className="heading mb-4">Internet Speed</div>
                                <div className="sub-heading">Here name relatable topics of below questions</div>
                              </div>
                              <div className="faq-innerBox-content">Yet to receive the content? <span><img src="./images/accordion-arrow-down.svg" alt="" /></span></div>
                              <div className="faq-innerBox-content">Yet to receive the content? <span><img src="./images/accordion-arrow-down.svg" alt="" /></span></div>
                              <div className="faq-innerBox-content">
                                <div className="view-detail-btn d-flex align-items-center gap-2">
                                  View Details
                                  <img src="./images/arrow-out.svg" alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 faq-inner-col">
                            {/* 1 Gbps Connection Box  */}
                            <div className="faq-box-wrapper mb-4">
                              <div className="faq-box-header inner-faq-box">
                                <div className="heading mb-4">1 Gbps Connection</div>
                                <div className="sub-heading">Here name relatable topics of below questions</div>
                              </div>
                              <div className="faq-innerBox-content">Yet to receive the content? <span><img src="./images/accordion-arrow-down.svg" alt="" /></span></div>
                              <div className="faq-innerBox-content">Yet to receive the content? <span><img src="./images/accordion-arrow-down.svg" alt="" /></span></div>
                              <div className="faq-innerBox-content">
                                <div className="view-detail-btn d-flex align-items-center gap-2">
                                  View Details
                                  <img src="./images/arrow-out.svg" alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 faq-inner-col">
                            {/* Technical Box  */}
                            <div className="faq-box-wrapper mb-4">
                              <div className="faq-box-header inner-faq-box">
                                <div className="heading mb-4">Technical</div>
                                <div className="sub-heading">Here name relatable topics of below questions</div>
                              </div>
                              <div className="faq-innerBox-content">Yet to receive the content? <span><img src="./images/accordion-arrow-down.svg" alt="" /></span></div>
                              <div className="faq-innerBox-content">Yet to receive the content? <span><img src="./images/accordion-arrow-down.svg" alt="" /></span></div>
                              <div className="faq-innerBox-content">
                                <div className="view-detail-btn d-flex align-items-center gap-2">
                                  View Details
                                  <img src="./images/arrow-out.svg" alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12 faq-inner-col">
                            {/* Connection Box  */}
                            <div className="faq-box-wrapper mb-4">
                              <div className="faq-box-header inner-faq-box">
                                <div className="heading mb-4">Connection</div>
                                <div className="sub-heading">Here name relatable topics of below questions</div>
                              </div>
                              <div className="faq-innerBox-content">Yet to receive the content? <span><img src="./images/accordion-arrow-down.svg" alt="" /></span></div>
                              <div className="faq-innerBox-content">Yet to receive the content? <span><img src="./images/accordion-arrow-down.svg" alt="" /></span></div>
                              <div className="faq-innerBox-content">
                                <div className="view-detail-btn d-flex align-items-center gap-2">
                                  View Details
                                  <img src="./images/arrow-out.svg" alt="" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* FAQs footer content  */}
                      <div className="faq-main-wrapper pb-5">
                        <div className="faq-footer">
                          <div>Can’t find the answers you’re looking for? We’re here to help you.</div>
                          <div>Email us on: support@spectra.co</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ****************** CONTACT DETAILS TAB PANE ************* */}
                  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <div className="faq-tab-wrapper">
                      <div className="account-tab-heading mt-3 mb-4">Contact Details</div>
                      <div className="admin-panel-wrapper account-tab-container">
                        <div className="admin-panel-header">
                          <div className="heading account-detail-banner-heading">Details</div>
                        </div>
                        <div className="admin-panel-data contact-details-row">
                          <div className="dashboard-box-heading mt-2 mb-3">Account Manager Details</div>
                          <div className="row">
                            {/* Name  */}
                            <div className="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                              <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                <div className="info-icon"><img src="./images/icon-admin-role.svg" alt="" /></div>
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">Name</div>
                                  <div className="info-content">Gaurav Gandhi</div>
                                </div>
                              </div>
                            </div>
                            {/* Phone no  */}
                            <div className="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                              <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                <div className="info-icon"><img src="./images/icon-admin-phone.svg" alt="" /></div>
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">Mobile Number</div>
                                  <div className="info-content">+91 7657384964</div>
                                </div>
                              </div>
                            </div>
                            {/* Mail  */}
                            <div className="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                              <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                <div className="info-icon"><img src="./images/icon-admin-mail.svg" alt="" /></div>
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">Email ID</div>
                                  <div className="info-content">yourname@email.com</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="admin-panel-data contact-details-row">
                          <div className="dashboard-box-heading mt-2 mb-3">Service Manager Details</div>
                          <div className="row">
                            {/* Name  */}
                            <div className="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                              <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                <div className="info-icon"><img src="./images/icon-admin-role.svg" alt="" /></div>
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">Name</div>
                                  <div className="info-content">Gaurav Gandhi</div>
                                </div>
                              </div>
                            </div>
                            {/* Phone no  */}
                            <div className="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                              <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                <div className="info-icon"><img src="./images/icon-admin-phone.svg" alt="" /></div>
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">Mobile Number</div>
                                  <div className="info-content">+91 7657384964</div>
                                </div>
                              </div>
                            </div>
                            {/* Mail  */}
                            <div className="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                              <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                <div className="info-icon"><img src="./images/icon-admin-mail.svg" alt="" /></div>
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">Email ID</div>
                                  <div className="info-content">yourname@email.com</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="admin-panel-data contact-details-lastRow">
                          <div className="dashboard-box-heading mt-2 mb-3">Customer Care</div>
                          <div className="row">
                            {/* Phone no  */}
                            <div className="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                              <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                <div className="info-icon"><img src="./images/icon-admin-phone.svg" alt="" /></div>
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">Mobile Number</div>
                                  <div className="info-content">+91 7657384964</div>
                                </div>
                              </div>
                            </div>
                            {/* Mail  */}
                            <div className="col-xl-4 col-lg-4 col-sm-6 account-detail-card py-2">
                              <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                <div className="info-icon"><img src="./images/icon-admin-mail.svg" alt="" /></div>
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">Email ID</div>
                                  <div className="info-content">yourname@email.com</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                   {/* FOOTER START  */}
         <Footer/>

                </div>
              </div>
            </div>
          </div></div></section>

    )
}