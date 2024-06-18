<script lang="ts" setup>
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

let allowPageAnimation = ref(settingsStore.allowPageAnimation)

let changeSuccess = ref(false)
let bannerMessage = ref('')

function submit() {
    settingsStore.allowPageAnimation = allowPageAnimation.value

    bannerMessage.value = '保存しました'
    changeSuccess.value = true
    setTimeout(() => {
        changeSuccess.value = false
    }, 1500)
}

function reset() {
    settingsStore.allowPageAnimation = true

    bannerMessage.value = 'デフォルトの設定に戻りました'
    changeSuccess.value = true
    setTimeout(() => {
        changeSuccess.value = false
    }, 1500)
}
</script>

<template>
    <div class="banner success" v-bind:class="{ show: changeSuccess }">{{ bannerMessage }}</div>
    <main>
        <div><input type="checkbox" v-model="allowPageAnimation" /><label>ページの移動アニメーションを許可する</label></div>
        <a class="btn primary" @click="submit()">保存する</a><a class="btn" @click="reset()">デフォルトに戻す</a>
    </main>
</template>

<style scoped>
@import url('@/assets/style/general.css');
@import url('@/assets/style/form.css');
</style>
