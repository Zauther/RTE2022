# 项目介绍

项目编号：85

项目名称：声临其境

项目简介：本项目是基于 [community-app-template](https://github.com/netless-io/community-app-template) 模版 React 分支开发的【剧本杀打本工具】

## 安装部署指南
前置条件：至少需要安装了 `git`、`node 16`、`npm 8`

第一步：克隆项目到本地`git clone git@github.com:Zauther/RTE2022.git`

第二步：进入项目主目录`cd RTE2022` 

第三步：下载项目依赖 `npm install`

第四步：运行项目 `npm start`


## 功能简介
 
- 项目角色：使用项目工具的用户分为【主持人】和【玩家】

【主持人】即第一个打开页面进入房间的用户，会进行新房间的创建。
【玩家】玩家通过主持人分享的链接进入房间。

- 可操作项：对应于左下角的非共享操作区

【主持人】
（1）可以复制房间链接，和各个玩家的加入房间链接（以免玩家掉线还可以再次进入）；
（2）可以播放音频；
（3）可以播放视频；
（4）可以打开DM手册；
（5）可以分发线索卡。

【玩家】
（1）可以查看自己的剧本；
（5）可以查看主持人共享的线索卡。

- 流程一：选角色并根据角色自动分发剧本

【主持人】选择剧本DM角色，可在剧本弹窗看到DM手册PDF内容。
【玩家】选择其余剧本角色，会根据所选角色在剧本弹窗打开不同角色的剧本PDF。

- 流程二：利用白板同步分析剧情信息

白板中提供了【骰子插件】和【倒计时】插件，可应用于剧本杀的一些机制环节；利用点数大小决定胜负，利用倒计时来计算时间。

- 流程三：分发线索卡

【主持人】可在自己的线索卡弹窗里，通过勾选线索卡的方式，利用白板向其余玩家分发线索卡。
【玩家】的线索卡弹窗会自动弹出，可以查看共享的线索卡。

- 流程四：播放音频/视频

【主持人】可向白板推送音频/视频数据，在白板里共享播放。在剧本进行过程中，或者结局时。

- 流程五：票选凶手

【玩家】票选出凶手玩家，【主持人】复盘剧本内容。


## 技术栈

React
## 可扩展方向 

- 剧本库：可扩展剧本库内容，主持人登陆时可选择不同剧本后创建房间。

- 辅助工具：剧本杀的机制丰富，还可以利用白板和RTC开发更多支持功能，比如匿名投票、私聊、分发代币等。

- 沉浸体验：白板主题色可根据剧本主题色变更，并添加符合场景的样式渲染。