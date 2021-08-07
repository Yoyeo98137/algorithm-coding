## 104. 二叉树的最大深度

### 题意

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

### 难度

⭐

### 示例

**示例 1：**

```javascript
给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7

返回它的最大深度 3 。
```


### 考察

树、深度优先搜索、广度优先搜索、二叉树

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
 * DFS 递归
 *
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    /**
    
        找出返回值：节点为空时说明高度为 0，所以返回 0
        节点不为空时则分别求左右子树的高度的最大值，
        同时加 1（自己作为根节点相当于上一层） 表示 当前节点 的高度，返回该数值
    
     */
    if (root == null) return 0;
    
    // 带回左子树、右子树的高度
    let leftHeight = maxDepth(root.left);
    let rightHeight = maxDepth(root.right);

    // 左子树、右子树的高度 + 1 就是当前节点的高度
    return Math.max(leftHeight, rightHeight) + 1;
};

时间复杂度：O(n)，其中 n 为二叉树节点的个数。每个节点在递归中只被遍历一次。

空间复杂度：O(height)，其中 height 表示二叉树的高度。
递归函数需要栈空间，而栈空间取决于递归的深度，因此空间复杂度等价于二叉树的高度。


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * BFS 迭代
 * 
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root === null) return 0

    const queue = [root]
    let ans = 1

    while (queue.length) {
        // 当前层的节点个数
        const queueSize = queue.length
        // 让当前层的节点逐个出列
        for (let i = 0; i < queueSize; i++) {
            const curr = queue.shift()
            // 出列节点的左右节点再补充入列
            // 二叉树的搜索顺序：根>左>右
            if (curr.left) queue.push(curr.left)
            if (curr.right) queue.push(curr.right)
        }
        // 当前层的所有节点已经出列，如果队列不为空（说明有子节点入列了），说明还有下层节点，计数 + 1
        if (queue.length) ans++
    }

    return ans
};

时间复杂度：O(n)，其中 n 为二叉树的节点个数。
与方法一同样的分析，每个节点只会被访问一次。

空间复杂度：此方法空间的消耗取决于队列存储的元素数量，其在最坏情况下会达到 O(n)。

```
