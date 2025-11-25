import React, { useState } from 'react';
import { ICONS } from '../constants';

interface AuthGuardProps {
  onAuthenticated: (token: string) => void;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 简单模拟验证延迟
    setTimeout(() => {
        if (password.length > 0) {
            onAuthenticated(password);
        } else {
            setError('请输入有效的访问密钥');
            setLoading(false);
        }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-surface p-8 rounded-2xl shadow-2xl border border-white/5">
        <div className="flex justify-center mb-6 text-primary">
            <ICONS.Lock className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-2">管理后台</h2>
        <p className="text-gray-400 text-center mb-8">请输入部署时设置的密钥以管理订阅。</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              访问密钥 (Security Key)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="请输入密码..."
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95 disabled:opacity-50 flex justify-center items-center"
          >
            {loading ? (
                <ICONS.Refresh className="animate-spin mr-2" />
            ) : (
                "进入管理"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};