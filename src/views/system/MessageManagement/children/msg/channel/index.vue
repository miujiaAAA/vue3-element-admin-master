<template>
  <div class="message-channel-page">
    <el-card>
      <template #header>
        <div class="card-header">消息通道管理</div>
      </template>
      <el-row class="main-content">
        <el-col :span="3" class="left-area">
          <!-- 遍历 channels 列表，设置 key 并绑定点击事件 -->
          <el-card
            v-for="channel in channels"
            :key="channel.key"
            @click="selectChannel(channel.key)"
          >
            {{ channel.name }}
          </el-card>
        </el-col>
        <el-col :span="20" class="right-area">
          <el-card>
            <template #header>右侧区域内容</template>
            <!-- 根据请求结果展示内容 -->
            <p v-if="loading">加载中...</p>
            <p v-else>{{ selectedChannelContent }}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import MessageAPI from "@/api/system/message";

// 定义左侧的消息通道列表，包含 key 和 name
const channels = ref([
  { key: "email", name: "邮件" },
  { key: "note", name: "短信" },
]);

// 定义当前选中的通道 key
const selectedChannelKey = ref("email");

// 定义右侧显示的内容
const selectedChannelContent = ref("");

// 定义加载状态
const loading = ref(false);

function selectChannel(key: string) {
  selectedChannelKey.value = key;
  loading.value = true;
  MessageAPI.getChannelInfo(key)
    .then(() => {
      ElMessage.success(key);
    })
    .finally(() => (loading.value = false));
}

// 处理窗口大小变化的函数
const handleResize = () => {
  console.log("窗口宽度:", window.innerWidth);
};

onMounted(() => {
  // 页面加载完成后添加窗口大小变化的监听器
  window.addEventListener("resize", handleResize);
  // 初始化时加载第一个通道的信息
  selectChannel(selectedChannelKey.value);
});

onUnmounted(() => {
  // 页面卸载时移除窗口大小变化的监听器
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped lang="scss">
.message-channel-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;

  .card-header {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
    color: #226f90;
  }

  .main-content {
    display: flex;
    flex: 1;
    flex-wrap: nowrap;
    gap: 10px;
  }

  .left-area,
  .right-area {
    padding: 10px;
    overflow: auto;
    background-color: #f5f7fa;
    border-radius: 4px;
  }

  .left-area {
    display: flex;
    flex: 0 0 12.5%;
    flex-direction: column;
    gap: 10px;
    min-width: 100px;
  }

  .right-area {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  /* 淡化边框实现 */
  .left-area .el-card,
  .right-area .el-card {
    padding: 10px;
    border: 1px solid rgba(204, 204, 204, 0.3);
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  /* 悬停效果 */
  .left-area .el-card:hover,
  .right-area .el-card:hover {
    border-color: rgba(204, 204, 204, 0.5);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* 媒体查询，当窗口宽度小于 768px 时调整布局 */
  @media (max-width: 768px) {
    .main-content {
      flex-direction: column;
    }

    .left-area {
      flex: 0 0 auto;
      width: 100%;
    }

    .right-area {
      flex: 0 0 auto;
      width: 100%;
    }
  }
}
</style>
