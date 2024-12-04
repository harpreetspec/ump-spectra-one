import React, { Component, useState } from 'react';
import Header from './Header';
import SideBar from './Sidebar';


export default function TermsandCondition() {
  return (
    <>
      <section class="section-dashboard">
        <div class="">
          <div class="d-flex justify-content-end">
            {/* <!-- SIDE NAVBAR  --> */}
            <SideBar />

            {/* <!-- top header --> */}
            <Header />

            {/* <!-- Terms & Condition  --> */}
            <div class="dashboard-main dashboard-main-privacyPolicy">
              <div class="dashboard-content">

                {/* <!-- Terms banner section  --> */}
                <div class="privacy-banner-wrapper terms-banner-wrapper d-flex flex-column align-items-center justify-content-center">
                  <div class="privacy-banner-heading mb-1">Terms and Condition</div>
                  <br></br>
                  <div style={{ textAlign: 'center', fontSize: 'smaller' }}>
                    YOU MUST READ THE FOLLOWING TERMS OF USE, WHICH CONTAINS THE TERMS FOR USING THE APPLICATION INCLUDING WEBSITE AND YOUR CONTINUED BROWSING OR USE OF THE WEBSITE SHALL MEAN THAT YOU HAVE AGREED TO ABIDE BY THIS TERMS OF USE
                  </div>


                </div>

                <div class="privacy-container d-flex align-items-center justify-content-center">
                  <div class="privacy-inner-container">
                    {/* part 1 */}
                    <div class="privacy-card">
                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span>	INTRODUCTION:</div>
                      <div class="privacy-content">
                        <div class="my-3" style={{ fontSize: '16px' }}>
                          Welcome to Spectra, a brand by SHYAM SPECTRA PRIVATE LIMITED), a company registered in India under the provisions of Companies Act, 1956. Spectra is the flagship brand of M/s SHYAM SPECTRA PRIVATE LIMITED under which we operate a platform under the name and style of Spectra, which contains the website and its sub-pages, mobile/other applications as well as our partner websites/mobile applications (hereinafter referred to as “Portal” or “Platform”) through which we run and manage a community of users who are using Our services. The term “Spectra” shall mean and include individual/collective reference to one/all offerings on our Portal.

                        </div>

                        <div class="my-3" style={{ fontSize: '16px' }}>
                          This Terms of Use (“Agreement” or “TOU”) lays down the terms and conditions for use/access of our Portal and anyone who accesses our Portal has implied consent by continued use/access of our Portal. It forms a binding agreement between you and our Company M/s. SHYAM SPECTRA PRIVATE LIMITED”). By using Our Portal i. e. mobile application, website or any of our Services, you are agreeing to these terms, as well as our Privacy Policy (published under Spectra Portal) incorporated hereby for your reference, and all of these terms will govern your use of our Portal i. e. mobile application, site and our Services. If you do not agree to these terms, you must cease use of the mobile application, site and our Services. The term “you” refers to the person accessing or using the mobile application, site or our Services, or the company or organization on whose behalf that person accesses the mobile application, site or our Services.
                        </div>

                        <div class="my-3" style={{ fontSize: '16px' }}>
                          <strong>Applicability of TOU :</strong>  TOU constitutes a legal agreement between the licensee (YOU or YOUR) and Spectra. For all practical reasons in this TOU, the term “Product” will refer to Spectra Product and/or Service offered through the Portal or otherwise including but not limited to Mobile/Other Applications.

                          Please read this TOU carefully before using our Product as it contains important information and constitutes a binding legal agreement between you and Spectra. Your use of Product is also subject to our privacy policy as documented in this TOU.

                          By downloading or using our Product/Services, you agree to comply with the TOU. If you do not agree, you may not download or use the Portal. Spectra may modify this TOU from time to time with or without any prior notice to you. We recommend that you keep checking the Terms of Use from time to time to keep yourself abreast of changes in the Terms of use, if any. If you continue to access or use Product after such modification, you will be deemed to have read, understood, and unconditionally agreed to the modification.
                        </div>




                      </div>
                    </div>


                    {/* Part 2 */}
                    <div class="privacy-card">
                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span> DEFINITIONS:</div>
                      <div class="privacy-content">
                        <div class="my-3">
                          <div>

                            <ul style={{ listStyleType: 'none', padding: 0,paddingLeft: '26px' }}>
                              <li style={{ fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ fontWeight: 'bold', paddingLeft: '10px',position: 'absolute', left: 0 }}>
                                  a.
                                </span>
                                Affiliates shall mean and include our social media Pages/ Marketing Pages/ our Partners/ Affiliates/ Licensors/ Associates and peripherals along with their respective employees, and authorized agents who work with us at Spectra.
                              </li>
                              <li style={{ fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ fontWeight: 'bold', paddingLeft: '10px',position: 'absolute', left: 0 }}>
                                  b.
                                </span>

                                Applicable Law shall mean and include but not limited to the rules, regulations, guidelines and clarifications framed there under, including the (Indian) Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011 (the “SPI Rules”), and the (Indian) Information Technology (Intermediaries Guidelines) Rules, 2011 (the “IG Rules”), the Indian Contract Act, 1872 & the (Indian) Information Technology Act, 2000 and other relevant Laws of India.
                              </li>
                              <li style={{ fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ fontWeight: 'bold', paddingLeft: '10px',position: 'absolute', left: 0 }}>
                                  c.
                                </span>Business Area/Territory shall mean all the areas where we provide our services i.e., in INDIA
                              </li>
                              <li style={{ fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ fontWeight: 'bold', paddingLeft: '10px',position: 'absolute', left: 0 }}>
                                  d.
                                </span>Company/Us/We/Our shall mean Shyam Spectra Private Limited (along with social media Pages/ Marketing Pages/ Partners/ Legal Team and peripherals along with its employees and authorized agents. Anyone who wishes to enjoy/access/use/participate in any of the services to use the Portal according to these Terms and Conditions and who registers with us will be referred to in these Terms and Conditions.
                              </li>
                              <li style={{ fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ fontWeight: 'bold', paddingLeft: '10px',position: 'absolute', left: 0 }}>
                                  e.
                                </span>
                                IPR shall mean and include Copyrights, Trademarks, Patents or any other rights of Company in the Product, its contents or Mobile/Other Applications.
                              </li>
                              <li style={{ fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ fontWeight: 'bold', paddingLeft: '10px',position: 'absolute', left: 0 }}>
                                  f.
                                </span>
                                The Portal or any part of it will include but not be limited to the Data/information of All the Users and Affiliates of the Portal.
                              </li>
                              <li style={{ fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ fontWeight: 'bold', paddingLeft: '10px',position: 'absolute', left: 0 }}>
                                  g.
                                </span>
                                Services shall mean all sorts of Services and their parts provided by us offered to the Users whether registered or not.
                              </li>
                              <li style={{ fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ fontWeight: 'bold', paddingLeft: '10px',position: 'absolute', left: 0 }}>
                                  h.
                                </span>
                                Spectra shall mean brand name of the Company.
                              </li>
                              <li style={{ fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ fontWeight: 'bold', paddingLeft: '10px',position: 'absolute', left: 0 }}>
                                  i.
                                </span>
                                Terms and Conditions”: The Terms of Conditions which are mentioned below.
                              </li>
                              <li style={{ fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ fontWeight: 'bold', paddingLeft: '10px',position: 'absolute', left: 0 }}>
                                  j.
                                </span>
                                Transmit” shall mean all forms of communication including but not limited to publishing/ posting/ SMS/ uploads/ e-mails/ distribute/ disseminate.
                              </li>
                              <li style={{ fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ fontWeight: 'bold', paddingLeft: '10px',position: 'absolute', left: 0 }}>
                                  k.
                                </span>
                                User Account shall mean a personal account of the user which is operated and managed by the user.
                              </li>
                              <li style={{ fontSize: '16px', paddingLeft: '30px', position: 'relative' }}>
                                <span style={{ fontWeight: 'bold', paddingLeft: '10px',position: 'absolute', left: 0 }}>
                                  l.
                                </span>
                                User/You shall mean and include Anyone who wishes to enjoy/ access/ use/ participate in any of the services to use the Portal according to these Terms and Conditions and who register with us will be referred to in these Terms and Conditions.
                              </li>
                            </ul>
                          </div>

                        </div>





                      </div>
                    </div>














                    {/* part 3 */}

                    <div class="privacy-card">
                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span>	USE OF THE PORTAL/ SERVICES:</div>
                      <div class="privacy-content">
                        <div class="my-3">
                          <div>

                            <ul>
                              <li style={{ fontSize: '16px' }}>
                                Any person who uses/accesses or downloads our Portal/Products is referred to as "User" or "you." Users can use/access our Portal subject to this TOU along with the Privacy/other Policy, can access our Services, after mandatory registration on the Portal, which may be followed by creating your profile on the portal itself and payment, if any.
                              </li>
                              <li style={{ fontSize: '16px' }}>
                                Usage/Access/Participation/Registration of Service or any part of it on the Portal by the User(s) shall be deemed to have read/understood/accepted/agreed to the TOU. Any promotions on the portal organized/conducted by Us shall be governed by independent/supplementary/additional Terms & Condition concerned with the respective service while being in sync with this TOU.
                              </li>
                              <li style={{ fontSize: '16px' }}>
                                Rights to alter/update/remove the Terms or any part of the TOU along with the independent/additional Terms & Condition are at all times reserved with Us. No prior notification of any such modification will be necessary unless it deems fit to us. All such modifications will become effective at the very instant it is Posted/Published on the Portal and will be deemed as read/accepted by the user at the same instant for future usage, post such instant. By using the Portal and the Service means and is interpreted as the user having visits/checked on the Terms regularly from time to time to be familiar with such terms, we do/will not hold any responsibility of consequences of any ignorance on the part of the User regarding the above-mentioned modifications or updates to the Portal. Still if at any time/situation it seems fit to us, we may provide notifications and choice of acceptance or non-acceptance of such modification prior to usage of the portal or any part of it through available media/contact detail.
                              </li>
                              <li style={{ fontSize: '16px' }}>
                                In the scenario where any part of the TOU is held/becomes unlawful/invalid/void/unenforceable by onset or implication of new laws or amendment of existing laws or for any reason by any judicial or quasi-judicial body in India, such effect will only adhere to that specific part of the TOU in these Terms independently, hence remaining part will not be affected, so the validity and enforceability of the remaining Terms stays intact.
                              </li>
                              <li style={{ fontSize: '16px' }}>
                                You understand/agree to the fact that any statistics generated prior to/during/as the conclusion of any service on/of the Portal are neither transferable between users nor can be extracted/used in any form outside the Portal and you are legally obliged to refrain from doing so.
                              </li>
                              <li style={{ fontSize: '16px' }}>
                                You hereby grant your consent for receiving communications such as announcements, administrative messages, and advertisements from Spectra or any of its partners, licensors, or associates.
                              </li>
                              <li style={{ fontSize: '16px' }}>
                                If We, in Our sole discretion, determine that any User is using the Portal or Service in a manner that is inconsistent with these Terms, we reserve the right to terminate the User's right to use the Portal, temporarily or permanently. Our decision on such matters will be final and binding on the User.
                              </li>
                            </ul>
                            <ul>
                              <li style={{ fontSize: '16px' }}>
                                We may at Our sole discretion:
                                <ul>
                                  <li style={{ fontSize: '15px' }}>Restrict, suspend, or terminate any User's access to all or any part of Portal;</li>
                                  <li style={{ fontSize: '15px' }}>Change, suspend, or discontinue all or any part of our services;</li>
                                  <li style={{ fontSize: '15px' }}>Reject, move, or remove any material that may be submitted by a User;</li>
                                  <li style={{ fontSize: '15px' }}>Move or remove any content that is available on Spectra Platform;</li>
                                  <li style={{ fontSize: '15px' }}>Deactivate or delete a User's account and all related information and files on the account;</li>
                                  <li style={{ fontSize: '15px' }}>Establish general practices and limits concerning the use of our Portal.</li>
                                </ul>
                              </li>
                            </ul>
                          </div>


                        </div>





                      </div>
                    </div>
                    {/* part 4 */}
                    <div class="privacy-card">
                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span>	CONDITION OF USE:</div>
                      <div class="privacy-content" style={{ fontSize: '16px' }}>
                        You must be 18 years of age or older to register, use the Services, or visit or use the Website in any manner. By registering, visiting and using the Website or accepting this TOU, you represent and warrant to Spectra that you are 18 years of age or older, and that you have the right, authority and capacity to use the Website and the Services available through the Website, and agree to and abide by this TOU.
                      </div>
                    </div>

                    {/* part 5 */}
                    <div class="privacy-card">
                      <div class="privacy-title"><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span> TERMS OF USE:</div>
                      <div class="privacy-content" style={{ fontSize: '17px', fontWeight: 500 }} >	USER ACCOUNT AND DATA PRIVACY</div>
                      <ul><li style={{ fontSize: '16px' }}>The information collected from you will be dealt in the manner enumerated in our Privacy Policy. Privacy Policy can be read at Spectra website.</li></ul>

                      <div class="privacy-content" style={{ fontSize: '17px', fontWeight: 500 }}> 	LISTING CONTENT AND DISSEMINATING INFORMATION</div>

                      <ul><li style={{ fontSize: '16px' }}>	The Services provided by Spectra or any of its licensors or service providers are provided on an "as is" and “as available’ basis, and without any warranties or conditions (express or implied, including the implied warranties of merchantability, accuracy, fitness for a particular purpose, title and non-infringement, arising by statute or otherwise in law or from a course of dealing or usage or trade). Spectra does not provide or make any representation, warranty or guarantee, express or implied about the Website or the Services. Spectra does not guarantee the accuracy or completeness of any content or information provided by Users on the Website. To the fullest extent permitted by law, Spectra disclaims all liability arising out of the User’s use or reliance upon the Website, the Services, representations and warranties made by other Users, the content or information provided by the Users on the Website, or any opinion or suggestion given or expressed by Spectra or any User in relation to any User or services provided by such User. </li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	The Website may be linked to the website of third parties, affiliates and business partners. Spectra has no control over, and is not liable or responsible for content, accuracy, validity, reliability, quality of such websites or made available by/through our Portal. Inclusion of any link on the Website does not imply that Spectra endorses the linked site. User may use the links and these services at User’s own risk. </li></ul>
                      <ul><li style={{ fontSize: '16px' }}>  Spectra assumes no responsibility, and shall not be liable for, any damages to, or viruses that may infect User’s equipment on account of User’s access to, use of, or browsing the Website or the downloading of any material, data, text, images, video content, or audio content from the Website. If a User is dissatisfied with the Website, User’s sole remedy is to discontinue using the Website. </li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	If Spectra determines that you have provided fraudulent, inaccurate, or incomplete information, including through feedback, Spectra reserves the right to immediately suspend your access to the Website or any of your accounts with Spectra and makes such declaration on the website as determined by Spectra for the protection of its business and in the interests of Users. You shall be liable to indemnify Spectra for any losses incurred as a result of User misrepresentations or fraudulent feedback that has adversely affected Spectra or its Users.</li></ul>
                      <div class="privacy-content" style={{ fontSize: '17px', fontWeight: 500 }} >	PROFILE OWNERSHIP AND EDITING RIGHTS </div>

                      <ul><li style={{ fontSize: '16px' }}>	Spectra ensures easy access to you by providing a tool to update your profile information. Spectra reserves the right of ownership of all the User profile and photographs and to moderate the changes or updates requested by User. However, Spectra takes the independent decision whether to publish or reject the requests submitted for the respective changes or updates. You hereby represent and warrant that you are fully entitled under law to upload all content uploaded by you as part of your profile or otherwise while using Spectra’s services, and that no such content breaches any third-party rights, including intellectual property rights. Upon becoming aware of a breach of the foregoing representation, Spectra may modify or delete parts of your profile information at its sole discretion with or without notice to you.</li></ul>
                      <div class="privacy-content" style={{ fontSize: '17px', fontWeight: 500 }}>	REVIEWS AND FEEDBACK DISPLAY RIGHTS OF SPECTRA</div>

                      <ul><li style={{ fontSize: '16px' }}>	All Critical Content is created by the Users of portal. As a platform, Spectra does not take responsibility for Critical Content and its role with respect to Critical Content is restricted to that of an ‘intermediary’ under the Information Technology Act, 2000. The role of Spectra and other legal rights and obligations relating to the Critical Content are further detailed hereunder. </li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	Spectra reserves the right to collect feedback and Critical Content for all the Users. </li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	Spectra shall have no obligation to pre-screen, review, flag, filter, modify, refuse or remove any or all Critical Content from any Service, except as required by applicable law. </li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	Spectra will take down information under standards consistent with applicable law, and shall in no circumstances be liable or responsible for Critical Content, which has been created by the Users. The principles set out in relation to third party content in the terms of Service for the Website shall be applicable mutatis mutandis in relation to Critical Content posted on the Website.</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	If Spectra determines that you have provided inaccurate information or enabled fraudulent feedback, Spectra reserves the right to immediately suspend any of your accounts with Spectra and makes such declaration on the website alongside your name/your clinics name as determined by Spectra for the protection of its business and in the interests of Users.</li></ul>
                      <div class="privacy-content" style={{ fontSize: '17px', fontWeight: 500 }} >	INDEPENDENT SERVICES</div>
                      <ul><li style={{ fontSize: '16px' }}>	Your use of each Service confers upon you only the rights and obligations relating to such Service, and not to any other service that may be provided by Spectra.</li></ul>
                      <div class="privacy-content" style={{ fontSize: '17px', fontWeight: 500 }}>	SPECTRA REACH RIGHTS</div>
                      <ul><li style={{ fontSize: '16px' }}>	Spectra reserves the rights to display sponsored ads on the Website. These ads would be marked as “Sponsored ads”. Without prejudice to the status of other content, Spectra will not be liable for the accuracy of information or the claims made in the Sponsored ads. Spectra does not encourage the Users to visit the Sponsored ads page or to avail any services from them. Spectra will not be liable for the services of the providers of the Sponsored ads. </li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	You represent and warrant that you will use these Services in accordance with applicable law. Any contravention of applicable law as a result of your use of these Services is your sole responsibility, and Spectra accepts no liability for the same.</li></ul>
                      <div class="privacy-content" style={{ fontSize: '17px', fontWeight: 500 }} >	USAGE IN PROMOTIONAL & MARKETING MATERIALS</div>
                      <ul><li style={{ fontSize: '16px' }} >	In recognition of the various offerings and services provided by Spectra to User, User shall (subject to its reasonable right to review and approve): (a) allow Spectra to include a brief description of the services provided to User in Spectra’s marketing, promotional and advertising materials; (b) allow Spectra to make reference to User in case studies, and related marketing materials; (c) serve as a reference to Spectra’s existing and potential clients; (d) provide video logs, testimonials, e-mailers, banners, interviews to the news media and provide quotes for press releases; (e) make presentations at conferences; and/or (f) use the User’s name and images etc., within product literature, e-mailers, press releases, social media and other advertising, marketing and promotional materials.</li></ul>
                    </div>
                    <div class="privacy-card">
                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span> RIGHTS AND OBLIGATIONS RELATING TO CONTENT:</div>
                      <div class="privacy-content" style={{ fontSize: '17px' }} >	Spectra hereby informs Users that they are not permitted to host, display, upload, modify, publish, transmit, update or share any information that:</div>
                      <ul><li style={{ fontSize: '16px' }}>	belongs to another person and to which the User does not have any right to;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, pedophilic, libelous, invasive of another's privacy, hateful, or racially, ethnically objectionable, disparaging, or otherwise unlawful in any manner whatever;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	harm minors in any way;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	infringes any patent, trademark, copyright or other proprietary rights;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	violates any law for the time being in force;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	deceives or misleads the addressee about the origin of such messages or communicates any information which is grossly offensive or menacing in nature;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	impersonate another person;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	threatens the unity, integrity, defense, security or sovereignty of India, friendly relations with foreign states, or public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting any other nation.</li></ul>
                      <div class="privacy-content" style={{ fontSize: '17px' }}> Users are also prohibited from:</div>
                      <ul><li style={{ fontSize: '16px' }}>	violating or attempting to violate the integrity or security of the Website or any Spectra Content;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	transmitting any information (including job posts, messages and hyperlinks) on or through the Website that is disruptive or competitive to the provision of Services by Spectra;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	intentionally submitting on the Website any incomplete, false or inaccurate information;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	making any unsolicited communications to other Users;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	using any engine, software, tool, agent or other device or mechanism (such as spiders, robots, avatars or intelligent agents) to navigate or search the Website;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	attempting to decipher, decompile, disassemble or reverse engineer any part of the Website;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	copying or duplicating in any manner any of the Spectra Content or other information available from the Website;</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	framing or hot linking or deep linking any Spectra Content.</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	circumventing or disabling any digital rights management, usage rules, or other security features of the Software.</li></ul>
                      <div class="privacy-content" style={{ fontSize: '17px' }}> Spectra, upon obtaining knowledge by itself or been brought to actual knowledge by an affected person in writing or through email signed with electronic signature about any such information as mentioned above, shall be entitled to disable such information that is in contravention of Applicable law. Spectra shall also be entitled to preserve such information and associated records for at least 90 (ninety) days for production to governmental authorities for investigation purposes. </div><br></br>
                      <div class="privacy-content" style={{ fontSize: '17px' }}>	In case of non-compliance with any applicable laws, rules or regulations, or the TOU (including the Privacy Policy) by a User, Spectra has the right to immediately terminate the access or usage rights of the User to the Website and Services and to remove non-compliant information from the Website.</div><br></br>
                      <div class="privacy-content" style={{ fontSize: '17px' }}>	Spectra may disclose or transfer User-generated information to its affiliates or governmental authorities in such manner as permitted or required by applicable law, and you hereby consent to such transfer.</div><br></br>
                      <div class="privacy-content" style={{ fontSize: '17px' }}>	Spectra respects the intellectual property rights of others and we do not hold any responsibility for any violations of any intellectual property rights.</div><br></br>



                      <div class="privacy-card">
                        <div class="privacy-title" style={{ fontSize: '20px' }} ><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span> TERMINATION :</div>
                        <div class="privacy-content" style={{ fontSize: '17px' }}>	Spectra reserves the right to suspend or terminate a User’s access to the Website and the Services with or without notice and to exercise any other remedy available under law, in cases where;
                          <ul><li style={{ fontSize: '16px' }}>Such User breaches any terms and conditions of the TOU;</li></ul>
                          <ul><li style={{ fontSize: '16px' }}>A third-party reports violation of any of its right as a result of your use of the Services;</li></ul>
                          <ul><li style={{ fontSize: '16px' }}>Spectra is unable to verify or authenticate any information provide to Spectra by a User;</li></ul>
                          <ul><li style={{ fontSize: '16px' }}>Spectra has reasonable grounds for suspecting any illegal, fraudulent or abusive activity on part of such User; or</li></ul>
                          <ul><li style={{ fontSize: '16px' }}>Spectra believes in its sole discretion that User’s actions may cause legal liability for such User, other Users or for Spectra or are contrary to the interests of the Website.</li></ul>
                        </div>
                        <div class="privacy-content" style={{ fontSize: '16px' }} >	Once temporarily suspended, indefinitely suspended or terminated, the User may not continue to use the portal under the same account, a different account or re-register under a new account. On termination of an account due to the reasons mentioned herein, such User shall no longer have access to data, messages, files and other material kept on the Website by such User. The User shall ensure that he/she/it has continuous backup of any services the User has availed in order to comply with the User’s record keeping process and practices.

                        </div><br></br>
                        <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span>	LIMITATION OF LIABILITY:</div>
                        <div class="privacy-content" style={{ fontSize: '17px' }}> In no event, including but not limited to negligence, shall Spectra, or any of its directors, officers, employees, agents or content or service providers (collectively, the “Protected Entities”) be liable for any direct, indirect, special, incidental, consequential, exemplary or punitive damages arising from, or directly or indirectly related to, the use of, or the inability to use, the Website or the content, materials and functions related thereto, the Services, User’s provision of information via the Website, lost business, even if such Protected Entity has been advised of the possibility of such damages. In no event shall the Protected Entities be liable for :</div><br></br>
                        <ul><li style={{ fontSize: '16px' }}>provision of or failure to provide all or any service by Users contacted or managed through the Website;</li></ul>
                        <ul><li style={{ fontSize: '16px' }}>any content posted, transmitted, exchanged or received by or on behalf of any User or other person on or through the Website;</li></ul>
                        <ul><li style={{ fontSize: '16px' }}>any unauthorized access to or alteration of your transmissions or data; or</li></ul>
                        <ul><li style={{ fontSize: '16px' }}>any other matter relating to the Website or the Service.</li></ul>
                      </div>

                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span>	RETENTION AND REMOVAL:</div>
                      <div class="privacy-content" style={{ fontSize: '16px' }}>	Spectra may retain such information collected from Users from its Website or Services for as long as necessary, depending on the type of information; purpose, means and modes of usage of such information. Computer web server logs may be preserved as long as administratively necessary.</div><br></br>


                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span>	APPLICABLE LAW AND DISPUTE SETTLEMENT:</div>
                      <div class="privacy-content" style={{ fontSize: '16px' }}><ul>	<li>You agree that this TOU and any contractual obligation between Spectra and User will be governed by the laws of India.</li>
	<li>Subject to the above, the courts at New Delhi shall have exclusive jurisdiction over any disputes arising out of or in relation to this TOU, your use of the Website or the Services or the information to which it gives access.</li></ul></div>


                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span>	CONTACT INFORMATION GRIEVANCE OFFICER:</div>

                      <div class="privacy-content" style={{ fontSize: '16px' }}><ul> <li>	If a User has any questions concerning Spectra, the Website, this TOU, the Services, or anything related to any of the foregoing, Spectra customer support can be reached at the following email address: <a href="mailto:support@spectra.co">support@spectra.co</a>
 via the contact information available.</li>	
                     <li>	In accordance with the Information Technology Act, 2000, and the rules made there under, if you have any grievance with respect to the Website or the service, including any discrepancies and grievances with respect to processing of information, you can contact our Grievance Officer.</li>
                     <li>	In the event you suffer as a result of access or usage of our Portal by any person in violation Applicable Rules, please address your grievance to the above person.</li></ul></div><br></br>

                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span> SEVERABILITY :</div>

                      <div class="privacy-content" style={{ fontSize: '16px' }}>If any provision of the TOU is held by a court of competent jurisdiction or arbitral tribunal to be unenforceable under applicable law, then such provision shall be excluded from this TOU and the remainder of the TOU shall be interpreted as if such provision were so excluded and shall be enforceable in accordance with its terms; provided however that, in such event, the TOU shall be interpreted so as to give effect, to the greatest extent consistent with and permitted by applicable law, to the meaning and intention of the excluded provision as determined by such court of competent jurisdiction or arbitral tribunal.</div>
                      <br></br>
                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span> WAIVER :</div>

                      <div class="privacy-content" style={{ fontSize: '16px' }}>No provision of this TOU shall be deemed to be waived and no breach excused, unless such waiver or consent shall be in writing and signed by Spectra. Any consent by Spectra to, or a waiver by Spectra of any breach by you, whether expressed or implied, shall not constitute consent to, waiver of, or excuse for any other different or subsequent breach.</div>

                      <br></br>
                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span> SERVICE DISRUPTION :</div>
                      <ul><li style={{ fontSize: '16px' }}>We do not take any responsibility for Internet connectivity or other disruption in your hardware or software as these are factors beyond our control.</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>You understand that we have no control over those disruptions and you take full responsibility for any loss due to service disruption for the above reasons. </li></ul>
                      <ul><li style={{ fontSize: '16px' }}>Spectra shall not be responsible for any interruption in the provision of the Contests, including, but not limited to disconnection or communication interferences due to issues in the internet infrastructure used for providing or accessing the services. You understand that Spectra has no control over these factors. You take full responsibility for any risk of loss due to such interruptions for any such reason. </li></ul>
                      <ul><li style={{ fontSize: '16px' }}>Spectra reserves the right to abandon any specific service or adjust the deadline of a service in certain specific/uncertain scenarios/which are beyond our reasonable control.</li></ul>

                      <br></br>
                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span> COMPLAINTS AND DISPUTES :</div>

                      <ul><li style={{ fontSize: '16px' }}>We appreciate your feedback and recommend you to lodge all complaints with our dedicated support team. All complaints will be entertained within reasonable time. </li></ul>
                      <ul><li style={{ fontSize: '16px' }}>You may contact us via Our Contact us page to notify us of any grievances or concerns that you may have in relation to Our Platform or Contests or to otherwise provide us with appropriate feedback concerning the same. We may seek additional information concerning your grievance or feedback, but any such communication from us shall not be construed as making a commitment, representation, or warranty to review/respond to or redress any grievance or feedback provided. You shall not claim or demand any royalty or fees from us in case we make any changes or update Our Platform or Contests pursuant to your feedback.</li></ul>


                      <br></br>
                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span>	MODIFICATION :  </div>
                      <ul style={{ fontSize: '16px' }}> We at Spectra endeavour to enable our users best in class environment and service conditions. We are subject to a changing economic/legal environment and hence we may change our Terms of Use and other policies from time to time. You are requested to keep yourself updated with changes and  modifications. </ul>

                      <br></br>
                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span>	DISCLAIMER :</div>
                      <ul> <li style={{ fontSize: '16px' }}>	We have endeavoured to ensure that all the information on the Website is correct, but we neither warrant nor make any representations regarding the quality, accuracy or completeness of any data, information, product or Service. In no event shall we be liable for any direct, indirect, punitive, incidental, special, consequential damages or any other damages. Neither shall we be responsible for the delay or inability to use the Website or related Functionalities, the provision of or failure to provide Functionalities, or for any information, software, products, Functionalities and related graphics obtained through the Website, or otherwise arising out of the use of the website, whether based on contract, tort, negligence, strict liability or otherwise. Further, we shall not be held responsible for non-availability of the Website during periodic maintenance operations or any unplanned suspension of access to the website that may occur due to technical reasons or for any reason beyond our control. The user understands and agrees that any facility/functionality of the Site and their usage done entirely at their own discretion and risk and they will be solely responsible for any unauthorized usage or system failure whether or not due to failure of their Hardware or Systems beyond our control. </li></ul>
                      <ul> <li style={{ fontSize: '16px' }}>You agree to indemnify, defend and hold harmless Spectra from and against any and all losses, liabilities, claims, damages, costs and expenses (including legal fees and disbursements in connection therewith and interest chargeable thereon) asserted against or incurred by Spectra that arise out of, result from, or may be payable by virtue of, any breach or non-performance of any representation, warranty, covenant or agreement made or obligation to be performed by you pursuant to these Terms.</li></ul>

                      <br></br>
                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span> TERMS of USAGE:</div>
                      <ul><li style={{ fontSize: '16px' }}>	You accept that you have read the TOU and You are legally bound by this TOU.</li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	The moment you click “I agree” button this TOU shall be automatically effective and shall remain effective till the termination of the same. </li></ul>
                      <ul><li style={{ fontSize: '16px' }}>	You are bound to the TOU till such time as you are using Spectra website or possess Spectra user account. </li></ul>


                      <br></br>

                      <div class="privacy-title" style={{ fontSize: '20px' }}><span style={{ fontSize: '30px' }} dangerouslySetInnerHTML={{ __html: '&#9632;' }}></span> NOTICES :</div>
                      <ul><li style={{ fontSize: '16px' }}>All the communication will be in written or electronic format and it will be delivered to you within 5 business days. The Company shall not be responsible if the contact address is not provided correctly. </li></ul>
                      <ul><li style={{ fontSize: '16px' }}>Any support which you require from the company, You can reach our support team at <a href="mailto:support@spectra.co">support@spectra.co</a>
</li></ul>


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