## React-Demo

### 细节
- jsx代码使用括号(), js代码使用花括号{};
- container 尽量不写ui代码, 应该作为获取数据和处理业务逻辑的父级容器,并传输数据给自己组件;
- component 尽量不写业务逻辑和只显示ui, 数据通过父级的传输参数获取
- redux类似vuex,一样可以分离数据模块, 也有类似mutation(reducer), mutation-types(action-types), actions, state, 通过combineReducers组合起来
- 合并后的state的模块以合并时的属性值为准
- reducer中state和action通过mapStateProp和mapDispatch
- component是UI组件，数据通过container组件获取，页面通过container组件组成形成最终的整个路由页面
- 路由component只能接受render出来的组件，直接返回报错
- store在store入口文件输出比较稳妥，在路由再生成实例就意义上无法更稳妥使用store.dispath

### webpack `devtool: 'source-map'`打开，可以方便调试。
