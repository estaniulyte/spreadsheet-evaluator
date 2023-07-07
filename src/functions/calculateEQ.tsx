import { SpreadsheetObject } from "../types/index.d";

import { getLetterIndex } from "./getLetterIndex";

export function calculateEQ(
  formula: string,
  spreadsheet: SpreadsheetObject
): boolean | string {
  var eqElements = formula.split(/[(,)]/).map((item) => item.trim()); // remove empty spaces
  eqElements.shift(); // remove function name
  eqElements.pop(); // remove empty space
  if (eqElements.length !== 2)
    return "#ERROR: Two values excepted. Got " + eqElements.length;
  var firstValue: number = 0;
  let secondValue: number = 1;
  if (parseInt(eqElements[0])) firstValue = parseInt(eqElements[0]);
  else
    firstValue = spreadsheet.data[parseInt(eqElements[0].charAt(1)) - 1][
      getLetterIndex(eqElements[0].charAt(0))
    ] as number;
  if (parseInt(eqElements[1])) secondValue = parseInt(eqElements[1]);
  else
    secondValue = spreadsheet.data[parseInt(eqElements[1].charAt(1)) - 1][
      getLetterIndex(eqElements[1].charAt(0))
    ] as number;

  if (firstValue === secondValue) return true;
  else return false;
}
