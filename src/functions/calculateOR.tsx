import { SpreadsheetObject } from "../types/index.d";

import { getLetterIndex } from "./getLetterIndex";
import { checkCellA1Format } from "./checkCellA1Format";

export function calculateOR(
  formula: string,
  spreadsheet: SpreadsheetObject
): boolean | string {
  var orElements = formula.split(/[(,)]/).map((item) => item.trim()); // remove empty spaces
  orElements.shift(); // remove function name
  orElements.pop(); // remove empty space

  let isTrue: boolean | string = false;
  orElements.forEach(function (item) {
    if (checkCellA1Format(item)) {
      var val =
        spreadsheet.data[parseInt(item.charAt(1)) - 1][
          getLetterIndex(item.charAt(0))
        ];
      if (typeof val !== "boolean")
        isTrue = "#ERROR: one of provided values is not boolean";
      else if (val === true) isTrue = true;
    } else if (Boolean(item)) {
      if (Boolean(item) === true) isTrue = true;
    }
  });
  return isTrue;
}
