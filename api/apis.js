import { request } from "@/utils/request.js"
// 轮播图
export const apiGetBanner = () => {
  return request({
    url: "homeBanner"
  })
}
// 每日推荐
export const apigetDayRandom = () => {
  return request({
    url: "randomWall"
  })
}
//公告列表
export const apinotice = () => {
  return request({
    url: "wallNewsList",
    data: {
      select: true
    }
  })
}
//分类
export const apiclassify = (data={})=>{
  return request({
    url:"classify",
    data
  })
}
//分类列表
export const apiwall = (data={})=>{
  return request({
    url:"wallList",
    data
  })
}
// export const  = ()=>{
//   return request({
//     url:"",
//   })
// }
// export const  = ()=>{
//   return request({
//     url:"",
//   })
// }
// export const  = ()=>{
//   return request({
//     url:"",
//   })
// }
// export const  = ()=>{
//   return request({
//     url:"",
//   })
// }
// export const  = ()=>{
//   return request({
//     url:"",
//   })
// }
// export const  = ()=>{
//   return request({
//     url:"",
//   })
// }