/**
 * 用promise实现一个ajax
 * 原地址：阮一峰ES6
 */
const getJson = function (url, method) {
  const promise = new Promise(function (resolve, reject) {
    const client = new XMLHttpRequest();
    client.open(method, url);
    client.onreadystatechange = function () {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    client.setRequestHeader('Accept', "application/json");
    client.send();
  });
  return promise;
}