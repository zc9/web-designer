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
    this.formData.color = '#fff'
    this.formData.bgColor = '#000'
    this.formData.lineHg =24  //行距
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
    this.formData.fcolor = '#000'
    this.formData.fbgColor = '#fff'
    this.formData.flineHg =24  //行距
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
  initPorpPanel() { 
    console.log('initPorpPanel')
    let that = this
    $('.prop-setting-ct > div').hide()
    let $propPanel = $('.text-com-prop-panel')
    this.$propPanel = $propPanel

    $propPanel.show()
    $propPanel.find('*').off()
    this.updatePropPanel();

    let $fFamilySelect = $propPanel.find('select[name=fFamily]')
    $fFamilySelect.change(function() {
      that.formData.fFamily = $(this).prop('value')
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
    let $fontSizeInput = $propPanel.find('input[type=text][name=fontSize]') 
    $fontSizeInput.change(function() {
      let val = $(this).val()
      that.formData.fontSize = val
      that.update(that.formData)
    })
    let $lineHgInput = $propPanel.find('input[type=text][name=lineHg]') 
    $lineHgInput.change(function() {
      let val = $(this).val()
      that.formData.lineHg = val
      that.update(that.formData)
    })
    let $spacingInput = $propPanel.find('input[type=text][name=spacing]') 
    $spacingInput.change(function() {
      let val = $(this).val()
      that.formData.spacing = val
      that.update(that.formData)
    })
    let $indentInput = $propPanel.find('input[type=text][name=indent]') 
    $indentInput.change(function() {
      let val = $(this).val()
      that.formData.indent = val
      that.update(that.formData)
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
    })
    let $fbgColorInput = $propPanel.find('input[type=text][name=fbgColor]') 
    $fbgColorInput.change(function() {
      let val = $(this).val()
      that.formData.fbgColor = val
      that.update(that.formData)
    })
    let $ffontSizeInput = $propPanel.find('input[type=text][name=ffontSize]') 
    $ffontSizeInput.change(function() {
      let val = $(this).val()
      that.formData.ffontSize = val
      that.update(that.formData)
    })
    let $flineHgInput = $propPanel.find('input[type=text][name=flineHg]') 
    $flineHgInput.change(function() {
      let val = $(this).val()
      that.formData.flineHg = val
      that.update(that.formData)
    })
    let $fspacingInput = $propPanel.find('input[type=text][name=fspacing]') 
    $fspacingInput.change(function() {
      let val = $(this).val()
      that.formData.fspacing = val
      that.update(that.formData)
    })
    let $findentInput = $propPanel.find('input[type=text][name=findent]') 
    $findentInput.change(function() {
      let val = $(this).val()
      that.formData.findent = val
      that.update(that.formData)
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
    let $alignRadio = $propPanel.find('.fnt-z .font-item-radio')
    $alignRadio.click(function() {
      let val = $(this).prop('data-val')
      that.formData.align = val
      that.update(that.formData)
      $alignRadio.removeClass("active")
      $(this).addClass("active")
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
                    <div class="font-setting font-on">
                      <span  title="加粗" class="font-item" data-l="checkbox" ><icon>ꕅ</icon></span>
                      <span  title="斜体" class="font-item" data-l="checkbox" ><icon>ꕆ</icon></span>
                      <span  title="上划线" class="font-item" data-l="checkbox" ><icon>ꔣ</icon></span>
                      <span  title="中划线" class="font-item active" data-l="checkbox"><icon>ꕇ</icon></span>
                      <span  title="下划线" class="font-item" data-l="checkbox" ><icon>ꕈ</icon></span>
                      <i class="spaceline"></i>
                      <span  title="文字左对齐" class="font-item active" data-l="radio" ><icon>ꕉ</icon></span>
                      <span  title="文字居中对齐" class="font-item" data-l="radio" ><icon>ꕐ</icon></span>
                      <span  title="文字右对齐" class="font-item" data-l="radio" ><icon>ꕑ</icon></span>
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
                    <div class="font-setting">
                      <span  title="加粗" class="font-item" data-l="checkbox" ><icon>ꕅ</icon></span>
                      <span  title="斜体" class="font-item" data-l="checkbox" ><icon>ꕆ</icon></span>
                      <span  title="上划线" class="font-item" data-l="checkbox" ><icon>ꔣ</icon></span>
                      <span  title="中划线" class="font-item active" data-l="checkbox"><icon>ꕇ</icon></span>
                      <span  title="下划线" class="font-item" data-l="checkbox" ><icon>ꕈ</icon></span>
                      <i class="spaceline"></i>
                      <span  title="文字左对齐" class="font-item active" data-l="radio" ><icon>ꕉ</icon></span>
                      <span  title="文字居中对齐" class="font-item" data-l="radio" ><icon>ꕐ</icon></span>
                      <span  title="文字右对齐" class="font-item" data-l="radio" ><icon>ꕑ</icon></span>
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
      that.update(that.formData)
      that.updatePropPanel()
      layer.close(layerNo)
      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    form.val('textComponentForm', that.formData)
  }
  update(formData) {
    let that = this
    
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
    
    // $defPanel.css("font-weight",this.formData.weight)
    // $defPanel.css("font-style",this.formData.fontStyle)
    $defPanel.text(formData.content)

    let $offPanel=this.$contentBox.find(".off")
    let _antTransAttr=this.$content.attr("antTrans")
    if(this.formData.hoverMode==="on"){
      $offPanel.remove()
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

    //处理边框
    let $textPanel=this.$contentBox.find(".ant-text")
   
    let $alPanel=this.$contentBox.find(".bk-aline")
    if (this.formData.borderT==="show"){
      if($alPanel.length <=0)
        $textPanel.append("<div class='bk-aline'></div>")
      $alPanel=this.$contentBox.find(".bk-aline")
      $alPanel.css('border-width', this.formData.borderWidth)
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


    $propPanel.find(`.font-z .font-item-radio[data-val="${that.formData.align}"]`).addClass('active')
    let sss= $propPanel.find(`.fnt-z .font-item-radio[data-val="${that.formData.align}"]`);
 
        /*
        $layerElem.find('.animselect > div').on('click', function() {
          $layerElem.find('.animselect > div.active').removeClass('active')
          $(this).addClass('active')
        })*/


  }
}


