# 🚀 **BlockchainDonationSystem**

> 基于区块链技术的公益捐赠透明化管理系统  
> 提升公益捐赠流程透明性、安全性，构建可信任的捐赠生态。

<p style="text-align: center;">
  <img src="https://img.shields.io/badge/License-GPL%20v3-blue.svg" alt="License">
 <img src="https://img.shields.io/badge/Language-JavaScript-yellow.svg" alt="Language">
  <img src="https://img.shields.io/badge/Framework-Vue%203-42b883.svg" alt="Framework">
</p>

---

## 🌟 **项目简介**

**BlockchainDonationSystem** 是一个基于 **区块链联盟链（FISCO BCOS）** 技术实现的公益捐赠管理系统。  
通过去中心化技术，让捐赠流程更加透明化、可追溯性更强，并有效防止数据篡改。

---

## 💡 **项目亮点**

- ✅ **去中心化**：利用区块链技术分布式存储捐赠记录，确保数据安全且不可篡改。
- 🔒 **安全性高**：通过智能合约保证捐赠流程安全可靠。
- 🕒 **捐赠可追溯**：每笔捐赠都有完整的区块链记录，捐赠者可实时查询资金去向。
- 🌐 **跨平台适用**：支持多终端、多平台操作，增强用户体验。

---

## 🛠️ **技术栈**

- **后端技术**
    - Java
    - Spring Boot
    - FISCO BCOS
    - Redis

- **前端技术**
    - Vue 3
    - JavaScript
    - Element Plus

- **工具链**
    - Docker
    - Nacos

---

## 📂 **系统架构**

```
             用户端
              │
     通过 Web 前端交互
              │
     前端界面展示 (Vue 3)
              │
     请求接口 (Spring Boot)
              │
       区块链交互服务
              │
         FISCO BCOS 联盟链
```

---

## 🚀 **前端项目功能：GitHub 仓库展示**

- **功能描述**  
  前端基于 Vue 3 开发，实现了一个 GitHub 仓库列表的展示页面，支持以下功能：
    - 输入 GitHub 用户名，查询其所有公开仓库。
    - 点击仓库名称，跳转至对应 GitHub 仓库详情页。
    - 简洁的界面和高效的交互。

---

## 📥 **前端安装指南**

### 🖥️ **开发环境配置**

```bash
# Clone 仓库到本地
git clone https://github.com/<your-username>/BlockchainDonationSystem-Frontend.git

# 进入项目目录
cd BlockchainDonationSystem-Frontend

# 安装依赖
npm install
```

### 🚀 **启动项目**

```bash
# 启动开发服务器
npm run dev
```

打开浏览器访问 `http://localhost:5173`。

---

## 📂 **前端项目结构**

```
src/
├── assets/          # 静态资源
├── components/      # 组件
│   └── RepoList.vue # 仓库列表组件
├── views/           # 页面视图
│   └── Home.vue     # 主页面
├── App.vue          # 应用入口
├── main.js          # 入口文件
└── router/          # 路由
```

## 💬 **贡献与支持**

- 欢迎提交 Issues 或者 PR 提出你对系统的改进建议。
- 如果这个项目对你有帮助，请给我们 `⭐ Star` 支持！

> 感谢每一位贡献者的努力和支持 ❤️

---

## 🎨 **界面截图展示**

可以插入前端页面展示的图片或 GIF 动画，展示具体效果。

---

如果需要进一步修改或补充功能，随时告诉我！🎉
