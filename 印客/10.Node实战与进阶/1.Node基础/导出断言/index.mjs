
/**
 * 这么写会报错的。要加断言
 * import animal from './animal.json';
 * */
import animal from './animal.json' assert {type:'json'};
console.log('animal', animal);

