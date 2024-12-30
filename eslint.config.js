import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import oxlint from 'eslint-plugin-oxlint'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  oxlint.configs['flat/recommended'],
  ...pluginVue.configs['flat/strongly-recommended'],

  // 强制使用单引号
  {
    rules: {
      'quotes': ['error', 'single'], // 强制使用单引号
      'semi': ['error', 'never'], // 禁用分号
      'no-unused-vars': ['warn', {args: 'none', ignoreRestSiblings: true}],
      'vue/multi-word-component-names': ['error', {
        'ignores': ['Home', 'About', 'index'], // 忽略常见的单词组件名
      }],
      // 强制 Vue.js 自定义组件使用自闭合标签
      'vue/html-self-closing': ['error', {
        'html': {
          'void': 'always', // 空标签（如 <br>）强制使用自闭合
          'normal': 'always', // 普通元素（如 <div>）强制自闭合
        },
        'svg': 'always', // SVG 元素强制自闭合
        'math': 'always' // MathML 元素强制自闭合
      }]
    },
    languageOptions: {
      globals: {
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        ElLoading: 'readonly',
      },
    },
  },
]
