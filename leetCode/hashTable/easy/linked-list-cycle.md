

  ## 141. 环形链表

  ### 题意

  给定一个链表，判断链表中是否有环。  
  
  如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。   
  为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。   
  如果 pos 是 -1，则在该链表中没有环。  

  注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

  如果链表中存在环，则返回 true 。 否则，返回 false 。

  ### 难度

  ⭐

  ### 示例

  **示例一：**

  ```javascript
  输入：head = [3,2,0,-4], pos = 1
  输出：true
  解释：链表中有一个环，其尾部连接到第二个节点。
  ```

  **示例二：**

  ```javascript
  输入：head = [1,2], pos = 0
  输出：true
  解释：链表中有一个环，其尾部连接到第一个节点。
  ```

  **示例三：**

  ```javascript
  输入：head = [1], pos = -1
  输出：false
  解释：链表中没有环。
  ```

  ### 进阶

  你能用 O(1)（即，常量）内存解决此问题吗？

  ### 考察

  哈希表、链表、双指针

  ### 实现

  ```javascript
  思路：
  通过哈希表记录同个节点引用是否能被重复访问到
  或者快慢指针遍历

  /**
   * Definition for singly-linked list.
   * function ListNode(val) {
   *     this.val = val;
   *     this.next = null;
   * }
   */

  /**
   * @param {ListNode} head
   * @return {boolean}
   */
  var hasCycle = function(head) {
    // 遍历所有节点，每次遍历到一个节点时，判断该节点此前是否被访问过
    // 当一个节点被多次访问时，说明它可以通过不同的指针进行访问，说明此时的链表中存在环

    if (!head) return false

    const map = new Map()

    while (head) {
      if (map.has(head)) return true
      // 注意存储的是节点的地址引用，而不是节点值，链表中的节点是通过指针来访问地址的
      map.set(head, true)
      head = head.next
    }

    return false
  };

  时间复杂度：O(N)
  空间复杂度：O(N)

  /**
   * @param {ListNode} head
   * @return {boolean}
   */
  var hasCycle = function(head) {
    /**
      - 快慢指针，同时从头节点出发
      - 慢指针每次走一步，快指针走两步
      - 当两个指针的节点值相同时，说明存在环

      “追及问题、环形跑道”
    */

    let fast = head;
    let slow = head;
    
    while (fast && fast.next) {
      slow = slow.next
      fast = fast.next.next
      if (slow === fast) return true
    }

    return false
  };

  时间复杂度：O(N)
  空间复杂度：O(1)
  ```

