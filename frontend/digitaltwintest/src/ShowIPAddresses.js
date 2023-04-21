import React, { useState, useEffect } from "react";
import axios from "axios";
import firebaseConfig from './firebaseConfig';
import "firebase/auth";

const ShowIPAddresses = () => {

const [ipData, setIpData] = useState({ serverIp: "", userIp: "" });

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("https://api64.ipify.org?format=json");
      setIpData((prevState) => ({ ...prevState, userIp: response.data.ip }));
    } catch (error) {
      console.error("Error fetching user IP:", error);
    }
  };
  fetchData();
}, []);

return (
  <div>
    <h1>IP Addresses</h1>
    <p>Firebase Server IP: Unknown (Firebase Hosting uses a CDN)</p>
    <p>User IP: {ipData.userIp || "Fetching..."}</p>
  </div>
);
};

export default ShowIPAddresses;