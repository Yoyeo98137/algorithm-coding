## 110. 平衡二叉树

### 题意

给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

> 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。


### 难度

⭐

### 示例

**示例一：**

```javascript
输入：root = [3,9,20,null,null,15,7]
输出：true
```

**示例二：**

```javascript
输入：root = [1,2,2,3,3,null,null,4,4]
输出：false
```

**示例三：**

```javascript
输入：root = []
输出：true
```

### 考察

树、二叉树、深度优先搜索

### 实现

```javascript
思路：
如果使用自底向上的遍历做法，则对于每个节点，函数 height 只会被调用一次。

自底向上递归的做法类似于后序遍历，
对于当前遍历到的节点，先递归地判断其左右子树是否平衡，再判断以当前节点为根的子树是否平衡。

- 如果一棵子树是平衡的，则返回其高度（高度一定是非负整数），否则返回 −1。
- 如果存在一棵子树不平衡，则整个二叉树一定不平衡。

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
 * @return {boolean}
 */
var isBalanced = function(root) {
    return computedHeight(root) !== -1
};

const computedHeight = root => {
    // 到叶子节点则结束
    if (root === null) return 0

    // 记录左右子树高度
    const leftHeight = computedHeight(root.left)
    const rightHeight = computedHeight(root.right)

    // 如果当前层的左右子树的 路径和 相差大于 1 时则记录为非平衡二叉树
    // 如果存在一棵子树不平衡，则整个二叉树一定不平衡
    if (
        leftHeight === -1
        || rightHeight === -1
        || Math.abs(leftHeight - rightHeight) > 1
    ) {
        return -1
    } else {
        return Math.max(leftHeight, rightHeight) + 1
    }
}

时间复杂度：O(n)，其中 n 是二叉树中的节点个数。
使用自底向上的递归，每个节点的计算高度和判断是否平衡都只需要处理一次，
最坏情况下需要遍历二叉树中的所有节点，因此时间复杂度是 O(n)。

空间复杂度：O(n)，其中 n 是二叉树中的节点个数。
空间复杂度主要取决于递归调用的层数，递归调用的层数不会超过 n。

```
