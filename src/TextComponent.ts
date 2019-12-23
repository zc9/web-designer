import Component from './Component';
import { setFontOption } from './common'
export default class TextComponent extends Component {
　$content: JQuery
  constructor() {
    super('text-component')
    let content = `
      <a class="ant-text"   mTsAnt=""  mbdTsAnt=""><div class="on">请设置文本内容</div></a>
      `
    this.$contentBox.append(content)
    this.$content = this.$contentBox.find('.ant-text')
    this.initFormData()
  }
  initFormData() {
    this.formData.appLabel = ''

    this.formData.family = 'arial' //字体
    this.formData.fSize = 12
    this.formData.color = '#000'
    this.formData.bgColor = '#fff'
    this.formData.lHeight =''  //行距 line-height
    this.formData.spacing =''  //letterSpacing // 字  距
    this.formData.indent =''  //textIndent 缩进

    this.formData.weight = 600 //加粗
    this.formData.fStyle = 'normal' //斜体
    this.formData.oLine = '' //文字上边线 overline
    this.formData.through = '' //文字中间线 line-through
    this.formData.uLine = '' //文字下边线 underline
    this.formData.align = 'center' //对齐
    this.formData.content = '请设置文件内容' //反面内容

    this.formData.href = ''
    this.formData.hrefMode ='_blank'  //是否新窗口

    this.formData.bgImg = '//sc01.alicdn.com/kf/HTB1gXlQXDjxK1Rjy0Fnq6yBaFXao.jpg'
    this.formData.bgRep =''  //背景平铺方式
    this.formData.bgPos ='' //背景对齐位置
    this.formData.bRadius ='' //圆角

    this.formData.hoverMode ='off' //鼠标移上开启 off 关  on  开


    this.formData.mfamily = 'arial' //字体
    this.formData.mfSize = 12
    this.formData.mcolor = '#fff'
    this.formData.mbgColor = '#000'
    this.formData.mlHeight =''  //行距
    this.formData.mspacing =''  //letterSpacing // 字  距
    this.formData.mindent =''  //textIndent 缩进

    this.formData.mweight = 600 //加粗
    this.formData.mfStyle = 'normal' //斜体
    this.formData.moLine = '' //文字上边线 overline
    this.formData.mthrough = '' //文字中间线 line-through
    this.formData.muLine = '' //文字下边线 underline
    this.formData.malign = 'left' //对齐
    this.formData.mcontent = '' //反面内容

    this.formData.mbgImg = '//sc01.alicdn.com/kf/HTB1gXlQXDjxK1Rjy0Fnq6yBaFXao.jpg'
    this.formData.mbgRep =''  //背景平铺方式
    this.formData.mbgPos ='' //背景对齐位置

    this.formData.mTsDur ='0.4'   //动画时长
    this.formData.mTsFun ='ease'  //速度曲线
    this.formData.mTsAnt ='atrans5'  //动画效果

    this.formData.bdT ='on'
    this.formData.bdB ='on'
    this.formData.bdL ='on'
    this.formData.bdR ='on'

    this.formData.bdWidth =5
    this.formData.bdColor ='#FFFF00'
    this.formData.bdStyle ='solid'


    this.formData.mbdT =''
    this.formData.mbdB =''
    this.formData.mbdL =''
    this.formData.mbdR =''
    this.formData.mbdStyle ='solid'

    this.formData.mbdTsDur ='0.5'
    this.formData.mbdTsFun ='ease-out'
    this.formData.mbdColor ='#00FFFF'
    this.formData.mbdTsAnt ='bdtx1'

    this.update(this.formData)

  }
  getProps() {
    let config = this.formData;
    config.appID = `${this.stage.id}-${this.id}`
    return {
      'appType': 'xwzb',
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
  //同步边框信息
  onTongBuBd($layerElem,$isVal,that) {
    let $bdWidthVal = $layerElem.find('input[type=text][name=bdWidth]').val()
    let $mbdWidthInput = $layerElem.find('input[type=text][name=mbdWidth]')
    $mbdWidthInput.val($bdWidthVal)

    let $bdStyleRadio = $layerElem.find('input[type=radio][name=bdStyle]:checked')
    let $bdStyleVal=$bdStyleRadio.val()
    $layerElem.find('input[type=radio][name=mbdStyle][value='+$bdStyleVal+']').prop('checked', true)

    let $bdColorVal = $layerElem.find('input[type=text][name=bdColor]').val()
    let $mbdColorInput = $layerElem.find('input[type=text][name=mbdColor]')
    $mbdColorInput.val($bdColorVal)
    $mbdColorInput.prev().find(".sp-preview-inner").css("background-color",$bdColorVal)


    let $bdTCheckBox = $layerElem.find('input[type=checkbox][name=bdT]')
    let $mbdTCheckBox = $layerElem.find('input[type=checkbox][name=mbdT]')
    let $bdTVal=$bdTCheckBox.is(':checked')
    $mbdTCheckBox.prop('checked',$bdTVal);

    let $bdBCheckBox = $layerElem.find('input[type=checkbox][name=bdB]')
    let $mbdBCheckBox = $layerElem.find('input[type=checkbox][name=mbdB]')
    let $bdBVal=$bdBCheckBox.is(':checked')
    $mbdBCheckBox.prop('checked',$bdBVal);

    let $bdLCheckBox = $layerElem.find('input[type=checkbox][name=bdL]')
    let $mbdLCheckBox = $layerElem.find('input[type=checkbox][name=mbdL]')
    let $bdLVal=$bdLCheckBox.is(':checked')
    $mbdLCheckBox.prop('checked',$bdLVal);

    let $bdRCheckBox = $layerElem.find('input[type=checkbox][name=bdR]')
    let $mbdRCheckBox = $layerElem.find('input[type=checkbox][name=mbdR]')
    let $bdRVal=$bdRCheckBox.is(':checked')
    $mbdRCheckBox.prop('checked',$bdRVal);
    if($isVal){
     that.formData.mbdT=$layerElem.find('input[type=checkbox][name=mbdT]:checked').val();
     that.formData.mbdB=$layerElem.find('input[type=checkbox][name=mbdB]:checked').val();
     that.formData.mbdL=$layerElem.find('input[type=checkbox][name=mbdL]:checked').val();
     that.formData.mbdR=$layerElem.find('input[type=checkbox][name=mbdR]:checked').val();
     that.formData.mbdWidth=$bdWidthVal;
     that.formData.mbdColor=$bdColorVal;
     that.formData.mbdStyle=$bdStyleVal;
    }
  }
  //弹出来同步
  onTongBu($layerElem,$isVal,that) {
    let $familySelect = $layerElem.find('select[name=family] option:selected')
    let $familyVal=$familySelect.val()
    $layerElem.find('select[name=mfamily] option[value='+$familyVal+']').attr("selected",true);

    let $colorVal = $layerElem.find('input[type=text][name=color]').val()

    let $mcolorInput = $layerElem.find('input[type=text][name=mcolor]')
    $mcolorInput.val($colorVal)
    $mcolorInput.prev().find(".sp-preview-inner").css("background-color",$colorVal)

    let $bgColorVal = $layerElem.find('input[type=text][name=bgColor]').val()
    let $mbgColorInput = $layerElem.find('input[type=text][name=mbgColor]')
    $mbgColorInput.val($bgColorVal)
    $mbgColorInput.prev().find(".sp-preview-inner").css("background-color",$bgColorVal)

    let $fSizeVal = $layerElem.find('input[type=text][name=fSize]').val()
    let $mfSizeInput = $layerElem.find('input[type=text][name=mfSize]')
    $mfSizeInput.val($fSizeVal)

    let $lHeightVal = $layerElem.find('input[type=text][name=lHeight]').val()
    let $mlHeightInput = $layerElem.find('input[type=text][name=mlHeight]')
    $mlHeightInput.val($lHeightVal)

    let $spacingVal = $layerElem.find('input[type=text][name=spacing]').val()
    let $mspacingInput = $layerElem.find('input[type=text][name=mspacing]')
    $mspacingInput.val($spacingVal)

    let $indentVal = $layerElem.find('input[type=text][name=indent]').val()
    let $mindentInput = $layerElem.find('input[type=text][name=mindent]')
    $mindentInput.val($indentVal)

    //对齐
    let $alignRadioActive = $layerElem.find('.font-z .font-item-radio.active')
    let $malignRadio = $layerElem.find('.font-f .font-item-radio')
    let $alignVal=$alignRadioActive.attr('data-val')
    $malignRadio.removeClass("active")
    $layerElem.find('.font-f .font-item-radio[data-val='+$alignVal+']').addClass('active')


    let $weightVal= $layerElem.find('.font-z input[type=hidden][name=weight]').val()
    let $mweightInput = $layerElem.find('.font-f input[type=hidden][name=mweight]')
    if($weightVal=="600"){
      $mweightInput.val("600")
      $mweightInput.parent().addClass("active")
    }else{
      $mweightInput.val("")
      $mweightInput.parent().removeClass("active")
    }
    let $fStyleVal = $layerElem.find('.font-z input[type=hidden][name=fStyle]').val()
    let $mfStyleInput = $layerElem.find('.font-f input[type=hidden][name=mfStyle]')
    if($fStyleVal=="italic"){
      $mfStyleInput.val('italic')
      $mfStyleInput.parent().addClass("active")
    }else{
      $mfStyleInput.val("normal")
      $mfStyleInput.parent().removeClass("active")
    }
    let $oLineVal = $layerElem.find('.font-z input[type=hidden][name=oLine]').val()
    let $moLineInput = $layerElem.find('.font-f input[type=hidden][name=moLine]')
    if($oLineVal=="overline"){
      $moLineInput.val('overline')
      $moLineInput.parent().addClass("active")
    }else{
      $moLineInput.val("")
      $moLineInput.parent().removeClass("active")
    }
    let $throughVal = $layerElem.find('.font-z input[type=hidden][name=through]').val()
    let $mthroughInput= $layerElem.find('.font-f input[type=hidden][name=mthrough]')
    if($throughVal=="line-through"){
      $mthroughInput.val('line-through')
      $mthroughInput.parent().addClass("active")
    }else{
      $mthroughInput.val("")
      $mthroughInput.parent().removeClass("active")
    }
    let $uLineVal = $layerElem.find('.font-z input[type=hidden][name=uLine]').val()
    let $muLineInput = $layerElem.find('.font-f input[type=hidden][name=muLine]')
    if($uLineVal=="underline"){
      $muLineInput.val('underline')
      $muLineInput.parent().addClass("active")
    }else{
      $muLineInput.val("")
      $muLineInput.parent().removeClass("active")
    }
    // 右侧同步的时候 直接更新数据
    if($isVal){
     that.formData.family=$familyVal
     that.formData.mcolor=$colorVal
     that.formData.mbgColor=$bgColorVal
     that.formData.mfSize=$fSizeVal
     that.formData.mlHeight=$lHeightVal
     that.formData.mspacing=$spacingVal
     that.formData.mindent=$indentVal
     that.formData.mweight=$weightVal
     that.formData.mfStyle=$fStyleVal
     that.formData.moLine=$oLineVal
     that.formData.mthrough=$throughVal
     that.formData.muLine=$uLineVal
     that.formData.malign=$alignVal
    }
    console.log('onTongBu')

  }
  //文本框预览样式
  updatePreviewStyle($objElem){
    let $defElem=$objElem.parent().parent().parent().find('.font-textarea .multi-textarea')
    if($objElem.parent().hasClass("nromal-wrap")){
       $defElem=$objElem.parent().parent().find('.font-textarea .multi-textarea')
    }
    let $fontElem=$defElem.parent().prev()  //查找上一个兄弟节点，不是所有的兄弟节点
    let isfontF= $fontElem.hasClass("font-f")  ? true :false

    if($defElem.length>0){
      if(isfontF){
        let deline=this.formData.muLine
        if(this.formData.moLine){
          deline+=' '+this.formData.moLine
        }else{
          if(this.formData.mthrough){
            deline+=' '+this.formData.mthrough
          }
          if(deline ==="") deline='none'

          $defElem.css("font-family",this.formData.mfamily)
          $defElem.css('color', this.formData.mcolor)
          $defElem.css('background-color', this.formData.mbgColor)
          $defElem.css('font-size', parseInt(this.formData.mfSize))
          $defElem.css('line-height', this.formData.mlHeight+'px')
          $defElem.css('letter-spacing', parseInt(this.formData.mspacing))
          $defElem.css('text-indent', parseInt(this.formData.mindent))

          $defElem.css('text-align', this.formData.malign)
          $defElem.css("font-weight",this.formData.mweight)
          $defElem.css("font-style",this.formData.mfStyle)
          $defElem.css("text-decoration",deline)
        }
      }else{
        let deline=this.formData.uLine
        if(this.formData.oLine){
          deline+=' '+this.formData.oLine
        }else{
          if(this.formData.through){
            deline+=' '+this.formData.through
          }
          if(deline ==="") deline='none'

          $defElem.css("font-family",this.formData.family)
          $defElem.css('color', this.formData.color)
          $defElem.css('background-color', this.formData.bgColor)
          $defElem.css('font-size', parseInt(this.formData.fSize))
          $defElem.css('line-height', this.formData.lHeight+'px')
          $defElem.css('letter-spacing', parseInt(this.formData.spacing))
          $defElem.css('text-indent', parseInt(this.formData.indent))

          $defElem.css('text-align', this.formData.align)
          $defElem.css("font-weight",this.formData.weight)
          $defElem.css("font-style",this.formData.fStyle)
          $defElem.css("text-decoration",deline)
        }
      }
    }


  }
 //弹出来设置文字选中 转换成小写：toLowerCase()
  getFontActive($objElem){
    let $elemInput=$objElem.find('input[type=hidden]')
    let $attrName=$elemInput.attr('name').toLowerCase()
    if($objElem.parent().hasClass("font-f")){
      $attrName = $attrName.substr(1)
    }
    if($objElem.hasClass("active")){
      $objElem.removeClass("active")
      switch($attrName) {
        case 'weight':
          $elemInput.val('')
          break;
        case 'fstyle':
          $elemInput.val('normal')
          break;
        case 'oline':
          $elemInput.val('')
          break;
        case 'through':
          $elemInput.val('')
          break;
        case 'uline':
          $elemInput.val('')
          break;
      }
    }else{
      $objElem.addClass("active")
      switch($attrName) {
        case 'weight':
          $elemInput.val("600")
          break;
        case 'fstyle':
          $elemInput.val('italic')
          break;
        case 'oline':
          $elemInput.val('overline')
          break;
        case 'through':
          $elemInput.val('line-through')
          break;
        case 'uline':
          $elemInput.val('underline')
          break;
      }
    }
  }
  initPorpPanel() {
    console.log('initTextPorpPanel')
    let that = this
    setFontOption('.font-select')
    $('.prop-setting-ct > div').hide()
    let $propPanel = $('.text-com-prop-panel')
    this.$propPanel = $propPanel
    $propPanel.show()
    $propPanel.find('*').off()
    this.updatePropPanel();
    //收缩 重新加载
    let element = layui.element
    element.render("collapse")

    let $hrefModeCheckBox = $propPanel.find('input[type=checkbox][name=hrefMode]')
    $hrefModeCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.hrefMode = val ? '_blank' : ''
    })
    let $hrefInput = $propPanel.find('input[type=text][name=href]')
    $hrefInput.change(function() {
      let val = $(this).val()
      that.formData.href = val
      that.update(that.formData)
    })
    let $bRadiusInput = $propPanel.find('input[type=text][name=bRadius]')
    $bRadiusInput.change(function() {
      let val = $(this).val()
      that.formData.bRadius = val
      that.update(that.formData)
    })

    let $familySelect = $propPanel.find('select[name=family]')
    $familySelect.change(function() {
      that.formData.family = $(this).prop('value')
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })

    let $colorInput = $propPanel.find('input[type=text][name=color]')
    $colorInput.change(function() {
      let val = $(this).val()
      that.formData.color = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $bgColorInput = $propPanel.find('input[type=text][name=bgColor]')
    $bgColorInput.change(function() {
      let val = $(this).val()
      that.formData.bgColor = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $fSizeInput = $propPanel.find('input[type=text][name=fSize]')
    $fSizeInput.change(function() {
      let val = $(this).val()
      that.formData.fSize = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $lHeightInput = $propPanel.find('input[type=text][name=lHeight]')
    $lHeightInput.change(function() {
      let val = $(this).val()
      that.formData.lHeight = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $spacingInput = $propPanel.find('input[type=text][name=spacing]')
    $spacingInput.change(function() {
      let val = $(this).val()
      that.formData.spacing = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $indentInput = $propPanel.find('input[type=text][name=indent]')
    $indentInput.change(function() {
      let val = $(this).val()
      that.formData.indent = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $contentTextarea = $propPanel.find('textarea[name=content]')
    $contentTextarea.change(function() {
      let val = $(this).val()
      that.formData.content = val
      that.update(that.formData)
    })

    let $hoverModeRadio = $propPanel.find('input[type=radio][name=hoverMode]')
    $hoverModeRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.hoverMode = val
      that.update(that.formData)
    })
    let $mfamilySelect = $propPanel.find('select[name=mfamily]')
    $mfamilySelect.change(function() {
      that.formData.mfamily = $(this).prop('value')
      that.update(that.formData)
    })

    let $mcolorInput = $propPanel.find('input[type=text][name=mcolor]')
    $mcolorInput.change(function() {
      let val = $(this).val()
      that.formData.mcolor = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $mbgColorInput = $propPanel.find('input[type=text][name=mbgColor]')
    $mbgColorInput.change(function() {
      let val = $(this).val()
      that.formData.mbgColor = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $mfSizeInput = $propPanel.find('input[type=text][name=mfSize]')
    $mfSizeInput.change(function() {
      let val = $(this).val()
      that.formData.mfSize = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $mlHeightInput = $propPanel.find('input[type=text][name=mlHeight]')
    $mlHeightInput.change(function() {
      let val = $(this).val()
      that.formData.mlHeight = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $mspacingInput = $propPanel.find('input[type=text][name=mspacing]')
    $mspacingInput.change(function() {
      let val = $(this).val()
      that.formData.mspacing = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $mindentInput = $propPanel.find('input[type=text][name=mindent]')
    $mindentInput.change(function() {
      let val = $(this).val()
      that.formData.mindent = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $mcontentTextarea = $propPanel.find('textarea[name=mcontent]')
    $mcontentTextarea.change(function() {
      let val = $(this).val()
      that.formData.mcontent = val
      that.update(that.formData)
    })


    //以下是动画
    let $mTsDurInput = $propPanel.find('input[type=text][name=mTsDur]')
    $mTsDurInput.change(function() {
      let val = $(this).val()
      that.formData.mTsDur = val
      that.update(that.formData)
    })
    let $mTsFunRadio = $propPanel.find('input[type=radio][name=mTsFun]')
    $mTsFunRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.mTsFun = val
      that.update(that.formData)
    })
    let $mTsAntRadio = $propPanel.find('input[type=radio][name=mTsAnt]')
    $mTsAntRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.mTsAnt = val
      that.update(that.formData)
    })
    // 以下是默认边框
    let $bdTCheckBox = $propPanel.find('input[type=checkbox][name=bdT]')
    $bdTCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bdT = val ? 'on' : ''
      that.update(that.formData)
    })
    let $bdBCheckBox = $propPanel.find('input[type=checkbox][name=bdB]')
    $bdBCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bdB = val ? 'on' : ''
      that.update(that.formData)
    })
    let $bdLCheckBox = $propPanel.find('input[type=checkbox][name=bdL]')
    $bdLCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bdL = val ? 'on' : ''
      that.update(that.formData)
    })
    let $bdRCheckBox = $propPanel.find('input[type=checkbox][name=bdR]')
    $bdRCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bdR = val ? 'on' : ''
      that.update(that.formData)
    })

    let $bdWidthInput = $propPanel.find('input[type=text][name=bdWidth]')
    $bdWidthInput.change(function() {
      let val = $(this).val()
      that.formData.bdWidth = val
      that.update(that.formData)
    })
    let $bdColorInput = $propPanel.find('input[type=text][name=bdColor]')
    $bdColorInput.change(function() {
      let val = $(this).val()
      that.formData.bdColor = val
      that.update(that.formData)
    })
    let $bdStyleRadio = $propPanel.find('input[type=radio][name=bdStyle]')
    $bdStyleRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.bdStyle = val
      that.update(that.formData)
    })

    //正反  文字对齐 事件
    let $alignRadio = $propPanel.find('.font-setting .font-item-radio')
    $alignRadio.click(function() {
      let val = $(this).attr('data-val')
      let $alignParent=$(this).parent()
      let isOff= $alignParent.hasClass("font-f")  ? true :false
      if(isOff){
        that.formData.malign = val
      }else{
        that.formData.align = val
      }
      $alignParent.find('.font-item-radio').removeClass("active")
      $(this).addClass("active")
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    //转换成小写：toLowerCase()
    let $fontCheckbox = $propPanel.find('.font-z .font-item-checkbox')
    $fontCheckbox.click(function() {
      let $elemInput=$(this).find('input[type=hidden]')
      let $attrName = $elemInput.attr('name').toLowerCase()
      if($(this).hasClass("active")){
        $(this).removeClass("active")
        switch($attrName) {
          case 'weight':
            that.formData.weight =""
            $elemInput.val("")
            break;
          case 'fstyle':
            that.formData.fStyle ='normal'
            $elemInput.val("normal")
            break;
          case 'oline':
            that.formData.oLine =''
            $elemInput.val("")
            break;
          case 'through':
            that.formData.through = ''
            $elemInput.val("")
            break;
          case 'uline':
            that.formData.uLine = ''
            $elemInput.val("")
            break;
        }
      }else{
        $(this).addClass("active")
        switch($attrName) {
          case 'weight':
            that.formData.weight ="600"
            $elemInput.val("600")
            break;
          case 'fstyle':
            that.formData.fStyle ='italic'
            $elemInput.val("italic")
            break;
          case 'oline':
            that.formData.oLine ='overline'
            $elemInput.val("overline")
            break;
          case 'through':
            that.formData.through = 'line-through'
            $elemInput.val("line-through")
            break;
          case 'uline':
            that.formData.uLine = 'underline'
            $elemInput.val("underline")
            break;
        }
      }
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })

    let $ffontCheckbox = $propPanel.find('.font-f .font-item-checkbox')
    $ffontCheckbox.click(function() {
      let $elemInput=$(this).find('input[type=hidden]')
      let $attrName = $elemInput.attr('name').toLowerCase()
      if($(this).hasClass("active")){
        $(this).removeClass("active")
        switch($attrName) {
          case 'mweight':
            that.formData.mweight =""
            $elemInput.val("")
            break;
          case 'mfstyle':
            that.formData.mfStyle ='normal'
            $elemInput.val("normal")
            break;
          case 'moLine':
            that.formData.moLine =''
            $elemInput.val("")
            break;
          case 'mthrough':
            that.formData.mthrough = ''
            $elemInput.val("")
            break;
          case 'muLine':
            that.formData.muLine = ''
            $elemInput.val("")
            break;
        }
      }else{
        $(this).addClass("active")
        switch($attrName) {
          case 'mweight':
            that.formData.mweight ="600"
            $elemInput.val("600")
            break;
          case 'mfstyle':
            that.formData.mfStyle ='italic'
            $elemInput.val("italic")
            break;
          case 'moline':
            that.formData.moLine ='overline'
            $elemInput.val("overline")
            break;
          case 'mthrough':
            that.formData.mthrough = 'line-through'
            $elemInput.val("line-through")
            break;
          case 'muline':
            that.formData.muLine = 'underline'
            $elemInput.val("underline")
            break;
        }
      }
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })


    // 以下是经过边框
    let $mbdTCheckBox = $propPanel.find('input[type=checkbox][name=mbdT]')
    $mbdTCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.mbdT = val ? 'on' : ''
      that.update(that.formData)
    })
    let $mbdBCheckBox = $propPanel.find('input[type=checkbox][name=mbdB]')
    $mbdBCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.mbdB = val ? 'on' : ''
      that.update(that.formData)
    })
    let $mbdLCheckBox = $propPanel.find('input[type=checkbox][name=mbdL]')
    $mbdLCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.mbdL = val ? 'on' : ''
      that.update(that.formData)
    })
    let $mbdRCheckBox = $propPanel.find('input[type=checkbox][name=mbdR]')
    $mbdRCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.mbdR = val ? 'on' : ''
      that.update(that.formData)
    })
    let $mbdWidthInput = $propPanel.find('input[type=text][name=mbdWidth]')
    $mbdWidthInput.change(function() {
      let val = $(this).val()
      that.formData.mbdWidth = val
      that.update(that.formData)
    })
    let $mbdColorInput = $propPanel.find('input[type=text][name=mbdColor]')
    $mbdColorInput.change(function() {
      let val = $(this).val()
      that.formData.mbdColor = val
      that.update(that.formData)
    })
    let $mbdStyleRadio = $propPanel.find('input[type=radio][name=mbdStyle]')
    $mbdStyleRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.mbdStyle = val
      that.update(that.formData)
    })
    //边框动画
    let $mbdTsDurInput = $propPanel.find('input[type=text][name=mbdTsDur]')
    $mbdTsDurInput.change(function() {
      let val = $(this).val()
      that.formData.mbdTsDur = val
      that.update(that.formData)
    })
    let $mbdTsFunRadio = $propPanel.find('input[type=radio][name=mbdTsFun]')
    $mbdTsFunRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.mbdTsFun = val
      that.update(that.formData)
    })
    let $mbdTsAntRadio = $propPanel.find('input[type=radio][name=mbdTsAnt]')
    $mbdTsAntRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.mbdTsAnt = val
      that.update(that.formData)
    })

    //同步文字样式
    $propPanel.find('.font-synchronous').on('click', function() {
      let mthat=$(this)
      let layer = layui.layer
      layer.msg('你确定  同步默文 文字样式么？', {
        time: 0 //不自动关闭
        ,btn: ['同步', '取消']
        ,yes: function(index){
          that.onTongBu($propPanel,true,that)
          that.update(that.formData)
          that.updatePreviewStyle(mthat)
          layer.close(index)
        }
      })
    })

    $propPanel.find('.layui-btn-sm').on('click', function() {
      let layer = layui.layer
      layer.msg('你确定  同步默文 边框样式么？', {
        time: 0 //不自动关闭
        ,btn: ['同步', '取消']
        ,yes: function(index){
          that.onTongBuBd($propPanel,true,that);
          that.update(that.formData)
          layer.close(index)
        }
      });
    })

    $propPanel.find('.editor-btns').on('click', function() {
      that.openEditDialog()
    })
  }
  openEditDialog() {
    let that = this;
    let layer = layui.layer;
    let $layerElem = null;
    let layerNo = layer.open({
      type: 1,
      title: '文字设置',
      skin: 'layui-layer-rim', //加上边框
      area: ['600px', '600px'],
      success: function(layerElem, index) {
        $layerElem = $(layerElem)
        $layerElem.find('.cancel-btn').on('click', function() {
          layer.close(index)
        })
        if (that.formData.color) {
         let $colorInput=$layerElem.find('input[type=text][name=color]')
         $colorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.color)
        }
        if (that.formData.bgColor) {
         let $bgColorInput=$layerElem.find('input[type=text][name=bgColor]')
         $bgColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.bgColor)
        }
        if (that.formData.mcolor) {
         let $mcolorInput=$layerElem.find('input[type=text][name=mcolor]')
         $mcolorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.mcolor)
        }
        if (that.formData.mbgColor) {
         let $mbgColorInput=$layerElem.find('input[type=text][name=mbgColor]')
         $mbgColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.mbgColor)
        }
        //边框
        if (that.formData.bdColor) {
         let $bdColorInput=$layerElem.find('input[type=text][name=bdColor]')
         $bdColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.bdColor)
        }
        if (that.formData.mbdColor) {
         let $mbdColorInput=$layerElem.find('input[type=text][name=mbdColor]')
         $mbdColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.mbdColor)
        }
        if(that.formData.weight=="600"){
          $layerElem.find('.font-z .font-item-checkbox:eq(0)').addClass('active')
        }

        if(that.formData.fStyle=='italic'){
          $layerElem.find('.font-z .font-item-checkbox:eq(1)').addClass('active')
        }
        if(that.formData.oLine=='overline'){
          $layerElem.find('.font-z .font-item-checkbox:eq(2)').addClass('active')
        }
        if(that.formData.through=='line-through'){
          $layerElem.find('.font-z .font-item-checkbox:eq(3)').addClass('active')
        }
        if(that.formData.uLine=='underline'){
          $layerElem.find('.font-z .font-item-checkbox:eq(4)').addClass('active')
        }

        $layerElem.find(`.font-z .font-item-radio[data-val="${that.formData.align}"]`).addClass('active')
        $layerElem.find(`.font-f .font-item-radio[data-val="${that.formData.malign}"]`).addClass('active')

        if(that.formData.mfStyle=='italic'){
          $layerElem.find('.font-f .font-item-checkbox:eq(1)').addClass('active')
        }
        if(that.formData.moLine=='overline'){
          $layerElem.find('.font-f .font-item-checkbox:eq(2)').addClass('active')
        }
        if(that.formData.mthrough=='line-through'){
          $layerElem.find('.font-f .font-item-checkbox:eq(3)').addClass('active')
        }
        if(that.formData.muLine=='underline'){
          $layerElem.find('.font-f .font-item-checkbox:eq(4)').addClass('active')
        }

        $layerElem.find('.font-setting .font-item-checkbox').on('click', function() {
           that.getFontActive($(this));
        })

        $layerElem.find('.font-setting .font-item-radio').on('click', function() {
          let $objElem=$(this)
          $objElem.parent().find('.font-item-radio').removeClass("active")
          $objElem.addClass("active")
        })


        $layerElem.find('.font-synchronous').on('click', function() {
          let form = layui.form
          layer.msg('你确定  同步默文 文字样式么？', {
            time: 0 //不自动关闭
            ,btn: ['同步', '取消']
            ,yes: function(index){
              that.onTongBu($layerElem,false,that)
              form.render('select');
              layer.close(index)
            }
          });
        })
        $layerElem.find('.layui-btn-sm').on('click', function() {
          let form = layui.form
          layer.msg('你确定  同步默文 边框样式么？', {
            time: 0 //不自动关闭
            ,btn: ['同步', '取消']
            ,yes: function(index){
              that.onTongBuBd($layerElem,false,that);
              form.render();
              layer.close(index)
            }
          });
        })
      },
      content: `<form class="layui-form" lay-filter="textComponentForm">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li class="layui-this">默认设置</li>
            <li>鼠标经过</li>
            <li>边框设置</li>
            <li>动画设置</li>
          </ul>
          <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
              <div class="layui-form-item">
                <label class="layui-form-label">应用名称</label>
                <div class="layui-input-inline"><input type="text" name="appLabel" class="layui-input"></div>
              </div>

              <div class="layui-form-item">
                <label class="layui-form-label">样式及内容</label>
                <div class="layui-input-inline text-panel" style="width:343px;">
                    <label class="label-con" style="letter-spacing:13px;">字体</label>
                    <div class="labelpanel"   style="width: 90px; height: 36px;">
                      <select   name="family" >
                          <option value="宋体" >宋体</option>
                          <option value="黑体" >黑体</option>
                          <option value="微软雅黑" >雅黑</option>
                          <option value="楷体" >楷体</option>
                          <option value="arial" >Arial</option>
                          <option value="verdana" >Verdana</option>
                          <option value="georgia" >Georgia</option>
                          <option value="times new roman" >Times New Roman</option>
                          <option value="trebuchet ms" >Trebuchet MS</option>
                      </select>
                    </div>
                    <label class="label-con">文字颜色</label>
                    <div class="pagecolorpanel"  >
                        <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner" style="background-color:transparent;"></div></div></div>
                        <input class="pagecolor" name="color"  type="text"  />
                        <span class="clear-color-button"></span>
                    </div>
                    <label class="label-con">文字大小</label>
                    <div class="labelpanel"   style="width: 90px; ">
                      <input type="text" name="fSize" class="layui-input">
                    </div>
                    <label class="label-con">背景颜色</label>
                    <div class="pagecolorpanel"  >
                        <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner" style="background-color:transparent;"></div></div></div>
                        <input class="pagecolor" name="bgColor"  type="text"  />
                        <span class="clear-color-button"></span>
                    </div>
                    <label class="label-con">行  高</label>
                    <div class="labelpanel"   style="width: 65px; ">
                      <input type="text" name="lHeight" class="layui-input">
                    </div>
                    <label class="label-con">字  距</label>
                    <div class="labelpanel"   style="width: 65px; ">
                      <input type="text" name="spacing" class="layui-input">
                    </div>
                    <label class="label-con">缩  进</label>
                    <div class="labelpanel"   style="width: 65px; ">
                      <input type="text" name="indent" class="layui-input">
                    </div>
                    <div class="font-setting font-z">
                      <span  title="加粗" class="font-item-checkbox" data-val="" ><icon>ꕅ</icon><input name="weight" type="hidden"   value="" /></span>
                      <span  title="斜体" class="font-item-checkbox" data-val="" ><icon>ꕆ</icon><input name="fStyle" type="hidden"   value="" /></span>
                      <span  title="上划线" class="font-item-checkbox" data-val="" ><icon>ꔣ</icon><input name="oLine" type="hidden"   value="" /></span>
                      <span  title="中划线" class="font-item-checkbox" data-val=""><icon>ꕇ</icon><input name="through" type="hidden"   value="" /></span>
                      <span  title="下划线" class="font-item-checkbox" data-val="" ><icon>ꕈ</icon><input name="uLine" type="hidden"   value="" /></span>
                      <i class="spaceline"></i>
                      <span  title="文字左对齐" class="font-item-radio" data-val="left" ><icon>ꕉ</icon></span>
                      <span  title="文字居中对齐" class="font-item-radio"  data-val="center" ><icon>ꕐ</icon></span>
                      <span  title="文字右对齐" class="font-item-radio"  data-val="right" ><icon>ꕑ</icon></span>
                    </div>
                    <textarea   name="content"  ></textarea>
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">链接地址</label>
                <div class="layui-input-inline"><input type="text" name="href" class="layui-input"></div>
                <div><input name="hrefMode" value="_blank" type="checkbox" lay-skin="primary" title="新窗口打开"></div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">圆角度数</label>
                <div class="layui-input-inline">
                  <input name="bRadius" type="text" class="layui-input">
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">背景图片</label>
                <div class="layui-input-inline">
                  <input name="bgImg" type="text" class="layui-input">
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">背景平铺</label>
                <div class="layui-input-inline">
                  <select   name="bgRep" >
                    <option value="repeat" >纵横向</option>
                    <option value="repeat-x" >横向</option>
                    <option value="repeat-y" >纵向</option>
                    <option value="no-repeat" >不平铺</option>
                 </select>
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">对齐方式</label>
                <div class="layui-input-inline">
                  <select   name="bgPos" >
                    <option value="0% 0%">左上</option>
                    <option value="0% 50%">左中</option>
                    <option value="0% 100%">左下</option>
                    <option value="50% 0%">中上</option>
                    <option value="50% 50%">正中</option>
                    <option value="50% 100%">中下</option>
                    <option value="100% 0%">右上</option>
                    <option value="100% 50%">右中</option>
                    <option value="100% 100%">右下</option>
                 </select>
                </div>
              </div>

            </div>
            <div class="layui-tab-item">
              <div class="layui-form-item">
                <label class="layui-form-label">鼠标经过状态</label>
                <div class="layui-input-inline">
                  <input type="radio" name="hoverMode" lay-filter="hoverMode" value="on" title="开启" >
                  <input type="radio" name="hoverMode" lay-filter="hoverMode" value="off" title="关闭">
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">样式及内容</label>
                <div class="layui-input-inline text-panel" style="width:343px;">
                    <label class="label-con" style="letter-spacing:13px;">字体</label>
                    <div class="labelpanel"   style="width: 90px;">
                      <select   name="mfamily" >
                          <option value="宋体" >宋体</option>
                          <option value="黑体" >黑体</option>
                          <option value="微软雅黑" >雅黑</option>
                          <option value="楷体" >楷体</option>
                          <option value="arial" >Arial</option>
                          <option value="verdana" >Verdana</option>
                          <option value="georgia" >Georgia</option>
                          <option value="times new roman" >Times New Roman</option>
                          <option value="trebuchet ms" >Trebuchet MS</option>
                      </select>
                    </div>
                    <label class="label-con">文字颜色</label>
                    <div class="pagecolorpanel"  >
                        <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner" style="background-color:transparent;"></div></div></div>
                        <input class="pagecolor" name="mcolor"  type="text"  />
                        <span class="clear-color-button"></span>
                    </div>
                    <label class="label-con">文字大小</label>
                    <div class="labelpanel"   style="width: 90px; ">
                      <input type="text" name="mfSize" class="layui-input">
                    </div>
                    <label class="label-con">背景颜色</label>
                    <div class="pagecolorpanel"  >
                        <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner" style="background-color:transparent;"></div></div></div>
                        <input class="pagecolor" name="mbgColor"  type="text"  />
                        <span class="clear-color-button"></span>
                    </div>
                    <label class="label-con">行  高</label>
                    <div class="labelpanel"   style="width: 65px; ">
                      <input type="text" name="mlHeight" class="layui-input">
                    </div>
                    <label class="label-con">字  距</label>
                    <div class="labelpanel"   style="width: 65px; ">
                      <input type="text" name="mspacing" class="layui-input">
                    </div>
                    <label class="label-con">缩  进</label>
                    <div class="labelpanel"   style="width: 65px; ">
                      <input type="text" name="mindent" class="layui-input">
                    </div>
                    <div class="font-setting font-f">
                      <span  title="加粗" class="font-item-checkbox" data-val="" ><icon>ꕅ</icon><input name="mweight" type="hidden"   value="" /></span>
                      <span  title="斜体" class="font-item-checkbox" data-val="" ><icon>ꕆ</icon><input name="mfStyle" type="hidden"   value="" /></span>
                      <span  title="上划线" class="font-item-checkbox" data-val="" ><icon>ꔣ</icon><input name="moLine" type="hidden"   value="" /></span>
                      <span  title="中划线" class="font-item-checkbox" data-val=""><icon>ꕇ</icon><input name="mthrough" type="hidden"   value="" /></span>
                      <span  title="下划线" class="font-item-checkbox" data-val="" ><icon>ꕈ</icon><input name="muLine" type="hidden"   value="" /></span>

                      <i class="spaceline"></i>
                      <span  title="文字左对齐" class="font-item-radio" data-val="left" ><icon>ꕉ</icon></span>
                      <span  title="文字居中对齐" class="font-item-radio"  data-val="center" ><icon>ꕐ</icon></span>
                      <span  title="文字右对齐" class="font-item-radio"  data-val="right" ><icon>ꕑ</icon></span>

                    </div>
                    <textarea   name="mcontent"  ></textarea>
                    <div class="font-synchronous">
                      <icon>ꕦ</icon><span>同步默认文字样式</span>
                    </div>
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">背景图片</label>
                <div class="layui-input-inline">
                  <input name="mbgImg" type="text" class="layui-input">
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">背景平铺</label>
                <div class="layui-input-inline">
                  <select   name="mbgRep" >
                    <option value="repeat" >纵横向</option>
                    <option value="repeat-x" >横向</option>
                    <option value="repeat-y" >纵向</option>
                    <option value="no-repeat" >不平铺</option>
                 </select>
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">对齐方式</label>
                <div class="layui-input-inline">
                  <select   name="mbgPos" >
                    <option value="0% 0%">左上</option>
                    <option value="0% 50%">左中</option>
                    <option value="0% 100%">左下</option>
                    <option value="50% 0%">中上</option>
                    <option value="50% 50%">正中</option>
                    <option value="50% 100%">中下</option>
                    <option value="100% 0%">右上</option>
                    <option value="100% 50%">右中</option>
                    <option value="100% 100%">右下</option>
                 </select>
                </div>
              </div>
            </div>
            <div  class="layui-tab-item">
              <div class="layui-tab layui-side-card">
                <ul class="layui-tab-title"  >
                  <li class="layui-this" style="margin-top: 110px;">默认边框</li>
                  <li class="">鼠标划过动画</li>
                </ul>
                <div class="layui-tab-content" style="height: 400px;">
                  <div class="layui-tab-item layui-show">
                    <fieldset class="layui-elem-field" style="margin-top:20px;">
                      <legend>默认边框</legend>
                      <div class="layui-field-box">
                        <div class="layui-form-item"  >
                          <label class="layui-form-label">边框显示</label>
                          <div class="layui-input-block">
                            <input type="checkbox" name="bdT" value="on" lay-skin="primary" title="上边"  >
                            <input type="checkbox" name="bdB" value="on" lay-skin="primary" title="下边">
                            <input type="checkbox" name="bdL" value="on" lay-skin="primary" title="左边" >
                            <input type="checkbox" name="bdR" value="on" lay-skin="primary" title="右边"  >
                          </div>
                        </div>
                        <div class="layui-form-item"  >
                          <label class="layui-form-label">边框粗细</label>
                          <div class="layui-input-inline input-short" style="width:80px;"><input name="bdWidth" type="text" class="layui-input"></div>
                          <label class="layui-form-label">边框颜色</label>
                          <div class="layui-input-inline pagecolorpanel input-short"  >
                            <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner"></div></div></div>
                            <input name="bdColor" type="text" class="layui-input pagecolor">
                            <span class="clear-color-button"></span>
                          </div>
                        </div>
                        <div class="layui-form-item">
                          <label class="layui-form-label">边框样式</label>
                          <div class="layui-input-block">
                            <input type="radio" name="bdStyle" lay-filter="bdStyle" value="solid" title="实线" checked="">
                            <input type="radio" name="bdStyle" lay-filter="bdStyle" value="dotted" title="细虚线">
                            <input type="radio" name="bdStyle" lay-filter="bdStyle" value="dashed" title="粗虚线">
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset class="layui-elem-field" style="margin-top:20px;">
                      <legend>
                        <span  style="margin-right:15px;  display:inline-block"> 鼠标_移上边框 </span>
                        <button type="button" class="layui-btn layui-btn-sm">同步默认边框</button>
                      </legend>
                      <div class="layui-field-box">
                        <div class="layui-form-item"  >
                          <label class="layui-form-label">边框显示</label>
                          <div class="layui-input-block">
                            <input type="checkbox" name="mbdT" value="on" lay-skin="primary" title="上边"  >
                            <input type="checkbox" name="mbdB" value="on" lay-skin="primary" title="下边">
                            <input type="checkbox" name="mbdL" value="on" lay-skin="primary" title="左边" >
                            <input type="checkbox" name="mbdR" value="on" lay-skin="primary" title="右边"  >
                          </div>
                        </div>
                        <div class="layui-form-item"  >
                          <label class="layui-form-label">边框粗细</label>
                          <div class="layui-input-inline input-short" style="width:80px;"><input name="mbdWidth" type="text" class="layui-input"></div>
                          <label class="layui-form-label">边框颜色</label>
                          <div class="layui-input-inline pagecolorpanel input-short"  >
                            <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner"></div></div></div>
                            <input name="mbdColor" type="text" class="layui-input pagecolor">
                            <span class="clear-color-button"></span>
                          </div>
                        </div>
                        <div class="layui-form-item">
                          <label class="layui-form-label">边框样式</label>
                          <div class="layui-input-block">
                            <input type="radio" name="mbdStyle" lay-filter="mbdStyle" value="solid" title="实线" checked="">
                            <input type="radio" name="mbdStyle" lay-filter="mbdStyle" value="dotted" title="细虚线">
                            <input type="radio" name="mbdStyle" lay-filter="mbdStyle" value="dashed" title="粗虚线">
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="layui-tab-item ">
                    <fieldset  class="layui-elem-field" style="margin-top:25px;">
                      <legend>
                        动画时长
                        <input class="input-short"  type="text" name="mbdTsDur"  style="width:50px; height:20px; margin-left:10px; padding-left:5px;" />
                        <label class="label-con">秒</label>
                      </legend>
                      <div class="layui-field-box">
                        <input class="radio-medium" type="radio" name="mbdTsFun" value="linear"  title="匀速">
                        <input class="radio-medium" type="radio" name="mbdTsFun" value="ease"  title="逐渐变慢">
                        <input class="radio-medium" type="radio" name="mbdTsFun" value="ease-in"   title="减速">
                        <div class="sepline"></div>
                        <input class="radio-medium" type="radio" name="mbdTsFun" value="ease-out"   title="加速">
                        <input class="radio-medium" type="radio" name="mbdTsFun" value="ease-in-out"   title="加速后减速">
                        <input class="radio-medium" type="radio" name="mbdTsFun" value="cubic-bezier"   title="动感弹跳">
                      </div>
                    </fieldset>
                    <fieldset  class="layui-elem-field" style="margin-top:25px;">
                      <legend>动画效果</legend>
                      <div class="layui-field-box">
                        <input class="radio-medium" type="radio" name="mbdTsAnt"  value="bdtx0" title="直接切换">
                        <input class="radio-medium" type="radio" name="mbdTsAnt"  value="bdtx1" title="渐隐渐显" >
                        <div class="sepline"></div>
                        <input class="radio-medium" type="radio" name="mbdTsAnt"  value="bdtx4"  title="左对角线切入">
                        <input class="radio-medium" type="radio" name="mbdTsAnt"  value="bdtx5"  title="右对角线切入">
                        <div class="sepline"></div>
                        <input class="radio-medium" type="radio" name="mbdTsAnt"  value="bdtx6"  title="顺时针出现">
                        <input class="radio-medium" type="radio" name="mbdTsAnt"  value="bdtx7"  title="逆时针出现">
                        <div class="sepline"></div>
                        <input class="radio-medium" type="radio" name="mbdTsAnt"  value="bdtx8"  title="由点到线">
                        <input class="radio-medium" type="radio" name="mbdTsAnt"  value="bdtx9"  title="由点到面">
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>
            <div class="layui-tab-item">
              <fieldset  class="layui-elem-field">
                <legend>
                  动画时长
                  <input class="input-short"  type="text" name="mTsDur"  style="width:50px; height:20px; margin-left:10px; padding-left:5px;" />
                  <label class="label-con">秒</label>
                </legend>
                <div class="layui-field-box">
                  <input class="radio-medium" type="radio" name="mTsFun" value="linear"  title="匀速">
                  <input class="radio-medium" type="radio" name="mTsFun" value="ease"  title="逐渐变慢">
                  <input class="radio-medium" type="radio" name="mTsFun" value="ease-in"   title="减速">
                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="mTsFun" value="ease-out"   title="加速">
                  <input class="radio-medium" type="radio" name="mTsFun" value="ease-in-out"   title="加速后减速">
                  <input class="radio-medium" type="radio" name="mTsFun" value="cubic-bezier"   title="动感弹跳">
                </div>
              </fieldset>
              <fieldset  class="layui-elem-field" style="margin-top:15px;">
                <legend>动画效果</legend>
                <div class="layui-field-box">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans0" title="无效果">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans1" title="右切入">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans2"  title="下切入">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans3"  title="左切入">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans4"  title="上切入">
                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans5"  title="右切出">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans6"  title="下切出">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans7"  title="左切出">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans8"  title="上切出">

                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans9"  title="右切入切出">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans10"   title="下切入切出">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans11"   title="左切入切出">

                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans12"  title="上切入切出">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans13"  title="放大出现">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans14"  title="缩小出现">

                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans15"  title="翻转出现">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans16"  title="缩放出现1">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans17"  title="缩放出现2">

                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans18"  title="旋转放大">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans19"  title="旋转缩小">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans20"  title="渐隐渐显">
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-ft-btn">
            <button class="layui-btn" lay-submit lay-filter="textComponentForm">确定</button>
            <button type="button" class="cancel-btn layui-btn layui-btn-primary">取消</button>
          </div>
        </div>
      </form>`
    });
    var form = layui.form
    form.render();
    form.on('submit(textComponentForm)', function(data) {
      that.formData = data.field;
      that.formData.align = $layerElem.find('.font-z .font-item-radio.active').data('val')
      that.formData.malign = $layerElem.find('.font-f .font-item-radio.active').data('val')

      that.update(that.formData)
      that.updatePropPanel()

      layer.close(layerNo)
      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    form.val('textComponentForm', that.formData)
  }
  update(formData) {
    let that = this
    let bRadius=this.formData.bRadius;
    let deline=this.formData.uLine;
    if(this.formData.oLine){
      deline+=' '+this.formData.oLine
    }
    if(this.formData.through){
      deline+=' '+this.formData.through
    }
    if(deline ==="") deline='none'
    let $defPanel=this.$contentBox.find(".on")
    $defPanel.css("font-family",this.formData.family)
    $defPanel.css('color', this.formData.color)
    $defPanel.css('background-color', this.formData.bgColor)
    $defPanel.css('font-size', parseInt(this.formData.fSize))
    $defPanel.css('line-height', this.formData.lHeight+'px')
    $defPanel.css('letter-spacing', parseInt(this.formData.spacing))
    $defPanel.css('text-indent', parseInt(this.formData.indent))
    $defPanel.css('border-radius',parseInt(bRadius))

    $defPanel.css('text-align', this.formData.align)
    $defPanel.css("font-weight",this.formData.weight)
    $defPanel.css("font-style",this.formData.fStyle)
    $defPanel.css("text-decoration",deline)


    $defPanel.text(formData.content)

    let $offPanel=this.$contentBox.find(".off")
    let _mTsAntAttr=this.$content.attr("mTsAnt")
    if(this.formData.hoverMode==="on"){
      $offPanel.remove()

      let offline=this.formData.muLine;
      if(this.formData.moLine){
        offline+=' '+this.formData.moLine
      }
      if(this.formData.mthrough){
        offline+=' '+this.formData.mthrough
      }
      if(offline ==="") offline='none'

      let $_mTsAnt=this.formData.mTsAnt

      if($_mTsAnt=='atrans5' || $_mTsAnt=='atrans6' || $_mTsAnt==='atrans7' || $_mTsAnt==='atrans8' || $_mTsAnt==='atrans9' || $_mTsAnt==='atrans19' ){
        this.$contentBox.find(".on").before("<div class='off'></div>")
      }else{
        this.$contentBox.find(".on").after("<div class='off'></div>")
      }
      $offPanel=this.$contentBox.find(".off")
      $offPanel.text(formData.mcontent)
      $offPanel.css("font-family",this.formData.mfamily)
      $offPanel.css('color', this.formData.mcolor)
      $offPanel.css('background-color', this.formData.mbgColor)
      $offPanel.css('font-size', parseInt(this.formData.mfSize))
      $offPanel.css('line-height', this.formData.mlHeight+'px')
      $offPanel.css('letter-spacing', parseInt(this.formData.mspacing))
      $offPanel.css('text-indent', parseInt(this.formData.mindent))

      $offPanel.css('border-radius', this.formData.bRadius)

      $offPanel.css('text-align', this.formData.malign)
      $offPanel.css("font-weight",this.formData.mweight)
      $offPanel.css("font-style",this.formData.mfStyle)
      $offPanel.css("text-decoration",offline)


      if(this.formData.mTsFun==='cubic-bezier'){
        $defPanel.css('transition-timing-function', 'cubic-bezier(0.52, 1.64, 0.37, 0.66)')
        $offPanel.css('transition-timing-function', 'cubic-bezier(0.52, 1.64, 0.37, 0.66)')
      }else{
        $defPanel.css('transition-timing-function', this.formData.mTsFun)
        $offPanel.css('transition-timing-function', this.formData.mTsFun)
      }
      $defPanel.css('transition-duration', this.formData.mTsDur+'s')
      $offPanel.css('transition-duration', this.formData.mTsDur+'s')


      this.$content.removeClass(_mTsAntAttr);
      this.$content.addClass(this.formData.mTsAnt)
      this.$content.attr("mTsAnt",this.formData.mTsAnt)
    }else{
      $offPanel.remove();
      this.$content.removeClass(_mTsAntAttr);
      this.$content.attr("mTsAnt",'')
    }
      $offPanel=this.$contentBox.find(".off")


    //处理边框
    let isDefBk=false;
    let $textPanel=this.$contentBox.find(".ant-text")
    $textPanel.css('border-radius',parseInt(bRadius))

    let bdWidth=this.formData.bdWidth !="" ? parseInt(this.formData.bdWidth) : '';
    let $alPanel=this.$contentBox.find(".bk-aline")
    if (this.formData.bdT==="on" || this.formData.bdB==="on" ||this.formData.bdL==="on"||this.formData.bdR==="on"){
      if($alPanel.length <=0)
        $textPanel.append("<div class='bk-aline'></div>")
      $alPanel=this.$contentBox.find(".bk-aline")
      $alPanel.css('border-radius',parseInt(bRadius))


      if(this.formData.bdT==="on"){
        $alPanel.css('border-top-width', bdWidth)
        $defPanel.css('padding-top', bdWidth)
      }else{
        $alPanel.css('border-top-width', 0)
        $defPanel.css('padding-top', 0)
      }
      if(this.formData.bdB==="on"){
        $alPanel.css('border-bottom-width', bdWidth)
        $defPanel.css('padding-bottom', bdWidth)
      }else{
        $alPanel.css('border-bottom-width', 0)
        $defPanel.css('padding-bottom', 0)
      }
      if(this.formData.bdL==="on"){
        $alPanel.css('border-Left-width', bdWidth)
        $defPanel.css('padding-Left', bdWidth)
      }else{
        $alPanel.css('border-Left-width', 0)
        $defPanel.css('padding-Left', 0)
      }
      if(this.formData.bdR==="on"){
        $alPanel.css('border-right-width', bdWidth)
        $defPanel.css('padding-right', bdWidth)
      }else{
        $alPanel.css('border-right-width', 0)
        $defPanel.css('padding-right', 0)
      }
      $alPanel.css('border-style', this.formData.bdStyle)
      $alPanel.css('border-color', this.formData.bdColor)
    }else{
        $alPanel.remove()
        isDefBk=true
    }


    let mbdTsAntVal=this.$content.attr("mbdTsAnt")
    this.$content.removeClass(mbdTsAntVal);
    this.$content.addClass(this.formData.mbdTsAnt)
    this.$content.attr("mbdTsAnt",this.formData.mbdTsAnt)

    if(this.formData.mbdT ==="on" || this.formData.mbdB==="on" ||this.formData.mbdL==="on"||this.formData.mbdR==="on" ){
      let mbdTsFunVal=this.formData.mbdTsFun==='cubic-bezier'  ? 'cubic-bezier(0.52, 1.64, 0.37, 0.66)' : this.formData.mbdTsFun
      let mbdTsDurVal=this.formData.mbdTsDur+'s'

      const mbdWidth=this.formData.mbdWidth !="" ? parseInt(this.formData.mbdWidth) : '';
      const mbdStyle=this.formData.mbdStyle
      const mbdColor=this.formData.mbdColor



      let $mlPanel=this.$contentBox.find(".bk-mline")
      if($mlPanel.length <=0) $textPanel.append("<div class='bk-mline'></div>")
      $mlPanel=this.$contentBox.find(".bk-mline")
      $mlPanel.css('border-radius',parseInt(bRadius))
      $mlPanel.css('border-color', mbdColor)
      $mlPanel.css('border-style', mbdStyle)
      $mlPanel.css('transition-timing-function',mbdTsFunVal)
      $mlPanel.css('transition-duration',mbdTsDurVal)

      let $ltPanel=this.$contentBox.find(".w-lt")
      if(this.formData.mbdT==="on"){
        if($ltPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-lt'></div>")
          $ltPanel=this.$contentBox.find(".w-lt")
          $ltPanel.css('border-top-width',mbdWidth)
          $ltPanel.css('border-top-style',mbdStyle)
          $ltPanel.css('border-top-color',mbdColor)
          $ltPanel.css('transition-timing-function',mbdTsFunVal)
          $ltPanel.css('transition-duration',mbdTsDurVal)
          $offPanel.css('padding-top', mbdWidth)
          $mlPanel.css('border-top-width', mbdWidth)

          if(isDefBk) $defPanel.css('padding-top', mbdWidth)

      }else{
        $offPanel.css('padding-top', 0)
        $mlPanel.css('border-top-width', 0)
        if(isDefBk) $defPanel.css('padding-top', 0)
        $ltPanel.remove()

      }
      let $lbPanel=this.$contentBox.find(".w-lb")
      if(this.formData.mbdB==="on"){
        if($lbPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-lb'></div>")
          $lbPanel=this.$contentBox.find(".w-lb")
          $lbPanel.css('border-bottom-width',mbdWidth)
          $lbPanel.css('border-bottom-style',mbdStyle)
          $lbPanel.css('border-bottom-color',mbdColor)
          $lbPanel.css('transition-timing-function',mbdTsFunVal)
          $lbPanel.css('transition-duration',mbdTsDurVal)
          $offPanel.css('padding-bottom', mbdWidth)
          $mlPanel.css('border-bottom-width', mbdWidth)
          if(isDefBk) $defPanel.css('padding-bottom', mbdWidth)
      }else{

        $offPanel.css('padding-bottom', 0)
        $mlPanel.css('border-bottom-width', 0)
        if(isDefBk) $defPanel.css('padding-bottom', 0)
        $lbPanel.remove()
      }
      let $llPanel=this.$contentBox.find(".w-ll")
      if(this.formData.mbdL==="on"){
        if($llPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-ll'></div>")
          $llPanel=this.$contentBox.find(".w-ll")
          $llPanel.css('border-left-width',mbdWidth)
          $llPanel.css('border-left-style',mbdStyle)
          $llPanel.css('border-left-color',mbdColor)
          $llPanel.css('transition-timing-function',mbdTsFunVal)
          $llPanel.css('transition-duration',mbdTsDurVal)
          $offPanel.css('padding-left', mbdWidth)
          $mlPanel.css('border-left-width',mbdWidth)
          if(isDefBk) $defPanel.css('padding-left', mbdWidth)

      }else{

        $offPanel.css('padding-left', 0)
        $mlPanel.css('border-left-width',0)
        if(isDefBk) $defPanel.css('padding-left', 0)
        $llPanel.remove()
      }
      let $lrPanel=this.$contentBox.find(".w-lr")
      if(this.formData.mbdR==="on"){
        if($lrPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-lr'></div>")
          $lrPanel=this.$contentBox.find(".w-lr")
          $lrPanel.css('border-right-width',mbdWidth)
          $lrPanel.css('border-right-style',mbdStyle)
          $lrPanel.css('border-right-color',mbdColor)
          $lrPanel.css('transition-timing-function',mbdTsFunVal)
          $lrPanel.css('transition-duration',mbdTsDurVal)
          $offPanel.css('padding-right', mbdWidth)
          $mlPanel.css('border-right-width',mbdWidth)
          if(isDefBk) $defPanel.css('padding-right', mbdWidth)

      }else{
        $offPanel.css('padding-right', 0)
        $mlPanel.css('border-right-width',0)
        if(isDefBk) $defPanel.css('padding-right', 0)
        $lrPanel.remove()
      }

      //以上所有边框加上
      if(this.formData.mbdTsAnt ==="bdtx0" || this.formData.mbdTsAnt ==="bdtx1"){
        $ltPanel.remove()
        $lbPanel.remove()
        $llPanel.remove()
        $lrPanel.remove()
      }else{
        $mlPanel.remove()
      }
    }
  }
  updatePropPanel(){
    let that = this
    let $propPanel = this.$propPanel

    let $familySelect = $propPanel.find('select[name=family]')
    $familySelect.val(this.formData.family)

    let $colorInput = $propPanel.find('input[type=text][name=color]')
    $colorInput.val(this.formData.color)

    let $fSizeInput = $propPanel.find('input[type=text][name=fSize]')
    $fSizeInput.val(this.formData.fSize)

    let $bgColorInput = $propPanel.find('input[type=text][name=bgColor]')
    $bgColorInput.val(this.formData.bgColor)

    let $lHeightInput = $propPanel.find('input[type=text][name=lHeight]')
    $lHeightInput.val(this.formData.lHeight)

    let $spacingInput = $propPanel.find('input[type=text][name=spacing]')
    $spacingInput.val(this.formData.spacing)

    let $indentInput = $propPanel.find('input[type=text][name=indent]')
    $indentInput.val(this.formData.indent)

    let $contentTextarea = $propPanel.find('textarea[name=content]')
    $contentTextarea.val(this.formData.content)

    let $hrefInput = $propPanel.find('input[type=text][name=href]')
    $hrefInput.val(this.formData.href)

    let $hrefModeCheckBox = $propPanel.find('input[type=checkbox][name=hrefMode]')
    if (this.formData.hrefMode === '_blank') {
      $hrefModeCheckBox.prop('checked', true)
    } else {
      $hrefModeCheckBox.prop('checked', false)
    }
    let $bRadiusInput = $propPanel.find('input[type=text][name=bRadius]')
    $bRadiusInput.val(this.formData.bRadius)


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

    //以下是移上信息
    let $hoverModeRadio = $propPanel.find('input[type=radio][name=hoverMode]')
    $hoverModeRadio.filter(`[value="${this.formData.hoverMode}"]`).prop('checked', true)

    let $mfamilySelect = $propPanel.find('select[name=mfamily]')
    $mfamilySelect.val(this.formData.mfamily)

    let $mcolorInput = $propPanel.find('input[type=text][name=mcolor]')
    $mcolorInput.val(this.formData.mcolor)

    let $mfSizeInput = $propPanel.find('input[type=text][name=mfSize]')
    $mfSizeInput.val(this.formData.mfSize)

    let $mbgColorInput = $propPanel.find('input[type=text][name=mbgColor]')
    $mbgColorInput.val(this.formData.mbgColor)

    let $mlHeightInput = $propPanel.find('input[type=text][name=mlHeight]')
    $mlHeightInput.val(this.formData.mlHeight)

    let $mspacingInput = $propPanel.find('input[type=text][name=mspacing]')
    $mspacingInput.val(this.formData.mspacing)

    let $mindentInput = $propPanel.find('input[type=text][name=mindent]')
    $mindentInput.val(this.formData.mindent)

    let $mcontentTextarea = $propPanel.find('textarea[name=mcontent]')
    $mcontentTextarea.val(this.formData.mcontent)
    if (this.formData.mcolor) {
       $mcolorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.mcolor)
    }else{
      $mcolorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }
    if (this.formData.mbgColor) {
       $mbgColorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.mbgColor)
    }else{
      $mbgColorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }

   //右侧  正面字体样式设置
    $propPanel.find(`.font-setting span`).removeClass('active')
    let $weightInput = $propPanel.find('.font-z input[type=hidden][name=weight]')
    if(that.formData.weight=="600"){
      $weightInput.val("600")
      $weightInput.parent().addClass("active")
    }else{
      $weightInput.val("")
    }
    let $fStyleInput = $propPanel.find('.font-z input[type=hidden][name=fStyle]')
    if(that.formData.fStyle=="italic"){
      $fStyleInput.val("italic")
      $fStyleInput.parent().addClass("active")
    }else{
      $fStyleInput.val("normal")
    }
    let $oLineInput = $propPanel.find('.font-z input[type=hidden][name=oLine]')
    if(that.formData.oLine=="overline"){
      $oLineInput.val("overline")
      $oLineInput.parent().addClass("active")
    }else{
      $oLineInput.val("")
    }

    let $throughInput = $propPanel.find('.font-z input[type=hidden][name=through]')
    if(that.formData.through=="line-through"){
      $throughInput.val("line-through")
      $throughInput.parent().addClass("active")
    }else{
      $throughInput.val("")
    }
    let $uLineInput = $propPanel.find('.font-z input[type=hidden][name=uLine]')
    if(that.formData.uLine=="underline"){
      $uLineInput.val("underline")
      $uLineInput.parent().addClass("active")
    }else{
      $uLineInput.val("")
    }

    //右侧 反面字体样式设置
    let $mweightInput = $propPanel.find('.font-f input[type=hidden][name=mweight]')
    if(that.formData.mweight=="600"){
      $mweightInput.val("600")
      $mweightInput.parent().addClass("active")
    }else{
      $mweightInput.val("")
    }
    let $mfStyleInput = $propPanel.find('.font-f input[type=hidden][name=mfStyle]')
    if(that.formData.mfStyle=="italic"){
      $mfStyleInput.val("italic")
      $mfStyleInput.parent().addClass("active")
    }else{
      $mfStyleInput.val("normal")
    }
    let $moLineInput = $propPanel.find('.font-f input[type=hidden][name=moLine]')
    if(that.formData.moLine=="overline"){
      $moLineInput.val("overline")
      $moLineInput.parent().addClass("active")
    }else{
      $moLineInput.val("")
    }

    let $mthroughInput = $propPanel.find('.font-f input[type=hidden][name=mthrough]')
    if(that.formData.mthrough=="line-through"){
      $mthroughInput.val("line-through")
      $mthroughInput.parent().addClass("active")
    }else{
      $mthroughInput.val("")
    }
    let $muLineInput = $propPanel.find('.font-z input[type=hidden][name=muLine]')
    if(that.formData.uLine=="underline"){
      $muLineInput.val("underline")
      $muLineInput.parent().addClass("active")
    }else{
      $muLineInput.val("")
    }

    $propPanel.find(`.font-z .font-item-radio[data-val="${that.formData.align}"]`).addClass('active')
    $propPanel.find(`.font-f .font-item-radio[data-val="${that.formData.malign}"]`).addClass('active')

    //移上动画信息
    let $mTsDurInput = $propPanel.find('input[type=text][name=mTsDur]')
    $mTsDurInput.val(this.formData.mTsDur)
    let $mTsFunRadio = $propPanel.find('input[type=radio][name=mTsFun]')
    $mTsFunRadio.filter(`[value="${this.formData.mTsFun}"]`).prop('checked', true)
    let $mTsAntRadio = $propPanel.find('input[type=radio][name=mTsAnt]')
    $mTsAntRadio.filter(`[value="${this.formData.mTsAnt}"]`).prop('checked', true)

    //边框信息
    let $bdTCheckBox = $propPanel.find('input[type=checkbox][name=bdT]')
    if (this.formData.bdT === 'on') {
      $bdTCheckBox.prop('checked', true)
    } else {
      $bdTCheckBox.prop('checked', false)
    }
    let $bdBCheckBox = $propPanel.find('input[type=checkbox][name=bdB]')
    if (this.formData.bdB === 'on') {
      $bdBCheckBox.prop('checked', true)
    } else {
      $bdBCheckBox.prop('checked', false)
    }
    let $bdLCheckBox = $propPanel.find('input[type=checkbox][name=bdL]')
    if (this.formData.bdL === 'on') {
      $bdLCheckBox.prop('checked', true)
    } else {
      $bdLCheckBox.prop('checked', false)
    }
    let $bdRCheckBox = $propPanel.find('input[type=checkbox][name=bdR]')
    if (this.formData.bdR === 'on') {
      $bdRCheckBox.prop('checked', true)
    } else {
      $bdRCheckBox.prop('checked', false)
    }

    let $bdWidthInput = $propPanel.find('input[type=text][name=bdWidth]')
    $bdWidthInput.val(this.formData.bdWidth)
    let $bdStyleRadio = $propPanel.find('input[type=radio][name=bdStyle]')
    $bdStyleRadio.filter(`[value="${this.formData.bdStyle}"]`).prop('checked', true)
    let $bdColorInput = $propPanel.find('input[type=text][name=bdColor]')
    $bdColorInput.val(this.formData.bdColor)
    if (this.formData.bdColor) {
      $bdColorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.bdColor)
    }else{
      $bdColorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }

    //移上边框
    let $mbdTCheckBox = $propPanel.find('input[type=checkbox][name=mbdT]')
    if (this.formData.mbdT === 'on') {
      $mbdTCheckBox.prop('checked', true)
    } else {
      $mbdTCheckBox.prop('checked', false)
    }
    let $mbdBCheckBox = $propPanel.find('input[type=checkbox][name=mbdB]')
    if (this.formData.mbdB === 'on') {
      $mbdBCheckBox.prop('checked', true)
    } else {
      $mbdBCheckBox.prop('checked', false)
    }
    let $mbdLCheckBox = $propPanel.find('input[type=checkbox][name=mbdL]')
    if (this.formData.mbdL === 'on') {
      $mbdLCheckBox.prop('checked', true)
    } else {
      $mbdLCheckBox.prop('checked', false)
    }
    let $mbdRCheckBox = $propPanel.find('input[type=checkbox][name=mbdR]')
    if (this.formData.mbdR === 'on') {
      $mbdRCheckBox.prop('checked', true)
    } else {
      $mbdRCheckBox.prop('checked', false)
    }

    let $mbdWidthInput = $propPanel.find('input[type=text][name=mbdWidth]')
    $mbdWidthInput.val(this.formData.mbdWidth)
    let $mbdStyleRadio = $propPanel.find('input[type=radio][name=mbdStyle]')
    $mbdStyleRadio.filter(`[value="${this.formData.mbdStyle}"]`).prop('checked', true)
    let $mbdColorInput = $propPanel.find('input[type=text][name=mbdColor]')
    $mbdColorInput.val(this.formData.mbdColor)
    if (this.formData.mbdColor) {
      $mbdColorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.mbdColor)
    }else{
      $mbdColorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }

    let $mbdTsDurInput = $propPanel.find('input[type=text][name=mbdTsDur]')
    $mbdTsDurInput.val(this.formData.mbdTsDur)
    let $mbdTsFunRadio = $propPanel.find('input[type=radio][name=mbdTsFun]')
    $mbdTsFunRadio.filter(`[value="${this.formData.mbdTsFun}"]`).prop('checked', true)

    let $mbdTsAntRadio = $propPanel.find('input[type=radio][name=mbdTsAnt]')
    $mbdTsAntRadio.filter(`[value="${this.formData.mbdTsAnt}"]`).prop('checked', true)
  }
}


