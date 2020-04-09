import Component from './Component'
import {compareForm,valInt,valEmpty} from './common'
import UpdateFormAction from "./UpdateFormAction"
import {wwUrl} from './commonCss'


export default class VideoComponent extends Component {
  $content: JQuery
  $wangImg: JQuery
  constructor() {
    super('video-component', {isEditPopup: false})
    this.$content = $('<div class="video-box"><Video style="width:100%;height:100%"  width="100%" height="100%"  src="https://cloud.video.taobao.com/play/u/2780279213/p/1/e/6/t/1/d/ld/36255062.mp4" /><div class="yw-overlay"></div></div>')
    this.$contentBox.append(this.$content)
    this.initFormData()
  }

  toHtml() {
    let top, left, width, height,isAutopaly,isMuted,isControls,isAutoControls,isloop,coverImg

    top = this.$el.css('top')
    left = this.$el.css('left')
    width = this.$el.width()
    height = this.$el.height()
    isAutopaly=valEmpty(this.formData.autoplay) ==="true" ? ' autoplay="autoplay"' : '';
    isMuted=valEmpty(this.formData.muted) ==="true" || valEmpty(this.formData.autoplay) ==="true" ? ' muted' : '';
    isControls=valEmpty(this.formData.controls) ==="true" ? ' controls' : '';
    coverImg=valEmpty(this.formData.coverImg) !="" ? ' poster="'+this.formData.coverImg+'"' : '';
    isloop=valEmpty(this.formData.loop) ==="true" ? ' loop="loop"' : '';


    return '<div class="abs video-box"  style="top:'+top+';left:'+left+';width:'+width+'px; height:'+height+'px;"><Video '+isAutopaly+isMuted+isControls+isloop+coverImg+' style="width:100%;height:100%;"   src="https://cloud.video.taobao.com/play/u/2780279213/p/1/e/6/t/1/d/ld/36255062.mp4"  /></div>'
  }

  initFormData() {
    this.formData.appLabel = ''
    this.formData.width = 640
    this.formData.height = 363
    this.formData.videoID = ''         //视频地址(ID)
    this.formData.autoplay = 'false'     //是否自动播放
    this.formData.muted = 'false'        //是否静音
    this.formData.controls = 'true'        // 是否显示播放器控制条
    this.formData.loop = 'false'           //是否 循环播
    this.formData.autoControls = 'false'    //鼠标移动到视频上才展示控制条

    this.formData.coverImg = '' //封面


    this.doUpdate(this.formData)
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

    let $wInput = $propPanel.find('input[type=text][name=width]')
    $wInput.keyup(function() {
      let val = $(this).val()
      let part=that.$el
      part.width(valInt(val))
    })
    let $hInput = $propPanel.find('input[type=text][name=height]')
    $hInput.keyup(function() {
      let val = $(this).val()
      let part=that.$el
      part.height(valInt(val))

    })
    let $videoIDInput = $propPanel.find('input[type=text][name=videoID]')
    $videoIDInput.keyup(function() {
      let val = $(this).val()
      that.update({videoID: val})
    })
    let $coverImgInput = $propPanel.find('input[type=text][name=coverImg]')
    $coverImgInput.keyup(function() {
      let val = $(this).val()
      that.update({coverImg: val})
    })
    let $autoplayRadio = $propPanel.find('input[type=radio][name=autoplay]')
    $autoplayRadio.change(function() {
      let val = $(this).prop('value')
      that.update({autoplay: val})
    })
    let $mutedRadio = $propPanel.find('input[type=radio][name=muted]')
    $mutedRadio.change(function() {
      let val = $(this).prop('value')
      that.update({muted: val})
    })
    let $controlsRadio = $propPanel.find('input[type=radio][name=controls]')
    $controlsRadio.change(function() {
      let val = $(this).prop('value')
      that.update({controls: val})
    })
    let $autoControlsRadio = $propPanel.find('input[type=radio][name=autoControls]')
    $autoControlsRadio.change(function() {
      let val = $(this).prop('value')
      that.update({autoControls: val})
    })
    let $loopRadio = $propPanel.find('input[type=radio][name=loop]')
    $loopRadio.change(function() {
      let val = $(this).prop('value')
      that.update({loop: val})
    })

  }
  openEditDialog() {
    let layer = layui.layer;
    let $layerElem = null;
    let layerNo = layer.open({
      type: 1,
      title: '视频设置',
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
            <button class="layui-btn" lay-submit lay-filter="videoComponentForm">确定</button>
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
  doUpdate(formData) {
    let that = this
    let $Video=this.$content.find("Video");
    let _autoplay=this.formData.autoplay==="true" ? true :false;
    let _muted=this.formData.muted==="true" ? true :false;
    let _controls=this.formData.controls==="true" ? true :false;
    let _loop=this.formData.loop==="true" ? true :false;

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
    if(_loop){
      $Video.attr("loop","loop")
    }else{
      $Video.removeAttr("loop")
    }

    let  dd= $Video.attr("autoplay")
    let  cc= $Video.attr("muted")
    let  bb= $Video.attr("controls")


    let coverUrl=''
    if(this.formData.coverMode=="diy"){
      coverUrl=this.formData.coverImg
    }
  }
  update(formData) {
    let newFormData = JSON.parse(JSON.stringify(this.formData));
    for (let k in formData) {
      newFormData[k] = formData[k];
    }
    if (!compareForm(newFormData, this.formData)) {
      let updateFormAction = new UpdateFormAction(this);
      updateFormAction.setOldFormData(this.formData);
      updateFormAction.setNewFormData(newFormData);
      this.stage.actionManager.execute(updateFormAction)
    }
  }
  updatePropPanel() {
    let $propPanel = this.$propPanel

    let $wInput = $propPanel.find('input[type=text][name=width]')
    $wInput.val(this.formData.width)

    let $hInput = $propPanel.find('input[type=text][name=height]')
    $hInput.val(this.formData.height)

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
    let $loopRadio = $propPanel.find('input[type=radio][name=loop]')
    $loopRadio.filter(`[value="${this.formData.loop}"]`).prop('checked', true)
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

