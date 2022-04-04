module.exports = {
  env : { // browser, nodejs 환경에서 동작하는 전역개념들을 코드 검사를 할 것인지를 성정
    browser:true,
    node:true
  },
  extends:[
    // vue
    // 'plugin:vue/vue3-essential',  // Lv1
    'plugin:vue/vue3-strongly-recommended',  // Lv2
    // 'plugin:vue/vue3-recommended',  // Lv3 = 가장 엄격한 vue.js 문법을 권장
    // js
    'eslint:recommended'
  ],
  parserOptions:{
    // 코드를 분석할 수 있는 분석기
    parser:'bable-eslint'
  },
  rules:{
    "vue/html-closing-bracket-newline": ["error", {
    "singleline": "never",
    "multiline": "never"
    }],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
        "normal": "never",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }]
  }
}