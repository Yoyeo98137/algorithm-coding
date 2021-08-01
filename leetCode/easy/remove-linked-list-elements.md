## 203. 移除链表元素

### 题意

给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。

### 难度

⭐⭐

### 示例

**示例 1：**

```javascript
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]
```

**示例 2：**

```javascript
输入：head = [], val = 1
输出：[]
```

**示例 3：**

```javascript
输入：head = [7,7,7,7], val = 7
输出：[]
```

### 考察

递归、链表

### 实现

```javascript

/**
 * 递归
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    /**

        链表的定义具有递归的性质，因此链表题目常可以用递归的方法求解。
        
        我们可以把 递归 分成 递 和 归 两个步骤进行理解：
        1 先是往后递也就是 调用自身函数 的过程，在这里可以理解成遍历（查询）整个链表
          然后我们需要在遍历到某个条件时结束遍历即终止递归（不然就是死循环了）
          这就是我们要建立的 最基本问题
        2 递操作结束后，就到了往回归即 抛出返回值 的过程
          这里我理解为 已经拿到了链表中的每一个节点了，可以开始对每一个节点进行逻辑操作了
          对应题意，就是检查当前节点存值是否等于移除目标值
          是则通过改变指针指向跳过当前节点
          否则照常返回当前节点
        
     */
    
    // 最基本问题
    // head === null 即代表遍历到了最后一个有效节点的（val.next）下一个节点 null
    if (head === null) return head

    // 子问题
    // 向后 ‘遍历’
    head.next = removeElements(head.next, val);

    // 返回头节点，对于链表来说，只要有了头结点，我们就可以顺次访问链表中的所有内容
    // 所以，链表的头结点，就可以表示整个链表。
    // 当前节点值等于目标值的时候，通过改变指针跳过当前节点指向，否则返回当前节点
    return head.val === val ? head.next : head;
};

时间复杂度：O(n)，其中 n 是链表的长度。递归过程中需要遍历链表一次。
空间复杂度：O(n)，其中 n 是链表的长度。空间复杂度主要取决于递归调用栈，最多不会超过 n 层。


/**
 * 迭代
 *
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    /**
    
        迭代

        也可以用迭代的方法删除链表中所有节点值等于特定值的节点。

        用 temp 表示当前节点。
        如果 temp 的下一个节点不为空且下一个节点的节点值等于给定的 val，则需要删除下一个节点。
        删除下一个节点可以通过以下做法实现：
            
            temp.next = temp.next.next

        如果 temp 的下一个节点的节点值不等于给定的 val，
        则保留下一个节点，将 temp 移动到下一个节点即可。

        当 temp 的下一个节点为空时，链表遍历结束，此时所有节点值等于 val 的节点都被删除。

        具体实现方面，由于链表的头节点 head 有可能需要被删除，
        因此创建哑节点 dummyHead，
        令 dummyHead.next = head，初始化 temp = dummyHead，然后遍历链表进行删除操作。
        
        最终返回 dummyHead.next 即为删除操作后的头节点。

     */

    // 为 head 创建一个 虚拟头结点
    const dummyHead = new ListNode(-1)
    dummyHead.next = head

    // 遍历链表，到最后一个则结束
    let temp = dummyHead
    while (temp.next !== null) {
        if (temp.next.val === val) {
            // 当下一个节点值等于移除目标值时，断开指向下个节点的指针
            temp.next = temp.next.next
        } else {
            // 否则将 temp 移动到下一个节点
            temp = temp.next
        }
        // console.log(temp)
        // console.log(dummyHead)
        // console.log('')
    }

    return dummyHead.next
};

时间复杂度：O(n)，其中 n 是链表的长度。需要遍历链表一次。
空间复杂度：O(1)。

```
