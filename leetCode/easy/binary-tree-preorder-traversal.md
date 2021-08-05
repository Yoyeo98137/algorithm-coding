## 144. 二叉树的前序遍历

### 题意

给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

### 难度

⭐

### 示例

**示例 1：**

```javascript
输入：root = [1,null,2,3]
输出：[1,2,3]
```

**示例 2：**

```javascript
输入：root = []
输出：[]
```

**示例 3：**

```javascript
输入：root = [1]
输出：[1]
```

**示例 4：**

```javascript
输入：root = [1,2]
输出：[1,2]
```

### 进阶

递归版本很简单，需要更加理解的是迭代版本

### 考察

栈、树、深度优先搜索、二叉树

### 实现

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 递归
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    /**
    
        前序遍历的定义：
        对每个节点，都是先处理当前节点，对它执行我们的处理逻辑，
        再递归它的左子树，再递归它的右子树，对子树中的节点执行相同的逻辑。

        即：当前节点 ----> 左节点 ----> 右节点
    
     */
    
    let res = []

    const preOrder = root => {
        if (!root) return

        res.push(root.val)
        preOrder(root.left)
        preOrder(root.right)
    }

    preOrder(root)
    return res
};

时间复杂度：O(n)，其中 n 是二叉树的节点数。每一个节点恰好被遍历一次。
空间复杂度：O(n)，为递归过程中栈的开销，平均情况下为 O(logn)，最坏情况下树呈现链状，为 O(n)。


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 迭代
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    /**
    
        迭代：利用显式的栈来记录遍历的过程
        实际上，递归就使用了调用栈，所以这里我们可以使用栈来模拟递归的过程

        - 首先根入栈
        - 将根节点出栈，将根节点值放入结果数组中
        - 然后遍历左子树、右子树，因为栈是先入后出，所以，我们先右子树入栈，然后左子树入栈
        - 继续出栈（左子树被出栈）

        其实就是对应了前序遍历的一个过程：
        先查找当前节点（将根节点出栈，将根节点值放入结果数组中）
        然后查找左子节点（然后遍历左子树，栈是后进先出，所以我们先遍历右子树）
        最后再查找右子节点（同理，左子树入栈）
        
        每次都将左子节点当做 下一次遍历的左子树的根节点（左子树被出栈）

     */

    let list = []
    let stack = []

    if (root) stack.push(root)

    while (stack.length) {
        const curNode = stack.pop()

        // 对应前序遍历的第一步，先查找根节点
        list.push(curNode.val)
        // 然后打印左子树，再到右子树
        // 由于栈的后进先出的特性，我们就要先处理右子树
        if (curNode.right) stack.push(curNode.right)
        if (curNode.left) stack.push(curNode.left)
    }

    // 注意 结果栈 和 模拟递归栈 的区别
    // 模拟栈 对应着每次遍历的步骤，所以它每次插入的是节点
    // 结果栈 对应着每次遍历的结果，所以插入的是节点值
    return list
};

时间复杂度：O(n)，其中 nn 是二叉树的节点数。每一个节点恰好被遍历一次。
空间复杂度：O(n)，为迭代过程中显式栈的开销，平均情况下为 O(logn)，最坏情况下树呈现链状，为 O(n)。

```
