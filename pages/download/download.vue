<template>
  <view class="download-page pageBg">
    <custom-nav-bar title="下载记录"></custom-nav-bar>

    <!-- 下载记录列表 -->
    <view v-if="downloadList.length > 0" class="download-list">
      <view class="list-info">
        <text class="count">共 {{ downloadList.length }} 张壁纸</text>
        <view class="clear-btn" @click="handleClear">
          <span class="material-symbols-outlined"> delete </span>
          清空
        </view>
      </view>

      <view class="wall-grid">
        <view
          v-for="(item, index) in downloadList"
          :key="item._id || item.id"
          class="wall-item"
          @click="gotoPreview(item, index)"
        >
          <image
            :src="item.thumbUrl || item.picurl || item.download_url"
            mode="aspectFill"
            lazy-load
          ></image>

          <view class="remove-btn" @click.stop="handleRemove(item)">
            <span class="material-symbols-outlined"> close </span>
          </view>

          <view class="download-time">
            <text>{{ item.downloadTimeStr || formatTime(item.downloadTime) }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 空状态 -->
    <view v-else class="empty-state">
      <span class="material-symbols-outlined icon-empty"> download_for_offline </span>
      <text class="empty-text">还没有下载记录</text>
      <button class="goto-home" @click="goHome">去逛逛</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getDownloadList, removeDownload, clearDownloads } from '@/utils/download.js'

const downloadList = ref([])

onMounted(() => {
  loadDownloads()
})

// 加载下载记录列表
const loadDownloads = () => {
  downloadList.value = getDownloadList()
}

// 格式化时间
const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${month}-${day} ${hour}:${minute}`
}

// 跳转到预览页
const gotoPreview = (item, index) => {
  // 将当前下载记录列表存储，方便预览页使用
  uni.setStorageSync('storgwallList', downloadList.value)
  uni.navigateTo({
    url: `/pages/preview/preview?id=${item._id || item.id}`,
  })
}

// 移除单个下载记录
const handleRemove = (item) => {
  uni.showModal({
    title: '提示',
    content: '确定删除这条下载记录吗？',
    success: (res) => {
      if (res.confirm) {
        removeDownload(item)
        loadDownloads() // 重新加载
      }
    },
  })
}

// 清空所有下载记录
const handleClear = () => {
  uni.showModal({
    title: '提示',
    content: '确定清空所有下载记录吗？',
    confirmColor: '#ff4757',
    success: (res) => {
      if (res.confirm) {
        clearDownloads()
        loadDownloads() // 重新加载
      }
    },
  })
}

// 回到首页
const goHome = () => {
  uni.switchTab({
    url: '/pages/index/index',
  })
}
</script>

<style lang="scss" scoped>
.download-page {
  min-height: 100vh;

  .download-list {
    padding: 30rpx;

    .list-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;

      .count {
        font-size: 28rpx;
        color: #999;
      }

      .clear-btn {
        display: flex;
        align-items: center;
        gap: 8rpx;
        font-size: 26rpx;
        color: #ff4757;

        .material-symbols-outlined {
          font-size: 32rpx;
        }
      }
    }

    .wall-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15rpx;

      .wall-item {
        position: relative;
        aspect-ratio: 3/4;
        border-radius: 10rpx;
        overflow: hidden;

        image {
          width: 100%;
          height: 100%;
        }

        .remove-btn {
          position: absolute;
          top: 10rpx;
          right: 10rpx;
          width: 50rpx;
          height: 50rpx;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;

          .material-symbols-outlined {
            font-size: 30rpx;
            color: #fff;
          }
        }

        .download-time {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 8rpx;
          background: rgba(0, 0, 0, 0.5);
          font-size: 20rpx;
          color: #fff;
          text-align: center;

          text {
            font-size: 20rpx;
          }
        }
      }
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60vh;
    gap: 30rpx;

    .icon-empty {
      font-size: 150rpx;
      color: #999;
    }

    .empty-text {
      font-size: 32rpx;
      color: #999;
    }

    .goto-home {
      background: $theme-c;
      color: #fff;
      border-radius: 50rpx;
      width: 300rpx;
      height: 80rpx;
      line-height: 80rpx;
      font-size: 30rpx;
    }
  }
}
</style>
