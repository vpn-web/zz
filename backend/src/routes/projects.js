const express = require('express');
const { v4: uuid } = require('uuid');
const auth = require('../middleware/auth');
const db = require('../config/db');
const router = express.Router();

router.get('/', auth, (req, res) => {
  res.json(db.data.projects);
});

router.post('/', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).end();
  const { name } = req.body;
  const project = { id: uuid(), name, addresses: [] };
  db.data.projects.push(project);
  await db.write();
  res.json(project);
});

router.delete('/:projectId', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).end();
  db.data.projects = db.data.projects.filter(p => p.id!==req.params.projectId);
  await db.write();
  res.json({ message: '项目已删除' });
});

router.get('/:projectId/addresses', auth, (req, res) => {
  const project = db.data.projects.find(p=>p.id===req.params.projectId);
  if (!project) return res.status(404).end();
  res.json(project.addresses);
});

router.post('/:projectId/addresses', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).end();
  const project = db.data.projects.find(p=>p.id===req.params.projectId);
  if (!project) return res.status(404).end();
  const { url } = req.body;
  project.addresses.push({ id: uuid(), url });
  await db.write();
  res.json(project.addresses);
});

router.delete('/:projectId/addresses/:addrId', auth, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).end();
  const project = db.data.projects.find(p=>p.id===req.params.projectId);
  if (!project) return res.status(404).end();
  project.addresses = project.addresses.filter(a=>a.id!==req.params.addrId);
  await db.write();
  res.json(project.addresses);
});

module.exports = router;
