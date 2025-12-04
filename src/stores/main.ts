import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {

  const debug = ref(false);

  const is_connect = ref(true);
  const progress = ref({} as Record<string, number>);

  const auto_get_interval = ref(1_500);
  const current_work_dir = ref('');

  const current_password = ref('123');
  const current_url = ref('http://127.0.0.1:8000');
  const current_token = ref('')
  const current_password_sha3_512_last8 = ref('');
  const current_aes_key = ref('');

  const log_queue = ref([] as string[][]) // 必须直接赋值，触发浅监听

  return { debug, is_connect, progress, auto_get_interval, current_work_dir, current_password, current_url, current_token, current_password_sha3_512_last8, current_aes_key, log_queue }
})
