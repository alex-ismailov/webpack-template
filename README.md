![webpack-logo](https://github.com/alex-ismailov/git-imgs/blob/master/webpack-logo-60x68.png)
# Настройка Webpack 4 

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
    filename: '[name].js'
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist', // необх. для коррект. работы devServer
  },
  module: {
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
* [filename: '[name].js' // про []](https://youtu.be/JcKRovPhGo8?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=858)
* [path: path.resolve(__dirname, './dist')](https://youtu.be/JcKRovPhGo8?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=936)
* [настройка babel](https://youtu.be/JcKRovPhGo8?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=1436)

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

### [2 лекция](https://www.youtube.com/watch?v=qqTIqwQX8nc&list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&index=2) - Полная настройка Webpack 4 препроцессоров. Sass, настройка post css плагинов, минификация стилей.

#### Подключение css и scss

`mkdir ./src/css ./src/scss`

`touch ./src/css/main.css ./src/scss/main.scss`

подключаем стили в `./src/index.js`

`import './css/main.css';`

подключаем css-loader для отделения js от css ([got to video](https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=151))

`npm i mini-css-extract-plugin --save-dev`

указываем в `webpack.config.js` в разделе `module`:

```
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

...
module: {
  rules: [{
    ...
  }, {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
    ],
  }],
},
...
```

далее регистрируем плагин указываем в `webpack.config.js` в разделе `plugins` ([go to video](https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=308)):

```
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
```
затем

`npm i --save-dev css-loader style-loader`

в ./index.html добавляем

`<link rel="stylesheet" href="/dist/app.css">`

Обработка scss ([got to video](https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=456))

module: {
    rules: [{
      ...
    }, {
      test: /\.scss$/,
      use: [
        "style-loader",
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: { sourceMap: true },
        }, {
          loader: "sass-loader",
          options: { sourceMap: true },
        }
      ],
    }, {
    ...
  },

далле 

`npm i --save-dev sass-loader node-sass`

в ./src/index.js подключаем

post css плагины (go to video)[https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=641] на примере autoprefixer

[PostCSS](https://github.com/postcss/postcss)

touch ./postcss.config.js

указываем в postcss.config.js

```
module.exports = {
  plugins: [
      require('autoprefixer'),
      require('css-mqpacker'), //группирует все media запросы в складыает их рядом в app.css
      require('cssnano')({ // минификация
          preset: [
              'default', {
                  discardComments: {
                      removeAll: true,
                  },
              },
          ],
      })
  ],
};
```

Подключение autoprefixer (go to video)[https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=790]
в `package.json` добавл.
```
...
"browserslist": [
    "> 1%",
    "last 3 version"
  ],
...
```

ставим плагины

`npm i --save-dev postcss-loader autoprefixer css-mqpacker cssnano`

передаем в webpack.config.js postcss-loader

```
module: {
    ...
    }, {
      test: /\.scss$/,
      use: [
        "style-loader",
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: { sourceMap: true },
        }, {
          loader: "postcss-loader",
          options: { sourceMap: true, config: { path: "./postcss.config.js" } },
        }, {
          loader: "sass-loader",
          options: { sourceMap: true },
        }
      ],
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: { sourceMap: true },
        }, {
          loader: "postcss-loader",
          options: { sourceMap: true, config: { path: "./postcss.config.js" } },
        },
      ],
    }],
  },
  ...
```

