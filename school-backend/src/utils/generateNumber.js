// export function generateNumber(prefix = 'SCH') {
//   const stamp = Date.now().toString().slice(-8);
//   const random = Math.floor(100 + Math.random() * 900);
//   return `${prefix}-${stamp}-${random}`;
// }
export function generateNumber(prefix = "SCH", year, sequence) {
  // Sequential format
  if (year !== undefined && sequence !== undefined) {
    return `${prefix}-${year}-${String(sequence).padStart(4, "0")}`;
  }

  // Preserve existing behavior for other modules
  const stamp = Date.now().toString().slice(-8);
  const random = Math.floor(100 + Math.random() * 900);

  return `${prefix}-${stamp}-${random}`;
}