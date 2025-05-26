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
