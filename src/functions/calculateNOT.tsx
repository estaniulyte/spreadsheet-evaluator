import { SpreadsheetObject } from "../types/index.d";

import { getItemFromSpreadsheet } from "./getItemFromSpreadsheet";

export function calculateNOT(
  notElements: Array<string>,
  spreadsheet: SpreadsheetObject
): boolean | string {
  if (notElements.length !== 1)
    return "#ERROR: One value excepted. Got " + notElements.length;
  var value: boolean = false;
  if (parseInt(notElements[0])) value = Boolean(notElements[0]);
  else
    value = getItemFromSpreadsheet(spreadsheet, notElements[0]) as boolean;
  return !value;
}
