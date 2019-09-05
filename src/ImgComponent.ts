import Component from './Component';
export default class ImgComponent extends Component {
  $content: JQuery
  $img: JQuery
  constructor() {
    super('img-component')
    this.$content = $('<a><img src="" style="display:none"></a>')
    this.$img = this.$content.find('img')
    this.$contentBox.append(this.$content)
    let that = this;
    this.$topBar.find('.setting').bind('click', function() {
      that.openEditDialog();
    })
    this.$el.dblclick(function() {
      that.openEditDialog();
    })
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
    this.formData.hrefMode = false
    this.formData.bgImgSize = false
    this.formData.animSpeed = '1s'
    this.formData.animRange = '-s'
    this.formData.wangID = ''

    this.$content.css('background-image', `url(${this.formData.bgImg})`)
    this.$content.css('background-color', this.formData.bgColor)
    this.$img.attr('src', this.formData.bgImg)
  }

  onLinkModeChanged($layerElem, linkMode) {
    let $wangIDInputBox = $layerElem.find('.wangID-input-box')
    let $hrefInputBox = $layerElem.find('.href-input-box')
    if (linkMode === 'urlink') {
      $wangIDInputBox.hide()
      $hrefInputBox.show()
    } else if (linkMode === 'wwlink') {
      $hrefInputBox.hide()
      $wangIDInputBox.show()
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
                  <div class="sp-replacer sp-light">
                    <div class="sp-preview">
                      <div class="sp-preview-inner"></div>
                    </div>
                  </div>
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
              <div class="layui-form-item href-input-box" style="display:none">
                <label class="layui-form-label">链接地址</label>
                <div class="layui-input-inline">
                  <input name="href" type="text" class="layui-input">
                </div>
                <div><input name="hrefMode" value="_blank" type="checkbox" lay-skin="primary" title="新窗口打开"></div>
              </div>
              <div class="layui-form-item wangID-input-box" style="display:none">
                <label class="layui-form-label">旺旺ID</label>
                <div class="layui-input-inline">
                  <input name="wangID" type="text" class="layui-input">
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
            tesss
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
      if (data.field.bgImg !== that.formData.bgImg) {
        that.$content.css('background-image', `url(${data.field.bgImg})`)
        that.$img.attr('src', data.field.bgImg)
      }
      if (data.field.bgColor !== that.formData.bgColor) {
        that.$content.css('background-color', data.field.bgColor)
      }
      that.formData = data.field;
      if (that.formData.bgImgSize === 'true') {
        that.$el.width(that.$img.width())
        that.$el.height(that.$img.height())
      }
      let imgMode = that.formData.imgMode
      if (imgMode === 'cut') {
        if (that.$img.is(':visible')) {
          that.$content.css('background-image', `url(${that.formData.bgImg})`)
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

      that.formData.animType = $layerElem.find('.animselect > div.active').data('val')
      console.log(that.formData)
      layer.close(layerNo)
      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    form.val('imgComponentForm', that.formData)
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
