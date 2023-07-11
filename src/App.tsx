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
    <div className="">
      <nav className="bg-gray-800 mb-6">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://www.wix.com/"
            className="flex items-center"
            target="blank"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              WIX Task
            </span>
          </a>
          <div className="w-ful md:w-auto text-white">
            by{" "}
            <a
              href="https://estaniulyte.com/"
              className="hover:text-blue-300 cursor:pointer"
              target="blank"
            >
              Evelina Staniulytė
            </a>
          </div>
        </div>
      </nav>
      <div className="max-w-screen-xl flex flex-col justify-center justify-items-center text-center mx-auto">
        <h1 className="mb-4 self-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl">
          Spreadsheet Evaluator
        </h1>
        <button
          onClick={submitResults}
          className="mx-auto my-11 w-40 px-5 py-3 text-base font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 "
        >
          Submit Results
        </button>
        <div className="mt-4">
          {alerts.map((item, index) => {
            return <Alert key={index} type={item.type} text={item.text} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
