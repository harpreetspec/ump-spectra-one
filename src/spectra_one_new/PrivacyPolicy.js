import React, { useState, useEffect, useRef } from 'react';
import SideBar from './Sidebar';
import Footer from './Footer';
import Header from './Header';


export default function PrivacyPolicy() {
  return (
    <>

      <section class="section-dashboard">
        <div class="">
          <div class="d-flex justify-content-end">
            {/* <!-- SIDE NAVBAR  --> */}
            <SideBar />

            {/* <!-- top header --> */}
            <Header />

            {/* <!-- Privacy Policy  --> */}
            <div class="dashboard-main dashboard-main-privacyPolicy">
              <div class="dashboard-content">

                {/* <!-- privacy banner section  --> */}
                <div class="privacy-policy-banner-wrapper d-flex flex-column align-items-center justify-content-center">
                  <div class="privacy-banner-heading mb-1">Privacy Policy</div>
                  <div class="privacy-banner-content">
                    {/* Your privacy is our top priority; by accessing or using the site,
                    you agree to the terms of this Privacy Policy. */}
                  </div>
                </div>

                <div class="privacy-container d-flex align-items-center justify-content-center">
                  <div class="privacy-inner-container">
                    <div class="privacy-card">
                      <div class="privacy-title"></div>
                      <div class="privacy-content">
                      
                     <ul style={{ fontSize: '17px' }}> Shyam Spectra Private Limited ( hereinafter referred to as “Company/we/us/our” ), which also includes its affiliates, associates and partners)  is the author and publisher of the internet resource spectra.co “Portal” including website, sub-domains, and microsites) as well as the software and applications or other platforms provided by us, including but not limited to the mobile application ‘SpectraOne’ (together with the Portal, referred to as the “Services”).</ul>

<ul style={{ fontSize: '17px' }}>This privacy policy ("Privacy Policy") explains how we collect, use, share, disclose and protect the Personal information of the Users, including the Users  (referred to as “you”, “your” or “Users” in this Privacy Policy. </ul>

<ul style={{ fontSize: '17px' }}>We created this Privacy Policy to demonstrate our commitment to the protection of your privacy and your personal information. Your use of and access to the Services is subject to this Privacy Policy and our Terms of Use. Any term used but not defined in this Privacy Policy shall have the meaning attributed to it in our Terms of Use.</ul>

<ul style={{ fontSize: '17px' }}>If you do not consent to our usage of your personal information, please refrain from using the services. Please take note that you are well within your rights to not provide us with certain information, withdraw your consent for collection/use of your personal information, or request for temporary suspension or permanent deletion of certain information though we hereby advise you that this may cause you to not be able to avail full access/use of the services and will also mean that we may exercise our right to refrain from providing our services to you. We will not be liable/responsible for any breach of privacy owing to User’s negligence.  </ul>

<ul style={{ fontSize: '17px' }}>By using the services or by otherwise providing us with your information, you will be deemed to have read, understood, and agreed to the practices and policies outlined in this Privacy Policy and agree to be bound by the Privacy Policy. You hereby consent to our use, sharing, and disclosure of your information as described in this Privacy Policy concerning Your uses of any of our products and/or services. If You use the services on behalf of someone else or an entity (such as your employer), you represent that you are authorized by such individual or entity to (i) accept this Privacy Policy on such individual’s or entity’s behalf, and (ii) consent on behalf of such individual or entity to our collection, use and disclosure of such individual’s or entity’s information as described in this Privacy Policy.</ul>

                      </div>
                    </div>
                    {/* <div class="privacy-card">
                      <div class="privacy-title">What does this Privacy Policy Cover?</div>
                      <div class="privacy-content">
                        This privacy policy ("Privacy Policy") explains how we collect, use, share, disclose and protect Personal information of the Users , including the Users (as defined in the Terms of Use, which may be accessed via the following weblink https://one.spectra.co (the “Terms of Use”)), the Users (as defined in the Terms of Use),referred to as “you” or “Users” in this Privacy Policy).
                      </div>
                    </div>
                    <div class="privacy-card">
                      <div class="privacy-title">Introduction</div>
                      <div class="privacy-content">
                      This privacy policy ("Privacy Policy") explains how we collect, use, share, disclose and protect Personal information of  the Users, including the Users (as defined in the Terms of Use, which may be accessed via the following weblink https://one.spectra.co (the “Terms of Use”), the Users (as defined in the Terms of Use), referred to as “you” or “Users” in this Privacy Policy).  

We created this Privacy Policy to demonstrate our commitment to the protection of your privacy and your personal information. Your use of and access to the Services is subject to this Privacy Policy and our Terms of Use. Any term used but not defined in this Privacy Policy shall have the meaning attributed to it in our Terms of Use. 

If you do not consent to our usage of your personnel information, please refrain from using the services. Please take note that you are well within your rights to not to provide us certain information, withdraw your consent for collection/use of your personal information or alternatively request for temporary suspension or permanent deletion of certain information though we hereby advise you that this may cause you to not avail full access/use of the services and will also mean that we may exercise our right to refrain from providing our services to you. We will not be liable / responsible for any breach of privacy owing to User’s negligence.   

By using the services or by otherwise providing us with your information, you will be deemed to have read, understood and agreed to the practices and policies outlined in this Privacy Policy and agree to be bound by the Privacy Policy. You hereby consent to our use and sharing, disclosure of your information as described in this Privacy Policy with respect to Your uses of any of our products and/or services. . If You use the services on behalf of someone else or an entity (such as your employer), you represent that you are authorised by such individual or entity to (i) accept this Privacy Policy on such individual’s or entity’s behalf, and (ii) consent on behalf of such individual or entity to our collection, use and disclosure of such individual’s or entity’s information as described in this Privacy Policy. 
                      </div>
                    </div> */}
                    <div class="privacy-card">
                      <div class="privacy-title" style={{ fontSize: '20px',paddingLeft: '26px', textDecoration: 'underline' }}>Collection of Personal Information and Use </div>
                      <div class="privacy-content">
                     <h5 style={{ fontSize: '18px',paddingLeft: '26px' }}>Personal Information: </h5>  
                    <ul style={{ fontSize: '17px' }}>The personal information we collect includes but is not limited to information such as your name, father’s name, mother’s name, spouse’s name, age, date of birth, mailing address, billing address, telephone numbers, email addresses, PAN Card details and other information such as Office address, Installation address. Our servers may collect your Internet Protocol address (IP address, your computer's operating system, name of the domain you used to access the Internet, the website you came from and the website you visit next, Financial information (such as credit card or bank account numbers) in connection with a transaction, which we do not collect or store at our Website as we are using a payment gateway service provider.</ul>  
                    <ul style={{ fontSize: '17px'}}>We also use Information given by You for using Our Services by signing Consumer Acquisition Form (CAF) and Know-Your-Costumer Documents (KYC) provided by You. In addition to Your information provided in CAF and KYC documents, we may also collect certain information automatically through software/other means. For example, we may collect:</ul>  <br></br>
                      <h5 style={{ fontSize: '18px',paddingLeft: '26px' }}>Device information : </h5><ul style={{ fontSize: '17px',paddingLeft: '26px' }}> such as Your hardware model, IMEI number and other unique device identifiers, MAC address, IP address, operating system version, and settings of the device You use to access the Services.</ul> 
          

            <h5 style={{ fontSize: '18px',paddingLeft: '26px' }}>Login information  :</h5>
            <ul style={{ fontSize: '17px',paddingLeft: '26px' }}> such as the time and duration of Your use of our Product, search query terms You enter through the Product, and any other information. </ul><br></br>

            <h5 style={{ fontSize: '18px',paddingLeft: '26px' }}>Location information  :</h5>
            <ul style={{ fontSize: '17px',paddingLeft: '26px' }}> such as Your device’s GPS signal or information about nearby Wi-Fi access points and cell towers that may be transmitted to us when You use certain Services.
            </ul> <br></br>

            <h5 style={{ fontSize: '18px',paddingLeft: '26px' }}>Other information  :</h5>
            <ul  style={{ fontSize: '17px',paddingLeft: '26px' }}>
            about Your use of the Services, such as the app You use, the website You visit, and how You interact with content offered through a Service.</ul> 

            <ul style={{ fontSize: '17px',paddingLeft: '26px' }} > You are hereby informed, we never collect Sensitive Personal Information (“SPI”) [as defined under the provisions of Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011]. Please take note that we will not use your SPI or disclose such SPI to any third party except for any financial information that you choose to provide while making payment for any Services on the Portal or as written under this policy. We hereby clarify that we do not collect your  banking or credit card details in any manner whatsoever and we do not take any responsibility for the data shared by you with the Payment Service Provider;</ul>  
            <ul style={{ fontSize: '17px',paddingLeft: '26px' }}>We will collect and store each User’s personal information to provide you with relevant information at the time of the next visit and facilitate you in keeping track of Services availed by you.</ul>
<br></br>
 <br></br><h5 style={{ fontSize: '19px',paddingLeft: '26px', textDecoration: 'underline' }}>Use of Personal Information  :</h5> <br></br>
<ul>
        <li style={{ fontSize: '17px' }}>We may use the information submitted by you to send your promotional messages or emails or notifications for administrative purposes. You can also manage your communication preferences and opt out of promotional emails.</li>
</ul>


<ul>
  <li style={{ fontSize: '17px' }}>	We use the referral information shared by you to contact the referred persons and you will be eligible for referral awards in accordance with our referral programs, if any;</li>
</ul>

<ul>
  <li style={{ fontSize: '17px' }}>We may use software or other programs to track Portal usage, and community member’s behaviour and gather statistics for our business purposes;  </li>
</ul>
<ul>
  <li style={{ fontSize: '17px' }}>We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction. You understand that data shared with us is subject to security risks despite our best efforts to safeguard the data; </li>
</ul>
<ul>
  <li style={{ fontSize: '17px' }}> 	Your SpectraOne Account is secured by your login id & password, and we advise you to keep them secure. It is your responsibility to protect your login information and in case you fail to do so, you are liable for the consequences of your action. We advise you to refrain from disclosing your login details to anyone. You are requested to contact us immediately if you have reason to suspect any breach of security including compromise of your login information; </li>
</ul>
<ul>
  <li style={{ fontSize: '17px' }}>Our Site including Applications may contain links to third party websites. Such third party websites are governed by their own terms of use and privacy policy. We advise you to read the Terms of Use or Privacy Policy of such Websites before accessing their services or submitting your personal details.   </li>
</ul>
<ul>
  <li style={{ fontSize: '17px' }}>We have a policy of not sharing Your Personal Information with any third parties except our affiliates, advertisers and partners. We reserve the right to use your information and display the name, user id and state from where you are participating while disclosing/advertising the result of any content on our Portal; </li>
</ul>

<ul>
  <li style={{ fontSize: '17px' }}>We may use your personal information for legal or administrative authority to meet our legal obligations or for data analysis, and government requests or to enforce terms of service.  </li>
</ul>

<ul>
  <li style={{ fontSize: '17px' }}>We may keep records of electronic communications and telephone calls received and made for making appointments or other purposes for the purpose of administration of Services, customer support, research and development.  This analysis helps us improve our services and tailor them to user needs.  </li>
</ul>

<ul>
  <li style={{ fontSize: '17px' }}>You represent to us that you are above the age of 18 and are in a contracting capacity to access our platform and share your personal information with us. Any misrepresentation to that effect, shall authorize us to take relevant steps to stop provision of the Services and any other actions in accordance with the law. You shall always be liable for any consequences due to misrepresentation and shall indemnify the Company, its Directors accordingly.  </li>
</ul>

<ul>
  <li style={{ fontSize: '17px' }}>Please note, if you don’t choose to provide us with the requested data, we will be unable to offer you our products or services.  </li>
</ul>


<br></br>
 <br></br><h5 style={{ fontSize: '19px',paddingLeft: '26px' , textDecoration: 'underline'}}>Treatment of Personal Information: </h5><br></br>

 <ul>
  <li style={{ fontSize: '17px' }}>We respect your confidentiality and keep all the Personal Information secure and we wish to assure you that we will not share, distribute, trade, sell or rent your Personal Information to any third party without your consent; </li>
</ul>
<ul>
  <li style={{ fontSize: '17px' }}>Our use of your personal information will be restricted for the purposes enumerated in this Privacy Policy read with Terms of Use;  </li>
</ul>
<ul>
  <li style={{ fontSize: '17px' }}>We use cookies and when you visit our Site, cookies may be left in your computer to enable us to track your usage and customize the content displayed to you to suit your behavior;  </li>
</ul>
<ul>
  <li style={{ fontSize: '17px' }}>We also use cookies for authentication, Portal management and security purposes;  </li>
</ul>
<ul>
  <li style={{ fontSize: '17px' }}>We have a detailed Cookie Policy which is displayed at <a href="https://home.spectra.co/cookie-policy" target="_blank" rel="noopener noreferrer">https://home.spectra.co/cookie-policy </a>. </li>
</ul>
<ul>
  <li style={{ fontSize: '17px' }}>We use appropriate security measures to safeguard your information and to protect against unauthorized access to and unlawful interception of Personal Information. However, no internet site can fully eliminate security risks;  </li>
</ul>
<ul>
  <li style={{ fontSize: '17px' }}>We do not make your e-mail addresses available to any third party. We do not trade or sell your Personal Information in any manner, except as enumerated herein; and  </li>
</ul>
<ul>
  <li style={{ fontSize: '17px' }}>We may disclose aggregated information about the use of the Site, but it will never contain Personal Information. We do not disclose Personal Information to third parties in the normal course of operations, except in situations where we are legally obligated to disclose information to the government or other third parties,</li>
</ul>




                      </div>
                    </div>
                    <div class="privacy-card">
                      <div class="privacy-title" style={{ fontSize: '20px',paddingLeft: '26px', textDecoration: 'underline' }} >PROHIBITED ACTIONS </div>
                      <div class="privacy-content" style={{ fontSize: '17px',paddingLeft: '26px' }}>
                      While visiting or using our application or digital platform, you agree not to, by any means (including hacking, cracking or defacing any portion of the website/applications/portals/platforms) indulge in illegal or unauthorized activities including the following:  

                      <div></div><br></br>
                      <ol type="i" style={{ fontSize: '19px',paddingLeft: '26px' }}>
        <li style={{ fontSize: '17px'  }}>Restrict or inhibit any authorized user from using an application or digital platform.</li><br></br>
        <li style={{ fontSize: '17px'  }}>Use the application or digital platform for unlawful purposes.</li><br></br>
        <li style={{ fontSize: '17px'  }}>Harvest or collect information about an application or digital platform’s users without their express consent.</li><br></br>
        <li style={{ fontSize: '17px'  }}>"Frame" or "mirror" any part of the application or digital platform without our prior authorization.</li><br></br>
        <li style={{ fontSize: '17px'  }}>Engage in spamming or flooding.</li><br></br>
        <li style={{ fontSize: '17px'  }}>Transmit any software or other materials that contain any virus, or other harmful or disruptive component.</li><br></br>
        <li style={{ fontSize: '17px'  }}>Use any device, application, or process to retrieve, index, "data mine" or in any way reproduce or circumvent the navigational structure or presentation of the application or digital platform.</li><br></br>
        <li style={{ fontSize: '17px'  }}>Permit or help anyone without access to the application or digital platform to use the application or digital platform through your username and password or otherwise.</li><br></br>
    </ol>

    <ul style={{ fontSize: '17px',paddingLeft: '26px'  }} > You shall always be liable for any consequences due to illegal or unauthorized activities and shall indemnify the Company, its Directors accordingly.</ul>

 <br></br> <br></br><h5 style={{ fontSize: '19px' ,paddingLeft: '26px', textDecoration: 'underline'}}>Corporate Restructuring</h5><br></br>
 <ul style={{ fontSize: '17px',paddingLeft: '26px'  }}>On happening of any merger, demerger or other forms of Corporate Restructuring, as the case may be, we may have to share your personal information with our potential business partner or Investor or Acquirer or Acquiree to continue to provide the services.</ul>
 <br></br>
<h5 style={{ fontSize: '19px', paddingLeft: '26px'}}>Consent</h5>
<br></br>


 <ul >
  <li style={{ fontSize: '17px'}}>
  You have expressly consented to use of your personal information by us including our associates and partners in the manner detailed herein by your action by registering or using our Portal, which you are advised to do after reading and consenting to agree with the terms only;  
  </li>
 </ul>
 <ul>
  <li style={{ fontSize: '17px'}}>
  We use third party payment gateways for monetary transactions and they may collect certain details for processing your financial transactions to identification and verification purpose. We hereby clarify that we do not collect your banking or credit card details in any manner whatsoever and we do not take any responsibility for the data shared by you with the Payment Service Provider; 
  </li>
 </ul>
 <ul>
  <li style={{ fontSize: '17px'}}>
  You hereby consent to use of your contact details for reaching out to you you for business/promotional purpose by us or our affiliates; 
  </li>
 </ul>
 <ul>
  <li style={{ fontSize: '17px'}}>
  When you sign up with us for an online account, register to receive marketing communications from us, fill in one of our forms (whether online or offline) or otherwise expressly provide us with your personal data, we may collect and store any personal data that you provide to us and may use it to personalize and improve your experience on our digital platforms, provide products and services you request from us, and carry out profiling and market research. 
  </li>
 </ul>
 <ul>
  <li style={{ fontSize: '17px'}}>
  You hereby consent  to  security checks for verification and Identification purposes whether by us or through third party service providers.  
  </li>
 </ul>
 
                      </div>
                    </div>
                    <div class="privacy-card">
                      <div class="privacy-title" style={{ fontSize: '20px',paddingLeft: '26px', textDecoration: 'underline' }}>Data Security and Confidentiality  </div>
                      <div class="privacy-content" style={{ fontSize: '17px',paddingLeft: '26px' }}>
  <ul >
  <li >
  We use adequate security measures including SSL certification for protection of your data and maintaining its confidentiality.  
  </li>
 </ul>
 <ul>
  <li >
  We comply with ISO 27001 standards to keep your data safe and secure. 
  </li>
 </ul>
 <ul>
  <li >
  We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of data transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security. 
  </li>
 </ul>
                      </div>
                    </div>
                    <div class="privacy-card">
                      <div class="privacy-title" style={{ fontSize: '20px',paddingLeft: '26px', textDecoration: 'underline' }}>Changes to Policy </div>
                      <div class="privacy-content" style={{ fontSize: '17px',paddingLeft: '26px'}}>
                      
                        <ul >
                          <li >	We reserve the right to change, modify, add or delete portions of the terms of this privacy policy, at our sole discretion from time to time. We encourage you to review the Privacy Policy periodically for any changes and Your continued use of the App after changes indicate your acceptance of the updated Privacy Policy.  </li>
                          <br></br>
                          <li>	We will notify about changes either through a notice/banner displayed on our Portal or by sending you an email about the new policy. You have the right to refuse to continue with us if you do not like any of the changes. </li>
                         
                        </ul>
                     
                      </div>
                    </div>
                    <div class="privacy-card">
                      <div class="privacy-title"  style={{ fontSize: '20px',paddingLeft: '26px', textDecoration: 'underline' }}>Applicable Law and Jurisdiction: </div>
                      <div class="privacy-content" style={{ fontSize: '17px',paddingLeft: '26px'}}>
                      <ul><li>	You hereby give your consent for applicability of the jurisdiction of Indian Laws applicable to the state of New Delhi and jurisdiction of New Delhi Courts. </li>
                      <br></br>
                        <li>	All disputes/issues relating to this policy shall be resolved in accordance with our Terms of Use. </li>
                        </ul>
                      </div>
                    </div>
                    <div class="privacy-card">
                      <div class="privacy-title"  style={{ fontSize: '20px',paddingLeft: '26px' , textDecoration: 'underline'}}>Grievance Officer and its Contact: </div>
                      <div class="privacy-content"  style={{ fontSize: '17px',paddingLeft: '26px' }} >
                      <ul><li>	We have appointed a grievance officer to look after your queries and grievances if any, who can be reached <a href="mailto:appeal@spectra.co">appeal@spectra.co</a>. </li>
                        <li>	We are committed to safeguarding your personal information collected and handled by us and look forward to your continued support for the same. In case of any feedback or concern regarding protection of your personal information, you can contact us at <a href="mailto:support@spectra.co">support@spectra.co</a>  </li>
                        <li>	We will do our best to respond promptly and in any event within one month of the following:
                        <ul>
    <li>Receipt of your request;</li>
    <li>You can also ask for temporary suspension of your account.</li>
    <li>We will act on your request and will do the needful after verifying that such request was made by you only and not by any unauthorized person.</li>
</ul>

Further to assist us in dealing with your request, please provide your full name, address, email address, mobile no. and some document for identification. <br></br><br></br>

<ul class = "privacy-title" style={{ fontSize: '18px',paddingLeft: '1px' }}>Registered office address : <ul style={{fontSize: '18px',paddingLeft: '1px'}} >A-60, Naraina Industrial Area,<br></br>Phase-1, New Delhi -110028</ul>
 </ul>


                          
                           </li>
                        </ul>
                      </div>
                    </div>
                 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}