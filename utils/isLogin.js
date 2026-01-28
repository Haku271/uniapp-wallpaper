export const isLogin = () => {
  const key = uni.getStorageSync('key')
  if (key) {
    console.log('已登录')
    return true
  }
  return false
}