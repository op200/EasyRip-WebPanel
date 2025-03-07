<script setup lang="ts">
import { NCard } from 'naive-ui';
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
                运行 easyrip server [-a] [&lt;地址&gt;][:][&lt;端口&gt;] [-p] [&lt;密码&gt;]，然后在 Web Panel 的 Connection 中设置相应的值，就可以连接
            </p>
            <div>
                e.g. easyrip server -a 8000 -p 123
                <br>
                e.g. easyrip server 0.0.0.0:8000 123
            </div>
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