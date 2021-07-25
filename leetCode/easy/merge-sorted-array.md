## 88. 合并两个有序数组

### 题意

给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。你可以假设 nums1 的空间大小等于 m + n，这样它就有足够的空间保存来自 nums2 的元素。

### 难度

⭐⭐

### 示例

**示例 1：**

```javascript
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
```

**示例 2：**

```javascript
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
```

### 考察

数组、双指针、排序

### 实现

```javascript

/**
 * 逆向双指针
 * 
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    /**
        通过题意所示，我们可以使用暴破，双指针+额外存储空间来完成该题，
        但是这两种做法的空间和时间复杂度至少都是 O(m+n) 。

        这个时候我们就要分析，为什么告诉我们 nums1.length >= m + n ?

        很明显就能猜出出题者的意图，那就是考查 原地修改 ，将空间复杂度降低到 O(1)。
        因为这样不需要使用额外的数组空间了，我们完全可以把 nums2 也放入 nums1 中。

        原地修改时，为了避免 从前往后 遍历导致原有数组元素被破坏掉，我们要选择 从后往前 遍历！

        所以，我们总共需要创建三个指针，两个指针用于指向 nums1 和 nums2 的初始化元素数量的末位，
        也就是分别指向 m−1 和 n−1 的位置，
        
        还有一个指针，我们指向 nums1 数组末位即可。

        想象出三个队列：
        - 第一个，nums1 的有效空间即 0 到 m - 1
        - 第二个，nums2 的有效空间即 0 到 n - 1
        - 第三个，总共的有效空间，由题意知 nums1 的长度能够足够容纳 m + n
          则总共的有效空间就是 nums1 的总长度 0 到 nums1[length - 1]
     */
    
    // 定义所需的三个指针，我们从后往前遍历，所以以各自的长度作为临界点
    let i1 = m - 1,
        i2 = n - 1,
        i3 = nums1.length - 1;
    
    // 保证遍历完 nums1 和 nums2 的各自有效空间
    while (i1 >= 0 || i2 >= 0) {
        // 由于 i3 是基于整个有效空间的指针，所以无论执行什么操作，该指针都需要进一来表示一次遍历
        // 注意是先取值即先输出值再减减
        const lastIndex = i3--
        if (i1 < 0) {
            // 队列一遍历结束，推动指针二
            nums1[lastIndex] = nums2[i2--]
        } else if (i2 < 0) {
            // 队列二遍历结束，推动指针一
            nums1[lastIndex] = nums1[i1--]
        } else if (nums1[i1] < nums2[i2]) {
            // 队列一的值小于队列二
            // 将队列二的值递补到队列三
            nums1[lastIndex] = nums2[i2--]
        } else {
            nums1[lastIndex] = nums1[i1--]
        }
    }

    return nums1
};

时间复杂度：O(m+n)。
指针移动单调递减，最多移动 m+n 次，因此时间复杂度为 O(m+n)。

空间复杂度：O(1)。
直接对数组 nums1 原地修改，不需要额外空间。

```
