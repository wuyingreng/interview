const objA = { name: "A" };
const objB = { name: "B" };
objA.child = objB;  // objA 引用 objB
objB.parent = objA;  // objB 又引用 objA → 形成循环引用


const deepClone=(obj,hash=new WeakMap())=>{
    if(typeof obj!=='object' || obj===null)return obj;
    if(hash.has(obj))return hash.get(obj);

    if(obj instance of RegExp) return new RegExp(obj);
    if(obj instance of Date) return new Date(obj);

    if(obj instance of Map){


      // ? map结构是会循环引用的是吗？
      const clone=new Map();
       hash.set(obj,clone);
      map.forEach((value,key)=>{
        clone.set(deepClone(key,hash),deepClone(value,hash))
      })
     
    };

  if(obj instance of set){
      // ? map结构是会循环引用的是吗？

      const clone=new Set();
          hash.set(obj,clone);
      set.forEach((value)=>{
        clone.add(deepClone(value,hash))
      })
      
    };

    // 这里说明数组也可以调用for in . 数组，字符串，对象都可以调用for in
    const clone=Array.isArray(obj)?[]:{};
    hash.set(obj,clone);
    for(let key in obj){
      if(obj.hasOwnProperty(key)){
        clone[key]=deepClone(obj[key],hash)
      }
    }

}