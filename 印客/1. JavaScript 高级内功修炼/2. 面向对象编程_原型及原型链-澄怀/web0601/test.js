const getName = function () {
  console.log(this.name);
};
function Person2(name) {
  this.name = name;
  this.getName = getName;
}

var person21 = new Person2('kevin');
var person22 = new Person2('Emily');

console.log(person21.getName === person22.getName); // true