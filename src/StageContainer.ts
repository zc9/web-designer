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
    // @ts-ignore
    hotkeys('*', function (event, handler) {
      let curStage = that.curStage
      event.preventDefault()
      let key = event.key
      console.log(key) 
      switch(key) {
        case 'ArrowUp':  {
          curStage.move1PX('up')
          break;
        }
        case 'ArrowDown':  {
          curStage.move1PX('down')
          break;
        }
        case 'ArrowLeft':  {
          curStage.move1PX('left')
          break;
        }
        case 'ArrowRight':  {
          curStage.move1PX('right')
          break;
        }
        case 'Delete': {
          console.log(curStage.curSelectedComponent)
          if (curStage && curStage.curSelectedComponent) {
            curStage.curSelectedComponent.deleteSelf()
          }
        }
      }
    });
    // @ts-ignore
    hotkeys('ctrl+c,ctrl+v', function(event, handler) {
      switch(handler.key) {
        case "ctrl+c": {
          break;
        }
        case "ctrl+v": {
          break;
        }
      }
    })
    
  }
}
