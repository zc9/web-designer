import Action from "./Action"
import Component from "./Component"

export default class SetPositionAction implements Action {
  originPos: any = null;
  endPos: any = null;
  component: Component = null;
  constructor(component: Component) {
    this.component = component;
  }
  setOriginPos(originPos) {
    this.originPos = originPos;
  }
  setEndPos(endPos) {
    this.endPos = endPos;
  }
  do() {
    if (this.component && this.endPos) {
      this.component.$el.width(this.endPos.w);
      this.component.$el.height(this.endPos.h);
      this.component.$el.css('left', this.endPos.l + 'px')
      this.component.$el.css('top', this.endPos.t + 'px')
      this.component.stage.selectComponent(this.component)
    }
  }

  undo() {
    if (this.component && this.originPos) {
      this.component.$el.width(this.originPos.w);
      this.component.$el.height(this.originPos.h);
      this.component.$el.css('left', this.originPos.l + 'px')
      this.component.$el.css('top', this.originPos.t + 'px')
      this.component.stage.selectComponent(this.component)
    }
  }

}
