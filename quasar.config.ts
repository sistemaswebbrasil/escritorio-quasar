// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app/wrappers'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'

// Carrega as variáveis do arquivo .env
dotenv.config()

export default defineConfig((ctx) => {
  console.log('VITE_API_INTEGRATOR_API_URL:', process.env.VITE_API_INTEGRATOR_API_URL)

  // Validação para garantir que o target esteja definido
  const apiUrl = process.env.VITE_API_INTEGRATOR_API_URL
  if (!apiUrl) {
    throw new Error('VITE_API_INTEGRATOR_API_URL não está definida no .env')
  }

  return {
    boot: ['i18n', 'axios', 'auth0'],
    css: ['app.scss'],
    extras: ['roboto-font', 'material-icons'],
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },
      typescript: {
        strict: true,
        vueShim: true,
      },
      vueRouterMode: 'hash',
      vitePlugins: [
        [
          '@intlify/unplugin-vue-i18n/vite',
          {
            ssr: ctx.modeName === 'ssr',
            include: [fileURLToPath(new URL('./src/i18n', import.meta.url))],
          },
        ],
        [
          'vite-plugin-checker',
          {
            vueTsc: true,
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],
    },
    devServer: {
      open: false,
      port: 3000,
      proxy: {
        '/integrator-api/api': {
          target: process.env.VITE_API_INTEGRATOR_API_URL,
          changeOrigin: true,
          secure: false,
          logLevel: 'debug',
        },
        '/viacep-api/ws': {
          target: process.env.VITE_API_VIACEP_API_URL,
          changeOrigin: true,
          secure: false,
          logLevel: 'debug',
        },
      },
    },
    framework: {
      config: {
        notify: {
          position: 'top-right',
          actions: [{ icon: 'close', color: 'white', round: true }],
        },
      },
      plugins: ['Notify'],
    },
    animations: [],
    ssr: {
      prodPort: 3000,
      middlewares: ['render'],
      pwa: false,
    },
    pwa: {
      workboxMode: 'GenerateSW',
    },
    capacitor: {
      hideSplashscreen: true,
    },
    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager',
      builder: {
        appId: 'escritorio-quasar',
      },
    },
    bex: {
      extraScripts: [],
    },
  }
})
