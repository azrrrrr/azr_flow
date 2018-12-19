// 使用
//
// 1. 注释的方法

// @flow
var a /*: number*/= 10 ;
// a = 'str'; // 会报错
console.log(a);


// 2. 代码的方法

// @flow
function sum(n1:number,n2:number): number{
  return n1+n2;
}
sum(1,2);
// sum(1,'a');  // 会报错
