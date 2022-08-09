import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'

ReactDOM.render(<App/>,document.getElementById('root'))
// 检测redux中状态的变化，只要变化，就调用render,回调执行时机：只有reducer里面的状态只要一改变就调用
store.subscribe(()=>{
	ReactDOM.render(<App/>,document.getElementById('root'))
})