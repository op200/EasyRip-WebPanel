<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { NButton, NSpace, NInputGroup, NInputGroupLabel, NInput, NList, NListItem, NIcon } from 'naive-ui';
import { Send24Regular } from '@vicons/fluent'
import { sendGet, sendPost } from '@/utils/request';
import { useMainStore } from '@/stores/main';
import { useCmdPanelStore } from '@/stores/cmdPanel';
import { storeToRefs } from 'pinia';


const mainStore = useMainStore();
const { log_queue } = storeToRefs(mainStore);
const cmdPanelStore = useCmdPanelStore();
const { new_command, new_command_preview_line } = storeToRefs(cmdPanelStore);

const newCmdInput = ref()
onMounted(() => newCmdInput.value.focus())

function send_new_cmd() {
    sendPost(new_command.value[new_command.value.length - 1]);
    if (new_command_preview_line.value == new_command.value.length - 1)
        ++new_command_preview_line.value;
    new_command.value.push("");
    setTimeout(() => sendGet(), 500);
}

function new_cmd_keydown(event: KeyboardEvent) {
    switch (event.key) {
        case "ArrowUp":
            event.preventDefault();
            if (new_command_preview_line.value > 0)
                --new_command_preview_line.value;
            new_command.value[new_command.value.length - 1] = new_command.value[new_command_preview_line.value]
            break;
        case "ArrowDown":
            event.preventDefault();
            if (new_command_preview_line.value == new_command.value.length - 2)
                new_command_preview_line.value = new_command.value.length - 1,
                    new_command.value[new_command.value.length - 1] = "";
            else if (new_command_preview_line.value < new_command.value.length - 1) ++new_command_preview_line.value;
            new_command.value[new_command.value.length - 1] = new_command.value[new_command_preview_line.value]
            break;
        case "Enter":
            event.preventDefault();
            send_new_cmd();
    }
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


<template>
    <div style="padding: 1rem;position: relative;overflow: hidden;">

        <div id="cmdLogList" ref="cmdLogList">
            <n-list hoverable bordered v-show="log_queue.length > 0">
                <n-list-item v-for="(item, index) in log_queue" style="white-space: pre-wrap;">
                    <span>
                        {{ index + 1 }}
                    </span>&#8195;
                    <span style="color: var(--log-color-time);">
                        {{ item[0] }}
                    </span>
                    <span :style="`color:${log_color(item[1])}`">
                        {{ item[1] !== "Send" ? ` [${item[1]}] ` : '' }}{{ item[2] }}
                    </span>
                </n-list-item>
            </n-list>
        </div>

        <div id="cmdSender">
            <n-space vertical>
                <n-input-group>
                    <n-input-group-label style="font-size: 0.8rem;">{{
                        mainStore.current_work_dir }}></n-input-group-label>
                    <n-input ref="newCmdInput" type="text" placeholder="New Easy Rip command"
                        v-model:value="new_command[new_command.length - 1]" @keydown.stop="new_cmd_keydown" />
                    <n-button strong secondary type="info" @click="send_new_cmd">
                        <n-icon size="large">
                            <Send24Regular />
                        </n-icon>
                    </n-button>
                </n-input-group>
            </n-space>
        </div>

    </div>
</template>

<style scoped>
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