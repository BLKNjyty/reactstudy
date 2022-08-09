import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'
import Home from './pages/Home' //Home是路由组件
import About from './pages/About' //About是路由组件
import Header from './components/Header' //Header是一般组件
import MyNavLink from './components/MyNavLink'

export default class App extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-8">
						<Header/>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2 col-xs-offset-2">
						<div className="list-group">

							{/* 原生html中，靠<a>跳转不同的页面 */}
							{/* <a className="list-group-item" href="./about.html">About</a>
							<a className="list-group-item active" href="./home.html">Home</a> */}

							{/* 在React中靠路由链接实现切换组件--编写路由链接 */}
							<MyNavLink to="/atguigu/about">About</MyNavLink>
							<MyNavLink to="/atguigu/home">Home</MyNavLink>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
								{/* 注册路由
								路由多级时这时刷新，样式会丢失！
								原因：
								index.html的样式引入改为<link rel="stylesheet" href="./css/bootstrap.css">，点表示当前目录
								解决办法：
								1.将index.html的样式引入改为<link rel="stylesheet" href="/css/bootstrap.css">
								2.将index.html的样式引入改为<link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css">
								3.使用HashRouter代替BrowserRouter，因为将url的#后的值视为无效
								当请求的东西不存在，则把public下的index.html返回 (这是脚手架设置的)*/}
								<Switch>
									<Route path="/atguigu/about" component={About}/>
									<Route path="/atguigu/home" component={Home}/>
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
