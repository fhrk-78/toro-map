import { createRouter, createWebHashHistory, createWebHistory /*createWebHistory*/ } from 'vue-router'

import About from '@/views/AboutView.vue'
import Main from '@/views/MainView.vue'

import Theme from '@/views/ThemeView.vue'
import Settings from '@/views/SettingsView.vue'

const router = createRouter({
    history: createWebHashHistory(),
    //history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/',
            name: 'main',
            component: Main
        },
        {
            path: '/theme',
            name: 'theme',
            component: Theme
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        }
    ]
})

export default router
