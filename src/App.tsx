import React, { useEffect, useState, useCallback } from "react";

import { SpreadsheetData } from "./types/index.d";

import { computeSpreadsheet } from "./functions/computeSpreadsheet";

import { apiInstance } from "./api/api";
import Alert from "./components/Alert";

function App() {
  const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetData>([]);
  const [computedResult, setComputedResult] = useState<SpreadsheetData>([]);
  const [alerts, setAlerts] = useState(Array<{ type: string; text: string }>);

  const addAlert = useCallback((text: string, type: string) => {
    const isDuplicate = alerts.some((alert) => alert.text === text && alert.type === type);
    
    if (!isDuplicate) {
      const newAlert = { text, type };
      
      setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);
    }
  }, [alerts]);

  useEffect(() => {
    const fetchSpreadsheetData = async () => {
      try {
        const response = await apiInstance.get("/sheets");
        const fetchedData = response.data;
        addAlert("Spreadsheet data fetched.", "Success");
        setSpreadsheetData(fetchedData.sheets);
      } catch (error) {
        alerts.push({ text: "Error fetching spreadsheet data: " + error, type: "Error" });
        setAlerts(alerts);
        console.error("Error fetching spreadsheet data:", error);
      }
    };

    fetchSpreadsheetData();
  });

  useEffect(() => {
    var computedData = computeSpreadsheet(spreadsheetData);
    setComputedResult(computedData);
    addAlert("Spreadsheet data computed.", "Success");
  }, [spreadsheetData, addAlert]);

  const submitResults = async () => {
    const data = {
      email: "e.staniulyte98@gmail.com",
      results: computedResult,
    };

    await apiInstance
      .post("/verify/eyJ0YWdzIjpbXX0", data)
      .then((response) => {
        console.log("Request successful:", response.data);
        addAlert("Spreadsheet data submited. Response: " + response.data.message, "Success");
      })
      .catch((error) => {
        addAlert("Spreadsheet data submit failed. Error: " + error, "Error");
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
