<template>
  <custom-nav-bar></custom-nav-bar>
  <view class="user pageBg">
    <view class="UInfo">
      <view class="avatar">
        <span
          @click="goLogin"
          class="material-symbols-outlined icon1"
          v-if="!isLog"
        >
          account_circle
        </span>
        <image class="icon1" :src="top" mode="scaleToFill" v-if="isLog" />
      </view>
      <view class="info">
        <view class="data">
          <view class="item">
            <view class="item-value">0</view>
            <view class="item-type">关注</view>
          </view>
          <view class="item">
            <view class="item-value">0</view>
            <view class="item-type">粉丝</view>
          </view>
        </view>
        <view class="login" @click="goLogin" v-if="!isLog">登录</view>
      </view>
    </view>
    <!-- vip充值 -->
    <view class=""></view>
    <view class="tool">
      <view class="tool-title">我的服务</view>
      <view class="tool-list">
        <view class="tool-list-li">
          <span class="material-symbols-outlined icon2"> upload </span>
          <view>上传</view>
        </view>
        <view class="tool-list-li" @click="goDownload">
          <span class="material-symbols-outlined icon2"> download </span>
          <view>下载</view>
        </view>
        <view class="tool-list-li" @click="goFavorite">
          <span class="material-symbols-outlined icon2"> favorite </span>
          <view>收藏</view>
        </view>
        <button class="tool-list-li" open-type="contact">
          <span class="material-symbols-outlined icon2"> chat_bubble </span>
          <view>联系客服</view>
        </button>
        <button open-type="feedback" u-reset-button class="tool-list-li">
          <span class="material-symbols-outlined icon2"> outgoing_mail </span>
          <view>建议反馈</view>
        </button>
        <view class="tool-list-li" v-if="isLog" @tap="clsLogin">
          <span class="material-symbols-outlined icon2"> login </span>
          <view>退出登录</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { isLogin } from '@/utils/isLogin'

const isLog = ref(false)
const top = ref(null)
const clsLogin = () => {
  uni.showModal({
    title: '提示',
    content: '确认退出登录',
    success: function (res) {
      if (res.confirm) {
        uni.removeStorageSync('key')
        uni.removeStorageSync('info')
        isLog.value = false
      }
    },
  })
}
const goLogin = () => {
  uni.navigateTo({ url: '/pages/login/login' })
}

const goFavorite = () => {
  uni.navigateTo({ url: '/pages/favorite/favorite' })
}

const goDownload = () => {
  uni.navigateTo({ url: '/pages/download/download' })
}

onShow(() => {
  top.value = uni.getStorageSync('top')
  console.log('获取头像', top.value)
  isLog.value = isLogin()
  console.log('isLog', isLog.value)
})
</script>

<style lang="scss" scoped>
.user {
  .UInfo {
    display: flex;
    padding: 30rpx;
    gap: 30rpx;
    align-items: center;
    .avatar {
      .icon1 {
        height: 240rpx;
        width: 240rpx;
        font-size: 240rpx;
        border-radius: 50%;
        color: #6836dd;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 30rpx;
      .data {
        display: flex;
        gap: 40rpx;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
      .login {
        font-size: 30rpx;
        color: #fff;
        background-color: #262626;
        border-radius: 30rpx;
        padding: 15rpx;
        width: 160rpx;
        text-align: center;
      }
    }
  }
  .tool {
    padding: 30rpx;
    display: flex;
    flex-direction: column;
    &-title {
      font-size: 35rpx;
    }
    &-list {
      padding: 40rpx;
      display: flex;
      flex-direction: column;
      gap: 60rpx;
      svg {
        width: 40rpx;
        height: 40rpx;
      }
      &-li {
        all: unset;
        align-items: center;
        gap: 20rpx;
        display: flex;
        .icon2 {
          font-size: 45rpx;
        }
      }
    }
  }
}
</style>
