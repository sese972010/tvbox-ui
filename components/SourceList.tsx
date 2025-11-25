import React from 'react';
import { TVSource } from '../types';
import { ICONS } from '../constants';

interface SourceListProps {
  sources: TVSource[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (source: TVSource) => void;
}

export const SourceList: React.FC<SourceListProps> = ({ sources, onDelete, onToggle, onEdit }) => {
  if (sources.length === 0) {
    return (
      <div className="text-center py-16 px-4 border-2 border-dashed border-white/10 rounded-xl bg-surface/50">
        <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-500">
            <ICONS.Tv className="w-8 h-8"/>
        </div>
        <h3 className="text-lg font-medium text-gray-300">暂无订阅源</h3>
        <p className="text-gray-500 mt-2">点击右上角“添加”按钮配置您的第一个接口。</p>
      </div>
    );
  }

  const getTypeLabel = (type: string) => {
      switch(type) {
          case 'mixed': return '混合';
          case 'spider': return '爬虫';
          case 'live': return '直播';
          default: return type;
      }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {sources.map((source) => (
        <div 
            key={source.id} 
            className={`group relative flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border transition-all duration-200 ${
                source.enabled 
                ? 'bg-surface border-white/10 hover:border-primary/50' 
                : 'bg-surface/50 border-white/5 opacity-75'
            }`}
        >
          <div className="flex items-start gap-4 mb-4 sm:mb-0">
            <div className={`mt-1 p-2 rounded-lg ${source.enabled ? 'bg-primary/20 text-primary' : 'bg-gray-800 text-gray-500'}`}>
                <ICONS.Tv className="w-5 h-5" />
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h4 className={`font-semibold text-lg truncate ${source.enabled ? 'text-white' : 'text-gray-400'}`}>
                  {source.name}
                </h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400 uppercase tracking-wider">
                  {getTypeLabel(source.type)}
                </span>
              </div>
              <p className="text-gray-500 text-sm font-mono mt-1 truncate max-w-xs sm:max-w-md">
                {source.url}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
                onClick={() => onToggle(source.id)}
                className={`p-2 rounded-lg transition-colors ${
                    source.enabled 
                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
                title={source.enabled ? "禁用" : "启用"}
            >
                {source.enabled ? <ICONS.Check className="w-5 h-5" /> : <div className="w-5 h-5 flex items-center justify-center"><div className="w-3 h-3 rounded-full border-2 border-current"></div></div>}
            </button>
            
            <button
                onClick={() => onEdit(source)}
                className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="编辑"
            >
                <ICONS.Edit className="w-5 h-5" />
            </button>

            <button
                onClick={() => onDelete(source.id)}
                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                title="删除"
            >
                <ICONS.Trash className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};