const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { secret, expiresIn } = require('../config/jwt');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = db.data.users[username];
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ message: '用户名或密码错误' });
  }
  const token = jwt.sign({ username, isAdmin: username==='admin' }, secret, { expiresIn });
  res.json({ token });
});

module.exports = router;
