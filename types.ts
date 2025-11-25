export interface TVSource {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  type: 'mixed' | 'spider' | 'live'; // Simplified types
  updatedAt: number;
}

export interface AppConfig {
  sources: TVSource[];
  globalSettings: {
    wallpaper: string;
    spider: string;
  };
}

export interface ApiResponse {
  success: boolean;
  data?: AppConfig;
  message?: string;
  subscriptionUrl?: string;
}

// Env variable type for the worker (reference)
export interface Env {
  TVBOX_KV: any; // KVNamespace
  AUTH_SECRET: string;
}