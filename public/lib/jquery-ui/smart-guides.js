var SmartGuides = function (params) {
  var self = this;
  self.elementPositions = [];
  self.mockGuides = [];

  // Params
  self.tolerance = 5;
  self.guideClass = 'guide mock-guide draggable';
  self.appendGuideTo = ':not(.selected):visible';
  self.vClass = 'guide-y';
  self.hClass = 'guide-x';
  self.color = $.ui.draggable.guideColor || '#FF4AFF';

  for (var i in params) {
    self[i] = params[i] || self[i];
  }
};

SmartGuides.prototype.defineElementPositions = function (elements) {
  var self = this;
  self.elementPositions = [];

  if (!elements || elements.length == 0) {
    elements = $(self.appendGuideTo);
  }

  $.each(elements, function () {
    self.elementPositions.push(SmartGuides.getRect($(this)));
  });
}

SmartGuides.prototype.addGuides = function (element, directionObj) {
  var self = this;
  self.clear();

  var offsets = {
    left: 0, right: 2,
    top: 0, bottom: 2
  }

  if (directionObj == null) {
    directionObj = {
      left: true, top: true,
      right: true, bottom: true,
      vCenter: true, hCenter: true,
    }
  }
  var container = element.parent();
  var rect = SmartGuides.getRect(element);
  for (var i = 0, lng = self.elementPositions.length; i < lng; i++) {
    var otherRect = self.elementPositions[i];
    var nearResults = self.near(rect, otherRect, directionObj);
    if (nearResults.length > 0) {
      for (var j = 0; j < nearResults.length; j++) {
        var nearResult = nearResults[j];
        var mockGuide = $('<div></div>')
          .addClass(self.guideClass)
          .appendTo(container);
        self.mockGuides.push(mockGuide);
        mockGuide.css('border-color', self.color);
        switch (nearResult.edge) {
          case 'left':
          case 'right':
            mockGuide.addClass(self.vClass).css({
              height: Math.abs(nearResult.size),
              left: otherRect[nearResult.edge] + offsets[nearResult.edge],
              top: Math.min(rect.top, otherRect.top)
            });
            break;
          case 'hCenter':
            mockGuide.addClass(self.hClass).css({
              width: nearResult.size,
              left: nearResult.p1,
              top: nearResult.lt
            });
            break;
          case 'vCenter':
            mockGuide.addClass(self.vClass).css({
              height: nearResult.size,
              left: nearResult.lt,
              top: nearResult.p1
            });
            break;
          case 'top':
          case 'bottom':
            mockGuide.addClass(self.hClass).css({
              width: Math.abs(nearResult.size),
              left: Math.min(rect.left, otherRect.left),
              top: otherRect[nearResult.edge] + offsets[nearResult.edge]
            });
            break;
        }
        var distText = self.createDistText(nearResult.edge, rect, otherRect);
        if (distText) {
          mockGuide.append(distText);
        }
      }
    }
  }

  return self.mockGuides;
}

SmartGuides.prototype.createDistText = function (flag, rect, otherRect) {
  var top = otherRect.top;
  var bottom = otherRect.bottom;
  var left = otherRect.left;
  var right = otherRect.right;
  var height = otherRect.height;
  var width = otherRect.width;

  var itemWidthHalf = width / 2;
  var itemHeightHalf = height / 2;
  var dragWidthHalf = rect.width / 2;
  var dragHeightHalf = rect.height / 2;

  var textBox = document.createElement('div');
  textBox.style.position = 'absolute';
  // textBox.style.background = '#000000';
  textBox.style.textAlign = 'center';
  var text = document.createElement('span');
  var distance = 0;
  var textHeight = 14;
  text.style.background = this.color;
  text.style.borderRadius = '2px';
  text.style.lineHeight = '14px';
  text.style.padding = '0 2px';
  text.style.fontSize = '10px';
  text.style.color = '#ffffff';
  text.style.userSelect='none';
  textBox.appendChild(text);

  if (flag === 'top' || flag === 'bottom') {
    textBox.style.bottom = '0px';
    if (left < rect.left) {
      distance = rect.left - right;
      textBox.style.left = width + 'px';
    } else {
      distance = left - rect.right;
      textBox.style.left = rect.width + 'px';
    }
    distance = Math.round(distance);
    if (distance < 0) return null;
    textBox.style.width = distance + 'px';
    textBox.style.paddingBottom = '2px';
    text.innerText = distance + 'px';

  } if (flag === 'left' || flag === 'right') {
    textBox.style.left = '0px';
    if (top < rect.top) {
      distance = rect.top - bottom;
      textBox.style.top = height + 'px';
    } else {
      distance = top - rect.bottom;
      textBox.style.top = rect.height + 'px';
    }
    distance = Math.round(distance);
    if (distance < 0) return null
    text.style.position = 'absolute';
    text.style.top = '50%';
    text.style.marginTop = -(textHeight / 2) + 'px';
    text.style.left = '2px';
    textBox.style.height = distance + 'px';
    text.innerText = distance + 'px';

  } else if (flag === 'hCenter') {
    textBox.style.bottom = '0px';
    if (left < rect.left) {
      distance = rect.left - right;
      textBox.style.left = itemWidthHalf + 'px';
    } else {
      distance = left - rect.right;
      textBox.style.left = dragWidthHalf + 'px';
    }
    distance = Math.round(distance);
    if (distance < 0) return null;
    textBox.style.paddingBottom = '2px';
    textBox.style.width = distance + 'px';
    text.innerText = distance + 'px';
  } else if (flag === 'vCenter') {
    textBox.style.left = '0px';
    if (top < rect.top) {
      distance = rect.top - bottom;
      textBox.style.top = itemHeightHalf + 'px';
    } else {
      distance = top - rect.bottom;
      textBox.style.top = dragHeightHalf + 'px';
    }
    distance = Math.round(distance);
    if (distance < 0) return null
    text.style.position = 'absolute';
    text.style.top = '50%';
    text.style.marginTop = -(textHeight / 2) + 'px';
    text.style.left = '2px';
    textBox.style.height = distance + 'px';
    text.innerText = distance + 'px';
  }

  return textBox
}

SmartGuides.prototype.near = function (rect, otherRect, directionObj) {
  return SmartGuides.near.call(this, rect, otherRect, directionObj);
}

SmartGuides.prototype.getClosestGuides = function (el, directionObj) {
  return SmartGuides.getClosestGuides.call(this, el, this.mockGuides, directionObj);
}

SmartGuides.prototype.clear = function () {
  $.each(this.mockGuides, function () {
    $(this).remove();
  });
  this.mockGuides = [];
}

/* static */
SmartGuides.getScale = function (element) {
  var rect = element.get(0).getBoundingClientRect();
  return {
    x: 1, //rect.width / element.outerWidth(),
    y: 1 //rect.height / element.outerHeight()
  };
}

SmartGuides.getRect = function (element) {
  var scale = SmartGuides.getScale(element);
  var left = parseFloat(element.css('left')),
    top = parseFloat(element.css('top')),
    width = parseFloat(getComputedStyle(element.get(0)).width) * scale.x,
    height = parseFloat(getComputedStyle(element.get(0)).height) * scale.y;

  return {
    left: left,
    right: left + width,
    top: top,
    bottom: top + height,
    width: width,
    height: height
  };
};

SmartGuides.near = function (rect, otherRect, directionObj) {
  var tolerance = this.tolerance || 5,
    result = [],
    opposites = {left: 'right', right: 'left', top: 'bottom', bottom: 'top'};

  function inTolerance(num1, num2) {
    return num1 < num2 + tolerance && num1 > num2 - tolerance;
  }

  function getGuideLength(isVert) {
    return isVert ?
      Math.max(otherRect.bottom - rect.top, rect.bottom - otherRect.top, otherRect.height, rect.height) :
      Math.max(otherRect.right - rect.left, rect.right - otherRect.left, otherRect.width, rect.width);
  }

  function setGuideInfo(dir, rect, otherRect, result) {
    var dirMap = {
      'vCenter': ['width', 'left', 'height', 'top', 'right'],
      'hCenter': ['height', 'top', 'width', 'left', 'bottom'],
    }
    var c1 = rect[dirMap[dir][0]] / 2 + rect[dirMap[dir][1]];
    var c2 = otherRect[dirMap[dir][0]] / 2 + otherRect[dirMap[dir][1]];
    var t1 = rect[dirMap[dir][2]] / 2 + rect[dirMap[dir][3]];
    var t2 = otherRect[dirMap[dir][2]] / 2 + otherRect[dirMap[dir][3]];
    if (directionObj[i] && inTolerance(c1, c2)){
      result.push({
          edge: i,
          p1: t1 < t2 ? t1 : t2,
          lt: c2,
          size: Math.abs(t1 - t2)
        }
      );
    } else if (directionObj[i] && (inTolerance(rect[dirMap[dir][1]], c2) || inTolerance(rect[dirMap[dir][4]], c2))) {
      let half = rect[dirMap[dir][2]] / 2;
      result.push({
          edge: i,
          p1: t1 < t2 ? t1 - half : t2,
          lt: c2,
          size: Math.abs(t1 - t2) + half
        }
      );
    }
  }

  for (var i in directionObj) {
    if (i === 'vCenter' || i == 'hCenter') {
      setGuideInfo(i, rect, otherRect, result);
    } else {
      if ((directionObj[i] && inTolerance(rect[i], otherRect[i])) || (directionObj[opposites[i]] && inTolerance(rect[opposites[i]], otherRect[i]))) {
        result.push({
            edge: i,
            size: getGuideLength(['left', 'right'].indexOf(i) >= 0)
          }
        );
      }
    }
  }
  return result;
}
SmartGuides.getClosestGuides = function (el, mockGuides, directionObj) {
  var self = this,
    hClass = self.hClass || 'guide-x',
    vClass = self.vClass || 'guide-y';

  if (directionObj == null) {
    directionObj = {left: true, top: true, right: false, bottom: false};
  }

  // filter. We need max left and top elements.
  var minLeft = Number.MAX_SAFE_INTEGER, minTop = Number.MAX_SAFE_INTEGER,
    maxLeft = Number.MIN_SAFE_INTEGER, maxTop = Number.MIN_SAFE_INTEGER,
    vGuides = [], hGuides = [];

  var coords = SmartGuides.getRect(el);

  $.each(mockGuides, function () {
    var $this = $(this),
      mockRect = SmartGuides.getRect($this),
      leftDiff = Math.abs(directionObj.left ? (coords.left - mockRect.right) : (coords.right - mockRect.left)),
      topDiff = Math.abs(directionObj.top ? (coords.top - mockRect.bottom) : (coords.bottom - mockRect.top));
    $this.css('visibility', 'hidden');

    if ($this.hasClass(vClass)) {
      if (leftDiff < minLeft) {
        minLeft = leftDiff;
        if (vGuides[0]) {
          vGuides[0].css('visibility', 'hidden');
        }
        vGuides[0] = $this.css('visibility', '');
        // .push($this) if limitless
      }
    } else if ($this.hasClass(hClass)) {
      if (topDiff < minTop) {
        minTop = topDiff;
        if (hGuides[0]) {
          hGuides[0].css('visibility', 'hidden');
        }
        hGuides[0] = $this.css('visibility', '');
        // .push($this) if limitless
      }
    }
  });

  return vGuides.concat(hGuides);
}
