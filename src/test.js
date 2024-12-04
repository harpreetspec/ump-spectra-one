import React from 'react'

const test = () => {

    let now = new Date();

    // Last day of the current month
    let lastDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    // Last day of the upcoming month
    let lastDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    
    // Last day of the previous month
    let lastDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    
    // First day of the current month
    let firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // First day of the next month
    let firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    
    // First day of the previous month
    let firstDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    
    console.log("First day of previous month: ", firstDayOfPreviousMonth.toLocaleString());
    console.log("First day of next month: ", firstDayOfNextMonth.toLocaleString());
    console.log("First day of current month: ", firstDayOfCurrentMonth.toLocaleString());    
    console.log("Last day of previous month: ", lastDayOfPreviousMonth.toLocaleString());
    console.log("Last day of next month: ", lastDayOfNextMonth.toLocaleString());
    console.log("Last day of current month: ", lastDayOfCurrentMonth.toLocaleString());
    

//   return (
//     <div style={{color: "white"}}>
//         test
//     </div>
//   )
}

export default test