<template>
  <view class="mine" style="padding: 20px">
    <div v-for="item of data" :key="item.name">{{ item.name }}</div>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDidShow } from '@tarojs/taro'
import { getList } from '@/apis/app'
import { UserInfoModel } from '@/apis/model/appModel'

const data = ref<UserInfoModel[]>([])

useDidShow(async () => {
  data.value = await getList({})
})
</script>
