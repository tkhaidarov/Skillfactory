function reverseText(txt) {
  const reverse = txt.split("").reverse().join("");
  return reverse;
}
const txt = "hello";
console.log(reverseText(txt));
