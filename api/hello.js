// 简单的健康检查API
export default function handler(req, res) {
  res.status(200).json({
    message: '宝格立印照片管理系统 API 运行正常',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
}
