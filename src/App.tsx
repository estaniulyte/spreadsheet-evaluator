import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

import { SpreadsheetData } from "./types/index.d";

function App() {
  const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetData>([]);

  useEffect(() => {
    const fetchSpreadsheetData = async () => {
      try {
        const response = await axios.get(
          "https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator/sheets"
        );
        const fetchedData = response.data;
        console.log(fetchedData.sheets);
        setSpreadsheetData(fetchedData.sheets);
      } catch (error) {
        console.error("Error fetching spreadsheet data:", error);
      }
    };

    fetchSpreadsheetData();
  }, []);

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
