<template>
  <el-card class="page">
    <div class="header">
      <el-input v-model="newName" placeholder="项目名称" style="width:240px;" />
      <el-button type="primary" @click="create">新增项目</el-button>
      <el-button type="text" @click="logout">退出</el-button>
    </div>
    <el-table :data="projects" stripe style="margin-top:20px">
      <el-table-column prop="name" label="项目名" />
      <el-table-column label="管理地址">
        <template #default="{ row }">
          <el-button size="mini" @click="open(row)">管理</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="danger" size="mini" @click="del(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import * as api from '@/api/projects';
import { useAuthStore } from '@/store/auth';
const auth = useAuthStore();
const router = useRouter();
const newName=ref(''), projects=ref([]);
async function load(){ projects.value=(await api.getProjects()).data; }
async function create(){ await api.addProject(newName.value); newName.value=''; load(); }
async function del(id){ await api.deleteProject(id); load(); }
function open(row){ /* go to address dialog */ }
function logout(){ auth.logout(); router.push('/login'); }
onMounted(load);
</script>
