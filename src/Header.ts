import StageContainer from "./StageContainer";

export default class Header {
  $el: JQuery
  stageCt: StageContainer
  constructor(stageCt: StageContainer) {
    this.stageCt = stageCt
    this.$el = $('.header')
    let that = this;
    this.$el.find('.export-btn').bind('click', function() {
      that.openExportDialog()
    })
    this.$el.find('.import-btn').bind('click', function() {
      that.openImportDialog()
    })
    this.$el.find('.undo-btn').bind('click', function() {
      that.stageCt.curStage.backOps()
      console.log(that.stageCt.curStage.history.curIndex)
    })

    this.$el.find('.redo-btn').bind('click', function() {

      that.stageCt.curStage.forwardOps()
      console.log(that.stageCt.curStage.history.curIndex)
    })

    this.$el.find('.preview-btn').bind('click', function() {
      let previewWin = window.open('')
      let url = window.location.href
      previewWin.document.write(`<html><head><title></title><link rel="stylesheet" type="text/css" href="${url}css/common.css"></head><body>`);
      previewWin.document.write(that.stageCt.curStage.generateHtmlCode());
      previewWin.document.write('</body></html>');
      previewWin.focus()
      previewWin.document.title = '预览'
    })

  }

  generateJsonCode() {
    let curStage = this.stageCt.curStage
  }

  openImportDialog() {
    let that = this;
    let layer = layui.layer;
    let layerNo = layer.open({
      type: 1,
      title: '导入代码',
      skin: 'layui-layer-rim', //加上边框
      area: ['600px', '550px'],
      success: function(layerElem, index) {
        let $layerElem = $(layerElem)
        let $jsonTextArea = $layerElem.find('#jsonTextArea')
        $layerElem.find('.confirm-btn').bind('click', function() {
          let jsonStr = $jsonTextArea.val().toString()
          let jsonObj = JSON.parse(jsonStr)
          that.stageCt.curStage.loadProp(jsonObj)
          layer.close(index)
        })
        $layerElem.find('.cancel-btn').on('click', function() {
          layer.close(index)
        })
      },
      content: `
        <div class="codegen" style="padding: 15px 10px">
          <div class="layui-tab">
            <ul class="layui-tab-title" style="font-size: 12px">
              <li style="font-size: 12px" class="layui-this">覆盖导入</li>
              <li style="font-size: 12px">追加导入</li>
            </ul>
            <div class="layui-tab-content">
              <div class="layui-tab-item layui-show">
                <textarea id="jsonTextArea"style="float:left;width:100%;height:320px;" spellcheck="false"></textarea>
              </div>
              <div class="layui-tab-item">
                <textarea id="htmlTextArea"style="float:left;width:100%;height:320px;" spellcheck="false"></textarea>
              </div>
            </div>
          </div>
          <div class="layui-form-item" style="margin-top:15px;">
            <div class="layui-ft-btn" style="text-align:center;padding-top: 20px">
              <button class="layui-btn confirm-btn">确定</button>
              <button type="button" class="cancel-btn layui-btn layui-btn-primary">取消</button>
            </div>
          </div>
        </div>`
    });

  }

  openExportDialog() {
    let that = this;
    let layer = layui.layer;
    let layerNo = layer.open({
      type: 1,
      title: '生成代码',
      skin: 'layui-layer-rim', //加上边框
      area: ['600px', '550px'],
      success: function(layerElem, index) {
        let $layerElem = $(layerElem)
        let $jsonTextArea = $layerElem.find('#jsonTextArea')
        let $htmlTextArea = $layerElem.find('#htmlTextArea')
        let jsonCodeStr = that.stageCt.curStage.generateJsonCode()
        let jsonCodeObj = JSON.parse(jsonCodeStr)
        $jsonTextArea.val(jsonCodeStr)
        $htmlTextArea.val(that.stageCt.curStage.generateHtmlCode())
        $layerElem.find('.page-width').val(that.stageCt.curStage.pageWidth)
        $layerElem.find('.page-height').val(that.stageCt.curStage.pageHeight)
        let $codeSize = $layerElem.find('.code-size')
        $codeSize.text((jsonCodeStr.length / 1024).toFixed(2))
        let $curSelectedRadio = null
        if (jsonCodeObj.overflow === 'hidden') {
          $curSelectedRadio = $layerElem.find('.cfgl-radio-hidden')
          $curSelectedRadio.addClass('cfgl-radio-checked')
        } else {
          $curSelectedRadio = $layerElem.find('.cfgl-radio-visible')
          $curSelectedRadio.addClass('cfgl-radio-checked')
        }
        $layerElem.find('.cfgl-radio').bind('click', function() {
          let $this = $(this)
          if ($curSelectedRadio == $this) {
            return
          }
          $curSelectedRadio.removeClass('cfgl-radio-checked')
          $curSelectedRadio = $this
          $curSelectedRadio.addClass('cfgl-radio-checked')
          let k = $curSelectedRadio.data('k')
          jsonCodeObj.overflow = k
          $jsonTextArea.val(JSON.stringify(jsonCodeObj))
        })

        $layerElem.find('.copy-box button').bind('click', function() {
          // @ts-ignore 
          $jsonTextArea[0].select()
          document.execCommand('copy')
        })

      },
      content: `
        <div class="codegen" style="padding: 15px 10px">
          <div class="codegen-head">
            <ul>
              <li>
                <label><span style="margin-left:10px;">当前模块宽</span>&nbsp;</label>
                <input class="page-width" style="width:40px;" type="text" spellcheck="false">
                <label>&nbsp;&nbsp;高&nbsp;</label>
                <input class="page-height" style="width:40px;" type="text" spellcheck="false">
                <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当内容超出模块范围时：&nbsp;</label>
                <div id="rm_o1">
                  <input class="cfgl-rr" type="radio" id="m_o2" name="overflowMode" value="visible" spellcheck="false">
                  <label class="cfgl-radio cfgl-radio-visible" for="m_o2" data-k="visible" style="border-right:none;border-radius:2px 0 0 2px;">显示</label>
                  <input class="cfgl-rr" type="radio" id="m_o1" name="overflowMode" checked="checked" value="hidden" spellcheck="false">
                  <label class="cfgl-radio cfgl-radio-hidden" for="m_o1" data-k="hidden" style="border-left:none;border-radius:0 2px 2px 0;">裁掉</label>
                </div>
              </li>
            </ul>
          </div>
          <div class="layui-tab">
            <ul class="layui-tab-title" style="font-size: 12px;display: none;">
              <li style="font-size: 12px" class="layui-this">JSON代码</li>
              <li style="font-size: 12px" style="">HTML代码</li>
            </ul>
            <div class="layui-tab-content">
              <div class="layui-tab-item layui-show">
                <textarea id="jsonTextArea"style="float:left;width:100%;height:300px;" readonly spellcheck="false"></textarea>
              </div>
              <div class="layui-tab-item">
                <textarea id="htmlTextArea"style="float:left;width:100%;height:300px;" readonly spellcheck="false"></textarea>
              </div>
            </div>
          </div>
          <div class="code-size-box"><span>代码量:</span><span><span class="code-size">0</span>KB</span></div>
          <div class="copy-box"><button type="button" class="layui-btn layui-btn-sm layui-btn-primary">复制代码</button></div>
        </div>`
    });
  }
}
