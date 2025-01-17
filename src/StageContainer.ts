import Stage from './Stage'
import PageConfig from './PageConfig';
export default class StageContainer {
  $el: JQuery
  stages: Array<Stage> = []
  curStage: Stage = null
  pageConfig: PageConfig
  constructor(pageConfig) {
    this.pageConfig = pageConfig
    let $stageCt = $('.stage-ct');
    this.stages = [];
    this.$el = $stageCt;
  }
  createStage() {
    let stage = new Stage();
    stage.create(this.$el);
    this.curStage = stage;
    this.stages.push(stage);
    this.pageConfig.setStage(stage)
  }
}
