<script setup lang="ts">
import { ref, watch } from 'vue';
import { NButton, NSpace, NInputGroup, NInputGroupLabel, NInput, NList, NListItem, NTag, NDataTable } from 'naive-ui';
import { sendGet, sendPost } from '@/utils/request';
import { useMainStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';


const mainStore = useMainStore();
const { log_queue } = storeToRefs(mainStore);

const new_command = ref('');

function send_new_cmd() {
    sendPost(new_command.value);
    new_command.value = '';
    setTimeout(() => sendGet(), 500);
}

function log_color(level: string | undefined) {
    return level ? `var(--log-color-${level.toLowerCase()})` : "inherit";
}

const cmdLogList = ref();

function scrollToBottom() {
    if (cmdLogList.value)
        cmdLogList.value.scrollTop = cmdLogList.value.scrollHeight;
};

watch(log_queue, () => {
    scrollToBottom();
    setTimeout(() => {
        scrollToBottom();
    }, 300);
});

</script>


<template style="overflow: hidden;">
    <div style="padding: 1rem;position: relative;overflow: hidden;">

        <div id="cmdLogList" ref="cmdLogList">
            <n-list hoverable bordered v-show="log_queue.length > 0">
                <n-list-item v-for="(item, index) in log_queue">
                    <span>
                        {{ index + 1 }}
                    </span>&#8195;
                    <span style="color: var(--log-color-time);">
                        {{ item[0] }}
                    </span>
                    <span :style="`color:${log_color(item[1])}`">
                        {{ item[1] !== "Send" ? `&nbsp;[${item[1]}]&nbsp;` : '' }}
                        {{ (item[2] as string).replace(/ /g, "&nbsp;") }}
                    </span>
                </n-list-item>
            </n-list>
        </div>

        <div id="cmdSender">
            <n-space vertical>
                <n-input-group>
                    <n-input-group-label style="font-size: 0.8rem;">{{
                        mainStore.current_work_dir }}></n-input-group-label>
                    <n-input type="text" placeholder="New Easy Rip command" v-model:value="new_command"
                        @keydown.enter="send_new_cmd" style="ime-mode: inactive;" />
                    <n-button strong secondary type="info" @click="send_new_cmd">Send</n-button>
                </n-input-group>
            </n-space>
        </div>

    </div>
</template>

<style scoped>
.testButton {
    position: absolute;
    top: 0;
}

#cmdLogList {
    height: calc(80vh - 0rem - 3px);
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
}

#cmdSender {
    margin-top: 1rem;
    /* height: calc(20vh - 8rem); */
}
</style>