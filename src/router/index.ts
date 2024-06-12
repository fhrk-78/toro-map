import { createRouter, createWebHashHistory /*createWebHistory*/ } from 'vue-router'

import About from '@/views/AboutView.vue'
import Main from '@/views/MainView.vue'
import Mypage from '@/views/MypageView.vue'
import Settings from '@/views/SettingsView.vue'
import GroupView from '@/views/GroupsView.vue'

const router = createRouter({
    history: createWebHashHistory(),
    //NOT HASH: history: createWebHistory(import.meta.env.BASE_URL),
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
            path: '/groups',
            name: 'groups',
            component: GroupView
        },
        {
            path: '/mypage',
            name: 'mypage',
            component: Mypage
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        }
    ]
})

export default router
