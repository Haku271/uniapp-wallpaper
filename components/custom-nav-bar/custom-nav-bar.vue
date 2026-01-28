<template>
  <view class="layout">
    <view class="navbar">
      <view
        class="statusBar"
        :style="{ height: statusBarHeight() + 'px' }"
      ></view>
      <view class="titleBar" :style="{ height: titleBarHeight() + 'px' }">
        <view class="search" v-if="showSearch" @click="To()">
          <span class="material-symbols-outlined" style="color: #747474">
            search
          </span>
          <text class="text">搜索</text>
        </view>
      </view>
    </view>
    <view class="fill" :style="{ height: navBarHeight() + 'px' }"> </view>
  </view>
</template>

<script setup>
import { statusBarHeight, titleBarHeight, navBarHeight } from '@/utils/sys.js'

defineProps({
  showSearch: {
    type: Boolean,
    default: false,
  },
})

const To = () => {
  uni.navigateTo({ url: '/pages/search/search' })
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: #000;
  color: #fff;
  .titleBar {
    display: flex;
    padding: 0 30rpx;
    align-items: center;
    .search {
      // width: 500rpx;
      width: 60vw;
      height: 60rpx;
      border-radius: 20rpx;
      background: #262626;
      color: #747474;
      font-size: 28rpx;
      display: flex;
      align-items: center;
      .material-symbols-outlined {
        font-size: 35rpx;
        margin-left: 10rpx;
      }
      .text {
        padding-left: 10rpx;
        text-align: center;
        line-height: 90rpx;
      }
    }
  }
}
.fill {
}
</style>
