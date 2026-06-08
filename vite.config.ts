import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  // `netlify()` must come after `tanstackStart()` — it adapts the SSR build
  // into a Netlify serverless function. Harmless when building elsewhere.
  plugins: [devtools(), tailwindcss(), tanstackStart(), netlify(), viteReact()],
})

export default config
