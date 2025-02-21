const info = uni.getSystemInfoSync()
export const statusBarHeight = ()=> info.statusBarHeight || 15

export const titleBarHeight = ()=> {
  if(uni.getMenuButtonBoundingClientRect){
    let {top,height} = uni.getMenuButtonBoundingClientRect()
    return height + (top - statusBarHeight())*2
  }else{
    return 40;
  }
}

export const navBarHeight = ()=> statusBarHeight() + titleBarHeight()
