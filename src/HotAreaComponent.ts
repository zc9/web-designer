import Component from './Component';
export default class HotAreaComponent extends Component {
  constructor() {
    super('hotarea-component')
    let content = `
        <div class="hot-area-box"></div>
      `
    this.$contentBox.append(content)

  }
  initFormData() {
    this.formData.appLabel = ''
    this.formData.linkMode = 'urlink'
    this.formData.href = ''
    this.formData.hrefMode ='_blank'
    this.formData.wangID = ''
  }
  onLinkModeChanged($boxElem, linkMode) {
    let $wangBox = $boxElem.find('.wang-box')
    let $linkBox = $boxElem.find('.link-box')
    if (linkMode === 'urlink') {
      $wangBox.hide()
      $linkBox.show()
    } else if (linkMode === 'wwlink') {
      $linkBox.hide()
      $wangBox.show()
    }
  }
  getProps() {
    let config = this.formData;
    config.appID = `${this.stage.id}-${this.id}`
    return {
      'appType': 'xrq',
      'config': config,
      'pos': {
        w: this.width(),
        h: this.height(),
        l: parseInt(this.$el.css('left')),
        t: parseInt(this.$el.css('top'))
      }
    }
  }
  toHtml() {
    return ''
  }
  updatePropPanel() {
    let $propPanel = this.$propPanel

    let $linkModeRadio = $propPanel.find('input[type=radio][name=linkMode]')
    $linkModeRadio.filter(`[value="${this.formData.linkMode}"]`).prop('checked', true)
    let $hrefInput = $propPanel.find('input[type=text][name=href]')
    $hrefInput.val(this.formData.href)

    let $hrefModeCheckBox = $propPanel.find('input[type=checkbox][name=hrefMode]')
    if (this.formData.hrefMode === '_blank') {
      $hrefModeCheckBox.prop('checked', true)
    } else {
      $hrefModeCheckBox.prop('checked', false)
    }
    this.onLinkModeChanged($propPanel, this.formData.linkMode)
    let $wangIDInput = $propPanel.find('input[type=text][name=wangID]')
    $wangIDInput.val(this.formData.wangID)

  }
  initPorpPanel() {
    let that = this
    $('.prop-setting-ct > div').hide()
    let $propPanel = $('.area-com-prop-panel')
    this.$propPanel = $propPanel

    $propPanel.show()
    $propPanel.find('*').off()

    this.updatePropPanel()


    let $linkModeRadio = $propPanel.find('input[type=radio][name=linkMode]')
    $linkModeRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.linkMode = val
      that.onLinkModeChanged($propPanel, that.formData.linkMode)
    })

    let $hrefInput = $propPanel.find('input[type=text][name=href]')
    $hrefInput.change(function() {
      let val = $(this).val()
      that.formData.href = val
    })

    let $hrefModeCheckBox = $propPanel.find('input[type=checkbox][name=hrefMode]')
    $hrefModeCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.hrefMode = val ? '_blank' : ''
    })

    let $wangIDInput = $propPanel.find('input[type=text][name=wangID]')
    $wangIDInput.change(function() {
      let val = $(this).val()
      that.formData.wangID = val
    })
  }
  openEditDialog() {

  }
  update(formData) {

  }
}
