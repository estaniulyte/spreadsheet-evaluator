import { SpreadsheetObject, CellValue } from "../types/index.d";
import { getLetterIndex } from "./getLetterIndex";

export function getItemFromSpreadsheet(
  spreadsheet: SpreadsheetObject,
  item: string
): CellValue {
  return spreadsheet.data[parseInt(item.charAt(1)) - 1][
    getLetterIndex(item.charAt(0))
  ];
}
