import Stage from './Stage'
import PageConfig from './PageConfig';
export default class StageContainer {
  $el: JQuery
  stages: Array<Stage> = []
  curStage: Stage = null
  constructor() {
    let $stageCt = $('.stage-ct');
    this.stages = [];
    this.$el = $stageCt;
    this.setupHotkey()
  }
  createStage() {
    let stage = new Stage();
    stage.create(this.$el);
    this.curStage = stage;
    this.stages.push(stage);
  }

  setupHotkey() {
    let that = this
    let hotKeysArr = [
      'up',
      'down',
      'left',
      'right',
      'del',
      'ctrl+c',
      'ctrl+v',
      'ctrl+z',
      'ctrl+y',
      'ctrl+a',
    ]
    // @ts-ignore
    hotkeys(hotKeysArr.join(','), function(event, handler) {
      let curStage = that.curStage
      event.preventDefault()
      console.log(handler.key)
      switch(handler.key) {
        case hotKeysArr[0]:  {
          curStage.move1PX('up')
          break;
        }
        case hotKeysArr[1]:  {
          curStage.move1PX('down')
          break;
        }
        case hotKeysArr[2]:  {
          curStage.move1PX('left')
          break;
        }
        case hotKeysArr[3]:  {
          curStage.move1PX('right')
          break;
        }
        case hotKeysArr[4]: {
          if (curStage && curStage.selectedComponents[0]) {
            curStage.selectedComponents[0].deleteSelf()
          }
        }
        case hotKeysArr[5]: {
          console.log('copy')
          break;
        }
        case hotKeysArr[6]: {
          console.log('paste')
          break;
        }
        case hotKeysArr[7]: {
          break;
        }
        case hotKeysArr[8]: {
          break;
        }
        case hotKeysArr[9]: {
          break;
        }
      }
    })

  }

}
