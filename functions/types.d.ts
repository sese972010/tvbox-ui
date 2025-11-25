
export interface KVNamespace {
  get(key: string, options?: any): Promise<string | null>;
  put(key: string, value: string | ReadableStream | ArrayBuffer | FormData, options?: any): Promise<void>;
}

export interface EventContext<Env, P extends string, Data> {
  request: Request;
  functionPath: string;
  waitUntil: (promise: Promise<any>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  env: Env;
  params: Record<P, string | string[]>;
  data: Data;
}

export interface Env {
  TVBOX_KV: KVNamespace;
  AUTH_SECRET: string;
}

export interface TVSource {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  type: string;
  updatedAt: number;
}

export interface AppConfig {
  sources: TVSource[];
  globalSettings: {
    wallpaper: string;
    spider: string;
  };
}

export type PagesFunction<T = any> = (context: EventContext<T, any, any>) => Promise<Response>;
