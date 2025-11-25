import React, { useState, useEffect, useCallback } from 'react';
import { AuthGuard } from './components/AuthGuard';
import { SourceList } from './components/SourceList';
import { SourceForm } from './components/SourceForm';
import { AppConfig, TVSource } from './types';
import { ICONS, API_BASE_URL } from './constants';

const DEFAULT_CONFIG: AppConfig = {
  sources: [],
  globalSettings: {
    wallpaper: 'https://picsum.photos/1920/1080',
    spider: ''
  }
};

function App() {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('tvbox_auth'));
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<TVSource | null>(null);
  const [subscribeUrl, setSubscribeUrl] = useState('');
  const [notification, setNotification] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  useEffect(() => {
    const origin = window.location.origin;
    setSubscribeUrl(`${origin}/subscribe`);
  }, []);

  const showNotification = (msg: string, type: 'success' | 'error') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchConfig = useCallback(async (token: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/config`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.status === 401) {
        setAuthToken(null);
        localStorage.removeItem('tvbox_auth');
        showNotification('访问密钥已失效或错误', 'error');
        return;
      }
      
      // Handle KV not bound error from backend
      if (res.status === 500) {
        const errData = await res.json().catch(() => ({}));
        if (errData.error && errData.error.includes("KV not bound")) {
             showNotification('系统错误：KV 数据库未绑定 (请去 Cloudflare 设置)', 'error');
             return;
        }
      }

      if (!res.ok) throw new Error('Failed to fetch');
      
      const data = await res.json();
      setConfig(data);
    } catch (err) {
      console.error(err);
      showNotification('无法加载配置，请检查网络或后端状态', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      fetchConfig(authToken);
    }
  }, [authToken, fetchConfig]);

  const handleAuthenticated = (token: string) => {
    setAuthToken(token);
    localStorage.setItem('tvbox_auth', token);
  };

  const handleSaveSource = async (sourceData: Omit<TVSource, 'id' | 'updatedAt'>) => {
    if (!authToken) return;

    const newSource: TVSource = {
      ...sourceData,
      id: editingSource ? editingSource.id : crypto.randomUUID(),
      updatedAt: Date.now()
    };

    let newSources = [...config.sources];
    if (editingSource) {
      newSources = newSources.map(s => s.id === editingSource.id ? newSource : s);
    } else {
      newSources.push(newSource);
    }

    const newConfig = { ...config, sources: newSources };
    await saveConfig(newConfig);
    
    setIsFormOpen(false);
    setEditingSource(null);
  };

  const handleDeleteSource = async (id: string) => {
    if (!window.confirm("确定要删除这个订阅源吗？")) return;
    const newSources = config.sources.filter(s => s.id !== id);
    await saveConfig({ ...config, sources: newSources });
  };

  const handleToggleSource = async (id: string) => {
    const newSources = config.sources.map(s => 
        s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    await saveConfig({ ...config, sources: newSources });
  };

  const saveConfig = async (newConfig: AppConfig) => {
    setConfig(newConfig); // Optimistic update
    try {
        const res = await fetch(`${API_BASE_URL}/config`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newConfig)
        });
        if (!res.ok) throw new Error('Save failed');
        showNotification('配置已保存', 'success');
    } catch (err) {
        showNotification('保存失败，请重试', 'error');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(subscribeUrl);
    showNotification('订阅地址已复制！', 'success');
  };

  if (!authToken) {
    return <AuthGuard onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-background text-gray-100 font-sans pb-20">
      {/* Header */}
      <header className="bg-surface/50 border-b border-white/5 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg text-primary">
                    <ICONS.Tv className="w-6 h-6"/>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">TVBox 订阅管理</h1>
            </div>
            
            <button 
                onClick={() => {
                    setAuthToken(null);
                    localStorage.removeItem('tvbox_auth');
                }}
                className="text-sm text-gray-500 hover:text-white transition-colors"
            >
                退出登录
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Subscription Card */}
        <div className="bg-gradient-to-br from-[#1e1e24] to-[#18181b] rounded-2xl border border-white/5 p-6 mb-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            <h2 className="text-lg font-medium text-gray-300 mb-4 flex items-center gap-2">
                <ICONS.Link className="w-5 h-5 text-primary"/>
                您的专属订阅地址
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
                <code className="flex-1 bg-black/40 border border-white/10 rounded-lg p-4 font-mono text-sm text-gray-300 break-all">
                    {subscribeUrl}
                </code>
                <button 
                    onClick={copyToClipboard}
                    className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                    <ICONS.Copy className="w-5 h-5" />
                    复制地址
                </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 ml-1">
                将此地址配置到您的 TVBox 中，此处更新将自动同步到所有设备。
            </p>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">订阅源列表</h2>
            <button
                onClick={() => {
                    setEditingSource(null);
                    setIsFormOpen(true);
                }}
                className="bg-primary hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-95"
            >
                <ICONS.Plus className="w-5 h-5" />
                添加订阅
            </button>
        </div>

        {/* List */}
        {loading ? (
            <div className="flex justify-center py-20">
                <ICONS.Refresh className="w-8 h-8 text-primary animate-spin" />
            </div>
        ) : (
            <SourceList 
                sources={config.sources}
                onDelete={handleDeleteSource}
                onToggle={handleToggleSource}
                onEdit={(s) => {
                    setEditingSource(s);
                    setIsFormOpen(true);
                }}
            />
        )}
      </main>

      {/* Form Modal */}
      {isFormOpen && (
        <SourceForm 
            initialData={editingSource}
            onSave={handleSaveSource}
            onCancel={() => {
                setIsFormOpen(false);
                setEditingSource(null);
            }}
        />
      )}

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-2xl z-50 animate-fade-in-up flex items-center gap-3 ${
            notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
            {notification.type === 'success' ? <ICONS.Check className="w-5 h-5" /> : <ICONS.Lock className="w-5 h-5" />}
            <span className="font-medium">{notification.msg}</span>
        </div>
      )}
    </div>
  );
}

export default App;