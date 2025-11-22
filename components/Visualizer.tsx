import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

interface VisualizerProps {
  module: string;
}

// A simple math playground to demonstrate "Number & Shape Combination"
export const Visualizer: React.FC<VisualizerProps> = ({ module }) => {
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(0);
  const [amplitude, setAmplitude] = useState(1);
  const [frequency, setFrequency] = useState(1);

  // Generate data for Linear Function (Math/ML basic)
  const linearData = useMemo(() => {
    const data = [];
    for (let x = -10; x <= 10; x++) {
      data.push({ x, y: slope * x + intercept });
    }
    return data;
  }, [slope, intercept]);

  // Generate data for Sine Wave (Deep Learning activation/signal)
  const sineData = useMemo(() => {
    const data = [];
    for (let x = 0; x <= 360; x += 10) {
      const rad = (x * Math.PI) / 180;
      data.push({ x, y: amplitude * Math.sin(frequency * rad) });
    }
    return data;
  }, [amplitude, frequency]);

  if (module === 'MATH' || module === 'ML') {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 my-6">
        <h3 className="text-lg font-bold mb-4 text-indigo-700">交互式实验室: 线性回归基础 (y = mx + b)</h3>
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">斜率 (m): {slope}</label>
            <input 
              type="range" min="-5" max="5" step="0.5" 
              value={slope} onChange={(e) => setSlope(parseFloat(e.target.value))}
              className="w-48 accent-indigo-600"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">截距 (b): {intercept}</label>
            <input 
              type="range" min="-10" max="10" step="1" 
              value={intercept} onChange={(e) => setIntercept(parseFloat(e.target.value))}
              className="w-48 accent-indigo-600"
            />
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={linearData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" type="number" domain={[-10, 10]} allowDataOverflow />
              <YAxis domain={[-20, 20]} allowDataOverflow />
              <Tooltip />
              <Line type="monotone" dataKey="y" stroke="#4f46e5" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-slate-500 mt-4">
          拖动滑块观察数学公式 <code className="bg-slate-100 px-1 rounded">y = {slope}x + {intercept}</code> 如何直接影响几何图像。这就是“数形结合”。
        </p>
      </div>
    );
  }

  if (module === 'DL' || module === 'RL') {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 my-6">
        <h3 className="text-lg font-bold mb-4 text-rose-700">交互式实验室: 激活函数与波形 (Sine)</h3>
        <div className="flex flex-wrap gap-6 mb-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">振幅 (A): {amplitude}</label>
            <input 
              type="range" min="0.1" max="5" step="0.1" 
              value={amplitude} onChange={(e) => setAmplitude(parseFloat(e.target.value))}
              className="w-48 accent-rose-600"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">频率 (f): {frequency}</label>
            <input 
              type="range" min="0.5" max="5" step="0.1" 
              value={frequency} onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="w-48 accent-rose-600"
            />
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" unit="°"/>
              <YAxis domain={[-5, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="y" stroke="#e11d48" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-slate-500 mt-4">
          在深度学习中，理解非线性变换至关重要。调整参数观察 <code className="bg-slate-100 px-1 rounded">y = {amplitude} * sin({frequency}x)</code> 的变化。
        </p>
      </div>
    );
  }

  return null;
};
