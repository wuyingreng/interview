const AnimalApi = require('./lib/index').default;
console.log('AnimalApi=>', AnimalApi, AnimalApi.getCat())
AnimalApi.getCat().then((animal) => console.log('animal==>', animal)).catch((error) => console.log('error==>', error))