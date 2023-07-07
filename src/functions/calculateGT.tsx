import { SpreadsheetObject } from "../types/index.d";

import { getLetterIndex } from "./getLetterIndex";

export function calculateGT(
  formula: string,
  spreadsheet: SpreadsheetObject
): boolean | string {
  var gtElements = formula.split(/[(,)]/).map((item) => item.trim()); // remove empty spaces
  gtElements.shift(); // remove function name
  gtElements.pop(); // remove empty space
  if (gtElements.length !== 2)
    return "#ERROR: Two values excepted. Got " + gtElements.length;
  var firstValue: number = 0;
  let secondValue: number = 1;
  if (parseInt(gtElements[0])) firstValue = parseInt(gtElements[0]);
  else
    firstValue = spreadsheet.data[parseInt(gtElements[0].charAt(1)) - 1][
      getLetterIndex(gtElements[0].charAt(0))
    ] as number;
  if (parseInt(gtElements[1])) secondValue = parseInt(gtElements[1]);
  else
    secondValue = spreadsheet.data[parseInt(gtElements[1].charAt(1)) - 1][
      getLetterIndex(gtElements[1].charAt(0))
    ] as number;

  if (firstValue > secondValue) return true;
  else return false;
}
