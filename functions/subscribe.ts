import { Env, AppConfig, PagesFunction } from './types';
import { DEFAULT_CONFIG, CORS_HEADERS } from './utils';

export const onRequest: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  try {
    // 关键修复：防御性检查，防止 KV 未绑定导致的 1101
    if (!env.TVBOX_KV) {
        console.error("TVBOX_KV binding is missing");
        return new Response(JSON.stringify({ 
            error: "KV 数据库未绑定。请在 Cloudflare Pages 设置中绑定名为 TVBOX_KV 的 KV Namespace。",
            hint: "Dashboard -> Settings -> Functions -> KV Namespace Bindings"
        }, null, 2), {
            status: 500,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json;charset=utf-8" }
        });
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
  } catch (err: any) {
    return new Response(JSON.stringify({ error: "Internal Error", message: err.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });
  }
}