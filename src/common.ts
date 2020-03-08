export function isEmpty(v) {
    switch (typeof v) {
    case 'undefined':
        return true;
    case 'string':
        if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
        break;
    case 'boolean':
        if (!v) return true;
        break;
    case 'number':
        if (0 === v || isNaN(v)) return true;
        break;
    case 'object':
        if (null === v || v.length === 0) return true;
        for (var i in v) {
            return false;
        }
        return true;
    }
    return false;
}
export function setFontOption($select) {
  //let $select = $(select)
  let htmlStr = $select.html().trim().replace(/\s/g, '')
  if (htmlStr !== '') {
    return
  }
  let data =  [{"value":"Roboto", "text":"Roboto"},
    {"value":"Helvetica Neue", "text":"Helvetica Neue"},
    {"value":"Helvetica", "text":"Helvetica"},
    {"value":"Tahoma", "text":"Tahoma"},
    {"value":"Arial", "text":"Arial"},
    {"value":"PingFang SC", "text":"PingFang SC"},
    {"value":"Microsoft YaHei", "text":"Microsoft YaHei"}];
  let options = ''
  for (let d of data) {
    options += `<option value="${d.value}">${d.text}</option>`
  }
  $select.append(options)
}

 

/*旋转*/
export function setAntSpinvOption($select) {
  //let $select = $(select)
  let htmlStr = $select.html().trim().replace(/\s/g, '')
  if (htmlStr !== '') {
    return
  }
  let data =[{"value":"0","text":"0度"},
    {"value":"2","text":"2度"},
    {"value":"5","text":"5度"},
    {"value":"10","text":"10度"},
    {"value":"20","text":"20度"},
    {"value":"30","text":"30度"},
    {"value":"40","text":"40度"},
    {"value":"50","text":"50度"},
    {"value":"60","text":"60度"},
    {"value":"70","text":"70度"},
    {"value":"80","text":"80度"},
    {"value":"90","text":"90度"},
    {"value":"120","text":"120度"},
    {"value":"180","text":"180度"},
    {"value":"270","text":"270度"},
    {"value":"360","text":"360度"},
    {"value":"720","text":"720度"}];
  let options = ''
  for (let d of data) {
    options += `<option value="${d.value}">${d.text}</option>`
  }
  $select.append(options)
}

/*默认缩放*/
export function setAntMrZoomOption($select) {
  //let $select = $(select)
  let htmlStr = $select.html().trim().replace(/\s/g, '')
  if (htmlStr !== '') {
    return
  }
  let data = [{"value":"","text":"无效果"},
      {"value":"xins-mr-sf0","text":"缩小至消失"},
      {"value":"xins-mr-sf02","text":"缩小至0.2倍"},
      {"value":"xins-mr-sf04","text":"缩小至0.4倍"},
      {"value":"xins-mr-sf05","text":"缩小至0.5倍"},
      {"value":"xins-mr-sf06","text":"缩小至0.6倍"},
      {"value":"xins-mr-sf08","text":"缩小至0.7倍"},
      {"value":"xins-mr-sf09","text":"缩小至0.9倍"},
      {"value":"xins-mr-sf095","text":"缩小至0.95倍度"},
      {"value":"xins-mr-sf098","text":"缩小至0.98倍"},
      {"value":"xins-mr-sf1","text":"原始尺寸"},
      {"value":"xins-mr-sf102","text":"放大至1.02倍"},
      {"value":"xins-mr-sf105","text":"放大至1.05倍"},
      {"value":"xins-mr-sf110","text":"放大至1.1倍"},
      {"value":"xins-mr-sf120","text":"放大至1.2倍"},
      {"value":"xins-mr-sf150","text":"放大至1.3倍"},
      {"value":"xins-mr-sf180","text":"放大至1.8倍"},
      {"value":"xins-mr-sf200","text":"放大至2倍"}];
  let options = ''
  for (let d of data) {
    options += `<option value="${d.value}">${d.text}</option>`
  }
  $select.append(options)
}
/*移上缩放*/
export function setAntMvZoomOption($select) {
  //let $select = $(select)
  let htmlStr = $select.html().trim().replace(/\s/g, '')
  if (htmlStr !== '') {
    return
  }
  let data = [{"value":"","text":"无效果"},
      {"value":"xins-box-sf0","text":"缩小至消失"},
      {"value":"xins-box-sf02","text":"缩小至0.2倍"},
      {"value":"xins-box-sf04","text":"缩小至0.4倍"},
      {"value":"xins-box-sf05","text":"缩小至0.5倍"},
      {"value":"xins-box-sf06","text":"缩小至0.6倍"},
      {"value":"xins-box-sf08","text":"缩小至0.7倍"},
      {"value":"xins-box-sf09","text":"缩小至0.9倍"},
      {"value":"xins-box-sf095","text":"缩小至0.95倍度"},
      {"value":"xins-box-sf098","text":"缩小至0.98倍"},
      {"value":"xins-box-sf1","text":"原始尺寸"},
      {"value":"xins-box-sf102","text":"放大至1.02倍"},
      {"value":"xins-box-sf105","text":"放大至1.05倍"},
      {"value":"xins-box-sf110","text":"放大至1.1倍"},
      {"value":"xins-box-sf120","text":"放大至1.2倍"},
      {"value":"xins-box-sf150","text":"放大至1.3倍"},
      {"value":"xins-box-sf180","text":"放大至1.8倍"},
      {"value":"xins-box-sf200","text":"放大至2倍"}];
  let options = ''
  for (let d of data) {
    options += `<option value="${d.value}">${d.text}</option>`
  }
  $select.append(options)
}
/*移动值*/
export function setAntMovevOption($select) {
  //let $select = $(select)
  let htmlStr = $select.html().trim().replace(/\s/g, '')
  if (htmlStr !== '') {
    return
  }
  let data = [
    {"value":"0","text":"0像素"},
    {"value":"5","text":"5像素"},
    {"value":"10","text":"10像素"},
    {"value":"15","text":"15像素"},
    {"value":"20","text":"20像素"},
    {"value":"30","text":"30像素"},
    {"value":"40","text":"40像素"},
    {"value":"50","text":"50像素"},
    {"value":"60","text":"60像素"},
    {"value":"70","text":"70像素"},
    {"value":"80","text":"80像素"},
    {"value":"90","text":"90像素"},
    {"value":"100","text":"100像素"},
    {"value":"70","text":"70像素"},
    {"value":"110","text":"110像素"},
    {"value":"120","text":"120像素"},
    {"value":"130","text":"130像素"},
    {"value":"140","text":"140像素"},
    {"value":"150","text":"150像素"},
    {"value":"160","text":"160像素"},
    {"value":"170","text":"170像素"},
    {"value":"180","text":"180像素"},
    {"value":"190","text":"190像素"},
    {"value":"200","text":"200像素"},
    {"value":"210","text":"210像素"},
    {"value":"220","text":"220像素"},
    {"value":"230","text":"230像素"},
    {"value":"240","text":"240像素"},
    {"value":"250","text":"250像素"},
    {"value":"260","text":"260像素"},
    {"value":"270","text":"270像素"},
    {"value":"280","text":"280像素"},
    {"value":"290","text":"290像素"},
    {"value":"300","text":"300像素"},
    {"value":"310","text":"310像素"},
    {"value":"320","text":"320像素"},
    {"value":"330","text":"330像素"},
    {"value":"340","text":"340像素"},
    {"value":"350","text":"350像素"},
    {"value":"360","text":"360像素"},
    {"value":"370","text":"370像素"},
    {"value":"380","text":"380像素"},
    {"value":"390","text":"390像素"},
    {"value":"400","text":"400像素"},
    {"value":"410","text":"410像素"},
    {"value":"420","text":"420像素"},
    {"value":"430","text":"430像素"},
    {"value":"440","text":"440像素"},
    {"value":"450","text":"450像素"},
    {"value":"460","text":"460像素"},
    {"value":"470","text":"470像素"},
    {"value":"480","text":"480像素"},
    {"value":"490","text":"490像素"},
    {"value":"500","text":"500像素"},
    {"value":"510","text":"510像素"},
    {"value":"520","text":"520像素"},
    {"value":"530","text":"530像素"},
    {"value":"540","text": "540像素"},
    {"value":"550","text": "550像素"},
    {"value":"560","text": "560像素"},
    {"value":"570","text": "570像素"},
    {"value":"580","text": "580像素"},
    {"value":"590","text": "590像素"},
    {"value":"600","text": "600像素"},
    {"value":"610","text": "610像素"},
    {"value":"620","text": "620像素"},
    {"value":"670","text": "670像素"},
    {"value":"720","text": "720像素"},
    {"value":"770","text": "770像素"}, 
    {"value":"820","text": "820像素"},
    {"value":"870","text": "870像素"}, 
    {"value":"920","text": "920像素"},
    {"value":"970","text": "970像素"}, 
    {"value":"820","text": "820像素"},
    {"value":"870","text": "870像素"}, 
    {"value":"1020","text": "1020像素"},
    {"value":"1070","text": "1070像素"}, 
    {"value":"1170","text": "1170像素"},
    {"value":"1220","text": "1220像素"}, 
    {"value":"1270","text": "1270像素"},
    {"value":"1320","text": "1320像素"}, 
    {"value":"1370","text": "1370像素"},
    {"value":"1420","text": "1420像素"}, 
    {"value":"1470","text": "1470像素"},
    {"value":"1520","text": "1520像素"},
    {"value":"1570","text": "1570像素"},
    {"value":"1620","text": "1620像素"}, 
    {"value":"1670","text": "1670像素"},
    {"value":"1720","text": "1720像素"}, 
    {"value":"1770","text": "1770像素"},
    {"value":"1820","text": "1820像素"}, 
    {"value":"1870","text": "1870像素"},
    {"value":"1920","text": "1920像素"},]
  let options = ''
  for (let d of data) {
    options += `<option value="${d.value}">${d.text}</option>`
  }
  $select.append(options)
}
//动画特效
export function setAntBezierOption($select) {
 
  let htmlStr = $select.html().trim().replace(/\s/g, '')
  if (htmlStr !== '') {
    return
  }
  let data =  [{"value":"", "text":"匀速平滑"},
    {"value":"bs", "text":"由慢到快"},
    {"value":"bq", "text":"由快到慢"},
    {"value":"bt", "text":"跑过回头（加速）"},
    {"value":"bc", "text":"起步后撤（加速）"},
    {"value":"bd", "text":"中间停顿（加速）"},
    {"value":"bx", "text":"弹性抖动（1）"}];
  let options = ''
  for (let d of data) {
    options += `<option value="${d.value}">${d.text}</option>`
  }
  $select.append(options)
}

export function setRanDom() {
  var c,
    d,
    e,
    f,
    b = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return c = b[Math.floor(62 * Math.random())],
    d = b[Math.floor(62 * Math.random())],
    e = b[Math.floor(62 * Math.random())],
    f = b[Math.floor(62 * Math.random())],
    c + d + e + f
}
