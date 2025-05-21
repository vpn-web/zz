<template>
  <el-card class="login-card">
    <h2>扫码中转 登录</h2>
    <el-form :model="form">
      <el-form-item>
        <el-input v-model="form.username" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="form.password" placeholder="密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from '@/utils/axios';
import { useAuthStore } from '@/store/auth';
const router = useRouter(), auth = useAuthStore();
const form = reactive({ username:'', password:'' });
async function submit() {
  const { data } = await axios.post('/auth/login', form);
  auth.login(data.token);
  router.push('/upload');
}
</script>
<style>
.login-card { width: 360px; margin: 100px auto; padding: 20px; }
</style>
