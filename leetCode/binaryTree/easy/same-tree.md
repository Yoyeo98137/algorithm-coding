## 100. 相同的树

### 题意

给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

### 难度

⭐

### 示例

**示例一：**

```javascript
输入：p = [1,2,3], q = [1,2,3]
输出：true
```

**示例二：**

```javascript
输入：p = [1,2], q = [1,null,2]
输出：false
```

**示例三：**

```javascript
输入：p = [1,2,1], q = [1,1,2]
输出：false
```

### 考察

树、深度优先搜索、广度优先搜索、二叉树

### 实现

```javascript
思路：

两个二叉树相同，当且仅当两个二叉树的结构完全相同，且所有对应节点的值相同。
因此，可以通过搜索的方式判断两个二叉树是否相同。

- 如果两个二叉树都为空，则两个二叉树一定相同
- 如果两个二叉树中有且只有一个为空，则两个二叉树一定不相同
- 如果两个二叉树都不为空，则需要满足
    - 它们的根节点相同
    - 它们的左子树相同
    - 它们的右子树相同

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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (p === null && q === null) return true
    if (p === null || q === null) return false

    return p.val === q.val
        && isSameTree(p.left, q.left)
        && isSameTree(p.right, q.right)
};

时间复杂度：O(min(m,n))，其中 m 和 n 分别是两个二叉树的节点数。
对两个二叉树同时进行深度优先搜索，只有当两个二叉树中的对应节点都不为空时才会访问到该节点，
因此被访问到的节点数不会超过较小的二叉树的节点数。

空间复杂度：O(min(m,n))，其中 m 和 n 分别是两个二叉树的节点数。
空间复杂度取决于递归调用的层数，递归调用的层数不会超过较小的二叉树的最大高度，
最坏情况下，二叉树的高度等于节点数。


/**
 * BFS 迭代
 * 
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    /**
        - 通过维护一个队列，先把 整棵树的比较 入列
        - 然后带出 子树的比较 入列
        - 继续出列、入列 直到遍历结束，就完成比较了

        这里入列的是一个对象，巧妙的避过了取 null 值进行比较引起的运行错误

        from 笨猪爆破组
     */
    const queue = [{ p, q }]

    while (queue.length) {
        const cur = queue.shift()

        // 跳过循环
        if (cur.p === null && cur.q === null) continue
        if (cur.p === null || cur.q === null) return false
        if (cur.p.val !== cur.q.val) return false

        // 将左右节点入队进行下一轮的比对
        queue.push({
            p: cur.p.left,
            q: cur.q.left,
        }, {
            p: cur.p.right,
            q: cur.q.right,
        })
    }

    return true
};

时间复杂度：O(min(m,n))
空间复杂度：O(min(m,n))
```
