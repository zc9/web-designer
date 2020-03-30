 import {isEmpty} from './common';
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
  let defBg=bgColor  
  if( !isEmpty(img)){
    bgColor=!isEmpty(bgColor) ? ' '+bgColor:''
    bgRep=!isEmpty(bgRep) ? ' '+bgRep:' no-repeat'
    bgPos=!isEmpty(bgPos) ? ' '+bgPos:''
    bgfix=!isEmpty(bgfix) ? ' '+bgfix:''
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
 return  isEmpty(v) ?  '' : v;
}

/*转化 正数值 */
export function valInt(a) {
    var b;
  return a && "" != a ? (b = parseInt(a, 10), !!isNaN(b) && (b = 0), b) : a
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
      case 'full':   //自由拉伸 class="sf"
        imgHtml='<img src="'+bgImg+'" style="'+radiusStyle+'width:100%;height:100%;" />'
        break
      case 'scaleX':  //保持比例 sx(只裁剪宽度)
        imgHtml='<img src="'+bgImg+'" style="'+radiusStyle+'height:100%;"  />'  
        break
      case 'scaleY':   //保持比例 sy(只裁剪高度)
        imgHtml='<img src="'+bgImg+'" style="'+radiusStyle+'width:100%;" />'
        break
    }
    jsonData.Html=imgHtml;
  }
  return jsonData
}
/*文字 切换信息*/
export function conModeChanged($layerElem, conMode) {
  let $txtBox = $layerElem.find('.txt-box')
  let $imgBox = $layerElem.find('.img-box')
  if (conMode === 'txt') {
    $txtBox.show()
    $imgBox.hide()
  } else if (conMode === 'img') {
    $txtBox.hide()
    $imgBox.show()
  }
}