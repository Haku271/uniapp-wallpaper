<template>
  <view class="pageBg">
  <mescroll-uni
    ref="mescrollRef"
    @up="upCallback"
    :up="upOption"
    :down="downOption"
    :height="scrollHeight"
  >
    <custom-nav-bar></custom-nav-bar>
    <view class="content">
      <theme-item
        v-for="item in List"
        :key="item.id"
        :item="item"
        @click="gotoThemePreview"
      ></theme-item>
    </view>
  </mescroll-uni>
</view>
</template>

<script setup>
import {
  upCallback,
  upOption,
  gotoThemePreview,
  scrollHeight,
  downOption,
  List,
} from '/hooks/mescroll.js'
</script>

<style lang="scss" scoped>
  .content {
  // margin: 0 30rpx;
  padding: 0 30rpx;
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  gap: 15rpx;
  // background-color: black;
  // height: 100vh;
}
</style>
