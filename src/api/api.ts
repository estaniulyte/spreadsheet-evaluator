import axios from "axios";

 export const apiInstance = axios.create({
  baseURL: "https://www.wix.com/_serverless/hiring-task-spreadsheet-evaluator",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
