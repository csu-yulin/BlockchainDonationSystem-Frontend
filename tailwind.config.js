/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',              // 扫描 HTML 文件
    './src/**/*.{vue,js,ts,jsx,tsx}', // 扫描 src 目录下的所有 Vue、JS 等文件
  ],
  theme: {
    extend: {},                  // 可在此扩展自定义主题，例如颜色、间距等
  },
  plugins: [],                   // 可添加 Tailwind 插件，当前无需额外插件
}

