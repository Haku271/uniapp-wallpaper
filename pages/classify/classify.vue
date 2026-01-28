<template>
  <view class="layout pageBg">
    <custom-nav-bar></custom-nav-bar>
    <view class="navbar">AI图像生成</view>
    <view class="generate">
      <view class="generate-cardBox">
        <view class="generate-cardBox-title">使用AI创建壁纸</view>
        <view
          class="generate-cardBox-card"
          :style="{ backgroundImage: `url(${images[currentIndex]})` }"
        >
          <view class="but-box">
            <view @tap="img" class="but" style="background: #6836dd">
              <!-- <uni-icons type="download" color="#fff" size="24"></uni-icons> -->
              <span class="material-symbols-outlined icon1"> download </span>
              <view class="but-text">选择图片</view>
            </view>
            <view class="but" @tap="gotoText">
              <span class="material-symbols-outlined icon1"> ink_pen </span>
              <!-- <uni-icons type="compose" color="#fff" size="24"></uni-icons> -->
              <view class="icon-text">写想法</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const images = [
  'https://picsum.photos/id/64/400/800', // 风格1
  'https://picsum.photos/id/67/400/800', // 风格2
  'https://picsum.photos/id/66/400/800', // 风格3
]
const currentIndex = ref(0)
let timer = null

const img = () => {
  // #ifdef MP-WEIXIN
  uni.chooseMedia({
    count: 1, //默认9
    mediaType: ['image'],
    sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
    success: function (res) {
      const path = encodeURIComponent(res.tempFiles[0].tempFilePath)
      uni.navigateTo({ url: `/pages/classify-edit/EditImages?path=${path}` })
    },
  })
  // #endif
  // #ifdef H5
  uni.chooseImage({
    count: 1, //默认9
    sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: function (res) {
      const path = encodeURIComponent(res.tempFilePaths[0])
      uni.navigateTo({ url: `/pages/classify-edit/EditImages?path=${path}` })
    },
  })

  // #endif
}

const gotoText = () => {
  uni.navigateTo({
    url: '/pages/classify-text/classify-text',
  })
}

onMounted(() => {
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.image {
  height: 13vh;
  width: 100vw;
  background-color: #1a1a1a;
  border-radius: 30rpx 30rpx 0 0;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .item {
    display: flex;
    image {
      width: 50rpx;
      height: 50rpx;
      margin-right: 12rpx;
    }
    .icon2 {
      width: 50rpx;
      height: 50rpx;
      margin-right: 12rpx;
      color: #fff;
    }
    .item-text {
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.navbar {
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 40rpx;
}
.generate {
  width: 100%;
  .generate-cardBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-title {
      background: linear-gradient(90deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      margin-bottom: 12rpx;
    }
    &-card {
      position: relative;
      width: 90vw;
      height: 900rpx;
      border-radius: 30rpx;
      background-size: cover;
      background-position: center;
      border: 4rpx solid rgba(255, 255, 255, 0.3);
      box-shadow:
        0 8rpx 32rpx rgba(0, 0, 0, 0.1),
        inset 0 0 0 1rpx rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: end;
      .but-box {
        display: flex;
        padding: 12rpx;
        justify-content: space-between;
        width: 100%;
        gap: 16rpx;
        .but {
          border-radius: 30rpx;
          background-color: #262626;
          height: 80rpx;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8rpx;
          .icon1 {
            width: 40rpx;
            height: 40rpx;
          }
        }
      }
    }
  }
}
</style>
