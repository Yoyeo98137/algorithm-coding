## 217. 存在重复元素

### 题意

给定一个整数数组，判断是否存在重复元素。

如果存在一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。

### 难度

⭐

### 示例

**示例 1：**

```javascript
输入: [1,2,3,1]
输出: true
```

**示例 2：**

```javascript
输入: [1,2,3,4]
输出: false
```

**示例 3：**

```javascript
输入: [1,1,1,3,3,4,3,2,4,2]
输出: true
```

### 考察

数组、哈希表、排序

### 实现

```javascript

/**
 * 排序
 * 
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] === nums[i + 1]) {
            return true;
        }
    }
    return false;
};

时间复杂度：O(NlogN)，其中 N 为数组的长度。因为需要对数组进行排序。
空间复杂度：O(logN)，其中 N 为数组的长度。注意我们在这里应当考虑递归调用栈的深度。

/**
 * 哈希表
 *
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    const map = new Map()
    // 减少使用 for of ，因为性能是最差的
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) return true
        map.set(nums[i], true) 
    }

    return false
};

时间复杂度：O(N)，其中 N 为数组的长度。
空间复杂度：O(N)，其中 N 为数组的长度。

```

> 哈希表拥有记数的功能，如果题目中包含字眼 至多xx次，至少xx次，唯一 等等字眼，  
> 都可以联想到用哈希表来解决