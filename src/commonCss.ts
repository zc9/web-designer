/*旺旺链接*/
export function wwUrl(url,mode,whao,stype){
  return mode =="wwlink" ? '//amos.alicdn.com/msg.aw?&v=2&uid='+whao+'&site=enaliint&s='+stype+'&charset=UTF-8' : url
}

/*链接 与旺旺链接 切换信息*/
export function onLinkModeChanged($layerElem, linkMode) {
  let $wangBox = $layerElem.find('.wang-box')
  let $linkBox = $layerElem.find('.link-box')
  if (linkMode === 'urlink') {
    $wangBox.hide()
    $linkBox.show()
  } else if (linkMode === 'wwlink') {
    $linkBox.hide()
    $wangBox.show()
  }
}
/*阴影外框 生成样式 */
export function boxShadow(sdX,sdY,sdBlur,sdSize,sdColor) {
  let bShadow=sdX+'px'
  bShadow+=' '+sdY+'px'
  bShadow+=sdBlur ? ' '+sdBlur+'px': ''
  bShadow+=sdSize ? ' '+sdSize+'px': ''
  bShadow+=sdColor ? ' '+sdColor: ''
  return bShadow
}

/*背景图 生成样式 */
export function bgImage(img,bgColor,bgRep,bgPos,bgfix){
  let defBg=bgColor;
  if(img !=""){
    bgColor=bgColor !="" ? ' '+bgColor:''
    bgRep=bgRep !="" ? ' '+bgRep:' no-repeat'
    bgPos=bgPos !="" ? ' '+bgPos:'';
    bgfix=bgfix !="" ? ' '+bgfix:'';
    defBg='url('+img+')'+bgRep+bgPos+bgColor+bgfix+''
  }
  return defBg
}
/*文字线 生成样式 */
export function textLine(oLine,tLine,uLine){
  let deline=uLine !="" ? uLine:'';
  deline+=oLine !="" ? ' '+oLine:'';
  deline+=tLine !="" ? ' '+tLine:'';
  if(deline ==="") deline='none'
  return deline;
}

/*左右移动，缩放大小 后面值 无线 */
export function onDisabledChanged($layerElem,$objElem,$valElem) {
  let $nextObj=$objElem.next()
  $nextObj.removeAttr("disabled")
  $nextObj.removeClass("state-disabled")
  if ($valElem === '' || $valElem ==='xins-box-fromleft' || $valElem ==='xins-box-fromright' || $valElem ==='xins-box-fromtop' || $valElem ==='xins-box-frombottom') {
    $nextObj.attr("disabled","disabled")
    $nextObj.addClass("state-disabled")
  }
} 

/*同步边框信息*/
export function onTongBuBd($layerElem,$isVal,that) {
  let $bdWidthVal = $layerElem.find('input[type=text][name=bdWidth]').val()
  let $mbdWidthInput = $layerElem.find('input[type=text][name=mbdWidth]')
  $mbdWidthInput.val($bdWidthVal)

  let $bdStyleRadio = $layerElem.find('input[type=radio][name=bdStyle]:checked')
  let $bdStyleVal=$bdStyleRadio.val()
  $layerElem.find('input[type=radio][name=mbdStyle][value='+$bdStyleVal+']').prop('checked', true)

  let $bdColorVal = $layerElem.find('input[type=text][name=bdColor]').val()
  let $mbdColorInput = $layerElem.find('input[type=text][name=mbdColor]')
  $mbdColorInput.val($bdColorVal)
  $mbdColorInput.prev().find(".sp-preview-inner").css("background-color",$bdColorVal)

  let $bdTCheckBox = $layerElem.find('input[type=checkbox][name=bdT]')
  let $mbdTCheckBox = $layerElem.find('input[type=checkbox][name=mbdT]')
  let $bdTVal=$bdTCheckBox.is(':checked')
  $mbdTCheckBox.prop('checked',$bdTVal);

  let $bdBCheckBox = $layerElem.find('input[type=checkbox][name=bdB]')
  let $mbdBCheckBox = $layerElem.find('input[type=checkbox][name=mbdB]')
  let $bdBVal=$bdBCheckBox.is(':checked')
  $mbdBCheckBox.prop('checked',$bdBVal);

  let $bdLCheckBox = $layerElem.find('input[type=checkbox][name=bdL]')
  let $mbdLCheckBox = $layerElem.find('input[type=checkbox][name=mbdL]')
  let $bdLVal=$bdLCheckBox.is(':checked')
  $mbdLCheckBox.prop('checked',$bdLVal);

  let $bdRCheckBox = $layerElem.find('input[type=checkbox][name=bdR]')
  let $mbdRCheckBox = $layerElem.find('input[type=checkbox][name=mbdR]')
  let $bdRVal=$bdRCheckBox.is(':checked')
  $mbdRCheckBox.prop('checked',$bdRVal);
  if($isVal){
   that.formData.mbdT=$layerElem.find('input[type=checkbox][name=mbdT]:checked').val();
   that.formData.mbdB=$layerElem.find('input[type=checkbox][name=mbdB]:checked').val();
   that.formData.mbdL=$layerElem.find('input[type=checkbox][name=mbdL]:checked').val();
   that.formData.mbdR=$layerElem.find('input[type=checkbox][name=mbdR]:checked').val();
   that.formData.mbdWidth=$bdWidthVal;
   that.formData.mbdColor=$bdColorVal;
   that.formData.mbdStyle=$bdStyleVal;
  }
}
/*动画程度*/
export function BezierCss(bz,bzv){
  let defv='';
  if(bz =="bs"){  //由慢到快
    switch (bzv) {
      case 'b': //强
        defv='1, 0, 1, 0';
        break;
      case 'm': //中
        defv='1, 0, 1, 1';
        break;
      default: //s弱
        defv='0.42, 0, 1, 1';
        break;
    }
  }else if(bz =="bq"){   //由快到慢
    switch (bzv) {
      case 'b': //强
        defv='0, 1, 0, 1';
        break;
      case 'm': //中
        defv='0, 0, 0, 1';
        break;
      default: //s弱
        defv='0, 0, 0.58, 1';
        break;
    }
  }else if(bz =="bt"){   //跑过回头（加速）
    switch (bzv) {
      case 'b': //强
        defv='0.5,2.2,1,0.8';
        break;
      case 'm': //中
        defv='0.5, 2.2, 0.5, 0.8';
        break;
      default: //s弱
        defv='1, 2.2, 0.5, 0.8';
        break;
    }
  }else if(bz =="bc"){   //起步后撤（加速）
    switch (bzv) {
      case 'b': //强
        defv='0.5, 0.2, 1, -1.2';
        break;
      case 'm': //中
        defv='0.5, 0.2, 0.5, -1.2';
        break;
      default: //s弱
        defv='1, 0.2, 0.5, -1.2';
        break;
    }
  }else if(bz =="bd"){   //中间停顿（加速）
    switch (bzv) {
      case 'b': //强
        defv='0.5, 1, 1, 0';
        break;
      case 'm': //中
        defv='0.5, 1, 0.5, 0';
        break;
      default: //3弱
        defv='1, 1, 0.5, 0';
        break;
    }
  }else if(bz =="bx"){   //弹性抖动（1）
    switch (bzv) {
      case 'b': //强
        defv='0.5, 1.5, 0.5, -1.5';
        break;
      case 'm': //中
        defv='0.5, 2, 0.5, -1';
        break;
      default: //s弱
        defv='0.5, 3, 0.5, 0';
        break;
    }
  }
  defv= defv !="" ? 'cubic-bezier('+defv+') ':'';
  return   defv;
}



/*是否为空 */
export function isnull(str){
if(typeof(str)=='object'){var n=0;for(var i in str){if(str[i]&&!/^[ ]*$/.test(str[i].toString()))n++;}return n==0?true:false;}else{return!str||(/^[ ]*$/.test(str.toString()))?true:false;}
}
/*返回为空字符*/
export function valEmpty(v){
 return  !isnull(v) ? v: '';
}

/*转化 正数值 */
export function valInt(v) {
   let re=false
   switch (typeof v) {
    case 'undefined':
        re=true;
    case 'string': 
        if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) re= true;
        break;
    case 'boolean':
        if (!v) re= true;
        break;
    case 'number':
        if (0 === v || isNaN(v)) re= true;
        break;
    case 'object':
        if (null === v || v.length === 0) re= true;
        for (var i in v) {
            re= false;
        }
        re= true;
    }
    if(!re){
    return Number.parseInt(v)
    }
}
//生成图片样式
export function ImgBgHtml(formData) {
  var jsonData={'imgBgStyle':'','Html':''}
  let bRadius=valEmpty(formData.bRadius)
  let radiusStyle=bRadius !="" ? 'border-radius:'+bRadius+'px;' :''
  let imgMode=valEmpty(formData.imgMode)
  let bgImg=valEmpty(formData.bgImg) 
  let bgColor=valEmpty(formData.bgColor) !="" ? formData.bgColor :''
  let imgBgStyle=''
  if(bgImg !=""){
    let imgHtml=''
    switch (imgMode) {
      case 'cut':   //保持原图尺寸
        imgBgStyle=bgImage(bgImg,bgColor,'no-repeat','0% 0%','')
        jsonData.imgBgStyle=imgBgStyle !="" ?  'background:'+imgBgStyle+';' : ''
        break
      case 'full':   //自由拉伸
        imgHtml='<img  class="sf"  src='+bgImg+'  style="'+radiusStyle+'width:100%;height:100%;" />'
        break
      case 'scaleX':  //保持比例(只裁剪宽度)
        imgHtml='<img  class="sx"  src='+bgImg+'   style="'+radiusStyle+'height:100%;"  />'  
        break
      case 'scaleY':   //保持比例(只裁剪高度)
        imgHtml='<img  class="sy"  src='+bgImg+'   style="'+radiusStyle+'width:100%;" />'
        break
    }
    jsonData.Html=imgHtml;
  }
  return jsonData
}
//处理生成随景样式
export function ShadowStyle(formData) {
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

//生成边框样式
export function BorderHtml(formData) {

  var jsonData={ 'bdpdStyle':'','mbdpdStyle':'','Html':'' }
  let bRadius=valEmpty(formData.bRadius)
  let radiusStyle=bRadius !="" ? 'border-radius:'+bRadius+'px;' :''

  let bdT,bdB,bdL,bdR,bdWidth,bdColor,bdStyle
  bdT=valEmpty(formData.bdT)
  bdB=valEmpty(formData.bdB)
  bdL=valEmpty(formData.bdL)
  bdR=valEmpty(formData.bdR)
  
  bdWidth=valInt(formData.bdWidth)
  bdColor=valEmpty(formData.bdColor)
  bdStyle=valEmpty(formData.bdStyle)

  //移上边框
  let mbdT,mbdB,mbdL,mbdR,mbdWidth,mbdColor,mbdStyle
  mbdT=valEmpty(formData.mbdT)
  mbdB=valEmpty(formData.mbdB)
  mbdL=valEmpty(formData.mbdL)
  mbdR=valEmpty(formData.mbdR)
  
  mbdWidth=valInt(formData.mbdWidth)
  mbdColor=valEmpty(formData.mbdColor)
  mbdStyle=valEmpty(formData.mbdStyle)

  //鼠标经过 边框 样式 动画
  let mbdTsDur,mbdTsFun,mbdTsAnt,mbdTsFunVal,mbdTsDurVal,mbdTsAntStyle
  mbdTsDur=valEmpty(formData.mbdTsDur)
  mbdTsFun=valEmpty(formData.mbdTsFun)
  mbdTsAnt=valEmpty(formData.mbdTsAnt)

  mbdTsFunVal=mbdTsFun==='cubic-bezier' ? 'cubic-bezier(0.52, 1.64, 0.37, 0.66)' : mbdTsFun
  mbdTsDurVal=mbdTsDur !="" ? 'transition-duration:'+mbdTsDur+'s;' : ''
  mbdTsAntStyle='transition-timing-function:'+mbdTsFunVal+';'+mbdTsDurVal
  
  let btw,bbw,blw,brw,baStyle=''
  btw=0
  bbw=0
  blw=0
  brw=0
   
  if(bdT==="on"){
    btw=bdWidth
    baStyle+='padding-top:'+btw+'px;'
  }
  if(bdB==="on"){
    bbw=bdWidth
    baStyle+='padding-bottom:'+bbw+'px;'
  }
  if(bdL==="on"){
    blw=bdWidth
    baStyle+='padding-left:'+blw+'px;'
  }
  if(bdR==="on"){
    brw=bdWidth
    baStyle+='padding-right:'+brw+'px;'
  }
  let mbtw,mbbw,mblw,mbrw,mbaStyle
  mbtw=0
  mbbw=0
  mblw=0
  mbrw=0
  mbaStyle=''
  if(mbdT==="on"){
    mbtw=mbdWidth
    mbaStyle+='padding-top:'+btw+'px;'
  }
  if(mbdB==="on"){
    mbbw=mbdWidth
    mbaStyle+='padding-bottom:'+bbw+'px;'
  }
  if(mbdL==="on"){
    mblw=mbdWidth
    mbaStyle+='padding-left:'+blw+'px;'
  }
  if(mbdR==="on"){
    mbrw=mbdWidth
    mbaStyle+='padding-right:'+brw+'px;'
  }
  let alHtml,almHtml,ltHtml,lbHtml,llHtml,lrHtml
  let htmlList=[]

  alHtml='<div class="bk-aline" style="'+mbdTsAntStyle+radiusStyle+'border-color:'+bdColor+';border-style:'+bdStyle+';border-top-width:'+btw+'px;border-bottom-width:'+bbw+'px;border-left-width:'+blw+'px;border-right-width:'+brw+'px;" ></div>' //所有

  almHtml='<div class="bk-mline" style="'+mbdTsAntStyle+radiusStyle+'border-color:'+mbdColor+';border-style:'+mbdStyle+';border-top-width:'+mbtw+'px;border-bottom-width:'+mbbw+'px;border-left-width:'+mblw+'px;border-right-width:'+mbrw+'px;" ></div>'  //移上所有

  ltHtml='<div class="bk-line w-lt" style="'+mbdTsAntStyle+'border-top-style:'+mbdStyle+';border-top-color:'+mbdColor+';border-top-width:'+mbdWidth+'px;"></div>'
  lbHtml='<div class="bk-line w-lb" style="'+mbdTsAntStyle+'border-bottom-style:'+mbdStyle+';border-bottom-color:'+mbdColor+';border-bottom-width:'+mbdWidth+'px;"></div>'
  llHtml='<div class="bk-line w-ll" style="'+mbdTsAntStyle+'border-left-style:'+mbdStyle+';border-left-color:'+mbdColor+';border-left-width:'+mbdWidth+'px;"></div>'
  lrHtml='<div class="bk-line w-lr" style="'+mbdTsAntStyle+'border-right-style:'+mbdStyle+';border-right-color:'+mbdColor+';border-right-width:'+mbdWidth+'px;"></div>'
  htmlList.push(alHtml)
  if(mbdTsAnt=='bdtx0' || mbdTsAnt=='bdtx1'){
    htmlList.push(almHtml)
  }else{
    if(mbdT==="on"){
      htmlList.push(ltHtml)
    }
    if(mbdB==="on"){
      htmlList.push(lbHtml)
    }
    if(mbdL==="on"){
      htmlList.push(llHtml)
    }
    if(mbdR==="on"){
      htmlList.push(lrHtml)
    }
  }
  jsonData.bdpdStyle=baStyle
  jsonData.mbdpdStyle=mbaStyle
  jsonData.Html=htmlList.join('')

  return jsonData

}