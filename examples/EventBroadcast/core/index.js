// import { verifyMaxListeners } from "../utils"

class EventBroadcast {
  constructor () {
    this._events = this._events || new Map();
    this._maxListeners = this._maxListeners || 2;
  }

  /**
   * 触发名为type的事件
   */
  emit (type, ...args) {

    // 取得要触发的事件队列
    let _typeEvents = this._events.has(type) ? this._events.get(type) : [];

    // 如果名为type的事件存在，调用该方法
    if (_typeEvents.length > 0) {
      _typeEvents.forEach(handler => {
        args.length > 0 ? handler.apply(this, args) : handler.call(this);
      });
      return true;
    }

    // 不存在名为type的事件队列返回false
    return false;
  }

  /**
   * 添加新事件到事件队列
   */
  on (type, fn) {
    if (!this._events.has(type)) {
      this._events.set(type, [])
    }

    const _type = this._events.get(type);
    if (this._verifyMaxListeners(_type, type) && typeof fn === 'function') {
      _type.push(fn);
      this._events.set(type, _type);
      return true;
    }
    return false;
  }

  /**
   * 移除指定事件队列
   */
  remove (type, name = '') {
    if (this._events.has(type)) {
      if (name === '') {
        this._events.delete(type);
        return true;
      } else {
        const _typeEvents = this._events.get(type);
        for (let i = 0, len = _typeEvents.length; i< len; i++) {
          if (_typeEvents[i].name === name) {
            _typeEvents.splice(i, 1);
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * 清空事件队列
   */
  clear () {
    return this._events.clear();
  }

  /**
   * 获取事件队列
   */
  showEvents () {
    console.dir(this._events);
  }

  /**
   * 验证当前type事件队列是否超过最大限制
   */
  _verifyMaxListeners (_typesArr, name) {
    if (_typesArr.length >= this._maxListeners) {
      throw new Error(`${name}'s listeners has exceeded the MaxListeners size`);
    }
    return true;
  }
}
