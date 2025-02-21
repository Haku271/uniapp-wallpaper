<template>
  <view class="layout">
   <view class="box" :style="{top: titleBarHeight() + 'px'}">
      <view class="bar">
        公告
      </view>
    </view>
    
    <view class="title">
      <view class="tag">
        <uni-tag text="置顶" type="error" inverted></uni-tag>
      </view>
      <view class="font">标题</view>
    </view>

    <view class="info">
      <view class="item">名</view>
      <view class="item">
        <uni-dateformat :date="Date.now()" format="yyyy-mm-dd hh:mm:ss"></uni-dateformat>
      </view>
    </view>

    <view class="content">内容</view>
    <view class="count">阅读 5588</view>
  </view>
</template>

<script setup>
  import {statusBarHeight,titleBarHeight,navBarHeight} from '@/utils/sys.js'
</script>

<style lang="scss" scoped>
.layout {
  padding: 30rpx;
  .title {
    font-size: 40rpx;
    color: #111;
    line-height: 1.6em;
    padding-bottom: 30rpx;
    display: flex;
    .tag{
      transform: scale(0.8);
      transform-origin: left center;
      flex-shrink: 0;
    }
    .font{
      padding-left: 6rpx;
    }
  }
  .info{
    display: flex;
    align-items: center;
    color: #999;
    font-size: 28rpx;
    .item{
      padding-right: 20rpx;
    }
  }
  .content{
    padding: 50rpx 0;
  }
  .count{
    color: #999;
    font-size: 28rpx;
  }
}
</style>
