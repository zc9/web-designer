import Component from './Component'
import {setFontOption} from './common'
import {valEmpty} from './commonCss'
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
    let top, left, width, height,bgImg,bgColor,eName,color,fSize,family,weight,fStyle,tipText,nameMl,nameMt,wangMode,wangID,url,wimg,wangCss,bgImgHtml,nameHtml
    let htmlList=[]
    top = this.$el.css('top')
    left = this.$el.css('left')
    width = this.$el.width()
    height = this.$el.height()
    tipText=valEmpty(this.formData.tipText) !="" ? ' title="'+this.formData.tipText+'" ' : '';
    bgColor=valEmpty(this.formData.bgColor) !="" ? 'background-color:'+this.formData.bgColor+';' : '';
    bgImg=valEmpty(this.formData.bgImg)
    eName=valEmpty(this.formData.eName)
    color=valEmpty(this.formData.color)
    fSize=valEmpty(this.formData.fSize)
    family=valEmpty(this.formData.family)
    weight=valEmpty(this.formData.weight)
    fStyle=valEmpty(this.formData.fStyle)
    nameMl=valEmpty(this.formData.nameMl)
    nameMt=valEmpty(this.formData.nameMt)

    wangID=valEmpty(this.formData.wangID)
    wangMode=valEmpty(this.formData.wangMode)
    wangCss=''
    if(wangMode==="88"){
      wangMode="24"
      wangCss=' w-mid';
    }
    if(bgImg !=""){
      bgImgHtml='<img  src="'+bgImg+'" />'
    }
    url='//amos.alicdn.com/msg.aw?&v=2&uid='+wangID+'&site=enaliint&s='+wangMode+'&charset=UTF-8'
    wimg= '//amos.alicdn.com/online.aw?v=2&uid='+wangID+'&site=enaliint&s='+wangMode+'&charset=UTF-8';
    wimg='<img class="wang-line'+wangCss+'" src="'+wimg+'" />'
    if(eName !=""){
      nameHtml='<span style="color:'+color+';font-size:'+fSize+';font-family:'+family+';font-weight:'+weight+';font-style:'+fStyle+';margin-left:'+nameMl+'px;">'+eName+'</span>' 
    }

    return '<a class="abs wang-box"  href="'+url+'" target="_blank" '+tipText+' style="'+bgColor+'top:'+top+';left:'+left+';width:'+width+'px; height:'+height+'px;display:inline-block;">'+bgImgHtml+'<div class="wang-info" style="margin-top:'+nameMt+'px;">'+wimg+nameHtml+'</div></a>'
  }
  initFormData() {
    this.formData.appLabel = ''
    this.formData.wangMode = '22'
    this.formData.wangID = ''
    this.formData.bgImg = '//sc01.alicdn.com/kf/HTB1gXlQXDjxK1Rjy0Fnq6yBaFXao.jpg'
    this.formData.bgColor = ''
    this.formData.eName = 'John Deao'
    this.formData.color = ''
    this.formData.fSize = 12
    this.formData.family = 'arial'
    this.formData.weight = ''
    this.formData.fStyle = 'normal'
    this.formData.tipText = '24Hours Service Online'
    this.formData.nameMl = 5
    this.formData.nameMt = 5 // 
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
    let $nameMtInput = $propPanel.find('input[type=text][name=nameMt]') 
    $nameMtInput.change(function() {
      let val = $(this).val()
      that.formData.nameMt = val
      that.update(that.formData)
    })
    let $eNameInput = $propPanel.find('input[type=text][name=eName]') 
    $eNameInput.change(function() {
      let val = $(this).val()
      that.formData.eName = val
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
    let $nameMlInput= $propPanel.find('input[type=text][name=nameMl]')
    $nameMlInput.change(function() {
      that.formData.nameMl =$(this).val()
      that.update(that.formData)
    })
    let $fSizeInput= $propPanel.find('input[type=text][name=fSize]')
    $fSizeInput.change(function() {
      that.formData.fSize =$(this).val()
      that.update(that.formData)
    })

    let $weightSelect = $propPanel.find('select[name=weight]')
    $weightSelect.change(function() {
      that.formData.weight = $(this).prop('value')
      that.update(that.formData)
    })
    let $fStyleSelect = $propPanel.find('select[name=fStyle]')
    $fStyleSelect.change(function() {
      that.formData.fStyle = $(this).prop('value')
      that.update(that.formData)
    })
    let $familySelect = $propPanel.find('select[name=family]')
    $familySelect.change(function() {
      that.formData.family = $(this).prop('value')
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
      content: `<form class="layui-form" lay-filter="wangComponentForm">
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
    this.$content.find(".wang-info").css("margin-top",parseInt(this.formData.nameMt))
    this.$content.attr('title', this.formData.tipText) 

    let lineImg=this.formData.wangMode =="22" ?  './assets/wang1.gif': './assets/wang2.gif';
    that.$wangImg.attr('src', lineImg)
    if(this.formData.wangMode=="88"){
      that.$wangImg.addClass("w-mid")
    }else{
      that.$wangImg.removeClass("w-mid")
    }
   
  

    if(this.formData.bgImg){
      if($cphoto.length<=0){
         this.$content.find(".wang-info").before("<img class='cphoto' >")
      }
      $cphoto=this.$content.find(".cphoto");
      $cphoto.attr('src', this.formData.bgImg) 
    }else{
      $cphoto.remove();
    }
    if(this.formData.eName){
      if($spanName.length<=0){
        $spanName=this.$content.find(".wang-line").after("<span>"+formData.eName+"</span>")
      }
      $spanName=this.$content.find(".wang-info span");
      $spanName.text(formData.eName)
      $spanName.css("color",this.formData.color)
      $spanName.css('font-size', parseInt(this.formData.fSize))
      $spanName.css("font-family",this.formData.family)
      $spanName.css("font-weight",this.formData.weight)
      $spanName.css("font-style",this.formData.fStyle)
      $spanName.css("margin-left",parseInt(this.formData.nameMl))
       
    }else{
       $spanName.remove();
    }
  }
  updatePropPanel() {
    let $propPanel = this.$propPanel
    setFontOption('.font-select')

    let $wangModeRadio = $propPanel.find('input[type=radio][name=wangMode]')
    $wangModeRadio.filter(`[value="${this.formData.wangMode}"]`).prop('checked', true)

    let $wangIDInput = $propPanel.find('input[type=text][name=wangID]')
    $wangIDInput.val(this.formData.wangID)

    let $bgImgInput = $propPanel.find('input[type=text][name=bgImg]')
    $bgImgInput.val(this.formData.bgImg)

 
    let $nameMtInput = $propPanel.find('input[type=text][name=nameMt]')
    $nameMtInput.val(this.formData.nameMt)
    let $eNameInput = $propPanel.find('input[type=text][name=eName]')
    $eNameInput.val(this.formData.eName)

    let $colorInput = $propPanel.find('input[type=text][name=color]')
    $colorInput.val(this.formData.color)

    let $bgColorInput = $propPanel.find('input[type=text][name=bgColor]')
    $bgColorInput.val(this.formData.bgColor)

    let $nameMlInput = $propPanel.find('input[type=text][name=nameMl]')
    $nameMlInput.val(this.formData.nameMl)


    let $fSizeInput = $propPanel.find('input[type=text][name=fSize]')
    $fSizeInput.val(this.formData.fSize)

    let $familySelect = $propPanel.find('select[name=family]')
    $familySelect.val(this.formData.family)

    let $weightSelect = $propPanel.find('input[type=text][name=weight]')
    $weightSelect.val(this.formData.weight)

    let $fStyleSelect = $propPanel.find('select[name=fStyle]')
    $fStyleSelect.val(this.formData.fStyle)

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
 
 