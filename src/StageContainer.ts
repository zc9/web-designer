import Stage from './Stage'
export default class StageContainer {
  $el: JQuery
  stages: Array<Stage> = []
  curStage: Stage = null
  constructor() {
    let $stageCt = $('.stage-ct');
    this.stages = [];
    this.$el = $stageCt;
  }
  createStage() {
    let stage = new Stage();
    stage.create(this.$el);
    this.curStage = stage;
    this.stages.push(stage);
  }
}
