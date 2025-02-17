const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        // 可以用来排除 `single` 元素
        '@vue/compiler-sfc': require.resolve('@vue/compiler-sfc')
      }
    }
  },
})
