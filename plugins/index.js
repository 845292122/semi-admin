import react from '@vitejs/plugin-react-swc'
import createCompression from './compression'
import createUnocss from './unocss'

export default (viteEnv) => {
  const vitePlugins = []
  vitePlugins.push(react())
  vitePlugins.push(createUnocss())
  vitePlugins.push(createCompression(viteEnv))
  return vitePlugins
}
