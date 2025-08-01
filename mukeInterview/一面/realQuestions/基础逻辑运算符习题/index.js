let user = {
  name: "Alice",
  address: {
    city: "Beijing"
  }
};

console.log(user.address && user.address.city);     // ? Beijing
console.log(user.phone && user.phone.number);       // ? undefined
let result = user.address && user.address.city && user.address.city.length;
console.log(result);            // ? 7