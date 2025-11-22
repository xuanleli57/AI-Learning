import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { analyzeUploadedCode } from '../services/geminiService';
import { Upload, FileCode, CheckCircle, AlertCircle, Loader2, Download } from 'lucide-react';

export const CodeAnalyzer: React.FC = () => {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset previous state
    setAnalysis("");
    setError(null);
    setFileName(file.name);

    if (!file.name.endsWith('.py') && !file.name.endsWith('.txt')) {
      setError("请上传 Python (.py) 或 文本 (.txt) 文件。");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setLoading(true);
        const result = await analyzeUploadedCode(text, file.name);
        setAnalysis(result);
        setLoading(false);
      }
    };
    reader.onerror = () => {
      setError("读取文件失败。");
      setLoading(false);
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    if (!analysis) return;
    const blob = new Blob([analysis], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis_${fileName || 'code'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FileCode className="w-8 h-8" />
            AI 代码解析实验室
          </h2>
          <p className="opacity-90">上传你的 Python 代码，AI 专家将为你进行深度解读、逻辑分析与优化建议。</p>
        </div>

        <div className="p-8">
          {/* Upload Area */}
          <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center hover:bg-slate-50 transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange} 
              className="hidden" 
              accept=".py,.txt"
            />
            <div className="flex flex-col items-center gap-4 text-slate-500 group-hover:text-indigo-600 transition-colors">
              <Upload className="w-12 h-12" />
              <div className="font-medium text-lg">点击上传 Python 文件</div>
              <div className="text-sm text-slate-400">支持 .py, .txt 格式</div>
            </div>
          </div>

          {/* Status Messages */}
          {fileName && !loading && !analysis && !error && (
            <div className="mt-4 flex items-center gap-2 text-slate-600">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>已选择: <strong>{fileName}</strong>. 正在准备分析...</span>
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-lg border border-red-100">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {loading && (
            <div className="mt-8 flex flex-col items-center justify-center py-12 text-indigo-600">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <span className="text-lg font-medium">AI 正在思考并分析你的代码逻辑...</span>
            </div>
          )}

          {/* Analysis Result */}
          {analysis && (
            <div className="mt-8 animate-fade-in">
              <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
                <h3 className="text-2xl font-bold text-slate-800">分析报告</h3>
                <button 
                  onClick={handleDownload}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  <Download className="w-4 h-4" />
                  保存报告
                </button>
              </div>
              <div className="prose prose-slate max-w-none bg-slate-50 p-6 rounded-xl border border-slate-200">
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
