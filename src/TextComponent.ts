import Component from './Component';
export default class TextComponent extends Component {
　$content: JQuery
  constructor() {
    super('text-component')
    let content = `
      <a class="ant-text"   antTrans=""  antBc=""><div class="on">请设置文本内容</div></a>
      `
    this.$contentBox.append(content)
    this.$content = this.$contentBox.find('.ant-text')
    this.initFormData() 
  }
  initFormData() {
    this.formData.appLabel = ''

    this.formData.fFamily = 'arial' //字体
    this.formData.fontSize = 12
    this.formData.color = '#000'
    this.formData.bgColor = '#fff'
    this.formData.lineHg =''  //行距
    this.formData.spacing =''  //letterSpacing // 字  距
    this.formData.indent =''  //textIndent 缩进
    
    this.formData.weight = 600 //加粗
    this.formData.fontStyle = 'normal' //斜体
    this.formData.oLine = '' //文字上边线 overline
    this.formData.lThrough = '' //文字中间线 line-through  
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
 

    this.formData.ffFamily = 'arial' //字体
    this.formData.ffontSize = 12
    this.formData.fcolor = '#fff'
    this.formData.fbgColor = '#000'
    this.formData.flineHg =''  //行距
    this.formData.fspacing =''  //letterSpacing // 字  距
    this.formData.findent =''  //textIndent 缩进
    
    this.formData.fweight = 600 //加粗
    this.formData.ffontStyle = 'normal' //斜体
    this.formData.foLine = '' //文字上边线 overline
    this.formData.flThrough = '' //文字中间线 line-through  
    this.formData.fuLine = '' //文字下边线 underline 
    this.formData.falign = 'left' //对齐
    this.formData.fContent = '' //反面内容

    this.formData.fbgImg = '//sc01.alicdn.com/kf/HTB1gXlQXDjxK1Rjy0Fnq6yBaFXao.jpg'
    this.formData.fbgRep =''  //背景平铺方式
    this.formData.fbgPos ='' //背景对齐位置
    this.formData.antTsDur ='0.4'   //动画时长                      
    this.formData.antTsFun ='ease'  //速度曲线
    this.formData.antTrans ='atrans5'  //动画效果

    this.formData.borderT ='show'
    this.formData.borderB ='show' 
    this.formData.borderL ='show' 
    this.formData.borderR ='show' 

    this.formData.borderWidth =5  
    this.formData.borderColor ='#FFFF00'  
    this.formData.borderStyle ='solid'  
    this.formData.antTsDurB ='0.2'  
    this.formData.antTsFunB ='ease-out'  
    this.formData.antBcolor ='#00FFFF' 
    this.formData.antBc ='bdtx1'   
 
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
  //弹出来同步
  onTongBu($layerElem) {
    let $fFamilySelect = $layerElem.find('select[name=fFamily] option:selected')
    let $fFamilyVal=$fFamilySelect.val()
    $layerElem.find('select[name=ffFamily] option[value='+$fFamilyVal+']').attr("selected",true);

  
    let $colorInput = $layerElem.find('input[type=text][name=color]')
    let $fcolorInput = $layerElem.find('input[type=text][name=fcolor]')
    $fcolorInput.val($colorInput.val())
    $fcolorInput.prev().find(".sp-preview-inner").css("background-color",$colorInput.val())
    
    let $bgColorInput = $layerElem.find('input[type=text][name=bgColor]')
    let $fbgColorInput = $layerElem.find('input[type=text][name=fbgColor]')
    $fbgColorInput.val($bgColorInput.val())
    $fbgColorInput.prev().find(".sp-preview-inner").css("background-color",$bgColorInput.val())

    let $fontSizeInput = $layerElem.find('input[type=text][name=fontSize]')
    let $ffontSizeInput = $layerElem.find('input[type=text][name=ffontSize]')
    $ffontSizeInput.val($fontSizeInput.val())

    let $lineHgInput = $layerElem.find('input[type=text][name=lineHg]')
    let $flineHgInput = $layerElem.find('input[type=text][name=flineHg]')
    $flineHgInput.val($lineHgInput.val())

    let $spacingInput = $layerElem.find('input[type=text][name=spacing]')
    let $fspacingInput = $layerElem.find('input[type=text][name=fspacing]')
    $fspacingInput.val($spacingInput.val())

    let $indentInput = $layerElem.find('input[type=text][name=indent]')
    let $findentInput = $layerElem.find('input[type=text][name=findent]')
    $findentInput.val($indentInput.val())
    
    //对齐
    let $alignRadioActive = $layerElem.find('.font-z .font-item-radio.active')
    let $falignRadio = $layerElem.find('.font-f .font-item-radio')
    let $alingVal=$alignRadioActive.attr('data-val')
    $falignRadio.removeClass("active")
    $layerElem.find('.font-f .font-item-radio[data-val='+$alingVal+']').addClass('active')
   

    let $weightInput = $layerElem.find('.font-z input[type=hidden][name=weight]')
    let $fweightInput = $layerElem.find('.font-f input[type=hidden][name=fweight]')
    if($weightInput.val()=="600"){
      $fweightInput.val("600")
      $fweightInput.parent().addClass("active")
    }else{
      $fweightInput.val("")
      $fweightInput.parent().removeClass("active")
    }
    let $fontStyleInput = $layerElem.find('.font-z input[type=hidden][name=fontStyle]')
    let $ffontStyleInput = $layerElem.find('.font-f input[type=hidden][name=ffontStyle]')
    if($fontStyleInput.val()=="italic"){
      $ffontStyleInput.val('italic')
      $ffontStyleInput.parent().addClass("active")
    }else{
      $ffontStyleInput.val("normal")
      $ffontStyleInput.parent().removeClass("active")
    }
    let $oLineInput = $layerElem.find('.font-z input[type=hidden][name=oLine]')
    let $foLineInput = $layerElem.find('.font-f input[type=hidden][name=foLine]')
    if($oLineInput.val()=="overline"){
      $foLineInput.val('overline')
      $foLineInput.parent().addClass("active")
    }else{
      $foLineInput.val("")
      $foLineInput.parent().removeClass("active")
    }
    let $lThroughInput = $layerElem.find('.font-z input[type=hidden][name=lThrough]')
    let $flThroughInput= $layerElem.find('.font-f input[type=hidden][name=flThrough]')
    if($lThroughInput.val()=="line-through"){
      $flThroughInput.val('line-through')
      $flThroughInput.parent().addClass("active")
    }else{
      $flThroughInput.val("")
      $flThroughInput.parent().removeClass("active")
    }
    let $uLineInput = $layerElem.find('.font-z input[type=hidden][name=uLine]')
    let $fuLineInput = $layerElem.find('.font-f input[type=hidden][name=fuLine]')
    if($uLineInput.val()=="underline"){
      $fuLineInput.val('underline')
      $fuLineInput.parent().addClass("active")
    }else{
      $fuLineInput.val("")
      $fuLineInput.parent().removeClass("active")
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
        let deline=this.formData.fuLine
        if(this.formData.foLine){
          deline+=' '+this.formData.foLine
        }else{
          if(this.formData.flThrough){
            deline+=' '+this.formData.flThrough
          }
          if(deline ==="") deline='none'

          $defElem.css("font-family",this.formData.ffFamily)
          $defElem.css('color', this.formData.fcolor)
          $defElem.css('background-color', this.formData.fbgColor)
          $defElem.css('font-size', parseInt(this.formData.ffontSize))
          $defElem.css('line-height', this.formData.flineHg+'px')
          $defElem.css('letter-spacing', parseInt(this.formData.fspacing))
          $defElem.css('text-indent', parseInt(this.formData.findent))
       
          $defElem.css('text-align', this.formData.falign)
          $defElem.css("font-weight",this.formData.fweight)
          $defElem.css("font-style",this.formData.ffontStyle)
          $defElem.css("text-decoration",deline)
        }
      }else{
        let deline=this.formData.uLine
        if(this.formData.oLine){
          deline+=' '+this.formData.oLine
        }else{
          if(this.formData.lThrough){
            deline+=' '+this.formData.lThrough
          }
          if(deline ==="") deline='none'

          $defElem.css("font-family",this.formData.fFamily)
          $defElem.css('color', this.formData.color)
          $defElem.css('background-color', this.formData.bgColor)
          $defElem.css('font-size', parseInt(this.formData.fontSize))
          $defElem.css('line-height', this.formData.lineHg+'px')
          $defElem.css('letter-spacing', parseInt(this.formData.spacing))
          $defElem.css('text-indent', parseInt(this.formData.indent))
       
          $defElem.css('text-align', this.formData.align)
          $defElem.css("font-weight",this.formData.weight)
          $defElem.css("font-style",this.formData.fontStyle)
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
        case 'fontstyle':
          $elemInput.val('normal')
          break;
        case 'oline':
          $elemInput.val('')
          break;
        case 'lthrough':
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
        case 'fontstyle':
          $elemInput.val('italic')
          break;
        case 'oline':
          $elemInput.val('overline')
          break;
        case 'lthrough':
          $elemInput.val('line-through')
          break;
        case 'uline':
          $elemInput.val('underline')
          break;
      } 
    }
  }


  initPorpPanel() { 
    console.log('initPorpPanel')
    let that = this
    
    $('.prop-setting-ct > div').hide()
    let $propPanel = $('.text-com-prop-panel')
    this.$propPanel = $propPanel
    $propPanel.show()
    $propPanel.find('*').off()
    this.updatePropPanel();
    //收缩 重新加载
    let element = layui.element
    element.render("collapse")

    let $fFamilySelect = $propPanel.find('select[name=fFamily]')
    $fFamilySelect.change(function() {
      that.formData.fFamily = $(this).prop('value')
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
    let $fontSizeInput = $propPanel.find('input[type=text][name=fontSize]') 
    $fontSizeInput.change(function() {
      let val = $(this).val()
      that.formData.fontSize = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $lineHgInput = $propPanel.find('input[type=text][name=lineHg]') 
    $lineHgInput.change(function() {
      let val = $(this).val()
      that.formData.lineHg = val
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

    let $hrefModeCheckBox = $propPanel.find('input[type=checkbox][name=hrefMode]')
    $hrefModeCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.hrefMode = val ? '_blank' : ''
    })

    let $hoverModeRadio = $propPanel.find('input[type=radio][name=hoverMode]')
    $hoverModeRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.hoverMode = val
      that.update(that.formData)
    })
    let $ffFamilySelect = $propPanel.find('select[name=ffFamily]')
    $ffFamilySelect.change(function() {
      that.formData.ffFamily = $(this).prop('value')
      that.update(that.formData)
      
       
    })

    let $fcolorInput = $propPanel.find('input[type=text][name=fcolor]') 
    $fcolorInput.change(function() {
      let val = $(this).val()
      that.formData.fcolor = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $fbgColorInput = $propPanel.find('input[type=text][name=fbgColor]') 
    $fbgColorInput.change(function() {
      let val = $(this).val()
      that.formData.fbgColor = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $ffontSizeInput = $propPanel.find('input[type=text][name=ffontSize]') 
    $ffontSizeInput.change(function() {
      let val = $(this).val()
      that.formData.ffontSize = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $flineHgInput = $propPanel.find('input[type=text][name=flineHg]') 
    $flineHgInput.change(function() {
      let val = $(this).val()
      that.formData.flineHg = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $fspacingInput = $propPanel.find('input[type=text][name=fspacing]') 
    $fspacingInput.change(function() {
      let val = $(this).val()
      that.formData.fspacing = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $findentInput = $propPanel.find('input[type=text][name=findent]') 
    $findentInput.change(function() {
      let val = $(this).val()
      that.formData.findent = val
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    let $fcontentTextarea = $propPanel.find('textarea[name=fcontent]') 
    $fcontentTextarea.change(function() {
      let val = $(this).val()
      that.formData.fcontent = val
      that.update(that.formData)
    })
    //以下是动画
    let $antTsDurInput = $propPanel.find('input[type=text][name=antTsDur]') 
    $antTsDurInput.change(function() {
      let val = $(this).val()
      that.formData.antTsDur = val
      that.update(that.formData)
    })
    let $antTsFunRadio = $propPanel.find('input[type=radio][name=antTsFun]')
    $antTsFunRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.antTsFun = val
      that.update(that.formData)
    })
    let $antTransRadio = $propPanel.find('input[type=radio][name=antTrans]')
    $antTransRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.antTrans = val
      that.update(that.formData)
    })
    // 以下是边框 
    let $borderTCheckBox = $propPanel.find('input[type=checkbox][name=borderT]')
    $borderTCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.borderT = val ? 'show' : ''
      that.update(that.formData)
    })
    let $borderBCheckBox = $propPanel.find('input[type=checkbox][name=borderB]')
    $borderBCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.borderB = val ? 'show' : ''
      that.update(that.formData)
    })
    let $borderLCheckBox = $propPanel.find('input[type=checkbox][name=borderL]')
    $borderLCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.borderL = val ? 'show' : ''
      that.update(that.formData)
    })
    let $borderRCheckBox = $propPanel.find('input[type=checkbox][name=borderR]')
    $borderRCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.borderR = val ? 'show' : ''
      that.update(that.formData)
    })

    let $borderWidthInput = $propPanel.find('input[type=text][name=borderWidth]') 
    $borderWidthInput.change(function() {
      let val = $(this).val()
      that.formData.borderWidth = val
      that.update(that.formData)
    })
    let $borderColorInput = $propPanel.find('input[type=text][name=borderColor]') 
    $borderColorInput.change(function() {
      let val = $(this).val()
      that.formData.borderColor = val
      that.update(that.formData)
    })
    let $borderStyleRadio = $propPanel.find('input[type=radio][name=borderStyle]')
    $borderStyleRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.borderStyle = val
      that.update(that.formData)
    })
    let $antBcolorInput = $propPanel.find('input[type=text][name=antBcolor]') 
    $antBcolorInput.change(function() {
      let val = $(this).val()
      that.formData.antBcolor = val
      that.update(that.formData)
    })
    
    let $antTsDurBInput = $propPanel.find('input[type=text][name=antTsDurB]') 
    $antTsDurBInput.change(function() {
      let val = $(this).val()
      that.formData.antTsDurB = val
    })
    let $antTsFunBRadio = $propPanel.find('input[type=radio][name=antTsFunB]')
    $antTsFunBRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.antTsFunB = val
      that.update(that.formData)
    })
    let $antBcRadio = $propPanel.find('input[type=radio][name=antBc]')
    $antBcRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.antBc = val
      that.update(that.formData)
    })
    let $alignRadio = $propPanel.find('.font-z .font-item-radio')
    $alignRadio.click(function() {
      let val = $(this).attr('data-val')
      that.formData.align = val
      $alignRadio.removeClass("active")
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
          case 'fontstyle':
            that.formData.fontStyle ='normal'
            $elemInput.val("normal")
            break;
          case 'oline':
            that.formData.oLine =''
            $elemInput.val("")
            break;
          case 'lthrough':
            that.formData.lThrough = ''
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
          case 'fontstyle':
            that.formData.fontStyle ='italic'
            $elemInput.val("italic")
            break;
          case 'oline':
            that.formData.oLine ='overline'
            $elemInput.val("overline")
            break;
          case 'lthrough':
            that.formData.lThrough = 'line-through'
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
   //反面文字
    let $falignRadio = $propPanel.find('.font-f .font-item-radio')
    $falignRadio.click(function() {
      let val = $(this).attr('data-val')
      that.formData.falign = val
      $falignRadio.removeClass("active")
      $(this).addClass("active")
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
          case 'fweight':
            that.formData.fweight =""
            $elemInput.val("")
            break;
          case 'ffontstyle':
            that.formData.ffontStyle ='normal'
            $elemInput.val("normal")
            break;
          case 'foline':
            that.formData.foLine =''
            $elemInput.val("")
            break;
          case 'flthrough':
            that.formData.flThrough = ''
            $elemInput.val("")
            break;
          case 'fuline':
            that.formData.fuLine = ''
            $elemInput.val("")
            break;
        } 
      }else{
        $(this).addClass("active")
        switch($attrName) {
          case 'fweight':
            that.formData.fweight ="600"
            $elemInput.val("600")
            break;
          case 'ffontstyle':
            that.formData.ffontStyle ='italic'
            $elemInput.val("italic")
            break;
          case 'foline':
            that.formData.foLine ='overline'
            $elemInput.val("overline")
            break;
          case 'flthrough':
            that.formData.flThrough = 'line-through'
            $elemInput.val("line-through")
            break;
          case 'fuline':
            that.formData.fuLine = 'underline'
            $elemInput.val("underline")
            break;
        } 
      }
      that.update(that.formData)
      that.updatePreviewStyle($(this))
    })
    $propPanel.find('.font-synchronous').on('click', function() {
      let mthat=$(this)
      let layer = layui.layer
      layer.msg('你确定  同步默文 文字样式么？', {
        time: 0 //不自动关闭
        ,btn: ['同步', '取消']
        ,yes: function(index){
          that.onTongBu($propPanel)
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
        if (that.formData.fcolor) {
         let $fcolorInput=$layerElem.find('input[type=text][name=fcolor]')
         $fcolorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.fcolor)
        } 
        if (that.formData.fbgColor) {
         let $fbgColorInput=$layerElem.find('input[type=text][name=fbgColor]')
         $fbgColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.fbgColor)
        } 
        //边框
        if (that.formData.borderColor) {
         let $borderColorInput=$layerElem.find('input[type=text][name=borderColor]')
         $borderColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.borderColor)
        } 
        if (that.formData.antBcolor) {
         let $antBcolorInput=$layerElem.find('input[type=text][name=antBcolor]')
         $antBcolorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.antBcolor)
        } 
        if(that.formData.weight=="600"){
          $layerElem.find('.font-z .font-item-checkbox:eq(0)').addClass('active')
        }

        if(that.formData.fontStyle=='italic'){
          $layerElem.find('.font-z .font-item-checkbox:eq(1)').addClass('active')
        }
        if(that.formData.oLine=='overline'){
          $layerElem.find('.font-z .font-item-checkbox:eq(2)').addClass('active')
        }
        if(that.formData.lThrough=='line-through'){
          $layerElem.find('.font-z .font-item-checkbox:eq(3)').addClass('active')
        }
        if(that.formData.uLine=='underline'){
          $layerElem.find('.font-z .font-item-checkbox:eq(4)').addClass('active')
        }

        $layerElem.find(`.font-z .font-item-radio[data-val="${that.formData.align}"]`).addClass('active')
        $layerElem.find(`.font-f .font-item-radio[data-val="${that.formData.align}"]`).addClass('active')

        if(that.formData.ffontStyle=='italic'){
          $layerElem.find('.font-f .font-item-checkbox:eq(1)').addClass('active')
        }
        if(that.formData.foLine=='overline'){
          $layerElem.find('.font-f .font-item-checkbox:eq(2)').addClass('active')
        }
        if(that.formData.flThrough=='line-through'){
          $layerElem.find('.font-f .font-item-checkbox:eq(3)').addClass('active')
        }
        if(that.formData.fuLine=='underline'){
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
              that.onTongBu($layerElem);
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
            <li>动画设置</li>
            <li>边框</li>
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
                      <select   name="fFamily" >
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
                      <input type="text" name="fontSize" class="layui-input">
                    </div>
                    <label class="label-con">背景颜色</label>
                    <div class="pagecolorpanel"  >
                        <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner" style="background-color:transparent;"></div></div></div>
                        <input class="pagecolor" name="bgColor"  type="text"  />
                        <span class="clear-color-button"></span>
                    </div>
                    <label class="label-con">行  高</label>
                    <div class="labelpanel"   style="width: 65px; ">
                      <input type="text" name="lineHg" class="layui-input">
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
                      <span  title="斜体" class="font-item-checkbox" data-val="" ><icon>ꕆ</icon><input name="fontStyle" type="hidden"   value="" /></span>
                      <span  title="上划线" class="font-item-checkbox" data-val="" ><icon>ꔣ</icon><input name="oLine" type="hidden"   value="" /></span>
                      <span  title="中划线" class="font-item-checkbox" data-val=""><icon>ꕇ</icon><input name="lThrough" type="hidden"   value="" /></span>
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
   
              
              <div class="layui-form-item">
                <label class="layui-form-label">圆角度数</label>
                <div class="layui-input-inline">
                  <input name="bRadius" type="text" class="layui-input">
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
                      <select   name="ffFamily" >
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
                        <input class="pagecolor" name="fcolor"  type="text"  />
                        <span class="clear-color-button"></span>
                    </div>
                    <label class="label-con">文字大小</label>
                    <div class="labelpanel"   style="width: 90px; ">
                      <input type="text" name="ffontSize" class="layui-input">
                    </div>
                    <label class="label-con">背景颜色</label>
                    <div class="pagecolorpanel"  >
                        <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner" style="background-color:transparent;"></div></div></div>
                        <input class="pagecolor" name="fbgColor"  type="text"  />
                        <span class="clear-color-button"></span>
                    </div>
                    <label class="label-con">行  高</label>
                    <div class="labelpanel"   style="width: 65px; ">
                      <input type="text" name="flineHg" class="layui-input">
                    </div>
                    <label class="label-con">字  距</label>
                    <div class="labelpanel"   style="width: 65px; ">
                      <input type="text" name="fspacing" class="layui-input">
                    </div>
                    <label class="label-con">缩  进</label>
                    <div class="labelpanel"   style="width: 65px; ">
                      <input type="text" name="findent" class="layui-input">
                    </div>
                    <div class="font-setting font-f">
                      <span  title="加粗" class="font-item-checkbox" data-val="" ><icon>ꕅ</icon><input name="fweight" type="hidden"   value="" /></span>
                      <span  title="斜体" class="font-item-checkbox" data-val="" ><icon>ꕆ</icon><input name="ffontStyle" type="hidden"   value="" /></span>
                      <span  title="上划线" class="font-item-checkbox" data-val="" ><icon>ꔣ</icon><input name="foLine" type="hidden"   value="" /></span>
                      <span  title="中划线" class="font-item-checkbox" data-val=""><icon>ꕇ</icon><input name="flThrough" type="hidden"   value="" /></span>
                      <span  title="下划线" class="font-item-checkbox" data-val="" ><icon>ꕈ</icon><input name="fuLine" type="hidden"   value="" /></span>

                      <i class="spaceline"></i>
                      <span  title="文字左对齐" class="font-item-radio" data-val="left" ><icon>ꕉ</icon></span>
                      <span  title="文字居中对齐" class="font-item-radio"  data-val="center" ><icon>ꕐ</icon></span>
                      <span  title="文字右对齐" class="font-item-radio"  data-val="right" ><icon>ꕑ</icon></span>

                    </div>
                    <textarea   name="fcontent"  ></textarea>
                    <div class="font-synchronous">
                      <icon>ꕦ</icon><span>同步默认文字样式</span>
                    </div>
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">背景图片</label>
                <div class="layui-input-inline">
                  <input name="fbgImg" type="text" class="layui-input">
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">背景平铺</label>
                <div class="layui-input-inline">
                  <select   name="fbgRep" >
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
                  <select   name="fbgPos" >
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
              <fieldset  class="layui-elem-field">
                <legend>
                  动画时长                      
                  <input class="input-short"  type="text" name="antTsDur"  style="width:50px; height:20px; margin-left:10px; padding-left:5px;" />
                  <label class="label-con">秒</label>
                </legend>
                <div class="layui-field-box">
                  <input class="radio-medium" type="radio" name="antTsFun" value="linear"  title="匀速">
                  <input class="radio-medium" type="radio" name="antTsFun" value="ease"  title="逐渐变慢">
                  <input class="radio-medium" type="radio" name="antTsFun" value="ease-in"   title="减速">
                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="antTsFun" value="ease-out"   title="加速">
                  <input class="radio-medium" type="radio" name="antTsFun" value="ease-in-out"   title="加速后减速">
                  <input class="radio-medium" type="radio" name="antTsFun" value="cubic-bezier"   title="动感弹跳">
                </div>
              </fieldset>
              <fieldset  class="layui-elem-field" style="margin-top:15px;">
                <legend>动画效果</legend>
                <div class="layui-field-box">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans0" title="无效果">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans1" title="右切入">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans2"  title="下切入">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans3"  title="左切入">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans4"  title="上切入">
                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans5"  title="右切出">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans6"  title="下切出">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans7"  title="左切出">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans8"  title="上切出">

                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans9"  title="右切入切出">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans10"   title="下切入切出">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans11"   title="左切入切出">

                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans12"  title="上切入切出">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans13"  title="放大出现">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans14"  title="缩小出现">

                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans15"  title="翻转出现">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans16"  title="缩放出现1">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans17"  title="缩放出现2">

                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans18"  title="旋转放大">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans19"  title="旋转缩小">
                  <input class="radio-medium" type="radio" name="antTrans"  value="atrans20"  title="渐隐渐显">
                </div>
              </fieldset>
            </div>
            <div  class="layui-tab-item">
               <div class="layui-tab layui-side-card">
                <ul class="layui-tab-title"  >
                  <li class="layui-this" style="margin-top: 110px;">默认边框</li>
                  <li class="">鼠标划过边框</li>
                </ul>
                <div class="layui-tab-content" style="height: 400px;">
                  <div class="layui-tab-item layui-show">
                        <div class="layui-form-item"  >
                          <label class="layui-form-label">边框显示</label>
                          <div class="layui-input-inline">
                            <input type="checkbox" name="borderT" value="show" lay-skin="primary" title="上边"  >
                            <input type="checkbox" name="borderB" value="show" lay-skin="primary" title="下边">
                            <input type="checkbox" name="borderL" value="show" lay-skin="primary" title="左边" >
                            <input type="checkbox" name="borderR" value="show" lay-skin="primary" title="右边"  >
                          </div>
                        </div>
                        <div class="layui-form-item"  >
                          <label class="layui-form-label">边框粗细</label>
                          <div class="layui-input-inline input-short"><input name="borderWidth" type="text" class="layui-input"></div>
                        </div>
                        <div class="layui-form-item"  >
                          <label class="layui-form-label">边框颜色</label>
                          <div class="layui-input-inline pagecolorpanel input-short"  >
                            <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner"></div></div></div>
                            <input name="borderColor" type="text" class="layui-input pagecolor">
                            <span class="clear-color-button"></span>
                          </div>
                        </div>
                        <div class="layui-form-item">
                          <label class="layui-form-label">边框样式</label>
                          <div class="layui-input-inline">
                            <input type="radio" name="borderStyle" lay-filter="borderStyle" value="solid" title="实线" checked="">
                            <input type="radio" name="borderStyle" lay-filter="borderStyle" value="dotted" title="细虚线">
                            <input type="radio" name="borderStyle" lay-filter="borderStyle" value="dashed" title="粗虚线">
                          </div>
                        </div>
                  </div>
                  <div class="layui-tab-item ">

                    <fieldset  class="layui-elem-field" style="margin-top:25px;">
                      <legend>
                        动画时长                      
                        <input class="input-short"  type="text" name="antTsDurB"  style="width:50px; height:20px; margin-left:10px; padding-left:5px;" />
                        <label class="label-con">秒</label>
                      </legend>
                      <div class="layui-field-box">
                        <input class="radio-medium" type="radio" name="antTsFunB" value="linear"  title="匀速">
                        <input class="radio-medium" type="radio" name="antTsFunB" value="ease"  title="逐渐变慢">
                        <input class="radio-medium" type="radio" name="antTsFunB" value="ease-in"   title="减速">
                        <div class="sepline"></div>
                        <input class="radio-medium" type="radio" name="antTsFunB" value="ease-out"   title="加速">
                        <input class="radio-medium" type="radio" name="antTsFunB" value="ease-in-out"   title="加速后减速">
                        <input class="radio-medium" type="radio" name="antTsFunB" value="cubic-bezier"   title="动感弹跳">
                      </div>
                    </fieldset>
                    <fieldset  class="layui-elem-field" style="margin-top:25px;">
                      <legend>动画效果</legend>
                      <div class="layui-form-item"  style="margin-top:15px;margin-bottom:0px;">
                        <label class="layui-form-label">边框颜色</label>
                        <div class="layui-input-inline pagecolorpanel input-short"  style="width: 190px;">
                          <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner"></div></div></div>
                          <input name="antBcolor" type="text" class="layui-input pagecolor">
                          <span class="clear-color-button"></span>
                        </div>
                      </div>
                      <div class="layui-field-box">
                        <input class="radio-medium" type="radio" name="antBc"  value="bdtx0" title="直接切换">
                        <input class="radio-medium" type="radio" name="antBc"  value="bdtx1" title="渐隐渐显">
                        <div class="sepline"></div>
                        <input class="radio-medium" type="radio" name="antBc"  value="bdtx4"  title="左对角线切入">
                        <input class="radio-medium" type="radio" name="antBc"  value="bdtx5"  title="右对角线切入">
                        <div class="sepline"></div>
                        <input class="radio-medium" type="radio" name="antBc"  value="bdtx6"  title="顺时针出现">
                        <input class="radio-medium" type="radio" name="antBc"  value="bdtx7"  title="逆时针出现">
                        <div class="sepline"></div>
                        <input class="radio-medium" type="radio" name="antBc"  value="bdtx8"  title="由点到线">
                        <input class="radio-medium" type="radio" name="antBc"  value="bdtx9"  title="由点到面">
                      </div>
                    </fieldset>

                  </div>
             
 
                </div>
            </div>
 

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
      /*
      that.formData.weight = $layerElem.find('.font-z .font-item-checkbox:eq(0)').data('val')
      that.formData.fontStyle = $layerElem.find('.font-z .font-item-checkbox:eq(1)').data('val')
      that.formData.oLine = $layerElem.find('.font-z .font-item-checkbox:eq(2)').data('val')
      that.formData.lThrough = $layerElem.find('.font-z .font-item-checkbox:eq(3)').data('val')
      that.formData.uLine = $layerElem.find('.font-z .font-item-checkbox:eq(4)').data('val')
       */
 


      that.update(that.formData)
      that.updatePropPanel()

      
 
      layer.close(layerNo)
      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    form.val('textComponentForm', that.formData)
  }
  update(formData) {
    let that = this
    let deline=this.formData.uLine;
    if(this.formData.oLine){
      deline+=' '+this.formData.oLine
    }
    if(this.formData.lThrough){
      deline+=' '+this.formData.lThrough
    }
    if(deline ==="") deline='none'
    let $defPanel=this.$contentBox.find(".on")
    $defPanel.css("font-family",this.formData.fFamily)
    $defPanel.css('color', this.formData.color)
    $defPanel.css('background-color', this.formData.bgColor)
    $defPanel.css('font-size', parseInt(this.formData.fontSize))
    $defPanel.css('line-height', this.formData.lineHg+'px')
    $defPanel.css('letter-spacing', parseInt(this.formData.spacing))
    $defPanel.css('text-indent', parseInt(this.formData.indent))
    $defPanel.css('border-radius',parseInt(this.formData.bRadius))
    
    $defPanel.css('text-align', this.formData.align)
    $defPanel.css("font-weight",this.formData.weight)
    $defPanel.css("font-style",this.formData.fontStyle)
    $defPanel.css("text-decoration",deline)
 

    $defPanel.text(formData.content)

    let $offPanel=this.$contentBox.find(".off")
    let _antTransAttr=this.$content.attr("antTrans")
    if(this.formData.hoverMode==="on"){
      $offPanel.remove()

      let offline=this.formData.fuLine;
      if(this.formData.foLine){
        offline+=' '+this.formData.foLine
      }
      if(this.formData.flThrough){
        offline+=' '+this.formData.flThrough
      }
      if(offline ==="") offline='none'

      let $_antTrans=this.formData.antTrans

      if($_antTrans=='atrans5' || $_antTrans=='atrans6' || $_antTrans==='atrans7' || $_antTrans==='atrans8' || $_antTrans==='atrans9' || $_antTrans==='atrans19' ){
        this.$contentBox.find(".on").before("<div class='off'></div>")
      }else{
        this.$contentBox.find(".on").after("<div class='off'></div>")
      }
      $offPanel=this.$contentBox.find(".off")
      $offPanel.text(formData.fcontent)
      $offPanel.css("font-family",this.formData.ffFamily)
      $offPanel.css('color', this.formData.fcolor)
      $offPanel.css('background-color', this.formData.fbgColor)
      $offPanel.css('font-size', parseInt(this.formData.ffontSize))
      $offPanel.css('line-height', this.formData.flineHg+'px')
      $offPanel.css('letter-spacing', parseInt(this.formData.fspacing))
      $offPanel.css('text-indent', parseInt(this.formData.findent))
      $offPanel.css('border-radius', this.formData.bRadius)

      $offPanel.css('text-align', this.formData.falign)
      $offPanel.css("font-weight",this.formData.fweight)
      $offPanel.css("font-style",this.formData.ffontStyle)
      $offPanel.css("text-decoration",offline)


      if(this.formData.antTsFun==='cubic-bezier'){
        $defPanel.css('transition-timing-function', 'cubic-bezier(0.52, 1.64, 0.37, 0.66)')
        $offPanel.css('transition-timing-function', 'cubic-bezier(0.52, 1.64, 0.37, 0.66)')
      }else{
        $defPanel.css('transition-timing-function', this.formData.antTsFun)
        $offPanel.css('transition-timing-function', this.formData.antTsFun)
      }
      $defPanel.css('transition-duration', this.formData.antTsDur+'s')
      $offPanel.css('transition-duration', this.formData.antTsDur+'s')

      
      this.$content.removeClass(_antTransAttr);
      this.$content.addClass(this.formData.antTrans)
      this.$content.attr("antTrans",this.formData.antTrans)
    }else{
      $offPanel.remove();
      this.$content.removeClass(_antTransAttr);
      this.$content.attr("antTrans",'')
    }
      $offPanel=this.$contentBox.find(".off")


    //处理边框
    let $textPanel=this.$contentBox.find(".ant-text")
   
    let $alPanel=this.$contentBox.find(".bk-aline")
    if (this.formData.borderT==="show" || this.formData.borderB==="show" ||this.formData.borderL==="show"||this.formData.borderR==="show"){
      if($alPanel.length <=0)
        $textPanel.append("<div class='bk-aline'></div>")
      $alPanel=this.$contentBox.find(".bk-aline")

      if(this.formData.borderT==="show"){
        $alPanel.css('border-top-width', this.formData.borderWidth)
        $defPanel.css('padding-top', this.formData.borderWidth)
        $offPanel.css('padding-top', this.formData.borderWidth)
      }else{
        $alPanel.css('border-top-width', 0)
        $defPanel.css('padding-top', 0)
        $offPanel.css('padding-top', 0)
      }
      if(this.formData.borderB==="show"){
        $alPanel.css('border-bottom-width', this.formData.borderWidth)
        $defPanel.css('padding-bottom', this.formData.borderWidth)
        $offPanel.css('padding-bottom', this.formData.borderWidth)
      }else{
        $alPanel.css('border-bottom-width', 0)
        $defPanel.css('padding-bottom', 0)
        $offPanel.css('padding-bottom', 0)
      }
      if(this.formData.borderL==="show"){
        $alPanel.css('border-Left-width', this.formData.borderWidth)
        $defPanel.css('padding-Left', this.formData.borderWidth)
        $offPanel.css('padding-Left', this.formData.borderWidth)
      }else{
        $alPanel.css('border-Left-width', 0)
        $defPanel.css('padding-Left', 0)
        $offPanel.css('padding-Left', 0)
      }
      if(this.formData.borderR==="show"){
        $alPanel.css('border-right-width', this.formData.borderWidth)
        $defPanel.css('padding-right', this.formData.borderWidth)
        $offPanel.css('padding-right', this.formData.borderWidth)
      }else{
        $alPanel.css('border-right-width', 0)
        $defPanel.css('padding-right', 0)
        $offPanel.css('padding-right', 0)
      }
      $alPanel.css('border-style', this.formData.borderStyle)
      $alPanel.css('border-color', this.formData.borderColor)


    }else{
        $alPanel.remove()
    }



 
    let _antBc=this.$content.attr("antBc")
    this.$content.removeClass(_antBc);
    this.$content.addClass(this.formData.antBc)
    this.$content.attr("antBc",this.formData.antBc)

    if(this.formData.antBc !="hide"){
      let _antTsFunBV=this.formData.antTsFunB
      if(this.formData.antTsFunB==='cubic-bezier') 
        _antTsFunBV='cubic-bezier(0.52, 1.64, 0.37, 0.66)'
      let _antTsDurBV=this.formData.antTsDurB+'s'

      let $ltPanel=this.$contentBox.find(".w-lt")
      if(this.formData.borderT==="show"){
        if($ltPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-lt'></div>")
          $ltPanel=this.$contentBox.find(".w-lt")
          $ltPanel.css('border-top-width',parseInt(this.formData.borderWidth))
          $ltPanel.css('border-top-style',this.formData.borderStyle)
          $ltPanel.css('border-top-color',this.formData.antBcolor)
          $ltPanel.css('transition-timing-function',_antTsFunBV)
          $ltPanel.css('transition-duration',_antTsDurBV)
          
      }else{
        $ltPanel.remove()
      }
      let $lbPanel=this.$contentBox.find(".w-lb")
      if(this.formData.borderB==="show"){
        if($lbPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-lb'></div>")
          $lbPanel=this.$contentBox.find(".w-lb")
          $lbPanel.css('border-Bottom-width',parseInt(this.formData.borderWidth))
          $lbPanel.css('border-Bottom-style',this.formData.borderStyle)
          $lbPanel.css('border-Bottom-color',this.formData.antBcolor)
          $lbPanel.css('transition-timing-function',_antTsFunBV)
          $lbPanel.css('transition-duration',_antTsDurBV)
          
      }else{
        $lbPanel.remove()
      }
      let $llPanel=this.$contentBox.find(".w-ll")
      if(this.formData.borderL==="show"){
        if($llPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-ll'></div>")
          $llPanel=this.$contentBox.find(".w-ll")
          $llPanel.css('border-left-width',parseInt(this.formData.borderWidth))
          $llPanel.css('border-left-style',this.formData.borderStyle)
          $llPanel.css('border-left-color',this.formData.antBcolor)
          $llPanel.css('transition-timing-function',_antTsFunBV)
          $llPanel.css('transition-duration',_antTsDurBV)
          
      }else{
        $llPanel.remove()
      }
      let $lrPanel=this.$contentBox.find(".w-lr")
      if(this.formData.borderR==="show"){
        if($lrPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-lr'></div>")
          $lrPanel=this.$contentBox.find(".w-lr")
          $lrPanel.css('border-right-width',parseInt(this.formData.borderWidth))
          $lrPanel.css('border-right-style',this.formData.borderStyle)
          $lrPanel.css('border-right-color',this.formData.antBcolor)
          $lrPanel.css('transition-timing-function',_antTsFunBV)
          $lrPanel.css('transition-duration',_antTsDurBV)
          
      }else{
        $lrPanel.remove()
      }

      
     


   
    }


  }
  updatePropPanel(){
    let that = this
    let $propPanel = this.$propPanel

    let $fFamilySelect = $propPanel.find('select[name=fFamily]')
    $fFamilySelect.val(this.formData.fFamily)

    let $colorInput = $propPanel.find('input[type=text][name=color]')
    $colorInput.val(this.formData.color)

    let $fontSizeInput = $propPanel.find('input[type=text][name=fontSize]')
    $fontSizeInput.val(this.formData.fontSize)

    let $bgColorInput = $propPanel.find('input[type=text][name=bgColor]')
    $bgColorInput.val(this.formData.bgColor)

    let $lineHgInput = $propPanel.find('input[type=text][name=lineHg]')
    $lineHgInput.val(this.formData.lineHg)

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
    //以下是移上信息
    let $hoverModeRadio = $propPanel.find('input[type=radio][name=hoverMode]')
    $hoverModeRadio.filter(`[value="${this.formData.hoverMode}"]`).prop('checked', true)

    let $ffFamilySelect = $propPanel.find('select[name=ffFamily]')
    $ffFamilySelect.val(this.formData.ffFamily)

    let $fcolorInput = $propPanel.find('input[type=text][name=fcolor]')
    $fcolorInput.val(this.formData.fcolor)

    let $ffontSizeInput = $propPanel.find('input[type=text][name=ffontSize]')
    $ffontSizeInput.val(this.formData.ffontSize)

    let $fbgColorInput = $propPanel.find('input[type=text][name=fbgColor]')
    $fbgColorInput.val(this.formData.fbgColor)

    let $flineHgInput = $propPanel.find('input[type=text][name=flineHg]')
    $flineHgInput.val(this.formData.flineHg)

    let $fspacingInput = $propPanel.find('input[type=text][name=fspacing]')
    $fspacingInput.val(this.formData.fspacing)
    
    let $findentInput = $propPanel.find('input[type=text][name=findent]')
    $findentInput.val(this.formData.findent)

    let $fcontentTextarea = $propPanel.find('textarea[name=fcontent]')
    $fcontentTextarea.val(this.formData.fcontent)
    if (this.formData.fcolor) {
       $fcolorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.fcolor)
    }else{
      $fcolorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }
    if (this.formData.fbgColor) {
       $fbgColorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.fbgColor)
    }else{
      $fbgColorInput.prev().find(".sp-preview-inner").css("background-color",'')
    } 

   　//动画信息
    let $antTsDurInput = $propPanel.find('input[type=text][name=antTsDur]')
    $antTsDurInput.val(this.formData.antTsDur)
    let $antTsFunModeRadio = $propPanel.find('input[type=radio][name=antTsFun]')
    $antTsFunModeRadio.filter(`[value="${this.formData.antTsFun}"]`).prop('checked', true)
    let $antTransModeRadio = $propPanel.find('input[type=radio][name=antTrans]')
    $antTransModeRadio.filter(`[value="${this.formData.antTrans}"]`).prop('checked', true)

    //边框信息
    let $borderTCheckBox = $propPanel.find('input[type=checkbox][name=borderT]')
    if (this.formData.borderT === 'show') {
      $borderTCheckBox.prop('checked', true)
    } else {
      $borderTCheckBox.prop('checked', false)
    }
    let $borderBCheckBox = $propPanel.find('input[type=checkbox][name=borderB]')
    if (this.formData.borderB === 'show') {
      $borderBCheckBox.prop('checked', true)
    } else {
      $borderBCheckBox.prop('checked', false)
    }
    let $borderLCheckBox = $propPanel.find('input[type=checkbox][name=borderL]')
    if (this.formData.borderL === 'show') {
      $borderLCheckBox.prop('checked', true)
    } else {
      $borderLCheckBox.prop('checked', false)
    }
    let $borderRCheckBox = $propPanel.find('input[type=checkbox][name=borderR]')
    if (this.formData.borderR === 'show') {
      $borderRCheckBox.prop('checked', true)
    } else {
      $borderRCheckBox.prop('checked', false)
    }

    let $borderWidthInput = $propPanel.find('input[type=text][name=borderWidth]')
    $borderWidthInput.val(this.formData.borderWidth)
    let $borderColorInput = $propPanel.find('input[type=text][name=borderColor]')
    $borderColorInput.val(this.formData.borderColor)
    let $borderStyleRadio = $propPanel.find('input[type=radio][name=borderStyle]')
    $borderStyleRadio.filter(`[value="${this.formData.borderStyle}"]`).prop('checked', true)

    if (this.formData.borderColor) {
      $borderColorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.borderColor)
    }else{
      $borderColorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }
    //移上边框
    let $antTsDurBInput = $propPanel.find('input[type=text][name=antTsDurB]')
    $antTsDurBInput.val(this.formData.antTsDurB)
    let $antTsFunBRadio = $propPanel.find('input[type=radio][name=antTsFunB]')
    $antTsFunBRadio.filter(`[value="${this.formData.antTsFunB}"]`).prop('checked', true)
    let $antBcolorInput = $propPanel.find('input[type=text][name=antBcolor]')
    $antBcolorInput.val(this.formData.antBcolor)
    let $antBcRadio = $propPanel.find('input[type=radio][name=antBc]')
    $antBcRadio.filter(`[value="${this.formData.antBc}"]`).prop('checked', true)

    if (this.formData.antBcolor) {
       $antBcolorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.antBcolor)
    }else{
      $antBcolorInput.prev().find(".sp-preview-inner").css("background-color",'')
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
    let $fontStyleInput = $propPanel.find('.font-z input[type=hidden][name=fontStyle]')
    if(that.formData.fontStyle=="italic"){
      $fontStyleInput.val("italic")
      $fontStyleInput.parent().addClass("active")
    }else{
      $fontStyleInput.val("normal")
    }
    let $oLineInput = $propPanel.find('.font-z input[type=hidden][name=oLine]')
    if(that.formData.oLine=="overline"){
      $oLineInput.val("overline")
      $oLineInput.parent().addClass("active")
    }else{
      $oLineInput.val("")
    }

    let $lThroughInput = $propPanel.find('.font-z input[type=hidden][name=lThrough]')
    if(that.formData.lThrough=="line-through"){
      $lThroughInput.val("line-through")
      $lThroughInput.parent().addClass("active")
    }else{
      $lThroughInput.val("")
    }
    let $uLineInput = $propPanel.find('.font-z input[type=hidden][name=uLine]')
    if(that.formData.uLine=="underline"){
      $uLineInput.val("underline")
      $uLineInput.parent().addClass("active")
    }else{
      $uLineInput.val("")
    }

    //右侧 反面字体样式设置
    let $fweightInput = $propPanel.find('.font-f input[type=hidden][name=fweight]')
    if(that.formData.fweight=="600"){
      $fweightInput.val("600")
      $fweightInput.parent().addClass("active")
    }else{
      $fweightInput.val("")
    }
    let $ffontStyleInput = $propPanel.find('.font-f input[type=hidden][name=ffontStyle]')
    if(that.formData.ffontStyle=="italic"){
      $ffontStyleInput.val("italic")
      $ffontStyleInput.parent().addClass("active")
    }else{
      $ffontStyleInput.val("normal")
    }
    let $foLineInput = $propPanel.find('.font-f input[type=hidden][name=foLine]')
    if(that.formData.foLine=="overline"){
      $foLineInput.val("overline")
      $foLineInput.parent().addClass("active")
    }else{
      $foLineInput.val("")
    }

    let $flThroughInput = $propPanel.find('.font-f input[type=hidden][name=flThrough]')
    if(that.formData.flThrough=="line-through"){
      $flThroughInput.val("line-through")
      $flThroughInput.parent().addClass("active")
    }else{
      $flThroughInput.val("")
    }
    let $fuLineInput = $propPanel.find('.font-z input[type=hidden][name=fuLine]')
    if(that.formData.uLine=="underline"){
      $fuLineInput.val("underline")
      $fuLineInput.parent().addClass("active")
    }else{
      $fuLineInput.val("")
    }

    $propPanel.find(`.font-z .font-item-radio[data-val="${that.formData.align}"]`).addClass('active')
    $propPanel.find(`.font-f .font-item-radio[data-val="${that.formData.falign}"]`).addClass('active')

 

  }
}


