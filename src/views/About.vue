<script setup lang="ts">
import { NCard } from 'naive-ui';
</script>


<template>
    <div style="display: grid;gap: 1rem;padding: 1rem;position: relative;overflow-x: hidden;">

        <n-card title="Easy Rip">
            <template #header-extra>
                <a href="https://github.com/op200/EasyRip">
                    https://github.com/op200/EasyRip
                </a>
            </template>

            <p>Run 'easyrip help server' to view the syntax for starting the service, and then set the corresponding
                value in
                the
                Connection of Web Panel to connect.</p>
            <p>运行 'easyrip help server' 查看启动服务的语法，然后在 Web Panel 的 Connection 中设置相应的值，就可以连接。</p>
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