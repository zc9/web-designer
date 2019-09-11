import Component from './Component';
export default class ImgComponent extends Component {
  $content: JQuery
  $img: JQuery
  constructor() {
    super('img-component')
    this.$content = $('<a><img src="" style="display:none"></a>')
    this.$img = this.$content.find('img')
    this.$contentBox.append(this.$content)
    this.initFormData()
  }

  toHtml() {
    let top, left, width, height
    top = this.$el.css('top')
    left = this.$el.css('left')
    width = this.$el.width()
    height = this.$el.height()
    let img = ''
    let background = `url(${this.formData.bgImg}) 50% 50% no-repeat;`
    if (this.formData.imgMode === 'cut') {
      background = `url(${this.formData.bgImg}) 50% 50% no-repeat;`
    } else {
      img = this.$img[0].outerHTML
    }
    return `
      <a href="${this.formData.href}" target="${this.formData.hrefMode || ''}" style="position: absolute; top: ${top}; left: ${left}; width: ${width}px; height: ${height}px;background: ${background}">
        ${img}
      </a>
    `
  }

  initFormData() {
    this.formData.bgImg = 'https://img.alicdn.com/imgextra/i2/280837244/TB2orubcrJmpuFjSZFwXXaE4VXa-280837244.jpg'
    this.formData.bgColor = ''
    this.formData.appLabel = ''
    this.formData.imgMode = 'cut'
    this.formData.linkMode = 'urlink'
    this.formData.href = ''
    this.formData.tipText = ''
    this.formData.animType = ''
    this.formData.hrefMode = true
    this.formData.bgImgSize = false
    this.formData.animSpeed = '1s'
    this.formData.animRange = '-s'
    this.formData.wangID = ''
    this.formData.borderRadius= ''
    this.formData.borderStyle= 'solid'

    this.$content.css('background-image', `url(${this.formData.bgImg})`)
    this.$content.css('background-color', this.formData.bgColor)
    this.$img.attr('src', this.formData.bgImg)
  }

  onLinkModeChanged($layerElem, linkMode) {
    let $wangBox = $layerElem.find('.wang-box')
    let $linkBox = $layerElem.find('.link-box')
    if (linkMode === 'urlink') {
      $wangBox.hide()
      $linkBox.show()
    } else if (linkMode === 'wwlink') {
      $linkBox.hide()
      $wangBox.show()
    }
  }

  openEditDialog() {
    let that = this;
    let layer = layui.layer;
    let $layerElem = null;
    let layerNo = layer.open({
      type: 1,
      title: '单图设置',
      skin: 'layui-layer-rim', //加上边框
      area: ['600px', '600px'],
      success: function(layerElem, index) {
        $layerElem = $(layerElem)
        if (typeof that.formData.animType === 'undefined') {
          that.formData.animType = ''
        }
        $layerElem.find(`.animselect > div[data-val="${that.formData.animType}"]`).addClass('active')
        $layerElem.find('.animselect > div').on('click', function() {
          $layerElem.find('.animselect > div.active').removeClass('active')
          $(this).addClass('active')
        })

        if (that.formData.bgColor) {
          $layerElem.find('.sp-preview-inner').css('background-color', that.formData.bgColor)
        }
        $layerElem.find('.cancel-btn').on('click', function() {
          layer.close(index)
        })
        that.onLinkModeChanged($layerElem, that.formData.linkMode)

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
              <div class="layui-form-item">
                <label class="layui-form-label">应用名称</label>
                <div class="layui-input-inline">
                  <input type="text" name="appLabel" class="layui-input">
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">图片地址</label>
                <div class="layui-input-inline">
                  <input name="bgImg" type="text" class="layui-input">
                </div>
                <div><input name="bgImgSize" value="true" type="checkbox" lay-skin="primary" title="自动宽高"></div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">图片显示方式</label>
                <div class="layui-input-inline">
                  <select name="imgMode">
                    <option value="cut">保持原图尺寸</option>
                    <option value="full">自由拉伸</option>
                    <option value="scaleX">保持比例(只裁剪宽度)</option>
                    <option value="scaleY">保持比例(只裁剪高度)</option>
                  </select>
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">背景颜色</label>
                <div class="layui-input-inline pagecolorpanel"  >
                  <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner"></div></div></div>
                  <input name="bgColor" type="text" class="layui-input pagecolor">
                  <span class="clear-color-button"></span>
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">链接类型</label>
                <div class="layui-input-inline">
                  <input type="radio" name="linkMode" lay-filter="linkMode" value="urlink" title="普通" checked="">
                  <input type="radio" name="linkMode" lay-filter="linkMode" value="wwlink" title="旺旺">
                </div>
              </div>
              <div class="layui-form-item link-box" style="display:none">
                <label class="layui-form-label">链接地址</label>
                <div class="layui-input-inline">
                  <input name="href" type="text" class="layui-input">
                </div>
                <div><input name="hrefMode" value="_blank" type="checkbox" lay-skin="primary" title="新窗口打开"></div>
              </div>
              <div class="layui-form-item wang-box" style="display:none">
                <label class="layui-form-label">旺旺ID</label>
                <div class="layui-input-inline">
                  <input name="wangID" type="text" class="layui-input">
                </div>
              </div>
              <div class="layui-form-item"  >
                <label class="layui-form-label">圆角度数</label>
                <div class="layui-input-inline">
                  <input name="borderRadius" type="text" class="layui-input">
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">提示文字</label>
                <div class="layui-input-inline">
                  <input name="tipText" type="text" class="layui-input">
                </div>
              </div>
            </div>
            <div class="layui-tab-item">


              <fieldset class="layui-elem-field">
                <legend>默认边框</legend>
                <div class="layui-field-box">
                  <div class="layui-form-item"  >
                    <label class="layui-form-label">边框显示</label>
                    <div class="layui-input-block">
                      <input type="checkbox" name="borderT" value="true" lay-skin="primary" title="上边"  >
                      <input type="checkbox" name="borderB" value="true" lay-skin="primary" title="下边">
                      <input type="checkbox" name="borderL" value="true" lay-skin="primary" title="左边" >
                      <input type="checkbox" name="borderR" value="true" lay-skin="primary" title="右边"  >
                    </div>
                  </div>
                  <div class="layui-form-item"  >
                    <label class="layui-form-label">边框粗细</label>
                    <div class="layui-input-inline input-short"><input name="borderWidth" type="text" class="layui-input"></div>
                    <label class="layui-form-label">边框颜色</label>
                    <div class="layui-input-inline pagecolorpanel input-short"  >
                      <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner"></div></div></div>
                      <input name="borderColor" type="text" class="layui-input pagecolor">
                      <span class="clear-color-button"></span>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">边框样式</label>
                    <div class="layui-input-block">
                      <input type="radio" name="borderStyle" lay-filter="borderStyle" value="solid" title="实线" checked="">
                      <input type="radio" name="borderStyle" lay-filter="borderStyle" value="dotted" title="细虚线">
                      <input type="radio" name="borderStyle" lay-filter="borderStyle" value="dashed" title="粗虚线">
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="layui-elem-field"    style="margin-top:15px;">
                <legend>
                  <span  style="margin-right:15px;  display:inline-block"> 鼠标_移上边框 </span>
                  <button type="button" class="layui-btn layui-btn-sm">同步默认边框</button>
                </legend>
                <div class="layui-field-box">
                  <div class="layui-form-item"  >
                    <label class="layui-form-label">边框显示</label>
                    <div class="layui-input-block">
                      <input type="checkbox" name="ddd" lay-skin="primary" title="上边" >
                      <input type="checkbox" name="like1[read]" lay-skin="primary" title="下边">
                      <input type="checkbox" name="like1[game]" lay-skin="primary" title="左边" >
                      <input type="checkbox" name="like1[game]" lay-skin="primary" title="右边"  >
                    </div>
                  </div>
                  <div class="layui-form-item"  >
                    <label class="layui-form-label">边框粗细</label>
                    <div class="layui-input-inline input-short"><input name="mbdWidth" type="text" class="layui-input"></div>
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
                      <input type="radio" name="mbdStyle" lay-filter="mbdStyle" value="1" title="实线" checked="">
                      <input type="radio" name="mbdStyle" lay-filter="mbdStyle" value="2" title="细虚线">
                      <input type="radio" name="mbdStyle" lay-filter="mbdStyle" value="3" title="粗虚线">
                    </div>
                  </div>
                </div>
              </fieldset>

            </div>
            <div class="layui-tab-item"  >
               阴影外框
            </div>
            <div class="layui-tab-item"  >
              <div class="layui-form-item">
                <label class="layui-form-label">动画效果</label>
                <div class="layui-input-inline">
                  <div class="animselect ui-buttonset">
                    <div class="none" data-val=""><i><em></em></i>无效果</div>
                    <div class="shakex" data-val="xins-x-shake"><i><em></em></i>左右抖动</div>
                    <div class="shakey" data-val="xins-y-shake"><i><em></em></i>上下抖动</div>
                    <div class="shaker" data-val="xins-r-shake"><i><em></em></i>旋转摆动</div>
                    <div class="shakes" data-val="xins-s-shake"><i><em></em></i>弹性缩放</div>
                    <div class="shaken" data-val="xins-n-shake"><i><em></em></i>弹性果冻</div>
                  </div>
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">动画幅度</label>
                <div class="layui-input-inline">
                  <input type="radio" name="animRange" value="-s" title="弱" checked="">
                  <input type="radio" name="animRange" value="-m" title="中">
                  <input type="radio" name="animRange" value="-l" title="强">
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">图片显示方式</label>
                <div class="layui-input-inline">
                  <select name="animSpeed">
                    <option value="1s" selected="">1秒</option>
                    <option value="2s">2秒</option>
                    <option value="3s">3秒</option>
                    <option value="4s">4秒</option>
                    <option value="5s">5秒</option>
                    <option value="6s">6秒</option>
                    <option value="7s">7秒</option>
                    <option value="8s">8秒</option>
                    <option value="9s">9秒</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-ft-btn">
            <button class="layui-btn" lay-submit lay-filter="imgComponentForm">确定</button>
            <button type="button" class="cancel-btn layui-btn layui-btn-primary">取消</button>
          </div>
        </div>
      </form>`
    });
    var form = layui.form
    form.render();

    form.on('radio(linkMode)', function(data){
      console.log(data)
      that.onLinkModeChanged($layerElem, data.value)
    })

    form.on('submit(imgComponentForm)', function(data) {
      that.formData = data.field;
      that.update(that.formData)
      that.updatePropPanel()
      that.formData.animType = $layerElem.find('.animselect > div.active').data('val')
      console.log(that.formData)
      layer.close(layerNo)
      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    form.val('imgComponentForm', that.formData)
  }

  update(formData) {
    let that = this
    that.$content.css('background-image', `url(${formData.bgImg})`)
    that.$img.attr('src', formData.bgImg)
    that.$content.css('background-color', formData.bgColor)
    that.$content.css('border-radius', parseInt(formData.borderRadius))
    that.$content.css('border-color', formData.borderColor)
    
    
    if(formData.borderT==="true" && typeof(formData.borderWidth) !="undefined"){
      that.$content.css('border-top-style', formData.borderStyle)
      that.$content.css('border-top-width', parseInt(formData.borderWidth)) 
    }else{
      that.$content.css('border-top-width',0)
    }
    if(formData.borderB==="true" && typeof(formData.borderWidth) !="undefined"){
      that.$content.css('border-bottom-style', formData.borderStyle)
      that.$content.css('border-bottom-width', parseInt(formData.borderWidth)) 
    }else{
      that.$content.css('border-bottom-width',0)
    }
    if(formData.borderL==="true" && typeof(formData.borderWidth) !="undefined"){
      that.$content.css('border-left-style', formData.borderStyle)
      that.$content.css('border-left-width', parseInt(formData.borderWidth)) 
    }else{
      that.$content.css('border-left-width',0)
    }
    if(formData.borderR==="true" && typeof(formData.borderWidth) !="undefined"){
      that.$content.css('border-right-style', formData.borderStyle)
      that.$content.css('border-right-width', parseInt(formData.borderWidth)) 
    }else{
      that.$content.css('border-right-width',0)
    }

    that.$img.bind('load', function() {
      if (formData.bgImgSize === 'true') {
        that.$el.width(that.$img.width())
        that.$el.height(that.$img.height())
      }
    })
    let imgMode = formData.imgMode
    if (imgMode === 'cut') {
      if (that.$img.is(':visible')) {
        that.$content.css('background-image', `url(${formData.bgImg})`)
        that.$img.hide()
      }
    } else {
      that.$content.css('background-image', '')
      if (imgMode === 'full') {
        that.$img.css('width', '100%')
        that.$img.css('height', '100%')
      } else if (imgMode === 'scaleX') {
        that.$img.css('height', '100%')
        that.$img.css('width', '')
      } else if (imgMode === 'scaleY') {
        that.$img.css('width', '100%')
        that.$img.css('height', '')
      }
      that.$img.show()
    }
  }

  updatePropPanel() {
    let $propPanel = this.$propPanel
    let $bgImgInput = $propPanel.find('#bgImgInput')
    $bgImgInput.val(this.formData.bgImg)
    let $bgImgSizeCheckBox = $propPanel.find('input[type=checkbox][name=bgImgSize]')
    if (this.formData.bgImgSize === 'true') {
      $bgImgSizeCheckBox.prop('checked', true)
    } else {
      $bgImgSizeCheckBox.prop('checked', false)
    }
    let $imgModeSelect = $propPanel.find('#imgMode')
    $imgModeSelect.val(this.formData.imgMode)
    let $linkModeRadio = $propPanel.find('input[type=radio][name=linkMode]')
    $linkModeRadio.filter(`[value="${this.formData.linkMode}"]`).prop('checked', true)
    let $hrefInput = $propPanel.find('input[type=text][name=href]')
    $hrefInput.val(this.formData.href)
    let $wangIDInput = $propPanel.find('input[type=text][name=wangID]')
    $wangIDInput.val(this.formData.wangID)

    let $hrefModeCheckBox = $propPanel.find('input[type=checkbox][name=hrefMode]')
    if (this.formData.hrefMode === '_blank') {
      $hrefModeCheckBox.prop('checked', true)
    } else {
      $hrefModeCheckBox.prop('checked', false)
    }
    this.onLinkModeChanged($propPanel, this.formData.linkMode)

    let $borderRadiusInput = $propPanel.find('input[type=text][name=borderRadius]')
    $borderRadiusInput.val(this.formData.borderRadius)
    let $borderColorInput = $propPanel.find('input[type=text][name=borderColor]')
    $borderColorInput.val(this.formData.borderColor)
    $borderColorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.borderColor)
    let $borderWidthInput = $propPanel.find('input[type=text][name=borderWidth]')
    $borderWidthInput.val(this.formData.borderWidth)
    let $borderStyleRadio = $propPanel.find('input[type=radio][name=borderStyle]')
    $borderStyleRadio.filter(`[value="${this.formData.borderStyle}"]`).prop('checked', true)

    let $borderTRadio = $propPanel.find('input[type=checkbox][name=borderT]')
    let $borderTVal=this.formData.borderT === 'true' ? true : false;
        $borderTRadio.prop('checked', $borderTVal)
    let $borderBRadio = $propPanel.find('input[type=checkbox][name=borderB]')
    let $borderBVal=this.formData.borderB === 'true' ? true : false;
        $borderBRadio.prop('checked', $borderBVal)
    let $borderLRadio = $propPanel.find('input[type=checkbox][name=borderL]')
    let $borderLVal=this.formData.borderL === 'true' ? true : false;
        $borderLRadio.prop('checked', $borderLVal)
    let $borderRRadio = $propPanel.find('input[type=checkbox][name=borderR]')
    let $borderRVal=this.formData.borderR === 'true' ? true : false;
        $borderRRadio.prop('checked', $borderRVal)

  }

  initPorpPanel() {
    console.log('initPorpPanel')
    let that = this
    $('.prop-setting-ct > div').hide()
    let $propPanel = $('.img-com-prop-panel')
    this.$propPanel = $propPanel

    $propPanel.show()
    $propPanel.find('*').off()

    this.updatePropPanel()

    let $bgImgInput = $propPanel.find('#bgImgInput')
    $bgImgInput.change((function() {
      that.formData.bgImg = $bgImgInput.val()
      that.update(that.formData)
    }))

    let $bgImgSizeCheckBox = $propPanel.find('input[type=checkbox][name=bgImgSize]')
    $bgImgSizeCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bgImgSize = val ? 'true' : 'false'
      that.update(that.formData)
    });

    let $imgMode = $propPanel.find('#imgMode')
    $imgMode.change(function() {
      that.formData.imgMode = $(this).val()
      that.update(that.formData)
    })

    let $linkModeRadio = $propPanel.find('input[type=radio][name=linkMode]')
    $linkModeRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.linkMode = val
      that.onLinkModeChanged($propPanel, that.formData.linkMode)
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
    let $borderRadiusInput = $propPanel.find('input[type=text][name=borderRadius]')
    $borderRadiusInput.change(function() {
      that.formData.borderRadius = $(this).val()
      that.update(that.formData)
    })
    let $borderWidthInput = $propPanel.find('input[type=text][name=borderWidth]')
    $borderWidthInput.change(function() {
      that.formData.borderWidth = $(this).val()
      that.update(that.formData)
    })
    let $borderColorInput = $propPanel.find('input[type=text][name=borderColor]')
    $borderColorInput.change(function() {
      that.formData.borderColor = $(this).val()
      that.update(that.formData)
    })
    let $borderStyleRadio = $propPanel.find('input[type=radio][name=borderStyle]')
    $borderStyleRadio.change(function() {
      that.formData.borderStyle = $(this).prop('value')
      that.update(that.formData)
    })
    let $borderTCheckBox = $propPanel.find('input[type=checkbox][name=borderT]')
    $borderTCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.borderT = val ? 'true' : 'false'
      that.update(that.formData)
    })
    let $borderBCheckBox = $propPanel.find('input[type=checkbox][name=borderB]')
    $borderBCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.borderB = val ? 'true' : ''
      that.update(that.formData)
    })
    let $borderLCheckBox = $propPanel.find('input[type=checkbox][name=borderL]')
    $borderLCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.borderL = val ? 'true' : ''
      that.update(that.formData)
    })
    let $borderRCheckBox = $propPanel.find('input[type=checkbox][name=borderR]')
    $borderRCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.borderR = val ? 'true' : ''
      that.update(that.formData)
    })
    $propPanel.find('.editor-btns').on('click', function() {
      that.openEditDialog()
    })
  }

  getProps() {
    let config = this.formData;
    config.appID = `${this.stage.id}-${this.id}`
    return {
      'appType': 'xdtb',
      'config': config,
      'pos': {
        w: this.width(),
        h: this.height(),
        l: parseInt(this.$el.css('left')),
        t: parseInt(this.$el.css('top'))
      }
    }
  }
}
