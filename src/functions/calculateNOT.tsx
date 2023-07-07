import { SpreadsheetObject } from "../types/index.d";

import { getLetterIndex } from "./getLetterIndex";

export function calculateNOT(
  formula: string,
  spreadsheet: SpreadsheetObject
): boolean | string {
  var notElements = formula.split(/[(,)]/).map((item) => item.trim()); // remove empty spaces
  notElements.shift(); // remove function name
  notElements.pop(); // remove empty space
  if (notElements.length !== 1)
    return "#ERROR: One value excepted. Got " + notElements.length;
  var value: boolean = false;
  if (parseInt(notElements[0])) value = Boolean(notElements[0]);
  else
    value = spreadsheet.data[parseInt(notElements[0].charAt(1)) - 1][
      getLetterIndex(notElements[0].charAt(0))
    ] as boolean;
  return !value;
}
