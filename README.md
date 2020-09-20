![webpack-logo](https://github.com/alex-ismailov/git-imgs/blob/master/webpack-logo-60x68.png)
# Настройка Webpack 4 

По курсу от [Jack Coder](https://www.youtube.com/channel/UCDtQ4kJos22sCdYtNDB_4Cg) [Настройка Webpack 4](https://www.youtube.com/watch?v=JcKRovPhGo8&list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV)

#### Оглавление
* [1 лекция](#lecture-1)
* [2 лекция](#lecture-2)


### [1 лекция](https://www.youtube.com/watch?v=JcKRovPhGo8&list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV) <a name="lecture-1"></a> - Настройка Webpack 4 шаблона. Установка Babel 7 и webpack dev server. Настройка js на примере vue

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

* [filename: '[name].js' // про [] ](https://youtu.be/JcKRovPhGo8?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=858)
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

### [2 лекция](https://www.youtube.com/watch?v=qqTIqwQX8nc&list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&index=2) <a name="lecture-2"></a> - Полная настройка Webpack 4 препроцессоров. Sass, настройка post css плагинов, минификация стилей.

В этом уроке будем работать с препроцессорами.

#### Подключение css и scss

`mkdir ./src/css ./src/scss`

`touch ./src/css/main.css ./src/scss/main.scss`

подключаем стили в `./src/index.js`

`import './css/main.css';`

Для что бы webpack в дальнейшем поместил код css из `./src/main.css` в отдельный файл `dist/app.css`, его необходимо отделить от js кода при помощи css-loader, для этого установим плагин mini-css-extract-plugin ([got to video](https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=151)):

`npm i mini-css-extract-plugin --save-dev`

*как альтернатива есть еще css-extract-plugin, но 1й вариант предпочтительнее, так как mini создан под 4 webpack*.

Затем в `webpack.config.js` подключаем обработчик css, для этого импортируем `MiniCssExtractPlugin` и в разделе `module` настраиваем `rules` для стилей:

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
*текущий [name].js|css|и т.д. ссылается на ярлык app из entry point*

затем установим пакеты, для обработки css кода:

`npm i --save-dev css-loader style-loader`

в `./index.html` добавляем

`<link rel="stylesheet" href="/dist/app.css">`

внесем что-нибудь в `./scr/main.css`:
```
.wrapper {
    display: flex;
}
```

далее `npm rub build`

теперь наш код разделяется на `.css` и `.js` файлы, и в папке `./dist` теперь два файла `app.js` и `app.css`

##### Обработка scss ([got to video](https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=456))

В массив use лучше передавать объекты, так как в объектах помимо названия loader(a) с ним можно передать конфиг в `options`
```
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
```

далее 

`npm i --save-dev sass-loader node-sass`

Укажем что-нибудь в `src/main.scss`:

```
.wrapper {
    h1 {
        color: blue;
    }
}
```

Далее в `./src/index.js` подключаем scss

`import './scss/main.scss';`

Теперь build еще подтянет стили scss в `./dist/app.css`

`npm rub build`

##### autoprefixer

Далее разберемся с postCss плагинами на примере `autoprefixer` ([go to video](https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=641))

[PostCSS on github](https://github.com/postcss/postcss)

Для того чтобы было удобно подключать PostCss плагины созадим отдельный конфиг для postCss `./postcss.config.js`

`touch ./postcss.config.js`

указываем в `postcss.config.js`

```
module.exports = {
  plugins: [
      require('autoprefixer'),
      require('css-mqpacker'), //группирует все media запросы в складыает их рядом в app.css
      require('cssnano')({ // минификация
          preset: [
              'default', {
                  discardComments: { // удаляет комменты с продакшена
                      removeAll: true,
                  },
              },
          ],
      })
  ],
};
```

Далее настроим `autoprefixer` через `package.json`, если мы не знаем что именно писать, то можно взять настройки от автора: ([go to video](https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=790))

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

!!! *postcss.config.js правильнее положить в корень, на уровне с остальными конфигами.
В таком случае он сам определяется, его не нужно подключать в webpack.config.js*
!!!

Затем в `webpack.config.js` передаем postcss-loader в scss и css обработчики:

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
          options: {
            postcssOptions: { sourceMap: true, config: './postcss.config.js' }
          },
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
          options: {
            postcssOptions: { sourceMap: true, config: './postcss.config.js' }
          },
        },
      ],
    }],
  },
  ...
```

Одна из особенностей css-nano это то как он сжимает повторяющийся css код, такого рода код 
```
h1 {
    color: blue;
}
h2 {
    color: blue;
}
h3 {
    color: blue;
}
```

будет минифицирован в:
```
h1,h2,h3{color:#00f}
```

Далее напишем общий каскад для нашего scss, для этого реструктурируем папку `./src/scss/` и добавим туда файлы ([go to video](https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=1064)):
```
/scss
  /modules
    wrapper.scss
  /utils
    fonts.scss
    libs.scss
    mixins.scss
    reset.scss
    vars.scss
  main.scss
```
Первым делом ипортируем libs ([go to video](https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=1082))

в большинстве случаев css и sass библиотеки подключаются через `./src/scss/utils/libs.scss`
```
// Sass librarys example:
@import '../../node_modules/spinners/stylesheets/spinners';

// CSS librarys example:
@import '../../node_modules/flickity/dist/flickity.css';
```
которые уже в свою очередь импортируется в ./src/scss/main.scss
```
@import "utils/libs";
@import "utils/vars";
@import "utils/mixins";
@import "utils/fonts";
@import "utils/reset";
```
Далее рассмотрим vars.scss - `@import "utils/vars"` ([go to video](https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=1138));

[utils/vars.scss on github](https://github.com/alex-ismailov/webpack-template/blob/master/src/scss/utils/vars.scss)

`$success-color: #26de81` - такое название лучше чем например $green-color.

Затем идет адаптив - `@import "utils/mixins"`; - очень крутая штука ([go to video](https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=1219))

// src/scss/utils/mixins.scss
```
// px to rem
@function rem($pixels, $context: $mainFontSize) {
  @if (unitless($pixels)) {
    $pixels: $pixels * 1px;
  }
  @if (unitless($context)) {
    $context: $context * 1px;
  }
  @return $pixels / $context * 1rem;
}

@mixin size($width,$height: $width) {
  width: $width;
  height: $height;
}

@mixin placeholder {
  ::-webkit-input-placeholder {@content}
  :-moz-placeholder           {@content}
  ::-moz-placeholder          {@content}
  :-ms-input-placeholder      {@content}
}
```

Особое внимание заслуживает mixin - `@function`

Магия, адаптивный размер шрифта: ([go to video](https://youtu.be/qqTIqwQX8nc?list=PLkCrmfIT6LBQWN02hNj6r1daz7965GxsV&t=1387))
мы можем писать сколько угодно @media запросов, css-mqpacker сгруппирует и оптимизирует их всех в одно место в app.css
