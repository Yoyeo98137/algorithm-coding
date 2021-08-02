## 206. 反转链表

### 题意

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

### 难度

⭐

### 示例

**示例 1：**

```javascript
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
```

**示例 2：**

```javascript
输入：head = [1,2]
输出：[2,1]
```

**示例 3：**

```javascript
输入：head = []
输出：[]
```

### 考察

递归、链表

### 实现

```javascript

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 递归
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    /**
        递归到链表的最后一个结点。

        反转链表
        a. 让当前结点的下一个结点(head.next)的 next 指针指向当前节点(head)
        b. 让当前结点的 next 指针指向 NULL
        因为之前next指向它的右边，反转后不应该再指向右边，所以需要断开，下一次递归时会让当前节点指向它的左边，参考上一步。
        返回当前节点，此时，当前节点的右面节点已完成反转。
        直到递归结束，就是完全反转的链表。

        1 -> 2 -> 3 -> null
        null -> 3 -> 2 ->1

        这是一个反转的过程，不要想象成前后交换
     */
    
    // head === null 表示第一次传入的节点为 null 即头结点为 null 的情况，直接返回
    // head.next === null 表示已经递归到了链表尾部，返回尾部元素
    if (head === null || head.next === null) return head

    // 向后遍历
    const newHead = reverseList(head.next)
    // 将当前节点的下一个节点指针指回当前节点
    head.next.next = head
    // 断开当前节点和原先右侧节点的连接，避免形成环
    head.next = null

    return newHead
};

时间复杂度：O(n)，其中 n 是链表的长度。需要对链表的每个节点进行反转操作。
空间复杂度：O(n)，其中 n 是链表的长度。空间复杂度主要取决于递归调用的栈空间，最多为 n 层。


/**
 * 迭代
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    /**
        双（三）指针 + 迭代

        让每个节点的 next 指针指向上一个节点，走到链表尾的时候，整个链表就反向了

        正常来说，链表的节点顺序都是 ‘从左向右’ 的
        那既然我们要反转链表，那就是把这个顺序改成 ‘从右向左’
        原先的 头结点 要变为链表的 尾结点

        那尾结点的特征，不就是指针指向 null 吗

        所以我们定义一个 null 节点作为 原先的头结点（当前节点） 将要改变的指针指向保存下来
        这时候就产生所需要的两个变量：头结点 和 头结点的前一个节点（初始为 null），
        这就相当于一前一后的两个指针

        我们去遍历整个链表，这里以第一步为例子：我们将 头结点 的指针改为指向 头结点的前一个节点即 null
        这时候 头结点 和 原本头结点的下一个节点 之间的连接就断开了，
        为了再次拼接下一个节点，我们需要将其保存下来

        然后将我们的双指针开始前推，继续向后 ‘断链’
        之前保存的变量 下一个节点 则拿来作为下一次循环的 头结点

        当我们遍历完整个链表，整个反转便完成了
    
     */

    let cur = head,  // 作为 新的反转链表 的头结点，也即当前节点
        prev = null;  // 作为 新头结点 的指针指向，也可以理解为在当前 链表头 加上一个 虚拟头结点
    
    // 遍历整个链表
    while (cur) {
        // 保存 ‘断链’ 的下一个节点
        const temp = cur.next

        // 将当前节点指针反转
        cur.next = prev
        // 更新前进指针
        prev = cur
        cur = temp
    }

    return prev
};

时间复杂度：O(n)，其中 n 是链表的长度。需要遍历链表一次。
空间复杂度：O(1)。

```
