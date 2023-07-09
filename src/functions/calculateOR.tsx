import { SpreadsheetObject } from "../types/index.d";

import { getItemFromSpreadsheet } from "./getItemFromSpreadsheet";
import { checkCellA1Format } from "./checkCellA1Format";

export function calculateOR(
  orElements: Array<string>,
  spreadsheet: SpreadsheetObject
): boolean | string {
  let isTrue: boolean | string = false;
  orElements.forEach(function (item) {
    if (checkCellA1Format(item)) {
      var val = getItemFromSpreadsheet(spreadsheet, item);
      if (typeof val !== "boolean")
        isTrue = "#ERROR: one of provided values is not boolean";
      else if (val === true) isTrue = true;
    } else if (Boolean(item)) {
      if (Boolean(item) === true) isTrue = true;
    }
  });
  return isTrue;
}
