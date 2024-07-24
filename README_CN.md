<div align="center">
  <h1 align="center"">
      Album AI
  </h1>
  <p>基于生成式AI和RAG技术，重新设计的图库，用自然语言直接和你的图库/相册对话。</p>
  <p>👉 更新很快，欢迎 star。</p>
</div>
<p align="center">
  <a target="_blank" href="./README.md">English</a> 
  | <a target="_blank" href="./README_CN.md">简体中文</a> 
  | <a target="_blank" href="https://album.gcui.ai">Demo</a>
  
</p>
<p align="center">
  <a href="https://www.producthunt.com/posts/album-ai-ai-first-album?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-album&#0045;ai&#0045;ai&#0045;first&#0045;album" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=473306&theme=light" alt="Album&#0032;AI&#0032;&#0045;&#0032;AI&#0045;First&#0032;Album - Chat&#0032;with&#0032;your&#0032;gallery&#0032;using&#0032;plain&#0032;language&#0033; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</p>

  https://github.com/user-attachments/assets/5cc72436-2749-479f-a1bf-06e0d06ce1e3

## 简介

Album AI 是一个试验项目，使用刚刚发布的gpt-4o-mini作为视觉模型，自动识别出相册中图像文件的元信息，然后借助RAG技术，实现了与相册对话的能力。

可以当做传统的相册使用，也可以作为一个图像知识库辅助LLM生成内容。

## 故事

作为一个摄影爱好者，面对几T的照片，我常常感到无从下手，现有的所有的相册管理软件都需要我付出额外的精力去维护它。Haiku和刚刚发布的gpt-4o-mini，让我看到了希望。所以我准备马上动手实现它，第一个版本我和我的伙伴，只用了不到24小时实现。

希望你们也喜欢它。我愿意听到你们任何赞美和反对。别忘了点个⭐️，或者分享让更多人知道。

## 在线 Demo

[album.gcui.ai](https://album.gcui.ai) 

## Features

- 自动发现相册中的图片，使用一个 PgSQL 数据库存储
- 使用GPT-4-o-mini，自动生成图像的元信息
- 使用OpenAI的Embedding API，完成元信息向量化
- 提供两个API：
  - Search: 传统的Search API，输入query，返回最相关的图像
  - Chat: RAG API，输入query，查询到图片并生成回复
- 一键部署到 Render等支持Docker容器部署的平台
- 宽松的开源协议，你可以随意的集成和修改（但如果要商业化请与我们取得联系）

## 如何开始使用？

推荐在本地运行，如果要在服务器运行请自行部署，之后我们会完善这部分指南。

### 1. 克隆项目

```bash
git clone git@github.com:gcui-art/album-ai.git
cd album-ai
```

### 2. 修改配置

```bash
cp .env.prod.example .env.prod
```

用编辑器打开`.env.prod`，修改里面的配置：

```bash
HOST_NAME= # 你本地的IP地址，一般192.168.x.x:8080
PROXY_URL= # 你本地的代理IP地址，一般 192.168.x.x:7890，无法直接访问OpenAI API时需要
```

在 docker-compose.yml 里配置上 OPENAI_API_KEY：

```bash
OPENAI_API_KEY= # 你的 openai api 秘钥
```

### 3. Build 并启动项目

```bash
chmod a+x ./build.sh
./build.sh
```

### 4. Enjoy!

浏览器中打开 `http://localhost:8080` ，访问demo。

### 5. 添加新照片

打开项目的`images`目录，将新照片添加到`images`目录下后台认为会自动进行元信息的识别和向量化。稍后就可以在demo中通过搜索和对话的方式来使用。

## API 说明

Album AI 目前主要实现了以下 API:

- `get` /api/v1/file/search: 搜索图片
- `post`/api/v1/chat: 与图片对话

## 贡献指南

您有四种方式支持本项目：

1. Fork 项目并提交 PR：我们欢迎任何让Album AI变得更好的PR。
2. 提交Issue：我们欢迎任何合理的建议、bug反馈。
3. 推荐：向其他人推荐本项目；点击Star；使用本项目后放置外链。

## 许可证

Apache 2.0 License

## 你有一个问题/建议/困难/Bug？

我们使用 Github 的 Issue 来管理这些反馈，你可以提交一个。我们会经常来处理。

## 相关链接

- 项目仓库: [github.com/gcui-art/album-ai](https://github.com/gcui-art/album-ai)
- Album AI 主页: [album.gcui.ai](https://album.gcui.ai)
- 演示站点: [album.gcui.ai](https://album.gcui.ai) 
- 作者：[@Kane](https://x.com/BlueeonY) 

## 声明

如果要商业使用，请与我们取得联系。

## Star History

<a href="https://star-history.com/#gcui-art/album-ai&Timeline">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=gcui-art/album-ai&type=Timeline&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=gcui-art/album-ai&type=Timeline" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=gcui-art/album-ai&type=Timeline" />
 </picture>
</a>
