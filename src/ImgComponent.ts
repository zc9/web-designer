import Component from './Component';

export default class ImgComponent extends Component {
  constructor() {
    super('img-component')
    let content = `
        <a></a>
      `
    this.$contentBox.append(content)
  }
}
