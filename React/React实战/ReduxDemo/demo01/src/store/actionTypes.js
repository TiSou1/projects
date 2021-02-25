 const CHANGE_INPUT = 'change_input_value';
 const ADD_ITEM = 'add_input_value';
 const DELETE_ITEM = 'delete_item';
 const GET_LIST = 'get_list';
 const GET_MY_LIST = 'getMyList';
 export {GET_MY_LIST,CHANGE_INPUT,ADD_ITEM,DELETE_ITEM,GET_LIST};
/*如果模块只有一个输出值，就使用`export default`，如果模块有多个输出值，
就不使用`export default`，`export default`与普通的`export`不要同时使用。
.通过export方式导出，在导入时要加{ }， 这种形式，叫做【按需导出】export default则不需要
在一个文件或模块中，export、import可以有多个，export default仅有一个
*/