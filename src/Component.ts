import Drag from './Drag';
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
  drag: Drag
  stage: Stage
  props: any = {}
  formData: any = {}
  name: string
  id: string
  constructor(name = '') {
    this.name = name;
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
          <span>宽:<input type="text" value="0"></span>
          <span>高:<input type="text" value="0"></span>
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

  select() {
    this.$topBar.show();
    this.$bottomBar.show();
    this.$contentBox.addClass('selected');
    this.resetPositionInfo();
  }

  resetPositionInfo() {
    let left = this.drag.$el.style.left;
    let top = this.drag.$el.style.top;
    this.$inputX.val(parseInt(left ? left : 0));
    this.$inputY.val(parseInt(top ? top : 0));
    this.$inputWidth.val(this.width());
    this.$inputHeight.val(this.height());
  }

  unselect() {
    this.$topBar.hide();
    this.$bottomBar.hide();
    this.$contentBox.removeClass('selected')
  }

  mount(stage: Stage) {
    this.stage = stage;
    this.id = stage.getRandomStr(4)
    let $canvas = stage.$canvas;
    this.$el.css('left', '0')
    this.$el.css('top', '0')
    $canvas.append(this.$el)
    let drag = new Drag(this.$el[0], {
      allowOverstep: stage.props.overflow === 'hidden' ? false : true,
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      dragAnchor: this.$contentBox[0],
      // isShowDist: false,
    })
    this.drag = drag;
    drag.onMove = () => {
      this.resetPositionInfo();
    }
    drag.onResize = () => {
      this.resetPositionInfo();
    }
    this.$contentBox.on('mousedown',  (event) => {
      if (stage.curSelectedComponent != this) {
        stage.selectComponent(this);
      }
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
  }

}
