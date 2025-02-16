const doc: Document | undefined = document

const showListeners: (() => void)[] = []
const hideListeners: (() => void)[] = []

export const isClient: boolean = typeof doc !== 'undefined'

export function initEvent() {
  if (doc) {
    doc.addEventListener('visibilitychange', () => {
      const listeners = doc.visibilityState === 'visible' ? showListeners : hideListeners
      listeners.forEach((listener) => listener())
    })
  }
}

export function onDocShow(listener: () => void) {
  showListeners.push(listener)
}

export function onDocHide(listener: () => void) {
  hideListeners.push(listener)
}

export function offDocShow(listener: () => void) {
  showListeners.splice(showListeners.indexOf(listener), 1)
}

export function offDocHide(listener: () => void) {
  hideListeners.splice(hideListeners.indexOf(listener), 1)
}
