export default class Ruler {
  $el: JQuery
  $rulerX: JQuery
  $rulerY: JQuery
  $cursorPosX: JQuery
  $cursorPosY: JQuery
  canvasWidth: number
  canvasHeight: number
  paddingWidth: number
  paddingHeight: number
  width: number
  height: number
  constructor() {
  }
  create($ct) {
    let $el = $(`
      <div class="ruler">
        <div class="rulerX">
          <div>
            <div class="cursor-pos"><span>0</span></div>
          </div>
        </div>
        <div class="rulerY">
          <div>
            <div class="cursor-pos"><span>0</span></div>
          </div>
        </div>
      </div>
    `);
    let $rulerX = $el.find('.rulerX > div');
    let $rulerY = $el.find('.rulerY > div');
    this.$el = $el;
    this.$rulerX = $rulerX;
    this.$rulerY = $rulerY;
    this.$cursorPosX = $rulerX.find('.cursor-pos');
    this.$cursorPosY = $rulerY.find('.cursor-pos');
    $ct.append(this.$el);
  }
  draw() {
    let canvasWidth = this.canvasWidth;
    let canvasHeight = this.canvasHeight;
    let paddingWidth = this.paddingWidth;
    let paddingHeight = this.paddingHeight;
    // let paddingWidth = Math.ceil(canvasWidth / 3 / 50) * 50 * 2;
    // paddingWidth = 1400;
    let rulerWidth = Math.ceil(canvasWidth / 50) * 50 + paddingWidth;
    // let paddingHeight = Math.ceil(canvasHeight / 3 / 50) * 50 * 2;
    // paddingHeight = 700;
    let rulerHeight = Math.ceil(canvasHeight / 50) * 50 + paddingHeight;

    this.paddingHeight = paddingHeight;
    this.paddingWidth = paddingWidth;
    this.width = rulerWidth;
    this.height = rulerHeight;

    let initXValue = -(paddingWidth / 2);
    let ruleXSpans = '';
    for (let i = 0; i < rulerWidth / 50; i++) {
      ruleXSpans += `<span>${Math.abs(initXValue + i * 50)}</span>`;
    }

    let initYValue = -(paddingHeight / 2);
    let ruleYSpans = '';
    for (let i = 0; i < rulerHeight / 50; i++) {
      ruleYSpans += `<span>${Math.abs(initYValue + i * 50)}</span>`;
    }
    this.$rulerX.append(ruleXSpans)
    this.$rulerX.width(rulerWidth)

    this.$rulerY.append(ruleYSpans)
    this.$rulerY.height(rulerHeight)
  }

  update(canvasWidth, canvasHeight, paddingWidth, paddingHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.paddingWidth = paddingWidth;
    this.paddingHeight = paddingHeight;
    this.$rulerX.find('> span').remove();
    this.$rulerY.find('> span').remove();
    this.draw();
  }

  showCursor() {
    this.$cursorPosX.show();
    this.$cursorPosY.show();
  }
  hideCursor() {
    this.$cursorPosX.hide();
    this.$cursorPosY.hide();
  }

  setCursorPos(x, y) {
    this.$cursorPosX.css('left', (this.paddingWidth / 2 + x) + 'px')
    this.$cursorPosY.css('top', (this.paddingHeight / 2 + y) + 'px')
    this.$cursorPosX.find('span').text(Math.ceil(x))
    this.$cursorPosY.find('span').text(Math.ceil(y))
  }

  setX(x) {
    this.$rulerX.css('left', x + 'px')
  }

  setY(y) {
    this.$rulerY.css('top', y + 'px')
  }
}

