/**
 * Object.is()的polyfill实现
 * 对于0和-0的三种情况，转化为比较Infinity和-Infinity
 * NaN的特点是自己不等于自己
 */
(function (Object) {
  if (!Object.is) {
    Object.is = function (left, right) {
      // 检查-0
      if (left === 0 && right === 0) {
        return 1/left === 1/right;
      }
      // 检查NaN
      if (left !== left) {
        return right !== right;
      }
      // others
      return left === right;
    }
  }
})(Object);