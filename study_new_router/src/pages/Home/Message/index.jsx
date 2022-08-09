import React, { Component } from 'react'
import { Link, Outlet,useNavigate} from 'react-router-dom'

export default function Message() {
	const [messageArr,setessageArr] = React.useState(
		 [
			{ id: '01', title: '消息1' },
			{ id: '02', title: '消息2' },
			{ id: '03', title: '消息3' },
		 ]
		)
	const navigate=useNavigate()
	function showDetail(msgObj){
		navigate('detail',{
			replace:false,
			// paramhe search参数不能这样写，直接写在路径上
			state:{
				id:msgObj.id,
				title:msgObj.title
			}
		})
	}

	return (
		<div>
			<ul>
				{
					messageArr.map((msgObj) => {
						return (
							<li key={msgObj.id}>
								{/* 向路由组件传递params参数 */}
								{/* <Link to={`detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link> */}
								{/* search参数 */}
								{/* <Link to={`detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link> */}
								{/* state参数的携带 */}
								<Link to="detail" state={{
									id: msgObj.id,
									title: msgObj.title,
								}}>{msgObj.title}</Link>
								<button onClick={()=>showDetail(msgObj)}>展示详情</button>
							</li>
						)
					})
				}
			</ul>
			<hr />
			<Outlet />
		</div>
	)

}
