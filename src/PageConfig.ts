import Stage from "./Stage";

export default class PageConfig {
  stage: Stage
  pageWidth: number = 0
  pageHeight: number = 0
  $inputWidth: JQuery
  $inputHeight: JQuery

  constructor() {
    let $el = $('.page-config');
    let $inputWidth = $el.find('.input-width');
    let $inputHeight = $el.find('.input-height');
    let $inputBg = $el.find('.input-bg');
    let $calcWidth = $el.find('.calc-width');
    let $calcHeight = $el.find('.calc-height');
    let $alignSelect = $el.find('.align-select');
    let $allowOverstep = $el.find('#allowOverstep')

    this.$inputWidth = $inputWidth
    this.$inputHeight = $inputHeight

    let align = '50% 0'
    let that = this;
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
      move: function(color, $input) {
        let id = $input.attr('id')
        if (id === 'inputBgColor' && that.stage) {
          if (!color) {
            that.stage.$canvasBox.addClass('bg-trans');
            that.stage.$canvas.css('background-color', 'transparent');
            that.stage.props.bgColor = 'transparent'
          }
          if (typeof color === 'object') {
            let colorHex = color.toHexString()
            that.stage.$canvasBox.removeClass('bg-trans')
            that.stage.$canvas.css('background-color', colorHex + '');
            that.stage.props.bgColor = colorHex
          }
        }
      }
    }).spectrum.freshSpan();

    $inputWidth.bind('input', function() {
      that.pageWidth = +$(this).val();
      that.stage.setCanvasSize(that.pageWidth, that.pageHeight)
    });

    $inputHeight.bind('input', function() {
      that.pageHeight = +$(this).val();
      that.stage.setCanvasSize(that.pageWidth, that.pageHeight)
    });

    $inputBg.bind('input', function() {
      let img = $(this).val()
      that.stage.props.bgImg = img
      that.stage.$canvas.css('background-image',  `url("${img}")`)
    })
    $alignSelect.change(function() {
      let alignValue = $(this).val()
      that.stage.$canvas.css('background-position', `${alignValue}`)
      that.stage.props.position = alignValue
    })

    $allowOverstep.bind('click', function() {
      if ($allowOverstep.hasClass('active')) {
        $allowOverstep.removeClass('active')
        that.stage.props.overflow = 'hidden'
        that.stage.setComponentAllowOverstep(false)
      } else {
        $allowOverstep.addClass('active')
        that.stage.props.overflow = 'visible'
        that.stage.setComponentAllowOverstep(true)
      }
    })
    $el.find('.bgImg-box .page-check').bind('click', function() {
      let $this = $(this)
      let val = $this.data('val')
      console.log(val)
      if ($this.hasClass('active')) {
        $this.removeClass('active')
        if (val === 'repeat') {
          that.stage.$canvas.css('background-repeat', '')
          that.stage.props.repeat = ''
        }
        if (val === 'fixed') {
          that.stage.$canvas.css('background-attachment', '')
          that.stage.props.attachment = ''
        }

      } else {
        $this.addClass('active')
        if (val === 'repeat') {
          that.stage.$canvas.css('background-repeat', 'repeat')
          that.stage.props.repeat = 'repeat'
        }
        if (val === 'fixed') {
          that.stage.$canvas.css('background-attachment', 'fixed')
          that.stage.props.attachment = 'fixed'
        }
      }
    })
  }

  setStage(stage) {
    this.stage = stage
    this.pageWidth = stage.pageWidth;
    this.pageHeight = stage.pageHeight;
    this.$inputWidth.val(this.pageWidth)
    this.$inputHeight.val(this.pageHeight)
  }
}
