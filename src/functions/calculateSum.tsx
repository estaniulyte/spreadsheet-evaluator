import { SpreadsheetObject } from "../types/index.d";

import { getLetterIndex } from "./getLetterIndex";
import { checkCellA1Format } from "./checkCellA1Format";

export function calculateSum(
  formula: string,
  spreadsheet: SpreadsheetObject
): number {
  var sumElements = formula.split(/[(,)]/).map((item) => item.trim()); // remove spaces
  sumElements.shift(); // remove SUM
  sumElements.pop(); // remove empty space
  let sum: number = 0;
  sumElements.forEach(function (item) {
    if (parseInt(item)) sum += parseInt(item);
    else if (checkCellA1Format(item)) {
      var number =
        spreadsheet.data[parseInt(item.charAt(1)) - 1][
          getLetterIndex(item.charAt(0))
        ];
      sum += number as number;
    }
  });
  return sum;
}
