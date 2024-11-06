import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import loadPlugins from './plugins'

/**
 * vite环境配置
 *
 * 代码说明:
 *  command: 运行模式,值为serve或build
 *  __dirname: nodejs环境的全局变量,表示当前文件所在目录的绝对路径
 *  resolve.extensions: 导入时想要省略的扩展名列表。注意，不 建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
 */
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const isBuild = command === 'build'

  return {
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.app.com/admin/，则设置 baseUrl 为 /admin/。
    base: env.VITE_APP_CONTEXT_PATH,
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    plugins: loadPlugins(env),
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: false,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          rewrite: (path) =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
        },
      },
    },
    build: {
      target: 'es2015',
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
      chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
    },
  }
})
