## 剑指 Offer II 032. 有效的变位词

### 题意

给定两个字符串 s 和 t ，编写一个函数来判断它们是不是一组变位词（字母异位词）。

**注意：** 若 s 和 t 中每个字符出现的次数都相同且字符顺序不完全相同，则称 s 和 t 互为变位词（字母异位词）。


### 难度

⭐⭐

### 示例

**示例一：**

```javascript
输入: s = "anagram", t = "nagaram"
输出: true
```

**示例二：**

```javascript
输入: s = "rat", t = "car"
输出: false
```

**示例三：**

```javascript
输入: s = "a", t = "a"
输出: false
```

### 进阶

如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？

### 注意

本题与力扣 242 题相似（字母异位词定义不同）：https://leetcode-cn.com/problems/valid-anagram/

### 考察

哈希表、字符串、排序

### 实现

```javascript
思路：
与字母异位词相似即两个字符出现的字母次数相同，多一个 两个字符不全等 的限制

/**
 * 排序
 * 
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s === t) return false

    // 根据字符的 Unicode 编码排序，如果出来的顺序完全相同，则满足题意
    s = [...s].sort((a, b) => a.charCodeAt() - b.charCodeAt())
    t = [...t].sort((a, b) => a.charCodeAt() - b.charCodeAt())

    return s.join('') === t.join('')
};
时间复杂度： O(nlogn)
空间复杂度： O(1)


/**
 * 哈希计数
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    // 注：s 和 t 中每个字符出现的次数都相同且字符顺序不完全相同
    // 所以加多一个限制条件：两个字符不全等
    if (s.length !== t.length || s === t) return false

    // 因为只存在小写字母，所以可用长度为 26 的数组模拟哈希表
    // 当定义固定长度的数组时，空间复杂度为 O(1)
    const map = new Map()

    // 遍历第一个字符，通过哈希记录个字母出现次数
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            map.set(s[i], map.get(s[i]) + 1)
        } else {
            map.set(s[i], 1)
        }
    }

    // 遍历第二个字符，通过比对哈希表来减数或者删除
    // 如果存在匹配不到的情况，直接退出
    for (let j = 0; j < t.length; j++) {
        if (map.has(t[j])) {
            map.get(t[j]) > 1
            ? map.set(t[j], map.get(t[j]) - 1)
            : map.delete(t[j]);

        } else return false;
    }

    return !map.size
};

时间复杂度： O(n)
空间复杂度： O(n)

```
