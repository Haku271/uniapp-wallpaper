<template>
  <view class="user pageBg" >
    <view class="UInfo">
      <view class="avatar">
        <image src="../../static/xxmLogo.png" mode="aspectFill"></image>
      </view>
      <view class="ip">100.100.100.100</view>
      <view class="from">来自：u</view>
    </view>

    <view class="Usection">
      <view class="list">
        <navigator url="/pages/classlist/classlist" class="row">
          <view class="left">
            <uni-icons type="download-filled" size="20" color="#28b389"></uni-icons>
            <view class="text">我的下载</view>
          </view>
          <view class="right">
            <view class="text">
              0
            </view>
            <uni-icons type="right" size="15" color="#aaa"></uni-icons>
          </view>
        </navigator>
        <navigator url="/pages/classlist/classlist" class="row">
          <view class="left">
            <uni-icons type="star-filled" size="20" color="#28b389"></uni-icons>
            <view class="text">我的评分</view>
          </view>
          <view class="right">
            <view class="text">
              0
            </view>
            <uni-icons type="right" size="15" color="#aaa"></uni-icons>
          </view>
        </navigator>
        <view class="row">
          <!-- #ifdef MP -->
            <button open-type="contact">联系客服</button>
          <!-- #endif -->
          <!-- #ifndef MP -->
          <button @click="phone">客服电话</button>
          <!-- #endif -->
          <view class="left">
            <uni-icons type="chatboxes-filled" size="20" color="#28b389"></uni-icons>
            <view class="text">
                联系客服
              </view>
          </view>
          <view class="right">
            <uni-icons type="right" size="15" color="#aaa"></uni-icons>
          </view>
        </view>
      </view>
    </view>
    
    <view class="Usection">
      <view class="list">
        <view class="row">
          <view class="left">
            <uni-icons type="notification-filled" size="20" color="#28b389"></uni-icons>
            <view class="text">更新订阅</view>
          </view>
          <view class="right">
            <uni-icons type="right" size="15" color="#aaa"></uni-icons>
          </view>
        </view>
        <view class="row">
          <view class="left">
            <uni-icons type="flag-filled" size="20" color="#28b389"></uni-icons>
            <view class="text">常见问题</view>
          </view>
          <view class="right">
            <uni-icons type="right" size="15" color="#aaa"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  const phone = ()=>{
    uni.makePhoneCall({
      phoneNumber:'17560358605'
    })
  }
</script>

<style lang="scss" scoped>
.user {
  .UInfo {
    display: flex;
    align-items: center;
    flex-direction: column;
    .avatar {
      margin-top: 200rpx;
      image {
        height: 160rpx;
        width: 160rpx;
        border-radius: 50%;
      }
    }
    .ip {
      font-size: 44rpx;
      color: #333;
      padding: 20rpx 0 5rpx;
    }
    .from {
      font-size: 28rpx;
      color: #ababab;
    }
  }
  .Usection {
    margin: 50rpx 30rpx;
    width: 690rpx;
    border: 1px solid #eee;
    border-radius: 10rpx;
    box-shadow: 0 0 30px rgba(0,0,0,0.05);
    .list {
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30rpx;
        height: 100rpx;
        border-bottom: 1px solid #eee;
        &:last-child{border-bottom: 0;}
        position: relative;
        background: #fff;
        a.navigator-wrap{
          display: flex;
        }
        button{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        .left{
          display: flex;
          align-items: center;
          .text{
            margin: 0 24rpx;
            color: #666;
          }
        }
        .right{
          display: flex;
          align-items: center;
          .text{
            margin: 0 10rpx;
            color: #aaa;
            font-size: 28rpx;
          }
        }
      }
    }
  }
}
</style>
