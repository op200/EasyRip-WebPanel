import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCmdPanelStore = defineStore('cmdPanel', () => {
    const new_command = ref([""] as string[])
    const new_command_preview_line = ref(0);

    return { new_command, new_command_preview_line }
})
