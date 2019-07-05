import Drag from './Drag';
import Ruler from './Ruler';
import Component from './Component';
import PageConfig from './PageConfig';
export default class Stage {
  EVENTS: Array<string> = []
  isRuler: boolean = true
  drags: Array<Drag> = []
  curSelectedComponent: Component = null
  $el: JQuery
  $canvasWrap: JQuery
  $scrollContent: JQuery
  $canvas: JQuery
  myScroll: any
  paddingWidth: number
  paddingHeight: number
  ruler: Ruler

  constructor() {
    this.EVENTS = this.isTouch() ?
    ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
  }

  create($stageCt) {
    let pageConfig = new PageConfig(this);
    let canvasWidth = pageConfig.pageWidth;
    let canvasHeight = pageConfig.pageHeight;
    let $el = $('<div class="stage"></div>');

    let $canvasWrap, $scrollContent, $canvas;

    $stageCt.append($el);

    $canvasWrap = $(`
      <div class="canvas-wrap">
        <div>
          <div class="canvas">
          </div>
        </div>
      </div>
    `);

    this.paddingWidth = Math.ceil($el.width() / 100) * 100;
    this.paddingHeight = Math.ceil($el.height() / 100) * 100;
    let ruler;
    if (this.isRuler) {
      ruler = new Ruler();
      ruler.create($el);
      $el.append($canvasWrap);
    } else {
      $el.append($canvasWrap);
      $canvasWrap.css('left', 0);
      $canvasWrap.css('top', 0)
    }

    $scrollContent = $canvasWrap.find('> div');
    $canvas = $canvasWrap.find('.canvas');
    this.$canvas = $canvas;
    this.$canvasWrap = $canvasWrap;
    this.$el = $el;
    this.ruler = ruler;
    this.$scrollContent = $scrollContent;
    // @ts-ignore
    this.myScroll = new IScroll($canvasWrap[0], {
      scrollX: true,
      freeScroll: true,
      startX: 0,
      startY: 0,
      probeType: 3,
      scrollbars: true,
      mouseWheel: true,
      interactiveScrollbars: true,
      disableMouse: true,
      disablePointer: true,
      disableTouch: true
    });

    this.layoutCanvas(canvasWidth, canvasHeight);

    this.myScroll.on('scroll', function() {
      if (ruler) {
        ruler.setX(this.x);
        ruler.setY(this.y)
      }
    });


    let $rulerX = ruler.$rulerX[0];
    let $rulerY = ruler.$rulerY[0];

    let EVENTS = this.EVENTS;

    $rulerX.addEventListener(EVENTS[0], event => {
      let $guideLine = $('<div class="guide-line guide-lineX"><div></div></div>');
      this.$el.append($guideLine)
      let drag = new Drag($guideLine[0], {
        isShowDist: false,
        alignAnchor: $guideLine[0].children[0],
        minLeft: 20,
        resizable: false,
        allowOverstep: false,
      })
      $guideLine.css('top', (event.clientY - this.$el[0].getBoundingClientRect().top - drag.option.alignAnchor.offsetTop) + 'px')
      drag.start(event)
      drag.onEnd = function(event) {
        if (drag.$el.offsetTop <= 15) {
          $(drag.$el).remove();
        }
      }
      this.drags.push(drag);
      this.resetAlignElements();
    })

    $rulerY.addEventListener(EVENTS[0], event => {
      let $guideLine = $('<div class="guide-line guide-lineY"><div></div></div>');
      this.$el.append($guideLine)

      let drag = new Drag($guideLine[0], {
        isShowDist: false,
        alignAnchor: $guideLine[0].children[0],
        minTop: 20,
        resizable: false,
        allowOverstep: false,
      })
      $guideLine.css('left', (event.clientX - this.$el[0].getBoundingClientRect().left - drag.option.alignAnchor.offsetLeft) + 'px')
      drag.start(event)
      drag.onEnd = function(event) {
        if (drag.$el.offsetLeft <= 15) {
          $(drag.$el).remove();
        }
      }
      this.drags.push(drag);
      this.resetAlignElements();
    })


    this.setupEvent();

  }

  layoutCanvas(canvasWidth, canvasHeight) {
    let startX = 0, startY = 0, marginLeft = 0, marginTop = 0;
    let scrollContentWidth = canvasWidth, scrollContentHeight = canvasHeight;
    marginLeft = this.paddingWidth / 2;
    marginTop = this.paddingHeight / 2;
    scrollContentWidth = Math.ceil(canvasWidth / 50) * 50 + this.paddingWidth;
    scrollContentHeight = Math.ceil(canvasHeight / 50) * 50 + this.paddingHeight;
    startX = scrollContentWidth / 2 - this.$canvasWrap.width() / 2;
    startY = scrollContentHeight / 2 -this.$canvasWrap.height() / 2;
    this.ruler.update(canvasWidth, canvasHeight, this.paddingWidth, this.paddingHeight);
    if (this.ruler) {
      this.ruler.setX(-startX);
      this.ruler.setY(-startY);
    }
    this.$canvas.width(canvasWidth)
    this.$canvas.height(canvasHeight)
    this.$canvas.css('margin-left', marginLeft + 'px')
    this.$canvas.css('margin-top', marginTop + 'px')
    this.$scrollContent.width(scrollContentWidth)
    this.$scrollContent.height(scrollContentHeight)
    this.myScroll.scrollTo(-startX, -startY)
    this.myScroll.refresh()
  }

  setCanvasSize(canvasWidth, canvasHeight) {
    this.layoutCanvas(canvasWidth, canvasHeight)
  }


  setupEvent() {
    let EVENTS = this.EVENTS;

    let stageElem = this.$el[0]
    let canvasElem = this.$canvas[0];
    stageElem.addEventListener(EVENTS[1], event => {
      let canvasRect = canvasElem.getBoundingClientRect();
      let eventInfo: any = this.getEventInfo(event);
      let left = eventInfo.clientX - canvasRect.left;
      let top = eventInfo.clientY - canvasRect.top;
      if (left >= 0 && top >= 0 && left < this.$canvas.width() && top < this.$canvas.height()) {
        this.ruler.setCursorPos(left, top)
        this.ruler.showCursor();
      } else {
        this.ruler.hideCursor();
      }
    })

    canvasElem.addEventListener(EVENTS[0], event => {
      let canvasRect = canvasElem.getBoundingClientRect();
      this.unselectComponent();
      console.log('canvas down')
      let that = this;
      let eventInfo: any = this.getEventInfo(event);
      let startX = eventInfo.clientX;
      let startY = eventInfo.clientY;
      let component = new Component();
      component.setContent('<div class="hot-area-box"></div>')
      this.addComponent(component)
      function move(event) {
        event = that.getEventInfo(event)
        let curStartX = event.clientX;
        let curStartY = event.clientY;
        let left, top, width, height;
        if (curStartX < startX) {
          left = curStartX;
          width = startX -curStartX;
        } else {
          left = startX;
          width = curStartX - startX;
        }

        if (curStartY< startY) {
          top = curStartY;
          height = startY -curStartY;
        } else {
          top = startY;
          height = curStartY - startY;
        }
        that.setElementPos(component.$el, left - canvasRect.left, top - canvasRect.top, width, height)
      }
      function end(event) {
        if (component.width() < component.minWidth || component.height() < component.minHeight) {
          that.removeComponent(component);
        }
        document.removeEventListener(EVENTS[1], move)
        document.removeEventListener(EVENTS[2], end)
      }

      document.addEventListener(EVENTS[1], move)
      document.addEventListener(EVENTS[2], end)
    })
  }

  unselectComponent() {
    if (this.curSelectedComponent) {
      this.curSelectedComponent.unselect();
      this.curSelectedComponent = null;
    }
  }

  selectComponent(component) {
    if (this.curSelectedComponent != null && this.curSelectedComponent != component) {
      this.curSelectedComponent.unselect();
    }
    component.select();
    this.curSelectedComponent = component;
  }

  setElementPos($elem, left, top, width, height) {
    $elem.css('left', left + 'px')
    $elem.css('top', top + 'px')
    $elem.css('width', width + 'px')
    $elem.css('height', height + 'px')
  }

  isTouch() {
    return 'ontouchstart' in window;
  }

  getEventInfo(event) {
    return this.isTouch() ? event.targetTouches[0] : event
  }

  resetAlignElements() {
    this.drags.forEach(item => {
      item.setAlignDrags(this.drags);
    })
  }

  removeComponent(component) {
    component.remove();
    // @ts-ignore
    this.drags.remove(component.drag);
  }

  addComponent(component) {
    component.mount(this);
    this.drags.push(component.drag);
    this.resetAlignElements();
  }

}
