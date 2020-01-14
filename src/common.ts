
export function setFontOption(select) {
  let $select = $(select)
  let htmlStr = $select.html().trim().replace(/\s/g, '')
  if (htmlStr !== '') {
    return
  }
  let data =  [{"value":"宋体", "text":"宋体33"},
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
  $select.append(options)
}
