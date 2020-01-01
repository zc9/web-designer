export default class History {
  curIndex: number = -1
  data: Array<any> = []
  constructor() {
  }
  add(o) {
    if (this.curIndex < this.data.length - 1) {
      this.data.splice(this.curIndex + 1)
      this.curIndex = this.data.length - 1
    }
    this.curIndex++
    this.data.push(o)
  }
  hasForward() {
    return this.curIndex < this.data.length - 1
  }
  hasBack() {
    return this.curIndex > 0
  }

  forward() {
    if (this.hasForward()) {
      return this.data[++this.curIndex]
    }
    return null
  }
  back() {
    if (this.hasBack()) {
      return this.data[--this.curIndex]
    }
    return null
  }
}
