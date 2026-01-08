# ReadWise - 智慧阅读平台

一个基于 Azure 云服务的智能阅读和笔记管理平台。

## 📋 项目简介

ReadWise 是一个全栈 Web 应用，使用 Azure 云服务构建，包括：
- **前端**: 纯 HTML/CSS/JavaScript
- **后端**: Azure Logic Apps
- **数据库**: Azure SQL Database 和 Azure Cosmos DB
- **存储**: Azure Blob Storage
- **监控**: Azure Application Insights

## 🚀 快速开始

### 1. 前端部署（Azure Static Web Apps）

前端文件位于 `frontend/` 目录，已配置 Azure Static Web Apps 自动部署。

#### 部署到 Azure Static Web Apps

**方法 1：通过 GitHub Actions（推荐）**

1. 在 Azure Portal 创建 Static Web App 资源
   - 订阅：选择你的订阅
   - 资源组：`ReadWise-RG`
   - 名称：`readwise-frontend`
   - 计划类型：Free
   - 部署源：GitHub
   - GitHub 账户：连接你的 GitHub 账户
   - 组织：`shenyu9099`
   - 仓库：`ReadWise`
   - 分支：`main` 或 `master`
   - 构建预设：Custom
   - 应用位置：`frontend`
   - API 位置：留空
   - 输出位置：留空

2. Azure 会自动：
   - 创建 GitHub Actions workflow（如果还没有）
   - 添加 `AZURE_STATIC_WEB_APPS_API_TOKEN` secret 到你的 GitHub 仓库
   - 在每次推送到 `main/master` 分支时自动部署

**方法 2：手动部署**

```bash
# 使用 Azure CLI
az staticwebapp deploy \
  --name readwise-frontend \
  --resource-group ReadWise-RG \
  --source-location frontend
```

#### 本地运行
```bash
cd frontend
# 使用任何静态文件服务器，例如：
python -m http.server 8000
# 或
npx serve
```

### 2. 后端部署（Logic Apps）

Logic Apps 配置位于 `logic-apps/` 目录。

#### 部署步骤：
1. 在 Azure Portal 创建 Logic App（Consumption 计划）
2. 进入 "逻辑应用代码视图" (Logic app code view)
3. 复制对应的 JSON 文件内容并粘贴
4. 保存
5. 修复连接（在 Designer 视图中配置 SQL、Cosmos DB、Blob Storage 连接）

详细说明请参考 `logic-apps/README.md`

### 3. 配置

#### 更新 API 端点
编辑 `frontend/js/config.js`，将所有 Logic App 的 HTTP 触发器 URL 更新为实际部署的 URL。

#### Application Insights
Application Insights 已集成到前端，配置在 `frontend/js/app-insights-init.js` 中。

## 📁 项目结构

```
ReadWise/
├── frontend/              # 前端文件
│   ├── css/              # 样式文件
│   ├── js/               # JavaScript 文件
│   │   ├── config.js     # API 配置
│   │   ├── telemetry.js  # 遥测追踪
│   │   └── app-insights-init.js  # Application Insights 初始化
│   ├── index.html        # 登录/注册页面
│   ├── dashboard.html    # 仪表板
│   ├── create-journal.html  # 创建期刊
│   ├── journal-detail.html  # 期刊详情
│   └── profile.html      # 用户资料
├── logic-apps/           # Logic Apps 配置（自动部署）
│   ├── 01-register-user.json
│   ├── 02-login-user.json
│   ├── 03-create-journal.json
│   └── ...
├── sql/                  # SQL 数据库脚本
│   └── create-tables.sql
└── README.md
```

## 🔧 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **后端**: Azure Logic Apps
- **数据库**: 
  - Azure SQL Database (用户数据)
  - Azure Cosmos DB (期刊和评论)
- **存储**: Azure Blob Storage (媒体文件)
- **监控**: Azure Application Insights

## 📝 功能特性

- ✅ 用户注册和登录
- ✅ 期刊创建、编辑、删除
- ✅ 评论系统
- ✅ 文件上传（封面、笔记、音频）
- ✅ 实时监控和错误追踪

## 📚 相关文档

- `logic-apps/README.md` - Logic Apps 部署指南
- `AZURE_RESOURCES_SETUP.md` - Azure 资源创建指南
- `PROJECT_STRUCTURE.md` - 项目结构说明

## 📄 许可证

MIT License
