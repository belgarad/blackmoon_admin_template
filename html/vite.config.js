import { resolve } from 'path'
import { globSync } from 'glob'
import nunjucksPlugin from 'vite-plugin-nunjucks'
import nunjucks from 'nunjucks'

// Auto-discover all HTML entry points in pages/
const pages = globSync('pages/**/*.html', { cwd: __dirname })
const input = {
  main: resolve(__dirname, 'index.html'),
}
pages.forEach((page) => {
  const name = page.replace(/\.html$/, '').replace(/\//g, '_')
  input[name] = resolve(__dirname, page)
})

export default {
  base: '/blackmoon_admin_template/',
  plugins: [
    nunjucksPlugin({
      nunjucksEnvironment: new nunjucks.Environment(
        new nunjucks.FileSystemLoader(resolve(__dirname, 'src'), { noCache: true })
      ),
      templatesDir: resolve(__dirname, 'src'),
    }),
  ],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        loadPaths: [resolve(__dirname, 'node_modules')]
      }
    }
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input,
    },
  },
}
