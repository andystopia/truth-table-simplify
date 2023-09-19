export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.33732894.js","app":"_app/immutable/entry/app.0ce8cf72.js","imports":["_app/immutable/entry/start.33732894.js","_app/immutable/chunks/scheduler.861db3f8.js","_app/immutable/chunks/singletons.cd2146ca.js","_app/immutable/chunks/index.c723aaf4.js","_app/immutable/entry/app.0ce8cf72.js","_app/immutable/chunks/scheduler.861db3f8.js","_app/immutable/chunks/index.df226e0f.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
