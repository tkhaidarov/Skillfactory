const arr = [null];
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
console.log("Count of even numbers: " + evenNumbers);
console.log("Count of odd numbers: " + oddNumbers);
console.log("Count of null elements: " + nullElement);
