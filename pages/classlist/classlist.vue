<template>
  <view class="list">
    <view class="loading" v-if="!wallList.length && !noData">
      <uni-load-more status="loading"></uni-load-more>
    </view>
    <view class="content">
      <navigator :url="'/pages/preview/preview' + item._id" class="item" v-for="item in wallList" :key="item._id">
        <image :src="item.smallPicurl" mode="aspectFill"></image>
      </navigator>
    </view>
    <view class="loading" v-if="wallList.length">
      <uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
    </view>
  </view>
</template>

<script setup>
  import {ref} from 'vue'
  import {onLoad,onReachBottom} from "@dcloudio/uni-app"
  const queryParams = {pageNum:1,pagesize:12}
const wallList = ref([])
const noData = ref(false)
onLoad((e)=>{
  let {id=null,name=null} = e
  queryParams.classid = id
  uni.setNavigationBarTitle({
    title:name
  })
  getwall()
})
// 触底加载
onReachBottom(()=>{
  if(noData.value) return;
  queryParams.pageNum++;
  getwall()
  
})

  
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 245rpx;
    height: 544rpx;
    padding: 2rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>