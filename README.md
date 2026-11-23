# 搜索记录隐藏 (Search History Hider)

一个很小的 Chrome 扩展：**不删除、不关闭任何历史记录，只是不让以前搜过的内容显示在搜索框下面。**

A tiny Chrome extension that stops your past searches from showing up under the search box, without deleting or pausing any history. English summary at the bottom.

## 为什么做这个

在 Chrome 里点一下搜索框，下面就会列出你最近搜过的内容。别人借用电脑、或者你投屏分享屏幕时，这些内容会被直接看到。

Google 和 Chrome 都没有提供“保留记录、只是不显示”的开关：

- 关掉账号里的搜索记录，会连记录本身一起停掉。
- 在下拉列表里逐条删除，换一台设备、或者过一阵又会出现。
- Chrome 自带的新标签页不允许任何扩展修改。

所以这个扩展换了个思路：记录照常保存，只把“显示”这一步拦掉。

## 它做了什么

1. **新标签页**：打开新标签页时，直接跳到真正的 Google 首页（`https://www.google.com/`）。Chrome 自带新标签页上的那个搜索框会从本机历史里弹出最近搜索，而且扩展碰不到它，所以只能绕开。
2. **Google 页面**：在 Google 首页和搜索结果页，把搜索框下面的下拉面板整块隐藏。以前的搜索、“与近期搜索内容相关”、普通联想都不再显示。

整个扩展只有一条 CSS 规则和十几行 JavaScript。

## 它不做什么

- 不读取、不上传、不保存任何数据，没有任何网络请求。
- 不申请任何额外权限（没有 `history`、`tabs`、`storage` 等权限）。
- 不删除浏览器历史记录，也不改动 Google 账号里的任何设置。

## 安装

Chrome 应用商店里没有上架，需要手动加载：

1. 下载本仓库（点页面上的 **Code → Download ZIP** 并解压，或者 `git clone`）。
2. 在 Chrome 地址栏输入 `chrome://extensions` 回车。
3. 打开右上角的「开发者模式」。
4. 点左上角的「加载未打包的扩展程序」（英文界面是 **Load unpacked**），选择仓库里的 `search-history-hider` 文件夹。
5. 打开一个新标签页。Chrome 询问是否保留这个新标签页时，选「保留」。

注意：

- 加载之后不要删除、移动或重命名这个文件夹，否则扩展会失效。
- Chrome 的每个个人资料（profile）要各装一次。

## 已知限制

- **地址栏管不到。** 在地址栏里打字时，Chrome 仍会提示历史记录里匹配的条目。地址栏是浏览器自己的界面，任何扩展都改不了。不过它只显示和当前输入匹配的条目，不会一点开就全部列出来。
- **普通联想也一起隐藏了。** 在 Google 页面的搜索框里打字时，不会再有自动补全。
- **新标签页的外观会变。** 背景不再跟随 Chrome 主题，而是 Google 首页自己的浅色或深色；地址栏会显示 `google.com`；Chrome 新标签页上的快捷方式没有了。
- **只对桌面版 Chrome 有效。** 手机和平板上的 Chrome 不支持扩展。
- **依赖 Google 的页面结构。** 隐藏规则用到了 Google 当前的类名，Google 改版后可能需要更新 [`hide.css`](search-history-hider/hide.css)。里面留了一条按 `role="listbox"` 匹配的兜底规则。
- 默认只匹配 `www.google.com`、`google.com` 和 `www.google.com.hk`。用其他地区域名的话，在 [`manifest.json`](search-history-hider/manifest.json) 的 `matches` 里加一行即可。

## 文件说明

| 文件 | 作用 |
|---|---|
| `search-history-hider/manifest.json` | 扩展清单（Manifest V3） |
| `search-history-hider/hide.css` | 隐藏 Google 搜索框下拉面板的规则 |
| `search-history-hider/newtab.html`、`newtab.js` | 新标签页跳转到 Google 首页 |

## English summary

Clicking the search box in Chrome lists your recent searches, which is awkward when someone else is looking at your screen. Neither Google nor Chrome offers a "keep the history, just don't show it" switch, so this extension does two things:

1. Redirects the new tab page to the real Google homepage, because Chrome's built-in new tab page cannot be modified by extensions and always shows recent searches from local history.
2. Hides the suggestion dropdown under the search box on Google's homepage and results pages with one CSS rule.

It collects nothing, makes no network requests, requests no extra permissions, and does not delete or pause any history.

To install: download this repo, open `chrome://extensions`, turn on **Developer mode**, click **Load unpacked**, and select the `search-history-hider` folder.

Limitations: the address bar still suggests matching history entries as you type (extensions cannot change it); regular autocomplete on Google pages is hidden too; desktop Chrome only.

## 许可证

[MIT](LICENSE)
