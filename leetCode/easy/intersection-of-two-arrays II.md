## 350. 两个数组的交集 II

### 题意

给定两个数组，编写一个函数来计算它们的交集。

### 难度

⭐

### 示例

**示例 1：**

```javascript
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2,2]
```

**示例 2：**

```javascript
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[4,9]
```

**示例 3：**

```javascript
输入：nums = [3,3], target = 6
输出：[0,1]
```

### 标签

数组、哈希表、双指针、二分查找

### 实现

```javascript

/**
 * 哈希表
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    let map = new Map(),
        res = [];
    
    // 遍历第一个数组，通过哈希表记录各值出现的次数
    for (let i = 0; i < nums1.length; i++) {
        if (map.has(nums1[i])) {
            // 出现过，则出现次数 + 1
            map.set(nums1[i], map.get(nums1[i]) + 1)
        } else {
            // 第一次出现，赋值为 1
            map.set(nums1[i], 1)
        }
    }

    // 遍历第二个数组，通过哈希表检查是否存在相同值
    for (let j = 0; j < nums2.length; j++) {
        // 这里用的是 get，以此对于出现次数减到零的时候的 false 判断
        if (map.get(nums2[j])) {
            // 如果存在相同值，则将对于的出现次数 - 1，然后将值推入结果数组
            map.set(nums2[j], map.get(nums2[j]) - 1)
            res.push(nums2[j])
        }
    }

    return res
};

时间复杂度：O(m+n)
其中 m 和 n 分别是两个数组的长度。
需要遍历两个数组并对哈希表进行操作，哈希表操作的时间复杂度是 O(1)，
因此总时间复杂度与两个数组的长度和呈线性关系。

空间复杂度：O(min(m,n))
其中 m 和 n 分别是两个数组的长度。
对较短的数组进行哈希表的操作，哈希表的大小不会超过较短的数组的长度。
为返回值创建一个数组 intersection，其长度为较短的数组的长度。


/**
 * 排序 + 双指针
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    nums1.sort((a, b) => a - b)
    nums2.sort((a, b) => a - b)

    // 初始时，两个指针分别指向两个数组的头部。每次比较两个指针指向的两个数组中的数字
    let i1 = 0,
        i2 = 0,
        res = [];

    // 当至少有一个指针超出数组范围时，遍历结束
    while (i1 < nums1.length && i2 < nums2.length) {
        // 如果两个数字相等，将该数字添加到答案，并将两个指针都右移一位
        if (nums1[i1] === nums2[i2]) {
            res.push(nums1[i1])
            i1++
            i2++
        
        // 如果两个数字不相等，则将指向较小数字的指针右移一位
        } else if (nums1[i1] < nums2[i2]) {
            i1++
        } else {
            i2++
        }
    }

    return res
};

时间复杂度：O(mlogm+nlogn)
其中 m 和 n 分别是两个数组的长度。对两个数组进行排序的时间复杂度是 O(mlogm+nlogn)，
遍历两个数组的时间复杂度是 O(m+n)，因此总时间复杂度是 O(mlogm+nlogn)。

空间复杂度：O(min(m,n))
其中 m 和 n 分别是两个数组的长度。
为返回值创建一个数组 intersection，其长度为较短的数组的长度。

```

### 进阶

- 如果给定的数组已经排好序呢？你将如何优化你的算法？
- 如果 nums1 的大小比 nums2 小很多，哪种方法更优？
- 如果 nums2 的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？

如果 nums2 的元素存储在磁盘上，磁盘内存是有限的，并且你不能一次加载所有的元素到内存中。
那么就无法高效地对 nums2 进行排序，因此推荐使用方法一而不是方法二。

在方法一中，nums2 只关系到查询操作，因此每次读取 nums2 中的一部分数据，并进行处理即可。
