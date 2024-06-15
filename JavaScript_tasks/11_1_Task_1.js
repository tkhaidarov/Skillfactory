const arry = [1, 2, 3, 5];
function EvenOddNul(arr) {
  let oddNumbers = 0;
  let evenNumbers = 0;
  let nullElement = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0 || typeof arr[i] != "number") {
      nullElement++;
    } else {
      if (arr[i] % 2 == 0) {
        evenNumbers++;
      } else {
        oddNumbers++;
      }
    }
  }
  return [evenNumbers, oddNumbers, nullElement];
}
let res = EvenOddNul(arry);
console.log("Count of even numbers: " + res[0]);
console.log("Count of odd numbers: " + res[1]);
console.log("Count of null elements: " + res[2]);
