
import { Env, AppConfig, PagesFunction } from '../types';
import { DEFAULT_CONFIG, CORS_HEADERS } from '../utils';

// Handle GET request
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  // Auth Check
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${env.AUTH_SECRET}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { 
        status: 401, 
        headers: CORS_HEADERS 
    });
  }

  const data = await env.TVBOX_KV.get("CONFIG");
  return new Response(data || JSON.stringify(DEFAULT_CONFIG), {
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
  });
}

// Handle POST request
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  // Auth Check
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${env.AUTH_SECRET}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { 
        status: 401, 
        headers: CORS_HEADERS 
    });
  }

  try {
    const body = await request.json();
    await env.TVBOX_KV.put("CONFIG", JSON.stringify(body));
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: CORS_HEADERS });
  }
}

// Handle OPTIONS explicitly to be safe
export const onRequestOptions: PagesFunction = async () => {
    return new Response(null, { headers: CORS_HEADERS });
}