Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
/*
window.parseIntNative = window.parseInt
function parseInt(num) {
  if (num) {
     return window.parseIntNative(num)
  }
  return ''
}
window.parseInt = parseInt
*/
familyOption = function () {
 var html='';
 var josnArry = [
      {"value":"宋体","text":"宋体"},
      {"value":"黑体","text":"黑体"},
      {"value":"微软雅黑","text":"雅黑"},
      {"value":"楷体","text":"楷体"},
      {"value":"arial","text":"Arial"},
      {"value":"verdana","text":"Verdana"},
      {"value":"georgia","text":"Georgia"},
      {"value":"times new roman","text":"Times New Roman"},
      {"value":"trebuchet ms","text":"Trebuchet MS"}];
 
      for(var i in josnArry ){ 
           
          html+='<option value="'+josnArry[i].value+'">'+josnArry[i].text+'</option>';
      }
    return html;
}


Array.prototype.css3MoveMode = function (val) {
optionJson = [
    {"value":"0","name":"0像素"},
    {"value":"5","name":"5像素"},
    {"value":"10","name":"10像素"},
    {"value":"15","name":"15像素"},
    {"value":"20","name":"20像素"},
    {"value":"30","name":"30像素"},
    {"value":"40","name":"40像素"},
    {"value":"50","name":"50像素"},
    {"value":"60","name":"60像素"},
    {"value":"70","name":"70像素"},
    {"value":"80","name":"80像素"},
    {"value":"90","name":"90像素"},
    {"value":"100","name":"100像素"},
    {"value":"70","name":"70像素"},
    {"value":"110","name":"110像素"},
    {"value":"120","name":"120像素"},
    {"value":"130","name":"130像素"},
    {"value":"140","name":"140像素"},
    {"value":"150","name":"150像素"},
    {"value":"160","name":"160像素"},
    {"value":"170","name":"170像素"},
    {"value":"180","name":"180像素"},
    {"value":"190","name":"190像素"},
    {"value":"200","name":"200像素"},
    {"value":"210","name":"210像素"},
    {"value":"220","name":"220像素"},
    {"value":"230","name":"230像素"},
    {"value":"240","name":"240像素"},
    {"value":"250","name":"250像素"},
    {"value":"260","name":"260像素"},
    {"value":"270","name":"270像素"},
    {"value":"280","name":"280像素"},
    {"value":"290","name":"290像素"},
    {"value":"300","name":"300像素"},
    {"value":"310","name":"310像素"},
    {"value":"320","name":"320像素"},
    {"value":"330","name":"330像素"},
    {"value":"340","name":"340像素"},
    {"value":"350","name":"350像素"},
    {"value":"360","name":"360像素"},
    {"value":"370","name":"370像素"},
    {"value":"380","name":"380像素"},
    {"value":"390","name":"390像素"},
    {"value":"400","name":"400像素"},
    {"value":"410","name":"410像素"},
    {"value":"420","name":"420像素"},
    {"value":"430","name":"430像素"},
    {"value":"440","name":"440像素"},
    {"value":"450","name":"450像素"},
    {"value":"460","name":"460像素"},
    {"value":"470","name":"470像素"},
    {"value":"480","name":"480像素"},
    {"value":"490","name":"490像素"},
    {"value":"500","name":"500像素"},
    {"value":"510","name":"510像素"},
    {"value":"520","name":"520像素"},
    {"value":"530","name":"530像素"},
    {"value":"540","name": "540像素"},
    {"value":"550","name": "550像素"},
    {"value":"560","name": "560像素"},
    {"value":"570","name": "570像素"},
    {"value":"580","name": "580像素"},
    {"value":"590","name": "590像素"},
    {"value":"600","name": "600像素"},
    {"value":"610","name": "610像素"},
    {"value":"620","name": "620像素"},
    {"value":"670","name": "670像素"},
    {"value":"720","name": "720像素"},
    {"value":"770","name": "770像素"}, 
    {"value":"820","name": "820像素"},
    {"value":"870","name": "870像素"}, 
    {"value":"920","name": "920像素"},
    {"value":"970","name": "970像素"}, 
    {"value":"820","name": "820像素"},
    {"value":"870","name": "870像素"}, 
    {"value":"1020","name": "1020像素"},
    {"value":"1070","name": "1070像素"}, 
    {"value":"1170","name": "1170像素"},
    {"value":"1220","name": "1220像素"}, 
    {"value":"1270","name": "1270像素"},
    {"value":"1320","name": "1320像素"}, 
    {"value":"1370","name": "1370像素"},
    {"value":"1420","name": "1420像素"}, 
    {"value":"1470","name": "1470像素"},
    {"value":"1520","name": "1520像素"},
    {"value":"1570","name": "1570像素"},
    {"value":"1620","name": "1620像素"}, 
    {"value":"1670","name": "1670像素"},
    {"value":"1720","name": "1720像素"}, 
    {"value":"1770","name": "1770像素"},
    {"value":"1820","name": "1820像素"}, 
    {"value":"1870","name": "1870像素"},
    {"value":"1920","name": "1920像素"},];
}
