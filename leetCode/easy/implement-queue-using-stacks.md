## 232. 用栈实现队列

### 题意

请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：

实现 MyQueue 类：

- void push(int x) 将元素 x 推到队列的末尾
- int pop() 从队列的开头移除并返回元素
- int peek() 返回队列开头的元素
- boolean empty() 如果队列为空，返回 true ；否则，返回 false

### 说明

- 你只能使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
- 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。

### 进阶

你能否实现每个操作均摊时间复杂度为 O(1) 的队列？换句话说，执行 n 个操作的总时间复杂度为 O(n) ，即使其中一个操作可能花费较长时间。

### 难度

⭐

### 示例

**示例 1：**

```javascript
输入：
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
输出：
[null, null, null, 1, 1, false]

解释：
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false
```


### 考察

栈、设计、队列

### 实现

```javascript
/**

    队列的特性是 FIFO（先入先出），而栈的特性是 FILO（先入后出）。
    知道两者特性之后，我们需要用 两个栈 来模拟队列的特性，
    一个栈为 入队栈，一个栈为 出队栈（反转栈）。

    当出队栈存在内容时，出队栈的栈顶，即为第一个出队的元素。
    若出队栈无元素，我们的需求又是出队的话，我们就需要将入队栈的内容反序导入出队栈，然后弹出栈顶即可。

    注意：根据栈的的特性，我们仅能使用 push 和 pop 操作。

 */

/**
 * Initialize your data structure here.
 * 在此处初始化数据结构。
 */
var MyQueue = function() {
    this.inStack = []  // 进栈列
    this.outStack = []  // 出栈列
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 *
 * 将元素x推到队列的后面
 */
MyQueue.prototype.push = function(x) {
    return this.inStack.push(x)
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 *
 * 从队列前面移除元素并返回该元素
 */
MyQueue.prototype.pop = function() {
    /**
        此时进栈列已经存在元素，但是出栈列为空时

        3          
        2
        1
        in      out

        3
        2       1
        in      out

                1
        3       2
        in      out

                1
                2
                3
        in      out

        通过两个栈的 后进先出 特性来模拟队列的 先进先出 特性

        为什么先判断 出栈列outStack 是否存在元素？

        也是因为队列的特性 先进先出，所以我们先把 先进来 的元素给 pop 掉
        先把 队列 清空了，再给他补上后面过来的元素
     */
    if (!this.outStack.length) {
        // 将进栈列的所有元素，推至出栈列，此时的出栈列，就满足 ‘先进先出’ 的特性
        while (this.inStack.length) {
            this.outStack.push(this.inStack.pop())
        }
    }
    return this.outStack.pop()  
    // 这里出栈列的栈底，其实就是之前进栈列的栈顶
    // 即 从队列前面移除元素并返回该元素
};

/**
 * Get the front element.
 * @return {number}
 *
 * 获取前元素 即队列中第一个出队的元素（出栈列中的栈顶即最后一个元素）
 */
MyQueue.prototype.peek = function() {
    if (!this.outStack.length) {
        // 将进栈列的所有元素，推至出栈列，此时的出栈列，就满足 ‘先进先出’ 的特性
        while (this.inStack.length) {
            this.outStack.push(this.inStack.pop())
        }
    }
    return this.outStack[this.outStack.length - 1]
    // 同理，只不过这里不是删除原来的栈顶，而只是取值
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 *
 * 返回队列是否为空。
 */
MyQueue.prototype.empty = function() {
    // console.log('MyQueue: ', this.res)
    // console.log('MyQueue: ', this.res.length)
    return !this.inStack.length && !this.outStack.length
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * MyQueue对象将被实例化并按如下方式调用：
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */

// var myQueue = new MyQueue();
// console.log(myQueue.push(1)); // queue is: [1]
// console.log(myQueue.push(2)); // queue is: [1, 2] (leftmost is front of the queue)
// console.log(myQueue.peek()); // return 1
// console.log(myQueue.pop()); // return 1, queue is [2]
// console.log(myQueue.empty()); // return false


时间复杂度：push 和 empty 为 O(1)，pop 和 peek 为均摊 O(1)。
对于每个元素，至多入栈和出栈各两次，故均摊复杂度为 O(1)。

空间复杂度：O(n)。其中 n 是操作总数。
对于有 n 次 push 操作的情况，队列中会有 n 个元素，故空间复杂度为 O(n)。

```
