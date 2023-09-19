

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.b10eb483.js","_app/immutable/chunks/scheduler.861db3f8.js","_app/immutable/chunks/index.df226e0f.js","_app/immutable/chunks/singletons.cd2146ca.js","_app/immutable/chunks/index.c723aaf4.js"];
export const stylesheets = [];
export const fonts = [];
