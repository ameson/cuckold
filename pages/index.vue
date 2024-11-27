<template>
  <div class="py-8">
    <div class="max-w-6xl mx-auto px-4">
      <!-- 首页模块选择 -->
      <div v-if="currentStep === 'welcome'" class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <!-- 绿帽指数检测 -->
        <div class="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow cursor-pointer" @click="startDetective">
          <div class="text-center">
            <h2 class="text-xl md:text-2xl font-bold text-green-800 mb-3 md:mb-4">行为检测</h2>
            <p class="text-sm md:text-base text-gray-600 mb-6 md:mb-8">全方位分析Ta的可疑行为，给出专业风险评估</p>
            <div class="mb-6 md:mb-8">
              <img src="/images/detective.svg" alt="侦探" class="mx-auto h-24 md:h-32">
            </div>
            <el-button type="success" size="large" class="w-full md:w-auto">
              开始检测
            </el-button>
          </div>
        </div>

        <!-- 情感解密 -->
        <div class="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow cursor-pointer" @click="startDecoder">
          <div class="text-center">
            <h2 class="text-xl md:text-2xl font-bold text-green-800 mb-3 md:mb-4">关系分析</h2>
            <p class="text-sm md:text-base text-gray-600 mb-6 md:mb-8">深入解析Ta的历史轨迹，预测潜在风险</p>
            <div class="mb-6 md:mb-8">
              <img src="/images/decoder.svg" alt="解密" class="mx-auto h-24 md:h-32">
            </div>
            <el-button type="primary" size="large" class="w-full md:w-auto">
              开始解密
            </el-button>
          </div>
        </div>
      </div>

      <!-- 检测问卷页面 -->
      <div v-else-if="currentStep === 'quiz'" class="bg-white rounded-lg shadow-lg p-4 md:p-6">
        <div class="mb-6 md:mb-8">
          <h2 class="text-xl md:text-2xl font-bold text-green-800 text-center mb-4">行为检测</h2>
          <el-progress 
            :percentage="investigationProgress" 
            :format="progressFormat"
            :stroke-width="12"
            class="progress-bar"
          />
        </div>

        <div v-if="currentQuestion" class="mb-6 md:mb-8">
          <div class="bg-green-50 rounded-lg p-4 md:p-6">
            <h3 class="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
              {{ currentQuestion.title }}
            </h3>
            <div class="space-y-3 md:space-y-4">
              <el-radio-group v-model="selectedAnswer" class="flex flex-col gap-3 md:gap-4">
                <el-radio 
                  v-for="option in currentQuestion.options" 
                  :key="option.value" 
                  :value="option.value"
                  class="!flex !items-start p-3 md:p-4 bg-white rounded-lg hover:bg-green-50 transition-colors"
                  size="large"
                >
                  {{ option.label }}
                </el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <div class="flex justify-between gap-4">
          <el-button 
            @click="previousQuestion" 
            :disabled="questionIndex === 0"
            size="large"
            class="flex-1 md:flex-none"
          >
            上一题
          </el-button>
          <el-button 
            type="success" 
            @click="nextQuestion" 
            :disabled="!selectedAnswer"
            size="large"
            class="flex-1 md:flex-none"
          >
            {{ isLastQuestion ? '查看结果' : '下一题' }}
          </el-button>
        </div>
      </div>

      <!-- 检测结果页面 -->
      <div v-else-if="currentStep === 'result'" class="space-y-6">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold text-green-800 mb-6 text-center">行为检测</h2>
          
          <!-- 风险指数 -->
          <div class="mb-8">
            <h3 class="text-xl font-semibold mb-4 flex items-center">
              <span class="mr-2">📊</span>
              风险指数
            </h3>
            <div class="bg-green-50 rounded-lg p-6">
              <el-progress 
                :percentage="riskScore" 
                :status="riskScore > 70 ? 'exception' : riskScore > 40 ? 'warning' : 'success'"
                :stroke-width="20"
              />
              <p class="mt-4 text-center text-gray-700">
                {{ getRiskLevel(riskScore) }}
              </p>
            </div>
          </div>

          <!-- 可疑行为 -->
          <div class="mb-8">
            <h3 class="text-xl font-semibold mb-4 flex items-center">
              <span class="mr-2">🚩</span>
              可疑行为
            </h3>
            <div class="space-y-4">
              <div 
                v-for="(finding, index) in findings" 
                :key="index"
                class="bg-green-50 rounded-lg p-4"
              >
                <p class="text-gray-700">{{ finding }}</p>
              </div>
              <div v-if="findings.length === 0" class="text-gray-500 text-center p-4">
                暂时没有发现异常行为
              </div>
            </div>
          </div>

          <!-- 建议 -->
          <div class="mb-8">
            <h3 class="text-xl font-semibold mb-4 flex items-center">
              <span class="mr-2">💡</span>
              专业建议
            </h3>
            <div class="bg-yellow-50 rounded-lg p-4">
              <p class="text-gray-700">{{ suggestion }}</p>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="text-center space-x-4">
            <el-button type="primary" @click="startDecoder" size="large">
              进行关系分析
            </el-button>
            <el-button type="success" @click="restart" size="large">
              重新检测
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 状态管理
const currentStep = ref('welcome')
const questionIndex = ref(0)
const selectedAnswer = ref('')
const userAnswers = ref([])  // 新增：存储用户答案
const findings = ref([])
const suggestion = ref('')
const riskScore = ref(0)

// 问题列表
const questions = [
  {
    title: "Ta最近的加班情况？",
    options: [
      { label: "正常加班，会提前通知",       value: "normal",     score: 0  },
      { label: "偶尔加班，但解释模糊",       value: "slight",     score: 5  },
      { label: "频繁加班，还经常临时通知",   value: "suspicious", score: 10 }
    ]
  },
  {
    title: "Ta的手机使用习惯有变化吗？",
    options: [
      { label: "正常使用，从不遮掩",         value: "normal",     score: 0  },
      { label: "偶尔会避开我看手机",         value: "slight",     score: 5  },
      { label: "经常背对我看手机，很在意隐私", value: "suspicious", score: 10 }
    ]
  },
  {
    title: "Ta最近的社交圈有变化吗？",
    options: [
      { label: "都是老朋友，很透明",         value: "normal",     score: 0  },
      { label: "认识了新朋友，但会介绍给我", value: "moderate",   score: 7  },
      { label: "新朋友很多，但从不让我见",   value: "suspicious", score: 10 }
    ]
  },
  {
    title: "Ta的休息日安排有变化吗？",
    options: [
      { label: "基本一起过，很稳定",         value: "normal",     score: 0  },
      { label: "偶尔自己安排，会提前说",     value: "slight",     score: 5  },
      { label: "经常临时有事，理由模糊",     value: "suspicious", score: 10 }
    ]
  }
]

// 计算属性
const currentQuestion = computed(() => questions[questionIndex.value])
const isLastQuestion = computed(() => questionIndex.value === questions.length - 1)
const investigationProgress = computed(() => (questionIndex.value / questions.length) * 100)

// 方法
const progressFormat = (percentage) => `检测进度：${percentage}%`

const startDetective = () => {
  currentStep.value = 'quiz'
  resetState()
}

const startDecoder = () => {
  ElMessage({
    message: '功能开发中，敬请期待...',
    type: 'info',
    duration: 3000
  })
}

const resetState = () => {
  questionIndex.value = 0
  selectedAnswer.value = ''
  userAnswers.value = []
  findings.value = []
  suggestion.value = ''
  riskScore.value = 0
}

const nextQuestion = () => {
  if (selectedAnswer.value) {
    userAnswers.value[questionIndex.value] = selectedAnswer.value
    if (questionIndex.value < questions.length - 1) {
      questionIndex.value++
      selectedAnswer.value = userAnswers.value[questionIndex.value] || ''
    } else {
      showResult()
    }
  }
}

const previousQuestion = () => {
  if (questionIndex.value > 0) {
    questionIndex.value--
    selectedAnswer.value = userAnswers.value[questionIndex.value] || ''
  }
}

const calculateRiskScore = () => {
  const totalScore = userAnswers.value.reduce((sum, answer, index) => {
    const question = questions[index]
    const option = question.options.find(opt => opt.value === answer)
    return sum + (option ? option.score : 0)
  }, 0)
  const maxScore = questions.length * 10
  return Math.min(Math.round((totalScore / maxScore) * 100), 100)
}

const calculateFindings = () => {
  const findings = []
  const score = calculateRiskScore()
  
  userAnswers.value.forEach((answer, index) => {
    const question = questions[index]
    const option = question.options.find(opt => opt.value === answer)
    if (option && option.value === 'suspicious') {
      switch(index) {
        case 0:
          findings.push('🕒 加班时间可疑：Ta的加班比007还频繁，要么是工作狂，要么...')
          break
        case 1:
          findings.push('📱 手机防备过度：手机都快贴脸上了，莫非在看什么不可告人的秘密？')
          break
        case 2:
          findings.push('👥 社交圈诡异：新朋友像地下党一样神秘，就是不让你见见？')
          break
        case 3:
          findings.push('📅 休息日失联：周末总有理由不在，难道是去拯救地球了？')
          break
      }
    } else if (option && option.value === 'slight' || option.value === 'moderate') {
      switch(index) {
        case 0:
          findings.push('🕒 加班时间异常：偶尔的加班，可能真的是在努力上进...吧？')
          break
        case 1:
          findings.push('📱 手机有点飘：时不时躲着看手机，是在准备什么惊喜吗？')
          break
        case 2:
          findings.push('👥 社交圈扩大：新朋友挺多的，希望不是什么奇怪的人吧...')
          break
        case 3:
          findings.push('📅 休息日计划：独处时间增加了，是想享受二人世界的反差萌吗？')
          break
      }
    }
  })
  
  let riskLevel = 'low'
  if (score >= 70) riskLevel = 'high'
  else if (score >= 40) riskLevel = 'medium'
  
  return { findings, riskLevel }
}

const getRiskLevel = (score) => {
  if (score >= 70) return '🚨 红色预警：这顶帽子的颜色有点绿啊！'
  if (score >= 40) return '⚠️ 黄色警告：有点可疑，但还不至于歇斯底里'
  return '✨ 安全指数：放心，帽子还是原装的'
}

const getSuggestion = (riskLevel) => {
  switch (riskLevel) {
    case 'high':
      return '建议：\n1. 别慌！先冷静分析，毕竟慌乱会让发型更乱\n2. 多观察少质问，做个优雅的柯南\n3. 实在不行，考虑找个侦探当队友？'
    case 'medium':
      return '建议：\n1. 保持淡定，毕竟头上暂时还是清爽的\n2. 偶尔查岗，但要假装若无其事\n3. 没事多陪陪Ta，别让别人有可乘之机'
    default:
      return '建议：\n1. 继续保持，你们的感情比城墙还稳固\n2. 偶尔制造点小惊喜，感情要常温不能冷却\n3. 该吃吃该喝喝，快乐才是真谛'
  }
}

const showResult = () => {
  const result = calculateFindings()
  findings.value = result.findings
  suggestion.value = getSuggestion(result.riskLevel)
  riskScore.value = calculateRiskScore()
  currentStep.value = 'result'
}

const restart = () => {
  currentStep.value = 'welcome'
  resetState()
}
</script>

<style scoped>
.progress-bar :deep(.el-progress-bar__inner) {
  transition: width 0.3s ease;
}

.progress-bar :deep(.el-progress__text) {
  font-size: 14px !important;
}
</style>
