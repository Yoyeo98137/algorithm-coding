## 141. 环形链表

### 题意

给定一个链表，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 true 。 否则，返回 false 。

### 难度

⭐⭐

### 进阶：

你能用 O(1)（即，常量）内存解决此问题吗？

### 示例

**示例 1：**

```javascript
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

**示例 2：**

```javascript
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
```

**示例 3：**

```javascript
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
```

### 提示

- 链表中节点的数目范围是 [0, 104]
- -10^5 <= Node.val <= 10^5
- pos 为 -1 或者链表中的一个 有效索引 。

### 考察

哈希表、链表、双指针

### 实现

```javascript

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 哈希表
 *
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    /**
    
        最容易想到的方法是遍历所有节点，每次遍历到一个节点时，判断该节点此前是否被访问过。

        具体地，我们可以使用哈希表来存储所有已经访问过的节点。
        每次我们到达一个节点，如果该节点已经存在于哈希表中，则说明该链表是环形链表，否则就将该节点加入哈希表中。
        重复这一过程，直到我们遍历完整个链表即可。

        我们不用过于纠结题目中的 pos，这只是提供给力扣后台生成环的
        只需要关注 是否为环形链表 这一点
        如果该链表中的节点，被多次访问了（不同的指针识别到了相同的地址），则说明存在这样一个环
    
     */
    
    let map = new Map()

    while (head) {
        // 这里不能根据节点值来判断，要避免相同值但是不同节点的情况
        if (map.has(head)) return true
        
        // 存的是节点的地址引用，而不是节点值
        map.set(head, true);

        // 指向链表的下一个节点
        // 当查询到最后一个节点的 next 时，此时为 null，跳出循环
        head = head.next
    }

    return false
};

时间复杂度：O(N)，其中 N 是链表中的节点数。最坏情况下我们需要遍历每个节点一次。
空间复杂度：O(N)，其中 N 是链表中的节点数。
主要为哈希表的开销，最坏情况下我们需要将每个节点插入到哈希表中一次。

/**
 * 双指针 + 同起点出发
 *
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    /**

        快、慢指针，从头节点出发
        慢指针每次走一步，快指针每次走两步，不断比较它们指向的节点的值
        如果节点值相同，说明有环。如果不同，继续循环。

        类似 “追及问题”
        两个人在环形跑道上赛跑，同一个起点出发，一个跑得快一个跑得慢，
        在某一时刻，跑得快的必定会追上跑得慢的，只要是跑道是环形的，不是环形就肯定追不上。
    
     */

    let fast = head,
        slow = head;

    while (fast && fast.next) {
        fast = fast.next.next
        slow = slow.next
        
        if (slow === fast) return true
    }

    return false
};

时间复杂度：O(N)，其中 NN 是链表中的节点数。
当链表中不存在环时，快指针将先于慢指针到达链表尾部，链表中每个节点至多被访问两次。
当链表中存在环时，每一轮移动后，快慢指针的距离将减小一。而初始距离为环的长度，因此至多移动 N 轮。

空间复杂度：O(1)。我们只使用了两个指针的额外空间。

```