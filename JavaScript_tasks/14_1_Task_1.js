const xmlString = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;
const xmlDOM = new DOMParser().parseFromString(xmlString, "text/xml");
const students = [];
xmlDOM.querySelectorAll("student").forEach((student) => {
  const name = student.querySelector("name");
  const studentObj = {
    name: `${name.querySelector("first").textContent} ${name.querySelector("second").textContent}`,
    age: parseInt(student.querySelector("age").textContent),
    prof: student.querySelector("prof").textContent,
    lang: name.getAttribute("lang"),
  };
  students.push(studentObj);
});
console.log(students);
