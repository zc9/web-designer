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

