import axios from 'axios';
import { useMainStore } from '@/stores/main';
import { sha3_512, aes } from '@/utils/aes';



function encrypt(plaintext: string): string {
    const mainStore = useMainStore();

    if (mainStore.current_password === "")
        return JSON.stringify(plaintext);
    else
        return aes.encrypt(JSON.stringify(plaintext), mainStore.current_aes_key);
}

function decrypt(ciphertextHex: string): string {
    const mainStore = useMainStore();

    if (mainStore.current_password === "")
        return JSON.parse(ciphertextHex);
    else
        return JSON.parse(aes.decrypt(ciphertextHex, mainStore.current_aes_key));
}

function init(_token: string) {
    const mainStore = useMainStore();

    let sha = sha3_512(mainStore.current_password)

    mainStore.current_password_sha3_512_last8 = sha.slice(-8);
    mainStore.current_aes_key = sha.slice(0, 32);
    if (mainStore.current_token !== _token) {
        mainStore.log_queue = [];
        mainStore.current_token = _token;
        init(_token);
    }
}

/**
 * 检测是否重新初始化、刷新log
 */
export function sendGet() {
    const mainStore = useMainStore();

    axios.get(mainStore.current_url)
        .then(res => {
            let data = res.data;
            if (mainStore.current_token !== data.token)
                init(data.token);

            data.cwd = decrypt(data.cwd);

            data.log_queue = decrypt(data.log_queue);
            if (mainStore.log_queue.length !== data.log_queue.length)
                mainStore.log_queue = data.log_queue;
            mainStore.current_work_dir = data.cwd;

            data.progress = decrypt(data.progress);
            mainStore.progress = data.progress;

            if (mainStore.debug)
                console.debug(data);

            mainStore.is_connect = true;
            return data;
        })
        .catch(err => {
            console.error(err);
            mainStore.is_connect = false;
        })
}

export function sendPost(cmd: string | undefined): boolean {
    if (cmd === undefined)
        return false

    const mainStore = useMainStore();

    axios.post(mainStore.current_url, {
        'token': mainStore.current_token,
        'password': mainStore.current_password_sha3_512_last8,
        'run_command': encrypt(cmd)
    })
        .then(res => {
            if (mainStore.debug)
                console.debug(res.data)

            if (res.data.res === 'success')
                return true;
            else
                return false;
        })
        .catch(err => {
            console.error(err)
            return false;
        })
    return false;
}