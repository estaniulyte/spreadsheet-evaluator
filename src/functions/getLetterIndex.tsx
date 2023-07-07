export function getLetterIndex(letter: string): number {
  const uppercaseLetter = letter.toUpperCase();
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const index = alphabet.indexOf(uppercaseLetter);
  return index !== -1 ? index : 1;
}