export function isEmpty(v) {
    switch (typeof v) {
    case 'undefined':
        return true;
    case 'string':
        if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
        break;
    case 'boolean':
        if (!v) return true;
        break;
    case 'number':
        if (0 === v || isNaN(v)) return true;
        break;
    case 'object':
        if (null === v || v.length === 0) return true;
        for (var i in v) {
            return false;
        }
        return true;
    }
    return false;
}

export function compareForm(form1, form2) {
  for (let k in form1) {
    if (form1[k] !== form2[k]) {
      return false;
    }
  }
  return true;
}
//生成随机数
export function setRanDom() {
  var c,
    d,
    e,
    f,
    b = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return c = b[Math.floor(62 * Math.random())],
    d = b[Math.floor(62 * Math.random())],
    e = b[Math.floor(62 * Math.random())],
    f = b[Math.floor(62 * Math.random())],
    c + d + e + f
}
//转化数子
export function valInt(a) {
  var b;
  return a && "" != a ? (b = parseInt(a, 10), !!isNaN(b) && (b = 0), b) : a
}
/*返回为空字符*/
export function valEmpty(v){
 return  isEmpty(v) ?  '' : v;
}
