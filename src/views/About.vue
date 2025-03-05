<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { NCard } from 'naive-ui';
import { Copy24Regular, SendCopy24Filled } from '@vicons/fluent'
import { useMainStore } from '@/stores/main';
import { useCmdPanelStore } from '@/stores/cmdPanel';
import { useGeneratorStore } from '@/stores/generator';
import { storeToRefs } from 'pinia';

</script>


<template>
    <div style="padding: 1rem;position: relative;overflow-x: hidden;">

        <n-card title="Easy Rip">
            <template #header-extra>
                <a href="https://github.com/op200/EasyRip">
                    https://github.com/op200/EasyRip
                </a>
            </template>

            <p>
                运行 easyrip server &lt;地址&gt; &lt;端口&gt; &lt;密码&gt;，然后在 Web Panel 的 Connection 中设置相应的值，就可以连接
            </p>
            <p>
                e.g. easyrip server "" 8000 123
            </p>
        </n-card>

        <n-card title="Easy Rip Web Panel">
            <template #header-extra>
                <a href="https://github.com/op200/EasyRip-WebPanel">
                    https://github.com/op200/EasyRip-WebPanel
                </a>
            </template>
        </n-card>

    </div>
</template>