import compression from 'vite-plugin-compression'

/**
 * 打包压缩插件
 */
export default (env) => {
  const { VITE_BUILD_COMPRESS } = env
  const plugin = []
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(',')
    if (compressList.includes('gzip')) {
      plugin.push(
        compression({
          ext: '.gz',
          deleteOriginFile: false,
        })
      )
    }
    if (compressList.includes('brotli')) {
      plugin.push(
        compression({
          ext: '.br',
          algorithm: 'brotliCompress',
          deleteOriginFile: false,
        })
      )
    }
  }
  return plugin
}
