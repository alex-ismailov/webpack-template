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
