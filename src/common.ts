
export function setFontOption(select) {
  let data =  [{"value":"宋体", "text":"宋体"},
    {"value":"黑体", "text":"黑体"},
    {"value":"微软雅黑", "text":"雅黑"},
    {"value":"楷体", "text":"楷体"},
    {"value":"arial", "text":"Arial"},
    {"value":"verdana", "text":"Verdana"},
    {"value":"georgia", "text":"Georgia"},
    {"value":"times new roman", "text":"Times New Roman"},
    {"value":"trebuchet ms", "text":"Trebuchet MS"}];
  let options = ''
  for (let d of data) {
    options += `<option value="${d.value}">${d.text}</option>`
  }
  if (select) {
    $(select).append(options)
  }
}
/*旋转*/
export function setAntSpinvOption(select) {
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
  if (select) {
    $(select).append(options)
  }
}

/*缩放*/
export function setAntZoomOption(select) {
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
  if (select) {
    $(select).append(options)
  }
}
