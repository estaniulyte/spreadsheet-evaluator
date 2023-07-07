import { SpreadsheetObject } from "../types/index.d";

import { getLetterIndex } from "./getLetterIndex";

export function calculateDivide(
  formula: string,
  spreadsheet: SpreadsheetObject
): number | string {
  var divideElements = formula.split(/[(,)]/).map((item) => item.trim()); // remove empty spaces
  console.log(divideElements)
  divideElements.shift(); // remove function name
  divideElements.pop(); // remove empty space
  if (divideElements.length !== 2)
    return "#ERROR: Two values excepted. Got " + divideElements.length;
  var dividend: number = 0;
  let divisor: number = 1;
  if (parseInt(divideElements[0])) dividend = parseInt(divideElements[0])
    else dividend = spreadsheet.data[parseInt(divideElements[0].charAt(1)) - 1][getLetterIndex(divideElements[0].charAt(0))] as number;
  if (parseInt(divideElements[1])) divisor = parseInt(divideElements[1])
    else divisor = spreadsheet.data[parseInt(divideElements[1].charAt(1)) - 1][getLetterIndex(divideElements[1].charAt(0))] as number;
  
  return parseFloat((dividend / divisor).toFixed(7));;
}
