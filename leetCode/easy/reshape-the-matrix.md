## 88. 重塑矩阵

### 题意

在MATLAB中，有一个非常有用的函数 reshape，它可以将一个矩阵重塑为另一个大小不同的新矩阵，但保留其原始数据。

给出一个由二维数组表示的矩阵，以及两个正整数r和c，分别表示想要的重构的矩阵的行数和列数。

重构后的矩阵需要将原始矩阵的所有元素以相同的行遍历顺序填充。

如果具有给定参数的reshape操作是可行且合理的，则输出新的重塑矩阵；否则，输出原始矩阵。

### 难度

⭐⭐

### 示例

**示例 1：**

```javascript
输入: 
nums = 
[[1,2],
 [3,4]]
r = 1, c = 4
输出: 
[[1,2,3,4]]
解释:
行遍历nums的结果是 [1,2,3,4]。新的矩阵是 1 * 4 矩阵, 用之前的元素值一行一行填充新矩阵。
```

**示例 2：**

```javascript
输入: 
nums = 
[[1,2],
 [3,4]]
r = 2, c = 4
输出: 
[[1,2],
 [3,4]]
解释:
没有办法将 2 * 2 矩阵转化为 2 * 4 矩阵。 所以输出原矩阵。
```

### 考察

数组、矩阵、模拟

### 注意

- 给定矩阵的宽和高范围在 [1, 100]。
- 给定的 r 和 c 都是正数。

### 实现

```javascript

/**
 * @param {number[][]} mat
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var matrixReshape = function(mat, r, c) {
    /**
    
        暴力破解

        1. 先将二维数组转化为一维数组
        2. 判断给定的r和c能不能重构成新数组，若不能，直接返回原数组
        3. 根据 c 来重塑每一行里有多少列
        4. 根据 r 来重塑共有多少行

     */

    let flatMat = []

    // 扁平数组
    for (let i = 0; i < mat.length; i++) {
        flatMat.push(...mat[i])
    }

    // 判断是否能够重塑矩阵
    if (r * c !== flatMat.length) return mat

    // 一共有 r 行
    for (let row = 0; row < r; row++) {
        let items = []
        // 每行 c 列
        for (let col = 0; col < c; col++) {
            // 将 c 个元素从头部拿出，并放入暂存的 items 数组
            items.push(flatMat.shift(flatMat[row]))
        }
        // 当前行的列数收集完成，推入数组尾部
        flatMat.push(items)
    }

    return flatMat
};

时间复杂度：O(rc)。
空间复杂度：O(r+c)。

/**
 * from 笨猪爆破组
 *
 * @param {number[][]} mat
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var matrixReshape = function(nums, r, c) {
    /**
    
        题意：将二维数组，转成 r 行 c 列的新二维数组

        1 维护新矩阵的行、列变量，遍历原矩阵，元素填到新矩阵。
        2 注意更新行、列变量，当行达到 c 限制，就“换行”，填下一行的第一个。
    
     */

    const m = nums.length;    
    const n = nums[0].length;

    if (r * c !== m * n) return nums;

    // 构建重塑矩阵res
    const res = new Array(r).fill(0).map(() => new Array(c).fill(0))

    let newR = 0,
        newC = 0;
    // 遍历原矩阵的行
    for (let i = 0; i < m; i++) {
        // 遍历当前行的元素
        for (let j = 0; j < n; j++) {
            // 当前元素 填给 res[newR][newC]
            res[newR][newC] = nums[i][j]
            newC++                // 准备填同一行的下一个元素
            if (newC == c) {      // 达到宽度限制，该“换行”
                newR++            // 准备填下一行
                newC = 0          // newC 归零
            }
        }
    }

    return res;
};

/**
 * 暴力 + 数学公式
 *
 * @param {number[][]} mat
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var matrixReshape = function(nums, r, c) {
    /**
    
        数学解法

        先判断给出的矩阵长度是否等于 r*c，不等于则直接返回原矩阵
        
        接下来要生成新的矩阵，这里有个规律，
        在每一个新矩阵对应的位置，可以先计算出此时是第几个元素 current，
        然后根据 current 在原数组中找出是第几行第几列（这样应该比较好理解）

        计算一下可以得出有这么个映射关系:
        curIndex = i * c + j
        res[i][j] = nums[ Math.floor(curIndex / n) ][ curIndex % n ]

        这里的 c 是目标矩阵允许的最大列数，n 是原矩阵的最大列数
        为什么都是基于 列 来做判断，这样来想，实际情况肯定是由多少列来形成一行，而不是一列有多少行

        Math.floor(curIndex / n)
        计算 n 基于 curIndex 的倍数，然后向下取整则得出了当前行

        curIndex % n
        假设 n = 4 则存在 0 % 4 = 0 / 1 % 4 = 1 / 2 % 4 = 2 / 3 % 4 = 3 / 4 % 4 = 0 / 5 % 4 = 1
        这就是 模 的妙用，实现 重置列数 的功能

     */
    
    const m = nums.length;
    const n = nums[0].length;

    if (r * c !== m * n) return nums

    let res = [];
    for (let i = 0; i < r; i++) {
        let items = []
        for (let j = 0; j < c; j++) {
            let curIndex = i * c + j
            let fromI = Math.floor(curIndex / n)
            let fromJ = curIndex % n

            items[j] = nums[fromI][fromJ]
        }
        res.push(items)
    }

    return res
};


```
