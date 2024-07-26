<div align="center">
  <h1 align="center">
      Album AI
  </h1>
  <p>AI-First Album, Chat with your gallery/album using plain language!</p>
  <p>👉 We update frequently, feel free to star us.</p>
</div>
<p align="center">
  <a target="_blank" href="./README.md">English</a> 
  | <a target="_blank" href="./README_CN.md">简体中文</a> 
  | <a target="_blank" href="http://album.gcui.ai">Demo</a>
  
</p>
<p align="center">
<a href="https://www.producthunt.com/posts/album-ai-ai-first-album?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-album&#0045;ai&#0045;ai&#0045;first&#0045;album" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=473306&theme=light" alt="Album&#0032;AI&#0032;&#0045;&#0032;AI&#0045;First&#0032;Album - Chat&#0032;with&#0032;your&#0032;gallery&#0032;using&#0032;plain&#0032;language&#0033; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
</p>

https://github.com/user-attachments/assets/5cc72436-2749-479f-a1bf-06e0d06ce1e3


## Introduction

Album AI is an experimental project that uses the recently released gpt-4o-mini and Haiku as a visual model to automatically identify metadata from image files in the album. It then leverages RAG technology to enable conversations with the album.

It can be used as a traditional photo album or as an image knowledge base to assist LLM in content generation.

## Story

As a photography enthusiast facing terabytes of photos, I often felt overwhelmed. All existing photo management software required extra effort to maintain. Haiku and the newly released gpt-4o-mini gave me hope. So I decided to implement it immediately. My partner and I created the first version in less than 24 hours.

We hope you'll like it too. We welcome any praise or criticism. Don't forget to give us a ⭐️ or share to let more people know about it.

## Live Demo
[album.gcui.ai](http://album.gcui.ai) 

## Features

- Automatically discover images in the album, using a PgSQL database for storage.
- Utilize GPT-4-o-mini to automatically generate metadata for images.
- Use OpenAI's Embedding API for metadata vectorization.
- Provide two APIs:
  - Search: A traditional Search API that takes a query and returns the most relevant images.
  - Chat: A RAG API that takes a query, retrieves images, and generates responses.
- One-click deployment to platforms like Render that support Docker container deployment.
- A permissive open-source license allows for integration and modification (please contact us for commercial use).

## How to start using?

Recommended to run locally, if you want to run on a server, please deploy yourself, and we will improve this part of the guide.

### 1. Clone the project

```bash
git clone git@github.com:gcui-art/album-ai.git
cd album-ai
```

### 2. Modify the .env

```bash
cp .env.prod.example .env.prod
```

Open `.env.prod` with your favorite editor, modify the configuration:

```bash
HOST_NAME= # Your local IP address, usually 192.168.x.x:8080
PROXY_URL= # (Optional) Your local proxy IP address, usually 192.168.x.x:7890, required when accessing OpenAI API directly is not available
```


Configure OPENAI_API_KEY and ANTHROPIC_API_KEY in docker-compose.yml:

```bash
OPENAI_API_KEY= # Your openai api key
ANTHROPIC_API_KEY= # Your Anthropic api key 
```

### 3. Build and run the project

```bash
chmod a+x ./build.sh
./build.sh
```

### 4. Enjoy!

Open the browser and visit `http://localhost:8080` to see the demo.

### 5. Add new photos

Open the `images` directory in the project, add new photos to the `images` directory, and the background will automatically recognize and vectorize metadata. After that, you can use it in the demo through search and chat.

## API Reference

Album AI currently implements the following APIs:

- `get` /api/v1/file/search: Search for images
- `post`/api/v1/chat: Chat with images

## Contribution

There are four ways to support this project:

1. Fork the project and submit a PR: We welcome any PR to make Album AI better.
2. Submit an Issue: We welcome any reasonable suggestions or bug reports.
3. Recommend: Recommend the project to others; click Star; place a link to the project after using it.

## License

Apache 2.0 License

## You have a question/suggestion/issue/Bug?

We use Github's Issue to manage these feedbacks, you can submit one. We will often deal with them.

## Related links

- Project repository: [github.com/gcui-art/album-ai](https://github.com/gcui-art/album-ai)
- Album AI homepage: [album.gcui.ai](http://album.gcui.ai)
- Live Demo: [album.gcui.ai](http://album.gcui.ai)
- Author: [@Kane](https://x.com/BlueeonY)

## Disclaimer

If you want to use it for commercial purposes, please contact us.

## Star History

<a href="https://star-history.com/#gcui-art/album-ai&Timeline">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=gcui-art/album-ai&type=Timeline&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=gcui-art/album-ai&type=Timeline" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=gcui-art/album-ai&type=Timeline" />
 </picture>
</a>
