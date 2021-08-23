

  ## 387. 字符串中的第一个唯一字符

  ### 题意

  给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

  ### 难度

  ⭐

  ### 示例

  ```javascript
  s = "leetcode"
  返回 0

  s = "loveleetcode"
  返回 2
  ```

  ### 考察

  队列、哈希表、字符串、计数

  ### 实现

  ```javascript
  思路：
  遍历时记录元素下标，当元素重复出现时记录下标为 -1 代表重复出现

  /**
   * @param {string} s
   * @return {number}
   */
  var firstUniqChar = function(s) {
    /**
      第一次出现的时候，记录当前下标
      重复出现的时候，下标置为 -1 
    */
    const map = new Map()

    for (let i = 0; i < s.length; i++) {
      if (map.has(s[i])) {
        map.set(s[i], -1)

      } else {
        map.set(s[i], i)
      }
    }

    // 过滤其中记录为 -1 的下标
    const arr = [...map.values()].filter(ele => ele !== -1)
    // 找到剩余最小的下标，也就代表着 第一个不重复字符的下标了
    return arr.length ? Math.min(...arr) : -1
  };

  时间复杂度：O(n)，其中 n 是字符串 s 的长度。
  空间复杂度：O(|Σ|)，其中 Σ 是字符集，在本题中 s 只包含小写字母，因此 |Σ| ≤ 26。
  我们需要 O(|Σ|) 的空间存储哈希映射。
  ```

