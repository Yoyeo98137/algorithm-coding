

  ## 17. 电话号码的字母组合

  ### 题意

  给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

  给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

  2: abc  
  3: def  
  4: ghi  
  5: jkl  
  6: mno  
  7: pqrs  
  8: tuv  
  9: wxyz  

  ### 难度

  ⭐⭐⭐⭐

  ### 示例

  **示例一：**

  ```javascript
  输入：digits = "23"
  输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
  ```

  **示例二：**

  ```javascript
  输入：digits = ""
  输出：[]
  ```

  **示例三：**

  ```javascript
  输入：digits = "2"
  输出：["a","b","c"]
  ```

  ### 提示

  - 0 <= digits.length <= 4
  - digits[i] 是范围 ['2', '9'] 的一个数字。

  ### 考察

  哈希表、字符串、回溯

  ### 实现

  ```javascript
  思路：

  对于回溯：
  回溯本质是暴力搜索，在问题的解空间树中，用 DFS 的方式，从根节点出发搜索整个解空间。
  如果要找出所有的解，则要搜索整个子树，如果只用找出一个解，则搜到一个解就可以结束搜索。

  「找出所有可能的组合」的问题，适合用回溯算法。

  作者：xiao_ben_zhu
  @see：https://leetcode-cn.com/problems/
  letter-combinations-of-a-phone-number/solution/
  shou-hua-tu-jie-liang-chong-jie-fa-dfshui-su-bfsya/

  实现上，首先维护一个队列。
        
  起初让空字符串入列，让当前层的字符串逐个出列，出列的字符串，会构建它下一层的新字母串，并入列。

  一层层地，考察到 数字串 的最末位，就到了最底一层，
  此时队列中存的是所有构建完毕的字母串，返回 queue 即可。

  这里控制了层序遍历的深度，为 digits 的长度，而不是 while(queue.length){...} 那样让所有的节点入列出列，
  最后还会剩下最后一层节点，留在 queue 中返回。

  /**
   * @param {string} digits
   * @return {string[]}
   */
  var letterCombinations = function(digits) {

    if (!digits.length) return []

    const map = new Map([
      ['2', 'abc'],
      ['3', 'def'],
      ['4', 'ghi'],
      ['5', 'jkl'],
      ['6', 'mno'],
      ['7', 'pqrs'],
      ['8', 'tuv'],
      ['9', 'wxyz'],
    ])

    const queue = []
    // 从空字符串开始，把空字符串作为 “根节点” 入列
    queue.push('')

    /*
      BFS 参数即 digits 长度
      比如 '23'
      就是先取出 2 存在的字母作为开始，再去匹配 3 中存在的所有字母，直到两个数字代表的字母都匹配完成

      想象下树的层序遍历：
                2    
        a       b       c
        3       3       3
      d e f   d e f   d e f

      而队列，就是我们存储每一条结果的地方
    */
    for (let i = 0; i < digits.length; i++) {
      // 当前层的节点个数
      const leverSize = queue.length;

      // 逐个出列当前层的节点
      for (let j = 0; j < leverSize; j++) {
        // shift ''
        // shift 'a', 'b', 'c'
        const curStr = queue.shift()

        // get 2 --> abc
        // get 3 --> def
        const letters = map.get(digits[i])

        // 生成新的字母组合入列
        for (const str of letters) {
            // push '' + 'a/b/c'
            // push 'a' + 'd/e/f'
            // push 'b' + 'd/e/f'
            // push 'c' + 'd/e/f'
            queue.push(curStr + str)
        }
      }
    }

    return queue;
  };

  时间复杂度：遍历所有节点，最坏的情况去到 O(4^n)，n 为数字串的长度。
  空间复杂度：O(m+n)，
  其中 m 是输入中对应 3 个字母的数字个数，n 是输入中对应 4 个字母的数字个数，m+n 是输入数字的总个数。
  即递归的最大层数
  ```

