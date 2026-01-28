const URL = 'https://picsum.photos'
export const request=(config={})=>{
  let {url} = config
  url = URL + url
  return new Promise((resolve,reject)=>{
    uni.request({
      url,
      success:res=>{
        if (res.statusCode === 200) {
          resolve(res)
        } else if (res.statusCode === 400) {
          uni.showModal({
            title: '错误提示',
            content: res.errMsg,
            showCancel: false,
          })
        } else {
          uni.showToast({
            title: res.errMsg,
            icon: 'none',
          })
          reject(res)
        }
        
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}