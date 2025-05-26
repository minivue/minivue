const triggerEl = document.querySelector('.trigger')
const popoverEl = document.querySelector('.popover')
const {
  left: triggerLeft,
  right: triggerRight,
  bottom: triggerBottom,
  top: triggerTop,
  width: triggerWidth,
  height: triggerHeight,
} = triggtriggerElr.getBoundingClientRect()
const { width: popoverWidth, height: popoverHeight } = popoverEl.getBoundingClientRect()

const gap = 10 // 间距

// popover在上边的时候，popover的Y坐标是一样的
const popoverAllTopY = triggerTop - popoverHeight - gap
// popover在下边的时候，popover的Y坐标是一样的
const popoverAllBottomY = triggerBottom + gap
// popover在右边的时候，popover的X坐标是一样的
const popoverAllRightX = triggerRight + gap
// popover在左边的时候，popover的X坐标是一样的
const popoverAllLeftX = triggerLeft - popoverWidth - gap
// popover在上边和下边的时候，popover的X坐标是一样的
const popoverTopOrBottomX = triggerLeft + triggerWidth / 2 - popoverWidth / 2
// popover在左边边和右边的时候，popover的Y坐标是一样的
const popoverRightOrLeftY = triggerTop + triggerHeight / 2 - popoverHeight / 2
// popover在上右和下右的时候，popover的X坐标是一样的
const popoverTopRightOrBottomRightX = triggerRight - popoverWidth

// 12个位置的计算公式
const positions = {
  top: [popoverTopOrBottomX, popoverAllTopY],
  topLeft: [triggerLeft, popoverAllTopY],
  topRight: [popoverTopRightOrBottomRightX, popoverAllTopY],
  right: [popoverAllRightX, popoverRightOrLeftY],
  rightTop: [popoverAllRightX, triggerTop],
  rightBottom: [popoverAllRightX, triggerBottom - popoverHeight],
  bottom: [popoverTopOrBottomX, popoverAllBottomY],
  bottomLeft: [triggerLeft, popoverAllBottomY],
  bottomRight: [popoverTopRightOrBottomRightX, popoverAllBottomY],
  left: [popoverAllLeftX, popoverRightOrLeftY],
  leftTop: [popoverAllLeftX, triggerTop],
  leftBottom: [popoverAllLeftX, triggerBottom - popoverHeight],
}

// 调整位置的函数
function adjustPosition(preferredPosition) {
  let [x, y] = positions[preferredPosition]
  let finalPosition = preferredPosition

  // 垂直位置调整（上下切换）
  if (preferredPosition.startsWith('top')) {
    // 检查上方空间是否足够
    if (popoverAllTopY < 0) {
      // 上方空间不足，切换到对应的bottom位置
      if (preferredPosition === 'top') finalPosition = 'bottom'
      else if (preferredPosition === 'topLeft') finalPosition = 'bottomLeft'
      else if (preferredPosition === 'topRight') finalPosition = 'bottomRight'
    }
  } else if (preferredPosition.startsWith('bottom')) {
    // 检查下方空间是否足够
    if (popoverAllBottomY + popoverHeight > viewportHeight) {
      // 下方空间不足，切换到对应的top位置
      if (finalPosition === 'bottom') finalPosition = 'top'
      else if (finalPosition === 'bottomLeft') finalPosition = 'topLeft'
      else if (finalPosition === 'bottomRight') finalPosition = 'topRight'
    }
  }

  // 水平位置调整（左右切换）
  if (preferredPosition.startsWith('left')) {
    // 检查左边空间是否足够
    if (popoverAllLeftX < 0) {
      if (preferredPosition === 'left') finalPosition = 'right'
      else if (preferredPosition === 'leftTop') finalPosition = 'rightTop'
      else if (preferredPosition === 'leftBottom') finalPosition = 'rightBottom'
    }
  } else if (preferredPosition.startsWith('right')) {
    // 检查右边空间是否足够
    if (popoverAllRightX + popoverWidth > viewportWidth) {
      if (finalPosition === 'right') finalPosition = 'left'
      else if (finalPosition === 'rightTop') finalPosition = 'leftTop'
      else if (finalPosition === 'rightBottom') finalPosition = 'leftBottom'
    }
  }

  // 获取调整后的坐标
  ;[x, y] = positions[finalPosition]

  // 边界约束调整
  if (finalPosition.includes('top') || finalPosition.includes('bottom')) {
    // 水平边界约束
    if (x < 0) {
      x = 0
    } else if (x + popoverWidth > viewportWidth) {
      x = viewportWidth - popoverWidth
    }
  }

  if (finalPosition.includes('left') || finalPosition.includes('right')) {
    // 垂直边界约束
    if (y < 0) {
      y = 0
    } else if (y + popoverHeight > viewportHeight) {
      y = viewportHeight - popoverHeight
    }
  }

  return [x, y, finalPosition]
}
