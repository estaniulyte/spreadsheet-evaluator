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
            // console.log(formula);
            // check if cell is A1 notation
            if (checkCellA1Format(formula)) {
              // console.log(
              //   formula +
              //     ", fomula index:" +
              //     formula.charAt(1) +
              //     ", index: " +
              //     index +
              //     ", value: " +
              //     row[getLetterIndex(formula.charAt(0))] +
              //     ", value from matrix: " +
              //     spreadsheet.data[index][getLetterIndex(formula.charAt(0))]
              // );
              computedRow.push(
                spreadsheet.data[index][getLetterIndex(formula.charAt(0))]
              );
            } else {
              const formulaFunction = formula.substring(
                0,
                formula.indexOf("(")
              );
              if (formulaFunction === "SUM") {
                const computedCell: CellValue = calculateSum(
                  formula,
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
