import Draggable from './Draggable';
import Stage from './Stage';
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
    this.stage.addComponent(component)
    this.stage.selectComponent(component)
    console.log(this.width(), this.height())
    component.setPosition({
      l: copyElemLeft,
      t: copyElemTop,
      w: this.width(),
      h: this.height()
    });
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

  setPosition({ l, t, w, h }) {
    this.$el.width(w)
    this.$el.height(h)
    this.$el.css('left', l + 'px')
    this.$el.css('top', t + 'px')

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
    this.id = stage.getRandomStr(4)
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


    let drag = new Draggable(this.$el[0], {
      handle: this.$contentBox[0],
      containment: $canvas[0],
      isMulti: true,
      snap: true
    })
    this.drag = drag;
    drag.onStart = (event) => {
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
    }
    this.$contentBox.on('mousedown',  (event) => {
      if (this.selectFlag === 1) {
        this.initPorpPanel();
        return
      }
      if (event.ctrlKey) {
        // event.preventDefault();
        // event.stopPropagation()
        stage.selectComponent(this, 1);
      } else {
        stage.selectComponent(this);
      }
    });

    this.$contentBox.on('contextmenu', function(event) {
      event.preventDefault();
    });


    this.$el.on('mouseenter', (event) => {
      if (this.drag.dragStatus === 2) {
        this.drag.dragStatus = 1
      }
      if (this.selectFlag !== 0 && this.drag.dragStatus === 0) {
        this.stage.showComponentToolbar(this);
      }
    })

    this.$el.on('mouseleave', (event) => {
      if (this.drag.dragStatus === 1) {
        this.drag.dragStatus = 2
        this.stage.dragScroll(event, this.drag)
      }
    })
  }


}
