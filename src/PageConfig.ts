import Stage from "./Stage";

export default class PageConfig {
  stage: Stage
  pageWidth: number
  pageHeight: number
  constructor(stage) {
    this.stage = stage;
    let $el = $('.page-config');
    let $inputWidth = $el.find('.input-width');
    let $inputHeight = $el.find('.input-height');
    let $inputBg = $el.find('.input-bg');
    let $calcWidth = $el.find('.calc-width');
    let $calcHeight = $el.find('.calc-height');
    let $alignSelect = $el.find('.align-select');

    this.pageWidth = 1000;
    this.pageHeight = 600;

    $inputWidth.val(this.pageWidth)
    $inputHeight.val(this.pageHeight)

    let align = '50% 0'


    // @ts-ignore
    //颜色选择器
    $(document).spectrum({
      showPalette : !0,
      maxSelectionSize : 18,
      showInitial : !0,
      preferredFormat : 'hex',
      showButtons : !1,
      palette: [
          ['#000','#444','#666','#999','#ccc','#eee','#f3f3f3','#fff'],
          ['#f00','#f90','#ff0','#0f0','#0ff','#00f','#90f','#f0f'],
          ['#900','#b45f06','#bf9000','#38761d','#134f5c','#0b5394','#351c75','#741b47']
      ],
      move: function(color) {
        // console.log(color)
        // if (typeof color === 'object') {
        //   stage.$canvas.css('background-color', color.toHexString() + '');
        // }
      }
    }).spectrum.freshSpan();

    let that = this;

    $inputWidth.change(function () {
      that.pageWidth = +$(this).val();
      stage.setCanvasSize(that.pageWidth, that.pageHeight)
    });

    $inputHeight.change(function () {
      that.pageHeight = +$(this).val();
      stage.setCanvasSize(that.pageWidth, that.pageHeight)
    });

    $inputBg.change(function() {
      stage.$canvas.css('background-image',  `url("${$(this).val()}")`)
    })
    $alignSelect.change(function() {
      stage.$canvas.css('background-position', $(this).val())
    })
  }
}
