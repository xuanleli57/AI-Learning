import { ModuleType, Topic } from "./types";
import { BookOpen, Cpu, Brain, Sigma, Activity, Code } from "lucide-react";

export const MODULE_CONFIG = {
  [ModuleType.PYTHON]: {
    title: "Python 核心",
    icon: BookOpen,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    topics: [
      { id: "p1", title: "基础语法与变量", description: "理解 Python 的动态类型与内存管理", promptContext: "Python variables, types, memory model." },
      { id: "p2", title: "高级数据结构", description: "列表推导式、生成器与装饰器", promptContext: "List comprehensions, generators, decorators." },
      { id: "p3", title: "面向对象编程", description: "类、继承与多态的实战", promptContext: "OOP, classes, inheritance, polymorphism." },
    ] as Topic[]
  },
  [ModuleType.MATH]: {
    title: "数学基础",
    icon: Sigma,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    topics: [
      { id: "m1", title: "线性代数: 矩阵与变换", description: "向量空间、特征值与特征向量", promptContext: "Linear algebra, matrices, eigenvalues, geometric interpretation." },
      { id: "m2", title: "微积分: 梯度与优化", description: "导数、偏导数与梯度下降", promptContext: "Calculus, derivatives, gradients, optimization." },
      { id: "m3", title: "概率论与统计", description: "贝叶斯定理与分布", promptContext: "Probability, Bayes theorem, distributions." },
    ] as Topic[]
  },
  [ModuleType.ML]: {
    title: "机器学习",
    icon: Cpu,
    color: "text-green-600",
    bgColor: "bg-green-50",
    topics: [
      { id: "ml1", title: "监督学习: 回归与分类", description: "线性回归、逻辑回归、SVM", promptContext: "Supervised learning, regression, classification, SVM." },
      { id: "ml2", title: "无监督学习: 聚类", description: "K-Means, PCA降维", promptContext: "Unsupervised learning, K-means, PCA." },
      { id: "ml3", title: "模型评估", description: "过拟合、欠拟合与交叉验证", promptContext: "Model evaluation, overfitting, bias-variance tradeoff." },
    ] as Topic[]
  },
  [ModuleType.DL]: {
    title: "深度学习",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    topics: [
      { id: "dl1", title: "神经网络基础", description: "前向传播与反向传播", promptContext: "Neural networks, backpropagation, activation functions." },
      { id: "dl2", title: "卷积神经网络 (CNN)", description: "图像处理与特征提取", promptContext: "CNN, convolution, pooling, image processing." },
      { id: "dl3", title: "Transformer 架构", description: "Attention机制与大模型基础", promptContext: "Transformers, self-attention, LLM basics." },
    ] as Topic[]
  },
  [ModuleType.RL]: {
    title: "强化学习",
    icon: Activity,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    topics: [
      { id: "rl1", title: "马尔可夫决策过程 (MDP)", description: "状态、动作与奖励", promptContext: "MDP, states, actions, rewards." },
      { id: "rl2", title: "Q-Learning", description: "价值迭代与策略优化", promptContext: "Q-learning, value iteration." },
      { id: "rl3", title: "Deep Q-Network (DQN)", description: "深度强化学习实战", promptContext: "DQN, experience replay." },
    ] as Topic[]
  },
  [ModuleType.PRACTICE]: {
    title: "代码实践",
    icon: Code,
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    topics: [] // Handled separately
  }
};
