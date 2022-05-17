const { override, fixBabelImports, addWebpackAlias, adjustStyleLoaders } = require("customize-cra")
const path = require("path");

module.exports = override(
  //按需加载antd
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css', // true是less，如果不用less style的值可以写'css' 
  }),
  //引入插件写相关配置
  addWebpackAlias({
    '@': path.resolve(__dirname, './src')
  }),
  adjustStyleLoaders(rule => {
    if (rule.test.toString().includes('scss')) {
      rule.use.push({
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: [
            './src/assets/css/reset.css',
            './src/assets/css/global.scss'
          ]
        }
      });
    }
  }),
  (config) => {
    config.entry = {
      "static/bundle": ["./src/renderer/index.tsx"],
      "main": ["./electron/main.ts"]
    }
    config.output = {
      filename: "[name].js",
      path: __dirname + "/build"
    }
    // 为了方便使用 electron 以及 node.js 相关的 api
    // 需要将 target 设置为 electron-renderer
    // 设置了 target 之后，原生浏览器的环境将无法运行此 react 项目(因为不支持 node.js 相关的 api)，会抛出 Uncaught ReferenceError: require is not defined 异常
    // 需要在 electron 的环境才能运行(因为支持 node.js 相关的 api)
    // 这一步的操作, 都是为了能与 electron 进行更好的集成
    config.target = 'electron-renderer';
    return config;
  }
)
