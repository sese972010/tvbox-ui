
import { Env, AppConfig, PagesFunction } from './types';
import { DEFAULT_CONFIG, CORS_HEADERS } from './utils';

export const onRequest: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  const dataStr = await env.TVBOX_KV.get("CONFIG");
  const config: AppConfig = dataStr ? JSON.parse(dataStr) : DEFAULT_CONFIG;
  const activeSources = config.sources.filter(s => s.enabled);

  const responseObj = {
    wallpaper: config.globalSettings.wallpaper,
    spider: config.globalSettings.spider,
    urls: activeSources.map(s => ({
        url: s.url,
        name: s.name
    })),
  };

  return new Response(JSON.stringify(responseObj, null, 2), {
    headers: { 
        ...CORS_HEADERS, 
        "Content-Type": "application/json;charset=utf-8" 
    }
  });
}