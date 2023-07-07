import { SpreadsheetObject } from "../types/index.d";

import { getLetterIndex } from "./getLetterIndex";
import { checkCellA1Format } from "./checkCellA1Format";

export function calculateMultiply(
  formula: string,
  spreadsheet: SpreadsheetObject
): number {
  var multiplyElements = formula.split(/[(,)]/).map((item) => item.trim()); // remove empty spaces
  multiplyElements.shift(); // remove function name
  multiplyElements.pop(); // remove empty space
  let result: number = 1;
  multiplyElements.forEach(function (item) {
    if (parseInt(item)) result *= parseInt(item);
    else if (checkCellA1Format(item)) {
      var number =
        spreadsheet.data[parseInt(item.charAt(1)) - 1][
          getLetterIndex(item.charAt(0))
        ];
      result *= number as number;
    }
  });
  return result;
}
