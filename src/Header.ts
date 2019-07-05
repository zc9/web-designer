export default class Header {
  $el: JQuery
  constructor() {
    this.$el = $('.header')
    let that = this;
    this.$el.find('.export-btn').bind('click', function() {
      that.openExportDialog()
    })
  }

  openExportDialog() {
    let that = this;
    let $layerElem = null;
    let layer = layui.layer;
    let layerNo = layer.open({
      type: 1,
      title: '生成代码',
      skin: 'layui-layer-rim', //加上边框
      area: ['600px', '550px'],
      success: function(layerElem, index) {
        $layerElem = $(layerElem)
      },
      content: `<form class="layui-form" lay-filter="imgComponentForm">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li class="layui-this">内容设置</li>
            <li>动画设置</li>
          </ul>
          <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">

            </div>
            <div class="layui-tab-item" style="min-height: 356px">
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
  }
}
