import Component from './Component';
export default class HotAreaComponent extends Component {
  constructor() {
    super('hotarea-component')
    let content = `
        <div class="hot-area-box"></div>
      `
    this.$contentBox.append(content)
  }
  getProps() {
    return {}
  }
  toHtml() {
    return ''
  }
  updatePropPanel() {
  }
  initPorpPanel() {
    let that = this
    $('.prop-setting-ct > div').hide()
    let $propPanel = $('.area-com-prop-panel')
    this.$propPanel = $propPanel

    $propPanel.show()
    $propPanel.find('*').off()

    this.updatePropPanel()
  }
  openEditDialog() {

  }
  update(formData) {

  }
}
