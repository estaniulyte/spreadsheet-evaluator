import { SpreadsheetObject } from "../types/index.d";

import { getItemFromSpreadsheet } from "./getItemFromSpreadsheet";
import { checkCellA1Format } from "./checkCellA1Format";

export function calculateConcat(
  items: string,
  spreadsheet: SpreadsheetObject
): boolean | string {
  items = items.substring(6); // remove CONCAT
  const withoutParentheses = items.slice(1, -1); // remove brackets

  const array = withoutParentheses.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);

  const processedArray = array.map((item) => {
    const trimmedItem = item.trim();

    if (trimmedItem.startsWith('"') && trimmedItem.endsWith('"')) {
      return trimmedItem.slice(1, -1);
    } else if (checkCellA1Format(trimmedItem)) {
      return getItemFromSpreadsheet(spreadsheet, trimmedItem);
    }
    return trimmedItem;
  });

  return processedArray.join("");
}
