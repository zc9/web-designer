import ImgComponent from './ImgComponent'
import TextComponent from './TextComponent'
import StageContainer from './StageContainer';
export default class ComponentList {
  stageCt: StageContainer
  $el: JQuery
  constructor(stageCt) {
    this.stageCt = stageCt;
    let $el = $('.component-list');
    this.$el = $el;
    $el.find('li').bind('mousedown', function(event) {
      let name = $(this).data('name')
      let component = null;
      if (name === 'img-component') {
        component = new ImgComponent();
      } else if (name === 'text-component') {
        component = new TextComponent();
      }
      stageCt.curStage.addComponent(component)
      stageCt.curStage.selectComponent(component)
    })
  }
}
