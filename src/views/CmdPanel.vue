<script setup lang="ts">
import { ref, onBeforeMount, onMounted, watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { NConfigProvider, type GlobalTheme, lightTheme, darkTheme, c } from 'naive-ui'
import { NFlex, NAffix, NTag, NButton, NSpace, NInput } from 'naive-ui'
import axios from 'axios';
import jsSHA from 'jssha';
import { encrypt, decrypt, testAES } from '@/utils/aes';

function sha3_512(input: string): string {
    const shaObj = new jsSHA("SHA3-512", "TEXT", { encoding: "UTF8" });
    shaObj.update(input);
    return shaObj.getHash("HEX");
}

const text = ref('');

function click1() {
    console.info('click1');
    const fetchData = async () => {
        // try {
        console.info('click1', 'try');
        const res = await axios.get('http://127.0.0.1:8000');
        let data = res.data;
        const key = sha3_512('123').slice(0, 32);
        console.warn('key', key);

        console.info('@@data', data);
        console.warn('@@test', { 'test': data.test });
        console.error('@@dec', { 'test': decrypt(data.test as string, key) });
        // }
        // catch (err) {
        //     console.error(err);
        // }
    };

    fetchData();
}

function click2() {
    testAES();
}
</script>

<template>
    <n-button strong secondary type="info" @click="click1">
        Get
    </n-button>

    <n-button strong secondary type="info" @click="click2">
        Test
    </n-button>

    <n-space vertical>
        <n-input v-model:value="text" type="textarea" placeholder="123asd" />
    </n-space>
</template>

<style scoped></style>