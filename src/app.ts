import Taro from '@tarojs/taro'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './app.scss'

const App = createApp({
  setup() {
    // https://taro-docs.jd.com/taro/docs/apis/base/update/getUpdateManager
    const updateManager = Taro.getUpdateManager()
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        },
      })
    })
  },
})

App.use(createPinia())

export default App
