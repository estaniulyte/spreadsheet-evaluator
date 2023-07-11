import './App.css';
import React, { useEffect, useState } from "react";

import { SpreadsheetData } from "./types/index.d";

import { computeSpreadsheet } from "./functions/computeSpreadsheet";

import { apiInstance } from "./api/api";

function App() {
  const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetData>([]);
  const [computedResult, setComputedResult] = useState<SpreadsheetData>([]);

  useEffect(() => {
    const fetchSpreadsheetData = async () => {
      try {
        const response = await apiInstance.get("/sheets");
        const fetchedData = response.data;
        setSpreadsheetData(fetchedData.sheets);
      } catch (error) {
        console.error("Error fetching spreadsheet data:", error);
      }
    };

    fetchSpreadsheetData();
  }, []);

  useEffect(() => {
    var computedData = computeSpreadsheet(spreadsheetData);
    setComputedResult(computedData);
  }, [spreadsheetData]);

  const submitResults = async () => {
    const data = {
      email: "e.staniulyte98@gmail.com",
      results: computedResult,
    };

    await apiInstance
      .post("/verify/eyJ0YWdzIjpbXX0", data)
      .then((response) => {
        console.log("Request successful:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
