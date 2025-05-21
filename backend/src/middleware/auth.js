const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: '未登录' });
  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch {
    res.status(401).json({ message: '认证失败' });
  }
};
