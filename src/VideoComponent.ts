import Component from './Component'
import {wwUrl,valEmpty} from './commonCss'
import {tParseInt} from './common'

export default class VideoComponent extends Component {
  $content: JQuery
  $wangImg: JQuery
  constructor() {
    super('video-component')
    this.$content = $('<div class="video-box"><Video style="width:100%;height:100%"  width="100%" height="100%"  src="https://cloud.video.taobao.com/play/u/2780279213/p/1/e/6/t/1/d/ld/36255062.mp4" /><div class="yw-overlay"></div></div>')
    this.$contentBox.append(this.$content)
    this.initFormData()
  }

  toHtml() {
    let top, left, width, height,isAutopaly,isMuted,isControls,isAutoControls,coverImg

    top = this.$el.css('top')
    left = this.$el.css('left')
    width = this.$el.width()
    height = this.$el.height()
    isAutopaly=valEmpty(this.formData.autoplay) ==="true" ? 'autoplay="autoplay"' : '';
    isMuted=valEmpty(this.formData.muted) ==="true" ? 'muted' : '';
    isControls=valEmpty(this.formData.controls) ==="true" ? 'controls' : '';
    coverImg=valEmpty(this.formData.coverImg) !="" ? 'poster="'+this.formData.coverImg+'"' : '';
    return '<div class="abs video-box"  style="top:'+top+';left:'+left+';width:'+width+'px; height:'+height+'px;"><Video '+isAutopaly+' '+isMuted+' '+isControls+' '+coverImg+' style="width:100%;height:100%;"   src="https://cloud.video.taobao.com/play/u/2780279213/p/1/e/6/t/1/d/ld/36255062.mp4"  /></div>'
  }

  initFormData() {
    this.formData.appLabel = ''
    this.formData.width = 640
    this.formData.height = 363
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
 
    let $wInput = $propPanel.find('input[type=text][name=width]') 
    $wInput.keyup(function() {
      let val = $(this).val() 
      let part=that.$el
      part.width(tParseInt(val))
    })
    let $hInput = $propPanel.find('input[type=text][name=height]') 
    $hInput.keyup(function() {
      let val = $(this).val() 
      let part=that.$el
      part.height(tParseInt(val))
      
    })
 
    let $videoIDInput = $propPanel.find('input[type=text][name=videoID]') 
    $videoIDInput.keyup(function() {
      let val = $(this).val()
      that.formData.videoID = val
      that.update(that.formData)
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
 
 