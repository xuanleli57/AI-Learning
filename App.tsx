import React, { useState } from 'react';
import { ModuleType, Topic } from './types';
import { MODULE_CONFIG } from './constants';
import { fetchTopicExplanation } from './services/geminiService';
import { Visualizer } from './components/Visualizer';
import { CodeAnalyzer } from './components/CodeAnalyzer';
import ReactMarkdown from 'react-markdown';
import { Download, ArrowRight, ChevronRight, BookOpen, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<ModuleType>(ModuleType.HOME);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleModuleChange = (module: ModuleType) => {
    setCurrentModule(module);
    setActiveTopic(null);
    setContent("");
  };

  const handleTopicClick = async (topic: Topic) => {
    setActiveTopic(topic);
    setIsLoading(true);
    setContent("");
    
    // Check if we have cached content? (Skipping for simplicity, fetching fresh from AI)
    const text = await fetchTopicExplanation(currentModule, topic.title, topic.promptContext);
    setContent(text);
    setIsLoading(false);
  };

  const handleDownloadContent = () => {
    if (!content || !activeTopic) return;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTopic.title}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- Render Helpers ---

  const renderSidebar = () => {
    const PracticeIcon = MODULE_CONFIG[ModuleType.PRACTICE].icon;

    return (
      <nav className="w-72 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-2xl tracking-tight">
            <Sparkles className="w-6 h-6" />
            <span>AI Master</span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-medium">INTERACTIVE LEARNING HUB</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <button 
            onClick={() => handleModuleChange(ModuleType.HOME)}
            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-between group
              ${currentModule === ModuleType.HOME ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <span>首页概览</span>
          </button>
          
          <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">学习模块</div>
          
          {[ModuleType.PYTHON, ModuleType.MATH, ModuleType.ML, ModuleType.DL, ModuleType.RL].map((m) => {
            const config = MODULE_CONFIG[m];
            const Icon = config.icon;
            const isActive = currentModule === m;
            return (
              <button
                key={m}
                onClick={() => handleModuleChange(m)}
                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 mb-1
                  ${isActive ? `bg-white shadow-md text-slate-900 border border-slate-100` : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <div className={`p-2 rounded-lg ${config.bgColor} ${config.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span>{config.title}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-slate-400" />}
              </button>
            );
          })}

          <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">实践工具</div>
          
          <button
            onClick={() => handleModuleChange(ModuleType.PRACTICE)}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3
              ${currentModule === ModuleType.PRACTICE ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <div className={`p-2 rounded-lg ${currentModule === ModuleType.PRACTICE ? 'bg-white/20' : 'bg-slate-100 text-slate-600'}`}>
                <PracticeIcon className="w-5 h-5" />
              </div>
            <span>AI 代码解析</span>
          </button>
        </div>
      </nav>
    );
  };

  const renderHome = () => (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
          掌握人工智能的<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-600">终极学习路径</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          从 Python 基础到深度强化学习。融合交互式可视化与 AI 辅助代码解析，让复杂的概念触手可及。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[ModuleType.PYTHON, ModuleType.MATH, ModuleType.ML, ModuleType.DL].map(m => {
          const config = MODULE_CONFIG[m];
          const Icon = config.icon;
          return (
            <div key={m} 
              onClick={() => handleModuleChange(m)}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-12 h-12 ${config.bgColor} ${config.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{config.title}</h3>
              <p className="text-slate-500 text-sm mb-4">点击进入模块，开始探索核心知识点与交互式图表。</p>
              <div className="flex items-center text-indigo-600 font-medium text-sm group-hover:translate-x-2 transition-transform">
                开始学习 <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );

  const renderModuleContent = () => {
    if (currentModule === ModuleType.HOME) return renderHome();
    if (currentModule === ModuleType.PRACTICE) return (
      <div className="p-8 animate-fade-in">
         <CodeAnalyzer />
      </div>
    );

    const config = MODULE_CONFIG[currentModule];
    if (!config) return null;

    return (
      <div className="flex h-screen overflow-hidden">
        {/* Topic List */}
        <div className="w-80 bg-slate-50 border-r border-slate-200 overflow-y-auto p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6 px-2 flex items-center gap-2">
            <config.icon className={`w-6 h-6 ${config.color}`} />
            {config.title}
          </h2>
          <div className="space-y-3">
            {config.topics.map(topic => (
              <div 
                key={topic.id}
                onClick={() => handleTopicClick(topic)}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-200
                  ${activeTopic?.id === topic.id 
                    ? 'bg-white border-indigo-600 shadow-md ring-1 ring-indigo-100' 
                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'}`}
              >
                <h4 className={`font-semibold mb-1 ${activeTopic?.id === topic.id ? 'text-indigo-700' : 'text-slate-800'}`}>
                  {topic.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">{topic.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          {!activeTopic ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <BookOpen className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">请在左侧选择一个知识点开始学习</p>
            </div>
          ) : (
            <div className="p-12 max-w-4xl mx-auto animate-fade-in">
              <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{activeTopic.title}</h1>
                  <p className="text-slate-500">{activeTopic.description}</p>
                </div>
                {!isLoading && content && (
                  <button 
                    onClick={handleDownloadContent}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    下载笔记
                  </button>
                )}
              </div>

              {/* Interactive Visualization Section */}
              <Visualizer module={currentModule} />

              {/* Content Section */}
              {isLoading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-100 rounded w-full"></div>
                  <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                  <div className="h-32 bg-slate-50 rounded w-full mt-8"></div>
                  <p className="text-center text-indigo-600 mt-4 font-medium">AI 教授正在为您撰写详细教程...</p>
                </div>
              ) : (
                <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-indigo-600 prose-code:text-indigo-600 prose-pre:bg-slate-900 prose-pre:shadow-lg">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {renderSidebar()}
      <main className="flex-1">
        {renderModuleContent()}
      </main>
    </div>
  );
};

export default App;