<script setup lang="ts">
import { ref, onBeforeMount, onMounted, h } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { NConfigProvider, lightTheme, darkTheme } from 'naive-ui'
import { NFlex, NMenu, type MenuOption, NLayout, NLayoutSider, NIcon, NButton, NSpace, NInput } from 'naive-ui'
import { DarkTheme24Filled, Code24Regular, } from '@vicons/fluent'

const currentTheme = ref(lightTheme);
onBeforeMount(() => {
  currentTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme;
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => currentTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme); // 监听系统主题
});

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'cmd-panel',
            // params: {
            //   lang: 'zh-CN'
            // }
          }
        },
        { default: () => 'Command' }
      ),
    key: 'cmd-panel',
    icon: () => h(Code24Regular),
  },
];

const collapseMenu = ref(true);

const text = ref('');

</script>

<template>
  <n-config-provider :theme="currentTheme">
    <n-flex id="outermost" vertical style="gap: 0;">

      <!-- 顶部按钮栏 -->
      <n-flex id="topButtonBarFlex" justify="end">
        <n-button strong tertiary circle
          @click="() => currentTheme = currentTheme.name === 'light' ? darkTheme : lightTheme">
          <n-icon size="large">
            <DarkTheme24Filled />
          </n-icon>
        </n-button>
      </n-flex>

      <n-flex id="controlSpace">

        <n-layout has-sider>
          <n-layout-sider bordered collapse-mode="width" :width="170" :collapsed="collapseMenu" show-trigger
            @collapse="collapseMenu = true" @expand="collapseMenu = false">
            <n-menu :collapsed="collapseMenu" :options="menuOptions" default-value="cmd-panel" />
          </n-layout-sider>

          <n-layout>
            <RouterView />
          </n-layout>
        </n-layout>
      </n-flex>

    </n-flex>

  </n-config-provider>
</template>

<style scoped>
#outermost {
  width: 100vw;
  height: 100vh;
  background-color: v-bind('currentTheme.common.bodyColor');
  position: relative;
}

#topButtonBarFlex {
  height: fit-content;
  gap: 1rem;
  padding: 0.5rem;
  border-bottom: 1px solid v-bind('currentTheme.common.borderColor');
}

#controlSpace {
  flex-grow: 1;
}
</style>
