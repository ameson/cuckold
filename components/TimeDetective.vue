<template>
  <div class="time-detective">
    <div class="max-w-4xl mx-auto px-4">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <!-- 欢迎页面 -->
        <div v-if="currentStep === 'welcome'" class="text-center">
          <h2 class="text-2xl font-bold text-green-800 mb-4">时光侦探</h2>
          <p class="text-gray-600 mb-8">让我们来玩个时间推理游戏～</p>
          <el-button type="success" @click="startQuiz">
            开始探索
          </el-button>
        </div>

        <!-- 问题页面 -->
        <div v-else-if="currentStep === 'quiz'" class="quiz-section">
          <div class="mb-8">
            <el-progress :percentage="progress" :format="progressFormat" />
          </div>

          <div v-if="currentQuestion" class="bg-green-50 rounded-lg p-6 mb-8">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">{{ currentQuestion.title }}</h3>
            <div class="space-y-4">
              <el-radio-group v-model="selectedAnswer" class="flex flex-col gap-3">
                <el-radio 
                  v-for="option in currentQuestion.options" 
                  :key="option.value" 
                  :label="option.value"
                  class="!flex !items-start p-3 bg-white rounded-lg hover:bg-green-50 transition-colors"
                >
                  {{ option.label }}
                </el-radio>
              </el-radio-group>
            </div>
          </div>

          <div class="flex justify-between">
            <el-button @click="previousQuestion" :disabled="questionIndex === 0">
              上一题
            </el-button>
            <el-button type="success" @click="nextQuestion" :disabled="!selectedAnswer">
              {{ isLastQuestion ? '查看结果' : '下一题' }}
            </el-button>
          </div>
        </div>

        <!-- 结果页面 -->
        <div v-else-if="currentStep === 'result'" class="result-section">
          <h3 class="text-2xl font-bold text-green-800 mb-6">调查结果</h3>
          
          <div class="bg-green-50 rounded-lg p-6 mb-6">
            <h4 class="text-xl font-semibold mb-4">发现的线索：</h4>
            <ul class="space-y-3">
              <li v-for="(finding, index) in findings" :key="index" class="flex items-start">
                <span class="mr-2">🔍</span>
                <span>{{ finding }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-yellow-50 rounded-lg p-6 mb-6">
            <h4 class="text-xl font-semibold mb-4">侦探建议：</h4>
            <p class="text-gray-700">{{ suggestion }}</p>
          </div>

          <div class="text-center">
            <el-button type="primary" @click="restart">
              重新开始
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentStep = ref('welcome')
const questionIndex = ref(0)
const selectedAnswer = ref('')
const findings = ref([])
const suggestion = ref('')

const questions = [
  {
    title: "最近的'加班'有点意思？",
    options: [
      { label: "偶尔加班，很正常", value: "normal" },
      { label: "经常加班，但会提前说", value: "frequent" },
      { label: "突然增多，还常常临时通知", value: "suspicious" }
    ]
  },
  {
    title: "手机使用习惯有变化吗？",
    options: [
      { label: "和以前一样，很自然", value: "normal" },
      { label: "偶尔会避开我看手机", value: "slight" },
      { label: "明显变得很在意隐私", value: "obvious" }
    ]
  },
  {
    title: "社交圈有什么新变化？",
    options: [
      { label: "基本都是老朋友", value: "normal" },
      { label: "认识了一些新朋友，但会介绍给我", value: "moderate" },
      { label: "新朋友很多，但从不让我见", value: "concerning" }
    ]
  }
]

const currentQuestion = computed(() => questions[questionIndex.value])
const isLastQuestion = computed(() => questionIndex.value === questions.length - 1)
const progress = computed(() => (questionIndex.value / questions.length) * 100)

const progressFormat = (percentage) => `调查进度：${percentage}%`

const startQuiz = () => {
  currentStep.value = 'quiz'
}

const nextQuestion = () => {
  if (isLastQuestion.value) {
    showResult()
    return
  }
  questionIndex.value++
  selectedAnswer.value = ''
}

const previousQuestion = () => {
  if (questionIndex.value > 0) {
    questionIndex.value--
    selectedAnswer.value = ''
  }
}

const calculateFindings = () => {
  const result = {
    findings: [],
    riskLevel: 'low'
  }

  // 分析答案
  if (selectedAnswer.value === 'suspicious') {
    result.findings.push('工作时间突然变化，且经常临时通知，这是一个值得关注的信号')
    result.riskLevel = 'high'
  }
  
  if (selectedAnswer.value === 'obvious') {
    result.findings.push('手机使用习惯发生明显变化，变得格外注重隐私')
    result.riskLevel = 'high'
  }

  if (selectedAnswer.value === 'concerning') {
    result.findings.push('新社交圈完全封闭，这可能暗示着一些问题')
    result.riskLevel = 'high'
  }

  return result
}

const getSuggestion = (result) => {
  if (result.riskLevel === 'high') {
    return '建议：保持冷静，适度关注，但不要过度紧张。选择合适的时机开诚布公地沟通，表达你的关心和担忧。'
  }
  return '建议：目前情况看起来比较正常，继续保持良好的沟通和信任关系。'
}

const showResult = () => {
  const result = calculateFindings()
  findings.value = result.findings
  suggestion.value = getSuggestion(result)
  currentStep.value = 'result'
}

const restart = () => {
  currentStep.value = 'welcome'
  questionIndex.value = 0
  selectedAnswer.value = ''
  findings.value = []
  suggestion.value = ''
}
</script>

<style scoped>
.time-detective {
  min-height: 100vh;
  padding: 2rem 0;
  background: linear-gradient(to bottom, #f0fdf4, #dcfce7);
}
</style>
