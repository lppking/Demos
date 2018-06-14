/**
 * 基于window.history实现前端路由
 * .back: 返回上一页
 * .forward: 前往下一页
 * .go: 以当前页为0，-n返回前n页，n前往后n页
 * .pushState
 * .replaceState
 */
class Routes {
  constructor () {

    // 初始化路由列表
    this._routes = new Map();

    // 获取history对象
    this._history = window.history;

    // 监听popState
    this._bindPopState();
  }

  /**
   * 添加路由及回调方法
   */
  add (path, fn) {
    if (this._routes.has(path)) {
      throw new Error('该路由已经存在！');
    }
    this._routes.set(path, fn);
    return true;
  }

  go (path) {
    if (this._runCallBack(path)) {
      this._history.pushState({
        path
      }, null, path);
    }
  }

  /**
   * bind
   */
  _bind (name, fn) {
    window.addEventListener(name, fn);
  }

  /**
   * 触发path回调
   */
  _runCallBack (path) {
    if (this._routes.has(path)) {
      this._routes.get(path)();
      return true;
    }
    return false;
  }

  /**
   * 监听popState事件
   */
  _bindPopState () {
    this._bind('popstate', (e) => {
      const _path = e.state && e.state.path;

      // 触发回调
      this._runCallBack(_path);
    });
  }
}