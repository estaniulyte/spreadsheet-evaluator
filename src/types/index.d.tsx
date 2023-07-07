export type CellValue = string | number | boolean;
export type SpreadsheetData = SpreadsheetObject[];
export type SpreadsheetObject = {id: String, data: CellValue[][]};

export type ComputedResult = SpreadsheetObject[];

