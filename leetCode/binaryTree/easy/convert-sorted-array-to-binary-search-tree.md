## 108. 将有序数组转换为二叉搜索树

### 题意

给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。

**高度平衡** 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。


### 难度

⭐

### 示例

**示例一：**

```javascript
输入：nums = [-10,-3,0,5,9]
输出：[0,-3,9,-10,null,5]
解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案
```

**示例二：**

```javascript
输入：nums = [1,3]
输出：[3,1]
解释：[1,3] 和 [3,1] 都是高度平衡二叉搜索树。
```

### 考察

树、二叉树、二叉搜索树、数组、分治

### 实现

```javascript
思路：
- 构建一棵树包括：构建 root、构建 root.left 和 root.right
- 题目要求 “高度平衡” ———— 构建 root 时，选数组的中间元素作为 root 节点值，即可保证平衡
- 递归函数的可以传数组，也可以传指针，前者每次都要切割数组

我选择指针：start、end，分别代表参与构建 BST 的数组的首尾索引。

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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    // 递归入口
    return buildBST(nums, 0, nums.length - 1);
};

const buildBST = (nums, start, end) => {
    // 构成不了 左闭右闭区间
    if (start > end) return null;

    // 求中间索引
    // 直接 (start + end) / 2 会存在数值越界问题即两个数都为 maxNumber 的时候
    const mid = Math.floor(start + (end - start) / 2);
    // 构建当前树的根节点
    const root = new TreeNode(nums[mid]);
    // 构建左右子树
    root.left = buildBST(nums, start, mid - 1);
    root.right = buildBST(nums, mid + 1, end);

    return root;
}

时间复杂度：O(n)，其中 n 是数组的长度。每个数字只访问一次。

空间复杂度：O(logn)，其中 n 是数组的长度。
空间复杂度不考虑返回值，因此空间复杂度主要取决于递归栈的深度，递归栈的深度是 O(logn)。

```
