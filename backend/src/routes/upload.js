const express = require('express');
const multer = require('multer');
const Jimp = require('jimp');
const QrCode = require('qrcode-reader');
const axios = require('axios');
const auth = require('../middleware/auth');
const db = require('../config/db');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.single('qrcode'), async (req, res) => {
  const { projectId } = req.body;
  const project = db.data.projects.find(p=>p.id===projectId);
  if (!project || project.addresses.length===0) {
    return res.status(400).json({ message: '无效的项目或无地址' });
  }
  const img = await Jimp.read(req.file.path);
  const qr = new QrCode();
  qr.callback = async (_, v) => {
    await Promise.all(project.addresses.map(addr=>
      axios.post(addr.url, { url: v.result })
    ));
  };
  qr.decode(img.bitmap);
  res.json({ message: '已推送至项目所有地址' });
});

module.exports = router;
