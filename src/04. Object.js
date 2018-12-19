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
