import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import "../assets/css/dashboard.css"

export default function Footer(){
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/privacyPolicy')
  }
  const handleRedirect2 = () => {
    navigate('/termsandcondition')
  }
    return(
        <>
         <footer>
              <div class="dashboard-copyright">Copyrights © {new Date().getFullYear()} Shyam Spectra Pvt. Ltd.</div>
              <div class="footer-links">
                <div class="footer-link" onClick={handleRedirect2}>Terms & Conditions</div>
                <div class="footer-link footer-link2" onClick={handleRedirect}>Privacy Policy</div>
                {/* <div class="footer-link">Contact us</div> */}
              </div>
            </footer>
        </>
    )
}