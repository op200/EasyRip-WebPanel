<script setup lang="ts">
// import { ref } from 'vue';
import { NSpace, NSwitch, NInputGroup, NInputGroupLabel, NInputNumber } from 'naive-ui';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const { debug, auto_get_interval } = storeToRefs(mainStore);


</script>


<template>
    <div style="padding: 1rem;">
        <n-space vertical>

            <n-switch v-model:value="debug">
                <template #checked>
                    Open debug mode
                </template>
                <template #unchecked>
                    Debug mode switch
                </template>
            </n-switch>


            <n-input-group>
                <n-input-group-label>自动刷新轮询间隔</n-input-group-label>
                <!-- 设定了最小值，所以直接断言类型 -->
                <n-input-number :value="auto_get_interval" @update-value="val => auto_get_interval = (val as number)"
                    :update-value-on-input="false" step="1000" :min="500">
                    <template #suffix>
                        ms
                    </template>
                </n-input-number>
            </n-input-group>

        </n-space>
    </div>
</template>