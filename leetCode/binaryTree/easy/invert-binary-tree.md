## 226. 翻转二叉树

### 题意

翻转一棵二叉树。

### 难度

⭐⭐

### 示例

```javascript
输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9

输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

### 备注

这个问题是受到 Max Howell 的 原问题 启发的 ：

谷歌：我们90％的工程师使用您编写的软件(Homebrew)，但是您却无法在面试时在白板上写出翻转二叉树这道题，这太糟糕了。

### 考察

树、深度优先搜索、二叉树

### 实现

```javascript

- 遍历树（随便怎么遍历），然后将左右子树交换位置。
- 如果树很高，建议使用栈来代替递归
- 这道题目对顺序没要求的，因此队列数组操作都是一样的，无任何区别

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
    if (!root) return root;
    // 递归
    //   const left = root.left;
    //   const right = root.right;
    //   root.right = invertTree(left);
    //   root.left = invertTree(right);

    // 我们用stack来模拟递归
    // 本质上递归是利用了执行栈，执行栈也是一种栈
    // 其实这里使用队列也是一样的，因为这里顺序不重要

    const stack = [root];
    while (stack.length) {
        // 拿到根节点
        const current = stack.shift()

        // 左右子树互换
        const left = current.left;
        const right = current.right;
        current.right = left;
        current.left = right;

        // 左右子树进栈继续进行子树的节点互换
        if (left) {
            stack.push(left);
        }
        if (right) {
            stack.push(right);
        }
    }

    return root;
};

时间复杂度：O(N)
空间复杂度：O(N)

```
