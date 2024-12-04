import React, { useState, useEffect } from 'react';
// import getmac from 'getmac';
import {
    getMacAddress,
    getDeviceMacAddress
} from '../function';

const GetMacAdd = () => {
    const [macAddress, setMacAddress] = useState('');
    const [deviceMacAddress, setDeviceMacAddress] = useState('');

    useEffect(async () => {
        const macAddress = await getMacAddress();
        const deviceMacAddress = await getDeviceMacAddress();
        // console.log(macAddress);
        setMacAddress(macAddress.data.macAddress)
        setDeviceMacAddress(deviceMacAddress.data.deviceMac)
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div style={{ color: 'white' }}>
            <div>
                {macAddress ? `Server MAC Address: ${macAddress}` : 'Fetching MAC Address...'}
            </div>
            <div>
                {macAddress ? `Device MAC Address: ${deviceMacAddress}` : 'Fetching MAC Address...'}
            </div>
        </div>
    );
}

export default GetMacAdd;
