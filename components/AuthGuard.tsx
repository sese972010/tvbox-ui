import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';

interface AuthGuardProps {
  onAuthenticated: (token: string) => void;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // In a real app, you might want to validate against the worker first
  // For this UI, we just simulate a login flow which stores the token for requests
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate network delay or basic validation check could go here
    // Currently we just pass the password as a Bearer token to be validated by the API later
    setTimeout(() => {
        if (password.length > 0) {
            onAuthenticated(password);
        } else {
            setError('Please enter a valid security key');
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
        <h2 className="text-2xl font-bold text-center text-white mb-2">Access Dashboard</h2>
        <p className="text-gray-400 text-center mb-8">Enter your deployment security key to manage subscriptions.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Security Key
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="••••••••"
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
                "Unlock"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};