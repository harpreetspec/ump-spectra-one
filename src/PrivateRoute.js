import React from 'react';
import { Routes,Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
function PrivateRoute({ element: Element, credentialKey, ...rest }) {
    console.log("isAuthenticated", credentialKey);
    console.log("element", Element);
    console.log("rest", rest);
  
    return credentialKey ? (
      <Routes>
        <Route {...rest} element={<Element />} />
      </Routes>
    ) : (
      <Navigate to="/" replace={true} />
    );
  }


export default PrivateRoute;
