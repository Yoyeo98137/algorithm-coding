
// CommonJS
const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const template = require('./template')

const ui = new inquirer.ui.BottomBar()

// Get paths: D:\Code\git-store\algorithm-coding\leetCode
const root = path.resolve(__dirname, '../../leetCode')
const tagSelet = []
const levelSelet = ['easy', 'medium', 'hard']
const files = fs.readdirSync(root);

for (const file of files) {
  !levelSelet.includes(file) && tagSelet.push(file)
}

// console.log
ui.log.write('🏄 # node-write start!');
ui.log.write('🏄 # node-write working...');
ui.log.write('');

inquirer.prompt([
	{
		type: 'input',
		name: 'filename',
		message: 'Enter the file name do you want',
		default: 'demo'
	},
	{
		type: 'list',
		name: 'tagName',
		message: 'selet your doc tag',
    choices: tagSelet,
		default: 0
	},
	{
		type: 'list',
		name: 'levelName',
		message: 'selet your difficulty',
    choices: levelSelet,
		default: 0
	}
]).then(async answers => {
  const {
    filename, tagName, levelName
  } = answers
  
  ui.log.write('');
  ui.log.write('🏄 # writing...');
  ui.log.write('🏄 # writing...');
  ui.log.write('🏄 # writing...');
  ui.log.write('');

  await writeFile(root + '\\' + tagName + '\\' + levelName + '\\', travStr(filename))

  ui.log.write('');
	ui.updateBottomBar('🏄 # inquirer end.');

}).catch(err => {
  ui.log.write('🏄 inquirer.prompt # err: ' + err);
})

const writeFile = function(paths, name) {
  const n = name.split('.')
  if (n.length < 2) name = name + '.md'

  return new Promise((resolve, reject) => {
    /**
     * Error: EISDIR: illegal operation on a directory
     * errno: -4068
     * 引起上面报错的原因就是 filename 给错了，要么是漏了后缀名，要么是直接给的目录路径
     * 注意 fs 的语法： fs.writeFile(filename, data[, options], callback)
     */
    fs.writeFile(
      paths + name,
      template.template,
      async err => {
        if (err) {
          // Error: ENOENT: no such file or directory
          if (err.errno == '-4058') {
            // 识别到目录上的操作非法，即指定了一个不存在的目录路径
            ui.log.write('🏄 # Undefined directory was Read, now Go creating');
            ui.log.write('');
            ui.log.write('🏄 # Folder Creating...');
            ui.log.write('🏄 # Folder Creating...');
            ui.log.write('🏄 # Folder Creating...');
            ui.log.write('');
            
            // 新建指定目录，以及文件
            await writeFolder(paths)
            await writeFile(paths, name)
            resolve(true)
          }
          reject(err)

        } else {
          ui.log.write('🏄 # File written successfully!');
          resolve(true)
        }
      }
    )
  })
}

const writeFolder = function(paths) {
  return new Promise((resolve, reject) => {
    fs.mkdir(paths, err => {
      if (err) reject(err)

      ui.log.write('🏄 # Folder written successfully!');
      resolve(true)
    })
  })
}

const travStr = function(str) {
  // Two Num >>> two-num
  // Two Num II >>> two-num-II

  return str.split(' ')
    .map(ele => ele.toLocaleLowerCase())
    .join('-')
}
