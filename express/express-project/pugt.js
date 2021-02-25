const pug = require('pug')

const compiledFunction = pug.compileFile('name.pug');

// 渲染一组数据
console.log(compiledFunction({
  name: '李莉'
}));
// "<p>李莉的 Pug 代码！</p>"

// 渲染另外一组数据
console.log(compiledFunction({
  name: '张伟'
}));
// "<p>张伟的 Pug 代码！</p>"

console.log(pug.render('p siry'))