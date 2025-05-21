const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const uploadRoutes = require('./routes/upload');

const app = express();
app.use(cors(), express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(3000, '0.0.0.0', ()=>console.log('Backend running on http://0.0.0.0:3000'));
