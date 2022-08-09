const proxy = require('http-proxy-middleware')

module.exports = function(app){
	app.use(
		proxy('/api1',{ //遇见/api1前缀的请求，就会触发该代理配置
			target:'http://localhost:5000', //请求转发给谁
			changeOrigin:true,//控制服务器收到的请求头中Host的值,服务器那边那看的请求是来自5000
			pathRewrite:{'^/api1':''} //重写请求路径(必须)、请求到服务器的时候，把路径的api1替换为空字符串
		}),
		proxy('/api2',{
			target:'http://localhost:5001',
			changeOrigin:true,
			pathRewrite:{'^/api2':''}
		}),
	)
}