import Component from './Component';
import { setAntSpinvOption,setAntBezierOption,isEmpty} from './common';
import {onLinkModeChanged,boxShadow,bgImage,onTongBuBd,onDisabledChanged,valEmpty,wwUrl,BezierCss,ShadowStyle,BorderHtml,ImgBgHtml} from './commonCss'
export default class ImgAntComponent extends Component {
  $content: JQuery
  $img: JQuery
  constructor() {
    super('img-zf-component')
    this.$content = $('<a class="xdtb ywimg-box ant-text yw-hidden"><div class="on"></div><img  style="display: none;"/></a>')
    this.$img = this.$content.find('img')
    this.$contentBox.append(this.$content)
    this.initFormData()
  }

  toHtml() {
    let top, left, width, height,bRadius,linkMode,hrefMode,wangID,url,href
    let htmlList=[]
    top = this.$el.css('top')
    left = this.$el.css('left')
    width = this.$el.width()
    height = this.$el.height()
  
    bRadius=valEmpty(this.formData.bRadius)
    href=valEmpty(this.formData.href)
    hrefMode=valEmpty(this.formData.hrefMode)

    linkMode=valEmpty(this.formData.linkMode)
    wangID=valEmpty(this.formData.wangID)
    url=wwUrl(href,linkMode,wangID,22)
    
    let radiusStyle=bRadius !="" ? 'border-radius:'+bRadius+'px;' :''
    //处理动画
    let mTsDur,mTsDelay,mTsBezier,mTsBezierv,Bezier,linkhtml,mTsAnt
    mTsAnt=''
    mTsDur=valEmpty(this.formData.mTsDur) !=""  ? this.formData.mTsDur+'s ':''
    mTsDelay=valEmpty(this.formData.mTsDelay) !=""  ?  this.formData.mTsDelay+'s ':''
    Bezier=mTsDur+BezierCss(this.formData.mTsBezier,this.formData.mTsBezierv)+mTsDelay
    Bezier=  Bezier !=""  ? 'transition:'+Bezier+';' : ''

    let bgCss,bgImg,bgColor,bgPos
    bgImg=this.formData.bgImg
    bgColor=this.formData.bgColor
    bgPos=this.formData.bgPos
 
    bgCss=bgImage(bgImg,bgColor,'',bgPos,'')
    bgCss=bgCss !="" ?  'background:'+bgCss+';' : ''

    htmlList.push('<div class="on" style="'+bgCss+Bezier+'"></div>')

    let mbgImg,mbgColor
    mbgImg=this.formData.mbgImg
    mbgColor=this.formData.mbgColor
    if(mbgImg !="" ||mbgImg !="" ){
      let mbgCss,mbgPos
      mbgPos=this.formData.mbgPos
      mbgCss=bgImage(mbgImg,mbgColor,'',mbgPos,'')
      mbgCss=mbgCss !="" ?  'background:'+mbgCss+';' : ''
      htmlList.push('<div class="off" style="'+mbgCss+Bezier+'"></div>')
     mTsAnt=this.formData.mTsAnt
    }

    let mrxz,mrxzv,mrxzCss,mrCss
     
    mrxz=valEmpty(this.formData.mrxz)
    mrxzv=valEmpty(this.formData.mrxzv)
    mrxzCss='';
    mrCss='';
    if(mrxz !="" && mrxzv !=""){
      mrxzCss=' '+mrxz+mrxzv
      mrCss=' mr'
    }

    //阴影处理
    let shadowDataStyle = ShadowStyle(this.formData)
    let onShadowStyle=shadowDataStyle.onShadow
    let offShadowStyle=shadowDataStyle.offShadow

    //处理 边框
    let mbdTsAnt=valEmpty(this.formData.mbdTsAnt)
    let BorderData = BorderHtml(this.formData)
 
    htmlList.push(BorderData.Html)
 
    linkhtml='<a   class="ywlink  ant-text '+mbdTsAnt+' '+mTsAnt+'" href="'+url+'" target="'+hrefMode+'" style="'+onShadowStyle+radiusStyle+Bezier+'overflow: hidden;position:relative;">'+htmlList.join('')+'</a>'
    linkhtml='<div class="yw-100'+mrxzCss+'">'+offShadowStyle+linkhtml+'</div>'



    return '<div class="abs xdtb xtxc '+mrCss+'" style="top: '+top+'; left:'+left+'; width:'+width+'px; height:'+height+'px;'+radiusStyle+'" > '+linkhtml+'</div>'
  }
 
  initFormData() {
    this.formData.appLabel = ''
    this.formData.bgImgSize = 'true'
    this.formData.bgImg = 'http://img04.taobaocdn.com/imgextra/i4/808048452/TB2bMZZcpXXXXb5XXXXXXXXXXXX-808048452.jpg'
    this.formData.bgColor = ''
    this.formData.bgPos = '50% 50%'
    this.formData.mrxz=''
    this.formData.mrxzv='20' 

    this.formData.mbgImg = 'http://img04.taobaocdn.com/imgextra/i4/808048452/TB2BLE3cpXXXXXIXXXXXXXXXXXX-808048452.jpg'
    this.formData.mbgColor = ''
    this.formData.mbgPos = '50% 50%'

    this.formData.linkMode = 'urlink'
    this.formData.hrefMode = '_blank'
    this.formData.href = ''
    this.formData.wangID = ''
    this.formData.bdRadius= ''
    
    
    this.formData.mTsDur='0.5'
    this.formData.mTsAnt ='atrans16'  //动画效果
  
  
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

 
    this.update(this.formData)
  }
 

 
  openEditDialog() {
    let that = this;
    let layer = layui.layer;
    let $layerElem = null;
    let layerNo = layer.open({
      type: 1,
      title: '双面图片设置',
      skin: 'layui-layer-rim', //加上边框
      area: ['600px', '600px'],
      success: function(layerElem, index) {
        $layerElem = $(layerElem)
  
 

        if (that.formData.bgColor) {
          let $bgColorInput=$layerElem.find('input[type=text][name=bgColor]')
          $bgColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.bgColor)
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
        if (that.formData.sdColor) {
         let $sdColorInput=$layerElem.find('input[type=text][name=sdColor]')
         $sdColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.sdColor)
        } 
        if (that.formData.msdColor) {
         let $msdColorInput=$layerElem.find('input[type=text][name=msdColor]')
         $msdColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.msdColor)
        } 
        $layerElem.find('.cancel-btn').on('click', function() {
          layer.close(index)
        })
        onLinkModeChanged($layerElem, that.formData.linkMode)
       

      },
      content: `<form class="layui-form" lay-filter="imgZfComponentForm">
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title">
            <li class="layui-this">内容设置</li>
             <li>边框设置</li>
             <li>阴影外框</li>
             <li>动画设置</li>
          </ul>
          <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
              <div class="layui-tab layui-side-card">
                <ul class="layui-tab-title"  >
                  <li class="layui-this" style="margin-top: 110px;">默认图片</li>
                  <li class="">鼠标划过图片</li>
                </ul>
                <div class="layui-tab-content" style="height: 400px;">
                  <div class="layui-tab-item layui-show">
                    <div class="layui-form-item" style="margin-top:5px;">
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
                      <label class="layui-form-label">对齐方式</label>
                      <div class="layui-input-inline">
                        <select name="bgPos">
                          <option value="0% 0%">左上</option>
                          <option value="0% 50%">左中</option>
                          <option value="0% 100%">左下</option>
                          <option value="50% 0%">中上</option>
                          <option value="50% 50%">正中</option>
                          <option value="50% 100%">中下</option>
                          <option value="100% 0%">右上</option>
                          <option value="100% 50%">右中</option>
                          <option value="100% 100%">右下</option>
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
                    <div class="layui-form-item">
                      <label class="layui-form-label">旋转特效</label>
                      <div class="layui-input-inline" style="width: 126px;">
                        <select name="mrxz">
                            <option value="" selected="selected">无效果</option>
                            <option value="xins-mr-r">顺时针旋转</option>
                            <option value="xins-mr-fr">逆时针旋转</option>
                        </select>
                      </div>
                      <div class="layui-input-inline" style="width: 126px;">
                        <select name="mrxzv"  class="ant-spin-v" >
                        </select>
                      </div>
                    </div>
                    <div class="layui-form-item"  >
                      <label class="layui-form-label">圆角度数</label>
                      <div class="layui-input-inline">
                        <input name="bRadius" type="text" class="layui-input">
                      </div>
                    </div>
                  </div>
                  <div class="layui-tab-item">
                    <div class="layui-form-item" style="margin-top:10px;">
                      <label class="layui-form-label">图片地址</label>
                      <div class="layui-input-inline">
                        <input name="mbgImg" type="text" class="layui-input">
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">对齐方式</label>
                      <div class="layui-input-inline">
                        <select name="mbgPos">
                          <option value="0% 0%">左上</option>
                          <option value="0% 50%">左中</option>
                          <option value="0% 100%">左下</option>
                          <option value="50% 0%">中上</option>
                          <option value="50% 50%">正中</option>
                          <option value="50% 100%">中下</option>
                          <option value="100% 0%">右上</option>
                          <option value="100% 50%">右中</option>
                          <option value="100% 100%">右下</option>
                        </select>
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">背景颜色</label>
                      <div class="layui-input-inline pagecolorpanel"  >
                        <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner"></div></div></div>
                        <input name="mbgColor" type="text" class="layui-input pagecolor">
                        <span class="clear-color-button"></span>
                      </div>
                    </div>
               


                  </div>
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
            <div class="layui-tab-item">
              <div class="layui-tab layui-side-card">
                <ul class="layui-tab-title"  >
                  <li class="layui-this" style="margin-top: 110px;">默认阴影</li>
                  <li class="">鼠标划过阴影</li>
                </ul>
                <div class="layui-tab-content" style="height: 400px;">
                  <div class="layui-tab-item layui-show">
                       
                    <div class="layui-form-item" style="margin-top:30px;">
                      <label class="layui-form-label">阴影</label>
                      <div class="layui-input-inline">
                        <input class="radio-medium" type="radio" name="shadow" value="on"  title="显示">
                        <input class="radio-medium" type="radio" name="shadow" value="off"  title="隐藏">
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">阴影大小</label>
                      <div class="layui-input-inline">
                        <input type="text" name="sdSize" class="layui-input">
                      </div>
                    </div>
                     <div class="layui-form-item">
                      <label class="layui-form-label">模糊距离</label>
                      <div class="layui-input-inline">
                        <input type="text" name="sdBlur" class="layui-input">
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">水平阴影距离</label>
                      <div class="layui-input-inline">
                        <input type="text" name="sdX" class="layui-input">
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">垂直阴影距离</label>
                      <div class="layui-input-inline">
                        <input type="text" name="sdY" class="layui-input">
                      </div>
                    </div>
                    <div class="layui-form-item"  >
                      <label class="layui-form-label">阴影颜色</label>
                      <div class="layui-input-inline pagecolorpanel"  >
                        <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner"></div></div></div>
                        <input name="sdColor" type="text" class="layui-input pagecolor">
                        <span class="clear-color-button"></span>
                      </div>
                    </div>
                  </div>
                  <div class="layui-tab-item">
                       
                    <div class="layui-form-item" style="margin-top:30px;">
                      <label class="layui-form-label">阴影</label>
                      <div class="layui-input-inline">
                        <input class="radio-medium" type="radio" name="mshadow" value="on"  title="显示">
                        <input class="radio-medium" type="radio" name="mshadow" value="off"  title="隐藏">
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">阴影大小</label>
                      <div class="layui-input-inline">
                        <input type="text" name="msdSize" class="layui-input">
                      </div>
                    </div>
                     <div class="layui-form-item">
                      <label class="layui-form-label">模糊距离</label>
                      <div class="layui-input-inline">
                        <input type="text" name="msdBlur" class="layui-input">
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">水平阴影距离</label>
                      <div class="layui-input-inline">
                        <input type="text" name="msdX" class="layui-input">
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">垂直阴影距离</label>
                      <div class="layui-input-inline">
                        <input type="text" name="msdY" class="layui-input">
                      </div>
                    </div>
                    <div class="layui-form-item"  >
                      <label class="layui-form-label">阴影颜色</label>
                      <div class="layui-input-inline pagecolorpanel"  >
                        <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner"></div></div></div>
                        <input name="msdColor" type="text" class="layui-input pagecolor">
                        <span class="clear-color-button"></span>
                      </div>
                    </div>
                    <div class="layui-form-item">
                      <label class="layui-form-label">划过显示速度</label>
                      <div class="layui-input-inline" style="width:230px;">
                        <input type="text" name="msdTsDur" class="layui-input input-short"  style="width:105px;display:inline-block;">
                        <span style="color:red;">单位 秒   可以小数点</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="layui-tab-item">
                 

              <fieldset  class="layui-elem-field"  >
                 
                <div class="layui-field-box">
                  <div class="layui-form-item" >
                    <label class="layui-form-label">动画速度</label>
                    <div class="layui-input-inline" style="width: 148px;">
                      <input type="text" name="mTsDur" class="layui-input">
                    </div>
                    <label class="layui-form-label" style="width: 65px;padding-left:0px;padding-right:5px">动画延迟</label>
                    <div class="layui-input-inline" style="width: 65px;">
                      <input type="text" name="mTsDelay" class="layui-input">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">动画特效</label>
                    <div class="layui-input-inline" style="width:150px;">
                      <select name="mTsBezier"  class="ant-bezier">
                      </select>
                    </div>
                    <label class="layui-form-label" style="width:40px;padding-left:0px;padding-right:5px">程度</label>
                    <div class="layui-input-inline" style="width:85px;">
                      <select  name="mTsBezierv" >
                        <option value="b" selected="selected">强</option>
                        <option value="m">中</option>
                        <option value="s">弱</option>
                      </select>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset  class="layui-elem-field" style="margin-top:10px;">
                <legend>动画效果</legend>
                <div class="layui-field-box" style="padding-left:60px;">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans0" title="无效果">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans1" title="右切入">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans2"  title="下切入">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans3"  title="左切入">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans4"  title="上切入">
                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans5"  title="右切出">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans6"  title="下切出">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans7"  title="左切出">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans8"  title="上切出">

                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans9"  title="右切入切出">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans10"   title="下切入切出">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans11"   title="左切入切出">

                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans12"  title="上切入切出">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans13"  title="放大出现">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans14"  title="缩小出现">

                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans15"  title="翻转出现">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans16"  title="缩放出现1">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans17"  title="缩放出现2">

                  <div class="sepline"></div>
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans18"  title="旋转放大">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans19"  title="旋转缩小">
                  <input class="radio-medium" type="radio" name="mTsAnt"  value="atrans20"  title="渐隐渐显">
                </div>
              </fieldset>
   

            </div>
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-ft-btn">
            <button class="layui-btn" lay-submit lay-filter="imgZfComponentForm">确定</button>
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

    form.on('submit(imgZfComponentForm)', function(data) {
      that.formData = data.field;
      that.update(that.formData)
      that.updatePropPanel()
      that.formData.animType = $layerElem.find('.animselect > div.active').data('val')
      console.log(that.formData)
      layer.close(layerNo)
      return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    form.val('imgZfComponentForm', that.formData)
  }
  
  update(formData) {
    let that = this
    let bRadius=formData.bRadius ?  parseInt(formData.bRadius) :''
    let $contentParnts= that.$content.parent().parent()
    let $contentParnt= that.$content.parent()
    let $mrCss=false
    let mrxzOld= that.$content.attr("mrxz")
    if(formData.mrxz !=""){
      let mrxzCss =formData.mrxz+formData.mrxzv
      isEmpty(mrxzOld) != true ? that.$content.removeClass(mrxzOld) :''
      that.$content.addClass(mrxzCss)
      that.$content.attr("mrxz",mrxzCss)
      $mrCss=true
    }else{
      if(isEmpty(mrxzOld) != true){
        that.$content.removeClass(mrxzOld)
        that.$content.removeAttr('mrxz')
      }
    }
    $mrCss ? $contentParnts.addClass("mr") : $contentParnts.removeClass("mr")

    let mTsDur,mTsDelay,Bezier
    mTsDur=valEmpty(this.formData.mTsDur) !=""  ? this.formData.mTsDur+'s ':''
    mTsDelay=valEmpty(this.formData.mTsDelay) !=""  ?  this.formData.mTsDelay+'s ':''
    Bezier=mTsDur+BezierCss(this.formData.mTsBezier,this.formData.mTsBezierv)+mTsDelay
   
     
    let $defPanel=this.$contentBox.find(".on")
    let bgCss,bgImg,bgColor,bgPos
    bgImg=this.formData.bgImg
    bgColor=this.formData.bgColor
    bgPos=this.formData.bgPos
 
    bgCss=bgImage(bgImg,bgColor,'',bgPos,'')
    $defPanel.css("background",bgCss)
    $defPanel.css("transition",Bezier)

    let $offPanel=this.$contentBox.find(".off")
    let $mTsAntOld=this.$content.attr("mTsAnt")
    let mbgCss,mbgImg,mbgColor,mbgPos
    mbgImg=this.formData.mbgImg
    mbgColor=this.formData.mbgColor
    mbgPos=this.formData.mbgPos
 
    mbgCss=bgImage(mbgImg,mbgColor,'',mbgPos,'')
 
    if(mbgImg !=""){
      $offPanel.remove()
      let $mTsAnt=this.formData.mTsAnt
      if($mTsAnt=='atrans5' || $mTsAnt=='atrans6' || $mTsAnt==='atrans7' || $mTsAnt==='atrans8' || $mTsAnt==='atrans9' || $mTsAnt==='atrans19' ){
      this.$contentBox.find(".on").before("<div class='off' ></div>")
      }else{
      this.$contentBox.find(".on").after("<div class='off'   ></div>")
      }
      $offPanel=this.$contentBox.find(".off")
      $offPanel.css("background",mbgCss)
      $offPanel.css("transition",Bezier)
 


      isEmpty($mTsAntOld) != true ?  this.$content.removeClass($mTsAntOld) :'';
      this.$content.addClass($mTsAnt)
      this.$content.attr("mTsAnt",$mTsAnt)

    }else{
      $offPanel.remove();
      isEmpty($mTsAntOld) != true ?  this.$content.removeClass($mTsAntOld) :'';
      this.$content.attr("mTsAnt",'')
    }
   if(formData.bgImg) that.$img.attr('src', formData.bgImg)
    that.$img.bind('load', function() {
      if (formData.bgImgSize === 'true') {
        that.$el.width(that.$img.width())
        that.$el.height(that.$img.height())
      }
    })


    if(formData.shadow ==="on"){
      let sdX=formData.sdX ? formData.sdX: 0
      let sdY=formData.sdY ? formData.sdY: 0
      let bShadow=boxShadow(sdX,sdY,formData.sdBlur,formData.sdSize,formData.sdColor)
      that.$content.css('box-shadow', bShadow)
    }else{
     that.$content.css('box-shadow','none')
    }
    
    let $mchildPanel=that.$content.find(".mchild")
    if(formData.mshadow ==="on"){
      let sdX=formData.msdX ? formData.msdX: 0
      let sdY=formData.msdY ? formData.msdY: 0
      let mbShadow=boxShadow(sdX,sdY,formData.msdBlur,formData.msdSize,formData.msdColor)
      
      if($mchildPanel.length <=0)
        that.$content.append("<div class='abs mchild xins-box-fadein'></div>")

      $mchildPanel=that.$contentBox.find(".mchild")

      $mchildPanel.css('box-shadow', mbShadow)
      $mchildPanel.css('border-radius', bRadius)

      let msdTsDur=formData.msdTsDur ? formData.msdTsDur+'s linear': 0
      $mchildPanel.css('transition', msdTsDur)
    }else{
      $mchildPanel.remove()
    } 

    
    that.$content.css('border-radius', bRadius)




    //处理边框
    
    let isDefBk=false;
    let $textPanel=this.$content;
 
    let bdWidth=formData.bdWidth !="" ? parseInt(formData.bdWidth) : '';
    let $alPanel=this.$content.find(".bk-aline")
    if (formData.bdT==="on" || formData.bdB==="on" ||formData.bdL==="on"||formData.bdR==="on"){
      if($alPanel.length <=0)
        $textPanel.append("<div class='bk-aline'></div>")
      $alPanel=this.$content.find(".bk-aline")
      $alPanel.css('border-radius',bRadius)


      if(formData.bdT==="on"){
        $alPanel.css('border-top-width', bdWidth)
      }else{
        $alPanel.css('border-top-width', 0)
      }
      if(formData.bdB==="on"){
        $alPanel.css('border-bottom-width', bdWidth)
      }else{
        $alPanel.css('border-bottom-width', 0)
      }
      if(formData.bdL==="on"){
        $alPanel.css('border-Left-width', bdWidth)
      }else{
        $alPanel.css('border-Left-width', 0)
      }
      if(formData.bdR==="on"){
        $alPanel.css('border-right-width', bdWidth)
      }else{
        $alPanel.css('border-right-width', 0)
      }
      $alPanel.css('border-style', formData.bdStyle)
      $alPanel.css('border-color', formData.bdColor)
    }else{
        $alPanel.remove()
        isDefBk=true
    }

    this.$content.attr("mbdTsAnt",this.formData.mbdTsAnt)
    let mbdTsAntVal=this.$content.attr("mbdTsAnt")
    this.$content.removeClass(mbdTsAntVal);
    this.$content.addClass(formData.mbdTsAnt)
    this.$content.attr("mbdTsAnt",formData.mbdTsAnt)

    if(formData.mbdT ==="on" || formData.mbdB==="on" ||formData.mbdL==="on"||formData.mbdR==="on" ){
      let mbdTsFunVal=formData.mbdTsFun==='cubic-bezier'  ? 'cubic-bezier(0.52, 1.64, 0.37, 0.66)' : formData.mbdTsFun
      let mbdTsDurVal=formData.mbdTsDur+'s'
      
      const mbdWidth=formData.mbdWidth !="" ? parseInt(formData.mbdWidth) : 0;
      const mbdStyle=formData.mbdStyle
      const mbdColor=formData.mbdColor



      let $mlPanel=this.$contentBox.find(".bk-mline")
      if($mlPanel.length <=0) $textPanel.append("<div class='bk-mline'></div>")
      $mlPanel=this.$contentBox.find(".bk-mline")
      $mlPanel.css('border-radius',bRadius)
      $mlPanel.css('border-color', mbdColor)
      $mlPanel.css('border-style', mbdStyle)
      $mlPanel.css('transition-timing-function',mbdTsFunVal)
      $mlPanel.css('transition-duration',mbdTsDurVal)

      let $ltPanel=this.$contentBox.find(".w-lt")
      if(formData.mbdT==="on"){
        if($ltPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-lt'></div>")
          $ltPanel=this.$contentBox.find(".w-lt")
          $ltPanel.css('border-top-width',mbdWidth)
          $ltPanel.css('border-top-style',mbdStyle)
          $ltPanel.css('border-top-color',mbdColor)
          $ltPanel.css('transition-timing-function',mbdTsFunVal)
          $ltPanel.css('transition-duration',mbdTsDurVal)
          $mlPanel.css('border-top-width', mbdWidth)
          
      }else{
        $mlPanel.css('border-top-width', 0)
        $ltPanel.remove()

      }
      let $lbPanel=this.$contentBox.find(".w-lb")
      if(formData.mbdB==="on"){
        if($lbPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-lb'></div>")
          $lbPanel=this.$contentBox.find(".w-lb")
          $lbPanel.css('border-bottom-width',mbdWidth)
          $lbPanel.css('border-bottom-style',mbdStyle)
          $lbPanel.css('border-bottom-color',mbdColor)
          $lbPanel.css('transition-timing-function',mbdTsFunVal)
          $lbPanel.css('transition-duration',mbdTsDurVal)
          $mlPanel.css('border-bottom-width', mbdWidth)
      }else{
        $mlPanel.css('border-bottom-width', 0)
        $lbPanel.remove()
      }
      let $llPanel=this.$contentBox.find(".w-ll")
      if(formData.mbdL==="on"){
        if($llPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-ll'></div>")
          $llPanel=this.$contentBox.find(".w-ll")
          $llPanel.css('border-left-width',mbdWidth)
          $llPanel.css('border-left-style',mbdStyle)
          $llPanel.css('border-left-color',mbdColor)
          $llPanel.css('transition-timing-function',mbdTsFunVal)
          $llPanel.css('transition-duration',mbdTsDurVal)
          $mlPanel.css('border-left-width',mbdWidth)
      }else{
        $mlPanel.css('border-left-width',0)
        $llPanel.remove()
      }
      let $lrPanel=this.$contentBox.find(".w-lr")
      if(formData.mbdR==="on"){
        if($lrPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-lr'></div>")
          $lrPanel=this.$contentBox.find(".w-lr")
          $lrPanel.css('border-right-width',mbdWidth)
          $lrPanel.css('border-right-style',mbdStyle)
          $lrPanel.css('border-right-color',mbdColor)
          $lrPanel.css('transition-timing-function',mbdTsFunVal)
          $lrPanel.css('transition-duration',mbdTsDurVal)
          $mlPanel.css('border-right-width',mbdWidth)
          
      }else{
        $mlPanel.css('border-right-width',0)
        $lrPanel.remove()
      }

      //以上所有边框加上
      if(formData.mbdTsAnt ==="bdtx0" || formData.mbdTsAnt ==="bdtx1"){
        $ltPanel.remove()
        $lbPanel.remove()
        $llPanel.remove()
        $lrPanel.remove()
      }else{
        $mlPanel.remove()
      }
    }
  }

  updatePropPanel() {
    let $propPanel = this.$propPanel

    let $mrxzSelect = $propPanel.find('select[name=mrxz]')
    $mrxzSelect.val(this.formData.mrxz)
    let $mrxzvSelect = $propPanel.find('select[name=mrxzv]')
    $mrxzvSelect.val(this.formData.mrxzv)
    onDisabledChanged($propPanel,$mrxzSelect,this.formData.mrxz)

  
    let $bgImgInput = $propPanel.find('input[type=text][name=bgImg]')
    $bgImgInput.val(this.formData.bgImg)
    let $bgImgSizeCheckBox = $propPanel.find('input[type=checkbox][name=bgImgSize]')
    if (this.formData.bgImgSize === 'true') {
      $bgImgSizeCheckBox.prop('checked', true)
    } else {
      $bgImgSizeCheckBox.prop('checked', false)
    }

    let $bgColorInput = $propPanel.find('input[type=text][name=bgColor]')
    $bgColorInput.val(this.formData.bgColor)
    if (this.formData.bgColor) {
      $bgColorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.bgColor)
    }else{
      $bgColorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }

    let $mbgImgInput = $propPanel.find('input[type=text][name=mbgImg]')
    $mbgImgInput.val(this.formData.mbgImg)
    let $mbgColorInput = $propPanel.find('input[type=text][name=mbgColor]')
    $mbgColorInput.val(this.formData.mbgColor)
    if (this.formData.mbgColor) {
      $mbgColorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.mbgColor)
    }else{
      $mbgColorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }

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
 
    //移上动画效果
    let $mTsDurInput = $propPanel.find('input[type=text][name=mTsDur]')
    $mTsDurInput.val(this.formData.mTsDur)
    let $mTsDelayInput = $propPanel.find('input[type=text][name=mTsDelay]')
    $mTsDelayInput.val(this.formData.mTsDelay)

    let $mTsBezierSelect = $propPanel.find('select[name=mTsBezier]')
    $mTsBezierSelect.val(this.formData.mTsBezier)

    let $mTsBeziervSelect = $propPanel.find('select[name=mTsBezierv]')
    $mTsBeziervSelect.val(this.formData.mTsBezierv)
    let $mTsAntRadio = $propPanel.find('input[type=radio][name=mTsAnt]')
    $mTsAntRadio.filter(`[value="${this.formData.mTsAnt}"]`).prop('checked', true)
 


    //边框信息
    let $bdTCheckBox = $propPanel.find('input[type=checkbox][name=bdT]')
    if (this.formData.bdT === 'on') {
      $bdTCheckBox.prop('checked', true)
    } else {
      $bdTCheckBox.prop('checked', false)
    }
    let $bdBCheckBox = $propPanel.find('input[type=checkbox][name=bdB]')
    if (this.formData.bdB === 'on') {
      $bdBCheckBox.prop('checked', true)
    } else {
      $bdBCheckBox.prop('checked', false)
    }
    let $bdLCheckBox = $propPanel.find('input[type=checkbox][name=bdL]')
    if (this.formData.bdL === 'on') {
      $bdLCheckBox.prop('checked', true)
    } else {
      $bdLCheckBox.prop('checked', false)
    }
    let $bdRCheckBox = $propPanel.find('input[type=checkbox][name=bdR]')
    if (this.formData.bdR === 'on') {
      $bdRCheckBox.prop('checked', true)
    } else {
      $bdRCheckBox.prop('checked', false)
    }

    let $bdWidthInput = $propPanel.find('input[type=text][name=bdWidth]')
    $bdWidthInput.val(this.formData.bdWidth)
    let $bdStyleRadio = $propPanel.find('input[type=radio][name=bdStyle]')
    $bdStyleRadio.filter(`[value="${this.formData.bdStyle}"]`).prop('checked', true)
    let $bdColorInput = $propPanel.find('input[type=text][name=bdColor]')
    $bdColorInput.val(this.formData.bdColor)
    if (this.formData.bdColor) {
      $bdColorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.bdColor)
    }else{
      $bdColorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }

    //移上边框
    let $mbdTCheckBox = $propPanel.find('input[type=checkbox][name=mbdT]')
    if (this.formData.mbdT === 'on') {
      $mbdTCheckBox.prop('checked', true)
    } else {
      $mbdTCheckBox.prop('checked', false)
    }
    let $mbdBCheckBox = $propPanel.find('input[type=checkbox][name=mbdB]')
    if (this.formData.mbdB === 'on') {
      $mbdBCheckBox.prop('checked', true)
    } else {
      $mbdBCheckBox.prop('checked', false)
    }
    let $mbdLCheckBox = $propPanel.find('input[type=checkbox][name=mbdL]')
    if (this.formData.mbdL === 'on') {
      $mbdLCheckBox.prop('checked', true)
    } else {
      $mbdLCheckBox.prop('checked', false)
    }
    let $mbdRCheckBox = $propPanel.find('input[type=checkbox][name=mbdR]')
    if (this.formData.mbdR === 'on') {
      $mbdRCheckBox.prop('checked', true)
    } else {
      $mbdRCheckBox.prop('checked', false)
    }

    let $mbdWidthInput = $propPanel.find('input[type=text][name=mbdWidth]')
    $mbdWidthInput.val(this.formData.mbdWidth)
    let $mbdStyleRadio = $propPanel.find('input[type=radio][name=mbdStyle]')
    $mbdStyleRadio.filter(`[value="${this.formData.mbdStyle}"]`).prop('checked', true)
    let $mbdColorInput = $propPanel.find('input[type=text][name=mbdColor]')
    $mbdColorInput.val(this.formData.mbdColor)
    if (this.formData.mbdColor) {
      $mbdColorInput.prev().find(".sp-preview-inner").css("background-color",this.formData.mbdColor)
    }else{
      $mbdColorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }

    let $mbdTsDurInput = $propPanel.find('input[type=text][name=mbdTsDur]')
    $mbdTsDurInput.val(this.formData.mbdTsDur)
    let $mbdTsFunRadio = $propPanel.find('input[type=radio][name=mbdTsFun]')
    $mbdTsFunRadio.filter(`[value="${this.formData.mbdTsFun}"]`).prop('checked', true)

    let $mbdTsAntRadio = $propPanel.find('input[type=radio][name=mbdTsAnt]')
    $mbdTsAntRadio.filter(`[value="${this.formData.mbdTsAnt}"]`).prop('checked', true)

  }

  initPorpPanel() {
    let that = this
    setAntSpinvOption('.ant-spin-v')
    setAntBezierOption('.ant-bezier')
     
 
    $('.prop-setting-ct > div').hide()
    let $propPanel = $('.img-zf-com-prop-panel')
    this.$propPanel = $propPanel

    $propPanel.show()
    $propPanel.find('*').off()

    this.updatePropPanel()
    //收缩 重新加载
    let element = layui.element
    element.render("collapse")

 
    let $mrxzSelect = $propPanel.find('select[name=mrxz]')
    $mrxzSelect.change(function() {
      that.formData.mrxz = $(this).prop('value')
      that.update(that.formData)
      onDisabledChanged($propPanel,$(this),that.formData.mrxz)
    })

    let $mrxzvSelect = $propPanel.find('select[name=mrxzv]')
    $mrxzvSelect.change(function() {
      that.formData.mrxzv = $(this).prop('value')
      that.update(that.formData)
    })
 
    let $bgImgInput = $propPanel.find('input[type=text][name=bgImg]')
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
    let $bgPosSelect = $propPanel.find('select[name=bgPos]')
    $bgPosSelect.change(function() {
      that.formData.bgPos = $(this).prop('value')
      that.update(that.formData)
    })
    let $bgColorInput = $propPanel.find('input[type=text][name=bgColor]')
    $bgColorInput.change(function() {
      let val = $(this).val()
      that.formData.bgColor = val
      that.update(that.formData)
    })

    //移上图片信息
    let $mbgImgInput = $propPanel.find('input[type=text][name=mbgImg]')
    $mbgImgInput.change((function() {
      that.formData.mbgImg = $bgImgInput.val()
      that.update(that.formData)
    }))
    let $mbgPosSelect = $propPanel.find('select[name=mbgPos]')
    $mbgPosSelect.change(function() {
      that.formData.mbgPos = $(this).prop('value')
      that.update(that.formData)
    })
    let $mbgColorInput = $propPanel.find('input[type=text][name=mbgColor]')
    $mbgColorInput.change(function() {
      let val = $(this).val()
      that.formData.mbgColor = val
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

    //移上动画
    let $mTsDurInput = $propPanel.find('input[type=text][name=mTsDur]')
    $mTsDurInput.change(function() {
      let val = $(this).val()
      that.formData.mTsDur = val
      that.update(that.formData)
    })

    let $mTsDelayInput = $propPanel.find('input[type=text][name=mTsDelay]')
    $mTsDelayInput.change(function() {
      let val = $(this).val()
      that.formData.mTsDelay = val
      that.update(that.formData)
    })
    let $mTsBezierSelect = $propPanel.find('select[name=mTsBezier]')
    $mTsBezierSelect.change(function() {
      that.formData.mTsBezier = $(this).prop('value')
      that.update(that.formData)
    })
    let $mTsBeziervSelect = $propPanel.find('select[name=mTsBezierv]')
    $mTsBeziervSelect.change(function() {
      that.formData.mTsBezierv = $(this).prop('value')
      that.update(that.formData)
    })
    let $mTsAntRadio = $propPanel.find('input[type=radio][name=mTsAnt]')
    $mTsAntRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.mTsAnt = val
      that.update(that.formData)
    })

    // 以下是默认边框 
    let $bdTCheckBox = $propPanel.find('input[type=checkbox][name=bdT]')
    $bdTCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bdT = val ? 'on' : ''
      that.update(that.formData)
    })
    let $bdBCheckBox = $propPanel.find('input[type=checkbox][name=bdB]')
    $bdBCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bdB = val ? 'on' : ''
      that.update(that.formData)
    })
    let $bdLCheckBox = $propPanel.find('input[type=checkbox][name=bdL]')
    $bdLCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bdL = val ? 'on' : ''
      that.update(that.formData)
    })
    let $bdRCheckBox = $propPanel.find('input[type=checkbox][name=bdR]')
    $bdRCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.bdR = val ? 'on' : ''
      that.update(that.formData)
    })

    let $bdWidthInput = $propPanel.find('input[type=text][name=bdWidth]') 
    $bdWidthInput.keyup(function() {
      let val = $(this).val()
      that.formData.bdWidth = val
      that.update(that.formData)
    })
    let $bdColorInput = $propPanel.find('input[type=text][name=bdColor]') 
    $bdColorInput.change(function() {
      let val = $(this).val()
      that.formData.bdColor = val
      that.update(that.formData)
    })
    let $bdStyleRadio = $propPanel.find('input[type=radio][name=bdStyle]')
    $bdStyleRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.bdStyle = val
      that.update(that.formData)
    })

    // 以下是经过边框 
    let $mbdTCheckBox = $propPanel.find('input[type=checkbox][name=mbdT]')
    $mbdTCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.mbdT = val ? 'on' : ''
      that.update(that.formData)
    })
    let $mbdBCheckBox = $propPanel.find('input[type=checkbox][name=mbdB]')
    $mbdBCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.mbdB = val ? 'on' : ''
      that.update(that.formData)
    })
    let $mbdLCheckBox = $propPanel.find('input[type=checkbox][name=mbdL]')
    $mbdLCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.mbdL = val ? 'on' : ''
      that.update(that.formData)
    })
    let $mbdRCheckBox = $propPanel.find('input[type=checkbox][name=mbdR]')
    $mbdRCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.formData.mbdR = val ? 'on' : ''
      that.update(that.formData)
    })
    let $mbdWidthInput = $propPanel.find('input[type=text][name=mbdWidth]') 
    $mbdWidthInput.keyup(function() {
      let val = $(this).val()
      that.formData.mbdWidth = val
      that.update(that.formData)
    })
    let $mbdColorInput = $propPanel.find('input[type=text][name=mbdColor]') 
    $mbdColorInput.change(function() {
      let val = $(this).val()
      that.formData.mbdColor = val
      that.update(that.formData)
    })
    let $mbdStyleRadio = $propPanel.find('input[type=radio][name=mbdStyle]')
    $mbdStyleRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.mbdStyle = val
      that.update(that.formData)
    })
    //边框动画
    let $mbdTsDurInput = $propPanel.find('input[type=text][name=mbdTsDur]') 
    $mbdTsDurInput.keyup(function() {
      let val = $(this).val()
      that.formData.mbdTsDur = val
      that.update(that.formData)
    })
    let $mbdTsFunRadio = $propPanel.find('input[type=radio][name=mbdTsFun]')
    $mbdTsFunRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.mbdTsFun = val
      that.update(that.formData)
    })
    let $mbdTsAntRadio = $propPanel.find('input[type=radio][name=mbdTsAnt]')
    $mbdTsAntRadio.change(function() {
      let val = $(this).prop('value')
      that.formData.mbdTsAnt = val
      that.update(that.formData)
    })

    $propPanel.find('.layui-btn-sm').on('click', function() {
      let layer = layui.layer
      layer.msg('你确定  同步默文 边框样式么？', {
        time: 0 //不自动关闭
        ,btn: ['同步', '取消']
        ,yes: function(index){
          onTongBuBd($propPanel,true,that);
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
      'appType': 'xzfm',
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
