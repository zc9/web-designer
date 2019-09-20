import Component from './Component';
export default class TextComponent extends Component {
  constructor() {
    super('text-component')
    let content = `
        <a>请双击设置文件内容</a>
      `
    this.$contentBox.append(content)
    this.initFormData() 
  }
  initFormData() {
    this.formData.appLabel = ''

    this.formData.hoverMode ='off' //off 关  on  开

     
    this.formData.bgImg = '//sc01.alicdn.com/kf/HTB1gXlQXDjxK1Rjy0Fnq6yBaFXao.jpg'
    this.formData.bgRep =''  //背景平铺方式
    this.formData.bgPos ='' //背景对齐位置
    this.formData.bRadius ='' //圆角

    this.formData.href = ''
    this.formData.hrefMode ='_blank'  //是否新窗口
    
    this.formData.fFamily = 'arial' //字体
    this.formData.fontSize = 12
    this.formData.color = ''
    this.formData.bgColor = ''
    this.formData.lineHg =24  //行距
    this.formData.spacing =''  //letterSpacing // 字  距
    this.formData.indent =''  //textIndent 缩进
    
    this.formData.weight = 600 //加粗
    this.formData.fontStyle = 'normal' //斜体
    this.formData.oLine = '' //文字上边线 overline
    this.formData.lThrough = '' //文字中间线 line-through  
    this.formData.uLine = '' //文字下边线 underline 
    this.formData.align = 'left' //对齐

    this.formData.hoverMode = 'off' //鼠标移上开启

    this.formData.ffFamily = 'arial' //字体
    this.formData.ffontSize = 12
    this.formData.fcolor = ''
    this.formData.fbgColor = ''
    this.formData.flineHg =24  //行距
    this.formData.fspacing =''  //letterSpacing // 字  距
    this.formData.findent =''  //textIndent 缩进
    
    this.formData.fweight = 600 //加粗
    this.formData.ffontStyle = 'normal' //斜体
    this.formData.foLine = '' //文字上边线 overline
    this.formData.flThrough = '' //文字中间线 line-through  
    this.formData.fuLine = '' //文字下边线 underline 
    this.formData.falign = 'left' //对齐



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

    let $hrefModeCheckBox = $propPanel.find('input[type=checkbox][name=hrefMode]')
    $hrefModeCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.hrefMode = val ? '_blank' : ''
    })

    let $hoverModeRadio = $propPanel.find('input[type=radio][name=hoverMode]')
    $hoverModeRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.hoverMode = val
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
      },
      content: `<form class="layui-form" lay-filter="textComponentForm">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li class="layui-this">默认设置</li>
             <li>鼠标经过变换</li>
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
                <label class="layui-form-label">默认样式</label>
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
                    <div class="font-setting">
                      <span  title="加粗" class="font-item" data-l="checkbox" ><icon>ꕅ</icon></span>
                      <span  title="斜体" class="font-item" data-l="checkbox" ><icon>ꕆ</icon></span>
                      <span  title="上划线" class="font-item" data-l="checkbox" ><icon>ꔣ</icon></span>
                      <span  title="中划线" class="font-item active" data-l="checkbox"><icon>ꕇ</icon></span>
                      <span  title="下划线" class="font-item" data-l="checkbox" ><icon>ꕈ</icon></span>
                      <i class="spaceline"></i>
                      <span  title="文字左对齐" class="font-item" data-l="radio" ><icon>ꕉ</icon></span>
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
            </div>
            <div class="layui-tab-item">
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

  }
  updatePropPanel(){
    let $propPanel = this.$propPanel

    let $contentInput = $propPanel.find('input[type=text][name=content]')
    $contentInput.val(this.formData.content)
    let $hrefInput = $propPanel.find('input[type=text][name=href]')
    $hrefInput.val(this.formData.href)
    let $hrefModeCheckBox = $propPanel.find('input[type=checkbox][name=hrefMode]')
    if (this.formData.hrefMode === '_blank') {
      $hrefModeCheckBox.prop('checked', true)
    } else {
      $hrefModeCheckBox.prop('checked', false)
    }
    let $hoverModeRadio = $propPanel.find('input[type=radio][name=hoverMode]')
    $hoverModeRadio.filter(`[value="${this.formData.hoverMode}"]`).prop('checked', true)
  }
}
