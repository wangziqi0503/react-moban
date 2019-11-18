![](./static/react.jpg)

# 基于React的项目初始化代码

## 项目开发环境基于以下

React 16.12  
Redux 4.0.4  
immutable 4.0.0  
react-inmutable 4.0.0  
React-Router 5.1.2  
Babel 7.7.2  
Babel-loader 8.0.6  

webpack 4.41.2  
webpack-cli 3.3.10  


### 项目初始化

npm i  
npm run start



### webpack

```json
"scripts": {
    "build": "cross-env NODE_ENV='production' webpack --config build/webpack.prod.config.js --mode production",
    "dev": "cross-env NODE_ENV='development' webpack-dev-server --open --config build/webpack.dev.config.js --mode development",
    "dll": "webpack --config build/webpack.dll.config.js --mode production",
    "start": "npm run dll && npm run dev",
    "prod": "npm run dll && npm run build"
}
```


### 详细配置文件目录

"@babel/core": "^7.7.2",  
"@babel/plugin-proposal-object-rest-spread": "^7.6.2", //使对象支持spread操作符  
"@babel/plugin-transform-runtime": "^7.6.2",  
"@babel/preset-env": "^7.7.1",  
"@babel/preset-react": "^7.7.0",  
"@babel/runtime": "^7.7.2",  
"autoprefixer": "^9.7.1",  
"axios": "^0.19.0",  
"babel-loader": "^8.0.6",  
"chalk": "^3.0.0",  
"clean-webpack-plugin": "^3.0.0",  
"copy-webpack-plugin": "^5.0.5",  
"cross-env": "^6.0.3",  
"css-loader": "^3.2.0",  
"file-loader": "^4.2.0",  
"html-webpack-plugin": "^3.2.0",  
"http-proxy-middleware": "^0.20.0",  
"immutable": "^4.0.0-rc.12",  
"less": "^3.10.3",  
"less-loader": "^5.0.0",  
"mini-css-extract-plugin": "^0.8.0", //用于打包时单独提取css文件  
"node-sass": "^4.13.0",  
"optimize-css-assets-webpack-plugin": "^5.0.3", //css压缩工具  
"postcss-loader": "^3.0.0",  
"progress-bar-webpack-plugin": "^1.12.1",  
"react-loadable": "^5.5.0",  
"react-redux": "^7.1.3",  
"react-router-dom": "^5.1.2",  
"react-scripts": "^3.2.0",  
"react-transition-group": "^4.3.0", //react动画插件  
"redux": "^4.0.4",  
"redux-immutable": "^4.0.0",  
"redux-thunk": "^2.3.0", //redux中间件，使action支持返回函数  
"sass-loader": "^8.0.0",  
"style-loader": "^1.0.0",  
"styled-components": "^4.4.1", // css in js  
"url-loader": "^2.2.0",  
"webpack": "^4.41.2",  
"webpack-cli": "^3.3.10",  
"webpack-command": "^0.5.0",  
"webpack-dev-server": "^3.9.0",  
"webpack-merge": "^4.2.2",  
"webpack-parallel-uglify-plugin": "^1.1.2" //加速打包工具,用于JS的treeshaking  

@babel/runtime和@babel/plugin-transform-runtime：babel 编译时只转换语法，几乎可以编译所有时新的 JavaScript 语法，但并不会转化BOM（浏览器）里面不兼容的API。比如 Promise,Set,Symbol,Array.from,async 等等的一些API。这2个包就是来搞定这些api的