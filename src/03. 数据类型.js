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

// 可以将变量声明为函数类型((data: Object) => void)
// 也就意味着我们可以指定为变量赋值的函数的类型
// ajax 函数需要一个回调函数 date 为对象  不需要返回值
function ajax(callback: (data: Object) => void) {

}
// 用户在调用ajax的时候  必须传递一个回调函数  否则就报错。
// 记得参数类型要对应   Object
ajax(function (obj: Object) {

})
//

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
