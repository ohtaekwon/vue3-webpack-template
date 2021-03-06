# Webpack

## Webpack 설치

- 터미널 열어서 `npm init -y` 입력
- 이어서 `npm i -D webpack webpack-cli webpack-dev-server@next` 입력
    - `webpack` 패키지 설치
    - `webpack-cli` 패키지 설치
    - `webpack-dev-server` 패키지 설치
        - `webpack-dev-serve`는 `webpack-cli`와 메이져 버전을 일치시켜야 하므로, `@next` 추가해서 패키지를 설치한다.
- `packge.json` 파일을 열어서, 다음의 코드를 입력한다.
```js
"dev": "webpack-dev-server --mode development", // --mode development 는 현재 개발 모드를 의미한다.
"build" : "webpack --mode production" // --mode production 는 제품모드
```

## Webpack.config.js

##### [webpack configuration 더 알아보기](https://webpack.js.org/configuration/entry-context/#entry
##### [webpack output 더 알아보기](https://webpack.js.org/configuration/output/)

- `Webpack.config.js` 는 브라우저에서 동작이 아닌, nodeJS환경에서 동작을 한다.

```js
// import
// nodejs 환경에서는 import가 아닌, require을 통해서 import 한다.
const path = require('path')

// export
module.exports = {
  // parcel index.html <- parcel 번들러의 진입점을 index.html으로 설정한다는 말
  // entry는 파일을 읽어들이기 시작하는 진입점 설정
  entry:'./js/main.js',   // main.js를 진입점으로 설정

  // 결과물(번들)을 반환하는 설정
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'app.js'
  }
}
```
- 진입점의 의미란?
    - `package.json` 파일에서 `parcel index.html` 코드의 의미는 parcel bundler의 진입점을 `index.html`로 설정한다는 의미이다. 
- `const path = require('path')` 는 nodejs환경에서 언제든지 가지고와서 사용할 수 있는 `'path'`라는 전역모듈을 `path`라는 변수에 할당한다.
- 그 `path`라는 전역모듈은 `resolve`라는 메소드를 사용할 수 있고,
- `resolve`는 첫 번째 인수와 두 번째 인수의 경로를 합쳐주는 역할을 한다.
- `__dirname` 는 nodejs에서 전역적으로 사용하는 변수로, 현재 파일이 있는 그 경로를 지칭한다.
    - 즉 `webpack.config.js` 라는 파일이 있는 경로가 `__dirname`의 경로이다.
    - 그 경로에 `dist`라는 폴더를 만든다.
- 터미널에서 `npm run build`를 입력하면, 
- enyty에서 `'./js/main.js'`에 연결된 모든 내용을 번들로 만들어서 합쳐서 만들어진다.  
    - `dist` 이라는 폴더안에 `app.js`라는 파일이 생성된다.

[output path](https://webpack.js.org/configuration/output/#outputpath)

```js
module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry:'./js/main.js',  

  // 결과물(번들)을 반환하는 설정
  output:{
    path:path.resolve(__dirname,'public'),
    filename:'main.js',
    // clean 추가
    clean:true 
  }
}

```
- `clean`이라는 명령어를 추가하면 새롭게 `app.js`에서 `main.js`로 바꿀 때, 안에 있던 `app.js` 파일은 삭제되고 다시, `main.js`가 생성된다.

[output clean](https://webpack.js.org/configuration/output/#outputclean)

## index.html 개발서버오픈

- 터미널에서 `npm i -D html-webpack-plugin` 을 입력한다.

```js
// import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

// export
module.exports = {
  // entry는 파일을 읽어들이기 시작하는 진입점 설정
  entry:'./js/main.js',   // main.js를 진입점으로 설정

  // 결과물(번들)을 반환하는 설정
  output:{
    // path:path.resolve(__dirname,'dist'),
    // filename:'main.js',
    clean:true
  },
  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins:[
    new HtmlPlugin({
      template:'./index.html'
    })
  ]
}

```

- `const HtmlPlugin = require('html-webpack-plugin')` 을 추가하고
- plugins 라는 배열을 작성한다.


## Error: listen EFAULT: bad address in system call argument 0.0.0.0:8081

- prot를 설정해준다.
      - port:5500


## npm i -D copy-webpack-plugin

```js
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
  
  //// 생략

  plugins:[
    new HtmlPlugin({
      template:'./index.html'
    }),
    // 새로운 배열 데이터를 생성로 CopyPlugin 생성자를 생성
    // static 안의 내용이 CopyPlugin을 통해 복사가 돼서 dist라는 폴더로 이동
    new CopyPlugin({
      patterns:[
        // static 폴더
        {from:'static'}
      ]
    })
  ],
}

```

## Webpack에서 CSS파일을 읽는 패키지

- `npm i -D css-loader style-loader`

## Webpack에서 scss파일을 읽는 패키지

- `npm i -D sass-loader sass`

## 공급업체접두사

- `npm i -D postcss autoprefixer postcss-loader`
- `webpack.config.js` 파일에 다음을 입력
- 이때 순서가 중요하다.
```js
use:[
  'style-loader',
  'css-loader',
  'postcss-loader',
  'sass-loader'
]
```
- 순서의 의미는
      - sass-loader 를 통해 main.scss을 해석하고
      - 해석된 내용을 postcss-loader를 통해서 공급업체접두사를 적용한다.
      - 그다음의 내용을 css-loader를 통해서 읽어들이고
      - 마지막으로, style-loader에서 index.html로 style 태그로 삽입을 한다.
- `package.json` 파일에 다음을 입력
```js
  "browerslist":[
    "> 1%",
    "last 2 versions"
  ]
```
- 의미는, `"> 1%"` : 전세계의 1퍼센터의 이상의 브라우저에서
- 마지막 두 개의 버전을 모두 지원한다.
- 다음 루트 경로에 `.postcssrc.js`를 생성

## Babel 패키지 설치

- `npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime`
- `.babelrc.js` 파일에 다음과 같이 입력
```js
// export
module.exports={
  preset:['@babel/preset-env'],
  plugins:[
    '@babel/plugin-transform-runtime'
  ]
}
```
- `presets` : 명시해야하는 자바스크립트 기능을 한번에 내보내는 기능을 지원.
- `plugins` : 비동기 처리를 위해서 사용.
- webpack.config.js 파일에서 다음과 같이 입력

```js
 {
  test:/\.js$/,
  use:[
    'babel-loader'
  ]
}
```
- `npm i -D babel-loader` 설치



# Vue js

- 터미널에서 `npx degit [깃헙저장소] [새로운프로젝트]
- `degit`을 통해서 하는 이유?
    - `git clone`과는 달리 기존의 버전 내역은 삭제가 되기 때문에
    - 새로운 프로젝트를 할 떄 유용하다.
- 해당 프로젝트를 오픈한 이후, 
- `/src` 폴더 생성 후
    - 내부에 `main.js` 생성
    - `App.vue` 생성
- 정상적으로 `vue`가 작동하도록 `vue` 패키지를 설치한다.
- 터미널에서 `npm i vue@next` 를 입력하여 최신의 3버전으로 설치
    - vue는 개발할 때만 사용하는 것이 아니고, 
    - 실제로 브라우져에서 동작하는 패키지이므로, 
    - 개발의존성(`-D`)로 설치하지 않는다.
- `vue.js` 는 기본적으로 vue의 문법을 해석하는 용도로 사용되는 것이고, 
- 확장자 파일을 프로젝트 내부에서 관리하기 위해서는 추가적인 패키지를 설치해야한다.
- `npm i -D vue-loader@next vue-styler-loader @vue/compiler-sfc` 를 설치한다.
    - `@vue/compiler-sfc` 는 실제로 vue파일을 변환해서 브라우저에서 동작하는 형태로 바꿔준다.
- `webpack.config.js` 파일에서 다음과 같이 작성한다.
```js
module:{
  rules:{
  {
    test:/\.vue?/,
    use:'vue-loader'
  },
  }
}
```
- `module`의  `rules` 부분에 ` test:/\.vue?/` 는 `vue`라는 확장자를 가지고 있는 파일을 필터링을 해서 `use:'vue-loader'` 는 vue-loader가 실행될 수 있게 만들어준다. 
- 다음으로는
```js
'vue-style-loader',
```
- style 부분이 해석될 수 있도록, `'vue-style-loader',` 를 연결
- 마지막으로 
```js
const {VueLoaderPlugin} = require('vue-loader')

plugins:[
  new VueLoaderPlugin()
]
```
- `vue-loader`에서 plugin을 가지고와서 `{VueLoaderPlugin}`을 구조분해 할당한 후,
- plugins:[]안에 속성부분에 새로운 생성자 함수로 실행.


## file-loader

- `npm i -D file-loader` : 특정한 파일들을 읽어서 브라우저에 출력해줄 수 있는 webpack의 loader

## eslint

- 터미널에서 `npm i -D eslint eslint-plugin-vue babel-eslint`
- 루트 경로에 `.eslintrc.js` 파일 생성
- 해당 파일에서 다음과 같이 작성.
    ```js
    module.exports = {
      env : { // browser, nodejs 환경에서 동작하는 전역개념들을 코드 검사를 할 것인지를 성정
        browser:true,
        node:true 
      },
      extends:[],
      parserOptions:{},
      rules:{}
    }
    ```


    [더 알아보기](https://eslint.vuejs.org/user-guide/)
    [eslint rules 더 알아보기](https://eslint.org/docs/rules/)