## 剑指 Offer 39. 数组中出现次数超过一半的数字

### 题意

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。


### 难度

⭐⭐

### 示例

**示例一：**

```javascript
输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
输出: 2
```

### 注意

本题与力扣 169 题相同：https://leetcode-cn.com/problems/majority-element/

### 考察

数组、哈希表、分治、计数、排序

### 实现

```javascript
思路：
找众数

/**
 * Boyer-Moore 投票算法
 * 
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    /**
        如果我们把众数记为 +1，把其他数记为 −1，将它们全部加起来，显然和大于 0，
        从结果本身我们可以看出众数比其他数多。

        官解的 O(1) 空间复杂度算法
     */
    
    let ans = 0,  // 众数
        count = 0;  // 当前标记的 众数 出现的次数

    for (let i = 0; i < nums.length; i++) {
        // 当前标记众数的次数为 0 时，说明之前记录的 “众数” 已经被清理掉了
        // 就要定义一个新的 “众数” 并重新记录出现次数
        // 如果这个新的 “众数” 的出现次数在遍历完后并没有被清理掉
        // 说明它就是当前数组中出现最多的数字即 众数
        if (count === 0) {
            ans = nums[i];
            count++;

        } else count += nums[i] === ans ? 1 : -1;
    }
    
    return ans;
};
时间复杂度：O(n)。Boyer-Moore 算法只对数组进行了一次遍历。
空间复杂度：O(1)。Boyer-Moore 算法只需要常数级别的额外空间。

/**
 * 哈希表
 * 
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    const len = nums.length
    const map = new Map()

    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            map.set(nums[i], map.get(nums[i]) + 1)
        } else {
            map.set(nums[i], 1)
        }
    }

    for (let [key, val] of map.entries()) {
        if (val > Math.floor(len / 2)) {
            return key
        }
    }
};

时间复杂度： O(n)
空间复杂度： O(n)

```
