

  ## 剑指 Offer II 075. 数组相对排序

  ### 题意

  给定两个数组，arr1 和 arr2，

  - arr2 中的元素各不相同
  - arr2 中的每个元素都出现在 arr1 中

  对 arr1 中的元素进行排序，使 arr1 中项的相对顺序和 arr2 中的相对顺序相同。  
  未在 arr2 中出现过的元素需要按照升序放在 arr1 的末尾。

  ### 难度

  ⭐⭐

  ### 示例

  **示例一：**

  ```javascript
  输入：arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
  输出：[2,2,2,1,4,3,3,9,6,7,19]
  ```

  ### 提示

  - 1 <= arr1.length, arr2.length <= 1000
  - 0 <= arr1[i], arr2[i] <= 1000
  - arr2 中的元素 arr2[i] 各不相同
  - arr2 中的每个元素 arr2[i] 都出现在 arr1 中

  ### 考察

  数组、哈希表、计数排序、排序

  ### 实现

  ```javascript
  思路：
  计数、排序

  /**
   * @param {number[]} arr1
   * @param {number[]} arr2
   * @return {number[]}
   */
  var relativeSortArray = function(arr1, arr2) {

    const map = new Map()
    const res = []

    // 第一次遍历，通过哈希记录数组一中每个元素的出现次数
    for (let i = 0; i < arr1.length; i++) {
      if (map.has(arr1[i])) {
        map.set(arr1[i], map.get(arr1[i]) + 1)
      } else {
        map.set(arr1[i], 1)
      }
    }

    // 第二次遍历，根据数组二的顺序去读取哈希表，根据次数对结果数组进行填充
    for (let j = 0; j < arr2.length; j++) {
      const curHas = arr2[j]
      if (map.has(curHas)) {
        while (map.get(curHas) > 0) {
          res.push(curHas)
          map.set(curHas, map.get(curHas) - 1)
        }
      }
    }

    const ccRes = []

    // 第三次遍历，检测当前记录数组一的哈希表中还没有被填值的元素进行添加
    for (const [k, v] of map.entries()) {
      let count = v
      while (count > 0) {
        ccRes.push(k)
        count--
      }
    }

    // 给没有出现在 arr2 的元素再进行排序
    return res.concat(ccRes.sort((a, b) => a - b))
  };

  时间复杂度：O(nlogn + nlogn) PS：与先的解法对比
  空间复杂度：O(n)

  /**
   * 由于题意存在前提 0 <= arr1[i], arr2[i] <= 1000
   * 我们可以利用 空间换取时间
   * 如果是建 map，则遍历 map 中值非 0 的 key，是无序的，还要 sort。
   * 我们可以开一个容量 1001 的数组 counts，它不止承载出现次数的信息，还承载数字大小的信息。
   * 因为数字作为索引存进去，索引就是升序排的 即「计数排序」
   *
   * @see: https://leetcode-cn.com/problems/relative-sort-array/solution/bu-shi-yong-sort-pai-xu-de-jie-fa-1122-shu-zu-de-x/
   */
  var relativeSortArray = function (arr1, arr2) {
    const counts = new Array(1001).fill(0);

    // 统计 arr1 数字的出现次数
    for (const n of arr1) {
      counts[n]++;
    }

    const res = [];
    for (const n of arr2) {
      // 出现次数 > 0，循环推入 res
      while (counts[n] > 0) {
        // 循环结束时，值变为 0
        res.push(n);	   
        counts[n]--;
      }
    }

    // 遍历 counts
    for (let i = 0; i < counts.length; i++) {
      // 非 0 项的索引 循环推入 res
      while (counts[i] > 0) {
        res.push(i);
        counts[i]--;
      }
    }
    return res;
  };

  时间复杂度：O(nlogn) 可以节省掉一次 排序 的时间
  空间复杂度：O(n)

  ```

