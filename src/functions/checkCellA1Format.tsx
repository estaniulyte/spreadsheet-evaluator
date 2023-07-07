export function checkCellA1Format(str: string): boolean {
  const regex = /^[A-Z](?:[0-9]|[1-9][0-9]?)$/;
  return regex.test(str);
}
