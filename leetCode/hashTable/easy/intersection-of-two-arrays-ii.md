

  ## 350. 两个数组的交集 II

  ### 题意

  给定两个数组，编写一个函数来计算它们的交集。

  ### 难度

  ⭐⭐

  ### 示例

  **示例一：**

  ```javascript
  输入：nums1 = [1,2,2,1], nums2 = [2,2]
  输出：[2,2]
  ```

  **示例二：**

  ```javascript
  输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
  输出：[4,9]
  ```

  ### 说明

  - 输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。
  - 我们可以不考虑输出结果的顺序。

  ### 进阶

  - 如果给定的数组已经排好序呢？你将如何优化你的算法？
  - 如果 nums1 的大小比 nums2 小很多，哪种方法更优？
  - 如果 nums2 的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？

  ### 考察

  数组、哈希表、双指针、二分查找、排序

  ### 实现

  ```javascript
  思路：
  哈希表计数，如果是有序的则可以利用双指针遍历

  /**
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number[]}
   */
  var intersect = function(nums1, nums2) {
    // 为了降低空间复杂度，优先遍历较短的数组并在哈希表中记录每个数字以及对应出现的次数
    if (nums1.length > nums2.length) return intersect(nums2, nums1) 

    const map = new Map()
    const res = []

    // 第一次遍历，记录较小的数组中的数字出现次数
    for (let i = 0; i < nums1.length; i++) {
      if (map.has(nums1[i])) {
        map.set(nums1[i], map.get(nums1[i]) + 1)
      } else {
        map.set(nums1[i], 1)
      }
    }

    // 第二次遍历，去匹配出现过的数字
    for (let j = 0; j < nums2.length; j++) {
      if (map.get(nums2[j]) > 0) {
        res.push(nums2[j])
        map.set(nums2[j], map.get(nums2[j]) - 1)
      }
    }

    return res
  };

  时间复杂度：O(m+n)
  空间复杂度：O(min(m,n))

  /**
   * @param {number[]} nums1
   * @param {number[]} nums2
   * @return {number[]}
   */
  var intersect = function(nums1, nums2) {
    // 如果给定的数组已经排好序呢？你将如何优化你的算法？
    // 排序 + 双指针
    // PS: 这个结果是已经排好序的，然后就过不了力扣的第 35 个测试用例 :(
    nums1.sort((a, b) => a - b)
    nums2.sort((a, b) => a - b)

    let i1 = 0;
    let i2 = 0;
    const res = []

    // 当一个指针越界了，就退出遍历
    while (i1 < nums1.length && i2 < nums2.length) {
      if (nums1[i1] === nums2[i2]) {
        res.push(nums1[i1]);
        i1++;
        i2++;
      } else {
        nums1[i1] < nums2[i2] ? i1++ : i2++;
      }
    }
    
    return res;
  };

  时间复杂度：O(mlogm+nlogn)
  空间复杂度：O(min(m,n))
  ```

### 结语

如果 nums2 的元素存储在磁盘上，磁盘内存是有限的，并且你不能一次加载所有的元素到内存中。  
那么就无法高效地对 nums2 进行排序，因此推荐使用方法一而不是方法二。  

在方法一中 nums2 只关系到查询操作，因此每次读取 nums2 中的一部分数据，并进行处理即可。  


