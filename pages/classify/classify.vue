<template>
  <view class="layout pageBg">
    <custom-nav-bar title="分类"></custom-nav-bar>
    <view class="classify">
      <theme-item v-for="item in classifyList" :key="item._id" :item='item'></theme-item>
    </view>
  </view>
</template>

<script setup>
  import {ref} from "vue"
import {apiclassify} from '@/api/apis.js'
const classifyList = ref([])
const getclassify = async ()=>{
  let res = await apiclassify({pageSize:20})
  classifyList.value = res.data
}
getclassify()
</script>

<style lang="scss" scoped>
.classify{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15rpx;
  margin: 33rpx 30rpx;
  padding-bottom: 33rpx;
}
</style>
