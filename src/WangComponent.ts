import Component from './Component'
require('./assets/wang2.gif')
require('./assets/wang1.gif')
export default class WangComponent extends Component {
  $content: JQuery
  $wangImg: JQuery
  constructor() {
    super('wang-component', {enableResize: false})
   /* let content = `
        <a class="wang-box"><img src="./assets/wang1.gif"><span>璇子</span></a>
      `
   // this.$contentBox.append(content) */
   this.$content = $('<a class="wang-box"><img class="cphoto" src="//sc01.alicdn.com/kf/HTB1gXlQXDjxK1Rjy0Fnq6yBaFXao.jpg"><div class="wang-info" > <img class="wang-line" src="./assets/wang1.gif"><span>John Deao</span></div></a>')
    this.$wangImg = this.$content.find('.wang-line')
    this.$contentBox.append(this.$content)
    this.initFormData()
  }

  toHtml() {
    return ''
  }
  initFormData() {
    this.formData.appLabel = ''
    this.formData.wangMode = '1'
    this.formData.wangID = ''
    this.formData.bgImg = '//sc01.alicdn.com/kf/HTB1gXlQXDjxK1Rjy0Fnq6yBaFXao.jpg'
    this.formData.bgColor = ''
    this.formData.nickName = 'John Deao'
    this.formData.color = ''
    this.formData.fontSize = 12
    this.formData.fontFamily = 'arial'
    this.formData.fontWeight = 400
    this.formData.fontStyle = 'normal'
    this.formData.tipText = '24Hours Service Online'
    this.formData.nickMl = 5
    this.formData.bgImgMg = 5
    this.update(this.formData)
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

    let $wangModeRadio = $propPanel.find('input[type=radio][name=wangMode]')
    $wangModeRadio.change(function() {
      that.formData.wangMode = $(this).prop('value')
      that.update(that.formData)
    })

    let $wangIDInput = $propPanel.find('input[type=text][name=wangID]') 
    $wangIDInput.change(function() {
      let val = $(this).val()
      that.formData.wangID = val
    })
    let $bgImgInput = $propPanel.find('input[type=text][name=bgImg]') 
    $bgImgInput.change(function() {
      let val = $(this).val()
      that.formData.bgImg = val
      that.update(that.formData)
    })
    let $bgImgMgInput = $propPanel.find('input[type=text][name=bgImgMg]') 
    $bgImgMgInput.change(function() {
      let val = $(this).val()
      that.formData.bgImgMg = val
      that.update(that.formData)
    })
    let $nickNameInput = $propPanel.find('input[type=text][name=nickName]') 
    $nickNameInput.change(function() {
      let val = $(this).val()
      that.formData.nickName = val
      that.update(that.formData)
    })
    let $colorInput = $propPanel.find('input[type=text][name=color]') 
    $colorInput.change(function() {
      let val = $(this).val()
      that.formData.color = val
      that.update(that.formData)
    })
    let $bgColorInput = $propPanel.find('input[type=text][name=bgColor]') 
    $bgColorInput.change(function() {
      let val = $(this).val()
      that.formData.bgColor = val
      that.update(that.formData)
    })
    let $nickMlInput= $propPanel.find('input[type=text][name=nickMl]')
    $nickMlInput.change(function() {
      that.formData.nickMl =$(this).val()
      that.update(that.formData)
    })
    let $fontSizeInput= $propPanel.find('input[type=text][name=fontSize]')
    $fontSizeInput.change(function() {
      that.formData.fontSize =$(this).val()
      that.update(that.formData)
    })

    let $fontWeightSelect = $propPanel.find('select[name=fontWeight]')
    $fontWeightSelect.change(function() {
      that.formData.fontWeight = $(this).prop('value')
      that.update(that.formData)
    })
    let $fontStyleSelect = $propPanel.find('select[name=fontStyle]')
    $fontStyleSelect.change(function() {
      that.formData.fontStyle = $(this).prop('value')
      that.update(that.formData)
    })
    let $fontFamilySelect = $propPanel.find('select[name=fontFamily]')
    $fontFamilySelect.change(function() {
      that.formData.fontFamily = $(this).prop('value')
      that.update(that.formData)
    })
    let $tipTextInput= $propPanel.find('input[type=text][name=tipText]')
    $tipTextInput.change(function() {
      that.formData.tipText =$(this).val()
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
    let $cphoto=this.$content.find(".cphoto");
    let $spanName=this.$content.find(".wang-info span");
    this.$content.css('background-color', this.formData.bgColor)
    this.$content.find(".wang-info").css("margin-top",parseInt(this.formData.bgImgMg))
    this.$content.attr('title', this.formData.tipText) 

    let lineImg=this.formData.wangMode =="1" ?  './assets/wang1.gif': './assets/wang2.gif';
    that.$wangImg.attr('src', lineImg)
    that.$wangImg.attr('data-val', this.formData.wangMode)

    if(this.formData.bgImg){
      if($cphoto.length<=0){
         this.$content.find(".wang-info").before("<img class='cphoto' >")
      }
      $cphoto=this.$content.find(".cphoto");
      $cphoto.attr('src', this.formData.bgImg) 
    }else{
      $cphoto.remove();
    }
    if(this.formData.nickName){
      if($spanName.length<=0){
        $spanName=this.$content.find(".wang-line").after("<span>"+formData.nickName+"</span>")
      }
      $spanName=this.$content.find(".wang-info span");
      $spanName.text(formData.nickName)
      $spanName.css("color",this.formData.color)
      $spanName.css('font-size', parseInt(this.formData.fontSize))
      $spanName.css("font-family",this.formData.fontFamily)
      $spanName.css("font-weight",this.formData.fontWeight)
      $spanName.css("font-style",this.formData.fontStyle)
      $spanName.css("margin-left",parseInt(this.formData.nickMl))
       
    }else{
       $spanName.remove();
    }
 
 
    
  }
  updatePropPanel() {
    let $propPanel = this.$propPanel

    let $wangModeRadio = $propPanel.find('input[type=radio][name=wangMode]')
    $wangModeRadio.filter(`[value="${this.formData.wangMode}"]`).prop('checked', true)

    let $wangIDInput = $propPanel.find('input[type=text][name=wangID]')
    $wangIDInput.val(this.formData.wangID)

    let $bgImgInput = $propPanel.find('input[type=text][name=bgImg]')
    $bgImgInput.val(this.formData.bgImg)

 
    let $bgImgMgInput = $propPanel.find('input[type=text][name=bgImgMg]')
    $bgImgMgInput.val(this.formData.bgImgMg)
    let $nickNameInput = $propPanel.find('input[type=text][name=nickName]')
    $nickNameInput.val(this.formData.nickName)

    let $colorInput = $propPanel.find('input[type=text][name=color]')
    $colorInput.val(this.formData.color)

    let $bgColorInput = $propPanel.find('input[type=text][name=bgColor]')
    $bgColorInput.val(this.formData.bgColor)

    let $nickMlInput = $propPanel.find('input[type=text][name=nickMl]')
    $nickMlInput.val(this.formData.nickMl)


    let $fontSizeInput = $propPanel.find('input[type=text][name=fontSize]')
    $fontSizeInput.val(this.formData.fontSize)

    let $fontFamilySelect = $propPanel.find('select[name=fontFamily]')
    $fontFamilySelect.val(this.formData.fontFamily)

    let $fontWeightSelect = $propPanel.find('input[type=text][name=fontWeight]')
    $fontWeightSelect.val(this.formData.fontWeight)

    let $fontStyleSelect = $propPanel.find('select[name=fontStyle]')
    $fontStyleSelect.val(this.formData.fontStyle)

    let $tipTextInput = $propPanel.find('input[type=text][name=tipText]')
    $tipTextInput.val(this.formData.tipText)

    if (this.formData.color) {
       $colorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.color)
    }else{
      $colorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }
    if (this.formData.bgColor) {
       $bgColorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.bgColor)
    }else{
      $bgColorInput.prev().find(".sp-preview-inner").css("background-color",'')
    } 

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
 
 