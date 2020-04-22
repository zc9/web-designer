import Stage from "./Stage";
import Component from "./Component";

export default class AlignBar {
    $el: JQuery;
    stage: Stage;
    alignMethods = {};
    $input: JQuery;
    constructor(stage, $elem) {
        this.$el = $elem; 
        this.$input = this.$el.find('#jianju');
        this.stage = stage;
        this.setAlignMethods();
        this.bindEvent();
    }
    bindEvent() {
        let that = this;
        this.$el.find('span[data-target="align-clicked"]').bind('click', function() {
            let $this = $(this);
            let alignType = $this.data('aligntype');
            console.log(alignType);
            that.align(alignType);
        });
    }
    eachPosition(cb) {
        let selectedComponents = this.stage.selectedComponents; 
        selectedComponents.forEach((c: Component) => {
           cb && cb(c);
        });
    }
    setAlignMethods() {
        this.alignMethods = {
            'top': () => {
                let top = Math.min.apply(Math, this.stage.selectedComponents.map((c: Component) => c.top()));
                this.eachPosition((c) => {
                    c.top(top);
                });
            },
            'bottom': () => {
                let bottom = Math.max.apply(Math, this.stage.selectedComponents.map((c: Component) => c.top() + c.height()));
                this.eachPosition((c) => {
                    c.top(bottom - c.height());
                });
            },
            'VerticalMiddle': () => {
                let top = Math.min.apply(Math, this.stage.selectedComponents.map((c: Component) => c.top()));
                let bottom = Math.max.apply(Math, this.stage.selectedComponents.map((c: Component) => c.top() + c.height()));
                let height = bottom - top;
                this.eachPosition((c) => {
                    let middle = top + height / 2 - c.height() / 2
                    c.top(middle);
                });
            },
            'left': () => {
                let left = Math.min.apply(Math, this.stage.selectedComponents.map((c: Component) => c.left()));
                this.eachPosition((c) => {
                    c.left(left);
                });
            },
            'right': () => {
                let right = Math.max.apply(Math, this.stage.selectedComponents.map((c: Component) => c.left() + c.width()));
                this.eachPosition((c) => {
                    c.left(right - c.width());
                });
            },
            'HorizontalMiddle': () => {
                let left = Math.min.apply(Math, this.stage.selectedComponents.map((c: Component) => c.left()));
                let right = Math.max.apply(Math, this.stage.selectedComponents.map((c: Component) => c.left() + c.width()));
                let width = right - left;
                this.eachPosition((c) => {
                    let middle = left + width / 2 - c.width() / 2
                    c.left(middle);
                });
            },
            'topCanvas': () => {
                let top = Math.min.apply(Math, this.stage.selectedComponents.map((c: Component) => c.top()));
                this.eachPosition((c) => {
                    c.top(c.top() - top);
                });
            },
            'VerticalMiddleCanvas': () => {
                let top = Math.min.apply(Math, this.stage.selectedComponents.map((c: Component) => c.top()));
                let bottom = Math.max.apply(Math, this.stage.selectedComponents.map((c: Component) => c.top() + c.height()));
                let canvasHeight = this.stage.$canvas.height();
                let tt = (canvasHeight - (bottom - top)) / 2;
                let c = this.stage.selectedComponents.find((c: Component) => c.top() === top);
                let v = tt - c.top();
                this.eachPosition((c) => {
                    c.top(c.top() + v);
                });
            },
            'bottomCanvas': () => {
                let bottom = Math.max.apply(Math, this.stage.selectedComponents.map((c: Component) => c.top() + c.height()));
                let v = this.stage.$canvas.height() - bottom;
                this.eachPosition((c) => {
                    c.top(c.top() + v);
                });
            },
            'leftCanvas': () => {
                let left = Math.min.apply(Math, this.stage.selectedComponents.map((c: Component) => c.left()));
                this.eachPosition((c) => {
                    c.left(c.left() - left);
                });
            },
            'HorizontalMiddleCanvas': () => {
                let left = Math.min.apply(Math, this.stage.selectedComponents.map((c: Component) => c.left()));
                let right = Math.max.apply(Math, this.stage.selectedComponents.map((c: Component) => c.left() + c.width()));
                let canvasWidth = this.stage.$canvas.width();
                let ll = (canvasWidth - (right - left)) / 2;
                let c = this.stage.selectedComponents.find((c: Component) => c.left() === left);
                let v = ll - c.left();
                this.eachPosition((c) => {
                    c.left(c.left() + v);
                });
            },
            'rightCanvas': () => {
                let right = Math.max.apply(Math, this.stage.selectedComponents.map((c: Component) => c.left() + c.width()));
                let v = this.stage.$canvas.width() - right;
                this.eachPosition((c) => {
                    c.left(c.left() + v);
                });
            },
            'HorizontalRange': () => {
                let value: any = this.$input.val() || 0;
                value = parseInt(value);
                let left = Math.min.apply(Math, this.stage.selectedComponents.map((c: Component) => c.left()));
                let leftCom = this.stage.selectedComponents.find((c: Component) => c.left() === left);
                let prevCom = leftCom;
                this.eachPosition((c) => {
                    if (leftCom !== c) {
                        c.left(prevCom.left() + prevCom.width() + value);
                        prevCom = c;
                    }
                });
            },
            'VerticalRange': () => {
                let value: any = this.$input.val() || 0;
                value = parseInt(value);
                let top = Math.min.apply(Math, this.stage.selectedComponents.map((c: Component) => c.top()));
                let topCom = this.stage.selectedComponents.find((c: Component) => c.top() === top);
                let prevCom = topCom;
                this.eachPosition((c) => {
                    if (topCom !== c) {
                        c.top(prevCom.top() + prevCom.height() + value);
                        prevCom = c;
                    }
                });
            }
        }
    }
    align(alignType) {
        if (this.stage.selectedComponents) {
            let m = this.alignMethods[alignType];
            if (m) {
                m();
            }
        }
    }
}