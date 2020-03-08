
import {valEmpty,valInt,boxShadow} from './commonCss'

//弹出编辑 属性设置
export function setPopHtmlShadow($layerElem,that) {
  if (that.formData.sdColor) {
   let $sdColorInput=$layerElem.find('input[type=text][name=sdColor]')
   $sdColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.sdColor)
  } 
  if (that.formData.msdColor) {
   let $msdColorInput=$layerElem.find('input[type=text][name=msdColor]')
   $msdColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.msdColor)
  } 
}

//弹出编辑 边框 
export function editPopHtmlShadow($select) {
  let html= `<div class="layui-tab layui-side-card">
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
              </div> `
  $select.append(html)
}

//更新样式
export function updateShadow($content,formData){
    let bRadius=formData.bRadius ?  parseInt(formData.bRadius) :''
    if(formData.shadow ==="on"){
      let sdX=formData.sdX ? formData.sdX: 0
      let sdY=formData.sdY ? formData.sdY: 0
      let bShadow=boxShadow(sdX,sdY,formData.sdBlur,formData.sdSize,formData.sdColor)
      $content.css('box-shadow', bShadow)
    }else{
     $content.css('box-shadow','none')
    }
    
    let $mchildPanel=$content.find(".mchild")
    if(formData.mshadow ==="on"){
      let sdX=formData.msdX ? formData.msdX: 0
      let sdY=formData.msdY ? formData.msdY: 0
      let mbShadow=boxShadow(sdX,sdY,formData.msdBlur,formData.msdSize,formData.msdColor)
      
      if($mchildPanel.length <=0)
        $content.append("<div class='abs mchild xins-box-fadein'></div>")

      $mchildPanel=$content.find(".mchild")

      $mchildPanel.css('box-shadow', mbShadow)
      $mchildPanel.css('border-radius', bRadius)

      let msdTsDur=formData.msdTsDur ? formData.msdTsDur+'s linear': 0
      $mchildPanel.css('transition', msdTsDur)
    }else{
      $mchildPanel.remove()
    } 
}
//生成阴影样式
export function toHtmlShadow(formData) {
  var jsonData={ 'onShadow':'','offShadow':'' }
  let bRadius=valEmpty(formData.bRadius)
  let radiusStyle=bRadius !="" ? 'border-radius:'+bRadius+'px;' :''
  if(valEmpty(formData.shadow)==="on"){
    const sdX=valEmpty(formData.sdX) !="" ? formData.sdX: 0
    const sdY=valEmpty(formData.sdY) !="" ? formData.sdY: 0 
    const bShadow=boxShadow(sdX,sdY,valEmpty(formData.sdBlur),valEmpty(formData.sdSize),valEmpty(formData.sdColor))
    jsonData.onShadow= bShadow !="" ? 'box-shadow:'+bShadow+';' :''
  }
  if(valEmpty(formData.mshadow)==="on"){
    const msdX=valEmpty(formData.msdX) !="" ? formData.msdX: 0
    const msdY=valEmpty(formData.msdY) !="" ? formData.msdY: 0 
    let mbShadow=boxShadow(msdX,msdY,valEmpty(formData.msdBlur),valEmpty(formData.msdSize),valEmpty(formData.msdColor))
        mbShadow= mbShadow !="" ? 'box-shadow:'+mbShadow+';' :''
    const msdTsDur=valEmpty(formData.msdTsDur) ? formData.msdTsDur+'s linear': ''
    const msdTsDurStyle=msdTsDur !="" ?  'transition:'+msdTsDur+';':''
    jsonData.offShadow='<div class="abs mchild xins-box-fadein" style="'+msdTsDurStyle+mbShadow+radiusStyle+'" ></div>'
  }
  return jsonData
}

 