## CSS线性渐变的有趣应用
--- ---
#### 1. 实现一个双色的进度条
```
// DOM节点
<div class="bar"></div>

// CSS
<style>
  .bar {
    ...
    background-image: linear-gradient(to right, #1f80d7 50%, #c85ca7 50%);
    background-repeat: no-repeat;
  }
</style>
```
核心属性就是`linear-gradient`，这个属性的详细用法可以参考[linear-gradient](https://www.css88.com/book/css/values/image/linear-gradient().htm)。
`to right`表示从右到左，并且各占百分之五十`#1f80d7 50%, #c85ca7 50%`。
--- ---
效果如下所示：
![css-linear-img](https://i.loli.net/2019/01/18/5c414116e32cd.jpg)
