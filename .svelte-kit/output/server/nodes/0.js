import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.2cf06227.js","_app/immutable/chunks/scheduler.861db3f8.js","_app/immutable/chunks/index.df226e0f.js"];
export const stylesheets = ["_app/immutable/assets/0.463e38f9.css"];
export const fonts = [];
