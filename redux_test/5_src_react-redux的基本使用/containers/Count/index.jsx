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
	因为在APP.jsx中已经引入了store，所以在容器组件不需要引入了。
	因为此函数是react-redux调用的，store.getstate()的状态已经被传递到该函数入参state中了。下面mapDispatchToProps操作状态的方法同理，
	将dispatch传递给了mapDispatchToProps函数
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
//前两个参数必须为函数，因为容器组件没法通过<CountUI key={1}>这样的形式传递props传递给UI组件，所以react-redux选择使用两个函数的形式传递参数
export default connect(mapStateToProps,mapDispatchToProps)(CountUI)

