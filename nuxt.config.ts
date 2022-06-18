import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        strict: true,
    },
    css: ["vuetify/lib/styles/main.sass"],
    router: {
        prefetchLinks: false
    },
    build: {
        transpile: ["vuetify"],
        standalone: true,
    },
    ssr: false,
});
