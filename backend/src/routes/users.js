const express = require('express');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const db = require('../config/db');
const router = express.Router();

router.get('/', auth, (req, res) => {
  if (!req.user.isAdmin) return res.status(403).end();
  res.json(db.data.users);
});

router.post('/', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).end();
  const { username, password, limit } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.data.users[username] = { password: hash, limit, usage: {} };
  await db.write();
  res.json({ message: '添加成功' });
});

router.delete('/:username', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).end();
  delete db.data.users[req.params.username];
  await db.write();
  res.json({ message: '删除成功' });
});

module.exports = router;
