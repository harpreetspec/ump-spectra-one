import React, { useState,useEffect, useRef } from 'react';
import '../../assets/css/dashboard.css';
import adminbackarrow from "../../assets/images/admin-back-arrow.svg";
import iconadminlocation from "../../assets/images/icon-admin-location.svg";
import iconadmincompany from "../../assets/images/icon-admin-company.svg";
import iconadminusername from "../../assets/images/icon-admin-username.svg";
import iconadminphone from "../../assets/images/icon-admin-phone.svg";
import iconadminmail from "../../assets/images/icon-admin-mail.svg";
import iconadminpassword from "../../assets/images/icon-admin-password.svg";
import iconadminuser from "../../assets/images/icon-admin-user.svg";
import iconadminrole from "../../assets/images/icon-admin-role.svg";



export default function ViewUserDetails({goBackToUserManagement}){
    return(
        <div id="admin-detail" >
                <div className="account-tab-heading">Company Admin</div>
                <div className="admin-panel-wrapper account-tab-container">
                  <div className="admin-panel-header">
                    <div className="heading">
                      Gaurav Gandhi{" "}
                      <span
                        className="status-active-btn"
                        style={{ marginLeft: 4 }}
                      >
                        Active
                      </span>
                    </div>
                  </div>
                  <div className="admin-panel-data">
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-12 admin-panel-col mb-5">
                        <div className="admin-panel-box d-flex align-items-start">
                          <div className="admin-panel-icon">
                            <img src={iconadminrole} alt="" />
                          </div>
                          <div className="px-3 pt-1">
                            <div className="admin-panel-dataType">Role</div>
                            <div className="admin-panel-dataValu">
                              Company Admin
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-12 admin-panel-col mb-5">
                        <div className="admin-panel-box d-flex align-items-start">
                          <div className="admin-panel-icon">
                            <img src={iconadminuser} alt="" />
                          </div>
                          <div className="px-3 pt-1">
                            <div className="admin-panel-dataType">
                              Admin Name
                            </div>
                            <div className="admin-panel-dataValu">
                              Gaurav Gandhi
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-12 admin-panel-col mb-5">
                        <div className="admin-panel-box d-flex align-items-start">
                          <div className="admin-panel-icon">
                            <img
                              src={iconadminpassword}
                              alt=""
                            />
                          </div>
                          <div className="px-3 pt-1">
                            <div className="admin-panel-dataType">Password</div>
                            <div className="admin-panel-dataValu">
                              *********
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-12 admin-panel-col mb-5">
                        <div className="admin-panel-box d-flex align-items-start">
                          <div className="admin-panel-icon">
                            <img src={iconadminmail} alt="" />
                          </div>
                          <div className="px-3 pt-1">
                            <div className="admin-panel-dataType">Email ID</div>
                            <div className="admin-panel-dataValu">
                              gaurav.gandhi@gmail.com
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-12 admin-panel-col mb-5">
                        <div className="admin-panel-box d-flex align-items-start">
                          <div className="admin-panel-icon">
                            <img src={iconadminphone} alt="" />
                          </div>
                          <div className="px-3 pt-1">
                            <div className="admin-panel-dataType">
                              Mobile Number
                            </div>
                            <div className="admin-panel-dataValu">
                              +91 7657384964
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-12 admin-panel-col mb-5">
                        <div className="admin-panel-box d-flex align-items-start">
                          <div className="admin-panel-icon">
                            <img
                              src={iconadminusername}
                              alt=""
                            />
                          </div>
                          <div className="px-3 pt-1">
                            <div className="admin-panel-dataType">
                              User Name
                            </div>
                            <div className="admin-panel-dataValu">
                              gaurav.g{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-12 admin-panel-col mb-5">
                        <div className="admin-panel-box d-flex align-items-start">
                          <div className="admin-panel-icon">
                            <img src={iconadmincompany} alt="" />
                          </div>
                          <div className="px-3 pt-1">
                            <div className="admin-panel-dataType">
                              Company Name
                            </div>
                            <div className="admin-panel-dataValu">
                              Milk Basket India Pvt. Lmt.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-12 admin-panel-col mb-5">
                        <div className="admin-panel-box d-flex align-items-start">
                          <div className="admin-panel-icon">
                            <img
                              src={iconadminlocation}
                              alt=""
                            />
                          </div>
                          <div className="px-3 pt-1">
                            <div className="admin-panel-dataType">City</div>
                            <div className="admin-panel-dataValu">All</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-12 admin-panel-col mb-5">
                        <div className="admin-panel-box d-flex align-items-start">
                          <div className="admin-panel-icon">
                            <img
                              src={iconadminlocation}
                              alt=""
                            />
                          </div>
                          <div className="px-3 pt-1">
                            <div className="admin-panel-dataType">Location</div>
                            <div className="admin-panel-dataValu">All</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr style={{ border: "1px solid #EEEEEE" }} />
                    {/* <hr style="border: 1px solid grey;"> */}
                    <div className="d-flex align-items-center justify-content-between flex-wrap pt-3">
                      <div
                        className="admin-back-btn d-flex align-items-center justify-content-center gap-2"
                        onClick={goBackToUserManagement}
                      >
                        <img src={adminbackarrow} alt="" />
                        Back
                      </div>
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div className="admin-download-btn">Download</div>
                        <div className="admin-download-btn admin-share-btn">
                          Share
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    )
}