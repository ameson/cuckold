<template>
  <div>
    <!-- 隐私声明按钮 -->
    <button @click="showPrivacy = true" class="text-sm text-gray-500 hover:text-gray-700">
      隐私声明
    </button>

    <!-- 隐私声明弹窗 -->
    <el-dialog
      v-model="showPrivacy"
      title="隐私声明"
      width="90%"
      max-width="600px"
      class="privacy-dialog"
    >
      <div class="text-left space-y-4">
        <h3 class="font-bold text-lg">隐私保护政策</h3>
        
        <p>感谢您使用绿帽指数--情感关系分析系统。我们高度重视您的隐私保护。</p>

        <div class="bg-blue-50 p-4 rounded-lg mb-6">
          <p class="text-blue-800 font-semibold">重要说明：</p>
          <p class="text-blue-700">我们不会保存您的任何个人信息或测试数据。所有测试结果仅在您的浏览器中临时显示，关闭页面后即被清除。</p>
        </div>

        <div class="space-y-2">
          <h4 class="font-semibold">1. 信息处理</h4>
          <p>为了确保您的隐私安全：</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>所有测试过程完全在您的浏览器中进行</li>
            <li>我们不会将任何数据传输到服务器</li>
            <li>测试结果不会被保存或分享</li>
            <li>关闭页面后，所有数据将被自动清除</li>
          </ul>
        </div>

        <div class="space-y-2">
          <h4 class="font-semibold">2. 统计数据</h4>
          <p>我们仅收集匿名的访问统计数据：</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>页面访问次数</li>
            <li>访问时间</li>
            <li>设备类型（不包含具体标识）</li>
          </ul>
        </div>

        <div class="space-y-2">
          <h4 class="font-semibold">3. 广告服务</h4>
          <p>我们的网站使用了第三方广告服务：</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Google AdSense</li>
            <li>这些服务可能使用Cookie收集信息</li>
            <li>您可以通过浏览器设置管理Cookie</li>
          </ul>
        </div>

        <div class="space-y-2">
          <h4 class="font-semibold">4. 您的权利</h4>
          <p>作为用户，您可以：</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>随时清除浏览器Cookie</li>
            <li>选择是否保存测试结果截图</li>
            <li>拒绝第三方Cookie</li>
          </ul>
        </div>

        <div class="space-y-2">
          <h4 class="font-semibold">5. 联系我们</h4>
          <p>如果您对我们的隐私政策有任何疑问，请联系我们：</p>
          <p class="text-gray-600">邮箱：blinddate#temp.now（使用时请将#替换为@）</p>
        </div>

        <div class="text-sm text-gray-500 mt-4">
          <p>最后更新时间：2024年1月1日</p>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="showPrivacy = false">
            我知道了
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showPrivacy = ref(false)
</script>

<style scoped>
.privacy-dialog {
  max-height: 90vh;
  overflow-y: auto;
}

:deep(.el-dialog__body) {
  max-height: calc(90vh - 150px);
  overflow-y: auto;
}
</style>
