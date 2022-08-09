import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {

	search = ()=>{
		//常规结构赋值
		//const{value}=this.keyWordElement
		//获取用户的输入(连续解构赋值+重命名)：拿出this的keyWordElement，再从中拿出keyWordElement的value(如果value又是对象，可以继续写下去)
		//const {keyWordElement:{value:{data}}} = this
		//如下是连续赋值的时候，再把value重命名
		const {keyWordElement:{value:keyWord}} = this
		//发送请求前通知App更新状态
		this.props.updateAppState({isFirst:false,isLoading:true})
		//发送网络请求、有个5000的代理(代理里面有两个接口，一个值转发到真是github，一个是返回固定数据)
		axios.get(`/api1/search/users?q=${keyWord}`).then(
			response => {
				//请求成功后通知App更新状态
				this.props.updateAppState({isLoading:false,users:response.data.items})
			},
			error => {
				//请求失败后通知App更新状态
				this.props.updateAppState({isLoading:false,err:error.message})
			}
		)
	}

	render() {
		return (
			<section className="jumbotron">
				<h3 className="jumbotron-heading">搜索github用户</h3>
				<div>
					<input ref={c => this.keyWordElement = c} type="text" placeholder="输入关键词点击搜索"/>&nbsp;
					<button onClick={this.search}>搜索</button>
				</div>
			</section>
		)
	}
}
