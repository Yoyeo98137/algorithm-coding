## 242. 有效的字母异位词

### 题意

给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

### 难度

⭐

### 示例

**示例 1：**

```javascript
输入: s = "anagram", t = "nagaram"
输出: true
```

**示例 2：**

```javascript
输入: s = "rat", t = "car"
输出: false
```

### 提示

- 1 <= s.length, t.length <= 5 * 10^4
- s 和 t 仅包含小写字母

### 考察

哈希表、字符串、排序

### 实现

```javascript

/**
 * 哈希
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false

    // 创建哈希表
    const map = new Map()

    for (let i = 0; i < s.length; i++) {
        // 遍历第一个字符串，通过哈希表记录各字符出现次数
        if (map.has(s[i])) {
            map.set(s[i], map.get(s[i]) + 1)
        } else {
            map.set(s[i], 1)
        }
    }

    for (let j = 0; j < t.length; j++) {
        // 遍历第二个字符串，对哈希表存储的字符进行清理
        if (map.has(t[j])) {
            // 之前只存有 1 个，直接删除
            if (map.get(t[j]) === 1) {
                map.delete(t[j])
            } else {
                // 之前存有 多个，减一
                map.set(t[j], map.get(t[j]) - 1)
            }
        } else return false
    }

    // 如果哈希表还存在内容，则表示两个字符串的字符出现次数不同
    return !map.size
};

时间复杂度：O(n)，其中 n 为 s 的长度。
空间复杂度：O(S)，其中 S 为字符集大小，此处 S=26。


/**
 * 利用 数组 + 字符的 Unicode 代替哈希表
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    /**
    
        由于该题满足：s 和 t 仅包含小写字母，则可以直接借助 数组 来完成
    
     */
    
    if (s.length !== t.length) return false

    let arr = new Array(26).fill(0)

    for (let i = 0; i < s.length; i++) {
        // 97 是小写字母 a 的 Unicode 码
        arr[s[i].charCodeAt() - 97]++
    }

    for (let j = 0; j < t.length; j++) {
        arr[t[j].charCodeAt() - 97]--
    }

    // 如果最后数组中仍然由 26 个 0 组成，则说明两个字符串包含的字符出现次数相同
    return arr.filter(ele => ele === 0).length === 26
};

时间复杂度：O(n)，其中 n 为 s 的长度。
空间复杂度：O(S)，其中 S 为字符集大小，此处 S=26。

```

进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？

> 采用 哈希表 实现