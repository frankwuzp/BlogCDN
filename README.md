## 仓库介绍

- 用于[个人网站](https://frankwuzp.github.io)的CDN加速

- 可将 hexo 中用到静态资源的地方（如前端库）换成CDN加速

- 使用 jsdeliver 的资源

- 资源引用的范例

  > `https://cdn.jsdelivr.net/gh/你的用户名/你的仓库名@发布的版本号/文件路径`
  >
  > 如 `https://cdn.jsdelivr.net/gh/frankwuzp/BlogCDN/js-sweetcloud/gotop.js`
  >
  > 注：jsdelivr可以自动生成.min版的js和css，在设置js及css路径中可直接写.min.xxx

## 状况应对

- **cdn 没能及时缓存更新，引用不了新上传的加速文件？**

解决思路：

1. 把连接中开头的 `cdn` 变成 `purge` 刷新缓存，如 `https://purge.jsdelivr.net/gh/frankwuzp/BlogCDN/matrix/script.js`
2. 使用版本号引用：生成最新的版本后，通过在连接中加入版本号来引用，如 `https://cdn.jsdelivr.net/gh/frankwuzp/BlogCDN@0.2.0/matrix/script.js`

## Ref

- [使用CDN(jsdelivr) 优化博客访问速度 - 云+社区](https://cloud.tencent.com/developer/article/1584223)

- [jsDelivr - A free, fast, and reliable CDN for open source](https://www.jsdelivr.com/?docs=gh)

- [解决 jsdelivr 缓存问题的几个办法 | 你真是一个美好的人类](https://blog.juanertu.com/archives/cbcd1946.html)

## Changlog

- 210823 新加入缓存更新的办法
- 210725 init
