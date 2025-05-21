<template>
  <el-card class="page">
    <div class="header">
      <span>后台管理</span>
      <el-button type="text" @click="logout">退出</el-button>
    </div>
    <el-table :data="users" stripe style="margin-top:20px">
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="limit" label="每日上限" width="100" />
      <el-table-column label="今日使用">
        <template #default="{ row }">
          {{ row.usage[today] || 0 }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button
            type="danger"
            size="mini"
            @click="deleteUser(row.username)"
            :disabled="row.username==='admin'"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/utils/axios'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const auth = useAuthStore()
const router = useRouter()
const users = ref([])
const today = dayjs().format('YYYY-MM-DD')

async function loadUsers() {
  const res = await axios.get('/users')
  // 返回的数据结构是 { username: { password, limit, usage }, ... }
  users.value = Object.entries(res.data).map(([username, info]) => ({
    username,
    limit: info.limit,
    usage: info.usage || {}
  }))
}

async function deleteUser(username) {
  if (confirm(`确定要删除用户 ${username}？`)) {
    await axios.delete(`/users/${username}`)
    loadUsers()
  }
}

function logout() {
  auth.logout()
  router.push('/login')
}

onMounted(loadUsers)
</script>

<style scoped>
.page { padding: 20px; }
.header { display: flex; justify-content: space-between; align-items: center; }
</style>
