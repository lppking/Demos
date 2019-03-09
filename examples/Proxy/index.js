/**
 * 基于Proxy实现函数的链式调用
 */
const pipe = (function () {
  return function (value) {
    const funStack = [];
    const proxy = new Proxy({}, {
      get: function (target, prop) {
        if (prop === 'get') {
          return funStack.reduce(function (val, fn) {
            return fn(val);
          }, value);
        } else {
          funStack.push(window[prop]);
          return proxy;
        }
      }
    });

    return proxy;
  }
}());

var double = n => n * 2;
var pow = n => n* n;
var reverseInt = n => {
  return n.toString().split('').reverse().join('') || 0
};

pipe(3).double.pow.reverseInt.get;