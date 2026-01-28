<template>
  <view class="preview">
    <swiper
      :previous-margin="'120rpx'"
      :next-margin="'120rpx'"
      display-multiple-items="1"
      :duration="300"
      @change="onSwiperChange"
      @transition="onSwiperTransition"
      :current="currentIndex"
    >
      <swiper-item
        v-for="(item, index) in wallList"
        :key="item.id"
        :class="index === currentIndex ? 'swiper-item-active' : ''"
      >
        <image @click="hide" :src="item.picurl" mode="aspectFill"></image>
      </swiper-item>
    </swiper>

    <view class="mask" v-if="mask">
      <view
        class="back"
        @click="back"
        :style="{ top: statusBarHeight() + 'px' }"
      >
        <uni-icons type="back" size="20" color="#fff"></uni-icons>
      </view>
      <view class="operation">
        <button open-type="share" class="operation-but">
          <span class="material-symbols-outlined"> share </span>
        </button>
        <view class="downloadbgc" @tap="downloadFile">
          <span class="material-symbols-outlined icon2"> download </span>
        </view>

        <view
          class="favorite-btn"
          :class="{ 'favorited': isFavorited }"
          @tap="toggleFavorite"
        >
          <span class="material-symbols-outlined icon2">
            {{ isFavorited ? 'favorite' : 'favorite_border' }}
          </span>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { statusBarHeight } from '@/utils/sys.js'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { toggleFavorite as toggleFav, isFavorite as checkFav } from '@/utils/favorite.js'
import { addDownload, isDownloaded as checkDownloaded } from '@/utils/download.js'

const mask = ref(true)
const infopopup = ref(null)
const starpopup = ref(null)
const wallList = ref([])
const current = ref(null)
const currentIndex = ref(0)
const isFavorited = ref(false)
const isDownloaded = ref(false)

onLoad((e) => {
  // 转换 ID 为字符串，确保类型一致性
  const id = String(e.id)
  current.value = id

  // 从 localStorage 读取存储的壁纸列表数据
  const storgwallList = uni.getStorageSync('storgwallList') || []

  // 转换数据格式，使用 download_url 作为 picurl
  wallList.value = storgwallList.map((item) => ({
    ...item,
    picurl: item.download_url,
  }))

  // 找到当前点击的图片索引（转换为字符串比较，避免类型不匹配）
  const index = wallList.value.findIndex(
    (item) => String(item.id) === id
  )
  if (index !== -1) {
    currentIndex.value = index
  }

  // 检查收藏和下载状态
  checkFavoriteStatus()
  checkDownloadStatus()
})

// swiper 变化事件
const onSwiperChange = (e) => {
  currentIndex.value = e.detail.current
  checkFavoriteStatus()
  checkDownloadStatus()
}

// swiper 过渡事件
const onSwiperTransition = (e) => {
  // 可以在这里处理过渡动画，但保持简洁避免性能问题
  // 目前留空，让 CSS transitions 处理动画
}

// 检查收藏状态
const checkFavoriteStatus = () => {
  const currentImage = wallList.value[currentIndex.value]
  if (currentImage) {
    isFavorited.value = checkFav(currentImage)
  }
}

// 检查下载状态
const checkDownloadStatus = () => {
  const currentImage = wallList.value[currentIndex.value]
  if (currentImage) {
    isDownloaded.value = checkDownloaded(currentImage)
  }
}

// 收藏
const toggleFavorite = () => {
  const currentImage = wallList.value[currentIndex.value]
  if (!currentImage) return

  // 调用工具函数切换收藏
  const newState = toggleFav(currentImage)

  // 更新状态
  isFavorited.value = newState

  // 震动反馈
  if (uni.vibrateShort) {
    uni.vibrateShort()
  }
}

// 下载
const downloadFile = () => {
  // 获取当前图片
  const currentImage = wallList.value[currentIndex.value]
  if (!currentImage || !currentImage.picurl) {
    uni.showToast({
      title: '图片不存在',
      icon: 'none'
    })
    return
  }

  uni.showLoading({
    title: '下载中...'
  })

  // 下载文件
  uni.downloadFile({
    url: currentImage.picurl,
    success: (res) => {
      if (res.statusCode === 200) {
        // 保存到相册
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            uni.hideLoading()
            // 添加下载记录
            addDownload(currentImage)
            // 更新下载状态
            isDownloaded.value = true
            uni.showToast({
              title: '已保存到相册',
              icon: 'success'
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
                }
              })
            } else {
              uni.showToast({
                title: '保存失败',
                icon: 'none'
              })
            }
          }
        })
      } else {
        uni.hideLoading()
        uni.showToast({
          title: '下载失败',
          icon: 'none'
        })
      }
    },
    fail: (err) => {
      uni.hideLoading()
      console.error('下载失败:', err)
      uni.showToast({
        title: '下载失败',
        icon: 'none'
      })
    }
  })
}
//隐藏遮罩层
const hide = () => {
  console.log(mask.value)
  mask.value = !mask.value
}

//返回首页
const back = () => {
  uni.navigateBack()
}

//信息弹出层
const infoopen = () => {
  infopopup.value.open('bottom')
}

//关闭弹出层
const close = () => {
  infopopup.value.close()
  starpopup.value.close()
}

//打开评分弹出层
const staropen = () => {
  starpopup.value.open()
}

//确认评分
const submit = () => {
  starpopup.value.close()
}
</script>
<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100vh;
  position: relative;
  background: #1a1a1a;

  swiper {
    height: 100%;
    width: 100%;

    swiper-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      image {
        width: 100%;
        height: 60%;
        border-radius: 24rpx;
        box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.6);
        transition: transform 0.3s ease, opacity 0.3s ease, height 0.3s ease;
        opacity: 0.5;
        transform: scale(0.9);
      }

      &.swiper-item-active image {
        height: 60%;
        opacity: 1;
        transform: scale(1);
        box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.7);
      }
    }
  }

  .mask {
    & > view {
      position: absolute;
      color: #fff;
      z-index: 10;
    }
    display: flex;
    justify-content: center;
    .back {
      border: 1px solid rgba(255, 255, 255, 0.3);
      top: 0;
      left: 30rpx;
      border-radius: 100px;
      width: 38px;
      height: 38px;
      background: rgba(0, 0, 0, 0.5);
      margin-left: 0;
      backdrop-filter: blur(10rpx);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .count {
      top: 10vh;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 40rpx;
      font-size: 28rpx;
      padding: 8rpx 28rpx;
      backdrop-filter: blur(10rpx);
    }
    .time {
      top: calc(10vh + 80rpx);
      font-size: 140rpx;
      font-weight: 100;
      line-height: 1em;
      text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
    }
    .date {
      top: calc(10vh + 230rpx);
      font-size: 34rpx;
      text-shadow: 0 2rpx rgba(0, 0, 0, 0.3);
    }
    .operation {
      bottom: 10vh;
      width: 30vh;
      height: 120rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 120rpx;
      &-but {
        background: none;
        color:#fff;
        border: none;
        padding: 0;
        margin: 0;
        box-shadow: none;
        border-radius: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .downloadbgc {
        background-color: #6836dd;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120rpx;
        height: 120rpx;
      }
      .favorite-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        // width: 120rpx;
        // height: 120rpx;
        border-radius: 100%;
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        .material-symbols-outlined {
          font-size: 48rpx;
          color: #fff;
          transition: all 0.3s ease;
        }

        &.favorited {
          .material-symbols-outlined {
            color: #ff4757;
            animation: heartbeat 0.4s ease-in-out;
          }
        }

        &:active {
          transform: scale(0.8);
        }
      }
    }
    .info {
      bottom: 10vh;
      background: rgba(255, 255, 255, 0.8);
      width: 30vh;
      height: 120rpx;
      // color: #000;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-radius: 120rpx;
      box-shadow: 0 2rpx 0 rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(20rpx);
      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rpx 12rpx;
        .text {
          font-size: 26rpx;
          color: $font2;
        }
      }
    }
  }
  .Header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: $font2;
      font-size: 26rpx;
    }
    .close {
      padding: 6rpx;
    }
  }
  .infopopup {
    background: #fff;
    padding: 30rpx;
    border-radius: 30rpx 30rpx 0 0;
    // overflow: hidden;
    scroll-view {
      max-height: 50vh;
      .content {
        .row {
          display: flex;
          padding: 16rpx 0;
          font-size: 32rpx;
          line-height: 1.7em;
          .label {
            color: $font3;
            width: 140rpx;
            text-align: right;
            font-size: 30rpx;
          }
          .value {
            flex: 1;
            width: 0;
          }
          .star {
            display: flex;
            align-items: center;
            .score {
              font-size: 26rpx;
              color: $font3;
              padding-left: 20rpx;
            }
          }
          .tabs {
            display: flex;
            flex-wrap: wrap;
            .tab {
              border: 1px solid $theme-c;
              color: $theme-c;
              font-size: 22rpx;
              padding: 10rpx 30rpx;
              border-radius: 40rpx;
              line-height: 1em;
              margin: 0 10rpx 10rpx 0;
            }
          }
        }
        .copyright {
          font-size: 28rpx;
          padding: 20rpx;
          background: #f6f6f6;
          color: #666;
          border-radius: 10rpx;
          margin: 20rpx 0;
          line-height: 1.6em;
        }
      }
    }
  }
  .starpopup {
    background: #fff;
    border-radius: 30rpx;
    padding: 30rpx;
    // width: 70vh;
    .content {
      display: flex;
      padding: 30rpx;
      justify-content: center;
      align-items: center;
      .text {
        color: #ffca3e;
        padding-left: 10rpx;
        width: 80rpx;
        line-height: 1em;
        text-align: right;
      }
    }
    .footer {
      display: flex;
      justify-content: center;
      padding: 10rpx 0;
      button {
        color: $font3;
      }
    }
  }
}

// 心跳动画
@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.3);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
