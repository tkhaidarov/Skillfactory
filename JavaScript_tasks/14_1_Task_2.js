const jsonData = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}`
const data = JSON.parse(jsonData);
const students=[];
const list = data.list;
list.forEach(person => {
    const studentObj = {
        name: person.name,
        age: person.age,
        prof: person.prof,
    };
    students.push(studentObj);
})
console.log(students);