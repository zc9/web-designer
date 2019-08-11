export default class Draggable {
  EVENTS: Array<string> = []
  resizeFlags = [
    'n-resize', 'e-resize', 's-resize', 'w-resize',
    'ne-resize', 'nw-resize', 'se-resize', 'sw-resize'
  ]
  alignFlags = [
    'top_tt', 'top_bt', 'top_cc','top_bb', 'top_tb',
    'left_ll', 'left_rl', 'left_cc', 'left_rr', 'left_lr',
    'top_tc', 'top_bc', 'left_lc', 'left_rc'
  ]
  resizeFlag: string
  $el: any
  isDragging: boolean = false
  option: any
  onStart: Function
  onEnd: Function
  onResize: Function
  onAlign: Function
  onMove: Function
  isResizing: boolean = false

  constructor(el: any, option = {}) {
    this.$el = el;
    this.option = option;
    this.EVENTS = this.isTouch() ?
      ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];

    this.init();
  }

  init() {
    if (typeof this.$el === 'string') {
      this.$el = document.querySelector(this.$el);
    }
    let option = this.option;

    if (option.parent && typeof option.parent === 'string') {
      this.option.parent = document.querySelector(option.parent);
    }

    if (!option.alignLineColor) {
      option.alignLineColor = '#FF4AFF';
    }

    if (!option.alignGap) {
      option.alignGap = 3;
    }

    if (!option.resizeGap) {
      option.resizeGap = 5;
    }

    if (!option.alignLineSize) {
      option.alignLineSize = 1;
    }

    if (typeof option.isShowDist === 'undefined') {
      option.isShowDist = true;
    }
    if (typeof option.resizable === 'undefined') {
      option.resizable = true;
    }

    if (typeof option.minWidth === 'undefined') {
      option.minWidth = 24;
    }
    if (typeof option.minHeight === 'undefined') {
      option.minHeight = 24;
    }
    this.setupEvent();
  }

  isTouch() {
    return 'ontouchstart' in window;
  }

  stopPropagation(event) {
    window.event? window.event.cancelBubble = true : event.stopPropagation();
  }

  getEventInfo(event) {
    return this.isTouch() ? event.targetTouches[0] : event
  }

  checkResize(elem, x, y) {
    let rect = elem.getBoundingClientRect();
    let resizeGap = this.option.resizeGap;
    let resizeFlags = this.resizeFlags;
    if ((x >= rect.right - resizeGap && x <= rect.right) &&
      (y >= rect.top && y <= rect.top + resizeGap)) {
      return resizeFlags[4]
    }
    else if ((x >= rect.left && x <= rect.left + resizeGap) &&
      (y >= rect.top && y <= rect.top + resizeGap)) {
      return resizeFlags[5]
    }
    else if ((x >= rect.right - resizeGap && x <= rect.right) &&
      (y >= rect.bottom - resizeGap && y <= rect.bottom)) {
      return resizeFlags[6]
    }
    else if ((x >= rect.left && x <= rect.left + resizeGap) &&
      (y >= rect.bottom - resizeGap && y <= rect.bottom)) {
      return resizeFlags[7]
    }
    else if (y >= rect.top && y <= rect.top + resizeGap) {
      return resizeFlags[0];
    }
    else if (x >= rect.right - resizeGap && x <= rect.right) {
      return resizeFlags[1];
    }
    else if (y >= rect.bottom - resizeGap && y <= rect.bottom) {
      return resizeFlags[2];
    }
    else if (x >= rect.left && x <= rect.left + resizeGap) {
      return resizeFlags[3];
    }
    return null;
  }

  darg(event) {
    let _this = this;
    const EVENTS = this.EVENTS;
    let diffX = 0, diffY = 0;
    let elemWidth = 0, elemHeight = 0;
    let $parent = this.option.parent || this.$el.offsetParent;
    let windowWidth = 0, windowHeight = 0, parentWidth = 0, parentHeight = 0;
    let option = this.option;
    let eventInfo = _this.getEventInfo(event);
    _this.isDragging = true;
    diffX = eventInfo.clientX - _this.$el.offsetLeft;
    diffY = eventInfo.clientY - _this.$el.offsetTop;
    elemWidth = _this.$el.offsetWidth;
    elemHeight = _this.$el.offsetHeight;
    windowWidth = document.documentElement.clientWidth;
    windowHeight = document.documentElement.clientHeight;
    parentWidth = $parent.clientWidth || windowWidth;
    parentHeight = $parent.clientHeight || windowHeight;
    document.addEventListener(EVENTS[1], move);
    document.addEventListener(EVENTS[2], end);
    if (_this.onStart) _this.onStart(eventInfo);

    function move(event) {
      let eventInfo = _this.getEventInfo(event);
      let left = eventInfo.clientX - diffX;
      let top = eventInfo.clientY - diffY;
      let minLeft = option.minLeft ? option.minLeft : 0;
      let minTop = option.minTop? option.minTop : 0;

      if (!_this.option.allowOverstep) {
        if (left < minLeft) {
          left = minLeft
        }
        if (top < minTop) {
          top = minTop;
        }
        if (left + elemWidth > parentWidth) {
          left = parentWidth - elemWidth;
        }
        if (top + elemHeight > parentHeight) {
          top = parentHeight - elemHeight;
        }
      }
      _this.$el.style.position = 'absolute';
      _this.$el.style.left = `${left}px`;
      _this.$el.style.top = `${top}px`;
      if (_this.option.alignDrags) {
        _this.checkAlign();
      }
      if (_this.onMove) _this.onMove(eventInfo);
    }
    function end(event) {
      let eventInfo = _this.getEventInfo(event);
      _this.isDragging = false;
      document.removeEventListener(EVENTS[1], move);
      document.removeEventListener(EVENTS[2], end);
      if (_this.onEnd) _this.onEnd(eventInfo);
      _this.clearAlignLine();
    }
  }

  resize(event) {
    const EVENTS = this.EVENTS;
    let that = this;
    event = this.getEventInfo(event);
    let startX = event.clientX;
    let startY = event.clientY;
    let height = this.$el.offsetHeight;
    let width = this.$el.offsetWidth;
    let originHeight = height, originWidth = width;
    let top = parseInt(this.getStyle(this.$el, 'top'));
    let left = parseInt(this.getStyle(this.$el, 'left'));
    let originTop = top;
    let originLeft = left;
    this.isResizing = true;
    let $parent = this.option.parent || this.$el.offsetParent;
    let windowWidth = document.documentElement.clientWidth;
    let windowHeight = document.documentElement.clientHeight;
    let parentWidth = $parent.clientWidth || windowWidth;
    let parentHeight = $parent.clientHeight || windowHeight;
    let minWidth = this.option.minWidth;
    let minHeight = this.option.minHeight;


    function resizeN(event) {
      let d = event.clientY - startY;
      height -= d;
      if (height < minHeight) {
        height = minHeight;
      }
      if (height > originTop + originHeight) {
        height = originTop + originHeight;
      }
      top += d;
      if (top < 0) {
        top = 0;
      }
      if(top > originTop + (originHeight - minHeight)) {
        top = originTop + (originHeight - minHeight);
      }
      that.$el.style.top = top + 'px';
      that.$el.style.height = height + 'px';
    }

    function resizeE(event) {
      width += event.clientX - startX;
      if (width < minWidth) {
        width = minWidth;
      }
      if (width > parentWidth - originLeft) {
        width = parentWidth - originLeft;
      }
      that.$el.style.width = width + 'px';
    }
    function resizeS(event) {
      height += event.clientY - startY;
      if (height < minHeight) {
        height = minHeight;
      }
      if (height > parentHeight - originTop) {
        height = parentHeight - originTop;
      }
      that.$el.style.height = height + 'px';
    }
    function resizeW(event) {
      width -= event.clientX - startX;
      if (width < minWidth) {
        width = minWidth;
      }
      if (width > originLeft + originWidth) {
        width = originLeft + originWidth;
      }
      left += event.clientX - startX;
      if (left < 0) {
        left = 0;
      }
      if(left > originLeft + (originWidth - minWidth)) {
        left = originLeft + (originWidth - minWidth);
      }
      that.$el.style.left = left + 'px';
      that.$el.style.width = width + 'px';
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
      startY = event.clientY;
      startX = event.clientX;
      if (that.onResize) {
        that.onResize();
      }
    }
    function end(event) {
      that.isResizing = false;
      document.removeEventListener(EVENTS[1], move)
      document.removeEventListener(EVENTS[2], end)
    }

    document.addEventListener(EVENTS[1], move)
    document.addEventListener(EVENTS[2], end)
  }

  start(event) {
    event.preventDefault();
    this.stopPropagation(event);
    // if (_this.isDragging) {
    //   return;
    // }
    if (this.resizeFlag) {
      this.resize(event);
    } else {
      this.darg(event);
    }
  }

  setupEvent() {
    let EVENTS = this.EVENTS;
    let _this = this;
    let elem = this.option.dragAnchor ? this.option.dragAnchor : this.$el;
    if (this.option.resizable) {
      elem.addEventListener(EVENTS[1], event => {
        if (!this.isResizing) {
          let eventInfo = _this.getEventInfo(event);
          let resizeFlag = _this.checkResize(elem, eventInfo.clientX, eventInfo.clientY)
          this.resizeFlag = resizeFlag;
          if (resizeFlag) {
            elem.style.cursor = resizeFlag;
          } else {
            elem.style.cursor = 'move';
          }
        }
      });
    }
    elem.addEventListener(EVENTS[0], this.start.bind(this));
  }

  setAlignDrags(alignDrags) {
    this.option.alignDrags = alignDrags;
  }

  getStyle(el, styleProp) {
    if(window.getComputedStyle) {
      return document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    }
    if (el.currentStyle) {
      return el.currentStyle[styleProp];
    }
    return null;
  }

  getClientRect(el) {
    let elemRect = el.getBoundingClientRect();
    let $parent = this.option.parent || this.$el.offsetParent;
    let clientRect: any = {};
    let leftBorderWidth = parseInt(this.getStyle($parent, 'border-left-width'));
    let topBorderWidth = parseInt(this.getStyle($parent, 'border-top-width'));
    let parentRect: any = $parent.getBoundingClientRect();
    clientRect.left = elemRect.left - parentRect.left - leftBorderWidth;
    clientRect.top = elemRect.top - parentRect.top - topBorderWidth;
    clientRect.right = clientRect.left + elemRect.width;
    clientRect.bottom = clientRect.top + elemRect.height;
    clientRect.width = elemRect.width;
    clientRect.height = elemRect.height;
    return clientRect;
  }

  isAlign(srcValue, destValue) {
    let alignGap = this.option.alignGap;
    return Math.abs(srcValue - destValue) <= alignGap;
  }

  clearAlignLine() {
    let lines = Array.apply(null, document.querySelectorAll('.align-line'));
    lines.forEach(item => {
      item.parentNode.removeChild(item);
    });
  }


  createDistText(flag, dragElemRect, alignElemRect) {
    let alignLineColor = this.option.alignLineColor;
    let { top, bottom, left, right, width, height } = alignElemRect;
    let itemWidthHalf = width / 2;
    let itemHeightHalf = height / 2;
    let dragWidthHalf = dragElemRect.width / 2;
    let dragHeightHalf = dragElemRect.height / 2;

    let textBox = document.createElement('div');
    textBox.style.position = 'absolute';
    // textBox.style.background = '#000000';
    textBox.style.textAlign = 'center';

    let text = document.createElement('span');
    let distance = 0;
    let textHeight = 14;
    text.style.background = alignLineColor;
    text.style.borderRadius = '2px';
    text.style.lineHeight = '14px';
    text.style.padding = '0 2px';
    text.style.fontSize = '10px';
    text.style.color = '#ffffff';
    text.style.userSelect='none';
    textBox.appendChild(text);
    let alignFlags = this.alignFlags;
    //'top_tt', 'top_bt','top_bb', 'top_tb',
    if (flag === alignFlags[0] || flag === alignFlags[1] ||
      flag === alignFlags[3] || flag === alignFlags[4]) {
      textBox.style.bottom = '0px';
      if (left < dragElemRect.left) {
        distance = dragElemRect.left - right;
        textBox.style.left = width + 'px';
      } else {
        distance = left - dragElemRect.right;
        textBox.style.left = dragElemRect.width + 'px';
      }
      distance = Math.round(distance);
      if (distance < 0) return null;
      textBox.style.width = distance + 'px'
      textBox.style.paddingBottom = '2px';
      text.innerText = distance + 'px';
    }
    // 'top_cc' 'top_tc' 'top_bc'
    else if (flag === alignFlags[2] || flag === alignFlags[10] || flag === alignFlags[11]) {
      textBox.style.bottom = '0px';
      if (left < dragElemRect.left) {
        distance = dragElemRect.left - right;
        textBox.style.left = itemWidthHalf + 'px';
      } else {
        distance = left - dragElemRect.right;
        textBox.style.left = dragWidthHalf + 'px';
      }
      distance = Math.round(distance);
      if (distance < 0) return null;
      textBox.style.paddingBottom = '2px';
      textBox.style.width = distance + 'px'
      text.innerText = distance + 'px';
    }

    else if (flag === alignFlags[5] || flag === alignFlags[6] ||
      flag === alignFlags[8] || flag === alignFlags[9]) {
      textBox.style.left = '0px';
      if (top < dragElemRect.top) {
        distance = dragElemRect.top - bottom;
        textBox.style.top = height + 'px';
      } else {
        distance = top - dragElemRect.bottom;
        textBox.style.top = dragElemRect.height + 'px';
      }
      distance = Math.round(distance);
      if (distance < 0) return null;
      text.style.position = 'absolute';
      text.style.top = '50%';
      text.style.marginTop = -(textHeight / 2) + 'px';
      text.style.left = '2px';
      textBox.style.height = distance + 'px'
      text.innerText = distance + 'px';
    }
    //'left_cc' 'left_lc' 'top_rc'
    else if (flag === alignFlags[7] || flag === alignFlags[12] || flag === alignFlags[13]) {
      textBox.style.left = '0px';
      if (top < dragElemRect.top) {
        distance = dragElemRect.top - bottom;
        textBox.style.top = itemHeightHalf + 'px';
      } else {
        distance = top - dragElemRect.bottom;
        textBox.style.top = dragHeightHalf + 'px';
      }
      distance = Math.round(distance);
      if (distance < 0) return null;
      text.style.position = 'absolute';
      text.style.top = '50%';
      text.style.marginTop = -(textHeight / 2) + 'px';
      text.style.left = '2px';
      textBox.style.height = distance + 'px'
      text.innerText = distance + 'px';
    }

    return textBox;

  }


  showAlignLine($parent, { flag, dragElemRect, alignElemRect, alignDrag }) {
    let alignLineSize = this.option.alignLineSize;
    let alignLineColor = this.option.alignLineColor;
    let { top, bottom, left, right, width, height } = alignElemRect;
    let itemWidthHalf = width / 2;
    let itemHeightHalf = height / 2;
    let dragWidthHalf = dragElemRect.width / 2;
    let dragHeightHalf = dragElemRect.height / 2;
    let lineRect: any = {};

    let alignFlags = this.alignFlags;
    if (flag === alignFlags[0] || flag === alignFlags[1]) {
      lineRect.left = left < dragElemRect.left ? left : dragElemRect.left;
      lineRect.top = top;
      lineRect.bottom = lineRect.top + alignLineSize;
      lineRect.right = right > dragElemRect.right ? right : dragElemRect.right;

    } else if (flag === alignFlags[2]) {
      lineRect.top = top + itemHeightHalf;
      lineRect.bottom = lineRect.top + alignLineSize;
      if (left === dragElemRect.left && right === dragElemRect.right) {
        lineRect.left = left;
        lineRect.right = right;
      } else if (left > dragElemRect.left && right < dragElemRect.right) {
        lineRect.left = dragElemRect.left;
        lineRect.right = dragElemRect.right;
      } else if (left < dragElemRect.left && right > dragElemRect.right) {
        lineRect.left = dragElemRect.left + dragWidthHalf;
        lineRect.right = right;
      } else {
        lineRect.left = left < dragElemRect.left ? left + itemWidthHalf : dragElemRect.left + dragWidthHalf;
        lineRect.right = right > dragElemRect.right ? right - itemWidthHalf : dragElemRect.right - dragWidthHalf;
      }

    } else if (flag === alignFlags[3] || flag === alignFlags[4]) {
      lineRect.left = left < dragElemRect.left ? left : dragElemRect.left;
      lineRect.top = bottom;
      lineRect.bottom = lineRect.top + alignLineSize;
      lineRect.right = right > dragElemRect.right ? right : dragElemRect.right;
    } else if (flag === alignFlags[5] || flag === alignFlags[6]) {
      lineRect.left = left;
      lineRect.top = top < dragElemRect.top ? top : dragElemRect.top;
      lineRect.bottom = bottom > dragElemRect.bottom ? bottom : dragElemRect.bottom;
      lineRect.right = lineRect.left + alignLineSize;
    } else if (flag === alignFlags[7]) {
      lineRect.left = left + itemWidthHalf;
      if (top === dragElemRect.top && bottom === dragElemRect.bottom) {
        lineRect.top = top;
        lineRect.bottom = bottom;
      } else if (top > dragElemRect.top && bottom < dragElemRect.bottom) {
        lineRect.top = dragElemRect.top;
        lineRect.bottom = dragElemRect.bottom;
      } else if (top < dragElemRect.top && bottom > dragElemRect.bottom) {
        lineRect.top = top;
        lineRect.bottom = dragElemRect.top + dragHeightHalf;
      } else {
        lineRect.top = top < dragElemRect.top ? top + itemHeightHalf : dragElemRect.top + dragHeightHalf;
        lineRect.bottom = bottom > dragElemRect.bottom ? bottom - itemHeightHalf : dragElemRect.bottom - dragHeightHalf;
      }
      lineRect.right = lineRect.left + alignLineSize;
    } else if (flag === alignFlags[8] || flag === alignFlags[9]) {
      lineRect.left = right;
      lineRect.top = top < dragElemRect.top ? top : dragElemRect.top;
      lineRect.bottom = bottom > dragElemRect.bottom ? bottom : dragElemRect.bottom;
      lineRect.right = lineRect.left + alignLineSize;
    }

    else if (flag === alignFlags[10] || flag === alignFlags[11]) {
      lineRect.top = top + itemHeightHalf;
      lineRect.bottom = lineRect.top + alignLineSize;
      if (left === dragElemRect.left && right === dragElemRect.right) {
        lineRect.left = left;
        lineRect.right = right;
      } else if (left > dragElemRect.left && right < dragElemRect.right) {
        lineRect.left = dragElemRect.left;
        lineRect.right = dragElemRect.right;
      } else {
        lineRect.left = left < dragElemRect.left ? left + itemWidthHalf : dragElemRect.left + dragWidthHalf;
        lineRect.right = right > dragElemRect.right ? right : dragElemRect.right;
      }
    }

    else if (flag === alignFlags[12] || flag === alignFlags[13]) {
      lineRect.left = left + itemWidthHalf;
      if (top === dragElemRect.top && bottom === dragElemRect.bottom) {
        lineRect.top = top;
        lineRect.bottom = bottom;
      } else if (top > dragElemRect.top && bottom < dragElemRect.bottom) {
        lineRect.top = dragElemRect.top;
        lineRect.bottom = dragElemRect.bottom;
      } else {
        lineRect.top = top < dragElemRect.top ? top + itemHeightHalf : dragElemRect.top + dragHeightHalf;
        lineRect.bottom = bottom > dragElemRect.bottom ? bottom : dragElemRect.bottom;
      }
      lineRect.right = lineRect.left + alignLineSize;
    }

    let line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.top = `${lineRect.top}px`;
    line.style.left = `${lineRect.left}px`;
    let lineWidth = lineRect.right - lineRect.left;
    lineWidth = lineWidth === 1 ? lineWidth : lineWidth;
    let lineHeight = lineRect.bottom - lineRect.top;
    lineHeight = lineHeight === 1 ? lineHeight : lineHeight;
    line.style.width = `${lineWidth}px`;
    line.style.height = `${lineHeight}px`;
    line.style.background =  alignLineColor;
    line.style.zIndex = '9999999999999';
    line.className = 'align-line';
    let distText = this.createDistText(flag, dragElemRect, alignElemRect);
    if (this.option.isShowDist && distText) {
      line.appendChild(distText);
    }
    $parent.appendChild(line);
  }
  checkAlign() {
    let dragElem = this.$el;
    let alignDrags = this.option.alignDrags;
    let dragElemRect = this.getClientRect(this.option.alignAnchor ? this.option.alignAnchor : dragElem);
    let alignInfos = [];
    this.clearAlignLine();
    let alignFlags = this.alignFlags;
    alignDrags.forEach(item => {
      if (item === this) {
        return
      }
      let itemElem = item.$el;
      let alignElemRect: any = this.getClientRect(item.option.alignAnchor ? item.option.alignAnchor : itemElem);
      let { top, height, bottom, left, width, right } = alignElemRect;
      let dragWidthHalf = dragElemRect.width / 2;
      let itemWidthHalf = width / 2;
      let dragHeightHalf = dragElemRect.height / 2;
      let itemHeightHalf = height / 2;

      // y c
      if (this.isAlign(dragElemRect.top + dragHeightHalf, top + itemHeightHalf)) {
        let alignInfo = {
          flag: alignFlags[2],
          alignDrag: item,
          dragValue: top + itemHeightHalf - dragHeightHalf,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }
      // y t-top
      else if (this.isAlign(dragElemRect.top, top)) {
        let alignInfo = {
          flag: alignFlags[0],
          dragValue: top,
          alignDrag: item,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }
      // y b-top
      else if (this.isAlign(dragElemRect.bottom, top)) {
        let alignInfo = {
          flag: alignFlags[1],
          alignDrag: item,
          dragValue: top - dragElemRect.height,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }

      // y b-bottom
      else if (this.isAlign(dragElemRect.bottom, bottom)) {
        let alignInfo = {
          flag: alignFlags[3],
          alignDrag: item,
          dragValue: bottom - dragElemRect.height,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }
      // y t-bottom
      else if (this.isAlign(dragElemRect.top, bottom)) {
        let alignInfo = {
          flag: alignFlags[4],
          alignDrag: item,
          dragValue: bottom,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }
      // y t-center
      else if (this.isAlign(dragElemRect.top, top + itemHeightHalf)) {
        let alignInfo = {
          flag: alignFlags[10],
          alignDrag: item,
          dragValue: top + itemHeightHalf,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }
      // y b_center
      else if (this.isAlign(dragElemRect.bottom, bottom - itemHeightHalf)) {
        let alignInfo = {
          flag: alignFlags[11],
          alignDrag: item,
          dragValue: bottom - itemHeightHalf - dragElemRect.height,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }


      // x c
      if (this.isAlign(dragElemRect.left + dragWidthHalf, left + itemWidthHalf)) {
        let alignInfo = {
          flag: alignFlags[7],
          alignDrag: item,
          dragValue: left + itemWidthHalf - dragWidthHalf,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }

      // x l-left
      else if (this.isAlign(dragElemRect.left, left)) {
        let alignInfo = {
          flag: alignFlags[5],
          alignDrag: item,
          dragValue: left,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }
      // x r-left
      else if (this.isAlign(dragElemRect.right, left)) {
        let alignInfo = {
          flag: alignFlags[6],
          alignDrag: item,
          dragValue: left - dragElemRect.width,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }

      // x r-right
      else if (this.isAlign(dragElemRect.right, right)) {
        let alignInfo = {
          flag: alignFlags[8],
          alignDrag: item,
          dragValue: right - dragElemRect.width,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }
      // x l-right
      else if (this.isAlign(dragElemRect.left, right)) {
        let alignInfo = {
          flag: alignFlags[9],
          alignDrag: item,
          dragValue: right,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }
      // y l-center
      else if (this.isAlign(dragElemRect.left, left + itemWidthHalf)) {
        let alignInfo = {
          flag: alignFlags[12],
          alignDrag: item,
          dragValue: left + itemWidthHalf,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }
      // y r_center
      else if (this.isAlign(dragElemRect.right, right - itemWidthHalf)) {
        let alignInfo = {
          flag: alignFlags[13],
          alignDrag: item,
          dragValue: right - itemWidthHalf - dragElemRect.width,
          alignElemRect: alignElemRect,
          dragElemRect: dragElemRect
        }
        alignInfos.push(alignInfo);
      }

    });
    let $parent = this.option.parent || this.$el.offsetParent;
    alignInfos.forEach(alignInfo => {
      let flags = alignInfo.flag.split('_');
      let pos = flags[0];
      if (this.option.alignAnchor) {
        let d = 0;
        if (pos === 'left') {
          d = this.option.alignAnchor.offsetLeft;
        } else if (pos === 'top') {
          d = this.option.alignAnchor.offsetTop;
        }
        dragElem.style[pos] = `${alignInfo.dragValue - d}px`;
      } else {
        dragElem.style[pos] = `${alignInfo.dragValue}px`;
      }
      if (this.option.isShowDist || alignInfo.alignDrag.option.isShowDist) {
        this.showAlignLine($parent, alignInfo);
      }
    })

    if (this.onAlign && alignInfos.length > 0) {
      this.onAlign(alignInfos);
    }
  }

}
