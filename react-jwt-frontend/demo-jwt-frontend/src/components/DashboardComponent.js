import React, { useState } from "react";
import axios from "axios";

const DashboardComponent = ({ token }) => {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleGetData = async () => {
    if (token === "no token present") {
      alert("No token available. Please log in.");
      return;
    }

    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log(data,"data")
      setResult(
        <div>
          <h5>{data.msg}</h5>
          <p>{data.secret}</p>
        </div>
      );
      setError("");
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.response?.data?.msg || "Failed to fetch data");
      setResult("");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
      <h4 className="text-lg font-bold mb-4">Dashboard</h4>
      {token === "no token present" ? (
        <p className="text-red-500 mb-4">No token available. Please log in.</p>
      ) : (
        <p className="text-green-500 mb-4">Token is present.</p>
      )}
      {/* Display the result or error */}
      {result && <div className="mb-4">{result}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        className="bg-green-500 text-white rounded-md w-full py-2 hover:bg-green-600"
        onClick={handleGetData}
      >
        Get Data
      </button>
    </div>
  );
};

export default DashboardComponent;
