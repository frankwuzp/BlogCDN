function r(from, to) {
  return ~~(Math.random() * (to - from + 1) + from);
}
function pick() {
  return arguments[r(0, arguments.length - 1)];
}
//定义字符串，参考 Unicode 编码集：
//https://unicode-table.com/cn/blocks/general-punctuation/
function getChar() {
  return String.fromCharCode(pick(
    //原有的注释掉：r(0x3041, 0x30ff), //日文平假名和片假名
    //原有的注释掉：r(0x2000, 0x206f), //常用标点（不建议使用）
    //原有的注释掉：r(0x0020, 0x003f), //数字和符号
    r(0x3105, 0x3129), //GB 2312 注音字母
    r(0x0021, 0x0040), //ASCII 标点和符号
    r(0x0061, 0x007A), //小写拉丁字母
    r(0x03B1, 0x03C9), //希腊字母（部分）
    r(0x1820, 0x1877), //蒙古文、满文
    r(0x1880, 0x18AA), //藏文和梵文
    r(0x4E00, 0x4E66), //中日韩统一表意文字（一笔部首）
    r(0x5196, 0X51C3), //中日韩统一表意文字（二笔部首）
    r(0xFE30, 0xFE44), //垂直变体符号-中日韩兼容形式
    r(0xFF01, 0xFF5E), //全角ASCII（大小写字母、数字和符号）
    r(0x7C73, 0x7C73), //米
    //r(0x65AF, 0x65AF), //斯
    //r(0x7279, 0x7279), //特
    //r(0x4E4C, 0x4E4C), //乌
    //r(0x9CB8, 0x9CB8), //鲸
    //r(0x9C7C, 0x9C7C), //鱼
  ));
}
function loop(fn, delay) {
  let stamp = Date.now();
  function _loop() {
    if (Date.now() - stamp >= delay) {
      fn(); stamp = Date.now();
    }
    requestAnimationFrame(_loop);
  }
  requestAnimationFrame(_loop);
}
class Char {
  constructor() {
    this.element = document.createElement('span');
    this.mutate();
  }
  mutate() {
    this.element.textContent = getChar();
  }
}
class Trail {
  constructor(list = [], options) {
    this.list = list;
    this.options = Object.assign(
      { size: 10, offset: 0 }, options
    );
    this.body = [];
    this.move();
  }
  traverse(fn) {
    this.body.forEach((n, i) => {
      let last = (i == this.body.length - 1);
      if (n) fn(n, i, last);
    });
  }
  move() {
    this.body = [];
    let { offset, size } = this.options;
    for (let i = 0; i < size; ++i) {
      let item = this.list[offset + i - size + 1];
      this.body.push(item);
    }
    this.options.offset =
      (offset + 1) % (this.list.length + size - 1);
  }
}
class Rain {
  constructor({ target, row }) {
    this.element = document.createElement('p');
    this.build(row);
    if (target) {
      target.appendChild(this.element);
    }
    this.drop();
  }
  build(row = 20) {
    let root = document.createDocumentFragment();
    let chars = [];
    for (let i = 0; i < row; ++i) {
      let c = new Char();
      root.appendChild(c.element);
      chars.push(c);
      if (Math.random() < .5) {
        loop(() => c.mutate(), r(1e3, 5e3));
      }
    }
    this.trail = new Trail(chars, {
      size: r(10, 30), offset: r(0, 100)
    });
    this.element.appendChild(root);
  }
  drop() {
    let trail = this.trail;
    let len = trail.body.length;
    let delay = r(10, 100);
    loop(() => {
      trail.move();
      trail.traverse((c, i, last) => {
        c.element.style = `
          color: hsl(136, 100%, ${85 / len * (i + 1)}%)
        `;
        if (last) {
          c.mutate();
          c.element.style = `
            color: hsl(136, 100%, 85%);
            text-shadow:
              0 0 .5em #fff,
              0 0 .5em currentColor;
          `;
        }
      });
    }, delay);
  }
}

const main = document.querySelector('main');
for (let i = 0; i < 50; ++i) {
  new Rain({ target: main, row: 50 });
}
