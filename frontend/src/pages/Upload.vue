<template>
  <el-card class="page">
    <el-select v-model="projectId" placeholder="请选择项目" style="width:240px;">
      <el-option v-for="p in projects" :key="p.id" :label="p.name" :value="p.id" />
    </el-select>
    <el-upload
      :action="axios.defaults.baseURL + '/upload'"
      :data="{ projectId }"
      accept="image/*"
      :show-file-list="false"
      @success="onSuccess"
    >
      <el-button type="primary" :disabled="!projectId">上传二维码</el-button>
    </el-upload>
    <el-button v-if="auth.user.isAdmin" @click="goProjects" style="margin-left:20px;">项目管理</el-button>
  </el-card>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/utils/axios';
import * as api from '@/api/projects';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
const auth = useAuthStore();
const router = useRouter();
const projects=ref([]), projectId=ref('');
function onSuccess(res){ ElMessage.success(res.message); }
async function load(){ projects.value=(await api.getProjects()).data; }
function goProjects(){ router.push('/projects'); }
onMounted(load);
</script>
