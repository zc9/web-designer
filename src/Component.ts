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
  enableResize: boolean = true
  selected: boolean = false
  constructor(name = '', prop = {}) {
    this.name = name;
    for (let k in prop) {
      this[k] = prop[k]
    }
    let $el = $(`
      <div class="component-box">
        <div class="top-bar">
          <span class="setting" title="编辑"></span>
          <span class="lock"></span>
          <span class="delete"></span>
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
      that.openEditDialog();
    })
    this.$el.dblclick(function() {
      that.openEditDialog();
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

  abstract getProps() : object;
  abstract toHtml() : string;
  abstract openEditDialog(): void
  abstract update(formData: any): void
  abstract initPorpPanel(): void
  select() {
    if (this.selected) {
      return
    }
    this.$contentBox.addClass('selected');
    this.selected = true
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
    this.$contentBox.removeClass('selected')
    this.selected = false
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
    drag.onDrag = () => {
      this.resetPositionInfo();
    }
    drag.onResize = () => {
      this.resetPositionInfo();
    }
    this.$contentBox.on('mousedown',  (event) => {
      stage.selectComponent(this);
      this.showToolbar()
    });

    this.$topBar.find('.delete').on('mousedown', (event) => {
      event.stopPropagation();
      stage.removeComponent(this)
    })

    this.$topBar.on('mousedown', (event) => {
      event.stopPropagation();
    })
    this.$bottomBar.on('mousedown', (event) => {
      event.stopPropagation();
    })

    // this.$el.on('mouseenter', (event) => {
    //   if (this.selected) {
    //     this.showToolbar()
    //   }
    // })

    // this.$el.on('mouseleave', (event) => {
    //   if (this.selected) {
    //     this.$topBar.hide();
    //     this.$bottomBar.hide();
    //   }
    // })
  }


}
