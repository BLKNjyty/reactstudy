import React from 'react'
import { useParams,useSearchParams,useLocation} from 'react-router-dom'


export default function Detail() {
	const DetailData = [
		{ id: '01', content: '你好，中国' },
		{ id: '02', content: '你好，尚硅谷' },
		{ id: '03', content: '你好，未来的自己' }
	]

	// console.log(this.props);
	//`接收params参数
	// const { id, title } = useParams()
	
	//接收search参数,用于更新接收到的参数setSearch(`id=0001&title=hahha`)
	// const  [search,setSearch]=useSearchParams()
	// const id=search.get('id')
	// const title=search.get('title')

	//state对象
	const {state:{id,title}}=useLocation()
	const findResult = DetailData.find((detailObj) => {
		//查找的条件
		return detailObj.id === id
	})
	return (
		<ul>
			<li>ID:{id}</li>
			<li>TITLE:{title}</li>
			<li>CONTENT:{findResult.content}</li>
		</ul>
	)
}
