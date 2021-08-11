## 112. 路径总和

### 题意

给你二叉树的根节点 root 和一个表示目标和的整数 targetSum ，判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。

**叶子节点** 是指没有子节点的节点。


### 难度

⭐

### 示例

**示例一：**

```javascript
输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
输出：true
```

**示例二：**

```javascript
输入：root = [1,2,3], targetSum = 5
输出：false
```

**示例三：**

```javascript
输入：root = [1,2], targetSum = 0
输出：false
```

### 考察

树、深度优先搜索、二叉树

### 实现

```javascript
思路：

观察要求我们完成的函数，我们可以归纳出它的功能：
询问是否存在从当前节点 root 到叶子节点的路径，满足其路径和为 targetSum。

假定从根节点到当前节点的值之和为 val，我们可以将这个大问题转化为一个小问题：
是否存在从当前节点的子节点到叶子的路径，满足其路径和为 targetSum - val。

不难发现这满足递归的性质，
若当前节点就是叶子节点，那么我们直接判断 **targetSum 是否等于 val** 即可
（因为路径和已经确定，就是当前节点的值，我们只需要判断该路径和是否满足条件）。

若当前节点不是叶子节点，我们只需要递归地询问它的子节点是否能满足条件即可。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * DFS
 * 
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    if (root === null) return false
    // 找到叶子节点了，开始判断路径和
    if (root.left === null && root.right === null) {
        return targetSum === root.val
    }
    // 左右子树中，存在一个满足条件即可
    return hasPathSum(root.left, targetSum - root.val)
        || hasPathSum(root.right, targetSum - root.val)
};

时间复杂度：O(N)，其中 N 是树的节点数。对每个节点访问一次。

空间复杂度：O(H)，其中 H 是树的高度。空间复杂度主要取决于递归时栈空间的开销，
最坏情况下，树呈现链状，空间复杂度为 O(N)。
平均情况下树的高度与节点数的对数正相关，空间复杂度为 O(logN)。


/**
 * BFS
 * 
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    /**
        进行广度优先遍历，我们使用两个队列
        - 一个队列用于保存节点
        - 一个队列用于保存对应节点到根节点的路径和

        如果当前节点是叶子节点，则判断路径和是否等于 sum。

        使用栈也一样，只不过顺序不同而已，队列先遍历左子树，栈先遍历右子树
     */
    
    if (root === null) return false

    const queue = [root]
    const queueVal = [root.val]
    while (queue.length) {
        const cur = queue.shift()
        const curVal = queueVal.shift()

        // 找到叶子节点，并且判断当前存储的路径和是否等于目标值
        if (
            cur.left === null
            && cur.right === null
            && curVal === targetSum
        ) return true;

        // 每次遍历，将左右子树推入节点队列
        // 将子树的值 加上上一层的节点值，推入到路径和队列
        if (cur.left) {
            queue.push(cur.left)
            queueVal.push(cur.left.val + curVal)
        }
        if (cur.right) {
            queue.push(cur.right)
            queueVal.push(cur.right.val + curVal)
        }
    }

    return false
};

时间复杂度：O(N)，其中 N 是树的节点数。对每个节点访问一次。

空间复杂度：O(N)，其中 N 是树的节点数。
空间复杂度主要取决于队列的开销，队列中的元素个数不会超过树的节点数。

```
