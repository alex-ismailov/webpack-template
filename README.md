# ![react-redux logo](https://github.com/alex-ismailov/git-imgs/blob/master/webpack-logo.png) 4

По курсу от [Jack Coder](https://www.youtube.com/channel/UCDtQ4kJos22sCdYtNDB_4Cg) [Настройка Webpack 4](https://www.youtube.com/watch?v=JcKRovPhGo8&list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV)

### [1 лекция](https://www.youtube.com/watch?v=JcKRovPhGo8&list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV) - Настройка Webpack 4 шаблона. Установка Babel 7 и webpack dev server. Настройка js на примере vue

`npm init`

`npm i webpack webpack-cli webpack-dev-server path --save-dev`

#### Настройки webpack

`touch webpack.config.js`

Прописываем в `webpack.config.js`:
```
module.exports = {
  entry: { // Стандартная точка входа
    app: './src/index.js'
  },
  output : {
    filename: '[name].js' // про [] см. https://youtu.be/JcKRovPhGo8?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=858
    path: path.resolve(__dirname, './dist'), // https://youtu.be/JcKRovPhGo8?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=936
    publicPath: '/dist', // необх. для коррект. работы devServer
  },
  module: { // настройка babel https://youtu.be/JcKRovPhGo8?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=1436
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node-modules/',
    }],
  },
  devServer: {
    overlay: true, // выводим errors в браузер
  }
};
```
Далее

`touch index.html`

в `index.html` подключаем

`<script src="./dist/app.js"></script>`

#### Настройка babel

`npm i @babel/core @babel/preset-env babel-loader --save-dev`

// ./webpack.config.js ([go to video](https://youtu.be/JcKRovPhGo8?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=1436))
```
module: { //
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node-modules/',
    }],
  },
```
#### Подключение сторонних js файлов (на примере Vue)
[Подключение Vue](https://youtu.be/JcKRovPhGo8?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=1758)

`npm i vue`

импортируем в `./src/index.js`
```
// import 'vue'; // способ 1
// import Vue from 'vue'; // способ 2
window.Vue = require('vue'); // способ 3, считается наиболле приавильным.
```
