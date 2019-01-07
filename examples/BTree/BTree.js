/**
 * 树节点
 * @param {*} data 
 * @param {*} left 
 * @param {*} right 
 */
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}

/**
 * 二叉排序树
 */
function BST() {
  this.root = null;
  this.pos = null;
  this.insert = insert;
  this.preOrder = preOrder;
  this.middleOrder = middleOrder;
  this.lastOrder = lastOrder;
}

/**
 * 给二叉排序树插入新节点
 * @param {*} data 
 */
function insert(data) {
  var _new_ = new Node(data, null, null); // 新建一个节点
  if (this.root === null) {
    this.root = _new_;  // 空树直接设置为根节点
  } else {
    this.pos = this.root;
    while(true) {
      if (_new_.data === this.pos.data) break; // 值不允许相等
      if (_new_.data < this.pos.data) {
        if (this.pos.left === null) {
          this.pos.left = _new_;
          break;
        } else {
          this.pos = this.pos.left;
        }
      } else {
        if (this.pos.right === null) {
          this.pos.right = _new_;
          break;
        } else {
          this.pos = this.pos.right;
        }
      }
    }
  }
  this.pos = null;
  return this.root;
}

/**
 * 中序遍历(非递归)
 */
function middleOrder() {
  var orderArr = [];
  if (this.root === null) {
    return orderArr;
  }

  var _stack_ = []; // 用一个数组作为栈
  var flag = true;
  this.pos = this.root; // 位置指向根节点
  while(true) {
    if (this.pos.left !== null && flag) {
      _stack_.push(this.pos);
      this.pos = this.pos.left;
      flag = true;
    } else {
      if (this.pos.right !== null) {
        orderArr.push(this.pos.data);
        this.pos = this.pos.right;
        flag = true;
      } else {
        orderArr.push(this.pos.data);
        if (_stack_.length < 1) {
          break;
        }
        this.pos = _stack_.pop();
        flag = false;
      }
    }
  }
  return orderArr;
}

/**
 * 前序遍历
 */
function preOrder() {
  var orderArr = [];
  if (this.root === null) {
    return orderArr;
  }
  var flag = true;  // 标志左子树是否被便利过
  var _stack_ = [];
  this.pos = this.root;
  orderArr.push(this.pos.data);
  while(true) {
    if (this.pos.left !== null && flag) {
      _stack_.push(this.pos);
      this.pos = this.pos.left;
      orderArr.push(this.pos.data);
    } else {
      if (this.pos.right !== null) {
        this.pos = this.pos.right;
        orderArr.push(this.pos.data);
        flag = true;
      } else {
        if (_stack_.length < 1) {
          break;
        }
        // 没有左节点，没有右节点
        this.pos = _stack_.pop();
        flag = false;
      }
    }
  }
  return orderArr;
}

/**
 * 后序遍历
 */
function lastOrder() {
  var orderArr = [];
  if (this.root === null) {
    return orderArr;
  }
  var _stack_ = [];
  this.pos = this.root;
  while(true) {
    if (this.pos.left !== null && this.pos._flag_ !== 0 && this.pos._flag_ !== 1) {
      this.pos._flag_ = 0;
      _stack_.push(this.pos);
      this.pos = this.pos.left;
    } else {
      if (this.pos.right !== null && this.pos._flag_ !== 1) {
        this.pos._flag_ = 1;
        _stack_.push(this.pos);
        this.pos = this.pos.right;
      } else {
        orderArr.push(this.pos.data);
        if ('_flag_' in this.pos) delete this.pos._flag_;
        if (_stack_.length < 1) {
          break;
        };
        this.pos = _stack_.pop();
      }
    }
  }
  return orderArr;
}



var bt = new BST()
bt.insert(10)
bt.insert(5)
bt.insert(15)
bt.insert(4)
bt.insert(4)
bt.insert(8)
bt.insert(13)
bt.insert(16)
bt.insert(7)
bt.insert(12)

console.log("前序遍历", bt.preOrder());
console.log("中序遍历", bt.middleOrder());
console.log("后序遍历", bt.lastOrder());
