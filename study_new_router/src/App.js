import React from 'react'
import { NavLink,useRoutes} from 'react-router-dom'
import routes from './routes'
import Header from './component/header'

export default function App() {

  // 路由表,根据路由表生成路由
  const element=useRoutes(routes)

		return (
			<div>
				<div className="row">
					<Header/>
				</div>
				<div className="row">
					<div className="col-xs-2 col-xs-offset-2">
						<div className="list-group">

							{/* 原生html中，靠<a>跳转不同的页面 */}
							{/* <a className="list-group-item" href="./about.html">About</a>
							<a className="list-group-item active" href="./home.html">Home</a> */}
							
							{/* 在React中靠路由链接实现切换组件--编写路由链接
              初次解析的时候会调用className里的函数，每次点击也会调用 参数对象 包含isActive属性*/}
							{/* <NavLink className={({isActive})=>isActive ? 'list-group-item atguigu' : 'list-group-item' } to="/about">About</NavLink>
							<NavLink className={({isActive})=>isActive ? 'list-group-item atguigu' : 'list-group-item' } to="/home">Home</NavLink> */}
              <NavLink className={computedClassName} to="/about">About</NavLink>
							<NavLink className={computedClassName} end to="/home">Home</NavLink>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
								{/* 注册路由 */}
								{/* <Routes>
                  <Route path="/about" element={<About/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/" element={<Navigate to="about"/>}/>
								</Routes> */}
                {element}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
}
function  computedClassName({isActive}){
  //console.log(isActive)
  return isActive ? 'list-group-item atguigu' : 'list-group-item' 
}
