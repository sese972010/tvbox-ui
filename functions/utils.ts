
import { AppConfig } from './types';

export const DEFAULT_CONFIG: AppConfig = {
  sources: [],
  globalSettings: {
    wallpaper: "https://picsum.photos/1920/1080",
    spider: ""
  }
};

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
