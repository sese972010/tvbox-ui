import React from 'react';

// In a real deployment, this might be your workers dev URL if hosting frontend separately.
// For this demo, we assume the frontend talks to the worker on the same domain or a configured URL.
export const API_BASE_URL = '/api'; 

const createIcon = (props: React.SVGProps<SVGSVGElement>, ...children: React.ReactNode[]) => 
  React.createElement('svg', { 
    xmlns: "http://www.w3.org/2000/svg", 
    width: "24", 
    height: "24", 
    viewBox: "0 0 24 24", 
    fill: "none", 
    stroke: "currentColor", 
    strokeWidth: "2", 
    strokeLinecap: "round", 
    strokeLinejoin: "round", 
    ...props 
  }, ...children);

export const ICONS = {
  Plus: (props: React.SVGProps<SVGSVGElement>) => createIcon(props, 
    React.createElement('path', { d: "M5 12h14" }),
    React.createElement('path', { d: "M12 5v14" })
  ),
  Trash: (props: React.SVGProps<SVGSVGElement>) => createIcon(props,
    React.createElement('path', { d: "M3 6h18" }),
    React.createElement('path', { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
    React.createElement('path', { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" }),
    React.createElement('line', { x1: "10", x2: "10", y1: "11", y2: "17" }),
    React.createElement('line', { x1: "14", x2: "14", y1: "11", y2: "17" })
  ),
  Edit: (props: React.SVGProps<SVGSVGElement>) => createIcon(props,
    React.createElement('path', { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" })
  ),
  Save: (props: React.SVGProps<SVGSVGElement>) => createIcon(props,
    React.createElement('path', { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }),
    React.createElement('polyline', { points: "17 21 17 13 7 13 7 21" }),
    React.createElement('polyline', { points: "7 3 7 8 15 8" })
  ),
  Link: (props: React.SVGProps<SVGSVGElement>) => createIcon(props,
    React.createElement('path', { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }),
    React.createElement('path', { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })
  ),
  Copy: (props: React.SVGProps<SVGSVGElement>) => createIcon(props,
    React.createElement('rect', { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
    React.createElement('path', { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
  ),
  Check: (props: React.SVGProps<SVGSVGElement>) => createIcon(props,
    React.createElement('polyline', { points: "20 6 9 17 4 12" })
  ),
  Refresh: (props: React.SVGProps<SVGSVGElement>) => createIcon(props,
    React.createElement('path', { d: "M23 4v6h-6" }),
    React.createElement('path', { d: "M1 20v-6h6" }),
    React.createElement('path', { d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" })
  ),
  Lock: (props: React.SVGProps<SVGSVGElement>) => createIcon(props,
    React.createElement('rect', { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
    React.createElement('path', { d: "M7 11V7a5 5 0 0 1 10 0v4" })
  ),
  Tv: (props: React.SVGProps<SVGSVGElement>) => createIcon(props,
     React.createElement('rect', { width: "20", height: "15", x: "2", y: "7", rx: "2", ry: "2" }),
     React.createElement('polyline', { points: "17 2 12 7 7 2" })
  )
};