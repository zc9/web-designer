import Component from './Component'
require('./assets/wang2.gif')
require('./assets/wang1.gif')
export default class WangComponent extends Component {
  $content: JQuery
  $nickSpan: JQuery
  $cphoto: JQuery
  constructor() {
    super('wang-component', {enableResize: false})
   /* let content = `
        <a class="wang-box"><img src="./assets/wang1.gif"><span>璇子</span></a>
      `
   // this.$contentBox.append(content) */
    this.$content = $('<a class="wang-box"><img class="cphoto" src="//sc01.alicdn.com/kf/HTB1gXlQXDjxK1Rjy0Fnq6yBaFXao.jpg"><img src="./assets/wang1.gif"><span>璇子</span></a>')
    this.$nickSpan = this.$content.find('span')
    this.$cphoto = this.$content.find('.cphoto')
    this.$contentBox.append(this.$content)
    this.initFormData()
  }

  toHtml() {
    return ''
  }
  initFormData() {
    this.formData.appLabel = ''
    this.formData.wangMode = '22'
    this.formData.wangID = ''
    this.formData.bgImg = '//sc01.alicdn.com/kf/HTB1gXlQXDjxK1Rjy0Fnq6yBaFXao.jpg'
    this.formData.bgColor = ''
    this.formData.bgImgSize = false

    this.formData.nickName = '璇子'
    this.formData.nickPos = ''
    this.formData.color = ''
    this.formData.fontSize = 15
    this.formData.fontFamily = 'arial'
    this.formData.fontWeight = 400
    this.formData.fontStyle = 'normal'
    this.formData.tipText = ''
 
 
 
    this.$content.css('background-color', this.formData.bgColor)
    this.$content.css('font-size', this.formData.fontSize)
    this.$cphoto.attr('src', this.formData.bgImg) 
  }
  initPorpPanel() {
    console.log('initPorpPanel')
    let that = this
    $('.prop-setting-ct > div').hide()
    let $propPanel = $('.ww-com-prop-panel')
    this.$propPanel = $propPanel

    $propPanel.show()
    $propPanel.find('*').off()
    this.updatePropPanel()

    let $wangIDInput = $propPanel.find('input[type=text][name=wangID]') 
    $wangIDInput.change(function() {
      let val = $(this).val()
      that.formData.wangID = val
    })
    let $nickNameInput = $propPanel.find('input[type=text][name=nickName]') 
    $nickNameInput.change(function() {
      let val = $(this).val()
      that.formData.nickName = val
      that.update(that.formData)
    })
  }
  openEditDialog() {
    let layer = layui.layer;
    let $layerElem = null;
    let layerNo = layer.open({
      type: 1,
      title: '旺旺设置',
      skin: 'layui-layer-rim', //加上边框
      area: ['600px', '600px'],
      success: function(layerElem, index) {
        $layerElem = $(layerElem)
        $layerElem.find('.cancel-btn').on('click', function() {
          layer.close(index)
        })
      },
      content: `<form class="layui-form" lay-filter="imgComponentForm">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li class="layui-this">内容设置</li>
             <li>边框设置</li>
             <li>阴影外框</li>
            <li>动画设置</li>
          </ul>
          <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
            </div>
            <div class="layui-tab-item">
            </div>
            <div class="layui-tab-item">
            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-ft-btn">
            <button class="layui-btn" lay-submit lay-filter="wangComponentForm">确定</button>
            <button type="button" class="cancel-btn layui-btn layui-btn-primary">取消</button>
          </div>
        </div>
      </form>`
    });
    var form = layui.form
    form.render();
    form.on('submit(wangComponentForm)', function(data) {
      layer.close(layerNo)
      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
  }
  update(formData) {
    let that = this
    that.$nickSpan.text(formData.nickName)
  }
  updatePropPanel() {
    let $propPanel = this.$propPanel

    let $wangModeRadio = $propPanel.find('input[type=radio][name=wangMode]')
    $wangModeRadio.filter(`[value="${this.formData.wangMode}"]`).prop('checked', true)

    let $wangIDInput = $propPanel.find('input[type=text][name=wangID]')
    $wangIDInput.val(this.formData.wangID)

    let $bgImgInput = $propPanel.find('input[type=text][name=bgImg]')
    $bgImgInput.val(this.formData.bgImg)
    let $bgImgSizeCheckBox = $propPanel.find('input[type=checkbox][name=bgImgSize]')
    if (this.formData.bgImgSize === 'true') {
      $bgImgSizeCheckBox.prop('checked', true)
    } else {
      $bgImgSizeCheckBox.prop('checked', false)
    }
    let $nickNameInput = $propPanel.find('input[type=text][name=nickName]')
    $nickNameInput.val(this.formData.nickName)

    let $colorInput = $propPanel.find('input[type=text][name=color]')
    $colorInput.val(this.formData.color)

    let $bgColorInput = $propPanel.find('input[type=text][name=bgColor]')
    $bgColorInput.val(this.formData.bgColor)

    let $fontSizeInput = $propPanel.find('input[type=text][name=fontSize]')
    $fontSizeInput.val(this.formData.fontSize)

    let $fontFamilySelect = $propPanel.find('select[name=fontFamily]')
    $fontFamilySelect.val(this.formData.fontFamily)

    let $fontWeightInput = $propPanel.find('input[type=text][name=fontWeight]')
    $fontWeightInput.val(this.formData.fontWeight)

    let $fontStyleSelect = $propPanel.find('select[name=fontStyle]')
    $fontStyleSelect.val(this.formData.fontStyle)

    let $tipTextInput = $propPanel.find('input[type=text][name=tipText]')
    $tipTextInput.val(this.formData.tipText)
  }
  getProps() {
    let config = this.formData;
    config.appID = `${this.stage.id}-${this.id}`
    return {
      'appType': 'wangh',
      'config': config,
      'pos': {
        l: parseInt(this.$el.css('left')),
        t: parseInt(this.$el.css('top'))
      }
    }
  }
}
 
 