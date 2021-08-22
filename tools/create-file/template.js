
let template = `

  ## 填写题目

  ### 题意

  填写题意

  ### 难度

  ⭐

  ### 示例

  **示例一：**

  #9javascript
  填写示例
  #9

  **示例二：**

  #9javascript
  填写示例
  #9

  ### 进阶

  填写进阶处理

  ### 考察

  填写题类标签

  ### 实现

  #9javascript
  思路：
  填写思路

  Coding...

  时间复杂度：
  空间复杂度：
  #9

`

// md 的代码格式 ```javascript ``` 需要先将符号 ``` 进行转换，否则报错
template = template.replace(/#9/g, '```')

exports.template = template
