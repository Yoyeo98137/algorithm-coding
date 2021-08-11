## 111. 二叉树的最小深度

### 题意

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

**说明：** 叶子节点是指没有子节点的节点。

### 难度

⭐

### 示例

**示例一：**

```javascript
输入：root = [3,9,20,null,null,15,7]
输出：2
```

**示例二：**

```javascript
输入：root = [2,null,3,null,4,null,5,null,6]
输出：5
```

### 考察

树、深度优先搜索、广度优先搜索、二叉树

### 实现

```javascript
思路：

对于每个非叶子节点，我们只需要计算其左右子树的最小叶子节点深度
这样就将大问题转化为了小问题

需要注意的是，我们必须要完整的记录一次 左右子树 的最小叶子节点深度
来避免遇到只有单侧子树时，直接输出 1 的情况

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
var minDepth = function(root) {
    // 没有节点，则记录 0
    if (root === null) return 0
    // 找到叶子节点，带回当前层数 1
    if (root.left === null && root.right === null) return 1

    // 比对左右子树中的最小节点深度
    let min_depth = Infinity
    if (root.left) {
        min_depth = Math.min(minDepth(root.left), min_depth)
    }
    if (root.right) {
        min_depth = Math.min(minDepth(root.right), min_depth)
    }

    // 然后填补上代表自己的一层
    return min_depth + 1
};

var minDepth = (root) => {
    if (root == null) return 0;

    const left = minDepth(root.left);
    const right = minDepth(root.right);

    // 找到左右子树中的最小层数再加上根节点的一层即为答案
    // 只存在一颗树的时候，那肯定就不需要再比对一个最小值了
    if (left > 0 && right > 0) {
        return 1 + Math.min(left, right);
    } else if (left > 0) {
        return 1 + left;
    } else if (right > 0) {
        return 1 + right;
    } else {
        return 1;
    }
};

时间复杂度：O(N)，其中 N 是树的节点数。对每个节点访问一次。

空间复杂度：O(H)，其中 H 是树的高度。
空间复杂度主要取决于递归时栈空间的开销，最坏情况下，树呈现链状，空间复杂度为 O(N)。
平均情况下树的高度与节点数的对数正相关，空间复杂度为 O(logN)。

/**
 * BFS 迭代
 * 
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    /**
        这道题其实主要考的还是递归的基本功，可以多尝试几种更体现过程的递归写法

        BFS 迭代：
        - 层层遍历，一旦发现当前层的某个节点没有子节点，说明当前处在最小深度
        - 这正是 广度优先搜索 基于层数遍历的特点，即逐层从左向右遍历
     */

    if (root === null) return 0

    // 根节点代表一层，然后根节点入列
    let depth = 1
    const queue = [root]
    while (queue.length) {
        // 保留当前层下的节点数，因为在后面的代码中会对我们的队列长度进行更改
        const levelSize = queue.length
        for (let i = 0; i < levelSize; i++) {
            // 当前 ‘根节点’ 出列
            const cur = queue.shift()

            // 找到了叶子节点
            if (cur.left === null && cur.right === null) return depth
            // 子树入列
            if (cur.left) queue.push(cur.left)
            if (cur.right) queue.push(cur.right)
        }
        // 继续进行下一层的遍历
        depth++
    }
};

时间复杂度：O(N)，其中 N 是树的节点数。对每个节点访问一次。

空间复杂度：O(N)，其中 N 是树的节点数。
空间复杂度主要取决于队列的开销，队列中的元素个数不会超过树的节点数。


```
