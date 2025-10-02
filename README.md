# 客户端登录注册系统

一个功能完整的用户管理系统，支持多角色权限控制和响应式设计，适配电脑、手机、iPad等多种设备。

## 功能特性

### 🔐 用户认证
- **登录/注册系统**：支持用户名密码登录注册
- **多角色支持**：主管理员、子管理员、商家、客户
- **安全措施**：密码加密、JWT令牌、速率限制

### 👥 用户管理
- **账户管理**：创建、禁用、启用用户账户
- **权限控制**：基于角色的访问控制
- **操作记录**：完整的用户操作日志（最近1000条）

### 📱 响应式设计
- **多设备适配**：完美支持电脑、手机、iPad
- **现代UI**：美观的渐变设计和动画效果
- **用户体验**：直观的操作界面和反馈

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 初始化数据库
```bash
npm run init-db
```

### 3. 启动服务器
```bash
# 生产环境
npm start

# 开发环境（自动重启）
npm run dev
```

### 4. 访问系统
打开浏览器访问：http://localhost:3000

## 默认账户

系统初始化后会自动创建一个主管理员账户：

- **用户名**：`admin`
- **密码**：`admin`
- **角色**：主管理员

⚠️ **重要**：请在生产环境中立即修改默认密码！

## 用户角色说明

### 🔑 主管理员 (admin)
- 拥有系统最高权限
- 可以创建子管理员账户
- 可以管理所有用户（创建、禁用、启用）
- 可以查看所有操作记录
- 不能被禁用

### 👤 子管理员 (sub_admin)
- 可以管理商家和客户账户
- 不能创建子管理员账户
- 可以查看操作记录
- 可以被主管理员禁用

### 🏪 商家 (merchant)
- 普通商家用户
- 由管理员创建账户
- 可以登录和查看个人信息

### 👨‍💼 客户 (customer)
- 普通客户用户
- 可以自行注册账户
- 可以登录和查看个人信息

## API 接口

### 认证接口
- `POST /api/register` - 客户注册（仅创建客户账户）
- `POST /api/login` - 用户登录
- `GET /api/profile` - 获取用户信息

### 管理员接口
- `GET /api/admin/users` - 获取用户列表
- `POST /api/admin/users` - 创建用户
- `PATCH /api/admin/users/:id/status` - 更新用户状态
- `GET /api/admin/logs/:userId?` - 获取操作记录

## 安全特性

### 🛡️ 密码安全
- 使用 bcrypt 加密存储密码
- 密码强度要求（至少6个字符）
- 支持密码可见性切换

### 🔒 访问控制
- JWT 令牌认证
- 基于角色的权限控制
- 令牌自动过期（24小时）

### 🚫 防护措施
- 登录速率限制（15分钟内最多5次尝试）
- 全局API速率限制（15分钟内最多100次请求）
- CORS 和 Helmet 安全中间件
- 输入验证和SQL注入防护

## 数据库结构

### 用户表 (users)
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'sub_admin', 'merchant', 'customer')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
  disable_reason TEXT,
  created_at TEXT NOT NULL,
  last_login TEXT
);
```

### 操作日志表 (operation_logs)
```sql
CREATE TABLE operation_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  operation TEXT NOT NULL,
  details TEXT,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## 环境变量

创建 `.env` 文件来配置环境变量：

```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

## 部署说明

### 生产环境部署
1. 设置环境变量
2. 使用 PM2 或类似工具管理进程
3. 配置反向代理（Nginx）
4. 启用HTTPS
5. 定期备份数据库

### Docker 部署
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 开发说明

### 项目结构
```
├── server.js              # 主服务器文件
├── package.json           # 项目配置
├── scripts/
│   └── initDatabase.js    # 数据库初始化脚本
├── public/
│   ├── index.html         # 前端页面
│   ├── styles.css         # 样式文件
│   └── script.js          # 前端脚本
└── README.md              # 说明文档
```

### 技术栈
- **后端**：Node.js + Express
- **数据库**：SQLite3
- **认证**：JWT + bcrypt
- **前端**：原生 HTML/CSS/JavaScript
- **安全**：Helmet + CORS + 速率限制

## 一键启动

为了方便使用，项目提供了一键启动脚本：

### Windows 用户
```bash
# 双击运行或在命令行执行
start.bat
```

### PowerShell 用户
```powershell
# 在PowerShell中执行
.\start.ps1
```

一键启动脚本会自动：
1. 清理旧的Node.js进程
2. 检查并安装依赖
3. 初始化数据库（如果不存在）
4. 启动服务器

## 故障排除

### 🔧 按钮无响应问题

如果遇到按钮点击无反应的情况，请按以下步骤排查：

1. **检查浏览器控制台**
   - 按 F12 打开开发者工具
   - 查看 Console 标签页是否有错误信息

2. **使用调试页面**
   - 访问：http://localhost:3000/debug.html
   - 运行各项诊断测试

3. **使用简单测试页面**
   - 访问：http://localhost:3000/simple-test.html
   - 测试基础功能是否正常

4. **清除浏览器缓存**
   - 按 Ctrl+F5 强制刷新页面
   - 或清除浏览器缓存和Cookie

5. **重启服务器**
   - 使用一键启动脚本重新启动

### 🌐 网络连接问题

如果API请求失败：

1. **检查服务器状态**
   ```bash
   netstat -ano | findstr :3000
   ```

2. **检查防火墙设置**
   - 确保3000端口未被阻止

3. **尝试不同浏览器**
   - 排除浏览器兼容性问题

### 📱 移动设备问题

在移动设备上使用时：

1. **确保网络连接**
   - 使用相同WiFi网络
   - 访问：http://[电脑IP]:3000

2. **检查响应式布局**
   - 页面应自动适配屏幕尺寸

## 常见问题

### Q: 忘记管理员密码怎么办？
A: 删除 `database.db` 文件，重新运行 `npm run init-db` 来重置系统。

### Q: 如何修改默认端口？
A: 设置环境变量 `PORT=你的端口号` 或修改 `server.js` 中的 PORT 配置。

### Q: 如何备份数据？
A: 直接复制 `database.db` 文件即可备份所有数据。

### Q: 支持哪些浏览器？
A: 支持所有现代浏览器，包括 Chrome、Firefox、Safari、Edge 等。

### Q: 端口被占用怎么办？
A: 使用一键启动脚本会自动清理端口，或手动执行：
```bash
taskkill /f /im node.exe
```

## 许可证

MIT License

## 更新日志

### v1.0.0
- 初始版本发布
- 完整的用户认证系统
- 多角色权限控制
- 响应式设计
- 操作日志记录
- 安全防护措施
