/* 
	该文件专门为Count组件生成action对象
*/
import {INCREMENT,DECREMENT} from './constant'
/**
 * 函数的简写：
 * 相当于
 * function createIncrementAction(data){
 * 			return {type:INCREMENT,data}
 * }
 * 不能写成：data=>{type:INCREMENT,data},这样会把大括号里的当作函数体，并不会当作返回值
 * 可以data=>{return {type:INCREMENT,data}} 或者下面那样写
 */
export const createIncrementAction = data => ({type:INCREMENT,data})
export const createDecrementAction = data => ({type:DECREMENT,data})
