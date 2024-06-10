let fclubs = new Map();
fclubs.set("Real Madrid", "Spain");
fclubs.set("Chelsea", "England");
fclubs.set("Bayern Munich", "Germany");
for (let club of fclubs.keys()) {
  console.log(club + ", " + fclubs.get(club));
}
