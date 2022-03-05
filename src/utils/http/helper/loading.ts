import Taro from '@tarojs/taro'

let needLoadingRequestCount = 0

function startLoading() {
  Taro.showLoading({
    title: '正在加载...',
  })
}

const closeLoading = () => {
  if (needLoadingRequestCount === 0) {
    Taro.hideLoading()
  }
}

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function hideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    setTimeout(() => {
      closeLoading()
    })
  }
}
