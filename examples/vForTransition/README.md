## v-for与transition实现递进式动画
--- ---
实现这个东西源于实际项目需求。在网上找了没有现成的资源。就自己动手，丰衣足食一下。给出一个简单例子，方便做扩展。涉及到了基础的[Vue过渡动画](https://cn.vuejs.org/v2/guide/transitions.html)相关的内容。
```
// HTML代码
<script src="https://unpkg.com/vue"></script>

<div id="app">
  <transition name="list-complete" v-for="(item, index) in list" :key="item.key">
    <div class="list-complete-item" :key="item.key" v-if="show[index]">
      <span class="item-content">{{item.name}}</span>
      <span class="item-content">{{item.info}}</span>
    </div>
  </transition>
</div>
```
```
// Vue
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!',
    list: [{key: 0, name: "aaaaaa", info: "grgrgrgrgrg"}, {key: 1, name: "bbbbbbb", info: "grgrgrgrgrg"}],
    show: []
  },
  methods: {
  	delayShow(data, index, timer, timeout) {
    	if (typeof timeout !== "undefined") {
      	clearTimeout(timeout)
      }
      const _len = data.length;
      const _timeout = setTimeout(() => {
      	this.$set(this.show, index, true)
        if (index < _len) {
        	this.delayShow(data, ++index, timer, _timeout)
        }
      }, timer)
    }
  },
  mounted() {
  	this.delayShow(this.list, 0, 300);
  }
})
```
```
// 样式
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
}
.list-complete-enter {
  transform: translateX(-131px);
}
.list-complete-leave-to {
  display: none;
}
.list-complete-item {
  width: 100%;
  padding: 0px 18px;
  height: 33px;
  transition: all 1s;
  line-height: 33px;
  
}
.item-content {
    display: inline-block;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
.list-complete-item:hover {
  background-color: #0000009e;
}
```
