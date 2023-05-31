

# 脚手架

> 前言，拿到项目直接npm install 会报错
>
> ![1659670327052](D:\SoftWare\Typora\Content\React脚手架下编码\1659670327052.png)

这是因为之前有缓存，直接

```
npm cache clear --force
```

强制清除缓存在进行install

## 介绍

> 1. xxx脚手架: 用来帮助程序员快速创建一个基于xxx库的模板项目
>
>    - 包含了所有需要的配置（语法检查、jsx编译、devServer…）
>
>    -  下载好了所有相关的依赖
>
>    - 可以直接运行一个简单效果
>
> 2. react提供了一个用于创建react项目的脚手架库: create-react-app
>
> 3. 项目的整体技术架构为:  react + webpack + es6 + eslint
>
> 4. 使用脚手架开发的项目的特点: 模块化, 组件化, 工程化

## 步骤

>**第一步**，全局安装：npm i -g create-react-app
>
>**第二步**，切换到想创项目的目录，使用命令：create-react-app hello-react
>
>**第三步**，进入项目文件夹：cd hello-react
>
>**第四步**，启动项目：npm start

## 项目结构

> public ---- 静态资源文件夹
>
> ​		favicon.icon ------ 网站页签图标
>
> ​		**index.html** **-------**主页面
>
> ​		logo192.png ------- logo图
>
> ​		logo512.png ------- logo图
>
> ​		manifest.json ----- 应用加壳的配置文件
>
> ​		robots.txt -------- 爬虫协议文件
>
> src ---- 源码文件夹
>
> ​		App.css -------- App组件的样式
>
> ​		**App.js**--------App组件
>
> ​		App.test.js ---- 用于给App做测试
>
> ​		index.css ------ 样式
>
> ​		**index.js** ------入口文件
>
> ​		logo.svg ------- logo图
>
> ​		reportWebVitals.js
>
> ​			--- 页面性能分析文件(需要web-vitals库的支持)
>
> ​		setupTests.js
>
> ​			---- 组件单元测试的文件(需要jest-dom库的支持)

# 组件化

> 1. 拆分组件: 拆分界面,抽取组件
>
> 2. 实现静态组件: 使用组件实现静态页面效果
>
> 3. 实现动态组件
>
>    3.1动态显示初始化数据
>
>    ​	3.1.1 数据类型
>
>    ​	3.1.2 数据名称
>
>    ​	3.1.2 保存在哪个组件?
>
>    3.2 交互(从绑定事件监听开始)

## todo列表案例

此案例不涉及css的编写，直接使用教程提供的css样式

### 划分界面、加入静态效果

>  界面分为header，list，item和footer四部分。
>
> 其中head是头部的输入框，item是每一个代办事项，list是item的集合展示，foot是最下面的全选、删除所选等功能。
>
> 

```javascript
export default class App extends Component{
    state={todos:[
        {id:'001',name:'吃饭',done:true},
        {id:'002',name:'睡觉',done:true},
		{id:'003',name:'打代码',done:false},
		{id:'004',name:'逛街',done:false}
    ]
    }
    render(){
        return (
        	<div className="todo-container">
            	<div className="todo-warp">
            		<Header/>
            		<List todos={todos}/>
            		<Footer todos={todos}/>
            	</div>
            </div>
        )
    }
}
```

```javascript
export default class Header extends Component{
    render(){
        return(
        	<div className="todo-header">
            	<input type="text" placeholder="请输入你的任务名称，按回车键确定">
            </div>
        )
    }
}
```

```javascript
export default class List extends Component{
    render(){
        const {todos}=this.props
        return(
        	<ul className="todo-main">
            	{
            		todos.map(todo=>{
            				return <Item key={todo.id} {...todo}>
            			}			
        			)
            	}
            </ul>
        )    
    }
}
```

```javascript
export default Item extends Component{
    render(){
        const {id,name,done}=this.props
        return(
        	<li>
            	<label>
            		<input type="checkbox" checked={done}>
            		<span>name</span>
            	</label>
    			<button className="btn btn-danger">删除</buttton>
            </li>
        )
    }
}
```

```javascript
export default class Footer extends Component{
    render(){
        const {todos}=this.props
        return(
        	<div className="todo-footer">
            	<label>
            		<input type="checkbox"/ checked=true>
            	</label>
            	<span>
            		<span>已完成{xxx}</span>/全部{xxx}
            	</span>
				<button className="btn btn-danger">清楚已完成任务</button>
            </div>
        )
    }
}
```

### 实现动态效果

#### item的选中变色、删除功能、勾选改变状态

```javascript
export default Item extends Component{
    state={mouse:false}
    //添加鼠标移出、移出的item框效果
    handleMouse=(flag)=>{
        return ()=>{
            this.setState({mouse:flag})
        }
    }
    //TODO的内容在父组件APP里面，子孙组件删除父组件的内容，可以使用父组件传递给子组件的函数(APP-list-item)
    handleDelete=(id)=>{
       if(window.confirm('确定删除吗？')){
			this.props.deleteTodo(id)
		}
    }
    //勾选或者取消勾选的时候，done值跟随改变
    handleCheck=(id)=>{
        return (event)=>{
            this.props.updateTodo(id,event.target.checked)
        }
    }
    
    render(){
        const {id,name,done}=this.props
        return(
        	<li style={{background:mouse?'#ddd':'white'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
            	<label>
            		<input type="checkbox" checked={done} onChange={this.handleCheck(id)}>
            		<span>name</span>
            	</label>
    			<button onClick={()=>this.handleDelete(id)} className="btn btn-danger" display:mouse?'block':'none'>删除</buttton>
            </li>
        )
    }
}
```

```javascript
export default class App extends Component{
    state={todos:[
        {id:'001',name:'吃饭',done:true},
        {id:'002',name:'睡觉',done:true},
		{id:'003',name:'打代码',done:false},
		{id:'004',name:'逛街',done:false}
    	]
    }
	//删除具体某个item
	deleteTodo=(id)=>{
        const {todos}=this.state
        const newTodos = todos.filter((todo)=>{
         	return todo.id!==id   
        	}
        )
        this.setState({todos:newTodos})
    }
    //更新一个item的状态
    updateTodo=(id,done)=>{
        const {todos}=this.state
        const newTodos=todos.map((todoObj)=>{
            	if(todoObj.id===id)return {...todoObj,done}
            	else return todoObj
        	}
        )
        this.setState({todos:newTodos})
    }
    
    render(){
        return (
        	<div className="todo-container">
            	<div className="todo-warp">
            		<Header/>
            		<List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo}/>
            		<Footer todos={todos}/>
            	</div>
            </div>
        )
    }
}
```

```javascript
export default class List extends Component{
    render(){
        const {todos,deleteTodo,updateTodo}=this.props
        return(
        	<ul className="todo-main">
            	{
            		todos.map(todo=>{
            				return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo} >
            			}			
        			)
            	}
            </ul>
        )    
    }
}
```

#### header中添加任务功能

```javascript
export default class Header extends Component{
    handleKeyUp=(event)=>{
        const {keyCode,target}=event
        if(keyCode!=13)return
        if(target.value.trim(0=)==''){
        	alert("输入不能为空")
            return
        }
    	const todoObj={id:nanoid(),name:target,done:false}
        //同上，子组件想传递信息给父组件，调用父组件传递给子组件的函数即可
        this.props.addTodo(todoObj)
		target.value=''
    }
    render(){
        return(
        	<div className="todo-header">
            	<input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确定">
            </div>
        )
    }
}
```

```javascript
export default class App extends Component{
    state={todos:[
        {id:'001',name:'吃饭',done:true},
        {id:'002',name:'睡觉',done:true},
		{id:'003',name:'打代码',done:false},
		{id:'004',name:'逛街',done:false}
    	]
    }
	//删除具体某个item
	deleteTodo=(id)=>{
        const {todos}=this.state
        const newTodos = todos.filter((todo)=>{
         	return todo.id!==id   
        	}
        )
        this.setState({todos:newTodos})
    }
    //添加一个item
    addTodo=(todoObj)=>{
    	const {todos}=this.state
        const newTodos=[todoObj,...todos]
        this.setState({todos:newTodos})
    }
    	//updateTodo用于更新一个todo对象
	updateTodo = (id,done)=>{
		//获取状态中的todos
		const {todos} = this.state
		//匹配处理数据--id一样则复制一个并替换其中的done属性，如果id不一样则直接返回
		const newTodos = todos.map((todoObj)=>{
			if(todoObj.id === id) return {...todoObj,done}
			else return todoObj
		})
		this.setState({todos:newTodos})
	}
    
    render(){
        return (
        	<div className="todo-container">
            	<div className="todo-warp">
            		<Header addTodo={this.addTodo}/>
            		<List todos={todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo}/>
            		<Footer todos={todos}/>
            	</div>
            </div>
        )
    }
}
```

#### Footer的显示，全选功能

```javascript
export default class Footer extends Component{
    //将父组件的item的done全部变为true或者false
    handleCheckAll=(event)=>{
        this.props.checkAllTodo(event.target.checked)
    }
    //清除已完成的任务
    handleClearAllDone=()=>{
        this.props.clearAllDone()
    }
    
    render(){
        const {todos}=this.props
        const doneCount=todos.reduce((pre,todo)=>pre+(todo.done?1:0),0)
        const total=todos.length
        return(
        	<div className="todo-footer">
            	<label>
            		<input type="checkbox"/ onChange={this.handleCheckALL} checked=true>
            	</label>
            	<span>
            		<span>已完成{doneCount}</span>/全部{total}
            	</span>
				<button onClick={this.handleClearAllDone} className="btn btn-danger" >清楚已完成任务</button>
            </div>
        )
    }
}
```

```javascript
export default class App extends Component{
    state={todos:[
        {id:'001',name:'吃饭',done:true},
        {id:'002',name:'睡觉',done:true},
		{id:'003',name:'打代码',done:false},
		{id:'004',name:'逛街',done:false}
    	]
    }
	//删除具体某个item
	deleteTodo=(id)=>{
        const {todos}=this.state
        const newTodos = todos.filter((todo)=>{
         	return todo.id!==id   
        	}
        )
        this.setState({todos:newTodos})
    }
    //添加一个item
    addTodo=(todoObj)=>{
    	const {todos}=this.state
        const newTodos=[todoObj,...todos]
        this.setState({todos:newTodos})
    }
    	//updateTodo用于更新一个todo对象
	updateTodo = (id,done)=>{
		//获取状态中的todos
		const {todos} = this.state
		//匹配处理数据--id一样则复制一个并替换其中的done属性，如果id不一样则直接返回
		const newTodos = todos.map((todoObj)=>{
			if(todoObj.id === id) return {...todoObj,done}
			else return todoObj
		})
		this.setState({todos:newTodos})
	}
    //全选、全不选
    checkAllTodo=(done)=>{
        const {todos}=this.state
        const newTodos=todos.map((todoObj)=>{
            return {...obj,done}
        }
        )
        this.setState({todos:newTodos})
    }
    //清除所有已完成的任务
    clearAllDone=()=>{
        const {todos}=this.state
        const newTodos=todos.filter((todoObj)=>{
            return !todoObj.done
        }
        )
        this.setState({todos:newTodos})
    }
    
    render(){
        return (
        	<div className="todo-container">
            	<div className="todo-warp">
            		<Header addTodo={this.addTodo}/>
            		<List todos={todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo}/>
            		<Footer todos={todos} checkAllTodo={this.checkAllTodo} clearAllDone={this.clearAllDone}/>
            	</div>
            </div>
        )
    }
}
```

# react ajax

> 1. React本身只关注于界面, 并不包含发送ajax请求的代码
>
> 2. 前端应用需要通过ajax请求与后台进行交互(json数据)
>
> 3. react应用中需要集成第三方ajax库(或自己封装)

## 使用axios

> 1. jQuery: 比较重, 如果需要另外引入不建议使用
>
> 2. axios: 轻量级, 建议使用
>
>    1) 封装XmlHttpRequest对象的ajax
>
>    2) promise风格
>
>    3) 可以用在浏览器端和node服务器端

### get

```javascript
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### post

```javascript
axios.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
})
.then(function (response) {
console.log(response);
})
.catch(function (error) {
console.log(error);
});
```

## github搜索实践

> 伪造服务器，资料：05-所需服务器。作为我们发送给github的代理。
>
> 案例样例：搜索用户名，返回githubd的样例
>
> **数据传递**：父子=》props，兄弟=》使用props，消息由子传递给父再传递给子

### 代理设置(setupProxy.js)

```javascript
const proxy = require('http-proxy-middleware')

module.exports = function(app){
	app.use(
		proxy('/api1',{ //遇见/api1前缀的请求，就会触发该代理配置
			target:'http://localhost:5000', //请求转发给谁
			changeOrigin:true,//控制服务器收到的请求头中Host的值
			pathRewrite:{'^/api1':''} //重写请求路径(必须)
		})
	)
}
```

### 整体规划

```javascript
export default class App extends Component{
	state={
		users:[],
		isFirst:true,
		isLoading:false,
		err:'',
	}
	updateAppState=(stateObj)=>{
		this.setState(stateObj)
	}
	render(){
		return (
			<div className="container">
				<Search updateAppState={this.updateAppState}/>
                <List {...this.state}/>
			</div>
		)
	}
}
```

```javascript
export default class Search extends Componet{

	search=()=>{
		const {keyWordElement:{value:keyword}}=this
		this.props.updateAppState({isFirst:fasle,isLoading:true})
		axios.get(`/api1/search/users`q=${keyWord}).then(
			response=>{
				this.props.updateAppState({isLoading:false,users:response.data.items})
			},
			error=>{
				this.props.updateAppState({isLoading:false,err:error.message})
			}
		)
	}
	render(){
		return (
			<section>
				<h3 className="jumbotron-heading">搜索github用户</h3>
				<div>
					<input ref={c=>this.keyWordElement=c} type="text" placeholder="输入关键字" >&nbsp;
					<button onClick={this.search}>搜索</button>
				</div>
			</section>
		)
	}
	
}
```

```javascript
export default class List extends Component {
    render(){
        const {users,isFirst,isLoading,err} = this.props
        return (
        	<div className="row">
            	{
            		isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2> :
					isLoading ? <h2>Loading......</h2> :
					err ? <h2 style={{color:'red'}}>{err}</h2> :
					users.map((userObj)=>{
                        return (
                        	<div key={userObj.id} className="card">
								<a rel="noreferrer" href={userObj.html_url} target="_blank">
									<img alt="head_portrait" src={userObj.avatar_url} style={{width:'100px'}}/>
								</a>
								<p className="card-text">{userObj.login}</p>
							</div>
                        )
                    })
            	}
            </div>
        )
    }
}
```



## 订阅发布

>任意组件之间的消息通信。
>
>之前消息通讯只能是：父子组件通过props属性

1. 工具库: PubSubJS

2. 下载: npm install pubsub-js --save

3. 使用: 

   ```
   1) import PubSub from 'pubsub-js' //引入
   
   2) PubSub.subscribe('delete', function(data){ }); //订阅
   
   3) PubSub.publish('delete', data) //发布消息
   ```

### github案例重做

> 由于由订阅发布功能，那么list组件的数据状态自己保存即可，不需要交给app了

```javascript
export default class App extends Component {
	render() {
		return (
			<div className="container">
				<Search/>
				<List/>
			</div>
		)
	}
}
```

```javascript
export default class List extends Component {
    state = { //初始化状态
		users:[], //users初始值为数组
		isFirst:true, //是否为第一次打开页面
		isLoading:false,//标识是否处于加载中
		err:'',//存储请求相关的错误信息
	} 
	//只要有人发布主题atguigu，执行后边的函数:第一个参数是订阅主题，第二个参数是收到的消息
	componentDidMount(){
		this.token = PubSub.subscribe('atguigu',(_,stateObj)=>{
			this.setState(stateObj)
		})
	}

	componentWillUnmount(){
		PubSub.unsubscribe(this.token)
	}
	render(){
        const{users,isFirst,isLoading,err}=this.state
        return (
        	<div className="row">
            	{
					isFirst ? <h2>欢迎使用，输入关键字，随后点击搜索</h2> :
					isLoading ? <h2>Loading......</h2> :
					err ? <h2 style={{color:'red'}}>{err}</h2> :
					users.map((userObj)=>{
						return (
							<div key={userObj.id} className="card">
								<a rel="noreferrer" href={userObj.html_url} target="_blank">
									<img alt="head_portrait" src={userObj.avatar_url} style={{width:'100px'}}/>
								</a>
								<p className="card-text">{userObj.login}</p>
							</div>
						)
					})
				}
            </div>
        )
    }
}
```

```javascript
export default class Search extends Component {
    search=()=>{
        const {keyWordElement:{value:keyword}}=this
        PubSub.publish('heiheihei',{isFirst:false,isLoading:true})
        axios.get(`/api1/search/users?q=${keyWord}`).then(
        	response=>{
                //请求成功后通知List更新状态
				PubSub.publish('atguigu',{isLoading:false,users:response.data.items})
            },
            error=>{
                //请求失败后通知App更新状态
				PubSub.publish('atguigu',{isLoading:false,err:error.message})
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
```



## Fetch

> 1. fetch: 原生函数，不再使用XmlHttpRequest对象提交ajax请求
>2. 老版本浏览器可能不支持
> 3. 是Promise风格的

### github搜索案例

```javascript
search = async()=>{
		//发送网络请求---使用fetch发送（优化）
		try {
			const response= await fetch(`/api1/search/users2?q=${keyWord}`)
			const data = await response.json()
			console.log(data);
			PubSub.publish('atguigu',{isLoading:false,users:data.items})
		} catch (error) {
			console.log('请求出错',error);
			PubSub.publish('atguigu',{isLoading:false,err:error.message})
		}
	}
```

# React路由

> ```
> npm install --save react-router-dom
> ```

## SPA

> 1. 单页Web应用（single page web application，SPA）。
>
> 2. 整个应用只有**一个完整的页面**。
>
> 3. 点击页面中的链接**不会刷新**页面，只会做页面的**局部更新。**
>
>    数据都需要通过ajax请求获取, 并在前端异步展现。

## 路由

> 理解：
>
>    1.一个路由就是一个映射关系(key:value)
>
> 2. key为路径, value可能是function或component

### 分类

1. 后端路由：

   1) 理解： value是function, 用来处理客户端提交的请求。

   2) 注册路由： router.get(path, function(req, res))

   3) 工作过程：当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据

2. 前端路由：

   1) 浏览器端路由，value是component，用于展示页面内容。

   2) 注册路由: <Route path="/test" component={Test}>

   3) 工作过程：当浏览器的path变为/test时, 被前端路由器检测到了路径变化，当前路由组件就会变为Test组件

### 前端路由的原理

> 依赖于浏览器浏览历史工作，
>
> 见：其他 -前端路由的基石 ,由此可见，有两种方法控制浏览器

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>前端路由的基石_history</title>
</head>
<body>
	<!-- 有onclick事件，不会跳转，只会调用函数 -->
	<a href="http://www.atguigu.com" onclick="return push('/test1') ">push test1</a><br><br>
	<button onClick="push('/test2')">push test2</button><br><br>
	<button onClick="replace('/test3')">replace test3</button><br><br>
	<button onClick="back()">&lt;= 回退</button>
	<button onClick="forword()">前进 =&gt;</button>

	<script type="text/javascript" src="https://cdn.bootcss.com/history/4.7.2/history.js"></script>
	<script type="text/javascript">
		// let history = History.createBrowserHistory() //方法一，直接使用H5推出的history身上的API
		let history = History.createHashHistory() //方法二，hash值（锚点）
		
		//向浏览器的历史记录中放一些记录
		function push (path) {
			history.push(path)
			return false
		}
		//replace是替换栈顶的那条历史记录
		function replace (path) {
			history.replace(path)
		}

		function back() {
			history.goBack()
		}

		function forword() {
			history.goForward()
		}
		//监听url路径的变化
		history.listen((location) => {
			console.log('请求路由路径变化了', location)
		})
	</script>
</body>
</html>
```

## react-router-dom

1. react的一个插件库。

2. 专门用来实现一个SPA应用。

3. 基于react的项目基本都会用到此库。

## 基本用法

## 路由组件和基本组件

> ​	1.写法
>
> ```javascript
> //一般
> <Demo/>
> //路由组件
> <Routes>
> 		<Route path="/about" element={<About/>}/>
> 		<Route path="/home" element={<Home/>}/>
> </Routes>
> ```
>
> ​	2.放的位置应该不一样
>
> ​	3.接受的props不同，一般组件一般是传递了什么就接收什么。
>
> ​					路由组件接受三个固定属性:history，location,match
>
> ```
> history:
> 	go:
> 	goBack:
> 	goForward:
> 	push:
> 	replace:
> location:
> 	pathname:获取当前的路由路径
> 	search:
> 	state:
> match:
> 	params:
> 	path:获取当前的路由路径
> 	url:获取当前的路由路径
> ```

## 简单案例

```javascript
export default class App extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-8">
						<div className="page-header"><h2>React Router Demo</h2></div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2 col-xs-offset-2">
						<div className="list-group">

							{/* 原生html中，靠<a>跳转不同的页面 */}
							{/* <a className="list-group-item" href="./about.html">About</a>
							<a className="list-group-item active" href="./home.html">Home</a> */}
							
							{/* 在React中靠路由链接实现切换组件--编写路由链接 */}
							<Link className="list-group-item" to="/about">About</Link>
							<Link className="list-group-item" to="/home">Home</Link>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
								{/* 注册路由 */}
								<Route path="/about" component={About}/>
								<Route path="/home" component={Home}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
```

> Home About

```javascript
export default class Home extends Component {
	render() {
		return (
			<h3>我是Home的内容</h3>
		)
	}
}
```

```javascript
export default class About extends Component {
	render() {
		console.log('About组件收到的props是',this.props);
		return (
			<h3>我是About的内容</h3>
		)
	}
}

```

## NavLink

>  在React中靠路由链接实现切换组件--编写路由链接
>
> ​      <MyNavLink replace to="/about">About</MyNavLink>
>
> ​      <MyNavLink replace to="/home">Home</MyNavLink>

```javascript
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
							<NavLink activeClassName="atguigu" className="list-group-item" to="/about">About</NavLink>
							<NavLink activeClassName="atguigu" className="list-group-item" to="/home">Home</NavLink>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
								{/* 注册路由 */}
								
								<Route path="/about" component={About}/>
								<Route path="/home" component={Home}/>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
```

```javascript
export default class Header extends Component {
	render() {
		// console.log('Header组件收到的props是',this.props);
		return (
			<div className="page-header"><h2>React Router Demo</h2></div>
		)
	}
}
```

## 封装自己的NavLink

```javascript
export default class MyNavLink extends Component {
	render() {
		// console.log(this.props);
		return (
			<NavLink activeClassName="atguigu" className="list-group-item" {...this.props}/>
		)
	}
}
```

```javascript
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

							{/* 在React中靠路由链接实现切换组件--编写路由链接 
								标签体的值是key为children的标签属性的值传递过去了，MyNavLink组件的{...this.props}直接接受了这个参数：
									children:About
							*/}
							<MyNavLink to="/about">About</MyNavLink>
							<MyNavLink to="/home">Home</MyNavLink>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
								{/* 注册路由 */}
								<Route path="/about" component={About}/>
								<Route path="/home" component={Home}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
```

## Switch

```javascript
{/* 注册路由，/home下有两个路由组件，加入switch之后，匹配到第一个就不会再匹配了 */}
								<Switch>
									<Route path="/about" component={About}/>
									<Route path="/home" component={Home}/>
									<Route path="/home" component={Test}/>
								</Swtch>
```

## 样式丢失

> 原因：
>
> ​                路由多级时这时刷新，样式会丢失！
>
> ​                原因：
>
> ​                index.html的样式引入改为<link rel="stylesheet" href="./css/bootstrap.css">，点表示当前目录
>
> ​                解决办法：
>
> ​                1.将index.html的样式引入改为<link rel="stylesheet" href="/css/bootstrap.css">
>
> ​                2.将index.html的样式引入改为<link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css">
>
> ​                3.使用HashRouter代替BrowserRouter，因为将url的#后的值视为无效
>
> ​                当请求的东西不存在，则把public下的index.html返回 (这是脚手架设置的)

```javascript
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
```

## exact

```javascript
{/* 注册路由 exact开启了严格匹配 */}
<Switch>
	<Route exact path="/about" component={About}/>
	<Route exact path="/home" component={Home}/>
</Switch>
```

## Rediect

```javascript
{/* 注册路由 Redirect 谁都匹配不上  跳转的路由*/}
<Switch>
	<Route path="/about" component={About}/>
	<Route path="/home" component={Home}/>
	<Redirect to="/about"/>
</Switch>
```

## 二级路由

> home路由下面增加Message和News路由

```javascript
export default class Home extends Component {
	render() {
		return (
				<div>
					<h3>我是Home的内容</h3>
					<div>
						<ul className="nav nav-tabs">
							{/* 在父路由的下面接着写路由
							/home/news 模糊匹配，和Home路由也匹配，所以父组件也会展示
							/home/news 模糊匹配，又和news路由匹配
							所以不能开启严格匹配
							*/}
							<li>
								<MyNavLink to="/home/news">News</MyNavLink>
							</li>
							<li>
								<MyNavLink to="/home/message">Message</MyNavLink>
							</li>
						</ul>
						{/* 注册路由 */}
						<Switch>
							<Route path="/home/news" component={News}/>
							<Route path="/home/message" component={Message}/>
							<Redirect to="/home/news"/>
						</Switch>
					</div>
				</div>
			)
	}
}
```

## 路由组件传递参数

> 点击Message页面的详细信息链接在下面显示detail，并且把参数传递过去

### params参数

```javascript
export default class Message extends Component {
	state = {
		messageArr:[
			{id:'01',title:'消息1'},
			{id:'02',title:'消息2'},
			{id:'03',title:'消息3'},
		]
	}
	render() {
		const {messageArr} = this.state
		return (
			<div>
				<ul>
					{
						messageArr.map((msgObj)=>{
							return (
								<li key={msgObj.id}>
									{/* 向路由组件传递params参数 */}
									<Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
								</li>
							)
						})
					}
				</ul>
				<hr/>
				{/* 声明接收params参数 */}
				<Route path="/home/message/detail/:id/:title" component={Detail}/>
			</div>
		)
	}
}
```

```javascript
const DetailData = [
	{id:'01',content:'你好，中国'},
	{id:'02',content:'你好，尚硅谷'},
	{id:'03',content:'你好，未来的自己'}
]
export default class Detail extends Component {
	render() {
		console.log(this.props);
		// 接收params参数
		const {id,title} = this.props.match.params
		const findResult = DetailData.find((detailObj)=>{
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
}
```

### search参数(query参数)

```javascript
export default class Message extends Component {
	state = {
		messageArr:[
			{id:'01',title:'消息1'},
			{id:'02',title:'消息2'},
			{id:'03',title:'消息3'},
		]
	}
	render() {
		const {messageArr} = this.state
		return (
			<div>
				<ul>
					{
						messageArr.map((msgObj)=>{
							return (
								<li key={msgObj.id}>


									{/* 向路由组件传递search参数 */}
									<Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link>

								</li>
							)
						})
					}
				</ul>
				<hr/>
				{/* 声明接收params参数 */}
				{/* <Route path="/home/message/detail/:id/:title" component={Detail}/> */}

				{/* search参数无需声明接收，正常注册路由即可 */}
				<Route path="/home/message/detail" component={Detail}/>

			</div>
		)
	}
}
```

```javascript
// qs有两个有用的功能:
//针对urlencoding编码：key=value&key1=value1==>qs
//将json对象格式转化为此编码格式：qs.stringfy(urlencoding);反过来qs.paese(json)
const DetailData = [
	{id:'01',content:'你好，中国'},
	{id:'02',content:'你好，尚硅谷'},
	{id:'03',content:'你好，未来的自己'}
]
export default class Detail extends Component {
	render() {
		console.log(this.props);
		// 接收search参数
		const {search} = this.props.location
		const {id,title} = qs.parse(search.slice(1))

		const findResult = DetailData.find((detailObj)=>{
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
}
```

### state参数

```javascript
export default class Message extends Component {
	state = {
		messageArr:[
			{id:'01',title:'消息1'},
			{id:'02',title:'消息2'},
			{id:'03',title:'消息3'},
		]
	}
	render() {
		const {messageArr} = this.state
		return (
			<div>
				<ul>
					{
						messageArr.map((msgObj)=>{
							return (
								<li key={msgObj.id}>

									{/* 向路由组件传递state参数 */}
									<Link to={{pathname:'/home/message/detail',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>

								</li>
							)
						})
					}
				</ul>
				<hr/>

				{/* state参数无需声明接收，正常注册路由即可 */}
				<Route path="/home/message/detail" component={Detail}/>

			</div>
		)
	}
}
```

```javascript
const DetailData = [
	{id:'01',content:'你好，中国'},
	{id:'02',content:'你好，尚硅谷'},
	{id:'03',content:'你好，未来的自己'}
]
export default class Detail extends Component {
	render() {
		console.log(this.props);
		// 接收state参数,刷新页面  上述三种参数传递方式 参数都不会丢失
		//为防止查出来是undefined(比如清除了缓存或者就没传递数据)，则使用{}空对象，防止浏览器报错
		//HashRouter路由会导致参数的丢失
		const {id,title} = this.props.location.state || {}

		const findResult = DetailData.find((detailObj)=>{
			return detailObj.id === id
		}) || {}
		return (
			<ul>
				<li>ID:{id}</li>
				<li>TITLE:{title}</li>
				<li>CONTENT:{findResult.content}</li>
			</ul>
		)
	}
}
```

## 编程时路由导航

> 即不靠路由标签Link或者MyNavLink 标签       
>
> 自己写函数完成路由的跳转

```javascript
export default class Message extends Component {
	state = {
		messageArr:[
			{id:'01',title:'消息1'},
			{id:'02',title:'消息2'},
			{id:'03',title:'消息3'},
		]
	}

	replaceShow = (id,title)=>{
		//replace跳转+携带params参数
		//this.props.history.replace(`/home/message/detail/${id}/${title}`)

		//replace跳转+携带search参数
		// this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

		//replace跳转+携带state参数
		this.props.history.replace(`/home/message/detail`,{id,title})
	}

	pushShow = (id,title)=>{
		//push跳转+携带params参数
		// this.props.history.push(`/home/message/detail/${id}/${title}`)

		//push跳转+携带search参数
		// this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)

		//push跳转+携带state参数
		this.props.history.push(`/home/message/detail`,{id,title})
		
	}

	back = ()=>{
		this.props.history.goBack()
	}

	forward = ()=>{
		this.props.history.goForward()
	}

	go = ()=>{
		this.props.history.go(-2)
	}

	render() {
		const {messageArr} = this.state
		return (
			<div>
				<ul>
					{
						messageArr.map((msgObj)=>{
							return (
								<li key={msgObj.id}>
									{/* 向路由组件传递state参数 */}
									<Link to={{pathname:'/home/message/detail',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>

									&nbsp;<button onClick={()=> this.pushShow(msgObj.id,msgObj.title)}>push查看</button>
									&nbsp;<button onClick={()=> this.replaceShow(msgObj.id,msgObj.title)}>replace查看</button>
								</li>
							)
						})
					}
				</ul>
				<hr/>
				{/* 声明接收params参数 */}
				{/* <Route path="/home/message/detail/:id/:title" component={Detail}/> */}

				{/* search参数无需声明接收，正常注册路由即可 */}
				{/* <Route path="/home/message/detail" component={Detail}/> */}

				{/* state参数无需声明接收，正常注册路由即可 */}
				<Route path="/home/message/detail" component={Detail}/>

				<button onClick={this.back}>回退</button>&nbsp;
				<button onClick={this.forward}>前进</button>&nbsp;
				<button onClick={this.go}>go</button>

			</div>
		)
	}
}
```

## withRouter

```javascript
class Header extends Component {

	back = ()=>{
		this.props.history.goBack()
	}

	forward = ()=>{
		this.props.history.goForward()
	}

	go = ()=>{
		this.props.history.go(-2)
	}

	render() {
		console.log('Header组件收到的props是',this.props);
		return (
			<div className="page-header">
				<h2>React Router Demo</h2>
				<button onClick={this.back}>回退</button>&nbsp;
				<button onClick={this.forward}>前进</button>&nbsp;
				<button onClick={this.go}>go</button>
			</div>
		)
	}
}

export default withRouter(Header)

//withRouter可以加工一般组件，让一般组件具备路由组件所特有的API
//withRouter的返回值是一个新组件
//要不然一般组件就没有路由组件的history这些api
```

## BrowerRouter和HashRouter路由器的区别

> 1.底层原理不一样：
>
> ​	BrowerRouter使用的时h5的history(不是this.props.history这个,这个是React对h5的history的封装)，不兼容ie9以及以下版本
>
> ​	HashRouter使用的时URL的哈希值
>
> 2.url表现形式不一样：
>
> ​	BrowerRouter没有#，如：localhost:3000/demo/test
>
> ​	HashRouter的路径包含#，如：localhost:3000/#/demo/test
>
> 3.刷新后对路由state参数的影响(重要)
>
> ​	 BrowerRouter没有影响，因为statev保存在state对象中
>
> ​	HashRouter刷新为导致state参数丢失
>
> 4.HashRouter可以用来解决一些路径错误的相关问题(比如样式丢失的问题)

# React6路由

## 区别

### element代理component

### Routes

> 1.代替Switch
>
> 2.和Route配合使用，Route外边必须包裹Routes
>
> 3.Route相当于if语句，如路径和当前的url匹配，则呈现对应的组件
>
> 4.<Route caseSensitive>属性用于指定：路径匹配知否忽略大小写(more那位false)
>
> 5.当路由变化是，Routes匹配所有的Route元素找到最佳的匹配并呈现组件
>
> 6.**Routes也可以嵌套使用，且配合useRoutes配置路由表，但需要通过Outlet组件来渲染子路由**
>
> 重要：使用useRoutes

路由表

```javascript
export default [
    {
      path:'/about',
      element:<About/>
    },
    {
      path:'/home',
      element:<Home/>,
      children:[
        {
            path:'news',
            element:<News/>
        },
        {
          path:'message',
          element:<Message/>,
          children:[
            {
              // path:'detail/:id/:title',
              path:'detail',
              element:<Detail/>
            }
          ]
      }
      ]
    },
    {
      path:'/',
      element:<Navigate to="/about"/>
    }
  ]
```

路由表暴露在App.jsx中，

```javascript
import { useRoutes} from 'react-router-dom'
 // 路由表,根据路由表生成路由
  const element=useRoutes(routes)
  
  //在函数组件的return片段需要注册路由的片段中添加
  {element}
```

例子：

> end：子路由匹配到，父路由就不高亮了。

```javascript
return (
			<div>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-8">
						<div className="page-header"><h2>React Router Demo</h2></div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2 col-xs-offset-2">
						<div className="list-group">

              <NavLink className={computedClassName} to="/about">About</NavLink>
							<NavLink className={computedClassName} end to="/home">Home</NavLink>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
                {element}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
        
function  computedClassName({isActive}){
  //console.log(isActive)
  return isActive ? 'list-group-item atguigu' : 'list-group-item' 
}        
```

### Navigate代替Redirect

> 只要被渲染在页面上就会切换视图
>
> 除了to属性，还有replace属性。

```javascript
//1.在路由表中，表示url以/结尾默认展示about组件
{
      path:'/',
      element:<Navigate to="/about"/>
    }
//2.满足条件即跳转，比如当前页面的sum变为2时，自动跳转为about组件(替换当前的home组件)
export default function Home() {
	const [sum, setSum] = React.useState(1)


	return (
		<div>
			<h3>我是Home的内容</h3>
			{/* <h4>{this.state.sum}</h4> */}
			{sum === 2 ? <Navigate to="/about" replace={false} /> : <h4>当前的sum值是{sum}</h4>}
			<button onClick={() => setSum(sum => sum + 1)}>点击将sum变为2</button>
		</div>

	)

}
```

### NavLink高亮

```
 computedClassName({isActive}){
    console.log(isActive)
    return isActive ? 'list-group-item atguigu' : 'list-group-item' 
 }
//不可以在标签里直接用activeClassName="atguigu" 这种形式了
<NavLink className={this.computedClassName} to="/home">Home</NavLink>
```

### 参数携带

> 点击message组件中的链接，在下方展示另外一个组件，里面有传递过去的内容

```javascript
export default function Message() {
	const [messageArr,setessageArr] = React.useState(
		 [
			{ id: '01', title: '消息1' },
			{ id: '02', title: '消息2' },
			{ id: '03', title: '消息3' },
		 ]
		)
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
								<Link to="detail" state={{
									id: msgObj.id,
									title: msgObj.title,
								}}>{msgObj.title}</Link>
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
```

```javascript
{
      path:'/home',
      element:<Home/>,
      children:[
        {
            path:'news',
            element:<News/>
        },
        {
          path:'message',
          element:<Message/>,
          children:[
            {
            //params传参数需要声明，其他两种不需要
              // path:'detail/:id/:title',
              path:'detail',
              element:<Detail/>
            }
          ]
      }
      ]
},
```

```javascript
const DetailData = [
	{ id: '01', content: '你好，中国' },
	{ id: '02', content: '你好，尚硅谷' },
	{ id: '03', content: '你好，未来的自己' }
]
export default function Detail() {

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
```

### 函数式路由导航

> 不需要Link navLink,比如点击图片跳转的时候或者点击一个自定义标签跳转的时候
>
> 使用useNavigate进行自定义跳转，同时这种形式只能接收state参数，可以设置跳转类型push/replace

```javascript
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
```

#### 路由跳转操作

```javascript
export default function Header() {
    const navigate=useNavigate()

    function back(){
        navigate(-1)
    }

    function forward(){
        navigate(1)
    }
    return (
        <div className="col-xs-offset-2 col-xs-8">
            <div className="page-header"><h2>React Router Demo</h2></div>
            <button onClick={forward}>前进</button>
            <button onClick={back}>后退</button>
        </div>
    )
}

```

### useInRouterContext

> 如果组件在Router的上下文呈现，则其返回true，否则返回false

```javascript
//一般，表示APP 及其子组件都是在上下文环境中，即被被BrowserRouter包裹(不区分路由和非路由组件)
ReactDOM.render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>,
	document.getElementById('root')
)
```

### useNavigationType

> 返回用户是如何来到当前页面的
>
> 返回值：
>
> ​	pop，push,replace
>
> 备注：
>
> ​	pop是指在浏览器中直接打开路由组件(刷新当前页面)

### useOutlet

> 作用：用来呈现当前组件中渲染的嵌套路由组件
>
> ```
> const result=useOutLet()
> console.log(result)
> //如果嵌套路由组件已经挂在，则显示嵌套路由对象，否则为null
> ```

### useResolvedPath

> 解析一个url，解析其中的path，search，hash

# antd组件

## 简单使用

## 按需引入

> 有个缺点，这边的使用格式import 'antd/dist/antd.css'直接导入， 比如无法进行主题配置，而且加载了全部的 antd 组件的样式 。
>
>  此时我们需要对 create-react-app 的默认配置进行自定义，这里我们使用 [react-app-rewired](https://github.com/timarney/react-app-rewired) （一个对 create-react-app 进行自定义配置的社区解决方案）。 
>
>  引入 react-app-rewired 并修改 package.json 里的启动配置。由于新的 [react-app-rewired@2.x](https://github.com/timarney/react-app-rewired#alternatives) 版本的关系，你还需要安装 [customize-cra](https://github.com/arackaf/customize-cra)。 
>
> ```
>  yarn add react-app-rewired customize-cra
> ```
>
> 改变package.json的启动配置为
>
> ```
> /* package.json */
> "scripts": {
> -   "start": "react-scripts start",
> +   "start": "react-app-rewired start",
> -   "build": "react-scripts build",
> +   "build": "react-app-rewired build",
> -   "test": "react-scripts test",
> +   "test": "react-app-rewired test",
> }
> ```
>
>  然后在项目根目录创建一个 `config-overrides.js` 用于修改默认配置。 
>
> 需要安装, [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一个用于按需加载组件代码和样式的 babel 插件（[原理](https://3x.ant.design/docs/react/getting-started-cn#按需加载)）
>
> ```
>  npm install babel-plugin-import 
> ```
>
> 在 `config-overrides.js`写
>
> ```
> //配置具体的修改规则,这样我们在写项目的时候就不需要直接引入antd.css，即可以按需引入。
>  const { override, fixBabelImports } = require('customize-cra');
> 
>  module.exports = override(
>    fixBabelImports('import', {
>      libraryName: 'antd',
>      libraryDirectory: 'es',
>      style: 'css',
>    }),
>  );
> ```
>
> 此时就不需要引入autd.css,直接启动就可以

## 自定义主题

>  按照 [配置主题](https://3x.ant.design/docs/react/customize-theme-cn) 的要求，自定义主题需要用到 less 变量覆盖功能。我们可以引入 `customize-cra` 中提供的 less 相关的函数 [addLessLoader](https://github.com/arackaf/customize-cra#addlessloaderloaderoptions) 来帮助加载 less 样式，同时修改 `config-overrides.js` 文件如下。 
>
> ```
> - const { override, fixBabelImports } = require('customize-cra');
> + const { override, fixBabelImports, addLessLoader } = require('customize-cra');
> 
> module.exports = override(
>   fixBabelImports('import', {
>     libraryName: 'antd',
>     libraryDirectory: 'es',
> -   style: 'css',
> +   style: true,
>   }),
> + addLessLoader({
> +   javascriptEnabled: true,
> +   modifyVars: { '@primary-color': '#1DA57A' },
> + }),
> );
> ```

# Redux

## 是什么

> 1. redux是一个专门用于做**状态管理**的JS库(不是react插件库)。
>
> 2. 它可以用在react, angular, vue等项目中, 但基本与react配合使用。
>
> 3. 作用: 集中式管理react应用中多个组件**共享**的状态。什么

## 什么时候使用

> 1. 某个组件的状态，需要让其他组件可以随时拿到（共享）。
>
> 2. 一个组件需要改变另一个组件的状态（通信）。
>
> 3. 总体原则：能不用就不用, 如果不用比较吃力才考虑使用。

## 核心概念

![图片1](D:\SoftWare\Typora\Content\React脚手架下编码\图片1.png)

### action

==就是把我们的行为包装成一个对象。自己写也可以。其也可以是个函数(异步action)==

> 1. 动作的对象
>
> 2. 包含2个属性
>    - type：标识属性, 值为字符串, 唯一, 必要属性
>    - data：数据属性, 值类型任意, 可选属性
>
> 3. 例子：{ type: 'ADD_STUDENT',data:{name: 'tom',age:18} }
>
> 初始化时type:@@+随机字符的形式，date为undefined

### reducer

==具体执行我们指定行为的人==

> 1. 用于初始化状态、加工状态。
>
> 2. 加工时，根据旧的state和action， 产生新的state的**纯函数**
>
> 初始化的时候preState为undefined

### store

==是总控中心，分配任务给reducer，拿到reducer做的结果==

> 1. 将state、action、reducer联系在一起的对象
>
> 2. 如何得到此对象?
>
>    1) import {createStore} from 'redux'
>
>    2) import reducer from './reducers'
>
>    3) const store = createStore(reducer)
>
> 3. 此对象的功能?
>
>    1) getState(): 得到state
>
>    2) dispatch(action): 分发action, 触发reducer调用, 产生新的state
>
>    3)subscribe(listener): 注册监听, 当产生了新的state时, 自动调用

## react实现计算器

```javascript
export default class Count extends Component {

	state = {count:0}

	//加法
	increment = ()=>{
		const {value} = this.selectNumber
		const {count} = this.state
		this.setState({count:count+value*1})
	}
	//减法
	decrement = ()=>{
		const {value} = this.selectNumber
		const {count} = this.state
		this.setState({count:count-value*1})
	}
	//奇数再加
	incrementIfOdd = ()=>{
		const {value} = this.selectNumber
		const {count} = this.state
		if(count % 2 !== 0){
			this.setState({count:count+value*1})
		}
	}
	//异步加
	incrementAsync = ()=>{
		const {value} = this.selectNumber
		const {count} = this.state
		setTimeout(()=>{
			this.setState({count:count+value*1})
		},500)
	}

	render() {
		return (
			<div>
				<h1>当前求和为：{this.state.count}</h1>
				<select ref={c => this.selectNumber = c}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
				<button onClick={this.incrementAsync}>异步加</button>&nbsp;
			</div>
		)
	}
}

```

## redux实现计算器

> 	(1).去除Count组件自身的状态
> 	(2).src下建立:
> 					-redux
> 						-store.js
> 						-count_reducer.js
> 
> 	(3).store.js：
> 				1).引入redux中的createStore函数，创建一个store
> 				2).createStore调用时要传入一个为其服务的reducer
> 				3).记得暴露store对象
> 	
> 	(4).count_reducer.js：
> 				1).reducer的本质是一个函数，接收：preState,action，返回加工后的状态
> 				2).reducer有两个作用：初始化状态，加工状态
> 				3).reducer被第一次调用时，是store自动触发的，
> 								传递的preState是undefined,
> 								传递的action是:{type:'@@REDUX/INIT_a.2.b.4}
> 	
> 	(5).在index.js中监测store中状态的改变，一旦发生改变重新渲染<App/>
> 			备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。

### 创建干活的人Reducer

```javascript
/* 
	1.该文件是用于创建一个为Count组件服务的reducer，reducer的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
import {INCREMENT,DECREMENT} from './constant'

const initState = 0 //初始化状态
export default function countReducer(preState=initState,action){
	// console.log(preState);
	//从action对象中获取：type、data
	const {type,data} = action
	//根据type决定如何加工数据
	switch (type) {
		case INCREMENT: //如果是加
			return preState + data
		case DECREMENT: //若果是减
			return preState - data
		default:
			return preState
	}
}
```

### 创建老板store

```javascript
/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore} from 'redux'
//引入为Count组件服务的reducer
import countReducer from './count_reducer'
//暴露store
export default createStore(countReducer)
```

### 创建行为对象

```javascript
/* 
	该文件专门为Count组件生成action对象
*/
import {INCREMENT,DECREMENT} from './constant'

export const createIncrementAction = data => ({type:INCREMENT,data})
export const createDecrementAction = data => ({type:DECREMENT,data})

```

### 创建行为定义

```javascript
/* 
	该模块是用于定义action对象中type类型的常量值，目的只有一个：便于管理的同时防止程序员单词写错
*/
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```

### 计算器逻辑

```javascript
export default class Count extends Component {

	state = {carName:'奔驰c63'}

	/* componentDidMount(){
		//检测redux中状态的变化，只要变化，就调用render
		store.subscribe(()=>{
			this.setState({})
		})
	} */

	//加法
	increment = ()=>{
		const {value} = this.selectNumber
		store.dispatch(createIncrementAction(value*1))
	}
	//减法
	decrement = ()=>{
		const {value} = this.selectNumber
		store.dispatch(createDecrementAction(value*1))
	}
	//奇数再加
	incrementIfOdd = ()=>{
		const {value} = this.selectNumber
		const count = store.getState()
		if(count % 2 !== 0){
			store.dispatch(createIncrementAction(value*1))
		}
	}
	//异步加
	incrementAsync = ()=>{
		const {value} = this.selectNumber
		setTimeout(()=>{
			store.dispatch(createIncrementAction(value*1))
		},500)
	}

	render() {
		return (
			<div>
				<h1>当前求和为：{store.getState()}</h1>
				<select ref={c => this.selectNumber = c}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
				<button onClick={this.incrementAsync}>异步加</button>&nbsp;
			</div>
		)
	}
}
```

### index.js监控store变化

```javascript
ReactDOM.render(<App/>,document.getElementById('root'))
//监控redux的状态变化，只要一变化就调用render
store.subscribe(()=>{
	ReactDOM.render(<App/>,document.getElementById('root'))
})
```

### 异步action

> store

```javascript
/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore,applyMiddleware} from 'redux'
//引入为Count组件服务的reducer
import countReducer from './count_reducer'
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
//暴露store
export default createStore(countReducer,applyMiddleware(thunk))
```

> action

```javascript
/* 
	该文件专门为Count组件生成action对象
*/
import {INCREMENT,DECREMENT} from './constant'

//同步action，就是指action的值为Object类型的一般对象
export const createIncrementAction = data => ({type:INCREMENT,data})
export const createDecrementAction = data => ({type:DECREMENT,data})

//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
export const createIncrementAsyncAction = (data,time) => {
	return (dispatch)=>{
		setTimeout(()=>{
			dispatch(createIncrementAction(data))
		},time)
	}
}
```

> 之前那是在具体的组件中使用定时器，现在直接把定时任务放在action中，传入data和time作为参数。

```javascript
//异步加
	incrementAsync = ()=>{
		const {value} = this.selectNumber
		// setTimeout(()=>{
			store.dispatch(createIncrementAsyncAction(value*1,500))
		// },500)
	}

```

> store调用dispath方法，createIncrementAsyncAction返回函数
>
> ```javascript
> (dispatch)=>{
> 		setTimeout(()=>{
> 			dispatch(createIncrementAction(data))
> 		},time)
> 	}
> ```
>
> 执行定时函数

# React-redux

![react-redux模型图](D:\SoftWare\Typora\Content\React脚手架下编码\react-redux模型图.png)

### 改写计算器

> 	(1).明确两个概念：
> 					1).UI组件:不能使用任何redux的api，只负责页面的呈现、交互等。
> 					2).容器组件：负责和redux通信，将结果交给UI组件。
> 		(2).如何创建一个容器组件————靠react-redux 的 connect函数
> 						connect(mapStateToProps,mapDispatchToProps)(UI组件)
> 							-mapStateToProps:映射状态，返回值是一个对象
> 							-mapDispatchToProps:映射操作状态的方法，返回值是一个对象
> 		(3).备注1：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入
> 		(4).备注2：mapDispatchToProps，也可以是一个对象

相比之前不用React-redux,除了上述还有如下优点:

1.不需要手动监听Store了，react-redux框架自动帮我们监听

2.不需要在每个容器组件提供store，可以在最上层index.js

```javascript
// 给所有的容器组件传入了store
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
)
```

> APP组件

```javascript
export default class App extends Component {
	render() {
		return (
			<div>
				{/* 给容器组件传递store */}
				<Count store={store} />
			</div>
		)
	}
}
```

> 容器组件

```javascript
//引入Count的UI组件
import CountUI from '../../components/Count'
//引入action
import {
	createIncrementAction,
	createDecrementAction,
	createIncrementAsyncAction
} from '../../redux/count_action'

//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'

/* 
	1.mapStateToProps函数返回的是一个对象；
	2.返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value
	3.mapStateToProps用于传递状态
*/
function mapStateToProps(state){
	return {count:state}
}

/* 
	1.mapDispatchToProps函数返回的是一个对象；
	2.返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value
	3.mapDispatchToProps用于传递操作状态的方法
*/
function mapDispatchToProps(dispatch){
	return {
		jia:number => dispatch(createIncrementAction(number)),
		jian:number => dispatch(createDecrementAction(number)),
		jiaAsync:(number,time) => dispatch(createIncrementAsyncAction(number,time)),
	}
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps,mapDispatchToProps)(CountUI)
```

> UI组件

```javascript
export default class Count extends Component {

	state = {carName:'奔驰c63'}

	//加法
	increment = ()=>{
		const {value} = this.selectNumber
		this.props.jia(value*1)
	}
	//减法
	decrement = ()=>{
		const {value} = this.selectNumber
		this.props.jian(value*1)
	}
	//奇数再加
	incrementIfOdd = ()=>{
		const {value} = this.selectNumber
		if(this.props.count % 2 !== 0){
			this.props.jia(value*1)
		}
	}
	//异步加
	incrementAsync = ()=>{
		const {value} = this.selectNumber
		this.props.jiaAsync(value*1,500)
	}

	render() {
		//console.log('UI组件接收到的props是',this.props);
		return (
			<div>
				<h1>当前求和为：{this.props.count}</h1>
				<select ref={c => this.selectNumber = c}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
				<button onClick={this.incrementAsync}>异步加</button>&nbsp;
			</div>
		)
	}
}
```

### 进一步精简

> (1).容器组件和UI组件整合一个文件
> 		(2).无需自己给容器组件传递store，给<App/>包裹一个<Provider store={store}>即可。
> 		(3).使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作。
> 		(4).mapDispatchToProps也可以简单的写成一个对象
> 		(5).一个组件要和redux“打交道”要经过哪几步？
> 						(1).定义好UI组件---不暴露
> 						(2).引入connect生成一个容器组件，并暴露，写法如下：
> 								connect(
> 									state => ({key:value}), //映射状态
> 									{key:xxxxxAction} //映射操作状态的方法
> 								)(UI组件)
> 						(3).在UI组件中通过this.props.xxxxxxx读取和操作状态

```javascript
//index.js
ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
)
```

> 容器组件和UI组件融合

```javascript
//定义UI组件
class Count extends Component {

	state = {carName:'奔驰c63'}

	//加法
	increment = ()=>{
		const {value} = this.selectNumber
		this.props.jia(value*1)
	}
	//减法
	decrement = ()=>{
		const {value} = this.selectNumber
		this.props.jian(value*1)
	}
	//奇数再加
	incrementIfOdd = ()=>{
		const {value} = this.selectNumber
		if(this.props.count % 2 !== 0){
			this.props.jia(value*1)
		}
	}
	//异步加
	incrementAsync = ()=>{
		const {value} = this.selectNumber
		this.props.jiaAsync(value*1,500)
	}

	render() {
		//console.log('UI组件接收到的props是',this.props);
		return (
			<div>
				<h1>当前求和为：{this.props.count}</h1>
				<select ref={c => this.selectNumber = c}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
				<button onClick={this.incrementAsync}>异步加</button>&nbsp;
			</div>
		)
	}
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(
	state => ({count:state}),

	//mapDispatchToProps的一般写法
	/* dispatch => ({
		jia:number => dispatch(createIncrementAction(number)),
		jian:number => dispatch(createDecrementAction(number)),
		jiaAsync:(number,time) => dispatch(createIncrementAsyncAction(number,time)),
	}) */

	//mapDispatchToProps的简写
	{
		jia:createIncrementAction,
		jian:createDecrementAction,
		jiaAsync:createIncrementAsyncAction,
	}
)(Count)
```



### 两个容组件交互数据案例

> 增加一个Person组件,只要在store存储的状态，count组件和person组件可以访问里面的数据

### 坑：

1. 一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)

2. 必须遵守以下一些约束 

   1) 不得改写参数数据

   2) 不会产生任何副作用，例如网络请求，输入和输出设备

   3) 不能调用Date.now()或者Math.random()等不纯的方法 

3. redux的reducer函数必须是一个纯函数

```javascript
import {ADD_PERSON} from '../constant'

//初始化人的列表
const initState = [{id:'001',name:'tom',age:18}]

export default function personReducer(preState=initState,action){
	// console.log('personReducer@#@#@#');
	const {type,data} = action
	switch (type) {
		case ADD_PERSON: //若是添加一个人
		//此处不可以这样写，这样会导致preState被改写了，personReducer就不是纯函数了。
		//redux会比较前后preState的地址，尽管数组内容变了，但是地址没变，框架认为preState没改变，还返回原的的数值
			//preState.unshift(data) 
			return [data,...preState]
		default:
			return preState
	}
}

```

> store

```javascript
/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore,applyMiddleware,combineReducers} from 'redux'
//引入为Count组件服务的reducer
import countReducer from './reducers/count'
//引入为Person组件服务的reducer
import personReducer from './reducers/person'
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'

//汇总所有的reducer变为一个总的reducer--这里面的状态就是redux在state里的总状态对象
const allReducer = combineReducers({
	he:countReducer,
	rens:personReducer
})

//暴露store
export default createStore(allReducer,applyMiddleware(thunk))
```

> peroson组件

```javascript
class Person extends Component {

	addPerson = ()=>{
		const name = this.nameNode.value
		const age = this.ageNode.value
		const personObj = {id:nanoid(),name,age}
		this.props.jiaYiRen(personObj)
		this.nameNode.value = ''
		this.ageNode.value = ''
	}

	render() {
		return (
			<div>
				<h2>我是Person组件,上方组件求和为{this.props.he}</h2>
				<input ref={c=>this.nameNode = c} type="text" placeholder="输入名字"/>
				<input ref={c=>this.ageNode = c} type="text" placeholder="输入年龄"/>
				<button onClick={this.addPerson}>添加</button>
				<ul>
					{
						this.props.yiduiren.map((p)=>{
							return <li key={p.id}>{p.name}--{p.age}</li>
						})
					}
				</ul>
			</div>
		)
	}
}

export default connect(
	state => ({yiduiren:state.rens,he:state.he}),//映射状态，此时的state是redux保存的总状态对象
	{jiaYiRen:createAddPersonAction}//映射操作状态的方法
)(Person)
```

> count组件

```javascript
//定义UI组件
class Count extends Component {

	state = {carName:'奔驰c63'}

	//加法
	increment = ()=>{
		const {value} = this.selectNumber
		this.props.jia(value*1)
	}
	//减法
	decrement = ()=>{
		const {value} = this.selectNumber
		this.props.jian(value*1)
	}
	//奇数再加
	incrementIfOdd = ()=>{
		const {value} = this.selectNumber
		if(this.props.count % 2 !== 0){
			this.props.jia(value*1)
		}
	}
	//异步加
	incrementAsync = ()=>{
		const {value} = this.selectNumber
		this.props.jiaAsync(value*1,500)
	}

	render() {
		//console.log('UI组件接收到的props是',this.props);
		return (
			<div>
				<h2>我是Count组件,下方组件总人数为:{this.props.renshu}</h2>
				<h4>当前求和为：{this.props.count}</h4>
				<select ref={c => this.selectNumber = c}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
				<button onClick={this.incrementAsync}>异步加</button>&nbsp;
			</div>
		)
	}
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(
	state => ({
		count:state.he,
		renshu:state.rens.length
	}),
	{
		jia:createIncrementAction,
		jian:createDecrementAction,
		jiaAsync:createIncrementAsyncAction,
	}
)(Count)
```

> 处理person的reducer

```javascript
//初始化人的列表
const initState = [{id:'001',name:'tom',age:18}]

export default function personReducer(preState=initState,action){
	// console.log('personReducer@#@#@#');
	const {type,data} = action
	switch (type) {
		case ADD_PERSON: //若是添加一个人
			return [data,...preState]
		default:
			return preState
	}
}
```

> person的action

```javascript
//创建增加一个人的action动作对象
export const createAddPersonAction = personObj => ({type:ADD_PERSON,data:personObj})
```

### 工具的使用

> 1.浏览器安装插件
>
> 2.项目中进行引入：
>
> ​	(1).yarn add redux-devtools-extension
>
> ​    (2).store中进行配置
>
> ```
>    import {composeWithDevTools} from 'redux-devtools-extension'
>    const store = createStore(allReducer,composeWithDevTools(applyMiddleware(thunk)))
> ```



# 部署

打包：npm run build生成build文件夹。

npm i serve -g安装serce。在该项目的build的index.html下

```
serve build
```

就是build文件夹作为根目录运行服务器

# 扩展

## 修改state的两种方法

```javascript
export default class Demo extends Component {
	state = {count:0}
	add = ()=>{
		//对象式的setState
		/* //1.获取原来的count值
		const {count} = this.state
		//2.更新状态
		this.setState({count:count+1},()=>{
			console.log(this.state.count);
		})
		//console.log('12行的输出',this.state.count); //0,react是异步进行的更新，意思就是
		修改完状态之后，还不一定更新 */

		//函数式的setState
		this.setState( state => ({count:state.count+1}))
	}

	render() {
		return (
			<div>
				<h1>当前求和为：{this.state.count}</h1>
				<button onClick={this.add}>点我+1</button>
			</div>
		)
	}
}
```

>   (1). setState(stateChange, [callback])------对象式的setState
>
> ​      1.stateChange为状态改变对象(该对象可以体现出状态的更改)
>
> ​      2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
>
> ​          
>
>   (2). setState(updater, [callback])------函数式的setState
>
> ​      1.updater为返回stateChange对象的函数。
>
> ​      2.updater可以接收到state和props。
>
> ​      4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
>
> 总结:
>
> ​    1.对象式的setState是函数式的setState的简写方式(语法糖)
>
> ​    2.使用原则：
>
> ​        (1).如果新状态不依赖于原状态 ===> 使用对象方式
>
> ​        (2).如果新状态依赖于原状态 ===> 使用函数方式
>
> ​        (3).如果需要在setState()执行后获取最新的状态数据, 
>
> ​          要在第二个callback函数中读取

## 懒加载

```javascript
  //1.通过React的lazy函数配合import()函数动态加载路由组件 ===> 路由组件代码会被分开打包

  const Login = lazy(()=>import('@/pages/Login'))

  //2.通过<Suspense>指定在加载得到路由打包文件前显示一个自定义loading界面

  <Suspense fallback={<h1>loading.....</h1>}>

    <Switch>

      <Route path="/xxx" component={Xxxx}/>

      <Redirect to="/login"/>

    </Switch>
  </Suspense>
```



```javascript
const Home = lazy(()=> import('./Home') )
const About = lazy(()=> import('./About'))

export default class Demo extends Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="col-xs-offset-2 col-xs-8">
						<div className="page-header"><h2>React Router Demo</h2></div>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-2 col-xs-offset-2">
						<div className="list-group">
							{/* 在React中靠路由链接实现切换组件--编写路由链接 */}
							<NavLink className="list-group-item" to="/about">About</NavLink>
							<NavLink className="list-group-item" to="/home">Home</NavLink>
						</div>
					</div>
					<div className="col-xs-6">
						<div className="panel">
							<div className="panel-body">
								<Suspense fallback={<Loading/>}>
									{/* 注册路由 */}
									<Route path="/about" component={About}/>
									<Route path="/home" component={Home}/>
								</Suspense>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
```

## 函数式组件访问三大属性

### 事例

```javascript

function Demo(){
	//console.log('Demo');
	//返回数据，第一个是state 第二个是更新state的方法
	//每次调用都会走一遍，但是react会把count存储下来，再次执行不会右变为0.而是在上次的基础上+1
	const [count,setCount] = React.useState(0)
	const myRef = React.useRef()

	//相当于类式组件的生命周期钩子，
	//第一个参数相当于两个钩子：DidMount和DidUpdate。DidUpdate是否生效取决于第二个数组参数
	//[]写个空数组代表谁也不检测， 回调函数只会在第一次render()后执行。不写的话就代表所有的元素都检测

	//同时第一个参数返回的函数就相当于willUnMount钩子
	React.useEffect(()=>{
		let timer = setInterval(()=>{
			setCount(count => count+1 )
		},1000)
		return ()=>{
			clearInterval(timer)
		}
	},[])

	//加的回调
	function add(){
		//setCount(count+1) //第一种写法
		//第二种写法：setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
		setCount(count => count+1 )
	}

	//提示输入的回调
	function show(){
		alert(myRef.current.value)
	}

	//卸载组件的回调
	function unmount(){
		ReactDOM.unmountComponentAtNode(document.getElementById('root'))
	}

	return (
		<div>
			<input type="text" ref={myRef}/>
			<h2>当前求和为：{count}</h2>
			<button onClick={add}>点我+1</button>
			<button onClick={unmount}>卸载组件</button>
			<button onClick={show}>点我提示数据</button>
		</div>
	)
}

export default Demo

```

### 1. React Hook/Hooks是什么?

```
(1). Hook是React 16.8.0版本增加的新特性/新语法
(2). 可以让你在函数组件中使用 state 以及其他的 React 特性
```

### 2. 三个常用的Hook

```
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

### 3. State Hook

```
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

### 4. Effect Hook

```
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount() 
```

### 5. Ref Hook

```
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```

## Fragment

> 作用：可以不需要有真实的Dom根标签

```javascript
export default class App extends Component {
	render() {
		return (
			<Fragment>
				<Demo/>
			</Fragment>
		)
	}
}

```

## Context

### 理解

> 一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信

### 使用

```js
1) 创建Context容器对象：
	const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

### 注意

	在应用开发中一般不用context, 一般都它的封装react插件

### 实例

```javascript
//创建Context对象
const MyContext = React.createContext()
const {Provider,Consumer} = MyContext
export default class A extends Component {

	state = {username:'tom',age:18}

	render() {
		const {username,age} = this.state
		return (
			<div className="parent">
				<h3>我是A组件</h3>
				<h4>我的用户名是:{username}</h4>
				{/* B组件和他的子组件都能收到 */}
				<Provider value={{username,age}}>
					<B/>
				</Provider>
			</div>
		)
	}
}

class B extends Component {
	render() {
		return (
			<div className="child">
				<h3>我是B组件</h3>
				<C/>
			</div>
		)
	}
}

/* class C extends Component {
	//声明接收context
	static contextType = MyContext
	render() {
		const {username,age} = this.context
		return (
			<div className="grand">
				<h3>我是C组件</h3>
				<h4>我从A组件接收到的用户名:{username},年龄是{age}</h4>
			</div>
		)
	}
} */
// 函数式组件的接收方式(当然类式组件也可以用)
function C(){
	return (
		<div className="grand">
			<h3>我是C组件</h3>
			<h4>我从A组件接收到的用户名:
				{/* 模板字符串,{里面全是js，写字符串包含变量就这么写} */}
			<Consumer>
				{value => `${value.username},年龄是${value.age}`}
			</Consumer>
			</h4>
		</div>
	)
}
```

## 组件优化

### Component的2个问题 

> 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render()
>
> 2. 只当前组件重新render(), 就会自动重新render子组件 ==> 效率低

### 效率高的做法

>  只有当组件的state或props数据发生改变时才重新render()

### 原因

>  Component中的shouldComponentUpdate()总是返回true

### 解决

	办法1: 
		重写shouldComponentUpdate()方法
		比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
	办法2:  
		使用PureComponent
		PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
		注意: 
			只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
			不要直接修改state数据, 而是要产生新数据
	项目中一般使用PureComponent来优化


### 事例

```javascript
export default class Parent extends PureComponent {

	state = {carName:"奔驰c36",stus:['小张','小李','小王']}

	addStu = ()=>{
		/* const {stus} = this.state
		stus.unshift('小刘')
		this.setState({stus}) */

		const {stus} = this.state
		this.setState({stus:['小刘',...stus]})
	}

	changeCar = ()=>{
		//this.setState({carName:'迈巴赫'})

		const obj = this.state
		obj.carName = '迈巴赫'
		console.log(obj === this.state);
		this.setState(obj)
	}

	/* shouldComponentUpdate(nextProps,nextState){
		// console.log(this.props,this.state); //目前的props和state
		// console.log(nextProps,nextState); //接下要变化的目标props，目标state
		return !this.state.carName === nextState.carName
	} */

	render() {
		console.log('Parent---render');
		const {carName} = this.state
		return (
			<div className="parent">
				<h3>我是Parent组件</h3>
				{this.state.stus}&nbsp;
				<span>我的车名字是：{carName}</span><br/>
				<button onClick={this.changeCar}>点我换车</button>
				<button onClick={this.addStu}>添加一个小刘</button>
				<Child carName="奥拓"/>
			</div>
		)
	}
}

class Child extends PureComponent {

	/* shouldComponentUpdate(nextProps,nextState){
		console.log(this.props,this.state); //目前的props和state
		console.log(nextProps,nextState); //接下要变化的目标props，目标state
		return !this.props.carName === nextProps.carName
	} */

	render() {
		console.log('Child---render');
		return (
			<div className="child">
				<h3>我是Child组件</h3>
				<span>我接到的车是：{this.props.carName}</span>
			</div>
		)
	}
}
```

## render属性

### 如何向组件内部动态传入带内容的结构(标签)?

	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <AA><BB/></AA>
	React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构, 一般用render函数属性

### children props

	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果B组件需要A组件内的数据, ==> 做不到 

### render props

	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data} 

### 事例

> 不仅可以传递参数的优点，还可以随时替换子组件，类似于Vue的插槽技术

```javascript
export default class Parent extends Component {
	render() {
		return (
			<div className="parent">
				<h3>我是Parent组件</h3>
				{/* <A>你好</A> */}
				{/* 给A标签的render属性传入一个函数，该函数形参为name,返回为C标签(这个标签名字随便叫啥都行) */}
				<A render={(name)=><B name={name}/>}/>
			</div>
		)
	}
}

class A extends Component {
	state = {name:'tom'}
	render() {
		console.log(this.props);
		const {name} = this.state
		return (
			<div className="a">
				<h3>我是A组件</h3>
				{/* {this.props.children} */}
				{this.props.render(name)}
			</div>
		)
	}
}

class B extends Component {
	render() {
		console.log('B--render');
		return (
			<div className="b">
				<h3>我是B组件,{this.props.name}</h3>
			</div>
		)
	}
}
```

## 边界错误

### 理解：

错误边界：用来捕获后代组件错误，渲染出备用页面

### 特点：

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

### 使用方式：

getDerivedStateFromError配合componentDidCatch

```js
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

### 事例

```javascript
export default class Parent extends Component {

	state = {
		hasError:'' //用于标识子组件是否产生错误
	}

	//当Parent的子组件出现报错时候，会触发getDerivedStateFromError调用，并携带错误信息
	static getDerivedStateFromError(error){
		console.log('@@@',error);
		return {hasError:error}
	}

	componentDidCatch(){
		console.log('此处统计错误，反馈给服务器，用于通知编码人员进行bug的解决');
	}

	render() {
		return (
			<div>
				<h2>我是Parent组件</h2>
				{this.state.hasError ? <h2>当前网络不稳定，稍后再试</h2> : <Child/>}
			</div>
		)
	}
}

```

```javascript
export default class Child extends Component {
	state = {
		users:[
			{id:'001',name:'tom',age:18},
			{id:'002',name:'jack',age:19},
			{id:'003',name:'peiqi',age:20},
		]
		// users:'abc'
	}

	render() {
		return (
			<div>
				<h2>我是Child组件</h2>
				{
					this.state.users.map((userObj)=>{
						return <h4 key={userObj.id}>{userObj.name}----{userObj.age}</h4>
					})
				}
			</div>
		)
	}
}
```

## 组件通信方式总结

#### 方式：

		props：
			(1).children props
			(2).render props
		消息订阅-发布：
			pubs-sub、event等等
		集中式管理：
			redux、dva等等
		conText:
			生产者-消费者模式

#### 组件间的关系

		父子组件：props
		兄弟组件(非嵌套组件)：消息订阅-发布、集中式管理
		祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(用的少)

