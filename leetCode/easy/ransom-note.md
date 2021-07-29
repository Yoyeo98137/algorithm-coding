## 383. 赎金信

### 题意

给定一个赎金信 (ransom) 字符串和一个杂志(magazine)字符串，判断第一个字符串 ransom 能不能由第二个字符串 magazines 里面的字符构成。如果可以构成，返回 true ；否则返回 false。

(题目说明：为了不暴露赎金信字迹，要从杂志上搜索各个需要的字母，组成单词来表达意思。杂志字符串中的每个字符只能在赎金信字符串中使用一次。)

### 难度

⭐

### 示例

**示例 1：**

```javascript
输入：ransomNote = "a", magazine = "b"
输出：false
```

**示例 2：**

```javascript
输入：ransomNote = "aa", magazine = "ab"
输出：false
```

**示例 3：**

```javascript
输入：ransomNote = "aa", magazine = "aab"
输出：true
```

### 考察

哈希表、字符串、计数

### 实现

```javascript

/**
 * 哈希
 *
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    /**

        1 遍历 magazine，用哈希表记录 magazine 各字符出现次数
        2 遍历 ransomNote，去哈希表查询对应字符，并扣除相应次数
        3 如果无法查询到所有的所需字符 输出 false
    
     */
    
    const map = new Map()

    for (let i = 0; i < magazine.length; i++) {
        map.set(
            magazine[i],
            map.has(magazine[i]) ? map.get(magazine[i]) + 1 : 1
        )
    }

    for (let j = 0; j < ransomNote.length; j++) {
        // 这里用 get 通过 0 判断 false
        if (!map.get(ransomNote[j])) return false

        map.set(
            ransomNote[j],
            map.get(ransomNote[j]) - 1
        )
    }

    return true

    ############################## or ##############################

    let hash = {};

    // 遍历赎金信字符串，记录字符空缺
    for (let i = 0; i < ransomNote.length; i++) {
        const value = ransomNote[i];
        hash[value] ? hash[value]++ : hash[value] = 1;
    }

    // 遍历杂志字符串，填补空缺
    for (let i = 0; i < magazine.length; i++) {
        const value = magazine[i];
        if (hash[value]) {
            hash[value]--;
        }
    }

    // 最后查看哈希表
    for (let key in hash) {
        // 如果有空缺没填满，说明赎金信还有字符存在，则返回false
        if (hash[key]) {
            return false;
        }
    }

    return true;
};

时间复杂度：O(n)
空间复杂度：O(hash.length)

/**
 * 遍历 + 字符串替换
 *
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    /**

        遍历ransomNote，若ransomNote中的字符在magazine可以找到则替换掉生成新的magazine
        若ransomNote任意字符在magazine不存在则返回false，反之返回true
    
     */

    for (let i = 0; i < ransomNote.length; i++) {
        if (magazine.indexOf(ransomNote[i]) === -1) {
            return false
        }

        magazine = magazine.replace(ransomNote[i], "")
    }

    return true
};

// PS: indexOf 代表着一次遍历，所以我觉得是 n2 的复杂度
时间复杂度：O(n)
空间复杂度：O(1)

```
