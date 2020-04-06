import Draggable from './Draggable';
import Stage from './Stage';
import SetPositionAction from "./SetPositionAction"
export default abstract class Component {
  $contentBox: JQuery
  $el: JQuery
  $topBar: JQuery
  $bottomBar: JQuery
  minWidth: number
  minHeight: number
  $inputX: JQuery
  $inputY: JQuery
  $inputWidth: JQuery
  $inputHeight: JQuery
  $propPanel: JQuery
  drag: Draggable
  stage: Stage
  props: any = {}
  formData: any = {}
  name: string
  id: string
  isLockedPos: boolean = false
  enableResize: boolean = true
  selectFlag: number = 0
  isEditPopup: boolean = true
  isInit: boolean = false
  constructor(name = '', prop = {}) {
    this.name = name;
    for (let k in prop) {
      this[k] = prop[k]
    }
    let $el = $(`
      <div class="component-box t-app">
        <div class="content-box">
        </div>
      </div>
    `);
    this.$contentBox = $el.find('.content-box');
    if (name) {
      $el.addClass(name)
    }
    this.$el = $el;
    this.minWidth = 24;
    this.minHeight = 24;
    let that = this;
    this.$contentBox.dblclick(function() {
      if (that.isEditPopup) {
        that.openEditDialog();
      }
    })
  }

  width() {
    return this.$el.width();
  }

  height() {
    return this.$el.height();
  }
  left() {
    return parseInt(this.$el[0].style.left);
  }
  top() {
    return parseInt(this.$el[0].style.top);
  }
  setContent(content) {
    this.$contentBox.append(content)
  }

  remove() {
    this.$el.remove();
  }
  clone() {
    let copyELem = this.stage.$componentTopBar.find('.copy')[0];
    let copyElemLeft = this.stage.$componentTopBar[0].offsetLeft + copyELem.offsetLeft;
    let copyElemTop = this.stage.$componentTopBar[0].offsetTop + copyELem.offsetTop;
    let component = new (<any>this.constructor)
    component.formData = JSON.parse(JSON.stringify(this.formData));
    component.update(this.formData)

    component.setPosition({
      l: copyElemLeft,
      t: copyElemTop,
      w: this.width(),
      h: this.height()
    });
    let that = this;
    this.stage.actionManager.execute({
      do() {
        that.stage.addComponent(component)
        that.stage.selectComponent(component)
      }, undo() {
        that.stage.removeComponent(component)
        that.stage.unselectComponent(component)
        if (that.stage.components.length > 0) {
          that.stage.selectComponent(that.stage.components[that.stage.components.length - 1])
        }
      }
    })

    // let mouseEvent = document.createEvent('MouseEvent');
    let clientX = this.stage.curMouseEvent.clientX;
    let clientY = this.stage.curMouseEvent.clientY;
    // // @ts-ignore
    // mouseEvent.initMouseEvent('mousedown', true, true, window, 0,
    //   0, 0, clientX, clientY);
    // component.$contentBox[0].dispatchEvent(mouseEvent);
    component.drag.start({type: 'mock', clientX: clientX, clientY: clientY});
  }
  abstract getProps() : object;
  abstract toHtml() : string;
  abstract openEditDialog(): void
  abstract update(formData: any): void
  abstract doUpdate(formData: any): void
  abstract initPorpPanel(): void
  select() {
    if (this.selectFlag) {
      return
    }
    this.$el.addClass('ui-selected');
    this.selectFlag = 1
    this.resetPositionInfo();
    this.initPorpPanel()
  }

  resetPositionInfo() {
    this.stage.resetComponentPositionInfo();
  }

  setPosition({ l, t, w, h }, flag = false) {
    let originPos = {
      l: this.left(),
      t: this.top(),
      w: this.width(),
      h: this.height()
    }
    this.$el.width(w)
    this.$el.height(h)
    this.$el.css('left', l + 'px')
    this.$el.css('top', t + 'px')
    let endPos = {
      l: this.left(),
      t: this.top(),
      w: this.width(),
      h: this.height()
    }
    if (flag) {
      if (originPos.l !== endPos.l || originPos.t !== endPos.t ||
        originPos.w !== endPos.w || originPos.h !== endPos.h) {
        let setPositionAction = new SetPositionAction(this);
        setPositionAction.setOriginPos(originPos);
        setPositionAction.setEndPos(endPos);
        this.stage.actionManager.execute(setPositionAction);
      }
    }
  }

  unselect() {
    this.$el.removeClass('ui-selected')
    this.selectFlag = 0;
    this.stage.hideComponentToolbar();
  }

  deleteSelf() {
    let layer = layui.layer;
    let that = this
    layer.confirm('您确定是否删除该组件吗？',  {
      btn: ['确定','关闭'],
      icon: 3,
      title:'提示'
    }, function(idx) {
      layer.close(idx)
      that.stage.removeComponent(that)
    }, function() {
    });
  }
  mount(stage: Stage) {
    this.stage = stage;
    let $canvas = stage.$canvas;
    $canvas.append(this.$el)
    if (this.enableResize) {
      // @ts-ignore
      this.$el.resizable({
        // containment: $canvas[0],
        classes: {
          'ui-resizable-se': '',
        },
        handles: 'all',
        resize: () => {
          this.resetPositionInfo();
          this.stage.setComponentToolbarPos();
        }
      })
    }
    this.$contentBox.on('mousedown',  (event) => {
      console.log('mousedown')
      if (this.selectFlag === 1) {
        this.initPorpPanel();
        return
      }

      if (event.ctrlKey) {
        this.stage.selectComponent(this, 1);
      } else {
        this.stage.selectComponent(this);
      }
    });

    this.$contentBox.on('mouseenter', (event) => {
      if (this.drag.dragStatus === 2) {
        this.drag.dragStatus = 1
      }
      if (this.selectFlag !== 0 && this.drag.dragStatus === 0) {
        this.stage.showComponentToolbar(this);
      }
    })

    this.$contentBox.on('mouseleave', (event) => {
      if (this.drag.dragStatus === 1) {
        this.drag.dragStatus = 2
        this.stage.dragScroll(event, this.drag)
      }
    })
    this.$contentBox.on('contextmenu', function(event) {
      event.preventDefault();
    });
    if (!this.isInit) {
      this.init();
    }
  }

  init() {
    this.isInit = true;
    this.id = this.stage.getRandomStr(4)
    let that = this;
    let drag = new Draggable(this.$el[0], {
      handle: this.$contentBox[0],
      containment: this.stage.$canvas[0],
      isMulti: true,
      snap: true
    })
    this.drag = drag;
    let originPos = null;
    drag.onStart = (event) => {
      originPos = {
        l: this.left(),
        t: this.top(),
        w: this.width(),
        h: this.height()
      }
    }

    drag.onMultiDrag = () => {
      if (this.drag.dragStatus === 0) {
        this.drag.dragStatus = 1
      }
      this.stage.hideComponentToolbar();
    }
    drag.onMultiStop = () => {
      this.drag.dragStatus = 0;
      this.stage.showComponentToolbar(this);
    }
    drag.onDrag = (event) => {
      this.stage.hideComponentToolbar();
      if (this.drag.dragStatus === 0) {
        this.drag.dragStatus = 1
      }
    }
    drag.onStop = (event) => {
      this.drag.dragStatus = 0;
      this.stage.showComponentToolbar(this);
      let endPos = {
        l: this.left(),
        t: this.top(),
        w: this.width(),
        h: this.height()
      }
      if (originPos.l !== endPos.l || originPos.t !== endPos.t) {
        let setPositionAction = new SetPositionAction(this);
        setPositionAction.setOriginPos(originPos);
        setPositionAction.setEndPos(endPos);
        this.stage.actionManager.execute(setPositionAction);
      }
    }

  }


}
