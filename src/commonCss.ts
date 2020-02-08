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