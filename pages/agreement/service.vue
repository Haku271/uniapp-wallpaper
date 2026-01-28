<template>
  <view class="agreement-page">
    <view class="content">
      <view class="title">用户服务协议</view>
      <view class="text">
        <view class="section">
          <view class="section-title">一、服务条款的确认</view>
          <view class="section-content">欢迎使用Picsum壁纸。在使用本应用前，请您仔细阅读本协议。当您使用本应用时，即表示您已阅读并同意本协议的全部条款。</view>
        </view>
        <view class="section">
          <view class="section-title">二、服务内容</view>
          <view class="section-content">本应用为用户提供壁纸浏览、下载、收藏等服务。我们保留随时修改或中断服务的权利。</view>
        </view>
        <view class="section">
          <view class="section-title">三、用户行为规范</view>
          <view class="section-content">用户在使用本应用时，应遵守相关法律法规，不得利用本应用从事违法活动，不得上传违规内容。</view>
        </view>
        <view class="section">
          <view class="section-title">四、知识产权</view>
          <view class="section-content">本应用中的壁纸资源版权归原作者所有，仅供个人学习使用，不得用于商业用途。</view>
        </view>
        <view class="section">
          <view class="section-title">五、免责声明</view>
          <view class="section-content">对于因不可抗力或非本应用原因造成的服务中断或损失，本应用不承担责任。</view>
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
