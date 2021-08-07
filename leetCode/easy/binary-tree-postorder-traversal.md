## 145. 二叉树的后序遍历

### 题意

给定一个二叉树，返回它的 后序 遍历。

### 难度

⭐

### 示例

**示例 1：**

```javascript
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 

输出: [3,2,1]
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
var postorderTraversal = function(root) {
    let res = []

    const nextOrder = root => {
        if (!root) return

        nextOrder(root.left)
        nextOrder(root.right)
        res.push(root.val)
    }

    nextOrder(root)
    return res
};


时间复杂度：O(n)，其中 n 为二叉树节点的个数。
二叉树的遍历中每个节点会被访问一次且只会被访问一次。

空间复杂度：O(n)。
空间复杂度取决于递归的栈深度，而栈深度在二叉树为一条链的情况下会达到 O(n) 的级别。



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
var postorderTraversal = function(root) {
    const res = []
    const stack = []
    // 节点的遍历标识
    // 因为一个树的查找顺序肯定是 根>左>右 即通过根节点去找到他的左子树和右子树
    // 而后序遍历需要的输出顺序是 左>右>根 即我们要先找到左子树，再找右子树，最后才是根节点
    // 那中间两次寻找子树的过程，势必就经过了两次根节点，所以需要这么一个变量标识来防止重复识别
    let pre = null
    while (root !== null || stack.length) {
        // 根节点入栈，从左节点开始一直向下查找，为的就是找到 最左边的叶子节点
        while (root) {
            stack.push(root)
            root = root.left
        }

        // 所有左子树遍历完后，取出最后一个入栈的节点即 最左边的叶子节点
        // 这就代表着第一次通过根节点去找左子节点的过程
        root = stack.pop()

        // 当该节点不存在右子节点或者这个节点的右节点已经被遍历过了
        if (root.right === null || root.right === pre) {
            // 存入结果数组
            res.push(root.val)
            // 标记遍历过的节点
            pre = root
            // 根指向 null 避免下次循环时的重复压栈操作
            root = null
        } else {
            // 如果存在右子节点，将节点压入递归栈
            // 这里就是第二次通过根节点找右子节点的步骤
            stack.push(root)
            // 并且将根节点指向右子节点，让下一次循环去识别 该右子节点 的所有 左子树
            root = root.right
        }
    }

    return res
};


时间复杂度：O(n)，其中 n 为二叉树节点的个数。
二叉树的遍历中每个节点会被访问一次且只会被访问一次。

空间复杂度：O(n)。
空间复杂度取决于栈深度，而栈深度在二叉树为一条链的情况下会达到 O(n) 的级别。

```
