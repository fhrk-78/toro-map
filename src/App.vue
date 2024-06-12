<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, RouterLink, RouterView } from 'vue-router'
import { useSettingsStore } from './stores/settings'

const route = useRoute()
let settingsStore = useSettingsStore()
let props = route.params

const currentRouterName = computed(() => route.name)
</script>

<template>
    <transition :name="settingsStore.allowPageAnimation ? 'slide-fade' : ''">
        <RouterView :key="$route.fullPath" :props="props" />
    </transition>

    <div class="sidebar">
        <div class="sidecontentgroup">
            <router-link class="sidecontent iinfo" :class="{ focused: currentRouterName == 'about' }" to="/about"></router-link>
            <router-link class="sidecontent iexplore" :class="{ focused: currentRouterName == 'main' }" to="/"></router-link>
        </div>

        <div class="sidecontentgroup">
            <router-link class="sidecontent igroup bottom" :class="{ focused: currentRouterName == 'groups' }" to="/groups"></router-link>
            <router-link class="sidecontent iaccount bottom" :class="{ focused: currentRouterName == 'mypage' }" to="/mypage"></router-link>
            <router-link class="sidecontent isettings bottom" :class="{ focused: currentRouterName == 'settings' }" to="/settings"></router-link>
        </div>
    </div>
</template>
