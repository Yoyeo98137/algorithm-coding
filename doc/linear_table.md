## 线性表与非线性表
线性表（Linear List）：就是数据排成像一条线一样的结构，每个线性表上的数据最多只有前和后两个方向。数组、链表、队列、栈 等就是线性表结构。    
![image](https://camo.githubusercontent.com/574771db72ab154edbe2d44e688df15ca5855a2a8028d7af39ae23fab67e7bc0/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d636665393938626365303866616534332e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

非线性表：数据之间并不是简单的前后关系。二叉树、堆、图 就是非线性表。  
![image](https://camo.githubusercontent.com/76c20596ab327f19827b8f9268ec8bf37a3247773cc899e7deaa5fde18f3ec11/68747470733a2f2f75706c6f61642d696d616765732e6a69616e7368752e696f2f75706c6f61645f696d616765732f31323839303831392d396164376138393434323430313036622e706e673f696d6167654d6f6772322f6175746f2d6f7269656e742f7374726970253743696d61676556696577322f322f772f31323430)

> 先总结 线性表

### 数组
- 数组 (Array) 是一个有序的数据集合，我们可以通过数组名称 (name) 和索引 (index) 进行访问
- 数组的索引是从 0 开始的

数组是用一组连续的内存空间来存储的。  
所以数组支持 随机访问，**根据下标随机访问的时间复杂度为 O(1)**。  
但是数组为了保持内存数据的连续性，会导致插入、删除这两个操作比较低效，  
因为底层通常是要进行大量的数据搬移来保持数据的连续性。  

**插入与删除的时间复杂度如下：**  
插入：从最好 O(1) ，最坏 O(n) ，平均 O(n)  
删除：从最好 O(1) ，最坏 O(n) ，平均 O(n)

> JavaScript 原生支持数组，本身也提供了很多操作方法

### 栈
- 后进者先出，先进者后出，简称 **后进先出（LIFO）**，这就是典型的 **栈结构**
- 新添加的或待删除的元素都保存在栈的末尾，称作**栈顶**，另一端就叫**栈底**
- 在栈里，新元素都靠近栈顶，旧元素都接近栈底
- 从栈的操作特性来看，*是一种 操作受限的线性表，只允许在一端插入和删除数据*
- 不包含任何元素的栈称为 空栈

栈的方法：
- push(element)：添加一个（或几个）新元素到栈顶
- pop()：移除栈顶的元素，同时返回被移除的元素
- peek()：返回栈顶的元素，不对栈做任何修改
- isEmpty()：如果栈里没有任何元素就返回 true，否则返回 false
- clear()：移除栈里的所有元素
- size()：返回栈里的元素个数


```JavaScript
// 模拟 Stack 类
function Stack() {
  this.items = [];

  // 添加新元素到栈顶
  this.push = function(element) {
    this.items.push(element);
  };
  // 移除栈顶元素，同时返回被移除的元素
  this.pop = function() {
    return this.items.pop();
  };
  // 查看栈顶元素
  this.peek = function() {
    return this.items[this.items.length - 1];
  };
  // 判断是否为空栈
  this.isEmpty = function() {
    return this.items.length === 0;
  };
  // 清空栈
  this.clear = function() {
    this.items = [];
  };
  // 查询栈的长度
  this.size = function() {
    return this.items.length;
  };
  // 打印栈里的元素
  this.print = function() {
    console.log(this.items.toString());
  };
}
```