export default class Draggable {
  EVENTS: Array<string> = []
  resizeFlags = [
    'n-resize', 'e-resize', 's-resize', 'w-resize',
    'ne-resize', 'nw-resize', 'se-resize', 'sw-resize'
  ]
  snapFlags = [
    'top_tt', 'top_bt', 'top_cc','top_bb', 'top_tb',
    'left_ll', 'left_rl', 'left_cc', 'left_rr', 'left_lr',
    'top_tc', 'top_bc', 'left_lc', 'left_rc'
  ]
  resizeFlag: string
  $el: any
  isDragging: boolean = false
  onStart: Function
  onStop: Function
  onResize: Function
  onSnap: Function
  onDrag: Function
  isResizing: boolean = false
  cursor: string = 'move'
  containment: any = null
  disabled: boolean = false
  handle: any = null
  snapTolerance: number = 10
  snap: any = false
  snapLineColor: string = '#FF4AFF'
  snapLineSize: number = 1
  snapAnchor: any = null
  snapLine: boolean = true
  snapDist: boolean = true
  axis: any = false
  minLeft: number = 0
  minTop: number = 0
  resizable: boolean = false
  resizeTolerance: number = 5
  minWidth: number = 24
  minHeight: number = 24

  constructor(el: any, opt = {}) {
    this.$el = el
    this.EVENTS = this.isTouch() ?
      ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup']
    this.init(opt)
  }

  init(opt) {
    if (typeof this.$el === 'string') {
      this.$el = document.querySelector(this.$el)
    }
    this.$el.style.position = 'absolute'
    this.$el.dragRef = this
    let classArr = this.$el.className.split(' ');
    classArr.push('draggable')
    this.$el.className = classArr.join(' ')

    this.option('containment', opt.containment)
    this.option('handle', opt.handle)
    this.option('snap', opt.snap)
    this.option('axis', opt.axis)
    this.option('snapAnchor', opt.snapAnchor)
    this.option('snapLineColor', opt.snapLineColor)
    this.option('snapTolerance', opt.snapTolerance)
    this.option('resizeTolerance', opt.resizeTolerance)
    this.option('cursor', opt.cursor)
    this.option('snapLine', opt.snapLine)
    this.option('snapDist', opt.snapDist)
    this.option('resizable', opt.resizable)
    this.option('minWidth', opt.minWidth)
    this.option('minHeight', opt.minHeight)
    this.option('minLeft', opt.minLeft)
    this.option('minTop', opt.minTop)

    this.setupEvent()
  }

  option(prop: string, val: any) {
    if (prop === 'containment') {
      if (typeof val !== 'undefined') {
        if (val === 'parent') {
          this.containment = this.$el.offsetParent
        } else {
          this.containment = val
        }
      }
    } else if (prop === 'handle') {
      if (typeof val === 'undefined') {
        this.handle = this.$el
      } else {
        if (typeof val === 'string') {
          this.handle = document.querySelector(val)
        } else {
          this.handle = val
        }
      }
    } else {
      if (typeof val !== 'undefined') {
        this[prop] = val
      }
    }
  }

  isTouch() {
    return 'ontouchstart' in window
  }

  stopPropagation(event) {
    window.event? window.event.cancelBubble = true : event.stopPropagation()
  }

  getEventInfo(event) {
    return this.isTouch() ? event.targetTouches[0] : event
  }

  checkResize(elem, x, y) {
    let rect = elem.getBoundingClientRect()
    let resizeTolerance = this.resizeTolerance
    let resizeFlags = this.resizeFlags
    if ((x >= rect.right - resizeTolerance && x <= rect.right) &&
      (y >= rect.top && y <= rect.top + resizeTolerance)) {
      return resizeFlags[4]
    }
    else if ((x >= rect.left && x <= rect.left + resizeTolerance) &&
      (y >= rect.top && y <= rect.top + resizeTolerance)) {
      return resizeFlags[5]
    }
    else if ((x >= rect.right - resizeTolerance && x <= rect.right) &&
      (y >= rect.bottom - resizeTolerance && y <= rect.bottom)) {
      return resizeFlags[6]
    }
    else if ((x >= rect.left && x <= rect.left + resizeTolerance) &&
      (y >= rect.bottom - resizeTolerance && y <= rect.bottom)) {
      return resizeFlags[7]
    }
    else if (y >= rect.top && y <= rect.top + resizeTolerance) {
      return resizeFlags[0]
    }
    else if (x >= rect.right - resizeTolerance && x <= rect.right) {
      return resizeFlags[1]
    }
    else if (y >= rect.bottom - resizeTolerance && y <= rect.bottom) {
      return resizeFlags[2]
    }
    else if (x >= rect.left && x <= rect.left + resizeTolerance) {
      return resizeFlags[3]
    }
    return null
  }

  darg(event) {
    let _this = this
    const EVENTS = this.EVENTS
    let diffX = 0, diffY = 0
    let elemWidth = 0, elemHeight = 0
    let windowWidth = 0, windowHeight = 0, parentWidth = 0, parentHeight = 0
    let eventInfo = _this.getEventInfo(event)
    _this.isDragging = true
    diffX = eventInfo.clientX - _this.$el.offsetLeft
    diffY = eventInfo.clientY - _this.$el.offsetTop
    elemWidth = _this.$el.offsetWidth
    elemHeight = _this.$el.offsetHeight
    windowWidth = document.documentElement.clientWidth
    windowHeight = document.documentElement.clientHeight
    parentWidth = this.containment ? this.containment.clientWidth : windowWidth
    parentHeight = this.containment ? this.containment.clientHeight : windowHeight
    document.addEventListener(EVENTS[1], move)
    document.addEventListener(EVENTS[2], end)
    function move(event) {
      let eventInfo = _this.getEventInfo(event)
      let left = eventInfo.clientX - diffX
      let top = eventInfo.clientY - diffY
      let minLeft = _this.minLeft
      let minTop = _this.minTop
      if (_this.containment) {
        if (left < minLeft) {
          left = minLeft
        }
        if (top < minTop) {
          top = minTop
        }
        if (left + elemWidth > parentWidth) {
          left = parentWidth - elemWidth
        }
        if (top + elemHeight > parentHeight) {
          top = parentHeight - elemHeight
        }
      }

      if (_this.axis !== 'y') {
        _this.$el.style.left = `${left}px`
      }

      if (_this.axis !== 'x') {
        _this.$el.style.top = `${top}px`
      }

      if (_this.snap) {
        _this.doSnap()
      }
      if (_this.onDrag) _this.onDrag(eventInfo)
    }
    function end(event) {
      let eventInfo = _this.getEventInfo(event)
      _this.isDragging = false
      document.removeEventListener(EVENTS[1], move)
      document.removeEventListener(EVENTS[2], end)
      if (_this.onStop) _this.onStop(eventInfo)
      _this.clearSnapLine()
    }
  }

  resize(event) {
    const EVENTS = this.EVENTS
    let that = this
    event = this.getEventInfo(event)
    let startX = event.clientX
    let startY = event.clientY
    let height = this.$el.offsetHeight
    let width = this.$el.offsetWidth
    let originHeight = height, originWidth = width
    let top = parseInt(this.getStyle(this.$el, 'top'))
    let left = parseInt(this.getStyle(this.$el, 'left'))
    let originTop = top
    let originLeft = left
    this.isResizing = true
    let windowWidth = document.documentElement.clientWidth
    let windowHeight = document.documentElement.clientHeight
    let parentWidth = this.containment ? this.containment.clientWidth : windowWidth
    let parentHeight = this.containment ? this.containment.clientHeight : windowHeight
    let minWidth = this.minWidth
    let minHeight = this.minHeight
    function resizeN(event) {
      let d = event.clientY - startY
      height -= d
      if (height < minHeight) {
        height = minHeight
      }
      if (height > originTop + originHeight) {
        height = originTop + originHeight
      }
      top += d
      if (top < 0) {
        top = 0
      }
      if(top > originTop + (originHeight - minHeight)) {
        top = originTop + (originHeight - minHeight)
      }
      that.$el.style.top = top + 'px'
      that.$el.style.height = height + 'px'
    }

    function resizeE(event) {
      width += event.clientX - startX
      if (width < minWidth) {
        width = minWidth
      }
      if (width > parentWidth - originLeft) {
        width = parentWidth - originLeft
      }
      that.$el.style.width = width + 'px'
    }
    function resizeS(event) {
      height += event.clientY - startY
      if (height < minHeight) {
        height = minHeight
      }
      if (height > parentHeight - originTop) {
        height = parentHeight - originTop
      }
      that.$el.style.height = height + 'px'
    }
    function resizeW(event) {
      width -= event.clientX - startX
      if (width < minWidth) {
        width = minWidth
      }
      if (width > originLeft + originWidth) {
        width = originLeft + originWidth
      }
      left += event.clientX - startX
      if (left < 0) {
        left = 0
      }
      if(left > originLeft + (originWidth - minWidth)) {
        left = originLeft + (originWidth - minWidth)
      }
      that.$el.style.left = left + 'px'
      that.$el.style.width = width + 'px'
    }

    function move(event) {
      event = that.getEventInfo(event)
      if (that.resizeFlag === that.resizeFlags[0]) {
        resizeN(event)
      }
      else if (that.resizeFlag === that.resizeFlags[1]) {
        resizeE(event)
      }
      else if (that.resizeFlag === that.resizeFlags[2]) {
        resizeS(event)
      }
      else if (that.resizeFlag === that.resizeFlags[3]) {
        resizeW(event)
      }
      else if (that.resizeFlag === that.resizeFlags[4]) {
        resizeN(event)
        resizeE(event)
      }
      else if (that.resizeFlag === that.resizeFlags[5]) {
        resizeN(event)
        resizeW(event)
      }
      else if (that.resizeFlag === that.resizeFlags[6]) {
        resizeS(event)
        resizeE(event)
      }
      else if (that.resizeFlag === that.resizeFlags[7]) {
        resizeS(event)
        resizeW(event)
      }
      startY = event.clientY
      startX = event.clientX
      if (that.onResize) {
        that.onResize()
      }
    }
    function end(event) {
      that.isResizing = false
      document.removeEventListener(EVENTS[1], move)
      document.removeEventListener(EVENTS[2], end)
    }

    document.addEventListener(EVENTS[1], move)
    document.addEventListener(EVENTS[2], end)
  }

  start(event) {
    event.preventDefault()
    this.stopPropagation(event)
    if (this.onStart) this.onStart(event)
    if (this.resizable && this.resizeFlag) {
      this.resize(event)
    } else {
      this.darg(event)
    }
  }

  setupEvent() {
    let EVENTS = this.EVENTS
    let _this = this
    let handle = this.handle
    if (this.resizable) {
      handle.addEventListener(EVENTS[1], event => {
        if (!this.isResizing) {
          let eventInfo = _this.getEventInfo(event)
          let resizeFlag = _this.checkResize(handle, eventInfo.clientX, eventInfo.clientY)
          this.resizeFlag = resizeFlag
          if (this.resizable && resizeFlag) {
            handle.style.cursor = resizeFlag
          } else {
            handle.style.cursor = this.cursor
          }
        }
      })
    }
    if (!this.disabled) {
      handle.style.cursor = this.cursor
      handle.addEventListener(EVENTS[0], this.start.bind(this))
    }
  }

  getStyle(el, styleProp) {
    if(window.getComputedStyle) {
      return document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp)
    }
    if (el.currentStyle) {
      return el.currentStyle[styleProp]
    }
    return null
  }

  getClientRect(el) {
    let elemRect = el.getBoundingClientRect()
    let $parent = this.containment ? this.containment : this.$el.offsetParent
    let clientRect: any = {}
    let leftBorderWidth = parseInt(this.getStyle($parent, 'border-left-width'))
    let topBorderWidth = parseInt(this.getStyle($parent, 'border-top-width'))
    let parentRect: any = $parent.getBoundingClientRect();
    clientRect.left = elemRect.left - parentRect.left - leftBorderWidth;
    clientRect.top = elemRect.top - parentRect.top - topBorderWidth;
    clientRect.right = clientRect.left + elemRect.width;
    clientRect.bottom = clientRect.top + elemRect.height;
    clientRect.width = elemRect.width;
    clientRect.height = elemRect.height;
    return clientRect
  }

  isSnap(srcValue, destValue) {
    let snapTolerance = this.snapTolerance
    return Math.abs(srcValue - destValue) <= snapTolerance
  }

  clearSnapLine() {
    let lines = Array.apply(null, document.querySelectorAll('.snap-line'))
    lines.forEach(item => {
      item.offsetParent.removeChild(item)
    })
  }


  createDistText(flag, dragElemRect, snapElemRect) {
    let { top, bottom, left, right, width, height } = snapElemRect
    let itemWidthHalf = width / 2
    let itemHeightHalf = height / 2
    let dragWidthHalf = dragElemRect.width / 2
    let dragHeightHalf = dragElemRect.height / 2

    let textBox = document.createElement('div')
    textBox.style.position = 'absolute'
    // textBox.style.background = '#000000'
    textBox.style.textAlign = 'center'

    let text = document.createElement('span')
    let distance = 0
    let textHeight = 14
    text.style.background = this.snapLineColor
    text.style.borderRadius = '2px'
    text.style.lineHeight = '14px'
    text.style.padding = '0 2px'
    text.style.fontSize = '10px'
    text.style.color = '#ffffff'
    text.style.userSelect='none'
    textBox.appendChild(text)
    let snapFlags = this.snapFlags
    //'top_tt', 'top_bt','top_bb', 'top_tb',
    if (flag === snapFlags[0] || flag === snapFlags[1] ||
      flag === snapFlags[3] || flag === snapFlags[4]) {
      textBox.style.bottom = '0px'
      if (left < dragElemRect.left) {
        distance = dragElemRect.left - right
        textBox.style.left = width + 'px'
      } else {
        distance = left - dragElemRect.right
        textBox.style.left = dragElemRect.width + 'px'
      }
      distance = Math.round(distance)
      if (distance < 0) return null
      textBox.style.width = distance + 'px'
      textBox.style.paddingBottom = '2px'
      text.innerText = distance + 'px'
    }
    // 'top_cc' 'top_tc' 'top_bc'
    else if (flag === snapFlags[2] || flag === snapFlags[10] || flag === snapFlags[11]) {
      textBox.style.bottom = '0px'
      if (left < dragElemRect.left) {
        distance = dragElemRect.left - right
        textBox.style.left = itemWidthHalf + 'px'
      } else {
        distance = left - dragElemRect.right
        textBox.style.left = dragWidthHalf + 'px'
      }
      distance = Math.round(distance)
      if (distance < 0) return null
      textBox.style.paddingBottom = '2px'
      textBox.style.width = distance + 'px'
      text.innerText = distance + 'px'
    }

    else if (flag === snapFlags[5] || flag === snapFlags[6] ||
      flag === snapFlags[8] || flag === snapFlags[9]) {
      textBox.style.left = '0px'
      if (top < dragElemRect.top) {
        distance = dragElemRect.top - bottom
        textBox.style.top = height + 'px'
      } else {
        distance = top - dragElemRect.bottom
        textBox.style.top = dragElemRect.height + 'px'
      }
      distance = Math.round(distance)
      if (distance < 0) return null
      text.style.position = 'absolute'
      text.style.top = '50%'
      text.style.marginTop = -(textHeight / 2) + 'px'
      text.style.left = '2px'
      textBox.style.height = distance + 'px'
      text.innerText = distance + 'px'
    }
    //'left_cc' 'left_lc' 'top_rc'
    else if (flag === snapFlags[7] || flag === snapFlags[12] || flag === snapFlags[13]) {
      textBox.style.left = '0px'
      if (top < dragElemRect.top) {
        distance = dragElemRect.top - bottom
        textBox.style.top = itemHeightHalf + 'px'
      } else {
        distance = top - dragElemRect.bottom
        textBox.style.top = dragHeightHalf + 'px'
      }
      distance = Math.round(distance)
      if (distance < 0) return null
      text.style.position = 'absolute'
      text.style.top = '50%'
      text.style.marginTop = -(textHeight / 2) + 'px'
      text.style.left = '2px'
      textBox.style.height = distance + 'px'
      text.innerText = distance + 'px'
    }

    return textBox

  }

  showSnapLine($parent, { flag, dragElemRect, snapElemRect, snapDrag }) {
    let snapLineSize = this.snapLineSize
    let snapLineColor = this.snapLineColor
    let { top, bottom, left, right, width, height } = snapElemRect
    let itemWidthHalf = width / 2
    let itemHeightHalf = height / 2
    let dragWidthHalf = dragElemRect.width / 2
    let dragHeightHalf = dragElemRect.height / 2
    let lineRect: any = {}

    let snapFlags = this.snapFlags
    if (flag === snapFlags[0] || flag === snapFlags[1]) {
      lineRect.left = left < dragElemRect.left ? left : dragElemRect.left
      lineRect.top = top
      lineRect.bottom = lineRect.top + snapLineSize
      lineRect.right = right > dragElemRect.right ? right : dragElemRect.right

    } else if (flag === snapFlags[2]) {
      lineRect.top = top + itemHeightHalf
      lineRect.bottom = lineRect.top + snapLineSize
      if (left === dragElemRect.left && right === dragElemRect.right) {
        lineRect.left = left
        lineRect.right = right
      } else if (left > dragElemRect.left && right < dragElemRect.right) {
        lineRect.left = dragElemRect.left
        lineRect.right = dragElemRect.right
      } else if (left < dragElemRect.left && right > dragElemRect.right) {
        lineRect.left = dragElemRect.left + dragWidthHalf
        lineRect.right = right
      } else {
        lineRect.left = left < dragElemRect.left ? left + itemWidthHalf : dragElemRect.left + dragWidthHalf
        lineRect.right = right > dragElemRect.right ? right - itemWidthHalf : dragElemRect.right - dragWidthHalf
      }

    } else if (flag === snapFlags[3] || flag === snapFlags[4]) {
      lineRect.left = left < dragElemRect.left ? left : dragElemRect.left
      lineRect.top = bottom
      lineRect.bottom = lineRect.top + snapLineSize
      lineRect.right = right > dragElemRect.right ? right : dragElemRect.right
    } else if (flag === snapFlags[5] || flag === snapFlags[6]) {
      lineRect.left = left
      lineRect.top = top < dragElemRect.top ? top : dragElemRect.top
      lineRect.bottom = bottom > dragElemRect.bottom ? bottom : dragElemRect.bottom
      lineRect.right = lineRect.left + snapLineSize
    } else if (flag === snapFlags[7]) {
      lineRect.left = left + itemWidthHalf
      if (top === dragElemRect.top && bottom === dragElemRect.bottom) {
        lineRect.top = top
        lineRect.bottom = bottom
      } else if (top > dragElemRect.top && bottom < dragElemRect.bottom) {
        lineRect.top = dragElemRect.top
        lineRect.bottom = dragElemRect.bottom
      } else if (top < dragElemRect.top && bottom > dragElemRect.bottom) {
        lineRect.top = top
        lineRect.bottom = dragElemRect.top + dragHeightHalf
      } else {
        lineRect.top = top < dragElemRect.top ? top + itemHeightHalf : dragElemRect.top + dragHeightHalf
        lineRect.bottom = bottom > dragElemRect.bottom ? bottom - itemHeightHalf : dragElemRect.bottom - dragHeightHalf
      }
      lineRect.right = lineRect.left + snapLineSize
    } else if (flag === snapFlags[8] || flag === snapFlags[9]) {
      lineRect.left = right
      lineRect.top = top < dragElemRect.top ? top : dragElemRect.top
      lineRect.bottom = bottom > dragElemRect.bottom ? bottom : dragElemRect.bottom
      lineRect.right = lineRect.left + snapLineSize
    }

    else if (flag === snapFlags[10] || flag === snapFlags[11]) {
      lineRect.top = top + itemHeightHalf
      lineRect.bottom = lineRect.top + snapLineSize
      if (left === dragElemRect.left && right === dragElemRect.right) {
        lineRect.left = left
        lineRect.right = right
      } else if (left > dragElemRect.left && right < dragElemRect.right) {
        lineRect.left = dragElemRect.left
        lineRect.right = dragElemRect.right
      } else {
        lineRect.left = left < dragElemRect.left ? left + itemWidthHalf : dragElemRect.left + dragWidthHalf
        lineRect.right = right > dragElemRect.right ? right : dragElemRect.right
      }
    }

    else if (flag === snapFlags[12] || flag === snapFlags[13]) {
      lineRect.left = left + itemWidthHalf
      if (top === dragElemRect.top && bottom === dragElemRect.bottom) {
        lineRect.top = top
        lineRect.bottom = bottom
      } else if (top > dragElemRect.top && bottom < dragElemRect.bottom) {
        lineRect.top = dragElemRect.top
        lineRect.bottom = dragElemRect.bottom
      } else {
        lineRect.top = top < dragElemRect.top ? top + itemHeightHalf : dragElemRect.top + dragHeightHalf
        lineRect.bottom = bottom > dragElemRect.bottom ? bottom : dragElemRect.bottom
      }
      lineRect.right = lineRect.left + snapLineSize
    }

    let line = document.createElement('div')
    line.style.position = 'absolute'
    line.style.top = `${lineRect.top}px`
    line.style.left = `${lineRect.left}px`
    let lineWidth = lineRect.right - lineRect.left
    lineWidth = lineWidth === 1 ? lineWidth : lineWidth
    let lineHeight = lineRect.bottom - lineRect.top
    lineHeight = lineHeight === 1 ? lineHeight : lineHeight
    line.style.width = `${lineWidth}px`
    line.style.height = `${lineHeight}px`
    line.style.background =  snapLineColor
    line.style.zIndex = '9999999999999'
    line.className = 'snap-line'
    let distText = this.createDistText(flag, dragElemRect, snapElemRect)
    if (this.snapDist && distText) {
      line.appendChild(distText)
    }
    $parent.appendChild(line)
  }
  doSnap() {
    let dragElem = this.$el
    let snapElems = []
    if (typeof this.snap === 'boolean') {
      snapElems = [].slice.call(document.querySelectorAll('.draggable'))
    }
    else if (typeof this.snap === 'string') {
      snapElems = [].slice.call(document.querySelectorAll(this.snap))
    } else if (typeof this.snap === 'object' && this.snap.length) {
      snapElems = this.snap
    }

    let dragElemRect = this.getClientRect(this.snapAnchor ? this.snapAnchor : dragElem)
    let snapInfos = []
    this.clearSnapLine()
    let snapFlags = this.snapFlags
    snapElems.forEach(item => {
      if (item === dragElem) {
        return
      }
      let itemElem = item//.$el
      let snapElemRect: any = this.getClientRect(item.dragRef.snapAnchor ? item.dragRef.snapAnchor : itemElem)
      let { top, height, bottom, left, width, right } = snapElemRect
      let dragWidthHalf = dragElemRect.width / 2
      let itemWidthHalf = width / 2
      let dragHeightHalf = dragElemRect.height / 2
      let itemHeightHalf = height / 2

      // y c
      if (this.isSnap(dragElemRect.top + dragHeightHalf, top + itemHeightHalf)) {
        let snapInfo = {
          flag: snapFlags[2],
          snapDrag: item,
          dragValue: top + itemHeightHalf - dragHeightHalf,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }
      // y t-top
      else if (this.isSnap(dragElemRect.top, top)) {
        let snapInfo = {
          flag: snapFlags[0],
          dragValue: top,
          snapDrag: item,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }
      // y b-top
      else if (this.isSnap(dragElemRect.bottom, top)) {
        let snapInfo = {
          flag: snapFlags[1],
          snapDrag: item,
          dragValue: top - dragElemRect.height,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }

      // y b-bottom
      else if (this.isSnap(dragElemRect.bottom, bottom)) {
        let snapInfo = {
          flag: snapFlags[3],
          snapDrag: item,
          dragValue: bottom - dragElemRect.height,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }
      // y t-bottom
      else if (this.isSnap(dragElemRect.top, bottom)) {
        let snapInfo = {
          flag: snapFlags[4],
          snapDrag: item,
          dragValue: bottom,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }
      // y t-center
      else if (this.isSnap(dragElemRect.top, top + itemHeightHalf)) {
        let snapInfo = {
          flag: snapFlags[10],
          snapDrag: item,
          dragValue: top + itemHeightHalf,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }
      // y b_center
      else if (this.isSnap(dragElemRect.bottom, bottom - itemHeightHalf)) {
        let snapInfo = {
          flag: snapFlags[11],
          snapDrag: item,
          dragValue: bottom - itemHeightHalf - dragElemRect.height,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }


      // x c
      if (this.isSnap(dragElemRect.left + dragWidthHalf, left + itemWidthHalf)) {
        let snapInfo = {
          flag: snapFlags[7],
          snapDrag: item,
          dragValue: left + itemWidthHalf - dragWidthHalf,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }

      // x l-left
      else if (this.isSnap(dragElemRect.left, left)) {
        let snapInfo = {
          flag: snapFlags[5],
          snapDrag: item,
          dragValue: left,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }
      // x r-left
      else if (this.isSnap(dragElemRect.right, left)) {
        let snapInfo = {
          flag: snapFlags[6],
          snapDrag: item,
          dragValue: left - dragElemRect.width,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }

      // x r-right
      else if (this.isSnap(dragElemRect.right, right)) {
        let snapInfo = {
          flag: snapFlags[8],
          snapDrag: item,
          dragValue: right - dragElemRect.width,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }
      // x l-right
      else if (this.isSnap(dragElemRect.left, right)) {
        let snapInfo = {
          flag: snapFlags[9],
          snapDrag: item,
          dragValue: right,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }
      // y l-center
      else if (this.isSnap(dragElemRect.left, left + itemWidthHalf)) {
        let snapInfo = {
          flag: snapFlags[12],
          snapDrag: item,
          dragValue: left + itemWidthHalf,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }
      // y r_center
      else if (this.isSnap(dragElemRect.right, right - itemWidthHalf)) {
        let snapInfo = {
          flag: snapFlags[13],
          snapDrag: item,
          dragValue: right - itemWidthHalf - dragElemRect.width,
          snapElemRect: snapElemRect,
          dragElemRect: dragElemRect
        }
        snapInfos.push(snapInfo)
      }

    })
    snapInfos.forEach(snapInfo => {
      let flags = snapInfo.flag.split('_')
      let pos = flags[0]
      if (dragElem.dragRef.snapAnchor) {
        let d = 0
        if (pos === 'left') {
          d = dragElem.dragRef.snapAnchor.offsetLeft
        } else if (pos === 'top') {
          d = dragElem.dragRef.snapAnchor.offsetTop
        }
        dragElem.style[pos] = `${snapInfo.dragValue - d}px`
      } else {
        dragElem.style[pos] = `${snapInfo.dragValue}px`
      }
      // || snapInfo.snapDrag.isShowDist
      if (this.snapLine) {
        this.showSnapLine(this.containment ? this.containment : dragElem.offsetParent, snapInfo)
      }
    })

    if (this.onSnap && snapInfos.length > 0) {
      this.onSnap(snapInfos)
    }
  }

}
