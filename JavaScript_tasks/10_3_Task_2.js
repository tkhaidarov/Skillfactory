let inpValue = 12;
switch (typeof inpValue) {
  case "number":
    console.log(inpValue + " - числовой тип данных");
    break;
  case "string":
    console.log(inpValue + " - строковый тип данных");
    break;
  case "boolean":
    console.log(inpValue + " - логический тип данных");
    break;
  default:
    console.log("Тип данных не определен");
}
