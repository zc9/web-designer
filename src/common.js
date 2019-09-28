Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
/*
window.parseIntNative = window.parseInt
function parseInt(num) {
  if (num) {
     return window.parseIntNative(num)
  }
  return ''
}
window.parseInt = parseInt
*/

