import ToolConfig from './ToolConfig'
import StageContainer from './StageContainer';
import AlignBar from './AlignBar';
export default class Toolbar {
  $el: JQuery
  stageCt: StageContainer
  constructor(stageCt) {
    this.stageCt = stageCt
    let $settingBar = $('.setting-bar')
    let $pageConfig = $settingBar.find('.page-config')
    let $assistConfig = $settingBar.find('.assist-config')
    let $magnetConfig = $settingBar.find('.magnet-config')
    let $alignConfig = $settingBar.find('.align-config');
    let alignBar = new AlignBar(stageCt.curStage, $alignConfig);
    let $curSetting = $pageConfig
    let $el = $('.toolbar')
    let $curItem = $el.find('.group3.active')
    let $curItemOfGroup1 = $el.find('.group1.active')
    this.$el = $el
    let that = this
    $el.find('li').on('click', function(event) {
      let $this = $(this)
      let name = $this.data('name')
      if (name === 'draggable') {
        ToolConfig.draggable = !ToolConfig.draggable
        let $icon = $this.find('icon')
        if (ToolConfig.draggable) {
          $icon.text('ꑸ')
          $icon.removeClass('color0')
          $icon.addClass('color1')
        } else {
          $icon.text('ꑹ')
          $icon.removeClass('color1')
          $icon.addClass('color0')
        }
      } else if (name === 'assist' || name === 'magnet' || name === 'page') {
        let $setting = $(`.${name}-config`)
        if (!$curSetting.is($setting)) {
          $curSetting.hide()
          $curSetting = $setting
          $curSetting.show()
          $curItem.removeClass('active')
          $this.addClass('active')
          $curItem = $this
        }
      } else if (name === 'hotarea' || name === 'selection' || name === 'handle') {
        if ($this !== $curItemOfGroup1) {
          if (name === 'selection') {
            $alignConfig.show();
            $pageConfig.hide();
          } else {
            $alignConfig.hide();
            $pageConfig.show();
          }
          $curItemOfGroup1.removeClass('active')
          $this.addClass('active')
          $curItemOfGroup1 = $this
          that.stageCt.curStage.setState(name)
        }
      }
    })
  }
}
