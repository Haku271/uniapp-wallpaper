export const time = (times)=> {
  const Time = new Date().getTime();
  const Diff = Time - times ;
  if (Diff < 6000) {
    return "一分钟内";
  } else if (Diff < 3600000) {
    return Math.floor(Diff / 60000) + '分钟';
  } else if (Diff < 86400000) {
    return Math.floor(Diff / 3600000) + '小时';
  } else if (Diff < 2592000000) {
    return Math.floor(Diff / 86400000) + '天';
  } else if (Diff < 7776000000) {
    return Math.floor(Diff / 2592000000) + '月';
  } else {
    return null
  }
}
