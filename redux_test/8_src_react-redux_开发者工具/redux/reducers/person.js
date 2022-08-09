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
