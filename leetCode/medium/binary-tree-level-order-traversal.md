## 102. 二叉树的层序遍历

### 题意

给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

### 难度

⭐⭐⭐

### 示例

二叉树：[3,9,20,null,null,15,7],
```javascript
    3
   / \
  9  20
    /  \
   15   7
```

返回其层序遍历结果：
```javascript
[
  [3],
  [9,20],
  [15,7]
]
```

### 考察

树、广度优先搜索、二叉树

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
 * BFS from [笨猪爆破组]
 *
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    /**
    

        BFS: 
        广度优先搜索算法（Breadth-First Search，缩写为 BFS），又称为宽度优先搜索，是一种图形搜索算法。
        简单的说，BFS 是从根结点开始，沿着树的宽度遍历树的结点。
        如果所有结点均被访问，则算法中止。

        通过结果观察，我们需要构建一个 二维数组 res
        res 的长度代表着树的层数，每一项（层）存储每一层包含的树节点

        我们需要去遍历整棵树的所有节点，这时需要一个数据结构来保存 每一层的树节点
        我们希望，每次添加新节点的时候，旧节点就已经处理好了，这是天然的 先进先出 规则
        所以借助一个 队列 来维护每一层的树节点

        思路：
        - 遍历每一层的节点，将所有节点值推入 subRes 数组中
        - 将 subRes 数组再推入 res 数组中

        怎么获取每一层的节点？
        - 我们已知的是 根节点，就它一个
        - 通过它可以 “找出” 第 2 层的所有节点 即 当前节点 ---> 当前节点下一层包含的所有节点 
        - 通过第 2 层的节点可以 “找出” 所有第 3 层的节点
        - 继续遍历 直到遍历完整颗树即找到 最后一层的节点

        怎么存储每一层的节点？
        - 我们需要用一个数据结构存储每一层的节点
        - 且我们希望在某一刻 新层节点全进来了，旧层节点也全出去了
        - 队列 的 先进先出 天然符合要求
        - 于是维护一个 queue 队列，是 层序遍历 的特征

        总结
        - queue 初始时为 [root] ，代表第 1 层
        - 开启 while 循环，对当前层的节点进行遍历
        - 当前层的节点逐个出列，节点值推入 subRes 数组
        - 判断如果当前出列节点有子节点，让子节点入列
        - 本层的节点出列，下层的进来，下次循环时，queue 中全是新层的节点，没有旧层的节点
        - while 循环终止的条件是 queue 队列空了，节点遍历完了

     */
    
    if (!root) return []

    let res = []
    // 队列保证了我们遍历整颗树中的所有节点，我们从头节点开始，所以初始化时 push 头节点进去
    let queue = [root]

    // 当没有节点在列的时候，就是遍历完毕的时候
    while (queue.length) {
        // 保留当前层的节点数目，因为在后面的循环中，队列的长度是动态变更的
        const len = queue.length
        let subRes = []

        for (let i = 0; i < len; i++) {
            // 每次先将队头出列
            const curNode = queue.shift()

            // 推入保存着 当前层的节点 数组中
            subRes.push(curNode.val)

            // 如果当前节点存在子树，将子树的左右节点入列
            if (curNode.left) queue.push(curNode.left)
            if (curNode.right) queue.push(curNode.right)
        }

        // 查找完当前层的所有节点后，将保存着的节点组推入到 res
        res.push(subRes)
    }

    return res
};

时间复杂度：每个点进队出队各一次，故渐进时间复杂度为 O(n)。
空间复杂度：队列中元素的个数不超过 n 个，故渐进空间复杂度为 O(n)。

```
