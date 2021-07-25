## 1. 两数之和

### 题意

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

### 难度

⭐⭐

### 示例

**示例 1：**

```javascript
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

**示例 2：**

```javascript
输入：nums = [3,2,4], target = 6
输出：[1,2]
```

**示例 3：**

```javascript
输入：nums = [3,3], target = 6
输出：[0,1]
```

### 考察

数组、哈希表

### 实现

```javascript

/**
 * 暴力排序
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }

    return [-1]
};

时间复杂度：O(N2)，其中 N 是数组中的元素数量。最坏情况下数组中任意两个数都要被匹配一次。
空间复杂度：O(1)。

/**
 * 哈希表
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    /**
        利用哈希表：
        该题的重点就是查找 target - x

        map = new Map
        for [i, num] => nums
            if (target - num in map) return [map.get(target - num), i]
            map.set(num, i)

        return []

        注意到方法一的时间复杂度较高的原因是寻找 target - x 的时间复杂度过高。
        因此，我们需要一种更优秀的方法，能够快速寻找数组中是否存在目标元素。
        如果存在，我们需要找出它的索引。

        使用哈希表，可以将寻找 target - x 的时间复杂度降低到从 O(N) 降低到 O(1)。

        这样我们创建一个哈希表，对于每一个 x，我们首先查询哈希表中是否存在 target - x，
        然后将 x 插入到哈希表中，即可保证不会让 x 和自己匹配。
     */

    let map = new Map()

    for (let i = 0; i < nums.length; i++) {
        /**
            为什么是 target - nums[i] ？
            就是一个简单的加减法运算
                target = x + y
                   ↓
                target - x = y
                   ↓
                target - nums[i] = y

            我们每次能知道的就是目标值 target 以及当前值 nums[i]，通过这两个值来求最后的差值 y
            然后去映射表中查找是否存在这么一个 y 满足运算公式
            也就是 map.has(y) => map.has(target - nums[i])
         */
        if (map.has(target - nums[i])) {
            // 如果映射表中存在 target - x （注意我们在映射表中用的键是 值，就和这里对应上了）
            return [map.get(target - nums[i]), i]
        }
        /**
            为什么这里映射表的 [key, value] 是反过来记录 nums 的 [value, key] 结构
            题目中提到 数组中同一个元素在答案里不能重复出现
            所以以值作为哈希表的键时，遇到相同的目标值，最终就是覆盖下标的过程，而不会出现重复的答案值
         */
        map.set(nums[i], i)
        // 利用映射表存储结果值以及对应的下标
    }

    return []
};

时间复杂度：O(N)，其中 N 是数组中的元素数量。对于每一个元素 x，我们可以 O(1) 地寻找 target - x。
空间复杂度：O(N)，其中 N 是数组中的元素数量。主要为哈希表的开销。

```
