// 新标签页一打开就跳到真正的 Google 首页（界面还是 Google 自己的，
// 不是另做的页面）。首页搜索框下面的下拉列表由 hide.css 隐藏。
//
// 为什么要跳走：Chrome 自带的新标签页不允许任何扩展修改，而且只要
// 标签页地址还是 chrome://newtab，点搜索框或空地址栏就会弹出最近的
// 搜索。跳到 google.com 后它就是一个普通网页，扩展可以管。
const home = "https://www.google.com/";

chrome.tabs.getCurrent((tab) => {
  if (tab && tab.id !== undefined) {
    chrome.tabs.update(tab.id, { url: home });
  } else {
    location.replace(home);
  }
});
