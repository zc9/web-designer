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
    this.formData.hrefMode = '_blank'
    this.formData.bgImgSize = false
    this.formData.animSpeed = '1s'
    this.formData.animRange = '-s'
    this.formData.wangID = ''
    this.formData.bdRadius= ''
    this.formData.bdStyle= 'solid'

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
        //边框
        if (that.formData.bdColor) {
         let $bdColorInput=$layerElem.find('input[type=text][name=bdColor]')
         $bdColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.bdColor)
        } 
        if (that.formData.mbdColor) {
         let $mbdColorInput=$layerElem.find('input[type=text][name=mbdColor]')
         $mbdColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.mbdColor)
        } 

        $layerElem.find('.cancel-btn').on('click', function() {
          layer.close(index)
        })
        that.onLinkModeChanged($layerElem, that.formData.linkMode)
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
                  <input name="bdRadius" type="text" class="layui-input">
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">提示文字</label>
                <div class="layui-input-inline">
                  <input name="tipText" type="text" class="layui-input">
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
                        <input class="input-short"  type="text" name="mbdTsDur"  style="width:50px; height:23px; margin-left:10px; padding-left:5px;" />
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
    that.$content.css('border-radius', parseInt(formData.bdRadius))
    that.$content.css('border-color', formData.bdColor)


    if(formData.bdT==="on" && typeof(formData.bdWidth) !="undefined"){
      that.$content.css('border-top-style', formData.bdStyle)
      that.$content.css('border-top-width', parseInt(formData.bdWidth))
    }else{
      that.$content.css('border-top-width',0)
    }
    if(formData.bdB==="on" && typeof(formData.bdWidth) !="undefined"){
      that.$content.css('border-bottom-style', formData.bdStyle)
      that.$content.css('border-bottom-width', parseInt(formData.bdWidth))
    }else{
      that.$content.css('border-bottom-width',0)
    }
    if(formData.bdL==="on" && typeof(formData.bdWidth) !="undefined"){
      that.$content.css('border-left-style', formData.bdStyle)
      that.$content.css('border-left-width', parseInt(formData.bdWidth))
    }else{
      that.$content.css('border-left-width',0)
    }
    if(formData.bdR==="on" && typeof(formData.bdWidth) !="undefined"){
      that.$content.css('border-right-style', formData.bdStyle)
      that.$content.css('border-right-width', parseInt(formData.bdWidth))
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

    let $bdRadiusInput = $propPanel.find('input[type=text][name=bdRadius]')
    $bdRadiusInput.val(this.formData.bdRadius)
    let $bdColorInput = $propPanel.find('input[type=text][name=bdColor]')
    $bdColorInput.val(this.formData.bdColor)
    $bdColorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.bdColor)
    let $bdWidthInput = $propPanel.find('input[type=text][name=bdWidth]')
    $bdWidthInput.val(this.formData.bdWidth)
    let $bdStyleRadio = $propPanel.find('input[type=radio][name=bdStyle]')
    $bdStyleRadio.filter(`[value="${this.formData.bdStyle}"]`).prop('checked', true)

    let $bdTRadio = $propPanel.find('input[type=checkbox][name=bdT]')
    let $bdTVal=this.formData.bdT === 'on' ? true : false;
        $bdTRadio.prop('checked', $bdTVal)
    let $bdBRadio = $propPanel.find('input[type=checkbox][name=bdB]')
    let $bdBVal=this.formData.bdB === 'on' ? true : false;
        $bdBRadio.prop('checked', $bdBVal)
    let $bdLRadio = $propPanel.find('input[type=checkbox][name=bdL]')
    let $bdLVal=this.formData.bdL === 'on' ? true : false;
        $bdLRadio.prop('checked', $bdLVal)
    let $bdRRadio = $propPanel.find('input[type=checkbox][name=bdR]')
    let $bdRVal=this.formData.bdR === 'on' ? true : false;
        $bdRRadio.prop('checked', $bdRVal)

  }

  initPorpPanel() {
    let that = this
    $('.prop-setting-ct > div').hide()
    let $propPanel = $('.img-com-prop-panel')
    this.$propPanel = $propPanel

    $propPanel.show()
    $propPanel.find('*').off()

    this.updatePropPanel()
    //收缩 重新加载
    let element = layui.element
    element.render("collapse")

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
    let $bdRadiusInput = $propPanel.find('input[type=text][name=bdRadius]')
    $bdRadiusInput.change(function() {
      that.formData.bdRadius = $(this).val()
      that.update(that.formData)
    })
    let $bdWidthInput = $propPanel.find('input[type=text][name=bdWidth]')
    $bdWidthInput.change(function() {
      that.formData.bdWidth = $(this).val()
      that.update(that.formData)
    })
    let $bdColorInput = $propPanel.find('input[type=text][name=bdColor]')
    $bdColorInput.change(function() {
      that.formData.bdColor = $(this).val()
      that.update(that.formData)
    })
    let $bdStyleRadio = $propPanel.find('input[type=radio][name=bdStyle]')
    $bdStyleRadio.change(function() {
      that.formData.bdStyle = $(this).prop('value')
      that.update(that.formData)
    })
    let $bdTCheckBox = $propPanel.find('input[type=checkbox][name=bdT]')
    $bdTCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bdT = val ? 'on' : 'off'
      that.update(that.formData)
    })
    let $bdBCheckBox = $propPanel.find('input[type=checkbox][name=bdB]')
    $bdBCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bdB = val ? 'on' : 'off'
      that.update(that.formData)
    })
    let $bdLCheckBox = $propPanel.find('input[type=checkbox][name=bdL]')
    $bdLCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bdL = val ? 'on' : 'off'
      that.update(that.formData)
    })
    let $bdRCheckBox = $propPanel.find('input[type=checkbox][name=bdR]')
    $bdRCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bdR = val ? 'on' : 'off'
      that.update(that.formData)
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
