const arr = ["a", "b", "c", 2];
let check = true;
for (let i = 0; i < arr.length - 1; i++) {
  if (typeof arr[i] !== typeof arr[i + 1]) {
    check = false;
  }
}
if (check) {
  console.log("true");
} else {
  console.log("false");
}
