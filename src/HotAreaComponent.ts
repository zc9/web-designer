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
  initPorpPanel() {
  }
  openEditDialog() {

  }
  update(formData) {

  }
}
