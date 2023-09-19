

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.08738637.js","_app/immutable/chunks/scheduler.861db3f8.js","_app/immutable/chunks/index.df226e0f.js","_app/immutable/chunks/index.c723aaf4.js"];
export const stylesheets = [];
export const fonts = [];
