---
layout:     post
title:      Static Type Checker For JavaScript
subtitle:   Flow能够给JavaScript提供静态类型检查的能力，其实就是为javascript添加了一个编译过程。
date:      2018-12-26
author:     Azr
header-img: img/post-bg-universe.jpg
catalog: true
tags:
    - JavaScript
    - Flow
    - 静态类型检查
---


> Flow.js 是工具，它提供的类型标注语言是一门语言，但 Flow.js 本身并不是一门语言。

## Link

* [官网](https://flow.org/)

## Flow

### 特点

1. 类型接口

   Flow 使用类型接口查找错误，甚至不需要任何类型声明。 它也能够准确地跟踪变量的类型，就像运行时那样。

2. JS 风格

   Flow 专为 JS 程序员设计。 它能够理解常用 JS 方言和极具动态的特性

3. 实时反馈

   Flow 能立刻检测代码变化，在开发 JS 时提供快速不断地反馈

### 定义

> FLOW IS A STATIC TYPE CHECKER FOR JAVASCRIPT.

`Flow`是`FACEBOOK`公司开发的一个JS静态类型检查工具。

需要注意的是，和`TypeScript`不同的是，`Flow`只是一个类型检查工具、而`TypeScript`是编程语言！且相较于`TypeScript`而言，`Flow`的学习成本会比较低，使用起来也会相对简单一些。

### 作用

Flow可以为JS提供静态类型的能力。

Flow可以检查出JS中的类型错误，Flow允许逐步为JS代码添加类型，不需要一次性更改所有的代码。

## 使用

### 安装Flow

```bash
$ npm i flow-bin -D
```

### 命令行工具

1. 在`package.json`中添加相应的`scripts`执行`flow`命令

```json
{
  "name": "my-project",
  "main": "lib/index.js",
  "scripts": {
    "build": "babel src/ -d lib/",
    "flow": "flow"
  }
}
```

2. 要先执行初始化，会创建一个`.flowconfig`的配置文件。

```bash
$ npm run flow init 
```

> 文件`.flowconfig`
>
> ```
> # 要忽略的文件
> [ignore]
> # 需要检查的文件
> [include]
> # 第三方库
> [libs]
> # 带代码进行实时效验
> [lints]
> 
> [options]
> 
> [strict]
> ```

3. 使用`npx`执行`flow`命令

```bash
$ npx flow
```

命令行工具很少使用，因为便捷程度较低。

### 为代码添加Flow类型

在代码中添加类型的方式有两种：

1. 注释型：这种方式不会对代码产生任何影响，JS代码可以正常运行，但是代码结构会因为注释内容的存在降低可读性。
2. 代码型（推荐）：这种方式会改变JS代码结构，需要配合babel使用才可正常运行

> 不论哪种形式，都需要为文件添加 `// @flow` 标记, 这样后台的flow进程才会对该文件进行类型检查
>
> 标记还可以书写为 `/* @flow */`
>
> 如果不想给所有文件都添加标记，又想flow对文件进行类型检查则在启动flow时需要使用命令`flow check --all`

### 示例

> 文件 index.js 

注释型示例代码：

```javascript
// @flow
var a /*: number*/= 10 ;
a = 'str';
console.log(a);

```

控制台报错显示，说明参数传入的类型是不对的。 

```bash
> flow


Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ index.js:3:5

Cannot assign 'str' to a because string [1] is incompatible with number [2].

     1│ // @flow
 [2] 2│ var a /*: number*/= 10 ;
 [1] 3│ a = 'str';
     4│ console.log(a);
     5│
```

-------

代码型示例代码：

```bash
// @flow
function sum(n1:number,n2:number): number{
  return n1+n2;
}
sum(1,2);
sum(1,'a');
```

控制台报错显示，说明参数传入的类型是不对的。 

```
> flow


Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ index.js:10:7

Cannot call sum with 'a' bound to n2 because string [1] is incompatible with number [2].

 [2]  2│ function sum(n1:number,n2:number): number{
      3│   return n1+n2;
      4│ }
      5│ sum(1,2);
 [1]  6│ sum(1,'a');
      7│


```

## 配合babel转码

### 案例

文件`index.js`

1. 先通过注释的方法添加类型

    ```javascript
    let a /*: number*/ = 10;
    a = "abc";
	```

2. 使用命令`node  src/index.js`检查代码是不是可以正常运行

3. 更改为数据添加类型

   ```javascript
   let a: number = 10;
   a = 100;
   ```

   控制台显示：

   ```bash
   ➜  flow node src/index.js
   ....
   let a: number = 10;
        ^
   
   SyntaxError: Unexpected token :
   .... 
   ```

   如果要运行上面的代码，在运行之前需要通过babel进行转码操作

> 如果给数据添加类型声明是通过代码型的方式，直接修改的js代码，那么代码是不能正常运行的。
>
> 需要通过`babel`对代码进行转码之后才能正常运行。

### 安装

```bash
$ npm i babel-cli babel-preset-flow -D
```

### 命令行工具

1. 配置`package.json`，增加`build`

   ```json
   {
     "name": "flow",
     "version": "1.0.0",
     "description": "",
     "main": "index.js",
     "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "flow": "flow",
       "build": "babel ./src -d ./dist"
     },
     "keywords": [],
     "author": "Azr",
     "license": "ISC",
     "devDependencies": {
       "babel-cli": "^6.26.0",
       "babel-preset-flow": "^6.23.0",
       "flow-bin": "^0.89.0"
     }
   }
   
   ```

2. 配置`babel`，建立`.babelrc`文件。 

   ```
   {
       "presets": [
           "flow"
       ]
   }
   ```

3. 修改目录结构。

   ```
   
       ┌───────── src  ─────────index.js
       │			   
       │	
       ├───────── dist ─────────index.js  --- 自动生成的。 
       │			   
       │	
       ├───────── .babelrc
       │
       ├───────── .flowconfig 
       │
       └───────── package.json
   
   
   ```

4. 运行`npm run build`，检查下`dist`目录，控制台会显示以下内容。

   ```bash
   ➜  flow npm run build                       
   
   > flow@1.0.0 build /Users/amor/Desktop/flow
   > babel ./src -d ./dist
   
   src/index.js -> dist/index.js
   
   ```

## 数据类型

| 序号 | 类型     | 说明                                                         |
| ---- | -------- | ------------------------------------------------------------ |
| 01   | Number   | 数字、NaN、Infinity                                          |
| 02   | String   | 字符串                                                       |
| 03   | Boolean  | True/False                                                   |
| 04   | Null     | 只有Null                                                     |
| 05   | Void     | Undefined                                                    |
| 06   | Array    | 1. 使用`Array<T>`形式，T为指定的类型，特定类型的数据组成的数组  <br />2. 在声明数据为数组类型的时候，需要为数组指定元素的类型 |
| 07   | Any      | 表示任意类型，这个类型尽量少用，但有时又很有用               |
| 08   | Function | 函数类型                                                     |
| 09   | Object   | 由于对象比较自由，规定对象类型的时候有多种写法               |
| 10   | Maybe    | 允许我们声明一个包含Null和Undefined两个潜在类型的值          |
| 11   | 或操作   | 可以设置一个变量为多种可能的类型 `类型1|类型2|类型3`         |
| 12   | 类型推断 | Flow会尝试自行推断某个数据的类型                             |

### 案例

```javascript
// @flow

// 1. number
let a:number = 100;
let b:string = NaN; // 会报错
let b:number = NaN;
let c:number = Infinity;

// 2. string
let str:string ='abc';
let str:string =123; // 会报错

// 3. boolean
let t:boolean = true;
let f:boolean = false;

// 4. void
let v:void = undefined;

// 5. null
let n:null = null;
let n1:null = ' '; // 会报错

// 6. Array
// 在声明数据为数组类型的时候，我们需要为数组指定元素的类型
let arr:Array<string> =['a','b']

// 7. any
// 不确定是什么类型
let name: any = 123;
name = '123';

let arr1:Array<any> =['a','b',1]

// 8. Function
// 参数a和参数b是number类型。返回值也是number类型、
function sum(a:number,b:number): number {
  return a+b;
}
sum(1,2)
sum('a',1) // 会报错

let func:(a:number, b: number) => string = sum; //返回的类型不一样会报错
let func:(a:number, b: number) => number = sum;

// 可以将变量声明为函数类型
// 也就意味着我们可以指定为变量赋值的函数的类型


// ajax 函数需要一个回调函数 date 为对象  不需要返回值
function ajax(callback: (data: Object) => void) {

}
// 用户在调用ajax的时候  必须传递一个回调函数  否则就报错。
// 记得参数类型要对应   Object
ajax(function (obj: Object) {

})

// 10 . Maybe
// 场景：  有一个may的函数  自己去调用自己。
function may(a) {
  console.log(a)
}
// 要求：  如果用户不传递a参数的话，默认是0。
function may1(a: number) {
  a = a || 0;
  console.log(a)
}
may1(10)
may1()
// 在执行may1()的时候报错。 使用maybe类型
function may2(a: ?number) {
  a = a || 0;
  console.log(a)
}
may2(10)
may2()

// Maybe类型相当于给数据添加了两个可能的类型null和void

// 11. 或操作

let a: number = 10;
a = "abc";
// 要求： a的类型可以是数字  也可是是字符串
let a1: number | string = 10;
a1 = 'asdff';
a1 = {}; //报错 数据类型不一致

// 12. 类型推断

function test(a: number, b: number) {
  return a + b;
}

let c: string = test(1, 2);

```

```javascript
// 9. Object
// @flow
function greet(obj) {
  obj.sayHi();
}

var o = {
  name: 'MI'
};

greet(o);

// 对obj 进行规定  必须有sayHi的方法  才可以传递。
function greet1(obj: {sayHi: () => void}) {
  obj.sayHi();
}

var o = {
  name: 'MI'
};

var m = {
  name: 'asdf',
  sayHi() {
    console.log('123')
  }
}
greet1(o); // 会报错  参数不符合
greet1(m);
```

## 避免过于复杂的错误处理逻辑

```javascript
/**
*
*@param {*} arr 传递一个数组进来，数组中包含数字
* 函数计算出数组中所有数字的和，进行返回
*
*/
function sum(arr){
  // 检查函数调用时是否参数正确
  if(!arr) {
    throw new Error('此函数需要传递一个数组作为参数')
  }
  // 检查函数调用时传出的参数是否为数组
  if(!Array.isArray(arr)) {
    throw new Error('此函数需要传递一个数组作为参数')
  }
  // 检查用户传递进来的参数数组，是否为数字数组
  if(!arr.every(v => typeof v == "number")){
    throw new Error('此函数需要传递一个数组作为参数,数组中的元素需要全部为数字')
  }
  let result = 0 
  arr.forEach(v => {
    result += v
  })
  return result
  
}
sum([1,2,3])
sum()

//使用flow来写
// @flow
function sum(arr: Array<number>) {
    let result = 0 
  arr.forEach(v => {
    result += v
  })
  return result
  
}
```

## 代码

[Github](https://github.com/azrrrrr/azr_flow/tree/master)

## 完

本文首次发布于 [Azr的博客](http://amor9.cn), 作者 [@azrrrrr](https://github.com/azrrrrr/) ,转载请保留原文链接.

原文链接： [http://amor9.cn/2018/12/26/flow](http://amor9.cn/2018/12/26/flow)
