function primeNumber(num) {
  let ntrue = "This is a prime number";
  let nfalse = "This is not a prime number";
  if (num < 2 && num > 1000) {
    return nfalse;
  }
  if (num == 2) {
    return ntrue;
  }
  for (let i = 2; i < num; i++) {
    if (i % 2 == 0) {
      return nfalse;
    }
  }
  return ntrue;
}
console.log(primeNumber(12));
