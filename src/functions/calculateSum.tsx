import { SpreadsheetObject } from "../types/index.d";

import { checkCellA1Format } from "./checkCellA1Format";
import { getItemFromSpreadsheet } from "./getItemFromSpreadsheet";

export function calculateSum(
  sumElements: Array<string>,
  spreadsheet: SpreadsheetObject
): number {
  let sum: number = 0;
  sumElements.forEach(function (item) {
    if (parseInt(item)) sum += parseInt(item);
    else if (checkCellA1Format(item)) {
      var number = getItemFromSpreadsheet(spreadsheet, item);
      sum += number as number;
    }
  });
  return sum;
}
