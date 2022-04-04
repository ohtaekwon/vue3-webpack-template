// import
// path : NodeJS에서 파일 및 데렉토리 경로 작업을 위한 전역 모듈
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

// export
module.exports = {
  resolve:{
    // js, vue 파일을 경로에서 확장자를 따로 표시하지 않아도 문제가 발생하지 않게 된다.
    extensions:['.js','.vue'],
    // 경로 별칭
    alias:{
      '~':path.resolve(__dirname, 'src'),
      'assets':path.resolve(__dirname, 'src/assets')
    }
  },
  // entry는 파일을 읽어들이기 시작하는 진입점 설정
  entry:'./src/main.js',   // main.js를 진입점으로 설정

  // 결과물(번들)을 반환하는 설정
  output:{
    // path:path.resolve(__dirname,'dist'),
    // filename:'main.js',
    clean:true
  },
  module:{
    rules:[
      {
        test:/\.vue$/,
        use:'vue-loader'
      },
      {
        // 정규 표현식 : s?css 는 scss파일도 css파일도 선택
        test: /\.s?css$/,
        use:[
          // 순서가 중요
          'vue-style-loader', // <- 가장 마지막으로 해석
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test:/\.js$/,
        use:[
          'babel-loader'
        ]
      },
      {
        test:/\.(png|jpe?g|gif|webp)$/,
        use:'file-loader'
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins:[
    new HtmlPlugin({
      template:'./index.html'
    }),
    new CopyPlugin({
      patterns:[
        {from:'static'}
      ]
    }),
    new VueLoaderPlugin()
  ],
  devServer:{
    host:'localhost',
    port:5500
  }
}