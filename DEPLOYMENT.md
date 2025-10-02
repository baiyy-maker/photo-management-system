# 宝格立印照片管理系统

一个功能完整的照片管理系统，支持多角色用户管理、文件上传下载、操作日志等功能。

## 🚀 Vercel 部署指南

### 1. 准备工作
- 确保您有GitHub账号
- 确保您有Vercel账号（免费注册）

### 2. 上传代码到GitHub
```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: 宝格立印照片管理系统"

# 在GitHub上创建新仓库，然后推送代码
git remote add origin https://github.com/你的用户名/你的仓库名.git
git branch -M main
git push -u origin main
```

### 3. 在Vercel上部署
1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 选择您的GitHub仓库
4. 点击 "Deploy"
5. 等待部署完成

### 4. 配置环境变量（可选）
在Vercel项目设置中添加：
- `JWT_SECRET`: 您的JWT密钥（建议使用强密码）

## ⚠️ 重要说明

### Vercel限制
- **数据库**: SQLite文件在Vercel中无法持久化，每次重启会重置
- **文件上传**: 上传的文件无法永久保存
- **适用场景**: 适合演示、测试或短期使用

### 生产环境建议
对于正式生产环境，建议使用：
- **数据库**: PostgreSQL (Supabase/PlanetScale)
- **文件存储**: AWS S3/Cloudinary
- **服务器**: Railway/Render/Heroku

## 📱 功能特性

- ✅ 多角色用户管理（主管理员、子管理员、商家、客户）
- ✅ 安全的密码管理（bcrypt加密 + 管理员重置）
- ✅ 文件上传下载（支持多种格式）
- ✅ 智能筛选分页
- ✅ 操作日志记录
- ✅ 响应式设计（支持手机、平板、电脑）

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 访问应用
http://localhost:3000
```

## 📞 技术支持

如有问题，请联系管理员：1915316345@qq.com
