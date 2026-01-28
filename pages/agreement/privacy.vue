<template>
  <view class="agreement-page">
    <view class="content">
      <view class="title">隐私政策</view>
      <view class="text">
        <view class="section">
          <view class="section-title">一、信息收集</view>
          <view class="section-content">我们可能收集您的手机号码、设备信息等，用于提供更好的服务体验。</view>
        </view>
        <view class="section">
          <view class="section-title">二、信息使用</view>
          <view class="section-content">收集的信息仅用于账号登录、个性化推荐等服务，不会用于其他目的。</view>
        </view>
        <view class="section">
          <view class="section-title">三、信息保护</view>
          <view class="section-content">我们采用安全技术保护您的个人信息，防止未经授权的访问、使用或泄露。</view>
        </view>
        <view class="section">
          <view class="section-title">四、信息共享</view>
          <view class="section-content">未经您的同意，我们不会向第三方共享您的个人信息，法律法规要求除外。</view>
        </view>
        <view class="section">
          <view class="section-title">五、用户权利</view>
          <view class="section-content">您有权查询、更正、删除您的个人信息，可通过应用内设置或联系客服处理。</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.agreement-page {
  padding: 30rpx;
  background: #000;
  min-height: 100vh;
  color: #fff;

  .title {
    font-size: 36rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40rpx;
  }

  .section {
    margin-bottom: 30rpx;

    &-title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }

    &-content {
      font-size: 28rpx;
      color: #999;
      line-height: 1.6;
    }
  }
}
</style>
