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
    let editTag = '';
    if (this.isEditPopup) {
      editTag = '<span class="setting" title="编辑"></span>';
    }
    let $el = $(`
      <div class="component-box t-app">
        <div class="top-bar">
          ${editTag}
          <span class="lock lock-pos" title="锁定位置"></span>
          <span class="copy" title="复制"></span>
          <span class="delete" title="删除"></span>
        </div>
        <div class="content-box">
        </div>
        <div class="bottom-bar">
          <span>X:<input type="text" value="0"></span>
          <span>Y:<input type="text" value="0"></span>
          ${this.enableResize ? '<span>宽:<input type="text" value="0"></span><span>高:<input type="text" value="0"></span>' : ''}
          <span class="confirm">确定</span>
        </div>
      </div>
    `);
    this.$contentBox = $el.find('.content-box');
    if (name) {
      $el.addClass(name)
    }
    this.$el = $el;
    this.$topBar = $el.find('.top-bar');
    this.$bottomBar = $el.find('.bottom-bar');
    this.minWidth = 24;
    this.minHeight = 24;

    this.$inputX = this.$bottomBar.find('span:nth-child(1) input');
    this.$inputY = this.$bottomBar.find('span:nth-child(2) input');
    this.$inputWidth = this.$bottomBar.find('span:nth-child(3) input');
    this.$inputHeight = this.$bottomBar.find('span:nth-child(4) input');

    let that = this;
    this.$topBar.find('.setting').bind('click', function() {
      if (that.isEditPopup) {
        that.openEditDialog();
      }
    })
    this.$contentBox.dblclick(function() {
      if (that.isEditPopup) {
        that.openEditDialog();
      }
    })

    this.$bottomBar.find('.confirm').bind('click', function() {
      let x = that.$inputX.val()
      let y = that.$inputY.val()
      let width = that.$inputWidth.val()
      let height = that.$inputHeight.val()
      that.setPosition({
        w: width,
        h: height,
        l: x,
        t: y
      })
    })

    this.$topBar.find('.lock-pos').bind('click', function() {
      let $this = $(this)
      if (that.isLockedPos) {
        that.isLockedPos = false
        $this.removeClass('unlock')
        $this.addClass('lock')
        $this.attr('title', '锁定位置')
        that.drag.enable()
      } else {
        that.isLockedPos = true
        $this.removeClass('lock')
        $this.addClass('unlock')
        $this.attr('title', '解除锁定')
        that.drag.disable()
      }
    })

    this.$topBar.find('.copy').bind('click', function() {
      that.clone()
    })
  }

  width() {
    return this.drag.$el.offsetWidth;
  }

  height() {
    return this.drag.$el.offsetHeight;
  }

  setContent(content) {
    this.$contentBox.append(content)
  }

  remove() {
    this.$el.remove();
  }
  clone() {
    let component = new (<any>this.constructor)
    component.formData = this.formData
    component.update(this.formData)
    this.stage.addComponent(component)
    this.stage.selectComponent(component)
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
    this.$el.addClass('selected');
    this.selectFlag = 1
    this.resetPositionInfo();
    this.initPorpPanel()
  }

  showToolbar() {
    this.$topBar.show();
    this.$bottomBar.show();
  }

  resetPositionInfo() {
    let left = this.drag.$el.style.left;
    let top = this.drag.$el.style.top;
    this.$inputX.val(parseInt(left ? left : 0));
    this.$inputY.val(parseInt(top ? top : 0));
    this.$inputWidth.val(this.width());
    this.$inputHeight.val(this.height());
  }

  setPosition({ l, t, w, h }) {
    this.$el.width(w)
    this.$el.height(h)
    this.$el.css('left', l + 'px')
    this.$el.css('top', t + 'px')
  }

  unselect() {
    this.$topBar.hide();
    this.$bottomBar.hide();
    this.$el.removeClass('selected')
    this.selectFlag = 0
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
        }
      })
    }

    let drag = new Draggable(this.$el[0], {
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      handle: this.$contentBox[0],
      containment: $canvas[0],
      resizable: false,
      snap: true
    })
    this.drag = drag;
    drag.onDrag = (event) => {
      this.resetPositionInfo()
      if (this.drag.dragStatus === 0) {
        this.drag.dragStatus = 1
      }
    }
    drag.onStop = (event) => {
      this.drag.dragStatus = 0
    }

    this.$contentBox.on('mousedown',  (event) => {
      // console.log('aa', this.selected)
      if (this.selectFlag === 2) {
        return
      }
      if (event.ctrlKey) {
        stage.selectComponent(this, 1);
      } else {
        stage.selectComponent(this);
      }
      this.showToolbar()
      this.selectFlag = 2
    });


    this.$topBar.find('.delete').on('mousedown', (event) => {
      event.stopPropagation();
      this.deleteSelf()
    })

    this.$topBar.on('mousedown', (event) => {
      event.stopPropagation();
    })
    this.$bottomBar.on('mousedown', (event) => {
      event.stopPropagation();
    })

    this.$el.on('mouseenter', (event) => {
      if (this.drag.dragStatus === 2) {
        this.drag.dragStatus = 1
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
