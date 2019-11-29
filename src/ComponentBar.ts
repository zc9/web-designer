import ImgComponent from './ImgComponent'
import TextComponent from './TextComponent'
import StageContainer from './StageContainer';
import Stage from './Stage';
import WangComponent from './WangComponent';
import VideoComponent from './VideoComponent';
export default class ComponentBar {
  stageCt: StageContainer
  $el: JQuery
  constructor(stageCt) {
    this.stageCt = stageCt;
    let $el = $('.component-bar');
    this.$el = $el;
    let curStage: Stage = stageCt.curStage
    $el.find('li').bind('mousedown', function(event) {
      let name = $(this).data('name')
      let component = null;
      let initX = Math.abs(curStage.myScroll.x) - curStage.paddingWidth / 2
      let initY = Math.abs(curStage.myScroll.y) - curStage.paddingHeight / 2
      if (name === 'img-component') {
        component = new ImgComponent();
      } else if (name === 'text-component') {
        component = new TextComponent();
      } else if (name === 'wang-component') {
        component = new WangComponent();
      } else if (name === 'video-component') {
        component = new VideoComponent();
      }
      component.$el.css('left', Math.max(initX, 0) + 'px')
      component.$el.css('top', Math.max(initY, 0) + 'px')
      curStage.addComponent(component)
      curStage.selectComponent(component)
      curStage.recordOps()
    })
  }
}
