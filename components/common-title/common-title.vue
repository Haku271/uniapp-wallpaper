<template>
  <view class="title">
    <view class="name">
      <slot name="name"></slot>
    </view>
    <view class="custom">
      <slot name="custom"></slot>
    </view>
  </view>
</template>

<script>

</script>

<style lang="scss">
.title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx;
  margin-top: 30rpx;
  padding-bottom: 35rpx;
  .name{
  font-size: 30rpx;
  }
  .custom{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8rpx;
    text-align: center;
    line-height: 20rpx;
  }
}
</style>