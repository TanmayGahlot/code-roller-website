
import { resolve } from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        manifesto: resolve(__dirname, 'manifesto.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        terms: resolve(__dirname, 'terms.html'),
        docsIndex: resolve(__dirname, 'docs/index.html'),
        docsInstall: resolve(__dirname, 'docs/install.html'),
        docsCommands: resolve(__dirname, 'docs/commands.html'),
        docsPrivacy: resolve(__dirname, 'docs/privacy.html'),
        docsFaq: resolve(__dirname, 'docs/faq.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        analytics: resolve(__dirname, 'analytics.html'),
        settings: resolve(__dirname, 'settings.html'),
        profile: resolve(__dirname, 'profile.html'),
        login: resolve(__dirname, 'login.html'),
        register: resolve(__dirname, 'register.html'),
        blogIndex: resolve(__dirname, 'blog/index.html'),
        blog1: resolve(__dirname, 'blog/1.html'),
        blog2: resolve(__dirname, 'blog/2.html'),
        notFound: resolve(__dirname, '404.html')
      }
    }
  }
})
