## 20. 有效的括号

### 题意

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。

### 难度

⭐

### 示例

**示例 1：**

```javascript
输入：s = "()"
输出：true
```

**示例 2：**

```javascript
输入：s = "()[]{}"
输出：true
```

**示例 3：**

```javascript
输入：s = "(]"
输出：false
```

**示例 4：**

```javascript
输入：s = "([)]"
输出：false
```

**示例 5：**

```javascript
输入：s = "{[]}"
输出：true
```

### 考察

栈、字符串

### 实现

```javascript

/**
 * 栈（配合哈希）
 *
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    /**
        判断括号的有效性可以使用「栈」这一数据结构来解决。
        
        我们遍历给定的字符串 s。
        当我们遇到一个左括号时，我们会期望在后续的遍历中，有一个相同类型的右括号将其闭合。
        由于后遇到的左括号要先闭合，因此我们可以将这个左括号放入栈顶。

        当我们遇到一个右括号时，我们需要将一个相同类型的左括号闭合。
        此时，我们可以取出栈顶的左括号并判断它们是否是相同类型的括号。

        如果不是相同的类型，或者栈中并没有左括号，那么字符串 s 无效，返回 False。
        为了快速判断括号的类型，我们可以使用哈希表存储每一种括号。
        
        哈希表的键为右括号，值为相同类型的左括号。
        在遍历结束后，如果栈中没有左括号，说明我们将字符串 s 中的所有左括号闭合，返回 True，否则返回 False。
        
        注意到有效字符串的长度一定为偶数，因此如果字符串的长度为奇数，我们可以直接返回 False，省去后续的遍历判断过程。
     */
    
    const len = s.length
    if (len % 2 === 1) return false

    const pairs = new Map([
        // key, value
        [')', '('],
        ['}', '{'],
        [']', '[']
    ])
    const stk = []

    for (let ch of s) {
        // 识别到了 键值 即 需要闭合的右括号
        if (pairs.has(ch)) {
            // 如果不是相同的类型，或者栈中并没有左括号，那么字符串 s 无效，可以直接返回 False
            if (
                !stk.length ||
                // 通过 get 去查值 即拿到 需要匹配的左括号
                stk[stk.length - 1] !== pairs.get(ch)
            ) {
                return false
            }
            // 否则对括号进行闭合（清理）
            stk.pop()
        } else {
            stk.push(ch)
        }
    }

    return !stk.length
};

时间复杂度：O(n)，其中 nn 是字符串 ss 的长度。
空间复杂度：O(n + Σ)，其中 Σ 表示字符集，本题中字符串只包含 6 种括号，Σ = 6。
栈中的字符数量为 O(n)，而哈希表使用的空间为 O(Σ)，相加即可得到总空间复杂度。

/**
 * 很好的一个思路，匹配正确的括号对
 *
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    /**
    
        找到最内层的正确括号对，然后进行消除，重复此过程
        若存在无法消除的字符则说明字符串无效

     */
    if (s.length % 2) return false

    while (s.length) {
        const temp = s
        // 查找括号并清理
        s = s.replace('()', '')
        s = s.replace('[]', '')
        s = s.replace('{}', '')
        // 如果相等则说明没有括号被清理掉，此字符串无效
        if (s === temp) return false
    }

    return true
};

```
