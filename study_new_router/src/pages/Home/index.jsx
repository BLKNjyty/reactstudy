import React from 'react'
import { Navigate } from 'react-router-dom'
import { NavLink,Outlet } from 'react-router-dom'

export default function Home() {
	const [sum, setSum] = React.useState(1)


	return (
		<div>
			<h3>我是Home的内容</h3>
			{/* <h4>{this.state.sum}</h4> */}
			{sum === 2 ? <Navigate to="/about" replace={false} /> : <h4>当前的sum值是{sum}</h4>}
			<button onClick={() => setSum(sum => sum + 1)}>点击将sum变为2</button>

			<div>
				<ul className="nav nav-tabs">
					<li>
						<NavLink to="news">News</NavLink>
					</li>
					<li>
						<NavLink to="message">Message</NavLink>
					</li>
				</ul>
				{/* 指定路由组件呈现的位置 */}
				<Outlet/>
			</div>
		</div>

	)

}
