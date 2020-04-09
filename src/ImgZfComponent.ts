import Component from './Component';
import { compareForm,isEmpty,valEmpty} from './common';
import { setAntSpinvOption,setAntBezierOption} from './commonOption';
import { onLinkModeChanged,bgImage,onDisabledChanged,wwUrl,BezierCss,ImgBgHtml} from './commonCss'
import { initPorpBorder,updateBorder,updatePropBorder,editPopHtmlBorder,setPopHtmlBorder,editSideHtmlBorder,toHtmlBorder} from './borderComponent';
import { updateShadow,editPopHtmlShadow,setPopHtmlShadow,toHtmlShadow} from './shadowComponent';
import UpdateFormAction from "./UpdateFormAction"

export default class ImgAntComponent extends Component {
  $content: JQuery
  $img: JQuery
  constructor() {
    super('img-zf-component')
    this.$content = $('<a class="xdtb ywimg-box ant-text yw-hidden yw-rel"><div class="on"></div><img  style="display: none;"/></a>')
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


    href= href !="" ?  ' href="'+url+'"' : '';
    hrefMode= hrefMode ==="_blank" ?  ' target="_blank"' : '';

    let radiusStyle=bRadius !="" ? 'border-radius:'+bRadius+'px;' :''
    //处理动画
    let mTsDur,mTsDelay,mTsBezier,mTsBezierv,Bezier,linkhtml,$mTsAnt
    $mTsAnt=this.formData.mTsAnt
    mTsDur=valEmpty(this.formData.mTsDur) !=""  ? this.formData.mTsDur+'s ':''
    mTsDelay=valEmpty(this.formData.mTsDelay) !=""  ?  this.formData.mTsDelay+'s ':''
    Bezier=mTsDur+BezierCss(this.formData.mTsBezier,this.formData.mTsBezierv)+mTsDelay
    Bezier=  Bezier !=""  ? 'transition:'+Bezier+';' : ''

    let bgCss,bgImg,bgColor,bgPos,onHtml
    bgImg=this.formData.bgImg
    bgColor=this.formData.bgColor
    bgPos=this.formData.bgPos

    bgCss=bgImage(bgImg,bgColor,'',bgPos,'')
    bgCss=bgCss !="" ?  'background:'+bgCss+';' : ''

    onHtml='<div class="on" style="'+bgCss+Bezier+'"></div>'

    let mbgImg,mbgColor,offHtml=''
    mbgImg=this.formData.mbgImg
    mbgColor=this.formData.mbgColor
    if(mbgImg !="" ||mbgImg !="" ){
      let mbgCss,mbgPos
      mbgPos=this.formData.mbgPos
      mbgCss=bgImage(mbgImg,mbgColor,'',mbgPos,'')
      mbgCss=mbgCss !="" ?  'background:'+mbgCss+';' : ''
      offHtml='<div class="off" style="'+mbgCss+Bezier+'"></div>'

    }
    if($mTsAnt=='atrans5' || $mTsAnt=='atrans6' || $mTsAnt==='atrans7' || $mTsAnt==='atrans8' || $mTsAnt==='atrans9' || $mTsAnt==='atrans19' ){
      htmlList.push(offHtml)
      htmlList.push(onHtml)
    }else{
      htmlList.push(onHtml)
      htmlList.push(offHtml)
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
    let shadowData = toHtmlShadow(this.formData)
    let onShadowStyle=shadowData.onShadow
    let offShadowStyle=shadowData.offShadow

    //处理 边框
    let mbdTsAnt=valEmpty(this.formData.mbdTsAnt)
    let BorderData = toHtmlBorder(this.formData)

    htmlList.push(BorderData.Html)

    linkhtml='<a   class="ywlink  ant-text '+mbdTsAnt+' '+$mTsAnt+'" '+href+hrefMode+'  style="'+radiusStyle+'overflow: hidden;position:relative;">'+htmlList.join('')+'</a>'
    linkhtml='<div class="yw-100'+mrxzCss+'" style="'+onShadowStyle+radiusStyle+'">'+offShadowStyle+linkhtml+'</div>'

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


    this.doUpdate(this.formData)
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

        setAntSpinvOption($layerElem.find('.ant-spin-v'))
        setAntBezierOption($layerElem.find('.ant-bezier'))
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
        if (that.formData.mbgColor) {
          let $mbgColorInput=$layerElem.find('input[type=text][name=mbgColor]')
          $mbgColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.mbgColor)
        }

        $layerElem.find('.cancel-btn').on('click', function() {
          layer.close(index)
        })

        let $mrxzSelect=$layerElem.find('select[name=mrxz]').parent()
        onLinkModeChanged($layerElem, that.formData.linkMode)
        onDisabledChanged($layerElem,$mrxzSelect,that.formData.mrxz)


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
            <div  class="layui-tab-item pop-item-border">

            </div>
            <div class="layui-tab-item pop-item-shadow">

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
  doUpdate(formData) {
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

    that.$content.css('border-radius', bRadius)
    updateShadow(this.$content,formData)
    //处理边框
    updateBorder(this.$content,formData)
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

    //边框处理
    updatePropBorder($propPanel,this)
  }
  initPorpPanel() {
    let that = this
    $('.prop-setting-ct > div').hide()
    let $propPanel = $('.img-zf-com-prop-panel')
    this.$propPanel = $propPanel

    $propPanel.show()
    $propPanel.find('*').off()


    setAntSpinvOption($propPanel.find('.ant-spin-v'))
    setAntBezierOption($propPanel.find('.ant-bezier'))
    editSideHtmlBorder($propPanel.find('.side-item-border'))

    this.updatePropPanel()

    //收缩 重新加载
    let element = layui.element
    element.render("collapse")

    let $mrxzSelect = $propPanel.find('select[name=mrxz]')
    $mrxzSelect.change(function() {
      let val = $(this).prop('value')
      that.update({mrxz: val})
      onDisabledChanged($propPanel,$(this),val)
    })

    let $mrxzvSelect = $propPanel.find('select[name=mrxzv]')
    $mrxzvSelect.change(function() {
      let val= $(this).prop('value')
      that.update({mrxzv: val})
    })

    let $bgImgInput = $propPanel.find('input[type=text][name=bgImg]')
    $bgImgInput.keyup((function() {
      let val = $(this).val()
      that.update({bgImg: val})
    }))
    let $bgImgSizeCheckBox = $propPanel.find('input[type=checkbox][name=bgImgSize]')
    $bgImgSizeCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.update({bgImgSize: val ? 'true' : 'false'})
    });
    let $bgPosSelect = $propPanel.find('select[name=bgPos]')
    $bgPosSelect.change(function() {
      let val = $(this).prop('value')
      that.update({bgPos: val})
    })
    let $bgColorInput = $propPanel.find('input[type=text][name=bgColor]')
    $bgColorInput.change(function() {
      let val = $(this).val()
      that.update({bgColor: val})
    })

    //移上图片信息
    let $mbgImgInput = $propPanel.find('input[type=text][name=mbgImg]')
    $mbgImgInput.keyup((function() {
      let val = $(this).val()
      that.update({mbgImg: val})
    }))
    let $mbgPosSelect = $propPanel.find('select[name=mbgPos]')
    $mbgPosSelect.change(function() {
      let val = $(this).prop('value')
      that.update({mbgPos: val})
    })
    let $mbgColorInput = $propPanel.find('input[type=text][name=mbgColor]')
    $mbgColorInput.change(function() {
      let val = $(this).val()
      that.update({mbgColor: val})
    })

    let $linkModeRadio = $propPanel.find('input[type=radio][name=linkMode]')
    $linkModeRadio.change(function() {
      let val = $(this).prop('value')
      that.update({linkMode: val})
      onLinkModeChanged($propPanel,val)
    })

    let $hrefInput = $propPanel.find('input[type=text][name=href]')
    $hrefInput.keyup(function() {
      let val = $(this).val()
      that.update({href: val})
    })

    let $hrefModeCheckBox = $propPanel.find('input[type=checkbox][name=hrefMode]')
    $hrefModeCheckBox.change(function() {
      let val = $(this).is(':checked')
      that.update({hrefMode: val ? '_blank' : ''})
    })

    let $wangIDInput = $propPanel.find('input[type=text][name=wangID]')
    $wangIDInput.keyup(function() {
      let val = $(this).val()
      that.update({wangID: val})
    })
    let $bRadiusInput = $propPanel.find('input[type=text][name=bRadius]')
    $bRadiusInput.keyup(function() {
      let val= $(this).val()
      that.update({bRadius: val})
    })

    //移上动画
    let $mTsDurInput = $propPanel.find('input[type=text][name=mTsDur]')
    $mTsDurInput.keyup(function() {
      let val= $(this).val()
      that.update({mTsDur: val})
    })
    let $mTsDelayInput = $propPanel.find('input[type=text][name=mTsDelay]')
    $mTsDelayInput.keyup(function() {
      let val= $(this).val()
      that.update({mTsDelay: val})
    })
    let $mTsBezierSelect = $propPanel.find('select[name=mTsBezier]')
    $mTsBezierSelect.change(function() {
      let val = $(this).prop('value')
      that.update({mTsBezier: val})
    })
    let $mTsBeziervSelect = $propPanel.find('select[name=mTsBezierv]')
    $mTsBeziervSelect.change(function() {
      let val = $(this).prop('value')
      that.update({mTsBezierv: val})
    })
    let $mTsAntRadio = $propPanel.find('input[type=radio][name=mTsAnt]')
    $mTsAntRadio.change(function() {
      let val = $(this).prop('value')
      that.update({mTsAnt: val})
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
