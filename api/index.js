/**
 * Vercel Serverless API Handler
 * 为Vercel环境优化的API处理器
 */

const express = require('express');
const app = express();

// 中间件配置
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS配置
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 模拟数据库数据
const mockUsers = [
  { id: 1, username: 'admin', password: 'admin123', role: 'main_admin' },
  { id: 2, username: 'subadmin', password: 'sub123', role: 'sub_admin' },
  { id: 3, username: 'merchant1', password: 'merchant123', role: 'merchant' },
  { id: 4, username: 'customer1', password: 'customer123', role: 'customer' }
];

// 登录API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = mockUsers.find(u => u.username === username && u.password === password);
  
  if (user) {
    res.json({
      success: true,
      message: '登录成功',
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      },
      token: 'mock-jwt-token-' + user.id
    });
  } else {
    res.status(401).json({
      success: false,
      message: '用户名或密码错误'
    });
  }
});

// 注册API
app.post('/api/register', (req, res) => {
  const { username, password, role = 'customer' } = req.body;
  
  const existingUser = mockUsers.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: '用户名已存在'
    });
  }
  
  const newUser = {
    id: mockUsers.length + 1,
    username,
    password,
    role
  };
  
  mockUsers.push(newUser);
  
  res.json({
    success: true,
    message: '注册成功',
    user: {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role
    }
  });
});

// 获取用户列表API
app.get('/api/admin/users', (req, res) => {
  const users = mockUsers.map(user => ({
    id: user.id,
    username: user.username,
    role: user.role,
    createdAt: new Date().toISOString()
  }));
  
  res.json({
    success: true,
    users: users,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalRecords: users.length,
      pageSize: 20
    }
  });
});

// 健康检查API
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '宝格立印照片管理系统运行正常',
    timestamp: new Date().toISOString(),
    environment: 'Vercel Serverless'
  });
});

// 默认路由 - 返回系统信息
app.get('/', (req, res) => {
  res.json({
    message: '宝格立印照片管理系统 API',
    version: '1.0.0',
    status: 'running',
    environment: 'Vercel Serverless',
    note: '这是一个演示版本，数据不会持久化保存'
  });
});

module.exports = app;
