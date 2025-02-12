const doc: Document = document

function getDocVisibilityState() {
  return doc.visibilityState === 'visible'
}

export function onVisibilityChange(listener: (show: boolean) => void) {
  listener(getDocVisibilityState())
  doc.addEventListener('visibilitychange', () => {
    listener(getDocVisibilityState())
  })
}

