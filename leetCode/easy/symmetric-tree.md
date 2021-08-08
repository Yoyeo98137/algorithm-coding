## 101. 对称二叉树

### 题意

给定一个二叉树，检查它是否是镜像对称的。

### 难度

⭐

### 示例

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
```javascript
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
```javascript
    1
   / \
  2   2
   \   \
   3    3
```

### 考察

树、深度优先搜索、广度优先搜索、二叉树

### 进阶

你可以运用递归和迭代两种方法解决这个问题吗？

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
 * @return {boolean}
 */
var isSymmetric = function(root) {
    /**
    
        如果一个树是对称的，那它的左右子树就是镜像对称的
        那什么时候两棵树互为镜像呢？

        - 根节点的值相同
        - 一个树的右子树，和另一个树的左子树镜像对称
    
     */
  
    if (root === null) return true

    const nodeCheck = (left, right) => {
        /*
            a === b  // true if all null 两个相同的指针
            a === b === null  // false 两个相同的指针 去和 另一个指针进行比较
            a === null && b === null  // true 值对值的比较
        */
        if (left === null && right === null) return true

        if (left && right) {
            return left.val === right.val  // 根节点相同
                && nodeCheck(left.left, right.right)  // 左右子树镜像相同
                && nodeCheck(left.right, right.left)
        }

        // 只存在一个节点，肯定不是镜像对称
        return false
    }

    return nodeCheck(root.left, root.right)
};

时间复杂度：这里遍历了这棵树，渐进时间复杂度为 O(n)。
空间复杂度：这里的空间复杂度和递归使用的栈空间有关，这里递归层数不超过 n，故渐进空间复杂度为 O(n)。


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
 * @return {boolean}
 */
var isSymmetric = function(root) {
    /**
    
        引入一个队列，这是把递归程序改写成迭代程序的常用方法。

        初始化时我们将根节点入队两次
        每次提取两个节点并比较它们的值
        队列中每两个连续的节点应该是相等的，而且它们的子树应该要互为镜像

        然后将两个节点的左右子节点按相反的顺序插入队列中
        当队列为空，或者检测到树不对称的时候，算法结束

        这里就对应上了递归的子树比较的过程：

        n1.left === n2.right
        && n1.right === n2.left

        每轮入队两次的过程就对应了镜像比较，试问只存在一个元素的时候
        怎么来做镜像的对比呢

     */

    if (root === null) return true
    
    const queue = [root, root]

    while (queue.length) {
        const lRoot = queue.shift()
        const rRoot = queue.shift()

        if (lRoot === null && rRoot === null) continue

        if (
            (lRoot === null || rRoot === null)
            || (lRoot.val !== rRoot.val)
        ) return false

        queue.push(lRoot.left)
        queue.push(rRoot.right)

        queue.push(lRoot.right)
        queue.push(rRoot.left)
    }

    return true
};

时间复杂度：O(n)，同「方法一」。
空间复杂度：这里需要用一个队列来维护节点，每个节点最多进队一次，出队一次，
队列中最多不会超过 n 个点，故渐进空间复杂度为 O(n)。

```
