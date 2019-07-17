import Component from './Component';
export default class TextComponent extends Component {
  constructor() {
    super('text-component')
    let content = `
        <a>请双击设置文件内容</a>
      `
    this.$contentBox.append(content)
  }
  getProps() {
    return {}
  }
  toHtml() {
    return ''
  }
}
