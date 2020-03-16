import Component from './Component';
import { wwUrl,onLinkModeChanged,bgImage,valInt,valEmpty,ImgBgHtml} from './commonCss'

import { initPorpBorder,updateBorder,updatePropBorder,editPopHtmlBorder,setPopHtmlBorder,editSideHtmlBorder,toHtmlBorder} from './borderComponent';
import { updateShadow,editPopHtmlShadow,setPopHtmlShadow,toHtmlShadow} from './shadowComponent';

export default class ImgComponent extends Component {
  $content: JQuery
  $img: JQuery
  constructor() {
    super('img-component')
    this.$content = $('<a class="xdtb ywimg-box"><img src="" style="display:none"></a>')
    this.$img = this.$content.find('img')
    this.$contentBox.append(this.$content)
    this.initFormData()
  }

  toHtml() {
    let top, left, width, height,bRadius,tipText,linkMode,hrefMode,wangID,url,href
    let htmlList=[]
    top = this.$el.css('top')
    left = this.$el.css('left')
    width = this.$el.width()
    height = this.$el.height()
    tipText=valEmpty(this.formData.tipText) !="" ? ' title="'+this.formData.tipText+'" ' : '';

    bRadius=valEmpty(this.formData.bRadius)
    href=valEmpty(this.formData.href)
    hrefMode=valEmpty(this.formData.hrefMode) =="_blank" ? ' target="_blank"' :''

    linkMode=valEmpty(this.formData.linkMode)
    wangID=valEmpty(this.formData.wangID)
    url=wwUrl(href,linkMode,wangID,22) !="" ? ' href="'+url+'"' :''
    
    let radiusStyle=bRadius !="" ? 'border-radius:'+bRadius+'px;' :''
     //图片处理
    let ImgBgData = ImgBgHtml(this.formData)
    let imgBgStyle=ImgBgData.imgBgStyle
    htmlList.push(ImgBgData.Html)
 
    //阴影处理 
    let shadowData = toHtmlShadow(this.formData)
    let onShadowStyle=shadowData.onShadow
    htmlList.push(shadowData.offShadow)

    //处理 边框
    let mbdTsAnt= valEmpty(this.formData.mbdTsAnt)
    let BorderData = toHtmlBorder(this.formData)
    htmlList.push(BorderData.Html)


    //特效动画处理
    let shakeCss="";
    let animCss="";;
    let animStyle="";
    if(valEmpty(this.formData.animType) !=""){
      let animTsDur=valEmpty(this.formData.animTsDur) !=""  ? this.formData.animTsDur+'s ':''
      animTsDur=animTsDur+'cubic-bezier(0.5,3,0.5,0)';
      animStyle=animTsDur !="" ? 'transition:'+animTsDur+';' :''
      shakeCss=' mshake';
      animCss=valEmpty(this.formData.animType)+valEmpty(this.formData.animRange)+' ';
    }
    let htmlLink=htmlList.join('')
 
    
   
    return '<div class="abs xdtb '+animCss+' '+mbdTsAnt+'" style="top: '+top+'; left:'+left+'; width:'+width+'px; height:'+height+'px;'+animStyle+radiusStyle+'" ><a '+tipText+' class="ywlink '+shakeCss+'" '+url+hrefMode+' style="'+imgBgStyle+onShadowStyle+'">'+htmlLink+'</a></div>'

/*
    return `
      <a  href="${this.formData.href}" target="${this.formData.hrefMode || ''}" style="position: absolute; top: ${top}; left: ${left}; width: ${width}px; height: ${height}px;background: ${background}">
        ${img}
      </a>
    `*/
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
    this.formData.bgImgSize = 'true'
    this.formData.animTsDur = '0.5'
    this.formData.animRange = '-s'
    this.formData.wangID = ''
    this.formData.bdRadius= ''
    this.formData.bdStyle= 'solid'

    this.formData.shadow= 'off'//box-shadow: h-shadow v-shadow blur spread color inset;
    this.formData.sdColor= '#666666'
    this.formData.sdSize= ''  //spread  可选。阴影的大小
    this.formData.sdBlur= '5'  //可选。模糊距离
    this.formData.sdX= ''     //必需的。水平阴影的位置
    this.formData.sdY= ''     //必需的。垂直阴影的位置。

    this.formData.mshadow= 'on'
    this.formData.msdColor= '#E93030'
    this.formData.msdSize= ''  
    this.formData.msdBlur= '5'  
    this.formData.msdX= ''    
    this.formData.msdY= '' 
    this.formData.msdTsDur= '0.5'

    this.formData.bdWidth =5
    this.formData.bdStyle ='solid'

    this.formData.mbdWidth =5
    this.formData.mbdStyle ='solid'

    this.formData.mbdTsDur ='0.5'  
    this.formData.mbdTsFun ='ease-out'  
    this.formData.mbdTsAnt ='bdtx1'  
 
    this.$content.attr("mbdTsAnt",this.formData.mbdTsAnt)
    this.update(this.formData)
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
        editPopHtmlBorder($layerElem.find('.pop-item-border'))
        editPopHtmlShadow($layerElem.find('.pop-item-shadow'))

        $layerElem.find(".sp-preview-inner").css("background-color",'')
        //边框
        setPopHtmlBorder($layerElem,that)
        setPopHtmlShadow($layerElem,that)

        if (that.formData.bgColor) {
          let $bgColorInput=$layerElem.find('input[type=text][name=bgColor]')
          $bgColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.bgColor)
        }

        $layerElem.find('.cancel-btn').on('click', function() {
          layer.close(index)
        })
        onLinkModeChanged($layerElem, that.formData.linkMode)
 

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
                  <input name="bRadius" type="text" class="layui-input">
                </div>
              </div>
              <div class="layui-form-item">
                <label class="layui-form-label">提示文字</label>
                <div class="layui-input-inline">
                  <input name="tipText" type="text" class="layui-input">
                </div>
              </div>
            </div>
            <div  class="layui-tab-item pop-item-border">
               
            </div>
            <div class="layui-tab-item pop-item-shadow">
                             
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
                <label class="layui-form-label">动画时间</label>
                <div class="layui-input-inline">
                  <input type="text" name="animTsDur" class="layui-input input-short"  style="width:120px;display:inline-block;">
                  <label style="color:red;">单位 秒   可以小数点</label>
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
      onLinkModeChanged($layerElem, data.value)
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
    let bRadius=formData.bRadius ?  parseInt(formData.bRadius) :''

    updateShadow(this.$content,formData)
    //处理边框
    updateBorder(this.$content,formData)
 
    that.$content.css('border-radius', bRadius)

 
    that.$img.bind('load', function() {
      if (formData.bgImgSize === 'true') {
        that.$el.width(that.$img.width())
        that.$el.height(that.$img.height())
      }
    })
    let imgMode = formData.imgMode
    if (imgMode === 'cut') {
      let bground=bgImage(formData.bgImg,formData.bgColor,'','','')
      that.$content.css('background', bground)
      if(that.$img.is(':visible')) {
        that.$img.hide()
      }
      that.$img.attr('src', formData.bgImg)
      that.$img.css('width', '')
      that.$img.css('height', '')
    } else {
      that.$img.attr('src', formData.bgImg)
      that.$content.css('background', 'none')
      that.$content.css('background-color', formData.bgColor)
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
    let $bgImgInput = $propPanel.find('input[type=text][name=bgImg]')
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
    onLinkModeChanged($propPanel, this.formData.linkMode)
    let $bRadiusInput = $propPanel.find('input[type=text][name=bRadius]')
    $bRadiusInput.val(this.formData.bRadius)

    //边框处理
    updatePropBorder($propPanel,this)
 
  }

  initPorpPanel() {
    let that = this
    $('.prop-setting-ct > div').hide()
    let $propPanel = $('.img-com-prop-panel')
    this.$propPanel = $propPanel

    $propPanel.show()
    $propPanel.find('*').off()
    editSideHtmlBorder($propPanel.find('.side-item-border'))
    this.updatePropPanel()
    //收缩 重新加载
    let element = layui.element
    element.render("collapse")

    let $bgImgInput = $propPanel.find('input[type=text][name=bgImg]')
    $bgImgInput.keyup((function() {
      that.formData.bgImg = $bgImgInput.val()
      that.update(that.formData)
    }))

    let $bgImgSizeCheckBox = $propPanel.find('input[type=checkbox][name=bgImgSize]')
    $bgImgSizeCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bgImgSize = val ? 'true' : 'false'
      that.update(that.formData)
    })

    let $imgMode = $propPanel.find('#imgMode')
    $imgMode.change(function() {
      that.formData.imgMode = $(this).val()
      that.update(that.formData)
    })

    let $linkModeRadio = $propPanel.find('input[type=radio][name=linkMode]')
    $linkModeRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.linkMode = val
      onLinkModeChanged($propPanel, that.formData.linkMode)
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
    let $bRadiusInput = $propPanel.find('input[type=text][name=bRadius]')
    $bRadiusInput.keyup(function() {
      that.formData.bRadius = $(this).val()
      that.update(that.formData)
    })
    //边框初始化
    initPorpBorder($propPanel,that)
   
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
