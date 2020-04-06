import Component from './Component';
import { wwUrl,onLinkModeChanged,valEmpty} from './commonCss'
export default class HotAreaComponent extends Component {
  $content: JQuery
  constructor() {
    super('hotarea-component')
    let $lHtml = `
        <div class="hot-area-box"></div>
      `
    this.$contentBox.append($lHtml)
    this.$content = this.$contentBox.find('.hot-area-box')

    this.initFormData()

  }
  initFormData() {
    this.formData.appLabel = ''
    this.formData.linkMode = 'urlink'
    this.formData.href = ''
    this.formData.hrefMode ='_blank'
    this.formData.wangID = ''
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
    let top, left, width, height,url,bgColor,hrefMode

    top = this.$el.css('top')
    left = this.$el.css('left')
    width = this.$el.width()
    height = this.$el.height()
    bgColor=valEmpty(this.formData.bgColor)  !="" ? 'background-color:'+this.formData.bgColor+';' :''
    url = wwUrl(this.formData.href,this.formData.linkMode,this.formData.wangID,22)
    hrefMode=valEmpty(this.formData.hrefMode) ==="_blank" ? ' target="_blank" ' : '';
    url=url !="" ? ' href="'+url+'"' : '';

    return '<a '+url+hrefMode+' class="abs"  style="top: '+top+'; left:'+left+'; width:'+width+'px; height:'+height+'px;display:inline-block;'+bgColor+'"></a>'

   /*
    return `
      <a href="${url}" target="${this.formData.hrefMode || ''}" style="position: absolute; top: ${top}; left: ${left}; width: ${width}px; height: ${height}px;background-color: ${bgColor};display:inline-block; ">

      </a>
    `*/
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
    onLinkModeChanged($propPanel, this.formData.linkMode)
    let $wangIDInput = $propPanel.find('input[type=text][name=wangID]')
    $wangIDInput.val(this.formData.wangID)

    let $bgColorInput = $propPanel.find('input[type=text][name=bgColor]')
    $bgColorInput.val(this.formData.bgColor)
    if (this.formData.bgColor) {
      $bgColorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.bgColor)
    }else{
      $bgColorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }

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
      onLinkModeChanged($propPanel, that.formData.linkMode)
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
    let $bgColorInput = $propPanel.find('input[type=text][name=bgColor]')
    $bgColorInput.change(function() {
      let val = $(this).val()
      that.formData.bgColor = val
      that.update(that.formData)
    })
  }
  doUpdate(formData: any): void {
  }
  update(formData) {
   let that = this
   if(formData.bgColor !=""){
     that.$content.css('background-color',formData.bgColor)
   }else{
     that.$content.css('background-color','transparent')
   }
  }
  openEditDialog() {

  }
}
