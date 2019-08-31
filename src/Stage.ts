import Draggable from './Draggable';
import Ruler from './Ruler';
import Component from './Component';
import HotAreaComponent from './HotAreaComponent';

export default class Stage {
  static STATE: Array<string> = ['hotarea', 'selection', 'handle']
  EVENTS: Array<string> = []
  isRuler: boolean = true
  drags: Array<Draggable> = []
  curSelectedComponent: Component = null
  components: Array<Component> = []
  $el: JQuery
  $canvasWrap: JQuery
  $canvasBox: JQuery
  $scrollContent: JQuery
  $canvas: JQuery
  myScroll: any
  selector = null
  paddingWidth: number
  paddingHeight: number
  ruler: Ruler
  pageWidth: number = 1920
  pageHeight: number = 2561
  state: string = Stage.STATE[0]
  props: any = {
    bgColor: '#FFFFFF',
    position: '50% 0%',
    overflow: 'hidden'
  }
  id: string
  constructor() {
    this.EVENTS = this.isTouch() ?
    ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];
    this.id = this.getRandomStr(5)
  }
  create($stageCt) {
    let canvasWidth = this.pageWidth;
    let canvasHeight = this.pageHeight;
    let $el = $('<div class="stage"></div>');

    let $canvasWrap, $scrollContent, $canvas;

    $stageCt.append($el);

    $canvasWrap = $(`
      <div class="canvas-wrap">
        <div>
          <div class="canvas-box">
            <div class="canvas">
            </div>
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
    this.$canvasBox = $canvasWrap.find('.canvas-box');
    this.$canvasWrap = $canvasWrap;
    this.$el = $el;
    this.ruler = ruler;
    this.$scrollContent = $scrollContent;
    this.createIScroll()
    this.layoutCanvas(canvasWidth, canvasHeight);
    let $rulerX = ruler.$rulerX[0];
    let $rulerY = ruler.$rulerY[0];
    let EVENTS = this.EVENTS;
    $rulerX.addEventListener(EVENTS[0], event => {
      let $guideLine = $('<div class="guide-line guide-lineX"><div></div></div>');
      this.$el.append($guideLine)
      let drag = new Draggable($guideLine[0], {
        snapAnchor: $guideLine[0].children[0],
        minLeft: 20,
        axis: 'y',
        cursor: 'row-resize',
        resizable: false,
      })
      $guideLine.css('top', (event.clientY - this.$el[0].getBoundingClientRect().top - $guideLine[0].children[0]['offsetTop']) + 'px')
      drag.start(event)
      drag.onStop = function(event) {
        if (drag.$el.offsetTop <= 15) {
          $(drag.$el).remove();
        }
      }
    })

    $rulerY.addEventListener(EVENTS[0], event => {
      let $guideLine = $('<div class="guide-line guide-lineY"><div></div></div>');
      this.$el.append($guideLine)

      let drag = new Draggable($guideLine[0], {
        snapAnchor: $guideLine[0].children[0],
        minTop: 20,
        axis: 'x',
        cursor: 'col-resize',
        resizable: false,
      })
      $guideLine.css('left', (event.clientX - this.$el[0].getBoundingClientRect().left - $guideLine[0].children[0]['offsetLeft']) + 'px')
      drag.start(event)
      drag.onStop = function(event) {
        if (drag.$el.offsetLeft <= 15) {
          $(drag.$el).remove();
        }
      }
    })

    this.selector = $scrollContent.selectable({
      disabled: true
    });
    this.setupEvent();

  }

  createIScroll(disableMouse = true, x = 0, y = 0) {
    // @ts-ignore
    this.myScroll = new IScroll(this.$canvasWrap[0], {
      scrollX: true,
      freeScroll: true,
      startX: x,
      startY: y,
      probeType: 3,
      scrollbars: true,
      mouseWheel: true,
      interactiveScrollbars: true,
      disableMouse: disableMouse,
      disablePointer: disableMouse,
      disableTouch: disableMouse
    });
    let ruler = this.ruler
    this.myScroll.on('scroll', function() {
      if (ruler) {
        ruler.setX(this.x);
        ruler.setY(this.y)
      }
    });
  }

  layoutCanvas(canvasWidth, canvasHeight) {
    let startX = 0, startY = 0, marginLeft = 0, marginTop = 0;
    let scrollContentWidth = canvasWidth, scrollContentHeight = canvasHeight;
    marginLeft = this.paddingWidth / 2;
    marginTop = this.paddingHeight / 2;
    scrollContentWidth = Math.ceil(canvasWidth / 50) * 50 + this.paddingWidth;
    scrollContentHeight = Math.ceil(canvasHeight / 50) * 50 + this.paddingHeight;
    if (canvasWidth < this.$canvasWrap.width()) {
      startX = scrollContentWidth / 2 - this.$canvasWrap.width() / 2;
    } else {
      startX = this.paddingWidth / 2;
    }
    if (canvasHeight < this.$canvasWrap.height()) {
      startY = scrollContentHeight / 2 -this.$canvasWrap.height() / 2;
    } else {
      startY = this.paddingHeight / 2
    }
    this.ruler.update(canvasWidth, canvasHeight, this.paddingWidth, this.paddingHeight);
    if (this.ruler) {
      this.ruler.setX(-startX);
      this.ruler.setY(-startY);
    }
    this.$canvas.width(canvasWidth)
    this.$canvas.height(canvasHeight)
    // this.$canvas.css('margin-left', marginLeft + 'px')
    // this.$canvas.css('margin-top', marginTop + 'px')
    this.$canvasBox.width(canvasWidth)
    this.$canvasBox.height(canvasHeight)
    this.$canvasBox.css('margin-left', marginLeft + 'px')
    this.$canvasBox.css('margin-top', marginTop + 'px')
    this.$scrollContent.width(scrollContentWidth)
    this.$scrollContent.height(scrollContentHeight)
    this.myScroll.scrollTo(-startX, -startY)
    this.myScroll.refresh()
  }

  setCanvasSize(canvasWidth, canvasHeight) {
    this.pageWidth = canvasWidth
    this.pageHeight = canvasHeight
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
      if (event.target !== canvasElem) {
        return
      }
      this.unselectComponent();
      if (this.state !== Stage.STATE[0]) {
        return
      }
      let canvasRect = canvasElem.getBoundingClientRect();
      let that = this;
      let eventInfo: any = this.getEventInfo(event);
      let startX = eventInfo.clientX;
      let startY = eventInfo.clientY;
      let component = null
      function move(event) {
        if (component === null) {
          component = new HotAreaComponent();
          that.curSelectedComponent = component
          that.addComponent(component)
          component.select()
          component.showToolbar()
        }
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
        component.resetPositionInfo()
      }
      function end(event) {
        if (component) {
          if (component.width() < component.minWidth || component.height() < component.minHeight) {
            that.removeComponent(component);
          }
        }
        document.removeEventListener(EVENTS[1], move)
        document.removeEventListener(EVENTS[2], end)
      }

      document.addEventListener(EVENTS[1], move)
      document.addEventListener(EVENTS[2], end)
    })
  }

  setState(state) {
    this.state = state
    if (state === Stage.STATE[1]) {
      this.selector.selectable('option', 'disabled', false);
    } else {
      this.selector.selectable('option', 'disabled', true);
    }

    if (state === Stage.STATE[2]) {
      this.$canvas.addClass('handle')
      let x = this.myScroll.x
      let y = this.myScroll.y
      this.myScroll.destroy()
      this.createIScroll(false, x, y)
    } else {
      this.$canvas.removeClass('handle')
      let x = this.myScroll.x
      let y = this.myScroll.y
      this.myScroll.destroy()
      this.createIScroll(true, x, y)
    }

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


  removeComponent(component) {
    component.remove();
    // @ts-ignore
    this.components.remove(component)
  }

  addComponent(component) {
    component.mount(this);
    this.components.push(component)
  }

  setComponentAllowOverstep(allowOverstep) {
    this.components.forEach((component) => {
      if (allowOverstep) {
        component['drag'].option('containment', false)
      } else {
        component['drag'].option('containment', 'parent')
      }
    })
  }

  generateJsonCode() {
    this.props.width = this.pageWidth
    this.props.height = this.pageHeight
    this.props.app = []
    this.components.forEach((component) => {
      this.props.app.push(component.getProps())
    })
    return JSON.stringify(this.props)
  }

  generateHtmlCode() {
    let appsHtml = []
    this.components.forEach((component) => {
      appsHtml.push(component.toHtml())
    })
    return `<div style="position: relative; overflow: hidden;width: ${this.pageWidth}px; height: ${this.pageHeight}px;background: ${this.props.bgColor};">
      ${appsHtml.join('')}
    </div>`
  }

  getRandomStr(len) {
    let charArr = []
    const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    while (len--) {
      charArr.push(chars[Math.floor(chars.length * Math.random())])
    }
    return charArr.join('')
  }

}
