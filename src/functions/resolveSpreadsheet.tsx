import { SpreadsheetObject } from "../types/index.d";

import { checkCellA1Format } from "./checkCellA1Format";
import { getItemFromSpreadsheet } from "./getItemFromSpreadsheet";

export function resolveSpreadsheet(
  spreadsheet: SpreadsheetObject
): SpreadsheetObject {
  let hasChanges = true;
  while (hasChanges) {
    hasChanges = false;

    for (let i = 0; i < spreadsheet.data.length; i++) {
      const row = spreadsheet.data[i];
      for (let j = 0; j < row.length; j++) {
        const item = row[j];
        if (typeof item === "string" && item.startsWith("=")) {
          const variable = item.slice(1); // Remove the "=" sign
          const value = getItemFromSpreadsheet(spreadsheet, variable);
          if (!checkCellA1Format(value.toString())) {
            hasChanges = true;
            spreadsheet.data[i][j] = value;
          } else spreadsheet.data[i][j] = item;
        } else spreadsheet.data[i][j] = item;
      }
    }
  }
  return spreadsheet;
}
