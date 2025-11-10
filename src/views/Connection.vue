<script setup lang="ts">
import { useMainStore } from '@/stores/main';
import { NInput, NInputGroup, NInputGroupLabel, NSpace } from 'naive-ui';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const { current_password, current_url } = storeToRefs(mainStore);

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