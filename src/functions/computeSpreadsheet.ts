import {
  SpreadsheetObject,
  ComputedResult,
  SpreadsheetData,
  CellValue,
} from "../types/index.d";

import { getLetterIndex } from "./getLetterIndex";
import { checkCellA1Format } from "./checkCellA1Format";

import { calculateSum } from "./calculateSum";
import { calculateMultiply } from "./calculateMultiply";
import { calculateDivide } from "./calculateDivide";
import { calculateGT } from "./calculateGT";
import { calculateEQ } from "./calculateEQ";
import { calculateNOT } from "./calculateNOT";
import { calculateAND } from "./calculateAND";
import { calculateOR } from "./calculateOR";
import { calculateIF } from "./calculateIF";
import { calculateConcat } from "./calculateConcat";
import { resolveSpreadsheet } from "./resolveSpreadsheet";

export function computeSpreadsheet(
  spreadsheets: SpreadsheetData
): ComputedResult {
  const result: ComputedResult = [];

  spreadsheets.forEach(function (spreadsheet) {
    const computedSpreadsheet: SpreadsheetObject = {
      id: spreadsheet.id,
      data: [],
    };
    spreadsheet.data.forEach(function (row, index) {
      var computedRow: CellValue[] = [];

      row.forEach(function (cell) {
        if (typeof cell === "string" && cell.startsWith("=")) {
          try {
            const formula = cell.slice(1); // Remove the "=" sign from formulas
            if (checkCellA1Format(formula)) {
              resolveSpreadsheet(spreadsheet);
              var cellData: number | string | boolean =
                spreadsheet.data[index][getLetterIndex(formula.charAt(0))];
              computedRow.push(cellData);
            } else {
              const formulaFunction = formula.substring(
                0,
                formula.indexOf("(")
              );
              var formulaElements = formula
                .split(/[(,)]/)
                .map((item) => item.trim()); // remove empty spaces and separate elements
              formulaElements.shift(); // remove function name
              formulaElements.pop(); // remove empty space
              if (formulaFunction === "SUM") {
                const computedCell: CellValue = calculateSum(
                  formulaElements,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "MULTIPLY") {
                const computedCell: CellValue = calculateMultiply(
                  formulaElements,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "DIVIDE") {
                const computedCell: CellValue = calculateDivide(
                  formulaElements,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "GT") {
                const computedCell: CellValue = calculateGT(
                  formulaElements,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "EQ") {
                const computedCell: CellValue = calculateEQ(
                  formulaElements,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "NOT") {
                const computedCell: CellValue = calculateNOT(
                  formulaElements,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "AND") {
                const computedCell: CellValue = calculateAND(
                  formulaElements,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "OR") {
                const computedCell: CellValue = calculateOR(
                  formulaElements,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "IF") {
                const computedCell: CellValue = calculateIF(
                  formula,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "CONCAT") {
                const computedCell: CellValue = calculateConcat(
                  formula,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else {
                computedRow.push("#ERROR: Not resolved yet.");
              }
            }
          } catch (error) {
            computedRow.push("#ERROR " + error);
          }
        } else {
          computedRow.push(cell);
        }
      });

      computedSpreadsheet.data.push(computedRow);
    });
    result.push(computedSpreadsheet);
  });

  return result;
}
