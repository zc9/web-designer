import Draggable from './Draggable';
import Ruler from './Ruler';
import Component from './Component';
import HotAreaComponent from './HotAreaComponent';
import ImgComponent from './ImgComponent';
import TextComponent from './TextComponent';
import WangComponent from './WangComponent';
import VideoComponent from './VideoComponent';
import ImgAntComponent from './ImgAntComponent';
import History from './History'
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
  propPanel: any = {}
  history: History = new History()
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

    this.initPorpPanel()

    this.recordOps()
    this.checkStore()
    this.autoStore()
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

  checkStore() {
    let data = localStorage.getItem('data')
    let that = this
    if (data) {
      let layer = layui.layer;
      layer.confirm('检测到您之前有正在编辑的内容，是否继续上次的操作？',  {
        btn: ['确定','关闭'],
        icon: 3,
        title:'提示'
      }, function(idx) {
        layer.close(idx)
        let jsonObj = JSON.parse(data)
        that.loadProp(jsonObj)
        that.recordOps()
      }, function() {
      });
    }
  }

  autoStore() {
    let that = this
    setInterval(function() {
      if (that.components.length > 0) {
        let jsonCode = that.generateJsonCode()
        localStorage.setItem('data', jsonCode)
      }
    }, 3000)
  }
  recordOps() {
    this.history.add(this.generateJsonCode())
  }

  backOps() {
    let data = this.history.back()
    if (data) {
      this.loadProp(JSON.parse(data))
    }
  }

  forwardOps() {
    let data = this.history.forward()
    if (data) {
      this.loadProp(JSON.parse(data))
    }
  }

  getRandomStr(len) {
    let charArr = []
    const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    while (len--) {
      charArr.push(chars[Math.floor(chars.length * Math.random())])
    }
    return charArr.join('')
  }

  clear() {
    this.components.forEach((component) => {
      component.remove()
    })
    this.components = []
  }

  loadProp(props) {
    this.props = props;
    let propPanel = this.propPanel
    let { $el, $inputWidth, $alignSelect, $inputHeight, $allowOverstep, $inputBg } = propPanel
    $inputWidth.val(props.width)
    $inputHeight.val(props.height)
    $inputBg.val(props.bgColor)
    $alignSelect.val(props.position)
    if (props.bgColor === 'transparent') {
      this.$canvasBox.addClass('bg-trans')
      this.$canvas.css('background-color', 'transparent')
      $('#inputBgColor').val('').change()
    } else {
      this.$canvasBox.removeClass('bg-trans')
      this.$canvas.css('background-color', props.bgColor)
      $('#inputBgColor').val(props.bgColor).change()
    }
    if (props.overflow === 'hidden') {
      $allowOverstep.removeClass('active')
      this.setComponentAllowOverstep(false)
    } else if (props.overflow === 'visible')  {
      $allowOverstep.addClass('active')
      this.setComponentAllowOverstep(true)
    }
    if (props.repeat === 'repeat') {
      $el.find('.page-check[data-val=repeat]').addClass('active')
    }
    if (props.attachment) {
      $el.find('.page-check[data-val=fixed]').addClass('active')
    }
    this.setBackground()
    this.setCanvasSize(props.width, props.height)
    this.loadApp(props.app)
  }
  loadApp(apps) {
    this.clear()
    apps.forEach(app => {
      let component: Component = null
      if (app.appType === 'xdtb') {
        component = new ImgComponent
      } else if (app.appType === 'txdtb') {
        component = new ImgAntComponent
      } else if (app.appType === 'xwzb') {
        component = new TextComponent
      } else if (app.appType === 'wangh') {
        component = new WangComponent
      } else if (app.appType === 'xvb') {
        component = new VideoComponent
      }
      component.formData = app.config
      component.update(component.formData)
      component.setPosition(app.pos)
      this.addComponent(component)
    })
  }

  calcWidth() {
    let width = 0
    let left = 0
    for (let component of this.components) {
      let l = parseInt(component.$el.css('left'))
      let w = component.width()
      if (l > left) {
        left = l
        width = l + w
      }
    }
    return width
  }

  calcHeight() {
    let height = 0
    let top = 0
    for (let component of this.components) {
      let t = parseInt(component.$el.css('top'))
      let h = component.height()
      if (t > top) {
        top = t
        height = t + h
      }
    }
    return height
  }

  setBackground() {
    let attachment = this.props.attachment ? this.props.attachment : 'scroll'
    let repeat = this.props.repeat ? this.props.repeat : 'no-repeat'
    let position = this.props.position
    let bgImg = this.props.bgImg ? `url("${this.props.bgImg}")` : 'none'

    this.$canvas.css('background-image', bgImg)
    this.$canvas.css('background-repeat', repeat)
    this.$canvas.css('background-position', position)
    // this.$canvas.css('background-attachment', attachment)
    this.$canvas.css('background-color', this.props.bgColor)

  }

  initPorpPanel() {
    let $el = $('.page-config');
    let $inputWidth = $el.find('.input-width');
    let $inputHeight = $el.find('.input-height');
    let $inputBg = $el.find('.input-bg');
    let $calcWidth = $el.find('.calc-width');
    let $calcHeight = $el.find('.calc-height');
    let $alignSelect = $el.find('.align-select');
    let $allowOverstep = $el.find('#allowOverstep')
    this.propPanel = {
      $el: $el,
      $inputWidth: $inputWidth,
      $inputHeight: $inputHeight,
      $alignSelect: $alignSelect,
      $inputBg: $inputBg,
      $allowOverstep: $allowOverstep
    }
    $inputWidth.val(this.pageWidth)
    $inputHeight.val(this.pageHeight)
    let align = '50% 0'
    let that = this;
    // @ts-ignore
    //颜色选择器
    $(document).spectrum({
      showPalette : !0,
      maxSelectionSize : 18,
      showInitial : !0,
      preferredFormat : 'hex',
      showButtons : !1,
      palette: [
          ['#000','#444','#666','#999','#ccc','#eee'],
          ['#f00','#f90','#ff0','#0f0','#0ff','#00f'],
          ['#900','#b45f06','#bf9000','#38761d','#134f5c','#0b5394']
      ],
      move: function(color, $input) {
        let id = $input.attr('id')
        if (id === 'inputBgColor' && that) {
          if (!color) {
            that.$canvasBox.addClass('bg-trans');
            that.props.bgColor = 'transparent'
          }
          if (typeof color === 'object') {
            let colorHex = color.toHexString()
            that.$canvasBox.removeClass('bg-trans')
            that.props.bgColor = colorHex
          }
          that.setBackground()
        }
      }
    }).spectrum.freshSpan();

    $inputWidth.bind('input', function() {
      that.pageWidth = +$(this).val();
      that.setCanvasSize(that.pageWidth, that.pageHeight)
    });

    $inputHeight.bind('input', function() {
      that.pageHeight = +$(this).val();
      that.setCanvasSize(that.pageWidth, that.pageHeight)
    });

    $inputBg.bind('input', function() {
      let img = $(this).val()
      that.props.bgImg = img
      that.setBackground()
    })
    $alignSelect.change(function() {
      let alignValue = $(this).val()
      that.props.position = alignValue
      that.setBackground()
    })

    $allowOverstep.bind('click', function() {
      if ($allowOverstep.hasClass('active')) {
        $allowOverstep.removeClass('active')
        that.props.overflow = 'hidden'
        that.setComponentAllowOverstep(false)
      } else {
        $allowOverstep.addClass('active')
        that.props.overflow = 'visible'
        that.setComponentAllowOverstep(true)
      }
    })
    that.setBackground()
    $el.find('.bgImg-box .page-check').bind('click', function() {
      let $this = $(this)
      let val = $this.data('val')
      console.log(val)
      if ($this.hasClass('active')) {
        $this.removeClass('active')
        if (val === 'repeat') {
          that.props.repeat = ''
        }
        if (val === 'fixed') {
          that.props.attachment = ''
        }
      } else {
        $this.addClass('active')
        if (val === 'repeat') {
          that.props.repeat = 'repeat'
        }
        if (val === 'fixed') {
          that.props.attachment = 'fixed'
        }
      }
      that.setBackground()
    })

    $calcWidth.bind('click', function() {
      let w = that.calcWidth()
      $inputWidth.val(w)
      that.pageWidth = w;
      that.setCanvasSize(that.pageWidth, that.pageHeight)
    })
    $calcHeight.bind('click', function() {
      let h = that.calcHeight()
      $inputHeight.val(h)
      that.pageHeight = h;
      that.setCanvasSize(that.pageWidth, that.pageHeight)
    })
  }
}
