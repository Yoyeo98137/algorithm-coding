## 73. 矩阵置零

### 题意

给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。

**进阶：**

- 一个直观的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
- 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
- 你能想出一个仅使用常量空间的解决方案吗？

### 难度

⭐⭐⭐⭐

### 示例

**示例 1：**

```javascript
输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
输出：[[1,0,1],[0,0,0],[1,0,1]]
```

**示例 2：**

```javascript
输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
```

### 考察

数组、哈希、矩阵

### 实现

```javascript

/**
 * 方法一：使用两个标记数组
 *
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    /**
        我们可以用 两个标记数组 分别记录 每一行 和 每一列 是否有零出现。
        具体地，我们首先遍历该数组一次，
        如果某个元素为 0，那么就将该元素所在的行和列所对应标记数组的位置置为 true。
        最后我们再次遍历该数组，用标记数组更新原数组即可。
     */

    const m = matrix.length;
    const n = matrix[0].length;
    const rowArr = new Array(m).fill(false)
    const colArr = new Array(n).fill(false)

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                // 如果当前位置出现 0
                // 则涉及的 当前行数 以及 当前列数 都标记为 true
                rowArr[i] = colArr[j] = true
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rowArr[i] || colArr[j]) {
                // 识别被标记的 对应行 和 对应列，更新数组
                matrix[i][j] = 0
            }
        }
    }
};
时间复杂度：O(mn)，其中 m 是矩阵的行数，n 是矩阵的列数。我们至多只需要遍历该矩阵两次。
空间复杂度：O(m+n)，其中 m 是矩阵的行数，n 是矩阵的列数。我们需要分别记录每一行或每一列是否有零出现。


/**
 * 方法二：使用两个标记变量
 * 
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    /**
    
        我们可以用矩阵的 第一行 和 第一列 代替方法一中的两个标记数组，以达到 O(1) 的额外空间。
        但这样会导致原数组的第一行和第一列被修改，无法记录它们是否原本包含 0。
        因此我们需要额外使用两个标记变量分别记录第一行和第一列是否原本包含 0。

        在实际代码中，我们首先预处理出两个标记变量，接着使用其他行与列去处理第一行与第一列，
        然后反过来使用第一行与第一列去更新其他行与列，最后使用两个标记变量更新第一行与第一列即可。

     */

    const m = matrix.length;
    const n = matrix[0].length;
    let fristRow0 = false,
        fristCol0 = false;
    
    // 遍历每一行
    for (let i = 0; i < m; i++) {
        // 如果每一行的第一列存在 0
        // 则说明第一列需要全部置 0
        if (matrix[i][0] === 0) {
            fristCol0 = true
        }
    }

    // 遍历每一列
    for (let j = 0; j < n; j++) {
        // 如果第一行的其中一列存在 0
        // 则说明第一行需要全部置 0
        if (matrix[0][j] === 0) {
            fristRow0 = true
        }
    }

    // 遍历整个数组
    // 将第一行/第一列交给 fristRow0/fristCol0 处理，所以我们从 1 开始遍历
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                // 当前值为 0 时
                // 将当前值的所在行、所在列做上标记
                // 结合坐标系就好理解了
                matrix[i][0] = matrix[0][j] = 0
            }
        }
    }

    // 遍历整个数组
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // 当前行的第一列 或者 当前列的第一行 为 0 时
            // 将这一整行 整列置为 0
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0
            }
        }
    }

    // 如果数组的第一行原本就包含 0
    // 则把第一行的每一列都置为 0
    if (fristRow0) {
        // 遍历每一列
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0
        }
    }
    // 如果数组的第一列原本就包含 0
    // 则把第一列的每一行都置为 0
    if (fristCol0) {
        // 遍历每一行
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0
        }
    }
};

时间复杂度：O(mn)，其中 m 是矩阵的行数，n 是矩阵的列数。我们至多只需要遍历该矩阵两次。
空间复杂度：O(1)。我们只需要常数空间存储若干变量。


/**
 * 使用一个标记变量
 *
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    /**
        
        我们可以对方法二进一步优化，只使用一个标记变量记录第一列是否原本存在 0。
        这样，第一列的 第一个元素 即可以标记 第一行 是否出现 0。
        
        但为了防止每一列的第一个元素被提前更新，我们需要从最后一行开始，倒序地处理矩阵元素。

        比如下面这个矩阵：

        [0,1,2,0],
        [3,4,5,2],
        [1,3,1,5]

        按照算法三, 我们之所以要从后面开始处理, 是因为如果我们先处理了第一行那么矩阵变成了

        [0,0,0,0],
        [3,4,5,2],
        [1,3,1,5]

        第一行的第二列和第三列的 0 元素影响了下面的 4, 5 和 3, 1

        但是其实这两个 0 不是本来存在的, 而是处理之后出现的
        所以我们通过倒序来处理, 就不会被这两个 0 影响了
     */

    const m = matrix.length;
    const n = matrix[0].length;
    let fristCol0 = false;

    // 注意与方法二的差别，这里的 i（行数）是从 0 开始标记的
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            fristCol0 = true
        }
        // 而 j（列数）因为有 fristCol0 的单独处理，则是从 1 开始标记的
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = matrix[0][j] = 0
            }
        }
    }

    for (let i = m - 1; i >= 0; i--) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0
            }
        }
        if (fristCol0) {
            matrix[i][0] = 0
        }
    }
};

时间复杂度：O(mn)，其中 m 是矩阵的行数，n 是矩阵的列数。我们至多只需要遍历该矩阵两次。
空间复杂度：O(1)。我们只需要常数空间存储若干变量。


```
