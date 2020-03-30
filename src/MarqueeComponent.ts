import Component from './Component';
import { setFontOption } from './common';
import {bgImage,valInt,valEmpty,textLine,conModeChanged} from './commonCss'
 

export default class TextComponent extends Component {
　$content: JQuery
  constructor() {
    super('marquee-component', {  isEditPopup: false})
    let content = `
    <marquee style="width:100%;height:100%;overflow:hidden;" scrollamount="4" scrolldelay="0" direction="right" behavior="slide"></marquee>
      `
    this.$contentBox.append(content)
    this.$content = this.$contentBox.find('marquee')
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

    this.formData.bgImg = 'http://image.suning.cn/uimg/sop/commodity/192796024482525085891100_x.jpg'

    this.formData.dirtPos = 'left'
    this.formData.behavior = 'scroll'
    this.formData.dirt = 'left'
    this.formData.amount = 5
    this.formData.scjl = 0
    
     
    this.formData.conMode ='txt' //  txt 文字  img 图片
 
    this.update(this.formData)

  }
  getProps() {
    let config = this.formData;
    config.appID = `${this.stage.id}-${this.id}`
    return {
      'appType': 'xgdb',
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
    let top, left, width, height,hrefMode,href,conMode,$scbox,scrollw,scrollh,whStyle
    let htmlList=[]
   
    top = this.$el.css('top')
    left = this.$el.css('left')
    width = this.$el.width()
    height = this.$el.height()

    //滚动信息
    let amount,delay,dirt,behavior,wzStyle,scjl,sccs
    amount=valEmpty(this.formData.amount) !="" ? ' scrollamount="'+this.formData.amount+'"' :''
    delay=valEmpty(this.formData.delay) !="" ? ' scrolldelay="'+this.formData.delay+'"' :''
    dirt=this.formData.dirt
    behavior=this.formData.behavior
    scjl=valInt(this.formData.scjl) !="" ? valInt(this.formData.scjl) : 0
    
    conMode=valEmpty(this.formData.conMode)


     $scbox=this.$contentBox.find('.sc-box')
    if(conMode ==="img")
       $scbox=this.$contentBox.find('.sc-box img')

    scrollw=$scbox.width()
    scrollh=$scbox.height()
    whStyle=''
    sccs='rel'
    if(scjl !=""){
      if(dirt==='left' || dirt==='right'){
        scrollw=scrollw+scjl
        //whStyle+='margin-right:'+scjl+'px;'
      }else if(dirt==='up' || dirt==='down'){
        scrollh=scrollh+scjl
        sccs='abs'
        //whStyle+='margin-bottom:'+scjl+'px;'
      }

    }
    whStyle+='width:'+scrollw+'px; height:'+scrollh+'px;'  
    wzStyle='white-space:nowrap;word-break:break-all;'

 
 
    href=valEmpty(this.formData.href) !="" ?  ' href="'+this.formData.href+'"':''
    hrefMode=valEmpty(this.formData.hrefMode) ==="_blank" ?  ' target="'+this.formData.hrefMode+'"':''

  
    let family, fSize, color, bgColor,lHeight,spacing,indent,weight,fStyle,oLine,through,uLine,align,content,bgImg,onBgStyle,onlineStyle
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
 
    
    onBgStyle=bgColor !="" ?  'background-color:'+bgColor+';' : ''

    oLine=valEmpty(this.formData.oLine)
    through=valEmpty(this.formData.through)
    uLine=valEmpty(this.formData.uLine) 
    onlineStyle=textLine(oLine,through,uLine) //处理线
    onlineStyle=onlineStyle !="" ?  'text-decoration:'+onlineStyle+';' : ''

    let htmlLink=''
    let fm1=0
    let fm2=0
    let fm1Style=''
    let fm2Style=''
    let fm3Style=''
    if(dirt==='left'){
      fm1=scrollw
      fm2=scrollh*2
      fm1Style='right:'+fm1+'px;'
      fm2Style='top:-'+scrollh+'px;'
      fm3Style='left:'+fm1+'px;top:-'+fm2+'px;'
    }else if(dirt==='up' || dirt==='down'){
      fm1=scrollh
      fm2=scrollh*3 
      fm1Style='top:-'+fm1+'px;background-color:red;'
      fm2Style='top:0px;background-color: green;'
      fm3Style='top:'+fm1+'px;background-color: #000;'
    }
    if(conMode==='txt'){
      
      if(dirt==='left' || dirt==='up'){
        htmlLink='<div class="rel"  style="'+fm1Style+whStyle+wzStyle+onBgStyle+onlineStyle+family+fSize+color+lHeight+spacing+indent+weight+align+fStyle+'" >'+content+'</div>'
        htmlLink+='<div  class="rel"  style="'+fm2Style+whStyle+wzStyle+onBgStyle+onlineStyle+family+fSize+color+lHeight+spacing+indent+weight+align+fStyle+'" >'+content+'</div>'
        htmlLink+='<div  class="rel"  style="'+fm3Style+whStyle+wzStyle+onBgStyle+onlineStyle+family+fSize+color+lHeight+spacing+indent+weight+align+fStyle+'" >'+content+'</div>'
      }
    }else{
      if(dirt==='left' || dirt==='up' || dirt==='down'){
        let bgImg=valEmpty(this.formData.bgImg) 
        let imgHtml= bgImg !="" ? '<img  src="'+bgImg+'" />': ''
        htmlLink='<div class="'+sccs+'" style="'+fm1Style+whStyle+'">'+imgHtml+'</div>'
        htmlLink+='<div class="'+sccs+'" style="'+fm2Style+whStyle+'">'+imgHtml+'</div>' 
        htmlLink+='<div class="'+sccs+'" style="'+fm3Style+whStyle+'">'+imgHtml+'</div>'
      }
    }
    if(href !=""){
      htmlLink='<a '+href+hrefMode+'  >'+htmlLink+'</a>'
    }


    htmlLink='<marquee class="rel" onmouseover=this.stop() onmouseout=this.start()  style="width:100%;height:100%;overflow:hidden;" '+amount+delay+' direction="'+dirt+'" behavior="'+behavior+'">'+htmlLink+'</marquee>'

    return '<div class="abs" style="top: '+top+'; left:'+left+'; width:'+width+'px; height:'+height+'px;" >'+htmlLink+'</div>'
 
  
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
    let $propPanel = $('.marquee-com-prop-panel')
    this.$propPanel = $propPanel
    $propPanel.show()
    $propPanel.find('*').off()

    setFontOption($propPanel.find('.font-select'))
 
    this.updatePropPanel();
    //收缩 重新加载
    let element = layui.element
    element.render("collapse")
    //滚动属性
    let $dirtSelect = $propPanel.find('select[name=dirt]')
    $dirtSelect.change(function() {
      that.formData.dirt = $(this).prop('value')
      that.update(that.formData)
    })
    let $behaviorSelect = $propPanel.find('select[name=behavior]')
    $behaviorSelect.change(function() {
      that.formData.behavior = $(this).prop('value')
      that.update(that.formData)
    })
    let $amountInput = $propPanel.find('input[type=text][name=amount]')
    $amountInput.keyup(function() {
      let val = $(this).val()
      that.formData.amount = val
      that.update(that.formData)
    })
    let $delayInput = $propPanel.find('input[type=text][name=delay]')
    $delayInput.keyup(function() {
      let val = $(this).val()
      that.formData.delay = val
      that.update(that.formData)
    })
    let $scjlInput = $propPanel.find('input[type=text][name=scjl]')
    $scjlInput.keyup(function() {
      let val = $(this).val()
      that.formData.scjl = val
    })


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
    $fSizeInput.keyup(function() {
      let val = $(this).val()
      that.formData.fSize = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $lHeightInput = $propPanel.find('input[type=text][name=lHeight]')
    $lHeightInput.keyup(function() {
      let val = $(this).val()
      that.formData.lHeight = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $spacingInput = $propPanel.find('input[type=text][name=spacing]')
    $spacingInput.keyup(function() {
      let val = $(this).val()
      that.formData.spacing = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $indentInput = $propPanel.find('input[type=text][name=indent]')
    $indentInput.keyup(function() {
      let val = $(this).val()
      that.formData.indent = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $contentTextarea = $propPanel.find('textarea[name=content]')
    $contentTextarea.keyup(function() {
      let val = $(this).val()
      that.formData.content = val
      that.update(that.formData)
    })

    let $conModeRadio = $propPanel.find('input[type=radio][name=conMode]')
    $conModeRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.conMode = val
      that.update(that.formData)
      conModeChanged($propPanel, val)
    })
     let $bgImgInput = $propPanel.find('input[type=text][name=bgImg]')
    $bgImgInput.keyup(function() {
      let val = $(this).val()
      that.formData.bgImg = val
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
      title: '滚动文子/图片设置',
      skin: 'layui-layer-rim', //加上边框
      area: ['600px', '600px'],
      success: function(layerElem, index) {
        $layerElem = $(layerElem)
        setFontOption($layerElem.find('.font-select'))

        $layerElem.find('.cancel-btn').on('click', function() {
          layer.close(index)
        })
 
        $layerElem.find(".sp-preview-inner").css("background-color",'')
 

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
     
 

        $layerElem.find('.font-setting .font-item-checkbox').on('click', function() {
           that.getFontActive($(this));
        })

        $layerElem.find('.font-setting .font-item-radio').on('click', function() {
          let $objElem=$(this)
          $objElem.parent().find('.font-item-radio').removeClass("active")
          $objElem.addClass("active")
        })
        conModeChanged($layerElem, that.formData.conMode)

    
        
      },
      content: `<form class="layui-form" lay-filter="marqueeComponentForm">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li class="layui-this">默认设置</li>
            <li>滚动动画</li>
          </ul>
          <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
              <div class="layui-form-item">
                <label class="layui-form-label">应用名称</label>
                <div class="layui-input-inline"><input type="text" name="appLabel" class="layui-input"></div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">内容设置</label>
                <div class="layui-input-inline">
                  <input type="radio" name="conMode" lay-filter="conMode" value="txt" title="文字" >
                  <input type="radio" name="conMode" lay-filter="conMode" value="img" title="图片">
                </div>
              </div>
              <div class="layui-form-item txt-box">
                <label class="layui-form-label">文字内容</label>
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
              <div class="layui-form-item img-box">
                <label class="layui-form-label">图片地址</label>
                <div class="layui-input-inline">
                  <input name="bgImg" type="text" class="layui-input">
                </div>
              </div>
              <div class="layui-form-item ">
                <label class="layui-form-label">链接地址</label>
                <div class="layui-input-inline"><input type="text" name="href" class="layui-input"></div>
                <div><input name="hrefMode" value="_blank" type="checkbox" lay-skin="primary" title="新窗口打开"></div>
              </div>

       

            </div>
            <div class="layui-tab-item">
              <div class="layui-form-item">
                <label class="layui-form-label">滚动方式</label>
                <div class="layui-input-inline">
                  <select   name="behavior" >
                    <option value="scroll" selected="selected">循环滚动</option>
                    <option value="slide">单次滚动</option>
                    <option value="alternate">来回滚动</option>
                 </select>
                </div>
              </div>

              <div class="layui-form-item">
                <label class="layui-form-label">滚动方向</label>
                <div class="layui-input-inline">
                  <select   name="dirt" >
                    <option value="left" selected="selected">从右至左</option>
                    <option value="right">从左至右</option>
                    <option value="down">从上至下</option>
                    <option value="up">从下至上</option>
                 </select>
                </div>
              </div>
              <div class="layui-form-item ">
                <label class="layui-form-label">滚动速度</label>
                <div class="layui-input-inline"><input type="text" name="amount" class="layui-input"></div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">起始位置</label>
                <div class="layui-input-inline">
                  <input type="radio" name="dirtPos" lay-filter="dirtPos" value="left" title="左侧" >
                  <input type="radio" name="dirtPos" lay-filter="dirtPos" value="right" title="右侧">
                </div>
              </div>


            </div>
 
 
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-ft-btn">
            <button class="layui-btn" lay-submit lay-filter="marqueeComponentForm">确定</button> 
            <button type="button" class="cancel-btn layui-btn layui-btn-primary">取消</button>
          </div>
        </div>
      </form>`
    });
    var form = layui.form
    form.render();
    form.on('radio(conMode)', function(data){
      console.log(data)
      conModeChanged($layerElem, data.value)
    })

    form.on('submit(marqueeComponentForm)', function(data) {
      that.formData = data.field;
      that.formData.align = $layerElem.find('.font-z .font-item-radio.active').data('val')
      that.formData.malign = $layerElem.find('.font-f .font-item-radio.active').data('val')

      that.update(that.formData)
      that.updatePropPanel()

      layer.close(layerNo)
      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    form.val('marqueeComponentForm', that.formData)
  }
  update(formData) {
    let that = this
    const amount=this.formData.amount;
    const dirt=this.formData.dirt
    this.$content.attr("scrollamount",amount)
    this.$content.attr("scrolldelay",this.formData.delay)
    this.$content.attr("behavior",this.formData.behavior)
    this.$content.attr("direction",this.formData.dirt)

    
    let conMode=this.formData.conMode;
    let $defPanel=that.$contentBox.find(".sc-text")
    let $imgPanel=that.$contentBox.find(".sc-img")
    if(conMode==='txt'){
      let deline=this.formData.uLine;
      if(this.formData.oLine){
        deline+=' '+this.formData.oLine
      }
      if(this.formData.through){
        deline+=' '+this.formData.through
      }
      if(deline ==="") deline='none'

      
      if($defPanel.length <=0){
        that.$content.append("<div class='sc-text sc-box'></div>")
        $defPanel=that.$contentBox.find(".sc-text")
      }
      $defPanel.css('background-color', this.formData.bgColor)
      $defPanel.css("font-family",this.formData.family)
      $defPanel.css('color', this.formData.color)
      $defPanel.css('font-size', parseInt(this.formData.fSize))
      $defPanel.css('line-height', this.formData.lHeight+'px')
      $defPanel.css('letter-spacing', parseInt(this.formData.spacing))
      $defPanel.css('text-indent', parseInt(this.formData.indent))
          
      $defPanel.css('display', 'inline-block')
      $defPanel.css('text-align', this.formData.align)
      $defPanel.css("font-weight",this.formData.weight)
      $defPanel.css("font-style",this.formData.fStyle)
      $defPanel.css("text-decoration",deline)
      $defPanel.text(formData.content)
      $imgPanel.remove()
    }else if(conMode==='img'){
      $defPanel.remove()
      if($imgPanel.length <=0)
        that.$content.append('<div class="sc-img sc-box"  ><img src="'+this.formData.bgImg+'"  style="display: block;float: left;"/></div>')
      $imgPanel=that.$contentBox.find(".sc-img img")
      $imgPanel.attr("src",this.formData.bgImg)
  
    }
  
  }
  updatePropPanel(){
    let that = this
    let $propPanel = this.$propPanel

    let $dirtSelect = $propPanel.find('select[name=dirt]')
    $dirtSelect.val(this.formData.dirt)
    let $behaviorSelect = $propPanel.find('select[name=behavior]')
    $behaviorSelect.val(this.formData.behavior)
    let $amountInput = $propPanel.find('input[type=text][name=amount]')
    $amountInput.val(this.formData.amount)
    let $delaytInput = $propPanel.find('input[type=text][name=delay]')
    $delaytInput.val(this.formData.delay)
    let $scjlInput = $propPanel.find('input[type=text][name=scjl]')
    $scjlInput.val(this.formData.scjl)

    let $conModeRadio = $propPanel.find('input[type=radio][name=conMode]')
    $conModeRadio.filter(`[value="${this.formData.conMode}"]`).prop('checked', true)
    conModeChanged($propPanel, this.formData.conMode)

    let $bgImgInput = $propPanel.find('input[type=text][name=bgImg]')
    $bgImgInput.val(this.formData.bgImg)

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

   

    $propPanel.find(`.font-z .font-item-radio[data-val="${that.formData.align}"]`).addClass('active')
  

 
  
 
 
  }
}


