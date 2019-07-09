import Component from './Component';
export default class ImgComponent extends Component {
  $content: JQuery
  constructor() {
    super('img-component')
    this.$content = $('<a></a>')
    this.$contentBox.append(this.$content)
    let that = this;
    this.$topBar.find('.setting').bind('click', function() {
      that.openEditDialog();
    })
    this.initFormData()
  }

  initFormData() {
    this.formData.bgImg = 'https://img.alicdn.com/imgextra/i2/280837244/TB2orubcrJmpuFjSZFwXXaE4VXa-280837244.jpg'
    this.formData.bgColor = ''
    this.formData.appLabel = ''
    this.formData.imgMode = 'cut'
    this.formData.linkMode = 'unlink'
    this.formData.href = ''
    this.formData.tipText = ''
    this.formData.animType = ''
    this.formData.hrefMode = false
    this.formData.bgImgSize = false
    this.formData.animSpeed = '1s'
    this.formData.animRange = '-s'

    this.$content.css('background-image', `url(${this.formData.bgImg})`)
  }

  openEditDialog() {
    let that = this;
    let layer = layui.layer;
    let $layerElem = null;
    let layerNo = layer.open({
      type: 1,
      title: '单图设置',
      skin: 'layui-layer-rim', //加上边框
      area: ['600px', '550px'],
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
      },
      content: `<form class="layui-form" lay-filter="imgComponentForm">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li class="layui-this">内容设置</li>
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
                <div class="layui-input-inline" style="position:relative">
                  <div class="sp-replacer sp-light" style="z-index: 2;bottom: auto;top: 10px">
                    <div class="sp-preview">
                      <div class="sp-preview-inner"></div>
                    </div>
                  </div>
                  <input style="text-indent:28px;" name="bgColor" type="text" class="layui-input pagecolor">
                  <span class="clear-color-button" style="right: 5px"></span>
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">链接类型</label>
                <div class="layui-input-inline">
                  <input type="radio" name="linkMode" value="urlink" title="普通" checked="">
                  <input type="radio" name="linkMode" value="wwlink" title="旺旺">
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">链接地址</label>
                <div class="layui-input-inline">
                  <input name="href" type="text" class="layui-input">
                </div>
                <div><input name="hrefMode" value="true" type="checkbox" lay-skin="primary" title="新窗口打开"></div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">提示文字</label>
                <div class="layui-input-inline">
                  <input name="tipText" type="text" class="layui-input">
                </div>
              </div>
            </div>
            <div class="layui-tab-item" style="min-height: 356px">
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
                <label class="layui-form-label">链接类型</label>
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
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-input-block" style="margin-left: 440px;">
            <button class="layui-btn" lay-submit lay-filter="imgComponentForm">确定</button>
            <button type="button" class="cancel-btn layui-btn layui-btn-primary">取消</button>
          </div>
        </div>
      </form>`
    });
    var form = layui.form
    form.render();

    form.on('submit(imgComponentForm)', function(data) {
      if (data.field.bgImg !== that.formData.bgImg) {
        that.$content.css('background-image', `url(${data.field.bgImg})`)
      }
      that.formData = data.field;
      that.formData.animType = $layerElem.find('.animselect > div.active').data('val')
      console.log(that.formData)
      layer.close(layerNo)
      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    form.val('imgComponentForm', that.formData)
  }
  getProps() {
    console.log(this.formData)
    return {
      'appType': 'xdtb',
      'config': this.formData,
      'pos': {
        w: this.width(),
        h: this.height(),
        l: parseInt(this.$el.css('left')),
        t: parseInt(this.$el.css('top'))
      }
    }
  }
}
