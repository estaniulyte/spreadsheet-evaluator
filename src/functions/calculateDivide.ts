import { SpreadsheetObject } from "../types/index.d";

import { getItemFromSpreadsheet } from "./getItemFromSpreadsheet";

export function calculateDivide(
  divideElements: Array<string>,
  spreadsheet: SpreadsheetObject
): number | string {
  if (divideElements.length !== 2)
    return "#ERROR: Two values excepted. Got " + divideElements.length;
  var dividend: number = 0;
  let divisor: number = 1;
  if (parseInt(divideElements[0])) dividend = parseInt(divideElements[0]);
  else
    dividend = getItemFromSpreadsheet(spreadsheet, divideElements[0]) as number;
  if (parseInt(divideElements[1])) divisor = parseInt(divideElements[1]);
  else
    divisor = getItemFromSpreadsheet(spreadsheet, divideElements[1]) as number;

  return parseFloat((dividend / divisor).toFixed(7));
}
