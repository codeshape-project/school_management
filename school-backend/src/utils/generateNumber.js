export function generateNumber(prefix = 'SCH') {
  const stamp = Date.now().toString().slice(-8);
  const random = Math.floor(100 + Math.random() * 900);
  return `${prefix}-${stamp}-${random}`;
}
