function intCount(a, b) {
  let i = setInterval(() => {
    console.log(a++);
    if (a > b) clearInterval(i);
  }, 1000);
}
intCount(5, 15);
