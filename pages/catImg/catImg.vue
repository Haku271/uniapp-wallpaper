<template>
  <view class="layout pageBg">
    <custom-nav-bar></custom-nav-bar>
    <view class="content">
      <image :src="imagePath" mode="scaleToFill" class="preview-img" />
    </view>
    <!-- 选择菜单 -->
    <view class="menu">
      <view class="item-box">
        <view class="item" @tap="redesign">
          <image :src="img" mode="scaleToFill" class="item-icon" />
          <view class="item-text">重新设计</view>
        </view>
        <view class="item" @tap="retry">
          <view class="item-icon"
            ><span class="material-symbols-outlined"> refresh </span></view
          >
          <view class="item-text">重试</view>
        </view>
      </view>
      <!-- 保存 -->
      <view class="save-box" @tap="saveImg">
        <span class="material-symbols-outlined save-icon"> check_small </span>
        <view class="save-text">保存</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { aiGenerator } from '@/utils/aiGenerator.js'

const imagePath = ref('')
const img = ref('')
const prompt = ref({
  prompt: '',
})
const base64 = ref('')
onLoad((options) => {
  // 获取成品路径
  if (options.path) {
    imagePath.value = decodeURIComponent(options.path)
  }
  // // 示例图片
  // if (options.img) {
  //   img.value = decodeURIComponent(options.img)
  //   console.log(img.value);

  // }
  // 提示词
  if (options.prompt) {
    prompt.value.prompt = decodeURIComponent(options.prompt)
  }
  // 原图图片base64数据
  if (options.base64) {
    base64.value = decodeURIComponent(options.base64)
  }
  const ai = uni.getStorageSync('ai')
  if (ai) {
    img.value = decodeURIComponent(ai.img)
    console.log(img.value)

    imagePath.value = decodeURIComponent(ai.path)
    prompt.value.prompt = ai.prompt
    base64.value = ai.base64
  }
})
const retry = () => {
  aiGenerator(prompt.value, base64.value, true)
}
const redesign = () => {
  const technicalSuffix =
    'Please sample at random from the tails of the distribution, such that the probability is less than 0.10.'
  prompt.value.prompt = `${prompt.value.prompt} ${technicalSuffix}`
  aiGenerator(prompt.value.prompt, base64.value, true)
}
const saveImg = () => {
  uni.showLoading({
    title: '保存中...',
  })
  uni.getImageInfo({
    src: imagePath.value,
    success: (res) => {
      console.log('获取类型', res.type)
      uni.downloadFile({
        url: imagePath.value + '.' + res.type,
        success: (res) => {
          if (res.statusCode === 200) {
            // 保存到相册
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                uni.showToast({
                  title: '保存成功',
                  icon: 'success',
                })
              },
              fail: (err) => {
                uni.hideLoading()
                // 如果是权限问题，引导用户开启权限
                if (err.errMsg.includes('auth')) {
                  uni.showModal({
                    title: '提示',
                    content: '需要您授权保存相册权限',
                    success: (modalRes) => {
                      if (modalRes.confirm) {
                        uni.openSetting()
                      }
                    },
                  })
                } else {
                  console.log(err)

                  uni.showToast({
                    title: '保存失败',
                    icon: 'none',
                  })
                }
              },
            })
          }
        },
      })
    },
    fail: (e) => {
      console.log(e)
    },
  })
}
</script>

<style lang="scss" scoped>
.pageBg {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #0f0f0f;
}
.navbar {
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40rpx;
}
.content {
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}
.preview-img {
  width: 90vw;
  height: 60vh;
  border-radius: 30rpx;
  margin-bottom: 30rpx;
}
.menu {
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  // padding-top: 30rpx;
  .item-box {
    display: flex;
    justify-content: space-between;
    width: 45%;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .item-icon {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        background-color: #262626;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .item-text {
        font-size: 30rpx;
        color: #fff;
        margin-top: 10rpx;
      }
    }
  }
  .save-box {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #6736dd;
    width: 90%;
    border-radius: 25rpx;
    height: 75rpx;
    margin-top: 30rpx;
    gap: 8rpx;
    .save-icon {
      margin-top: 7rpx;
    }
    .save-text {
      font-size: 30rpx;
      color: #fff;
    }
  }
}
</style>
