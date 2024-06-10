let numb = +prompt("Введите число");
if (typeof numb !== "number" || isNaN(numb)) {
  alert("Упс, вы ошиблись, введите число");
} else if (numb % 2 == 0) {
  console.log(numb + " - четное число");
} else {
  console.log(numb + " - нечетное число");
}
