export function validateNumber(number) {
  const num = Number(number);

  if (Number.isNaN(num)) throw Error("Cannot parse number");

  return num;
}
