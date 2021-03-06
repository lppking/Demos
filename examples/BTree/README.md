## 二叉排序树的前中后序遍历的非递归算法
一棵树若为二叉排序树，需要满足以下条件：
 - 为空树或者是二叉树
 - 如果左子树不空，则左子树上所有节点的值都小于根节点的值。
 - 如果右子树不空，则右子树上所有节点的值都大于根节点的值。
 - 左子树和右子树也同样是二叉排序树
 - 没有值相等的节点
--- ---
#### 1. 声明二叉树和节点
```
/**
 * 二叉排序树
 */
function BST() {
  this.root = null; // 根节点
  this.pos = null; // 位置指针
  this.insert = insert; // 节点插入方法
  this.preOrder = preOrder; // 前序遍历
  this.middleOrder = middleOrder; // 中序遍历
  this.lastOrder = lastOrder; // 后续遍历
}

/**
 * 树节点
 */
function Node(data, left, right) {
  this.data = data; // 节点值
  this.left = left; // 节点左子树
  this.right = right; // 节点右子树
}
```
--- ---
#### 2. 节点插入方法
基本思路：
 - 如果当前为空树，则将新节点设置为根节点
 - 否则将`this.pos`指向根节点，将新节点与`this.pos`比较
 - 如果小于且`this.pos`左子树为null，则将新节点设置`this.pos`的左子树
 - 如果左子树不为空，则将`this.pos`指向左子树，继续上述过程
 - 如果大于`this.pos`节点的值，则对右子树同理上述过程。
```
/**
 * 给二叉排序树插入新节点
 */
function insert(data) {
  var _new_ = new Node(data, null, null); // 新建一个节点
  if (this.root === null) {
    this.root = _new_; // 如果当前为空树直接设置为根节点
  } else {
    this.pos = this.root; // 位置指针指向根节点，从根节点开始查找
    while(true) {
      if (_new_.data === this.pos.data) break; // 值不允许相等
      if (_new_.data < this.pos.data) { // 小于插入左子树
        if (this.pos.left === null) {
          this.pos.left = _new_;
          break;
        } else {
          this.pos = this.pos.left;
        }
      } else {
        if (this.pos.right === null) { // 大于插入右子树
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
```
--- ---
#### 3. 前序遍历
基本思路：**前序遍历就是先根节点，再左子树，再右子树**。
 - 首先存储当前节点（`this.pos`）值，如果当前节点有左子树，则将当前节点入栈，将`this.pos`指向左子树，继续上述过程
 - 如果左子树为空，则取出堆栈顶部节点，`this.pos`指向该节点，判断当前节点右子树是否为空，如果右子树不为空，则将`this.pos`指向右子树，继续上述过程
 - 如果左右子树都为空，则判断堆栈中是否还有节点，如果没有，则遍历完成，如果有，取出堆栈顶部节点，判断右子树。
```
/**
 * 前序遍历
 */
function preOrder() {
  var orderArr = []; // 存储遍历结果
  if (this.root === null) { // 如果当前为空树，则返回空数组
    return orderArr;
  }
  var flag = true; // 是否允许遍历当前节点的左子树
  var _stack_ = []; // 模拟一个堆栈
  this.pos = this.root; // 位置指针指向根节点
  orderArr.push(this.pos.data); // 存储根节点值
  while(true) {
    if (this.pos.left !== null && flag) { // 如果当前节点的左子树不为空且没有被遍历过
      _stack_.push(this.pos); // 当前节点入栈
      this.pos = this.pos.left; // 位置指针指向当前节点左子树
      orderArr.push(this.pos.data); // 存储左子树值
    } else {
      if (this.pos.right !== null) { // 如果当前节点右子树不为空
        this.pos = this.pos.right; // 位置指针指向当前节点右子树
        orderArr.push(this.pos.data); // 存储右子树值
        flag = true; // 允许遍历当前节点左子树
      } else {
        if (_stack_.length < 1) { // 如果堆栈为空，表示已经遍历结束
          break;
        }
        // 没有左节点，没有右节点，表示当前是一个叶子节点
        this.pos = _stack_.pop(); // 取出堆栈顶部节点
        flag = false; // 不允许遍历当前节点的左子树
      }
    }
  }
  return orderArr;
}
```
--- ---
#### 4. 中序遍历
基本思路：中序遍历就是先左子树，再根节点，再右子树。中序遍历和前序遍历算法差不多，主要区别在于中序是先存左子树的值，再存根节点的值。
```
/**
 * 中序遍历(非递归)
 */
function middleOrder() {
  var orderArr = [];
  if (this.root === null) {
    return orderArr;
  }

  var _stack_ = []; // 用一个数组作为栈
  var flag = true; // 是否允许遍历左子树
  this.pos = this.root; // 位置指向根节点
  while(true) {
    if (this.pos.left !== null && flag) { // 如果当前节点的左子树不为空且没有被遍历过
      _stack_.push(this.pos); 
      this.pos = this.pos.left;
      flag = true;
    } else { // 左子树为空，判断右子树
      if (this.pos.right !== null) { // 如果右子树不为空 
        orderArr.push(this.pos.data); // 存储当前节点值
        this.pos = this.pos.right; // 位置指针指向右子树
        flag = true; // 允许遍历当前节点左子树
      } else { // 左右子树都为空
        orderArr.push(this.pos.data); // 存储当前节点值
        if (_stack_.length < 1) { // 如果堆栈为空，遍历结束
          break;
        }
        this.pos = _stack_.pop(); // 栈顶节点出栈
        flag = false; // 不允许遍历当前节点左子树
      }
    }
  }
  return orderArr;
}
```
--- ---
#### 5. 后序遍历
基本思路：后序遍历就是先左子树，再右子树，再根节点。后序遍历有一个特殊的地方，就是给每个节点对象临时增加了一个`_flag_`属性，属性值为0表示当前节点的左子树被遍历过了，不允许遍历左子树。为1表示当前节点的右子树也被遍历过了，左右子树都不允许遍历了。
 - 依旧是从根节点开始，`this.pos`指向根节点，如果左子树不为空且`_flag_`属性不为0或1，则当前节点入栈，同时当前节点的`_flag_`值设置为0，`this.pos`指向当前节点左子树，继续上述过程
 - 如果左子树为空，则判断右子树是否为空，如果右子树不为空且`_flag_`不为1，则当前节点的`_flag_`设为1，当前节点入栈，`this.pos`指向右子树，继续上述过程
 - 如果左右子树都为空，存储当前节点值且删除当前节点的`_flag_`属性，如果堆栈为空，遍历结束，如果不为空，则取出栈顶节点，重复上述过程。
```
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
```





