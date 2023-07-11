import { SpreadsheetObject } from "../types/index.d";

import { checkCellA1Format } from "./checkCellA1Format";
import { getItemFromSpreadsheet } from "./getItemFromSpreadsheet";

import { calculateGT } from "./calculateGT";
import { calculateOR } from "./calculateOR";
import { calculateNOT } from "./calculateNOT";
import { calculateEQ } from "./calculateEQ";
import { calculateAND } from "./calculateAND";

export function calculateIF(
  formula: string,
  spreadsheet: SpreadsheetObject
): boolean | string | number {
  var form = formula.substring(3); // remove begginign of formula - if(
  var ifElements = form.split(/[)]/).map((item) => item.trim()); // remove empty spaces
  ifElements.pop(); // remove empty space

  var func = ifElements[0].split(/[(,)]/).map((item) => item.trim());
  var states = ifElements[1].split(/[(,)]/).map((item) => item.trim());
  states.shift();

  var conditionResult: boolean | string = false;

  if (func[0] === "GT") {
    func.shift();
    conditionResult = calculateGT(func, spreadsheet);
  } else if (func[0] === "NOT") {
    func.shift();
    conditionResult = calculateNOT(func, spreadsheet);
  } else if (func[0] === "EQ") {
    func.shift();
    conditionResult = calculateEQ(func, spreadsheet);
  } else if (func[0] === "AND") {
    func.shift();
    conditionResult = calculateAND(func, spreadsheet);
  } else if (func[0] === "OR") {
    func.shift();
    conditionResult = calculateOR(func, spreadsheet);
  }

  var trueCondition = states[0];
  var falseCondition = states[1];

  if (conditionResult) {
    if (checkCellA1Format(trueCondition)) {
      return getItemFromSpreadsheet(spreadsheet, trueCondition);
    }
    return trueCondition;
  } else if (checkCellA1Format(falseCondition)) {
    return getItemFromSpreadsheet(spreadsheet, falseCondition);
  }
  return falseCondition;
}
