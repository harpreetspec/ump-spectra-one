import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SideBar from './Sidebar';
import Footer from './Footer';
import Header from './Header';
import HeaderHbb from './HeaderHbb'
import arrowout from "../assets/images/arrow-out.svg";
import tablesearch from "../assets/images/table-search.svg";
import distance from "../assets/images/distance.svg";
import swiperarownext from "../assets/images/swiper-arow-next.svg";
import iconcalendar from "../assets/images/icon-calendar.svg";
import billingoptionicon from "../assets/images/billing-option-icon.svg";
import shareicon from "../assets/images/share-icon.svg";
import download from "../assets/images/download.svg";
import eyeopen from "../assets/images/eye-open.svg";
import close from "../assets/images/close.svg";
import billingaddress from "../assets/images/billing-address.svg";
import edit from "../assets/images/edit.svg";
import billinggsticon from "../assets/images/billing-gst-icon.svg";
import bilingregistrationicon from "../assets/images/biling-registration-icon.svg";
import accountdetaildate from "../assets/images/account-detail-date.svg";
import accountdetailuser from "../assets/images/account-detail-user.svg";
import accountdetailmail from "../assets/images/account-detail-mail.svg";
import accountdetailname from "../assets/images/account-detail-name.svg";
import { useNavigate } from 'react-router-dom';
import PaymentDetailsInvoice from '../helper/AccountDetailsHelper/PaymentDetailsInvoice';
import ViewUserDetails from '../helper/AccountDetailsHelper/ViewUserDetails';
import Swiper from 'swiper';
import "swiper/swiper-bundle.min.css";
import Tooltip from 'react-tooltip-lite';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import productIcon from "../assets/images/product-icon.svg";
import { PDFViewer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import Highlighter from 'react-highlight-words';
import ReactPaginate from 'react-paginate';
import {
  getAreaLists,
  getSolutionLists,
  getCustomerAccountDetail,
  getInvoiceByOrgNo,
  getTransactionHistoryListByOrgNo
} from '../function';
import producticon from "../assets/images/product-icon.svg";
import moment from 'moment';
import { DateRangePicker } from 'react-bootstrap-daterangepicker';
export default function AccountDetails() {
  const navigate = useNavigate();
  const companyName = localStorage.getItem('company_name');
  const [id, setId] = useState({});
  const [actDate, setActDate] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [panNo, setPanNo] = useState('');
  const [tan, setTan] = useState('');
  const [tds, setTds] = useState('');
  const [payNowClick, setPayNowClick] = useState(false);
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
  const serviceId = localStorage.getItem('credentialKey');
  const locationID = localStorage.getItem('crm_location_id');
  const groupID = localStorage.getItem('crm_group_id');
  const companyID = localStorage.getItem('crm_company_id');
  const [getFinalInvoiceDetails, setFinalInvoiceDetails] = useState();
  const [getFinalTransactionHistory, setFinalTransactionHistory] = useState();
  const [getInvoicePayNowRow, setInvoicePayNowRow] = useState();
  const [getServicePayNow, setServicePayNow] = useState();
  const [getAreaName, setAreaName] = useState();
  const [orgNumber, setOrgNumber] = useState({});

  const [serviceGroupNumber, setServiceGroupNumber] = useState({});
  const [invoiceHtml, setInvoiceHtml] = useState()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const contentRef = useRef(null);
  const [getUniqueLocation, SetUniqueLocation] = useState();
  const [getMergedAreaProd, setMergedAreaProd] = useState();
  const [getUniqueAreaList, setUniqueAreaList] = useState();
  const [getSelectedCity, setSelectedCity] = useState();
  const [getSelectedArea, setSelectedArea] = useState();
  const [getSelectedProduct, setSelectedProduct] = useState();
  const [getUniqueProductList, setUniqueProductList] = useState();
  const [getSelectedPeriod, setSelectedPeriod] = useState(false);
  const [getFinalDropdownSelection, setFinalDropdownSelection] = useState();

  const [getUniqueAreaListTrans, setUniqueAreaListTrans] = useState();
  const [getSelectedCityTrans, setSelectedCityTrans] = useState();
  const [getSelectedAreaTrans, setSelectedAreaTrans] = useState();
  const [getSelectedProductTrans, setSelectedProductTrans] = useState();
  const [getUniqueProductListTrans, setUniqueProductListTrans] = useState();
  const [getSelectedPeriodTrans, setSelectedPeriodTrans] = useState(false);
  const [getFinalDropdownSelectionTrans, setFinalDropdownSelectionTrans] = useState();
  const [drop1Value, setDrop1Value] = useState([]);
  const [drop2Value, setDrop2Value] = useState([]);
  const [drop3Value, setDrop3Value] = useState([]);
  // const [citySelected, setCitySelected] = useState('');
  // const [areaSelected, setAreaSelected] = useState('');
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [filteredSegments, setFilteredSegments] = useState([]);
  const [idbyDrop, setIdbyDrop] = useState({});
  const [invoicedt, setInvoicedt] = useState('');
  const [panNobydrop, setPanNobydrop] = useState('');
  const [tanbydrop, setTanbydrop] = useState('');
  const [tdsbydrop, setTdsbydrop] = useState('');
  const [gstNumberbydrop, setGstNumberbydrop] = useState('');
  const [actDatebydrop, setActDatebydrop] = useState('');
  const [orgNumberbydrop, setOrgNumberbydrop] = useState({});
  const [editedValue, setEditedValue] = useState('');
  const [serviceGroupNumberbydrop, setServiceGroupNumberbydrop] = useState({});
  const [checkactDatebydrop, setCheckDatebydrop] = useState(false);
  const [ledgerId, setLedgerId] = useState('');
  const [subDayValue, setSubDayValue] = useState()
  const [searchTermTrans, setSearchTermTrans] = useState([]);
  const [getPinnedClickedData, setPinnedClickedData] = useState(null);
  const [getPinnedSessionData, setPinnedSessionData] = useState(null);
  const [getPinnedClickedTransData, setPinnedClickedTransData] = useState(null);
  const [getLogInSegment, setLogInSegment] = useState();
  const [getLogInLocation, setLogInLocation] = useState();
  const [getLogInArea, setLogInArea] = useState();
  const [getLogInCanId, setLogInCanId] = useState();
  const [getPinnedFlag, setPinnedFlag] = useState(false);
  const [allCityFlag, setAllCityFlag] = useState(false);
  const [getSingleInvoive, setSingleInvoive] = useState();
  const [getSingleTrans, setSingleTrans] = useState();
  const crmRole = localStorage.getItem('crm_role');
  const segment = localStorage.getItem('segment');
  const [getMergedAreaProdOne, setMergedAreaProdOne] = useState();
  const [getFinalInvoiceDetailsOne, setFinalInvoiceDetailsOne] = useState();
  const [getFinalTransactionHistoryOne, setFinalTransactionHistoryOne] = useState();
  const [getFinalTransactionDefault, setFinalTransactionDefault] = useState();
  const [getFinalInvoiceDefault, setFinalInvoiceDefault] = useState();
  const segmentCheckHBB = localStorage.getItem('segmentCheckHBB')
  //Ishan
  const [pfValues, setPfValues] = useState('');
  const [isPinnedDataAvailable, setIsPinnedDataAvailable] = useState(false);
  const [pfOrgNoValues, setPfOrgNoValues] = useState('');
  const [pfServiceGpNoValues, setPfServiceGpNoValues] = useState('');
  const [pfActDateValues, setPfActDateValues] = useState('');
  const [checkactDatebyPf, setCheckDatebyPf] = useState(false);
  const [pfLegerActNoValues, setPfLedgerActNoValues] = useState('');
  const [pfAccValues, setPfAccValues] = useState('');
  const [pfpanNo, setPfpanNo] = useState('');
  const [pftan, setPfTan] = useState('');
  const [pftds, setPfTds] = useState('');
  const [pfgstNo, setPfGstNo] = useState('');
  const [myflag, setMyflag] = useState(false);
  const [pinnedData, setPinnedData] = useState(null);
  const [dropdownData, setDropdownData] = useState([]);
  const [showDropdownData, setShowDropdownData] = useState(false);
  const [autoData, setAutoData] = useState('');
  const [autoCity, setAutoCity] = useState('');
  const [autoArea, setAutoArea] = useState('');
  const [autoSegment, setAutoSegment] = useState('');
  // const [crm_Role,setCrm_Role] =useState();
  const [drop1ValueforBIA, setDrop1ValueforBIA] = useState([]);
  const [drop2ValueforBIA, setDrop2ValueforBIA] = useState([]);
  const [drop3ValueforBIA, setDrop3ValueforBIA] = useState([]);
  const [dropValueBIA, setDropValueBIA] = useState([]);
  // const [filtered, setFiltered] = useState([]);
  const [getLogInLocationT, setLogInLocationT] = useState();
  const [getLogInAreaT, setLogInAreaT] = useState();
  const [getLogInSegmentT, setLogInSegmentT] = useState();
  const [filtered, setFiltered] = useState([]);
  const [resetValueflag, setResetValueflag] = useState(false);
  const [getFlagLoc, setFlagLoc] = useState(true);
  const [getId, setGetId] = useState({});
  const [segmnt, setSegmnt] = useState();
  const [citySelected, setCitySelected] = useState(false);
  const [areaSelected, setAreaSelected] = useState('');
  const [segmentSelected, setSegmentSelected] = useState('');
  const [selectedRange, setSelectedRange] = useState("3 Months");
  const [selectedRangeTrans, setSelectedRangeTrans] = useState("3 Months");
  const [getSelectedCanId, setSelectedCanId] = useState();
  const [getSelectedCanIdTrans, setSelectedCanIdTrans] = useState();
  const [getSolution, setSolution] = useState("3 Months");
  const [filteredAll, setFilteredAll] = useState([]);
  const [flag, setFlag] = useState(true);
  const CanId = localStorage.getItem('credentialKey')
  // console.log('lofi', CanId)
  const crm_role = localStorage.getItem('crm_role');

  // BIA single case ishan
  useEffect(() => {
    async function fetchDataforBIA() {
      const dropAreaUrl = process.env.REACT_APP_API_URL + '/getAreaLists';
      const dropSegmentUrl = process.env.REACT_APP_API_URL + '/getSolutionLists';
      const locationUrl = process.env.REACT_APP_API_URL + '/getLocationLists';

      const groupID = localStorage.getItem("crm_group_id");
      const data = {
        "groupID": groupID,
        "companyID": (crm_role == "L3") ? companyID:"",
        "locationID":  (crm_role == "L3") ? locationID:""
      };

      // Fetch location lists
      const locationResponse = await fetch(locationUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const locationResult = await locationResponse.json();
      // console.log("Location lists", locationResult.data);
      setDrop1ValueforBIA(locationResult.data);

      // Fetch drop area lists
      const AreaResponse = await fetch(dropAreaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const AreaResult = await AreaResponse.json();
      // console.log("AreaLists", AreaResult.data);
      setDrop2ValueforBIA(AreaResult.data);

      // Fetch drop segment lists
      const SegmentResponse = await fetch(dropSegmentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const SegmentResult = await SegmentResponse.json();
      // console.log("SolutionLists", SegmentResult.data);
      setDrop3ValueforBIA([...AreaResult.data, ...SegmentResult.data]);
      setDropValueBIA([...locationResult.data, ...AreaResult.data, ...SegmentResult.data])
      const mergedData = [
        ...locationResult.data,
        ...AreaResult.data,
        ...SegmentResult.data
      ];
      // console.log("SOON", mergedData);

      const filteredData = mergedData.find((item) => item.CanId === localStorage.getItem("credentialKey"));
      setFiltered(filteredData);

      const filteredDataAll = mergedData.filter((item) => item.CanId)
      setFilteredAll(filteredDataAll);
      // console.log("1212", filteredData)
      // console.log("1200", filteredDataAll)

    }
    fetchDataforBIA();
  }, []);

  useEffect(() => {

    async function allSolutionList() {
      const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
      const data = {
        "groupID": localStorage.getItem("crm_group_id"),
        "companyID": (crm_role == "L3") ? companyID : "",
        "locationID":  (crm_role == "L3") ? locationID : ""
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
      const filteredData = result.data.filter((item) => item.CanId == localStorage.getItem("credentialKey"));
      // console.log("Current Sgment", filteredData[0].SegmentName);
      setSegmnt(filteredData[0].SegmentName)

    }

    allSolutionList();
  }, []);
  // end
  // ishan
  useEffect(() => {
    // Retrieve the 'pinnedClickedData' from session storage when the component mounts
    const pinnedClickedData = sessionStorage.getItem('pinnedClicked');

    if (pinnedClickedData) {
      // Parse the data back to an object from JSON
      const parsedPinnedClickedData = JSON.parse(pinnedClickedData);
      // console.log("parsedPinnedClickedData", parsedPinnedClickedData);

      // Assuming parsedPinnedClickedData is an array of objects
      if (parsedPinnedClickedData.length > 0) {
        if (!isPinnedDataAvailable) {
          setPinnedData(parsedPinnedClickedData[0]);
          // Set the pfValues state with the object at the 0th index
          setPfValues(parsedPinnedClickedData[0]);
          setIsPinnedDataAvailable(true);
          setShowDropdownData(false); // Initially set to false to show pinned data

          // Call fetchCustomerAccountDetailbyPfeature with the CanId directly
          fetchCustomerAccountDetailbyPfeature(parsedPinnedClickedData[0].CanId);

        }
      } else {
        // Handle the case when the array is empty
        // console.log("No data in parsedPinnedClickedData.");
      }
    }

  }, []);


  // end
  // end

  // this function changed because it was returning date pre 1day
  // const formatDate = (dateString) => {
  //   // console.log("dateString:",dateString);
  //   const date = new Date(dateString);
  //   const day = ('0' + date.getDate()).slice(-2);
  //   const month = date.toLocaleString('en', { month: 'short' });
  //   const year = date.getFullYear().toString().slice(-2);
  //   return `${day} ${month}'${year}`;
  // };

  const formatDate = (dateString) => {
    const newDate = new Date(dateString);
    const date = new Date(newDate.getTime() + (5 * 60 + 30) * 60 * 1000);

    const day = ('0' + date.getUTCDate()).slice(-2);
    const month = date.toLocaleString('en', { month: 'short', timeZone: 'UTC' });
    const year = date.getUTCFullYear().toString().slice(-2);
    return `${day} ${month}'${year}`;
  };

  

  function pre7DaysDate(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate() - 0);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = date.toLocaleString('en', { month: 'short' });
    const year = String(date.getUTCFullYear()).slice(-2);

    return `${day} ${month}'${year}`;
  }

  function pre2DaysDate(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate() - 0);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = date.toLocaleString('en', { month: 'short' });
    const year = String(date.getUTCFullYear()).slice(-2);

    return `${day} ${month}'${year}`;
  }

  let passkey = searchParams.get('passkey');
  // console.log("passkey", passkey);


  const pid = new URLSearchParams(location.search);

  var pageid = pid.get('pid') ? pid.get('pid') : '';

  // console.log('AccountPageParam=', pageid);

  if (pageid == 'bill') {

    var actTabAcc = 'nav-link account-tab-btn';

    var actTabBill = 'nav-link account-tab-btn active';

    var actBill = 'tab-pane fade active show';

    var actAcc = 'tab-pane fade';

  } else {

    var actTabAcc = 'nav-link account-tab-btn active';

    var actTabBill = 'nav-link account-tab-btn ';

    var actAcc = 'tab-pane fade active show';

    var actBill = 'tab-pane fade';

  }
  // const decodeBase64 = () => {
  const decodedString = atob(passkey);
  // console.log("decodedString", decodedString); // Output: "Hello World"
  // }


  const pinnedFetchData = async (selectedfromDate) => {
    // console.log("fromDate", selectedfromDate);
    let defaultFromDate = new Date(new Date().getFullYear(), new Date().getMonth() - 3, new Date().getDate());
    try {
      const pinnedClickedData = JSON.parse(sessionStorage.getItem('pinnedClicked'));
      // console.log("pinnedClickedData", pinnedClickedData);


      if (pinnedClickedData && !allCityFlag) {
        if (pinnedClickedData?.SegmentName !== "HBB") {
          // alert("pinnedClickedData")
          setPinnedSessionData(pinnedClickedData[0]);
          //Pinned data fetch OrgNo from getCustomerAccountDetail Api call
          let pinedInvoiceOrg = await getCustomerAccountDetail(pinnedClickedData[0].CanId);
          // console.log("pinedInvoiceOrg", pinedInvoiceOrg.data.orgId);

          //Pinned data fetch from Invoice Api call
          let pinedInvoice = await getInvoiceByOrgNo(pinedInvoiceOrg.data.orgId);
          // console.log("pinedInvoice", pinedInvoice.data);
          const filteredDataInvoice = pinedInvoice.meta.Status === true && pinedInvoice.data.filter(item => new Date(item.invoicedt) > new Date(selectedfromDate ? selectedfromDate : defaultFromDate));
          // console.log("filteredDataInvoice", pinedInvoice.data);
          setPinnedClickedData(filteredDataInvoice);

          //Pinned data fetch from Transaction Api call
          const toDate = new Date();
          const fromDate = new Date();
          fromDate.setMonth(fromDate.getMonth() - 12);
          let pinedTransaction = await getTransactionHistoryListByOrgNo(pinedInvoiceOrg.data.orgId, fromDate, toDate);
          // console.log("pinedTransaction", pinedTransaction.data);

          const pinnedTransactionHistoryList = pinedTransaction.data.length > 0 && pinedTransaction.data.filter((el) => el.voucherType !== "Sale / Invoice Voucher");
          if (pinnedTransactionHistoryList.length > 0) {
            const modifiedData = pinnedTransactionHistoryList.map((item) => {
              if (item.voucherTypeId === 3) {
                return {
                  ...item,
                  voucherType: "Payment",
                };
              } else if (item.voucherTypeId === 7) {
                return {
                  ...item,
                  voucherType: "Settlement (Debit)",
                };
              } else if (item.voucherTypeId === 8) {
                return {
                  ...item,
                  voucherType: "Settlement (Credit)",
                };
              }
              return item;
            });
            // console.log("getPinnedClickedTransData", modifiedData);

            // Sort the array in descending order based on the date
            modifiedData.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
            const filteredDataTrans = modifiedData.filter(item => new Date(item.transactionDate) > new Date(selectedfromDate ? selectedfromDate : defaultFromDate));
            // console.log("filteredDataTrans", filteredDataTrans);
            setPinnedClickedTransData(filteredDataTrans);
          }


        }
      } else {
        setPinnedClickedData(null);
        setPinnedClickedTransData(null);
        setPinnedSessionData(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    pinnedFetchData();
  }, []);
  //-----Single Page LogIn Data view Starts Here-----

  async function areaProd() {
    try {
      const resultAreaList = await getAreaLists(groupID, (crm_role == "L3") ? companyID : "", (crm_role == "L3") ? locationID : "");
      const resultSolutionLists = await getSolutionLists(groupID, (crm_role == "L3") ? companyID : "", (crm_role == "L3") ? locationID : "");
    
      // console.log("orgDetailsTrans",responseArea);
      // setFinalDropdownSelectionTrans(orgDetails);

      //----------Merge AreaList And SolutionList---------
      let mergedAreaSol;
      mergedAreaSol = resultAreaList.data.map((item) => {
        const matchingItem = resultSolutionLists.data.find((el) => el.CanId === item.CanId);
        if (matchingItem) {
          return {
            ...item,
            SegmentName: matchingItem.SegmentName,
            PlanName: matchingItem.PlanName
          };
        }
        return null;
      })
        .filter((item) => item !== null); // Remove null entries from the array
      // console.log("mergedAreaSol:", mergedAreaSol);
      let loginDetails = mergedAreaSol.filter((item) => item.CanId === serviceId)
      // console.log(loginDetails[0]);
      setMergedAreaProdOne(loginDetails[0]);



    } catch (error) {
      console.error(error);
    }
  }

  async function invoiceListOne(date) {
    try {
      let customerAccountDetail = await getCustomerAccountDetail(serviceId);
      // console.log("getCustomerAccountDetail", customerAccountDetail.meta.Status);
      if (customerAccountDetail.data.orgId) {
        let invoice = await getInvoiceByOrgNo(customerAccountDetail.data.orgId);
        // console.log("getInvoiceByOrgNo", invoice.meta.Status);
        let invoiceList = invoice.data;
        let currentDate = new Date();
        let pre3months = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());
        let fromDate = date ? date : pre3months
        if (Array.isArray(invoiceList)) {
          invoiceList.sort((a, b) => new Date(b.invoicedt) - new Date(a.invoicedt));
        }

        const invoiceList2 = invoiceList.filter(obj => new Date(obj.invoicedt) > new Date(fromDate));
        // console.log("invoiceList", invoiceList2);
        setFinalInvoiceDetailsOne(invoiceList2)
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function TransactionListOne(date) {
    try {
      let customerAccountDetail = await getCustomerAccountDetail(serviceId);
      // console.log("getCustomerAccountDetail", customerAccountDetail.data.orgId);
      // setFinalDropdownSelectionTrans(orgDetails);
      let Today = new Date();
      let Today2 = new Date();
      let from1year = new Date(Today2.getFullYear(), Today2.getMonth() - 12, Today2.getDate());

      if (customerAccountDetail.data.orgId) {
        const transactionList = await getTransactionHistoryListByOrgNo(customerAccountDetail.data.orgId, from1year, Today);
        // console.log("transactionList", transactionList.meta.Status);

        const TransactionHistoryList = transactionList.data.length > 0 && transactionList.data.filter((el) => el.voucherType !== "Sale / Invoice Voucher");
        if (TransactionHistoryList.length > 0) {
          //   console.log("getTransactionHistoryListByOrgNo", TransactionHistoryList);

          // Map through the array and change the voucherType
          const modifiedDataTrans = TransactionHistoryList.map((item) => {
            if (item.voucherTypeId === 3) {
              return {
                ...item,
                voucherType: "Payment",
              };
            } else if (item.voucherTypeId === 7) {
              return {
                ...item,
                voucherType: "Settlement (Debit)",
              };
            } else if (item.voucherTypeId === 8) {
              return {
                ...item,
                voucherType: "Settlement (Credit)",
              };
            }
            return item;
          });

          let currentDate = new Date();
          let pre3months = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());
          let fromDate = date ? date : pre3months
          // Sort the array in descending order based on the date
          modifiedDataTrans.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
          const modifiedDataTrans2 = modifiedDataTrans.filter(obj => new Date(obj.transactionDate) > new Date(fromDate));
          // console.log("modifiedDataTrans", modifiedDataTrans2);
          setFinalTransactionHistoryOne(modifiedDataTrans2);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleDateRangeChange = async (event, picker) => {
    try {
      // console.log(picker);
      let startDate;
      let endDate;
      if (picker.chosenLabel !== "Custom Range") {
        setSelectedRange(picker.chosenLabel);
        startDate = picker.startDate._d;
        endDate = picker.endDate._d;
        pinnedFetchData(new Date(startDate));
        // console.log("Start Date", new Date(startDate));
        // console.log("End Date",picker.endDate._d);
      } else {
        startDate = picker.startDate._d;
        endDate = picker.endDate._d;
        // console.log("Start Date", new Date(startDate));
        pinnedFetchData(new Date(startDate));
        // console.log("End Date",picker.endDate._d);
        //   console.log(moment(picker.startDate._d).format('DD MMM\'YY'))
        setSelectedRange(moment(picker.startDate._d).format('DD MMM\'YY') + "-" + moment(picker.endDate._d).format('DD MMM\'YY'))
      }

      if (getSelectedCanId) {
        let invoiceOrg = await getCustomerAccountDetail(getSelectedCanId);
        // console.log("pinedInvoiceOrg", invoiceOrg.data.orgId);

        //Pinned data fetch from Invoice Api call
        let invoiceList = await getInvoiceByOrgNo(invoiceOrg.data.orgId);
        //  console.log("invoiceList", new Date(invoiceList.data[0].invoicedt));
        if (Array.isArray(invoiceList)) {
          invoiceList.sort((a, b) => new Date(b.invoicedt) - new Date(a.invoicedt));
        }
        const filteredInvoice = invoiceList?.data.filter(item => new Date(item.invoicedt) >= new Date(startDate) && new Date(item.invoicedt) <= new Date(endDate))
        const areaProd = getMergedAreaProd.filter(item => item.CanId === getSelectedCanId)
        // console.log("planName", areaProd[0].PlanName);

        const FinalInvoice = {
          CanId: getSelectedCanId,
          LocationName: areaProd[0].LocationName,
          AreaName: areaProd[0].AreaName,
          SegmentName: areaProd[0].SegmentName,
          OrgNo: invoiceOrg.data.orgId,
          PlanName: areaProd[0].PlanName,
          filteredInvoice
        };

        setFinalDropdownSelection(FinalInvoice);

      } else {
        let invoiceOrg = await getCustomerAccountDetail(serviceId);
        // console.log("pinedInvoiceOrg", invoiceOrg.data.orgId);

        //Pinned data fetch from Invoice Api call
        let invoiceList = await getInvoiceByOrgNo(invoiceOrg.data.orgId);
        // console.log("invoiceList", new Date(invoiceList.data[0].invoicedt));
        // console.log(invoiceList);

        if (Array.isArray(invoiceList)) {
          invoiceList.sort((a, b) => new Date(b.invoicedt) - new Date(a.invoicedt));
        }
        const filteredInvoice = invoiceList.data.filter(item => new Date(item.invoicedt) >= new Date(startDate) && new Date(item.invoicedt) <= new Date(endDate))
        const planName = getSolution.filter(item => item.CanId === serviceId)
        const area = await getAreaLists(groupID, (crm_role == "L3") ? companyID : "", (crm_role == "L3") ? locationID : "");
        const areaL = area.data.filter(item => item.CanId === serviceId);
        // console.log("planName", planName[0].PlanName);

        const FinalInvoice = {
          CanId: serviceId,
          LocationName: areaL[0].LocationName,
          AreaName: areaL[0].AreaName,
          SegmentName: getLogInSegment,
          OrgNo: invoiceOrg.data.orgId,
          PlanName: planName[0].PlanName,
          filteredInvoice
        };
        // console.log(FinalInvoice);
        setFinalDropdownSelection(FinalInvoice);
        setFinalInvoiceDetailsOne(filteredInvoice);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateRangeChangeTrans = async (event, picker) => {
    try {
      // console.log(picker);
      let startDate;
      let endDate;
      if (picker.chosenLabel !== "Custom Range") {
        setSelectedRangeTrans(picker.chosenLabel);
        startDate = picker.startDate._d;
        endDate = picker.endDate._d;
        pinnedFetchData(new Date(startDate));
        // console.log("Start Date",picker.startDate._d);
        // console.log("End Date",picker.endDate._d);
      } else {
        startDate = picker.startDate._d;
        endDate = picker.endDate._d;
        pinnedFetchData(new Date(startDate));
        // console.log("Start Date",  new Date(startDate));
        // console.log("End Date",picker.endDate._d);
        //   console.log(moment(picker.startDate._d).format('DD MMM\'YY'))
        setSelectedRangeTrans(moment(picker.startDate._d).format('DD MMM\'YY') + "-" + moment(picker.endDate._d).format('DD MMM\'YY'))
      }

      if (getSelectedCanIdTrans) {
        let transOrg = await getCustomerAccountDetail(getSelectedCanIdTrans);
        // console.log("pinedInvoiceOrg", transOrg.data.orgId);

        //Pinned data fetch from Invoice Api call
        let transactionList = await getTransactionHistoryListByOrgNo(transOrg.data.orgId, startDate, endDate);
        // console.log("transactionList", transactionList);
        const modifiedTrans = await modifyTransaction(transactionList.data);
        // console.log(modifiedTrans);
        if (Array.isArray(modifiedTrans)) {
          modifiedTrans.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
        }
        const transactionHistory = modifiedTrans.filter(item => new Date(item.transactionDate) >= new Date(startDate) && new Date(item.transactionDate) <= new Date(endDate))
        const areaProd = getMergedAreaProd.filter(item => item.CanId === getSelectedCanIdTrans)
        // console.log("filteredTrans", transactionHistory);

        const FinalTrans = {
          CanId: getSelectedCanIdTrans,
          LocationName: areaProd[0].LocationName,
          AreaName: areaProd[0].AreaName,
          SegmentName: areaProd[0].SegmentName,
          OrgNo: transOrg.data.orgId,
          PlanName: areaProd[0].PlanName,
          transactionHistory
        };
        // console.log(FinalTrans);
        setFinalDropdownSelectionTrans(FinalTrans);

      } else {
        let transOrg = await getCustomerAccountDetail(serviceId);
        // console.log("pinedInvoiceOrg", transOrg.data.orgId);

        //Pinned data fetch from Invoice Api call
        let transactionList = await getTransactionHistoryListByOrgNo(transOrg.data.orgId, startDate, endDate);
        // console.log("transactionList", transactionList);
        const modifiedTrans = await modifyTransaction(transactionList.data);
        // console.log(modifiedTrans);
        if (Array.isArray(modifiedTrans)) {
          modifiedTrans.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
        }
        const transactionHistory = modifiedTrans.filter(item => new Date(item.transactionDate) >= new Date(startDate) && new Date(item.transactionDate) <= new Date(endDate))
        const areaProd = getSolution.filter(item => item.CanId === serviceId)
        const area = await getAreaLists(groupID, (crm_role == "L3") ? companyID : "", (crm_role == "L3") ? locationID : "");
        const areaL = area.data.filter(item => item.CanId === serviceId);
        // console.log("filteredTrans", areaProd);

        const FinalTrans = {
          CanId: serviceId,
          LocationName: areaL[0].LocationName,
          AreaName: areaL[0].AreaName,
          SegmentName: areaProd[0].SegmentName,
          OrgNo: transOrg.data.orgId,
          PlanName: areaProd[0].PlanName,
          transactionHistory
        };

        // console.log(FinalTrans);
        setFinalDropdownSelectionTrans(FinalTrans);
        setFinalTransactionHistoryOne(transactionHistory);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (crmRole === "L3" || (crmRole === "L2" && segment === "OBB")) {
      invoiceListOne();
      TransactionListOne();
      areaProd();
    }
  }, [crmRole, segment]);

  //-----Single Page LogIn Data view Ends Here-----



  async function getCustomerAccountDetail(CanId) {
    const url = process.env.REACT_APP_API_URL + '/getCustomerAccountDetail';
    // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
    const data = { serviceGroupId: CanId }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  }

  async function getInvoiceByOrgNo(orgNo) {
    const url = process.env.REACT_APP_API_URL + '/getInvoiceByOrgNo';
    // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
    const data = { orgno: orgNo }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  }
  async function getTransactionHistoryListByOrgNo(orgNo, fromDate, toDate) {
    const url = process.env.REACT_APP_API_URL + '/getTransactionHistoryListByOrgNo';
    // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
    const data = {
      organisationNo: orgNo,
      fromDate: fromDate,
      toDate: toDate
    }
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  }
  useEffect(() => {

    async function dropCity() {
      const url = process.env.REACT_APP_API_URL + '/getLocationLists';
      const data = {
        "groupID": localStorage.getItem("crm_group_id"),
        "companyID": (crm_role == "L3") ? companyID : "",
      "locationID":  (crm_role == "L3") ? locationID : ""
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      // console.log("locdown",result.data);
      // setDrop1Value(result.data);

      // Filter the data based on SolutionCount
      const filteredLocData = result.data.filter(item => item.SolutionCount > 0);
      setDrop1Value(filteredLocData);
      // console.log("locdown", filteredLocData);

    }

    dropCity();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const dropAreaUrl = process.env.REACT_APP_API_URL + '/getAreaLists';
      const dropSegmentUrl = process.env.REACT_APP_API_URL + '/getSolutionLists';

      const groupID = localStorage.getItem("crm_group_id");
      const data = {
        "groupID": groupID,
        "companyID": (crm_role == "L3") ? companyID : "",
        "locationID": (crm_role == "L3") ? locationID : ""
      };

      const dropAreaResponse = await fetch(dropAreaUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const dropSegmentResponse = await fetch(dropSegmentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const dropAreaResult = await dropAreaResponse.json();
      const dropSegmentResult = await dropSegmentResponse.json();

      // console.log("getAreaLists", dropAreaResult.data);
      setDrop2Value(dropAreaResult.data);
      // console.log(dropSegmentResult.data);
      // setDrop3Value(dropSegmentResult.data);
      // console.log([...dropAreaResult.data, ...dropSegmentResult.data]);
      setDrop3Value(([...dropAreaResult.data, ...dropSegmentResult.data]))
      const filteredforDueDate = dropSegmentResult.data.filter((item) => item.CanId == localStorage.getItem("credentialKey"));
      if (filteredforDueDate[0].SegmentName == "HBB") {
        setSubDayValue(2)
      }
      else {
        setSubDayValue(7)
      }
    }

    fetchData();
  }, []);


  const handleDropdownItemClick = (event) => {

    setFlagLoc(false);
    // setResetValueflag(false)
    const value = event.target.getAttribute('data-value');
    setCitySelected(value);
    event.target.closest('.select-dropdown').querySelector('.dropdown-toggle span.textValue').textContent = value;
    // console.log("clicked", value);
    const dropdownTextElement = event.target.closest(".select-dropdown").querySelector(".dropdown-toggle span.textValue");
    const clicked = dropdownTextElement.innerText;


    // // Toggle the resetValueflag when the same value is clicked again
    if (value === clicked) {
      setAreaSelected('')
      setSegmentSelected('')
      setResetValueflag(true);
    } else {
      setResetValueflag(true);
    }




    //  const uniqueAreas = [...new Set(drop2Value.filter(area => area.LocationName  === value ).map(area => area.AreaName))];
    //  const uniqueAreas = [...new Set(drop2Value.filter(area => area.LocationName === value && area.AreaName !== '').map(area => area.AreaName))];
    const uniqueAreas = [...new Set(drop2Value.filter(area => area.LocationName === value && (area.AreaName !== '' || !value)).map(area => area.AreaName || value))];
    // console.log("uniqueAreas", uniqueAreas);

    setFilteredAreas(uniqueAreas);




  };


  const handleAreaClick = (event) => {
    const value2 = event.target.getAttribute('data-value');
    setAreaSelected(value2);
    // console.log("go", value2)

    const correspondingLocation = drop2Value.find((CanId) => CanId.LocationName === value2);

    if (correspondingLocation) {
      // console.log("ichi", correspondingLocation.CanId)
      const commonCanId = correspondingLocation.CanId;

      const updatedFilteredSegments = drop3Value.filter((segment) => {
        const isMatchingSegment = segment.CanId === commonCanId;
        const isExcludedSegment = segment.SegmentName === "MS Wi-Fi" || segment.SegmentName === "OBB";
        const isExcludedSegment2 = segment.SegmentName === "MS Wi-Fi" || segment.SegmentName === "BBB" || segment.SegmentName === "BIA";

        if (crmRole === 'L2' && segmnt !== 'OBB') {
          return isMatchingSegment && !isExcludedSegment;
        } else if (crmRole === 'L2' && segmnt === 'OBB') {
          return isMatchingSegment && !isExcludedSegment2;
        }

        return isMatchingSegment;
      });

      setFilteredSegments(updatedFilteredSegments);
    } else {
      const updatedFilteredSegments = drop3Value.filter((segment) => {
        // Check if the segment's CanId matches the selected CanId and AreaName matches the value2
        const isMatchingSegment = segment.CanId && drop3Value.some((area) => area.CanId === segment.CanId && area.AreaName === value2);


        // Exclude "MS Wi-Fi" and "OBB" segments if it comes in Case of L2 & NOT OBB 
        const isExcludedSegment = segment.SegmentName === "MS Wi-Fi";
        // Exclude "MS Wi-Fi" and "BIA" ,"BBB" segments if it comes in Case of L2 & only OBB 
        const isExcludedSegment2 = segment.SegmentName === "MS Wi-Fi" || segment.SegmentName === "BBB" || segment.SegmentName === "BIA";


        if (crmRole == 'L2' && segment != 'OBB') {
          // Return true only if both conditions are true, so that it remains in the filtered result
          return isMatchingSegment && !isExcludedSegment;
        }
        else if (crmRole == 'L2' && segment != 'OBB') {
          return isMatchingSegment && !isExcludedSegment2;
        }



      });
      // console.log(updatedFilteredSegments);
      setFilteredSegments(updatedFilteredSegments);
    }
  };


  const handleSegmentClick = (event, CanId) => {
    // setResetValueflag(true)
    setPfValues(false);
    setFlagLoc(false);
    setFlag(false);
    // console.log("sds", event)
    const value3 = event.target.innerHTML;
    setSegmentSelected(value3)
    // event.target.closest('.select-dropdown').querySelector('.dropdown-toggle span.textValue').textContent = value3;
    // console.log("haaaaaaaaaaaaaaaaaaaaaaaaaaa", value3)
    const dropdownTextElement = event.target.closest(".select-dropdown").querySelector(".dropdown-toggle span.textValue");
    const clicked3 = dropdownTextElement.innerText;




    // Use the 'canId' variable wherever you need it
    // Use the 'CanId' variable wherever you need it
    // console.log("CanId:", CanId);
    setIdbyDrop({ CanId });
    setGetId({ CanId });

    fetchCustomerAccountDetailbydrop(CanId);
    setShowDropdownData(true); // Set to true to show dropdown data



  }





  const handleEditIconClick = (event) => {
    const editableValue = event.currentTarget.closest('.editable-block').querySelector('.editable-value');
    editableValue.contentEditable = true;
    editableValue.focus();
  };

  const handleEditableValueBlur = async (event) => {
    event.currentTarget.contentEditable = false;
    const newValue = event.currentTarget.textContent;

    try {
      const url = process.env.REACT_APP_API_URL + '/updateCustomerAccountDetail';

      const data = {
        serviceGroupId: localStorage.getItem('credentialKey'),
        newValue: newValue,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the value in the UI
      setEditedValue(newValue);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  useEffect(() => {
    fetchLedgerByAccountIdbydrop(idbyDrop.CanId);
  }, [idbyDrop]);
  const fetchCustomerAccountDetailbydrop = async (CanId) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/getCustomerAccountDetail';
      // console.log("dshfvdsfhdsf", CanId)
      const data = {
        serviceGroupId: CanId
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log("kawaskai", result.data);
      setInvoicedt(result.data)
      if (result.meta.code == 200) {

        fetchSubscriptionListbydrop(result.data.orgId, result.data.accountNo)
      }
      setOrgNumberbydrop(result.data.orgId)
      setServiceGroupNumberbydrop(result.data.accountNo)
      setPfOrgNoValues(result.data.orgId)
      setPfServiceGpNoValues(result.data.accountNo)



      // Further processing of the result data can be done here
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchSubscriptionListbydrop = async (orgId, accountNo) => {
    try {

      const url = process.env.REACT_APP_API_URL + '/getSubscriptionList';
      // console.log("1111", orgId)
      // console.log("1111", accountNo)

      const data = {
        orgNumber: orgId,
        serviceGroupNumber: accountNo
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log('getSubscriptionList22', result.data);
      // if(result.meta.code == 200){
      //   fetchSubscriptionListbydrop(result.data.orgId ,result.data.accountNo )
      // }
      var activationDate2 = new Date(result.data[0].startdt)
      // var activationDate2 =result.data[0].startdt? new Date(result.data[0].startdt) : ""
      // console.log("erwrwrwe", activationDate2)
      // setActDatebydrop(activationDate2.toLocaleDateString('en-GB'));
      var options2 = { day: 'numeric', month: 'short', year: '2-digit' };
      var formattedDate = activationDate2.toLocaleDateString('en-GB', options2);

      var formattedMonth = formattedDate.split(' ')[1]; // Extract the abbreviated month name
      var formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year

      // Pad the day with a leading zero if it's a single-digit number
      var formattedDay = activationDate2.getDate().toString().padStart(2, '0');

      var formattedResult2 = `${formattedDay} ${formattedMonth}'${formattedYear}`;
      // console.log("new date change 2", formattedResult2);
      setActDatebydrop(formattedResult2);
      setCheckDatebydrop(true);
      // console.log("qqqqq", activationDate2.toLocaleDateString('en-GB'))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchLedgerByAccountIdbydrop = async (CanId) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/getLedgerByAccountId';
      const data = {
        actId: CanId,

      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log('LedgerByAccountId', result.data);
      if (result.meta.code == 200) {
        fetchStatutoryDatabydrop(result.data.ledgerActNo)
      }
      setLedgerId(result.data.ledgerActNo);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchStatutoryDatabydrop = async (ledgerActNo) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/getStatutoryData';

      const data = {
        ledgerAccountNo: ledgerActNo,

      };
      // console.log("jake", ledgerActNo)
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log('StatutoryDatabydropasasasa', result.data);
      setLedgerId(result.data);


      // Convert the object to an array

      const statutoryDataArraybydrop = Object.values(result.data);
      // console.log('dara', statutoryDataArraybydrop);




      // Find the object with statutoryTypeNo: 13

      const gstObjectbydrop = statutoryDataArraybydrop.find((item) => item.statutoryTypeNo === 13);

      if (gstObjectbydrop) {

        // Extract the value for GST Number

        setGstNumberbydrop(gstObjectbydrop.value);

      } else {

        // Handle the case where gstObject is not available

        setGstNumberbydrop("NA"); // Set a default value or empty string

        // console.log("GST Number not available");

      }

      // Find the object with statutoryTypeNo: 11

      const panObjectbydrop = statutoryDataArraybydrop.find((item) => item.statutoryTypeNo === 11);

      if (panObjectbydrop) {

        // Extract the value for PAN Number

        setPanNobydrop(panObjectbydrop.value);

      } else {

        // Handle the case where panNO is not available

        setPanNobydrop("NA"); // Set a default value or empty string

        // console.log("PAN Number not available");

      }




      // Find the object with statutoryTypeNo: 9

      const tanObjectbydrop = statutoryDataArraybydrop.find((item) => item.statutoryTypeNo === 9);

      if (tanObjectbydrop) {

        // Extract the value for statutoryTypeNo: 9

        setTanbydrop(tanObjectbydrop.value);

      } else {

        // Handle the case where tanObject is not available

        setTanbydrop("NA"); // Set a default value or empty string

        // console.log("Tan value not available");

      }




      // Find the object with statutoryTypeNo: 12

      const tdsObjectbydrop = statutoryDataArraybydrop.find((item) => item.statutoryTypeNo === 12);

      if (tdsObjectbydrop) {

        // Extract the value for statutoryTypeNo: 12

        setTdsbydrop(tdsObjectbydrop.value);

      } else {

        // Handle the case where tdsObject is not available

        setTdsbydrop("NA"); // Set a default value or empty string

        // console.log("Tds value not available");

      }


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // ishan  for pinnedfeatureclick api's

  const fetchCustomerAccountDetailbyPfeature = async (CanId) => {

    try {
      const url = process.env.REACT_APP_API_URL + '/getCustomerAccountDetail';

      // Access the CanId from pfValues to use as serviceGroupId in the data object
      const data = {
        serviceGroupId: CanId,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });



      const result = await response.json();
      // console.log("tesla", result.data);
      setPfAccValues(result.data)
      setMyflag(true);

      if (result.meta.code == 200) {
        fetchSubscriptionListbyPfeature(result.data.orgId, result.data.accountNo)
        fetchLedgerByAccountIdbyPfeature(CanId)
      }

      setPfOrgNoValues(result.data.orgId)
      setPfServiceGpNoValues(result.data.accountNo)


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchSubscriptionListbyPfeature = async (pfOrgNoValues, pfServiceGpNoValues) => {
    try {

      const url = process.env.REACT_APP_API_URL + '/getSubscriptionList';
      // console.log("tesla12", pfOrgNoValues)
      // console.log("tesla13", pfServiceGpNoValues)

      const data = {
        orgNumber: pfOrgNoValues,
        serviceGroupNumber: pfServiceGpNoValues
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not olaaa');
      }
      const result = await response.json();
      // console.log('tesla123', result.data);

      var activationDate3 = new Date(result.data[0].startdt)
      var options = { day: 'numeric', month: 'short', year: '2-digit' };
      var formattedDate = activationDate3.toLocaleDateString('en-GB', options);

      var formattedMonth = formattedDate.split(' ')[1]; // Extract the abbreviated month name
      var formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year

      // Pad the day with a leading zero if it's a single-digit number
      var formattedDay = activationDate3.getDate().toString().padStart(2, '0');

      var formattedResult = `${formattedDay} ${formattedMonth}'${formattedYear}`;
      // console.log("new data change", formattedResult);
      setPfActDateValues(formattedResult);





      setCheckDatebyPf(true);
      // console.log("Pf Activation date", activationDate3.toLocaleDateString('en-GB'))

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchLedgerByAccountIdbyPfeature = async (CanId) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/getLedgerByAccountId';
      const data = {
        actId: CanId,

      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      // console.log('tesla15', result.data);
      if (result.meta.code == 200) {
        fetchStatutoryDatabyPfeature(result.data.ledgerActNo)
      }
      setPfLedgerActNoValues(result.data.ledgerActNo);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchStatutoryDatabyPfeature = async (ledgerActNo) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/getStatutoryData';

      const data = {
        ledgerAccountNo: ledgerActNo,

      };
      // console.log("jakepaul", ledgerActNo)
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result2 = await response.json();
      // console.log('StatutoryDatabydropasasasa', result2.data);



      // Convert the object to an array

      const statutoryDataArraybyPfeature = Object.values(result2.data);
      // console.log('dara', statutoryDataArraybyPfeature);




      // Find the object with statutoryTypeNo: 13

      const gstObjectbyPfeature = statutoryDataArraybyPfeature.find((item) => item.statutoryTypeNo === 13);

      if (gstObjectbyPfeature) {

        // Extract the value for GST Number

        setPfGstNo(gstObjectbyPfeature.value);

      } else {

        // Handle the case where gstObject is not available

        setPfGstNo("NA"); // Set a default value or empty string



      }

      // Find the object with statutoryTypeNo: 11

      const panObjectbyPfeature = statutoryDataArraybyPfeature.find((item) => item.statutoryTypeNo === 11);

      if (panObjectbyPfeature) {

        // Extract the value for PAN Number

        setPfpanNo(panObjectbyPfeature.value);

      } else {

        // Handle the case where panNO is not available

        setPfpanNo("NA"); // Set a default value or empty string



      }




      // Find the object with statutoryTypeNo: 9

      const tanObjectbyPfeature = statutoryDataArraybyPfeature.find((item) => item.statutoryTypeNo === 9);

      if (tanObjectbyPfeature) {

        // Extract the value for statutoryTypeNo: 9

        setPfTan(tanObjectbyPfeature.value);

      } else {

        // Handle the case where tanObject is not available

        setPfTan("NA"); // Set a default value or empty string



      }




      // Find the object with statutoryTypeNo: 12

      const tdsObjectbyPfeature = statutoryDataArraybyPfeature.find((item) => item.statutoryTypeNo === 12);

      if (tdsObjectbyPfeature) {

        // Extract the value for statutoryTypeNo: 12

        setPfTds(tdsObjectbyPfeature.value);

      } else {

        // Handle the case where tdsObject is not available

        setPfTds("NA"); // Set a default value or empty string



      }


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // end
  async function modifyTransaction(transactionList) {
    // console.log(transactionList);
    let TransactionHistoryList = transactionList.filter((el) => el.voucherType !== "Sale / Invoice Voucher");
    // console.log("getTransactionHistoryListByOrgNo", TransactionHistoryList);
    // Map through the array and change the voucherType
    const modifiedData = TransactionHistoryList.map((item) => {
      if (item.voucherTypeId === 3) {
        return {
          ...item,
          voucherType: "Payment",
        };
      } else if (item.voucherTypeId === 7) {
        return {
          ...item,
          voucherType: "Settlement (Debit)",
        };
      } else if (item.voucherTypeId === 8) {
        return {
          ...item,
          voucherType: "Settlement (Credit)",
        };
      }
      return item;
    });
    // console.log("modifyTransaction", modifiedData);
    return modifiedData;
  }

  useEffect(() => {
    async function invoiceByOrgNo() {
      // -----AreaList Api----
      const urlAreaList = process.env.REACT_APP_API_URL + '/getAreaLists';
      // const data = { groupID: groupID, companyID: companyID, locationID: locationID };
      const dataAreaSol = {
        "groupID": groupID,
        "companyID": (crm_role == "L3") ? companyID : "",
        "locationID": (crm_role == "L3") ? locationID : ""
      }
      const responseAreaList = await fetch(urlAreaList, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataAreaSol)
      });
      const resultAreaList = await responseAreaList.json();
      // console.log("getAreaLists", resultAreaList.data);
      // setGetAreaLists(resultAreaList.data);


      // -----SolutionList Api----
      const urlSolutionLists = process.env.REACT_APP_API_URL + '/getSolutionLists';
      // const data2 = {groupID: groupID, companyID: companyID, locationID: locationID}; //, fromDate: "2022-01-01", toDate: "2023-01-20"

      const responseSolutionLists = await fetch(urlSolutionLists, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataAreaSol)
      });
      const resultSolutionLists = await responseSolutionLists.json();
      // console.log("getSolutionLists", resultSolutionLists.data);

      //----------Merge AreaList And SolutionList---------
      let mergedAreaSol;
      mergedAreaSol = resultAreaList.data.map((item) => {
        const matchingItem = resultSolutionLists.data.find((el) => el.CanId === item.CanId);
        if (matchingItem) {
          return {
            ...item,
            SegmentName: matchingItem.SegmentName,
            PlanName: matchingItem.PlanName
          };
        }
        return null;
      })
        .filter((item) => item !== null); // Remove null entries from the array
      // console.log("mergedAreaSol:", mergedAreaSol);
      setMergedAreaProd(mergedAreaSol);
      //----------Merge AreaList And SolutionList   for Auto Selection Dropdown MApping---------
      let mergedDrop;
      mergedDrop = resultAreaList.data.map((item) => {
        const matchingItem = resultSolutionLists.data.find((el) => el.CanId === item.CanId);
        if (matchingItem) {
          return {
            ...item,
            SegmentName: matchingItem.SegmentName,
            PlanName: matchingItem.PlanName
          };
        }
        return null;
      })
        .filter((item) => item !== null); // Remove null entries from the array
      // console.log("mergedDrop:", mergedDrop);



      const filteredAutoData = mergedDrop.filter((item) => item.CanId === localStorage.getItem('credentialKey'));
      // console.log("hi", filteredAutoData)
      setAutoCity(filteredAutoData[0]);
      setAutoArea(filteredAutoData[0]);
      setAutoSegment(filteredAutoData[0]);



      //  end
      // if (crmRole === "L2" && segment !== "OBB") {
      const uniqueLocation = Array.from(new Set(mergedAreaSol.map((area) => area.LocationName)));
      SetUniqueLocation(uniqueLocation);
      // console.log(uniqueLocation);



      // -------getCustomerAccountDetail------
      let mergeTransaction = [];
      let mergeInvoice = [];
      // mergedAreaSol.forEach(async (obj) => {
      const fetchTransactions = mergedAreaSol.map(async (obj) => {
        // console.log(obj.CanId);
        const url = process.env.REACT_APP_API_URL + '/getCustomerAccountDetail';
        // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
        const data = { serviceGroupId: obj.CanId }
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        //  console.log("getCustomerAccountDetail", result.data.orgId);

        if (result.data.orgId) {
          const url2 = process.env.REACT_APP_API_URL + '/getInvoiceByOrgNo';
          const orgno = result.data.orgId;
          const data2 = { orgno: orgno }

          const response2 = await fetch(url2, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data2)
          });
          const result2 = await response2.json();
          const invoiceList = result2.data;
          //  console.log("invoiceByOrgNo", result2.data);

          // Sort the array in descending order based on the date
          if (Array.isArray(invoiceList)) {

            invoiceList.sort((a, b) => new Date(b.invoicedt) - new Date(a.invoicedt));

          }
          // console.log(invoiceList);
          // let logInCanIdInvoice = invoiceList.filter((item) => item.CanId === localStorage.getItem('credentialKey'));
          if (obj.CanId === localStorage.getItem('credentialKey')) {
            const canInvoice = {
              orgno: orgno,
              ...obj,
              invoiceList
            }
            // console.log("setSingleInvoive", canInvoice);
            setSingleInvoive(canInvoice);
          }


          let top3Invoice;
          if (Array.isArray(invoiceList)) {
            top3Invoice = invoiceList.slice(0, 3);
            // Use the top3Invoice array as needed
          }
          // console.log(top3Invoice);

          // Mergerd Area, Solition And Top 3 Invoice of each canID
          const filteredInvoiceList = {
            orgno: orgno,
            ...obj,
            top3Invoice
          }
          // console.log(filteredInvoiceList);
          mergeInvoice.push(filteredInvoiceList);


          const url3 = process.env.REACT_APP_API_URL + '/getTransactionHistoryListByOrgNo';
          const currectDate = new Date();
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
          //  console.log(currectDate, "/", oneMonthAgo);

          const data3 = {
            organisationNo: orgno,
            fromDate: oneMonthAgo,
            toDate: currectDate
          }
          const response3 = await fetch(url3, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data3)
          });
          const result3 = await response3.json();
          // console.log("getTransactionHistoryListByOrgNo", result3.data);

          // Naveen
          const TransactionHistoryList = result3.data.length > 0 && result3.data.filter((el) => el.voucherType !== "Sale / Invoice Voucher");
          if (TransactionHistoryList.length > 0) {
            // console.log("getTransactionHistoryListByOrgNo", TransactionHistoryList);
            // Map through the array and change the voucherType
            const modifiedData = TransactionHistoryList.map((item) => {
              if (item.voucherTypeId === 3) {
                return {
                  ...item,
                  voucherType: "Payment",
                };
              } else if (item.voucherTypeId === 7) {
                return {
                  ...item,
                  voucherType: "Settlement (Debit)",
                };
              } else if (item.voucherTypeId === 8) {
                return {
                  ...item,
                  voucherType: "Settlement (Credit)",
                };
              }
              return item;
            });
            // console.log(modifiedData);

            // Sort the array in descending order based on the date
            modifiedData.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));

            if (obj.CanId === localStorage.getItem('credentialKey')) {
              const canTrans = {
                orgno: orgno,
                ...obj,
                modifiedData
              }
              // console.log("setSingleTrans", canTrans);
              setSingleTrans(canTrans);
            }

            // Select the top 2 objects
            const top3TransactionHistory = modifiedData.slice(0, 3);
            // console.log(top3TransactionHistory);

            // Mergerd Area, Solition And Top 3 Invoice of each canID
            const filteredTop3TransactionHistory = {
              orgno: orgno,
              ...obj,
              top3TransactionHistory
            }

            // console.log(filteredTop3TransactionHistory);
            mergeTransaction.push(filteredTop3TransactionHistory);
            return filteredTop3TransactionHistory;

          }
        }
      });
      await Promise.all(fetchTransactions);
      // console.log("mergeTransaction", mergeTransaction);
      setFinalTransactionHistory(mergeTransaction);
      // console.log("mergeInvoice", mergeInvoice);
      setFinalInvoiceDetails(mergeInvoice);

      // }
    }
    invoiceByOrgNo();

  }, []);
  async function selectedOrg(dropdownSelectedCanId, fromDate) {
    // console.log("dropdownSelectedCanId", dropdownSelectedCanId, fromDate);
    if (dropdownSelectedCanId[0].orgno) {
      const url2 = process.env.REACT_APP_API_URL + '/getInvoiceByOrgNo';
      const data2 = { orgno: dropdownSelectedCanId[0].orgno }

      const response2 = await fetch(url2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data2)
      });
      const result2 = await response2.json();
      if (result2.data.length > 0) {
        const invoiceList = result2.data;
        // console.log("invoiceByOrgNo", result2.data);
        if (Array.isArray(invoiceList)) {

          invoiceList.sort((a, b) => new Date(b.enddt) - new Date(a.enddt));

        }
        const filteredInvoice = invoiceList.filter(obj => new Date(obj.invoicedt) > new Date(fromDate));


        return {
          CanId: dropdownSelectedCanId[0].CanId,
          LocationName: dropdownSelectedCanId[0].LocationName,
          AreaName: dropdownSelectedCanId[0].AreaName,
          SegmentName: dropdownSelectedCanId[0].SegmentName,
          OrgNo: dropdownSelectedCanId[0].orgno,
          PlanName: dropdownSelectedCanId[0].PlanName,
          filteredInvoice
        };
      }
      return {
        CanId: "",
        LocationName: "",
        AreaName: "",
        SegmentName: "",
        OrgNo: "",
        PlanName: "",
        filteredInvoice: []
      };
    }
  }
  async function dropdownSelection(dropdownValue, selectedDropdown) {
    // console.log("selectedDropdown:", selectedDropdown, "DropdownValue:", dropdownValue);    
    setSelectedRange("Select Period");
    if (selectedDropdown === "city") {
      // sessionStorage.removeItem('pinnedClicked');
      setPinnedClickedData(false);
      setAllCityFlag(true);


      if (dropdownValue === "Select All City") {
        invoiceTransList();
        setLogInLocation(false);
        setLogInArea(false);
        setLogInSegment(false);
        setPinnedFlag(true);
        setFinalDropdownSelection(false);
        setSelectedCity(false);
        setSelectedArea(false);
        setSelectedProduct(false);
        setSelectedPeriod(false);
        setUniqueAreaList(false);
      } else {
        setLogInLocation(false);
        setLogInArea(false);
        setLogInSegment(false);
        setUniqueAreaList(false);
        setPinnedFlag(true);

        const filteredAreaList = getMergedAreaProd.filter(item => item.LocationName === dropdownValue);
        // const updatedMergedAreaSol = filteredAreaList.map(item => ({
        //   ...item,
        //   AreaName: item.AreaName !== "" ? item.AreaName : item.LocationName
        // }));
        // console.log(updatedMergedAreaSol);
        const uniqueAreaList = Array.from(new Set(filteredAreaList.map((area) => area.AreaName)));
        // console.log(uniqueAreaList);
        setSelectedArea(false);
        setSelectedProduct(false);
        setSelectedPeriod(false);
        setSelectedCity(dropdownValue);
        setUniqueAreaList(uniqueAreaList);
      }
    } else if (selectedDropdown === "area") {
      const filteredProductList = getMergedAreaProd.filter(item => item.AreaName === dropdownValue);
      // console.log(dropdownValue);
      setLogInSegment(false);
      setSelectedProduct(false);
      setSelectedPeriod(false);
      setSelectedArea(dropdownValue);
      setUniqueProductList(filteredProductList);
    } else if (selectedDropdown === "segment") {
      // console.log(dropdownValue);
      let selectedCanId = dropdownValue[1];
      setSelectedCanId(dropdownValue[1]);
      setSelectedProduct(dropdownValue[0] + " (" + dropdownValue[1] + ")");
      setSelectedPeriod(false);
      // console.log(dropdownValue);
    } else if (selectedDropdown === "period") {

      const selectedPeriodValue = dropdownValue.target.getAttribute('value');
      setSelectedPeriod(selectedPeriodValue);
      const selectedPeriod = dropdownValue.target.getAttribute('data-value');
      // console.log("selectedPeriod", selectedPeriod);

      let fromDate;
      const currentDate = new Date();
      if (selectedPeriod === "1") {
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

      } else if (selectedPeriod === "2") {
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());

      } else if (selectedPeriod === "3") {
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());

      } else if (selectedPeriod === "4") {
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 9, currentDate.getDate());

      } else if (selectedPeriod === "5") {
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, currentDate.getDate());
      } else if (selectedPeriod === "6") {
        // $(`#${'reportrange'}`).daterangepicker();
      }

      pinnedFetchData(fromDate);
      invoiceListOne(fromDate);

      if (getFinalInvoiceDefault) {
        // console.log("fromDate", fromDate);
        let matches = getSelectedProduct.match(/\((\d+)\)/);
        let SelectedServiceID = matches[1];
        // console.log("SelectedServiceID", SelectedServiceID);
        // console.log("getFinalInvoiceDefault", getFinalInvoiceDefault);
        const dropdownSelectedCanId = getFinalInvoiceDefault.filter(item => item.CanId === SelectedServiceID);
        // console.log("dropdownSelectedCanId", dropdownSelectedCanId);
        try {
          let orgDetails = await selectedOrg(dropdownSelectedCanId, fromDate);
          // console.log(orgDetails);
          setFinalDropdownSelection(orgDetails);

        } catch (error) {
          console.error(error);
        }
      }


      setSelectedPeriod(selectedPeriodValue);

    }
  }


  async function selectedOrgTrans(dropdownSelectedCanId, fromDate) {
    // console.log("dropdownSelectedCanId", dropdownSelectedCanId, fromDate);

    if (dropdownSelectedCanId[0].orgno) {
      const url3 = process.env.REACT_APP_API_URL + '/getTransactionHistoryListByOrgNo';
      let currectDate = new Date();

      const data3 = {
        organisationNo: dropdownSelectedCanId[0].orgno,
        fromDate: fromDate,
        toDate: currectDate
      }
      const response3 = await fetch(url3, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data3)
      });
      const result3 = await response3.json();
      let transactions = result3.meta.Status ? await modifyTransaction(result3.data) : [];
      // console.log("orgDetailsTrans",transactionData);
      if (transactions.length > 0) {
        // const transactions = result3.data;
        transactions.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
        // console.log("transactions", transactions);
        const transactionHistory = transactions.filter(obj => new Date(obj.transactionDate) > new Date(fromDate));


        return {
          CanId: dropdownSelectedCanId[0].CanId,
          LocationName: dropdownSelectedCanId[0].LocationName,
          AreaName: dropdownSelectedCanId[0].AreaName,
          SegmentName: dropdownSelectedCanId[0].SegmentName,
          OrgNo: dropdownSelectedCanId[0].orgno,
          PlanName: dropdownSelectedCanId[0].PlanName,
          transactionHistory
        };
      }
      return {
        CanId: "",
        LocationName: "",
        AreaName: "",
        SegmentName: "",
        OrgNo: "",
        PlanName: "",
        transactionHistory: []
      };
    }
  }

  async function dropdownSelectionTransaction(dropdownValue, selectedDropdown) {
    // console.log("selectedDropdown:", selectedDropdown, "DropdownValue:", dropdownValue);    
    setSelectedRangeTrans("Select Period");
    if (selectedDropdown === "city") {
      // sessionStorage.removeItem('pinnedClicked');
      setPinnedClickedData(false);
      setAllCityFlag(true);

      if (dropdownValue === "Select All City") {
        invoiceTransList();
        setLogInLocationT(false);
        setLogInAreaT(false);
        setLogInSegmentT(false);
        setPinnedFlag(true);
        pinnedFetchData();
        setFinalDropdownSelectionTrans(false);
        setSelectedCityTrans(false);
        setSelectedAreaTrans(false);
        setSelectedProductTrans(false);
        setSelectedPeriodTrans(false);
      } else {
        setLogInLocationT(false);
        setLogInAreaT(false);
        setLogInSegmentT(false);
        setUniqueAreaList(false);
        const filteredAreaList = getMergedAreaProd.filter(item => item.LocationName === dropdownValue);
        const uniqueAreaList = Array.from(new Set(filteredAreaList.map((area) => area.AreaName)));
        // console.log(dropdownValue);
        // setPinnedSessionData(false);
        setPinnedFlag(true);
        setSelectedAreaTrans(false);
        setSelectedProductTrans(false);
        setSelectedPeriodTrans(false);
        setSelectedCityTrans(dropdownValue);
        setUniqueAreaListTrans(uniqueAreaList);
      }
    } else if (selectedDropdown === "area") {
      const filteredProductList = getMergedAreaProd.filter(item => item.AreaName === dropdownValue);
      // console.log(dropdownValue);
      setLogInSegment(false);
      setSelectedProductTrans(false);
      setSelectedPeriodTrans(false);
      setSelectedAreaTrans(dropdownValue);
      setUniqueProductListTrans(filteredProductList);
    } else if (selectedDropdown === "segment") {
      let selectedCanId = dropdownValue[1];
      setSelectedCanIdTrans(dropdownValue[1]);
      setSelectedProductTrans(dropdownValue[0] + " (" + dropdownValue[1] + ")");
      setSelectedPeriodTrans(false);
      // console.log(dropdownValue);
    } else if (selectedDropdown === "period") {

      // setPinnedClickedTransData(false)
      // setPinnedSessionData(false)
      const selectedPeriodValue = dropdownValue.target.getAttribute('value');
      setSelectedPeriodTrans(selectedPeriodValue);
      const selectedPeriod = dropdownValue.target.getAttribute('data-value');
      // console.log("selectedPeriod", selectedPeriod);

      let fromDate;
      const currentDate = new Date();
      if (selectedPeriod === "1") {
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());

      } else if (selectedPeriod === "2") {
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());

      } else if (selectedPeriod === "3") {
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());

      } else if (selectedPeriod === "4") {
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 9, currentDate.getDate());

      } else if (selectedPeriod === "5") {
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, currentDate.getDate());
      }

      pinnedFetchData(fromDate);
      TransactionListOne(fromDate);

      if (getFinalInvoiceDefault) {
        // console.log("fromDate", fromDate);
        let matches = getSelectedProductTrans.match(/\((\d+)\)/);
        let SelectedServiceID = matches[1];
        // console.log("SelectedServiceID", SelectedServiceID);
        const dropdownSelectedCanId = getFinalInvoiceDefault.filter(item => item.CanId === SelectedServiceID);
        // console.log("dropdownSelectedCanId" ,dropdownSelectedCanId);
        try {
          let orgDetails = await selectedOrgTrans(dropdownSelectedCanId, fromDate);
          // console.log("orgDetailsTrans",orgDetails);          
          setFinalDropdownSelectionTrans(orgDetails);

        } catch (error) {
          console.error(error);
        }
      }
      setSelectedPeriodTrans(selectedPeriodValue);
    }
  }
  async function getInvoice(invoiceNo, action) {
    // console.log("action", action);
    // console.log("invoiceNo", invoiceNo);
    //----------Get Invoice ----------//
    const url = process.env.REACT_APP_API_URL + '/getInvoice';
    // const url = "http://localhost:4001/getInvoiceTry"
    const data = {
      arg0: invoiceNo

    }
    const response = await fetch(url, {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json'

      },

      body: JSON.stringify(data)

    });

    const result = await response.json();

    const invoiceHtml = result.data;
    // console.log(result.data);
    setInvoiceHtml(result.data);

    if (action === "download") {

      // console.log("inside download");

      const bufferData = result.data.data; // Extract the Buffer data array
      // working code start

      const uint8Array = new Uint8Array(bufferData);

      const blob = new Blob([uint8Array], { type: 'application/pdf' });


      const url = URL.createObjectURL(blob);


      const a = document.createElement('a');
      a.href = url;
      a.download = `${invoiceNo}.pdf`;
      a.click();

      URL.revokeObjectURL(url);
      // end
      // console.log("content",content);
      // html view start

      // const newWindow = window.open('', '_blank');
      // newWindow.document.write(result.data);
      // newWindow.document.close();
      // Convert HTML to PDF
      // Convert HTML to PDF


      // end
    } else if (action === "share") {
      // console.log("result.data.data", result.data.data);
      const bufferData = result.data.data;
      const uint8Array = new Uint8Array(bufferData);

      const blob = new Blob([uint8Array], { type: 'application/pdf' });
      const pdfFile = new File([blob], `${invoiceNo}.pdf`, { type: 'application/pdf' });
      await navigator.share({
        files: [pdfFile],
      });
    }

  }

  useEffect(() => {

    async function fetchCustomerAccountDetail() {

      try {

        const url = process.env.REACT_APP_API_URL + '/getCustomerAccountDetail';

        const data = {

          serviceGroupId: localStorage.getItem('credentialKey')




        };




        const response = await fetch(url, {

          method: 'POST',

          headers: {

            'Content-Type': 'application/json'

          },

          body: JSON.stringify(data)

        });




        if (!response.ok) {

          throw new Error('Network response was not ok');

        }




        const result = await response.json();

        // console.log('getCustomerAccountDetail', result.data);

        setId(result.data);

        // const orgNumber = result.data.orgId;

        // const serviceGroupNumber = result.data.accountNo;

        // fetchDate(orgNumber,serviceGroupNumber);

        setOrgNumber(result.data.orgId);

        setServiceGroupNumber(result.data.accountNo)

        // Call the second API here, after setting the orgNumber and serviceGroupNumber

        fetchDate(result.data.orgId, result.data.accountNo);




        // Further processing of the result data can be done here

      } catch (error) {

        console.error('Error fetching data:', error);

      }

    }




    fetchCustomerAccountDetail();











    async function fetchDate(orgNumber, serviceGroupNumber) {

      try {

        const url = process.env.REACT_APP_API_URL + '/getSubscriptionList';

        const data = {

          orgNumber: orgNumber,

          serviceGroupNumber: serviceGroupNumber

        };




        const response = await fetch(url, {

          method: 'POST',

          headers: {

            'Content-Type': 'application/json'

          },

          body: JSON.stringify(data)

        });




        if (!response.ok) {

          throw new Error('Network response was not ok');

        }




        const result = await response.json();

        // console.log('getSubscriptionList', result.data);




        var activationDate = result.data[0].startdt ? new Date(result.data[0].startdt) : ""

        // setActDate(activationDate.toLocaleDateString('en-GB'));
        var formattedDate3 = "";

        if (activationDate) {
          const options = {
            day: '2-digit',
            month: 'short',
            year: '2-digit',
          };

          formattedDate3 = activationDate.toLocaleDateString('en-GB', options);
          const formattedYear = formattedDate3.split(' ')[2].slice(-2); // Extract last two digits of the year
          formattedDate3 = `${formattedDate3.slice(0, -2)} '${formattedYear}`; // Combine date, month, and formatted year
        }

        setActDate(formattedDate3);




      } catch (error) {

        console.error('Error fetching data:', error);

      }

    }




    // fetchDate();







    async function fetchLedgerByAccountId() {

      try {

        const url = process.env.REACT_APP_API_URL + '/getLedgerByAccountId';

        const data = {

          actId: localStorage.getItem('credentialKey')

        };




        const response = await fetch(url, {

          method: 'POST',

          headers: {

            'Content-Type': 'application/json'

          },

          body: JSON.stringify(data)

        });




        if (!response.ok) {

          throw new Error('Network response was not ok');

        }




        const result = await response.json();

        // console.log('getLedgerByAccountId', result.data);

        return result.data; // Return the data to be used in the next fetch

      } catch (error) {

        console.error('Error fetching data:', error);

        return null;

      }

    }




    async function fetchStatutoryData() {

      try {

        const ledgerData = await fetchLedgerByAccountId(); // Call the first API and get the result data

        if (!ledgerData) {

          // You may handle the case where there is no valid data from the first API

          console.error('No data from the first API');

          return;

        }




        const url = process.env.REACT_APP_API_URL + '/getStatutoryData';

        const data = {

          ledgerAccountNo: ledgerData.ledgerActNo // Use the relevant value from the first API's result data

        };




        const response = await fetch(url, {

          method: 'POST',

          headers: {

            'Content-Type': 'application/json'

          },

          body: JSON.stringify(data)

        });




        if (!response.ok) {

          throw new Error('Network response was not ok');

        }




        const result = await response.json();

        // console.log('getStatutoryData', result.data);

        // Convert the object to an array

        const statutoryDataArray = Object.values(result.data);




        // Find the object with statutoryTypeNo: 13

        const gstObject = statutoryDataArray.find((item) => item.statutoryTypeNo === 13);

        if (gstObject) {

          // Extract the value for GST Number

          setGstNumber(gstObject.value);

        } else {

          // Handle the case where gstObject is not available

          setGstNumber(""); // Set a default value or empty string

          // console.log("GST Number not available");

        }

        // Find the object with statutoryTypeNo: 11

        const panObject = statutoryDataArray.find((item) => item.statutoryTypeNo === 11);

        if (panObject) {

          // Extract the value for PAN Number

          setPanNo(panObject.value);

        } else {

          // Handle the case where panNO is not available

          setPanNo("NA"); // Set a default value or empty string

          // console.log("PAN Number not available");

        }




        // Find the object with statutoryTypeNo: 9

        const tanObject = statutoryDataArray.find((item) => item.statutoryTypeNo === 9);

        if (tanObject) {

          // Extract the value for statutoryTypeNo: 9

          setTan(tanObject.value);

        } else {

          // Handle the case where tanObject is not available

          setTan(""); // Set a default value or empty string

          // console.log("Tan value not available");

        }




        // Find the object with statutoryTypeNo: 12

        const tdsObject = statutoryDataArray.find((item) => item.statutoryTypeNo === 12);

        if (tdsObject) {

          // Extract the value for statutoryTypeNo: 12

          setTds(tdsObject.value);

        } else {

          // Handle the case where tdsObject is not available

          setTds(""); // Set a default value or empty string

          // console.log("Tds value not available");

        }

      } catch (error) {

        console.error('Error fetching data:', error);

      }

    }




    fetchStatutoryData(); // This will trigger the flow and call both APIs in sequence

  }, []);

  async function selectedOrg2(orgno, fromDate) {
    // console.log("dropdownSelectedCanId", orgno, fromDate);
    if (orgno) {
      const url2 = process.env.REACT_APP_API_URL + '/getInvoiceByOrgNo';
      const data2 = { orgno: orgno }

      const response2 = await fetch(url2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data2)
      });
      const result2 = await response2.json();
      if (result2.data.length > 0) {
        const invoiceList = result2.data;
        // console.log("invoiceByOrgNo", result2.data);
        if (Array.isArray(invoiceList)) {
          invoiceList.sort((a, b) => new Date(b.invoicedt) - new Date(a.invoicedt));
        }
        const filteredInvoice = invoiceList.filter(obj => new Date(obj.invoicedt) > new Date(fromDate));
        // console.log("filteredInvoice", filteredInvoice);

        return filteredInvoice;
      }
    }
  }

  async function invoiceTransDefaultList() {
    // -----AreaList Api----
    const urlAreaList = process.env.REACT_APP_API_URL + '/getAreaLists';
    // const data = { groupID: groupID, companyID: companyID, locationID: locationID };
    const dataAreaSol = {
      "groupID": groupID,
      "companyID":  (crm_role == "L3") ? companyID : "",
      "locationID":  (crm_role == "L3") ? locationID : ""
    }
    const responseAreaList = await fetch(urlAreaList, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataAreaSol)
    });
    const resultAreaList = await responseAreaList.json();
    // console.log("getAreaLists", resultAreaList.data);
    // setGetAreaLists(resultAreaList.data);


    // -----SolutionList Api----
    const urlSolutionLists = process.env.REACT_APP_API_URL + '/getSolutionLists';
    // const data2 = {groupID: groupID, companyID: companyID, locationID: locationID}; //, fromDate: "2022-01-01", toDate: "2023-01-20"

    const responseSolutionLists = await fetch(urlSolutionLists, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataAreaSol)
    });
    const resultSolutionLists = await responseSolutionLists.json();
    // console.log("getSolutionLists", resultSolutionLists.data);

    //----------Merge AreaList And SolutionList---------
    let mergedAreaSol;
    mergedAreaSol = resultAreaList.data.map((item) => {
      const matchingItem = resultSolutionLists.data.find((el) => el.CanId === item.CanId && item.SegmentName !== "MS Wi-Fi");
      if (matchingItem) {
        return {
          ...item,
          SegmentName: matchingItem.SegmentName,
          PlanName: matchingItem.PlanName
        };
      }
      return null;
    })
      .filter((item) => item !== null); // Remove null entries from the array
    // console.log("mergedAreaSol:", mergedAreaSol);

    const updatedMergedAreaSol = mergedAreaSol.map(item => ({
      ...item,
      AreaName: item.AreaName !== "" ? item.AreaName : item.LocationName
    }));
    // console.log(updatedMergedAreaSol);
    setMergedAreaProd(updatedMergedAreaSol);


    const uniqueLocation = Array.from(new Set(mergedAreaSol.map((area) => area.LocationName)));
    SetUniqueLocation(uniqueLocation);




    // -------getCustomerAccountDetail------
    let mergeTransaction = [];
    let mergeInvoice = [];
    // mergedAreaSol.forEach(async (obj) => {
    const fetchTransactions = mergedAreaSol.map(async (obj) => {
      // console.log(obj.CanId);
      const url = process.env.REACT_APP_API_URL + '/getCustomerAccountDetail';
      // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
      const data = { serviceGroupId: obj.CanId }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      //  console.log("getCustomerAccountDetail", result.data.orgId);

      if (result.data.orgId) {
        const url2 = process.env.REACT_APP_API_URL + '/getInvoiceByOrgNo';
        const orgno = result.data.orgId;
        const data2 = { orgno: orgno }

        const response2 = await fetch(url2, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data2)
        });
        const result2 = await response2.json();
        const invoiceList = result2.data;
        //  console.log("invoiceByOrgNo", result2.data);

        // Sort the array in descending order based on the date
        if (Array.isArray(invoiceList)) {

          invoiceList.sort((a, b) => new Date(b.invoicedt) - new Date(a.invoicedt));

        }
        // console.log(invoiceList);
        // let logInCanIdInvoice = invoiceList.filter((item) => item.CanId === localStorage.getItem('credentialKey'));
        if (obj.CanId === localStorage.getItem('credentialKey')) {
          const canInvoice = {
            orgno: orgno,
            ...obj,
            invoiceList
          }
          // console.log("setSingleInvoive", canInvoice);
          setSingleInvoive(canInvoice);
        }


        let top3Invoice;
        if (Array.isArray(invoiceList)) {
          top3Invoice = invoiceList.slice(0, 3);
          // Use the top3Invoice array as needed
        }
        // console.log(top3Invoice);

        // Mergerd Area, Solition And Top 3 Invoice of each canID
        const filteredInvoiceList = {
          orgno: orgno,
          ...obj,
          top3Invoice
        }
        // console.log(filteredInvoiceList);
        mergeInvoice.push(filteredInvoiceList);


        const url3 = process.env.REACT_APP_API_URL + '/getTransactionHistoryListByOrgNo';
        const currectDate = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        //  console.log(currectDate, "/", oneMonthAgo);

        const data3 = {
          organisationNo: orgno,
          fromDate: oneMonthAgo,
          toDate: currectDate
        }
        const response3 = await fetch(url3, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data3)
        });
        const result3 = await response3.json();
        // console.log("getTransactionHistoryListByOrgNo", result3.data);

        // Naveen
        const TransactionHistoryList = result3.data.length > 0 && result3.data.filter((el) => el.voucherType !== "Sale / Invoice Voucher");
        if (TransactionHistoryList.length > 0) {
          // console.log("getTransactionHistoryListByOrgNo", TransactionHistoryList);
          // Map through the array and change the voucherType
          const modifiedData = TransactionHistoryList.map((item) => {
            if (item.voucherTypeId === 3) {
              return {
                ...item,
                voucherType: "Payment",
              };
            } else if (item.voucherTypeId === 7) {
              return {
                ...item,
                voucherType: "Settlement (Debit)",
              };
            } else if (item.voucherTypeId === 8) {
              return {
                ...item,
                voucherType: "Settlement (Credit)",
              };
            }
            return item;
          });
          // console.log(modifiedData);

          // Sort the array in descending order based on the date
          modifiedData.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));

          if (obj.CanId === localStorage.getItem('credentialKey')) {
            const canTrans = {
              orgno: orgno,
              ...obj,
              modifiedData
            }
            // console.log("setSingleTrans", canTrans);
            setSingleTrans(canTrans);
          }

          // Select the top 2 objects
          const top3TransactionHistory = modifiedData.slice(0, 3);
          // console.log(top3TransactionHistory);

          // Mergerd Area, Solition And Top 3 Invoice of each canID
          const filteredTop3TransactionHistory = {
            orgno: orgno,
            ...obj,
            top3TransactionHistory
          }

          // console.log(filteredTop3TransactionHistory);
          mergeTransaction.push(filteredTop3TransactionHistory);
          return filteredTop3TransactionHistory;

        }
      }
    });
    await Promise.all(fetchTransactions);
    // console.log("mergeTransaction", mergeTransaction);
    setFinalTransactionDefault(mergeTransaction);
    // console.log("mergeInvoice", mergeInvoice);
    setFinalInvoiceDefault(mergeInvoice);

    const dropdownSelectedCanId = mergeInvoice.filter(item => item.CanId === serviceId);
    // console.log("dropdownSelectedCanId", dropdownSelectedCanId);

    try {
      let currentDate = new Date();
      let fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());
      let orgDetails = await selectedOrg(dropdownSelectedCanId, fromDate);
      let orgDetails2 = await selectedOrgTrans(dropdownSelectedCanId, fromDate);
      // console.log(orgDetails);
      setFinalDropdownSelection(orgDetails);
      setFinalDropdownSelectionTrans(orgDetails2);

    } catch (error) {
      console.error(error);
    }

    // }
  }


  async function invoiceTransList() {
    // -----AreaList Api----
    const urlAreaList = process.env.REACT_APP_API_URL + '/getAreaLists';
    // const data = { groupID: groupID, companyID: companyID, locationID: locationID };
    const dataAreaSol = {
      "groupID": groupID,
      "companyID": (crm_role == "L3") ? companyID : "",
      "locationID":  (crm_role == "L3") ? locationID : ""
    }
    const responseAreaList = await fetch(urlAreaList, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataAreaSol)
    });
    const resultAreaList = await responseAreaList.json();
    // console.log("getAreaLists", resultAreaList.data);
    // setGetAreaLists(resultAreaList.data);


    // -----SolutionList Api----
    const urlSolutionLists = process.env.REACT_APP_API_URL + '/getSolutionLists';
    // const data2 = {groupID: groupID, companyID: companyID, locationID: locationID}; //, fromDate: "2022-01-01", toDate: "2023-01-20"

    const responseSolutionLists = await fetch(urlSolutionLists, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataAreaSol)
    });
    const resultSolutionLists = await responseSolutionLists.json();
    // console.log("getSolutionLists", resultSolutionLists.data);

    //----------Merge AreaList And SolutionList---------
    let mergedAreaSol;
    mergedAreaSol = resultAreaList.data.map((item) => {
      const matchingItem = resultSolutionLists.data.find((el) => el.CanId === item.CanId && item.SegmentName !== "MS Wi-Fi");
      if (matchingItem) {
        return {
          ...item,
          SegmentName: matchingItem.SegmentName,
          PlanName: matchingItem.PlanName
        };
      }
      return null;
    })
      .filter((item) => item !== null); // Remove null entries from the array
    // console.log("mergedAreaSol:", mergedAreaSol);
    setMergedAreaProd(mergedAreaSol);

    // const updatedMergedAreaSol = mergedAreaSol.map(item => ({
    //   ...item,
    //   AreaName: item.AreaName !== "" ? item.AreaName : item.LocationName
    // }));
    const uniqueLocation = Array.from(new Set(mergedAreaSol.map((area) => area.LocationName)));
    SetUniqueLocation(uniqueLocation);
    // console.log(uniqueLocation);



    // -------getCustomerAccountDetail------
    let mergeTransaction = [];
    let mergeInvoice = [];
    // mergedAreaSol.forEach(async (obj) => {
    const fetchTransactions = mergedAreaSol.map(async (obj) => {
      // console.log(obj.CanId);
      const url = process.env.REACT_APP_API_URL + '/getCustomerAccountDetail';
      // const data = {groupID: groupID, companyID: companyID, locationID: locationID};
      const data = { serviceGroupId: obj.CanId }
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      //  console.log("getCustomerAccountDetail", result.data.orgId);

      if (result.data.orgId) {
        const url2 = process.env.REACT_APP_API_URL + '/getInvoiceByOrgNo';
        const orgno = result.data.orgId;
        const data2 = { orgno: orgno }

        const response2 = await fetch(url2, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data2)
        });
        const result2 = await response2.json();
        const invoiceList = result2.data;
        //  console.log("invoiceByOrgNo", result2.data);

        // Sort the array in descending order based on the date
        if (Array.isArray(invoiceList)) {

          invoiceList.sort((a, b) => new Date(b.invoicedt) - new Date(a.invoicedt));

        }
        // console.log(invoiceList);
        // let logInCanIdInvoice = invoiceList.filter((item) => item.CanId === localStorage.getItem('credentialKey'));
        if (obj.CanId === localStorage.getItem('credentialKey')) {
          const canInvoice = {
            orgno: orgno,
            ...obj,
            invoiceList
          }
          // console.log("setSingleInvoive", canInvoice);
          setSingleInvoive(canInvoice);
        }


        let top3Invoice;
        if (Array.isArray(invoiceList)) {
          top3Invoice = invoiceList.slice(0, 3);
          // Use the top3Invoice array as needed
        }
        // console.log(top3Invoice);

        // Mergerd Area, Solition And Top 3 Invoice of each canID
        const filteredInvoiceList = {
          orgno: orgno,
          ...obj,
          top3Invoice
        }
        // console.log(filteredInvoiceList);
        mergeInvoice.push(filteredInvoiceList);


        const url3 = process.env.REACT_APP_API_URL + '/getTransactionHistoryListByOrgNo';
        const currectDate = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        //  console.log(currectDate, "/", oneMonthAgo);

        const data3 = {
          organisationNo: orgno,
          fromDate: oneMonthAgo,
          toDate: currectDate
        }
        const response3 = await fetch(url3, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data3)
        });
        const result3 = await response3.json();
        // console.log("getTransactionHistoryListByOrgNo", result3.data);

        // Naveen
        const TransactionHistoryList = result3.data.length > 0 && result3.data.filter((el) => el.voucherType !== "Sale / Invoice Voucher");
        if (TransactionHistoryList.length > 0) {
          // console.log("getTransactionHistoryListByOrgNo", TransactionHistoryList);
          // Map through the array and change the voucherType
          const modifiedData = TransactionHistoryList.map((item) => {
            if (item.voucherTypeId === 3) {
              return {
                ...item,
                voucherType: "Payment",
              };
            } else if (item.voucherTypeId === 7) {
              return {
                ...item,
                voucherType: "Settlement (Debit)",
              };
            } else if (item.voucherTypeId === 8) {
              return {
                ...item,
                voucherType: "Settlement (Credit)",
              };
            }
            return item;
          });
          // console.log(modifiedData);

          // Sort the array in descending order based on the date
          modifiedData.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));

          if (obj.CanId === localStorage.getItem('credentialKey')) {
            const canTrans = {
              orgno: orgno,
              ...obj,
              modifiedData
            }
            // console.log("setSingleTrans", canTrans);
            setSingleTrans(canTrans);
          }

          // Select the top 2 objects
          const top3TransactionHistory = modifiedData.slice(0, 3);
          // console.log(top3TransactionHistory);

          // Mergerd Area, Solition And Top 3 Invoice of each canID
          const filteredTop3TransactionHistory = {
            orgno: orgno,
            ...obj,
            top3TransactionHistory
          }

          // console.log(filteredTop3TransactionHistory);
          mergeTransaction.push(filteredTop3TransactionHistory);
          return filteredTop3TransactionHistory;

        }
      }
    });
    await Promise.all(fetchTransactions);
    // console.log("mergeTransaction", mergeTransaction);
    setFinalTransactionHistory(mergeTransaction);
    // console.log("mergeInvoice", mergeInvoice);
    setFinalInvoiceDetails(mergeInvoice);

    // }
  }

  useEffect(() => {
    if (crmRole === "L2") {
      // invoiceTransList();
      invoiceTransDefaultList();
    }
  }, [crmRole, segment]);

  useEffect(() => {
    async function canIdDetails() {
      try {
        const url = process.env.REACT_APP_API_URL + '/getSolutionLists';
        const data = {
          groupID: localStorage.getItem("crm_group_id"),
          "companyID": (crm_role == "L3") ? companyID : "",
        "locationID":  (crm_role == "L3") ? locationID : ""
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        // console.log("getSolutionLists", result.data);
        setSolution(result.data)

        const serviceID = localStorage.getItem("credentialKey");

        // Find details in result.data
        const servicePayNow = result.data.find((item) => item.CanId === serviceID);
        // console.log("servicePayNow",servicePayNow);
        setLogInSegment(servicePayNow.SegmentName);
        setLogInSegmentT(servicePayNow.SegmentName);
        setLogInCanId(servicePayNow.CanId);
        setServicePayNow(servicePayNow.PlanName);
        // getServicePayNow.PlanName
      } catch (error) {
        throw new Error('Failed to retrieve area and location details.');
      }
    }

    // Usage  
    canIdDetails();

  }, []);

  useEffect(() => {
    async function getArea() {
      try {
        const url = process.env.REACT_APP_API_URL + '/getAreaLists';
        const data = {
          "groupID": localStorage.getItem("crm_group_id"),
          "companyID": (crm_role == "L3") ? companyID : "",
          "locationID":  (crm_role == "L3") ? locationID : ""
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        // console.log("getArea", result.data);

        const serviceID = localStorage.getItem("credentialKey");

        // Find details in result.data
        const getArea = result.data.find((item) => item.CanId === serviceID);
        // console.log("getArea",getArea.LocationName);
        setLogInLocation(getArea.LocationName);
        setLogInArea(getArea.AreaName);
        setLogInLocationT(getArea.LocationName);
        setLogInAreaT(getArea.AreaName);

        setAreaName(getArea.LocationName);
        // getServicePayNow.PlanName
      } catch (error) {
        throw new Error('Failed to retrieve area and location details.');
      }
    }

    // Usage  
    getArea();

  }, []);






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
    // console.log("button clicked");
    setShowBillingDetailTable(true);
    setShowBillingDetailAdmin(false);
    setShowAdminDetail(false); // Set showAdminDetail to false to go back to the previous state
    setFullDetails(false); // Set fullDetails to false to go back to the previous state
  }

  const navigateToPayNow = (item) => {
    // console.log(item);
    setInvoicePayNowRow(item)
    setShowBillingDetailTable(false);
    setShowBillingDetailAdmin(true);
    setPayNowClick(true);

  };
  const viewUserDetails = () => {
    // console.log("clicked");
    setFullDetails(true);
    setShowAdminLevel(false);
    setShowAdminDetail(true);
  }
  const swiperContainerRef = useRef(null);
  let swiperInstance = null;

  useEffect(() => {
    if (swiperContainerRef.current) {
      swiperInstance = new Swiper(swiperContainerRef.current, {
        slidesPerView: "auto",
        freeMode: true,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }

    return () => {
      if (swiperInstance) {
        swiperInstance.destroy();
      }
    };
  }, []);

  const handleNextSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };




  // useEffect(() => {
  //   var swiper = new Swiper('.tableSwiper', {
  //     slidesPerView: 'auto',
  //     freeMode: true,
  //     spaceBetween: 10,
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev',
  //     },
  //   });

  //   return () => {
  //     // Cleanup Swiper instance when the component unmounts
  //      swiper.destroy();
  //   };
  // }, []);

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

  const [searchTerm, setSearchTerm] = useState([]);

  // const handleSearch = (event) => {
  //   console.log(event.target.value);

  //   setSearchTerm(event.target.value);
  // };
  const handleSearch = (event) => {
    const inputValue = event.target.value;
    const searchTerms = inputValue.split(" ").filter((term) => term.trim() !== "");

    setSearchTerm(searchTerms);
  };

  const handleSearchTrans = (event) => {
    const inputValue2 = event.target.value;
    const searchTerms2 = inputValue2.split(" ").filter((term) => term.trim() !== "");

    setSearchTermTrans(searchTerms2);
  };


  if (crmRole === "L2") {

    return (
      <section className="section-dashboard">
        <div className="">
          <div className="d-flex justify-content-end">
            {/* SIDE NAVBAR  */}
            <SideBar />
            {/* top header */}
            <Header />
            {/* My ACCOUNTS  */}
            <div className="dashboard-main">
              <div className="dashboard-content">
                {/* Navigation tabs: Account details, Billing details, User management */}
                <ul
                  className="nav nav-pills mb-3 account-tab-list"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button

                      className={actTabAcc}

                      id="pills-account-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-account"
                      type="button"
                      role="tab"
                      aria-controls="pills-account"
                      aria-selected="true"
                    >
                      Account Details
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={actTabBill}

                      id="pills-billing-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-billing"
                      type="button"
                      role="tab"
                      aria-controls="pills-billing"
                      aria-selected="false"
                    >
                      Billing Details
                    </button>
                  </li>
                  {/* <li className="nav-item" role="presentation">
                  <button
                    className="nav-link account-tab-btn"
                    id="pills-user-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-user"
                    type="button"
                    role="tab"
                    aria-controls="pills-user"
                    aria-selected="false"
                  >
                    User Management
                  </button>
                </li> */}
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  {/* ****************** ACCOUNT DETAILS TAB ************* */}
                  <div
                    className={actAcc}
                    id="pills-account"
                    role="tabpanel"
                    aria-labelledby="pills-account-tab"
                  >
                    <div className="account-tab-heading mb-3">Account Details</div>
                    <div className="account-tab-container">
                      {/* ACCOUNT DETAIL BANNER  */}
                      <div className="account-detail-banner">
                        <div className="account-detail-banner-header d-flex align-items-md-center  justify-content-md-between gap-2">
                          <div className="account-detail-banner-heading d-flex align-items-center gap-2 flex-wrap">
                            {/* <div>{id.accountName}</div> */}

                            {/* <span className="account-banner-span">Service ID: {pfValues.CanId ? pfValues.CanId :idbyDrop.CanId ? idbyDrop.CanId : localStorage.getItem('credentialKey') }</span> */}

                            {/* {isPinnedDataAvailable && showDropdownData ? ( // Check if pinned data is available
        <span className="account-banner-span">Service ID: {pfValues.CanId}</span>
      ) : ( // If not, render other fallback data
        <span className="account-banner-span">
          Service ID: {idbyDrop.CanId ? idbyDrop.CanId : localStorage.getItem('credentialKey')}
        </span>
      )} */}

                            {/* Check if pinned data is available and showDropdownData is false */}
                            {!showDropdownData && isPinnedDataAvailable && pinnedData && (
                              <div>
                                {/* Render pinned data here */}
                                <span className="account-banner-span">Service ID: {pfValues.CanId}</span>
                                {/* ... Render other pinned data here ... */}
                              </div>
                            )}

                            {/* Check if showDropdownData is true */}
                            {showDropdownData && (
                              <div>
                                {/* Render dropdown data here */}
                                <span className="account-banner-span">Service ID: {idbyDrop.CanId ? idbyDrop.CanId : localStorage.getItem('credentialKey')}</span>
                                {/* ... Render other dropdown data here ... */}
                              </div>
                            )}

                            {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (
                              <div>
                                {/* Render dropdown data here */}
                                <span className="account-banner-span">Service ID: {localStorage.getItem('credentialKey')}</span>
                                {/* ... Render other dropdown data here ... */}
                              </div>
                            )}






                          </div>
                          <div className="d-flex flex-row align-items-center gap-3 flex-wrap">


                            {/* new changes according to dynamic value for city  */}

                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div className="select-custom dropdown-toggle select4-custom rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button">
                                <div className="d-flex align-items-center gap-2">
                                  <img src={distance} alt="" />
                                  {crmRole === "L3" ? (<span className="textValue">{filtered.LocationName || 'Select City'}</span>
                                  ) : (
                                    <span className="textValue">{pfValues.LocationName ? pfValues.LocationName : autoCity.LocationName ? autoCity.LocationName : 'Select City'}</span>
                                  )}
                                </div>
                              </div>
                              {crmRole === "L3" ? (
                                <ul className="dropdown-menu" >

                                  <li
                                    key={'HBB'}
                                    className="dropdown-item"
                                    data-value={filtered.LocationName}
                                    style={{ fontSize: "14px" }}
                                  // onClick={handleDropdownItemClick}
                                  >
                                    {filtered.LocationName}
                                  </li>
                                </ul>
                              ) : null}
                              {crmRole === "L2" && segmnt == 'OBB' ? (
                                <ul className="dropdown-menu" >

                                  <li
                                    key={'OBB'}
                                    className="dropdown-item"
                                    data-value={filtered.LocationName}
                                    // onClick={handleDropdownItemClick}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {filtered.LocationName}
                                  </li>
                                </ul>
                              ) : null}

                              {crmRole === "L2" ? (
                                <ul className="dropdown-menu">
                                  {/* {drop1Value.map((city) => (
                                    <li
                                      key={`city-${city.LocationId}`}
                                      className="dropdown-item"
                                      data-value={city.LocationName}
                                      onClick={handleDropdownItemClick}
                                      style={{fontSize:"14px"}}
                                    >
                                      {city.LocationName}
                                    </li>
                                  ))} */}

                                  {drop1Value.length > 0 && [...new Set(drop1Value.map(location => location.LocationName))].map((ulocation) => (
                                    <li
                                      key={ulocation}
                                      value={ulocation}
                                      className="dropdown-item"
                                      data-value={ulocation}
                                      onClick={handleDropdownItemClick}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {ulocation}
                                    </li>
                                  ))}
                                </ul>
                              ) : null}



                            </div>

                            {/* end */}







                            {/* new changes according to dynamic value for area */}
                            {/* <div className="dropdown spectra-dropdown select-dropdown">
                            <div
                              className="select-custom dropdown-toggle select4-custom rounded-0"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              role="button"
                            >
                              <span className="textValue">{pfValues.AreaName ? pfValues.AreaName : autoArea.AreaName ? autoArea.AreaName : 'Select Area'}</span>
                            </div>

                            <ul className="dropdown-menu" >
                              {filteredAreas.map((AreaName, index) => (
                                <li
                                  key={`area-${index}`}
                                  className="dropdown-item"
                                  data-value={AreaName}
                                  onClick={handleAreaClick}

                                >
                                  {AreaName}
                                </li>
                              ))}
                            </ul>

                          </div> */}

                            {/* new changes according to dynamic value for area */}

                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div className="select-custom dropdown-toggle select4-custom rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <img src={distance} alt="" />

                                  {resetValueflag ? (<span className="textValue">
                                    {areaSelected ? areaSelected : "Select Area"}
                                  </span>) :
                                    (<span className="textValue">

                                      {/* {pfValues.AreaName ? pfValues.AreaName : getFlagLoc ? autoArea.AreaName : areaSelected ? areaSelected : "Select Area"} */}

                                      {pfValues.AreaName ? pfValues.AreaName : getFlagLoc ? autoArea.AreaName : areaSelected ? areaSelected : !getFlagLoc ? autoArea.AreaName : areaSelected ? areaSelected : "Select Area"}
                                    </span>)}
                                </div>

                              </div>
                              {/* {crmRole === "L2" && segmnt !== 'OBB' && (
  <ul className="dropdown-menu">
    {filteredAreas.length > 0 ? ( // Check if there are filtered areas
      filteredAreas.map((AreaName, index) => (
        <li
          key={`area-${index}`}
          className="dropdown-item"
          data-value={AreaName}
          onClick={handleAreaClick}
        >
          {AreaName}
        </li>
      ))
    ) : (
      // If no filtered areas, show a disabled dropdown item indicating no value
      <li className="dropdown-item ">No Area Avilable</li>
    )}
  </ul>
)} */}
                              {/* NEW KOCHI CHNAGES  */}
                              {crmRole === "L2" && segmnt !== 'OBB' && (
                                <ul className="dropdown-menu">
                                  {filteredAreas.length > 0 ? (
                                    filteredAreas.map((AreaName, index) => (
                                      <li
                                        key={`area-${index}`}
                                        className="dropdown-item"
                                        data-value={AreaName}
                                        onClick={handleAreaClick}
                                        style={{ fontSize: "14px" }}
                                      >
                                        {AreaName}
                                      </li>
                                    ))
                                  ) : (

                                    <li
                                      key="no-area"
                                      className="dropdown-item"
                                      onClick={handleAreaClick} // You might want to update the handler accordingly
                                      data-value={citySelected} // Use the value as the data-value
                                      style={{ fontSize: "14px" }}
                                    >
                                      {citySelected}
                                    </li>
                                  )}
                                </ul>
                              )}
                              {/* end */}
                              {crmRole === "L3" && (
                                <ul className="dropdown-menu">
                                  {filtered.AreaName ? (
                                    <li
                                      key={'HBB'}
                                      className="dropdown-item"
                                      data-value={filtered.AreaName}
                                      // onClick={handleDropdownItemClick}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {filtered.AreaName}
                                    </li>
                                  ) : (
                                    <li className="dropdown-item"
                                      style={{ fontSize: "14px" }}
                                    >{filtered.AreaName}</li>
                                  )}
                                </ul>
                              )}

                              {crmRole === "L2" && segmnt === 'OBB' && (
                                <ul className="dropdown-menu">
                                  {filtered.AreaName ? (
                                    <li
                                      key={'LoBB'}
                                      className="dropdown-item"
                                      data-value={filtered.AreaName}
                                      style={{ fontSize: "14px" }}
                                    // onClick={handleDropdownItemClick}
                                    >
                                      {filtered.AreaName}
                                    </li>
                                  ) : (
                                    <li className="dropdown-item"
                                      style={{ fontSize: "14px" }}
                                    > Area available</li>
                                  )}
                                </ul>
                              )}
                            </div>;

                            {/* end */}





                            {/* Product selection dropdown */}

                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom dropdown-toggle rounded-0 custom-fix"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <img src={productIcon} alt="" />


                                  {/* {resetValueflag ? (<span className="textValue">{segmentSelected && getId ? `${segmentSelected} (${getId.CanId})` : 'Select Segment'}</span>) :
                                    (<span className="textValue">{pfValues ? `${pfValues.SegmentName} (${pfValues.CanId})` : 
                                    getFlagLoc ?`${autoSegment.SegmentName} (${autoSegment.CanId})s ` : 
                                    `${segmentSelected} (${getId.CanId})` ? `${segmentSelected} (${getId.CanId})`
                                      :'Select Segment'}</span>)}   */}

                                  {resetValueflag ? (
                                    <span className="textValue">
                                      {segmentSelected && getId ? `${segmentSelected} ` : 'Select Segment'}
                                    </span>
                                  ) : (
                                    <span className="textValue">
                                      {pfValues
                                        ? `${pfValues.SegmentName} (${pfValues.CanId})`
                                        : getFlagLoc ? `${autoSegment.SegmentName} (${autoSegment.CanId})` :
                                          `${segmentSelected} (${getId.CanId})` ? `${segmnt} (${getId.CanId})`
                                            : 'Select Segment'

                                      }
                                    </span>
                                  )}
                                  {/* <span className="textValue">
  {pfValues
    ? `${pfValues.SegmentName} (${pfValues.CanId})`
    : !getFlagLoc
    ? `${autoSegment.SegmentName} (${autoSegment.CanId})w`
    : getFlagLoc
    ? `${autoSegment.SegmentName} (${autoSegment.CanId})s2`
    : segmnt && `${segmnt} (${getId.CanId})v`
  }
</span> */}

                                  {/* <span className="textValue">
  {pfValues
    ? `${pfValues.SegmentName} (${pfValues.CanId})`
    : !getFlagLoc
    ? `${autoSegment.SegmentName} (${autoSegment.CanId})w`
    : (getFlagLoc && !segmentSelected)
    ? `${autoSegment.SegmentName} (${autoSegment.CanId})s2`
    : `${segmnt} (${getId.CanId})v`
  }
</span> */}










                                </div>
                              </div>

                              {crmRole === "L2" && segmnt !== 'OBB' && (
                                <ul className="dropdown-menu">
                                  {filteredSegments.map((segment) => (
                                    segment.SegmentName ? (
                                      <li
                                        key={segment.LocationId}
                                        className="dropdown-item"
                                        data-value={segment.SegmentName}
                                        onClick={(event) => handleSegmentClick(event, segment.CanId)}
                                      >
                                        {segment.SegmentName}({segment.CanId})
                                      </li>
                                    ) : null
                                  ))}
                                </ul>
                              )}
                              {/* {crmRole === "L2" && segmnt !== 'OBB' && (
  <ul className="dropdown-menu">
    {filteredSegments.length > 0 ? (
      filteredSegments.map((segment) => (
        segment.SegmentName ? (
          <li
            key={segment.LocationId}
            className="dropdown-item"
            data-value={segment.SegmentName}
            onClick={(event) => handleSegmentClick(event, segment.CanId)}
          >
            {segment.SegmentName}({segment.CanId})
          </li>
        ) : null
      ))
    ) : (
      <li className="dropdown-item ">{segmentSelected ? segmentSelected :'No Segment Available'}</li>
    )}
  </ul>
)} */}

                              {/* nw chanes for kochi part  */}
                              {crmRole === "L2" && segmnt !== 'OBB' && (
                                <ul className="dropdown-menu">
                                  {filteredSegments.map((segment) => (
                                    segment.SegmentName ? (
                                      <li
                                        key={segment.LocationId}
                                        className="dropdown-item"
                                        data-value={segment.SegmentName}
                                        onClick={(event) => handleSegmentClick(event, segment.CanId)}
                                        style={{ fontSize: "14px" }}
                                      >
                                        {segment.SegmentName} ({segment.CanId})
                                      </li>
                                    ) : null
                                  ))}
                                </ul>

                              )}
                              {/* {crmRole === "L2" && segmnt === 'OBB' && (
                                <ul className="dropdown-menu">
                                  {filtered.SegmentName == '' ? (
                                    <li
                                      key={'LoBB'}
                                      className="dropdown-item"
                                      data-value={filtered.SegmentName}
                                    // onClick={handleDropdownItemClick}
                                    style={{fontSize:"14px"}}
                                    >
                                      {segmnt + " (" + filtered.CanId + ")"}
                                    </li>
                                  ) : (
                                    <li className="dropdown-item"
                                    style={{fontSize:"14px"}}
                                    > {segmnt + " (" + filtered.CanId + ")"}</li>
                                  )}
                                </ul>
                              )} */}
                              {crmRole === "L2" && segmnt === 'OBB' && (

                                <ul className="dropdown-menu">
                                  {filteredAll
                                    .filter((segment) => segment.SegmentName !== undefined)
                                    .map((segment) => (
                                      <li
                                        key={segment.LocationId}
                                        className="dropdown-item"
                                        onClick={(event) => handleSegmentClick(event, segment.CanId)}
                                      >
                                        {segment.SegmentName + " (" + segment.CanId + ")"}
                                      </li>
                                    ))}
                                </ul>



                              )}
                              {crmRole === "L3" && (
                                <ul className="dropdown-menu">
                                  {filtered.CanId ? (
                                    <li
                                      key={'HBB'}
                                      className="dropdown-item"
                                      data-value={filtered.CanId}
                                      // onClick={handleSegmentClick}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {segmnt + " (" + filtered.CanId + ")"}
                                    </li>
                                  ) : (
                                    <li className="dropdown-item"
                                      style={{ fontSize: "14px" }}
                                    >  {segmnt + " (" + filtered.CanId + ")"}</li>
                                  )}
                                </ul>
                              )}


                              {/* <ul className="dropdown-menu">
  {filteredSegments.map((segment) => (
    // Check if CRM Role is 'L2' and segment is 'OBB'
    (crmRole === 'L2' && segment.SegmentName === 'OBB') ? (
      <li
        key={segment.LocationId}
        className="dropdown-item"
        data-value={segment.SegmentName}
        onClick={(event) => handleSegmentClick(event, segment.CanId)}
      >
        {segment.SegmentName}({segment.CanId})
      </li>
    ) : (
      // Check if CRM Role is 'L2' and segment is not 'OBB'
      crmRole === 'L2' && segment.SegmentName !== 'OBB' ? null : (
        // Show other cases (exclude 'OBB') when CRM Role is not 'L2'
        segment.SegmentName !== 'OBB' && (
          <li
            key={segment.LocationId}
            className="dropdown-item"
            data-value={segment.SegmentName}
            onClick={(event) => handleSegmentClick(event, segment.CanId)}
          >
            {segment.SegmentName}({segment.CanId})
          </li>
        )
      )
    )
  ))}
</ul> */}

                            </div>





                          </div>
                        </div>

                        {/* account info */}
                        <div className="row justify-content-between">
                          <div className="col-12 col-sm-6 col-lg-3 account-detail-card">
                            <div className="d-flex align-items-start justify-content-start account-detail-box">
                              <div className="info-icon">
                                <img src={accountdetailname} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">Account Name</div>
                                <div className="info-content">
                                  {id.accountName}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-3 account-detail-card">
                            <div className="d-flex align-items-start justify-content-start account-detail-box w-100">
                              <div className="info-icon">
                                <img src={accountdetailmail} alt="" />
                              </div>
                              <div className="px-3 py-1 editable-block">
                                <div className="info-name pb-1">
                                  Email ID
                                  <span>
                                    {/* <img
                                      src={edit}
                                      alt=""
                                      className="editInputIcon"
                                      onClick={handleEditIconClick}
                                    /> */}
                                  </span>
                                </div>
                                <div className="info-content editable-value" onBlur={handleEditableValueBlur}>
                                  {id.shipToEmail}
                                </div>
                              </div>
                            </div>
                          </div>
                          {localStorage.getItem('crm_company_id') !== 'CIndividual' ? (
                            <div className="col-12 col-sm-6 col-lg-2 account-detail-card">

                              <div className="d-flex align-items-start justify-content-start account-detail-box">

                                <>
                                  <div className="info-icon">
                                    <img src={accountdetailuser} alt="" />
                                  </div>
                                  <div className="px-3 py-1">
                                    <div className="info-name pb-1">Company ID</div>
                                    <div className="info-content">{localStorage.getItem('crm_company_id')}</div>
                                  </div>
                                </>
                              </div>

                            </div>
                          ) : null}
                          <div className="col-12 col-sm-6 col-lg-3 account-detail-card">
                            <div className="d-flex align-items-start justify-content-start account-detail-box">
                              <div className="info-icon">
                                <img src={accountdetaildate} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">Activation Date</div>
                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (
                                  <div className="info-content">

                                    {pfActDateValues ? pfActDateValues : 'NA'}   </div>)}

                                {showDropdownData && (
                                  <div className="info-content">

                                    {actDatebydrop ? actDatebydrop : 'NA'}   </div>)}


                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (
                                  <div className="info-content">

                                    {actDate ? actDate : 'NA'}   </div>)}





                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* BILLING DETAIL ROW  */}
                      <div className="dashboard-box account-detail-billing">
                        <div className="dashboard-box-heading">Billing Details</div>
                        <div className="row">
                          <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-4">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img src={billinggsticon} alt="" />
                              </div>
                              {!showDropdownData && isPinnedDataAvailable && pinnedData && (
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">GST Number</div>
                                  <div className="info-content">{pfgstNo ? pfgstNo : 'NA'}</div>

                                </div>)}

                              {showDropdownData && (
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">GST Number</div>
                                  <div className="info-content">{gstNumberbydrop ? gstNumberbydrop : 'NA'}</div>

                                </div>)}
                              {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">GST Number</div>
                                  <div className="info-content"> {gstNumber ? gstNumber : 'NA'}</div>

                                </div>)}

                            </div>
                          </div>
                          {/* TAN number */}
                          <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-3 tan-cst">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img src={billinggsticon} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">TAN</div>
                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (
                                  <div className="info-content">{pftan ? pftan : 'NA'}</div>)}

                                {showDropdownData && (
                                  <div className="info-content">{tanbydrop ? tanbydrop : 'NA'}</div>)}

                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (
                                  <div className="info-content">{tan ? tan : 'NA'}</div>)}
                              </div>
                            </div>
                          </div>
  {/* pan number */}
  <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-4">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img src={billinggsticon} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">PAN Number</div>
                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (<div className="info-content">{pfpanNo ? pfpanNo : 'NA'}</div>)}
                                {showDropdownData && (<div className="info-content">{panNobydrop ? panNobydrop : 'NA'}</div>)}
                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content">{panNo ? panNo : 'NA'}</div>)}
                              </div>
                            </div>
                          </div>
                           {/* TDS slab */}
                           <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-3 custm-tds">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img src={billinggsticon} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">TDS Slab</div>

                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (<div className="info-content">{pftds ? (pftds) +"%" : 'NA'}</div>)}
                                {showDropdownData && (<div className="info-content">{tdsbydrop ? (tdsbydrop) +"%" : 'NA'}</div>)}
                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content">{tds ? (tds) +"%": 'NA'}</div>)}
                              </div>
                            </div>
                          </div>
                          {/* current balance */}
                          <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-3">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img
                                  src={bilingregistrationicon}
                                  alt=""
                                />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">Current Balance</div>
                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (
                                  <div className="info-content">
                                    {pfAccValues.balance !== undefined && pfAccValues.balance !== null
                                      ? pfAccValues.balance : '0'}
                                  </div>)}

                                {showDropdownData && (
                                  <div className="info-content">
                                    {invoicedt.balance !== undefined && invoicedt.balance !== null
                                      ? invoicedt.balance : '0'}
                                  </div>)}

                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (
                                  <div className="info-content">
                                    {id.balance !== undefined && id.balance !== null
                                      ? id.balance : '0'}
                                  </div>)}

                              </div>
                            </div>
                          </div>
                          {/* previous invoice*/}
                          <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-4 cstm-pre-invoice">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img src={billinggsticon} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">Previous Invoice</div>
                                {/* <div className="info-content">{new Date(invoicedt.invoiceCreationDate).toLocaleDateString('en-GB') ?  new Date(invoicedt.invoiceCreationDate).toLocaleDateString('en-GB') :  new Date(id.invoiceCreationDate).toLocaleDateString('en-GB')}</div> */}
                                {/* {!showDropdownData && isPinnedDataAvailable && pinnedData && (
  <div className="info-content">
    {pfAccValues && pfAccValues.invoiceCreationDate &&
      new Date(pfAccValues.invoiceCreationDate).getTime() &&
      new Date(pfAccValues.invoiceCreationDate).toLocaleDateString('en-GB')
    }
    {!pfAccValues || !pfAccValues.invoiceCreationDate && 'NA'}
  </div>

)} */}
                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (

                                  <div className="info-content">
                                    {pfAccValues && pfAccValues.invoiceCreationDate ? (
                                      (() => {
                                        const formattedDate = new Date(pfAccValues.invoiceCreationDate).toLocaleDateString('en-GB', {
                                          day: '2-digit', // Set the day option to '2-digit'
                                          month: 'short',
                                          year: '2-digit',
                                        }).replace(/(\d+)(?:st|nd|rd|th)/, '$1');
                                        const formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year
                                        return `${formattedDate.slice(0, -2)}' ${formattedYear}`;
                                      })()
                                    ) : (
                                      'NA'
                                    )}
                                  </div>

                                )}







                                {showDropdownData && (<div className="info-content">

                                  {/* {invoicedt.invoiceCreationDate &&
                                  new Date(invoicedt.invoiceCreationDate).getTime() &&
                                  new Date(invoicedt.invoiceCreationDate).toLocaleDateString('en-GB')}
                              
    {!invoicedt || !invoicedt.invoiceCreationDate && 'NA'} */}
                                  <div className="info-content">
                                    {invoicedt && invoicedt.invoiceCreationDate ? (
                                      (() => {
                                        const formattedDate = new Date(invoicedt.invoiceCreationDate).toLocaleDateString('en-GB', {
                                          day: '2-digit', // Set the day option to '2-digit'
                                          month: 'short',
                                          year: '2-digit',
                                        }).replace(/(\d+)(?:st|nd|rd|th)/, '$1');
                                        const formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year
                                        return `${formattedDate.slice(0, -2)} '${formattedYear}`;
                                      })()
                                    ) : (
                                      'NA'
                                    )}
                                  </div>


                                </div>)}

                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content">


                                  {/* {id.invoiceCreationDate &&
                                  new Date(id.invoiceCreationDate).getTime() &&
                                  new Date(id.invoiceCreationDate).toLocaleDateString('en-GB')}
                                 
                                 {!id || !id.invoiceCreationDate && 'NA'} */}
                                  {id && id.invoiceCreationDate ? (
                                    (() => {
                                      const formattedDate = new Date(id.invoiceCreationDate).toLocaleDateString('en-GB', {
                                        day: '2-digit', // Set the day option to '2-digit'
                                        month: 'short',
                                        year: '2-digit',
                                      }).replace(/(\d+)(?:st|nd|rd|th)/, '$1');
                                      const formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year
                                      return `${formattedDate.slice(0, -2)} '${formattedYear}`;
                                    })()
                                  ) : (
                                    'NA'
                                  )}
                                </div>)}

                              </div>
                            </div>
                          </div>
                        
                         
                          
                          {/* next invoice */}
                          <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-4 nxt-invoice">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img src={billinggsticon} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">Next Invoice</div>
                                {/* <div className="info-content">
                             

                                    {!pfAccValues && invoicedt.billStartDate &&
                                  new Date(invoicedt.billStartDate).getTime() &&
                                  new Date(invoicedt.billStartDate).toLocaleDateString('en-GB')}
                                {!pfAccValues &&!invoicedt.billStartDate &&
                                  id.billStartDate &&
                                  new Date(id.billStartDate).getTime() &&
                                  new Date(id.billStartDate).toLocaleDateString('en-GB')}
                                 
                                {pfAccValues && pfAccValues.billStartDate &&
                                  new Date(pfAccValues.billStartDate).getTime() &&
                                  new Date(pfAccValues.billStartDate).toLocaleDateString('en-GB')}

                               
                              </div> */}

                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (
                                  <div className="info-content">
                                    {pfAccValues && pfAccValues.billStartDate ? (
                                      (() => {
                                        const formattedDate = new Date(pfAccValues.billStartDate).toLocaleDateString('en-GB', {
                                          day: '2-digit', // Set the day option to '2-digit'
                                          month: 'short',
                                          year: '2-digit',
                                        }).replace(/(\d+)(?:st|nd|rd|th)/, '$1');
                                        const formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year
                                        return `${formattedDate.slice(0, -2)}'${formattedYear}`;
                                      })()
                                    ) : (
                                      'NA'
                                    )}
                                  </div>
                                )}







                                {showDropdownData && (<div className="info-content">

                                  {/* {invoicedt.billStartDate &&
                                  new Date(invoicedt.billStartDate).getTime() &&
                                  new Date(invoicedt.billStartDate).toLocaleDateString('en-GB')}
                              
    {!invoicedt || !invoicedt.billStartDate && 'NA'} */}
                                  {showDropdownData && (
                                    <div className="info-content">
                                      {invoicedt && invoicedt.billStartDate ? (
                                        (() => {
                                          const formattedDate = new Date(invoicedt.billStartDate).toLocaleDateString('en-GB', {
                                            day: '2-digit', // Set the day option to '2-digit'
                                            month: 'short',
                                            year: '2-digit',
                                          }).replace(/(\d+)(?:st|nd|rd|th)/, '$1');
                                          const formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year
                                          return `${formattedDate.slice(0, -2)}'${formattedYear}`;
                                        })()
                                      ) : (
                                        'NA'
                                      )}
                                    </div>
                                  )}


                                </div>)}

                                {/* {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (                              <div className="info-content">
                                
                             
                                {id.billStartDate &&
                                  new Date(id.billStartDate).getTime() &&
                                  new Date(id.billStartDate).toLocaleDateString('en-GB')}
                                 
                                 {!id || !id.billStartDate && 'NA'}
                              </div>)} */}
                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (
                                  <div className="info-content">
                                    {id && id.billStartDate ? (
                                      (() => {
                                        const formattedDate = new Date(id.billStartDate).toLocaleDateString('en-GB', {
                                          day: '2-digit', // Set the day option to '2-digit'
                                          month: 'short',
                                          year: '2-digit',
                                        }).replace(/(\d+)(?:st|nd|rd|th)/, '$1');
                                        const formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year
                                        return `${formattedDate.slice(0, -2)}'${formattedYear}`;
                                      })()
                                    ) : (
                                      'NA'
                                    )}
                                  </div>
                                )}


                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* billing and installation address */}
                      <div className="d-flex align-items-center justify-content-between gap-4 flex-responsive">
                        {/* Billing address */}
                        <div className="account-detail-billing-mini-box">
                          <div className="account-detail-billing-address">
                            <div className="dashboard-box-heading">
                              Billing address{" "}
                            </div>
                            <div className="row account-detail-billing-row">
                              <div className="col-12 col-lg-6 account-detail-card py-2">
                                <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                  <div className="info-icon">
                                    <img src={billingaddress} alt="" />
                                  </div>
                                  <div className="px-3 py-1 editable-block">
                                    <div className="d-flex align-items-center gap-4">
                                      <div className="info-name pb-1">Address</div>
                                      <img
                                        // src={edit}
                                        alt=""
                                        className="editInputIcon mb-1"
                                      />
                                    </div>


                                    {!showDropdownData && isPinnedDataAvailable && pinnedData && (<div className="info-content editable-value">{pfAccValues.address ? pfAccValues.address : 'NA'}</div>)}
                                    {showDropdownData && (<div className="info-content editable-value">{invoicedt.address ? invoicedt.address : 'NA'}</div>)}
                                    {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content editable-value">{id.address ? id.address : 'NA'}</div>)}

                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6 account-detail-card py-2">
                                <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                  <div className="info-icon">
                                    <img src={billingaddress} alt="" />
                                  </div>
                                  <div className="px-3 py-1 editable-block">
                                    <div className="d-flex align-items-center gap-5">
                                      <div className="info-name pb-1">City</div>
                                      <img
                                        // src={edit}
                                        alt=""
                                        className="editInputIcon mb-1"
                                      />
                                    </div>
                                    {/* <div className="info-content editable-value">
                                 

                                    {pfAccValues.shipToCity && pfAccValues.shipToCountry ? `${pfAccValues.shipToCity}, ${pfAccValues.shipToCountry}` : invoicedt.shipToCity && invoicedt.shipToCountry ? `${invoicedt.shipToCity}, ${invoicedt.shipToCountry}` : `${id.shipToCity}, ${id.shipToCountry}`}
                                  </div> */}
                                    {!showDropdownData && isPinnedDataAvailable && pinnedData && (<div className="info-content editable-value">{pfAccValues.shipToCity && pfAccValues.shipToCountry ? `${pfAccValues.shipToCity}, ${pfAccValues.shipToCountry}` : 'NA'}</div>)}
                                    {showDropdownData && (<div className="info-content editable-value">{invoicedt.shipToCity && invoicedt.shipToCountry ? `${invoicedt.shipToCity}, ${invoicedt.shipToCountry}` : 'NA'}</div>)}
                                    {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content editable-value">{id.shipToCity && id.shipToCountry ? `${id.shipToCity}, ${id.shipToCountry}` : 'NA'}</div>)}

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Installation addresss */}
                        <div className="account-detail-billing-mini-box">
                          <div className="account-detail-billing-address">
                            <div className="dashboard-box-heading">
                              Installation address
                            </div>
                            <div className="row account-detail-billing-row">
                              <div className="col-12 col-lg-6 account-detail-card py-2">
                                <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                  <div className="info-icon">
                                    <img src={billingaddress} alt="" />
                                  </div>
                                  <div className="px-3 py-1 editable-block">
                                    <div className="d-flex align-items-center gap-5">
                                      <div className="info-name pb-1">Address</div>
                                      {/* <img
                                      src={edit}
                                      alt=""
                                      className="editInputIcon mb-1"
                                    /> */}
                                    </div>
                                    {/* <div className="info-content editable-value">
                                    {pfAccValues.shipToAddress ? pfAccValues.shipToAddress :invoicedt.shipToAddress ? invoicedt.shipToAddress : id.shipToAddress}
                                  </div> */}

                                    {!showDropdownData && isPinnedDataAvailable && pinnedData && (<div className="info-content editable-value">{pfAccValues.shipToAddress ? pfAccValues.shipToAddress : 'NA'}</div>)}
                                    {showDropdownData && (<div className="info-content editable-value">{invoicedt.shipToAddress ? invoicedt.shipToAddress : 'NA'}</div>)}
                                    {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content editable-value">{id.shipToAddress ? id.shipToAddress : 'NA'}</div>)}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6 account-detail-card py-2">
                                <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                  <div className="info-icon">
                                    <img src={billingaddress} alt="" />
                                  </div>
                                  <div className="px-3 py-1 editable-block">
                                    <div className="d-flex align-items-center gap-5">

                                      <div className="info-name pb-1">City</div>
                                      {/* <img
                                      src={edit}
                                      alt=""
                                      className="editInputIcon mb-1"
                                    /> */}
                                    </div>
                                    {/* <div className="info-content editable-value">
                                    {pfAccValues.shipToCity && pfAccValues.shipToCountry ? `${pfAccValues.shipToCity}, ${pfAccValues.shipToCountry}` : invoicedt.shipToCity && invoicedt.shipToCountry ? `${invoicedt.shipToCity}, ${invoicedt.shipToCountry}` : `${id.shipToCity}, ${id.shipToCountry}`}

                                  </div> */}

                                    {!showDropdownData && isPinnedDataAvailable && pinnedData && (<div className="info-content editable-value">{pfAccValues.shipToCity && pfAccValues.shipToCountry ? `${pfAccValues.shipToCity}, ${pfAccValues.shipToCountry}` : 'NA'}</div>)}
                                    {showDropdownData && (<div className="info-content editable-value">{invoicedt.shipToCity && invoicedt.shipToCountry ? `${invoicedt.shipToCity}, ${invoicedt.shipToCountry}` : 'NA'}</div>)}
                                    {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content editable-value">{id.shipToCity && id.shipToCountry ? `${id.shipToCity}, ${id.shipToCountry}` : 'NA'}</div>)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ****************** BILLING DETAILS TAB PANE ************* */}
                  <div
                    className={actBill}
                    id="pills-billing"
                    role="tabpanel"
                    aria-labelledby="pills-billing-tab"
                  >
                    {showBillingDetailTable && (<div id="billing-detail-table">
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="account-tab-heading">Billing Details</div>
                        <div className="d-flex align-items-center justify-content-center">
                          <div class="billing-toggle-btn invoices">Invoices</div>
                          <label className="toggle-switch">
                            <input type="checkbox" id="toggleCheckbox" ref={toggleCheckboxRef} />
                            <span className="toggle-slider" />
                          </label>
                          <div className="billing-toggle-btn">Transactions</div>
                        </div>
                      </div>
                      <div className="">
                        {/* Invoice Table  */}
                        <div id="invoice-table" className="account-table-container" ref={invoiceTableRef}>
                          {/* top banner with company name and fitlers */}
                          <div className="table-top-bar d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <div className="table-name flex-grow-1">Invoices</div>

                            <div class="d-flex align-items-center gap-3 flex-wrap">
                              {/* <!-- Location selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    <span class="textValue">{getSelectedCity ? getSelectedCity : getPinnedSessionData && !allCityFlag ? getPinnedSessionData.LocationName : getLogInLocation ? getLogInLocation : "All City"}</span>
                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") && <span class="textValue">{getLogInLocation}</span>} */}
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  <li class="dropdown-item" data-value="Select All City" onClick={() => dropdownSelection("Select All City", "city")}
                                    style={{ fontSize: "14px" }}
                                  >All City</li>
                                  {getUniqueLocation ? getUniqueLocation.map((city, index) => (
                                    <li key={index} class="dropdown-item" data-value={city} onClick={() => dropdownSelection(city, "city")} style={{ fontSize: "14px" }}>
                                      {city}
                                    </li>
                                  )) : ""}
                                </ul>
                              </div>
                              {/* <!-- Address selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {<span class="textValue">{getSelectedArea ? getSelectedArea : getPinnedSessionData ? getPinnedFlag ? "Select Area" : getPinnedSessionData.AreaName : getLogInArea ? getLogInArea : "Select Area"}</span>}
                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") && <span class="textValue">{getLogInArea}</span>} */}
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  {getUniqueAreaList ? getUniqueAreaList.map((area, index) => (
                                    <li key={index} class="dropdown-item" data-value={area} onClick={() => dropdownSelection(area, "area")} style={{ fontSize: "14px" }}>
                                      {area}
                                    </li>
                                  )) : ""}

                                </ul>
                              </div>


                              {/* <!-- Product selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={productIcon} alt="" />
                                    {<span class="textValue">{getSelectedProduct ? getSelectedProduct : getPinnedSessionData ? getPinnedFlag ? "Select Product" : getPinnedSessionData.SegmentName + " (" + getPinnedSessionData.CanId + ")" : getLogInSegment ? getLogInSegment + " (" + getLogInCanId + ")" : "Select Product"}</span>}
                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") && <span class="textValue">{getLogInSegment + " (" + getLogInCanId + ")"}</span>} */}
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  {getUniqueProductList ? getUniqueProductList.map((item, index) => (
                                    <li key={index} class="dropdown-item" value={item.CanId} data-value={item.SegmentName + " (" + item.CanId + ")"} onClick={() => dropdownSelection([item.SegmentName, item.CanId], "segment")} style={{ fontSize: "14px" }}>
                                      {item.SegmentName + " (" + item.CanId + ")"}
                                    </li>
                                  )) : ""}

                                </ul>
                              </div>

                              {/* <div class="spectra-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0">
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={iconcalendar} alt="" /> */}
                              {/* <span>Today </span> */}

                              <DateRangePicker

                                initialSettings={{
                                  ranges: {
                                    '1 Month': [moment().subtract(1, 'months'), moment()],
                                    '3 Months': [moment().subtract(3, 'months'), moment()],
                                    '6 Months': [moment().subtract(6, 'months'), moment()],
                                    '9 Months': [moment().subtract(9, 'months'), moment().subtract(1, 'days')],
                                    '1 Year': [moment().subtract(1, 'years'), moment()]
                                  },
                                  maxDate: new Date()
                                }}
                                onApply={handleDateRangeChange}

                              >
                                <div class="spectra-dropdown">
                                  <div class="select-custom dropdown-toggle rounded-0">
                                    <div className="d-flex align-items-center gap-2">
                                      <img src={iconcalendar} alt="" />
                                      <span
                                        type="text"
                                        className=""
                                        value={selectedRange}
                                        style={{ cursor: "pointer" }}
                                      >{selectedRange}</span>
                                    </div>
                                  </div>
                                </div>
                              </DateRangePicker>
                            </div>

                            {/* </div> */}
                            {/* <ul class="dropdown-menu" onClick={(value) => dropdownSelection(value, "period")}>
                                <li class="dropdown-item" data-value="1" value="1 Month">1 Month</li>
                                <li class="dropdown-item" data-value="2" value="3 Months">3 Months</li>
                                <li class="dropdown-item" data-value="3" value="6 months">6 months</li>
                                <li class="dropdown-item" data-value="4" value="9 Month">9 Months</li>
                                <li class="dropdown-item" data-value="5" value="1 Year">1 Year</li>
                                <li class="dropdown-item" data-value="6" value="Custom Date">Custom Date</li>
                              </ul> */}
                            {/* </div>


                            </div> */}

                            {/* <div class="dropdown spectra-dropdown select-dropdown">
                            <div class="select-custom rounded-0"
                              aria-expanded="false" role="button">
                              <div class="d-flex align-items-center gap-2">
                                <input style={{height: '25px'}} type='date' />
                              </div>
                            </div>
                          </div> */}

                            {/* <DateRangePicker size="xs" placeholder="" style={{width: 260, display: 'block', marginBottom: 10 }} />  */}

                            {/* search bar */}
                            <div className="table-search-wrapper d-flex align-items-center">
                              <input
                                className="table-search-input dashboard-search-input"
                                placeholder="Search"
                                type="text"
                                id="search"
                                name="search"
                                value={searchTerm}
                                onChange={handleSearch}
                              />
                              <img src={tablesearch} alt="" />
                            </div>
                          </div>



                          {/* Display data as table on large screen devices */}
                          <div className="horizontal-scroll-container d-md-block d-none">
                            <table className="account-table">
                              <tbody>
                                <tr className="table-header">
                                  {/* <th className="table-header-data">Service</th> */}
                                  <th className="table-header-data">Service ID</th>
                                  <th className="table-header-data">Location</th>
                                  <th className="table-header-data">Invoice No</th>
                                  <th className="table-header-data">Invoice Date</th>
                                  <th className="table-header-data">Start Date</th>
                                  <th className="table-header-data">End Date</th>
                                  <th className="table-header-data">Opening Balance</th>
                                  <th className="table-header-data">Amount</th>
                                  <th className="table-header-data">Due Date</th>
                                  <th className="table-header-data">Due Amount</th>
                                  <th className="table-header-data" />
                                </tr>

                                {/* Pinned Invoice Details */}
                                {getPinnedClickedData ? getPinnedClickedData.length > 0 ? getPinnedClickedData?.map((item, index) => (
                                  <tr key={index} className="table-row unpaid">
                                    <td className="table-row-data serviceId">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={getPinnedSessionData && getPinnedSessionData.CanId}
                                      />

                                    </td>
                                    <td className="table-row-data location">
                                      <Tooltip className="tooltip-billing" content={getPinnedSessionData && getPinnedSessionData.AreaName}>
                                        <span>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={getPinnedSessionData && (getPinnedSessionData.AreaName.length > 10 ? getPinnedSessionData.AreaName.substring(0, 10) + "..." : getPinnedSessionData.AreaName)}
                                          />

                                        </span>
                                      </Tooltip>
                                    </td>

                                    <td className="table-row-data invoice">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={item.cslno && item.cslno.toString()}
                                      />

                                    </td>

                                    <td className="table-row-data invoiceDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={formatDate(item.invoicedt)}
                                      />
                                    </td>

                                    <td className="table-row-data startDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={formatDate(item.startdt)}
                                      />
                                    </td>
                                    <td className="table-row-data endDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={formatDate(item.enddt)}
                                      />
                                    </td>
                                    <td className="table-row-data openBalance" style={{ textAlign: "center" }}>
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={"₹" + item.openingBalance.toString()}
                                      />
                                    </td>
                                    <td className="table-row-data amount">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={"₹" + item.amount.toString()}
                                      />
                                    </td>

                                    <td className="table-row-data dueDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={getPinnedSessionData && getPinnedSessionData.SegmentName === "HBB" ? formatDate(item.duedt) : formatDate(item.duedt)}
                                      />
                                    </td>
                                    {item.unPaidBalance > 0 ? (
                                      <td className="table-row-data dueAmount" style={{ width: "130px" }}>
                                        <div id="due-amount">
                                          <span />
                                          {"₹" + item.unPaidBalance}
                                        </div>
                                        <div
                                          id="pay-amount"
                                          className="d-none"
                                          onClick={() => navigateToPayNow({ SegmentName: getPinnedSessionData.SegmentName, PlanName: getPinnedSessionData.PlanName, CanId: getPinnedSessionData.CanId, item })}
                                        >
                                          <div className="pay-amount-btn">pay now</div>
                                        </div>
                                      </td>
                                    ) :
                                      <td className="table-row-data paidAmount">
                                        <span />
                                        Paid
                                      </td>
                                    }

                                    <td className="table-row-data">
                                      <div className="dropdown spectra-dropdown">
                                        <div
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                          role="button"
                                        >
                                          <img
                                            src={billingoptionicon}
                                            alt=""
                                          />
                                        </div>
                                        <ul className="dropdown-menu">

                                          <li>
                                            <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "download")}>
                                              <img src={download} alt="" />
                                              <span class="custom-span">&nbsp;Download</span>
                                            </a>
                                          </li>
                                          <li>
                                            <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "share")}>
                                              <img
                                                src={shareicon}
                                                alt=""
                                              />
                                              <span class="custom-span">&nbsp;Share</span>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>

                                    </td>

                                  </tr>
                                )) : <tr className="table-row"><td colSpan="10" style={{ textAlign: "center" }} className="table-row-data">No Invoices</td></tr> : ""}

                                {/* Selected Invoice Details */}
                                {(getFinalDropdownSelection && !getPinnedClickedData ? getFinalDropdownSelection.filteredInvoice.length > 0 ? getFinalDropdownSelection.filteredInvoice?.map((item, index) => (
                                  <tr key={index} className="table-row unpaid">
                                    {/* <td className="table-row-data service">
                                  <Highlighter
                                   highlightClassName="custom-highlight"
                                   searchWords={searchTerm}
                                   autoEscape={true}
                                   textToHighlight={getFinalDropdownSelection.PlanName && getFinalDropdownSelection.PlanName.toString()}
                                  />
                                 
                                   
                                    </td> */}
                                    <td className="table-row-data serviceId">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={getFinalDropdownSelection.CanId && getFinalDropdownSelection.CanId.toString()}
                                      />

                                    </td>
                                    <td className="table-row-data location">
                                      <Tooltip className="tooltip-billing" content={getFinalDropdownSelection.AreaName}>
                                        <span>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={(getFinalDropdownSelection.AreaName).length > 10 ? getFinalDropdownSelection.AreaName.substring(0, 10) + "..." : getFinalDropdownSelection.AreaName}
                                          />

                                        </span>
                                      </Tooltip>
                                    </td>

                                    <td className="table-row-data invoice">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={item.cslno && item.cslno.toString()}
                                      />

                                    </td>

                                    <td className="table-row-data invoiceDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={formatDate(item.invoicedt)}
                                      />
                                    </td>

                                    <td className="table-row-data startDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={formatDate(item.startdt)}
                                      />
                                    </td>
                                    <td className="table-row-data endDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={formatDate(item.enddt)}
                                      />
                                    </td>
                                    <td className="table-row-data openBalance" style={{ textAlign: "center" }}>
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={"₹" + item.openingBalance}
                                      />
                                    </td>
                                    <td className="table-row-data amount">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={"₹" + item.amount}
                                      />
                                    </td>

                                    <td className="table-row-data dueDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={getFinalDropdownSelection.SegmentName === "HBB" ? formatDate(item.duedt) : formatDate(item.duedt)}
                                      />
                                    </td>
                                    {item.unPaidBalance > 0 ? (
                                      <td className="table-row-data dueAmount" style={{ width: "130px" }}>
                                        <div id="due-amount">
                                          <span />
                                          {"₹" + item.unPaidBalance}
                                        </div>
                                        <div
                                          id="pay-amount"
                                          className="d-none"
                                          onClick={() => navigateToPayNow({ SegmentName: getFinalDropdownSelection.SegmentName, PlanName: getFinalDropdownSelection.PlanName, CanId: getFinalDropdownSelection.CanId, item })}
                                        >
                                          <div className="pay-amount-btn">pay now</div>
                                        </div>
                                      </td>
                                    ) :
                                      <td className="table-row-data paidAmount">
                                        <span />
                                        Paid
                                      </td>
                                    }

                                    <td className="table-row-data">
                                      <div className="dropdown spectra-dropdown">
                                        <div
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                          role="button"
                                        >
                                          <img
                                            src={billingoptionicon}
                                            alt=""
                                          />
                                        </div>
                                        <ul className="dropdown-menu">

                                          <li>
                                            <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "download")}>
                                              <img src={download} alt="" />
                                              <span class="custom-span">&nbsp;Download</span>
                                            </a>
                                          </li>
                                          <li>
                                            <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "share")}>
                                              <img
                                                src={shareicon}
                                                alt=""
                                              />
                                              <span class="custom-span">&nbsp;Share</span>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>

                                    </td>

                                  </tr>
                                )) : <tr className="table-row"><td colSpan="10" style={{ textAlign: "center" }} className="table-row-data">No Invoices</td></tr> : "")}

                                {/* All selected City Invoice Details */}
                                {(getFinalInvoiceDetails && !getFinalDropdownSelection && !getPinnedClickedData ? getFinalInvoiceDetails.length > 0 ? getFinalInvoiceDetails?.map((item, index) => (
                                  item.top3Invoice && item.top3Invoice.length > 0 ?
                                    <tr key={index} className="table-row unpaid">
                                      {/* <td className="table-row-data service">
                                    <Highlighter
                                   highlightClassName="custom-highlight"
                                    searchWords={searchTerm}
                                    autoEscape={true}
                                    textToHighlight={item.PlanName && item.PlanName.toString()}
                                   
                                  />
                                    </td> */}

                                      <td className="table-row-data serviceId">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.CanId && item.CanId.toString()}

                                        />
                                        {/* {item.CanId} */}
                                      </td>
                                      <td className="table-row-data location">
                                        <Tooltip className="tooltip-billing" content={item.AreaName}>
                                          <span>
                                            <Highlighter
                                              highlightClassName="custom-highlight"
                                              searchWords={searchTerm}
                                              autoEscape={true}
                                              textToHighlight={item.AreaName ? item.AreaName.length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName : "N/A"}
                                            />
                                          </span>
                                        </Tooltip>
                                      </td>

                                      <td className="table-row-data invoice">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.top3Invoice[0].cslno.toString()}

                                        />
                                        {/* {item.top3Invoice[0].cslno} */}
                                      </td>

                                      <td className="table-row-data invoiceDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.top3Invoice[0].invoicedt)}
                                        />
                                      </td>

                                      <td className="table-row-data startDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.top3Invoice[0].startdt)}
                                        />
                                      </td>
                                      <td className="table-row-data endDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.top3Invoice[0].enddt)}
                                        />
                                      </td>
                                      <td className="table-row-data openBalance" style={{ textAlign: "center" }}>
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={"₹" + item.top3Invoice[0].openingBalance}

                                        />
                                        {/* ₹{item.top3Invoice[0].openingBalance} */}
                                      </td>
                                      <td className="table-row-data amount">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={"₹" + item.top3Invoice[0].amount}

                                        />
                                        {/* ₹{item.top3Invoice[0].amount} */}
                                      </td>
                                      <td className="table-row-data dueDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.SegmentName === "HBB" ? formatDate(item.top3Invoice[0].duedt) : formatDate(item.top3Invoice[0].duedt)}
                                        />
                                      </td>
                                      {item.top3Invoice[0].unPaidBalance > 0 ? (
                                        <td className="table-row-data dueAmount" style={{ width: "130px" }}>
                                          <div id="due-amount">
                                            <span />
                                            {"₹" + item.top3Invoice[0].unPaidBalance}
                                          </div>
                                          <div
                                            id="pay-amount"
                                            className="d-none"
                                            onClick={() => navigateToPayNow(item)}
                                          >
                                            <div className="pay-amount-btn">pay now</div>
                                          </div>
                                        </td>
                                      ) :
                                        <td className="table-row-data paidAmount">
                                          <span />
                                          Paid
                                        </td>
                                      }

                                      <td className="table-row-data">
                                        <div className="dropdown spectra-dropdown">
                                          <div
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            role="button"
                                          >
                                            <img
                                              src={billingoptionicon}
                                              alt=""
                                            />
                                          </div>
                                          <ul className="dropdown-menu">
                                            {/* {item.top3Invoice[0].unPaidBalance === 0 ? (
                                          <li>
                                              <a class="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[0].invoiceNo, "view")}>
                                              <img src={eyeopen} alt="" />
                                              <span>View</span>
                                            </a>
                                          </li>
                                      ):""} */}
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[0].invoiceNo, "download")}>
                                                <img src={download} alt="" />
                                                <span class="custom-span">&nbsp;Download</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[0].invoiceNo, "share")}>
                                                <img
                                                  src={shareicon}
                                                  alt=""
                                                />
                                                <span class="custom-span">&nbsp;Share</span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>

                                      </td>

                                    </tr> : ""
                                )) : <tr className="table-row"><td colSpan="10" style={{ textAlign: "center" }} className="table-row-data">No Invoices</td></tr> : "")}

                                {(getFinalInvoiceDetails && !getFinalDropdownSelection && !getPinnedClickedData ? getFinalInvoiceDetails.length > 0 ? getFinalInvoiceDetails?.map((item, index) => (
                                  item.top3Invoice && item.top3Invoice.length > 1 ?
                                    <tr key={index} className="table-row unpaid">
                                      {/* <td className="table-row-data service">
                                  <Highlighter
                                   highlightClassName="custom-highlight"
                                    searchWords={searchTerm}
                                    autoEscape={true}
                                    textToHighlight={item.PlanName && item.PlanName.toString()}
                                   
                                  />
                                    </td> */}
                                      <td className="table-row-data serviceId">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.CanId && item.CanId.toString()}

                                        />
                                        {/* {item.CanId} */}
                                      </td>
                                      <td className="table-row-data location">
                                        <Tooltip className="tooltip-billing" content={item.AreaName}>
                                          <span>
                                            <Highlighter
                                              highlightClassName="custom-highlight"
                                              searchWords={searchTerm}
                                              autoEscape={true}
                                              textToHighlight={item.AreaName ? item.AreaName.length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName : "N/A"}
                                            />
                                          </span>
                                        </Tooltip>
                                      </td>

                                      <td className="table-row-data invoice">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.top3Invoice[1].cslno.toString()}

                                        />
                                        {/* {item.top3Invoice[1].cslno} */}
                                      </td>

                                      <td className="table-row-data invoiceDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.top3Invoice[1].invoicedt)}
                                        />
                                      </td>

                                      <td className="table-row-data startDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.top3Invoice[1].startdt)}
                                        />
                                      </td>
                                      <td className="table-row-data endDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.top3Invoice[1].enddt)}
                                        />
                                      </td>
                                      <td className="table-row-data openBalance" style={{ textAlign: "center" }}>
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={"₹" + item.top3Invoice[1].openingBalance}

                                        />
                                        {/* ₹{item.top3Invoice[1].openingBalance} */}
                                      </td>
                                      <td className="table-row-data amount">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={"₹" + item.top3Invoice[1].amount}

                                        />
                                        {/* ₹{item.top3Invoice[1].amount} */}
                                      </td>
                                      <td className="table-row-data dueDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.SegmentName === "HBB" ? formatDate(item.top3Invoice[1].duedt) : formatDate(item.top3Invoice[1].duedt)}
                                        />
                                      </td>
                                      {item.top3Invoice[1].unPaidBalance > 0 ? (
                                        <td className="table-row-data dueAmount" style={{ width: "130px" }}>
                                          <div id="due-amount">
                                            <span />
                                            {"₹" + item.top3Invoice[1].unPaidBalance}
                                          </div>
                                          <div
                                            id="pay-amount"
                                            className="d-none"
                                            onClick={() => navigateToPayNow(item)}
                                          >
                                            <div className="pay-amount-btn">pay now</div>
                                          </div>
                                        </td>
                                      ) :
                                        <td className="table-row-data paidAmount">
                                          <span />
                                          Paid
                                        </td>
                                      }

                                      <td className="table-row-data">
                                        <div className="dropdown spectra-dropdown">
                                          <div
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            role="button"
                                          >
                                            <img
                                              src={billingoptionicon}
                                              alt=""
                                            />
                                          </div>
                                          <ul className="dropdown-menu">
                                            {/* {item.top3Invoice[0].unPaidBalance === 0 ? (
                                            <li>
                                              <a class="dropdown-item" href="#" onclick="navigateToPayNow()">
                                                <img src={eyeopen} alt="" />
                                                <span>View</span>
                                              </a>
                                            </li>
                                          ) : ""} */}
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[1].invoiceNo, "download")}>
                                                <img src={download} alt="" />
                                                <span class="custom-span">&nbsp;Download</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[1].invoiceNo, "share")}>
                                                <img
                                                  src={shareicon}
                                                  alt=""
                                                />
                                                <span class="custom-span">&nbsp;Share</span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>

                                      </td>
                                    </tr> : ""
                                )) : <tr className="table-row"><td colSpan="10" style={{ textAlign: "center" }} className="table-row-data">No Invoices</td></tr> : "")}

                                {(getFinalInvoiceDetails && !getFinalDropdownSelection && !getPinnedClickedData ? getFinalInvoiceDetails.length > 0 ? getFinalInvoiceDetails?.map((item, index) => (
                                  item.top3Invoice && item.top3Invoice.length > 2 ?
                                    <tr key={index} className="table-row unpaid">
                                      {/* <td className="table-row-data service">
                                  <Highlighter
                                   highlightClassName="custom-highlight"
                                    searchWords={searchTerm}
                                    autoEscape={true}
                                    textToHighlight={item.PlanName && item.PlanName.toString()}
                                   
                                  />
                                    </td> */}
                                      <td className="table-row-data serviceId">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.CanId && item.CanId.toString()}

                                        />
                                        {/* {item.CanId} */}
                                      </td>
                                      <td className="table-row-data location">
                                        <Tooltip className="tooltip-billing" content={item.AreaName}>
                                          <span>
                                            <Highlighter
                                              highlightClassName="custom-highlight"
                                              searchWords={searchTerm}
                                              autoEscape={true}
                                              textToHighlight={item.AreaName ? item.AreaName.length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName : "N/A"}
                                            />
                                          </span>
                                        </Tooltip>
                                      </td>

                                      <td className="table-row-data invoice">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.top3Invoice && item.top3Invoice.length > 2 && item.top3Invoice[2] ? item.top3Invoice[2].cslno.toString() : ""}

                                        />
                                        {/* {item.top3Invoice[2].cslno} */}
                                      </td>

                                      <td className="table-row-data invoiceDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.top3Invoice[2].invoicedt)}
                                        />
                                      </td>

                                      <td className="table-row-data startDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.top3Invoice && item.top3Invoice.length > 2 && item.top3Invoice[2] ? formatDate(item.top3Invoice[2].startdt) : "N/A"}
                                        />
                                      </td>
                                      <td className="table-row-data endDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.top3Invoice && item.top3Invoice.length > 2 && item.top3Invoice[2] ? formatDate(item.top3Invoice[2].enddt) : "N/A"}
                                        />
                                      </td>
                                      <td className="table-row-data openBalance" style={{ textAlign: "center" }}>
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.top3Invoice && item.top3Invoice.length > 2 && item.top3Invoice[2] ? "₹" + item.top3Invoice[2].openingBalance : ""}

                                        />
                                        {/* ₹{item.top3Invoice[2].openingBalance} */}
                                      </td>
                                      <td className="table-row-data amount">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.top3Invoice && item.top3Invoice.length > 2 && item.top3Invoice[2] ? "₹" + item.top3Invoice[2].amount : ""}
                                        />
                                      </td>
                                      <td className="table-row-data dueDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.SegmentName === "HBB" ? formatDate(item.top3Invoice[2].duedt) : formatDate(item.top3Invoice[2].duedt)}
                                        />
                                      </td>
                                      {item.top3Invoice[1].unPaidBalance > 0 ? (
                                        <td className="table-row-data dueAmount" style={{ width: "130px" }}>
                                          <div id="due-amount">
                                            <span />
                                            {"₹" + item.top3Invoice[1].unPaidBalance}
                                          </div>
                                          <div
                                            id="pay-amount"
                                            className="d-none"
                                            onClick={() => navigateToPayNow(item)}
                                          >
                                            <div className="pay-amount-btn">pay now</div>
                                          </div>
                                        </td>
                                      ) :
                                        <td className="table-row-data paidAmount">
                                          <span />
                                          Paid
                                        </td>
                                      }

                                      <td className="table-row-data">
                                        <div className="dropdown spectra-dropdown">
                                          <div
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            role="button"
                                          >
                                            <img
                                              src={billingoptionicon}
                                              alt=""
                                            />
                                          </div>
                                          <ul className="dropdown-menu">
                                            {/* {item.top3Invoice[0].unPaidBalance === 0 ? (
                                            <li>
                                              <a class="dropdown-item" href="#" onclick="navigateToPayNow()">
                                                <img src={eyeopen} alt="" />
                                                <span>View</span>
                                              </a>
                                            </li>
                                          ) : ""} */}
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[2].invoiceNo, "download")}>
                                                <img src={download} alt="" />
                                                <span class="custom-span">&nbsp;Download</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[2].invoiceNo, "share")}>
                                                <img
                                                  src={shareicon}
                                                  alt=""
                                                />
                                                <span class="custom-span">&nbsp;Share</span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>

                                      </td>
                                    </tr> : ""
                                )) : <tr className="table-row"><td colSpan="10" style={{ textAlign: "center" }} className="table-row-data">No Invoices</td></tr> : "")}


                              </tbody>
                            </table>
                          </div>


                          {/* Display data as cards on small screens */}
                          <div className="d-block d-md-none">
                            {/* Pinned or Deafault Invoice Details */}
                            {getPinnedClickedData ? getPinnedClickedData.length > 0 ? getPinnedClickedData?.map((item, index) => (
                              <div key={index} className="table-content">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="table-row-data resp-name">
                                    {/* {getFinalDropdownSelection.PlanName}{" "} */}
                                    <span className="resp-innerHeading mx-2">
                                      (Service ID:
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={getPinnedSessionData.CanId.toString()}
                                      />
                                      )
                                    </span>
                                  </div>

                                  {item.unPaidBalance > 0 ? (
                                    <div className="table-row-data dueAmount">
                                      <div
                                        id="due-amount"
                                        className="d-flex align-items-center justify-content-between"
                                      >
                                        <div>
                                          <span className="dueAmount" />
                                        </div>
                                        {"₹" + item.unPaidBalance}
                                        <div className="dropdown spectra-dropdown">
                                          <div
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            role="button"
                                          >
                                            <img
                                              src={billingoptionicon}
                                              alt=""
                                            />
                                          </div>
                                          <ul className="dropdown-menu">
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "download")}>
                                                <img src={download} alt="" />
                                                <span class="custom-span">&nbsp;Download</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "share")}>
                                                <img
                                                  src={shareicon}
                                                  alt=""
                                                />
                                                <span class="custom-span">&nbsp;Share</span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>


                                      </div>
                                    </div>
                                  ) :

                                    <div className="table-row-data paidAmount">
                                      <div
                                        id="due-amount"
                                        className="d-flex align-items-center justify-content-between"
                                      >
                                        <div>
                                          <span className="paidAmount" />
                                        </div>
                                        Paid

                                        <div className="dropdown spectra-dropdown">
                                          <div
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            role="button"
                                          >
                                            <img
                                              src={billingoptionicon}
                                              alt=""
                                            />
                                          </div>
                                          <ul className="dropdown-menu">

                                            {/* <li>
                                            <a class="dropdown-item" href="#" onclick="navigateToPayNow()">
                                              <img src={eyeopen} alt="" />
                                              <span>View</span>
                                            </a>
                                          </li> */}

                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "download")}>
                                                <img src={download} alt="" />
                                                <span class="custom-span">&nbsp;Download</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "share")}>
                                                <img
                                                  src={shareicon}
                                                  alt=""
                                                />
                                                <span class="custom-span">&nbsp;Share</span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>


                                      </div>
                                    </div>
                                  }

                                </div>
                                <div className="table-row-data email d-flex align-items-center justify-content-between">
                                  <div>Location:
                                    <Tooltip className="tooltip-billing" content={getPinnedSessionData && getPinnedSessionData.AreaName}>
                                      <span>
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={getPinnedSessionData.AreaName ? getPinnedSessionData.AreaName.length > 10 ? getPinnedSessionData.AreaName.substring(0, 10) + "..." : getPinnedSessionData.AreaName : "N/A"}
                                        />
                                      </span>
                                    </Tooltip>
                                  </div>
                                  <div>Invoice No:
                                    <Highlighter
                                      highlightClassName="custom-highlight"
                                      searchWords={searchTerm}
                                      autoEscape={true}
                                      textToHighlight={item.cslno.toString()}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Start Date
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.startdt)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">End Date</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.enddt)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Opening Balance
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={"₹" + item.openingBalance}
                                        /></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Invoice Date
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.invoicedt)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">Amount</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={"₹" + item.amount}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">Due Date</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.duedt)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {item.unPaidBalance > 0 ?
                                  <div
                                    onClick={() => navigateToPayNow({ PlanName: getPinnedSessionData.PlanName, CanId: getPinnedSessionData.CanId, item })}
                                    className="pay-amount-btn">
                                    Pay now
                                  </div> : ""
                                }
                              </div>
                            )) : <div style={{ textAlign: 'center' }} className="table-row-data resp-name"> No Invoices </div> : ""}

                            {/* Selected Invoice Details */}
                            {(getFinalDropdownSelection && !getPinnedClickedData ? getFinalDropdownSelection.filteredInvoice.length > 0 ? getFinalDropdownSelection.filteredInvoice?.map((item, index) => (
                              <div key={index} className="table-content">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="table-row-data resp-name">
                                    {/* {getFinalDropdownSelection.PlanName}{" "} */}
                                    <span className="resp-innerHeading mx-2">
                                      (Service ID:
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={getFinalDropdownSelection.CanId.toString()}
                                      />
                                      )
                                    </span>
                                  </div>

                                  {item.unPaidBalance > 0 ? (
                                    <div className="table-row-data dueAmount">
                                      <div
                                        id="due-amount"
                                        className="d-flex align-items-center justify-content-between"
                                      >
                                        <div>
                                          <span className="dueAmount" />
                                        </div>
                                        {"₹" + item.unPaidBalance}
                                        <div className="dropdown spectra-dropdown">
                                          <div
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            role="button"
                                          >
                                            <img
                                              src={billingoptionicon}
                                              alt=""
                                            />
                                          </div>
                                          <ul className="dropdown-menu">
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "download")}>
                                                <img src={download} alt="" />
                                                <span class="custom-span">&nbsp;Download</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "share")}>
                                                <img
                                                  src={shareicon}
                                                  alt=""
                                                />
                                                <span class="custom-span">&nbsp;Share</span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>


                                      </div>
                                    </div>
                                  ) :

                                    <div className="table-row-data paidAmount">
                                      <div
                                        id="due-amount"
                                        className="d-flex align-items-center justify-content-between"
                                      >
                                        <div>
                                          <span className="paidAmount" />
                                        </div>
                                        Paid

                                        <div className="dropdown spectra-dropdown">
                                          <div
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            role="button"
                                          >
                                            <img
                                              src={billingoptionicon}
                                              alt=""
                                            />
                                          </div>
                                          <ul className="dropdown-menu">

                                            {/* <li>
                                            <a class="dropdown-item" href="#" onclick="navigateToPayNow()">
                                              <img src={eyeopen} alt="" />
                                              <span>View</span>
                                            </a>
                                          </li> */}

                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "download")}>
                                                <img src={download} alt="" />
                                                <span class="custom-span">&nbsp;Download</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "share")}>
                                                <img
                                                  src={shareicon}
                                                  alt=""
                                                />
                                                <span class="custom-span">&nbsp;Share</span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>


                                      </div>
                                    </div>
                                  }

                                </div>
                                <div className="table-row-data email d-flex align-items-center justify-content-between">
                                  <div>Location:
                                    <Tooltip className="tooltip-billing" content={item.AreaName}>
                                      <span>
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={getFinalDropdownSelection.AreaName ? getFinalDropdownSelection.AreaName.length > 10 ? getFinalDropdownSelection.AreaName.substring(0, 10) + "..." : getFinalDropdownSelection.AreaName : "N/A"}
                                        />
                                      </span>
                                    </Tooltip>
                                  </div>
                                  <div>Invoice No:
                                    <Highlighter
                                      highlightClassName="custom-highlight"
                                      searchWords={searchTerm}
                                      autoEscape={true}
                                      textToHighlight={item.cslno.toString()}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Start Date
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.startdt)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">End Date</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.enddt)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Opening Balance
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={"₹" + item.openingBalance}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Invoice Date
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.invoicedt)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">Amount</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={"₹" + item.amount}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">Due Date</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={getFinalDropdownSelection.SegmentName === "HBB" ? formatDate(item.duedt) : formatDate(item.duedt)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {item.unPaidBalance > 0 ?
                                  <div
                                    onClick={() => navigateToPayNow({ PlanName: getFinalDropdownSelection.PlanName, CanId: getFinalDropdownSelection.CanId, item })}
                                    className="pay-amount-btn">
                                    Pay now
                                  </div> : ""
                                }
                              </div>
                            )) : <div style={{ textAlign: 'center' }} className="table-row-data resp-name"> No Invoices </div> : "")}

                            {/* Default Invoice Details */}
                            {(getFinalInvoiceDetails && !getPinnedClickedData && !getFinalDropdownSelection ? getFinalInvoiceDetails.length > 0 ? getFinalInvoiceDetails?.map((item, index) => (
                              item.top3Invoice && item.top3Invoice.length > 0 ?
                                <div key={index} className="table-content">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div className="table-row-data resp-name">
                                      {/* {item.PlanName}{" "} */}
                                      <span className="resp-innerHeading mx-2">
                                        (Service ID:
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.CanId.toString()}
                                        />
                                        )
                                      </span>
                                    </div>

                                    {item.top3Invoice[0].unPaidBalance > 0 ? (
                                      <div className="table-row-data dueAmount">
                                        <div
                                          id="due-amount"
                                          className="d-flex align-items-center justify-content-between"
                                        >
                                          <div>
                                            <span className="dueAmount" />
                                          </div>
                                          {"₹" + item.top3Invoice[0].unPaidBalance}
                                          <div className="dropdown spectra-dropdown">
                                            <div
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                              role="button"
                                            >
                                              <img
                                                src={billingoptionicon}
                                                alt=""
                                              />
                                            </div>
                                            <ul className="dropdown-menu">
                                              <li>
                                                <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[0].invoiceNo, "download")}>
                                                  <img src={download} alt="" />
                                                  <span class="custom-span">&nbsp;Download</span>
                                                </a>
                                              </li>
                                              <li>
                                                <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[0].invoiceNo, "share")}>
                                                  <img
                                                    src={shareicon}
                                                    alt=""
                                                  />
                                                  <span class="custom-span">&nbsp;Share</span>
                                                </a>
                                              </li>
                                            </ul>
                                          </div>


                                        </div>
                                      </div>
                                    ) :

                                      <div className="table-row-data paidAmount">
                                        <div
                                          id="due-amount"
                                          className="d-flex align-items-center justify-content-between"
                                        >
                                          <div>
                                            <span className="paidAmount" />
                                          </div>
                                          Paid

                                          <div className="dropdown spectra-dropdown">
                                            <div
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                              role="button"
                                            >
                                              <img
                                                src={billingoptionicon}
                                                alt=""
                                              />
                                            </div>
                                            <ul className="dropdown-menu">

                                              {/* <li>
                                            <a class="dropdown-item" href="#" onclick="navigateToPayNow()">
                                              <img src={eyeopen} alt="" />
                                              <span>View</span>
                                            </a>
                                          </li> */}

                                              <li>
                                                <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[0].invoiceNo, "download")}>
                                                  <img src={download} alt="" />
                                                  <span class="custom-span">&nbsp;Download</span>
                                                </a>
                                              </li>
                                              <li>
                                                <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[0].invoiceNo, "share")}>
                                                  <img
                                                    src={shareicon}
                                                    alt=""
                                                  />
                                                  <span class="custom-span">&nbsp;Share</span>
                                                </a>
                                              </li>
                                            </ul>
                                          </div>


                                        </div>
                                      </div>
                                    }

                                  </div>
                                  <div className="table-row-data email d-flex align-items-center justify-content-between">
                                    <div>Location:
                                      <Tooltip className="tooltip-billing" content={item.AreaName}>
                                        <span>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={item.AreaName ? item.AreaName.length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName : "N/A"}
                                          />
                                        </span>
                                      </Tooltip>
                                    </div>
                                    <div>Invoice No:
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={item.top3Invoice[0].cslno.toString()}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">

                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Start Date
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={formatDate(item.top3Invoice[0].startdt)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">End Date</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={formatDate(item.top3Invoice[0].enddt)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Opening Balance
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={"₹" + item.top3Invoice[0].openingBalance}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Invoice Date
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={formatDate(item.top3Invoice[0].invoicedt)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">Amount</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={"₹" + item.top3Invoice[0].amount}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">Due Date</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={item.SegmentName === "HBB" ? formatDate(item.top3Invoice[0].duedt) : formatDate(item.top3Invoice[0].duedt)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {item.top3Invoice[0].unPaidBalance > 0 ?
                                    <div onClick={() => navigateToPayNow(item)} className="pay-amount-btn">Pay now</div> : ""
                                  }
                                </div> : ""
                            )) : <div style={{ textAlign: 'center' }} className="table-row-data resp-name"> No Invoices </div> : "")}

                            {(getFinalInvoiceDetails && !getPinnedClickedData && !getFinalDropdownSelection ? getFinalInvoiceDetails.length > 0 ? getFinalInvoiceDetails?.map((item, index) => (
                              item.top3Invoice && item.top3Invoice.length > 1 ?
                                <div key={index} className="table-content">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div className="table-row-data resp-name">
                                      {/* {item.PlanName}{" "} */}
                                      <span className="resp-innerHeading mx-2">
                                        (Service ID:
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.CanId.toString()}
                                        />)
                                      </span>
                                    </div>

                                    {item.top3Invoice[1].unPaidBalance > 0 ? (
                                      <div className="table-row-data dueAmount">
                                        <div
                                          id="due-amount"
                                          className="d-flex align-items-center justify-content-between"
                                        >
                                          <div>
                                            <span className="dueAmount" />
                                          </div>
                                          {"₹" + item.top3Invoice[1].unPaidBalance}
                                          <div className="dropdown spectra-dropdown">
                                            <div
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                              role="button"
                                            >
                                              <img
                                                src={billingoptionicon}
                                                alt=""
                                              />
                                            </div>
                                            <ul className="dropdown-menu">
                                              <li>
                                                <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[1].invoiceNo, "download")}>
                                                  <img src={download} alt="" />
                                                  <span class="custom-span">&nbsp;Download</span>
                                                </a>
                                              </li>
                                              <li>
                                                <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[1].invoiceNo, "share")}>
                                                  <img
                                                    src={shareicon}
                                                    alt=""
                                                  />
                                                  <span class="custom-span">&nbsp;Share</span>
                                                </a>
                                              </li>
                                            </ul>
                                          </div>


                                        </div>
                                      </div>
                                    ) :

                                      <div className="table-row-data paidAmount">
                                        <div
                                          id="due-amount"
                                          className="d-flex align-items-center justify-content-between"
                                        >
                                          <div>
                                            <span className="paidAmount" />
                                          </div>
                                          Paid

                                          <div className="dropdown spectra-dropdown">
                                            <div
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                              role="button"
                                            >
                                              <img
                                                src={billingoptionicon}
                                                alt=""
                                              />
                                            </div>
                                            <ul className="dropdown-menu">

                                              {/* <li>
                                            <a class="dropdown-item" href="#" onclick="navigateToPayNow()">
                                              <img src={eyeopen} alt="" />
                                              <span>View</span>
                                            </a>
                                          </li> */}

                                              <li>
                                                <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[1].invoiceNo, "download")}>
                                                  <img src={download} alt="" />
                                                  <span class="custom-span">&nbsp;Download</span>
                                                </a>
                                              </li>
                                              <li>
                                                <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[1].invoiceNo, "share")}>
                                                  <img
                                                    src={shareicon}
                                                    alt=""
                                                  />
                                                  <span class="custom-span">&nbsp;Share</span>
                                                </a>
                                              </li>
                                            </ul>
                                          </div>


                                        </div>
                                      </div>
                                    }

                                  </div>
                                  <div className="table-row-data email d-flex align-items-center justify-content-between">
                                    <div>Location:
                                      <Tooltip className="tooltip-billing" content={item.AreaName}>
                                        <span>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={(item.AreaName).length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName}
                                          />
                                        </span>
                                      </Tooltip>
                                    </div>
                                    <div>Invoice:
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={item.top3Invoice[1].cslno.toString()}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Start Date
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={formatDate(item.top3Invoice[1].startdt)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">End Date</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={formatDate(item.top3Invoice[1].enddt)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Opening Balance
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={"₹" + item.top3Invoice[1].openingBalance}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Invoice Date
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={formatDate(item.top3Invoice[1].invoicedt)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">Amount</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={"₹" + item.top3Invoice[1].amount}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">Due Date</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={item.SegmentName === "HBB" ? formatDate(item.top3Invoice[1].duedt) : formatDate(item.top3Invoice[1].duedt)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {item.top3Invoice[1].unPaidBalance > 0 ?
                                    <div onClick={() => navigateToPayNow(item)} className="pay-amount-btn">Pay now</div> : ""
                                  }
                                </div> : ""
                            )) : <div style={{ textAlign: 'center' }} className="table-row-data resp-name"> No Invoices </div> : "")}

                            {(getFinalInvoiceDetails && !getPinnedClickedData && !getFinalDropdownSelection ? getFinalInvoiceDetails.length > 0 ? getFinalInvoiceDetails?.map((item, index) => (
                              item.top3Invoice && item.top3Invoice.length > 2 ?
                                <div key={index} className="table-content">
                                  <div className="d-flex align-items-center justify-content-between">
                                    <div className="table-row-data resp-name">
                                      {/* {item.PlanName}{" "} */}
                                      <span className="resp-innerHeading mx-2">
                                        (Service ID:
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.CanId.toString()}
                                        />)
                                      </span>
                                    </div>

                                    {item.top3Invoice && item.top3Invoice[2] && item.top3Invoice[2].unPaidBalance > 0 ? (
                                      <div className="table-row-data dueAmount">
                                        <div
                                          id="due-amount"
                                          className="d-flex align-items-center justify-content-between"
                                        >
                                          <div>
                                            <span className="dueAmount" />
                                          </div>
                                          {"₹" + item.top3Invoice[2].unPaidBalance}
                                          <div className="dropdown spectra-dropdown">
                                            <div
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                              role="button"
                                            >
                                              <img
                                                src={billingoptionicon}
                                                alt=""
                                              />
                                            </div>
                                            <ul className="dropdown-menu">
                                              <li>
                                                <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[2].invoiceNo, "download")}>
                                                  <img src={download} alt="" />
                                                  <span class="custom-span">&nbsp;Download</span>
                                                </a>
                                              </li>
                                              <li>
                                                <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[2].invoiceNo, "share")}>
                                                  <img
                                                    src={shareicon}
                                                    alt=""
                                                  />
                                                  <span class="custom-span">&nbsp;Share</span>
                                                </a>
                                              </li>
                                            </ul>
                                          </div>


                                        </div>
                                      </div>
                                    ) :

                                      <div className="table-row-data paidAmount">
                                        <div
                                          id="due-amount"
                                          className="d-flex align-items-center justify-content-between"
                                        >
                                          <div>
                                            <span className="paidAmount" />
                                          </div>
                                          Paid

                                          <div className="dropdown spectra-dropdown">
                                            <div
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                              role="button"
                                            >
                                              <img
                                                src={billingoptionicon}
                                                alt=""
                                              />
                                            </div>
                                            <ul className="dropdown-menu">

                                              {/* <li>
                                            <a class="dropdown-item" href="#" onclick="navigateToPayNow()">
                                              <img src={eyeopen} alt="" />
                                              <span>View</span>
                                            </a>
                                          </li> */}

                                              <li>
                                                <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[2].invoiceNo, "download")}>
                                                  <img src={download} alt="" />
                                                  <span class="custom-span">&nbsp;Download</span>
                                                </a>
                                              </li>
                                              <li>
                                                <a className="dropdown-item" href="#" onClick={() => getInvoice(item.top3Invoice[2].invoiceNo, "share")}>
                                                  <img
                                                    src={shareicon}
                                                    alt=""
                                                  />
                                                  <span class="custom-span">&nbsp;Share</span>
                                                </a>
                                              </li>
                                            </ul>
                                          </div>


                                        </div>
                                      </div>
                                    }

                                  </div>
                                  <div className="table-row-data email d-flex align-items-center justify-content-between">
                                    <div>Location:
                                      <Tooltip className="tooltip-billing" content={item.AreaName}>
                                        <span>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={item.AreaName ? item.AreaName.length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName : "N/A"}
                                          />
                                        </span>
                                      </Tooltip>
                                    </div>
                                    <div>Invoice:
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={item.top3Invoice && item.top3Invoice.length > 2 && item.top3Invoice[2] ? item.top3Invoice[2].cslno.toString() : ""}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Start Date
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={item.top3Invoice && item.top3Invoice.length > 2 && item.top3Invoice[2] ? formatDate(item.top3Invoice[1].startdt) : ""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">End Date</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={item.top3Invoice && item.top3Invoice.length > 2 && item.top3Invoice[2] ? formatDate(item.top3Invoice[1].enddt) : ""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Opening Balance
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={item.top3Invoice && item.top3Invoice.length > 2 && item.top3Invoice[2] ? "₹" + item.top3Invoice[2].openingBalance : ""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Invoice Date
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={formatDate(item.top3Invoice[2].invoicedt)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">Amount</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={item.top3Invoice && item.top3Invoice.length > 2 && item.top3Invoice[2] ? "₹" + item.top3Invoice[2].amount : ""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">Due Date</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={item.top3Invoice && item.top3Invoice.length > 2 && item.top3Invoice[2] ? item.SegmentName === "HBB" ? formatDate(item.top3Invoice[2].duedt) : formatDate(item.top3Invoice[2].duedt) : ""}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {item.top3Invoice && item.top3Invoice.length > 2 && item.top3Invoice[2] && item.top3Invoice[2].unPaidBalance !== undefined && item.top3Invoice[2].unPaidBalance > 0 ?
                                    <div onClick={() => navigateToPayNow(item)} className="pay-amount-btn">Pay now</div> : ""
                                  }
                                </div> : ""
                            )) : <div style={{ textAlign: 'center' }} className="table-row-data resp-name"> No Invoices </div> : "")}

                          </div>
                        </div>


                        {/* Transactions Table  */}
                        <div
                          id="transaction-table"
                          className="account-table-container"
                          style={{ display: "none" }}
                          ref={transactionTableRef}
                        >
                          {/* Top bar */}
                          <div className="table-top-bar d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <div className="table-name flex-grow-1">Transactions</div>
                            {/* NK */}
                            <div class="d-flex align-items-center gap-3 flex-wrap">
                              {/* <!-- Location selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {<span class="textValue">{getSelectedCityTrans ? getSelectedCityTrans : getPinnedSessionData && !allCityFlag ? getPinnedSessionData.LocationName : getLogInLocationT ? getLogInLocationT : "All City"}</span>}
                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") && <span class="textValue">{getLogInLocation}</span>} */}
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  <li class="dropdown-item" data-value="Select All City" onClick={() => dropdownSelectionTransaction("Select All City", "city")} style={{ fontSize: "14px" }}>All City</li>
                                  {getUniqueLocation ? getUniqueLocation.map((city, index) => (
                                    <li key={index} class="dropdown-item" data-value={city} onClick={() => dropdownSelectionTransaction(city, "city")} style={{ fontSize: "14px" }}>
                                      {city}
                                    </li>
                                  )) : ""}
                                </ul>
                              </div>
                              {/* <!-- Address selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {<span class="textValue">{getSelectedAreaTrans ? getSelectedAreaTrans : getPinnedSessionData ? getPinnedFlag ? "Select Area" : getPinnedSessionData.AreaName : getLogInAreaT ? getLogInAreaT : "Select Area"}</span>}
                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") && <span class="textValue">{getLogInArea}</span>} */}
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  {getUniqueAreaListTrans ? getUniqueAreaListTrans.map((area, index) => (
                                    <li key={index} class="dropdown-item" data-value={area} onClick={() => dropdownSelectionTransaction(area, "area")} style={{ fontSize: "14px" }}>
                                      {area}
                                    </li>
                                  )) : ""}
                                </ul>
                              </div>

                              {/* <!-- Date range picker --> */}
                              {/* <div class="spectra-dropdown">
                            <div class="select-custom dropdown-toggle rounded-0" id="reportrange">
                              <div class="d-flex align-items-center gap-2">
                                <img src={iconcalendar} alt="" />
                                <span>Today </span>
                              </div>
                            </div>
                          </div> */}


                              {/* <!-- Product selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={productIcon} alt="" />
                                    {<span class="textValue">{getSelectedProductTrans ? getSelectedProductTrans : getPinnedSessionData ? getPinnedFlag ? "Select Product" : getPinnedSessionData.SegmentName + " (" + getPinnedSessionData.CanId + ")" : getLogInSegmentT ? getLogInSegmentT + " (" + getLogInCanId + ")" : "Select Product"}</span>}
                                    {/* {(getLogInSegment === "OBB" || getLogInSegment === "HBB") && <span class="textValue">{getLogInSegment + " (" + getLogInCanId + ")"}</span>} */}
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  {getUniqueProductListTrans ? getUniqueProductListTrans.map((item, index) => (
                                    <li key={index} class="dropdown-item" data-value={item.SegmentName + " (" + item.CanId + ")"} onClick={() => dropdownSelectionTransaction([item.SegmentName, item.CanId], "segment")} style={{ fontSize: "14px" }}>
                                      {item.SegmentName + " (" + item.CanId + ")"}
                                    </li>
                                  )) : ""}
                                </ul>
                              </div>

                              {/* <div class="spectra-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0">
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={iconcalendar} alt="" /> */}
                              {/* <span>Today </span> */}

                              <DateRangePicker
                                initialSettings={{
                                  ranges: {
                                    '1 Month': [moment().subtract(1, 'months'), moment()],
                                    '3 Months': [moment().subtract(3, 'months'), moment()],
                                    '6 Months': [moment().subtract(6, 'months'), moment()],
                                    '9 Months': [moment().subtract(9, 'months'), moment().subtract(1, 'days')],
                                    '1 Year': [moment().subtract(1, 'years'), moment()]
                                  },
                                  maxDate: new Date()
                                }}
                                onApply={handleDateRangeChangeTrans}
                              >
                                <div class="spectra-dropdown">
                                  <div class="select-custom dropdown-toggle rounded-0">
                                    <div className="d-flex align-items-center gap-2">
                                      <img src={iconcalendar} alt="" />
                                      <span
                                        type="text"
                                        className=""
                                        value={selectedRangeTrans}
                                      >{selectedRangeTrans}</span>
                                    </div>
                                  </div>
                                </div>
                              </DateRangePicker>
                            </div>

                            {/* </div> */}
                            {/* <ul class="dropdown-menu" onClick={(value) => dropdownSelection(value, "period")}>
                                <li class="dropdown-item" data-value="1" value="1 Month">1 Month</li>
                                <li class="dropdown-item" data-value="2" value="3 Months">3 Months</li>
                                <li class="dropdown-item" data-value="3" value="6 months">6 months</li>
                                <li class="dropdown-item" data-value="4" value="9 Month">9 Months</li>
                                <li class="dropdown-item" data-value="5" value="1 Year">1 Year</li>
                                <li class="dropdown-item" data-value="6" value="Custom Date">Custom Date</li>
                              </ul> */}
                            {/* </div>
                            </div> */}
                            {/* search bar */}
                            <div className="table-search-wrapper d-flex align-items-center">
                              <input
                                className="table-search-input dashboard-search-input"
                                placeholder="Search"
                                type="text"
                                id="search"
                                name="search"
                                value={searchTermTrans}
                                onChange={handleSearchTrans}
                              />
                              <img src={tablesearch} alt="" />
                            </div>
                          </div>




                          {/* transaction table for large screen devices */}
                          <div className="horizontal-scroll-container d-none d-md-block">
                            <table className="account-table">
                              <tbody>
                                <tr className="table-header transaction-header">
                                  {/* <th className="table-header-data">Service</th> */}
                                  <th className="table-header-data">Service ID</th>
                                  <th className="table-header-data">Location</th>
                                  <th className="table-header-data">Transaction ID</th>
                                  <th className="table-header-data">Transaction Date</th>
                                  <th className="table-header-data">Type</th>
                                  <th className="table-header-data">Amount</th>
                                  <th className="table-header-data">Payment Mode</th>
                                  <th className="table-header-data">Description</th>
                                </tr>

                                {/* Pinned Transaction List */}
                                {getPinnedClickedTransData && getPinnedSessionData ? getPinnedClickedTransData.length > 0 ? getPinnedClickedTransData?.map((item, index) => (
                                  <tr key={index} className="table-row unpaid">
                                    {/* <td className="table-row-data service">{getFinalDropdownSelectionTrans.PlanName}</td> */}
                                    <td className="table-row-data serviceId">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={getPinnedSessionData && getPinnedSessionData.CanId}
                                      />
                                    </td>
                                    <td className="table-row-data location">
                                      <Tooltip className="tooltip-billing" content={getPinnedSessionData && getPinnedSessionData.AreaName}>
                                        <span>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={getPinnedSessionData && getPinnedSessionData.AreaName ? getPinnedSessionData.AreaName.length > 10 ? getPinnedSessionData.AreaName.substring(0, 10) + "..." : getPinnedSessionData.AreaName : "N/A"}
                                          />
                                        </span>
                                      </Tooltip>
                                    </td>
                                    <td className="table-row-data transactions">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.srlNo.toString()}
                                      />
                                    </td>
                                    <td className="table-row-data transactionDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={formatDate(item.transactionDate)}
                                      />
                                    </td>
                                    <td className="table-row-data transactionType">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.voucherType}
                                      />
                                    </td>
                                    <td className="table-row-data amount">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={"₹" + item.amount}
                                      />
                                    </td>
                                    <td className="table-row-data paymentMode">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.instrumentType ? item.instrumentType : "N/A"}
                                      />
                                    </td>
                                    <td className="table-row-data description">
                                      <p>
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.instrumentDetail ? item.instrumentDetail : "N/A"}
                                        />
                                      </p>
                                    </td>
                                  </tr>
                                )) : <tr className="table-row"><td colSpan="8" style={{ textAlign: "center" }} className="table-row-data">No data available</td></tr> : ""}

                                {/* Selected Transaction List */}
                                {(getFinalDropdownSelectionTrans && !getPinnedClickedTransData ? getFinalDropdownSelectionTrans.transactionHistory.length > 0 ? getFinalDropdownSelectionTrans.transactionHistory?.map((item, index) => (
                                  <tr key={index} className="table-row unpaid">
                                    {/* <td className="table-row-data service">{getFinalDropdownSelectionTrans.PlanName}</td> */}
                                    <td className="table-row-data serviceId">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={getFinalDropdownSelectionTrans.CanId.toString()}
                                      />
                                    </td>
                                    <td className="table-row-data location">
                                      <Tooltip className="tooltip-billing" content={getFinalDropdownSelectionTrans.AreaName}>
                                        <span>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={getFinalDropdownSelectionTrans.AreaName ? getFinalDropdownSelectionTrans.AreaName.length > 10 ? getFinalDropdownSelectionTrans.AreaName.substring(0, 10) + "..." : getFinalDropdownSelectionTrans.AreaName : "N/A"}
                                          />
                                        </span>
                                      </Tooltip>
                                    </td>
                                    <td className="table-row-data transactions">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.srlNo.toString()}
                                      />
                                    </td>
                                    <td className="table-row-data transactionDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={formatDate(item.transactionDate)}
                                      />
                                    </td>
                                    <td className="table-row-data transactionType">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.voucherType}
                                      />
                                    </td>
                                    <td className="table-row-data amount">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={"₹" + item.amount}
                                      />
                                    </td>
                                    <td className="table-row-data paymentMode">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.instrumentType ? item.instrumentType : "N/A"}
                                      />
                                    </td>
                                    <td className="table-row-data description">
                                      <p>
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.instrumentDetail ? item.instrumentDetail : "N/A"}
                                        />
                                      </p>
                                    </td>
                                  </tr>
                                )) : <tr className="table-row"><td colSpan="8" style={{ textAlign: "center" }} className="table-row-data">No data available</td></tr> : "")}

                                {/* All City Transaction List */}
                                {getFinalTransactionHistory && !getFinalDropdownSelectionTrans && !getPinnedClickedTransData ? getFinalTransactionHistory.length > 0 ? getFinalTransactionHistory?.map((item, index) => (
                                  item.top3TransactionHistory[0] && item.top3TransactionHistory.length > 0 ?
                                    <tr key={index} className="table-row unpaid">
                                      {/* <td className="table-row-data service">{item.PlanName}</td> */}
                                      <td className="table-row-data serviceId">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.CanId && item.CanId.toString()}
                                        />
                                      </td>
                                      <td className="table-row-data location">
                                        <Tooltip className="tooltip-billing" content={item.AreaName && item.AreaName}>
                                          <span>
                                            <Highlighter
                                              highlightClassName="custom-highlight"
                                              searchWords={searchTermTrans}
                                              autoEscape={true}
                                              textToHighlight={item.AreaName ? item.AreaName.length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName : "N/A"}
                                            />
                                          </span>
                                        </Tooltip>
                                      </td>
                                      <td className="table-row-data transactions">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.top3TransactionHistory[0].srlNo && item.top3TransactionHistory[0].srlNo.toString()}
                                        />
                                      </td>
                                      <td className="table-row-data transactionDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.top3TransactionHistory[0].transactionDate).toString()}
                                        />
                                      </td>
                                      <td className="table-row-data transactionType">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.top3TransactionHistory[0].voucherType}
                                        />
                                      </td>
                                      <td className="table-row-data amount">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={"₹" + item.top3TransactionHistory[0].amount.toString()}
                                        />
                                      </td>
                                      <td className="table-row-data paymentMode">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight=
                                          {item.top3TransactionHistory[0].instrumentType ? item.top3TransactionHistory[0].instrumentType : "N/A"}
                                        />
                                      </td>
                                      <td className="table-row-data description">
                                        <p>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight=
                                            {item.top3TransactionHistory[0].instrumentDetail ? item.top3TransactionHistory[0].instrumentDetail : "N/A"}
                                          />
                                        </p>
                                      </td>
                                    </tr> : ""
                                )) : <tr className="table-row"><td colSpan="8" style={{ textAlign: "center" }} className="table-row-data">No data available</td></tr> : ""}

                                {getFinalTransactionHistory && !getFinalDropdownSelectionTrans && !getPinnedClickedTransData ? getFinalTransactionHistory.length > 0 ? getFinalTransactionHistory?.map((item, index) => (
                                  item.top3TransactionHistory[1] && item.top3TransactionHistory.length > 1 ?
                                    <tr key={index} className="table-row unpaid">
                                      {/* <td className="table-row-data service">{item.PlanName}</td> */}
                                      <td className="table-row-data serviceId">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.CanId.toString()}
                                        />
                                      </td>
                                      <td className="table-row-data location">
                                        <Tooltip className="tooltip-billing" content={item.AreaName}>
                                          <span>
                                            {/* {(item.AreaName).length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName} */}
                                            <Highlighter
                                              highlightClassName="custom-highlight"
                                              searchWords={searchTermTrans}
                                              autoEscape={true}
                                              textToHighlight={item.AreaName ? item.AreaName.length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName : "N/A"}
                                            />
                                          </span>
                                        </Tooltip>
                                      </td>
                                      <td className="table-row-data transactions">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.top3TransactionHistory[1].srlNo && item.top3TransactionHistory[1].srlNo.toString()}
                                        />
                                      </td>
                                      <td className="table-row-data transactionDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.top3TransactionHistory[1].transactionDate && formatDate(item.top3TransactionHistory[1].transactionDate)}
                                        />
                                      </td>
                                      <td className="table-row-data transactionType">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.top3TransactionHistory[1].voucherType && item.top3TransactionHistory[1].voucherType}
                                        />
                                      </td>
                                      <td className="table-row-data amount">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.top3TransactionHistory[1].amount && "₹" + item.top3TransactionHistory[1].amount.toString()}
                                        />
                                      </td>
                                      <td className="table-row-data paymentMode">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.top3TransactionHistory[1].instrumentType ? item.top3TransactionHistory[1].instrumentType : "N/A"}
                                        />
                                      </td>
                                      <td className="table-row-data description">
                                        <p>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={item.top3TransactionHistory[1].instrumentDetail ? item.top3TransactionHistory[1].instrumentDetail : "N/A"}
                                          />
                                        </p>
                                      </td>
                                    </tr> : ""
                                )) : <tr className="table-row"><td colSpan="8" style={{ textAlign: "center" }} className="table-row-data">No data available</td></tr> : ""}

                                {getFinalTransactionHistory && !getFinalDropdownSelectionTrans && !getPinnedClickedTransData ? getFinalTransactionHistory.length > 0 ? getFinalTransactionHistory?.map((item, index) => (
                                  item.top3TransactionHistory[2] && item.top3TransactionHistory.length > 2 ?
                                    <tr key={index} className="table-row unpaid">
                                      {/* <td className="table-row-data service">{item.PlanName}</td> */}
                                      <td className="table-row-data serviceId">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.CanId.toString()}
                                        />
                                      </td>
                                      <td className="table-row-data location">
                                        <Tooltip className="tooltip-billing" content={item.AreaName}>
                                          <span>
                                            {/* {(item.AreaName).length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName} */}
                                            <Highlighter
                                              highlightClassName="custom-highlight"
                                              searchWords={searchTermTrans}
                                              autoEscape={true}
                                              textToHighlight={item.AreaName ? item.AreaName.length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName : "N/A"}
                                            />
                                          </span>
                                        </Tooltip>
                                      </td>
                                      <td className="table-row-data transactions">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.top3TransactionHistory && item.top3TransactionHistory.length > 2 && item.top3TransactionHistory[2] ? item.top3TransactionHistory[2].srlNo.toString() : ""}
                                        />
                                      </td>
                                      <td className="table-row-data transactionDate">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.top3TransactionHistory[2].transactionDate)}
                                        />
                                      </td>
                                      <td className="table-row-data transactionType">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.top3TransactionHistory[2].voucherType}
                                        />
                                      </td>
                                      <td className="table-row-data amount">₹{item.top3TransactionHistory[2].amount}</td>
                                      <td className="table-row-data paymentMode">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.top3TransactionHistory[2].instrumentType ? item.top3TransactionHistory[2].instrumentType : "N/A"}
                                        />
                                      </td>
                                      <td className="table-row-data description">
                                        <p>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={item.top3TransactionHistory[2].instrumentDetail ? item.top3TransactionHistory[2].instrumentDetail : "N/A"}
                                          />
                                        </p>
                                      </td>
                                    </tr> : ""
                                )) : <tr className="table-row"><td colSpan="8" style={{ textAlign: "center" }} className="table-row-data">No data available</td></tr> : ""}





                              </tbody>
                            </table>
                          </div>

                          {/* transactions table for small screen devices <768px */}
                          <div className="d-block d-md-none">
                            {/* Pinned Transaction List */}
                            {getPinnedClickedTransData && getPinnedSessionData ? getPinnedClickedTransData.length > 0 ? getPinnedClickedTransData?.map((item, index) => (

                              <div key={index} className="table-content">
                                <div className="table-row-data resp-name">
                                  {/* {getFinalDropdownSelectionTrans.PlanName}{" "} */}
                                  <span className="resp-innerHeading mx-2">
                                    (Service ID:
                                    <Highlighter
                                      highlightClassName="custom-highlight"
                                      searchWords={searchTermTrans}
                                      autoEscape={true}
                                      textToHighlight={getPinnedSessionData && getPinnedSessionData.CanId.toString()}
                                    />)
                                  </span>
                                </div>
                                <div className="table-row-data email d-flex align-items-center justify-content-between">
                                  <div>Location:
                                    <Tooltip className="tooltip-billing" content={getPinnedSessionData && getPinnedSessionData.AreaName}>
                                      <span>
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={getPinnedSessionData && (getPinnedSessionData.AreaName).length > 10 ? getPinnedSessionData.AreaName.substring(0, 10) + "..." : getPinnedSessionData.AreaName}
                                        />
                                      </span>
                                    </Tooltip></div>
                                  <div>Transaction ID:
                                    <Highlighter
                                      highlightClassName="custom-highlight"
                                      searchWords={searchTermTrans}
                                      autoEscape={true}
                                      textToHighlight={item.srlNo.toString()}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Transaction Date
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={new Date(item.transactionDate).toLocaleDateString('en-GB')}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">Type</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.voucherType}
                                        /></div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">Amount</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={"₹" + item.amount}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Payment Mode
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.instrumentType ? item.instrumentType : "N/A"}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Description
                                      </div>
                                      <div className="resp-contact resp-description">
                                        <p>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={item.instrumentDetail ? item.instrumentDetail : "N/A"}
                                          />
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )) : <div style={{ textAlign: 'center' }} className="table-row-data resp-name"> No Transactions </div> : ""}

                            {/* Selected Transaction List */}
                            {getLogInSegment !== "OBB" && getLogInSegment !== "HBB" && (getFinalDropdownSelectionTrans && !getPinnedClickedTransData && (getFinalDropdownSelectionTrans && getFinalDropdownSelectionTrans.transactionHistory.length > 0 ? getFinalDropdownSelectionTrans.transactionHistory?.map((item, index) => (

                              <div key={index} className="table-content">
                                <div className="table-row-data resp-name">
                                  {/* {getFinalDropdownSelectionTrans.PlanName}{" "} */}
                                  <span className="resp-innerHeading mx-2">
                                    (Service ID:
                                    <Highlighter
                                      highlightClassName="custom-highlight"
                                      searchWords={searchTermTrans}
                                      autoEscape={true}
                                      textToHighlight={getFinalDropdownSelectionTrans.CanId.toString()}
                                    />)
                                  </span>
                                </div>
                                <div className="table-row-data email d-flex align-items-center justify-content-between">
                                  <div>Location:
                                    <Tooltip className="tooltip-billing" content={getFinalDropdownSelectionTrans.AreaName}>
                                      <span>
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={getFinalDropdownSelectionTrans.AreaName && (getFinalDropdownSelectionTrans.AreaName).length > 10 ? getFinalDropdownSelectionTrans.AreaName.substring(0, 10) + "..." : getFinalDropdownSelectionTrans.AreaName}
                                        />
                                      </span>
                                    </Tooltip></div>
                                  <div>Transaction ID:
                                    <Highlighter
                                      highlightClassName="custom-highlight"
                                      searchWords={searchTermTrans}
                                      autoEscape={true}
                                      textToHighlight={item.srlNo.toString()}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Transaction Date
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.transactionDate)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">Type</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.voucherType}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">Amount</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={"₹" + item.amount}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Payment Mode
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.instrumentType ? item.instrumentType : "N/A"}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Description
                                      </div>
                                      <div className="resp-contact resp-description">
                                        <p>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={item.instrumentDetail ? item.instrumentDetail : "N/A"}
                                          />
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )) : <div style={{ textAlign: 'center' }} className="table-row-data resp-name"> No Transactions </div>))}

                            {/* all city Transaction List */}
                            {getFinalTransactionHistory && !getFinalDropdownSelectionTrans && !getPinnedClickedTransData ? getFinalTransactionHistory.length > 0 ? getFinalTransactionHistory?.map((item, index) => (
                              item.top3TransactionHistory[0] && item.top3TransactionHistory.length > 0 ?
                                <div key={index} className="table-content">
                                  <div className="table-row-data resp-name">
                                    {/* {item.PlanName}{" "} */}
                                    <span className="resp-innerHeading mx-2">
                                      (Service ID:
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.CanId.toString()}
                                      />)
                                    </span>
                                  </div>
                                  <div className="table-row-data email d-flex align-items-center justify-content-between">
                                    <div>Location:
                                      <Tooltip className="tooltip-billing" content={item.AreaName && item.AreaName}>
                                        <span>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={(item.AreaName).length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName}
                                          />
                                        </span>
                                      </Tooltip></div>
                                    <div>Transaction ID: {item.top3TransactionHistory[0].srlNo}</div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Transaction Date
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={formatDate(item.top3TransactionHistory[0].transactionDate)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">Type</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={item.top3TransactionHistory[0].voucherType}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">Amount</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={"₹" + item.top3TransactionHistory[0].amount}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Payment Mode
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={item.top3TransactionHistory[0].instrumentType ? item.top3TransactionHistory[0].instrumentType : "N/A"}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-12">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Description
                                        </div>
                                        <div className="resp-contact resp-description">
                                          <p>
                                            <Highlighter
                                              highlightClassName="custom-highlight"
                                              searchWords={searchTermTrans}
                                              autoEscape={true}
                                              textToHighlight={item.top3TransactionHistory[0].instrumentDetail ? item.top3TransactionHistory[0].instrumentDetail : "N/A"}
                                            />
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div> : ""
                            )) : <div style={{ textAlign: 'center' }} className="table-row-data resp-name"> No Transactions </div> : ""}

                            {getLogInSegment !== "OBB" && getLogInSegment !== "HBB" && (getFinalTransactionHistory && !getFinalDropdownSelectionTrans && !getPinnedClickedTransData ? getFinalTransactionHistory.length > 0 ? getFinalTransactionHistory?.map((item, index) => (
                              item.top3TransactionHistory[1] && item.top3TransactionHistory.length > 2 ?
                                <div key={index} className="table-content">
                                  <div className="table-row-data resp-name">
                                    {/* {item.PlanName}{" "} */}
                                    <span className="resp-innerHeading mx-2">
                                      (Service ID:
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.CanId.toString()}
                                      />)
                                    </span>
                                  </div>
                                  <div className="table-row-data email d-flex align-items-center justify-content-between">
                                    <div>Location:
                                      <Tooltip className="tooltip-billing" content={item.AreaName}>
                                        <span>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={(item.AreaName).length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName}
                                          />
                                        </span>
                                      </Tooltip></div>
                                    <div>Transaction ID:
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.top3TransactionHistory[1].srlNo.toString()}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Transaction Date
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={formatDate(item.top3TransactionHistory[1].transactionDate)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">Type</div>
                                        <div className="resp-contact"><Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.top3TransactionHistory[1].voucherType}
                                        />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">Amount</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={"₹" + item.top3TransactionHistory[1].amount}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Payment Mode
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={item.top3TransactionHistory[1].instrumentType ? item.top3TransactionHistory[1].instrumentType : "N/A"}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-12">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Description
                                        </div>
                                        <div className="resp-contact resp-description">
                                          <p>
                                            <Highlighter
                                              highlightClassName="custom-highlight"
                                              searchWords={searchTermTrans}
                                              autoEscape={true}
                                              textToHighlight={item.top3TransactionHistory[1].instrumentDetail ? item.top3TransactionHistory[1].instrumentDetail : "N/A"}
                                            />
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div> : ""
                            )) : <div style={{ textAlign: 'center' }} className="table-row-data resp-name"> No Transactions </div> : "")}

                            {getLogInSegment !== "OBB" && getLogInSegment !== "HBB" && (getFinalTransactionHistory && !getFinalDropdownSelectionTrans && !getPinnedClickedTransData ? getFinalTransactionHistory.length > 0 ? getFinalTransactionHistory?.map((item, index) => (
                              item.top3TransactionHistory[2] && item.top3TransactionHistory.length > 2 ?
                                <div key={index} className="table-content">
                                  <div className="table-row-data resp-name">
                                    {/* {item.PlanName}{" "} */}
                                    <span className="resp-innerHeading mx-2">
                                      (Service ID:
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.CanId.toString()}
                                      />)
                                    </span>
                                  </div>
                                  <div className="table-row-data email d-flex align-items-center justify-content-between">
                                    <div>Location:
                                      <Tooltip className="tooltip-billing" content={item.AreaName}>
                                        <span>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={(item.AreaName).length > 10 ? item.AreaName.substring(0, 10) + "..." : item.AreaName}
                                          />
                                        </span>
                                      </Tooltip></div>
                                    <div>Transaction ID:
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.top3TransactionHistory[2].srlNo.toString()}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Transaction Date
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={formatDate(item.top3TransactionHistory[2].transactionDate)}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">Type</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={item.top3TransactionHistory[2].voucherType}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">Amount</div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={"₹" + item.top3TransactionHistory[2].amount}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Payment Mode
                                        </div>
                                        <div className="resp-contact">
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={item.top3TransactionHistory[2].instrumentType ? item.top3TransactionHistory[2].instrumentType : "N/A"}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-12">
                                      <div className="table-row-data">
                                        <div className="resp-innerHeading">
                                          Description
                                        </div>
                                        <div className="resp-contact resp-description">
                                          <p>
                                            <Highlighter
                                              highlightClassName="custom-highlight"
                                              searchWords={searchTermTrans}
                                              autoEscape={true}
                                              textToHighlight={item.top3TransactionHistory[2].instrumentDetail ? item.top3TransactionHistory[2].instrumentDetail : "N/A"}
                                            />
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div> : ""
                            )) : <div style={{ textAlign: 'center' }} className="table-row-data resp-name"> No Transactions </div> : "")}

                            {/* Default Location Transaction List */}


                          </div>
                        </div>
                      </div>
                    </div>)}
                    {/* Payment details Invoice: This opens when you click on pay now from Invoice table. */}
                    {(showBillingDetailAdmin && payNowClick) && (
                      <PaymentDetailsInvoice getInvoicePayNowRow={getInvoicePayNowRow} goBackToTransactions={goBackToTransactions} />)}


                  </div>
                  {/* ****************** USER MANAGEMENT TAB ************* */}
                  <div
                    className="tab-pane fade pb-5"
                    id="pills-user"
                    role="tabpanel"
                    aria-labelledby="pills-user-tab"
                  >
                    {/* ADMIN LEVEL PAGE  */}
                    {showAdminLevel && (<div id="admin-level">
                      {/* Large Screen Table  */}
                      <div className="">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                          <div className="account-tab-heading">Admin Level</div>
                          <div className="add-role-btn">ADD ROLE</div>
                        </div>
                        <div className="account-table-container">
                          <div className="table-top-bar d-flex align-items-center flex-wrap gap-3">
                            <div className="table-name flex-grow-1">Admins</div>
                            {/* Location selection dropdown */}
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom dropdown-toggle rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <img src={distance} alt="" />
                                  <span className="textValue">Banglore</span>
                                </div>
                              </div>
                              <ul className="dropdown-menu">
                                <li className="dropdown-item" data-value="Bangalore">
                                  Bangalore
                                </li>
                                <li className="dropdown-item" data-value="Delhi">
                                  Delhi
                                </li>
                                <li className="dropdown-item" data-value="Gurgaon">
                                  Gurgaon
                                </li>
                                <li className="dropdown-item" data-value="Mumbai">
                                  Mumbai
                                </li>
                              </ul>
                            </div>
                            <div className="table-search-wrapper d-flex align-items-center">
                              <input
                                className="table-search-input dashboard-search-input"
                                placeholder="Search"
                                id="search"
                                name="search"
                              />
                              <img src={tablesearch} alt="" />
                            </div>
                          </div>
                          {/* Users table for large screen devices */}
                          <div className="horizontal-scroll-container d-none d-md-block">
                            <table className="account-table">
                              <tbody>
                                <tr className="table-header">
                                  <th className="table-header-data">Name</th>
                                  <th className="table-header-data">Email ID</th>
                                  <th className="table-header-data">Mobile Number</th>
                                  <th className="table-header-data">Located</th>
                                  <th className="table-header-data ">Status</th>
                                  <th className="table-header-data">Action</th>
                                </tr>
                                <tr className="table-row">
                                  <td className="table-row-data">Gaurav Gandhi</td>
                                  <td className="table-row-data">
                                    gaurav123@gmail.com
                                  </td>
                                  <td className="table-row-data">+91 6245971248</td>
                                  <td className="table-row-data">Bangalore</td>
                                  <td className="table-row-data">
                                    <div className="status-active-btn">Active</div>
                                  </td>
                                  <td className="table-row-data d-flex align-items-center gap-2 mt-1">
                                    <div
                                      className="action-view-link"
                                      onClick={viewUserDetails}
                                    >
                                      View Details
                                    </div>
                                    <img src={arrowout} alt="" />
                                  </td>
                                </tr>
                                <tr className="table-row">
                                  <td className="table-row-data">Rachit Sharma</td>
                                  <td className="table-row-data">
                                    rachit1@gmail.com
                                  </td>
                                  <td className="table-row-data">+91 6245971248</td>
                                  <td className="table-row-data">Delhi</td>
                                  <td className="table-row-data">
                                    <div className="status-active-btn">Active</div>
                                  </td>
                                  <td className="table-row-data d-flex align-items-center gap-2 mt-1">
                                    <div
                                      className="action-view-link"
                                      onClick={viewUserDetails}
                                    >
                                      View Details
                                    </div>
                                    <img src={arrowout} alt="" />
                                  </td>
                                </tr>
                                <tr className="table-row">
                                  <td className="table-row-data">Ratish Verma</td>
                                  <td className="table-row-data">
                                    ratish_02gmail.com
                                  </td>
                                  <td className="table-row-data">+91 6245971248</td>
                                  <td className="table-row-data">Mumbai</td>
                                  <td className="table-row-data">
                                    <div className="status-active-btn">Active</div>
                                  </td>
                                  <td className="table-row-data d-flex align-items-center gap-2 mt-1">
                                    <div
                                      className="action-view-link"
                                      onClick={viewUserDetails}
                                    >
                                      View Details
                                    </div>
                                    <img src={arrowout} alt="" />
                                  </td>
                                </tr>
                                <tr className="table-row">
                                  <td className="table-row-data">Santosh Shukla</td>
                                  <td className="table-row-data">
                                    santosh.shukla@gmail.com
                                  </td>
                                  <td className="table-row-data">+91 6245971248</td>
                                  <td className="table-row-data">Pune</td>
                                  <td className="table-row-data">
                                    <div className="status-active-btn">Active</div>
                                  </td>
                                  <td className="table-row-data d-flex align-items-center gap-2 mt-1">
                                    <div
                                      className="action-view-link"
                                      onClick={viewUserDetails}
                                    >
                                      View Details
                                    </div>
                                    <img src={arrowout} alt="" />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          {/* Users table for small screen devices <768px */}
                          <div className="d-block d-md-none">
                            <div className="table-content">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data resp-name">
                                  Gaurav Gandhi
                                </div>
                                <div className="table-row-data">
                                  <div className="status-active-btn">Active</div>
                                </div>
                              </div>
                              <div className="table-row-data email">
                                gaurav123@gmail.com
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">Located</div>
                                  <div className="resp-contact">Bangalore</div>
                                </div>
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">
                                    Mobile Number
                                  </div>
                                  <div className="resp-contact">+91 6245971248</div>
                                </div>
                              </div>
                            </div>
                            <div className="table-content">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data resp-name">
                                  Gaurav Gandhi
                                </div>
                                <div className="table-row-data">
                                  <div className="status-active-btn">Active</div>
                                </div>
                              </div>
                              <div className="table-row-data email">
                                gaurav123@gmail.com
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">Located</div>
                                  <div className="resp-contact">Bangalore</div>
                                </div>
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">
                                    Mobile Number
                                  </div>
                                  <div className="resp-contact">+91 6245971248</div>
                                </div>
                              </div>
                            </div>
                            <div className="table-content">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data resp-name">
                                  Gaurav Gandhi
                                </div>
                                <div className="table-row-data">
                                  <div className="status-active-btn">Active</div>
                                </div>
                              </div>
                              <div className="table-row-data email">
                                gaurav123@gmail.com
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">Located</div>
                                  <div className="resp-contact">Bangalore</div>
                                </div>
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">
                                    Mobile Number
                                  </div>
                                  <div className="resp-contact">+91 6245971248</div>
                                </div>
                              </div>
                            </div>
                            <div className="table-content">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data resp-name">
                                  Gaurav Gandhi
                                </div>
                                <div className="table-row-data">
                                  <div className="status-active-btn">Active</div>
                                </div>
                              </div>
                              <div className="table-row-data email">
                                gaurav123@gmail.com
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">Located</div>
                                  <div className="resp-contact">Bangalore</div>
                                </div>
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">
                                    Mobile Number
                                  </div>
                                  <div className="resp-contact">+91 6245971248</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>)}
                    {/* ADMIN DETAL PAGE  (ViewUserDetails.js*/}
                    {showAdminDetail && fullDetails && <ViewUserDetails goBackToUserManagement={goBackToUserManagement} />}

                  </div>
                </div>
                {/* FOOTER START  */}
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </section>

    )
  }


  if (crmRole === "L3") {
    return (
      <section className="section-dashboard">
        <div className="">
          <div className="d-flex justify-content-end">
            {/* SIDE NAVBAR  */}
            <SideBar />
            {/* top header */}
            {/* {segment != "HBB" && <Header />}
            {segment == "HBB" && <HeaderHbb />} */}
            <HeaderHbb />
            {/* My ACCOUNTS  */}
            <div className="dashboard-main">
              <div className="dashboard-content">
                {/* Navigation tabs: Account details, Billing details, User management */}
                <ul
                  className="nav nav-pills mb-3 account-tab-list"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button

                      className={actTabAcc}

                      id="pills-account-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-account"
                      type="button"
                      role="tab"
                      aria-controls="pills-account"
                      aria-selected="true"
                    >
                      Account Details
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={actTabBill}

                      id="pills-billing-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-billing"
                      type="button"
                      role="tab"
                      aria-controls="pills-billing"
                      aria-selected="false"
                    >
                      Billing Details
                    </button>
                  </li>
                  {/* <li className="nav-item" role="presentation">
                  <button
                    className="nav-link account-tab-btn"
                    id="pills-user-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-user"
                    type="button"
                    role="tab"
                    aria-controls="pills-user"
                    aria-selected="false"
                  >
                    User Management
                  </button>
                </li> */}
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  {/* ****************** ACCOUNT DETAILS TAB ************* */}
                  <div
                    className={actAcc}
                    id="pills-account"
                    role="tabpanel"
                    aria-labelledby="pills-account-tab"
                  >
                    <div className="account-tab-heading mb-3">Account Details</div>
                    <div className="account-tab-container">
                      {/* ACCOUNT DETAIL BANNER  */}
                      <div className="account-detail-banner">
                        <div className="account-detail-banner-header d-flex align-items-md-center  justify-content-md-between gap-2">
                          <div className="account-detail-banner-heading d-flex align-items-center gap-2 flex-wrap">
                            {/* <div>{id.accountName}</div> */}

                            {/* <span className="account-banner-span">Service ID: {pfValues.CanId ? pfValues.CanId :idbyDrop.CanId ? idbyDrop.CanId : localStorage.getItem('credentialKey') }</span> */}

                            {/* {isPinnedDataAvailable && showDropdownData ? ( // Check if pinned data is available
        <span className="account-banner-span">Service ID: {pfValues.CanId}</span>
      ) : ( // If not, render other fallback data
        <span className="account-banner-span">
          Service ID: {idbyDrop.CanId ? idbyDrop.CanId : localStorage.getItem('credentialKey')}
        </span>
      )} */}

                            {/* Check if pinned data is available and showDropdownData is false */}
                            {!showDropdownData && isPinnedDataAvailable && pinnedData && (
                              <div>
                                {/* Render pinned data here */}
                                <span className="account-banner-span">Service ID: {pfValues.CanId}</span>
                                {/* ... Render other pinned data here ... */}
                              </div>
                            )}

                            {/* Check if showDropdownData is true */}
                            {showDropdownData && (
                              <div>
                                {/* Render dropdown data here */}
                                <span className="account-banner-span">Service ID: {idbyDrop.CanId ? idbyDrop.CanId : localStorage.getItem('credentialKey')}</span>
                                {/* ... Render other dropdown data here ... */}
                              </div>
                            )}

                            {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (
                              <div>
                                {/* Render dropdown data here */}
                                <span className="account-banner-span">Service ID: {localStorage.getItem('credentialKey')}</span>
                                {/* ... Render other dropdown data here ... */}
                              </div>
                            )}






                          </div>
                          <div className="d-flex flex-row align-items-center gap-3 flex-wrap">


                            {/* new changes according to dynamic value for city  */}

                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div className="select-custom dropdown-toggle select4-custom rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button">
                                <div className="d-flex align-items-center gap-2">
                                  <img src={distance} alt="" />
                                  {crmRole === "L3" ? (<span className="textValue">{filtered.LocationName || 'Select City'}</span>
                                  ) : (
                                    <span className="textValue">{pfValues.LocationName ? pfValues.LocationName : autoCity.LocationName ? autoCity.LocationName : 'Select City'}</span>
                                  )}
                                </div>
                              </div>
                              {crmRole === "L3" ? (
                                <ul className="dropdown-menu" >

                                  <li
                                    key={'HBB'}
                                    className="dropdown-item"
                                    data-value={filtered.LocationName}
                                    // onClick={handleDropdownItemClick}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {filtered.LocationName}
                                  </li>
                                </ul>
                              ) : null}
                              {crmRole === "L2" && segmnt == 'OBB' ? (
                                <ul className="dropdown-menu" >

                                  <li
                                    key={'OBB'}
                                    className="dropdown-item"
                                    data-value={filtered.LocationName}
                                    style={{ fontSize: "14px" }}
                                  // onClick={handleDropdownItemClick}
                                  >
                                    {filtered.LocationName}
                                  </li>
                                </ul>
                              ) : null}

                              {crmRole === "L2" ? (
                                <ul className="dropdown-menu">
                                  {drop1Value.map((city) => (
                                    <li
                                      key={`city-${city.LocationId}`}
                                      className="dropdown-item"
                                      data-value={city.LocationName}
                                      onClick={handleDropdownItemClick}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {city.LocationName}
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </div>

                            {/* end */}







                            {/* new changes according to dynamic value for area */}
                            {/* <div className="dropdown spectra-dropdown select-dropdown">
                            <div
                              className="select-custom dropdown-toggle select4-custom rounded-0"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              role="button"
                            >
                              <span className="textValue">{pfValues.AreaName ? pfValues.AreaName : autoArea.AreaName ? autoArea.AreaName : 'Select Area'}</span>
                            </div>

                            <ul className="dropdown-menu" >
                              {filteredAreas.map((AreaName, index) => (
                                <li
                                  key={`area-${index}`}
                                  className="dropdown-item"
                                  data-value={AreaName}
                                  onClick={handleAreaClick}

                                >
                                  {AreaName}
                                </li>
                              ))}
                            </ul>

                          </div> */}

                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div className="select-custom dropdown-toggle select4-custom rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <img src={distance} alt="" />

                                  {resetValueflag ? (<span className="textValue">
                                    {areaSelected ? areaSelected : "Select Area"}
                                  </span>) :
                                    (<span className="textValue">

                                      {pfValues.AreaName ? pfValues.AreaName : getFlagLoc ? autoArea.AreaName : areaSelected ? areaSelected : "Select Area"}
                                    </span>)}
                                </div>

                              </div>
                              {/* {crmRole === "L2" && segmnt !== 'OBB' && (
  <ul className="dropdown-menu">
    {filteredAreas.length > 0 ? ( // Check if there are filtered areas
      filteredAreas.map((AreaName, index) => (
        <li
          key={`area-${index}`}
          className="dropdown-item"
          data-value={AreaName}
          onClick={handleAreaClick}
        >
          {AreaName}
        </li>
      ))
    ) : (
      // If no filtered areas, show a disabled dropdown item indicating no value
      <li className="dropdown-item ">No Area Avilable</li>
    )}
  </ul>
)} */}
                              {/* NEW KOCHI CHNAGES  */}
                              {crmRole === "L2" && segmnt !== 'OBB' && (
                                <ul className="dropdown-menu">
                                  {filteredAreas.length > 0 ? (
                                    filteredAreas.map((AreaName, index) => (
                                      <li
                                        key={`area-${index}`}
                                        className="dropdown-item"
                                        data-value={AreaName}
                                        onClick={handleAreaClick}
                                        style={{ fontSize: "14px" }}
                                      >
                                        {AreaName}
                                      </li>
                                    ))
                                  ) : (

                                    <li
                                      key="no-area"
                                      className="dropdown-item"
                                      onClick={handleAreaClick} // You might want to update the handler accordingly
                                      data-value={citySelected} // Use the value as the data-value
                                      style={{ fontSize: "14px" }}
                                    >
                                      {citySelected}
                                    </li>
                                  )}
                                </ul>
                              )}
                              {/* end */}
                              {crmRole === "L3" && (
                                <ul className="dropdown-menu">
                                  {filtered.AreaName ? (
                                    <li
                                      key={'HBB'}
                                      className="dropdown-item"
                                      data-value={filtered.AreaName}
                                      // onClick={handleDropdownItemClick}
                                      style={{ fontSize: "14px" }}
                                    >
                                      {filtered.AreaName}
                                    </li>
                                  ) : (
                                    <li className="dropdown-item"
                                      style={{ fontSize: "14px" }}

                                    >{filtered.AreaName}
                                    </li>
                                  )}
                                </ul>
                              )}

                              {crmRole === "L2" && segmnt === 'OBB' && (
                                <ul className="dropdown-menu">
                                  {filtered.AreaName ? (
                                    <li
                                      key={'LoBB'}
                                      className="dropdown-item"
                                      data-value={filtered.AreaName}
                                      style={{ fontSize: "14px" }}

                                    // onClick={handleDropdownItemClick}
                                    >
                                      {filtered.AreaName}
                                    </li>
                                  ) : (
                                    <li className="dropdown-item"
                                      style={{ fontSize: "14px" }}

                                    > Area available</li>
                                  )}
                                </ul>
                              )}
                            </div>;



                            {/* end */}





                            {/* Product selection dropdown */}

                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom dropdown-toggle rounded-0 custom-fix"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <img src={productIcon} alt="" />


                                  {resetValueflag ? (<span className="textValue">{segmentSelected && getId ? `${segmentSelected} (${getId.CanId})` : 'Select Segment'}</span>) :
                                    (<span className="textValue">{pfValues ? `${pfValues.SegmentName} (${pfValues.CanId})` : getFlagLoc ? `${autoSegment.SegmentName} (${autoSegment.CanId})` : `${segmentSelected} (${getId.CanId})` ? `${segmentSelected} (${getId.CanId})` : 'Select Segment'}</span>)}

                                </div>
                              </div>

                              {/* {crmRole === "L2" && segmnt !== 'OBB' && (
<ul className="dropdown-menu">
 {filteredSegments.map((segment) => (
 segment.SegmentName ? (
 <li
  key={segment.LocationId}
  className="dropdown-item"
  data-value={segment.SegmentName}
  onClick={(event) => handleSegmentClick(event, segment.CanId)}
>
{segment.SegmentName}({segment.CanId})
 </li>
) : null
 ))}
</ul>
)} */}
                              {/* {crmRole === "L2" && segmnt !== 'OBB' && (
  <ul className="dropdown-menu">
    {filteredSegments.length > 0 ? (
      filteredSegments.map((segment) => (
        segment.SegmentName ? (
          <li
            key={segment.LocationId}
            className="dropdown-item"
            data-value={segment.SegmentName}
            onClick={(event) => handleSegmentClick(event, segment.CanId)}
          >
            {segment.SegmentName}({segment.CanId})
          </li>
        ) : null
      ))
    ) : (
      <li className="dropdown-item ">{segmentSelected ? segmentSelected :'No Segment Available'}</li>
    )}
  </ul>
)} */}
                              {/* nw chanes for kochi part  */}
                              {crmRole === "L2" && segmnt !== 'OBB' && (
                                <ul className="dropdown-menu">
                                  {filteredSegments.map((segment) => (
                                    segment.SegmentName ? (
                                      <li
                                        key={segment.LocationId}
                                        className="dropdown-item"
                                        data-value={segment.SegmentName}
                                        onClick={(event) => handleSegmentClick(event, segment.CanId)}
                                        style={{ fontSize: "14px" }}
                                      >
                                        {segment.SegmentName} ({segment.CanId})
                                      </li>
                                    ) : null
                                  ))}
                                </ul>

                              )}

                              {crmRole === "L2" && segmnt === 'OBB' && (
                                <ul className="dropdown-menu">
                                  {filtered.SegmentName == '' ? (
                                    <li
                                      key={'LoBB'}
                                      className="dropdown-item"
                                      data-value={filtered.SegmentName}
                                      style={{ fontSize: "14px" }}
                                    // onClick={handleDropdownItemClick}
                                    >
                                      {segmnt + " (" + filtered.CanId + ")"}
                                    </li>
                                  ) : (
                                    <li className="dropdown-item" style={{ fontSize: "14px" }}> {segmnt + " (" + filtered.CanId + ")"}</li>
                                  )}
                                </ul>
                              )}

                              {crmRole === "L3" && (
                                <ul className="dropdown-menu">
                                  {filtered.CanId ? (
                                    <li
                                      key={'HBB'}
                                      className="dropdown-item"
                                      data-value={filtered.CanId}
                                      style={{ fontSize: "14px" }}
                                    // onClick={handleSegmentClick}
                                    >
                                      {segmnt + " (" + filtered.CanId + ")"}
                                    </li>
                                  ) : (
                                    <li className="dropdown-item" style={{ fontSize: "14px" }}>  {segmnt + " (" + filtered.CanId + ")"}</li>
                                  )}
                                </ul>
                              )}


                              {/* <ul className="dropdown-menu">
  {filteredSegments.map((segment) => (
    // Check if CRM Role is 'L2' and segment is 'OBB'
    (crmRole === 'L2' && segment.SegmentName === 'OBB') ? (
      <li
        key={segment.LocationId}
        className="dropdown-item"
        data-value={segment.SegmentName}
        onClick={(event) => handleSegmentClick(event, segment.CanId)}
      >
        {segment.SegmentName}({segment.CanId})
      </li>
    ) : (
      // Check if CRM Role is 'L2' and segment is not 'OBB'
      crmRole === 'L2' && segment.SegmentName !== 'OBB' ? null : (
        // Show other cases (exclude 'OBB') when CRM Role is not 'L2'
        segment.SegmentName !== 'OBB' && (
          <li
            key={segment.LocationId}
            className="dropdown-item"
            data-value={segment.SegmentName}
            onClick={(event) => handleSegmentClick(event, segment.CanId)}
          >
            {segment.SegmentName}({segment.CanId})
          </li>
        )
      )
    )
  ))}
</ul> */}

                            </div>




                          </div>
                        </div>

                        {/* account info */}
                        <div className="row justify-content-between">
                          <div className="col-12 col-sm-6 col-lg-3 account-detail-card">
                            <div className="d-flex align-items-start justify-content-start account-detail-box">
                              <div className="info-icon">
                                <img src={accountdetailname} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">Account Name</div>
                                <div className="info-content">
                                  {id.accountName}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-3 account-detail-card">
                            <div className="d-flex align-items-start justify-content-start account-detail-box w-100">
                              <div className="info-icon">
                                <img src={accountdetailmail} alt="" />
                              </div>
                              <div className="px-3 py-1 editable-block">
                                <div className="info-name pb-1">
                                  Email ID
                                  <span>
                                    {/* <img
                                      src={edit}
                                      alt=""
                                      className="editInputIcon"
                                      onClick={handleEditIconClick}
                                    /> */}
                                  </span>
                                </div>
                                <div className="info-content editable-value" onBlur={handleEditableValueBlur}>
                                  {id.shipToEmail}
                                </div>
                              </div>
                            </div>
                          </div>
                          {localStorage.getItem('crm_company_id') !== 'CIndividual' ? (
                            <div className="col-12 col-sm-6 col-lg-2 account-detail-card">

                              <div className="d-flex align-items-start justify-content-start account-detail-box">

                                <>
                                  <div className="info-icon">
                                    <img src={accountdetailuser} alt="" />
                                  </div>
                                  <div className="px-3 py-1">
                                    <div className="info-name pb-1">Company ID</div>
                                    <div className="info-content">{localStorage.getItem('crm_company_id')}</div>
                                  </div>
                                </>
                              </div>

                            </div>
                          ) : null}
                          <div className="col-12 col-sm-6 col-lg-3 account-detail-card">
                            <div className="d-flex align-items-start justify-content-start account-detail-box">
                              <div className="info-icon">
                                <img src={accountdetaildate} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">Activation Date</div>
                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (
                                  <div className="info-content">

                                    {pfActDateValues ? pfActDateValues : 'NA'}   </div>)}

                                {showDropdownData && (
                                  <div className="info-content">

                                    {actDatebydrop ? actDatebydrop : 'NA'}   </div>)}


                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (
                                  <div className="info-content">

                                    {actDate ? actDate : 'NA'}   </div>)}





                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* BILLING DETAIL ROW  */}
                      <div className="dashboard-box account-detail-billing">
                        <div className="dashboard-box-heading">Billing Details</div>
                        <div className="row">
                          <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-4">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img src={billinggsticon} alt="" />
                              </div>
                              {!showDropdownData && isPinnedDataAvailable && pinnedData && (
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">GST Number</div>
                                  <div className="info-content"> {pfgstNo ? pfgstNo : 'NA'}</div>

                                </div>)}

                              {showDropdownData && (
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">GST Number</div>
                                  <div className="info-content"> {gstNumberbydrop ? gstNumberbydrop : 'NA'}</div>

                                </div>)}
                              {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (
                                <div className="px-3 py-1">
                                  <div className="info-name pb-1">GST Number</div>
                                  <div className="info-content">{gstNumber ? gstNumber : 'NA'}</div>

                                </div>)}

                            </div>
                          </div>
                          {/* TAN number */}
                          <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-3 tan-cst">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img src={billinggsticon} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">TAN</div>
                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (
                                  <div className="info-content">{pftan ? pftan : 'NA'}</div>)}

                                {showDropdownData && (
                                  <div className="info-content">{tanbydrop ? tanbydrop : 'NA'}</div>)}

                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (
                                  <div className="info-content">{tan ? tan : 'NA'}</div>)}
                              </div>
                            </div>
                          </div>
                          {/* pan number */}
                          <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-4">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img src={billinggsticon} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">PAN Number</div>
                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (<div className="info-content">{pfpanNo ? pfpanNo : 'NA'}</div>)}
                                {showDropdownData && (<div className="info-content">{panNobydrop ? panNobydrop : 'NA'}</div>)}
                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content">{panNo ? panNo : 'NA'}</div>)}
                              </div>
                            </div>
                          </div>
                          {/* TDS slab */}
                          <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-3 custm-tds">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img src={billinggsticon} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">TDS Slab</div>

                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (<div className="info-content">{pftds ? (pftds) +"%" : 'NA'}</div>)}
                                {showDropdownData && (<div className="info-content">{tdsbydrop ? (tdsbydrop) +"%" : 'NA'}</div>)}
                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content">{tds ? (tds) +"%" : 'NA'}</div>)}
                              </div>
                            </div>
                          </div>
                          {/* current balance */}
                          <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-3">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img
                                  src={bilingregistrationicon}
                                  alt=""
                                />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">Current Balance</div>
                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (
                                  <div className="info-content">
                                    {pfAccValues.balance !== undefined && pfAccValues.balance !== null
                                      ? pfAccValues.balance : '0'}
                                  </div>)}

                                {showDropdownData && (
                                  <div className="info-content">
                                    {invoicedt.balance !== undefined && invoicedt.balance !== null
                                      ? invoicedt.balance : '0'}
                                  </div>)}

                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (
                                  <div className="info-content">
                                    {id.balance !== undefined && id.balance !== null
                                      ? id.balance : '0'}
                                  </div>)}

                              </div>
                            </div>
                          </div>
                          {/* previous invoice*/}
                          <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-4 cstm-pre-invoice">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img src={billinggsticon} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">Previous Invoice</div>
                                {/* <div className="info-content">{new Date(invoicedt.invoiceCreationDate).toLocaleDateString('en-GB') ?  new Date(invoicedt.invoiceCreationDate).toLocaleDateString('en-GB') :  new Date(id.invoiceCreationDate).toLocaleDateString('en-GB')}</div> */}
                                {/* {!showDropdownData && isPinnedDataAvailable && pinnedData && (
  <div className="info-content">
    {pfAccValues && pfAccValues.invoiceCreationDate &&
      new Date(pfAccValues.invoiceCreationDate).getTime() &&
      new Date(pfAccValues.invoiceCreationDate).toLocaleDateString('en-GB')
    }
    {!pfAccValues || !pfAccValues.invoiceCreationDate && 'NA'}
  </div>

)} */}
                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (

                                  <div className="info-content">
                                    {pfAccValues && pfAccValues.invoiceCreationDate ? (
                                      (() => {
                                        const formattedDate = new Date(pfAccValues.invoiceCreationDate).toLocaleDateString('en-GB', {
                                          day: '2-digit', // Set the day option to '2-digit'
                                          month: 'short',
                                          year: '2-digit',
                                        }).replace(/(\d+)(?:st|nd|rd|th)/, '$1');
                                        const formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year
                                        return `${formattedDate.slice(0, -2)}' ${formattedYear}`;
                                      })()
                                    ) : (
                                      'NA'
                                    )}
                                  </div>

                                )}







                                {showDropdownData && (<div className="info-content">

                                  {/* {invoicedt.invoiceCreationDate &&
                                  new Date(invoicedt.invoiceCreationDate).getTime() &&
                                  new Date(invoicedt.invoiceCreationDate).toLocaleDateString('en-GB')}
                              
    {!invoicedt || !invoicedt.invoiceCreationDate && 'NA'}
                                  */}
                                  <div className="info-content">
                                    {invoicedt && invoicedt.invoiceCreationDate ? (
                                      (() => {
                                        const formattedDate = new Date(invoicedt.invoiceCreationDate).toLocaleDateString('en-GB', {
                                          day: '2-digit', // Set the day option to '2-digit'
                                          month: 'short',
                                          year: '2-digit',
                                        }).replace(/(\d+)(?:st|nd|rd|th)/, '$1');
                                        const formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year
                                        return `${formattedDate.slice(0, -2)} '${formattedYear}`;
                                      })()
                                    ) : (
                                      'NA'
                                    )}
                                  </div>
                                </div>)}

                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content">


                                  {/* {id.invoiceCreationDate &&
                                  new Date(id.invoiceCreationDate).getTime() &&
                                  new Date(id.invoiceCreationDate).toLocaleDateString('en-GB')}
                                 
                                 {!id || !id.invoiceCreationDate && 'NA'} */}
                                  {id && id.invoiceCreationDate ? (
                                    (() => {
                                      const formattedDate = new Date(id.invoiceCreationDate).toLocaleDateString('en-GB', {
                                        day: '2-digit', // Set the day option to '2-digit'
                                        month: 'short',
                                        year: '2-digit',
                                      }).replace(/(\d+)(?:st|nd|rd|th)/, '$1');
                                      const formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year
                                      return `${formattedDate.slice(0, -2)} '${formattedYear}`;
                                    })()
                                  ) : (
                                    'NA'
                                  )}
                                </div>)}

                              </div>
                            </div>
                          </div>
                          
                          
                          {/* next invoice */}
                          <div className="col-xl-3 col-lg-3 col-sm-6 account-detail-card py-2 py-md-4 nxt-invoice">
                            <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                              <div className="info-icon">
                                <img src={billinggsticon} alt="" />
                              </div>
                              <div className="px-3 py-1">
                                <div className="info-name pb-1">Next Invoice</div>
                                {/* <div className="info-content">
                             

                                    {!pfAccValues && invoicedt.billStartDate &&
                                  new Date(invoicedt.billStartDate).getTime() &&
                                  new Date(invoicedt.billStartDate).toLocaleDateString('en-GB')}
                                {!pfAccValues &&!invoicedt.billStartDate &&
                                  id.billStartDate &&
                                  new Date(id.billStartDate).getTime() &&
                                  new Date(id.billStartDate).toLocaleDateString('en-GB')}
                                 
                                {pfAccValues && pfAccValues.billStartDate &&
                                  new Date(pfAccValues.billStartDate).getTime() &&
                                  new Date(pfAccValues.billStartDate).toLocaleDateString('en-GB')}

                               
                              </div> */}

                                {!showDropdownData && isPinnedDataAvailable && pinnedData && (
                                  <div className="info-content">
                                    {pfAccValues && pfAccValues.billStartDate ? (
                                      (() => {
                                        const formattedDate = new Date(pfAccValues.billStartDate).toLocaleDateString('en-GB', {
                                          day: '2-digit', // Set the day option to '2-digit'
                                          month: 'short',
                                          year: '2-digit',
                                        }).replace(/(\d+)(?:st|nd|rd|th)/, '$1');
                                        const formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year
                                        return `${formattedDate.slice(0, -2)}'${formattedYear}`;
                                      })()
                                    ) : (
                                      'NA'
                                    )}
                                  </div>
                                )}







                                {showDropdownData && (<div className="info-content">

                                  {/* {invoicedt.billStartDate &&
                                  new Date(invoicedt.billStartDate).getTime() &&
                                  new Date(invoicedt.billStartDate).toLocaleDateString('en-GB')}
                              
    {!invoicedt || !invoicedt.billStartDate && 'NA'} */}
                                  {showDropdownData && (
                                    <div className="info-content">
                                      {invoicedt && invoicedt.billStartDate ? (
                                        (() => {
                                          const formattedDate = new Date(invoicedt.billStartDate).toLocaleDateString('en-GB', {
                                            day: '2-digit', // Set the day option to '2-digit'
                                            month: 'short',
                                            year: '2-digit',
                                          }).replace(/(\d+)(?:st|nd|rd|th)/, '$1');
                                          const formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year
                                          return `${formattedDate.slice(0, -2)}'${formattedYear}`;
                                        })()
                                      ) : (
                                        'NA'
                                      )}
                                    </div>
                                  )}


                                </div>)}

                                {/* {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (                              <div className="info-content">
                                
                             
                                {id.billStartDate &&
                                  new Date(id.billStartDate).getTime() &&
                                  new Date(id.billStartDate).toLocaleDateString('en-GB')}
                                 
                                 {!id || !id.billStartDate && 'NA'}
                              </div>)} */}

                                {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (
                                  <div className="info-content">
                                    {id && id.billStartDate ? (
                                      (() => {
                                        const formattedDate = new Date(id.billStartDate).toLocaleDateString('en-GB', {
                                          day: '2-digit', // Set the day option to '2-digit'
                                          month: 'short',
                                          year: '2-digit',
                                        }).replace(/(\d+)(?:st|nd|rd|th)/, '$1');
                                        const formattedYear = formattedDate.split(' ')[2]; // Extract the 2-digit year
                                        return `${formattedDate.slice(0, -2)}'${formattedYear}`;
                                      })()
                                    ) : (
                                      'NA'
                                    )}
                                  </div>
                                )}




                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* billing and installation address */}
                      <div className="d-flex align-items-center justify-content-between gap-4 flex-responsive">
                        {/* Billing address */}
                        <div className="account-detail-billing-mini-box">
                          <div className="account-detail-billing-address">
                            <div className="dashboard-box-heading">
                              Billing address{" "}
                            </div>
                            <div className="row account-detail-billing-row">
                              <div className="col-12 col-lg-6 account-detail-card py-2">
                                <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                  <div className="info-icon">
                                    <img src={billingaddress} alt="" />
                                  </div>
                                  <div className="px-3 py-1 editable-block">
                                    <div className="d-flex align-items-center gap-4">
                                      <div className="info-name pb-1">Address</div>
                                      <img
                                        // src={edit}
                                        alt=""
                                        className="editInputIcon mb-1"
                                      />
                                    </div>


                                    {!showDropdownData && isPinnedDataAvailable && pinnedData && (<div className="info-content editable-value">{pfAccValues.address ? pfAccValues.address : 'NA'}</div>)}
                                    {showDropdownData && (<div className="info-content editable-value">{invoicedt.address ? invoicedt.address : 'NA'}</div>)}
                                    {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content editable-value">{id.address ? id.address : 'NA'}</div>)}

                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6 account-detail-card py-2">
                                <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                  <div className="info-icon">
                                    <img src={billingaddress} alt="" />
                                  </div>
                                  <div className="px-3 py-1 editable-block">
                                    <div className="d-flex align-items-center gap-5">
                                      <div className="info-name pb-1">City</div>
                                      <img
                                        // src={edit}
                                        alt=""
                                        className="editInputIcon mb-1"
                                      />
                                    </div>
                                    {/* <div className="info-content editable-value">
                                 

                                    {pfAccValues.shipToCity && pfAccValues.shipToCountry ? `${pfAccValues.shipToCity}, ${pfAccValues.shipToCountry}` : invoicedt.shipToCity && invoicedt.shipToCountry ? `${invoicedt.shipToCity}, ${invoicedt.shipToCountry}` : `${id.shipToCity}, ${id.shipToCountry}`}
                                  </div> */}
                                    {!showDropdownData && isPinnedDataAvailable && pinnedData && (<div className="info-content editable-value">{pfAccValues.city && pfAccValues.country ? `${pfAccValues.city}, ${pfAccValues.country}` : 'NA'}</div>)}
                                    {showDropdownData && (<div className="info-content editable-value">{invoicedt.city && invoicedt.country ? `${invoicedt.city}, ${invoicedt.country}` : 'NA'}</div>)}
                                    {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content editable-value">{id.city && id.country ? `${id.city}, ${id.country}` : 'NA'}</div>)}

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Installation addresss */}
                        <div className="account-detail-billing-mini-box">
                          <div className="account-detail-billing-address">
                            <div className="dashboard-box-heading">
                              Installation address
                            </div>
                            <div className="row account-detail-billing-row">
                              <div className="col-12 col-lg-6 account-detail-card py-2">
                                <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                  <div className="info-icon">
                                    <img src={billingaddress} alt="" />
                                  </div>
                                  <div className="px-3 py-1 editable-block">
                                    <div className="d-flex align-items-center gap-5">
                                      <div className="info-name pb-1">Address</div>
                                      {/* <img
                                      src={edit}
                                      alt=""
                                      className="editInputIcon mb-1"
                                    /> */}
                                    </div>
                                    {/* <div className="info-content editable-value">
                                    {pfAccValues.shipToAddress ? pfAccValues.shipToAddress :invoicedt.shipToAddress ? invoicedt.shipToAddress : id.shipToAddress}
                                  </div> */}

                                    {!showDropdownData && isPinnedDataAvailable && pinnedData && (<div className="info-content editable-value">{pfAccValues.shipToAddress ? pfAccValues.shipToAddress : 'NA'}</div>)}
                                    {showDropdownData && (<div className="info-content editable-value">{invoicedt.shipToAddress ? invoicedt.shipToAddress : 'NA'}</div>)}
                                    {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content editable-value">{id.shipToAddress ? id.shipToAddress : 'NA'}</div>)}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6 account-detail-card py-2">
                                <div className="d-flex align-items-start justify-content-start account-billing-detail-box">
                                  <div className="info-icon">
                                    <img src={billingaddress} alt="" />
                                  </div>
                                  <div className="px-3 py-1 editable-block">
                                    <div className="d-flex align-items-center gap-5">

                                      <div className="info-name pb-1">City</div>
                                      {/* <img
                                      src={edit}
                                      alt=""
                                      className="editInputIcon mb-1"
                                    /> */}
                                    </div>
                                    {/* <div className="info-content editable-value">
                                    {pfAccValues.shipToCity && pfAccValues.shipToCountry ? `${pfAccValues.shipToCity}, ${pfAccValues.shipToCountry}` : invoicedt.shipToCity && invoicedt.shipToCountry ? `${invoicedt.shipToCity}, ${invoicedt.shipToCountry}` : `${id.shipToCity}, ${id.shipToCountry}`}

                                  </div> */}

                                    {!showDropdownData && isPinnedDataAvailable && pinnedData && (<div className="info-content editable-value">{pfAccValues.shipToCity && pfAccValues.shipToCountry ? `${pfAccValues.shipToCity}, ${pfAccValues.shipToCountry}` : 'NA'}</div>)}
                                    {showDropdownData && (<div className="info-content editable-value">{invoicedt.shipToCity && invoicedt.shipToCountry ? `${invoicedt.shipToCity}, ${invoicedt.shipToCountry}` : 'NA'}</div>)}
                                    {!showDropdownData && !isPinnedDataAvailable && !pinnedData && (<div className="info-content editable-value">{id.shipToCity && id.shipToCountry ? `${id.shipToCity}, ${id.shipToCountry}` : 'NA'}</div>)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ****************** BILLING DETAILS TAB PANE ************* */}
                  <div
                    className={actBill}
                    id="pills-billing"
                    role="tabpanel"
                    aria-labelledby="pills-billing-tab"
                  >
                    {showBillingDetailTable && (<div id="billing-detail-table">
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div className="account-tab-heading">Billing Details</div>
                        <div className="d-flex align-items-center justify-content-center">
                          <div class="billing-toggle-btn invoices">Invoices</div>
                          <label className="toggle-switch">
                            <input type="checkbox" id="toggleCheckbox" ref={toggleCheckboxRef} />
                            <span className="toggle-slider" />
                          </label>
                          <div className="billing-toggle-btn">Transactions</div>
                        </div>
                      </div>
                      <div className="">
                        {/* Invoice Table  */}
                        <div id="invoice-table" className="account-table-container" ref={invoiceTableRef}>
                          {/* top banner with company name and fitlers */}
                          <div className="table-top-bar d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <div className="table-name flex-grow-1">Invoices</div>

                            <div class="d-flex align-items-center gap-3 flex-wrap">
                              {/* <!-- Location selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {/* {(getLogInSegment !== "OBB" && getLogInSegment !== "HBB") &&<span class="textValue">{getSelectedCity ? getSelectedCity : getPinnedSessionData && !allCityFlag?  getPinnedSessionData.LocationName : getLogInLocation? getLogInLocation : "Select All City"}</span>} */}
                                    <span class="textValue">{getLogInLocation}</span>
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  <li class="dropdown-item" style={{ fontSize: "14px" }}>
                                    {getLogInLocation}
                                  </li>
                                  {/* <li class="dropdown-item" data-value="Select All City" onClick={() => dropdownSelection("Select All City", "city")}>Select All City</li> */}
                                  {/* {getUniqueLocation ? getUniqueLocation.map((city, index) => (
                                  <li key={index} class="dropdown-item" data-value={city} onClick={() => dropdownSelection(city, "city")}>
                                    {city}
                                  </li>
                                )) : ""} */}
                                </ul>
                              </div>
                              {/* <!-- Address selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {/* {(getLogInSegment !== "OBB" && getLogInSegment !== "HBB") && <span class="textValue">{getSelectedArea ? getSelectedArea : getPinnedSessionData ? getPinnedFlag ? "Select Area" : getPinnedSessionData.AreaName : getLogInAre? getLogInLocation :  "Select Area"}</span>} */}
                                    <span class="textValue">{getLogInArea}</span>
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  <li class="dropdown-item" style={{ fontSize: "14px" }}>
                                    {getLogInArea}
                                  </li>
                                  {/* {getUniqueAreaList ? getUniqueAreaList.map((area, index) => (
                                  <li key={index} class="dropdown-item" data-value={area} onClick={() => dropdownSelection(area, "area")}>
                                    {area}
                                  </li>
                                )) : ""} */}

                                </ul>
                              </div>


                              {/* <!-- Product selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={productIcon} alt="" />
                                    {/* {(getLogInSegment !== "OBB" && getLogInSegment !== "HBB") && <span class="textValue">{getSelectedProduct ? getSelectedProduct : getPinnedSessionData ? getPinnedFlag ? "Select Product" : getPinnedSessionData.SegmentName + " (" + getPinnedSessionData.CanId + ")" : "Select Product"}</span>} */}
                                    <span class="textValue">{getLogInSegment + " (" + getLogInCanId + ")"}</span>
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  <li class="dropdown-item" style={{ fontSize: "14px" }}>
                                    {getLogInSegment + " (" + getLogInCanId + ")"}
                                  </li>
                                  {/* {getUniqueProductList ? getUniqueProductList.map((item, index) => (
                                  <li key={index} class="dropdown-item" data-value={item.SegmentName + " (" + item.CanId + ")"} onClick={() => dropdownSelection(item.SegmentName + " (" + item.CanId + ")", "segment")}>
                                    {item.SegmentName + " (" + item.CanId + ")"}
                                  </li>
                                )) : ""} */}

                                </ul>
                              </div>

                              {/* <div class="spectra-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0">
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={iconcalendar} alt="" /> */}
                                    {/* <span>Today </span> */}

                                    <DateRangePicker
                                      initialSettings={{
                                        ranges: {
                                          '1 Month': [moment().subtract(1, 'months'), moment()],
                                          '3 Months': [moment().subtract(3, 'months'), moment()],
                                          '6 Months': [moment().subtract(6, 'months'), moment()],
                                          '9 Months': [moment().subtract(9, 'months'), moment().subtract(1, 'days')],
                                          '1 Year': [moment().subtract(1, 'years'), moment()]
                                        },
                                        maxDate: new Date(),
                                        minDate: new Date("01-01-2021")

                                      }}
                                      onApply={handleDateRangeChange}
                                    >
                                      <div class="spectra-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0">
                                    <div className="d-flex align-items-center gap-2">
                                      <img src={iconcalendar} alt="" />
                                      <span
                                        type="text"
                                        className=""
                                        value={selectedRange}
                                      >{selectedRange}
                                      </span>
                                    </div>
                                  </div>

                                </div>
                                    </DateRangePicker>
                                  {/* </div>

                                </div> */}
                                {/* <ul class="dropdown-menu" onClick={(value) => dropdownSelection(value, "period")}>
                                <li class="dropdown-item" data-value="1" value="1 Month">1 Month</li>
                                <li class="dropdown-item" data-value="2" value="3 Months">3 Months</li>
                                <li class="dropdown-item" data-value="3" value="6 months">6 months</li>
                                <li class="dropdown-item" data-value="4" value="9 Month">9 Months</li>
                                <li class="dropdown-item" data-value="5" value="1 Year">1 Year</li>
                                <li class="dropdown-item" data-value="6" value="Custom Date">Custom Date</li>
                              </ul> */}
                              {/* </div> */}


                            </div>

                            {/* <div class="dropdown spectra-dropdown select-dropdown">
                            <div class="select-custom rounded-0"
                              aria-expanded="false" role="button">
                              <div class="d-flex align-items-center gap-2">
                                <input style={{height: '25px'}} type='date' />
                              </div>
                            </div>
                          </div> */}

                            {/* <DateRangePicker size="xs" placeholder="" style={{width: 260, display: 'block', marginBottom: 10 }} />  */}

                            {/* search bar */}
                            <div className="table-search-wrapper d-flex align-items-center">
                              <input
                                className="table-search-input dashboard-search-input"
                                placeholder="Search"
                                type="text"
                                id="search"
                                name="search"
                                value={searchTerm}
                                onChange={handleSearch}
                              />
                              <img src={tablesearch} alt="" />
                            </div>
                          </div>



                          {/* Display data as table on large screen devices */}
                          <div className="horizontal-scroll-container d-md-block d-none">
                            <table className="account-table">
                              <tbody>
                                <tr className="table-header">
                                  {/* <th className="table-header-data">Service</th> */}
                                  <th className="table-header-data">Service ID</th>
                                  <th className="table-header-data">Location</th>
                                  <th className="table-header-data">Invoice No</th>
                                  <th className="table-header-data">Invoice Date</th>
                                  <th className="table-header-data">Start Date</th>
                                  <th className="table-header-data">End Date</th>
                                  <th className="table-header-data">Opening Balance</th>
                                  <th className="table-header-data">Amount</th>
                                  <th className="table-header-data">Due Date</th>
                                  <th className="table-header-data">Due Amount</th>
                                  <th className="table-header-data" />
                                </tr>

                                {/* {crmRole === "L2" && (segment !== "OBB" || segment !== "HBB")&& */}


                                {/* Default Invoice Details */}
                                {getFinalInvoiceDetailsOne && (getFinalInvoiceDetailsOne.length > 0) ? getFinalInvoiceDetailsOne?.map((item, index) => (
                                  <tr key={index} className="table-row unpaid">
                                    {/* <td className="table-row-data service">
                                  <Highlighter
                                   highlightClassName="custom-highlight"
                                   searchWords={searchTerm}
                                   autoEscape={true}
                                   textToHighlight={getFinalDropdownSelection.PlanName && getFinalDropdownSelection.PlanName.toString()}
                                  />
                                 
                                   
                                    </td> */}
                                    <td className="table-row-data serviceId">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={getMergedAreaProdOne.CanId && getMergedAreaProdOne.CanId.toString()}
                                      />

                                    </td>
                                    <td className="table-row-data location">
                                      <Tooltip className="tooltip-billing" content={getMergedAreaProdOne.AreaName}>
                                        <span>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTerm}
                                            autoEscape={true}
                                            textToHighlight={(getMergedAreaProdOne.AreaName).length > 10 ? getMergedAreaProdOne.AreaName.substring(0, 10) + "..." : getMergedAreaProdOne.AreaName}
                                          />

                                        </span>
                                      </Tooltip>
                                    </td>

                                    <td className="table-row-data invoice">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={item.cslno && item.cslno.toString()}
                                      />

                                    </td>

                                    <td className="table-row-data invoiceDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={formatDate(item.invoicedt)}
                                      />
                                    </td>

                                    <td className="table-row-data startDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={formatDate(item.startdt)}
                                      />
                                    </td>
                                    <td className="table-row-data endDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={formatDate(item.enddt)}
                                      />
                                    </td>
                                    <td className="table-row-data openBalance" style={{ textAlign: "center" }}>
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={"₹" + item.openingBalance}
                                      />
                                    </td>
                                    <td className="table-row-data amount">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={"₹" + item.amount}
                                      />
                                    </td>

                                    <td className="table-row-data dueDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={getMergedAreaProdOne.SegmentName === "HBB" ? formatDate(item.duedt) : formatDate(item.duedt)}
                                      />
                                    </td>
                                    {item.unPaidBalance > 0 ? (
                                      <td className="table-row-data dueAmount" style={{ width: "130px" }}>
                                        <div id="due-amount">
                                          <span />
                                          {"₹" + item.unPaidBalance}
                                        </div>
                                        <div
                                          id="pay-amount"
                                          className="d-none"
                                          onClick={() => navigateToPayNow({ SegmentName: getMergedAreaProdOne.SegmentName, PlanName: getMergedAreaProdOne.PlanName, CanId: getMergedAreaProdOne.CanId, item })}
                                        >
                                          <div className="pay-amount-btn">pay now</div>
                                        </div>
                                      </td>
                                    ) :
                                      <td className="table-row-data paidAmount">
                                        <span />
                                        Paid
                                      </td>
                                    }

                                    <td className="table-row-data">
                                      <div className="dropdown spectra-dropdown">
                                        <div
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                          role="button"
                                        >
                                          <img
                                            src={billingoptionicon}
                                            alt=""
                                          />
                                        </div>
                                        <ul className="dropdown-menu">

                                          <li>
                                            <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "download")}>
                                              <img src={download} alt="" />
                                              <span class="custom-span">&nbsp;Download</span>
                                            </a>
                                          </li>
                                          <li>
                                            <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "share")}>
                                              <img
                                                src={shareicon}
                                                alt=""
                                              />
                                              <span class="custom-span">&nbsp;Share</span>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>

                                    </td>

                                  </tr>
                                )) : <tr className="table-row"><td colSpan={10} style={{ textAlign: "center" }} className="table-row-data">No Invoices</td></tr>}


                              </tbody>
                            </table>
                          </div>


                          {/* Display data as cards on small screens */}
                          <div className="d-block d-md-none">
                            {/* Pinned Invoice Details */}
                            {getFinalInvoiceDetailsOne && (getFinalInvoiceDetailsOne.length > 0) ? getFinalInvoiceDetailsOne?.map((item, index) => (
                              <div key={index} className="table-content">
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="table-row-data resp-name">
                                    {/* {item.PlanName}{" "} */}
                                    <span className="resp-innerHeading mx-2">
                                      (Service ID:
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTerm}
                                        autoEscape={true}
                                        textToHighlight={getMergedAreaProdOne.CanId.toString()}
                                      />)
                                    </span>
                                  </div>

                                  {item.unPaidBalance > 0 ? (
                                    <div className="table-row-data dueAmount">
                                      <div
                                        id="due-amount"
                                        className="d-flex align-items-center justify-content-between"
                                      >
                                        <div>
                                          <span className="dueAmount" />
                                        </div>
                                        {"₹" + item.unPaidBalance}
                                        <div className="dropdown spectra-dropdown">
                                          <div
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            role="button"
                                          >
                                            <img
                                              src={billingoptionicon}
                                              alt=""
                                            />
                                          </div>
                                          <ul className="dropdown-menu">
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "download")}>
                                                <img src={download} alt="" />
                                                <span>&nbsp;Download</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "share")}>
                                                <img
                                                  src={shareicon}
                                                  alt=""
                                                />
                                                <span>&nbsp;Share</span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>

                                  ) :

                                    <div className="table-row-data paidAmount">
                                      <div
                                        id="due-amount"
                                        className="d-flex align-items-center justify-content-between"
                                      >
                                        <div>
                                          <span className="paidAmount" />
                                        </div>
                                        Paid

                                        <div className="dropdown spectra-dropdown">
                                          <div
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            role="button"
                                          >
                                            <img
                                              src={billingoptionicon}
                                              alt=""
                                            />
                                          </div>
                                          <ul className="dropdown-menu">

                                            {/* <li>
                                            <a class="dropdown-item" href="#" onclick="navigateToPayNow()">
                                              <img src={eyeopen} alt="" />
                                              <span>View</span>
                                            </a>
                                          </li> */}

                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "download")}>
                                                <img src={download} alt="" />
                                                <span>&nbsp;Download</span>
                                              </a>
                                            </li>
                                            <li>
                                              <a className="dropdown-item" href="#" onClick={() => getInvoice(item.invoiceNo, "share")}>
                                                <img
                                                  src={shareicon}
                                                  alt=""
                                                />
                                                <span>&nbsp;Share</span>
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  }

                                </div>
                                <div className="table-row-data email d-flex align-items-center justify-content-between">
                                  <div>Location:
                                    <Tooltip className="tooltip-billing" content={getMergedAreaProdOne && getMergedAreaProdOne.AreaName}>
                                      <span>
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={getMergedAreaProdOne.AreaName ? getMergedAreaProdOne.AreaName.length > 10 ? getMergedAreaProdOne.AreaName.substring(0, 10) + "..." : getMergedAreaProdOne.AreaName : "N/A"}
                                        />
                                      </span>
                                    </Tooltip>
                                  </div>
                                  <div>Invoice:
                                    <Highlighter
                                      highlightClassName="custom-highlight"
                                      searchWords={searchTerm}
                                      autoEscape={true}
                                      textToHighlight={item.cslno.toString()}
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Start Date
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.startdt ? formatDate(item.startdt) : "N/A"}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">End Date</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.enddt ? formatDate(item.enddt) : "N/A"}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Opening Balance
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={"₹" + item.openingBalance}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Invoice Date
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.invoicedt && formatDate(item.invoicedt)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">Amount</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.amount ? "₹" + item.amount : "N/A"}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">Due Date</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTerm}
                                          autoEscape={true}
                                          textToHighlight={item.duedt ? item.SegmentName === "HBB" ? formatDate(item.duedt) : formatDate(item.duedt) : "N/A"}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {item.unPaidBalance !== undefined && item.unPaidBalance > 0 ?
                                  <div onClick={() => navigateToPayNow({ SegmentName: getMergedAreaProdOne.SegmentName, PlanName: getMergedAreaProdOne.PlanName, CanId: getMergedAreaProdOne.CanId, item })} className="pay-amount-btn">Pay now</div> : ""
                                }
                              </div>
                            )) : <div style={{ textAlign: 'center' }} className="table-row-data resp-name"> No Invoices </div>}


                          </div>
                        </div>


                        {/* Transactions Table  */}
                        <div
                          id="transaction-table"
                          className="account-table-container"
                          style={{ display: "none" }}
                          ref={transactionTableRef}
                        >
                          {/* Top bar */}
                          <div className="table-top-bar d-flex align-items-center justify-content-between flex-wrap gap-3">
                            <div className="table-name flex-grow-1">Transactions</div>
                            {/* NK */}
                            <div class="d-flex align-items-center gap-3 flex-wrap">
                              {/* <!-- Location selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {/* {(getLogInSegment !== "OBB" && getLogInSegment !== "HBB") && <span class="textValue">{getSelectedCityTrans ? getSelectedCityTrans : getPinnedSessionData && !allCityFlag? getPinnedSessionData.LocationName : getLogInLocation?  getLogInLocation"Select All City"}</span>} */}
                                    <span class="textValue">{getLogInLocation}</span>
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  <li class="dropdown-item" style={{ fontSize: "14px" }}>
                                    {getLogInLocation}
                                  </li>
                                  {/* <li class="dropdown-item" data-value="Select All City" onClick={() => dropdownSelectionTransaction("Select All City", "city")}>Select All City</li> */}
                                  {/* {getUniqueLocation ? getUniqueLocation.map((city, index) => (
                                  <li key={index} class="dropdown-item" data-value={city} onClick={() => dropdownSelectionTransaction(city, "city")}>
                                    {city}
                                  </li>
                                )) : ""} */}
                                </ul>
                              </div>
                              {/* <!-- Address selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={distance} alt="" />
                                    {/* {(getLogInSegment !== "OBB" && getLogInSegment !== "HBB") && <span class="textValue">{getSelectedAreaTrans ? getSelectedAreaTrans : getPinnedSessionData ? getPinnedFlag ? "Select Area" : getPinnedSessionData.AreaName : "Select Area"}</span>} */}
                                    <span class="textValue">{getLogInArea}</span>
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  <li class="dropdown-item" style={{ fontSize: "14px" }}>
                                    {getLogInArea}
                                  </li>
                                  {/* {getUniqueAreaListTrans ? getUniqueAreaListTrans.map((area, index) => (
                                  <li key={index} class="dropdown-item" data-value={area} onClick={() => dropdownSelectionTransaction(area, "area")}>
                                    {area}
                                  </li>
                                )) : ""} */}
                                </ul>
                              </div>

                              {/* <!-- Date range picker --> */}
                              {/* <div class="spectra-dropdown">
                            <div class="select-custom dropdown-toggle rounded-0" id="reportrange">
                              <div class="d-flex align-items-center gap-2">
                                <img src={iconcalendar} alt="" />
                                <span>Today </span>
                              </div>
                            </div>
                          </div> */}


                              {/* <!-- Product selection dropdown --> */}
                              <div class="dropdown spectra-dropdown select-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0" data-bs-toggle="dropdown"
                                  aria-expanded="false" role="button">
                                  <div class="d-flex align-items-center gap-2">
                                    <img src={productIcon} alt="" />
                                    {/* {(getLogInSegment !== "OBB" && getLogInSegment !== "HBB") && <span class="textValue">{getSelectedProductTrans ? getSelectedProductTrans : getPinnedSessionData ? getPinnedFlag ? "Select Product" : getPinnedSessionData.SegmentName + " (" + getPinnedSessionData.CanId + ")" : "Select Product"}</span>} */}
                                    <span class="textValue">{getLogInSegment + " (" + getLogInCanId + ")"}</span>
                                  </div>
                                </div>
                                <ul class="dropdown-menu">
                                  <li class="dropdown-item" style={{ fontSize: "14px" }}>
                                    {getLogInSegment + " (" + getLogInCanId + ")"}
                                  </li>

                                  {/* {getUniqueProductListTrans ? getUniqueProductListTrans.map((item, index) => (
                                  <li key={index} class="dropdown-item" data-value={item.SegmentName + " (" + item.CanId + ")"} onClick={() => dropdownSelectionTransaction(item.SegmentName + " (" + item.CanId + ")", "segment")}>
                                    {item.SegmentName + " (" + item.CanId + ")"}
                                  </li>
                                )) : ""} */}
                                </ul>
                              </div>

                              {/* <div class="spectra-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0">
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={iconcalendar} alt="" /> */}
                                    {/* <span>Today </span> */}

                                    <DateRangePicker
                                      initialSettings={{
                                        ranges: {
                                          '1 Month': [moment().subtract(1, 'months'), moment()],
                                          '3 Months': [moment().subtract(3, 'months'), moment()],
                                          '6 Months': [moment().subtract(6, 'months'), moment()],
                                          '9 Months': [moment().subtract(9, 'months'), moment().subtract(1, 'days')],
                                          '1 Year': [moment().subtract(1, 'years'), moment()]
                                        },
                                        maxDate: new Date()
                                      }}
                                      onApply={handleDateRangeChangeTrans}
                                    >
                                      <div class="spectra-dropdown">
                                <div class="select-custom dropdown-toggle rounded-0">
                                  <div className="d-flex align-items-center gap-2">
                                    <img src={iconcalendar} alt="" />
                                      <span
                                        type="text"
                                        className=""
                                        value={selectedRangeTrans}
                                      >{selectedRangeTrans}
                                      </span>
                                      </div></div></div>
                                    </DateRangePicker>
                                  {/* </div>

                                </div> */}
                                {/* <ul class="dropdown-menu" onClick={(value) => dropdownSelection(value, "period")}>
                                <li class="dropdown-item" data-value="1" value="1 Month">1 Month</li>
                                <li class="dropdown-item" data-value="2" value="3 Months">3 Months</li>
                                <li class="dropdown-item" data-value="3" value="6 months">6 months</li>
                                <li class="dropdown-item" data-value="4" value="9 Month">9 Months</li>
                                <li class="dropdown-item" data-value="5" value="1 Year">1 Year</li>
                                <li class="dropdown-item" data-value="6" value="Custom Date">Custom Date</li>
                              </ul> */}
                              {/* </div> */}


                            </div>
                            {/* search bar */}
                            <div className="table-search-wrapper d-flex align-items-center">
                              <input
                                className="table-search-input dashboard-search-input"
                                placeholder="Search"
                                type="text"
                                id="search"
                                name="search"
                                value={searchTermTrans}
                                onChange={handleSearchTrans}
                              />
                              <img src={tablesearch} alt="" />
                            </div>
                          </div>




                          {/* transaction table for large screen devices */}
                          <div className="horizontal-scroll-container d-none d-md-block">
                            <table className="account-table">
                              <tbody>
                                <tr className="table-header transaction-header">
                                  {/* <th className="table-header-data">Service</th> */}
                                  <th className="table-header-data">Service ID</th>
                                  <th className="table-header-data">Location</th>
                                  <th className="table-header-data">Transaction ID</th>
                                  <th className="table-header-data">Transaction Date</th>
                                  <th className="table-header-data">Type</th>
                                  <th className="table-header-data">Amount</th>
                                  <th className="table-header-data">Payment Mode</th>
                                  <th className="table-header-data">Description</th>
                                </tr>


                                {/* Default Location Transaction List */}
                                {getFinalTransactionHistoryOne && getFinalTransactionHistoryOne.length > 0 ? getFinalTransactionHistoryOne?.map((item, index) => (
                                  <tr key={index} className="table-row unpaid">
                                    {/* <td className="table-row-data service">{getSingleTrans.PlanName}</td> */}
                                    <td className="table-row-data serviceId">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={getMergedAreaProdOne && getMergedAreaProdOne.CanId.toString()}
                                      />
                                    </td>
                                    <td className="table-row-data location">
                                      <Tooltip className="tooltip-billing" content={getMergedAreaProdOne && getMergedAreaProdOne.AreaName}>
                                        <span>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={getMergedAreaProdOne ? getMergedAreaProdOne.AreaName.length > 10 ? getMergedAreaProdOne.AreaName.substring(0, 10) + "..." : getMergedAreaProdOne.AreaName : "N/A"}
                                          />
                                        </span>
                                      </Tooltip>
                                    </td>
                                    <td className="table-row-data transactions">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.srlNo && item.srlNo.toString()}
                                      />
                                    </td>
                                    <td className="table-row-data transactionDate">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.transactionDate && formatDate(item.transactionDate.toString())}
                                      />
                                    </td>
                                    <td className="table-row-data transactionType">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.voucherType && item.voucherType}
                                      />
                                    </td>
                                    <td className="table-row-data amount">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.amount && "₹" + item.amount.toString()}
                                      />
                                    </td>
                                    <td className="table-row-data paymentMode">
                                      <Highlighter
                                        highlightClassName="custom-highlight"
                                        searchWords={searchTermTrans}
                                        autoEscape={true}
                                        textToHighlight={item.instrumentType ? item.instrumentType : "N/A"}
                                      />
                                    </td>
                                    <td className="table-row-data description">
                                      <p>
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.instrumentDetail ? item.instrumentDetail : "N/A"}
                                        />
                                      </p>
                                    </td>
                                  </tr>
                                )) : <tr className="table-row"><td colSpan={8} style={{ textAlign: "center" }} className="table-row-data">No Transactions</td></tr>}



                              </tbody>
                            </table>
                          </div>

                          {/* transactions table for small screen devices <768px */}
                          <div className="d-block d-md-none">
                            {/* Default Location Transaction List */}
                            {getFinalTransactionHistoryOne && getFinalTransactionHistoryOne.length > 0 ? getFinalTransactionHistoryOne?.map((item, index) => (

                              <div key={index} className="table-content">
                                <div className="table-row-data resp-name">
                                  {/* {getFinalDropdownSelectionTrans.PlanName}{" "} */}
                                  <span className="resp-innerHeading mx-2">
                                    (Service ID:
                                    <Highlighter
                                      highlightClassName="custom-highlight"
                                      searchWords={searchTermTrans}
                                      autoEscape={true}
                                      textToHighlight={getMergedAreaProdOne && getMergedAreaProdOne.CanId.toString()}
                                    />)
                                  </span>
                                </div>
                                <div className="table-row-data email d-flex align-items-center justify-content-between">
                                  <div>Location:
                                    <Tooltip className="tooltip-billing" content={getMergedAreaProdOne && getMergedAreaProdOne.AreaName}>
                                      <span>
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={getMergedAreaProdOne && (getMergedAreaProdOne.AreaName).length > 10 ? getMergedAreaProdOne.AreaName.substring(0, 10) + "..." : getMergedAreaProdOne.AreaName}
                                        />
                                      </span>
                                    </Tooltip></div>
                                  <div>Transaction ID: <Highlighter
                                    highlightClassName="custom-highlight"
                                    searchWords={searchTermTrans}
                                    autoEscape={true}
                                    textToHighlight={item.srlNo.toString()}
                                  />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Transaction Date
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={formatDate(item.transactionDate)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">Type</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.voucherType}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">Amount</div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={"₹" + item.amount}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Payment Mode
                                      </div>
                                      <div className="resp-contact">
                                        <Highlighter
                                          highlightClassName="custom-highlight"
                                          searchWords={searchTermTrans}
                                          autoEscape={true}
                                          textToHighlight={item.instrumentType ? item.instrumentType : "N/A"}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12">
                                    <div className="table-row-data">
                                      <div className="resp-innerHeading">
                                        Description
                                      </div>
                                      <div className="resp-contact resp-description">
                                        <p>
                                          <Highlighter
                                            highlightClassName="custom-highlight"
                                            searchWords={searchTermTrans}
                                            autoEscape={true}
                                            textToHighlight={item.instrumentDetail ? item.instrumentDetail : "N/A"}
                                          />
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )) : <div style={{ textAlign: 'center' }} className="table-row-data resp-name"> No Transactions </div>}



                          </div>
                        </div>
                      </div>
                    </div>)}
                    {/* Payment details Invoice: This opens when you click on pay now from Invoice table. */}
                    {(showBillingDetailAdmin && payNowClick) && (
                      <PaymentDetailsInvoice getInvoicePayNowRow={getInvoicePayNowRow} goBackToTransactions={goBackToTransactions} />)}


                  </div>
                  {/* ****************** USER MANAGEMENT TAB ************* */}
                  <div
                    className="tab-pane fade pb-5"
                    id="pills-user"
                    role="tabpanel"
                    aria-labelledby="pills-user-tab"
                  >
                    {/* ADMIN LEVEL PAGE  */}
                    {showAdminLevel && (<div id="admin-level">
                      {/* Large Screen Table  */}
                      <div className="">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                          <div className="account-tab-heading">Admin Level</div>
                          <div className="add-role-btn">ADD ROLE</div>
                        </div>
                        <div className="account-table-container">
                          <div className="table-top-bar d-flex align-items-center flex-wrap gap-3">
                            <div className="table-name flex-grow-1">Admins</div>
                            {/* Location selection dropdown */}
                            <div className="dropdown spectra-dropdown select-dropdown">
                              <div
                                className="select-custom dropdown-toggle rounded-0"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                role="button"
                              >
                                <div className="d-flex align-items-center gap-2">
                                  <img src={distance} alt="" />
                                  <span className="textValue">Banglore</span>
                                </div>
                              </div>
                              <ul className="dropdown-menu">
                                <li className="dropdown-item" data-value="Bangalore">
                                  Bangalore
                                </li>
                                <li className="dropdown-item" data-value="Delhi">
                                  Delhi
                                </li>
                                <li className="dropdown-item" data-value="Gurgaon">
                                  Gurgaon
                                </li>
                                <li className="dropdown-item" data-value="Mumbai">
                                  Mumbai
                                </li>
                              </ul>
                            </div>
                            <div className="table-search-wrapper d-flex align-items-center">
                              <input
                                className="table-search-input dashboard-search-input"
                                placeholder="Search"
                                id="search"
                                name="search"
                              />
                              <img src={tablesearch} alt="" />
                            </div>
                          </div>
                          {/* Users table for large screen devices */}
                          <div className="horizontal-scroll-container d-none d-md-block">
                            <table className="account-table">
                              <tbody>
                                <tr className="table-header">
                                  <th className="table-header-data">Name</th>
                                  <th className="table-header-data">Email ID</th>
                                  <th className="table-header-data">Mobile Number</th>
                                  <th className="table-header-data">Located</th>
                                  <th className="table-header-data ">Status</th>
                                  <th className="table-header-data">Action</th>
                                </tr>
                                <tr className="table-row">
                                  <td className="table-row-data">Gaurav Gandhi</td>
                                  <td className="table-row-data">
                                    gaurav123@gmail.com
                                  </td>
                                  <td className="table-row-data">+91 6245971248</td>
                                  <td className="table-row-data">Bangalore</td>
                                  <td className="table-row-data">
                                    <div className="status-active-btn">Active</div>
                                  </td>
                                  <td className="table-row-data d-flex align-items-center gap-2 mt-1">
                                    <div
                                      className="action-view-link"
                                      onClick={viewUserDetails}
                                    >
                                      View Details
                                    </div>
                                    <img src={arrowout} alt="" />
                                  </td>
                                </tr>
                                <tr className="table-row">
                                  <td className="table-row-data">Rachit Sharma</td>
                                  <td className="table-row-data">
                                    rachit1@gmail.com
                                  </td>
                                  <td className="table-row-data">+91 6245971248</td>
                                  <td className="table-row-data">Delhi</td>
                                  <td className="table-row-data">
                                    <div className="status-active-btn">Active</div>
                                  </td>
                                  <td className="table-row-data d-flex align-items-center gap-2 mt-1">
                                    <div
                                      className="action-view-link"
                                      onClick={viewUserDetails}
                                    >
                                      View Details
                                    </div>
                                    <img src={arrowout} alt="" />
                                  </td>
                                </tr>
                                <tr className="table-row">
                                  <td className="table-row-data">Ratish Verma</td>
                                  <td className="table-row-data">
                                    ratish_02gmail.com
                                  </td>
                                  <td className="table-row-data">+91 6245971248</td>
                                  <td className="table-row-data">Mumbai</td>
                                  <td className="table-row-data">
                                    <div className="status-active-btn">Active</div>
                                  </td>
                                  <td className="table-row-data d-flex align-items-center gap-2 mt-1">
                                    <div
                                      className="action-view-link"
                                      onClick={viewUserDetails}
                                    >
                                      View Details
                                    </div>
                                    <img src={arrowout} alt="" />
                                  </td>
                                </tr>
                                <tr className="table-row">
                                  <td className="table-row-data">Santosh Shukla</td>
                                  <td className="table-row-data">
                                    santosh.shukla@gmail.com
                                  </td>
                                  <td className="table-row-data">+91 6245971248</td>
                                  <td className="table-row-data">Pune</td>
                                  <td className="table-row-data">
                                    <div className="status-active-btn">Active</div>
                                  </td>
                                  <td className="table-row-data d-flex align-items-center gap-2 mt-1">
                                    <div
                                      className="action-view-link"
                                      onClick={viewUserDetails}
                                    >
                                      View Details
                                    </div>
                                    <img src={arrowout} alt="" />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          {/* Users table for small screen devices <768px */}
                          <div className="d-block d-md-none">
                            <div className="table-content">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data resp-name">
                                  Gaurav Gandhi
                                </div>
                                <div className="table-row-data">
                                  <div className="status-active-btn">Active</div>
                                </div>
                              </div>
                              <div className="table-row-data email">
                                gaurav123@gmail.com
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">Located</div>
                                  <div className="resp-contact">Bangalore</div>
                                </div>
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">
                                    Mobile Number
                                  </div>
                                  <div className="resp-contact">+91 6245971248</div>
                                </div>
                              </div>
                            </div>
                            <div className="table-content">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data resp-name">
                                  Gaurav Gandhi
                                </div>
                                <div className="table-row-data">
                                  <div className="status-active-btn">Active</div>
                                </div>
                              </div>
                              <div className="table-row-data email">
                                gaurav123@gmail.com
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">Located</div>
                                  <div className="resp-contact">Bangalore</div>
                                </div>
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">
                                    Mobile Number
                                  </div>
                                  <div className="resp-contact">+91 6245971248</div>
                                </div>
                              </div>
                            </div>
                            <div className="table-content">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data resp-name">
                                  Gaurav Gandhi
                                </div>
                                <div className="table-row-data">
                                  <div className="status-active-btn">Active</div>
                                </div>
                              </div>
                              <div className="table-row-data email">
                                gaurav123@gmail.com
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">Located</div>
                                  <div className="resp-contact">Bangalore</div>
                                </div>
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">
                                    Mobile Number
                                  </div>
                                  <div className="resp-contact">+91 6245971248</div>
                                </div>
                              </div>
                            </div>
                            <div className="table-content">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data resp-name">
                                  Gaurav Gandhi
                                </div>
                                <div className="table-row-data">
                                  <div className="status-active-btn">Active</div>
                                </div>
                              </div>
                              <div className="table-row-data email">
                                gaurav123@gmail.com
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">Located</div>
                                  <div className="resp-contact">Bangalore</div>
                                </div>
                                <div className="table-row-data">
                                  <div className="resp-innerHeading">
                                    Mobile Number
                                  </div>
                                  <div className="resp-contact">+91 6245971248</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>)}
                    {/* ADMIN DETAL PAGE  (ViewUserDetails.js*/}
                    {showAdminDetail && fullDetails && <ViewUserDetails goBackToUserManagement={goBackToUserManagement} />}

                  </div>
                </div>
                {/* FOOTER START  */}
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </section>

    )
  }

}