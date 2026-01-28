<template>
  <view class="login-page pageBg">
    <view class="logo">
      <image src="/static/logo.png" mode="aspectFit"></image>
      <text>Picsum 壁纸</text>
    </view>

    <view class="login-btn">
      <button
        open-type="chooseAvatar"
        lang="zh_CN"
        class="wx-btn"
        @chooseavatar="onChooseAvatar"
      >
        <uni-icons type="weixin" color="#fff" size="30"></uni-icons>
        微信一键登录
      </button>
    </view>

    <view class="agreement">
      <view
        class="checkbox"
        :class="{ checked: isAgreed }"
        @click="isAgreed = !isAgreed"
      ></view>
      <text @click="isAgreed = !isAgreed">我已阅读并同意</text>
      <text class="link" @click="goTo('/pages/agreement/service')"
        >《用户服务协议》</text
      >
      <text>和</text>
      <text class="link" @click="goTo('/pages/agreement/privacy')"
        >《隐私政策》</text
      >
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const isAgreed = ref(false)
const onChooseAvatar = (e) => {
  if (!isAgreed.value) {
    uni.showToast({ title: '请先同意用户协议', icon: 'none' })
    return
  }
  uni.setStorageSync('top', e.detail.avatarUrl)
  console.log(e.detail.avatarUrl)
  try {
    uni.login({
      provider: 'weixin', //使用微信登录
      success: function (loginRes) {
        uni.setStorage({
          key: 'key',
          data: loginRes.code,
        })
        setTimeout(() => uni.navigateBack(), 1500)
      },
      fail: function (e) {
        console.log('登入失败', e)
      },
    })
  } catch (e) {
    uni.showToast({ title: '登录失败', icon: 'none' })
  }
}

const goTo = (url) => {
  uni.navigateTo({ url })
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200rpx;

  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100rpx;

    image {
      width: 160rpx;
      height: 160rpx;
      border-radius: 20rpx;
    }

    text {
      margin-top: 20rpx;
      font-size: 36rpx;
      font-weight: bold;
    }
  }

  .login-btn {
    width: 80%;

    .wx-btn {
      background: #07c160;
      color: #fff;
      border-radius: 50rpx;
      font-size: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 90rpx;
    }
  }

  .agreement {
    position: fixed;
    bottom: 60rpx;
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: #999;

    .checkbox {
      width: 32rpx;
      height: 32rpx;
      border: 2rpx solid #999;
      border-radius: 50%;
      margin-right: 10rpx;

      &.checked {
        background: #a081ea;
        border-color: #a081ea;
        position: relative;

        &::after {
          content: '✓';
          color: #fff;
          font-size: 20rpx;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }

    .link {
      color: #a081ea;
    }
  }
}
</style>
