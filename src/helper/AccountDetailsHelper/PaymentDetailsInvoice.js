import React, { useState, useEffect, useRef } from 'react';
import { Link, Navigate, redirect } from 'react-router-dom';
import paybillingicon from "../../assets/images/pay-billing-icon.svg";
import paylocationicon from "../../assets/images/pay-location-icon.svg";
import pincodeedit from "../../assets/images/pincode-edit.svg";
import edit from "../../assets/images/edit.svg";
import adminbackarrow from "../../assets/images/admin-back-arrow.svg";
import '../../assets/css/dashboard.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from "../../assets/images/Spectra-Logo_192x192.png"
import { deviceDetect, mobileModel } from "react-device-detect"



export default function PaymentDetailsInvoice({ goBackToTransactions, getInvoicePayNowRow }) {
  // console.log(getInvoicePayNowRow);
  const serviceId = getInvoicePayNowRow.CanId

// ishan 
const [email ,setEmail] = useState();
const[accountName,setAccountName] = useState();
const [mobileNo,setMobileNo] = useState();
const [id,setID] = useState();
const [userName,setUserName] = useState();
const [accMgrName ,setAccMgrName] = useState();
const [newInput,setNewInput] = useState();

//end 

  const [getBillingAddress, setBillingAddress] = useState();
  const [getPostalCode, setPostalCode] = useState();
  const [getTdsSlab, setTdsSlab] = useState();
  const [newTds,setNewTds] = useState();
  const [getTotalAmount, setTotalAmount] = useState();
  const [newTotalAmount ,setNewTotalAmount] = useState();
  const [getStatutoryData, setStatutoryData] = useState();
  const [afterErrorTa,setafterErrorTa] = useState();
  const [inputValid ,setInputValid] = useState();
  const [flag,setFlag]= useState(false);
  
  const unpaidAmount = getInvoicePayNowRow.item ? getInvoicePayNowRow.item.unPaidBalance : getInvoicePayNowRow.top3Invoice[0].unPaidBalance;

  const [device,setDevice] = useState('')

// ishan
const formatDate = (dateString) => {
  // console.log("dateString:",dateString);
  const date = new Date(dateString);
  const day = ('0' + date.getDate()).slice(-2);
  const month = date.toLocaleString('en', { month: 'short' });
  const year = date.getFullYear().toString().slice(-2);
  return `${day} ${month}'${year}`;
};

function pre7DaysDate(dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 7);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = date.toLocaleString('en', { month: 'short' });
  const year = String(date.getUTCFullYear()).slice(-2);

  return `${day} ${month}'${year}`;
}

function pre2DaysDate(dateString) {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 2);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = date.toLocaleString('en', { month: 'short' });
  const year = String(date.getUTCFullYear()).slice(-2);

  return `${day} ${month}'${year}`;
}

  //megha
  const handleUnpaidEditIconClick = (event) => {
    const editableValue = event.currentTarget.closest('.editable-block').querySelector('.editable-value');
    if (editableValue) {
      // Enable contentEditable and focus
      editableValue.contentEditable = true;
      editableValue.focus();
      // Place the cursor at the end of the last text node only
      const range = document.createRange();
      const selection = window.getSelection();
      // Find the last text node in the editableValue
      let lastChild = editableValue.lastChild;
  
      // Traverse backwards until a text node is found
      while (lastChild && lastChild.nodeType !== Node.TEXT_NODE) {
        lastChild = lastChild.previousSibling;
      }

      // If a text node is found, place the cursor at the end of it
      if (lastChild && lastChild.nodeType === Node.TEXT_NODE) {
        range.setStart(lastChild, lastChild.length);
        range.setEnd(lastChild, lastChild.length);
      } else {
        // If no text node is found, collapse at the end of the content
        range.selectNodeContents(editableValue);
        range.collapse(false);
      }
  
      // Set the selection to the computed range
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      console.error("Editable value not found!");
    }
  };

  const handleEditUnpaidValueBlur = async (event) => {
    // Get the numeric value from the edited content
    const enteredValue = event.currentTarget.textContent.replace("₹", "").trim();
    const numericValue = Number(enteredValue);
    // console.log("getTdsSlab...",getTdsSlab);
    // console.log("EditUnpaid after blur", numericValue, newTds, numericValue, getTdsSlab)
    let unPaidBlc = newTds ? (numericValue-newTds) :(numericValue-getTdsSlab);
    // console.log("numericValue",numericValue);
    setNewInput(numericValue);
    // let unPaidBlc = numericValue
    // console.log("unPaidBlc",unPaidBlc);
    // setNewCalcAmount(unPaidBlc);
    // setNewTotalAmount(unPaidBlc.toFixed(2))
    if(getTdsSlab==undefined){
      setNewTotalAmount(numericValue.toFixed(2))
    }else{
    setNewTotalAmount(unPaidBlc.toFixed(2))
    }
    // console.log("newTotalAmount.....",newTotalAmount)
    setInputValid(true);
    if (!isNaN(numericValue)){
     if(numericValue == 0){
      Swal.fire({
        html: '<div style="font-size: 15px;"> value cannot be 0</div>', // Adjust text size as needed
        icon: 'error',
        iconHtml: '<div style="font-size: 28px; color: red; box-sizing: border-box ;">&#10006;</div>', // Adjust icon size and style as needed
        width: '29%',
        confirmButtonText: 'OK',
        imageHeight: '100%',
        imageWidth: '20%',
        iconColor: 'red',
        iconHeight: '100%',
        customClass: {
          icon: 'custom-icon'
        }
      });
      event.currentTarget.textContent = `₹${unpaidAmount}`;
      setInputValid(false);
     }}else{
      Swal.fire({
        html: '<div style="font-size: 15px;">Please enter a valid numeric value for unpaid amount</div>', // Adjust text size as needed
        icon: 'error',
        iconHtml: '<div style="font-size: 35px; color: red; box-sizing: border-box ;">&#10006;</div>', // Adjust icon size and style as needed
        confirmButtonText: 'OK',
      });
      event.currentTarget.textContent = `₹${unpaidAmount}`;
      setInputValid(false);
     }
   
  };
  
  const handleEditUnpaidValueInput =(e)=>{
    const entredValue = e.currentTarget.textContent.replace("₹", "").trim();
    const numValue = entredValue.replace(/[^0-9.]/g, '');
    e.currentTarget.textContent = `₹${numValue}`;

    const editableValue = e.currentTarget;
    moveCursorToEnd(editableValue);
  }


// ishan
const handleEditIconClick = (event) => {
  const editableValue = event.currentTarget.closest('.editable-block').querySelector('.editable-value');
if (editableValue) {
  editableValue.textContent = '₹';
  editableValue.contentEditable = true;
  editableValue.focus();
} else {
  console.error("Editable value not found!");
}
};


// // Naveen ==> Fix of edit tds amount getting empty and cursor at end every time 
// const handleEditIconClick = (event) => {
//   const editableValue = event.currentTarget.closest('.editable-block').querySelector('.editable-value');
//   if (editableValue) {
//     if (!editableValue.textContent.includes('₹')) {
//       editableValue.textContent = '₹' + editableValue.textContent.trim(); // Prepend '₹' only if it's not already there
//     }
//     editableValue.contentEditable = true;
//     editableValue.focus();
    
//     // Move the cursor to the end of the content
//     moveCursorToEnd(editableValue);
//   } else {
//     console.error("Editable value not found!");
//   }
// };

const moveCursorToEnd = (element) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);  // Move cursor to the end
  selection.removeAllRanges();
  selection.addRange(range);
};



const handleEditableValueInput = (event) => {  
// Get the entered value without the rupee sign and any leading/trailing whitespace
const enteredValue = event.currentTarget.textContent.replace("₹", "").trim();

// Remove any non-numeric characters from the entered value
const numericValue = enteredValue.replace(/[^0-9.]/g, '');


// Update the content of the editable element with the numeric value (with the rupee sign)
event.currentTarget.textContent = `₹${numericValue}`;

  const editableValue = event.currentTarget;
  moveCursorToEnd(editableValue);

};

const handleEditableValueBlur = async (event) => {

  // Get the numeric value from the edited content
  const enteredValue = event.currentTarget.textContent.replace("₹", "").trim();
  const numericValue = Number(enteredValue);

  // console.log("after blur", numericValue)

  // Check if the numericValue is a valid number
  if (!isNaN(numericValue)) {

    // console.log("after blurin", numericValue)
    // console.log("getTdsSlab",getTdsSlab)

    if (numericValue <= getTdsSlab) {
      // console.log("after blurin 2", numericValue)
      let userTdsSlab = numericValue;
      event.currentTarget.textContent = `₹${userTdsSlab}`;
      setNewTds(userTdsSlab);
      // console.log("hloo", newTotalAmount, newInput, userTdsSlab, unpaidAmount);
      // setNewTotalAmount((newCalcAmount ? (newCalcAmount - userTdsSlab) : (unpaidAmount-userTdsSlab)).toFixed(2));
      // setNewTotalAmount(newInput-userTdsSlab);
      setNewTotalAmount(newTotalAmount ? (newInput ? (newInput-userTdsSlab) : (unpaidAmount-userTdsSlab)).toFixed(2) : (unpaidAmount-userTdsSlab).toFixed(2))
      // console.log("newTotalAmount",newTotalAmount)
      setInputValid(true)
    } else {

      //  Swal.fire({
      //    text: "TDS slab value cannot be more than (2%)!",
      //    icon: 'error',
      //    confirmButtonText: 'OK',
      //  });
      Swal.fire({
        //  text: "TDS slab value cannot be more than 2%",
        html: '<div style="font-size: 15px;">TDS slab value cannot be more than 2%</div>', // Adjust text size as needed
        icon: 'error',
        iconHtml: '<div style="font-size: 28px; color: red; box-sizing: border-box ;">&#10006;</div>', // Adjust icon size and style as needed
        width: '29%',
        confirmButtonText: 'OK',
        imageHeight: '100%',
        imageWidth: '20%',
        iconColor: 'red',
        iconHeight: '100%',
        customClass: {
          icon: 'custom-icon'
        }
      });
      event.currentTarget.textContent = `₹${getTdsSlab}`;
      setInputValid(false)
    }
  } else {
    // Revert the content back to its original state (without the user's changes)
    // event.currentTarget.textContent = `₹${getTdsSlab}`;
    // If the input is not a valid number, show an error message
    //  Swal.fire({
    //    text: "Please enter a valid numeric value for TDS slab!",
    //    icon: 'error',
    //    confirmButtonText: 'OK',
    //  });
    Swal.fire({
      //  text: "Please enter a valid numeric value for TDS slab!",
      html: '<div style="font-size: 15px;">Please enter a valid numeric value for TDS slab</div>', // Adjust text size as needed
      icon: 'error',
      iconHtml: '<div style="font-size: 35px; color: red; box-sizing: border-box ;">&#10006;</div>', // Adjust icon size and style as needed
      confirmButtonText: 'OK',
    });
    event.currentTarget.textContent = `₹${getTdsSlab}`;
    setInputValid(false)
  }
};


// const handleEditableValueBlur = async (event) => {
    
//   // Get the numeric value from the edited content
//   const enteredValue = event.currentTarget.textContent.replace("₹", "").trim();
//   const numericValue = Number(enteredValue);


//   console.log("after blur",numericValue)
 
//    // Check if the numericValue is a valid number
//    if (!isNaN(numericValue)) {
     
//      console.log("after blurin",numericValue)
    
//      if (numericValue <= getTdsSlab) {
//        console.log("after blurin 2",numericValue)
//        let userTdsSlab = numericValue;
//        event.currentTarget.textContent = `₹${userTdsSlab}`;
//        setNewTds(userTdsSlab);
//        console.log("hloo", userTdsSlab);
//        setNewTotalAmount((unpaidAmount - userTdsSlab).toFixed(2));
//        setInputValid(true)
//      } else {
       
//       //  Swal.fire({
//       //    text: "TDS slab value cannot be more than (2%)!",
//       //    icon: 'error',
//       //    confirmButtonText: 'OK',
//       //  });
//       Swal.fire({
//         //  text: "TDS slab value cannot be more than 2%",
//          html: '<div style="font-size: 15px;">TDS slab value cannot be more than 2%</div>', // Adjust text size as needed
//          icon: 'error',
//          iconHtml: '<div style="font-size: 28px; color: red; box-sizing: border-box ;">&#10006;</div>', // Adjust icon size and style as needed
//          width: '29%',
//          confirmButtonText: 'OK',
//          imageHeight : '100%',
//          imageWidth : '20%',
//          iconColor : 'red',
//          iconHeight : '100%',
//          customClass: {
//           icon : 'custom-icon'
//          }
//        });
//        event.currentTarget.textContent = `₹${getTdsSlab}`;
//        setInputValid(false)
//      }
//    } else {
//       // Revert the content back to its original state (without the user's changes)
//    // event.currentTarget.textContent = `₹${getTdsSlab}`;
//      // If the input is not a valid number, show an error message
//     //  Swal.fire({
//     //    text: "Please enter a valid numeric value for TDS slab!",
//     //    icon: 'error',
//     //    confirmButtonText: 'OK',
//     //  });
//     Swal.fire({
//       //  text: "Please enter a valid numeric value for TDS slab!",
//        html: '<div style="font-size: 15px;">Please enter a valid numeric value for TDS slab</div>', // Adjust text size as needed
//        icon: 'error',
//        iconHtml: '<div style="font-size: 35px; color: red; box-sizing: border-box ;">&#10006;</div>', // Adjust icon size and style as needed
//        confirmButtonText: 'OK',
//      });
//      event.currentTarget.textContent = `₹${getTdsSlab}`;
//      setInputValid(false)
//    }
//  };


// end
  // end
 
 
  useEffect(() => {
    async function CustomerAccountDetail() {
      try {
        const url = process.env.REACT_APP_API_URL + '/getCustomerAccountDetail';
        const data = {
          serviceGroupId: serviceId
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        // ishan
        // console.log("hlouser",result.data);
        setEmail(result.data.email);
        setAccountName(result.data.accountName);
        setMobileNo(result.data.shipToMobileno);
        setID(result.data.orgId);
        setUserName(result.data.accountNo)
        // end
       setBillingAddress(result.data.shipToAddress + ", " + result.data.shipToCity + ", " + result.data.shipToState + ", " + result.data.shipToCountry);
        setPostalCode(result.data.shipToPostalCode);
      } catch (error) {
        throw new Error('Failed to retrieve area and location details.');
      }
    }

    // Usage  
    CustomerAccountDetail();

  }, []);



  useEffect(() => {
    async function tdsSlab() {
      try {
        const url = process.env.REACT_APP_API_URL + '/getLedgerByAccountId';
        const data = {
          actId: serviceId
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        // console.log("getLedgerByAccountId", result.data.ledgerActNo);


        const url2 = process.env.REACT_APP_API_URL + '/getStatutoryData';
        const data2 = {
          ledgerAccountNo: result.data.ledgerActNo
        };
        const response2 = await fetch(url2, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data2)
        });
        const result2 = await response2.json();
        // console.log("getStatutoryData", result2);
        setStatutoryData(result2);
        // const serviceID = localStorage.getItem("credentialKey");    
        // Find details in result.data
        if(result2.meta.Status = true){
        const tdsSlab = result2.data.find((item) => item.statutoryTypeNo == "12");
        const tdsSlabAmount = (tdsSlab.value / 100) * unpaidAmount;
        // console.log("tdsSlab", tdsSlabAmount);

        if (!tdsSlab){
          setFlag(false)
          setTdsSlab(tdsSlabAmount.toFixed(2));
          setTotalAmount((unpaidAmount - tdsSlabAmount).toFixed(2));
          setafterErrorTa((unpaidAmount - tdsSlabAmount).toFixed(2));
        }else{
          setFlag(true)

          setTdsSlab(tdsSlabAmount.toFixed(2));
          setTotalAmount((unpaidAmount - tdsSlabAmount).toFixed(2));
          setafterErrorTa((unpaidAmount - tdsSlabAmount).toFixed(2));
        }

        // setTdsSlab(tdsSlabAmount.toFixed(2));
        // setTotalAmount((unpaidAmount - tdsSlabAmount).toFixed(2));
        // setafterErrorTa((unpaidAmount - tdsSlabAmount).toFixed(2));
        }
        // getServicePayNow.PlanName
      } catch (error) {
        throw new Error('Failed to retrieve area and location details.');
      }
    }

    // Usage  
    tdsSlab();

  }, []);

// ishan
useEffect(() => {
  const fetchAccountManagerDetail = async () => {
    try {
      const url = process.env.REACT_APP_API_URL + '/getAccManagerDetails';
      const data = {
        cANID: serviceId
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      // ishan
      // console.log("hloaccountManager", result.data);
      setAccMgrName(result.data.AccountManagerName);
      // end
    } catch (error) {
      throw new Error('Failed to retrieve data');
    }
  };

  fetchAccountManagerDetail(); // Call the function here

}, []);
// end





  const [isPayNowClicked, setIsPayNowClicked] = useState(false);

  useEffect(() => {
    let user_device_os = deviceDetect().osName ? deviceDetect().osName : deviceDetect().os;
    setDevice(user_device_os)
    // console.log('user_device_os', user_device_os);
  }, []);
//ios app store payment function start for razorpat
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
  }


// const handlePayNow = async() => {
//   const url = "https://custappmw.spectra.co/index.php";

//   const apirequest = {
//     "Action": "createOrder",
//     "Authkey": "AdgT68HnjC8U5S3TkehEqlkd4",
//     "custName": accountName,
//     "amount": newTotalAmount ? newTotalAmount : getTotalAmount ? getTotalAmount : unpaidAmount,
//     //  "amount" : "50",
//     "emailId": email,
//     "mobileNo": mobileNo,
//     "canId": serviceId,
//     "requestType": "1"

//     // "paymentSource": 'spectra_one',
//     // "unpaid_amount": getTotalAmount? getTotalAmount : unpaidAmount,
//     // "tds_amount": getTdsSlab ? getTdsSlab : "",
//     // "tds_checked": getTdsSlab ? "1" : "0",
//     // "invoiceno": getInvoicePayNowRow.item ? getInvoicePayNowRow.item.invoiceNo : getInvoicePayNowRow.top3Invoice[0].invoiceNo,
//     // "orgid": id,
//     // "emailid": email,
//     // "mobileno": mobileNo
//   }

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(apirequest)
//       });

//       const result = await response.json();
//       console.log("create order result", result);
// if(result.status == "success"){
 
//       const res = await loadScript(
//         "https://checkout.razorpay.com/v1/checkout.js"
//     );
// let convertToPaisa = result.response.paidAmount;
// let paisa = convertToPaisa * 100;

//  // Define the hide object
//  let hideOptions = [];
 
//  // Conditionally modify the hide object based on the device
//  if (device === 'iOS') {
//    // Hide the UPI option for iOS
//    hideOptions.push({
//      method: "upi"
//    });
//  }
//     const options = {
//       key: result.response.keyId, // Enter the Key ID generated from the Dashboard
//        amount: paisa.toString(),
//       // amount: "2".toString(),
//       "currency": "INR",
//       name: "Spectra",
//       description: "Spectra Payment",
//        image: "https://one.spectra.co/favicon.ico",
//       order_id: result.response.orderId,
//       handler: async function (response) {
//           const data = {
//               orderCreationId: result.response.orderId,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpayOrderId: response.razorpay_order_id,
//               razorpaySignature: response.razorpay_signature,
//           };
//           console.log("data....data",data);
//            let paymentUpdateStatus = "https://custappmw.spectra.co/index.php";
//            let requestData = {
//             "Action" : "responsePaymentForAutopay",
//             "Authkey" : "AdgT68HnjC8U5S3TkehEqlkd4",
//             "orderId" : data.razorpayOrderId,
//             "paymentId" : `${data.razorpayPaymentId}`
//             // "paymentSource":'spectra_one'
//            } 
           
//            const apiUpdateStatus =  await fetch(paymentUpdateStatus, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(requestData)
//           });

//           console.log("apiUpdateStatus",apiUpdateStatus);
//       },
//       prefill: {
//           name: accountName,
//           email: email,
//           contact: mobileNo
//       },
//       notes: {
//           address: "spectra Office",
//       },
//       theme: {
//           color: "#282A2A",
//       },
//       config: {
//         display: {
//           blocks: {
         
//           },
//           hide:hideOptions,
         
 
//           preferences: {
//             show_default_blocks: true // Should Checkout show its default blocks?
//           }
//         }
//       },

      
//     }
   
//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();

//   };
  

// }

//end ios app store payment function  for razorpat
  

const handlePayNow = () => {
    setIsPayNowClicked(true);
  
  // Wrap the code in a setTimeout function to delay its execution
  setTimeout(() => {
    //   // Get the form element
    const form = document.getElementById('transactionForm');
  
      // Generate the $session value
      const session = "SCP-" + new Date().toISOString().replace(/[-:.]/g, "");
   
    // Set the values of the input fields
    form.elements.uid.value = 'spectraone';
    form.elements.session.value = session;
    form.elements.passcode.value = 'S%fdM123S#$';
    form.elements.amount.value = newTotalAmount ? newTotalAmount :getTotalAmount? getTotalAmount : unpaidAmount;
    form.elements.csubtype.value = 'Web';
    form.elements.ctype.value  = '1';
    form.elements.source.value = '2';
    form.elements.unpaid_amount.value = getTotalAmount? getTotalAmount : unpaidAmount ;
     // dynamic changes for check ishan
    form.elements.tds_amount.value = getTdsSlab ? getTdsSlab : "";
     // dynamic changes for check ishan
    form.elements.tds_checked.value = getTdsSlab ? "1" : "0";
    // dynamic changes for check ishan
    form.elements.invoice_amount.value = getTotalAmount? getTotalAmount : unpaidAmount ;  
    form.elements.invoiceno.value = getInvoicePayNowRow.item ? getInvoicePayNowRow.item.invoiceNo : getInvoicePayNowRow.top3Invoice[0].invoiceNo;
     // dynamic changes for check ishan
    form.elements.accmgr.value  = accMgrName;
    form.elements.accno.value   = getInvoicePayNowRow.CanId;
     // dynamic changes for check ishan
    form.elements.accname.value = accountName;
    form.elements.emailid.value = email;
    form.elements.mobileno.value = mobileNo;
    form.elements.orgid.value = id;
    form.elements.username.value = userName;
    form.elements.returnurl.value = 'https://one.spectra.co/accountdetails';
   
    // Submit the form
     form.submit();


     
    
       // Log the hidden code values
      //  console.log('Hidden Code Values:');
         // Log the returnurl value
    // console.log('returnurl:', 'https://one.spectra.co/accountdetails');
    //    console.log('uid:','spectraone');
    //    console.log('passcode:', 'S%fdM123');
    //    console.log('amount:', newTotalAmount ? newTotalAmount :getTotalAmount? getTotalAmount : unpaidAmount);
    //    console.log('returnurl:','https://one.spectra.co/accountdetails' );
    //    console.log('unpaid_amount:',getTotalAmount? getTotalAmount : unpaidAmount );
    //    console.log('getTdsSlab',getTdsSlab ? getTdsSlab : "");
    //    console.log('tds_checked:',getTdsSlab ? "1" : "0" );
    //    console.log('invoice_amount:',newTotalAmount ? newTotalAmount :getTotalAmount? getTotalAmount : unpaidAmount );
    //    console.log('ctype:','1' );
    //    console.log('source:','2' );
    //    console.log('csubtype:','Web' );
    //    console.log('invoiceno:',getInvoicePayNowRow.item ? getInvoicePayNowRow.item.invoiceNo : getInvoicePayNowRow.top3Invoice[0].invoiceNo );
    //    console.log('accmgr:',accMgrName );
    //    console.log('accno:', getInvoicePayNowRow.CanId);
    //    console.log('accname:',accountName);
    //     console.log('emailid:',email );
    //     console.log('mobileno:',mobileNo );
    //     console.log('orgid:',id);
    //     console.log('username:',userName );
    //     console.log("form",form)
  
       // Add other hidden code values here
    }, 0)
  };

  return (
    <>

      <div id="billing-detail-admin" >
        <div class="account-tab-heading mb-3">Payment Details (Invoice)</div>
        <div class="admin-panel-wrapper account-tab-container">
          <div class="admin-panel-header">
            <div class="heading account-detail-banner-heading">{getInvoicePayNowRow.PlanName}<span>Service ID: {getInvoicePayNowRow.CanId}</span></div>
          </div>
          <div class="admin-panel-data">
            <div class="row">
              <div class="col-lg-4 col-md-6 col-sm-12 px-0 px-md-auto">
                <div class="p-0 py-2 p-md-4">
                  <div class="admin-panel-dataType">Invoice Number</div>
                  <div class="admin-panel-dataValue">{getInvoicePayNowRow.item ? getInvoicePayNowRow.item.invoiceNo : getInvoicePayNowRow.top3Invoice[0].invoiceNo}</div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12 px-0 px-md-auto">
                <div class="p-0 py-2 p-md-4">
                  <div class="admin-panel-dataType">Invoice Date</div>
                  <div class="admin-panel-dataValue">
                    {/* {getInvoicePayNowRow.top3Invoice[0].startdt.substring(0, 10)} */}
                    {getInvoicePayNowRow.item ? formatDate(getInvoicePayNowRow.item.startdt) : formatDate(getInvoicePayNowRow.top3Invoice[0].startdt)}
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12 px-0 px-md-auto">
                <div class="p-0 py-2 p-md-4">
                  <div class="admin-panel-dataType">Invoice Period</div>
                  <div class="admin-panel-dataValue">
                  {getInvoicePayNowRow.item? formatDate(getInvoicePayNowRow.item.startdt) + " - " + formatDate(getInvoicePayNowRow.item.enddt) 
                    : formatDate(getInvoicePayNowRow.top3Invoice[0].startdt) + " - " + formatDate(getInvoicePayNowRow.top3Invoice[0].enddt)}</div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12 px-0 px-md-auto">
                <div class="p-0 py-2 p-md-4">
                  <div class="admin-panel-dataType">Opening Balance</div>
                  <div class="admin-panel-dataValue">{getInvoicePayNowRow.item ? getInvoicePayNowRow.item.openingBalance : getInvoicePayNowRow.top3Invoice[0].openingBalance}</div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6 col-sm-12 px-0 px-md-auto">
                <div class="p-0 py-2 p-md-4">
                  <div class="admin-panel-dataType">Due Date</div>
                  <div class="admin-panel-dataValue">
                  {getInvoicePayNowRow.item ? getInvoicePayNowRow.SegmentName === "HBB"? pre2DaysDate(getInvoicePayNowRow.item.duedt) : pre7DaysDate(getInvoicePayNowRow.item.duedt) : getInvoicePayNowRow.SegmentName === "HBB"? pre2DaysDate(getInvoicePayNowRow.top3Invoice[0].duedt) : pre7DaysDate(getInvoicePayNowRow.top3Invoice[0].duedt)}
                    {/* {new Date(new Date(getInvoicePayNowRow.top3Invoice[0].duedt).setDate(new Date(getInvoicePayNowRow.top3Invoice[0].duedt).getDate() - 7)).toISOString().substring(0, 10)} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row pay-middle-row gap-3">
            <div class="col-lg-9 col-md-8 col-sm-12 resp-col4">
              <div class="admin-panel-box d-flex align-items-start">
                <div class="admin-panel-icon"><img src={paybillingicon} alt="" /></div>
                <div class="px-3 pt-1">
                  <div class="admin-panel-dataType">Billing Address</div>
                  <div class="admin-panel-dataValue" style={{ maxwidth: "340px" }}>
                    {getBillingAddress}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-12 resp-col4">
              <div class="admin-panel-box d-flex align-items-start">
                <div class="admin-panel-icon"><img src={paylocationicon} alt="" /></div>
                <div class="px-3 pt-1 editable-block">
                  <div class="admin-panel-dataType">Pin Code
                    {/* <img src={pincodeedit} alt="" class="editInputIcon" /> */}
                  </div>
                  <div class="admin-panel-dataValue editable-value">{getPostalCode}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="admin-panel-data">
            {/* <div
              class="pay-grand-amount d-flex align-items-center justify-content-between flex-wrap pb-3 px-5">
              <div class="amount-type">Unpaid Amount</div>
              <div class="amount-value">₹{getInvoicePayNowRow.item ? getInvoicePayNowRow.item.unPaidBalance : getInvoicePayNowRow.top3Invoice[0].unPaidBalance}</div>
            </div> */}

            <div
              class="pay-grand-amount d-flex align-items-center justify-content-between flex-wrap pb-3 px-5 editable-block">
              <div class="amount-type ">Unpaid Amount</div>
              <div class="amount-value editable-value" id="tdsSlabValue" onBlur={handleEditUnpaidValueBlur} onInput={handleEditUnpaidValueInput} >₹{unpaidAmount}


              </div>
              <img
                      src={edit}
                      alt=""
                      className="editInputIcon_pay"
                      onClick={handleUnpaidEditIconClick}
                      // style={{ width: "12px" , verticalAlign: "initial",marginLeft:"5px",cursor:"pointer"}}
                    />
            </div>
                    


            {/* {getTdsSlab &&
            <div
              class="pay-grand-amount d-flex align-items-center justify-content-between flex-wrap pb-3 px-5">
              <div class="amount-type ">TDS to be deducted (2%)</div>
              <div class="amount-value">₹{getTdsSlab}</div>
            </div>
            } */}

            {/* ishan code for tds editable */}
            {getTdsSlab &&  <div class="pay-grand-amount d-flex align-items-center justify-content-between flex-wrap pb-3 px-5 editable-block">
  <div class="amount-type">TDS to be deducted (2%) </div>
  
 <div class="amount-value-2 info-content editable-value" id="tdsSlabValue"   onInput={handleEditableValueInput} onBlur={handleEditableValueBlur}>
  ₹{getTdsSlab}  

  </div>
  
  <img
      src={edit}
      alt=""
      className="editInputIcon_pay"
      onClick={handleEditIconClick}
     
    />
</div>}



            {/* end */}

            <div class="pay-grand-amount d-flex align-items-center justify-content-between flex-wrap pt-3 px-5">
              {/* <div class="amount-total">Total : ₹{newTotalAmount ? newTotalAmount :getTotalAmount? getTotalAmount : unpaidAmount}</div> */}
              {inputValid ? (<div class="amount-total">Total : ₹{newTotalAmount ? newTotalAmount :getTotalAmount? getTotalAmount : unpaidAmount}</div>)
                : (
                  <div class="amount-total">
                    {/* <div>Test : ₹ {"newTotalAmount" + getTotalAmount}</div> */}
                    Total : ₹ {newTotalAmount ? newTotalAmount :getTotalAmount? getTotalAmount : unpaidAmount ? unpaidAmount : afterErrorTa}
                  </div>

            //       <>
            //         <div className="amount-total info-content editable-value">
            //         <input
            //             type="text"
            //             value={"9879"}
            //             onChange={"handleInputChange"}
            //             onBlur={"handleBlur"}
            //             autoFocus
            //         />

            // </div>
            // <img
            //     src={edit}
            //     alt="Edit"
            //     className="editInputIcon_pay"
            //     onClick={"handleEditIconClick"}
            //     style={{ cursor: 'pointer', marginLeft: '10px' }} // Add space between the text and icon
            // />

            //       </>
                )}
              <div class="d-flex">
                <div class="admin-back-btn d-none d-sm-flex align-items-center justify-content-center gap-2"
                  onClick={goBackToTransactions}>
                  <img src={adminbackarrow} alt="" />Back
                </div>
               {/* <!-- Transparent spacer --> */}

               <div class="spacer"></div>
               {/* {(newTotalAmount ? newTotalAmount :getTotalAmount? getTotalAmount : unpaidAmount ? unpaidAmount : afterErrorTa) <= 0 ?
                <div class="totalAmount-pay-btn" style={{backgroundColor: "gray"}}>PAY NOW</div>:

                <div class="totalAmount-pay-btn" onClick={handlePayNow}>PAY NOW</div>
               } */}

                <div class="totalAmount-pay-btn" onClick={handlePayNow}>PAY NOW</div>
                {isPayNowClicked && (
                  <form
                    action="https://epay.spectra.co/onlinepayment/getpayment_spectraone.php"
                    method="POST"
                    name="TransactionForm"
                    id="transactionForm"
                  >
                    <input type="hidden" name="uid" value="spectraone" />
                    <input type="hidden" name="passcode" value="S%fdM123S#$" />
                    <input type="hidden" name="session" value="" />
                    <input type="hidden" name="returnurl" value="" />
                    <input type="hidden" name="unpaid_amount" value={getTotalAmount? getTotalAmount : unpaidAmount} />
                    <input type="hidden" name="tds_amount" value={getTdsSlab ? getTdsSlab : ""} />
                    <input type="hidden" name="tds_checked" value={getTdsSlab ? "1" : "0"} />
                    <input type="hidden" name="invoice_amount" value={newTotalAmount ? newTotalAmount :getTotalAmount? getTotalAmount : unpaidAmount} />
                    <input type="hidden" name="amount" value={ getTotalAmount? getTotalAmount : unpaidAmount} />
                    <input type="hidden" name="source" value="2" />
                    <input type="hidden" name="ctype" value="1" />
                    <input type="hidden" name="csubtype" value="Web" />
                    <input type="hidden" name="invoiceno" value={getInvoicePayNowRow.item ? getInvoicePayNowRow.item.invoiceNo : getInvoicePayNowRow.top3Invoice[0].invoiceNo} />
                    <input type="hidden" name="accmgr" value={accMgrName} />
                    <input type="hidden" name="accno" value={getInvoicePayNowRow.CanId} />
                    <input type="hidden" name="accname" value={accountName} />
                    <input type="hidden" name="emailid" value={email} />
                    <input type="hidden" name="mobileno" value={mobileNo} />
               
                    <input type="hidden" name="orgid" value={id} />
                    <input type="hidden" name="username" value={userName} />

                  </form>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

