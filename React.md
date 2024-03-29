# 定义

> 用于构建用户界面的JavaScript库
>
> 1.发送请求获取数据
>
> 2.处理数据
>
> 3.**操作DOM呈现页面(React只关注这个)**

简答的说，就是将数据渲染为html视图的开源JavaScript库。由Facebook开发。

==react开发时在浏览器安装react组件，方便我们查看组件信息 React Developer Tools。==

## 优点：

以前操作DOM有以下缺点：

> 1.原生的js操作dom繁琐，效率低下，会大量的重绘重排。
>
> 2.没有组件化的编码方案，代码复用率低下。

相反这些是React优点：

> 1.采用组件化编码。声明式编码，提高开发效率和组件复用率。
>
> 2.React native可以进行使用React语法进行移动端开发。
>
> 3.使用虚拟**DOM技术+Diffing算法**，尽量减少与真是DOM的交互。

### 案例讲解

![1659093092214](D:\SoftWare\Typora\Content\React\1659093092214.png)

> 如果，新增一些人，就会重新遍历，把以前的DOM全部替换掉。
>
> ![1659320571185](D:\SoftWare\Typora\Content\React\1659320571185.png)
>
> **React的做法：**
>
> 第二次加入数据之后，会先进行虚拟DOM比较，发现前两个一样的，直接用前面生成的DOM加上新增数据的真实DOM展示就可以了。
>
> 我们编码时基本只需要操作react的虚拟DOM相关数据, react会转换为真实DOM变化而更新界。
>
> ![1659320645957](D:\SoftWare\Typora\Content\React\1659320645957.png)

# 入门案例

## 案例1

> 此案例讲解了jsx的基本概念和使用，以及基本React页面的基本结构
>
> 参考：react_basic===》01hello_react

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>hello_react</title>
</head>
<body>
	<!-- 准备好一个“容器” -->
	<div id="test"></div>

	<!-- 引入react核心库 -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 引入react-dom，用于支持react操作DOM -->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<!-- 引入babel，用于将jsx转为js -->
	<script type="text/javascript" src="../js/babel.min.js"></script>

	<script type="text/babel" > /* 此处一定要写babel */
		//1.创建虚拟DOM
		const VDOM = <h1>Hello,React</h1> /* 此处一定不要写引号，因为不是字符串 */
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
</body>
</html>
```

### JSX

1. 全称:  JavaScript XML

2. react定义的一种类似于XML的JS扩展语法: JS + XML本质是

   ```
   React.creatElement(component,props,...children)
   ```

   的语法糖。(jsx是直接使用原生js这种方式创建虚拟DOM的一种简单方式，如案例2所示)

3.  作用: 用来简化创建虚拟DOM 

   1) 写法：var ele=<h1>Hello</h1>

   > 注意：1) 它不是字符串, 也不是HTML/XML标签
   >
   > 2) 它最终产生的就是一个JS对象

4. 标签名任意: HTML标签或其它标签

5. 标签属性任意: HTML标签属性或其它

6. 语法规则：

   1）遇到 <开头的代码, 以标签的语法解析: html同名标签转换为html同名元素, 其它标签需要特别解析

   2）遇到以 { 开头的代码，以JS语法解析: 标签中的js表达式必须用{ }包含

7. babel.js的作用

   1）浏览器不能直接解析JSX代码, 需要babel转译为纯JS的代码才能运行

   2）只要用了JSX，都要加上type="text/babel", 声明需要babel来处理

### 渲染

1.语法:  ReactDOM.render(virtualDOM,containerDOM)

2.作用: 将虚拟DOM元素渲染到页面中的真实容器DOM中显示

3.参数说明:

​	参数一: 纯js或jsx创建的虚拟dom对象

​	参数二: 用来包含虚拟DOM元素的真实dom元素对象(一般是一个div)

## 案例2

> 讲述了两种创建虚拟DOM的两种方式：jsx和js,以此来侧面说明jsx的优点。
>
> 本质：jsx最后也会转化为js的形式创建虚拟DOM，只不过对于用户来说书写jsx更加简单。所以就是说jsx是原生js创建虚拟DOM的语法糖。
>
> 虚拟DOM：
>
> 1.虚拟DOM也就是就是Object类
>
> 2.虚拟DOM内部属性较少，相较于真实DOM较轻
>
> 3.虚拟DOM最终会被React转化为真实DOM，呈现在页面上。
>
> 参考：react_basic===》02创建虚拟DOM的两种方式

```javascript
<script type="text/babel" > /* 此处一定要写babel */
		//1.创建虚拟DOM
		const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
			<h1 id="title">
				<span>Hello,React</span>
			</h1>
		)
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
```

```javascript
<script type="text/javascript" > 
		//1.创建虚拟DOM
		const VDOM = React.createElement('h1',{id:'title'},React.createElement('span',{},'Hello,React'))
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
```

## 案例3

> 讲述jsx的基本语法规则
>
> 参考：react_basic===》03jsx的语法规则

```javascript
<script type="text/babel" >
		const myId = 'aTgUiGu'
		const myData = 'HeLlo,rEaCt'

		//1.创建虚拟DOM
		const VDOM = (
			<div>
				<h2 className="title" id={myId.toLowerCase()}>
					<span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
				</h2>
				<h2 className="title" id={myId.toUpperCase()}>
					<span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
				</h2>
				<input type="text"/>
			</div>
		)
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))

		/* 
				jsx语法规则：
						1.定义虚拟DOM时，不要写引号。
						2.标签中混入JS表达式时要用{}。
						3.样式的类名指定不要用class，要用className。
						4.内联样式，要用style={{key:value}}的形式去写。
						5.只有一个根标签,所以最外层始终得包裹一个标签。比如<div>
						6.标签必须闭合
						7.标签首字母
								(1).若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
								(2).若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。

		 */
	</script>
```

## 案例4

>  动态展示列表的jsx联系
>
> 参考：react_basic===》03jsx的小练习

```javascript
<script type="text/babel" >
		/* 
			一定注意区分：【js语句(代码)】与【js表达式】
					1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
								下面这些都是表达式：
										(1). a
										(2). a+b
										(3). demo(1)
										(4). arr.map() 
										(5). function test () {}
					2.语句(代码)：
								下面这些都是语句(代码)：
										(1).if(){}
										(2).for(){}
										(3).switch(){case:xxxx}
			{}标签中放入js表达式可以，不可以放入语句。
		
	 */
		//模拟一些数据
		const data = ['Angular','React','Vue']
		//1.创建虚拟DOM
		const VDOM = (
			<div>
				<h1>前端js框架列表</h1>
				<ul>
					{
						data.map((item,index)=>{
							return <li key={index}>{item}</li>
						})
					}
				</ul>
			</div>
		)
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
```

# 模块和组件

## 模块

> **理解**：向外提供特定功能的js程序, 一般就是一个js文件
>
> **为什么要拆成模块：**随着业务逻辑增加，代码越来越多且复杂。
>
> **作用**：复用js, 简化js的编写, 提高js运行效率

**模块化：**

> 当应用的js都以模块来编写的, 这个应用就是一个模块化的应用

## 组件

> **理解：**用来实现局部功能效果的代码和资源的集合(html/css/js/image等等)
>
> **为什么要用组件**： 一个界面的功能更复杂
>
> **作用：**复用编码, 简化项目编码, 提高运行效率

**组件化：**

> 当应用是以多组件的方式实现, 这个应用就是一个组件化的应用

# React组件

> **注意：**
>
>    1.组件名必须首字母大写
>
> 2. 虚拟DOM元素只能有一个根元素
> 3. 虚拟DOM元素必须有结束标签
>
> **渲染类组件的流程：**
>
> 1. React内部会创建组件实例对象
> 2. 调用render()得到虚拟DOM, 并解析为真实DOM
> 3. 插入到指定的页面元素内部

## 函数式组件

```javascript
<script type="text/babel">
		//1.创建函数式组件
		function MyComponent(){
			console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式
			return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
		}
		//2.渲染组件到页面
		ReactDOM.render(<MyComponent/>,document.getElementById('test'))
		/* 
			执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
					1.React解析组件标签，找到了MyComponent组件。
					2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。
		*/
	</script>
```

## 类式组件

```javascript
<script type="text/babel">
		//1.创建类式组件
		class MyComponent extends React.Component {
			render(){
				//render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
				//render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
				console.log('render中的this:',this);
				return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
			}
		}
		//2.渲染组件到页面
		ReactDOM.render(<MyComponent/>,document.getElementById('test'))
		/* 
			执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
					1.React解析组件标签，找到了MyComponent组件。
					2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
					3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
		*/
	</script>
```

## 组件的三大属性

### state

> **理解：**
>
> 1. state是组件对象最重要的属性, 值是对象(可以包含多个key-value的组合)
> 2. 组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)
>
> ==其实就是每个组件自己的信息==

#### 案例

> 1.  组件中render方法中的this为组件实例对象
>
> 2. 组件自定义的方法中this为undefined，如何解决？
>
>       a) 强制绑定this: 通过函数对象的bind()
>
>       b) 箭头函数
>
> 3. 状态数据，不能直接修改或更新

要注意，changeWeather是面向类实例的。不像java，直接this值找不到this的，不许bind。(下面会有介绍)

```javascript
<script type="text/babel">
		//1.创建组件
		class Weather extends React.Component{
			
			//构造器调用几次？ ———— 1次
			constructor(props){
				console.log('constructor');
				super(props)
				//初始化状态
				this.state = {isHot:false,wind:'微风'}
				//解决changeWeather中this指向问题
                //后面的changeWeather时类原型中的函数,前面的是实例对象的changeWeather
				this.changeWeather = this.changeWeather.bind(this)
			}

			//render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
			render(){
				console.log('render');
				//读取状态
				const {isHot,wind} = this.state
				return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
			}

			//changeWeather调用几次？ ———— 点几次调几次
			changeWeather(){
				//changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
				//由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
				//类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined
				
				console.log('changeWeather');
				//获取原来的isHot值
				const isHot = this.state.isHot
				//严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。
                //只要更新就会重新render
				this.setState({isHot:!isHot})
				console.log(this);

				//严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
				//this.state.isHot = !isHot //这是错误的写法
			}
		}
		//2.渲染组件到页面
		ReactDOM.render(<Weather/>,document.getElementById('test'))
				
	</script>
```

==为什么类中的方法，不bind找不到this呢==？(重要)

首先要明白，this指向类的实例对象。

下面的例子和访问不到this同理，p1.study()可以访问到类的实例对象，study在栈里直接指向了方法console.log(this)(堆空间)。而const x = p1.study相当于栈中的x也指向了此堆空间，这个x并不是类对象的实例中的，而是另外赋值出来的，其并没有this。所以找不到。

==同理，onClick={this.changeWeather}是再次赋值给onClick，在触发时changeWeather是找不到this的，必须将原型的changeWeather绑定到类实例中	this.changeWeather = this.changeWeather.bind(this)==

```javascript
<script type="text/javascript" >
			class Person {
				constructor(name,age){
					this.name = name
					this.age = age
				}
				study(){
					//study方法放在了哪里？——类的原型对象上，供实例使用
					//通过Person实例调用study时，study中的this就是Person实例
					console.log(this);
				}
			}
			const p1 = new Person('tom',18)
			p1.study() //通过实例调用study方法
			const x = p1.study
			x()
		</script>
```

#### 简写

```javascript
<script type="text/babel">
		//1.创建组件
		class Weather extends React.Component{
			//初始化状态
			state = {isHot:false,wind:'微风'}

			render(){
				const {isHot,wind} = this.state
				return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
			}

			//自定义方法————要用赋值语句的形式+箭头函数
			//箭头函数没有this，会找外层的this
			changeWeather = ()=>{
				const isHot = this.state.isHot
				this.setState({isHot:!isHot})
			}
		}
		//2.渲染组件到页面
		ReactDOM.render(<Weather/>,document.getElementById('test'))			
	</script>
```

### props

> **理解：**
>
> 1. 每个组件对象都会有props(properties的简写)属性
> 2. 组件标签的所有属性都保存在props中
>
> ==其实就是数据交互的途径==
>
> **作用：**
>
> 1. 通过标签属性从组件外向组件内传递变化的数据
> 2.  注意: 组件内部不要修改props数据

```javascript
<script type="text/babel">
		//创建组件
		class Person extends React.Component{
			render(){
				// console.log(this);
				const {name,age,sex} = this.props
				return (
					<ul>
						<li>姓名：{name}</li>
						<li>性别：{sex}</li>
						<li>年龄：{age+1}</li>
					</ul>
				)
			}
		}
		//渲染组件到页面
		ReactDOM.render(<Person name="jerry" age={19}  sex="男"/>,document.getElementById('test1'))
		ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))
        
		//当数据特别多或者从服务器获得json格式数据的时候
		const p = {name:'老刘',age:18,sex:'女'}
		// console.log('@',...p);
		// ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'))
        //babel+react 可以允许在标签值传递的时候展开对象
		ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))
	</script>
```

#### 标签属性限制

```javascript
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>
<script type="text/babel">
		//创建组件
		class Person extends React.Component{

			constructor(props){
				//构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
				// console.log(props);
				super(props)
				console.log('constructor',this.props);
			}

			//对标签属性进行类型、必要性的限制
			static propTypes = {
				name:PropTypes.string.isRequired, //限制name必传，且为字符串
				sex:PropTypes.string,//限制sex为字符串
				age:PropTypes.number,//限制age为数值
			}

			//指定默认标签属性值
			static defaultProps = {
				sex:'男',//sex默认值为男
				age:18 //age默认值为18
			}
			
			render(){
				// console.log(this);
				const {name,age,sex} = this.props
				//props是只读的
				//this.props.name = 'jack' //此行代码会报错，因为props是只读的
				return (
					<ul>
						<li>姓名：{name}</li>
						<li>性别：{sex}</li>
						<li>年龄：{age+1}</li>
					</ul>
				)
			}
		}

		//渲染组件到页面
		ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
	</script>
```

#### 函数式组件只能使用三大属性的props

```javascript
<script type="text/babel">
		//创建组件
		function Person (props){
			const {name,age,sex} = props
			return (
					<ul>
						<li>姓名：{name}</li>
						<li>性别：{sex}</li>
						<li>年龄：{age}</li>
					</ul>
				)
		}
		Person.propTypes = {
			name:PropTypes.string.isRequired, //限制name必传，且为字符串
			sex:PropTypes.string,//限制sex为字符串
			age:PropTypes.number,//限制age为数值
		}

		//指定默认标签属性值
		Person.defaultProps = {
			sex:'男',//sex默认值为男
			age:18 //age默认值为18
		}
		//渲染组件到页面
		ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
	</script>
```

### refs

> 组件内的标签可以定义ref属性来标识自己
>
> ==相当于id，标志一下==

#### 字符串ref案例

1. 点击按钮, 提示第一个输入框中的值

2. 当第2个输入框失去焦点时, 提示这个输入框中的值

```javascript
<script type="text/babel">
		//创建组件
		class Demo extends React.Component{
			//展示左侧输入框的数据
			showData = ()=>{
				const {input1} = this.refs
				alert(input1.value)
			}
			//展示右侧输入框的数据
			showData2 = ()=>{
				const {input2} = this.refs
				alert(input2.value)
			}
			render(){
				return(
					<div>
                    ////回调函数：自己创建的，自己没调用，别人调用了。()为收到的参数，这里的参数就是<input type="text" placeholder="点击按钮提示数据"/>这个标签节点
						<input ref="input1" type="text" placeholder="点击按钮提示数据"/>&nbsp;
						<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
						<input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
					</div>
				)
			}
		}
		//渲染组件到页面
		ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
	</script>
```

==上述是字符串形式的ref，用多了会降低效率==

#### 内敛ref案列

```javascript
	<script type="text/babel">
		//创建组件
		class Demo extends React.Component{
			//展示左侧输入框的数据
			showData = ()=>{
				const {input1} = this
				alert(input1.value)
			}
			//展示右侧输入框的数据
			showData2 = ()=>{
				const {input2} = this
				alert(input2.value)
			}
			render(){
				return(
					<div>
						//回调函数：自己创建的，自己没调用，别人调用了。()为收到的参数，这里的参数就是<input type="text" placeholder="点击按钮提示数据"/>这个标签节点
						<input ref={c => this.input1 = c } type="text" placeholder="点击按钮提示数据"/>&nbsp;
						<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
						<input onBlur={this.showData2} ref={c => this.input2 = c } type="text" placeholder="失去焦点提示数据"/>&nbsp;
					</div>
				)
			}
		}
		//渲染组件到页面
		ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
	</script>
```

#### createRef案例

```javascript
<script type="text/babel">
		//创建组件
		class Demo extends React.Component{
			/* 
				React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
			 */
			myRef = React.createRef()
			myRef2 = React.createRef()
			//展示左侧输入框的数据
			showData = ()=>{
				alert(this.myRef.current.value);
			}
			//展示右侧输入框的数据
			showData2 = ()=>{
				alert(this.myRef2.current.value);
			}
			render(){
				return(
					<div>
						<input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
						<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
						<input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
					</div>
				)
			}
		}
		//渲染组件到页面
		ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
	</script>
```

### 事件处理

> 1. 通过onXxx属性指定事件处理函数(注意大小写)
>
>       1) React使用的是自定义(合成)事件, 而不是使用的原生DOM事件
>
>       2) React中的事件是通过事件委托方式处理的(委托给组件最外层的元素)
>
> 2. 通过event.target得到发生事件的DOM元素对象

```javascript
<script type="text/babel">
		//创建组件
		class Demo extends React.Component{
			/* 
				(1).通过onXxx属性指定事件处理函数(注意大小写)
						a.React使用的是自定义(合成)事件, 而不是使用的原生DOM事件 —————— 为了更好的兼容性
						b.React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ————————为了的高效
				(2).通过event.target得到发生事件的DOM元素对象 ——————————不要过度使用ref
			 */
			//创建ref容器
			myRef = React.createRef()
			myRef2 = React.createRef()

			//展示左侧输入框的数据
			showData = (event)=>{
				console.log(event.target);
				alert(this.myRef.current.value);
			}

			//展示右侧输入框的数据-发生事件的元素正好是要操作的元素可以不用ref
			showData2 = (event)=>{
				alert(event.target.value);
			}

			render(){
				return(
					<div>
						<input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
						<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
						<input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
					</div>
				)
			}
		}
		//渲染组件到页面
		ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
	</script>
```

## 表单

表单中组件的分类

### 非受控组件

```javascript
<script type="text/babel">
		//创建组件
		//非受控组件：表单中输入类Dom值，现用现取(const {username,password} = this)，都是非受控组件
		class Login extends React.Component{
			handleSubmit = (event)=>{
				event.preventDefault() //阻止表单提交
				const {username,password} = this
				alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
			}
			render(){
				return(
					<form onSubmit={this.handleSubmit}>
						用户名：<input ref={c => this.username = c} type="text" name="username"/>
						密码：<input ref={c => this.password = c} type="password" name="password"/>
						<button>登录</button>
					</form>
				)
			}
		}
		//渲染组件
		ReactDOM.render(<Login/>,document.getElementById('test'))
	</script>
```

### 受控组件

```javascript
<script type="text/babel">
		//创建组件
		//受控组件：页面中输入类的DOM，全部输入到state里面
		class Login extends React.Component{

			//初始化状态
			state = {
				username:'', //用户名
				password:'' //密码
			}

			//保存用户名到状态中
			saveUsername = (event)=>{
				this.setState({username:event.target.value})
			}

			//保存密码到状态中
			savePassword = (event)=>{
				this.setState({password:event.target.value})
			}

			//表单提交的回调
			handleSubmit = (event)=>{
				event.preventDefault() //阻止表单提交
				const {username,password} = this.state
				alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
			}

			render(){
				return(
					<form onSubmit={this.handleSubmit}>
						用户名：<input onChange={this.saveUsername} type="text" name="username"/>
						密码：<input onChange={this.savePassword} type="password" name="password"/>
						<button>登录</button>
					</form>
				)
			}
		}
		//渲染组件
		ReactDOM.render(<Login/>,document.getElementById('test'))
	</script>
```

## 函数颗粒化

将受控组件例子中的savePassword和saveUsername合并为一个。

```javascript
<script type="text/babel">
		//#region 
				/* 
					高阶函数：如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数。
									1.若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数。
									2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数。
									常见的高阶函数有：Promise、setTimeout、arr.map()等等

					函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。 
						function sum(a){
							return(b)=>{
								return (c)=>{
									return a+b+c
								}
							}
						}
					*/
		//#endregion
		//创建组件
		class Login extends React.Component{
			//初始化状态
			state = {
				username:'', //用户名
				password:'' //密码
			}

				//保存表单数据到状态中
			//返回了一个函数，这个函数才是onChange的回调
			saveFormData = (dataType)=>{
				return (event)=>{
					this.setState({[dataType]:event.target.value})
				}
			}

			//表单提交的回调
			handleSubmit = (event)=>{
				event.preventDefault() //阻止表单提交
				const {username,password} = this.state
				alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
			}
            //this.saveFormData是将改函数作为onChange的回调，
			//this.saveFormData('username')是将改函数的返回值作为回调，所以其必须有返回值，且返回值必须是函数。
			render(){
				return(
					<form onSubmit={this.handleSubmit}>
						用户名：<input onChange={this.saveFormData('username')} type="text" name="username"/>
						密码：<input onChange={this.saveFormData('password')} type="password" name="password"/>
						<button>登录</button>
					</form>
				)
			}
		}
		//渲染组件
		ReactDOM.render(<Login/>,document.getElementById('test'))
	</script>
```

**不用高阶函数也是可以实现上述功能**：

```javascript
<script type="text/babel">
		//创建组件
		class Login extends React.Component{
			//初始化状态
			state = {
				username:'', //用户名
				password:'' //密码
			}

			//保存表单数据到状态中
			saveFormData = (dataType,event)=>{
				this.setState({[dataType]:event.target.value})
			}

			//表单提交的回调
			handleSubmit = (event)=>{
				event.preventDefault() //阻止表单提交
				const {username,password} = this.state
				alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
			}
			//onChange需要一个函数，直接用箭头函数传入，event就是发生onChange事件，event.target得到发生事件的DOM元素对象
			render(){
				return(
					<form onSubmit={this.handleSubmit}>
						用户名：<input onChange={event => this.saveFormData('username',event) } type="text" name="username"/>
						密码：<input onChange={event => this.saveFormData('password',event) } type="password" name="password"/>
						<button>登录</button>
					</form>
				)
			}
		}
		//渲染组件
		ReactDOM.render(<Login/>,document.getElementById('test'))
	</script>
```

## 组件的生命周期

### 案例

>  **1.** **让指定的文本做显示** **/** **隐藏的渐变动画**
>
>  **2.** **从完全可见，到彻底消失，耗时**2S
>
>  **3.** **点击“不活了”按钮从界面中卸载组件**

```javascript
<script type="text/babel">
		//创建组件
		//生命周期回调函数 <=> 生命周期钩子函数 <=> 生命周期函数 <=> 生命周期钩子
		class Life extends React.Component{

			state = {opacity:1}

			death = ()=>{
				//卸载组件
				ReactDOM.unmountComponentAtNode(document.getElementById('test'))
			}

			//组件挂完毕
			componentDidMount(){
				console.log('componentDidMount');
				this.timer = setInterval(() => {
					//获取原状态
					let {opacity} = this.state
					//减小0.1
					opacity -= 0.1
					if(opacity <= 0) opacity = 1
					//设置新的透明度
					this.setState({opacity})
				}, 200);
			}

			//组件将要卸载
			componentWillUnmount(){
				//清除定时器
				clearInterval(this.timer)
			}

			//初始化渲染、状态更新之后
			render(){
				console.log('render');
				return(
					<div>
						<h2 style={{opacity:this.state.opacity}}>React学不会怎么办？</h2>
						<button onClick={this.death}>不活了</button>
					</div>
				)
			}
		}
		//渲染组件
		ReactDOM.render(<Life/>,document.getElementById('test'))
	</script>
```

### 生命周期的理解

> 1. 组件从创建到死亡它会经历一些特定的阶段。
>
> 2. React组件中包含一系列勾子函数(生命周期回调函数), 会在特定的时刻调用。
>
> 3. 我们在定义组件时，会在特定的生命周期回调函数中，做特定的工作。

### 旧的生命周期

![图片1](D:\SoftWare\Typora\Content\React\图片1.png)

> **初始化阶段**:由ReactDOM.render()触发---初次渲染
>
> 1. constructor()
>
> 2. componentWillMount()
>
> 3. render()
>
> 4. componentDidMount()----常用，一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
>
>  **更新阶段**：由组件内部this.setSate()或父组件重新render触发
>
> 1. shouldComponentUpdate()---默认返回true，除非自定义了返回逻辑。
>
> 2. componentWillUpdate()
>
> 3. render()
>
> 4. componentDidUpdate()
>
> **卸载**：unmountComponentAtNode()触发
>
> 1. componentWillUnmount()-----常用，做一些收尾的事情，例如：关闭定时器、取消订阅消息
>
> **强制更新**：foreUpdate()
>
> 1. componentWillUpdate()
> 2. render()
> 3. componentDidUpdate()
>
> **父组件render，子组件接收后**
>
> 1. componentWillReceiveProps
> 2. shouldComponentUpdate()---默认返回true，除非自定义了返回逻辑。
> 3. componentWillUpdate()
> 4. render()
> 5. componentDidUpdate()

```javascript
<script type="text/babel">
		/* 
				1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
									1.	constructor()
									2.	componentWillMount()
									3.	render()
									4.	componentDidMount() =====> 常用
													一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
				2. 更新阶段: 由组件内部this.setSate()或父组件render触发
									1.	shouldComponentUpdate()
									2.	componentWillUpdate()
									3.	render() =====> 必须使用的一个
									4.	componentDidUpdate()
				3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
									1.	componentWillUnmount()  =====> 常用
													一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
		*/
		//创建组件
		class Count extends React.Component{
			//构造器
			constructor(props){
				console.log('Count---constructor');
				super(props)
				//初始化状态
				this.state = {count:0}
			}
			//加1按钮的回调
			add = ()=>{
				//获取原状态
				const {count} = this.state
				//更新状态
				this.setState({count:count+1})
			}
			//卸载组件按钮的回调
			death = ()=>{
				ReactDOM.unmountComponentAtNode(document.getElementById('test'))
			}
			//强制更新按钮的回调
			force = ()=>{
				this.forceUpdate()
			}
			//组件将要挂载的钩子
			componentWillMount(){
				console.log('Count---componentWillMount');
			}
			//组件挂载完毕的钩子
			componentDidMount(){
				console.log('Count---componentDidMount');
			}
			//组件将要卸载的钩子
			componentWillUnmount(){
				console.log('Count---componentWillUnmount');
			}
			//控制组件更新的“阀门”
			shouldComponentUpdate(){
				console.log('Count---shouldComponentUpdate');
				return true
			}
			//组件将要更新的钩子
			componentWillUpdate(){
				console.log('Count---componentWillUpdate');
			}
			//组件更新完毕的钩子
			componentDidUpdate(){
				console.log('Count---componentDidUpdate');
			}

			render(){
				console.log('Count---render');
				const {count} = this.state
				return(
					<div>
						<h2>当前求和为：{count}</h2>
						<button onClick={this.add}>点我+1</button>
						<button onClick={this.death}>卸载组件</button>
						<button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
					</div>
				)
			}
		}
		
		//父组件A
		class A extends React.Component{
			//初始化状态
			state = {carName:'奔驰'}

			changeCar = ()=>{
				this.setState({carName:'奥拓'})
			}

			render(){
				return(
					<div>
						<div>我是A组件</div>
						<button onClick={this.changeCar}>换车</button>
						<B carName={this.state.carName}/>
					</div>
				)
			}
		}
		
		//子组件B
		class B extends React.Component{
			//组件将要接收新的props的钩子--第一次传递的props不算
			componentWillReceiveProps(props){
				console.log('B---componentWillReceiveProps',props);
			}
			//控制组件更新的“阀门”
			shouldComponentUpdate(){
				console.log('B---shouldComponentUpdate');
				return true
			}
			//组件将要更新的钩子
			componentWillUpdate(){
				console.log('B---componentWillUpdate');
			}
			//组件更新完毕的钩子
			componentDidUpdate(){
				console.log('B---componentDidUpdate');
			}
			render(){
				console.log('B---render');
				return(
					<div>我是B组件，接收到的车是:{this.props.carName}</div>
				)
			}
		}
		//渲染组件
		ReactDOM.render(<Count/>,document.getElementById('test'))
	</script>
```

### 新的生命周期

![图片2](D:\SoftWare\Typora\Content\React\图片2.png)

> 新的生命周期废弃了三个：componentWillUnmount、componentWillUpdate和componentWillReceiveProps
>
> 新增了两个：getDerivedStateFromProps和getSnapshotBeforeUpdate

```javascript
<script type="text/babel">
		//创建组件
		class Count extends React.Component{
			/* 
				1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
								1.	constructor()
								2.	getDerivedStateFromProps 
								3.	render()
								4.	componentDidMount() =====> 常用
											一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
				2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
								1.	getDerivedStateFromProps
								2.	shouldComponentUpdate()
								3.	render()
								4.	getSnapshotBeforeUpdate
								5.	componentDidUpdate()
				3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
								1.	componentWillUnmount()  =====> 常用
											一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
			*/
			//构造器
			constructor(props){
				console.log('Count---constructor');
				super(props)
				//初始化状态
				this.state = {count:0}
			}

			//加1按钮的回调
			add = ()=>{
				//获取原状态
				const {count} = this.state
				//更新状态
				this.setState({count:count+1})
			}

			//卸载组件按钮的回调
			death = ()=>{
				ReactDOM.unmountComponentAtNode(document.getElementById('test'))
			}

			//强制更新按钮的回调
			force = ()=>{
				this.forceUpdate()
			}
			
			//若state的值在任何时候都取决于props，那么可以使用getDerivedStateFromProps
			static getDerivedStateFromProps(props,state){
				console.log('getDerivedStateFromProps',props,state);
				return null
			}

			//在更新之前获取快照
			getSnapshotBeforeUpdate(){
				console.log('getSnapshotBeforeUpdate');
				return 'atguigu'
			}

			//组件挂载完毕的钩子
			componentDidMount(){
				console.log('Count---componentDidMount');
			}

			//组件将要卸载的钩子
			componentWillUnmount(){
				console.log('Count---componentWillUnmount');
			}

			//控制组件更新的“阀门”
			shouldComponentUpdate(){
				console.log('Count---shouldComponentUpdate');
				return true
			}

			//组件更新完毕的钩子
			componentDidUpdate(preProps,preState,snapshotValue){
				console.log('Count---componentDidUpdate',preProps,preState,snapshotValue);
			}
			
			render(){
				console.log('Count---render');
				const {count} = this.state
				return(
					<div>
						<h2>当前求和为：{count}</h2>
						<button onClick={this.add}>点我+1</button>
						<button onClick={this.death}>卸载组件</button>
						<button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
					</div>
				)
			}
		}
		
		//渲染组件
		ReactDOM.render(<Count count={19}/>,document.getElementById('test'))
	</script>
```

#### getSnapshotBeforeUpdate案例

内容区新闻不断刷新，但是我所观看的新闻不要一直刷动。

```javascript
<script type="text/babel">
		class NewsList extends React.Component{

			state = {newsArr:[]}

			componentDidMount(){
				setInterval(() => {
					//获取原状态
					const {newsArr} = this.state
					//模拟一条新闻
					const news = '新闻'+ (newsArr.length+1)
					//更新状态
					this.setState({newsArr:[news,...newsArr]})
				}, 1000);
			}

			getSnapshotBeforeUpdate(){
				//增加新闻之前新闻区的的高度
				return this.refs.list.scrollHeight
			}

			componentDidUpdate(preProps,preState,height){
				//增加之后的新闻区往上窜多少 =现在的新闻区高度-之前的高度(但是新闻是不断增加的，所以窜的高度是不断增加的)
				this.refs.list.scrollTop += this.refs.list.scrollHeight - height
			}

			render(){
				return(
					<div className="list" ref="list">
						{
							this.state.newsArr.map((n,index)=>{
								return <div key={index} className="news">{n}</div>
							})
						}
					</div>
				)
			}
		}
		ReactDOM.render(<NewsList/>,document.getElementById('test'))
	</script>
```

# Diffing算法

## 经典面试题:

​      1). react/vue中的key有什么作用？（key的内部原理是什么？）
​      2). 为什么遍历列表时，key最好不要用index?

> 			1. 虚拟DOM中key的作用：
> 					1). 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。
> 	
> 					2). 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】, 
> 												随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：
> 		
> 									a. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
> 												(1).若虚拟DOM中内容没变, 直接使用之前的真实DOM
> 												(2).若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
> 													（key一样，内容不一样，若里面还有元素，则会进去再去对比，如果一样，则复用。比如input框）
> 		
> 									b. 旧虚拟DOM中未找到与新虚拟DOM相同的key
> 												根据数据创建新的真实DOM，随后渲染到到页面
> 									
> 			2. 用index作为key可能会引发的问题：
> 								1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
> 												会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
> 		
> 								2. 如果结构中还包含输入类的DOM：
> 												会产生错误DOM更新 ==> 界面有问题。
> 												
> 								3. 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，
> 									仅用于渲染列表用于展示，使用index作为key是没有问题的。
> 					
> 			3. 开发中如何选择key?:
> 								1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
> 								2.如果确定只是简单的展示数据，用index也是可以的。
> 
> 	
> 		慢动作回放----使用index索引值作为key
> 		
> 			初始数据：
> 					{id:1,name:'小张',age:18},
> 					{id:2,name:'小李',age:19},
> 			初始的虚拟DOM：
> 					<li key=0>小张---18<input type="text"/></li>
> 					<li key=1>小李---19<input type="text"/></li>
> 		
> 			更新后的数据：
> 					{id:3,name:'小王',age:20},
> 					{id:1,name:'小张',age:18},
> 					{id:2,name:'小李',age:19},
> 			更新数据后的虚拟DOM：
> 					<li key=0>小王---20<input type="text"/></li>
> 					<li key=1>小张---18<input type="text"/></li>
> 					<li key=2>小李---19<input type="text"/></li>
> 	
> 	-----------------------------------------------------------------
> 	
> 	慢动作回放----使用id唯一标识作为key
> 	
> 			初始数据：
> 					{id:1,name:'小张',age:18},
> 					{id:2,name:'小李',age:19},
> 			初始的虚拟DOM：
> 					<li key=1>小张---18<input type="text"/></li>
> 					<li key=2>小李---19<input type="text"/></li>
> 		
> 			更新后的数据：
> 					{id:3,name:'小王',age:20},
> 					{id:1,name:'小张',age:18},
> 					{id:2,name:'小李',age:19},
> 			更新数据后的虚拟DOM：
> 					<li key=3>小王---20<input type="text"/></li>
> 					<li key=1>小张---18<input type="text"/></li>
> 					<li key=2>小李---19<input type="text"/></li>
>

## 实例

```javascript
<script type="text/babel">
	
	class Person extends React.Component{

		state = {
			persons:[
				{id:1,name:'小张',age:18},
				{id:2,name:'小李',age:19},
			]
		}

		add = ()=>{
			const {persons} = this.state
			const p = {id:persons.length+1,name:'小王',age:20}
			this.setState({persons:[p,...persons]})
		}

		render(){
			return (
				<div>
					<h2>展示人员信息</h2>
					<button onClick={this.add}>添加一个小王</button>
					<h3>使用index（索引值）作为key</h3>
					<ul>
						{
							this.state.persons.map((personObj,index)=>{
								return <li key={index}>{personObj.name}---{personObj.age}<input type="text"/></li>
							})
						}
					</ul>
					<hr/>
					<hr/>
					<h3>使用id（数据的唯一标识）作为key</h3>
					<ul>
						{
							this.state.persons.map((personObj)=>{
								return <li key={personObj.id}>{personObj.name}---{personObj.age}<input type="text"/></li>
							})
						}
					</ul>
				</div>
			)
		}
	}

	ReactDOM.render(<Person/>,document.getElementById('test'))
</script>
```

