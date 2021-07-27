## 118. 杨辉三角

### 题意

给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。

### 难度

⭐⭐

### 示例

**示例 1：**

```javascript
输入: numRows = 5
输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
```

**示例 2：**

```javascript
输入: numRows = 1
输出: [[1]]
```

### 考察

数组、动态规划

### 实现

```javascript

/**
 * 数学公式
 *
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    /**

        1
        1 1
        1 2 1
        1 3 3 1
        1 4 6 4 1

        ... ...

        得出公式：
        arr[r][c] = arr[r-1][c-1] + arr[r-1][c]
     */

    let res = []
    for (let i = 0; i < numRows; i++) {
        // 每一行的列数是当前行数 + 1，并填充初始值 1
        let current = new Array(i + 1).fill(1)
        // 因为每一行开始和结束的值都为 1，所以这里从 1 开始遍历，同时遍历到 结束的前一个节点 时结束
        for (let j = 1; j < current.length - 1; j++) {
            current[j] = res[i - 1][j - 1] + res[i - 1][j]
        }

        res.push(current)
    }

    return res
};

时间复杂度：O(numRows2)。
空间复杂度：O(1)。不考虑返回值的空间占用。

```
