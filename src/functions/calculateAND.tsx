import { SpreadsheetObject } from "../types/index.d";

import { getLetterIndex } from "./getLetterIndex";
import { checkCellA1Format } from "./checkCellA1Format";

export function calculateAND(
  andElements: Array<string>,
  spreadsheet: SpreadsheetObject
): boolean | string {
  let isTrue: boolean | string = true;
  andElements.forEach(function (item) {
    if (checkCellA1Format(item)) {
      var val =
        spreadsheet.data[parseInt(item.charAt(1)) - 1][
          getLetterIndex(item.charAt(0))
        ];
      if (typeof val !== "boolean")
        isTrue = "#ERROR: one of provided values is not boolean";
      else if (val === false) isTrue = false;
    } else if (Boolean(item)) {
      if (Boolean(item) === false) isTrue = false;
    }
  });
  return isTrue;
}
