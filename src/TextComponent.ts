import Component from './Component';
import {compareForm,valInt,valEmpty } from './common';
import { setFontOption} from './commonOption';
import {bgImage,textLine} from './commonCss'
import { initPorpBorder,updateBorder,updatePropBorder,editPopHtmlBorder,setPopHtmlBorder,editSideHtmlBorder,toHtmlBorder} from './borderComponent';
import { updateShadow,editPopHtmlShadow,setPopHtmlShadow,toHtmlShadow} from './shadowComponent';
import UpdateFormAction from "./UpdateFormAction"

export default class TextComponent extends Component {
　$content: JQuery
  constructor() {
    super('text-component')
    let content = `
    <div class="ant-text xdtb" ><a class="ywlink"   mTsAnt=""  mbdTsAnt=""><div class="on">请设置文本内容</div></a></div>
      `
    this.$contentBox.append(content)
    this.$content = this.$contentBox.find('.ywlink')
    this.initFormData()
  }
  initFormData() {
    this.formData.appLabel = ''
    
    this.formData.scrlY = 'off' 
    this.formData.family = 'arial' //字体
    this.formData.fSize = 12
    this.formData.color = '#000'
    this.formData.bgColor = ''
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

    this.formData.bgImg = ''
    this.formData.bgRep ='no-repeat'  //背景平铺方式
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

    this.formData.mbgImg = ''
    this.formData.mbgRep ='no-repeat'  //背景平铺方式
    this.formData.mbgPos ='' //背景对齐位置

    this.formData.mTsDur ='0.4'   //动画时长
    this.formData.mTsFun ='ease'  //速度曲线
    this.formData.mTsAnt ='atrans5'  //动画效果

    this.formData.bdT ='off'
    this.formData.bdB ='off'
    this.formData.bdL ='off'
    this.formData.bdR ='off'
    this.formData.sdSize =5
    this.formData.bdWidth =5
    this.formData.bdColor ='#FFFF00'
    this.formData.bdStyle ='solid'


    this.formData.mbdT ='off'
    this.formData.mbdB ='off'
    this.formData.mbdL ='off'
    this.formData.mbdR ='off'
    this.formData.msdSize =5
    this.formData.mbdWidth =5
    this.formData.mbdStyle ='solid'


    this.formData.mbdTsDur ='0.5'
    this.formData.mbdTsFun ='ease-out'
    this.formData.mbdColor ='#00FFFF'
    this.formData.mbdTsAnt ='bdtx1'

    this.doUpdate(this.formData)

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
    let top, left, width, height,bRadius,tipText,hrefMode,href,hoverMode,scrlY,scrlCss='',scrlStyle=''
    let htmlList=[]

    top = this.$el.css('top')
    left = this.$el.css('left')
    width = this.$el.width()
    height = this.$el.height()
    bRadius=valEmpty(this.formData.bRadius)
    hoverMode=valEmpty(this.formData.hoverMode)
    scrlY=valEmpty(this.formData.scrlY)
    if(scrlY==="on"){
    scrlCss=' scrly-box'
    scrlStyle='padding-right:5px;'
    }

    

    href=valEmpty(this.formData.href) !="" ?  ' href="'+this.formData.href+'"':''
    hrefMode=valEmpty(this.formData.hrefMode) ==="_blank" ?  ' target="'+this.formData.hrefMode+'"':''
    tipText=valEmpty(this.formData.tipText) !="" ? ' title="'+this.formData.tipText+'" ' : ''
    let radiusStyle='word-wrap: break-word;word-break: normal;'
        radiusStyle+=bRadius !="" ? 'border-radius:'+bRadius+'px;' :''
 

    //处理 阴影
    let shadowData = toHtmlShadow(this.formData)
    let onShadowStyle=shadowData.onShadow
    let offShadowHtml= shadowData.offShadow
    //处理 边框
    let mbdTsAnt=valEmpty(this.formData.mbdTsAnt)
    let BorderData = toHtmlBorder(this.formData)
    let bdpdStyle=BorderData.bdpdStyle
    let mbdpdStyle=BorderData.mbdpdStyle
    let bdHtml=BorderData.Html


    let family, fSize, color, bgColor,lHeight,spacing,indent,weight,fStyle,oLine,through,uLine,align,content,bgImg,bgRep,bgPos,onBgStyle,onlineStyle,onHtml
    content=valEmpty(this.formData.content)  !="" ? this.formData.content :''
    family=valEmpty(this.formData.family) !="" ? 'font-family:'+this.formData.family+';' :''
    fSize=valEmpty(this.formData.fSize) !="" ? 'font-size:'+this.formData.fSize+'px;' :''
    color=valEmpty(this.formData.color) !="" ? 'color:'+this.formData.color+';' :''
    lHeight=valEmpty(this.formData.lHeight) !="" ? 'line-height:'+this.formData.lHeight+'px;' :''
    spacing=valEmpty(this.formData.spacing) !="" ? 'letter-spacing:'+this.formData.spacing+'px;' :''
    indent=valEmpty(this.formData.indent) !="" ? 'text-indent:'+this.formData.indent+'px;' :''
    weight=valEmpty(this.formData.weight) !="" ? 'font-weight:'+this.formData.weight+';' :''
    fStyle=valEmpty(this.formData.fStyle) !="" ? 'font-style:'+this.formData.fStyle+';' :''
    align=valEmpty(this.formData.align) !="" ? 'text-align:'+this.formData.align+';' :''

    bgColor=valEmpty(this.formData.bgColor)
    bgImg=valEmpty(this.formData.bgImg)
    bgRep=valEmpty(this.formData.bgRep)
    bgPos=valEmpty(this.formData.bgPos)
    onBgStyle=bgImage(bgImg,bgColor,bgRep,bgPos,'')
    onBgStyle=onBgStyle !="" ?  'background:'+onBgStyle+';' : ''

    oLine=valEmpty(this.formData.oLine)
    through=valEmpty(this.formData.through)
    uLine=valEmpty(this.formData.uLine)
    onlineStyle=textLine(oLine,through,uLine) //处理线
    onlineStyle=onlineStyle !="" ?  'text-decoration:'+onlineStyle+';' : ''


    //鼠标经过
    let mTsDur,mTsFun,mTsAnt,mTsFunVal,mTsDurVal,mTsAntStyle
    mTsDur=valEmpty(this.formData.mTsDur)
    mTsFun=valEmpty(this.formData.mTsFun)

    mTsFunVal=mTsFun==='cubic-bezier'?  'cubic-bezier(0.52, 1.64, 0.37, 0.66)' :mTsFun
    mTsDurVal=mTsDur !="" ? 'transition-duration:'+mTsDur+'s;':''
    //鼠标经过样式
    mTsAntStyle='transition-timing-function:'+mTsFunVal+';'+mTsDurVal

    onHtml='<div class="on" style="'+radiusStyle+scrlStyle+onBgStyle+onlineStyle+mTsAntStyle+bdpdStyle+family+fSize+color+lHeight+spacing+indent+weight+align+fStyle+'" >'+content+'</div>'

    //反面
    if(hoverMode==="on"){
      mTsAnt=valEmpty(this.formData.mTsAnt)
      let mfamily, mfSize, mcolor, mbgColor,mlHeight,mspacing,mindent,mweight,mfStyle,moLine,mthrough,muLine,malign,mcontent,mbgImg,mbgRep,mbgPos,offBgStyle,offlineStyle,offHtml
      mcontent=valEmpty(this.formData.mcontent)  !="" ? this.formData.mcontent :''
      mfamily=valEmpty(this.formData.mfamily) !="" ? 'font-family:'+this.formData.mfamily+';' :''
      mfSize=valEmpty(this.formData.mfSize) !="" ? 'font-size:'+this.formData.mfSize+'px;' :''
      mcolor=valEmpty(this.formData.mcolor) !="" ? 'color:'+this.formData.mcolor+';' :''
      mlHeight=valEmpty(this.formData.mlHeight) !="" ? 'line-height:'+this.formData.mlHeight+'px;' :''
      mspacing=valEmpty(this.formData.mspacing) !="" ? 'letter-spacing:'+this.formData.mspacing+'px;' :''
      mindent=valEmpty(this.formData.mindent) !="" ? 'text-indent:'+this.formData.mindent+'px;' :''
      mweight=valEmpty(this.formData.mweight) !="" ? 'font-weight:'+this.formData.mweight+';' :''
      mfStyle=valEmpty(this.formData.mfStyle) !="" ? 'font-style:'+this.formData.mfStyle+';' :''
      malign=valEmpty(this.formData.malign) !="" ? 'text-align:'+this.formData.malign+';' :''

      mbgColor=valEmpty(this.formData.mbgColor)
      mbgImg=valEmpty(this.formData.mbgImg)
      mbgRep=valEmpty(this.formData.mbgRep)
      mbgPos=valEmpty(this.formData.mbgPos)
      offBgStyle=bgImage(mbgImg,mbgColor,mbgRep,mbgPos,'')
      offBgStyle=offBgStyle !="" ?  'background:'+offBgStyle+';' : ''

      moLine=valEmpty(this.formData.moLine)
      mthrough=valEmpty(this.formData.mthrough)
      muLine=valEmpty(this.formData.muLine)
      offlineStyle=textLine(moLine,mthrough,muLine) //处理线
      offlineStyle=offlineStyle !="" ?  'text-decoration:'+offlineStyle+';' : ''

      offHtml='<div class="off" style="'+radiusStyle+offBgStyle+offlineStyle+mTsAntStyle+mbdpdStyle+mfamily+mfSize+mcolor+mlHeight+mspacing+mindent+mweight+malign+mfStyle+'" >'+mcontent+'</div>'

      if(mTsAnt=='atrans5' || mTsAnt=='atrans6' || mTsAnt==='atrans7' || mTsAnt==='atrans8' || mTsAnt==='atrans9' || mTsAnt==='atrans19' ){
        htmlList.push(offHtml)
        htmlList.push(onHtml)
      }else{
        htmlList.push(onHtml)
        htmlList.push(offHtml)
      }
    }else{
      htmlList.push(onHtml)
    }
    //边框
    htmlList.push(bdHtml)
    let htmlLink=htmlList.join('')
    if(hoverMode ==="on"){
      htmlLink='<a '+tipText+' class="ywlink '+mTsAnt+' '+mbdTsAnt+'" '+href+hrefMode+' style="'+radiusStyle+'">'+htmlLink+'</a>'
    }
    return '<div class="abs xdtb ant-text '+scrlCss+'" style="top: '+top+'; left:'+left+'; width:'+width+'px; height:'+height+'px;'+onShadowStyle+radiusStyle+'" >'+offShadowHtml+htmlLink+'</div>'




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

    $('.prop-setting-ct > div').hide()
    let $propPanel = $('.text-com-prop-panel')
    this.$propPanel = $propPanel
    $propPanel.show()
    $propPanel.find('*').off()

    setFontOption($propPanel.find('.font-select'))
    editSideHtmlBorder($propPanel.find('.side-item-border'))

    this.updatePropPanel();
    //收缩 重新加载
    let element = layui.element
    element.render("collapse")

    let $hrefModeCheckBox = $propPanel.find('input[type=checkbox][name=hrefMode]')
    $hrefModeCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.update({hrefMode: val ? '_blank' : ''})
    })
    let $hrefInput = $propPanel.find('input[type=text][name=href]')
    $hrefInput.keyup(function() {
      let val = $(this).val()
      that.update({href: val})
    })
    let $bRadiusInput = $propPanel.find('input[type=text][name=bRadius]')
    $bRadiusInput.keyup(function() {
      let val = $(this).val()
      that.update({bRadius: val})
    })
    let $scrlYRadio = $propPanel.find('input[type=radio][name=scrlY]')
    $scrlYRadio.change(function() {
      let val = $(this).prop('value')
      that.update({scrlY: val})
    })

    let $familySelect = $propPanel.find('select[name=family]')
    $familySelect.change(function() {
      let val= $(this).prop('value')
      that.update({family: val})
      that.updatePreviewStyle($(this))
    })

    let $colorInput = $propPanel.find('input[type=text][name=color]')
    $colorInput.change(function() {
      let val = $(this).val()
      that.update({color: val})
      that.updatePreviewStyle($(this))
    })
    let $bgColorInput = $propPanel.find('input[type=text][name=bgColor]')
    $bgColorInput.change(function() {
      let val = $(this).val()
      that.update({bgColor: val})
      that.updatePreviewStyle($(this))
    })
    let $fSizeInput = $propPanel.find('input[type=text][name=fSize]')
    $fSizeInput.keyup(function() {
      let val = $(this).val()
      that.update({fSize: val})
      that.updatePreviewStyle($(this))
    })
    let $lHeightInput = $propPanel.find('input[type=text][name=lHeight]')
    $lHeightInput.keyup(function() {
      let val = $(this).val()
      that.update({lHeight: val})
      that.updatePreviewStyle($(this))
    })
    let $spacingInput = $propPanel.find('input[type=text][name=spacing]')
    $spacingInput.keyup(function() {
      let val = $(this).val()
      that.update({spacing: val})
      that.updatePreviewStyle($(this))
    })
    let $indentInput = $propPanel.find('input[type=text][name=indent]')
    $indentInput.keyup(function() {
      let val = $(this).val()
      that.update({indent: val})
      that.updatePreviewStyle($(this))
    })
    let $contentTextarea = $propPanel.find('textarea[name=content]')
    $contentTextarea.keyup(function() {
      let val = $(this).val()
      that.update({content: val})
    })

    let $hoverModeRadio = $propPanel.find('input[type=radio][name=hoverMode]')
    $hoverModeRadio.change(function() {
      let val = $(this).prop('value')
      that.update({hoverMode: val})
    })
    let $mfamilySelect = $propPanel.find('select[name=mfamily]')
    $mfamilySelect.change(function() {
      let val = $(this).prop('value')
      that.update({mfamily: val})
    })

    let $mcolorInput = $propPanel.find('input[type=text][name=mcolor]')
    $mcolorInput.change(function() {
      let val = $(this).val()
      that.update({mcolor: val})
      that.updatePreviewStyle($(this))
    })
    let $mbgColorInput = $propPanel.find('input[type=text][name=mbgColor]')
    $mbgColorInput.change(function() {
      let val = $(this).val()
      that.update({mbgColor: val})
      that.updatePreviewStyle($(this))
    })
    let $mfSizeInput = $propPanel.find('input[type=text][name=mfSize]')
    $mfSizeInput.keyup(function() {
      let val = $(this).val()
      that.update({mfSize: val})
      that.updatePreviewStyle($(this))
    })
    let $mlHeightInput = $propPanel.find('input[type=text][name=mlHeight]')
    $mlHeightInput.keyup(function() {
      let val = $(this).val()
      that.update({mlHeight: val})
      that.updatePreviewStyle($(this))
    })
    let $mspacingInput = $propPanel.find('input[type=text][name=mspacing]')
    $mspacingInput.keyup(function() {
      let val = $(this).val()
      that.update({mspacing: val})
      that.updatePreviewStyle($(this))
    })
    let $mindentInput = $propPanel.find('input[type=text][name=mindent]')
    $mindentInput.keyup(function() {
      let val = $(this).val()
      that.update({mindent: val})
      that.updatePreviewStyle($(this))
    })
    let $mcontentTextarea = $propPanel.find('textarea[name=mcontent]')
    $mcontentTextarea.keyup(function() {
      let val = $(this).val()
      that.update({mcontent: val})
    })


    //以下是动画
    let $mTsDurInput = $propPanel.find('input[type=text][name=mTsDur]')
    $mTsDurInput.keyup(function() {
      let val = $(this).val()
      that.update({mTsDur: val})
    })
    let $mTsFunRadio = $propPanel.find('input[type=radio][name=mTsFun]')
    $mTsFunRadio.change(function() {
      let val = $(this).prop('value')
      that.update({mTsFun: val})
    })
    let $mTsAntRadio = $propPanel.find('input[type=radio][name=mTsAnt]')
    $mTsAntRadio.change(function() {
      let val = $(this).prop('value')
      that.update({mTsAnt: val})
    })



    //正反  文字对齐 事件
    let $alignRadio = $propPanel.find('.font-setting .font-item-radio')
    $alignRadio.click(function() {
      let val = $(this).attr('data-val')
      let $alignParent=$(this).parent()
      let isOff= $alignParent.hasClass("font-f")  ? true :false
      if(isOff){
        that.update({malign: val})
      }else{
        that.update({align: val})
      }
      $alignParent.find('.font-item-radio').removeClass("active")
      $(this).addClass("active")
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
            that.update({weight: ''})
            $elemInput.val("")
            break;
          case 'fstyle':
            that.update({fStyle: 'normal'})
            $elemInput.val("normal")
            break;
          case 'oline':
            that.update({oLine: ''})
            $elemInput.val("")
            break;
          case 'through':
            that.update({through: ''})
            $elemInput.val("")
            break;
          case 'uline':
            that.update({uLine: ''})
            $elemInput.val("")
            break;
        }
      }else{
        $(this).addClass("active")
        switch($attrName) {
          case 'weight':
            that.update({weight: '600'})
            $elemInput.val("600")
            break;
          case 'fstyle':
            that.update({fStyle: 'italic'})
            $elemInput.val("italic")
            break;
          case 'oline':
            that.update({oLine: 'overline'})
            $elemInput.val("overline")
            break;
          case 'through':
            that.update({through: 'line-through'})
            $elemInput.val("line-through")
            break;
          case 'uline':
            that.update({uLine: 'underline'})
            $elemInput.val("underline")
            break;
        }
      }
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
            that.update({mweight: ''})
            $elemInput.val("")
            break;
          case 'mfstyle':
            that.update({mfStyle: 'normal'})
            $elemInput.val("normal")
            break;
          case 'moLine':
            that.update({moLine: ''})
            $elemInput.val("")
            break;
          case 'mthrough':
            that.update({mthrough: ''})
            $elemInput.val("")
            break;
          case 'muLine':
            that.update({muLine: ''})
            $elemInput.val("")
            break;
        }
      }else{
        $(this).addClass("active")
        switch($attrName) {
          case 'mweight':
            that.update({mweight: '600'})
            $elemInput.val("600")
            break;
          case 'mfstyle':
            that.update({mfStyle: 'italic'})
            $elemInput.val("italic")
            break;
          case 'moline':
            that.update({moLine: 'overline'})
            $elemInput.val("overline")
            break;
          case 'mthrough':
            that.update({mthrough: 'line-through'})
            $elemInput.val("line-through")
            break;
          case 'muline':
            that.update({muLine: 'underline'})
            $elemInput.val("underline")
            break;
        }
      }
      that.updatePreviewStyle($(this))
    })

    //边框初始化
    initPorpBorder($propPanel,that)


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
        setFontOption($layerElem.find('.font-select'))

        $layerElem.find('.cancel-btn').on('click', function() {
          layer.close(index)
        })
        editPopHtmlBorder($layerElem.find('.pop-item-border'))
        editPopHtmlShadow($layerElem.find('.pop-item-shadow'))

        $layerElem.find(".sp-preview-inner").css("background-color",'')
        //边框
        setPopHtmlBorder($layerElem,that)
        setPopHtmlShadow($layerElem,that)

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

      },
      content: `<form class="layui-form" lay-filter="textComponentForm">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li class="layui-this">默认设置</li>
            <li>鼠标经过</li>
            <li>边框设置</li>
            <li>阴影外框</li>
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
                      <select class="font-select"   name="family" >
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
                <label class="layui-form-label">超出滚动条</label>
                <div class="layui-input-inline">
                  <input type="radio" name="scrlY" lay-filter="scrlY" value="on" title="显示" >
                  <input type="radio" name="scrlY" lay-filter="scrlY" value="off" title="隐藏">
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">背景图片</label>
                <div class="layui-input-inline">
                  <input name="bgImg" type="text" class="layui-input">
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
                      <select class="font-select"   name="mfamily" >
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
            <div  class="layui-tab-item pop-item-border">

            </div>
            <div class="layui-tab-item pop-item-shadow">

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
 
  doUpdate(formData) {
    let that = this
    let bRadius=this.formData.bRadius;

    updateShadow(this.$content,formData)
    //处理边框
    updateBorder(this.$content,formData)

    let deline=this.formData.uLine;
    if(this.formData.oLine){
      deline+=' '+this.formData.oLine
    }
    if(this.formData.through){
      deline+=' '+this.formData.through
    }
    if(deline ==="") deline='none'
    let $defPanel=this.$contentBox.find(".on")
    let bgColor,bgImg,bgRep,bgPos,bgCss
    bgImg=this.formData.bgImg
    bgColor=this.formData.bgColor
    bgRep=this.formData.bgRep
    bgPos=this.formData.bgPos
    bgCss=bgImage(bgImg,bgColor,bgRep,bgPos,'')
    $defPanel.css('background', bgCss)
    $defPanel.css("font-family",this.formData.family)
    $defPanel.css('color', this.formData.color)
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
      let mbgColor,mbgImg,mbgRep,mbgPos,mbgCss
      mbgImg=this.formData.mbgImg
      mbgColor=this.formData.mbgColor
      mbgRep=this.formData.mbgRep
      mbgPos=this.formData.mbgPos
      mbgCss=bgImage(mbgImg,mbgColor,mbgRep,mbgPos,'')

      $offPanel=this.$contentBox.find(".off")
      $offPanel.text(formData.mcontent)
      $offPanel.css('background', mbgCss)
      $offPanel.css("font-family",this.formData.mfamily)
      $offPanel.css('color', this.formData.mcolor)
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



  }
  update(formData) {
    let newFormData = JSON.parse(JSON.stringify(this.formData));
    for (let k in formData) {
      newFormData[k] = formData[k];
    }
    if (!compareForm(newFormData, this.formData)) {
      let updateFormAction = new UpdateFormAction(this);
      updateFormAction.setOldFormData(this.formData);
      updateFormAction.setNewFormData(newFormData);
      this.stage.actionManager.execute(updateFormAction)
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
    let $scrlYRadio = $propPanel.find('input[type=radio][name=scrlY]')
    $scrlYRadio.filter(`[value="${this.formData.scrlY}"]`).prop('checked', true)

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


