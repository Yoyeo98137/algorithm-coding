## 1. 两数之和

### 题意

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

### 难度

⭐

### 示例

**示例一：**

```javascript
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

**示例二：**

```javascript
输入：nums = [3,2,4], target = 6
输出：[1,2]
```

**示例三：**

```javascript
输入：nums = [3,3], target = 6
输出：[0,1]
```

### 进阶

你可以想出一个时间复杂度小于 O(n2) 的算法吗？

### 考察

数组、哈希表

### 实现

```javascript
思路：
找出 target - val

/**
 * 暴力枚举
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    /**
        双层循环，逐个比对
     */
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) return [i, j]
        }
    }

    return []

};

时间复杂度：O(N^2)，其中 N 是数组中的元素数量。
最坏情况下数组中任意两个数都要被匹配一次。

空间复杂度：O(1)。

/**
 * 哈希计数
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    /**
        - 每次循环，去哈希表中查找是否存在这样一个值：target - nums[i]
        - 如果没有，则把当前下标的值以 [nums[i], i] 的键值对形式存在哈希表中
        - 如果有，则将 [hash[target - nums[i]], i] 作为结果输出

        需要注意的是，我们存在表中的结构是 [nums[i], i]
        即匹配的时候以具体的值去匹配 target - val，然后把下标作为 输出的结果
     */
    
    const hash = new Map()

    for (let i = 0; i < nums.length; i++) {
        const val = nums[i];

        if (hash.has(target - val)) return [hash.get(target - val), i];
        else hash.set(val, i);
    }

    return []

};
时间复杂度：O(N)，其中 N 是数组中的元素数量。
对于每一个元素 x，我们可以O(1) 地寻找 target - x。

空间复杂度：O(N)，其中 N 是数组中的元素数量。主要为哈希表的开销。

```
