// 登录API
export default function handler(req, res) {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  const { username, password } = req.body;
  
  // 模拟用户数据
  const users = {
    'admin': { password: 'admin123', role: 'main_admin' },
    'subadmin': { password: 'sub123', role: 'sub_admin' },
    'merchant1': { password: 'merchant123', role: 'merchant' },
    'customer1': { password: 'customer123', role: 'customer' }
  };
  
  const user = users[username];
  
  if (user && user.password === password) {
    res.status(200).json({
      success: true,
      message: '登录成功',
      user: {
        username: username,
        role: user.role
      },
      token: 'mock-jwt-token-' + username
    });
  } else {
    res.status(401).json({
      success: false,
      message: '用户名或密码错误'
    });
  }
}
