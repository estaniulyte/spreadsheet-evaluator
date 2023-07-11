import { SpreadsheetObject } from "../types/index.d";

import { checkCellA1Format } from "./checkCellA1Format";
import { getItemFromSpreadsheet } from "./getItemFromSpreadsheet";

export function calculateMultiply(
  multiplyElements: Array<string>,
  spreadsheet: SpreadsheetObject
): number {
  let result: number = 1;
  multiplyElements.forEach(function (item) {
    if (parseInt(item)) result *= parseInt(item);
    else if (checkCellA1Format(item)) {
      var number = getItemFromSpreadsheet(spreadsheet, item);
      result *= number as number;
    }
  });
  return result;
}
