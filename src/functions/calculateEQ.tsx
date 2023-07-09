import { SpreadsheetObject } from "../types/index.d";

import { getItemFromSpreadsheet } from "./getItemFromSpreadsheet";

export function calculateEQ(
  eqElements: Array<string>,
  spreadsheet: SpreadsheetObject
): boolean | string {
  if (eqElements.length !== 2)
    return "#ERROR: Two values excepted. Got " + eqElements.length;
  var firstValue: number = 0;
  let secondValue: number = 1;
  if (parseInt(eqElements[0])) firstValue = parseInt(eqElements[0]);
  else
    firstValue = getItemFromSpreadsheet(spreadsheet, eqElements[0]) as number;
  if (parseInt(eqElements[1])) secondValue = parseInt(eqElements[1]);
  else
    secondValue = getItemFromSpreadsheet(spreadsheet, eqElements[1]) as number;

  if (firstValue === secondValue) return true;
  else return false;
}
