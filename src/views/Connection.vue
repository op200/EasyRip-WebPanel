<script setup lang="ts">
import { useMainStore } from '@/stores/main'
import request from '@/utils/request'
import { NInput, NInputGroup, NInputGroupLabel, NSpace } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const mainStore = useMainStore()
const { current_password, current_url } = storeToRefs(mainStore)

watch(current_password, request.init)

</script>


<template>
    <div style="padding: 1rem;">
        <n-space vertical>
            <n-input-group>
                <n-input-group-label>URL</n-input-group-label>
                <n-input placeholder="URL" v-model:value="current_url" />
            </n-input-group>
            <n-input-group>
                <n-input-group-label>Password</n-input-group-label>
                <n-input placeholder="Password" v-model:value="current_password" />
            </n-input-group>
        </n-space>
    </div>
</template>