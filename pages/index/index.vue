<template>
  <view class="home pageBg">
    <mescroll-uni
      ref="mescrollRef"
      @up="upCallback"
      :up="upOption"
      :down="downOption"
      :height="scrollHeight"
    >
      <custom-nav-bar :showSearch="true"></custom-nav-bar>
      <view class="home-filter">
        <view class="item" @tap="To()">
          <view class="home-filter-item-icon">
            <span class="material-symbols-outlined" style="color: #9484dc">
              kid_star
            </span>
          </view>
          <view class="home-filter-text">热门</view>
        </view>
        <view class="item" @tap="To()">
          <view class="home-filter-item-icon">
            <span class="material-symbols-outlined" style="color: #f54b85"> update </span>
          </view>
          <view class="home-filter-text">最新</view>
        </view>
        <view class="item" @tap="To()">
          <view class="home-filter-item-icon">
            <span class="material-symbols-outlined" style="color: #30fba9">
              category
            </span>
          </view>
          <view class="home-filter-text">类别</view>
        </view>
        <view class="item" @tap="To()">
          <view class="home-filter-item-icon">
            <span class="material-symbols-outlined" style="color: #fdcd45">
              crown
            </span>
          </view>
          <view class="home-filter-text">高级</view>
        </view>
      </view>

      <view class="select">
        <common-title>
          <template #name>精选</template>
          <template #custom>
            <view
              class="refresh-btn"
              hover-class="refresh-btn-hover"
              @tap="getRandomList"
            >
              <span class="material-symbols-outlined icon3"> refresh </span>
              换一批
            </view>
          </template>
        </common-title>
        <view class="center">
          <scroll-view scroll-x :show-scrollbar="false">
            <view
              v-for="item in randomList"
              :key="item._id"
              class="box"
              @click="gotoPreview(item)"
            >
              <image :src="item.download_url" mode="aspectFill"></image>
            </view>
          </scroll-view>
        </view>
      </view>

      <view class="theme">
        <common-title>
          <template #name>热门</template>
        </common-title>

        <view class="content">
          <theme-item
            v-for="item in List"
            :key="item.id"
            :item="item"
            @click="gotoThemePreview"
          ></theme-item>
        </view>
      </view>
    </mescroll-uni>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { list, randomData } from '/api/mock.js'
import MescrollUni from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.vue'
import MescrollEmpty from '@/uni_modules/mescroll-uni/components/mescroll-empty/mescroll-empty.vue'
import commonTitle from '@/components/common-title/common-title'
import {
  upCallback,
  upOption,
  gotoThemePreview,
  scrollHeight,
  downOption,
  List,
} from '/hooks/mescroll.js'
const randomList = ref([]) // 精选（随机）

const To = () => {
  uni.navigateTo({ url: '/pages/popular/popular' })
}



// 获取随机列表（精选）
const getRandomList = async () => {
  const res = await randomData()
  randomList.value = res.data
  console.log(res)
}

// 点击精选图片，存储精选数据并跳转
const gotoPreview = (item) => {
  uni.setStorageSync('storgwallList', randomList.value)
  uni.navigateTo({
    url: `/pages/preview/preview?id=${item.id}`,
  })
}


onLoad(() => {
  getRandomList()
})
</script>

<style lang="scss" scoped>
.icon3 {
  font-size: 36rpx;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 5rpx;
  transition: opacity 0.2s;
  // height: 50rpx;
  .icon3 {
    transition: transform 0.3s ease;
    margin-top: 5rpx;
  }
}

.refresh-btn-hover {
  opacity: 0.6;

  .icon3 {
    transform: rotate(180deg);
  }
}

.home {
  // min-height: 100vh;
  .home-filter {
    display: flex;
    width: 100%;
    height: 160rpx;
    align-items: center;
    padding: 0rpx 90rpx;
    justify-content: space-between;
    margin-top: 50rpx;
    .item {
      display: flex;
      align-items: center;
      flex-direction: column;
      .home-filter-item-icon {
        background-color: #282828;
        border-radius: 13rpx;
        // padding: 4rpx 7rpx 0rpx 7rpx;
        height: 60rpx;
        width: 60rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        .material-symbols-outlined {
          font-size: 50rpx;
        }
      }
      .home-filter-text {
        margin-top: 5rpx;
        font-size: 25rpx;
        text-align: center;
      }
    }
  }
  .notice {
    width: 690rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 80rpx;
    background-color: #f9f9f9;
    display: flex;
    margin: 0 auto;
    .left {
      width: 140rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      :deep() {
        .uni-icons {
          color: $theme-c !important;
        }
      }
      .text {
        color: $theme-c;
        font-size: 28rpx;
        font-weight: 600;
      }
    }
    .center {
      flex: 1;
      swiper {
        height: 100%;
        &-item {
          height: 100%;
          font-size: 30rpx;
          color: #666;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .right {
      width: 70rpx;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .select {
    // padding-top: 50rpx;
    .date {
      display: flex;
      justify-content: center;
      align-items: center;
      color: $theme-c;
      :deep() {
        .uni-icons {
          color: $theme-c !important;
        }
      }
    }
    .center {
      width: 720rpx;
      margin-left: 30rpx;
      display: flex;
      justify-content: space-between;
      // padding-top: 35rpx;
      scroll-view {
        white-space: nowrap;
      }
      .box {
        width: 200rpx;
        height: 430rpx;
        display: inline-block;
        margin-right: 15rpx;
      }
      image {
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
      }
    }
  }

  .theme {
    padding-bottom: 50rpx;
    .custom {
      .more {
        font-size: 32rpx;
        color: #888;
      }
    }
    .content {
      // margin: 0 30rpx;
      padding: 0 30rpx;
      display: grid;
      grid-template-columns: 3fr 3fr 3fr;
      gap: 15rpx;
    }
  }
}
</style>
