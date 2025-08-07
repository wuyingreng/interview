const obj = {
  foo: {
    bar: {
      baz: 'Hello, World!'
    }
  }
};

// function set(obj, path, newValue) {
//   let result = obj;
//   const pathArray = path.split('.')
//   pathArray.slice(0, pathArray.length - 1).forEach((curPath) => {
//     if (!result[curPath]) {
//       result[curPath] = {};
//     }
//     result = result[curPath]
//   });
//   result[pathArray.slice(pathArray.length - 1)] = newValue
//   return result
// }


function set(object, path, value) {
  const keys = path.split('.');
  let current = object;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      // Create nested objects if the key doesn't exist
      current[key] = {};
    }
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
}

set(obj, 'foo.bar.baz', 'New Value');
console.log(obj)

function get(obj, path, defaultValue) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      return defaultValue;
    }
    current = current[key]
  }
  return current[keys[keys.length - 1]]
}


console.log(get(obj, 'foo.bar.baz', 33));