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
      const computedRow: CellValue[] = [];

      row.forEach(function (cell) {
        if (typeof cell === "string" && cell.startsWith("=")) {
          try {
            const formula = cell.slice(1); // Remove the "=" sign from formulas
            // check if cell is A1 notation
            if (checkCellA1Format(formula)) {
              computedRow.push(
                spreadsheet.data[index][getLetterIndex(formula.charAt(0))]
              );
            } else {
              const formulaFunction = formula.substring(
                0,
                formula.indexOf("(")
              );
              var formulaElements = formula.split(/[(,)]/).map((item) => item.trim()); // remove empty spaces and separate elements
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
                  formula,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "DIVIDE") {
                const computedCell: CellValue = calculateDivide(
                  formula,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "GT") {
                const computedCell: CellValue = calculateGT(
                  formula,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "EQ") {
                const computedCell: CellValue = calculateEQ(
                  formula,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "NOT") {
                const computedCell: CellValue = calculateNOT(
                  formula,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "AND") {
                const computedCell: CellValue = calculateAND(
                  formula,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else if (formulaFunction === "OR") {
                const computedCell: CellValue = calculateOR(
                  formula,
                  spreadsheet
                );
                computedRow.push(computedCell);
              } else {
                computedRow.push("!!NOT RESOLVED Yet!!");
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
