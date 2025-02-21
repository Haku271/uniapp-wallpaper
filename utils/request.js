const URL = 'https://tea.qingnian8.com/api/bizhi/'
export const request=(config={})=>{
  let {url,data,header={},method=''} = config
  url = URL + url
  header['access-key'] = '283216'
  return new Promise((resolve,reject)=>{
    uni.request({
      url,
      data,
      header,
      method,
      success:res=>{
        if(res.data.errCode===0){
          resolve(res.data)
        }else if(res.data.errCode===400){
          uni.showModal({
            title:'错误提示',
            content:res.data.errMsg,
            showCancel:false
          })
        }else{
          uni.showToast({
            title:res.data.errMsg,
            icon:'none'
          })
          reject(res.data)
        }
        
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}