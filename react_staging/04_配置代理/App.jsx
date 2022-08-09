import React, { Component } from 'react'
import axios from 'axios'
/**
 * 跨域问题归根到底是由于ajax引擎导致。
 * 可以找个中间代理，代理端口为3000，让代理去和服务器联系，代理拿到数据返回给客户端
 */
export default class App extends Component {

	getStudentData = ()=>{
		axios.get('http://localhost:3000/api1/students').then(
			response => {console.log('成功了',response.data);},
			error => {console.log('失败了',error);}
		)
	}

	getCarData = ()=>{
		axios.get('http://localhost:3000/api2/cars').then(
			response => {console.log('成功了',response.data);},
			error => {console.log('失败了',error);}
		)
	}

	render() {
		return (
			<div>
				<button onClick={this.getStudentData}>点我获取学生数据</button>
				<button onClick={this.getCarData}>点我获取汽车数据</button>
			</div>
		)
	}
}
