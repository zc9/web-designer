import Component from './Component'
require('./assets/wang2.gif')
require('./assets/wang1.gif')
export default class WangComponent extends Component {
  $content: JQuery
  $wangImg: JQuery
  constructor() {
    super('VideoComponent')
   this.$content = $('<div class="video-box"><Video style="width: 450, height:200"   src="https://cloud.video.taobao.com/play/u/2780279213/p/1/e/6/t/1/d/ld/36255062.mp4" /></div>')
    this.$contentBox.append(this.$content)
    this.initFormData()
  }

  toHtml() {
    return ''
  }

  initFormData() {
    this.formData.appLabel = ''
    this.formData.videoID = ''         //视频地址(ID)
    this.formData.autoplay = 'false'     //是否自动播放
    this.formData.muted = 'false'        //是否静音
    this.formData.controls = 'true'        // 是否显示播放器控制条

    this.formData.autoControls = 'false'    //鼠标移动到视频上才展示控制条
 
    this.formData.coverImg = '' //封面
    this.update(this.formData)
  }
 
  initPorpPanel() {
    console.log('initPorpPanel')
    let that = this
    $('.prop-setting-ct > div').hide()
    let $propPanel = $('.video-com-prop-panel')
    this.$propPanel = $propPanel

    $propPanel.show()
    $propPanel.find('*').off()
    this.updatePropPanel()
 
    let $videoIDInput = $propPanel.find('input[type=text][name=videoID]') 
    $videoIDInput.change(function() {
      let val = $(this).val()
      that.formData.videoID = val
    })
 

    let $coverImgInput = $propPanel.find('input[type=text][name=coverImg]') 
    $coverImgInput.change(function() {
      let val = $(this).val()
      that.formData.coverImg = val
    })
    let $autoplayRadio = $propPanel.find('input[type=radio][name=autoplay]')
    $autoplayRadio.change(function() {
      that.formData.autoplay = $(this).prop('value')
      that.update(that.formData)
    })
    let $mutedRadio = $propPanel.find('input[type=radio][name=muted]')
    $mutedRadio.change(function() {
      that.formData.muted = $(this).prop('value')
      that.update(that.formData)
    })
    let $controlsRadio = $propPanel.find('input[type=radio][name=controls]')
    $controlsRadio.change(function() {
      that.formData.controls = $(this).prop('value')
      that.update(that.formData)
    })
    let $autoControlsRadio = $propPanel.find('input[type=radio][name=autoControls]')
    $autoControlsRadio.change(function() {
      that.formData.autoControls = $(this).prop('value')
      that.update(that.formData)
    })
  }
  openEditDialog() {
    let layer = layui.layer;
    let $layerElem = null;
    let layerNo = layer.open({
      type: 1,
      title: '旺旺设置',
      skin: 'layui-layer-rim', //加上边框
      area: ['600px', '600px'],
      success: function(layerElem, index) {
        $layerElem = $(layerElem)
        $layerElem.find('.cancel-btn').on('click', function() {
          layer.close(index)
        })
      },
      content: `<form class="layui-form" lay-filter="videoComponentForm">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li class="layui-this">内容设置</li>
             <li>边框设置</li>
             <li>阴影外框</li>
            <li>动画设置</li>
          </ul>
          <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
            </div>
            <div class="layui-tab-item">
            </div>
            <div class="layui-tab-item">
            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-ft-btn">
            <button class="layui-btn" lay-submit lay-filter="wangComponentForm">确定</button>
            <button type="button" class="cancel-btn layui-btn layui-btn-primary">取消</button>
          </div>
        </div>
      </form>`
    });
    var form = layui.form
    form.render();
    form.on('submit(videoComponentForm)', function(data) {
      layer.close(layerNo)
      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
  }
  update(formData) {
    let that = this
    let $Video=this.$content.find("Video");
    let _autoplay=this.formData.autoplay==="true" ? true :false;
    let _muted=this.formData.muted==="true" ? true :false;
    let _controls=this.formData.controls==="true" ? true :false;
    if(_autoplay){
      $Video.attr("autoplay","autoplay")
    }else{
      $Video.removeAttr("autoplay")
    }
    if(_muted){
      $Video.removeAttr("muted")
    }else{
      $Video.attr("muted","muted")
    }
    if(_controls){
      $Video.attr("controls","controls") 
       
    }else{
      $Video.removeAttr("controls") 
    }
    let  dd= $Video.attr("autoplay")
    let  cc= $Video.attr("muted")
    let  bb= $Video.attr("controls")


    let coverUrl=''
    if(this.formData.coverMode=="diy"){
      coverUrl=this.formData.coverImg
    } 
  }
  updatePropPanel() {
    let $propPanel = this.$propPanel
    this.onCoverModeChanged($propPanel, this.formData.coverMode)

    let $videoIDInput = $propPanel.find('input[type=text][name=videoID]')
    $videoIDInput.val(this.formData.videoID)
 
    let $coverImgInput = $propPanel.find('input[type=text][name=coverImg]')
    $coverImgInput.val(this.formData.coverImg)

    let $autoplayRadio = $propPanel.find('input[type=radio][name=autoplay]')
    $autoplayRadio.filter(`[value="${this.formData.autoplay}"]`).prop('checked', true)
 
    let $mutedRadio = $propPanel.find('input[type=radio][name=muted]')
    $mutedRadio.filter(`[value="${this.formData.muted}"]`).prop('checked', true)

    let $controlsRadio = $propPanel.find('input[type=radio][name=controls]')
    $controlsRadio.filter(`[value="${this.formData.controls}"]`).prop('checked', true)

    let $autoControlsRadio = $propPanel.find('input[type=radio][name=autoControls]')
    $autoControlsRadio.filter(`[value="${this.formData.autoControls}"]`).prop('checked', true)

  }
  getProps() {
    let config = this.formData;
    config.appID = `${this.stage.id}-${this.id}`
    return {
      'appType': 'xvb',
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
 
 