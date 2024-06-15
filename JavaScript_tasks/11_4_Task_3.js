function sumAB(argA) {
  return function (argB) {
    return argA + argB;
  };
}
console.log(sumAB(25)(32));
