import React, { useState, useEffect } from 'react';
import { TVSource } from '../types';
import { ICONS } from '../constants';

interface SourceFormProps {
  initialData?: TVSource | null;
  onSave: (source: Omit<TVSource, 'id' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const SourceForm: React.FC<SourceFormProps> = ({ initialData, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<'mixed' | 'spider' | 'live'>('mixed');
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setUrl(initialData.url);
      setType(initialData.type);
      setEnabled(initialData.enabled);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    onSave({ name, url, type, enabled });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#18181b] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">
                {initialData ? '编辑订阅源' : '添加新订阅源'}
            </h3>
            <button onClick={onCancel} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">名称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-600"
              placeholder="例如：饭太硬线路"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">接口地址 (URL)</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ICONS.Link className="h-4 w-4 text-gray-500" />
                </div>
                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-600 font-mono text-sm"
                    placeholder="https://example.com/api.json"
                />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">类型</label>
                <select 
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                >
                    <option value="mixed">混合 (JSON)</option>
                    <option value="spider">爬虫 (Jar)</option>
                    <option value="live">直播 (M3U)</option>
                </select>
             </div>
             
             <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">状态</label>
                <button
                    type="button"
                    onClick={() => setEnabled(!enabled)}
                    className={`w-full h-[42px] px-4 rounded-lg flex items-center justify-center transition-colors border ${enabled ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
                >
                    {enabled ? '已启用' : '已禁用'}
                </button>
             </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg text-gray-300 hover:bg-white/5 transition-colors font-medium"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              {initialData ? '保存修改' : '确认添加'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};