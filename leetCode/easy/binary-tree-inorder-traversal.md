## 94. 二叉树的中序遍历

### 题意

给定一个二叉树的根节点 root ，返回它的 中序 遍历。

### 难度

⭐

### 示例

**示例 1：**

```javascript
输入：root = [1,null,2,3]
输出：[1,3,2]
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
var inorderTraversal = function(root) {
    /**
        首先我们需要了解什么是二叉树的中序遍历：
        按照访问左子树 —— 根节点 —— 右子树的方式遍历这棵树，
        而在访问左子树或者右子树的时候我们按照同样的方式遍历，直到遍历完整棵树。

        PS：根节点的访问顺序对应着 X序遍历 中的 X
        
        因此整个遍历过程天然具有递归的性质，我们可以直接用递归函数来模拟这一过程。

        定义 midOrder(root) 表示当前遍历到 root 节点的答案，
        那么按照定义，我们只要递归调用 midOrder(root.left) 来遍历 root 节点的左子树，
        然后将 root 节点的值加入答案，再递归调用midOrder(root.right) 来遍历 root 节点的右子树即可，
        
        递归终止的条件为碰到空节点。
    
     */
    let res = []

    const midOrder = root => {
        if (!root) return

        midOrder(root.left)
        res.push(root.val)
        midOrder(root.right)
    }
    
    midOrder(root)
    return res
};

时间复杂度：O(n)，其中 nn 为二叉树节点的个数。
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
var inorderTraversal = function(root) {
    /**
    
        递归的实现比较简单，但是不能光是记忆而不去理解
        我们不能含糊地记说：“中序遍历是先访问左子树，再访问根节点，再访问右子树”
        这么描述是不准确的，容易产生误导。

        因为无论是前、中、后序遍历，都是先访问根节点，再访问它的左子树，再访问它的右子树。
        区别在哪里？
        比如中序遍历，它是将 do something with root（处理当前节点）放在了访问完它的左子树之后。
        比方说，打印节点值，就会产生「左 根 右」这样的打印顺序。

        前、中、后序遍历都是基于 DFS，
        每个节点有 **三个不同的驻留阶段**，即每个节点会被经过三次：
        - 在递归它的左子树之前。
        - 在递归完它的左子树之后，在递归它的右子树之前。
        - 在递归完它的右子树之后。

        我们将 do something with root 放在这三个时间点之一，就分别对应了：前、中、后序遍历。
        所以，它们的唯一区别是：在什么时间点去处理节点，去拿他做文章。

        中序遍历的伪代码：
        inorder (root) {
            call inorder(root.left) 
            access the content of root  访问根目录的内容
            call inorder(root.right)
        }

        搞清楚概念后，怎么用栈去模拟递归遍历，并且是中序遍历呢？

        DFS 一棵树，先递归节点 A，再递归左子节点 B，再递归左子节点 D，一个个压入递归栈。
        也就是说，先不断地将左节点（左子树）压入栈，即：

        while (root) {
            stack.push(root);
            root = root.left;
        }

        DFS的访问顺序是：根节点、左子树、右子树
        所以现在要访问栈中的节点的右子树了。

        并且是先访问 『位于树的底部的』 即 『位于栈的顶部的』 节点的右子树。
        于是让栈顶节点出栈，出栈的同时，把它的右子节点压入栈，相当于去递归右子节点。

        因为是中序遍历，在栈顶节点的右子节点压栈之前，要处理出栈节点的节点值，将它输出。

        新入栈的右子节点（右子树），就是对它递归。和节点 A、B、D 的压栈一样，它们都是子树。
        递归不同的子树要做一样的事情，一样要先将它的左子节点不断压栈，然后再出栈，再带出右子节点入栈。

        即栈顶出栈的过程，也要包含下面代码，可见下面代码重复了两次：

        while (root) {
            stack.push(root);
            root = root.left;
        }

        其实这两个循环，分别对应了下面的两次 inorder 调用，就是递归压栈：

        inorder(root.left);
        res.push(root.val);
        inorder(root.right);

        参考自：笨猪爆破组

     */
    
    const res = [];
    const stack = [];

    // 能压入栈的左子节点都压进来
    while (root) {
        stack.push(root);
        root = root.left;
    }

    while (stack.length) {
        // 栈顶的节点出栈
        let node = stack.pop();

        // 在压入右子树之前，处理它的数值部分（因为中序遍历）
        res.push(node.val);

        // 获取当前节点的右子树，如果存在右子树，继续对子树做 从左向右 的查询
        node = node.right;
        while (node) {
            // 压入当前root
            stack.push(node);
            // 不断压入左子节点 
            node = node.left;
            // 其实就是不断遍历 子树 的过程
        }
    }
    
    // 在理解的时候，多参照 DFS 还有 其三个不同的驻留阶段 来参照
    // 切记，在遍历二叉树的时候，我们总是从 根节点 再访问它的左子树 再访问它的右子树 这样一个顺序
    return res;
};

时间复杂度：O(n)，其中 nn 为二叉树节点的个数。
二叉树的遍历中每个节点会被访问一次且只会被访问一次。

空间复杂度：O(n)。
空间复杂度取决于栈深度，而栈深度在二叉树为一条链的情况下会达到 O(n) 的级别。

```
