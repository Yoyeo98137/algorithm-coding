## 219. 存在重复元素 II

### 题意

给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的 绝对值 至多为 k。

### 难度

⭐⭐

### 示例

**示例一：**

```javascript
输入: nums = [1,2,3,1], k = 3
输出: true
```

**示例二：**

```javascript
输入: nums = [1,0,1,1], k = 1
输出: true
```

**示例三：**

```javascript
输入: nums = [1,2,3,1,2,3], k = 2
输出: false
```

### 考察

数组、哈希表、滑动窗口

### 实现

```javascript
思路：
计数

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    /**
        判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]
        即：重复数

        并且 i 和 j 的差的 绝对值 至多为 k
        即：Math.abs(i - j) <= k
     */

    // 使用哈希表缓存遇到过数字的索引
    let map = new Map(); 

    // 遍历 nums，寻找满足条件的索引
    for (let i = 0; i < nums.length; i++) {
        // 如果当前数字在数组中出现过，且索引满足题目条件，则返回 true
        if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
            return true;
        }

        // 该题只要查找到满足条件的即可
        // 因此每次遍历都要更新缓存的索引，保证查找到的是最近的两个元素
        map.set(nums[i], i);
    }

    // 如果退出循环，表示未找到符合条件的元素，返回 false
    return false;
};

时间复杂度： O(n)
空间复杂度： O(n)

/**
 * 哈希（散列）表 + 滑动窗口 哈希也可以叫做散列表
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    // const set = new Set()

    // for (let i = 0; i < nums.length; i++) {
    //     if (set.has(nums[i])) return true

    //     set.add(nums[i])
    //     // set.size > k 代表着 i > k
    //     // 因为每循环一次，都会执行一次 add
    //     if (set.size > k) {
    //         // i = 1, k = 1
    //         // [1,0] 需要 移动窗口，向后移动
    //         set.delete(nums[i - k])
    //     }
    // }

    /**
        遍历数组，对于每个元素：
        - 在表中搜索当前元素，找到就返回 true
        - 在表中插入当前元素
        - 如果表的大小超过 k，删除表中最旧的元素 先进先出
     */

    // 数组的情况，更方便理解
    const arr = []

    for (let i = 0; i < nums.length; i++) {
        if (arr.includes(nums[i])) return true

        arr.push(nums[i])
        if (arr.length > k) {
            arr.shift()
        }
    }
    
    return false
};

时间复杂度：O(n)
我们会做 n 次 搜索，删除，插入 操作，每次操作都耗费常数时间。

空间复杂度：O(min(n,k))
开辟的额外空间取决于散列表中存储的元素的个数，也就是滑动窗口的大小 O(min(n,k))。

```
