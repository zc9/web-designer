import {setRanDom,valInt,valEmpty,isEmpty} from './common';

//弹出编辑 属性设置
export function setPopHtmlBorder($layerElem,that) {

    if (that.formData.bdColor) {
     let $bdColorInput=$layerElem.find('input[type=text][name=bdColor]')
     $bdColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.bdColor)
    } 
    if (that.formData.mbdColor) {
     let $mbdColorInput=$layerElem.find('input[type=text][name=mbdColor]')
     $mbdColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.mbdColor)
    } 
    $layerElem.find('.layui-btn-sm').on('click', function() {
      let form = layui.form
      let layer = layui.layer
      layer.msg('你确定  同步默文 边框样式么？', {
        time: 0 //不自动关闭
        ,btn: ['同步', '取消']
        ,yes: function(index){
          tongBuBorder($layerElem,false,that);
          form.render();
          layer.close(index)
        }
      });
    })
}

//弹出编辑 边框 
export function editPopHtmlBorder($select) {
  let html= `<div class="layui-tab layui-side-card">
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
    </div> `
  $select.append(html)
}

//更新样式
export function updateBorder($content,formData){
    let oldTsAnt =$content.attr("mbdTsAnt")
    isEmpty(oldTsAnt) != true ? $content.removeClass(oldTsAnt) :''
    $content.addClass(formData.mbdTsAnt)
    $content.attr("mbdTsAnt",formData.mbdTsAnt)

    let $textPanel=$content;
    let bRadius=formData.bRadius ?  parseInt(formData.bRadius) :''
    let bdWidth=formData.bdWidth !="" ? parseInt(formData.bdWidth) : '';
    let bdColor=formData.bdColor !="" ? formData.bdColor : 'transparent';
  
    let $alPanel=$content.find(".bk-aline")
    if (formData.bdT==="on" || formData.bdB==="on" ||formData.bdL==="on"||formData.bdR==="on"){
      if($alPanel.length <=0)
        $textPanel.append("<div class='bk-aline'></div>")
      $alPanel=$content.find(".bk-aline")
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
      $alPanel.css('border-color', bdColor)
    }else{
      $alPanel.remove()
    }
    
    let $mlPanel=$content.find(".bk-mline")
    let $ltPanel=$content.find(".w-lt")
    let $lbPanel=$content.find(".w-lb")
    let $llPanel=$content.find(".w-ll")
    let $lrPanel=$content.find(".w-lr")

    if(formData.mbdT ==="on" || formData.mbdB==="on" ||formData.mbdL==="on"||formData.mbdR==="on" ){
      let mbdTsFunVal=formData.mbdTsFun==='cubic-bezier'  ? 'cubic-bezier(0.52, 1.64, 0.37, 0.66)' : formData.mbdTsFun
      let mbdTsDurVal=formData.mbdTsDur+'s'
      
      const mbdWidth=formData.mbdWidth !="" ? parseInt(formData.mbdWidth) : 0;
      const mbdStyle=formData.mbdStyle
      const mbdColor=formData.mbdColor !="" ? formData.mbdColor : 'transparent';

      if($mlPanel.length <=0) $textPanel.append("<div class='bk-mline'></div>")
      $mlPanel=$content.find(".bk-mline")
      $mlPanel.css('border-radius',bRadius)
      $mlPanel.css('border-color', mbdColor)
      $mlPanel.css('border-style', mbdStyle)
      $mlPanel.css('transition-timing-function',mbdTsFunVal)
      $mlPanel.css('transition-duration',mbdTsDurVal)

      
      if(formData.mbdT==="on"){
        if($ltPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-lt'></div>")
          $ltPanel=$content.find(".w-lt")
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
      
      if(formData.mbdB==="on"){
        if($lbPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-lb'></div>")
          $lbPanel=$content.find(".w-lb")
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
      
      if(formData.mbdL==="on"){
        if($llPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-ll'></div>")
          $llPanel=$content.find(".w-ll")
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
      
      if(formData.mbdR==="on"){
        if($lrPanel.length <=0)
          $textPanel.append("<div class='bk-line  w-lr'></div>")
          $lrPanel=$content.find(".w-lr")
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
    }else{
      $mlPanel.remove()
      $ltPanel.remove()
      $lbPanel.remove()
      $llPanel.remove()
      $lrPanel.remove()
    }
}

//右边编辑 边框 
export function editSideHtmlBorder($select) {
  let htmlStr = $select.html().trim().replace(/\s/g, '')
  if (htmlStr !== '') {
    return
  }
  let ranID=setRanDom()
  let html= ` <h2 class="layui-colla-title">边框设置</h2>
                <div class="layui-colla-content"  >
                  <div class="layui-tab layui-tab-card">
                    <ul class="layui-tab-title">
                      <li class="layui-this">边框样式</li>
                      <li>鼠标划过动画</li>
                    </ul>
                    <div class="layui-tab-content"  >
                      <div class="layui-tab-item layui-show">

                        <fieldset  class="layui-elem-field">
                          <legend>默认边框</legend>
                          <div class="layui-field-box">
                            <div class="nromal-wrap"  >
                              <label >边框显示</label>
                              <div class="layui-input-inline">
                                <input type="checkbox" name="bdT" value="on" id="border_bd1_${ranID}" title="上边"  >
                                <label for="border_bd1_${ranID}" >上边</label>
                                <input type="checkbox" name="bdB" value="on" id="border_bd2_${ranID}" title="下边" style="margin-left:5px;">
                                <label for="border_bd2_${ranID}" >下边</label>
                                <input type="checkbox" name="bdL" value="on" id="border_bd3_${ranID}" title="左边" style="margin-left:5px;">
                                <label for="border_bd3_${ranID}" >左边</label>
                                <input type="checkbox" name="bdR" value="on" id="border_bd4_${ranID}" title="右边"  style="margin-left:5px;">
                                <label for="border_bd4_${ranID}" >右边</label>
                              </div>
                            </div>
                            <div class="nromal-wrap"  >
                              <label class="label-con">边框粗细</label>
                              <input  class="input-short" name="bdWidth" type="text" style="width:50px;" >

                              <label class="label-con">边框颜色</label>
                              <div class="pagecolorpanel"  >
                                <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner"></div></div></div>
                                <input name="bdColor" type="text" class="pagecolor" style="width:85px;" >
                                <span class="clear-color-button"></span>
                              </div>
                            </div>

                            <div class="nromal-wrap">
                              <label >边框样式</label>
                              <div class="layui-input-inline">
                                <input type="radio" name="bdStyle" id="border_bds1_${ranID}" value="solid" title="实线"  >
                                <label for="border_bds1_${ranID}" >实线</label>
                                <input type="radio" name="bdStyle" id="border_bds2_${ranID}" value="dotted" title="细虚线">
                                <label for="border_bds2_${ranID}" >细虚线</label>
                                <input type="radio" name="bdStyle" id="border_bds3_${ranID}" value="dashed" title="粗虚线">
                                <label for="border_bds3_${ranID}" >粗虚线</label>
                              </div>
                            </div>
                          </div>
                        </fieldset>

                        <fieldset  class="layui-elem-field">
                          <legend>
                            鼠标划过边框
                            <button type="button" class="layui-btn layui-btn-sm" style="margin-left:10px;">同步默认边框</button>
                          </legend>
                          <div class="layui-field-box">
                            <div class="nromal-wrap"  >
                              <label >边框显示</label>
                              <div class="layui-input-inline">
                                <input type="checkbox" name="mbdT" value="on" id="mborder_bd1_${ranID}" title="上边"  >
                                <label for="mborder_bd1_${ranID}" >上边</label>
                                <input type="checkbox" name="mbdB" value="on" id="mborder_bd2_${ranID}" title="下边" style="margin-left:5px;">
                                <label for="mborder_bd2_${ranID}" >下边</label>
                                <input type="checkbox" name="mbdL" value="on" id="mborder_bd3_${ranID}" title="左边" style="margin-left:5px;">
                                <label for="mborder_bd3_${ranID}" >左边</label>
                                <input type="checkbox" name="mbdR" value="on" id="mborder_bd4_${ranID}" title="右边"  style="margin-left:5px;">
                                <label for="mborder_bd4_${ranID}" >右边</label>
                              </div>
                            </div>
                            <div class="nromal-wrap"  >
                              <label class="label-con">边框粗细</label>
                              <input  class="input-short" name="mbdWidth" type="text" style="width:50px;" >
                              <label class="label-con">边框颜色</label>
                              <div class="pagecolorpanel"  >
                                <div class="sp-replacer sp-light"><div class="sp-preview"><div class="sp-preview-inner"></div></div></div>
                                <input name="mbdColor" type="text" class="pagecolor" style="width:85px;" >
                                <span class="clear-color-button"></span>
                              </div>
                            </div>

                            <div class="nromal-wrap">
                              <label >边框样式</label>
                              <div class="layui-input-inline">
                                <input type="radio" name="mbdStyle" id="mborder_bds1_${ranID}" value="solid" title="实线"  >
                                <label for="mborder_bds1_${ranID}" >实线</label>
                                <input type="radio" name="mbdStyle" id="mborder_bds2_${ranID}" value="dotted" title="细虚线">
                                <label for="mborder_bds2_${ranID}" >细虚线</label>
                                <input type="radio" name="mbdStyle" id="mborder_bds3_${ranID}" value="dashed" title="粗虚线">
                                <label for="mborder_bds3_${ranID}" >粗虚线</label>
                              </div>
                            </div>
                          </div>
                        </fieldset>


                      </div>
                      <div class="layui-tab-item">
                        <fieldset  class="layui-elem-field">
                          <legend>
                            动画时长
                            <input class="input-short"  type="text" name="mbdTsDur"  style="width:50px; height:20px; margin-left:10px; padding-left:5px;" />
                            <label  style="margin-right:10px;">秒</label>
                          </legend>
                          <div class="layui-field-box">
                            <input class="radio-medium" type="radio" name="mbdTsFun" id="mbdTsDur_1_${ranID}" value="linear"  title="匀速">
                            <label for="mbdTsDur_1_${ranID}" >匀速</label>
                            <input class="radio-medium" type="radio" name="mbdTsFun" id="mbdTsDur_2_${ranID}" value="ease"  title="逐渐变慢">
                            <label for="mbdTsDur_2_${ranID}" >逐渐变慢</label>
                            <input class="radio-medium" type="radio" name="mbdTsFun" id="mbdTsDur_3_${ranID}" value="ease-in"   title="减速" style="margin-left: 12px;">
                            <label for="mbdTsDur_3_${ranID}" >减速</label>
                            <div class="sepline"></div>
                            <input class="radio-medium" type="radio" name="mbdTsFun" id="mbdTsDur_4_${ranID}" value="ease-out"   title="加速">
                            <label for="mbdTsDur_4_${ranID}" >加速</label>
                            <input class="radio-medium" type="radio" name="mbdTsFun" id="mbdTsDur_5_${ranID}" value="ease-in-out"   title="加速后减速">
                            <label for="mbdTsDur_5_${ranID}" >加速后减速</label>
                            <input class="radio-medium" type="radio" name="mbdTsFun" id="mbdTsDur_6_${ranID}" value="cubic-bezier"   title="动感弹跳">
                            <label for="mbdTsDur_6_${ranID}" >动感弹跳</label>
                          </div>
                        </fieldset>
                        <fieldset  class="layui-elem-field">
                          <legend>动画效果</legend>
                          <div class="layui-field-box">
                            <input class="radio-medium" type="radio" name="mbdTsAnt" id="mbdTsAnt_1_${ranID}"  value="bdtx0" title="直接切换" >
                            <label for="mbdTsAnt_1_${ranID}" >直接切换</label>
                            <input class="radio-medium" type="radio" name="mbdTsAnt" id="mbdTsAnt_2_${ranID}"  value="bdtx1" title="渐隐渐显" style="margin-left: 24px;">
                            <label for="mbdTsAnt_2_${ranID}" >渐隐渐显</label>
                            <div class="sepline"></div>
                            <input class="radio-medium" type="radio" name="mbdTsAnt" id="mbdTsAnt_3_${ranID}" value="bdtx4"  title="左对角线切入">
                            <label for="mbdTsAnt_3_${ranID}" >左对角线切入</label>
                            <input class="radio-medium" type="radio" name="mbdTsAnt" id="mbdTsAnt_4_${ranID}"  value="bdtx5"  title="右对角线切入">
                            <label for="mbdTsAnt_4_${ranID}" >右对角线切入</label>
                            <div class="sepline"></div>
                            <input class="radio-medium" type="radio" name="mbdTsAnt" id="mbdTsAnt_5_${ranID}"  value="bdtx6"  title="顺时针出现">
                            <label for="mbdTsAnt_5_${ranID}" >顺时针出现</label>
                            <input class="radio-medium" type="radio" name="mbdTsAnt" id="mbdTsAnt_6_${ranID}"  value="bdtx7"  title="逆时针出现" style="margin-left: 12px;">
                            <label for="mbdTsAnt_6_${ranID}" >逆时针出现</label>
                            <div class="sepline"></div>
                            <input class="radio-medium" type="radio" name="mbdTsAnt" id="mbdTsAnt_7_${ranID}"  value="bdtx8"  title="由点到线">
                            <label for="mbdTsAnt_7_${ranID}" >由点到线</label>
                            <input class="radio-medium" type="radio" name="mbdTsAnt" id="mbdTsAnt_8_${ranID}"  value="bdtx9"  title="由点到面"  style="margin-left: 24px;">
                            <label for="mbdTsAnt_8_${ranID}" >由点到面</label>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </div>`

  $select.append(html)
}
//更新侧边 边框 
export function updatePropBorder($propPanel,that) {
    let $bdTCheckBox = $propPanel.find('input[type=checkbox][name=bdT]')
    if (that.formData.bdT === 'on') {
      $bdTCheckBox.prop('checked', true)
    } else {
      $bdTCheckBox.prop('checked', false)
    }
    let $bdBCheckBox = $propPanel.find('input[type=checkbox][name=bdB]')
    if (that.formData.bdB === 'on') {
      $bdBCheckBox.prop('checked', true)
    } else {
      $bdBCheckBox.prop('checked', false)
    }
    let $bdLCheckBox = $propPanel.find('input[type=checkbox][name=bdL]')
    if (that.formData.bdL === 'on') {
      $bdLCheckBox.prop('checked', true)
    } else {
      $bdLCheckBox.prop('checked', false)
    }
    let $bdRCheckBox = $propPanel.find('input[type=checkbox][name=bdR]')
    if (that.formData.bdR === 'on') {
      $bdRCheckBox.prop('checked', true)
    } else {
      $bdRCheckBox.prop('checked', false)
    }

    let $bdWidthInput = $propPanel.find('input[type=text][name=bdWidth]')
    $bdWidthInput.val(that.formData.bdWidth)
    let $bdStyleRadio = $propPanel.find('input[type=radio][name=bdStyle]')
    $bdStyleRadio.filter(`[value="${that.formData.bdStyle}"]`).prop('checked', true)
    let $bdColorInput = $propPanel.find('input[type=text][name=bdColor]')
    $bdColorInput.val(that.formData.bdColor)
    if (that.formData.bdColor) {
      $bdColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.bdColor)
    }else{
      $bdColorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }

    //移上边框
    let $mbdTCheckBox = $propPanel.find('input[type=checkbox][name=mbdT]')
    if (that.formData.mbdT === 'on') {
      $mbdTCheckBox.prop('checked', true)
    } else {
      $mbdTCheckBox.prop('checked', false)
    }
    let $mbdBCheckBox = $propPanel.find('input[type=checkbox][name=mbdB]')
    if (that.formData.mbdB === 'on') {
      $mbdBCheckBox.prop('checked', true)
    } else {
      $mbdBCheckBox.prop('checked', false)
    }
    let $mbdLCheckBox = $propPanel.find('input[type=checkbox][name=mbdL]')
    if (that.formData.mbdL === 'on') {
      $mbdLCheckBox.prop('checked', true)
    } else {
      $mbdLCheckBox.prop('checked', false)
    }
    let $mbdRCheckBox = $propPanel.find('input[type=checkbox][name=mbdR]')
    if (that.formData.mbdR === 'on') {
      $mbdRCheckBox.prop('checked', true)
    } else {
      $mbdRCheckBox.prop('checked', false)
    }

    let $mbdWidthInput = $propPanel.find('input[type=text][name=mbdWidth]')
    $mbdWidthInput.val(that.formData.mbdWidth)
    let $mbdStyleRadio = $propPanel.find('input[type=radio][name=mbdStyle]')
    $mbdStyleRadio.filter(`[value="${that.formData.mbdStyle}"]`).prop('checked', true)
    let $mbdColorInput = $propPanel.find('input[type=text][name=mbdColor]')
    $mbdColorInput.val(that.formData.mbdColor)
    if (that.formData.mbdColor) {
      $mbdColorInput.prev().find(".sp-preview-inner").css("background-color",that.formData.mbdColor)
    }else{
      $mbdColorInput.prev().find(".sp-preview-inner").css("background-color",'')
    }

    let $mbdTsDurInput = $propPanel.find('input[type=text][name=mbdTsDur]')
    $mbdTsDurInput.val(that.formData.mbdTsDur)
    let $mbdTsFunRadio = $propPanel.find('input[type=radio][name=mbdTsFun]')
    $mbdTsFunRadio.filter(`[value="${that.formData.mbdTsFun}"]`).prop('checked', true)

    let $mbdTsAntRadio = $propPanel.find('input[type=radio][name=mbdTsAnt]')
    $mbdTsAntRadio.filter(`[value="${that.formData.mbdTsAnt}"]`).prop('checked', true)
}

//绑定侧边 边框 
export function initPorpBorder($propPanel,that) {
  // 以下是默认边框
  let $bdTCheckBox = $propPanel.find('input[type=checkbox][name=bdT]')
  $bdTCheckBox.change(function() {
    let val = $(this).is(':checked')
    that.update({bdT: val ? 'on' : 'off'})
  })
  let $bdBCheckBox = $propPanel.find('input[type=checkbox][name=bdB]')
  $bdBCheckBox.change(function() {
    let val = $(this).is(':checked')
    that.update({bdB: val ? 'on' : 'off'})
  })
  let $bdLCheckBox = $propPanel.find('input[type=checkbox][name=bdL]')
  $bdLCheckBox.change(function() {
    let val = $(this).is(':checked')
    that.update({bdL: val ? 'on' : 'off'})
  })
  let $bdRCheckBox = $propPanel.find('input[type=checkbox][name=bdR]')
  $bdRCheckBox.change(function() {
    let val = $(this).is(':checked')
    that.update({bdR: val ? 'on' : 'off'})
  })
  let $bdWidthInput = $propPanel.find('input[type=text][name=bdWidth]') 
  $bdWidthInput.keyup(function() {
    let val = $(this).val()
    that.update({bdWidth: val})
  })
  let $bdColorInput = $propPanel.find('input[type=text][name=bdColor]') 
  $bdColorInput.change(function() {
    let val = $(this).val()
    that.update({bdColor: val})
  })
  let $bdStyleRadio = $propPanel.find('input[type=radio][name=bdStyle]')
  $bdStyleRadio.change(function() {
    let val = $(this).prop('value')
    that.update({bdStyle: val})
  })
  // 以下是经过边框 
  let $mbdTCheckBox = $propPanel.find('input[type=checkbox][name=mbdT]')
  $mbdTCheckBox.change(function() {
    let val = $(this).is(':checked')
    that.update({mbdT: val ? 'on' : 'off'})
  })
  let $mbdBCheckBox = $propPanel.find('input[type=checkbox][name=mbdB]')
  $mbdBCheckBox.change(function() {
    let val = $(this).is(':checked')
    that.update({mbdB: val ? 'on' : 'off'})
  })
  let $mbdLCheckBox = $propPanel.find('input[type=checkbox][name=mbdL]')
  $mbdLCheckBox.change(function() {
    let val = $(this).is(':checked')
    that.update({mbdL: val ? 'on' : 'off'})
  })
  let $mbdRCheckBox = $propPanel.find('input[type=checkbox][name=mbdR]')
  $mbdRCheckBox.change(function() {
    let val = $(this).is(':checked')
    that.update({mbdR: val ? 'on' : 'off'})
  })
  let $mbdWidthInput = $propPanel.find('input[type=text][name=mbdWidth]') 
  $mbdWidthInput.keyup(function() {
    let val = $(this).val()
    that.update({mbdWidth: val})
  })
  let $mbdColorInput = $propPanel.find('input[type=text][name=mbdColor]') 
  $mbdColorInput.change(function() {
    let val = $(this).val()
    that.update({mbdColor: val})
  })
  let $mbdStyleRadio = $propPanel.find('input[type=radio][name=mbdStyle]')
  $mbdStyleRadio.change(function() {
    let val = $(this).prop('value')
    that.update({mbdStyle: val})
  })
  //边框动画
  let $mbdTsDurInput = $propPanel.find('input[type=text][name=mbdTsDur]') 
  $mbdTsDurInput.keyup(function() {
    let val = $(this).val()
    that.update({mbdTsDur: val})
  })
  let $mbdTsFunRadio = $propPanel.find('input[type=radio][name=mbdTsFun]')
  $mbdTsFunRadio.change(function() {
    let val = $(this).prop('value')
    that.update({mbdTsFun: val})
  })
  let $mbdTsAntRadio = $propPanel.find('input[type=radio][name=mbdTsAnt]')
  $mbdTsAntRadio.change(function() {
    let val = $(this).prop('value')
    that.update({mbdTsAnt: val})
  })
  //同步默文
  $propPanel.find('.layui-btn-sm').on('click', function() {
    let layer = layui.layer
    layer.msg('你确定  同步默文 边框样式么？', {
      time: 0 //不自动关闭
      ,btn: ['同步', '取消']
      ,yes: function(index){
        tongBuBorder($propPanel,true,that);
        that.update(that.formData)
        layer.close(index)
      }
    });
  })
}
/*同步边框信息*/
export function tongBuBorder($layerElem,$isVal,that) {
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

//生成边框样式
export function toHtmlBorder(formData) {
  var jsonData={ 'bdpdStyle':'','mbdpdStyle':'','Html':'' }
  let bRadius=valEmpty(formData.bRadius)
  let radiusStyle=bRadius !="" ? 'border-radius:'+bRadius+'px;' :''

  let bdT,bdB,bdL,bdR,bdWidth,bdColor,bdStyle
  bdT=valEmpty(formData.bdT)
  bdB=valEmpty(formData.bdB)
  bdL=valEmpty(formData.bdL)
  bdR=valEmpty(formData.bdR)
  
  bdWidth=valInt(formData.bdWidth)
  bdColor=valEmpty(formData.bdColor) !="" ? formData.bdColor : 'transparent';
  bdStyle=valEmpty(formData.bdStyle)

  //移上边框
  let mbdT,mbdB,mbdL,mbdR,mbdWidth,mbdColor,mbdStyle
  mbdT=valEmpty(formData.mbdT)
  mbdB=valEmpty(formData.mbdB)
  mbdL=valEmpty(formData.mbdL)
  mbdR=valEmpty(formData.mbdR)
  
  mbdWidth=valInt(formData.mbdWidth)
  mbdColor=valEmpty(formData.mbdColor) !="" ? formData.mbdColor : 'transparent';
  mbdStyle=valEmpty(formData.mbdStyle)

  //鼠标经过 边框 样式 动画
  let mbdTsDur,mbdTsFun,mbdTsAnt,mbdTsFunVal,mbdTsDurVal,mbdTsAntStyle
  mbdTsDur=valEmpty(formData.mbdTsDur)
  mbdTsFun=valEmpty(formData.mbdTsFun)
  mbdTsAnt=valEmpty(formData.mbdTsAnt)

  mbdTsFunVal=mbdTsFun==='cubic-bezier' ? 'cubic-bezier(0.52, 1.64, 0.37, 0.66)' : mbdTsFun
  mbdTsDurVal=mbdTsDur !="" ? 'transition-duration:'+mbdTsDur+'s;' : ''
  mbdTsAntStyle='transition-timing-function:'+mbdTsFunVal+';'+mbdTsDurVal
  
  let btw,bbw,blw,brw,pdOnStyle='' 
  btw=0
  bbw=0
  blw=0
  brw=0

   
  if(bdT==="on"){
    btw=bdWidth
    pdOnStyle+='padding-top:'+btw+'px;'
  }
  if(bdB==="on"){
    bbw=bdWidth
    pdOnStyle+='padding-bottom:'+bbw+'px;'
  }
  if(bdL==="on"){
    blw=bdWidth
    pdOnStyle+='padding-left:'+blw+'px;'
  }
  if(bdR==="on"){
    brw=bdWidth
    pdOnStyle+='padding-right:'+brw+'px;'
  }
  let mbtw,mbbw,mblw,mbrw,pdOffStyle
  mbtw=0
  mbbw=0
  mblw=0
  mbrw=0
  if(mbdT==="on"){
    mbtw=mbdWidth
    pdOffStyle+='padding-top:'+btw+'px;'
  }
  if(mbdB==="on"){
    mbbw=mbdWidth
    pdOffStyle+='padding-bottom:'+bbw+'px;'
  }
  if(mbdL==="on"){
    mblw=mbdWidth
    pdOffStyle+='padding-left:'+blw+'px;'
  }
  if(mbdR==="on"){
    mbrw=mbdWidth
    pdOffStyle+='padding-right:'+brw+'px;'
  }
  let alHtml='',almHtml,ltHtml,lbHtml,llHtml,lrHtml
  let htmlList=[]
  
  if(bdT==="on" || bdB==="on" || bdL==="on" || bdR==="on"){
    alHtml='<div class="bk-aline" style="'+mbdTsAntStyle+radiusStyle+'border-color:'+bdColor+';border-style:'+bdStyle+';border-top-width:'+btw+'px;border-bottom-width:'+bbw+'px;border-left-width:'+blw+'px;border-right-width:'+brw+'px;" ></div>' //所有
    htmlList.push(alHtml)
  }

  almHtml='<div class="bk-mline" style="'+mbdTsAntStyle+radiusStyle+'border-color:'+mbdColor+';border-style:'+mbdStyle+';border-top-width:'+mbtw+'px;border-bottom-width:'+mbbw+'px;border-left-width:'+mblw+'px;border-right-width:'+mbrw+'px;" ></div>'  //移上所有

  ltHtml='<div class="bk-line w-lt" style="'+mbdTsAntStyle+'border-top-style:'+mbdStyle+';border-top-color:'+mbdColor+';border-top-width:'+mbdWidth+'px;"></div>'
  lbHtml='<div class="bk-line w-lb" style="'+mbdTsAntStyle+'border-bottom-style:'+mbdStyle+';border-bottom-color:'+mbdColor+';border-bottom-width:'+mbdWidth+'px;"></div>'
  llHtml='<div class="bk-line w-ll" style="'+mbdTsAntStyle+'border-left-style:'+mbdStyle+';border-left-color:'+mbdColor+';border-left-width:'+mbdWidth+'px;"></div>'
  lrHtml='<div class="bk-line w-lr" style="'+mbdTsAntStyle+'border-right-style:'+mbdStyle+';border-right-color:'+mbdColor+';border-right-width:'+mbdWidth+'px;"></div>'

  if(mbdTsAnt=='bdtx0' || mbdTsAnt=='bdtx1'){
    if(mbdT==="on" || mbdB==="on" || mbdL==="on" || mbdR==="on"){
     htmlList.push(almHtml)
    }
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
  jsonData.bdpdStyle=pdOnStyle
  jsonData.mbdpdStyle=pdOffStyle
  jsonData.Html=htmlList.join('')

  return jsonData

}
 