<template>
  <view class="search-layout">
    <view class="search-box">
      <uni-search-bar
        v-model="queryParams.keyword"
        @confirm="onSearch"
        @cancel="onCancel"
        @clear="onClear"
        focus
        placeholder="搜索感兴趣的壁纸"
        radius="100"
        bgColor="#262626"
        cancelTextColor="#fff"
      >
      </uni-search-bar>
    </view>

    <view v-if="!searchList.length">
      <view class="history-section" v-if="historyList.length > 0">
        <view class="header">
          <text class="title">最近搜索</text>
          <uni-icons
            type="trash"
            size="20"
            color="#999"
            @click="onClearHistory"
          ></uni-icons>
        </view>
        <view class="tags">
          <view
            class="tag"
            v-for="(tab, index) in historyList"
            :key="index"
            @click="onTabClick(tab)"
          >
            {{ tab }}
          </view>
        </view>
      </view>

      <view class="empty" v-else>
        <text>暂无搜索记录，快去搜搜看吧~</text>
      </view>
    </view>

    <view class="result-section" v-else>
      <view class="grid">
        <view
          class="item"
          v-for="item in searchList"
          :key="item._id"
          @click="gotoDetail(item)"
        >
          <!-- Assuming item structure has smallPicurl or similar -->
          <image :src="item.smallPicurl || item.url" mode="aspectFill"></image>
        </view>
      </view>
      <view class="loading-state" v-if="noData">
        <text>没有更多数据了</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
// Ensure request utility is imported if available, otherwise use uni.request
import { request } from '@/utils/request.js'

const historyList = ref([])
const searchList = ref([])
const queryParams = ref({
  pageNum: 1,
  pageSize: 12,
  keyword: '',
})
const noData = ref(false)

onLoad(() => {
  const history = uni.getStorageSync('searchHistory')
  if (history) {
    historyList.value = history
  }
})

const onSearch = async (e) => {
  const value = e.value || queryParams.value.keyword
  if (!value || value.trim() === '') {
    return uni.showToast({ title: '请输入搜索内容', icon: 'none' })
  }

  // Save history
  saveHistory(value)

  // Reset list and fetch
  searchList.value = []
  queryParams.value.keyword = value
  queryParams.value.pageNum = 1
  noData.value = false

  await fetchData()
}

const fetchData = async () => {
  try {
    uni.showLoading({ title: '搜索中...' })

    // Call API (Replace URL with actual search endpoint if different)
    // Assuming structure matches typical wallpaper app API
    const res = await request({
      url: '/search', // or /wallNewsList with search param
      data: {
        keyword: queryParams.value.keyword,
        pageNum: queryParams.value.pageNum,
        pageSize: queryParams.value.pageSize,
      },
    })

    if (res.data && res.data.length) {
      searchList.value = [...searchList.value, ...res.data]
      if (res.data.length < queryParams.value.pageSize) noData.value = true
    } else {
      noData.value = true
      if (queryParams.value.pageNum === 1 && !searchList.value.length) {
        uni.showToast({ title: '未找到相关壁纸', icon: 'none' })
      }
    }
  } catch (error) {
    console.error(error)
  } finally {
    uni.hideLoading()
  }
}

const saveHistory = (txt) => {
  const index = historyList.value.indexOf(txt)
  if (index !== -1) {
    historyList.value.splice(index, 1)
  }
  historyList.value.unshift(txt)
  // Limit to 10 items
  if (historyList.value.length > 10) {
    historyList.value.pop()
  }
  uni.setStorageSync('searchHistory', historyList.value)
}

const onClearHistory = () => {
  uni.showModal({
    title: '确认清除',
    content: '是否确认清除最近搜索记录？',
    success: (res) => {
      if (res.confirm) {
        historyList.value = []
        uni.removeStorageSync('searchHistory')
      }
    },
  })
}

const onTabClick = (text) => {
  queryParams.value.keyword = text
  onSearch({ value: text })
}

const onCancel = () => {
  searchList.value = []
  queryParams.value.keyword = ''
  uni.navigateBack()
}

const onClear = () => {
  searchList.value = []
  queryParams.value.keyword = ''
}

const gotoDetail = (item) => {
  uni.navigateTo({
    url: `/pages/preview/preview?id=${item._id}`,
  })
}
</script>

<style lang="scss" scoped>
.search-layout {
  min-height: 100vh;
  background-color: #191919;

  .search-box {
    padding: 0 10rpx;
    margin-bottom: 20rpx;
    background-color: #191919;
    position: sticky;
    top: 0;
    z-index: 100;

    // 穿透修改搜索框文字颜色
    ::v-deep .uni-searchbar__box-search-input {
      color: #fff;
    }
    ::v-deep .uni-searchbar__text-placeholder {
      color: #747474;
    }
  }

  .history-section {
    padding: 30rpx;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30rpx;

      .title {
        font-size: 30rpx;
        font-weight: bold;
        color: #fff;
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 20rpx;

      .tag {
        padding: 10rpx 28rpx;
        font-size: 26rpx;
        color: #ccc;
        border: 1px solid #333;
        border-radius: 40rpx;
        background-color: #262626;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .empty {
    padding-top: 100rpx;
    text-align: center;
    color: #747474;
    font-size: 28rpx;
  }

  .result-section {
    padding: 0 10rpx;

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5rpx;

      .item {
        height: 440rpx;
        image {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }

    .loading-state {
      padding: 30rpx 0;
      text-align: center;
      color: #999;
      font-size: 26rpx;
    }
  }
}
</style>
