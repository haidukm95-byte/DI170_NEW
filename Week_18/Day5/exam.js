const obj = {
  a: {
    c: 3,
  },
  b: 2,
};

const obj2 = { ...obj, a: { ...obj.a, c: 3 } };

obj.a.c = 33;

obj.b = 22;

console.log(obj);
console.log(obj2);

// immer library
